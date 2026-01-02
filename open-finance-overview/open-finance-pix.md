---
description: What it is, Why it matters, and how Pix fits
---

# Open Finance - Pix

**Open Finance** is a consent-based framework where people and businesses are securely sharing financial data and initiating services (like payments) through standard APIs across regulated institutions. It is set by the Central Bank of Brazil (BCB) and governed by an official Directory that issues software credentials (SSAs) and enforces trust.

At its core, Open Finance is standardizing **how data is moving** (with OpenID/FAPI-BR security profiles) and **how services are starting** (e.g., payment initiation) so that customers are choosing providers freely and moving between them without friction. Brazil’s model is broad—beyond “open banking”—covering payments, credit, investments, insurance, FX and more.

### Why Brazil needs Open Finance

<table data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>Competition &#x26; choice</strong></td><td>The BCB frames Open Finance as a structural reform to promote competition, efficiency and data security, by opening access to customer-permissioned data and services</td></tr><tr><td><strong>Inclusion at scale</strong></td><td>Adoption is now measured in millions of participating accounts and consents, enabling cheaper credit, smarter underwriting and personalized financial tools</td></tr><tr><td><strong>Interoperability with real-time payments</strong></td><td>Payment Initiation including Pix and boletos, so account-to-account flows are happening without card rails and with strong customer consent.</td></tr></tbody></table>

### Where Pix comes in

**Pix** is Brazil’s real-time payment rail, fully operational since **November 16, 2020**. It is running 24/7, moving funds instantly between accounts and becoming the default way to pay across the country.

Open Finance adds a **standardized initiation layer** on top of Pix: regulated **Payment Initiators** (PISP/PTI/ITP) are starting Pix transfers directly from the customer’s bank account with explicit consent. A Payment Initiator is defined by BCB as a licensed provider that **does not hold accounts or customer funds**—it only initiates the payment.

#### Traditional Pix vs Open Finance Pix

* **Traditional Pix** is starting inside the **payer’s bank app** (QR, copy-and-paste, Pix key). You switch apps, authenticate at the bank, and the bank executes the transfer.
* **Open Finance Pix** is starting inside a **Payment Initiator (ITP/PTI/PISP)** that talks to the bank over regulated APIs with the customer’s **consent**. It works as redirect **or** (after enrollment) **redirectless/biometric**.

#### Why Open Finance Pix is needed

* **Less friction → higher conversion:** Open Finance lets payments start where the purchase happens; JSR removes the app switch entirely.
* **Standardized, consented initiation:** Regulated **payment initiation** APIs (FAPI-BR) give a uniform way to request, authorize, and track Pix—bank by bank.
* **Device-bound, phishing-resistant auth:** Pix JSR uses **FIDO2/WebAuthn** so credentials are staying on device; the bank still decides approve/deny.
* **Recurring ready:** Pix Automático (live from **June 16, 2025**) brings card-like subscriptions to A2A; Open Finance provides the consent rails to run it.
* **New experiences:** BCB is enabling **tap-to-pay Pix** and **simplified journeys** via Open Finance, which rely on the same consented initiation fabric.

