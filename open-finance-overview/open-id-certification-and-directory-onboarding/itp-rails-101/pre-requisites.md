# Pre- Requisites

Pre-requisites:&#x20;

1. Open ID Certification (OpenID/FAPI-BR conformance plan)
2. Credentials required:&#x20;
3. There are two creds that you get with ICP Brazil - BRSEAL and BRCAC  (Explain these two and their use case)
4. The simple mental model (two security layers):
5. Channel security (mTLS)\
   Think of mTLS as a handshake at the door. Both you and the bank show government-grade ID cards (client & server certificates) issued under ICP-Brasil. If your ID (client cert) chains up to the official Brazilian root (ITI) and contains the expected Open Finance attributes, the door opens and a private, authenticated TLS tunnel is established.[ ](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/245694518/PT%2BPadr%2Bo%2Bde%2BCertificados%2BOpen%2BFinance%2BBrasil%2B2.1)

Message security (JWS / JWT family)\
Inside that tunnel, high-risk API calls (consents, payments) carry a detached digital signature called JWS—that signature proves the payload wasn’t tampered with. Banks must validate this signature using your public keys published in the Directory (your software’s JWKS), and you sign with a dedicated signing certificate.\
\
Special case: OAuth token endpoints don’t use application/jwt bodies; they’re classic OAuth and expect application/x-www-form-urlencoded. That’s by design per OAuth 2.0\
\
Two different jobs: BRCAC = mTLS (who are you on the wire?); BRSEAL = JWS (did you author this exact JSON/JWT?)
