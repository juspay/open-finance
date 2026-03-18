"use client";
import React from 'react';
import { translations } from '../translations';
import { useTheme } from '../context/ThemeContext';

const FeatureCards: React.FC = () => {
  const { language, theme } = useTheme();
  const t = translations[language];

  const handleFeatureClick = (featureKey: string) => {
    switch (featureKey) {
      case 'pixGuide':
        window.open('https://juspay-2.gitbook.io/openfinance-pix/', '_blank', 'noopener,noreferrer');
        break;
      case 'experienceSimulator':
        // Same redirect as "Try in your style" button
        window.location.href = "/open-finance/mobileViewContainer";
        break;
      case 'changelog':
        // Disabled - do nothing
        break;
      default:
        break;
    }
  };

  const features = [
    {
      key: 'pixGuide',
      title: t.featureCards.pixGuide.title,
      desc: t.featureCards.pixGuide.description,
      light: '/demoapp/image/ofPlayground/pix-guide-light.svg',
      dark: '/demoapp/image/ofPlayground/pix-guide-dark.svg',
      alt: 'PIX Guide'
    },
    {
      key: 'experienceSimulator',
      title: t.featureCards.experienceSimulator.title,
      desc: t.featureCards.experienceSimulator.description,
      light: '/demoapp/image/ofPlayground/experience-simulator-light.svg',
      dark: '/demoapp/image/ofPlayground/experience-simulator-dark.svg',
      alt: 'Experience Simulator'
    },
    {
      key: 'changelog',
      title: t.featureCards.changelog.title,
      desc: t.featureCards.changelog.description,
      light: '/demoapp/image/ofPlayground/changelog-light.svg',
      dark: '/demoapp/image/ofPlayground/changelog-dark.svg',
      alt: 'Changelog'
    }
  ];

  return (
          <div className={`rounded-2xl pt-1 px-1 pb-2 h-full ${theme === 'dark' ? 'bg-[#27803B]' : 'bg-white'}`}>
      {/* Mobile horizontal scroll container; grid on md and lg */}
      <div
        className="min-h-0 md:grid md:grid-cols-3 md:gap-2 lg:grid lg:grid-cols-3 lg:gap-2 flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-2 no-scrollbar md:overflow-visible lg:overflow-visible md:h-full lg:h-full md:py-2 lg:py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map(f => {
          const imgSrc = theme === 'dark' ? f.dark : f.light;
          return (
            <div
              key={f.key}
              onClick={() => handleFeatureClick(f.key)}
              className={`flex flex-col text-center border-2 rounded-2xl feature-card-container px-4 py-2 transition-colors box-border flex-shrink-0 w-[78%] xs:w-[70%] sm:w-[55%] snap-center md:w-auto md:h-full md:m-1 lg:w-auto lg:h-full lg:m-1 ${
                theme === 'dark' ? 'border-[#459757] hover:border-[#52a763]' : 'border-[#EFEFFA] hover:border-[#d7d7ec]'
              } ${
                f.key === 'changelog' 
                  ? 'cursor-not-allowed opacity-60' 
                  : 'cursor-pointer hover:scale-[1.02] transform transition-transform'
              }`}
            >
              <div className="flex flex-col items-center justify-start h-full min-h-0 py-1">
                <div className="w-full feature-card-image h-24 md:h-32 lg:h-40 flex items-center justify-center mb-2 md:mb-3 lg:mb-4 flex-shrink-0">
                  <img
                    src={imgSrc}
                    alt={f.alt}
                    className="h-full w-full object-contain select-none pointer-events-none"
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).src = f.light; }}
                  />
                </div>
                <div className="flex flex-col items-center justify-start text-center w-full flex-1 min-h-0">
                  <h3 className={`feature-card-title text-sm md:text-base lg:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mt-1 md:mt-2 lg:mt-2 mb-1 md:mb-1 lg:mb-2 leading-tight w-full flex-shrink-0`}>{f.title}</h3>
                  <p className={`feature-card-desc text-xs md:text-sm lg:text-base leading-relaxed ${theme === 'dark' ? 'text-green-50' : 'text-gray-600'} w-full text-center flex-1`}>{f.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Combined mobile footer inside same container */}
      <div className="mobile-footer md:hidden lg:hidden mt-8 flex flex-col items-center justify-center gap-5">
        <span className={`mobile-hashtag ${theme === 'dark' ? 'text-green-50' : 'text-gray-400'} text-lg font-medium`}>{t.footer.hashtag}</span>
        <button
          onClick={() => window.open('https://juspay.io/contact?country=BR', '_blank', 'noopener,noreferrer')}
          className={`mobile-contact-btn px-8 py-4 rounded-2xl text-sm font-medium transition-colors w-full ${
            theme === 'dark'
              ? 'bg-[#459757] text-white hover:bg-[#52a763]'
              : 'text-black border-2 border-[#EFEFFA] hover:bg-gray-100 hover:border-[#d7d7ec]'
          }`}
        >
          {t.footer.contactUs}
        </button>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        /* Fix for width 916px and similar medium desktop sizes */
        @media (min-width: 900px) and (max-width: 1023px) {
          /* Force grid layout at this width */
          .min-h-0.md\\:grid.md\\:grid-cols-3 {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 6px !important;
            padding: 4px !important;
            overflow: visible !important;
            height: 100% !important;
          }
          
          /* Main container adjustments */
          .rounded-2xl.shadow-sm.flex.flex-col.w-full.h-full {
            padding: 8px !important;
          }
          
          .feature-card-container {
            width: auto !important;
            height: 100% !important;
            margin: 2px !important;
            padding: 6px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            min-height: 140px !important;
            max-height: 100% !important;
            box-sizing: border-box !important;
          }
          
          .feature-card-image {
            height: 40px !important;
            margin-bottom: 4px !important;
            flex-shrink: 0 !important;
          }
          
          .feature-card-title {
            font-size: 0.7rem !important;
            margin-top: 0px !important;
            margin-bottom: 2px !important;
            line-height: 1.0 !important;
            text-align: center !important;
            flex-shrink: 0 !important;
          }
          
          .feature-card-desc {
            font-size: 0.6rem !important;
            line-height: 1.1 !important;
            text-align: center !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            overflow: visible !important;
            flex: 1 !important;
          }
          
          /* Hide mobile footer */
          .mobile-footer {
            display: none !important;
          }
          
          /* Remove flex-shrink and width constraints from mobile */
          .flex-shrink-0.w-\\[78\\%\\] {
            flex-shrink: 1 !important;
            width: auto !important;
          }
        }
        
        /* Nest Hub Max and similar larger tablets (1280x800, 1024x768) */
        @media (min-width: 1024px) and (max-width: 1280px) and (max-height: 800px) {
          .feature-card-image {
            height: 85px !important;
            margin-bottom: 10px !important;
          }
          .feature-card-title {
            font-size: 0.95rem !important;
            margin-bottom: 6px !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 14px !important;
            max-height: none !important;
            margin: 5px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
        }
        
        /* Nest Hub (1024x600) - specific optimization */
        @media (min-width: 1000px) and (max-width: 1024px) and (max-height: 600px) {
          /* Reduce main container padding */
          .rounded-2xl.shadow-sm.flex.flex-col.w-full.h-full {
            padding: 8px !important;
          }
          
          /* Reduce grid gaps and padding */
          .md\\:grid.md\\:grid-cols-3.md\\:gap-6 {
            gap: 6px !important;
            padding: 0px !important;
          }
          
          .feature-card-image {
            height: 70px !important;
            margin-bottom: 4px !important;
          }
          .feature-card-title {
            font-size: 0.75rem !important;
            margin-top: 0px !important;
            margin-bottom: 2px !important;
            line-height: 1.0 !important;
          }
          .feature-card-desc {
            font-size: 0.6rem !important;
            line-height: 1.1 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 6px !important;
            max-height: none !important;
            margin: 2px !important;
            box-sizing: border-box !important;
            min-height: 160px !important;
          }
          
          /* Reduce internal spacing for Nest Hub */
          .feature-card-container .flex.flex-col.items-center.justify-between {
            padding: 2px !important;
          }
        }
        
        /* Medium tablets (768x1024 landscape) */
        @media (min-width: 768px) and (max-width: 1024px) and (max-height: 768px) {
          .feature-card-image {
            height: 65px !important;
            margin-bottom: 8px !important;
          }
          .feature-card-title {
            font-size: 0.85rem !important;
            margin-bottom: 5px !important;
            line-height: 1.1 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 10px !important;
            max-height: none !important;
            margin: 4px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
        }
        
        /* iPad Mini (768x1024) - Portrait */
        @media (min-width: 768px) and (max-width: 768px) and (min-height: 1000px) {
          /* Reduce main container padding */
          .rounded-2xl.pt-1.px-1.pb-2.h-full {
            padding-top: 2px !important;
            padding-bottom: 4px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          .feature-card-image {
            height: 75px !important;
            margin-bottom: 12px !important;
          }
          .feature-card-title {
            font-size: 1.0rem !important;
            margin-bottom: 8px !important;
            line-height: 1.2 !important;
            margin-top: 4px !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.9rem !important;
            line-height: 1.3 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 8px !important;
            max-height: none !important;
            margin: 1px !important;
            box-sizing: border-box !important;
            min-height: 280px !important;
            overflow: visible !important;
            padding-bottom: 6px !important;
          }
          
          /* Ensure inner content container has proper spacing */
          .feature-card-container .flex.flex-col.items-center.justify-start {
            padding: 2px !important;
            height: 100% !important;
            overflow: visible !important;
            justify-content: flex-start !important;
          }
        }
        
        /* iPad Mini (1024x768) - Landscape */
        @media (min-width: 1024px) and (max-width: 1024px) and (max-height: 768px) {
          /* Reduce main container padding */
          .rounded-2xl.p-2.h-full {
            padding: 4px !important;
          }
          
          .feature-card-image {
            height: 60px !important;
            margin-bottom: 8px !important;
          }
          .feature-card-title {
            font-size: 0.8rem !important;
            margin-bottom: 5px !important;
            line-height: 1.1 !important;
            margin-top: 2px !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 8px !important;
            max-height: none !important;
            margin: 1px !important;
            box-sizing: border-box !important;
            min-height: 200px !important;
            overflow: visible !important;
            padding-bottom: 5px !important;
          }
          
          /* Ensure inner content container has proper spacing */
          .feature-card-container .flex.flex-col.items-center.justify-start {
            padding: 1px !important;
            height: 100% !important;
            overflow: visible !important;
            justify-content: flex-start !important;
          }
        }
        
        /* iPad Air (834x1194) - Portrait */
        @media (min-width: 820px) and (max-width: 834px) and (min-height: 1100px) {
          /* Reduce main container padding */
          .rounded-2xl.pt-1.px-1.pb-2.h-full {
            padding-top: 2px !important;
            padding-bottom: 4px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          .feature-card-image {
            height: 70px !important;
            margin-bottom: 10px !important;
          }
          .feature-card-title {
            font-size: 0.95rem !important;
            margin-bottom: 6px !important;
            line-height: 1.2 !important;
            margin-top: 4px !important;
          }
          .feature-card-desc {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 8px !important;
            max-height: none !important;
            margin: 1px !important;
            box-sizing: border-box !important;
            min-height: 260px !important;
            overflow: visible !important;
            padding-bottom: 5px !important;
          }
          
          /* Ensure inner content container has proper spacing */
          .feature-card-container .flex.flex-col.items-center.justify-start {
            padding: 1px !important;
            height: 100% !important;
            overflow: visible !important;
            justify-content: flex-start !important;
          }
        }
        
        /* iPad Air (1180x820) - Landscape */
        @media (min-width: 1100px) and (max-width: 1194px) and (max-height: 834px) {
          /* Reduce main container padding */
          .rounded-2xl.shadow-sm.flex.flex-col.w-full.h-full {
            padding: 6px !important;
          }
          
          .feature-card-image {
            height: 55px !important;
            margin-bottom: 8px !important;
          }
          .feature-card-title {
            font-size: 0.85rem !important;
            margin-bottom: 5px !important;
            line-height: 1.2 !important;
            margin-top: 3px !important;
          }
          .feature-card-desc {
            font-size: 0.75rem !important;
            line-height: 1.3 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-container {
            padding: 8px !important;
            max-height: none !important;
            margin: 1px !important;
            box-sizing: border-box !important;
            min-height: 220px !important;
            overflow: visible !important;
            padding-bottom: 5px !important;
          }
          
          /* Ensure inner content container has proper spacing */
          .feature-card-container .flex.flex-col.items-center.justify-start {
            padding: 2px !important;
            height: 100% !important;
            overflow: visible !important;
            justify-content: flex-start !important;
          }
        }
        
        /* Height-aware responsive scaling for smaller screens */
        @media (max-height: 700px) {
          .feature-card-image {
            height: 40px !important;
            margin-bottom: 4px !important;
          }
          .feature-card-title {
            font-size: 0.75rem !important;
            margin-bottom: 3px !important;
            line-height: 1.1 !important;
          }
          .feature-card-desc {
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .feature-card-container {
            padding: 8px !important;
            max-height: calc(100% - 8px) !important;
            margin: 2px !important;
            box-sizing: border-box !important;
          }
        }
        
        /* Very small height screens */
        @media (max-height: 600px) {
          .feature-card-image {
            height: 35px !important;
            margin-bottom: 3px !important;
          }
          .feature-card-title {
            font-size: 0.7rem !important;
            margin-bottom: 2px !important;
            line-height: 1.05 !important;
          }
          .feature-card-desc {
            font-size: 0.6rem !important;
            line-height: 1.15 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .feature-card-container {
            padding: 6px !important;
            max-height: calc(100% - 6px) !important;
            margin: 2px !important;
            box-sizing: border-box !important;
          }
        }
        
        /* Ultra small height screens - still keep images visible */
        @media (max-height: 500px) {
          .feature-card-image {
            height: 40px !important;
            margin-bottom: 5px !important;
          }
          .feature-card-title {
            font-size: 0.7rem !important;
            margin-bottom: 3px !important;
            line-height: 1.0 !important;
          }
          .feature-card-desc {
            font-size: 0.6rem !important;
            line-height: 1.1 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 1 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .feature-card-container {
            padding: 8px !important;
          }
        }
        
        /* Combined width and height constraints */
        @media (max-width: 640px) and (max-height: 600px) {
          .feature-card-image {
            height: 80px !important;
            margin-bottom: 8px !important;
          }
          .feature-card-title {
            font-size: 0.8rem !important;
            margin-bottom: 4px !important;
          }
          .feature-card-desc {
            font-size: 0.7rem !important;
            line-height: 1.3 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .feature-card-container {
            padding: 10px !important;
          }
        }
        
        /* Nest Hub and similar small devices - increase image size */
        @media (max-width: 480px) and (max-height: 480px) {
          .feature-card-image {
            height: 70px !important;
            margin-bottom: 6px !important;
          }
          .feature-card-title {
            font-size: 0.75rem !important;
            margin-bottom: 4px !important;
            line-height: 1.1 !important;
          }
          .feature-card-desc {
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .feature-card-container {
            padding: 8px !important;
          }
        }
        
        /* Very small screens - but keep images reasonable */
        @media (max-width: 360px) {
          .feature-card-image {
            height: 60px !important;
            margin-bottom: 6px !important;
          }
          .feature-card-title {
            font-size: 0.7rem !important;
            margin-bottom: 3px !important;
          }
          .feature-card-desc {
            font-size: 0.6rem !important;
            line-height: 1.25 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
        }
        
        /* Ensure text is always readable and visible */
        @media (max-height: 600px) {
          .feature-card-title, .feature-card-desc {
            word-break: break-word !important;
            hyphens: auto !important;
          }
        }
        
        /* General improvements for text visibility */
        .feature-card-desc {
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          overflow: visible !important;
          text-overflow: clip !important;
          -webkit-line-clamp: none !important;
          -webkit-box-orient: initial !important;
          display: block !important;
          white-space: normal !important;
        }
        
        .feature-card-title {
          overflow: visible !important;
          text-overflow: clip !important;
          white-space: normal !important;
          -webkit-line-clamp: none !important;
          -webkit-box-orient: initial !important;
          display: block !important;
        }
        
        /* Force no ellipsis anywhere */
        .feature-card-desc, .feature-card-title {
          text-overflow: clip !important;
          overflow: visible !important;
          white-space: normal !important;
          -webkit-line-clamp: none !important;
          -webkit-box-orient: initial !important;
          display: block !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        
        /* Override any inherited ellipsis styles */
        * {
          text-overflow: none !important;
        }
        
        .feature-card-container * {
          text-overflow: clip !important;
          overflow: visible !important;
          -webkit-line-clamp: none !important;
        }
        
        /* Ensure proper spacing for readability */
        @media (min-width: 1024px) {
          .feature-card-desc {
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          
          /* Prevent card cutting on desktop */
          .feature-card-container {
            max-height: calc(100% - 16px) !important;
            margin: 6px !important;
            box-sizing: border-box !important;
          }
        }
        
        /* Fix content cutting on larger screens */
        @media (min-width: 1280px) {
          /* Increase outer container bottom padding for better balance */
          .rounded-2xl.pt-1.px-1.pb-2.h-full {
            padding-top: 4px !important;
            padding-bottom: 12px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          .feature-card-container {
            min-height: 280px !important;
            max-height: none !important;
            padding: 18px !important;
            margin: 8px !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .feature-card-image {
            height: 75px !important;
            margin-bottom: 14px !important;
            flex-shrink: 0 !important;
          }
          .feature-card-title {
            font-size: 1.05rem !important;
            margin-bottom: 10px !important;
            line-height: 1.2 !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.9rem !important;
            line-height: 1.3 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
            flex: 1 !important;
          }
        }
        
        /* Extra large screens - prevent content overflow */
        @media (min-width: 1536px) {
          /* Increase outer container bottom padding for better balance */
          .rounded-2xl.pt-1.px-1.pb-2.h-full {
            padding-top: 4px !important;
            padding-bottom: 16px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          .feature-card-container {
            min-height: 320px !important;
            max-height: none !important;
            padding: 20px !important;
            margin: 10px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .feature-card-image {
            height: 85px !important;
            margin-bottom: 18px !important;
          }
          .feature-card-title {
            font-size: 1.15rem !important;
            margin-bottom: 14px !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
          .feature-card-desc {
            font-size: 0.95rem !important;
            line-height: 1.4 !important;
            display: block !important;
            -webkit-line-clamp: none !important;
            -webkit-box-orient: initial !important;
            overflow: visible !important;
            text-overflow: initial !important;
            white-space: normal !important;
          }
        }
        
        /* Mobile footer responsive sizing */
        @media (min-width: 1024px) and (max-width: 1280px) and (max-height: 800px) {
          .mobile-footer {
            margin-top: 20px !important;
            gap: 16px !important;
          }
          .mobile-hashtag {
            font-size: 1.1rem !important;
          }
          .mobile-contact-btn {
            padding: 16px 20px !important;
            font-size: 0.9rem !important;
          }
        }
        
        @media (max-height: 700px) {
          .mobile-footer {
            margin-top: 16px !important;
            gap: 12px !important;
          }
          .mobile-hashtag {
            font-size: 1rem !important;
          }
          .mobile-contact-btn {
            padding: 12px 16px !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-height: 600px) {
          .mobile-footer {
            margin-top: 12px !important;
            gap: 8px !important;
          }
          .mobile-hashtag {
            font-size: 0.9rem !important;
          }
          .mobile-contact-btn {
            padding: 10px 14px !important;
            font-size: 0.75rem !important;
          }
        }
        
        @media (max-height: 500px) {
          .mobile-footer {
            margin-top: 8px !important;
            gap: 6px !important;
          }
          .mobile-hashtag {
            font-size: 0.8rem !important;
          }
          .mobile-contact-btn {
            padding: 8px 12px !important;
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;
