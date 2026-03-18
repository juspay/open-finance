"use client";
import React, { useState } from "react";
import Header from "@/shared/components/header/header";
import style from "./selectBankContainer.module.css";
import Layout from "@/shared/components/layout/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentMethodList from "@/shared/components/paymentMethodList/paymentMethodList";
import { ListItem } from "@/shared/types/listItem";
import InputField from "@/shared/components/inputField/inputField";
import Image from "next/image";
import PopupTemplate from "@/shared/components/popUpFooter/popupFooter";
import RedirectionPopup from "@/shared/components/redirectionPopup/redirectionPopup";
import Button from "@/shared/components/button/button";


interface SelectBankContainerProps {
    inputStyles? : React.CSSProperties;
    titleTextStyle? : React.CSSProperties;
    subTextStyle? : React.CSSProperties;
    selectTick? : React.CSSProperties;
    currentState? : number;
    setCurrentState? : React.Dispatch<React.SetStateAction<number>>;
    goToPreviousStep? : ()=>void;
    stepStyle? : React.CSSProperties;
    selectContainers? : boolean;
}
const SelectBankContainer: React.FC<SelectBankContainerProps> = ({inputStyles,titleTextStyle,subTextStyle, selectTick, currentState, setCurrentState,goToPreviousStep, stepStyle, selectContainers})=>{
    const searchParams = useSearchParams();
    const total = searchParams.get("total") || "567";
    const items = searchParams.get("items") || "3";

    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();


    const BankList: ListItem[] = [
        { name: "caixa", desc: "Caixa", subdesc: "" },
        { name: "bradesco", desc: "Bradesco", subdesc: "" },
        { name: "Pagbank", desc: "PagBank", subdesc: "" },
    ];
    const PopularBankList: ListItem[] = [
        {name:"bank_meubanco", desc:"Meu Banco", subdesc:""},
        { name: "nupayImage", desc: "NuBank", subdesc: "" },
        { name: "bancoBrasilImage", desc: "Banco Brasil", subdesc: "" },
        { name: "santanderbankImage", desc: "Santander", subdesc: "" },
    ];
    const filteredBanks = BankList.filter(bank =>
        bank.desc.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    const filteredPopularBanks = PopularBankList.filter(bank =>
        bank.desc.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const handleBankClick = (bankName: string) => {
        if (bankName === "bank_meubanco") {
            if (currentState){
                setCurrentState?.(currentState + 1);
                return;
            }
            router.push(`/pages/automaticoConfirmDetails?total=${total}&items=${items}`);
        }
    };

    return (
        <Layout  currentState={currentState}
            header={
                <Header text="" desc={false} border={false} goToPreviousStep={goToPreviousStep} timeAndIcon={titleTextStyle?true:false}/>
            }
            content={
                <div className={style.container}>
                    <div className={style.orderSummary}>
                        <div className={style.pageNumber} style={stepStyle}>
                            Passo {(currentState ?? 3)-2} de {currentState ? 3 : 2}
                        </div>
                        <div className={style.orderHeader} style={titleTextStyle} id ="step2Id">
                            Selecione um Banco
                        </div>
                        <div className={style.orderText} style={subTextStyle} id ="sufficientBalance">
                            Por favor, certifique-se de que você tem saldo suficiente para completar a transação. <span className={style.orderTextLink}>Saiba mais.</span>
                        </div>
                    </div>
                    <div className={style.searchBox}>
                        <InputField
                            id= "searchBankInput"
                            label=""
                            placeholder="Pesquisar seu banco"
                            type="search"
                            icon="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            clear={searchTerm.length > 0}
                            styles={inputStyles}
                        />
                    </div>
                    {filteredPopularBanks.length > 0 && <><div className={style.sectionHeader} style={titleTextStyle}>Bancos Populares</div>
                        <div className={style.bankListContainer} >
                            {filteredPopularBanks.map((ele, index) => (
                                <div className={style.bankItem} onClick={() => handleBankClick(ele.name)}>
                                    <div key={index} className={`${style.bankImageContainer} ${ele.name === 'bank_meubanco' ? style.ripple : ''}`}>
                                        <Image src={`/demoapp/image/bankImage/${ele.name}.svg`} alt="bank" height={24} width={24} className={style.image} />
                                    </div>
                                    <div className={style.bankName} style={titleTextStyle}>{ele.desc}</div>
                                </div>
                            ))}
                        </div></>}
                    {filteredBanks.length > 0  && <div className={style.sectionHeader} id= {"todosBancos"} style={titleTextStyle}>Todos os Bancos</div>}
                    <PaymentMethodList ListItems={filteredBanks} selectBank={true} bankList={true} itemCount={Number(items) || 0} total={Number(total) || 1} bottomCTA={true}   styles={{ desc: titleTextStyle , selectTick: selectTick}} selectContainers={selectContainers}/>
                </div>
            }
            footer={<div className={style.button}>
                <Button text="Concluir o pagamento" disable={true} />
                </div>}
        />
    );
}

export default SelectBankContainer;