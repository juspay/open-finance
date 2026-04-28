"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/shared/components/button/button";
import PopupTemplate from "@/shared/components/popUpFooter/popupFooter";
import style from "./meuBankHomeContainer.module.css";
import Layout from "@/shared/components/layout/Layout";

type MeuBankContainerProp = {
  ofPlayground? : boolean;
  goToNextStep? : ()=>void;
}

const MeuBankHomeContainer :React.FC<MeuBankContainerProp> = ({ofPlayground, goToNextStep}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Alice B. Charlie";
  const totalAcc = searchParams.get("total") || "942,25";
  const totalAccOF = searchParams.get("total") || "4.126,17";
  const total = searchParams.get("total") || "467,00";
  const items = searchParams.get("items") || "3";
  const paymentMethod = decodeURIComponent(searchParams.get("paymentMethod") || "PIX");


  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(",", ""); 
  };

  const tableContent = [
    { key: "Número de referência", value: "000085752257" },
    { key: "Data do pagamento", value: getCurrentDateTime() },
    { key: "Método de pagamento", value: paymentMethod },
    { key: "Nome do remetente", value: name },
  ];

  return (
    <Layout
      header={<div className={style.header} style={ofPlayground? {backgroundColor : "#820AD1", borderRadius: "24px 24px 0 0 ", fontFamily: "Inter"}:undefined}>Olá, Alice</div>}
      content={
        <div className={style.container} style={ofPlayground? {fontFamily: "Inter"}:undefined}>
          <div className={style.bodyContainer}>
            <div className={style.details}>
              <div className={style.title}>{ofPlayground ? "Conta" :  "Saldo da conta"}</div>
              <div className={style.price}>R$ {totalAcc}</div>
              <div className={style.bankNo}> (Saldo em outros bancos: R$ {totalAccOF}) </div>
            </div>

            <div className={style.buttonContainer}>
              <Button text="Meu Extrato" meubank={true}  styles={ofPlayground?{ background: "#820AD1" ,    width: "50%", fontFamily: "Inter"}:{width: "50%"}}/>
              <Button text="Área PIX" meubank={true} active={false} styles={ofPlayground?{ border: "1px solid #820AD1" , color : "#820AD1",width: "50%", fontFamily: "Inter"}:{width: "50%"}} />
            </div>

            <div>
              <div className={style.invoice}>Minha Fatura</div>
              <div className={style.tableWrapper}>
                {tableContent.map((ele, index) => (
                  <div key={index} className={style.tableContent}>
                    <div className={style.key}>{ele.key}</div>
                    <div className={style.value}>{ele.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      footer={
        <PopupTemplate translateYval={400} height={448} isOpenval={true} isdrag={true} ofPlayground={ofPlayground}>
          <div className={style.footertitle} style={ofPlayground?{fontFamily: "Inter", fontWeight: 600}:undefined}>
            {ofPlayground? "Você confirma o pagamento PIX para a MyStore Ltda" : "Você confirma o pagamento em MyStore via Pix?"}
          </div>
          <div className={style.price} style={ofPlayground?{fontFamily: "Inter", fontWeight: 600}:undefined}>R$ {total}</div>
          <div className={style.footerbankNo} style={ofPlayground?{fontFamily: "Inter"}:undefined}>{ofPlayground? "em " + (new Date()).toLocaleDateString('pt-BR') : "C/C: 230456645"}</div>

          <div className={style.footertableContainer} style={ofPlayground?{fontFamily: "Inter"}:undefined}>
            <div className={style.rowItem}>
              <span className={style.key}>Chave PIX (CNPJ):</span>
              <span className={style.value}>Y4.NNL.3ED/NAD9-04</span>
            </div>
          </div>
          <div className={style.footerButton}>
            <Button
              text="Confirmar"
              meubank={true}
             onClick={() => {
              if (ofPlayground && goToNextStep) {
                goToNextStep()
              } else {
                router.push(
                  `/pages/meuBankConfirmation?name=${encodeURIComponent(name)}&total=${total}&items=${items}&paymentMethod=${encodeURIComponent(paymentMethod)}`
                );
              }
            }}
              styles={ ofPlayground ? {background: "#820AD1", width:"100%"}:undefined }
            />
          </div>
        </PopupTemplate>
      }
    />
  );
};

export default MeuBankHomeContainer;
