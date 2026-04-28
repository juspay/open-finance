"use client"
import { Fragment } from "react";
import style from "./receiptPageContainer.module.css";
import Layout from "@/shared/components/layout/Layout";
import Header from "@/shared/components/header/header";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


type ReceiptPageContainerProps = {
    goToPreviousStep? : ()=>void;
    subTextStyle? : React.CSSProperties| undefined;
    titleTextStyle? :React.CSSProperties | undefined;
    currentState? : number;

    
}

const ReceiptPageContainer : React.FC<ReceiptPageContainerProps> = ({goToPreviousStep,titleTextStyle, subTextStyle, currentState}) =>{

  const searchParams = useSearchParams();


    const name = searchParams.get("name") || "Alice B. Charlie";
    const total = searchParams.get("total") || "467";
    const paymentMethod = searchParams.get("paymentMethod") || "PIX";

    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
    };

    const ListItem = [
        {
            heading: "para",
            image:"fromImage",
            location: "MyStore Ltda",
            description: "Banco da Conta do Recebedor",
            details: [
                { title: "CNPJ", content: "Y4.NNL.3ED/NAD9-04" },
                { title: "Agencia", content: "0001" },
                { title: "Conta", content: "100000001-1" },
                { title: "Tipo de conta", content: "Conta Corrente" }
            ]
        },
        {
            heading: "de",
            image:"toImage",
            location: name,
            description: "Nu Pagamentos S.A.",
            details: [
                { title: "CPF", content: "***.456.789-**" },
                { title: "Agencia", content: "0001" },
                { title: "Conta", content: "10000002-3" },
                { title: "Tipo de conta", content: "Conta de Pagamento" }
            ]
        }
    ];
    
    return(
        <Layout currentState={currentState}
        header={<Header text="" close={true} desc={false} arrow={false} border={false} goToPreviousStep={goToPreviousStep} timeAndIcon={titleTextStyle? true : false}/>}
        content={
          <div className={style.container}>
                <div className={style.receiptHeader}>
                    <div className={style.headerTextContainer}>
                        <div className={style.headerTitle} style={titleTextStyle}>Recibo</div>
                        <div className={style.timeText} style={subTextStyle}>{getCurrentDateTime()}</div>
                    </div>
                    {titleTextStyle? <div className={style.iconContainers}>
                        <div className={style.usableIcons}>
                        <Image src={"/demoapp/image/componentImages/shareIcon.svg"} alt="share" height={16} width={16} priority/>
                        </div>
                        <div className={style.usableIcons}>
                        <Image src={"/demoapp/image/ofPlayground/download-icon.svg"} alt="share" height={16} width={16} priority/>
                        </div>
                    </div> : <div className={style.shareButton}>compartilhar <Image src={"/demoapp/image/componentImages/shareIcon.svg"} alt="share" height={16} width={16} className={style.shareImage} priority/></div>}
                </div>

                <div className={style.summaryContainer} style={titleTextStyle?{margin:'0px',padding : '20px'}:undefined}>
                    <Image src={"/demoapp/image/componentImages/dollar.svg"} alt="dollar" height={24} width={24} priority/>
                    <div className={style.summaryText} style={subTextStyle}>
                        <div className={style.total} style={titleTextStyle} >R$ {total}</div>
                        <div className={style.paymentMethod}>{paymentMethod} via Open Finance</div>
                    </div>
                </div>
                {titleTextStyle?<div style={{borderBottom: "1px dashed #E0E0E0",margin:'0px 12px '}}></div>:null}

                <div className={style.billContainer}>
                    {ListItem.map((item, index) => (
                        <Fragment key={index}>
                        <div className={style.billItems} style={titleTextStyle?{margin:'0px',padding : '20px'}:undefined}>
                            <Image src={`/demoapp/image/componentImages/${item.image}.svg`} alt="icons" height={34} width={34} priority/>
                            <div className={style.billStructure}>
                                <div className={style.textContainer}>
                                    <div className={style.heading} >{item.heading}</div>
                                    <div className={style.subheading} style={titleTextStyle}>{item.location}</div>
                                </div>
                                <div className={style.description} style={subTextStyle}>{item.description}</div>
                                <div className={style.detailsContainer}>
                                    {item.details.map((detail, idx) => (
                                        <div key={idx} className={style.tableRow}>
                                            <span className={style.rowTitle}>{detail.title}</span> <span className={style.rowContent}>{detail.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {titleTextStyle?<div style={{borderBottom: "1px dashed #E0E0E0",margin:'0px 12px '}}></div>:null}
                        </Fragment>
                    ))}
                </div>
                
                {titleTextStyle?<div className={style.summaryContainer} style={{margin:'0px',padding : '20px'}}>
                    <Image src={"/demoapp/image/ofPlayground/iniciador-icon.svg"} alt="dollar" height={24} width={24} priority/>
                    <div className={style.summaryText}>
                        <div className={style.paymentMethod} style={subTextStyle}>realizado via</div>
                        <div className={style.total} style={titleTextStyle}>Cumbuca IP LTDA</div>
                    </div>
                </div>:null}
          </div>
        }
        footer={
          <></>
        }
      />
        
    );
}


export default ReceiptPageContainer;