'use client';
import style from "./mobileTemplate.module.css";
import React, { useState, useEffect} from "react";
import { SimulatorState } from '../types/simulator';
import Layout from "@/shared/components/layout/Layout";
import {getPageBackground, getHeaderStyles, getLocationStyles, getListItemStyles,getTitleStyles,getTitleTextStyle, getSubTextStyle, getInputStyles, getButtonStyles, getStepStyle} from "@/app/open-finance/app/components/types/styleMapper";
import Header from "@/shared/components/header/header";
import Location from "@/shared/components/location/location";
import PaymentTitle from "@/shared/components/paymentTitle/paymentTitle";
import PaymentMethodList from "@/shared/components/paymentMethodList/paymentMethodList";
import { ListItem } from "@/shared/types/listItem";
import type { JSX } from "react";
import InputField from "@/shared/components/inputField/inputField";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import Button from "@/shared/components/button/button";
import SelectBankContainer from "@/shared/containers/pixAutomatico/SelectBankPageContainer/selectBankContainer";
import Image from "next/image";
import Footer from "@/shared/components/Footer/Footer";
import AppleFaceId from "@/shared/components/appleFaceID/appleFaceID";
import dynamic from "next/dynamic";
import ConfirmBiometricoDetailsContainer from "@/shared/containers/PixBiometrico/confirmBiometricoDetails/confirmBiometricoDetails";
import SuccessPageContainer from "@/shared/containers/common/successPageContainer/successPageContainer";
import ReceiptPageContainer from "@/shared/containers/common/receiptPageContainer/receiptPageContainer";
import LineDotIndicator from "../lineDotIndicator/lineDotIndicator";



import { motion, AnimatePresence } from "framer-motion";
import PinInput from "../pinInput/pinInput";
import MeuBankHomeContainer from "@/shared/containers/pixPISP/meuBankHomeContainer/meuBankHomeContainer";
import { useTranslation } from 'react-i18next';













type MobileViewProps = {
  simulatorState: SimulatorState;
  currentState : number;
  setCurrentState : React.Dispatch<React.SetStateAction<number>>;
  
}

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const BankList: ListItem[] = [
    { name: "itauBankImage", desc: "Cartão de crédito ", subdesc: "•••• 1234" },
  ];
  
  const pixPaymentMethods: ListItem[] = [
    { name: "pixbank", desc: "Pague no seu banco", subdesc: "Com a segurança do Open Finance" },
    { name: "pixQR", desc: "PIX QR Code", subdesc: "Escaneie e pague rápido" },
    { name: "pixface", desc: "Pague com sua biometria", subdesc: "Com a segurança do Open Finance" },
  ];
  
    const Carteiras: ListItem[] = [
    { name: "applepayWallet", desc: "Apple Pay", subdesc: "" },
    { name: "googlepayWallet", desc: "Google Wallet ", subdesc: "" },
    { name: "nupayImage", desc: "NuPay ", subdesc: "Pague com saldo da carteira" },
    
  ];


const MobileViewBiometric : React.FC<MobileViewProps> =({simulatorState , currentState, setCurrentState}) => {
  
  const [cpfNumber, setCPFNumber] = useState("");
  const [cnpjNumber, setCNPJNumber] = useState("");
  const [isToggleSwitched, setIsToggleSwitched] = useState(false);
  const [successAnim, setSuccessAnim] = useState<object | null>(null);
  const [showFaceSuccessAnim, setShowFaceSuccessAnim] = useState(false);
  const [firstHoverDone, setFirstHoverDone] = useState(false);
  const { t } = useTranslation('guidelines');
  
  
  
  const pageBackground = getPageBackground(simulatorState);
  const headerStyles = getHeaderStyles(simulatorState);
  const locationStyles = getLocationStyles(simulatorState);
  const titleStyles = getTitleStyles(simulatorState);
  const listItemStyle = getListItemStyles(simulatorState);
  const titleTextStyle = getTitleTextStyle(simulatorState);
  const subTextStyle = getSubTextStyle(simulatorState);
  const inputStyles = getInputStyles(simulatorState);
  const buttonStyles = getButtonStyles(simulatorState);
  const stepStyle = getStepStyle();
  
  useEffect(() => {
    import("../../../../../../public/lottie/faceSuccess.json").then((module) => {
      setSuccessAnim(module.default);
    });
  }, []);
  
  useEffect(() => {
      if (currentState === 14) {setShowFaceSuccessAnim(true)}
      if (currentState === 7 || currentState === 12) {
        const timer = setTimeout(() => goToNextStep(), 2500);
        return () => clearTimeout(timer);
      }

      const timers = [5,6,8,12,15];
      if (timers.includes(currentState)) {
        const timer = setTimeout(() => goToNextStep(), 5000);
        return () => clearTimeout(timer);
      }
    }, [currentState]);
  
  
   const goToPreviousStep = (stepsBack = 1) => {
  setCurrentState((prev) => Math.max(prev - stepsBack, 1));
};
    const goToNextStep = () => setCurrentState((prev) => prev + 1);
    
    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value.replace(/\D/g, "").slice(0, 11);
          setCPFNumber(input); 
          
      };
  
      const formatCPF = (value: string) => {
      let validChars = value.replace(/[^a-zA-Z0-9]/g, "");
      if (validChars.length > 3) validChars = validChars.replace(/^(.{3})(.)/, "$1.$2");
      if (validChars.length > 6) validChars = validChars.replace(/^(.{3})\.(.{3})(.)/, "$1.$2.$3");
      if (validChars.length > 9) validChars = validChars.replace(/^(.{3})\.(.{3})\.(.{3})(.)/, "$1.$2.$3-$4");
  
      return validChars.slice(0, 14); 
    };
    
    const formatCNPJ = (value: string): string => {
      return value
        .replace(/\D/g, "")                           
        .replace(/^(\d{2})(\d)/, "$1.$2")            
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") 
        .replace(/\.(\d{3})(\d)/, ".$1/$2")     
        .replace(/(\d{4})(\d)/, "$1-$2"); 
    };
  
     const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/\D/g, "").slice(0, 14);
      setCNPJNumber(input);
    };
    
    
    const isFormValid = isToggleSwitched
        ? cpfNumber.length === 11 && cnpjNumber.length === 14
        : cpfNumber.length === 11;
      
  
  
  
  
  const step1= 
   <Layout styles={{ backgroundColor:  pageBackground?.pageBackground  , borderRadius: `17px` }} 
      header={
        <div>
          <Header text="Escolha como prefere pagar"  timeAndIcon={true} styles={headerStyles} goToPreviousStep={goToPreviousStep}/>
          <Location styles={locationStyles}/>
        </div>
      }
      content={
        <div id="pixbankId">
          <PaymentTitle title="Opções Salvas" styles={titleStyles}/>
          <div style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={BankList} bankList={true} styles={listItemStyle} selectContainers={false}/>  
          </div>
          <PaymentTitle title="Pague via Pix" styles={titleStyles} pixIcon={true}/>
          <div style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={pixPaymentMethods} bottomCTA={false} styles={listItemStyle} goToNextStep={goToNextStep} activeItem={"pixface"} selectContainers={false}/>
          </div>
          <PaymentTitle title="Carteiras" styles={titleStyles}/>
           <div style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={Carteiras} bankList={true} styles={listItemStyle} selectContainers={false}/> 
          </div>
         
        </div>
      }
      footer={
      <></>}
    
    />
    
    const textLines2 = ["Você seleciona um banco de sua escolha e garante que seu aplicativo bancário não esteja oculto.", "Você será redirecionado para o aplicativo do seu banco para autorizar essa conexão. Você terá 5 minutos para completá-la.", "Após a aprovação, você retornará aqui para confirmar os detalhes do pagamento e concluir o pagamento."]
    
    const importantNote = 
      <div className={style.importantNoteContainer}>
        <div className={style.infoContainer}>
          
          <div className={style.infoTextHeading} id="infoContirmDetails"><span className={style.infoText}>Controle total:</span>a qualquer momento você poderá encerrar o vínculo, bastando apenas acessar nossa área de gestão de contas.</div>
        </div>
      </div>
    
    const step2 =  <Layout styles={{backgroundColor:  '#ffffff'}}
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={true} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
            <div className={style.redirectionContainer}>
                <div className={style.imageContainerPix}>
                    <div className={style.nsImageContainer}>
                        <Image src = {"/demoapp/image/ofPlayground/pix-icon.svg"} alt= "Success" height={60} width={60} />
                    </div>
                </div>
                <div className={style.redirectionHeaderContainer2}>
                   <div id={"userBankDebitId"} className={style.redirectionHeader2} style={titleTextStyle}>Faça um Pix com a segurança do <br/>Open Finance</div>
                  <div className={style.redirectionSubHeader} id={"redirectionSubHeaderId"} style={subTextStyle}>Com o Pix via Open Finance, você autoriza o pagamento diretamente da sua conta bancária de forma rápida, conveniente e segura. E o melhor: você não paga pelo serviço! Tudo é simples, seguro e conectado ao seu banco.</div>
                </div>
                <div className={style.headerTextPix} style={titleTextStyle}>Como funciona?</div>
                <div className={style.stepsContainer} id="stepContainerId">
                  {textLines2.map((text, index) => (
                    <div key={index} className={style.stepItem}>
                      <div className={style.stepNumber}>{index + 1}</div>
                      <div className={style.stepText} style={subTextStyle}>{text}</div>
                    </div>
                  ))}
                </div>
                {importantNote}
                <Button text="Continuar"  styles={buttonStyles} onClick={goToNextStep}/>
                <div className={style.termsAConditionsContainer} id={"termsAConditionsContainerId"} style={titleTextStyle}>
                  Ao continuar, você concorda com os <span className={style.tnc} style={{color : subTextStyle?.color}}>Termos e Condições</span> da Juspay.
                </div>
        </div>
          }
          footer={
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo" height={14} width={350} priority/>
            </div>
        }
    />
    
    
    const step3 = <Layout styles={{ backgroundColor:  '#ffffff'}} currentState={currentState}
                     header={
                        <div>
                          <Header text=""  styles={headerStyles} desc={false} border={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>
                        </div>
                      }
                      content = {<div className={style.container}>
                        <div className={style.headerSection}>
                            <div className={style.pageNumber} id="pageNumber1" >Passo 1 de 3 </div>
                            <div className={style.title} style={titleTextStyle} >Confirme sua identidade</div>
                            <div id = "cpfCnpjSubTitleId" className={style.subTitle} style={subTextStyle}>Por favor, insira seus dados para fins de verificação</div>
                          
                        </div>
                        <div className={style.inputContainer}>
                           <InputField
                            id="cpfLabel"
                            label="CPF"
                            placeholder="Digite seu CPF (000.000.000-00)"
                            className={style.dotPlaceholder}
                            type="text"
                            value={formatCPF(cpfNumber)}
                            onChange={handleCPFChange}
                            styles ={inputStyles}
                           /> 
                           <ToggleSwitch 
                              label="Sou pessoa jurídica" 
                              checked={isToggleSwitched}
                              onChange={(state) => setIsToggleSwitched(state)}
                              style={subTextStyle}
                            />
                           {isToggleSwitched && <InputField
                            id="cnpjLabel"
                            label="CNPJ"
                            placeholder="Digite seu CNPJ (00.000.000/0001-00)"
                            className={style.dotPlaceholder}
                            type="text"
                            value={formatCNPJ(cnpjNumber)}
                            onChange={handleCNPJChange}
                            styles ={inputStyles}
                            
                           /> }
                          <Button text="Concluir o pagamento" styles={buttonStyles} disable={!isFormValid} id="confirmPaymentButton" onClick={goToNextStep}/>
                        </div>            
                      </div>}
                      footer ={<></>}
                    />
    
                    
     const step4 = <SelectBankContainer inputStyles={inputStyles} titleTextStyle={titleTextStyle} stepStyle= {stepStyle} subTextStyle={subTextStyle} selectTick={listItemStyle?.selectTick} currentState={currentState} setCurrentState={setCurrentState} goToPreviousStep={goToPreviousStep} selectContainers={false}/>
     
     
    
    
    const step5 = <Layout  
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
              <div className={style.juspayLoaderContainer}>
                  <Image src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spin} id="juspayLogo"/>
                  <div  className={style.timerHeader} style={titleTextStyle} id="loaderTextId">Redirecionando com 
segurança para Meu Banco</div>
                  
                </div>}
          footer = {<div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId2"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>}
          />
      
    const step6 = 
    <Layout 
          header={<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
                <div style={{backgroundColor : "#FFFFFF", height:'100%'}}>
                  
                <div style={{paddingTop:'50%'}}></div>
                 <div className={style.redirectionContainer}>
                <div className={style.imageContainer}>
                    <div className={style.itauBankContainer2}>
                        <Image src={`/demoapp/image/bankImage/itau.svg`} alt="itau" height={48} width={48} priority/>
                    </div>
                    <div className={style.caretRightContainer}>
                        <div className={style.caretRight}></div>
                        <div className={style.caretRight}></div>
                        <div className={style.caretRight}></div>
                    </div>
                    <div className={style.nsImageContainer2}>
                        <Image src={`/demoapp/image/bankImage/NS.svg`} alt="NSImage" height={28} width={26} priority/>
                    </div>
                </div>
                <div className={style.headerText2} style={titleTextStyle} id="returnRedirectionDescId">Redirecionando de volta para o app {"<nome do comerciante>"}</div>
          </div>
          </div>}
          footer={<></>}
          />
    
    const  step7 = <Layout 
    
    header = {""}
    content = { <div className={style.redirectionSuccessContainer}>
      <div className={style.successImage}>
         <Image src = {"/demoapp/image/ofPlayground/successIcon.svg"} alt= "Success" height={100} width={100} />
        <Image src = {"/demoapp/image/ofPlayground/shield-check.svg"} alt= "Success" height={26} width={26} className={style.shield}/>
        
      </div>
     
      <div className={style.successTextContainer}>
        <div className={style.successText} style={titleTextStyle} >Autorização bem-sucedida</div>
        <div className={style.successSubText} style={subTextStyle}>Você autorizou com sucesso os pagamentos biométricos com [Nome do Banco]. Vamos terminar configurando a autenticação biométrica.</div>
      </div>
    </div>}
    footer = {""} />
    
    
    const step8 = 
          <div className={style.bankPage}>
            <Image src="/demoapp/image/ofPlayground/bank_redirection_image.svg" alt="i" height={90} width={90}/>
          </div>
    
    const step9 = <PinInput goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} titleStyle={titleTextStyle} />;
    
    const step10 = 
            <div className={style.meubankContainer}>
            <MeuBankHomeContainer ofPlayground={true} goToNextStep={goToNextStep}/>
            </div>
    
    const step11= 
   <Layout styles={{ backgroundColor:  pageBackground?.pageBackground  , borderRadius: `17px` ,overflow: "hidden"}} 
      header={
        <div>
          <Header text="Escolha como prefere pagar"  timeAndIcon={true} styles={headerStyles} goToPreviousStep={goToPreviousStep}/>
          <Location styles={locationStyles}/>
        </div>
      }
      content={
        <div>
          <PaymentTitle title="Opções Salvas" styles={titleStyles}/>
          <div id="popupfaceId" style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={BankList} bankList={true} styles={listItemStyle} />  
          </div>
          <PaymentTitle title="Pague via Pix " styles={titleStyles}/>
          <div  style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={pixPaymentMethods} bottomCTA={false} styles={listItemStyle} goToNextStep={goToNextStep} activeItem={"pixface"}/>
          </div>
          <PaymentTitle title="Carteiras" styles={titleStyles}/>
           <div style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={Carteiras} bankList={true} styles={listItemStyle} /> 
          </div>
          
         
        </div>
        
      }
      footer={
        <AnimatePresence>
        <motion.div
          key="faceIdPopup"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={style.faceIdContainer}
        >
          <AppleFaceId
            setShowFaceSuccessAnim={setShowFaceSuccessAnim}
            setCurrentState={setCurrentState}
            currentState={currentState}
          />
        </motion.div>
    </AnimatePresence>
     }
    
    />
    
    const  step12 = <Layout 
    
    header = {""}
    content = { <div className={style.redirectionSuccessContainer}>
      <div className={style.successImage}>
         <Image src = {"/demoapp/image/ofPlayground/pix-icon.svg"} alt= "Success" height={100} width={100} />
        <Image src = {"/demoapp/image/ofPlayground/shield-check.svg"} alt= "Success" height={26} width={26} className={style.shield}/>
        
      </div>
     
      <div className={style.successTextContainer}>
        <div className={style.successText} style={titleTextStyle} id="biometricConcludia">Configuração biométrica do Pix concluída</div>
        <div className={style.successSubText} style={subTextStyle}>Você está pronto! A partir de agora, confirme pagamentos em segundos usando sua impressão digital ou reconhecimento facial.</div>
      </div>
    </div>}
    footer = {""} />
    
    
    const step13 = 
       <ConfirmBiometricoDetailsContainer headerStyles={headerStyles} titleTextStyle={titleTextStyle} subTextStyle={subTextStyle} stepStyle= {stepStyle} buttonStyles={buttonStyles} inputStyles={inputStyles} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} showStep={true} stepsToGoBack={9}/>
       
     const step14 = 
       <ConfirmBiometricoDetailsContainer headerStyles={headerStyles} titleTextStyle={titleTextStyle} subTextStyle={subTextStyle} stepStyle= {stepStyle} buttonStyles={buttonStyles} inputStyles={inputStyles} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep}/>
       
    const step15= 
      <Layout  
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
              <div className={style.juspayLoaderContainer}>
                  <Image src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spin} />
                  <div  className={style.timerHeader} style={titleTextStyle} id="confirmandoPagamento">Confirmando pagamento</div>
                  
                </div>}
          footer = {
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId3"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>
          }
          />
   
    const step16 = 
            <SuccessPageContainer goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} subTextStyle={subTextStyle} titleTextStyle={titleTextStyle} buttonStyle={buttonStyles}  setCurrentState={setCurrentState} />   
    
      const step17 = 
            <ReceiptPageContainer goToPreviousStep={goToPreviousStep} subTextStyle={subTextStyle} titleTextStyle={titleTextStyle} currentState={currentState}/>   
     
    
     
    
     
     
    const steps: { [key: number]: JSX.Element } = {
        1: step1,
        2: step2,
        3: step3,
        4: step4,
        5: step5,
        6: step6,
        7 : step7,
        8 : step8,
        9 : step9,
        10 : step10,
        11 : step11,
        12: step12,
        13 : step13,
        14 : step14,
        15: step15,
        16: step16,
        17: step17,
      };
    
  
 return (
  <>
  <div className={style.mobileContainer} style={{ position: "relative", overflow: "hidden" }}>
    {currentState===11 || currentState===14 ? <div className={style.overlay}></div>: null}

    {steps[currentState] || null}
    
   {showFaceSuccessAnim && successAnim && (
    <div className={style.faceIdSuccessWrapper}>
      <Lottie
        loop={false}
        animationData={successAnim}
        play={true}
        style={{ width: 150, height: 150 }}
        onComplete={() => {setShowFaceSuccessAnim(false);setCurrentState(currentState+1)}}
      />
    </div>
    
)}

   
  </div>
  <LineDotIndicator
        targetId="userBankDebitId"
        color="green"
        offsetX={30}
        side="right"
        hoverText={t('labelPixOpenFinance')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="redirectionSubHeaderId"
        color="green"
        offsetX={30}
        side="right"
        hoverText={t('explainAuthorization')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="stepContainerId"
        color="green"
        offsetX={30}
        side="right"
        hoverText={t('stepByStepSummary')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="infoContirmDetails"
        color="green"
        offsetX={35}
        side="left"
        hoverText={t('linkingInfoNotice')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="termsAConditionsContainerId"
        color="green"
        offsetX={95}
        side="left"
        hoverText={t('consentLine')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="juspayViaOpenfinanceScreenId"
        color="green"
        offsetX={20}
        side="right"
        hoverText={t('displayProvider')}
        resetOffset={0}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="pageNumber1"
        color="green"
        offsetX={303}
        side="right"
        hoverText={t('showProgress')}
        initialHover
        resetOffset={40}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="cpfCnpjSubTitleId"
        color="green"
        offsetX={50}
        offsetY={-4}
        side="right"
        hoverText={t('explainWhyData')}
        resetOffset={40}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="cpfLabel"
        color="green"
        offsetX={24}
        side="left"
        hoverText={t('guideFormat')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="confirmPaymentButton"
        color="green"
        offsetX={24}
        side="left"
        hoverText={t('blockContinuation')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="step3DisplayId"
        color="green"
        offsetX={303}
        side="right"
        hoverText={t('showProgress')}
        initialHover
        resetOffset={40}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="sufficientBalance"
        color="green"
        offsetX={30}
        offsetY={-10}
        side="right"
        hoverText={t('balanceWarning')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="searchBankInput"
        color="green"
        offsetX={30}
        side="left"
        hoverText={t('provideBankSearch')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="todosBancos"
        color="green"
        offsetX={12}
        offsetY={57}
        side="right"
        hoverText={t('markUnavailableBanks')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="caixaWarning"
        color="green"
        offsetX={27}
        side="right"
        hoverText={t('specificOutageMessages')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="juspayLogo"
        color="green"
        offsetX={160}
        side="left"
        hoverText={t('redirectionScreen')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="loaderTextId"
        color="green"
        offsetX={80}
        side="left"
        hoverText={t('mentionSelectedBank')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="popupfaceId"
        color="green"
        offsetX={30}
        offsetY={140}
        side="right"
        hoverText={t('biometricValidation')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="biometricConcludia"
        color="green"
        offsetX={35}
        offsetY={10}
        side="right"
        hoverText={t('linkingCompleted')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="successDetailWrapper"
        color="green"
        offsetX={30}
        side="left"
        hoverText={t('conciseSummary')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="successPageButtonId"
        color="green"
        offsetX={30}
        side="right"
        hoverText={t('safeExitAction')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="itpHeader"
        color="green"
        offsetX={13}
        offsetY={10}
        side="right"
        hoverText={t('explicitPaymentRails')}
        initialHover
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="itpHeader"
        color="green"
        offsetX={13}
        offsetY={250}
        side="right"
        hoverText={t('openFinanceLabel')}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />

      <LineDotIndicator
        targetId="termsAConditionsContainerId"
        color="green"
        offsetX={95}
        offsetY={-55}
        side="left"
        hoverText={t('primaryCTA')}
        resetOffset={50}
        firstHoverDone={firstHoverDone}
        setFirstHoverDone={setFirstHoverDone}
      />
  </>
  
);
}
``

export default MobileViewBiometric;