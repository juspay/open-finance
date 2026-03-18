"use client"
import style from "./inputField.module.css";
import { forwardRef, useRef } from "react";
import Image from "next/image";

interface InputFields extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  placeholder: string ;
  className?: string;
  type?: string;
  clear? : boolean;
  iconText? : string;
  iconTextOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  editable? : boolean;
  styles? : React.CSSProperties;
}

const InputField = forwardRef<HTMLInputElement, InputFields>(
  ({ label, icon, placeholder, className, clear, iconText, iconTextOnClick, type,editable =true,styles ,...props }, ref) => {
    
    const inputRef = useRef<HTMLInputElement | null>(null);
    const animateTyping = (text: string) => {
      if (!inputRef.current) return;
      inputRef.current.value = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          inputRef.current!.value += text[i];
          i++;
        } else {
          clearInterval(interval);
          
          props.onChange?.({
            target: { value: text },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }, 80);
    };
    const handleFocus = () => {
      if (label === "CPF" && styles) animateTyping("123.456.789-00");
      if (label === "CNPJ" && styles) animateTyping("12.345.678/0001-99");
    };
    
    return (
      <div className={style.container}>
        <div className={style.label}>{label}</div>
        <div className={style.inputWrapper}>
        {icon === "search" &&  <Image src={`/demoapp/image/componentImages/search20x20.svg`} alt="External Image" width={20} height={20} priority className={style.searchIcon}/>}

        <input
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            className={`${style.inputField} ${icon === "search"? style.withIcon : ""} ${clear ? style.withClearIcon : ""} ${className || ""}`}
            placeholder={placeholder}
            disabled={!editable}
            style={styles}
            onFocus={handleFocus}
            {...props}
          />
          {clear ? <Image src={"/demoapp/image/componentImages/xmark11x11.svg"} priority height={11} width={11} alt="xmark" className={style.clearIcon} onClick={(e) => {
                e.stopPropagation();
                props.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>); 
              }}/> : ""}
          

          
          {label === "Número do cartão" && (
            <div
              className={
                icon === "visa"
                  ? style.visaIcon
                  : icon === "masterCard"
                  ? style.masterCard
                  : style.emptyCard
              }
            ></div>
          )}
          {iconText === "Reenviar" && <div className={style.iconText} onClick={iconTextOnClick}>{iconText}
          </div>
          }
          
          {label === "CVV" && <div className={style.infoCircle}></div>}
          
        </div>
      </div>
    );
  }
);
InputField.displayName = "InputField";
export default InputField;