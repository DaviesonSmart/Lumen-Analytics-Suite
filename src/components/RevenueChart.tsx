import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts";
import { Download, MoreHorizontal, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { REVENUE_DATA } from "../lib/data";
import { formatCurrency } from "../lib/utils";

type Range = "daily" | "weekly" | "monthly" | "yearly";
const RANGES: { id: Range; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export function RevenueChart() {
  const [range, setRange] = useState<Range>("monthly");
  const data = REVENUE_DATA[range];

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = data.reduce((sum, d) => sum + d.expenses, 0);
  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 lg:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-white tracking-tight">Revenue Overview</h3>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10.5px] font-medium">
              <TrendingUp size={10} strokeWidth={3} />
              +18.4%
            </span>
          </div>
          <p className="text-[12px] text-white/40 mt-1">Revenue, expenses, and profit over time</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Range selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            {RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`relative px-2.5 py-1 text-[11.5px] font-medium rounded-md transition ${
                  range === r.id ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {range === r.id && (
                  <motion.div
                    layoutId="range-pill"
                    className="absolute inset-0 rounded-md bg-gradient-to-b from-white/[0.1] to-white/[0.04] border border-white/[0.08] shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </div>

          <button className="h-7 w-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition">
            <Calendar size={13} />
          </button>
          <button className="h-7 w-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition">
            <Download size={13} />
          </button>
          <button className="h-7 w-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat label="Total Revenue" value={formatCurrency(totalRevenue)} accent="violet" />
        <Stat label="Total Expenses" value={formatCurrency(totalExpenses)} accent="rose" />
        <Stat
          label="Net Profit"
          value={formatCurrency(totalProfit)}
          sub={`${profitMargin.toFixed(1)}% margin`}
          accent="emerald"
        />
      </div>

      {/* Chart */}
      <div className="mt-5 h-[280px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="rev-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="60%" stopColor="#8b5cf6" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="exp-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
            />
            <YAxis
              tickFormatter={(v) => formatCurrency(v, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={60}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
            />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
              content={<RevenueTooltip />}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={1.6}
              strokeOpacity={0.6}
              fill="url(#exp-area)"
              dot={false}
              activeDot={{ r: 4, fill: "#f43f5e", stroke: "#0a0914", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2.2}
              fill="url(#rev-area)"
              dot={false}
              activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#0a0914", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4, fill: "#10b981", stroke: "#0a0914", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-5 text-[11.5px]">
        <LegendDot color="#8b5cf6" label="Revenue" />
        <LegendDot color="#f43f5e" label="Expenses" />
        <LegendDot color="#10b981" label="Profit" dashed />
        <div className="ml-auto flex items-center gap-1.5 text-white/35">
          <Sparkles size={11} />
          <span>Forecasted next period</span>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: "violet" | "rose" | "emerald";
}) {
  const accentMap = {
    violet: "from-violet-500/12 to-indigo-500/6 border-violet-500/20",
    rose: "from-rose-500/12 to-pink-500/6 border-rose-500/20",
    emerald: "from-emerald-500/12 to-teal-500/6 border-emerald-500/20",
  };
  const textMap = {
    violet: "text-violet-300",
    rose: "text-rose-300",
    emerald: "text-emerald-300",
  };
  return (
    <div className={`relative rounded-xl p-3 border bg-gradient-to-br ${accentMap[accent]} overflow-hidden`}>
      <div className="text-[10.5px] uppercase tracking-wider text-white/40 font-medium">{label}</div>
      <div className={`text-[20px] font-semibold mt-1 tracking-tight tabular-nums ${textMap[accent]}`}>
        {value}
      </div>
      {sub && <div className="text-[10.5px] text-white/40 mt-0.5">{sub}</div>}
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-white/65">
      {dashed ? (
        <svg width="14" height="2" className="overflow-visible">
          <line x1="0" y1="1" x2="14" y2="1" stroke={color} strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      ) : (
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      )}
      {label}
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const map: Record<string, { color: string; label: string }> = {
    revenue: { color: "#8b5cf6", label: "Revenue" },
    expenses: { color: "#f43f5e", label: "Expenses" },
    profit: { color: "#10b981", label: "Profit" },
  };
  return (
    <div className="rounded-xl bg-[#0f0d19]/95 border border-white/[0.08] backdrop-blur-xl shadow-2xl px-3.5 py-2.5 min-w-[160px]">
      <div className="text-[10.5px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <div className="space-y-1.5">
        {payload.map((p: any) => {
          const meta = map[p.dataKey];
          return (
            <div key={p.dataKey} className="flex items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: meta?.color || p.color }}
                />
                <span className="text-white/70">{meta?.label || p.dataKey}</span>
              </div>
              <span className="font-semibold text-white tabular-nums">{formatCurrency(p.value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
