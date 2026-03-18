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

  const name = searchParams.get("name") || "Bruno A Oliveria";
  const total = searchParams.get("total") || "567";
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
    { key: "Prazo de pagamento", value: getCurrentDateTime() },
    { key: "Método de pagamento", value: paymentMethod },
    { key: "Nome do remetente", value: name },
  ];

  return (
    <Layout
      header={<div className={style.header} style={ofPlayground? {backgroundColor : "#820AD1", borderRadius: "24px 24px 0 0 "}:undefined}>Olá, usuário</div>}
      content={
        <div className={style.container}>
          <div className={style.bodyContainer}>
            <div className={style.details}>
              <div className={style.title}>{ofPlayground ? "Conta" :  "Saldo da conta"}</div>
              <div className={style.price}>R$ {total}</div>
              <div className={style.bankNo}>A/c num: 230456645</div>
            </div>

            <div className={style.buttonContainer}>
              <Button text="Estrate" meubank={true}  styles={ofPlayground?{ background: "#820AD1" ,    width: "50%"}:{width: "50%"}}/>
              <Button text="Transfer" meubank={true} active={false} styles={ofPlayground?{ border: "1px solid #820AD1" , color : "#820AD1",width: "50%"}:{width: "50%"}} />
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
            {ofPlayground? "Você confirma o pagamento para a SN Enterprise via Pix?" : "Você confirma o pagamento em Mystore via Pix?"}
          </div>
          <div className={style.price} style={ofPlayground?{fontFamily: "Inter", fontWeight: 600}:undefined}>R$ {total}</div>
          <div className={style.footerbankNo} style={ofPlayground?{fontFamily: "Inter"}:undefined}>{ofPlayground? "em 01/05/2022" : "A/c num: 230456645"}</div>

          <div className={style.footertableContainer} style={ofPlayground?{fontFamily: "Inter"}:undefined}>
            <div className={style.rowItem}>
              <span className={style.key}>Conta de origem</span>
              <span className={style.value}>MMRTEVS43</span>
            </div>
            <div className={style.rowItem}>
              <span className={style.key}>Agência</span>
              <span className={style.value}>87675342323</span>
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
