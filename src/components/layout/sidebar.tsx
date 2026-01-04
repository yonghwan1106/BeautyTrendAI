"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Palette,
  Building2,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { agents, dataSources } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "트렌드 예측", href: "/trends", icon: TrendingUp },
  { name: "컬러 트렌드", href: "/colors", icon: Palette },
  { name: "경쟁사 분석", href: "/competitors", icon: Building2 },
  { name: "시뮬레이션", href: "/simulation", icon: Sparkles },
  { name: "AI 어시스턴트", href: "/assistant", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[rgba(201,169,98,0.1)] bg-gradient-to-b from-[#1A1A1A] to-[#232323]">
      <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-light tracking-[0.08em] text-gold-gradient">
            BEAUTYTREND
          </h1>
          <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-[rgba(201,169,98,0.7)] uppercase">
            AI Intelligence
          </p>
        </div>

        <Separator className="mb-6 bg-[rgba(201,169,98,0.1)]" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-[rgba(201,169,98,0.2)] to-[rgba(201,169,98,0.1)] text-[#E8D5A8] border border-[rgba(201,169,98,0.3)]"
                    : "text-[rgba(245,240,235,0.6)] hover:bg-[rgba(201,169,98,0.08)] hover:text-[#F5F0EB]"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-6 bg-[rgba(201,169,98,0.1)]" />

        {/* Multi-Agent System */}
        <div className="mb-6">
          <h3 className="font-display mb-3 text-sm tracking-[0.05em] text-[#E8D5A8]">
            Multi-Agent System
          </h3>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => (
              <span key={agent.name} className="agent-badge text-xs">
                {agent.icon} {agent.name}
              </span>
            ))}
          </div>
        </div>

        <Separator className="mb-6 bg-[rgba(201,169,98,0.1)]" />

        {/* Data Sources */}
        <div className="mb-6">
          <h3 className="font-display mb-3 text-sm tracking-[0.05em] text-[#E8D5A8]">
            Data Sources
          </h3>
          <div className="space-y-2 text-sm text-[rgba(245,240,235,0.6)]">
            {dataSources.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <span className="text-[#C9A962]">{source.icon}</span>
                {source.name}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto rounded-2xl border border-[rgba(201,169,98,0.15)] bg-gradient-to-br from-[rgba(201,169,98,0.1)] to-[rgba(201,169,98,0.05)] p-4 text-center">
          <p className="text-[0.65rem] tracking-[0.2em] text-[rgba(201,169,98,0.8)] uppercase">
            Amorepacific
          </p>
          <p className="font-display mt-1 text-sm tracking-[0.08em] text-[#E8D5A8]">
            AI INNOVATION
          </p>
          <p className="text-[0.75rem] tracking-[0.15em] text-[rgba(201,169,98,0.6)]">
            CHALLENGE 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
