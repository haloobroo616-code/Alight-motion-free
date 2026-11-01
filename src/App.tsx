import React, { useState } from 'react';
import { PageType, UserAccount, BroadcastMessage } from './types';
import { Navbar } from './components/Navbar';
import { BroadcastBanner } from './components/BroadcastBanner';
import { Footer } from './components/Footer';
import { InboxModal } from './components/InboxModal';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Tools } from './pages/Tools';
import { AdminPanel } from './pages/AdminPanel';
import { Inbox, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('pigor39657@turnproxy.com');

  const [userAccount, setUserAccount] = useState<UserAccount>({
    email: 'pigor39657@turnproxy.com',
    plan: '1 Tahun (VIP)',
    activatedAt: '31 Oktober 2026',
    expiresAt: '31 Oktober 2027',
    status: 'active',
    activationsCount: 1
  });

  const [currentMessage, setCurrentMessage] = useState<BroadcastMessage | null>({
    id: 1,
    admin: 'AxzyeDev',
    verified: true,
    emoji: '🔥',
    message: 'Server aktivasi Alight Motion VIP v5.2 online & stabil. Silakan aktifkan akun kamu sekarang!',
    createdAt: new Date().toISOString()
  });

  const handleBroadcast = (msg: string, emoji: string) => {
    setCurrentMessage({
      id: Date.now(),
      admin: 'AxzyeDev Admin',
      verified: true,
      emoji: emoji,
      message: msg,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-[#e7e7e1] text-[#111] flex flex-col font-sans selection:bg-[#3355ff] selection:text-white relative">
      {/* Live Broadcast Banner */}
      <BroadcastBanner currentMessage={currentMessage} />

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            userAccount={userAccount}
            setUserAccount={setUserAccount}
            onBroadcast={handleBroadcast}
            setActivePage={setCurrentPage}
            setUserEmail={setUserEmail}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard
            userAccount={userAccount}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'tools' && (
          <Tools />
        )}
        {currentPage === 'admin' && (
          <AdminPanel
            currentMessage={currentMessage}
            onBroadcast={handleBroadcast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Kotak Masuk / Inbox Button */}
      <button
        onClick={() => setIsInboxOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-[#111] hover:bg-[#333] text-white rounded-none border-[1.5px] border-white/20 shadow-2xl flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-105"
      >
        <div className="w-6 h-6 bg-[#3355ff] flex items-center justify-center text-white">
          <Inbox className="w-3.5 h-3.5" />
        </div>
        <span>Cek Kotak Masuk (Inbox)</span>
      </button>

      {/* Inbox Modal */}
      <InboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        currentEmail={userEmail}
        onSelectMagicLink={(link) => {
          alert('Magic link berhasil disalin: ' + link);
        }}
      />
    </div>
  );
}
