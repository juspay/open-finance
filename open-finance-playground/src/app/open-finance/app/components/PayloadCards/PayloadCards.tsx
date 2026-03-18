"use client";
import { useEffect, useState } from "react";
import styles from "./PayloadCards.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PayloadCardProps {
  stepTitle: string;
  time?: string;
  method?: string;
  url?: string;
  requestHeaders?: Record<string, string | undefined> | string;
  requestBody?: object | string;
  responseBody?: object | string;
  highlight?: boolean;
}

const CollapsibleSection = ({
  title,
  content,
}: {
  title: string;
  content: string | object;
}) => {
  const [open, setOpen] = useState(false);

  const displayContent =
    typeof content === "string"
      ? content
      : JSON.stringify(content, null, 2);

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionHeaderRow}
        onClick={() => setOpen(!open)}
      >
        <p className={styles.sectionHeader}>{title}</p>
         <motion.span
          className={styles.toggleIcon}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          >
            <Image
              src="/demoapp/image/ofPlayground/arrow-down.svg"
              alt={open ? "collapse" : "expand"}
              height={24}
              width={24}
              priority
            />
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
        {open && (
          <motion.pre
            className={styles.code}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {displayContent}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
};

const PayloadCard: React.FC<PayloadCardProps> = ({
  stepTitle,
  time,
  method,
  url,
  requestHeaders,
  requestBody,
  responseBody,
  highlight = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

   const handleClick = () => {
    if (!highlight) setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    setIsOpen(false);
  }, [highlight]);

  return (
    <>
      <div className={`${styles.card} ${ !highlight ? styles.disabledCard : isOpen ? styles.highlight : ""}`}
      onClick={handleClick}
      style={!highlight ? { cursor: "not-allowed" } : {}}
    >
        <div
          className={styles.cardHeaderRow}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className={styles.title}>{stepTitle}</p>
          {/* {time && <p className={styles.time}>{time}</p>} */}
        </div>

        <AnimatePresence>
        {isOpen && (
          <motion.div
              className={styles.cardContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            {url && (
              <p className={styles.apiEndpoint}>
                {method? <strong className={styles.urlMethod}>{method}</strong>:null} {url}
              </p>
            )}

            {requestHeaders && (
              <CollapsibleSection
                title={t("payloadCards.requestHeader")}
                content={requestHeaders}
              />
            )}

            {requestBody && (
              <CollapsibleSection
                title={t("payloadCards.requestBody")}
                content={requestBody}
              />
            )}

            {responseBody && (
              <CollapsibleSection
                title={t("payloadCards.responseBody")}
                content={responseBody}
              />
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PayloadCard;
