# Tokens

* Client-credentials token (M2M) → to create/read consents.
* What it is\
  A server-to-server token that represents your software (not the user). You use it for back-office operations, mainly:
* Create/read consents (POST /consents, GET /consents/{id}).
* Occasionally other M2M endpoints allowed by the bank.
* How to fetch it
* TLS/auth: Server-to-server call to the mTLS token endpoint using BRCAC (or private\_key\_jwt if that’s what the bank supports).
* Body:
* grant\_type=client\_credentials
* scope=payments (or the exact scope the bank requires for consent ops)
* client\_id= received in DCR
* client\_assertion\_type=: urn:ietf:params:oauth:client-assertion-type:jwt-bearer
* client\_assertion= JWT Signed payload
* What you receive
* A JSON with access\_token, token\_type, expires\_in (and sometimes scope). Some banks bind this token to your TLS cert (see “Token binding” below).
* Where you use it
* Authorization: Bearer \<M2M access\_token> on /consents calls (body signed with BRSEAL).
* Validation (your side)
* If the bank issues JWT access tokens: validate signature (jwks\_uri in discovery), iss, aud, exp, and check scope contains what you need (e.g., payments).
* If opaque: call introspection (see below)
* Authorization-code token (user-bound) → to create Pix payments.
* What it is
* A token that represents the end user, obtained after the user approves your consent at their bank. You use it to create Pix payments.
* How to fetch it (full sequence)
* PAR (back-channel, mTLS): POST a JAR (JWT request object) you sign with BRSEAL to the bank’s PAR endpoint to receive a short-lived request\_uri.
* Authorize (front-channel, browser): redirect user to authorization\_endpoint with your request\_uri (use response\_mode=jwt for JARM).
* JARM comes back to your redirect\_uri (a signed JWT containing the authorization code and your state).
* Token exchange (back-channel, mTLS):
* POST to the mTLS token endpoint with:
* grant\_type=authorization\_code
* code=\<from JARM>
* redirect\_uri=\<must match>
* code\_verifier=\<PKCE S256 pair>
* What you receive
* access\_token (user-bound), optionally refresh\_token, possibly id\_token.
* Where you use it
* Authorization: Bearer \<user access\_token> on /pix/payments calls (body signed with BRSEAL).
* Validation (your side)
* Same as above: if JWT, validate locally; if opaque, introspect.
* Enforce consent binding as the bank defines (often a consentId claim or a mapped scope) before allowing payment creation.
* Refresh token logic → only if issued and while consent is active.
* What it is
* A credential that lets you obtain a new user-bound access token without sending the user through login again—only while the related consent remains active. Not all banks/issues always grant one.
* How to use it
* TLS/auth: same token endpoint, server-to-server with BRCAC (or private\_key\_jwt).
* Body:
* grant\_type=refresh\_token
* refresh\_token=\<value>
* client\_id= received in DCR
* client\_assertion\_type=: urn:ietf:params:oauth:client-assertion-type:jwt-bearer
* client\_assertion= JWT Signed payload
* Best practices
* Expect rotation: many servers return a new refresh token—store it and discard the old one.
* Handle invalid\_grant (expired/revoked consent, too many uses, wrong client auth).\
  \

* Token binding: if the bank binds tokens to your mTLS cert, enforce cnf/thumbprint checks on your resource calls.
* What it is
* Some banks bind access tokens to the client TLS cert used when the token was issued. The access token (if JWT) will contain a cnf claim (confirmation), usually with the SHA-256 thumbprint of your client cert (cnf.x5t#S256).
* How to enforce it (resource calls)
* On calls where you are the client (e.g., calling /consents, /pix/payments), you already present your BRCAC on TLS.
* Your resource server (or gateway) must compare:
* the thumbprint advertised in the token’s cnf (or from introspection), vs
* the thumbprint of the actual client cert presented on that TLS connection.
* If they don’t match → reject (prevents token replay from another host).

\


presented\_cert\_der = get\_client\_cert\_from\_tls\_session()

presented\_thumb = base64url( SHA256(presented\_cert\_der) )

token\_thumb     = access\_token.claims\["cnf"]\["x5t#S256"]

assert presented\_thumb == token\_thumb

\


* Validation paths:
* If access tokens are JWT → local verify (issuer/audience/scope/exp).
* Fetch the bank’s jwks\_uri (from discovery) and cache keys.
* Verify:
* Signature (kid → key, alg allowed)
* iss (matches bank issuer)
* aud (your API/gateway audience)
* exp/nbf/iat (with small clock skew)
* scope/scp (contains required scope like payments)
* cnf (if present: enforce mTLS binding)
* Any consent binding claim the bank uses (e.g., the consentId associated to the token/session).
* If opaque → call introspection (over mTLS).
* Call the introspection endpoint (prefer the mTLS alias) with:
* token=\<the\_access\_token>
* Client auth: mTLS or private\_key\_jwt per bank config.
* Only proceed if the response says "active": true, and then enforce scope, exp, and cnf (if returned).
