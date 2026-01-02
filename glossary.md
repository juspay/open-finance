# Glossary

Tech:

* JWT&#x20;
* JWS: JSON Web Signature — “JWT with a signature”. You sign the payload; the signature is sent as a header (detached) like x-jws-signature for payments/consents.
* JWE: JSON Web Encryption — encrypted form (used less often on Pix flows client side, but part of the toolbox).
* JAR: JWT-Secured Authorization Request — you wrap your OAuth/OIDC authorization request into a signed (often also encrypted) JWT so it can’t be altered.
* JARM: JWT-Secured Authorization Response Mode — the bank returns the OAuth authorization response inside a signed JWT (protects the code/state from being swapped).
* PAR: Pushed Authorization Request — you POST your signed authorization request to the bank first, get back a request\_uri, then redirect the user with just that URI. Cuts out query-string tampering.
* PKCE (S256): Proof-Key for Code Exchange — binds the auth code to your client to block code-stealing. (Mandatory in the Brazil profile together with PAR/JAR/JARM.)
* JWKS: JSON Web Key Set — your public keys published in the Directory; banks must use these keys (and only these) to verify your JWS signatures.
* BRCAC = your mTLS client/transport certificate (presented on the TLS handshake for server-to-server calls).
* BRSEAL = your signing cert/key (used to sign application/jwt bodies and JAR request objects).
* Token endpoint URL = take it from the bank’s discovery; prefer the mtls\_endpoint\_aliases.token\_endpoint if present.
* Content-Type for token calls = application/x-www-form-urlencoded (always).

Roles:

* Directory:&#x20;
* Think of the Directory as the trust anchor + phonebook:
* It verifies who you are and issues SSAs you use in DCR. Banks trust SSAs signed by the Directory.
* It’s also where your public JWKS is published so banks can validate your JWS signatures on application/jwt bodies.
* Banks publish their endpoints via OIDC Discovery and often advertise mtls\_endpoint\_aliases so your gateway knows which base URLs require a client cert. Use those aliases for token/introspection/revocation; browser authorization redirects remain on the non-mTLS host
* Bank (ASPSP)
* Account Servicing Payment Service Provider (ASPSP) is a financial institution that offers and maintains payment accounts for customers, like a bank or building society.
* ITP

\
