# Directory Onboarding

Think of the Open Finance Directory as the “trust phonebook.” You register your organisation and software there; the Directory issues a software\_id and lets you mint SSAs (Software Statement Assertions) for DCR (Dynamic Client Registration) with each bank.&#x20;

\


By onboarding to the Directory you get:

* An Organisation entry + Software entries (your “apps”).
* A software\_id for each app.
* Directory-hosted JWKS URLs that banks will trust for your keys (signing and transport).
* The ability to mint SSAs (Software Statement Assertions)—JWTs signed by the Directory attesting to your software metadata; banks must validate them during DCR.&#x20;

Only BCB-authorized entities can participate in Open Finance production; the Directory reflects those regulatory roles. (You can still use Sandbox to build & test.)&#x20;

1. Pick your environment
2. Sandbox Directory:
3. UI: https://web.sandbox.directory.openbankingbrasil.org.br/
4. AS (discovery): https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration
5. Directory mTLS API base: https://matls-api.sandbox.directory.openbankingbrasil.org.br/
6. Directory keystore base (public): https://keystore.sandbox.directory.openbankingbrasil.org.br/
7. Sandbox CA trust list (for client TLS): …/ca\_trusted\_list.pem2
8. Production Directory:
9. AS issuer: https://auth.directory.openbankingbrasil.org.br (discover its config at /.well-known/openid-configuration)
10. All Directory APIs require mTLS and the directory:software scope. Certificates used to access participants’ APIs must be ICP-Brasil.&#x20;
11. Create your Organisation (UI)
12. Sign into the Directory UI (sandbox first).
13. Create/confirm your Organisation profile (legal name, CNPJ, contacts).
14. Ensure your regulatory roles (e.g., Initiator—ITP) are attached. The Directory models these roles and lets admins assign them to software later.

In production, your Organisation shows BCB authorization; Sandbox is open for building/testing.

3. Create a Software entry (UI)&#x20;
4. In the UI, go to Software Statements → Create New.
5. Fill the form carefully (end-user-visible in redirects). Typical fields:
6. software\_client\_name, logo/brand, redirect\_uris (add localhost + suite callbacks for conformance if needed), and your jwks\_uri if you host keys externally.
7. Save—the Directory creates the software entry and software\_id.
8. (Admins) Assign regulatory roles permitted for your org to this software.

The UI explicitly notes this is like an app store record: banks and end-users see these details during authorization.

4. &#x20;Upload / publish your keys & certs
5. You need two key types in the ecosystem:
6. Signing (BRSEAL) → for JAR and application/jwt bodies.
7. Transport (BRCAC) → your mTLS client certificate.
8. Where they appear publicly
9. The Directory exposes public JWKS for your software under canonical paths so banks can find them, for example:
10. SSA issuer keys (Directory’s own signing keys for SSAs):
11. Sandbox: …/openbanking.jwks
12. Prod: …/openbanking.jwks (different host) — banks use these to verify your SSA.
13. Your software’s keys: the Directory publishes per-software JWKS, including transport and application JWKS, at paths that include your org-id and software-id. (Docs reference …/\<org-id>/\<software-id>/transport.jwks and analogous application.jwks; you can also use your own jwks\_uri if allowed.)
14. Get API access to the Directory
15. All Directory APIs are protected just like bank APIs:
16. OAuth 2.0 with mTLS client auth and scope directory:software.
17. Use the Directory AS discovery to find endpoints and the mTLS token alias.
18. Discover the Directory AS by fetching [https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration](https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration)
19. Get a Directory access token (client-credentials with mTLS)
20. Your client\_id for Directory use is the one the Directory issued for your software.
21. Mint an SSA (Software Statement Assertion)
22. An SSA is a JWT signed by the Directory describing your software at a point in time (redirect URIs, JWKS locations, roles, etc.). Banks validate its signature with the Directory SSA JWKS. SSAs are commonly short-lived in practice (banks often require “fresh” SSAs), but the doc notes they describe a point-in-time record.
23. How you create an SSA
24. UI: In your software page, click Create SSA (or similar).
25. API: Use the Directory APIs. The Developer guide points to the Directory OpenAPI set for the exact endpoints.&#x20;

When you later call a bank’s DCR endpoint, you’ll put this SSA in the software\_statement field; the bank must validate it against the Directory’s SSA issuer JWKS.

\
