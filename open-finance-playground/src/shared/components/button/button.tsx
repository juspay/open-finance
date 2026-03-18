"use client";
import style from "./button.module.css";

interface ButtonProps {
    text: string;
    disable? : boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    meubank? : boolean;
    active?:boolean;
    clickToPay?: boolean;
    styles?: React.CSSProperties;
    isLoading?: boolean; 
    ofStyles? : React.CSSProperties;
    id?: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ text ,disable=false, onClick,meubank=false, active=true,clickToPay,styles,isLoading, ofStyles, id}) => {
    const mergedStyles: React.CSSProperties = {
    ...styles,
    ...ofStyles,
  };
    return <button   id={id}  style={mergedStyles}
    className={`${style.container} ${disable ? style.disable : ""} ${meubank ? style.meuButton : ""} ${active ? "":style.notActive} ${(!active && !meubank) ? style.juspaynotActive:""} ${(clickToPay && !disable)? style.clickToPayButton : ""}`} disabled={disable} onClick={onClick} >
      {isLoading ? ( 
          <div className={style.loadingDotsContainer}>
            <span className={style.loadingDot}></span>
            <span className={style.loadingDot}></span>
            <span className={style.loadingDot}></span>
          </div>
        ) : (
          text
        )}
    </button>;
  };
  
  export default Button;
  