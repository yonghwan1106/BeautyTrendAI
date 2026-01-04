"use client";

import { competitorData } from "@/lib/data";
import { Building2, Calendar, FlaskConical, Tag, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoryColors: Record<string, string> = {
  세럼: "bg-[rgba(201,169,98,0.2)] text-[#E8D5A8]",
  크림: "bg-[rgba(212,165,165,0.2)] text-[#D4A5A5]",
  에센스: "bg-[rgba(114,47,55,0.3)] text-[#E8D5D3]",
};

export default function CompetitorsPage() {
  const upcomingLaunches = [...competitorData].sort(
    (a, b) => new Date(a.launch).getTime() - new Date(b.launch).getTime()
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          Competitor Analysis
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          Global Beauty Brand Intelligence
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">모니터링 브랜드</p>
              <p className="font-display text-2xl text-[#E8D5A8]">5</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">예정 출시</p>
              <p className="font-display text-2xl text-[#E8D5A8]">{competitorData.length}</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">주요 성분</p>
              <p className="font-display text-2xl text-[#E8D5A8]">12</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">카테고리</p>
              <p className="font-display text-2xl text-[#E8D5A8]">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Launches Timeline */}
      <div className="glass-card p-6">
        <h2 className="font-display mb-6 text-xl font-light text-[#E8D5A8]">
          Upcoming Product Launches
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-[#C9A962] via-[#D4A5A5] to-[#722F37]" />
          <div className="space-y-6">
            {upcomingLaunches.map((product, index) => (
              <div key={index} className="relative ml-12">
                <div className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-[#C9A962] bg-[#1A1A1A]" />
                <div className="rounded-xl border border-[rgba(201,169,98,0.15)] bg-[rgba(255,255,255,0.02)] p-4 transition-all duration-300 hover:border-[rgba(201,169,98,0.3)] hover:bg-[rgba(255,255,255,0.04)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#C9A962]">{product.launch}</p>
                      <h3 className="font-display mt-1 text-lg text-[#E8D5A8]">
                        {product.product}
                      </h3>
                      <p className="mt-1 text-sm text-[rgba(245,240,235,0.6)]">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          categoryColors[product.category] || "bg-[rgba(201,169,98,0.2)] text-[#E8D5A8]"
                        }`}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-[rgba(245,240,235,0.5)]" />
                    <span className="text-sm text-[rgba(245,240,235,0.7)]">
                      Key Ingredient: <span className="text-[#C9A962]">{product.keyIngredient}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Table */}
      <div className="glass-card overflow-hidden">
        <div className="border-b border-[rgba(201,169,98,0.15)] p-6">
          <h2 className="font-display text-xl font-light text-[#E8D5A8]">
            Detailed Product Matrix
          </h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[rgba(201,169,98,0.15)] hover:bg-transparent">
                <TableHead className="text-[rgba(245,240,235,0.6)]">Brand</TableHead>
                <TableHead className="text-[rgba(245,240,235,0.6)]">Product</TableHead>
                <TableHead className="text-[rgba(245,240,235,0.6)]">Launch</TableHead>
                <TableHead className="text-[rgba(245,240,235,0.6)]">Category</TableHead>
                <TableHead className="text-[rgba(245,240,235,0.6)]">Key Ingredient</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorData.map((product, index) => (
                <TableRow
                  key={index}
                  className="border-[rgba(201,169,98,0.1)] transition-colors hover:bg-[rgba(201,169,98,0.05)]"
                >
                  <TableCell className="font-medium text-[#E8D5A8]">
                    {product.brand}
                  </TableCell>
                  <TableCell className="text-[rgba(245,240,235,0.8)]">
                    {product.product}
                  </TableCell>
                  <TableCell className="text-[#C9A962]">{product.launch}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        categoryColors[product.category] || "bg-[rgba(201,169,98,0.2)] text-[#E8D5A8]"
                      }`}
                    >
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-[rgba(245,240,235,0.7)]">
                    {product.keyIngredient}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Insight Box */}
      <div className="insight-box">
        <h3 className="font-display text-lg font-medium text-[#E8D5A8]">
          Competitive Intelligence Summary
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
          2026년 1분기 글로벌 프리미엄 스킨케어 시장에서는{" "}
          <strong className="text-[#C9A962]">차세대 레티놀 대안</strong>과{" "}
          <strong className="text-[#C9A962]">면역 강화 성분</strong>에 대한 경쟁이 치열해질 것으로 예상됩니다.
          에스티로더의 크로노럭신 NEO, 시세이도의 ImuGeneration RED 등 각 브랜드만의
          독자 성분 개발이 활발하며, 이에 대응하는 아모레퍼시픽만의 차별화된
          성분 포지셔닝이 필요합니다.
        </p>
      </div>
    </div>
  );
}
