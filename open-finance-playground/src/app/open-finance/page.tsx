"use client";
import LandingPage from "./landing";
import { useRouter } from "next/navigation";
import "./globals.css";
import { useTheme } from './context/ThemeContext';


export default function PlaygroundLanding() {
  const { language } = useTheme();

  return (
    <LandingPage
      onTrySimulator={() =>{
        localStorage.setItem('selectedLanguage', language);
        window.location.href = "/open-finance/mobileViewContainer";
      }
      }
    />
  );
}
