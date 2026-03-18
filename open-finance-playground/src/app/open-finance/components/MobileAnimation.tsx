"use client";
import React from 'react';

const MobileAnimation: React.FC = () => {
  return (
    <div className="rounded-2xl shadow-sm flex-[1] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#F6CB5C' }}>
      <video 
        className="w-full h-full object-contain rounded-2xl"
        autoPlay 
        loop 
        muted 
        playsInline
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onLoadedData={() => console.log('Video loaded data')}
      >
        <source src="/demoapp/image/ofPlayground/open-finance-studio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MobileAnimation;
