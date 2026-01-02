# OpenID/ FAPI-BR Conformance & Certification

This article is for builders of a Client / Relying Party (RP) that will connect to Brazilian Open Finance banks (ASPSPs) using FAPI1-Advanced + Brazil profile. It walks you through exactly what to implement, how to run the official conformance tests, and how to prepare the evidence package for certification.

High-level process: (What you must support as an RP)

1. OAuth/OIDC profile: Authorization Code with PAR (Pushed Authorization Request), JAR (signed request object), JARM (JWT response), PKCE (S256).
2. Client auth at token endpoint: mTLS (tls\_client\_auth) and/or private\_key\_jwt (pick at least one; many certify both).
3. Brazil specifics: run test plan for Open Banking/Finance Brazil, use DCR (Dynamic Client Registration using an SSA), and be able to operate in&#x20;
4. accounts or&#x20;
5. payment mode. (explain each)
6. Two RP clients in the plan: one normal, one that can receive encrypted ID Tokens (has an enc key in JWKS).
7. Evidence: publish test results from the hosted suite and attach client-side logs/screenshots per test in a client-data/ folder.

1\) Prerequisites (tech & org)

Implement these capabilities in your RP:

1. Discovery loader (reads OIDC metadata and mtls\_endpoint\_aliases when present).
2. PAR: POST a signed JAR (usually PS256) to get a request\_uri (short TTL).
3. Authorization redirect using the request\_uri and response\_mode=jwt (JARM).
4. JARM validation: verify signature & claims (iss, aud, exp, and state echo).
5. PKCE (S256) for the code flow.
6. Token endpoint: support the client-auth method(s) you’ll certify: mTLS and/or private\_key\_jwt.
7. DCR: your RP can register dynamically over mTLS, passing SSA when required by the test.
8. Consent + resource call logic (the suite will show URLs to call; your RP must follow the order).

Keys & certs you should have ready:

1. BRSEAL (for signing JAR and, in real banks, payment/consent bodies).
2. BRCAC (TLS client cert) where your RP runs (for mTLS flows).
3. Client JWKS with:
4. at least one signing key ("use": "sig", e.g., RSA PS256),
5. and an encryption key ("use": "enc") for your second client in the plan.

2\) Create the Brazil RP test plan in the hosted Conformance Suite

1. New Test Plan → choose “FAPI1-Advanced-Final: Open Banking/Finance Brazil — Relying Party (Client)”.
2. Select client auth: mtls or private\_key\_jwt (run a separate plan for each, if certifying both).
3. Select response mode: typically jarm (JWT response).
4. Mode: payments or accounts (pick one per plan).
5. Provide configurations (via UI or JSON tab):
6. Your Client #1 (normal): redirect URIs, jwks\_uri or embedded JWKS (sig key present), request object signing alg (PS256).
7. Your Client #2 (enc): same but with enc key to receive encrypted ID Tokens.
8. If mTLS: provide your Subject DN (or SAN) as the tls\_client\_auth\_\* value the suite asks for.
9. Suite “server” keys: the suite may require you to paste a JWKS it will use to sign JARM / issue tokens (the portal typically provides defaults — use theirs if available).

Note: The plan includes two sets of very similar tests: one without PAR, one with PAR. You must complete both.

3\) The per-test flow you will execute&#x20;

For each test you click Run and then your RP performs in this order:

1. Fetch discovery
2. The test page shows a discovery URL (issuer-scoped).
3. GET it. Parse endpoints/capabilities (token, PAR, JWKS, JARM support, etc.).
4. (If required) Client-credentials token
5. POST to the suite’s token endpoint with:
6. grant\_type=client\_credentials
7. an appropriate scope (suite will tell you; e.g., payments or consents)
8. Client auth at token endpoint matches the plan (mTLS or private\_key\_jwt).
9. Create consent
10. The test page displays a consent endpoint URL (suite-hosted).
11. Call it with the M2M token you just obtained; capture consentId the suite returns.
12. PAR variant only — PAR
13. Build a JAR (signed JWT request object) including:
14. response\_type=code
15. response\_mode=jwt
16. Client\_id
17. Redirect\_uri
18. scope (e.g., openid payments)
19. state (unguessable)
20. nonce (unguessable)
21. code\_challenge / code\_challenge\_method=S256
22. (often) a claim binding the consent, per test instructions
23. POST JAR to pushed\_authorization\_request\_endpoint → receive request\_uri (+ TTL).
24. Authorization redirect
25. Redirect the browser (or programmatically follow redirects if your harness does it) to the authorization endpoint:
26. Non-PAR: include the signed request (JAR) as a parameter.
27. PAR: include the request\_uri.
28. The suite “user” immediately redirects back with JARM (response\_mode=jwt) containing code + your state.
29. Validate JARM
30. Verify the JWS signature using the OP’s jwks\_uri (published by the suite).
31. Check iss, aud (your client\_id), exp (short TTL), and that state matches.
32. Exchange code → tokens
33. POST to token endpoint with:
34. grant\_type=authorization\_code
35. code, redirect\_uri, code\_verifier (PKCE)
36. Client auth = mTLS or private\_key\_jwt as per plan.
37. Receive user-bound access token (+ optional refresh token, id\_token).
38. Resource call (completes the test)
39. The test page shows a resource endpoint (suite-hosted).
40. Call it with the user access token.
41. The suite marks the test as FINISHED (PASS or “passed a negative test” when you correctly reject a bad scenario).

4\) DCR (Dynamic Client Registration) inside the plan

Some Brazil RP tests require DCR. When you see that variant:

* Call the registration endpoint (mTLS) shown by the suite.
* Send a JSON body including software\_statement (SSA) and your client metadata (redirect\_uris, token\_endpoint\_auth\_method, request\_object\_signing\_alg, jwks\_uri, etc.).
* The suite will return a client\_id to be used for the rest of that test.
* If a field conflicts with the SSA, the SSA wins.

5\) Evidence & certification submission&#x20;

When all tests in the plan are FINISHED:

1. Publish your results in the suite → download the published ZIP.
2. Add a folder called client-data/ inside the package and place one evidence file per test:
3. Either client logs or screenshots showing what you validated (e.g., “rejected invalid state”, “verified JARM signature”).
4. Name files with the exact test name (and suffixes for response types if requested by the portal).
5. Go to the submission portal, fill your entity/deployment info, attach the package, and complete the self-declaration.
6. Pay the certification fee (you’ll get a payment code/receipt that you include in the submission form).

Tip: if reviewers cannot see from your client-data what your RP validated, they will ask you to re-run and re-submit. Make logs explicit.

6\) Negative tests you should be ready to fail correctly

* Bad state / nonce in authorization response → detect and stop.
* Wrong signing alg (e.g., HS256 where only PS256 is allowed) → reject.
* JARM expired / wrong iss/aud → reject.
* PKCE mismatch → reject.
* PAR tampering (request object mismatch) → reject.
* Token endpoint auth mismatch (you advertised mTLS but used private\_key\_jwt, or vice-versa) → reject.

Have clear error logs for all of the above—those logs become your client-data.

7\) Ready-to-use checklists

* Plan Creation
* Brazil RP test plan selected (payments or accounts).
* Auth method chosen: mTLS or private\_key\_jwt.
* Response mode = JARM.
* Two clients configured (second has enc key).
* Redirect URIs entered.
* Runtime
* Discovery fetched and parsed (respect mtls\_endpoint\_aliases when present).
* Client-credentials token (if test requires it) acquired.
* Consent endpoint called, consentId stored.
* PAR done (in PAR variants), request\_uri used before TTL.
* JAR signed with PS256, includes PKCE, state, nonce.
* JARM verified (sig + claims + state).
* Code→token with chosen client auth.
* Resource call completes the test.
* Evidence
* &#x20;All tests FINISHED in the plan (both non-PAR & PAR sets).
* Results published; client-data/ populated with logs/screenshots.
* Submission form + payment completed.

Glossary:

* BRCAC — your mTLS client/transport certificate (TLS client cert you present to banks for server-to-server calls).
* BRSEAL — your signing cert/key used to sign JAR and application/jwt bodies (payments/consents).
* SSA — Software Statement Assertion (JWT) minted by the Directory; you present it during DCR.
* PAR / JAR / JARM / PKCE — pushed request / signed request object / signed authorization response / code verifier.
* JWKS — JSON Web Key Set (your public keys; you’ll need one for sig and one for enc for the “encrypted ID token” client).

\


1. Run the conformance suite for the chosen profile(s) until you pass; the BR track includes Brazil-specific DCR tests (your AS must accept an SSA signed by the Brazil Directory).&#x20;
2. Publish test results, then submit certification to the OpenID Foundation (includes a fee and a self-declaration).
3. Keep your implementation aligned with FAPI-BR Security Profile (the Brazil profile that layers Brazil-specific rules on top of FAPI-Advanced).

Note: the conformance suite is not the Directory; it uses its own keys/certs and special flows, documented on the Brazil pages of the OpenID site.&#x20;

\
