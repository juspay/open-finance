# Overview

Two tracks - Directory onboarding (software\_id & SSA) and OpenID RP conformance testing/certification are separate tracks.



Why this separation matters:

* OpenID Certification proves you’re conformant to the protocol profile.
* Pick your role & profiles:
* If you’re building an Authorization Server (AS/OP) → BR-OB Advanced OP with MTLS and/or Private Key variants, plus JAR, PAR, JARM where applicable.
* If you’re building a Client/RP (Initiator) → BR-OB Advanced RP tests. (For the purpose of this document, we will be focusing on this)&#x20;
* Relying Parties (RP) security certification for payments (signed scope) is valid for data sharing (unsigned scope), but vice versa is not valid.&#x20;
* Directory onboarding gives you a software\_id and SSAs so banks can trust your software during DCR. Two tracks; both are needed in Brazil.

Sandbox vs Production (what you can do when):

* OIDF Conformance tests:
* Publicly reachable test harness. You don’t need Directory access or bank sandboxes to run them; the suite plays the OP/bank and you play the RP. This is how you prove protocol correctness and later submit for certification.&#x20;
* Directory Sandbox:
* The Open Finance Directory has a sandbox environment (with its own PKI) where you can register software, get a sandbox software\_id, mint SSAs, and even issue sandbox certs for your apps. Access is via the Directory’s sandbox UI/APIs.
* What this gives you: the ability to try the DCR flow against sandbox ASPSPs that are listed, using sandbox BRCAC/BRSEAL issued by the Directory sandbox.
* Production Directory & Banks:
* To appear as a participant and call production ASPSPs you must be authorized by the Central Bank for the relevant role (e.g., ITP) and onboard in the production Directory. The Directory and specs explicitly say participants register according to regulatory roles, reflecting BCB authorization.&#x20;
* Many programs/banks expect you to show an OpenID/FAPI certificate (from the OIDF), especially at go-live. (OpenID’s program is the standard way to demonstrate conformance.)

Suggested Order of work:

1. Build the client with FAPI-BR features (PAR, JAR, JARM, PKCE; token client-auth via mTLS or private\_key\_jwt).
2. Run the OIDF Brazil RP test plan end-to-end to flush out protocol issues early (no Directory needed).&#x20;
3. Directory Sandbox onboarding (if you want end-to-end with “realistic” Directory flows):
4. Register org/
5. software → get sandbox software\_id;
6. Publish your JWKS;
7. Mint SSA → perform DCR against sandbox ASPSPs;
8. Use sandbox PKI for mTLS/signing.
9. Regulatory & production readiness (in parallel): obtain Central Bank authorization for ITP role (if not already), register in production Directory, and prepare your OIDF RP certification submission package.
