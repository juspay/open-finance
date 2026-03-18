"use client";
import React, { useState, useEffect } from "react";
import style from "./pinInput.module.css";
import Image from "next/image";

type PinInputProps = {
  goToNextStep?: () => void;
  goToPreviousStep?: (stepsBack?: number) => void;
  titleStyle: React.CSSProperties | undefined;
};

const TARGET_PIN = "1234";
const INITIAL_DELAY = 1000;
const FILL_DELAY = 500;

const PinInput: React.FC<PinInputProps> = ({
  goToNextStep,
  goToPreviousStep,
  titleStyle,
}) => {
  const [animatingPin, setAnimatingPin] = useState("");

  useEffect(() => {
    let pinIndex = 0;
    
    const fillNextDot = () => {
      if (pinIndex < TARGET_PIN.length) {
        const nextChar = TARGET_PIN[pinIndex]; 
        
        setAnimatingPin((prevPin) => prevPin + nextChar);
        pinIndex++;

        setTimeout(fillNextDot, FILL_DELAY); 
      } else if (pinIndex === TARGET_PIN.length) {
        setTimeout(() => goToNextStep?.(), 500);
      }
    };

    const initialTimer = setTimeout(fillNextDot, INITIAL_DELAY);

    return () => clearTimeout(initialTimer);
  }, [goToNextStep]); 



  const keypadData = [
    { num: "1", letters: "" },
    { num: "2", letters: "ABC" },
    { num: "3", letters: "DEF" },
    { num: "4", letters: "GHI" },
    { num: "5", letters: "JKL" },
    { num: "6", letters: "MNO" },
    { num: "7", letters: "PQRS" },
    { num: "8", letters: "TUV" },
    { num: "9", letters: "WXYZ" },
    { num: "", letters: "" },
    { num: "0", letters: "" },
    { num: "⌫", letters: "" },
  ];

  return (
    <div className={style.pinInputContainer}>
      <div className={style.pinModal} onClick={(e) => e.stopPropagation()}>
        <button
          className={style.closeBtn}
          onClick={() => goToPreviousStep?.(5)}
        >
          <Image
            src="/demoapp/image/ofPlayground/pin-close.svg"
            height={24}
            width={24}
            alt="close"
            priority
          />
        </button>

        <p className={style.title} style={titleStyle}>
          Digite sua senha de 4 dígitos
        </p>

        <div className={style.dots}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`${style.dot} ${
                i < animatingPin.length
                  ? style.filled 
                  : ""
              }`}
            />
          ))}
        </div>

        <div className={style.keypad}>
          {keypadData.map(({ num, letters }, i) => (
            <button
              key={i}
              className={`${style.key} ${num === "" ? style.empty : ""} ${
                num === "⌫" ? style.delete : ""
              }`}
              onClick={() => {}} 
              disabled={true} 
            >
              <div>{num}</div>
              {letters && <span>{letters}</span>}
            </button>
          ))}
        </div>
        <div className={style.bottomBarContainer}>
          <div className={style.bottomBar}></div>
        </div>
      </div>
    </div>
  );
};

export default PinInput;