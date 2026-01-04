// BeautyTrend AI - Mock Data

export const tiktokData = {
  hashtagTrends: [
    { tag: "#글래스스킨", count: 158000, growth: 245, region: "Global" },
    { tag: "#스킨미니멀리즘", count: 92000, growth: 189, region: "Korea" },
    { tag: "#세라마이드", count: 87000, growth: 156, region: "Asia" },
    { tag: "#바쿠치올", count: 65000, growth: 312, region: "US" },
    { tag: "#펩타이드", count: 54000, growth: 178, region: "Europe" },
    { tag: "#슬로우에이징", count: 48000, growth: 267, region: "Global" },
    { tag: "#비건뷰티", count: 42000, growth: 134, region: "Europe" },
    { tag: "#클린뷰티", count: 38000, growth: 98, region: "US" },
  ],
  ingredientMentions: [
    { name: "세라마이드", count: 45000, sentimentAvg: 0.86, category: "보습" },
    { name: "나이아신아마이드", count: 62000, sentimentAvg: 0.82, category: "미백" },
    { name: "펩타이드", count: 38000, sentimentAvg: 0.88, category: "안티에이징" },
    { name: "바쿠치올", count: 28000, sentimentAvg: 0.91, category: "안티에이징" },
    { name: "레티놀", count: 51000, sentimentAvg: 0.71, category: "안티에이징" },
    { name: "히알루론산", count: 72000, sentimentAvg: 0.85, category: "보습" },
    { name: "비타민C", count: 68000, sentimentAvg: 0.79, category: "미백" },
    { name: "스쿠알란", count: 31000, sentimentAvg: 0.87, category: "보습" },
  ],
};

export const historicalData: Record<string, { month: string; mentions: number }[]> = {
  세라마이드: Array.from({ length: 12 }, (_, i) => ({
    month: `2025-${String(i + 1).padStart(2, "0")}`,
    mentions: Math.floor(12000 + (i + 1) * 3000 + Math.random() * 2000 - 1000),
  })),
  바쿠치올: Array.from({ length: 12 }, (_, i) => ({
    month: `2025-${String(i + 1).padStart(2, "0")}`,
    mentions: Math.floor(2000 + (i + 1) * 2500 + Math.random() * 1000 - 500),
  })),
  펩타이드: Array.from({ length: 12 }, (_, i) => ({
    month: `2025-${String(i + 1).padStart(2, "0")}`,
    mentions: Math.floor(8000 + (i + 1) * 2500 + Math.random() * 1600 - 800),
  })),
  나이아신아마이드: Array.from({ length: 12 }, (_, i) => ({
    month: `2025-${String(i + 1).padStart(2, "0")}`,
    mentions: Math.floor(15000 + (i + 1) * 2000 + Math.random() * 2000 - 1000),
  })),
  레티놀: Array.from({ length: 12 }, (_, i) => ({
    month: `2025-${String(i + 1).padStart(2, "0")}`,
    mentions: Math.floor(20000 + (i + 1) * 1500 + Math.random() * 2400 - 1200),
  })),
};

export const colorTrends = [
  { color: "Soft Pink", hex: "#FFB6C1", growth: 45, season: "S/S 2026" },
  { color: "Terracotta", hex: "#E2725B", growth: 38, season: "F/W 2026" },
  { color: "Mauve", hex: "#E0B0FF", growth: 52, season: "S/S 2026" },
  { color: "Brick Red", hex: "#CB4154", growth: 28, season: "F/W 2026" },
  { color: "Nude Beige", hex: "#F5DEB3", growth: 61, season: "All Season" },
  { color: "Berry", hex: "#8E4585", growth: 33, season: "F/W 2026" },
  { color: "Coral", hex: "#FF7F50", growth: 47, season: "S/S 2026" },
  { color: "Dusty Rose", hex: "#DCAE96", growth: 55, season: "All Season" },
];

export const competitorData = [
  {
    brand: "에스티로더",
    product: "Advanced Night Repair 3.0",
    launch: "2026-02",
    category: "세럼",
    keyIngredient: "크로노럭신 NEO",
  },
  {
    brand: "로레알",
    product: "Revitalift Laser X5",
    launch: "2026-03",
    category: "크림",
    keyIngredient: "프로-레티놀",
  },
  {
    brand: "시세이도",
    product: "Ultimune Power Infusing 5.0",
    launch: "2026-01",
    category: "세럼",
    keyIngredient: "ImuGeneration RED",
  },
  {
    brand: "SK-II",
    product: "GenOptics Aura Essence 2026",
    launch: "2026-04",
    category: "에센스",
    keyIngredient: "피테라 크리스탈",
  },
  {
    brand: "랑콤",
    product: "Absolue Rich Cream 2026",
    launch: "2026-02",
    category: "크림",
    keyIngredient: "그랑로즈 엑스트랙트",
  },
];

export const agents = [
  { name: "Orchestrator", status: "active", icon: "◈" },
  { name: "Data Fetch", status: "active", icon: "◇" },
  { name: "Trend Model", status: "active", icon: "◇" },
  { name: "Color Analysis", status: "active", icon: "◇" },
  { name: "Competitor", status: "active", icon: "◇" },
];

export const dataSources = [
  { name: "TikTok API", icon: "◆" },
  { name: "Instagram Graph API", icon: "◆" },
  { name: "YouTube Data API", icon: "◆" },
  { name: "Beauty Communities", icon: "◆" },
];

// Forecast function
export function advancedForecast(data: { mentions: number }[], periods: number = 6) {
  const values = data.map((d) => d.mentions);
  const n = values.length;

  // Simple polynomial regression (degree 2)
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * values[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Generate predictions
  const predictions: number[] = [];
  const lower: number[] = [];
  const upper: number[] = [];

  const stdError = Math.sqrt(
    values.reduce((acc, yi, i) => {
      const predicted = intercept + slope * i;
      return acc + Math.pow(yi - predicted, 2);
    }, 0) / n
  );

  for (let i = 0; i < periods; i++) {
    const futureX = n + i;
    const pred = intercept + slope * futureX;
    const seasonal = stdError * 0.3 * Math.sin((2 * Math.PI * futureX) / 12);
    predictions.push(Math.max(0, pred + seasonal));
    lower.push(Math.max(0, pred + seasonal - 1.96 * stdError));
    upper.push(pred + seasonal + 1.96 * stdError);
  }

  return { predictions, lower, upper };
}

// Generate future dates
export function generateFutureDates(lastDate: string, periods: number): string[] {
  const dates: string[] = [];
  const [year, month] = lastDate.split("-").map(Number);

  for (let i = 1; i <= periods; i++) {
    const newMonth = ((month - 1 + i) % 12) + 1;
    const newYear = year + Math.floor((month - 1 + i) / 12);
    dates.push(`${newYear}-${String(newMonth).padStart(2, "0")}`);
  }

  return dates;
}
