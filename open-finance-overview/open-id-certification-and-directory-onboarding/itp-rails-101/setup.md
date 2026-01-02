# Setup

### Steps to follow before Pix transaction:

1. Open ID Discovery Document : (Refer the JSON block below)\
   it’s a public, read-only JSON endpoint—no auth needed. Just do an HTTPS GET and you’ll get the full participants list (it’s updated roughly every 15 minutes).
2. URL (public):&#x20;

Prod: [https://data.directory.openbankingbrasil.org.br/participants\
](https://data.directory.openbankingbrasil.org.br/participants)Sbx: [https://data.sandbox.directory.openbankingbrasil.org.br/participants](https://data.sandbox.directory.openbankingbrasil.org.br/participants)

1. Returns a JSON array; each item = one organisation with AuthorisationServers and API resources. The page is public and the list is updated periodically; the dev docs explicitly point to this URL and list the important fields to extract (OrganisationId, AuthorisationServers, API family, endpoints, etc.).&#x20;
2. That exact structure (Organisation → AuthorisationServers → ApiResources) is visible in the live participants JSON; note how it gives you&#x20;
3. the bank’s OpenID discovery URL and
4. the resource API base endpoints for consents and pix payments (already mTLS hosts in many cases).\
   or
5. From Participants API (Directory):
6. AuthorisationServers\[].OpenIDDiscoveryDocument → the URL you use to pull discovery;
7. AuthorisationServers\[].ApiResources\[].ApiFamilyType (e.g., payments-consents, payments-pix) + ApiDiscoveryEndpoints\[].ApiEndpoint → the actual REST URLs for /consents, /pix/payments, etc. (often already on an mTLS host).\
   \

8. Discovery (per bank) (Refer the JSON block below)
9. What it is
10. Hit this OpenIDDiscoveryDocument to get the Discovery per bank
11. It’s a JSON “capabilities + endpoints” file that tells your gateway where to call (PAR, token, DCR, JWKS, etc.) and how (algorithms, client-auth methods).\
    \

12. How to fetch it
13. Default
14. No auth: plain HTTPS GET.\
    An OpenID Discovery Document is a public JSON. You fetch it with a plain HTTPS GET—no OAuth, no mTLS/client cert, no API key.&#x20;
15. Exception (mTLS-protected discovery)
16. Some banks put discovery behind mTLS. Present your BRCAC (client/transport cert) on the TLS handshake.\
    \

17. &#x20;What to extract (the must-read keys)
18. issuer – canonical ID; must match tokens you’ll validate later.
19. authorization\_endpoint – front-channel redirects (browser).
20. pushed\_authorization\_request\_endpoint – PAR (you POST JAR here).
21. token\_endpoint – tokens (authorization\_code, client\_credentials, refresh\_token).
22. registration\_endpoint – DCR (you register with your SSA).
23. jwks\_uri – bank’s public keys (verify JARM / JWT AT).
24. introspection\_endpoint, revocation\_endpoint – for opaque tokens.
25. token\_endpoint\_auth\_methods\_supported – e.g., tls\_client\_auth, private\_key\_jwt.
26. request\_object\_signing\_alg\_values\_supported – e.g., PS256 (for JAR).
27. response\_modes\_supported – must include jwt (for JARM).
28. mtls\_endpoint\_aliases – the mTLS-only clones of back-channel endpoints\
    \

29. mtls\_endpoint\_aliases—what it is & how to use it
30. If present, this object lists server-to-server endpoints that require mTLS (you must present BRCAC). Use these aliases for back-channel calls; keep browser redirects on the normal host.

| Purpose                               | Use alias? | Endpoint source                                                           |
| ------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| Browser redirect (user login/consent) | No         | authorization\_endpoint                                                   |
| PAR (push JAR)                        | Yes        | mtls\_endpoint\_aliases.pushed\_authorization\_request\_endpoint          |
| Token (code, client-creds, refresh)   | Yes        | mtls\_endpoint\_aliases.token\_endpoint                                   |
| DCR                                   | Yes        | mtls\_endpoint\_aliases.registration\_endpoint                            |
| Introspection / Revocation            | Yes        | mtls\_endpoint\_aliases.introspection\_endpoint / ...revocation\_endpoint |

\


2. Brazil’s profile encourages advertising mTLS aliases for token, registration (DCR), userinfo, and PAR. When aliases exist, prefer them for those calls.

\


3. DCR — dynamic client registration (once per bank) (Refer JSON Block below)
4. DCR is the one-time, per-bank API call where your software becomes a registered OAuth/OIDC client at that bank’s Authorization Server (AS). The bank returns a client\_id and the canonical client metadata to use later. In Brazil:
5. You must include a Software Statement Assertion (SSA) issued by the Directory of Participants. The bank must validate the SSA with the Directory’s public keys.
6. You must call the mTLS version of the registration endpoint when the bank advertises it (via mtls\_endpoint\_aliases.registration\_endpoint in discovery).
7. The DCR profile builds on RFC 7591/7592 (registration & management) and OpenID Connect Registration.&#x20;
8. Call (mTLS back-channel): get and use the directory access\_token do a GET /ssa call to get the latest SSA Data/ Use the SSA Data for DCR, no access\_token is required.
9. POST {mtls\_alias.registration\_endpoint or discovery.registration\_endpoint}\
   Body: a DCR payload including your SSA; the AS validates the SSA against Directory keys. Auth over mTLS (BRCAC).
10. You present: BRCAC (mTLS) + SSA (JWT).
11. You get: a client\_id registered at that bank.\
    \

12. Fetch a list of all banks that support different payment flows:
13. Use the Open Finance Brasil Participants API (public):
14. Primary JSON: https://data.directory.openbankingbrasil.org.br/participants (no auth). The official docs and Directory pages explicitly point to this URL; content is updated frequently.
15. UI viewer (handy for quick checks): https://web.directory.openbankingbrasil.org.br/participants. It’s just a human-friendly view of the same dataset.
16. Each participant object includes one or more Authorisation Servers with:
17. the OpenID Discovery URL and
18. the API resources they publish (e.g., Payments, Automatic Payments), often with versioned base URLs.
19. Filter idea (terminal): list active ASPSPs that expose Payments:
20. Now you can render that list in your bank-picker UI (logo/name) and keep the AS “payments base URL” in your config per bank. (The Directory itself also publishes status pages for sandbox/prod, useful for diagnosing issues.)&#x20;

Logic to add how to filter participants of interest\
\


References:

\


* Open ID Discovery Document

\[

&#x20; {

&#x20;   "OrganisationId": "18543a69-338d-5e5b-8aa3-dc640ef5f4a2",

&#x20;   "Status": "Active",

&#x20;   "RegisteredName": "UNIPRIME CENTRAL - ...",

&#x20;   "RegistrationNumber": "03046391000173",

&#x20;   "AuthorisationServers": \[

&#x20;     {

&#x20;       "AuthorisationServerId": "eaf49708-0c81-46bc-ac42-6b8378485544",

&#x20;       "CustomerFriendlyName": "Uniprime Central",

&#x20;       "DeveloperPortalUri": "https://developers.uniprimecentral.com.br",

&#x20;       "OpenIDDiscoveryDocument": "https://auth.uniprimecentral.com.br/jans-auth/.well-known/openid-configuration",

&#x20;       "PayloadSigningCertLocationUri": "https://auth.uniprimecentral.com.br/jans-auth/jwks",

&#x20;       "ApiResources": \[

&#x20;         {

&#x20;           "ApiFamilyType": "payments-consents",

&#x20;           "ApiVersion": "3.0.0",

&#x20;           "ApiDiscoveryEndpoints": \[

&#x20;             {"ApiEndpoint": "https://mtls-auth.uniprimecentral.com.br/open-banking/payments/v3/consents"},

&#x20;             {"ApiEndpoint": "https://mtls-auth.uniprimecentral.com.br/open-banking/payments/v3/consents/{consentId}"}

&#x20;           ]

&#x20;         },

&#x20;         {

&#x20;           "ApiFamilyType": "payments-pix",

&#x20;           "ApiVersion": "3.0.0",

&#x20;           "ApiDiscoveryEndpoints": \[

&#x20;             {"ApiEndpoint": "https://mtls-auth.uniprimecentral.com.br/open-banking/payments/v3/pix/payments"},

&#x20;             {"ApiEndpoint": "https://mtls-auth.uniprimecentral.com.br/open-banking/payments/v3/pix/payments/{paymentId}"}

&#x20;           ]

&#x20;         }

&#x20;       ]

&#x20;     }

&#x20;   ]

&#x20; }

]

\
\


* Discovery Response\
  \


{

&#x20; "issuer": "https://as.bank.com.br",

&#x20; "authorization\_endpoint": "https://as.bank.com.br/oauth2/authorize",

&#x20; "token\_endpoint": "https://as.bank.com.br/oauth2/token",

&#x20; "pushed\_authorization\_request\_endpoint": "https://as.bank.com.br/oauth2/par",

&#x20; "jwks\_uri": "https://as.bank.com.br/oauth2/jwks",

&#x20; "registration\_endpoint": "https://as.bank.com.br/connect/register",

&#x20; "revocation\_endpoint": "https://as.bank.com.br/oauth2/revoke",

&#x20; "introspection\_endpoint": "https://as.bank.com.br/oauth2/introspect",

\


&#x20; "mtls\_endpoint\_aliases": {

&#x20;   "token\_endpoint": "https://mtls.as.bank.com.br/oauth2/token",

&#x20;   "pushed\_authorization\_request\_endpoint": "https://mtls.as.bank.com.br/oauth2/par",

&#x20;   "registration\_endpoint": "https://mtls.as.bank.com.br/connect/register",

&#x20;   "revocation\_endpoint": "https://mtls.as.bank.com.br/oauth2/revoke",

&#x20;   "introspection\_endpoint": "https://mtls.as.bank.com.br/oauth2/introspect"

&#x20; }

}

\
\
\


* DCR Payload

{

&#x20;   "application\_type": "web",

&#x20;   "grant\_types": \[

&#x20;       "client\_credentials",

&#x20;       "authorization\_code",

&#x20;       "refresh\_token",

&#x20;       "implicit"

&#x20;   ],

&#x20;   "id\_token\_signed\_response\_alg": "PS256",

&#x20;   "require\_auth\_time": false,

&#x20;   "response\_types": \[

&#x20;       "code id\_token"

&#x20;   ],

&#x20;   "subject\_type": "public",

&#x20;   "token\_endpoint\_auth\_method": "private\_key\_jwt",

&#x20;   "require\_pushed\_authorization\_requests": false,

&#x20;   "tls\_client\_certificate\_bound\_access\_tokens": true,

&#x20;   "client\_url": "[https://juspay.io/br](https://juspay.io/br)",

&#x20;   "client\_name": "Juspay",

&#x20;   "request\_object\_encryption\_alg": "RSA-OAEP",

&#x20;   "request\_object\_encryption\_enc": "A256GCM",

&#x20;   "jwks\_uri": "[https://keystore.directory.openbankingbrasil.org.br/0fdc39da-a699-4f85-90cc-936c7b872791/86a82a9f-6484-4289-a35e-1f53bb4c288d/application.jwks](https://keystore.directory.openbankingbrasil.org.br/0fdc39da-a699-4f85-90cc-936c7b872791/86a82a9f-6484-4289-a35e-1f53bb4c288d/application.jwks)",

&#x20;   "redirect\_uris": \[

&#x20;       "[https://api.juspay.io/txns/continue](https://api.juspay.io/txns/continue)",

&#x20;       "[https://api.juspay.io/container/process](https://api.juspay.io/container/process)"

&#x20;   ],

&#x20;   "webhook\_uris": \[

&#x20;       "[https://webhooks.juspay.itproxy.cumbuca.com](https://webhooks.juspay.itproxy.cumbuca.com/)"

&#x20;   ],

&#x20;   "software\_statement": "\{{ssa\}}"

}

\
\
\
