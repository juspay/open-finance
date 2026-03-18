"use client";
import style from "./containerSection.module.css";
import Image from "next/image";
import { useTranslation } from 'react-i18next';


type ContainerSectionProps = {
  sectionKey: string;
  sectionDetail: Record<string, any>;
  onChange: (field: string, value: any) => void;
};


const optionsMap: Record<string, string[]> = {
  baseFontWeight: ["light", "regular", "medium", "bold"],
  labels: ["above", "inline"],
  fontFamily: ["Figtree", "DM Sans", "Inter", "Roboto"], 
  language: ["en", "pt"],
};

const languageDisplayMap: Record<string, string> = {
  en: "🇺🇸 English",
  pt: "🇧🇷 Português",
};

const ContainerSection: React.FC<ContainerSectionProps> = ({ sectionKey, sectionDetail, onChange }) => {
  const { t } = useTranslation();
  
  const formatLabel = (key: string) =>{
    const translationKey = `simulator.fields.${key}`;
    const translated = t(translationKey);
    
    if (translated !== translationKey) {
      return translated;
    }
    
    key
      .replace(/([A-Z])/g, " $1") // split camelCase
      .replace(/^./, (str) => str.toUpperCase());  
  }
    
      
return (
    <section className={style.containerSection}>
      <h5 className={style.sectionTitle}>{sectionKey}</h5>

      {Object.entries(sectionDetail).map(([field, value]) => {
        const label = formatLabel(field);

        if (optionsMap[field]) {
          return (
            <div key={field} className={style.fieldRow}>
              <label className={style.label}>{label}</label>
              <select
                className={style.input}
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
              >
                {optionsMap[field].map((opt) => {
                  let displayValue = opt;
                  
                  if (field === "language" && languageDisplayMap[opt]) {
                    displayValue = languageDisplayMap[opt];
                  } 
                  else {
                    const optionKey = `simulator.options.${field}.${opt}`;
                    const translated = t(optionKey);
                    displayValue = translated !== optionKey 
                      ? translated 
                      : opt.charAt(0).toUpperCase() + opt.slice(1);
                  }
                  
                  return (
                    <option key={opt} value={opt}>
                      {displayValue}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }

        if (typeof value === "string" && value.startsWith("#")) {
          return (
            <div key={field} className={style.fieldRow}>
              <label className={style.label}>{label}</label>
              <div className={style.colorInputBox}>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(field, e.target.value)}
                  className={style.colorPicker}
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    let newValue = e.target.value.startsWith("#")
                      ? e.target.value
                      : "#" + e.target.value;
                    if (newValue === "") newValue = "#";
                    onChange(field, newValue);
                  }}
                  className={style.colorCode}
                />
              </div>
            </div>
          );
        }
        
        if (["baseFontSize", "lineHeight", "borderRadius"].includes(field)) {
          const suffix = field === "lineHeight" ? "%" : "px";
          const numericValue = parseFloat(value) || 0;

          const handleIncrement = (delta: number) => {
            const newValue = Math.max(0, numericValue + delta);
            onChange(field, newValue + suffix);
          };
          
          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              handleIncrement(1);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              handleIncrement(-1);
            }
          };

          return (
            <div key={field} className={style.fieldRow}>
              <label className={style.label}>{label}</label>
              <div className={style.inputWrapper}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(field, e.target.value)}
                  className={`${style.input} ${style.numberInput}`}
                  onKeyDown={handleKeyDown}
                />

                <div className={style.arrows}>
                  <Image
                    src="/demoapp/image/ofPlayground/input-up.svg"
                    alt ="up"
                    height={4}
                    width={8}
                    className={style.arrowUp}
                    onClick={() => handleIncrement(1)}
                  />
                  <Image
                    src="/demoapp/image/ofPlayground/input-down.svg"
                    alt="down"
                    height={4}
                    width={8}
                    className={style.arrowDown}
                    onClick={() => handleIncrement(-1)}
                  />
                </div>
              </div>
            </div>
          );
        }

        

        return (
          <div key={field} className={style.fieldRow}>
            <label className={style.label}>{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              className={style.input}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ContainerSection;