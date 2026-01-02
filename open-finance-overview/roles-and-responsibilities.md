---
description: Who does what across the payment journey
---

# Roles & Responsibilities

When a customer makes a payment, at least three key players are involved:

1. **The Merchant (Lojista):** Your business. You want to sell a product or service.
2. **The ASPSP (Account Servicing Payment Service Provider)**: The customer's bank or financial institution. This is the Account Holder where the customer's money is.
3. **The ITP (Initiator of Transaction of Payments)**: The ITP is the "conductor" of the orchestra, connecting your checkout (Merchant) to the customer's bank (ASPSP) to start the payment.



Let's break down the ownership for each step of the journey.

### The Customer Journey: Who owns what?

Here is the step-by-step flow of a payment initiation and who is responsible for each part of the process.

#### 1. Consent & Authentication

* **What it is**: The customer agrees to let the ITP initiate a payment/or consent from their bank account. This is where the customer is redirected to their bank's environment (app or web) to approve the specific transaction.
* **Who does what:**
  * **Merchant**: Presents the payment option.
  * **ITP** : Generates the payment order and securely redirects the customer to their bank.
  * **ASPSP (Bank)**: Is Accountable for securely authenticating its own customer and capturing their explicit consent.

#### 2. Device Binding (In case of Biometric/JSR)

* **What it is**: Creating an **enrollment** that links a customer’s account to a specific device and to an **Initiator (ITP)**, so future payment consents are authorizing **inside the ITP channel** without redirect. The **bank (ASPSP)** is still owning the customer authentication and is delegating the FIDO2 ceremony to the ITP; a bilateral contract is governing this delegation.
* **Who does what:**
  * **ASPSP (Bank)**: Operating the **Enrollments** APIs and issuing FIDO **registration/sign options**; validating FIDO assertions and deciding approve/deny. Remaining responsible for **customer authentication** and risk policy; setting/returning **limits** (daily/transaction) and **expiration** for the enrollment.
  * **ITP**: Acting as the **FIDO Relying Party** in the JSR flow, **hosting WebAuthn** with the options received from the bank; sending platform context and a per-app **deviceId** (fingerprint) when requested. **Collecting risk signals** and posting them to the bank; keeping enrollment status **in sync** via polling/webhooks. Maintaining required **certifications** (e.g., FAPI **RP**), per governance.

#### 3. Payment Initiation

* What it is: After consent, the ITP sends the actual payment instruction (e.g., a Pix) to the ASPSP.
* Who does what:
  * **ITP** : Is Accountable for technically creating and sending the payment instruction correctly, securely, and in compliance with all BCB standards.
  * **ASPSP (Bank)**: Is Responsible for receiving and processing this instruction.

#### 4. Settlement & Confirmation

* What it is: The money moves. The ASPSP debits the customer's account and credits the merchant's account via the Pix infrastructure. The ITP then needs to confirm this success back to the merchant.
* Who does what:
  * **ASPSP (Bank)**: Is Accountable for the actual settlement, —the movement of funds through the SPI rails.
  * **ITP**: Is Responsible for listening for the "success" or "fail" message from the bank and immediately informing the Merchant. This is what allows you to show the "Payment Approved" screen.
