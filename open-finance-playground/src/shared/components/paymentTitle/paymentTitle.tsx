"use client";
import style from "./paymentTitle.module.css";
import Image from "next/image";

interface PaymentDetails {
  title: string;
  offer?: string;
  pixIcon? : boolean;
  styles? : {
    headerText? : React.CSSProperties;
  }
}

const PaymentTitle: React.FC<PaymentDetails> = ({ title, offer, pixIcon, styles }) => {
  return (
    <div id={title==="Pague via Pix" ? "itpHeader": undefined} className={style.container} style={styles?.headerText}> 
      { pixIcon ? (
        <Image src ="/demoapp/image/paymentMethodImage/pixBio.svg" alt="Ícone Pix" width={20} height={20} className={style.pixIcon} />
      ) : null}
      <span className={style.titleLabel} style={styles?.headerText}>{title}</span>

      {offer ? (
        <>
          <span className={style.dot}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
            >
              <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
            </svg>
          </span>
          <span className={style.offers}>{offer} ofertas</span>
        </>
      ) : null}
    </div>
  );
};

export default PaymentTitle;
