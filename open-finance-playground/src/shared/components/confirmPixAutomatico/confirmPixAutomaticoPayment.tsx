"use client";
import Image from "next/image";
import Footer from "@/shared/components/Footer/Footer";
import Layout from "@/shared/components/layout/Layout";
import style from "./confirmPixAutomatico.module.css";
import { useRouter} from "next/navigation";
import { useEffect } from "react";
import { useBiometricAuth } from "@/shared/hooks/useBiometricAuth";


interface PaymentActionProps {
  total: string;
  itemCount: string;
  paymentMethod: string;
  auth?: string;
  setIsPopupVisible? : React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmPixAutomatico: React.FC<PaymentActionProps> = ({ total, itemCount, paymentMethod, auth = "false", setIsPopupVisible=()=>{} }) => {
    const router = useRouter();
    const { handleAuth } = useBiometricAuth();

    useEffect(() => {
        if (auth === "true") {
            const callback = () => {
              router.push(`/pages/pixBiometrico/paymentPage?total=${total}&items=${itemCount}&auth=failed`);
            }
            handleAuth(Number(total), Number(itemCount), () => {}, false, callback)
        } else {
            const authenticateAndRedirect = async () => {
        
                const authSuccessful = await handleAuth(
                    Number(total),
                    Number(itemCount),
                    setIsPopupVisible,
                    false
                );

                if (authSuccessful) {    
                        router.push(`/pages/successPage?total=${total}&items=${itemCount}&paymentMethod=${paymentMethod}`);
                }
            };
        
            authenticateAndRedirect();
        }
    }, [router, auth, total, itemCount, paymentMethod, handleAuth]);
    
  return (
    <Layout
      header={<></>}
      content={
        <div className={style.container}>
          <div className={style.textContainer}>
          <Image src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spin} />
            <div className={style.desc}>Confirmando pagamento</div>
            <div className={style.subdesc}>Conectado com a instituição via Open Finance</div>
          </div>
        </div>
      }
      footer={<Footer />}
    />
  );
};

export default ConfirmPixAutomatico;
