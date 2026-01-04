import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `당신은 BeautyTrend AI 어시스턴트입니다. 아모레퍼시픽의 뷰티 트렌드 예측 AI 시스템의 일부로, 다음과 같은 전문 지식을 가지고 있습니다:

## 역할
- 글로벌 뷰티 트렌드 분석 및 예측
- 화장품 성분 트렌드 분석
- 경쟁사 동향 모니터링
- 컬러 트렌드 예측
- 신제품 개발 전략 제안

## 현재 트렌드 데이터 (2025-2026)

### 급상승 성분
1. 바쿠치올: +312% 성장, 레티놀 대안, 민감성 피부 적합
2. 세라마이드: +156% 성장, 피부 장벽 강화
3. 펩타이드: +178% 성장, 안티에이징 핵심 성분
4. 나이아신아마이드: 꾸준한 인기, 미백/모공 케어

### 2026 컬러 트렌드
- S/S: Nude Beige (+61%), Dusty Rose (+55%), Mauve (+52%), Coral (+47%)
- F/W: Terracotta (+38%), Berry (+33%), Brick Red (+28%)

### 경쟁사 신제품 (2026 Q1)
- 시세이도: Ultimune 5.0 (ImuGeneration RED)
- 에스티로더: ANR 3.0 (크로노럭신 NEO)
- 랑콤: Absolue Rich Cream (그랑로즈 엑스트랙트)
- SK-II: GenOptics Aura Essence (피테라 크리스탈)

## 응답 스타일
- 데이터 기반의 인사이트 제공
- 구체적인 수치와 트렌드 분석 포함
- 실행 가능한 전략 제안
- 한국어로 응답
- 마크다운 형식 사용 (볼드, 이모지 활용)`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
