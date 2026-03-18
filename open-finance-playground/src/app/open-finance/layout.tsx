import React from "react";
import Layout from "@/shared/components/layout/Layout";
import { DM_Sans, DM_Mono, Figtree, Roboto, Inter } from "next/font/google";
import './global.css';
import I18nProvider from "./app/components/i18nProvider";
import { ThemeProvider } from "./context/ThemeContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-figtree",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${figtree.variable} ${roboto.variable} ${inter.variable} `}
    >
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&display=swap" 
          rel="stylesheet"
          precedence="default"
        />
      </head>
      <body style={{ height: "100vh", margin: 0 }}>
        <ThemeProvider>
          <I18nProvider>
            <Layout header={""} content={<>{children}</>} footer={""} /> 
          </I18nProvider>  
        </ThemeProvider>
      </body>
    </html>
  );
}
