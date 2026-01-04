"use client";

import { tiktokData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { TrendingUp, Hash, FlaskConical, Heart } from "lucide-react";

const hashtagChartData = tiktokData.hashtagTrends.map((item) => ({
  name: item.tag.replace("#", ""),
  count: item.count,
  growth: item.growth,
}));

const ingredientChartData = tiktokData.ingredientMentions.map((item) => ({
  name: item.name,
  x: item.count,
  y: item.sentimentAvg * 100,
  z: item.count / 1000,
}));

const metrics = [
  {
    label: "분석 게시물",
    value: "2.4M",
    change: "+12.5%",
    icon: Hash,
    description: "지난 30일간",
  },
  {
    label: "급상승 키워드",
    value: "156",
    change: "+28",
    icon: TrendingUp,
    description: "전월 대비",
  },
  {
    label: "주목 성분",
    value: "바쿠치올",
    change: "+312%",
    icon: FlaskConical,
    description: "성장률 1위",
  },
  {
    label: "평균 감성 점수",
    value: "0.84",
    change: "+0.05",
    icon: Heart,
    description: "긍정 비율",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          BeautyTrend AI
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          Real-time Beauty Trend Intelligence Dashboard
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="metric-card animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium tracking-wider text-[rgba(245,240,235,0.5)] uppercase">
                  {metric.label}
                </p>
                <p className="font-display mt-2 text-3xl font-light text-[#E8D5A8]">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-[rgba(201,169,98,0.8)]">
                  {metric.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <metric.icon className="h-5 w-5 text-[#C9A962]" />
                <span className="mt-2 text-sm font-medium text-emerald-400">
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Hashtag Trends Chart */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="font-display mb-6 text-xl font-light tracking-wide text-[#E8D5A8]">
            Trending Hashtags
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hashtagChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,98,0.1)" />
              <XAxis type="number" stroke="rgba(245,240,235,0.5)" fontSize={11} />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                stroke="rgba(245,240,235,0.5)"
                fontSize={11}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2D2D2D",
                  border: "1px solid rgba(201,169,98,0.3)",
                  borderRadius: "12px",
                  color: "#E8D5A8",
                }}
              />
              <Bar dataKey="count" fill="url(#goldGradient)" radius={[0, 4, 4, 0]} />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C9A962" />
                  <stop offset="100%" stopColor="#E8D5A8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ingredient Sentiment Chart */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="font-display mb-6 text-xl font-light tracking-wide text-[#E8D5A8]">
            Ingredient Sentiment Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,98,0.1)" />
              <XAxis
                dataKey="x"
                name="언급수"
                stroke="rgba(245,240,235,0.5)"
                fontSize={11}
                label={{ value: "언급 수", position: "bottom", fill: "rgba(245,240,235,0.5)" }}
              />
              <YAxis
                dataKey="y"
                name="감성점수"
                stroke="rgba(245,240,235,0.5)"
                fontSize={11}
                label={{
                  value: "감성 점수 (%)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "rgba(245,240,235,0.5)",
                }}
              />
              <ZAxis dataKey="z" range={[100, 500]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2D2D2D",
                  border: "1px solid rgba(201,169,98,0.3)",
                  borderRadius: "12px",
                  color: "#E8D5A8",
                }}
                formatter={(value, name) => {
                  if (typeof value !== "number") return [String(value), String(name)];
                  if (name === "x") return [value.toLocaleString(), "언급수"];
                  if (name === "y") return [`${value.toFixed(1)}%`, "감성점수"];
                  return [value, String(name)];
                }}
              />
              <Scatter name="성분" data={ingredientChartData} fill="#D4A5A5" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Section */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        <h2 className="section-header">AI Insights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="insight-box">
            <h3 className="font-display text-lg font-medium text-[#E8D5A8]">
              Emerging Trend Alert
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
              <strong className="text-[#C9A962]">바쿠치올</strong>이 레티놀 대안으로 급부상 중입니다.
              지난 3개월간 312% 성장률을 기록했으며, 특히 민감성 피부 타겟 제품에서
              주목받고 있습니다. 2026년 상반기 핵심 성분으로 예측됩니다.
            </p>
          </div>
          <div className="insight-box">
            <h3 className="font-display text-lg font-medium text-[#E8D5A8]">
              Color Trend Forecast
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(245,240,235,0.8)]">
              <strong className="text-[#C9A962]">Nude Beige</strong>와
              <strong className="text-[#C9A962]"> Dusty Rose</strong> 컬러가
              2026년 시즌을 주도할 것으로 예측됩니다. 자연스러운 글로우와
              미니멀리즘 트렌드의 영향입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-[rgba(201,169,98,0.15)] pt-6 text-center">
        <p className="text-xs tracking-widest text-[rgba(201,169,98,0.5)] uppercase">
          Amorepacific 2026 AI Innovation Challenge
        </p>
        <p className="font-display mt-1 text-sm text-[rgba(245,240,235,0.6)]">
          BeautyTrend AI Multi-Agent System
        </p>
      </div>
    </div>
  );
}
