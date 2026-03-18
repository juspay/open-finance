"use client";
import { useState, useEffect } from "react";
import style from "./popupFooter.module.css";

interface PopupTemplateProps {
  children: React.ReactNode;
  height: number;
  isOpenval?: boolean;
  closable?: boolean;
  handleClosePopup?: ()=>void;
  isdrag? : boolean;
  styles? : object;
  overlay?:boolean;
  translateYval: number;
  setIsPopupVisible?: (isVisible: boolean) => void;
  xmark? : boolean;
  onClose?: () => void;
  ofPlayground?: boolean;

}

const PopupTemplate: React.FC<PopupTemplateProps> = ({
  children,
  height,
  isOpenval = false,
  closable = false,
  handleClosePopup,
  isdrag,
  styles,
  translateYval,
  xmark=false,
  onClose,
  ofPlayground

}) => {
  const [isOpen, setIsOpen] = useState(isOpenval);

  const [isClose,setIsClose] =useState(false);
  
  useEffect(() => {
    if (isOpenval) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isOpenval]);

  const handlePopup = () => {
    setIsClose(true);
    onClose?.();
    setTimeout(() => {
      setIsOpen(false);
      handleClosePopup?.();
    }, 300); 
};

  return (
    <>
      <div className={style.overlay} style={ofPlayground? {borderRadius : "24px 24px 0 0 "}: undefined}></div>
        <div className={`${style.closableFooter} ${isClose ? style.closeAnimation : style.openAnimation}`}  style={{height: `${height}px`, ...styles }} >
            <div className={style.closeContainer}>
                {closable?<div className={style.close} onClick={handlePopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                        <g clipPath="url(#clip0_2709_2839)">
                        <path d="M17.1875 4.8125L4.8125 17.1875" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.1875 17.1875L4.8125 4.8125" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2709_2839">
                        <rect width="22" height="22" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>:null}
                {isdrag?<div className={style.dragIndicator} style={ofPlayground?{backgroundColor: "#F1EFF1"}:undefined}></div>:null}

                {children}

            </div>
            </div>
    </>
  );
};

export default PopupTemplate;
