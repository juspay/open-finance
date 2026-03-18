"use client";
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mx-6 mt-6 mb-2 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-start px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-purple-600 text-xs font-bold">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
