import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeautyTrend AI | 글로벌 뷰티 트렌드 예측",
  description:
    "소셜 미디어 데이터를 실시간 분석하여 6~12개월 후 뷰티 트렌드를 예측하는 Multi-Agent AI 시스템 - 아모레퍼시픽 2026 AI INNOVATION CHALLENGE",
  keywords: [
    "뷰티 트렌드",
    "AI 예측",
    "아모레퍼시픽",
    "화장품",
    "K-뷰티",
    "Multi-Agent",
  ],
  authors: [{ name: "BeautyTrend AI Team" }],
  openGraph: {
    title: "BeautyTrend AI",
    description: "글로벌 뷰티 트렌드 예측 AI 에이전트",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-64 flex-1 relative z-10">
            <div className="container mx-auto px-8 py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
