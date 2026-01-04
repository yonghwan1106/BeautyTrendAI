"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#E8D5A8]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

const WELCOME_MESSAGE = `안녕하세요! **BeautyTrend AI** 어시스턴트입니다.

뷰티 트렌드, 성분 분석, 경쟁사 동향 등에 대해 질문해 주세요.

**주요 기능:**
• 실시간 트렌드 분석
• 성분별 시장 전망
• 경쟁사 제품 모니터링
• 신제품 시뮬레이션`;

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
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

    try {
      // Prepare conversation history for API
      const conversationHistory = [
        ...messages
          .filter((m) => m.id !== "welcome")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        { role: "user", content: userMessage.content },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
          Powered by Claude Sonnet 4.5
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
                    {renderMarkdown(message.content)}
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
                  <span className="text-sm text-[rgba(245,240,235,0.6)]">
                    Claude가 분석 중...
                  </span>
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
        <span>Powered by Claude Sonnet 4.5 | BeautyTrend AI Multi-Agent System</span>
      </div>
    </div>
  );
}
