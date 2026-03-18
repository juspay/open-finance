import style from "./location.module.css";

interface LocationProps {
    clickToPay? : boolean;
    styles?: {
        container?: React.CSSProperties;
        deliveryText?: React.CSSProperties;
        locationText?: React.CSSProperties;
        iconColor?: string;
  };
}
import iconStyle from "./locationIcon.module.css";
const Location : React.FC<LocationProps> = ({ clickToPay, styles}) => {
    return (
        <div className={style.container} style={styles?.container}>
            <span className={style.icon}>
                {clickToPay?
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M14.1453 3.40619C12.9605 2.18379 11.4173 1.51099 9.79972 1.51099C8.18212 1.51099 6.63815 2.18459 5.45255 3.40779C4.24935 4.64859 3.58855 6.31579 3.64055 7.98139C3.72375 10.6566 5.53335 12.6094 7.13015 14.3318C8.34852 15.6454 9.39972 16.7798 9.39972 17.911H10.1997C10.1997 16.7446 11.2533 15.6246 12.4725 14.327C14.0677 12.6302 15.8765 10.707 15.9597 7.98139C16.0109 6.31499 15.3493 4.64699 14.1453 3.40619Z" fill={styles?.iconColor ?? "#8B4513"}/>
                <path d="M7.68066 7.99109C7.68066 9.15992 8.63187 10.1111 9.80067 10.1111C10.9695 10.1111 11.9207 9.15992 11.9207 7.99109C11.9207 6.82229 10.9695 5.87109 9.80067 5.87109C8.63187 5.87109 7.68066 6.82229 7.68066 7.99109Z" fill={styles?.iconColor ?? "#8B4513"}/>
                </svg>
                :<svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        opacity="0.4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.1453 3.40619C12.9605 2.18379 11.4173 1.51099 9.79972 1.51099C8.18212 1.51099 6.63815 2.18459 5.45255 3.40779C4.24935 4.64859 3.58855 6.31579 3.64055 7.98139C3.72375 10.6566 5.53335 12.6094 7.13015 14.3318C8.34852 15.6454 9.39972 16.7798 9.39972 17.911H10.1997C10.1997 16.7446 11.2533 15.6246 12.4725 14.327C14.0677 12.6302 15.8765 10.707 15.9597 7.98139C16.0109 6.31499 15.3493 4.64699 14.1453 3.40619Z"
                        fill={styles?.iconColor ?? "#8B4513"}
                    />
                    <path
                        d="M7.68066 7.99109C7.68066 9.15992 8.63187 10.1111 9.80067 10.1111C10.9695 10.1111 11.9207 9.15992 11.9207 7.99109C11.9207 6.82229 10.9695 5.87109 9.80067 5.87109C8.63187 5.87109 7.68066 6.82229 7.68066 7.99109Z"
                        fill={styles?.iconColor ?? "#8B4513"}
                    />
                    </svg>
                }
            </span>
            <span className={style.deliveryText} style={styles?.locationText}>Entregando por  12 de abril  para</span>
            <span className={style.locationText} style={styles?.deliveryText}>Casa - Estrada Principal 890</span>           
        </div>
    )
}

export default Location
