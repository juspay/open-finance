"use client";
import React, { Suspense, useState, useEffect, useRef } from "react";
import style from "../page.module.css";
import SideBarLayout from "../app/components/sidebar/sidebar";
import { SimulatorState } from "../app/components/types/simulator";
import MobileViewPISP from "../app/components/mobileView/mobileTemplate";
import MobileViewBiometric from "../app/components/mobileViewBiometric/mobileTemplate";
import Image from "next/image";
import { motion } from "framer-motion";
import "../global.css";
import { useTheme } from "@/app/open-finance/context/ThemeContext";


export default function MobileViewPage() {
  
  const { language } = useTheme();
  
  const defaultSimulatorState: SimulatorState = {
  layout: "boxed",
  colors: {
    backgroundColor: "#f6f7f7",
    primaryColor: "#111111",
    primaryTextColor: "#111111",
    secondaryTextColor: "#A6A6BD",
  },
  typography: {
    fontFamily: "Figtree",
    baseFontSize: "14px",
    baseFontWeight: "regular",
    lineHeight: "120%",
  },
  formFields: {
    borderRadius: "14px",
  },
  language: language,
};


  useEffect(() => {
  setSimulatorState((prev) => ({
    ...prev,
    language,
  }));
}, [language]);
  

  const [simulatorState, setSimulatorState] = useState<SimulatorState>(
    defaultSimulatorState
  );
  const [currentState, setCurrentState] = useState(1);
  const [currentStateBio, setCurrentStateBio] = useState(1);
  
  const [selectedFlow, setSelectedFlow] = useState<"pisp" | "bio">("pisp");
  const [open , setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
   useEffect(() => {
    const savedFlow = localStorage.getItem("selectedFlow");
    if (savedFlow === "bio" || savedFlow === "pisp") {
      setSelectedFlow(savedFlow);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedFlow", selectedFlow);
  }, [selectedFlow]);

  return (
    <Suspense>
      <div className={style.baseContainer}>
        <motion.div
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={style.sidebarContainer}
        >
          <SideBarLayout
            simulatorState={simulatorState}
            setSimulatorState={setSimulatorState}
          />
        </motion.div>

        <motion.div
          className={style.mobileViewContainer}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
       <div className={style.topBar}>
          <div className={style.selectWrapper} ref={dropdownRef}>
            <div
              className={style.customSelect}
              onClick={() => setOpen(!open)}
            >
              <span>
                {selectedFlow === "pisp" ? "Redirection" : "JSR"}
              </span>
              <Image
                src="/demoapp/image/ofPlayground/dropdow-arrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className={`${style.arrowIcon} ${open ? style.rotate : ""}`}
              />
            </div>

            {open && (
              <ul className={style.dropdownMenu}>
                <li
                  className={`${style.option}`}
                  onClick={() => {
                    setSelectedFlow("pisp");
                    setOpen(false);
                  }}
                >
                  Redirection
                </li>
                <li
                  className={`${style.option}`}
                  onClick={() => {
                    setSelectedFlow("bio");
                    setOpen(false);
                  }}
                >
                  JSR
                </li>
              </ul>
            )}
          </div>
        </div>

           {selectedFlow === "pisp" ? (
            <MobileViewPISP
              simulatorState={simulatorState}
              currentState={currentState}
              setCurrentState={setCurrentState}
            />
          ) : (
            <MobileViewBiometric
              simulatorState={simulatorState}
              currentState={currentStateBio}
              setCurrentState={setCurrentStateBio}
            />
          )}

           <div className={style.bottomBar}>
              {/* <div className={style.deviceToggle}>
                        <button className={`${style.deviceButton} ${style.active}`}> iOS</button>
                        <button className={style.deviceButton}>💻 Web</button>
                      </div> */}
            </div>
        </motion.div>

        <motion.div
          initial={{ x: 160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className={style.sidebarContainer}
        >
          {
            <SideBarLayout
            simulatorState={simulatorState}
            setSimulatorState={setSimulatorState}
            payload={true}
            currentState={selectedFlow === "pisp" ? currentState : currentStateBio}
            selectedFlow={selectedFlow}
          />
          
          }
        </motion.div>
      </div>
    </Suspense>
  );
}
