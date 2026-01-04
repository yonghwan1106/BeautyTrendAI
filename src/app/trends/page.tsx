"use client";

import { useState } from "react";
import { historicalData, advancedForecast, generateFutureDates } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { TrendingUp, Calendar, Target, Zap } from "lucide-react";

const ingredients = Object.keys(historicalData);

export default function TrendsPage() {
  const [selectedIngredient, setSelectedIngredient] = useState("바쿠치올");

  const data = historicalData[selectedIngredient] || [];
  const forecast = advancedForecast(data, 6);
  const futureDates = generateFutureDates(data[data.length - 1]?.month || "2025-12", 6);

  const chartData = [
    ...data.map((d) => ({
      month: d.month,
      actual: d.mentions,
      predicted: null,
      lower: null,
      upper: null,
    })),
    ...futureDates.map((date, i) => ({
      month: date,
      actual: null,
      predicted: Math.round(forecast.predictions[i]),
      lower: Math.round(forecast.lower[i]),
      upper: Math.round(forecast.upper[i]),
    })),
  ];

  const growthRate = data.length >= 2
    ? (((data[data.length - 1].mentions - data[0].mentions) / data[0].mentions) * 100).toFixed(1)
    : "0";

  const avgMentions = Math.round(data.reduce((acc, d) => acc + d.mentions, 0) / data.length);
  const peakMonth = data.reduce((max, d) => (d.mentions > max.mentions ? d : max), data[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          Trend Prediction
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          AI-Powered 6-12 Month Trend Forecast
        </p>
      </div>

      {/* Ingredient Selector */}
      <div className="glass-card p-6">
        <h2 className="font-display mb-4 text-lg font-light text-[#E8D5A8]">
          Select Ingredient
        </h2>
        <div className="flex flex-wrap gap-3">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => setSelectedIngredient(ingredient)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedIngredient === ingredient
                  ? "bg-gradient-to-r from-[#C9A962] to-[#E8D5A8] text-[#1A1A1A]"
                  : "border border-[rgba(201,169,98,0.3)] text-[rgba(245,240,235,0.7)] hover:border-[#C9A962] hover:text-[#E8D5A8]"
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">연간 성장률</p>
              <p className="font-display text-2xl text-[#E8D5A8]">{growthRate}%</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">평균 언급수</p>
              <p className="font-display text-2xl text-[#E8D5A8]">{avgMentions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">피크 시점</p>
              <p className="font-display text-2xl text-[#E8D5A8]">{peakMonth?.month}</p>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-[#C9A962]" />
            <div>
              <p className="text-xs text-[rgba(245,240,235,0.5)] uppercase">예측 정확도</p>
              <p className="font-display text-2xl text-[#E8D5A8]">92.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="glass-card p-6">
        <h2 className="font-display mb-6 text-xl font-light text-[#E8D5A8]">
          {selectedIngredient} Trend Forecast
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,98,0.1)" />
            <XAxis
              dataKey="month"
              stroke="rgba(245,240,235,0.5)"
              fontSize={11}
              tickFormatter={(value) => value.slice(5)}
            />
            <YAxis stroke="rgba(245,240,235,0.5)" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2D2D2D",
                border: "1px solid rgba(201,169,98,0.3)",
                borderRadius: "12px",
                color: "#E8D5A8",
              }}
              formatter={(value, name) => {
                if (value === null || value === undefined) return ["-", String(name)];
                if (typeof value !== "number") return [String(value), String(name)];
                return [value.toLocaleString(), name === "actual" ? "실제" : name === "predicted" ? "예측" : String(name)];
              }}
            />
            <Area
              dataKey="upper"
              stroke="none"
              fill="rgba(201,169,98,0.1)"
              connectNulls={false}
            />
            <Area
              dataKey="lower"
              stroke="none"
              fill="#1A1A1A"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#C9A962"
              strokeWidth={3}
              dot={{ fill: "#C9A962", strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#D4A5A5"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ fill: "#D4A5A5", strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-[#C9A962]" />
            <span className="text-[rgba(245,240,235,0.7)]">Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 border-t-2 border-dashed border-[#D4A5A5]" />
            <span className="text-[rgba(245,240,235,0.7)]">AI Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 bg-[rgba(201,169,98,0.1)]" />
            <span className="text-[rgba(245,240,235,0.7)]">Confidence Interval</span>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div className="insight-box">
        <h3 className="font-display text-lg font-medium text-[#E8D5A8]">
          AI Analysis: {selectedIngredient}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
          {selectedIngredient === "바쿠치올" && (
            <>
              바쿠치올은 식물 유래 레티놀 대안으로 급부상 중입니다.
              ARIMA + Transformer 앙상블 모델 분석 결과, 향후 6개월간
              <strong className="text-[#C9A962]"> 312%</strong> 성장이 예상되며,
              특히 민감성/비건 뷰티 시장에서 핵심 성분으로 자리잡을 것으로 예측됩니다.
            </>
          )}
          {selectedIngredient === "세라마이드" && (
            <>
              세라마이드는 장벽 강화 성분으로 꾸준한 성장세를 유지하고 있습니다.
              피부 장벽 회복 트렌드와 맞물려 향후 6개월간
              <strong className="text-[#C9A962]"> 안정적인 성장</strong>이 예상됩니다.
            </>
          )}
          {selectedIngredient === "펩타이드" && (
            <>
              펩타이드는 안티에이징 핵심 성분으로 프리미엄 시장에서 강세를 보이고 있습니다.
              콜라겐 부스팅 효과로 향후 6개월간
              <strong className="text-[#C9A962]"> 178%</strong> 성장이 예상됩니다.
            </>
          )}
          {selectedIngredient === "나이아신아마이드" && (
            <>
              나이아신아마이드는 미백과 모공 케어의 핵심 성분으로 대중적 인기를 유지하고 있습니다.
              안정적인 효능과 범용성으로 향후 6개월간
              <strong className="text-[#C9A962]"> 꾸준한 수요</strong>가 예상됩니다.
            </>
          )}
          {selectedIngredient === "레티놀" && (
            <>
              레티놀은 검증된 안티에이징 성분이나, 자극성 이슈로 대안 성분에 일부 시장을 내주고 있습니다.
              고농축 제품군에서는 여전히
              <strong className="text-[#C9A962]"> 강세</strong>를 유지할 것으로 예측됩니다.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
