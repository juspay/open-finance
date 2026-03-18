// Node-runtime only (Next.js API routes / SSR). Not for Edge runtime.

import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";
import zlib from "node:zlib";
import { URL } from "node:url";


class ProxyTunnelAgent extends https.Agent {
    private proxy: URL;
    private proxyAuth: string | null;
    private target: URL;
    private timeoutMs: number;

    constructor(target: URL, proxy: URL, proxyAuth: string | null, timeoutMs: number) {
        super({ keepAlive: false, maxSockets: 10 });
        this.target = target;
        this.proxy = proxy;
        this.proxyAuth = proxyAuth;
        this.timeoutMs = timeoutMs;
    }

    // 2. Override the createConnection method
    // TypeScript recognizes this as a valid override
    createConnection(opts: any, cb: (err: Error | null, socket?: any) => void): any {
        (async () => {
            try {
                const targetHost = opts.host || opts.hostname || this.target.hostname;
                const targetPort = Number(opts.port || this.target.port || 443);
                const proxyPort = this.proxy.port ? Number(this.proxy.port) : (this.proxy.protocol === "https:" ? 443 : 80);

                // Your existing connection logic
                const baseSocket = await connectToProxy(this.proxy.hostname, proxyPort, this.proxy.protocol === "https:", this.timeoutMs);

                const connectLines = [
                    `CONNECT ${targetHost}:${targetPort} HTTP/1.1`,
                    `Host: ${targetHost}:${targetPort}`,
                    `Proxy-Connection: Keep-Alive`,
                ];
                if (this.proxyAuth) connectLines.push(`Proxy-Authorization: ${this.proxyAuth}`);
                connectLines.push("", "");

                baseSocket.write(connectLines.join("\r\n"));

                const head = await readHeaderBlock(baseSocket, this.timeoutMs);
                const { statusCode } = parseStatusLine(head);

                if (statusCode !== 200) {
                    baseSocket.destroy();
                    return cb(new Error(`Proxy CONNECT failed (status ${statusCode})`));
                }

                const tlsSocket = tls.connect({
                    socket: baseSocket,
                    servername: targetHost,
                });

                tlsSocket.once("error", (e) => cb(e));
                tlsSocket.once("secureConnect", () => cb(null, tlsSocket));

            } catch (e) {
                cb(e as Error);
            }
        })().catch(cb);
    }
}

export type FetchWithProxyInput = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown; // string | Buffer | Uint8Array | object (auto-JSON)
    timeoutMs?: number; // default 5000
    followRedirects?: boolean; // default true
    maxRedirects?: number; // default 5
};

export async function fetchWithProxy(input: FetchWithProxyInput): Promise<Response> {
    const {
        url,
        method = "GET",
        headers = {},
        body,
        timeoutMs = 5000,
        followRedirects = true,
        maxRedirects = 5,
    } = input;

    return fetchWithProxyInternal(
        {
            url,
            method,
            headers,
            body,
            timeoutMs,
            followRedirects,
            maxRedirects,
        },
        0
    );
}

/* =========================
   INTERNALS
   ========================= */

async function fetchWithProxyInternal(
    input: Required<
        Pick<FetchWithProxyInput, "url" | "method" | "headers" | "timeoutMs" | "followRedirects" | "maxRedirects">
    > &
        Pick<FetchWithProxyInput, "body">,
    redirectCount: number
): Promise<Response> {
    const u = new URL(input.url);
    const method = (input.method || "GET").toUpperCase();

    const { bodyBuffer, finalHeaders } = normalizeBodyAndHeaders(method, input.body, input.headers);

    const proxy = pickProxyFor(u);

    const useProxy = proxy !== null && !isNoProxyHost(u.hostname);

    const resData = useProxy
        ? await requestViaProxy(u, proxy!, method, finalHeaders, bodyBuffer, input.timeoutMs)
        : await requestDirect(u, method, finalHeaders, bodyBuffer, input.timeoutMs);

    // Basic redirect following (like fetch "follow")
    if (input.followRedirects) {
        const location = headerGet(resData.headers, "location");
        if (location && isRedirectStatus(resData.statusCode)) {
            if (redirectCount >= input.maxRedirects) {
                throw new Error(`Too many redirects (>${input.maxRedirects})`);
            }

            const nextUrl = new URL(location, u).toString();
            let nextMethod = method;
            let nextBody: unknown = input.body;
            const nextHeaders = { ...input.headers };

            // Common fetch-like behavior:
            // - 303 => always switch to GET (except HEAD)
            // - 301/302 with non-GET/HEAD often switch to GET
            if (resData.statusCode === 303 || ((resData.statusCode === 301 || resData.statusCode === 302) && method !== "GET" && method !== "HEAD")) {
                nextMethod = "GET";
                nextBody = undefined;
                delete nextHeaders["content-length"];
                delete nextHeaders["Content-Length"];
                delete nextHeaders["content-type"];
                delete nextHeaders["Content-Type"];
            }

            return fetchWithProxyInternal(
                {
                    url: nextUrl,
                    method: nextMethod,
                    headers: nextHeaders,
                    body: nextBody,
                    timeoutMs: input.timeoutMs,
                    followRedirects: input.followRedirects,
                    maxRedirects: input.maxRedirects,
                },
                redirectCount + 1
            );
        }
    }

    const decoded: any = maybeDecompress(resData.body, headerGet(resData.headers, "content-encoding"));
    const webHeaders: HeadersInit = {};
    for (const [k, v] of Object.entries(resData.headers)) webHeaders[k] = v;

    return new Response(decoded, {
        status: resData.statusCode,
        statusText: resData.statusMessage || "",
        headers: webHeaders,
    });
}

function normalizeBodyAndHeaders(
    method: string,
    body: unknown,
    headers: Record<string, string>
): { bodyBuffer?: Buffer; finalHeaders: Record<string, string> } {
    const finalHeaders: Record<string, string> = { ...headers };

    const hasBody = body !== undefined && body !== null;
    if ((method === "GET" || method === "HEAD") && hasBody) {
        throw new Error(`${method} requests cannot have a body`);
    }

    if (!hasBody) return { finalHeaders };

    // Buffer / Uint8Array / string passthrough
    if (Buffer.isBuffer(body)) return { bodyBuffer: body, finalHeaders };
    if (body instanceof Uint8Array) return { bodyBuffer: Buffer.from(body), finalHeaders };
    if (typeof body === "string") return { bodyBuffer: Buffer.from(body, "utf8"), finalHeaders };

    // If it's a plain object, JSON encode
    if (typeof body === "object") {
        const json = JSON.stringify(body);
        if (!hasHeader(finalHeaders, "content-type")) {
            finalHeaders["content-type"] = "application/json";
        }
        return { bodyBuffer: Buffer.from(json, "utf8"), finalHeaders };
    }

    // Fallback
    return { bodyBuffer: Buffer.from(String(body), "utf8"), finalHeaders };
}

/* =========================
   PROXY SELECTION
   ========================= */

function pickProxyFor(target: URL): URL | null {
    const proto = target.protocol;
    const env =
        (proto === "https:" ? (process.env.HTTPS_PROXY || process.env.https_proxy) : (process.env.HTTP_PROXY || process.env.http_proxy)) ||
        process.env.ALL_PROXY ||
        process.env.all_proxy;

    if (!env) return null;

    // allow "host:port" forms
    const normalized = env.includes("://") ? env : `http://${env}`;
    try {
        return new URL(normalized);
    } catch {
        throw new Error(`Invalid proxy URL in env: ${env}`);
    }
}

function isNoProxyHost(hostname: string): boolean {
    const np = process.env.NO_PROXY || process.env.no_proxy;
    if (!np) return false;

    const host = hostname.toLowerCase();
    const parts = np
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

    // very common patterns only (primitive)
    for (const p of parts) {
        if (p === "*") return true;
        if (p === host) return true;
        // ".example.com" => suffix match
        if (p.startsWith(".") && host.endsWith(p)) return true;
        // "example.com" => suffix match for subdomains as well
        if (!p.startsWith(".") && (host === p || host.endsWith(`.${p}`))) return true;
    }
    return false;
}

function proxyAuthorizationHeader(proxy: URL): string | null {
    const user = decodeURIComponent(proxy.username || "");
    const pass = decodeURIComponent(proxy.password || "");
    if (!user && !pass) return null;
    const token = Buffer.from(`${user}:${pass}`, "utf8").toString("base64");
    return `Basic ${token}`;
}

/* =========================
   REQUESTS
   ========================= */

type NodeLikeResponse = {
    statusCode: number;
    statusMessage: string;
    headers: Record<string, string>;
    body: Buffer;
};

async function requestDirect(
    target: URL,
    method: string,
    headers: Record<string, string>,
    body: Buffer | undefined,
    timeoutMs: number
): Promise<NodeLikeResponse> {
    const isHttps = target.protocol === "https:";
    const lib = isHttps ? https : http;

    const port = target.port ? Number(target.port) : isHttps ? 443 : 80;

    return requestWithNodeModule(
        lib,
        {
            hostname: target.hostname,
            port,
            path: target.pathname + target.search,
            method,
            headers,
        },
        body,
        timeoutMs
    );
}

async function requestViaProxy(
    target: URL,
    proxy: URL,
    method: string,
    headers: Record<string, string>,
    body: Buffer | undefined,
    timeoutMs: number
): Promise<NodeLikeResponse> {
    if (target.protocol === "http:") {
        return requestHttpThroughProxy(target, proxy, method, headers, body, timeoutMs);
    }

    // https target via CONNECT
    return requestHttpsThroughProxy(target, proxy, method, headers, body, timeoutMs);
}

async function requestHttpThroughProxy(
    target: URL,
    proxy: URL,
    method: string,
    headers: Record<string, string>,
    body: Buffer | undefined,
    timeoutMs: number
): Promise<NodeLikeResponse> {
    const proxyIsHttps = proxy.protocol === "https:";
    const lib = proxyIsHttps ? https : http;

    const proxyAuth = proxyAuthorizationHeader(proxy);
    const reqHeaders: Record<string, string> = { ...headers };
    if (proxyAuth) reqHeaders["proxy-authorization"] = proxyAuth;

    // Absolute-form for proxies
    const absolutePath = target.toString();

    const port = proxy.port ? Number(proxy.port) : proxyIsHttps ? 443 : 80;

    return requestWithNodeModule(
        lib,
        {
            hostname: proxy.hostname,
            port,
            path: absolutePath,
            method,
            headers: reqHeaders,
        },
        body,
        timeoutMs
    );
}

async function requestHttpsThroughProxy(
    target: URL,
    proxy: URL,
    method: string,
    headers: Record<string, string>,
    body: Buffer | undefined,
    timeoutMs: number
): Promise<NodeLikeResponse> {
    const proxyAuth = proxyAuthorizationHeader(proxy);
    const agent = new ProxyTunnelAgent(target, proxy, proxyAuth, timeoutMs);

    const port = target.port ? Number(target.port) : 443;
    return requestWithNodeModule(
        https,
        {
            hostname: target.hostname,
            port,
            path: target.pathname + target.search,
            method,
            headers,
            agent,
        },
        body,
        timeoutMs
    );
}


function parseStatusLine(rawHeaderBlock: string): { statusCode: number } {
    const firstLine = rawHeaderBlock.split("\r\n")[0] || "";
    // e.g. HTTP/1.1 200 Connection established
    const m = firstLine.match(/HTTP\/\d\.\d\s+(\d{3})/i);
    if (!m) return { statusCode: 0 };
    return { statusCode: Number(m[1]) };
}


function connectToProxy(host: string, port: number, proxyIsTls: boolean, timeoutMs: number): Promise<net.Socket> {
    return new Promise((resolve, reject) => {
        const socket: net.Socket = proxyIsTls
            ? (tls.connect({ host, port, servername: host }) as unknown as net.Socket)
            : net.connect({ host, port });

        const onError = (e: Error) => {
            cleanup();
            reject(e);
        };

        const onConnect = () => {
            cleanup();
            resolve(socket);
        };

        const timer = setTimeout(() => {
            socket.destroy(new Error(`Proxy connect timed out after ${timeoutMs}ms`));
        }, timeoutMs);

        const cleanup = () => {
            clearTimeout(timer);
            socket.off("error", onError);
            socket.off("connect", onConnect);
        };

        socket.once("error", onError);
        socket.once("connect", onConnect);
    });
}

function readHeaderBlock(socket: net.Socket, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
        let buf = Buffer.alloc(0);

        const timer = setTimeout(() => {
            cleanup();
            reject(new Error(`Timed out while waiting for proxy response headers (${timeoutMs}ms)`));
        }, timeoutMs);

        const onData = (chunk: Buffer) => {
            buf = Buffer.concat([buf, chunk]);
            const idx = buf.indexOf("\r\n\r\n");
            if (idx !== -1) {
                const head = buf.slice(0, idx + 4);
                const rest = buf.slice(idx + 4);
                if (rest.length) socket.unshift(rest);
                cleanup();
                resolve(head.toString("utf8"));
            }
        };

        const onErr = (e: Error) => {
            cleanup();
            reject(e);
        };

        const cleanup = () => {
            clearTimeout(timer);
            socket.off("data", onData);
            socket.off("error", onErr);
        };

        socket.on("data", onData);
        socket.once("error", onErr);
    });
}

function requestWithNodeModule(
    lib: typeof http | typeof https,
    options: http.RequestOptions,
    body: Buffer | undefined,
    timeoutMs: number
): Promise<NodeLikeResponse> {
    return new Promise((resolve, reject) => {
        const req = lib.request(options, (res) => {
            const chunks: Buffer[] = [];
            res.on("data", (c) => {
                chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c))
            });
            res.on("end", () => {
                resolve({
                    statusCode: res.statusCode ?? 0,
                    statusMessage: res.statusMessage ?? "",
                    headers: normalizeNodeHeaders(res.headers),
                    body: Buffer.concat(chunks),
                });
            });
        });

        req.on("error", reject);

        // Covers DNS/connect/response stall reasonably well
        req.setTimeout(timeoutMs, () => {
            req.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
        });

        if (body && body.length > 0) req.write(body);
        req.end();
    });
}

/* =========================
   HEADERS / DECOMPRESSION
   ========================= */

function normalizeNodeHeaders(h: http.IncomingHttpHeaders): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(h)) {
        if (v === undefined) continue;
        out[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v);
    }
    return out;
}

function hasHeader(h: Record<string, string>, name: string): boolean {
    const n = name.toLowerCase();
    return Object.keys(h).some((k) => k.toLowerCase() === n);
}

function headerGet(h: Record<string, string>, name: string): string | undefined {
    return h[name.toLowerCase()];
}

function isRedirectStatus(code: number): boolean {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
}

function maybeDecompress(body: Buffer, contentEncoding?: string): Buffer {
    if (!contentEncoding) return body;

    const enc = contentEncoding.toLowerCase().trim();

    try {
        if (enc.includes("gzip")) return zlib.gunzipSync(body);
        if (enc.includes("deflate")) return zlib.inflateSync(body);
        if (enc.includes("br")) return zlib.brotliDecompressSync(body);
    } catch {
        // If decompression fails, return raw bytes (safer than throwing for unknown encodings)
        return body;
    }

    return body;
}
