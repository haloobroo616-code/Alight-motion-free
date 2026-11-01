import React, { useState } from 'react';
import { PageType } from '../types';
import { Home, LayoutDashboard, Wrench, ShieldAlert, Sparkles, LogOut, Menu, X, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: PageType) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1180px] z-50 flex items-center justify-between px-6 py-3.5 bg-white border-[1.5px] border-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        {/* Brand */}
        <button 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 font-bold text-lg tracking-tight text-[#111] bg-transparent border-none cursor-pointer"
        >
          <div className="w-8 h-8 bg-white border-[1.5px] border-[#111] flex items-center justify-center text-[#111]">
            <Sparkles className="w-4 h-4 text-[#111]" />
          </div>
          <span className="flex items-center gap-1.5">
            Axzye<span className="font-medium text-[#666]">Dev</span>
            <span className="inline-flex items-center text-[#0a8f4d]">
              <CheckCircle2 className="w-4 h-4 fill-[#dff5e8]" />
            </span>
          </span>
        </button>

        {/* Desktop Quick Nav */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleNav('home')}
            className={`px-3.5 py-1.5 text-sm font-medium transition-all ${currentPage === 'home' ? 'bg-[#111] text-white' : 'text-[#333] hover:bg-[#f0f0eb]'}`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className={`px-3.5 py-1.5 text-sm font-medium transition-all ${currentPage === 'dashboard' ? 'bg-[#111] text-white' : 'text-[#333] hover:bg-[#f0f0eb]'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNav('tools')}
            className={`px-3.5 py-1.5 text-sm font-medium transition-all ${currentPage === 'tools' ? 'bg-[#111] text-white' : 'text-[#333] hover:bg-[#f0f0eb]'}`}
          >
            Tools & Presets
          </button>
          <button
            onClick={() => handleNav('admin')}
            className={`px-3.5 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-all ${currentPage === 'admin' ? 'bg-[#111] text-white' : 'text-[#333] hover:bg-[#f0f0eb]'}`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#3355ff]" /> Admin Broadcast
          </button>
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-11 h-11 bg-white border-[1.5px] border-[#111] cursor-pointer flex flex-col items-center justify-center gap-1 transition-all hover:bg-[#ecece6] ${isOpen ? 'open' : ''}`}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1 w-4.5">
            <span className={`block h-0.5 w-full bg-[#111] transition-transform ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-3/4 bg-[#111] ml-auto transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-[#111] transition-transform ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Menu Card */}
      <div className={`fixed top-[84px] right-[max(16px,calc((100vw-1180px)/2+14px))] w-[300px] z-50 p-2.5 bg-[#e7e7e1] border-[1.5px] border-[#111] shadow-xl transition-all duration-300 origin-top-right ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 p-3 bg-white border border-transparent hover:border-[#cfcfc8] hover:bg-[#f5f5f0] text-[#111] text-sm font-medium text-left transition-all w-full cursor-pointer"
          >
            <div className="w-8 h-8 bg-white border-[1.5px] border-[#111] flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 text-[#111]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block font-semibold">Beranda Utama</span>
              <small className="text-[#666] text-xs">Aktivasi Alight Motion Premium Gratis</small>
            </div>
            <span className="px-2 py-0.5 bg-[#dff5e8] text-[#0a8f4d] border border-[#0a8f4d] text-[10px] font-bold uppercase">HOT</span>
          </button>

          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 p-3 bg-white border border-transparent hover:border-[#cfcfc8] hover:bg-[#f5f5f0] text-[#111] text-sm font-medium text-left transition-all w-full cursor-pointer"
          >
            <div className="w-8 h-8 bg-white border-[1.5px] border-[#111] flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-4 h-4 text-[#111]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block font-semibold">Dashboard Akun</span>
              <small className="text-[#666] text-xs">Cek status & masa aktif akun</small>
            </div>
            <span className="px-2 py-0.5 bg-[#e6eaff] text-[#3355ff] border border-[#3355ff] text-[10px] font-bold uppercase">PRO</span>
          </button>

          <button
            onClick={() => handleNav('tools')}
            className="flex items-center gap-3 p-3 bg-white border border-transparent hover:border-[#cfcfc8] hover:bg-[#f5f5f0] text-[#111] text-sm font-medium text-left transition-all w-full cursor-pointer"
          >
            <div className="w-8 h-8 bg-white border-[1.5px] border-[#111] flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4 text-[#111]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block font-semibold">Tools & Presets</span>
              <small className="text-[#666] text-xs">XML, Presets & Speed Ramp</small>
            </div>
            <span className="px-2 py-0.5 bg-[#fff1d1] text-[#a86400] border border-[#a86400] text-[10px] font-bold uppercase">NEW</span>
          </button>

          <button
            onClick={() => handleNav('admin')}
            className="flex items-center gap-3 p-3 bg-white border border-transparent hover:border-[#cfcfc8] hover:bg-[#f5f5f0] text-[#111] text-sm font-medium text-left transition-all w-full cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#e6eaff] border-[1.5px] border-[#3355ff] flex items-center justify-center shrink-0 text-[#3355ff]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block font-semibold">Admin Broadcast</span>
              <small className="text-[#666] text-xs">Kirim siaran pesan live</small>
            </div>
          </button>

          <div className="h-px bg-white my-1"></div>

          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 bg-[#fde4e7] border border-[#d6283c] text-[#d6283c] text-sm font-medium text-left transition-all w-full cursor-pointer hover:bg-[#fcd0d5]"
            >
              <div className="w-8 h-8 bg-white border-[1.5px] border-[#d6283c] flex items-center justify-center shrink-0 text-[#d6283c]">
                <LogOut className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-semibold">Keluar Akun</span>
                <small className="text-[#d6283c]/80 text-xs">Hapus sesi aktif</small>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 bg-[#111] text-white text-sm font-medium text-left transition-all w-full cursor-pointer hover:bg-[#333]"
            >
              <div className="w-8 h-8 bg-white/10 border-[1.5px] border-white/20 flex items-center justify-center shrink-0 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-semibold">Masuk Akun</span>
                <small className="text-white/70 text-xs">Hubungkan Alight Motion</small>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
