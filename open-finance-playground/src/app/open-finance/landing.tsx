"use client";
import React from 'react';
import LeftSection from './components/LeftSection';
import MobileAnimation from './components/MobileAnimation';
import TryInYourStyle from './components/TryInYourStyle';
import FeatureCards from './components/FeatureCards';
import FooterSection from './components/FooterSection';
import { ThemeProvider, useTheme } from './context/ThemeContext';

interface LandingPageProps {
  onTrySimulator?: () => void;
}

const LandingPageContent: React.FC<LandingPageProps> = ({ onTrySimulator }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} min-h-screen md:h-screen lg:h-screen md:overflow-hidden lg:overflow-hidden`}> 
      <main className="min-h-full md:h-full lg:h-full p-3 md:p-4 lg:p-4">
        <div className="flex flex-col md:grid md:h-full md:grid-cols-2 lg:grid lg:h-full lg:grid-cols-2 gap-3 medium-desktop-grid">
          <div className="md:h-full lg:h-full medium-desktop-left">
            <LeftSection onTrySimulator={onTrySimulator} />
          </div>
          {/* Right Column */}
          <div className="flex md:h-full lg:h-full flex-col gap-3 md:min-h-0 lg:min-h-0 medium-desktop-right">{/* min-h-0 to allow children flex scroll control */}
            {/* Hero Row - mobile hides TryInYourStyle (moved into LeftSection) */}
            <div className="flex flex-col md:flex-row lg:flex-row md:flex-[1.25] md:flex-[1.3] lg:flex-[1.25] lg:lg:flex-[1.3] gap-3 md:min-h-0 lg:min-h-0 md:items-stretch lg:items-stretch medium-desktop-hero">{/* ensure equal height on desktop */}
              <div className="hidden md:flex lg:flex flex-1 min-h-0 medium-desktop-try">
                <TryInYourStyle onTrySimulator={onTrySimulator} />
              </div>
              <MobileAnimation />
            </div>
            {/* Feature Cards - horizontal scroll on mobile with integrated footer */}
            <div className="md:flex-none md:flex-[1.15] lg:flex-none lg:flex-[1.15] md:min-h-0 lg:min-h-0 flex medium-desktop-cards">
              <FeatureCards />
            </div>
            {/* Footer fixed height (hidden on mobile now) */}
            <div className="flex-shrink-0 h-[64px] hidden md:block lg:block medium-desktop-footer">
              <FooterSection />
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`
        @media (min-width: 900px) and (max-width: 1023px) {
          .medium-desktop-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            height: 100% !important;
          }
          .medium-desktop-left {
            height: 100% !important;
          }
          .medium-desktop-right {
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
            min-height: 0 !important;
          }
          .medium-desktop-hero {
            display: flex !important;
            flex-direction: row !important;
            flex: 1.25 !important;
            min-height: 0 !important;
            align-items: stretch !important;
          }
          .medium-desktop-try {
            display: flex !important;
            flex: 1 !important;
            min-height: 0 !important;
          }
          .medium-desktop-cards {
            flex: 1.15 !important;
            flex-shrink: 0 !important;
            min-height: 0 !important;
          }
          .medium-desktop-footer {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onTrySimulator }) => (
  <LandingPageContent onTrySimulator={onTrySimulator} />
);

export default LandingPage;
