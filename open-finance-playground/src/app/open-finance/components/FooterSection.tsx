"use client";
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

const FooterSection: React.FC = () => {
  const { language, theme } = useTheme();
  const t = translations[language];
  
  return (
    <div className={`rounded-2xl shadow-sm p-3 pb-4 sm:pb-3 flex-shrink-0 flex items-center justify-center ${
      theme === 'dark' ? 'bg-[#27803B]' : 'bg-white'
    }`} style={{ minHeight: '60px' }}>
      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 w-full">
        <span className={`text-xs sm:text-sm ${
          theme === 'dark' ? 'text-green-50' : 'text-gray-400'
        }`}>{t.footer.hashtag}</span>
        {/* Contact Us Button */}
        <button
          onClick={() => window.open('https://juspay.io/contact?country=BR', '_blank', 'noopener,noreferrer')}
          className={`px-8 py-1.5 sm:px-8 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            theme === 'dark' 
              ? 'bg-[#459757] text-white hover:bg-[#52a763]' 
              : 'text-black border-2 border-[#EFEFFA] hover:bg-gray-100 hover:border-[#d7d7ec]'
          }`}
        >
          {t.footer.contactUs}
        </button>
      </div>
    </div>
  );
};

export default FooterSection;
