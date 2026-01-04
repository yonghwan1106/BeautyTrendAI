"use client";

import { colorTrends } from "@/lib/data";
import { Palette, TrendingUp, Calendar, Sparkles } from "lucide-react";

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1A1A1A" : "#FFFFFF";
}

const seasonColors = {
  "S/S 2026": "#E8D5D3",
  "F/W 2026": "#722F37",
  "All Season": "#C9A962",
};

export default function ColorsPage() {
  const sortedColors = [...colorTrends].sort((a, b) => b.growth - a.growth);
  const topColor = sortedColors[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          Color Trends
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          2026 Season Color Palette Analysis
        </p>
      </div>

      {/* Top Color Highlight */}
      <div
        className="glass-card overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${topColor.hex}30 0%, rgba(26,26,26,0.95) 100%)`,
        }}
      >
        <div className="flex flex-col md:flex-row">
          <div
            className="flex h-48 w-full items-center justify-center md:h-auto md:w-1/3"
            style={{ backgroundColor: topColor.hex }}
          >
            <div className="text-center" style={{ color: getTextColor(topColor.hex) }}>
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Top Trending</p>
              <p className="font-display mt-2 text-4xl">{topColor.color}</p>
              <p className="mt-1 text-sm font-mono">{topColor.hex}</p>
            </div>
          </div>
          <div className="flex-1 p-8">
            <div className="flex items-center gap-2 text-[#C9A962]">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Trending Color</span>
            </div>
            <h2 className="font-display mt-3 text-3xl text-[#E8D5A8]">{topColor.color}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
              {topColor.color}는 2026년 시즌을 대표하는 컬러로 예측됩니다.
              자연스러운 뉴트럴 톤과 웜한 분위기가 현대적인 미니멀리즘 트렌드와
              완벽하게 조화를 이루며, 립스틱, 아이섀도우, 블러셔 등 다양한
              카테고리에서 활용도가 높습니다.
            </p>
            <div className="mt-6 flex gap-6">
              <div>
                <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">Growth Rate</p>
                <p className="font-display text-2xl text-emerald-400">+{topColor.growth}%</p>
              </div>
              <div>
                <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">Season</p>
                <p className="font-display text-2xl text-[#E8D5A8]">{topColor.season}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#C9A962]" />
          <span className="text-sm text-[rgba(245,240,235,0.7)]">Season:</span>
        </div>
        {Object.entries(seasonColors).map(([season, color]) => (
          <span
            key={season}
            className="flex items-center gap-2 rounded-full border border-[rgba(201,169,98,0.2)] px-4 py-1.5 text-sm"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[rgba(245,240,235,0.8)]">{season}</span>
          </span>
        ))}
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {colorTrends.map((color, index) => (
          <div
            key={color.color}
            className="color-card animate-fade-in-up"
            style={{
              backgroundColor: color.hex,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div style={{ color: getTextColor(color.hex) }}>
              <p className="font-display text-lg font-medium">{color.color}</p>
              <p className="mt-1 text-xs font-mono opacity-70">{color.hex}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="opacity-70">{color.season}</span>
                <span className="font-medium">+{color.growth}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Color Analysis Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="insight-box">
          <div className="flex items-center gap-2 text-[#C9A962]">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-display text-lg font-medium">S/S 2026 Trend</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
            2026년 봄/여름 시즌은 <strong className="text-[#C9A962]">Soft Pink</strong>,{" "}
            <strong className="text-[#C9A962]">Mauve</strong>,{" "}
            <strong className="text-[#C9A962]">Coral</strong> 등 부드럽고 따뜻한 톤이 주도합니다.
            자연스러운 글로우와 "No Makeup Makeup" 트렌드의 영향으로
            피부와 조화로운 컬러가 선호됩니다.
          </p>
        </div>
        <div className="insight-box">
          <div className="flex items-center gap-2 text-[#C9A962]">
            <Palette className="h-5 w-5" />
            <h3 className="font-display text-lg font-medium">F/W 2026 Trend</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
            2026년 가을/겨울 시즌은 <strong className="text-[#C9A962]">Terracotta</strong>,{" "}
            <strong className="text-[#C9A962]">Brick Red</strong>,{" "}
            <strong className="text-[#C9A962]">Berry</strong> 등 깊고 풍부한 컬러가 트렌드입니다.
            레트로 무드와 고급스러운 무드가 결합된 컬러 팔레트가 예상됩니다.
          </p>
        </div>
      </div>

      {/* Color Harmony Suggestion */}
      <div className="glass-card p-6">
        <h2 className="font-display mb-4 text-xl font-light text-[#E8D5A8]">
          Recommended Color Combinations
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[rgba(201,169,98,0.15)] p-4">
            <p className="mb-3 text-sm font-medium text-[#E8D5A8]">Natural Glow</p>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#F5DEB3" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#DCAE96" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#FFB6C1" }} />
            </div>
          </div>
          <div className="rounded-xl border border-[rgba(201,169,98,0.15)] p-4">
            <p className="mb-3 text-sm font-medium text-[#E8D5A8]">Autumn Elegance</p>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#E2725B" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#CB4154" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#8E4585" }} />
            </div>
          </div>
          <div className="rounded-xl border border-[rgba(201,169,98,0.15)] p-4">
            <p className="mb-3 text-sm font-medium text-[#E8D5A8]">Sunset Vibes</p>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#FF7F50" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#E0B0FF" }} />
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#DCAE96" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
