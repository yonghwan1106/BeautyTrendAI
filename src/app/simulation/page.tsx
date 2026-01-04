"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, DollarSign, Target, Beaker, Palette } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const ingredientOptions = [
  { value: "bakuchiol", label: "바쿠치올", efficacy: 92, trend: 95, safety: 98, cost: 75 },
  { value: "ceramide", label: "세라마이드", efficacy: 88, trend: 78, safety: 95, cost: 85 },
  { value: "peptide", label: "펩타이드", efficacy: 90, trend: 85, safety: 92, cost: 70 },
  { value: "niacinamide", label: "나이아신아마이드", efficacy: 85, trend: 72, safety: 96, cost: 90 },
  { value: "retinol", label: "레티놀", efficacy: 95, trend: 65, safety: 70, cost: 80 },
];

const categoryOptions = [
  { value: "serum", label: "세럼", marketSize: 2800 },
  { value: "cream", label: "크림", marketSize: 3200 },
  { value: "essence", label: "에센스", marketSize: 2100 },
  { value: "ampoule", label: "앰플", marketSize: 1800 },
];

const targetOptions = [
  { value: "gen_z", label: "Gen Z (18-25)", preference: "가성비, 클린뷰티" },
  { value: "millennial", label: "Millennial (26-40)", preference: "효능, 프리미엄" },
  { value: "gen_x", label: "Gen X (41-55)", preference: "안티에이징, 안전성" },
];

export default function SimulationPage() {
  const [selectedIngredient, setSelectedIngredient] = useState(ingredientOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedTarget, setSelectedTarget] = useState(targetOptions[0]);
  const [pricePoint, setPricePoint] = useState(85000);

  const radarData = [
    { subject: "효능", value: selectedIngredient.efficacy },
    { subject: "트렌드", value: selectedIngredient.trend },
    { subject: "안전성", value: selectedIngredient.safety },
    { subject: "원가효율", value: selectedIngredient.cost },
    { subject: "시장성", value: Math.round((selectedIngredient.trend + selectedIngredient.efficacy) / 2) },
  ];

  const estimatedRevenue = Math.round(
    (selectedCategory.marketSize * (selectedIngredient.trend / 100) * (pricePoint / 100000)) * 10
  ) / 10;

  const successScore = Math.round(
    (selectedIngredient.efficacy * 0.3 +
      selectedIngredient.trend * 0.25 +
      selectedIngredient.safety * 0.2 +
      selectedIngredient.cost * 0.15 +
      (pricePoint > 100000 ? 80 : pricePoint > 50000 ? 90 : 70) * 0.1)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          Product Simulation
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          AI-Powered Product Development Simulator
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Ingredient Selection */}
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center gap-2 text-[#C9A962]">
            <Beaker className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Key Ingredient</span>
          </div>
          <select
            value={selectedIngredient.value}
            onChange={(e) =>
              setSelectedIngredient(
                ingredientOptions.find((i) => i.value === e.target.value) || ingredientOptions[0]
              )
            }
            className="w-full rounded-xl border border-[rgba(201,169,98,0.2)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#E8D5A8] focus:border-[#C9A962] focus:outline-none"
          >
            {ingredientOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#2D2D2D]">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selection */}
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center gap-2 text-[#C9A962]">
            <Palette className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Category</span>
          </div>
          <select
            value={selectedCategory.value}
            onChange={(e) =>
              setSelectedCategory(
                categoryOptions.find((c) => c.value === e.target.value) || categoryOptions[0]
              )
            }
            className="w-full rounded-xl border border-[rgba(201,169,98,0.2)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#E8D5A8] focus:border-[#C9A962] focus:outline-none"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#2D2D2D]">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Target Selection */}
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center gap-2 text-[#C9A962]">
            <Target className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Target</span>
          </div>
          <select
            value={selectedTarget.value}
            onChange={(e) =>
              setSelectedTarget(
                targetOptions.find((t) => t.value === e.target.value) || targetOptions[0]
              )
            }
            className="w-full rounded-xl border border-[rgba(201,169,98,0.2)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#E8D5A8] focus:border-[#C9A962] focus:outline-none"
          >
            {targetOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#2D2D2D]">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Point */}
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center gap-2 text-[#C9A962]">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Price Point</span>
          </div>
          <input
            type="range"
            min={30000}
            max={200000}
            step={5000}
            value={pricePoint}
            onChange={(e) => setPricePoint(Number(e.target.value))}
            className="w-full accent-[#C9A962]"
          />
          <p className="mt-2 text-center font-display text-xl text-[#E8D5A8]">
            {pricePoint.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h2 className="font-display mb-4 text-xl font-light text-[#E8D5A8]">
            Ingredient Analysis: {selectedIngredient.label}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(201,169,98,0.2)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "rgba(245,240,235,0.7)", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "rgba(245,240,235,0.5)", fontSize: 10 }}
              />
              <Radar
                name={selectedIngredient.label}
                dataKey="value"
                stroke="#C9A962"
                fill="#C9A962"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Success Metrics */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[rgba(245,240,235,0.5)]">
                  Success Score
                </p>
                <p className="font-display mt-2 text-5xl text-[#E8D5A8]">{successScore}</p>
              </div>
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  successScore >= 85
                    ? "bg-emerald-500/20 text-emerald-400"
                    : successScore >= 70
                    ? "bg-[rgba(201,169,98,0.2)] text-[#C9A962]"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C9A962] to-[#E8D5A8] transition-all duration-500"
                  style={{ width: `${successScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="metric-card">
              <TrendingUp className="h-5 w-5 text-[#C9A962]" />
              <p className="mt-2 text-xs text-[rgba(245,240,235,0.5)] uppercase">예상 매출</p>
              <p className="font-display text-2xl text-[#E8D5A8]">{estimatedRevenue}B</p>
            </div>
            <div className="metric-card">
              <Target className="h-5 w-5 text-[#C9A962]" />
              <p className="mt-2 text-xs text-[rgba(245,240,235,0.5)] uppercase">시장 규모</p>
              <p className="font-display text-2xl text-[#E8D5A8]">
                {selectedCategory.marketSize.toLocaleString()}B
              </p>
            </div>
          </div>

          <div className="insight-box">
            <h3 className="font-display text-base font-medium text-[#E8D5A8]">
              Target Insight
            </h3>
            <p className="mt-2 text-sm text-[rgba(245,240,235,0.8)]">
              <strong className="text-[#C9A962]">{selectedTarget.label}</strong> 타겟층은{" "}
              <strong className="text-[#C9A962]">{selectedTarget.preference}</strong>를
              중시합니다. {selectedIngredient.label} 성분과의 궁합을 고려한
              마케팅 전략이 필요합니다.
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="glass-card border-l-4 border-l-[#C9A962] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8D5A8]">
            <Sparkles className="h-5 w-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h3 className="font-display text-lg font-medium text-[#E8D5A8]">
              AI Recommendation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
              현재 설정으로 <strong className="text-[#C9A962]">{selectedIngredient.label}</strong> 기반의{" "}
              <strong className="text-[#C9A962]">{selectedCategory.label}</strong> 제품은{" "}
              {successScore >= 85 ? (
                <>
                  <span className="text-emerald-400">높은 성공 가능성</span>을 보입니다.
                  특히 {selectedIngredient.trend}%의 트렌드 지수와 {selectedIngredient.safety}%의
                  안전성 점수가 강점입니다.
                </>
              ) : successScore >= 70 ? (
                <>
                  <span className="text-[#C9A962]">적정 수준의 시장성</span>을 갖추고 있습니다.
                  가격대 조정이나 타겟 세분화를 통해 성공률을 높일 수 있습니다.
                </>
              ) : (
                <>
                  <span className="text-red-400">재검토가 필요</span>합니다.
                  성분 조합이나 타겟 고객 변경을 권장합니다.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
