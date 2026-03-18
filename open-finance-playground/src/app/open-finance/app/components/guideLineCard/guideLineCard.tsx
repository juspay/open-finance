"use client";
import styles from "./guideLineCard.module.css";
import { useTranslation } from 'react-i18next';

type GuideLineCaardProps =
 {
  success : Boolean;
 }

const GuidelineCard : React.FC<GuideLineCaardProps> = (success) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.dot}></div>
        <div className={styles.content}>
          <p className={styles.title}>{t("ofguidelinesmet")}</p>
        </div>
      </div>
    </div>
  );
};

export default GuidelineCard;
