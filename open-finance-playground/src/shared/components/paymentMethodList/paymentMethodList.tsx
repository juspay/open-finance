"use client";
import { useRef, useState } from "react";
import style from "./paymentMethodList.module.css";

import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { ListItem } from "@/shared/types/listItem";
import Button from "@/shared/components/button/button";
import Layout from "@/shared/components/layout/Layout";
import { useBiometricAuth } from "@/shared/hooks/useBiometricAuth";




interface PaymentActionProps {
    total?: number;
    itemCount?: number;
    ListItems: ListItem[];
    bankList?: boolean;
    selectBank?: boolean;
    saved? : boolean;
    redirect?:boolean;
    bottomCTA?: boolean;
    setCurrentPage?:React.Dispatch<React.SetStateAction<string>>;
    setIsPopupVisible?:React.Dispatch<React.SetStateAction<boolean>>;
    isPopupVisible?: boolean; 
    setIsSelectBankPopupVisible?:React.Dispatch<React.SetStateAction<boolean>>;
    clickToPay? : boolean; 
    setIsSuccessPopupVisible?: React.Dispatch<React.SetStateAction<boolean>>;  
    inputValue?: string; 
    goToNextStep?: () => void;
    styles?: {
        container?: React.CSSProperties;
        desc?: React.CSSProperties;
        subdesc?: React.CSSProperties;
        selectTick? : React.CSSProperties;
        arrow? : React.CSSProperties;
  } ;
  activeItem? : String; 
  selectContainers? : boolean;
}


const PaymentMethodList: React.FC<PaymentActionProps> = ({ total, itemCount, ListItems, bankList = false, selectBank = false,saved=false,redirect=false, bottomCTA=false, setIsPopupVisible = () => {},setCurrentPage = () => {} ,isPopupVisible,setIsSelectBankPopupVisible= () => {}, clickToPay=false, setIsSuccessPopupVisible=()=>{},inputValue="", styles, goToNextStep, activeItem, selectContainers=true}) => {
  
  
    const [selectedBank, setSelectedBank] = useState("itauBankImage");
    const router = useRouter();
    const { handleAuth } = useBiometricAuth();

    const activeItems = [
        "nupayImage",
        "itauBankImage",
        "pixbank",
        "pixQR",
        "pixface",
        "card",
        "itauSquareFrame"
      ];

    
    const handleNavigation = (name: string, fromButton = false) => {
        
        if (!bankList && !goToNextStep) {
            switch (name) {
                case "card":
                    if (clickToPay) {
                        router.push(`/pages/clickToPay/cardPage?total=${total}&items=${itemCount}&inputValue=${inputValue}`);
                    } else {
                        router.push(`/pages/cardPage?total=${total}&items=${itemCount}`);
                    }
                    break;
                case "pixBio":
                    setIsPopupVisible(true);
                    break;
                case "itauSquareFrame":
                    setIsSelectBankPopupVisible(true);
                    setCurrentPage("itauSquareFrame");
                    setIsPopupVisible(true);
                    break;
                case "pixbank":
                    router.push(`/pages/selectBank?total=${total}&items=${itemCount}`);
                    break;
                case "pixQR":
                    setCurrentPage("CPF");
                    setIsPopupVisible(true);
                    break;
                case "pixface":
                    setCurrentPage("SelectBank");
                    setIsPopupVisible(true);
                    break;
                case "pixAuto":
                    router.push(`/pages/selectAutomaticoBank?total=${total}&items=${itemCount}`);
                    break;

            }
        } 
        else if (name === activeItem && goToNextStep) {
            goToNextStep();
        }
        else {
            if (name === "ConfirmPixBiometricoPayment") {
                // setCurrentPage("ConfirmPixBiometricoPayment");
                setSelectedBank(name);
                router.push(`/pages/biometricoConfirmDetails?total=${total}&items=${itemCount}&paymentMethod=Pix%20Biometrico&auth=true`)
                // handleAuth(total ?? 0, itemCount ?? 0, ()=>{},false);
                // setIsPopupVisible(true);
            } else if (name === "ConfirmClickToPay") {
                setIsSuccessPopupVisible(true);
            }
            else if (name === "TermsAndConditions"){
                setCurrentPage("TermsAndConditions");
                setSelectedBank(name);
                setIsPopupVisible(true);
            } 
            else {
                setSelectedBank( prevBank => (prevBank === name ? "" : name));
            }
        }
    };
    
    

   

    return (
        <Layout
            header={<></>}
            content={
                <>
                    <div className={style.bottomContainer}>
                        {ListItems.map((ele, index) => {
                            const isDisabled = ele.name !== activeItem;
                            const isPixFace = activeItem === "pixface";
                            const isCaixa = ele.name === "caixa" && styles;
                            return <div className={`${!bankList?style.containerWrapper:style.wrapper} ${isCaixa?style.disabledCard:''}` }   key={index}>
                               <div key={index} className={`${style.container} ${index === ListItems.length - 1 ? style.borderBottom : ''}`} style={styles?.container} onClick={() => handleNavigation(ele.name)} >
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                                <div className={`${style.imageContainer} ${ ele.name === "itauSquareFrame" ? style.borderNull : ""} ${isDisabled ? "" : `${style.highlightCircle} ${isPixFace ? style.blackRipple : ""}` }`} >
                                    {ele.name === "itauSquareFrame" && <span className={style.ripple} />}
                                    <Image src={bankList || selectBank? `/demoapp/image/bankImage/${ele.name.startsWith("bank_itau")?"bank_itau":ele.name}.svg` : `/demoapp/image/paymentMethodImage/${ele.name}.svg`} alt="Payment Method" width={24} height={24} priority className={style.image}/>
                                </div>
                                <div className={style.ButtonParent}>
                                    <div className={style.contentContainer}>
                                        <div className={style.descContainer}>

                                            <div className={style.desc} style={styles?.desc}>{ele.desc} {saved && !clickToPay? (
                                                <>
                                                    <Image
                                                        src={`/demoapp/image/componentImages/saved12x12.svg`}
                                                        alt="pix"
                                                        width={12}
                                                        height={12}
                                                        priority
                                                    />  
                                                    <Image src={`/demoapp/image/componentImages/separator.svg`} alt="|" height={10} width={3} priority/>
                                                    <span className={style.biometrico}>Biométrico</span>
                                                </>
                                            ) : null}</div>
                                            {ele.subdesc && <div className={style.methods} style={styles?.subdesc}>{ele.subdesc}</div>}
                                            
                                        </div>
                                        {(selectContainers || (["pixbank", "pixface"].includes(ele.name) && activeItem===ele.name))  && <div className={`${style.arrowContainer} ${style.selectCircleContainer}`}>
                                            {bankList ? (
                                                <div className={`${style.selectCircle} ${selectedBank === ele.name ? style.active : ""}`} style={selectedBank === ele.name && styles ? styles.selectTick : undefined} />
                                            ) : clickToPay?(<Image
                                                src={`/demoapp/image/componentImages/clickToPay-arrow-right.svg`}
                                                alt="Arrow Right"
                                                width={10}
                                                height={16}
                                                priority
                                            />): (
                                                !styles ? (
                                                <Image
                                                    src={`/demoapp/image/componentImages/arrow-right.svg`}
                                                    alt="Arrow Right"
                                                    width={10}
                                                    height={16}
                                                    priority
                                                    className={activeItems.includes(ele.name) ? style.arrowImage : ""}
                                                />
                                                ) : (
                                                <svg className={activeItems.includes(ele.name) ? style.arrowImage : ""} xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                    <g id="01 align center">
                                                    <path id="actions" d="M1.81114 13.707L0.400146 12.293L5.68914 6.99997L0.400146 1.70697L1.81514 0.292969L7.10013 5.58597C7.47508 5.96102 7.68571 6.46964 7.68571 6.99997C7.68571 7.5303 7.47508 8.03891 7.10013 8.41397L1.81114 13.707Z" fill={styles?.arrow?.color}/>
                                                    </g>
                                                    </svg>
                                                )
                                            )}
                                        </div>}
                                        
                                    </div>
                                    {(bankList && !bottomCTA && !styles)&& (
                                        <div className={`${style.buttonWrapper} ${selectedBank === ele.name ? style.active : ""} `}>
                                            <Button text="Continuar a pagar" onClick={() => handleNavigation((clickToPay?"ConfirmClickToPay":"ConfirmPixBiometricoPayment"), true)} styles={{background: clickToPay? "#8B4513":undefined}}/>
                                            {clickToPay?null:<div className={style.terms}>Verifique os <span className={style.clickableTerms} onClick={() => handleNavigation("TermsAndConditions",true)}>termos e condições</span> de pagamento.</div>}
                                        </div>
                                    )}
                                    {ele.name==="caixa" && styles  && <div className={style.outage} id="caixaOutage">Indisponível</div>}
                                   
                                    
                                </div>
                                </div>
                                 {ele.name==="Pagbank" && styles  && <div className={style.warningBox} id="caixaWarning">
                                        Enfrentando falhas de pagamento com este banco.  
                                        Por favor, tente outro banco para prosseguir.
                                    </div>}
                            </div>
                            
                                    
                            </div>
                            

                    })}
                    </div>
                    
                </>
            }
            footer={<></>}
        />
    );
};

export default PaymentMethodList;
