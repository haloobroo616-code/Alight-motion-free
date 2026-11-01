import React, { useState } from 'react';
import { ToolItem } from '../types';
import { Wrench, Download, Star, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const Tools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const toolsList: ToolItem[] = [
    {
      id: '1',
      title: 'Preset Smooth 3D Velocity XML',
      category: 'XML',
      description: 'Preset XML Alight Motion dengan shake 3D halus, color grading cinematic, dan transisi smooth.',
      downloads: 14200,
      rating: 4.9,
      tag: 'HOT'
    },
    {
      id: '2',
      title: 'Speed Ramp Curve 0.2x — 5.0x',
      category: 'Speed',
      description: 'Kumpulan kurva kecepatan untuk slow-mo dan fast-forward jedag-jedug profesional.',
      downloads: 9850,
      rating: 4.8,
      tag: 'NEW'
    },
    {
      id: '3',
      title: 'Color Grading Teal & Orange v2',
      category: 'Effect',
      description: 'Efek color grading sinematik high contrast untuk video reels dan tiktok.',
      downloads: 12400,
      rating: 4.9,
      tag: 'PRO'
    },
    {
      id: '4',
      title: 'Preset Text Animation Jiggle',
      category: 'Preset',
      description: 'Animasi teks bergoyang otomatis dengan keyframe presisi tinggi tanpa plugin tambahan.',
      downloads: 8700,
      rating: 4.7,
      tag: 'POPULAR'
    },
    {
      id: '5',
      title: 'XML Project AM v5.0 Full Shake',
      category: 'XML',
      description: 'File project siap edit dengan efek shake detak jantung dan flash putih interaktif.',
      downloads: 15600,
      rating: 5.0,
      tag: 'VIP'
    },
    {
      id: '6',
      title: 'Glow Laser Beat Sync Effect',
      category: 'Effect',
      description: 'Efek cahaya laser warna-warni yang otomatis sinkron dengan ketukan beat musik.',
      downloads: 11200,
      rating: 4.8,
      tag: 'NEW'
    }
  ];

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Berhasil mengunduh "${title}"! Silakan impor file ke Alight Motion.`);
    }, 1500);
  };

  const filteredTools = toolsList.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1180px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff1d1] border border-[#a86400] text-[#a86400] text-xs font-bold uppercase tracking-wider mb-4">
          <Wrench className="w-3.5 h-3.5" /> AxzyeDev Tools & Presets
        </span>
        <h1 className="text-4xl font-black text-[#111] mb-4">Pusat Preset & XML Alight Motion</h1>
        <p className="text-sm text-[#666]">
          Unduh ribuan preset XML, kurva kecepatan, dan efek siap pakai secara gratis untuk mempercepat proses editing kamu.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white border-[1.5px] border-[#111] p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
          <input
            type="text"
            placeholder="Cari preset, xml, atau efek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#f9f9f6] border-[1.5px] border-[#111] text-sm text-[#111] focus:outline-none focus:border-[#3355ff]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['All', 'XML', 'Preset', 'Speed', 'Effect'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-[1.5px] ${selectedCategory === cat ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#333] border-[#111] hover:bg-[#f0f0eb]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white border-[1.5px] border-[#111] p-6 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#e6eaff] text-[#3355ff] border border-[#3355ff] text-[10px] font-bold uppercase">
                  {tool.category}
                </span>
                <span className="px-2 py-0.5 bg-[#dff5e8] text-[#0a8f4d] border border-[#0a8f4d] text-[10px] font-bold uppercase">
                  {tool.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111] mb-2">{tool.title}</h3>
              <p className="text-xs text-[#666] leading-relaxed mb-6">{tool.description}</p>
            </div>

            <div className="pt-4 border-t border-[#eee] flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#666]">
                <span className="flex items-center gap-1 font-bold text-[#111]">
                  <Download className="w-3.5 h-3.5 text-[#3355ff]" /> {(tool.downloads / 1000).toFixed(1)}k
                </span>
                <span className="flex items-center gap-1 font-bold text-[#a86400]">
                  <Star className="w-3.5 h-3.5 fill-[#a86400]" /> {tool.rating}
                </span>
              </div>

              <button
                onClick={() => handleDownload(tool.id, tool.title)}
                disabled={downloadingId === tool.id}
                className="px-4 py-2 bg-[#111] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {downloadingId === tool.id ? (
                  <span>Mengunduh...</span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Ambil XML</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
