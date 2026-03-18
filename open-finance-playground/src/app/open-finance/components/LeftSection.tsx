"use client";
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap' });

interface LeftSectionProps { onTrySimulator?: () => void }

const LeftSection: React.FC<LeftSectionProps> = ({ onTrySimulator }) => {
  const { language, theme, toggleLanguage } = useTheme();
  const t = translations[language];

  // Split and emphasize phrase logic (same as TryInYourStyle) for mobile description
  const descriptionParts = t.tryInYourStyle.title.split(' : ');
  const emphasized = (text: string) => {
    const markerEn = 'real-time payment ecosystem';
    const markerPt = 'ecossistema de pagamentos em tempo real';
    const marker = text.includes(markerEn) ? markerEn : (text.includes(markerPt) ? markerPt : undefined);
    if (!marker) return text;
    const [before, after] = text.split(marker);
    return (<>{before}<em className="italic font-normal">{marker}</em>{after}</>);
  };

  return (
    <div className={`rounded-2xl shadow-sm h-full lg:h-full flex flex-col overflow-hidden relative ${
      theme === 'dark' ? 'bg-[#27803B]' : 'bg-white'
    } min-h-[90vh] lg:h-full`}>{/* reduced mobile height from h-screen */}
      {/* Top Bar */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4">
        <div className="flex items-center space-x-2">
          <img 
            src={theme === 'dark' ? '/demoapp/image/ofPlayground/of-dark.png' : '/demoapp/image/ofPlayground/of-white.png'}
            alt="Open Finance Logo"
            className="w-12 h-12 object-contain"
            onError={(e) => console.error('Logo failed to load:', e.currentTarget.src)}
          />
        </div>
        {/* Language Switcher - Top Right Corner */}
        <div className={`flex rounded-lg p-1 absolute right-5 top-5 ${
          theme === 'dark' ? 'bg-[#217534] border-2 border-[#459757]' : 'bg-gray-100'
        }`}>
          <button 
            onClick={toggleLanguage}
            className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
              language === 'en' 
                ? 'bg-white shadow-sm' 
                : theme === 'dark' 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-gray-600 hover:text-gray-800'
            }`}
          >EN</button>
          <button 
            onClick={toggleLanguage}
            className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
              language === 'pt' 
                ? 'bg-white shadow-sm' 
                : theme === 'dark' 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-gray-600 hover:text-gray-800'
            }`}
          >PT</button>
        </div>
      </div>

      {/* Centered hero content (mobile centered, desktop left) */}
      <div className="flex flex-col flex-1 px-5 items-center lg:items-start justify-center lg:justify-end pb-28 lg:pb-2">
        <h1 className={`font-semibold ${dmSans.className} ${theme === 'dark' ? 'text-white' : 'text-black'} text-[clamp(4rem,10vw,10rem)] lg:text-[clamp(3.5rem,9vw,8.5rem)] text-center lg:text-left`} style={{ lineHeight: '0.8', letterSpacing: '-0.05em' }}>Open<br />Finance</h1>
        {/* Mobile description (CTA moved to bottom) */}
        <div className="mt-6 w-full lg:hidden text-center">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm leading-relaxed mb-0 max-w-md mx-auto`}>{descriptionParts.map((p,i,arr)=> <span key={i}>{i===0?emphasized(p):p}{i < arr.length-1 && ' : '}</span>)}</p>
        </div>
      </div>
      {/* Bottom fixed CTA for mobile */}
      <div className="lg:hidden absolute left-0 bottom-4 w-full px-5">
        <button 
          onClick={onTrySimulator}
          className={`px-6 py-5 rounded-2xl font-medium transition-colors flex items-center justify-center space-x-2 group w-full text-sm cursor-pointer ${
            theme === 'dark' ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          <span>{t.tryInYourStyle.button}</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
