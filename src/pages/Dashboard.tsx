import React from 'react';
import { UserAccount, PageType } from '../types';
import { LayoutDashboard, CheckCircle2, Clock, Mail, ShieldAlert, Award, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface DashboardProps {
  userAccount: UserAccount;
  setCurrentPage: (page: PageType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userAccount, setCurrentPage }) => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-[1180px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white border-[1.5px] border-[#111] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e6eaff] border border-[#3355ff] text-[#3355ff] text-xs font-bold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard Member AxzyeDev
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111]">Kelola Akun & Status VIP</h1>
        </div>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-5 py-2.5 bg-[#111] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Aktivasi Baru</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <div className="bg-white border-[1.5px] border-[#111] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666]">Status Langganan</span>
            <span className={`px-2.5 py-1 text-xs font-bold uppercase ${userAccount.status === 'active' ? 'bg-[#dff5e8] text-[#0a8f4d] border border-[#0a8f4d]' : 'bg-[#fff1d1] text-[#a86400] border border-[#a86400]'}`}>
              {userAccount.status === 'active' ? 'ACTIVE VIP' : 'PENDING'}
            </span>
          </div>
          <div className="text-2xl font-black text-[#111] mb-1">{userAccount.plan}</div>
          <p className="text-xs text-[#666] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#3355ff]" /> Berlaku sampai: {userAccount.expiresAt}
          </p>
        </div>

        {/* Email Card */}
        <div className="bg-white border-[1.5px] border-[#111] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666]">Akun Terhubung</span>
            <Mail className="w-4 h-4 text-[#3355ff]" />
          </div>
          <div className="text-lg font-bold text-[#111] truncate mb-1">{userAccount.email || 'Belum ada akun terhubung'}</div>
          <p className="text-xs text-[#0a8f4d] flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sinkronisasi API Aktif
          </p>
        </div>

        {/* Activations Count Card */}
        <div className="bg-white border-[1.5px] border-[#111] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666]">Total Aktivasi</span>
            <Award className="w-4 h-4 text-[#a86400]" />
          </div>
          <div className="text-3xl font-black text-[#111] mb-1">{userAccount.activationsCount}</div>
          <p className="text-xs text-[#666]">Sukses diinjeksikan ke server</p>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="bg-white border-[1.5px] border-[#111] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <h3 className="text-lg font-black text-[#111] mb-6 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#3355ff]" /> Riwayat Aktivasi Akun
        </h3>

        {userAccount.email ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-[1.5px] border-[#111] text-xs font-bold uppercase tracking-wider text-[#666]">
                  <th className="py-3 px-4">Email Akun</th>
                  <th className="py-3 px-4">Paket</th>
                  <th className="py-3 px-4">Tanggal Aktivasi</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee] text-sm font-medium">
                <tr>
                  <td className="py-4 px-4 font-bold text-[#111]">{userAccount.email}</td>
                  <td className="py-4 px-4">{userAccount.plan}</td>
                  <td className="py-4 px-4 text-[#666]">{userAccount.activatedAt}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#dff5e8] text-[#0a8f4d] border border-[#0a8f4d] text-xs font-bold uppercase">
                      Success
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-[#666]">
            <p className="mb-4">Belum ada riwayat aktivasi tercatat di sesi ini.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-[#111] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#333] transition-all cursor-pointer"
            >
              Mulai Aktivasi Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
