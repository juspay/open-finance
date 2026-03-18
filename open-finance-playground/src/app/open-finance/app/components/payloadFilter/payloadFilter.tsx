"use client";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./payloadFilter.module.css";
import PayloadCard from "../PayloadCards/PayloadCards";

type PayloadFilterProps = {
  currentState: number;
  selectedFlow?: "pisp" | "bio";
  
};

type Payload = {
  stepTitle: string;
  time: string;
  method?: string;
  url?: string;
  requestHeaders?: Record<string, any> | string;
  requestBody?: Record<string, any> | string;
  responseBody?: Record<string, any> | string;
};

const getLogTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const PayloadFilter = ({ currentState, selectedFlow }: PayloadFilterProps) => {
  const { t } = useTranslation();
  
  const now = useMemo(() => new Date(), []);
  const nowUnix = Math.floor(now.getTime() / 1000);
  const futureUnix = nowUnix + 900;
  const currentISODate = now.toISOString().split("T")[0];
  
  const getCurrentISOTime = () => now.toISOString().replace(/\.\d{3}Z$/, 'Z');
  const currentISOTime = getCurrentISOTime();
  const logTime = getLogTime(); 
  
  // All URLs below (*.mockbank.poc.raidiam.io) are public Open Banking sandbox endpoints used for demo purposes only.
  const DYNAMIC_CONSENT_ID = "urn:raidiambank:7ead4b65-58f1-4afa-82d4-dcd7d2f35c14";
  const DYNAMIC_END_TO_END_ID = "E44353942" + Date.now().toString().slice(-10); // Simple dynamic ID
  
  
  const payloadMapBio  : Record<number, Payload[]> = {
    1: [{
      stepTitle: t("auditTrail.step1_fetch"),
      time: logTime,
      requestHeaders:
        "curl --location 'https://data.directory.openbankingbrasil.org.br/participants'",
    }, ],
    5: [{
      stepTitle: t("auditTrail.step2_token"),
      time: logTime,
      method: "POST",
      url: "https://matls-auth.mockbank.poc.raidiam.io/token",
      requestHeaders: {
        "Authorization": "Bearer sampleTokenYk65uGas_go3z9esqLlRdU2V8GecmY5T",
        "Content-Type": "application/jwt",
        "x-idempotency-key": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
        "x-fapi-interaction-id": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee"
      },
      requestBody: {
        "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments",
        "jti": "73d1b509-e63f-48bc-824b-97a5ebe546f8",
        "data": {
          "permissions": [
            "PAYMENTS_INITIATE"
          ],
          "loggedUser": {
            "document": {
              "rel": "CPF",
              "identification": "user_cpf"
            }
          }
        },
        "iat": 1758808996,
        "iss": "dcr_client_id"
      },
      responseBody: {
        "token_type": "Bearer",
        "expires_in": 900,
        "scope": "payments",
        "access_token": "sampleTokenYk65uGas_go3z9esqLlRdU2V8GecmY5T"
      },
    },
    {
        stepTitle: t("auditTrail.bio_step3_enrollment"),
        time: logTime,
        method: "POST",
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments",
        requestHeaders: {
            "Authorization": "Bearer sampleTokenYk65uGas_go3z9esqLlRdU2V8GecmY5T",
            "Content-Type": "application/jwt",
            "x-idempotency-key": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
            "x-fapi-interaction-id": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee"
        },
        requestBody: {
          "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments",
          "jti": "73d1b509-e63f-48bc-824b-97a5ebe546f8",
          "data": {
            "permissions": [
              "PAYMENTS_INITIATE"
            ],
            "loggedUser": {
              "document": {
                "rel": "CPF",
                "identification": "user_cpf"
              }
            }
          },
          "iat": 1758808996,
          "iss": "dcr_client_id"
        },
        responseBody: {
          "aud": "your_org_id",
          "data": {
            "enrollmentId": "urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2",
            "creationDateTime": "2025-09-25T14:03:19Z",
            "status": "AWAITING_RISK_SIGNALS",
            "statusUpdateDateTime": "2025-09-25T14:03:19Z",
            "permissions": [
              "PAYMENTS_INITIATE"
            ],
            "expirationDateTime": "2025-09-25T14:08:19Z",
            "loggedUser": {
              "document": {
                "identification": "user_cpf",
                "rel": "CPF"
              }
            }
          },
          "meta": {
            "requestDateTime": "2025-09-25T14:03:19Z"
          },
          "iss": "bank_org_id",
          "links": {
            "self": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2"
          },
          "iat": 1758808999,
          "jti": "860b46a5-7255-4c27-aef9-a6cbf0401558"
          },
      },
      {
        stepTitle: t("auditTrail.bio_step4_risk"),
        time: logTime,
        method: "POST",
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/risk-signals",
        requestHeaders: {
             "Authorization": "Bearer sampleTokenYk65uGas_go3z9esqLlRdU2V8GecmY5T",
            "Content-Type": "application/jwt",
            "x-idempotency-key": "6b4a7df9-823d-455d-8f5a-c9da808e26ed",
            "x-fapi-interaction-id": "6b4a7df9-823d-455d-8f5a-c9da808e26ed"
        },
        requestBody: {
          "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/risk-signals",
          "jti": "13bdb4d0-7332-4f85-89bc-89d4db3c10d5",
          "data": {
            "isCharging": true,
            "isUsbConnected": false,
            "isDevModeEnabled": false,
            "isEmulated": false,
            "screenBrightness": 0.8,
            "isMonkeyRunner": false,
            "screenDimensions": {
              "height": 1920,
              "width": 1080
            },
            "deviceId": "a45e454a-7226-431f-bd33-97c4a6d51367",
            "elapsedTimeSinceBoot": 123456,
            "isRootedDevice": false,
            "userTimeZoneOffset": "-03:00",
            "osVersion": "Android 13",
            "geolocation": {
              "longitude": -46.6388,
              "type": "FINE",
              "latitude": -23.5489
            },
            "language": "pt-BR",
            "accountTenure": "2024-01-01"
          },
          "iat": 1758808999,
          "iss": "dcr_client_id"
        },
        responseBody: {
          },
      },
      {
        stepTitle: t("auditTrail.bio_step5_par"),
        time: logTime,
        method: "POST",
        url: "https://matls-auth.mockbank.poc.raidiam.io/request",
        requestHeaders: {
              "Content-Type": "application/x-www-form-urlencoded",
              "x-idempotency-key": "56b66cce-bdf9-4174-b479-806616c50ea6",
              "x-fapi-interaction-id": "56b66cce-bdf9-4174-b479-806616c50ea6"
        },
        requestBody: {
          "client_assertion": 
              {
                "sub": "dcr_client_id",
                "aud": "https://auth.mockbank.poc.raidiam.io",
                "jti": "2526e4fd-cf97-4320-9213-01b23027fe11",
                "iat": 1758808850,
                "iss": "dcr_client_id",
                "exp": 1758809750
              },//jwt-encrypted,
              "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              "request":
              {
                "nbf": 1758808850,
                "redirect_uri": "your_url_that_the_bank_redirects_to",
                "code_challenge": "eyHmNSGHyyW91har__GhL9q16SSKckhYDCGdNcnq6Oc",
                "code_challenge_method": "S256",
                "aud": "https://auth.mockbank.poc.raidiam.io",
                "jti": "6a22f37a-542b-40ac-9aad-e74d9b5050b8",
                "claims": {
                  "id_token": {
                    "acr": {
                      "essential": true
                    }
                  }
                },
                "iat": 1758808850,
                "response_type": "code id_token",
                "state": "f281f4fe3d58f08e722f92cef125a0a3d5e084df2e6026e1ae0216d0b7f4aad3",
                "scope": "openid enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2 payments nrp-consents",
                "iss": "your_client_id_for_that_bank",
                "nonce": "4269475ff76430a99ef528bec6e43f3ca1760b13386150ea377c8fa7372d3d57",
                "exp": 1758809750,
                "response_mode": "fragment",
                "client_id": "dcr_client_id"
                      },
        responseBody: {
            "request_uri": "urn:ietf:params:oauth:request_uri:u7XBKOduooCHnYpOpAayn",
            "expires_in": 60
          },
      },},
      {
      stepTitle: t("auditTrail.bio_step6_redirect"),
      time: logTime,
      requestHeaders:
        "authorization_endpoint/?client_id&request_uri&scope",
    },
  ],
    6: [
      {
        stepTitle: t("auditTrail.bio_step7_redirect_back"),
        time: logTime,
        requestHeaders: "redirect_uri/#code&state",
      },
      {
        stepTitle: t("auditTrail.bio_step8_token"),
        time: logTime,
        method: "POST",
        url: "https://matls-auth.mockbank.poc.raidiam.io/token",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "a9614d46-6dbe-4c47-9269-6d725b9690ce",
          "x-fapi-interaction-id": "a9614d46-6dbe-4c47-9269-6d725b9690ce"
        },
        requestBody: {
                "client_assertion":  {
                      "sub": "dcr_client_id",
                      "aud": "https://matls-auth.mockbank.poc.raidiam.io/token",
                      "jti": "3c50dbeb-ba9f-4fc5-9d93-bc8bb959b646",
                      "iat": 1758808896,
                      "iss": "dcr_client_id",
                       "exp": 1758809796
                 }, //jwt-encrypted
              "grant_type": "authorization_code", 
              "code_verifier": "41756caa61c3a30eb110c0e84dcdf320ac310ff11656",
                "redirect_uri": "<your_redirection_uri>",
                "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
                "scope": "openid payments enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2 nrp-consents",
                "code": "Y7jEffnQ7zmheJj8CIouGWfoGOD5qbEOHdzgRTwm4ob", //auth code from bank received in redirection response
                "client_id": "dcr_client_id"
        },
        responseBody: {
            "token_type": "Bearer",
             "expires_in": 900,
              "id_token":
       {
               "sub": "<user_id_from_bank>",
                "acr": "urn:brasil:openbanking:loa2",
                "nonce":"b236cd2a4e6210936c50914f78572615f48bedaded50687f5147361aa0bdce91",
               "at_hash": "C0LdGzLnzZTMTuT3iCzbQg",
               "aud": "dcr_client_id",
                "exp": 1758812625,
                   "iat": 1758809025,
                   "iss": "https://auth.mockbank.poc.raidiam.io"
},
              "scope": "openid payments consent:urn:raidiambank:7ead4b65-58f1-4afa-82d4-dcd7d2f35c14",
               "access_token": "d-KQWBYgRLwFayP1AWlnTM5w9Qa3vZNCXdJ5AC-mGAH",
               "refresh_token": "ZPCkRvbl2D7FwN64D2o4Xjn4e3VmCNTXPLT3mI1Ydei"
}
,
      },
      {
        stepTitle: t("auditTrail.bio_step9_fido"),
        time: logTime,
        method: "POST",
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-registration-options",
        requestHeaders: {
           "Authorization": "Bearer sampleTokenFayP1AWlnTM5w9Qa3vZNCXdJ5AC-mGAH",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "a9614d46-6dbe-4c47-9269-6d725b9690ce",
          "x-fapi-interaction-id": "a9614d46-6dbe-4c47-9269-6d725b9690ce"
        },
        requestBody: {
              "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-registration-options",
              "jti": "a1f3c017-3861-49f2-88f5-113ee571d378",
              "data": {
                "platform": "ANDROID",
                "rp": "<your_rp_id>"
              },
              "iat": 1758809025,
              "iss": "dcr_client_id"
        },
        responseBody: {
            "aud": "dcr_client_id",
            "data": {
              "enrollmentId": "urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2",
              "rp": {
                "id": "<your_rp_id>",
                "name": "Raidiam Mockbank - Pipeline NRJ"
              },
              "user": {
                "id": "84674170-d988-4639-8f45-73899f7cc2c9",
                "name": "User Name",
                "displayName": "User Name"
              },
              "challenge": "eTRKbGRicmYwWFdRbnc",
              "pubKeyCredParams": [
                {
                  "alg": -257,
                  "type": "public-key"
                },
                {
                  "alg": -7,
                  "type": "public-key"
                }
              ],
              "extensions": {
                "appid": "true"
              }
            },
            "meta": {
              "requestDateTime": "2025-09-25T14:03:47Z"
            },
            "iss": "bank_auth_server_id",
            "iat": 1758809027,
            "jti": "a50522a1-3d26-4cd8-8e37-f5a07d66dc99"
              
        },
      },

    ],
    11: [
      {
        stepTitle: t("auditTrail.bio_step10_webauthn"),
        time: logTime,
      },
      {
        stepTitle: t("auditTrail.bio_step11_token"),
        time: logTime,
        method: "POST",
        url: "https://matls-auth.mockbank.poc.raidiam.io/token",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "a9614d46-6dbe-4c47-9269-6d725b9690ce",
          "x-fapi-interaction-id": "a9614d46-6dbe-4c47-9269-6d725b9690ce"
        },
        requestBody: {
                "client_assertion":  {
                      "sub": "dcr_client_id",
                      "aud": "https://matls-auth.mockbank.poc.raidiam.io/token",
                      "jti": "3c50dbeb-ba9f-4fc5-9d93-bc8bb959b646",
                      "iat": 1758808896,
                      "iss": "dcr_client_id",
                       "exp": 1758809796
                 }, //jwt-encrypted
                "grant_type": "refresh_token", 
                  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
                  "scope": "openid payments enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2 nrp-consents",
                  "refresh_token": "ZPCkRvbl2D7FwN64D2o4Xjn4e3VmCNTXPLT3mI1Ydei",
                  "client_id": "dcr_client_id"
        },
        responseBody: {
            "token_type": "Bearer",
             "expires_in": 900,
              "scope": "payments nrp-consents enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2",
              "access_token": "4gSFZdBIxgMJukUdwHvS2UcRUTIzIPh1J1BeYp7XLXD",
              "refresh_token": "ZPCkRvbl2D7FwN64D2o4Xjn4e3VmCNTXPLT3mI1Ydei"
      },
      },
      {
        stepTitle: t("auditTrail.bio_step12_register"),
        time: logTime,
        method: "POST",
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-registration",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenJukUdwHvS2UcRUTIzIPh1J1BeYp7XLXD",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "b5a39a05-c417-4de4-9b47-f569db8b1537",
          "x-fapi-interaction-id": "b5a39a05-c417-4de4-9b47-f569db8b1537"
        },
        requestBody: {
           "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-registration",
          "jti": "8bf879cf-8dfb-4931-9034-147fef628231",
          "data": {
            "authenticatorAttachment": "platform",
            "id": "tlpkSlE9cSCXC-NsaOveIg",
            "type": "public-key",
            "rawId": "tlpkSlE9cSCXC-NsaOveIg",
            "response": {
              "attestationObject": "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViUeBXC4JGEWBbfnBOY2vrmgZ6NbFTnDjCOhg61l_viVUldAAAAAOqbjWZNAR0hPOS2tIy1ddQAELZaZEpRPXEglwvjbGjr3iKlAQIDJiABIVggb_1lyEmAzz4-NzxPJQ24bSKD8AGonAhyr1DvV26xqtYiWCCYk3dhO62iEkZvL2uSBuCpMfVnWRp5s2z3UDf9f2qkMw",
              "clientDataJSON": {
          "type": "webauthn.create",
          "challenge": "eTRKbGRicmYwWFdRbnc",
          "origin": "<your_rp_id>",
          "crossOrigin": false
        } //jwt-encrypted
            }
          },
          "iat": 1758809071,
          "iss": "dcr_client_id"
        },
      },
    ],
    13: [
      {
        stepTitle: t("auditTrail.bio_step13_token"),
        time: logTime,
        url: "https://matls-auth.mockbank.poc.raidiam.io/token",
        method: "POST",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "a9614d46-6dbe-4c47-9269-6d725b9690ce",
          "x-fapi-interaction-id": "a9614d46-6dbe-4c47-9269-6d725b9690ce"
        },
        requestBody: {
          "client_assertion":  {
                      "sub": "dcr_client_id",
                      "aud": "https://matls-auth.mockbank.poc.raidiam.io/token",
                      "jti": "3c50dbeb-ba9f-4fc5-9d93-bc8bb959b646",
                      "iat": 1758808896,
                      "iss": "dcr_client_id",
                       "exp": 1758809796
                 }, //jwt-encrypted
       "grant_type": "client_credentials", 
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "scope": "payments nrp-consents",
        "client_id": "dcr_client_id"
        },
        responseBody:
        {
          "token_type": "Bearer",
          "expires_in": 900,
          "scope": "payments nrp-consents",
          "access_token": "sampleTokenlU2T9xwmp2MG4e0kRWdSyCtSLH-r7jpF"
        }
      },
      {
        stepTitle: t("auditTrail.bio_step14_consent"),
        time: logTime,
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/consents",
        method: "POST",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenlU2T9xwmp2MG4e0kRWdSyCtSLH-r7jpF",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
          "x-fapi-interaction-id": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee"
        },
        requestBody: {
          "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/consents",
          "jti": "d58efce1-7d27-45da-9351-ae93912986ee",
          "data": {
            "payment": {
              "details": {
                "creditorAccount": {
                  "issuer": "creditor_issuer",
                  "number": "creditor_account number",
                  "accountType": "CACC",
                  "ispb": "creditor_ispb"
                },
                "localInstrument": "MANU" //type is manual, unless you have dict access
              },
              "currency": "BRL",
              "amount": "1330.00",
              "type": "PIX",
              "date": "2025-09-25"
            },
            "creditor": {
              "personType": "PESSOA_JURIDICA",
              "name": "crediotor_name",
              "cpfCnpj": "creditor_cnpj"
            },
            "loggedUser": {
              "document": {
                "rel": "CPF",
                "identification": "user_cpf"
              }
            }
          },
          "iat": 1758808847,
          "iss": "dcr_client_id"
        },//jwt-encrypted
        responseBody:
        {
          "aud": "your_org_id",
          "data": {
            "consentId": "urn:raidiambank:7ead4b65-58f1-4afa-82d4-dcd7d2f35c14",
            "creationDateTime": "2025-09-25T11:00:49Z",
            "expirationDateTime": "2025-09-25T11:05:49Z",
            "statusUpdateDateTime": "2025-09-25T11:00:49Z",
            "status": "AWAITING_AUTHORISATION",
            "loggedUser": {
              "document": {
                "identification": "user_cpf",
                "rel": "CPF"
              }
            },
            "creditor": {
              "personType": "PESSOA_JURIDICA",
              "cpfCnpj": "creditor_cnpj",
              "name": "creditor_cnpj"
            },
            "payment": {
              "type": "PIX",
              "date": "2025-09-25",
              "currency": "BRL",
              "amount": "1330.00",
              "details": {
                "localInstrument": "MANU", 
                "creditorAccount": {
                  "ispb": "creditor_ispb",
                  "issuer": "creditor_issuer",
                  "number": "creditor_account number",
                  "accountType": "CACC"
                }
              }
            }
          },
          "meta": {
            "requestDateTime": "2025-09-25T11:00:50Z"
          },
          "iss": "bank_org_id",
          "iat": 1758808850,
          "jti": "0efbeb96-1396-452a-93ae-50979f29203d"
        } //jwt-encrypted

      },
      {
        stepTitle: t("auditTrail.bio_step15_sign"),
        time: logTime,
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-sign-options",
        method: "POST",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenlU2T9xwmp2MG4e0kRWdSyCtSLH-r7jpF",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "e957e796-28d5-4fdc-802a-c05b51ab140e",
          "x-fapi-interaction-id": "e957e796-28d5-4fdc-802a-c05b51ab140e"
        },
        requestBody: {
           "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/enrollments/urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2/fido-sign-options",
            "jti": "bbe9fb00-2552-4a4b-919a-3d036321d0ae",
            "data": {
              "platform": "ANDROID",
              "consentId": "urn:raidiambank:0cba8903-7555-4581-8d64-d140b365abaf",
              "rp": "<your_rp_id>"
            },
            "iat": 1758809139,
            "iss": "dcr_client_id"
         
        },
        responseBody:
        {
           "aud": "dcr_client_id",
  "data": {
    "challenge": "Z3VrYmpWUmJIckQ5aWc",
    "rpId": "<your_rp_id>"
  },
  "meta": {
    "requestDateTime": "2025-09-25T14:05:41Z"
  },
  "iss": "bank_org_id",
  "iat": 1758809141,
  "jti": "4f399726-8ee3-449b-9fed-ec2d3c40f691"
        } //jwt-encrypted

      }
    ],
    14: [
      {
        stepTitle: t("auditTrail.bio_step16_token"),
        time: logTime,
        url: "https://matls-auth.mockbank.poc.raidiam.io/token",
        method: "POST",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "a9614d46-6dbe-4c47-9269-6d725b9690ce",
          "x-fapi-interaction-id": "a9614d46-6dbe-4c47-9269-6d725b9690ce"
        },
        requestBody: {
          "client_assertion": {
                      "sub": "dcr_client_id",
                      "aud": "https://matls-auth.mockbank.poc.raidiam.io/token",
                      "jti": "3c50dbeb-ba9f-4fc5-9d93-bc8bb959b646",
                      "iat": 1758808896,
                      "iss": "dcr_client_id",
                       "exp": 1758809796
                 }, //jwt-encrypted
       "grant_type": "refresh_token", 
       "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "scope": "openid payments enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2 nrp-consents",
        "refresh_token": "ZPCkRvbl2D7FwN64D2o4Xjn4e3VmCNTXPLT3mI1Ydei",
        "client_id": "dcr_client_id"
        },
        responseBody:
        {
          "token_type": "Bearer",
          "expires_in": 900,
          "scope": "payments nrp-consents enrollment:urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2",
          "access_token": "YO9cn1wPqa_C5CyDW53NBypKtKBUSFuycR9_8n-QMJd",
          "refresh_token": "ZPCkRvbl2D7FwN64D2o4Xjn4e3VmCNTXPLT3mI1Ydei"
        }
      },
      {
        stepTitle: t("auditTrail.bio_step17_authorize"),
        time: logTime,
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/consents/urn:raidiambank:0cba8903-7555-4581-8d64-d140b365abaf/authorise",
        method: "POST",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenC5CyDW53NBypKtKBUSFuycR9_8n-QMJd",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "d11dd2b5-da85-4230-86ff-973971c14555",
          "x-fapi-interaction-id": "d11dd2b5-da85-4230-86ff-973971c14555"
        },
        requestBody: {
            "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/enrollments/v2/consents/urn:raidiambank:0cba8903-7555-4581-8d64-d140b365abaf/authorise",
  "jti": "f0c35adc-0280-4f2f-9e46-30d2a9be09b8",
  "data": {
    "riskSignals": {
      "isCharging": true,
      "isUsbConnected": false,
      "isDevModeEnabled": false,
      "isEmulated": false,
      "screenBrightness": 0.8,
      "isMonkeyRunner": false,
      "screenDimensions": {
        "height": 1920,
        "width": 1080
      },
      "deviceId": "a45e454a-7226-431f-bd33-97c4a6d51367",
      "elapsedTimeSinceBoot": 123456,
      "isRootedDevice": false,
      "userTimeZoneOffset": "-03:00",
      "osVersion": "Android 13",
      "geolocation": {
        "longitude": -46.6388,
        "type": "FINE",
        "latitude": -23.5489
      },
      "language": "pt-BR",
      "accountTenure": "2024-01-01"
    },
    "enrollmentId": "urn:raidiambank:0033cbef-0742-4d0b-be26-ceb66f2573e2",
    "fidoAssertion": {
      "id": "tlpkSlE9cSCXC-NsaOveIg",
      "type": "public-key",
      "rawId": "tlpkSlE9cSCXC-NsaOveIg",
      "response": {
        "authenticatorData": "eBXC4JGEWBbfnBOY2vrmgZ6NbFTnDjCOhg61l_viVUkdAAAAAA",
        "clientDataJSON": {
  "type": "webauthn.get",
  "challenge": "Z3VrYmpWUmJIckQ5aWc",
  "origin": "<your_rp_id>",
  "crossOrigin": false,
  "other_keys_can_be_added_here": "do not compare clientDataJSON against a template. See https://goo.gl/yabPex"
}, //jwt-encrypted,
        "signature": "MEYCIQCG1ApyMapPAbWroMzIhF1561J-9nyRaUQVlAwPXMXj_QIhAOa4rdJAGehzSU-aPWGAlBU359jqF1cMtXxHM4mX64SY",
        "userHandle": "c8dbd072-0711-4153-8cc1-5b7fee849e96"
      }
    }
  },
  "iat": 1758809185,
  "iss": "dcr_client_id"
        },
      },
       {
        stepTitle: t("auditTrail.bio_step18_payment"),
        time: logTime,
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/pix/payments",
        method: "POST",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenC5CyDW53NBypKtKBUSFuycR9_8n-QMJd",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "6983ea6d-51c5-40d5-b7ff-380de0e0dd25",
          "x-fapi-interaction-id": "6983ea6d-51c5-40d5-b7ff-380de0e0dd25"
        },
        requestBody: {
            "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/pix/payments",
            "jti": "c4f1f727-5024-4641-bc88-756dfe28db8e",
            "data": [
              {
                "payment": {
                  "currency": "BRL",
                  "amount": "1330.00"
                },
                "cnpjInitiator": "initiator_cnpj",
                "consentId": "urn:raidiambank:7ead4b65-58f1-4afa-82d4-dcd7d2f35c14",
                "creditorAccount": {
                  "issuer": "3100",
                  "number": "creditor_bank_account",
                  "accountType": "CACC",
                  "ispb": "creditor_ispb"
                },
                "endToEndId": "E443539422025092514011ad065c956b",
                "authorisationFlow": "FIDO_FLOW",
                "localInstrument": "MANU"
              }
            ],
            "iat": 1758808899,
            "iss": "dcr_client_id"
        },
        responseBody:
        {
          "aud": "your_org_id",
          "data": [
            {
            "paymentId": "1f8af73f-927d-4cd0-9309-5d0228f775ad",
            "endToEndId": "E443539422025092514011ad065c956b",
            "consentId": "urn:raidiambank:7ead4b65-58f1-4afa-82d4-dcd7d2f35c14",
            "creationDateTime": "2025-09-25T14:01:43Z",
            "statusUpdateDateTime": "2025-09-25T14:01:43Z",
            "status": "RCVD",
            "localInstrument": "MANU",
            "cnpjInitiator": "initiator/your_cnpj",
            "payment": {
              "amount": "1330.00",
              "currency": "BRL"
            },
            "creditorAccount": {
              "ispb": "creditor_ispb",
              "issuer": "3100",
              "number": "creditor_bank_account",
              "accountType": "CACC"
            },
            "debtorAccount": {
              "ispb": "debitor/user_ispb",
              "issuer": "6272",
              "number": "debitor/user_bank_account",
              "accountType": "CACC"
            },
            "authorisationFlow": "HYBRID_FLOW"
          }
        ],
        "meta": {
          "requestDateTime": "2025-09-25T11:01:43Z"
        },
        "iss": "bank_org_id",
        "iat": 1758808903,
        "jti": "bd3821e5-2d0d-4f03-aa92-bb6c3d946fb1"
        }
      },
      {
        stepTitle: t("auditTrail.bio_step19_poll"),
        time: logTime,
        url: "/open-banking/payments/v4/pix/payments/{paymentId}",
        method: "GET",
        requestBody: {
            "aud": "your_org_id",
            "data": {
              "paymentId": "858fed10-62c0-422d-9aa4-0d484e99b0d0",
              "endToEndId": "E443539422025092514011ad065c956b",
              "consentId": "urn:raidiambank:0cba8903-7555-4581-8d64-d140b365abaf",
              "creationDateTime": "2025-09-25T14:06:29Z",
              "statusUpdateDateTime": "2025-09-25T14:06:29Z",
              "status": "ACSC",
              "localInstrument": "MANU",
              "cnpjInitiator": "initiator/your_cnpj",
              "payment": {
                "amount": "1330.00",
                "currency": "BRL"
              },
              "creditorAccount": {
                  "ispb": "creditor_ispb",
                  "issuer": "3100",
                  "number": "creditor_bank_account",
                  "accountType": "CACC"
                },
                "debtorAccount": {
                  "ispb": "debitor/user_ispb",
                  "issuer": "6272",
                  "number": "debitor/user_bank_account",
                  "accountType": "CACC"
                },
                "authorisationFlow": "FIDO_FLOW"
            },
            "meta": {
              "requestDateTime": "2025-09-25T11:07:26Z"
            },
            "iss": "bank_org_id",
            "links": {    
          "self": "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/pix/payments/858fed10-62c0-422d-9aa4-0d484e99b0d0"  
          },
            "iat": 1758809246,
            "jti": "03cbb1fe-85ba-4084-b0a4-d6f7c86ae7f0"
        },
      }
    ]
  };

  const payloadMap: Record<number, Payload[]> = {
    1: [{
      stepTitle: t("auditTrail.step1_fetch"),
      time: logTime,
      requestHeaders:
        "curl --location 'https://data.directory.openbankingbrasil.org.br/participants'",
    }, ],
    5: [{
      stepTitle: t("auditTrail.step2_token"),
      time: logTime,
      method: "POST",
      url: "https://matls-auth.mockbank.poc.raidiam.io/token",
      requestHeaders: {
        Authorization:
          "Bearer sampleTokenDY_CJFgp-bXAq_uqyHIT752P_uRmLJOK",
        "Content-Type": "application/jwt",
        "x-idempotency-key": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
        "x-fapi-interaction-id": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
      },
      requestBody: {
        aud: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/consents",
        jti: "d58efce1-7d27-45da-9351-ae93912986ee",
        data: {
          payment: {
            details: {
              creditorAccount: {
                issuer: "creditor_issuer",
                number: "creditor_account number",
                accountType: "CACC",
                ispb: "creditor_ispb",
              },
              localInstrument: "MANU",
            },
            currency: "BRL",
            amount: "567.00",
            type: "PIX",
            date: currentISODate, // DYNAMIC
          },
          creditor: {
            personType: "PESSOA_JURIDICA",
            name: "crediotor_name",
            cpfCnpj: "creditor_cnpj",
          },
          loggedUser: {
            document: {
              rel: "CPF",
              identification: "user_cpf",
            },
          },
        },
        iat: nowUnix, // DYNAMIC
        iss: "dcr_client_id",
      },
      responseBody: {
        aud: "your_org_id",
        data: {
          consentId: DYNAMIC_CONSENT_ID,
          creationDateTime: currentISOTime, // DYNAMIC
          expirationDateTime: new Date(now.getTime() + 5 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, 'Z'), // DYNAMIC + 5 mins
          statusUpdateDateTime: currentISOTime, // DYNAMIC
          status: "AWAITING_AUTHORISATION",
          loggedUser: {
            document: {
              identification: "user_cpf",
              rel: "CPF",
            },
          },
          creditor: {
            personType: "PESSOA_JURIDICA",
            cpfCnpj: "creditor_cnpj",
            name: "creditor_cnpj",
          },
          payment: {
            type: "PIX",
            date: currentISODate, // DYNAMIC
            currency: "BRL",
            amount: "567.00",
            details: {
              localInstrument: "MANU",
              creditorAccount: {
                ispb: "creditor_ispb",
                issuer: "creditor_issuer",
                number: "creditor_account number",
                accountType: "CACC",
              },
            },
          },
        },
        meta: {
          requestDateTime: currentISOTime, // DYNAMIC
        },
        iss: "bank_org_id",
        iat: nowUnix + 5, // DYNAMIC
        jti: "0efbeb96-1396-452a-93ae-50979f29203d",
      },
    }, ],
    7: [
      {
        stepTitle: t("auditTrail.pisp_step3_consent"),
        time: logTime,
        method: "POST",
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/consents",
        requestHeaders: {
          Authorization:
            "Bearer sampleTokenDY_CJFgp-bXAq_uqyHIT752P_uRmLJOK",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
          "x-fapi-interaction-id": "c267c06b-0ea1-4e2a-a2c5-09de6c8133ee",
        },
        requestBody: {
          aud: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/consents",
          jti: "d58efce1-7d27-45da-9351-ae93912986ee",
          data: {
            payment: {
              details: {
                creditorAccount: {
                  issuer: "creditor_issuer",
                  number: "creditor_account number",
                  accountType: "CACC",
                  ispb: "creditor_ispb",
                },
                localInstrument: "MANU",
              },
              currency: "BRL",
              amount: "567.00",
              type: "PIX",
              date: currentISODate, // DYNAMIC
            },
            creditor: {
              personType: "PESSOA_JURIDICA",
              name: "crediotor_name",
              cpfCnpj: "creditor_cnpj",
            },
            loggedUser: {
              document: {
                rel: "CPF",
                identification: "user_cpf",
              },
            },
          },
          iat: nowUnix, // DYNAMIC
          iss: "dcr_client_id",
        },
        responseBody: {
          aud: "your_org_id",
          data: {
            consentId: DYNAMIC_CONSENT_ID,
            creationDateTime: currentISOTime, // DYNAMIC
            expirationDateTime: new Date(now.getTime() + 5 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, 'Z'), // DYNAMIC + 5 mins
            statusUpdateDateTime: currentISOTime, // DYNAMIC
            status: "AWAITING_AUTHORISATION",
            loggedUser: {
              document: {
                identification: "user_cpf",
                rel: "CPF",
              },
            },
            creditor: {
              personType: "PESSOA_JURIDICA",
              cpfCnpj: "creditor_cnpj",
              name: "creditor_cnpj",
            },
            payment: {
              type: "PIX",
              date: currentISODate, // DYNAMIC
              currency: "BRL",
              amount: "567.00",
              details: {
                localInstrument: "MANU",
                creditorAccount: {
                  ispb: "creditor_ispb",
                  issuer: "creditor_issuer",
                  number: "creditor_account number",
                  accountType: "CACC",
                },
              },
            },
          },
          meta: {
            requestDateTime: currentISOTime, // DYNAMIC
          },
          iss: "bank_org_id",
          iat: nowUnix + 5, // DYNAMIC
          jti: "0efbeb96-1396-452a-93ae-50979f29203d",
        },
      },
      {
        stepTitle: t("auditTrail.pisp_step4_par"),
        time: logTime,
        method: "POST",
        url: "https://matls-auth.mockbank.poc.raidiam.io/request",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "56b66cce-bdf9-4174-b479-806616c50ea6",
          "x-fapi-interaction-id": "56b66cce-bdf9-4174-b479-806616c50ea6",
        },
        requestBody: {
          client_assertion: {
            sub: "dcr_client_id",
            aud: "https://auth.mockbank.poc.raidiam.io",
            jti: "2526e4fd-cf97-4320-9213-01b23027fe11",
            iat: nowUnix + 5, // DYNAMIC
            iss: "dcr_client_id",
            exp: futureUnix, // DYNAMIC
          },
          client_assertion_type:
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          request: {
            nbf: nowUnix + 5, // DYNAMIC
            redirect_uri: "your_url_that_the_bank_redirects_to",
            code_challenge:
              "eyHmNSGHyyW91har__GhL9q16SSKckhYDCGdNcnq6Oc",
            code_challenge_method: "S256",
            aud: "https://auth.mockbank.poc.raidiam.io",
            jti: "6a22f37a-542b-40ac-9aad-e74d9b5050b8",
            claims: {
              id_token: {
                acr: {
                  essential: true,
                },
              },
            },
            iat: nowUnix + 5, // DYNAMIC
            response_type: "code id_token",
            state:
              "f281f4fe3d58f08e722f92cef125a0a3d5e084df2e6026e1ae0216d0b7f4aad3",
            scope:
              `openid consent:${DYNAMIC_CONSENT_ID} payments`, // DYNAMIC
            iss: "your_client_id_for_that_bank",
            nonce:
              "4269475ff76430a99ef528bec6e43f3ca1760b13386150ea377c8fa7372d3d57",
            exp: futureUnix, // DYNAMIC
            response_mode: "fragment",
            client_id: "dcr_client_id",
          },
          client_id: "dcr_client_id",
        },
        responseBody: {
          request_uri:
            "urn:ietf:params:oauth:request_uri:1jtQzXaPbPmxhq-Hb_2kJ",
          expires_in: 60,
        },
      },

    ],
    11: [
      {
        stepTitle: t("auditTrail.pisp_step5_redirect"),
        time: logTime,
        url: "authorization_endpoint/?client_id&request_uri&state"
      }
    ],
    12: [
      {
        stepTitle: t("auditTrail.pisp_step6_token"),
        time: logTime,
        url: "https://matls-auth.mockbank.poc.raidiam.io/token",
        method: "POST",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "2e2fbf85-4ee2-48b1-b0b1-c96a520b0a86",
          "x-fapi-interaction-id": "2e2fbf85-4ee2-48b1-b0b1-c96a520b0a86"
        },
        requestBody: {
          client_assertion: {
            "sub": "dcr_client_id",
            "aud": "https://matls-auth.mockbank.poc.raidiam.io/token",
            "jti": "3c50dbeb-ba9f-4fc5-9d93-bc8bb959b646",
            "iat": nowUnix + 47, // DYNAMIC
            "iss": "dcr_client_id",
            "exp": futureUnix, // DYNAMIC
          },
          grant_type: "authorization_code",
          code_verifier: "d8d7b6eedb4c1360addc276725cef76d3fa333fccf8a",
          redirect_uri: "<your_redirection_uri>",
          client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          scope: "payments",
          code: "Y7jEffnQ7zmheJj8CIouGWfoGOD5qbEOHdzgRTwm4ob", 
          client_id: "dcr_client_id"
        },
        responseBody:
        {
          "token_type": "Bearer",
          "expires_in": 900,
          "id_token": "",
          "scope": `openid payments consent:${DYNAMIC_CONSENT_ID}`, // DYNAMIC
          "access_token": "wxzxOTHRk0AZ8XC3nZLIP-WzCSUoEKDHmzOZsruzbIs",
          "refresh_token": "I_J7h6vViDRl4u5XdzZ6xjd-WgAP4XpLX2nRasbf0X-"
        }
      }
    ],
    13: [
      {
        stepTitle: t("auditTrail.pisp_step7_payment"),
        time: logTime,
        url: "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/pix/payments",
        method: "POST",
        requestHeaders: {
          "Authorization": "Bearer sampleTokenZ8XC3nZLIP-WzCSUoEKDHmzOZsruzbIs",
          "Content-Type": "application/jwt",
          "x-idempotency-key": "6983ea6d-51c5-40d5-b7ff-380de0e0dd25",
          "x-fapi-interaction-id": "6983ea6d-51c5-40d5-b7ff-380de0e0dd25"

        },
        requestBody: {
          "aud": "https://matls-api.mockbank.poc.raidiam.io/open-banking/payments/v4/pix/payments",
          "jti": "c4f1f727-5024-4641-bc88-756dfe28db8e",
          "data": [
            {
              "payment": {
                "currency": "BRL",
                "amount": "567.00"
              },
              "cnpjInitiator": "initiator/your_cnpj",
              "consentId": DYNAMIC_CONSENT_ID, // DYNAMIC
              "creditorAccount": {
                "issuer": "3100",
                "number": "creditor_bank_account",
                "accountType": "CACC",
                "ispb": "creditor_ispb"
              },
              "endToEndId": DYNAMIC_END_TO_END_ID, // DYNAMIC
              "authorisationFlow": "HYBRID_FLOW",
              "localInstrument": "MANU"
            }
          ],
          "iat": nowUnix + 50, // DYNAMIC
          "iss": "dcr_client_id"
        },
        responseBody:
        {
          "aud": "your_org_id",
          "data": [
            {
              "paymentId": "1f8af73f-927d-4cd0-9309-5d0228f775ad",
              "endToEndId": DYNAMIC_END_TO_END_ID, // DYNAMIC
              "consentId": DYNAMIC_CONSENT_ID, // DYNAMIC
              "creationDateTime": currentISOTime, // DYNAMIC
              "statusUpdateDateTime": currentISOTime, // DYNAMIC
              "status": "RCVD",
              "localInstrument": "MANU",
              "cnpjInitiator": "initiator/your_cnpj",
              "payment": {
                "amount": "567.00",
                "currency": "BRL"
              },
              "creditorAccount": {
                "ispb": "creditor_ispb",
                "issuer": "3100",
                "number": "creditor_bank_account",
                "accountType": "CACC"
              },
              "debtorAccount": {
                "ispb": "debitor/user_ispb",
                "issuer": "6272",
                "number": "debitor/user_bank_account",
                "accountType": "CACC"
              },
              "authorisationFlow": "HYBRID_FLOW"
            }
          ],
          "meta": {
            "requestDateTime": currentISOTime, // DYNAMIC
          },
          "iss": "bank_org_id",
          "iat": nowUnix + 54, // DYNAMIC
          "jti": "bd3821e5-2d0d-4f03-aa92-bb6c3d946fb1"
        }
      }
    ],
    14: [
      {
        stepTitle: t("auditTrail.pisp_step8_poll"),
        time: logTime,
        url: `/open-banking/payments/v4/pix/payments/{paymentId}`,
        method: "GET",
        requestHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-idempotency-key": "2e2fbf85-4ee2-48b1-b0b1-c96a520b0a86",
          "x-fapi-interaction-id": "2e2fbf85-4ee2-48b1-b0b1-c96a520b0a86"
        },

        responseBody:
        {
          "aud": "your_org_id",
          "data": {
            "paymentId": "1f8af73f-927d-4cd0-9309-5d0228f775ad",
            "endToEndId": DYNAMIC_END_TO_END_ID, // DYNAMIC
            "consentId": DYNAMIC_CONSENT_ID, // DYNAMIC
            "creationDateTime": currentISOTime, // DYNAMIC
            "statusUpdateDateTime": currentISOTime, // DYNAMIC
            "status": "ACSC",
            "localInstrument": "MANU",
            "cnpjInitiator": "initiator/your_cnpj",
            "payment": {
              "amount": "567.00",
              "currency": "BRL"
            },
            "creditorAccount": {
              "ispb": "creditor_ispb",
              "issuer": "3100",
              "number": "creditor_bank_account",
              "accountType": "CACC"
            },
            "debtorAccount": {
              "ispb": "debitor/user_ispb",
              "issuer": "6272",
              "number": "debitor/user_bank_account",
              "accountType": "CACC"
            },
            "authorisationFlow": "HYBRID_FLOW"
          },
          "meta": {
            "requestDateTime": currentISOTime, // DYNAMIC
          },
          "iss": "bank_org_id",
          "iat": nowUnix + 117, // DYNAMIC
          "jti": "03cbb1fe-85ba-4084-b0a4-d6f7c86ae7f0"
        }
      }
    ],
  };
  let paymentPayload = selectedFlow === "pisp" ? payloadMap : payloadMapBio ;
  const visiblePayloads = Object.entries(paymentPayload)
    .sort(([a], [b]) => Number(a) - Number(b))
    .flatMap(([_, steps]) => steps);

  const [selectedStep, setSelectedStep] = useState<string>("All Steps");
  
  const filteredPayloads =
    selectedStep === "All Steps"
      ? visiblePayloads
      : visiblePayloads.filter((p) => p.stepTitle === selectedStep);
  
    
  const stepOptions = [...new Set(visiblePayloads.map((p) => p.stepTitle))];
  const visiblePayloadsDesc = [...filteredPayloads].reverse();

  
  
   return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <p className={styles.label}>{t("auditTrail.title")}</p>
        {/* <select
          className={styles.dropdown}
          value={selectedStep}
          onChange={(e) => setSelectedStep(e.target.value)}
        >
          <option>All Steps</option>
          {stepOptions.map((title, i) => (
            <option key={i} value={title}>
              {title}
            </option>
          ))}
        </select> */}
      </div>

      <div className={styles.cards}>
        {Object.entries(paymentPayload)
          .sort(([a], [b]) => Number(a) - Number(b))
          .flatMap(([stepKey, steps]) =>
            steps.map((p, i) => {
              const stepNumber = Number(stepKey);
              const isActive = stepNumber <= currentState;
              return <PayloadCard key={`${stepNumber}-${i}`} {...p} highlight={isActive} />;
            })
          )
        }
      </div>
    </aside>
  );
};

export default PayloadFilter;
