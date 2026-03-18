"use client";
import { useEffect, useState } from "react";
import Button from "@/shared/components/button/button";
import style from "./appleFaceID.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

interface PopupTemplateProps {
  setCurrentPage?: React.Dispatch<React.SetStateAction<string>>;
  setIsPopupVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  prevPage?: string;
  currentPage?: string;
  setPreviousPage?: React.Dispatch<React.SetStateAction<string>>;
  setShowFaceSuccessAnim? : React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentState? : React.Dispatch<React.SetStateAction<number>>;
  currentState? : number;
}

const AppleFaceId: React.FC<PopupTemplateProps> = ({
  setCurrentPage,
  setIsPopupVisible,
  prevPage,
  currentPage,
  setPreviousPage,
  setShowFaceSuccessAnim,
  setCurrentState,
  currentState,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = searchParams.get("total") || 567;
  const items = searchParams.get("items") || 3;
  const [faceScanAnim, setFaceScanAnim] = useState<object | null>(null)

  const handleClose = () => {
    setIsPopupVisible?.(false);
    setCurrentPage?.("pixface");
    setShowFaceSuccessAnim?.(false);
    if(currentState){
     setCurrentState?.(currentState-7) 
    }
    
  };

  useEffect(() => {
    import("../../../../public/lottie/faceIdDown.json").then((module) => {
      setFaceScanAnim(module.default);
    });
  }, []);
  

  useEffect(() => {
    if (isConfirmed) {

      const redirectTimer = setTimeout(() => {
        if (currentPage === "AppleFaceId2") {
          router.push(
            `/pages/successPage?total=${total}&items=${items}&paymentMethod=Pix%20Biometrico`
          );
        } else {
          setCurrentPage?.("BiometricoActivated");
          setPreviousPage?.("AppleFaceId");
        }
      }, 4000);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [isConfirmed, setCurrentPage]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.headerText}>
          <Image
            src={"/demoapp/image/componentImages/passkey24x24.svg"}
            alt="key"
            height={24}
            width={24}
            priority
          />
          <span>Inicie a Sessão</span>
        </span>
        <span className={style.closeContainer} onClick={handleClose}>
          <Image
            src={"/demoapp/image/componentImages/xmark11x11.svg"}
            alt="x"
            height={12}
            width={12}
          />
        </span>
      </div>

      <div className={style.content}>
        <Image
          src={"/demoapp/image/ofPlayground/ios-face-id.svg"}
          alt="key"
          height={80}
          width={80}
          className={style.faceImage}
          priority
        />

        <div className={style.contentText}>
          Usar o Face ID para iniciar uma sessão?
        </div>
        <div className={style.descText}>
          Uma chave de acesso para “SN Enterprise” será salva em suas chaves do
          iCloud e estará disponível em todos os seus dispositivos.
        </div>
      </div>

      {!isConfirmed && (
        <div className={style.buttonContainer}>
          <Button text="Continuar" onClick={() => {setShowFaceSuccessAnim?.(true);setIsConfirmed(true)}} />
        </div>
      )}

      {isConfirmed && faceScanAnim && (
        <div className={style.faceIdContainer}>
          <Lottie
            loop = {false}
            animationData={faceScanAnim}
            play={true}
            speed={2.5}
            style={{
              width: 34,
              height: 34,
              display: "flex",
              alignSelf: "center",
            }}
          />
        </div>
      )}


    </div>
  );
};

export default AppleFaceId;
