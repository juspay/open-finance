"use client";
import LandingPage from "./landing";
import { useRouter } from "next/navigation";
import "./globals.css";
import { useTheme } from './context/ThemeContext';


export default function PlaygroundLanding() {
  const { language } = useTheme();
  const router = useRouter();

  return (
    <LandingPage
      onTrySimulator={() =>{
        localStorage.setItem('selectedLanguage', language);
        router.push("/open-finance/mobileViewContainer");
      }
      }
    />
  );
}
