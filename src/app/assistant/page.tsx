"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sampleResponses: Record<string, string> = {
  default: `안녕하세요! BeautyTrend AI 어시스턴트입니다. 뷰티 트렌드, 성분 분석, 경쟁사 동향 등에 대해 질문해 주세요.

주요 기능:
• 실시간 트렌드 분석
• 성분별 시장 전망
• 경쟁사 제품 모니터링
• 신제품 시뮬레이션`,

  바쿠치올: `**바쿠치올 트렌드 분석 결과**

바쿠치올은 현재 가장 주목받는 성분 중 하나입니다.

📊 **핵심 지표**
• 성장률: +312% (3개월 기준)
• 감성 점수: 0.91 (매우 긍정적)
• 주요 시장: 미국, 유럽

💡 **인사이트**
레티놀의 자극성을 우려하는 소비자들이 자연 유래 대안으로 바쿠치올을 선택하고 있습니다. 특히 민감성 피부와 비건 뷰티 시장에서 강한 성장세를 보이고 있으며, 2026년 상반기 핵심 안티에이징 성분으로 자리잡을 것으로 예측됩니다.

🎯 **추천 전략**
세라마이드와의 조합으로 민감성 피부 타겟 제품 라인 개발을 권장합니다.`,

  세라마이드: `**세라마이드 트렌드 분석 결과**

세라마이드는 꾸준한 인기를 유지하는 보습/장벽 강화 성분입니다.

📊 **핵심 지표**
• 성장률: +156% (연간)
• 감성 점수: 0.86
• 주요 시장: 한국, 일본, 중국

💡 **인사이트**
마스크 착용 후 피부 장벽 손상 이슈로 세라마이드에 대한 관심이 지속되고 있습니다. "스킨 배리어" 키워드와 함께 언급되는 비율이 78%로, 피부 장벽 케어 트렌드의 핵심 성분으로 자리잡았습니다.

🎯 **추천 전략**
히알루론산, 판테놀과의 조합으로 "장벽 복구" 컨셉의 제품 개발을 권장합니다.`,

  컬러: `**2026 컬러 트렌드 분석**

📊 **S/S 2026 주요 컬러**
• Nude Beige (+61%) - 자연스러운 글로우
• Dusty Rose (+55%) - 소프트 페미닌
• Mauve (+52%) - 세련된 무드
• Coral (+47%) - 생기 있는 룩

📊 **F/W 2026 주요 컬러**
• Terracotta (+38%) - 웜 어스 톤
• Berry (+33%) - 깊은 보랏빛
• Brick Red (+28%) - 클래식 레드

💡 **인사이트**
"No Makeup Makeup" 트렌드의 영향으로 피부와 자연스럽게 어우러지는 뉴트럴 톤이 강세입니다. 립스틱 시장에서는 MLBB(My Lips But Better) 컨셉이 지속적으로 인기를 끌 것으로 예상됩니다.`,

  경쟁사: `**경쟁사 동향 분석**

📅 **2026 Q1 주요 출시 예정 제품**

1. **시세이도** - Ultimune Power Infusing 5.0
   • 출시: 2026-01
   • 핵심 성분: ImuGeneration RED
   • 카테고리: 세럼

2. **에스티로더** - Advanced Night Repair 3.0
   • 출시: 2026-02
   • 핵심 성분: 크로노럭신 NEO
   • 카테고리: 세럼

3. **랑콤** - Absolue Rich Cream 2026
   • 출시: 2026-02
   • 핵심 성분: 그랑로즈 엑스트랙트
   • 카테고리: 크림

💡 **인사이트**
글로벌 프리미엄 브랜드들이 자사 독자 성분 개발에 집중하고 있습니다. 차별화된 시그니처 성분 확보가 핵심 경쟁 요소가 될 것으로 보입니다.`,
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("바쿠치올")) return sampleResponses["바쿠치올"];
  if (lowerMessage.includes("세라마이드")) return sampleResponses["세라마이드"];
  if (lowerMessage.includes("컬러") || lowerMessage.includes("색상")) return sampleResponses["컬러"];
  if (lowerMessage.includes("경쟁") || lowerMessage.includes("시세이도") || lowerMessage.includes("에스티로더"))
    return sampleResponses["경쟁사"];

  return sampleResponses.default;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: sampleResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const quickPrompts = [
    "바쿠치올 트렌드 분석해줘",
    "2026 컬러 트렌드 알려줘",
    "경쟁사 신제품 동향은?",
    "세라마이드 시장 전망",
  ];

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-display text-4xl font-light tracking-wide text-gold-gradient">
          AI Assistant
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[rgba(245,240,235,0.6)] uppercase">
          BeautyTrend AI Conversational Interface
        </p>
      </div>

      {/* Quick Prompts */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInput(prompt)}
            className="rounded-full border border-[rgba(201,169,98,0.2)] px-4 py-2 text-sm text-[rgba(245,240,235,0.7)] transition-all hover:border-[#C9A962] hover:text-[#E8D5A8]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-card flex flex-1 flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#D4A5A5] to-[#E8D5D3]"
                      : "bg-gradient-to-br from-[#C9A962] to-[#E8D5A8]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-5 w-5 text-[#1A1A1A]" />
                  ) : (
                    <Bot className="h-5 w-5 text-[#1A1A1A]" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[rgba(212,165,165,0.2)] to-[rgba(232,213,211,0.1)] text-[#F5F0EB]"
                      : "border border-[rgba(201,169,98,0.15)] bg-[rgba(255,255,255,0.03)] text-[rgba(245,240,235,0.9)]"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <p className="mt-2 text-xs text-[rgba(245,240,235,0.4)]">
                    {message.timestamp.toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8D5A8]">
                  <Bot className="h-5 w-5 text-[#1A1A1A]" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-[rgba(201,169,98,0.15)] bg-[rgba(255,255,255,0.03)] px-5 py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-[#C9A962]" />
                  <span className="text-sm text-[rgba(245,240,235,0.6)]">분석 중...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="border-t border-[rgba(201,169,98,0.15)] p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="뷰티 트렌드에 대해 질문해 주세요..."
              className="flex-1 rounded-xl border border-[rgba(201,169,98,0.2)] bg-[rgba(255,255,255,0.03)] px-5 py-3 text-[#F5F0EB] placeholder-[rgba(245,240,235,0.4)] focus:border-[#C9A962] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E8D5A8] px-6 py-3 font-medium text-[#1A1A1A] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* AI Info Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[rgba(245,240,235,0.4)]">
        <Sparkles className="h-3 w-3" />
        <span>Powered by BeautyTrend AI Multi-Agent System</span>
      </div>
    </div>
  );
}
