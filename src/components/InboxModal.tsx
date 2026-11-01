import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Copy, Check, ExternalLink, Inbox, X } from 'lucide-react';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
  onSelectMagicLink: (link: string) => void;
}

export const InboxModal: React.FC<InboxModalProps> = ({ isOpen, onClose, currentEmail, onSelectMagicLink }) => {
  const [emailInput, setEmailInput] = useState(currentEmail || 'pigor39657@turnproxy.com');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchInbox = async (targetEmail: string) => {
    if (!targetEmail) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/inbox?email=${encodeURIComponent(targetEmail)}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInbox(emailInput);
    }
  }, [isOpen, emailInput]);

  const handleCopy = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border-[1.5px] border-[#333] w-full max-w-2xl rounded-none shadow-2xl overflow-hidden text-[#f5f5f7] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#333] flex items-center justify-center text-[#a78bfa]">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Kotak Masuk (Inbox Viewer)</h2>
              <p className="text-xs text-zinc-400">Simulasi penerimaan Magic Link Alight Motion</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-[#333] hover:bg-[#444] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Input Bar */}
        <div className="p-4 bg-[#181818] border-b border-[#333] flex gap-2 items-center">
          <Mail className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Masukkan email (cth: pigor39657@turnproxy.com)"
            className="w-full bg-[#252525] border border-[#444] px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a78bfa]"
          />
          <button
            onClick={() => fetchInbox(emailInput)}
            disabled={loading}
            className="px-4 py-2 bg-[#a78bfa] hover:bg-[#906df8] text-[#111] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Segarkan</span>
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 space-y-3">
              <Mail className="w-12 h-12 mx-auto stroke-1 text-zinc-600" />
              <p className="text-sm font-medium">Kotak masuk masih kosong.</p>
              <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                Kirim Magic Link dari halaman utama menggunakan email <span className="text-zinc-300 font-mono">{emailInput}</span>, lalu klik tombol Segarkan di atas.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-[#242424] border border-[#383838] p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-bold text-[#a78bfa]">{msg.sender}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <h4 className="font-bold text-white text-base">{msg.subject}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{msg.body}</p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between bg-[#1a1a1a] p-3 border border-[#333]">
                  <span className="text-[11px] font-mono text-zinc-400 truncate max-w-sm">{msg.magicLink}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(msg.magicLink, msg.id)}
                      className="px-3 py-1.5 bg-[#333] hover:bg-[#444] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === msg.id ? 'Disalin!' : 'Salin Link'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectMagicLink(msg.magicLink);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-[#a78bfa] hover:bg-[#906df8] text-[#111] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Gunakan Link Ini</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
