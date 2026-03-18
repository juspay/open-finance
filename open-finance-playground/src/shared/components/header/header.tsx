"use client";
import style from "./header.module.css";
import { IoArrowBack } from "react-icons/io5";
import { useRouter ,usePathname} from "next/navigation";
import Image from "next/image";
import { useState,useEffect } from "react";

interface HeaderProps {
    text: string;
    desc? : boolean;
    arrow? : boolean;
    close? : boolean;
    border? : boolean;
    totalPrice? : number;
    totalItem? :number;
    timeAndIcon? : boolean;
    styles?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
  };
    goToPreviousStep? : (step?:number)=>void;
    stepsToGoBack? : number;
  
  }

const Header: React.FC<HeaderProps> = ({ text ,desc=true, arrow=true, close=false, border=true, totalPrice=567, totalItem=3,styles,goToPreviousStep, timeAndIcon,stepsToGoBack}) => {
   

    const router = useRouter();
    const pathname = usePathname();
    const handleBackClick = () => {
        if (goToPreviousStep){
            goToPreviousStep(stepsToGoBack?stepsToGoBack:1);
        }
        else if (pathname !== "/") {
            router.back();
        }
    };
    const [time, setTime] = useState("");
    useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); 
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
    return (
        <>
        {timeAndIcon? <div className={style.timeAndIcons}>
                <div className={style.time}>{time}</div>
                <Image src={"/demoapp/image/ofPlayground/phone-icons.svg"} height={12} width={70} alt="phone-icons" priority></Image> 
            </div> : null}
        <div className={`${style.container} ${border?style.borderBottom:""}`}style={{ ...styles?.container,...(styles && text === "" && { maxHeight: "45px" }),
}}>
            {arrow?<div className={style.back} onClick={handleBackClick}>
                <Image src={"/demoapp/image/componentImages/back.svg"} height={13} width={16} alt="back" priority></Image>
            </div>:null}
            <div className={style.headerTitle} style={styles?.title}>
                <div className={style.items} style={styles?.title}>{text}</div>
               {desc ? <div className={style.description} style={styles?.description}>{totalItem == 0 ? "Premium Plano" : `${totalItem} items`} <span className={style.dot}></span>Valor do pedido: <span style={
                    styles?.title
                    ? { ...styles.title, paddingLeft: "5px" }
                    : undefined
                }>R$ {totalPrice}</span></div>:null}
            </div>
            {close?<div className={style.close} onClick={handleBackClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <g clipPath="url(#clip0_2709_2839)">
                <path d="M17.1875 4.8125L4.8125 17.1875" stroke="#454545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.1875 17.1875L4.8125 4.8125" stroke="#454545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2709_2839">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            </div>:null}
        </div>
        </>
    )
}

export default Header