"use client";
import style from "./confirmBiometricoDetails.module.css";
import Layout from "@/shared/components/layout/Layout";
import Button from "@/shared/components/button/button";
import Footer from "@/shared/components/Footer/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Header from "@/shared/components/header/header";
import Image from "next/image";

type ConfirmBiometricProp = {
  headerStyles?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
  };
  titleTextStyle?: React.CSSProperties | undefined;
  subTextStyle?: React.CSSProperties | undefined;
  buttonStyles?: React.CSSProperties | undefined;
  importantNote?: React.ReactNode;
  goToNextStep?: () => void;
  goToPreviousStep?: (step?:number) => void;
  stepStyle? : React.CSSProperties;
  inputStyles?: React.CSSProperties | undefined;
  showStep? : Boolean;
  stepsToGoBack? : number;
};

const ConfirmBiometricoDetailsContainer: React.FC<ConfirmBiometricProp> = ({
  headerStyles,
  titleTextStyle,
  subTextStyle,
  buttonStyles,
  importantNote,
  goToNextStep,
  goToPreviousStep,
  stepStyle,
  inputStyles,
  showStep = "true",
  stepsToGoBack
}) => {
  const [description, setDescription] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const total = searchParams.get("total") || 567;
  const items = searchParams.get("items") || 3;
  const auth = searchParams.get("auth") || "false";
  return (
    <Layout
      header={
        <>
          {headerStyles && (
            <Header
              text=""
              desc={false}
              styles={headerStyles}
              border={false}
              goToPreviousStep={goToPreviousStep}
              timeAndIcon={true}
              stepsToGoBack = {stepsToGoBack}
            />
          )}
        </>
      }
      content={
        <div
          className={style.container}
          style={
            headerStyles
              ? {
                  padding: "16px 16px 0",
                  fontFamily: headerStyles?.title?.fontFamily,
                }
              : undefined
          }
        >
        {goToNextStep && showStep && <div id= {"step3DisplayId"}style={stepStyle}>Passo 3 de 3</div>}
          <div
                className={style.headerText}
                style={{
                    ...titleTextStyle,
                    ...(titleTextStyle ? { padding: "4px 0 32px", fontSize:'16px' } : {}),
                }}
                >
            {titleTextStyle ? "Confirmar Detalhes" : "Detalhes do pagamento"}
          </div>
          <div className={style.tableRow} style={titleTextStyle? {paddingBottom: '24px'}:undefined}>
            <span className={style.tableKey} style={subTextStyle}>
              Valor a pagar
            </span>{" "}
            <span className={style.tableValue} style={titleTextStyle}>
              ${total}
            </span>
          </div>
          <div className={style.tableRow} style={titleTextStyle? {paddingBottom: '24px'}:undefined}>
            <span className={style.tableKey} style={subTextStyle}>
              De
            </span>{" "}
            <span className={style.tableValueContainer} style={titleTextStyle? {gap: '8px'}:undefined}>
              {!titleTextStyle ? (
                    <>
                    <div className={style.tableValue} style={titleTextStyle}>
                        Bruno
                    </div>
                    <div className={style.tableSubValue}>Meu Banco - Conta Corrente</div>
                    <div className={style.tableSubValue}>CPF: 123.456.769-56</div>
                    <div className={style.tableSubValue}>CNPJ: 123.456.769.001/01</div>
                    </>
                ) : (
                    <>
                        <div className={style.tableValue} style={{...titleTextStyle, textAlign: 'end'}}>Bruno Oliveira</div>
                        <div className={style.tableSubValue} style={{fontSize:`12px`}}>Meu Banco - Conta Corrente</div>
                    </>
                )}
            </span>
          </div>
          <div className={style.tableRow} style={titleTextStyle? {paddingBottom: '24px'}:undefined}>
            <span className={style.tableKey} style={subTextStyle}>
              Para
            </span>{" "}
            <span className={style.tableValueContainer} style={titleTextStyle? {gap: '8px'}:undefined}>
              <div
                className={style.tableValue}
                style={{...titleTextStyle, textAlign: 'end'}}
                id="merchantName"
              >
                {!titleTextStyle? "Nespresso Coffee" : "<Merchant Name>"}
              </div>
              <div className={style.tableSubValue} style={titleTextStyle?{fontSize:`12px`}:undefined}>CNPJ: **.456.769.897/**</div>
            </span>
          </div>
          <div className={style.tableRow} style={titleTextStyle? {paddingBottom: '24px'}:undefined}>
            <span className={style.tableKey} style={subTextStyle}>
              Forma de Pagamento
            </span>{" "}
            <span className={style.tableValueContainer}>
              <div className={style.tableValue} style={titleTextStyle}>
                Pix
              </div>
            </span>
          </div>
          <div className={style.tableRow} style={titleTextStyle? {paddingBottom: '24px'}:undefined}>
            <span className={style.tableKey} style={subTextStyle}>
              Data de pagamento:
            </span>{" "}
            <span className={style.tableValueContainer}>
              <div className={style.tableValue} style={titleTextStyle}>
                {new Date().toLocaleDateString("pt-BR")}
              </div>
            </span>
          </div>
          <div className={style.inputFieldTitle} style={subTextStyle}>
            Descrição:
          </div>
          <input
            type="text"
            id="descriptionId"
            value={description}
            placeholder={"Descreva o motivo do pagamento"}
            onChange={(e) => setDescription(e.target.value)}
            className={style.inputField}
            style={inputStyles}
          />
          {importantNote}
        </div>
      }
      footer={
        <>
          <div className={style.footerButtons} style={inputStyles?{backgroundColor:"white"} :undefined}>
            <Button
              text="Continuar"
              id="confirmDetailsBtnId"
              onClick={() =>
                goToNextStep
                  ? goToNextStep()
                  : router.push(
                      `/pages/pixBiometrico/paymentPage?isPopupVisible=true&total=${total}&items=${items}&currentPage=ProcessingPayment&auth=${auth}`
                    )
              }
              styles={buttonStyles}
            />
            <Button
              text="Agora nao"
              id="confirmDetailsDeclineBtnId"
              active={false}
              onClick={() =>
                goToPreviousStep
                  ? setShowConfirmPopup(true)
                  : router.push(
                      `/pages/pixBiometrico/paymentPage?total=${total}&items=${items}`
                    )
              }
              styles={{color : buttonStyles?.backgroundColor}}
            />
          </div>
          {!goToPreviousStep?<Footer openFinance={goToPreviousStep?true:false}/> : null}
          {showConfirmPopup && (
            <div className={style.popupOverlay}>
              <div className={style.popupBox}>
                <div className={style.popupTitle} style={titleTextStyle} >
                  <Image src={"/demoapp/image/ofPlayground/alert-circle.svg"} alt="close" height={24} width={24} />
                  Tem certeza de que deseja sair?</div>
                <div className={style.popupSubTitle}>Falta apenas um passo para concluir o seu pagamento. Voltar ao início cancelará o processo de pagamento.</div>
                <div className={style.popupButtons}>
                  <button
                    style={{color : buttonStyles?.backgroundColor}}
                    className={`${style.popupBtn} ${style.popupNo}`}
                    onClick={() => setShowConfirmPopup(false)}
                  >
                    Sair
                  </button>
                  <button
                    className={`${style.popupBtn} ${style.popupYes}`}
                    onClick={() => {
                      setShowConfirmPopup(false);
                      if (goToPreviousStep)  goToPreviousStep(stepsToGoBack?stepsToGoBack : 5);
                      else
                        router.push(
                          `/pages/pixBiometrico/paymentPage?total=${total}&items=${items}`
                        );
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default ConfirmBiometricoDetailsContainer;
