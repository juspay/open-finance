"use client";
import style from "./sidebarFilter.module.css";
import { SimulatorState } from "../types/simulator";
import Image from "next/image";
import ContainerSection from "../containerSection/containerSection";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { useTheme } from "@/app/open-finance/context/ThemeContext";
import React, { useState } from "react";


type SideBarFilterProps = {
  simulatorState: SimulatorState;
  setSimulatorState: React.Dispatch<React.SetStateAction<SimulatorState>>;
};

const layoutOptions = [
  { type: "boxed", icon: "/demoapp/image/ofPlayground/layout-boxed.svg" },
  { type: "full width", icon: "/demoapp/image/ofPlayground/layout-full.svg" },
  // { type: "merged", icon: "/demoapp/image/ofPlayground/layout-merged.svg" },
  // { type: "accordion", icon: "/demoapp/image/ofPlayground/layout-accordion.svg" },
] as const;

const SideBarFilter: React.FC<SideBarFilterProps> = ({ simulatorState, setSimulatorState }) => {
  const {  t } = useTranslation();
  const { toggleLanguage } = useTheme();
  const handleLayoutChange = (layout: SimulatorState["layout"]) => {
    setSimulatorState((prev) => ({
      ...prev,
      layout,
    }));
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const languageLabel =
    simulatorState.language === "en" ? "English" : "Português";

  return (
    <div>
      <div className={style.sideBarHeader}>
        <div className={style.sideBarTitleContainer}>
          <Image src={"/demoapp/image/ofPlayground/ofBackIcon.svg"} alt="key" height={20} width={20} priority onClick={() => router.push("/open-finance")}  style={{ cursor: "pointer" }}/>
          <h4 className={style.sideBarTitle}>{t('simulator.title')}</h4>  
        </div>
        <div className={style.languageWrapper}>
            <button
              type="button"
              className={style.languageSelect}
              onClick={() => setOpen((v) => !v)}
            > 
              <span className={style.dropdownName}>
                {languageLabel}
              </span>
              
              <Image
                src="/demoapp/image/ofPlayground/dropdow-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className={`${style.arrowIcon} ${open ? style.rotate : ""}`}
              />
            </button>

            {open && (
              <ul className={style.dropdownMenu}>
                <li
                  className={style.option}
                  onClick={() => {
                    if (simulatorState.language !== "en") {
                      setSimulatorState((prev) => ({ ...prev, language: "en" }));
                      toggleLanguage();
                    }
                    setOpen(false);
                  }}
                >
                  English
                </li>

                <li
                  className={style.option}
                  onClick={() => {
                    if (simulatorState.language !== "pt") {
                      setSimulatorState((prev) => ({ ...prev, language: "pt" }));
                      toggleLanguage();
                    }
                    setOpen(false);
                  }}
                >
                  Português
                </li>
              </ul>
            )}
          </div>
      </div>
      <div className={style.section} >
        <div className={style.sectionContainer}>
          <div>
            <h5 className={style.subheading} >{t('simulator.layout')}</h5>
            <div className={style.layoutGrid}>
              {layoutOptions.map((option) => {
                return (
                  <div
                    key={option.type}
                    className={`${style.layoutItemContainer} `}
                  >
                    <div
                      className={`${style.layoutItem} ${
                        simulatorState.layout === option.type ? style.selected : ""
                      } `}
                      onClick={() => handleLayoutChange(option.type) }
                    >
                      <Image src={option.icon} alt={option.type} width={32} height={32} />
                    </div>
                    <div className={style.optionText}>{t(`simulator.layoutTypes.${option.type.replace(' ', '')}`)}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <ContainerSection
            sectionKey={t('simulator.colors')}
            sectionDetail={simulatorState.colors}
            onChange={(field, value) =>
              setSimulatorState((prev) => ({
                ...prev,
                colors: {
                  ...prev.colors,
                  [field]: value,
                },
              }))
            }
          />
          
          <ContainerSection
            sectionKey={t('simulator.typography')}
            sectionDetail={simulatorState.typography}
            onChange={(field, value) =>
              setSimulatorState((prev) => ({
                ...prev,
                typography: {
                  ...prev.typography,
                  [field]: value,
                },
              }))
            }
          />
          
          <ContainerSection
            sectionKey={t('simulator.formFields')}
            sectionDetail={simulatorState.formFields}
            onChange={(field, value) =>
              setSimulatorState((prev) => ({
                ...prev,
                formFields: {
                  ...prev.formFields,
                  [field]: value,
                },
              }))
            }
          />
          
          {/* <ContainerSection
            sectionKey={t('simulator.language')}
            sectionDetail={{ language: simulatorState.language }}
            onChange={(field, value) => {
              const lang = value === "English" ? "en" : "pt";
              setSimulatorState((prev) => ({
                ...prev,
                language: lang,
              }));
              toggleLanguage();
            }}
          />
           */}
         

          
        </div>
        
      </div>
      
    </div>
  );
};

export default SideBarFilter;