"use client";
import React, {useState, useEffect} from "react";
import type { JSX } from "react";
import style from "./mobileTemplate.module.css";
import { SimulatorState } from '../types/simulator';
import Header from "@/shared/components/header/header";
import Location from "@/shared/components/location/location";
import { getPageBackground, getHeaderStyles, getLocationStyles, getTitleStyles, getButtonStyles, getListItemStyles, getInputStyles, getTitleTextStyle, getSubTextStyle, getStepStyle } from "@/app/open-finance/app/components/types/styleMapper";
import PaymentTitle from "@/shared/components/paymentTitle/paymentTitle";
import PaymentMethodList from "@/shared/components/paymentMethodList/paymentMethodList";
import { ListItem } from "@/shared/types/listItem";
import Layout from "@/shared/components/layout/Layout";
import Button from "@/shared/components/button/button";
import InputField from "@/shared/components/inputField/inputField";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import SelectBankContainer from "@/shared/containers/pixAutomatico/SelectBankPageContainer/selectBankContainer";
import ConfirmBiometricoDetailsContainer from "@/shared/containers/PixBiometrico/confirmBiometricoDetails/confirmBiometricoDetails";
import Image from "next/image";
import MeuBankHomeContainer from "@/shared/containers/pixPISP/meuBankHomeContainer/meuBankHomeContainer";
import SuccessPageContainer from "@/shared/containers/common/successPageContainer/successPageContainer";
import ReceiptPageContainer from "@/shared/containers/common/receiptPageContainer/receiptPageContainer";
import PinInput from "../pinInput/pinInput";
import LineDotIndicator from "../lineDotIndicator/lineDotIndicator";
import { useTranslation } from 'react-i18next';

type MobileViewProps = {
  simulatorState: SimulatorState;
  currentState : number;
  setCurrentState : React.Dispatch<React.SetStateAction<number>>;
  
}

const BankList: ListItem[] = [
    { name: "itauBankImage", desc: "Cartão de crédito ", subdesc: "•••• 1234" },
  ];
  
  const pixPaymentMethods: ListItem[] = [
    { name: "pixbank", desc: "Pague no seu banco", subdesc: "Com a segurança do Open Finance" },
    { name: "pixQR", desc: "PIX QR Código", subdesc: "Escaneie e pague rápido" },
    { name: "pixface", desc: "Pague com sua biometria", subdesc: "Com a segurança do Open Finance" },
  ];
  
  const Carteiras: ListItem[] = [
    { name: "applepayWallet", desc: "Apple Pay", subdesc: "" },
    { name: "googlepayWallet", desc: "Google Wallet ", subdesc: "" },
    { name: "nupayImage", desc: "NuPay ", subdesc: "Pague com saldo da carteira" },
    
  ];



const MobileViewPISP: React.FC<MobileViewProps> = ({ simulatorState , currentState, setCurrentState}) => {
  
  
useEffect(() => {
    const defaultTimers = [6, 8, 7, 10,12];
    let delay = null;
    if (defaultTimers.includes(currentState)) {
      delay = 5000;
    } else if (currentState === 11) {
      delay = 3000;
    }
    if (delay !== null) {
      const timer = setTimeout(() => goToNextStep(), delay);
      return () => clearTimeout(timer);
    }
    return undefined; 
}, [currentState]);
  
  const goToNextStep = () => setCurrentState((prev) => prev + 1);
  const goToPreviousStep = (stepsBack = 1) => {
  setCurrentState((prev) => Math.max(prev - stepsBack, 1));
};
 const { t } = useTranslation(['guidelines']);

  const [cpfNumber, setCPFNumber] = useState("");
  const [cnpjNumber, setCNPJNumber] = useState("");
  const [isToggleSwitched, setIsToggleSwitched] = useState(false);
  const [firstHoverDone, setFirstHoverDone] = useState(false);
  
  
  
  
  
  
  const pageBackground = getPageBackground(simulatorState);
  
    
  const headerStyles = getHeaderStyles(simulatorState);
  const locationStyles = getLocationStyles(simulatorState);
  const titleStyles = getTitleStyles(simulatorState);
  const buttonStyles = getButtonStyles(simulatorState);
  const listItemStyle = getListItemStyles(simulatorState);
  const inputStyles = getInputStyles(simulatorState);
  const titleTextStyle = getTitleTextStyle(simulatorState);
  const subTextStyle = getSubTextStyle(simulatorState);
  const stepStyle = getStepStyle();
  
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
            <PaymentMethodList ListItems={pixPaymentMethods} bottomCTA={false} styles={listItemStyle} goToNextStep={goToNextStep} activeItem={"pixbank"} selectContainers={false}/>
          </div>
          <PaymentTitle title="Carteiras" styles={titleStyles}/>
           <div style={simulatorState.layout === "boxed"? {margin: "12px 16px",borderRadius: listItemStyle?.paymentListContainer.borderRadius,overflow: "clip",}: {overflow: "clip"}}>
            <PaymentMethodList ListItems={Carteiras} bankList={true} styles={listItemStyle} selectContainers={false}  /> 
          </div>
         
        </div>
      }
      footer={
      <></>}
    
    />
    
    const textLines = ["Você seleciona um banco de sua escolha e garante que seu aplicativo bancário não esteja oculto.", "Você será redirecionado para o aplicativo do seu banco para autorizar essa conexão. Você terá 5 minutos para completá-la.", "Após a aprovação, você retornará aqui para confirmar os detalhes do pagamento e concluir o pagamento."]
    const step2 =  <Layout styles={{backgroundColor:  '#ffffff'}}
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={true} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
            <div className={style.redirectionContainer}>
                <div className={style.imageContainerPix}>
                    <div className={style.nsImageContainer}>
                        <Image src = {"/demoapp/image/ofPlayground/pix-icon.svg"} alt= "Success" height={60} width={60} />
                    </div>
                </div>
                <div className={style.redirectionHeaderContainer}>
                   <div id={"userBankDebitId"} className={style.redirectionHeader} style={titleTextStyle}>Faça um Pix com a segurança do <br/>Open Finance</div>
                  <div className={style.redirectionSubHeader} id={"redirectionSubHeaderId"} style={subTextStyle}>Com o Pix via Open Finance, você autoriza o pagamento diretamente da sua conta bancária de forma rápida, conveniente e segura. E o melhor: você não paga pelo serviço! Tudo é simples, seguro e conectado ao seu banco.</div>
                </div>
                <div className={style.headerTextPix} style={titleTextStyle}>Como funciona?</div>
                <div className={style.stepsContainer} id="stepContainerId">
                  {textLines.map((text, index) => (
                    <div key={index} className={style.stepItem}>
                      <div className={style.stepNumber}>{index + 1}</div>
                      <div className={style.stepText} style={subTextStyle}>{text}</div>
                    </div>
                  ))}
                </div>
                

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
                            <div className={style.subTitle} id = "cpfCnpjSubTitleId" style={subTextStyle}>Por favor, insira seus dados para fins de verificação</div>
                          
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
    const step4 = <SelectBankContainer inputStyles={inputStyles} titleTextStyle={titleTextStyle} stepStyle= {stepStyle} subTextStyle={subTextStyle} selectTick={listItemStyle?.selectTick} currentState={currentState} setCurrentState={setCurrentState} goToPreviousStep={goToPreviousStep} selectContainers={false} />
    
    const step5 = 
    <ConfirmBiometricoDetailsContainer headerStyles={headerStyles} titleTextStyle={titleTextStyle} subTextStyle={subTextStyle} stepStyle= {stepStyle} buttonStyles={buttonStyles} inputStyles={inputStyles} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep}/>
  
    
    
    const step6 = <Layout  
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
              <div className={style.juspayLoaderContainer}>
                  <Image src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spin} id="juspayLogo"/>
                  <div  className={style.timerHeader2} style={titleTextStyle} id="loaderTextId">Redirecionando com 
segurança para Meu Banco</div>
                  
                </div>}
          footer = {
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId2"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>
          }
          />
          
          
      const step7 = 
          <div className={style.bankPage}>
            <Image src="/demoapp/image/ofPlayground/bank_redirection_image.svg" alt="i" height={90} width={90}/>
          </div>
          
      const step8 = <PinInput goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} titleStyle={titleTextStyle} />;

        
      const step9 = 
            <div className={style.meubankContainer}>
            <MeuBankHomeContainer ofPlayground={true} goToNextStep={goToNextStep}/>
            </div>
            
      const step10 = 
    <Layout 
          header={<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
                <div style={{backgroundColor : "#FFFFFF", height:'100%'}}>
                  
                <div style={{paddingTop:'50%'}}></div>
                 <div className={style.container}>
                 <div className={style.openfinance}></div>
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
          
    const step11 = <Layout  
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
              <div className={style.timerContainer}>
                                {/* <CountdownTimer duration={180}/> */}
                                <Image src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spinLogo} id="juspayLogoStep10"/>
                                
                                <div className={style.textContainer}>
                                  <div className={style.timerHeader} style={titleTextStyle}>Processando Pagamento</div>
                                  <div className={style.timerContent} id={"juspayLogoStep10Subtitle"} style={subTextStyle}>Por favor, aguarde, está demorando mais do que o habitual.</div>
                                </div>
                                <div className={style.infoContainer2} id={"infoContainerStep10"}>
                                    <Image src="/demoapp/image/ofPlayground/info_gray.svg" alt="i" height={16} width={16}/>
                                    Por favor, não pressione voltar ou feche o aplicativo até que o pagamento seja concluído.</div>
                                  <Button text={"Cancelar Transação"} active={false} styles={{color: 'black',marginTop: '30%'}} id="buttonStep10" ofStyles={{color : buttonStyles?.backgroundColor}} onClick={() => goToPreviousStep?.(9)}/>
                                   
              </div>
              }
              
          footer = {
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId3"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>
          }
          />
    
          
      const step12= 
      <Layout  
          header = {<Header text=""  styles={headerStyles} desc={false} border={false} close={false} arrow={false} goToPreviousStep={goToPreviousStep} timeAndIcon={true}/>}
          content={
              <div className={style.juspayLoaderContainer}>
                  <Image id="finalLoaderId" src={`/demoapp/image/componentImages/logo.svg`} alt="bank" height={69} width={69} className={style.spin} />
                  <div  className={style.timerHeader} style={titleTextStyle}>Confirmando pagamento</div>
                  
                </div>}
          footer = {
            <div className={style.footerContainerPix}>
                <Image id="juspayViaOpenfinanceScreenId4"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo2" height={14} width={350} priority/>
            </div>
          }
          />
      
      const step13 = 
            <SuccessPageContainer goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} subTextStyle={subTextStyle} titleTextStyle={titleTextStyle} buttonStyle={buttonStyles}  setCurrentState={setCurrentState} />   
    
      const step14 = 
            <ReceiptPageContainer goToPreviousStep={goToPreviousStep} subTextStyle={subTextStyle} titleTextStyle={titleTextStyle} currentState={currentState}/>   



    
   const steps: { [key: number]: JSX.Element } = {
    1: step1,
    2: step2,
    3: step3,
    4: step4,
    5: step5,
    6: step6,
    7: step7,
    8: step8,
    9: step9,
    10: step10,
    11: step11,
    12: step12,
    13: step13,
    14:step14,
  };

  
  return (
    <>
    <div className={style.mobileContainer} style={{ position: "relative", overflow: "hidden" }}>

      {/* merchantName */}
      {steps[currentState] || null}  
      
     
    </div>
       <LineDotIndicator targetId="merchantName" color="green" offsetX={27} side={"left"} hoverText={t('guidelines:merchantName')} initialHover={true} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="itpHeader" color="green" offsetX={13} offsetY={100} side={"right"} hoverText={t('guidelines:openFinanceLabel')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="itpHeader" color="green" offsetX={13} offsetY={10} side={"right"} hoverText={t('guidelines:explicitPaymentRails')} initialHover={true} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="pageNumber1" color="green" offsetX={303} side={"right"} hoverText={t('guidelines:showProgress')} initialHover={true} resetOffset={40} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayViaOpenfinance" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:openFinanceLogo')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="sufficientBalance" color="green" offsetX={30} offsetY={-10} side={"right"} hoverText={t('guidelines:balanceWarning')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="todosBancos" color="green" offsetX={12} offsetY={57} side={"right"} hoverText={t('guidelines:markUnavailableBanks')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="caixaWarning" color="green" offsetX={27} offsetY={0} side={"right"} hoverText={t('guidelines:specificOutageMessages')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="descriptionId" color="green" offsetX={27} side={"right"} hoverText={t('guidelines:optionalDescription')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="infoContirmDetails" color="green" offsetX={35} side={"left"} hoverText={t('guidelines:balanceReminder')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="confirmationTNC" color="green" offsetX={170} side={"right"} hoverText={t('guidelines:termsAndConditionsLink')} resetOffset={20} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="redirectionDescId" color="green" offsetX={25} side={"right"} hoverText={t('guidelines:redirectionRoute')} initialHover={true} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      {/* <LineDotIndicator targetId="returnRedirectionDescId" color="green" offsetX={25} side={"right"} hoverText={t('guidelines:redirectionRoute')}/> */}
      <LineDotIndicator targetId="successDetailWrapper" color="green" offsetX={30} side={"left"} hoverText={t('guidelines:conciseSummary')} initialHover={true} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="recieptButtonId" color="green" offsetX={125} side={"right"} hoverText={t('guidelines:viewReceiptAction')} resetOffset={20} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="userBankDebitId" color="green" offsetX={30} side={"right"} hoverText={t('guidelines:labelPixOpenFinance')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} initialHover={true} />
      <LineDotIndicator targetId="redirectionSubHeaderId" color="green" offsetX={30} side={"right"} hoverText={t('guidelines:explainAuthorization')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} />
      <LineDotIndicator targetId="termsAConditionsContainerId" color="green" offsetX={95} offsetY={-55} side={"left"} hoverText={t('guidelines:primaryCTA')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} resetOffset={50}/>
      <LineDotIndicator targetId="termsAConditionsContainerId" color="green" offsetX={95} side={"left"} hoverText={t('guidelines:consentLine')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} />
      <LineDotIndicator targetId="stepContainerId" color="green" offsetX={30} offsetY={0} side={"right"} hoverText={t('guidelines:stepByStepSummary')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} />
      <LineDotIndicator targetId="juspayViaOpenfinanceScreenId" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:displayProvider')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="cpfCnpjSubTitleId" color="green" offsetX={50} offsetY={-4} side={"right"} hoverText={t('guidelines:explainWhyData')} resetOffset={40} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="cpfLabel" color="green" offsetX={24} side={"left"} hoverText={t('guidelines:guideFormat')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="confirmPaymentButton" color="green" offsetX={24} offsetY={0} side={"left"} hoverText={t('guidelines:blockContinuation')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="step2Id" color="green" offsetX={30} offsetY={-25} side={"right"} hoverText={t('guidelines:showProgress')} initialHover={true} resetOffset={40} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="sufficientBalance" color="green" offsetX={30} offsetY={5} side={"left"} hoverText={t('guidelines:informativeSection')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="searchBankInput" color="green" offsetX={30} side={"left"} hoverText={t('guidelines:provideBankSearch')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayViaOpenfinanceScreenId2" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:mentionInitiator')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayLogo" color="green" offsetX={160} side={"left"} hoverText={t('guidelines:redirectionScreen')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} initialHover={true}/>
      <LineDotIndicator targetId="loaderTextId" color="green" offsetX={80} side={"left"} hoverText={t('guidelines:mentionSelectedBank')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayLogoStep10" color="green" offsetX={160} side={"right"} hoverText={t('guidelines:intermediateStatus')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayLogoStep10Subtitle" color="green" offsetX={30} side={"left"} hoverText={t('guidelines:explainLongerProcessing')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="infoContainerStep10" color="green" offsetX={30} side={"left"} hoverText={t('guidelines:warnNotToClose')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayViaOpenfinanceScreenId3" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:maintainAttribution')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="buttonStep10" color="green" offsetX={30} offsetY={0} side={"left"} hoverText={t('guidelines:offerCancelOption')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="step3DisplayId" color="green" offsetX={303} side={"right"} hoverText={t('guidelines:showProgress')} initialHover={true} resetOffset={40} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="confirmDetailsBtnId" color="green" offsetX={24} offsetY={0} side={"right"} hoverText={t('guidelines:singlePrimaryCTA')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="confirmDetailsDeclineBtnId" color="green" offsetX={24} offsetY={0} side={"right"} hoverText={t('guidelines:provideSafeExit')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayViaOpenfinanceScreenId4" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:keepAttribution')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="finalLoaderId" color="green" offsetX={160} side={"right"} hoverText={t('guidelines:showProcessingStatus')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone} initialHover={true}/>
      <LineDotIndicator targetId="priceForSuccesPage" color="green" offsetX={30} side={"right"} hoverText={t('guidelines:highlightAmount')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="successPageButtonId" color="green" offsetX={30} side={"right"} hoverText={t('guidelines:safeExitAction')} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      <LineDotIndicator targetId="juspayViaOpenfinanceScreenId5" color="green" offsetX={20} side={"right"} hoverText={t('guidelines:keepAttribution')} resetOffset={0} firstHoverDone={firstHoverDone} setFirstHoverDone={setFirstHoverDone}/>
      
      
      
      
    </>
  );
  
} 

export default MobileViewPISP;
