import React, { useState } from 'react';
import { BroadcastMessage } from '../types';
import { ShieldAlert, Send, Sparkles, CheckCircle2, MessageSquare, Flame, Bell } from 'lucide-react';

interface AdminPanelProps {
  currentMessage: BroadcastMessage | null;
  onBroadcast: (msg: string, emoji: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentMessage, onBroadcast }) => {
  const [msgInput, setMsgInput] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [success, setSuccess] = useState(false);

  const emojis = ['🔥', '🎉', '⚡', '📢', '🚀', '⭐', '💎', '💡'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    onBroadcast(msgInput, selectedEmoji);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setMsgInput('');
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <div className="bg-white border-[1.5px] border-[#111] p-8 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative">
        <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#3355ff] text-white text-xs font-bold uppercase tracking-wider">
          Admin Broadcast Tool ⚡
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#e6eaff] border-[1.5px] border-[#3355ff] flex items-center justify-center text-[#3355ff]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#111]">Pusat Kontrol Siaran Live</h1>
            <p className="text-xs text-[#666]">Kirim pengumuman banner yang langsung muncul di atas layar semua pengunjung website.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-[#dff5e8] border border-[#0a8f4d] text-[#0a8f4d] text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Siaran Berhasil Disiarkan ke Seluruh Pengunjung!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#333] mb-2">
              Pilih Emoji Ikon
            </label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setSelectedEmoji(em)}
                  className={`w-11 h-11 text-lg border-[1.5px] flex items-center justify-center transition-all cursor-pointer ${selectedEmoji === em ? 'bg-[#111] border-[#111] text-white scale-105' : 'bg-white border-[#ccc] hover:bg-[#f0f0eb]'}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#333] mb-2">
              Pesan Siaran (Broadcast Message)
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tulis pesan pengumuman di sini... (misal: Server AM VIP telah diperbarui ke versi terbaru!)"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              className="w-full p-4 bg-[#f9f9f6] border-[1.5px] border-[#111] text-sm text-[#111] focus:outline-none focus:border-[#3355ff]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#111] hover:bg-[#333] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Sekarang</span>
          </button>
        </form>

        {/* Current Active Broadcast preview */}
        {currentMessage && (
          <div className="mt-8 pt-6 border-t border-[#eee]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666] block mb-2">Pesan Aktif Saat Ini:</span>
            <div className="p-4 bg-[#f9f9f6] border border-[#ccc] flex items-center gap-3">
              <span className="text-2xl">{currentMessage.emoji}</span>
              <div>
                <div className="text-xs font-bold text-[#3355ff]">{currentMessage.admin} (Verified)</div>
                <div className="text-sm text-[#111] font-medium">{currentMessage.message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
