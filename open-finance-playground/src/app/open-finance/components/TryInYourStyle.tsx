"use client";
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import { DM_Sans } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap' });

interface TryInYourStyleProps {
  onTrySimulator?: () => void;
}

const TryInYourStyle: React.FC<TryInYourStyleProps> = ({ onTrySimulator }) => {
  const { language, theme } = useTheme();
  const t = translations[language];
  
  return (
    <div className={`try-container rounded-2xl shadow-sm p-0 flex-1 flex flex-col justify-between h-full ${
      theme === 'dark' ? 'bg-[#27803B]' : 'bg-white'
    }`}>
      {/* Text Content with padding */}
      <div className="w-full max-w-md lg:max-w-md try-content px-4 pt-2 flex-1 flex flex-col justify-start lg:justify-start">
        <h2 className={`try-title font-normal mb-3 leading-tight ${dmSans.className} ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          {t.tryInYourStyle.title.split(' : ').map((part, index, array) => 
            index === 0 ? (
              <span key={index}>
                {part.includes('real-time payment ecosystem') || part.includes('ecossistema de pagamentos em tempo real') ? (
                  <>
                    {part.split(part.includes('real-time') ? 'real-time payment ecosystem' : 'ecossistema de pagamentos em tempo real')[0]}
                    <em className="italic font-normal">
                      {part.includes('real-time') ? 'real-time payment ecosystem' : 'ecossistema de pagamentos em tempo real'}
                    </em>
                    {part.split(part.includes('real-time') ? 'real-time payment ecosystem' : 'ecossistema de pagamentos em tempo real')[1]}
                  </>
                ) : part}
                {array.length > 1 && ' : '}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </h2>
      </div>
      
      {/* Button sticking to bottom with full width */}
      <button 
        onClick={onTrySimulator}
        className={`try-button px-6 py-3 rounded-2xl font-medium transition-colors flex items-center justify-center space-x-2 group w-full text-sm cursor-pointer ${
          theme === 'dark' 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        <span>{t.tryInYourStyle.button}</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <style jsx>{`
        /* Base styles */
        .try-title {
          font-size: 1.5rem;
          line-height: 1.3;
        }
        .try-button {
          padding: 16px;
          font-size: 0.875rem;
        }
        .try-content {
          padding: 8px 16px 4px 16px;
        }
        
        /* Fix for 916px and medium desktop widths */
        @media (min-width: 900px) and (max-width: 1023px) {
          .try-title {
            font-size: 1rem !important;
            margin-bottom: 6px !important;
            line-height: 1.2 !important;
          }
          .try-button {
            padding: 8px 12px !important;
            font-size: 0.75rem !important;
          }
          .try-content {
            padding: 8px 12px 4px 12px !important;
          }
          .try-container {
            padding: 6px 0 0 0 !important;
          }
        }
        
        /* iPad Pro 12.9" (1024x1366) */
        @media (min-width: 1024px) and (max-width: 1366px) and (max-height: 1400px) {
          .try-title {
            font-size: 1.6rem !important;
            margin-bottom: 16px !important;
            line-height: 1.3 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 22px 26px !important;
            font-size: 1.1rem !important;
          }
          .try-content {
            padding: 26px 26px 18px 26px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
          }
        }
        
        /* iPad Pro 11" and iPad Air (834x1194, 820x1180) */
        @media (min-width: 820px) and (max-width: 834px) and (min-height: 1100px) {
          .try-title {
            font-size: 1.7rem !important;
            margin-bottom: 22px !important;
            line-height: 1.3 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 24px 28px !important;
            font-size: 1.2rem !important;
          }
          .try-content {
            padding: 30px 30px 22px 30px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
          }
        }
        
        /* iPad Mini (768x1024) */
        @media (min-width: 768px) and (max-width: 768px) and (min-height: 1000px) {
          .try-title {
            font-size: 1.3rem !important;
            margin-bottom: 12px !important;
            line-height: 1.25 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 16px 20px !important;
            font-size: 0.95rem !important;
          }
          .try-content {
            padding: 18px 20px 8px 20px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
            padding: 6px 0 0 0 !important;
          }
        }
        
        /* iPad Mini Landscape (1024x768) */
        @media (min-width: 1024px) and (max-width: 1024px) and (max-height: 768px) {
          .try-title {
            font-size: 1.2rem !important;
            margin-bottom: 8px !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 12px 18px !important;
            font-size: 0.9rem !important;
          }
          .try-content {
            padding: 12px 18px 6px 18px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
            padding: 4px 0 0 0 !important;
          }
        }
        
        /* iPad landscape modes */
        @media (min-width: 1024px) and (max-width: 1366px) and (max-height: 1024px) {
          .try-title {
            font-size: 1.3rem !important;
            margin-bottom: 10px !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 14px 18px !important;
            font-size: 0.85rem !important;
          }
          .try-content {
            padding: 16px 18px 10px 18px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
          }
        }
        
        /* iPad Air landscape (1180x820) */
        @media (min-width: 1100px) and (max-width: 1194px) and (max-height: 834px) {
          .try-title {
            font-size: 1.5rem !important;
            margin-bottom: 16px !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .try-button {
            padding: 20px 24px !important;
            font-size: 1.1rem !important;
          }
          .try-content {
            padding: 22px 24px 16px 24px !important;
            overflow: visible !important;
          }
          .try-container {
            overflow: visible !important;
          }
        }
        
        /* Height-aware responsive scaling - prioritize visibility over aesthetics */
        @media (max-height: 700px) {
          .try-title {
            font-size: 1rem !important;
            margin-bottom: 8px !important;
            line-height: 1.2 !important;
          }
          .try-button {
            padding: 10px 16px !important;
            font-size: 0.8rem !important;
          }
          .try-content {
            padding: 12px 16px 8px 16px !important;
          }
        }
        
        /* Very small height screens */
        @media (max-height: 600px) {
          .try-title {
            font-size: 0.9rem !important;
            margin-bottom: 6px !important;
            line-height: 1.15 !important;
          }
          .try-button {
            padding: 8px 14px !important;
            font-size: 0.75rem !important;
          }
          .try-content {
            padding: 8px 12px 6px 12px !important;
          }
        }
        
        /* Ultra small height screens */
        @media (max-height: 500px) {
          .try-title {
            font-size: 0.8rem !important;
            margin-bottom: 4px !important;
            line-height: 1.1 !important;
          }
          .try-button {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }
          .try-content {
            padding: 6px 10px 4px 10px !important;
          }
        }
        
        /* Progressive responsive scaling for width */
        @media (max-width: 768px) {
          .try-title {
            font-size: 1.1rem !important;
            line-height: 1.3 !important;
          }
          .try-button {
            padding: 14px 20px !important;
            font-size: 0.85rem !important;
          }
          .try-content {
            padding: 16px 20px 12px 20px !important;
          }
        }
        
        /* Small tablets and large phones */
        @media (max-width: 640px) {
          .try-title {
            font-size: 1rem !important;
            margin-bottom: 12px !important;
            line-height: 1.25 !important;
          }
          .try-button {
            padding: 12px 16px !important;
            font-size: 0.8rem !important;
          }
          .try-content {
            padding: 12px 16px 8px 16px !important;
          }
        }
        
        /* Combined width and height constraints - prioritize height */
        @media (max-width: 640px) and (max-height: 600px) {
          .try-title {
            font-size: 0.85rem !important;
            margin-bottom: 4px !important;
            line-height: 1.1 !important;
          }
          .try-button {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }
          .try-content {
            padding: 6px 12px 4px 12px !important;
          }
        }
        
        /* Nest Hub and similar constrained devices */
        @media (max-width: 480px) and (max-height: 480px) {
          .try-title {
            font-size: 0.75rem !important;
            margin-bottom: 3px !important;
            line-height: 1.05 !important;
          }
          .try-button {
            padding: 4px 10px !important;
            font-size: 0.65rem !important;
          }
          .try-content {
            padding: 4px 8px 3px 8px !important;
          }
        }
        
        /* Ultra-small screens */
        @media (max-width: 360px) {
          .try-title {
            font-size: 0.8rem !important;
            margin-bottom: 6px !important;
            line-height: 1.15 !important;
            word-break: break-word !important;
          }
          .try-button {
            padding: 6px 10px !important;
            font-size: 0.65rem !important;
          }
          .try-content {
            padding: 6px 10px 4px 10px !important;
          }
        }
        
        /* Improve text readability on all small screens */
        @media (max-width: 640px) {
          .try-title {
            word-wrap: break-word !important;
            hyphens: auto !important;
          }
        }
        
        /* Ensure content fits in height-constrained screens */
        @media (max-height: 600px) {
          .try-title {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .try-container {
            min-height: auto !important;
          }
        }
        
        /* Additional container optimizations for very small heights */
        @media (max-height: 500px) {
          .try-container {
            padding: 8px 0 0 0 !important;
          }
        }
        
        @media (max-height: 400px) {
          .try-container {
            padding: 4px 0 0 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TryInYourStyle;
