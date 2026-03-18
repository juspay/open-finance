"use client";
import { useEffect, useState } from "react";
import styles from "./countDownTimer.module.css";

interface CountdownTimerProps {
  duration?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration = 180 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const progress = (timeLeft / duration) * 283;

  return (
    <div className={styles.container}>
      <svg className={styles.circle} width="120" height="120">
        <circle
          className={styles.bg}
          cx="60"
          cy="60"
          r="45"
          strokeWidth="6"
          fill="none"
        />
        <circle
          className={styles.fg}
          cx="60"
          cy="60"
          r="45"
          strokeWidth="6"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={283 - progress}
        />
      </svg>

      <div className={styles.textContainer}>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.label}>minutos</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
