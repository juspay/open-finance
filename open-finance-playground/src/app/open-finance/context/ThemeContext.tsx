"use client";
import i18n from "@/lib/i18n";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  language: 'en' | 'pt';
  theme: 'light' | 'dark';
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'pt'>('pt');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'en' | 'pt' | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
      setTheme(savedLanguage === 'pt' ? 'dark' : 'light');
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  
  useEffect(() => {
    i18n.changeLanguage(language);
    setTheme(language === "pt" ? "dark" : "light");
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    setLanguage(newLanguage);
    setTheme(newLanguage === 'pt' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ language, theme, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};