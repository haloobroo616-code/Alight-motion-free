import React from 'react';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-[1.5px] border-[#111] py-12 px-6 mt-20">
      <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 font-bold text-lg text-[#111] mb-1">
            <div className="w-6 h-6 bg-white border-[1.5px] border-[#111] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#111]" />
            </div>
            <span>AxzyeDev Platform</span>
          </div>
          <p className="text-sm text-[#666]">
            Platform resmi aktivasi Alight Motion Premium cepat, aman, & tanpa root.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-[#444]">
          <span className="flex items-center gap-1.5 text-[#0a8f4d]">
            <ShieldCheck className="w-4 h-4" /> 100% Aman & Resmi
          </span>
          <span>© 2026 AxzyeDev</span>
        </div>
      </div>
    </footer>
  );
};
