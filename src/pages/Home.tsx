import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, Smartphone, CheckCircle2, ArrowRight, HelpCircle, ChevronDown, Award, Users, Star, RefreshCw } from 'lucide-react';
import { UserAccount, BroadcastMessage } from '../types';

interface HomeProps {
  userAccount: UserAccount;
  setUserAccount: React.Dispatch<React.SetStateAction<UserAccount>>;
  onBroadcast: (msg: string, emoji: string) => void;
  setActivePage: (page: any) => void;
  setUserEmail: (email: string) => void;
}

export const Home: React.FC<HomeProps> = ({ userAccount, setUserAccount, onBroadcast, setActivePage, setUserEmail }) => {
  const [emailInput, setEmailInput] = useState('pigor39657@turnproxy.com');
  const [planType, setPlanType] = useState('1 Tahun (VIP)');
  const [step, setStep] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      alert('Silakan masukkan email atau ID Alight Motion kamu terlebih dahulu!');
      return;
    }

    setUserEmail(emailInput);
    setStep('verifying');

    try {
      // Call backend api to send magic link into inbox
      await fetch('/api/v1/web-magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-magiclink', email: emailInput })
      });
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setStep('success');
      setUserAccount({
        email: emailInput,
        plan: planType,
        activatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        expiresAt: planType.includes('Lifetime') ? 'Selamanya (VIP)' : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'active',
        activationsCount: userAccount.activationsCount + 1
      });
      onBroadcast(`Akun ${emailInput.split('@')[0]}... berhasil mengirim Magic Link ke Kotak Masuk! 🎉`, '🔥');
    }, 2000);
  };

  const faqs = [
    {
      q: 'Apakah Alight Motion Premium di AxzyeDev benar-benar gratis?',
      a: 'Ya, kamu bisa mengaktifkan Alight Motion Premium secara gratis melalui AxzyeDev. Cukup masukkan email Alight Motion kamu, pilih durasi, dan verifikasi instan.'
    },
    {
      q: 'Berapa lama proses aktivasi Alight Motion Premium?',
      a: 'Proses aktivasi hanya membutuhkan waktu 1-2 menit setelah kamu klik tombol aktivasi. Sistem otomatis menyinkronkan status premium ke akun AM kamu.'
    },
    {
      q: 'Apakah perlu root HP untuk pakai AxzyeDev?',
      a: 'Tidak perlu root sama sekali. Metode AxzyeDev bekerja melalui server resmi menggunakan sistem verifikasi token aman, jadi aman untuk semua jenis smartphone.'
    },
    {
      q: 'Apakah akun saya aman dari banned?',
      a: '100% aman! Sistem kami menggunakan bypass API resmi tanpa modifikasi APK berbahaya yang dapat memicu banned akun.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1180px] mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dff5e8] border-[1.5px] border-[#0a8f4d] text-[#0a8f4d] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free & Tanpa Root — Resmi AxzyeDev
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#111] tracking-tight leading-[1.1] mb-6">
          Alight Motion Premium <span className="text-[#3355ff] underline decoration-wavy decoration-2">Gratis & Aman</span>
        </h1>
        <p className="text-lg text-[#555] font-normal leading-relaxed mb-8">
          Aktifkan fitur pro tanpa watermark, efek tak terbatas, export 4K, dan keyframe premium langsung dari browser tanpa ribet.
        </p>

        {/* Stats Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 bg-white border-[1.5px] border-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#3355ff]" />
            <span className="text-sm font-bold text-[#111]">48,250+</span>
            <span className="text-xs text-[#666]">User Aktif</span>
          </div>
          <div className="w-px h-4 bg-[#ddd] hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0a8f4d]" />
            <span className="text-sm font-bold text-[#111]">100% Bergaransi</span>
            <span className="text-xs text-[#666]">Aman & Anti-Banned</span>
          </div>
          <div className="w-px h-4 bg-[#ddd] hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#a86400] fill-[#a86400]" />
            <span className="text-sm font-bold text-[#111]">4.9/5.0</span>
            <span className="text-xs text-[#666]">Rating Editor</span>
          </div>
        </div>
      </div>

      {/* Activation Card / Box */}
      <div className="max-w-xl mx-auto bg-white border-[1.5px] border-[#111] p-8 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative">
        <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#111] text-white text-xs font-bold uppercase tracking-wider">
          Server Online ⚡
        </div>

        <h3 className="text-2xl font-black text-[#111] mb-2">Panel Aktivasi Instan</h3>
        <p className="text-sm text-[#666] mb-8">
          Masukkan email akun Alight Motion kamu di bawah untuk mulai menyinkronkan status VIP.
        </p>

        {step === 'idle' && (
          <form onSubmit={handleActivate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#333] mb-2">
                Email / ID Alight Motion
              </label>
              <input
                type="email"
                required
                placeholder="contoh: editor@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#f9f9f6] border-[1.5px] border-[#111] text-[#111] font-medium text-sm focus:outline-none focus:border-[#3355ff] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#333] mb-2">
                Pilih Paket Premium
              </label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full px-4 py-3 bg-[#f9f9f6] border-[1.5px] border-[#111] text-[#111] font-medium text-sm focus:outline-none focus:border-[#3355ff] transition-colors cursor-pointer"
              >
                <option value="1 Bulan (Pro)">Paket 1 Bulan (Pro)</option>
                <option value="1 Tahun (VIP)">Paket 1 Tahun (VIP) — Recommended</option>
                <option value="Lifetime (Ultimate)">Paket Lifetime VIP (Selamanya)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#111] hover:bg-[#333] text-white font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              <span>Aktifkan Premium Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'verifying' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#111] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h4 className="text-xl font-bold text-[#111]">Menghubungkan ke Server AM...</h4>
            <p className="text-sm text-[#666]">Sedang memverifikasi email dan menginjeksikan lisensi pro ke akun kamu...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#dff5e8] border-2 border-[#0a8f4d] rounded-full flex items-center justify-center mx-auto text-[#0a8f4d]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-[#111]">Aktivasi Berhasil! 🎉</h4>
            <p className="text-sm text-[#555] max-w-sm mx-auto">
              Akun <span className="font-bold text-[#111]">{emailInput}</span> kini telah berstatus <span className="text-[#0a8f4d] font-bold">{planType}</span>. Silakan buka aplikasi Alight Motion kamu.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setActivePage('dashboard')}
                className="px-6 py-3 bg-[#111] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#333] transition-all cursor-pointer"
              >
                Buka Dashboard Saya
              </button>
              <button
                onClick={() => setStep('idle')}
                className="px-6 py-3 bg-white border-[1.5px] border-[#111] text-[#111] font-bold text-xs uppercase tracking-wider hover:bg-[#f0f0eb] transition-all cursor-pointer"
              >
                Aktivasi Akun Lain
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white border-[1.5px] border-[#111] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 bg-[#e6eaff] border-[1.5px] border-[#3355ff] flex items-center justify-center text-[#3355ff] mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111] mb-3">Aktivasi Instan</h3>
          <p className="text-sm text-[#666] leading-relaxed">
            Hanya butuh 2 menit untuk memproses aktivasi akun tanpa perlu verifikasi KTP atau pembayaran tersembunyi.
          </p>
        </div>

        <div className="bg-white border-[1.5px] border-[#111] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 bg-[#dff5e8] border-[1.5px] border-[#0a8f4d] flex items-center justify-center text-[#0a8f4d] mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111] mb-3">100% Tanpa Root</h3>
          <p className="text-sm text-[#666] leading-relaxed">
            Berjalan langsung melalui sinkronisasi server resmi Alight Motion, aman untuk Android & iOS tanpa modifikasi sistem.
          </p>
        </div>

        <div className="bg-white border-[1.5px] border-[#111] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 bg-[#fff1d1] border-[1.5px] border-[#a86400] flex items-center justify-center text-[#a86400] mb-6">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111] mb-3">Fitur Pro Terbuka</h3>
          <p className="text-sm text-[#666] leading-relaxed">
            Nikmati seluruh efek premium, preset xml eksklusif, tanpa watermark, dan export video beresolusi 4K 60FPS.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="mt-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3355ff] bg-[#e6eaff] px-3 py-1 border border-[#3355ff]">
            Bantuan & Pertanyaan
          </span>
          <h2 className="text-3xl font-black text-[#111] mt-4">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border-[1.5px] border-[#111] overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-base text-[#111] bg-white hover:bg-[#fafaf5] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#111] transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-sm text-[#666] leading-relaxed border-t border-[#eee] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
