import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Megaphone,
  BarChart3,
  Activity,
  ArrowRight,
  RefreshCw,
  Check,
  X,
  Brain,
} from "lucide-react";
import { AI_INSIGHTS } from "../lib/data";

const iconMap: Record<string, any> = {
  "trending-up": TrendingUp,
  "alert-triangle": AlertTriangle,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  activity: Activity,
};

const accentMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-teal-500/5",
    text: "text-emerald-300",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
  },
  amber: {
    bg: "from-amber-500/10 to-orange-500/5",
    text: "text-amber-300",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
  },
  violet: {
    bg: "from-violet-500/10 to-indigo-500/5",
    text: "text-violet-300",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
  },
  cyan: {
    bg: "from-cyan-500/10 to-blue-500/5",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/10",
  },
  rose: {
    bg: "from-rose-500/10 to-pink-500/5",
    text: "text-rose-300",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/10",
  },
};

export function AIInsights() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [accepted, setAccepted] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Brain size={16} className="text-white" strokeWidth={2.4} />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-md -z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-white tracking-tight">AI Insights</h3>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-[9.5px] font-semibold text-violet-200 uppercase tracking-wider">
                <Sparkles size={9} strokeWidth={2.5} />
                Beta
              </span>
            </div>
            <p className="text-[11.5px] text-white/40 mt-0.5">
              Powered by Lumen AI · Updated 2 min ago
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-white/55 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="relative mt-4 space-y-2.5">
        {AI_INSIGHTS.filter((i) => !dismissed.has(i.id)).map((insight, i) => {
          const Icon = iconMap[insight.icon];
          const accent = accentMap[insight.accent];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className={`relative group rounded-xl p-3.5 bg-gradient-to-br ${insight.color} border ${accent.border} hover:border-white/[0.12] transition`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/[0.08]`}
                >
                  <Icon size={14} className={accent.text} strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-[12.5px] font-semibold text-white leading-snug">
                      {insight.title}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9.5px] font-semibold ${accent.text} bg-white/[0.05] border border-white/[0.08]`}
                      >
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-white/60 mt-1 leading-relaxed">
                    {insight.description}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-semibold ${accent.text} bg-white/[0.04] border border-white/[0.08]`}
                    >
                      {insight.impact}
                    </span>
                    <button
                      onClick={() => setAccepted(new Set([...accepted, insight.id]))}
                      disabled={accepted.has(insight.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-medium transition ${
                        accepted.has(insight.id)
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-white text-[#0a0914] hover:bg-white/90 border border-transparent shadow-sm"
                      }`}
                    >
                      {accepted.has(insight.id) ? (
                        <>
                          <Check size={11} strokeWidth={3} />
                          Applied
                        </>
                      ) : (
                        <>
                          Apply insight
                          <ArrowRight size={11} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setDismissed(new Set([...dismissed, insight.id]))}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-medium text-white/55 hover:text-white hover:bg-white/[0.05] transition"
                    >
                      <X size={11} />
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
