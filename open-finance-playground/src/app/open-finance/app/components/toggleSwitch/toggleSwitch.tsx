"use client";
import { useState } from "react";
import styles from "./toggleSwitch.module.css";

interface ToggleSwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  style? : React.CSSProperties;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked = false, onChange, style }) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.container} onClick={handleToggle}>
      <span className={styles.label} style={style}>{label}</span>
      <div className={`${styles.switch} ${isOn ? styles.on : ""}`}>
        <div className={styles.thumb} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
