"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useBiometricAuth = () => {
  const authStartedRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAuth = async (total: number, itemCount: number, setIsSuccessPopupVisible:React.Dispatch<React.SetStateAction<boolean>>, clickToPay? : boolean, failureCallback ? : any): Promise<boolean> => {
    const base64urlToUint8Array = (base64url: string) => {
      const base64 = base64url
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(base64url.length + (4 - (base64url.length % 4)) % 4, "=");
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };
  
    if (authStartedRef.current) return false;
    authStartedRef.current = true;
  
    try {
      const storedCredId = clickToPay ? localStorage.getItem("clickToPay_cred_id"): localStorage.getItem("biometric_cred_id");
      if (!storedCredId || !window.PublicKeyCredential) {
        alert("Nenhum dado biométrico encontrado ou não suportado.");
        setIsSuccessPopupVisible(false)
        failureCallback?.();
        return false;
      }
  
      const allowCredentials: PublicKeyCredentialDescriptor[] = [
        {
          id: base64urlToUint8Array(storedCredId),
          type: "public-key",
          transports: ["internal"],
        },
      ];
  
      const publicKey: PublicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from("random-challenge-login", (c) => c.charCodeAt(0)), // Demo-only static challenge — not for production use
        timeout: 60000,
        allowCredentials,
        userVerification: "required",
      };
      const inputValue = searchParams.get("inputValue");
      const assertion = await navigator.credentials.get({ publicKey });
      if (!assertion) throw new Error("Authentication returned null");
  
      clickToPay ? router.push(
        `/pages/successPage?total=${total}&items=${itemCount}&paymentMethod=Itau%20Cartão%20de%20crédito&inputValue=${inputValue}`
      ):router.push(
      `/pages/successPage?total=${total}&items=${itemCount}&paymentMethod=Pix%20Biometrico`  
      );
  
      return true;
    } catch (err) {
      if (failureCallback) {
        failureCallback();
      }
      setIsSuccessPopupVisible(false);
      console.error("Biometric auth failed:", err);
      return false;
    } finally {
      authStartedRef.current = false;
    }
  };
  

  return { handleAuth };
};
