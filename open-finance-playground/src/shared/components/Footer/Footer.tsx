import style from "./Footer.module.css";
import Image from "next/image";

interface FooterProps {
    bottom? : boolean;
    ofPlayground? : boolean;
    openFinance? : boolean;
  }

const Footer: React.FC<FooterProps> = ({ bottom=false,ofPlayground, openFinance}) => {
    return(
        <div style={ofPlayground?{backgroundColor: "#ffffff"}:undefined} className={`${style.container} ${bottom?style.bottom:null}`}>
            {openFinance?null:<span className={style.text}>garantido por</span>}
            {openFinance? <Image id="juspayViaOpenfinance"src={`/demoapp/image/componentImages/juspayViaOpenfinance.svg`} alt="juspayLogo" height={14} width={350} priority/>:<Image src={`/demoapp/image/componentImages/JUSPAYlogo.svg`} alt="juspayLogo" height={10} width={46} priority/>}
        </div>
    );
}

export default Footer