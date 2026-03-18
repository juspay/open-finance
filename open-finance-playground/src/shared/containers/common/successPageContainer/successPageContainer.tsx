// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import SuccessLoader from "@/app/components/successLoader/successLoder";
// import style from "./successPageContainer.module.css";
// import Button from "@/app/components/button/button";
// import Footer from "@/app/components/Footer/Footer";
// import Layout from "@/app/components/layout/Layout";
// import Image from "next/image";


// const SuccessPageContainer = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name") || "Bruno A Oliveria";
//   const total = searchParams.get("total") || "567";
//   const paymentMethod = searchParams.get("paymentMethod") || "PIX";

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now
//       .toLocaleString("pt-BR", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       })
//       .replace(",", "");
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const tableContent = [
//     { key: "Número de referência", value: "000085752257" },
//     { key: "Prazo de pagamento", value: getCurrentDateTime() },
//     { key: "Método de pagamento", value: paymentMethod },
//     { key: "Nome do remetente", value: name },
//   ];

//   if (loading) {
//     return (
//       <motion.div
//       initial={paymentMethod === "PIX QR" ? { x: "-100vw" } : { opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: "100vw", opacity: 0 }}
//       transition={{ type: "tween", duration: 0.5 }}
//       style={{"height":"100%"}}
//     >
//       <div className={style.shimmerContainer}>
//         <div className={style.shimmerHeader}></div>
//         <div className={style.shimmerPrice}></div>
//         <div className={style.shimmerTable}>
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className={style.shimmerRow}></div>
//           ))}
//         </div>
//         <div className={style.shimmerButton}></div>
//       </div>
//     </motion.div>
//     );
//   }

//   return (
   
//       <Layout
//         header={<></>}
//         content={
//           <div className={style.container}>
//             <SuccessLoader />
//             <div className={style.successMessage}>Sucesso no pagamento!</div>
//             <div className={style.price}>R$ {total}</div>

//             <div className={style.tableWrapper}>
//               {tableContent.map((ele, index) => (
//                 <div key={index} className={style.tableContent}>
//                   <div className={style.key}>{ele.key}</div>
//                   <div className={style.value}>{ele.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         }
//         footer={
//           <div className={style.button}>
//             <div className={style.recieptButton} onClick={()=>router.push(`/pages/receiptPage?name=${name}&total=${total}&paymentMethod=${paymentMethod}`)}><Image src={"/demoapp/image/componentImages/reciept.svg"} alt="reciept" height={16} width={16} priority/> ver recibo</div>
//             <Button text="Página inicial" onClick={() => router.push("/")} />
//             <Footer />
//           </div>
//         }
//       />
//   );
// };

// export default SuccessPageContainer;


"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SuccessLoader from "@/shared/components/successLoader/successLoder";
import style from "./successPageContainer.module.css";
import Button from "@/shared/components/button/button";
import Footer from "@/shared/components/Footer/Footer";
import Layout from "@/shared/components/layout/Layout";
import Image from "next/image";
import Header from "@/shared/components/header/header";


type SuccessPageProps = {
  goToNextStep? : (steps? : number)=>void;
  goToPreviousStep? : (step?: number)=> void;
  subTextStyle? : React.CSSProperties | undefined;
  titleTextStyle? : React.CSSProperties | undefined;
  buttonStyle? : React.CSSProperties | undefined;
  currentState? : number;
  setCurrentState? : React.Dispatch<React.SetStateAction<number>>;
};


const SuccessPageContainer: React.FC<SuccessPageProps> = ({
  goToNextStep,
  goToPreviousStep,
  subTextStyle,
  titleTextStyle,
  buttonStyle,
  currentState,
  setCurrentState
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Bruno A Oliveria";
  const total = searchParams.get("total") || "567";
  const paymentMethod = searchParams.get("paymentMethod") || "PIX";
  const [isBackNavigation, setIsBackNavigation] = useState(false); 
  const clickToPay = paymentMethod === "Itau Cartão de crédito" ;

  const getCurrentDateTime = () => {
    const now = new Date();
    return now
      .toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(",", "");
  };

  useEffect(() => {
    const isFromReceiptPage = sessionStorage.getItem("isFromReceiptPage");

    if (isFromReceiptPage) {
      setIsBackNavigation(true);
      sessionStorage.removeItem("isFromReceiptPage"); 
    }

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const successtableContent = [
    { key: "Número de referência", value: "000085752257" },
    { key: "Prazo de pagamento", value: getCurrentDateTime() },
    { key: "Método de pagamento", value: paymentMethod },
    { key: "Nome do remetente", value: name },
  ];
  const pixAutomaticoTableContent = [
    { key: "Número de referência", value: "000085752257" },
    { key: "Plano Selecionado", value: "Premium" },
    { key: "Preço do plano", value: `R$ ${total}` },
    { key: "Data do débito", value: getCurrentDateTime() },
    { key: "Freqüência", value: "mensal" },
    { key: "Método de pagamento", value: paymentMethod },
    { key: "Nome do remetente", value: name }
  ];

  const tableContent = paymentMethod === "Pix Automático" ? pixAutomaticoTableContent : successtableContent;
if (loading && !isBackNavigation) {
    return (
      <motion.div
      initial={paymentMethod === "PIX QR" ? { x: "-100vw" } : { opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{"height":"100%"}}
    >
      <div className={style.shimmerContainer}>
        <div className={style.shimmerHeader}></div>
        <div className={style.shimmerPrice}></div>
        <div className={style.shimmerTable}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={style.shimmerRow}></div>
          ))}
        </div>
        <div className={style.shimmerButton}></div>
      </div>
    </motion.div>
    );
  }
  
  const handleClick = () => {
    
    if (setCurrentState){
      setCurrentState?.(1);
      return;
    }
      
      
    const currentInputValue = searchParams.get("inputValue") || "juspay@gmail.com";
    console.log(currentInputValue);

    let redirectToBase = "";
    if (clickToPay) {
      redirectToBase = "/";
    } else {
      redirectToBase = "/";
    }

    const finalSearchParams = new URLSearchParams();

    if (clickToPay) {
      finalSearchParams.set("inputValue", currentInputValue);
    }


    const queryString = finalSearchParams.toString();
    const finalRedirectUrl = queryString ? `${redirectToBase}?${queryString}` : redirectToBase;

    router.push(finalRedirectUrl);
  };


  return (
   
      <Layout currentState={currentState}
        header={currentState?<Header text="" desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>:null}
        content={
          <div className={style.container}>
            <SuccessLoader />
            <div className={style.successMessage} style={titleTextStyle}>Sucesso no pagamento!</div>
            <div className={style.price} id={"priceForSuccesPage"}>R$ {total}</div>

            <div className={style.tableWrapper} id="successDetailWrapper">
              {tableContent.map((ele, index) => (
                <div key={index} className={style.tableContent} >
                  <div className={style.key} style={titleTextStyle}>{ele.key}</div>
                  <div className={style.value}>{ele.value}</div>
                </div>
              ))}
            </div>
          </div>
        }
        footer={
          <div className={style.button}>
            <div className={style.recieptButton} style={{fontFamily:subTextStyle?.fontFamily}} id= "recieptButtonId" onClick={() => {
              if (goToNextStep) {
                goToNextStep();
              } else {
                sessionStorage.setItem("isFromReceiptPage", "true");
                router.push(`/pages/receiptPage?name=${name}&total=${total}&paymentMethod=${encodeURIComponent(paymentMethod)}`);
              }
            }}><Image src={"/demoapp/image/componentImages/reciept.svg"} alt="reciept" height={16} width={16} priority/> ver recibo</div>
            <Button text="Página inicial" onClick={handleClick} styles={buttonStyle ? buttonStyle : { backgroundColor: clickToPay ? "#8B4513" : undefined }} id={"successPageButtonId"} />
            {goToPreviousStep?
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId5"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>
            : <Footer />}
          </div>
        }
      />
  );
};

export default SuccessPageContainer;




