"use client";
import React from 'react';

interface HeroSectionProps {
  onTrySimulator?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTrySimulator }) => {
  return (
    <div className="bg-yellow-400 rounded-2xl shadow-sm p-4 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden flex-[2]">
      {/* Text Content */}
      <div className="pr-16 lg:pr-20">
        <h2 className="text-base lg:text-lg font-bold text-black mb-2 leading-tight">
          Everything you need to know about Brazil's{' '}
          <em className="italic font-normal">real-time payment ecosystem</em> : Master
          PISP, Biometric, and Automatic flows
        </h2>
        
        <button 
          onClick={onTrySimulator}
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2 group"
        >
          <span>Try in your style</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Overlapping Phone */}
      <div className="absolute -top-3 -right-3 w-32 lg:w-36 h-[220px] lg:h-[250px] z-10">
        <div className="w-full h-full bg-black rounded-[1.5rem] lg:rounded-[2rem] p-1 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[1.2rem] lg:rounded-[1.5rem] p-2 lg:p-3 relative overflow-hidden">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👤</span>
                </div>
                <span className="text-xs font-medium">Inicie a Sessão</span>
              </div>
              <button>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Face ID Content */}
            <div className="text-center mt-3 lg:mt-4">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-xl mx-auto mb-1 lg:mb-2 flex items-center justify-center">
                <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-blue-500 border-dashed rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs lg:text-sm leading-tight">
                Usar o Face ID para iniciar uma sessão?
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed px-1 mb-2 lg:mb-3">
                Uma chave de acesso para "Consumir" será salva em sua rede de dispositivos e estará disponível em todos os seus dispositivos.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-blue-500 border-dashed rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
