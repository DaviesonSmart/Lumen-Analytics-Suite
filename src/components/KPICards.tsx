import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from "lucide-react";
import { SPARKLINE_DATA } from "../lib/data";
import { formatNumber, formatPercent } from "../lib/utils";

type KPI = {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  data: number[];
  gradient: { from: string; to: string; glow: string };
  prefix?: string;
  suffix?: string;
  format: (n: number) => string;
};

const KPIS: KPI[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$1.24M",
    rawValue: 1240000,
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    data: SPARKLINE_DATA.revenue,
    gradient: { from: "#8b5cf6", to: "#6366f1", glow: "rgba(139, 92, 246, 0.4)" },
    prefix: "$",
    format: (n) => formatNumber(n, { compact: true }),
  },
  {
    id: "users",
    label: "Active Users",
    value: "24.8K",
    rawValue: 24800,
    change: 8.2,
    changeLabel: "vs last month",
    icon: Users,
    data: SPARKLINE_DATA.users,
    gradient: { from: "#06b6d4", to: "#3b82f6", glow: "rgba(6, 182, 212, 0.4)" },
    format: (n) => formatNumber(n, { compact: true }),
  },
  {
    id: "growth",
    label: "Monthly Growth",
    value: "10.8%",
    rawValue: 10.8,
    change: 2.1,
    changeLabel: "vs last month",
    icon: TrendingUp,
    data: SPARKLINE_DATA.growth,
    gradient: { from: "#10b981", to: "#14b8a6", glow: "rgba(16, 185, 129, 0.4)" },
    format: (n) => formatPercent(n, 1),
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "4.12%",
    rawValue: 4.12,
    change: -0.3,
    changeLabel: "vs last month",
    icon: Target,
    data: SPARKLINE_DATA.conversion,
    gradient: { from: "#f59e0b", to: "#ef4444", glow: "rgba(245, 158, 11, 0.35)" },
    format: (n) => formatPercent(n, 2),
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPIS.map((kpi, i) => (
        <KPICard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}

function KPICard({ kpi, index }: { kpi: KPI; index: number }) {
  const Icon = kpi.icon;
  const positive = kpi.change >= 0;
  const chartData = kpi.data.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative glass rounded-2xl p-5 overflow-hidden cursor-pointer"
    >
      {/* Glow on hover */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: kpi.gradient.glow }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="relative h-9 w-9 rounded-xl flex items-center justify-center border"
            style={{
              background: `linear-gradient(135deg, ${kpi.gradient.from}22, ${kpi.gradient.to}22)`,
              borderColor: `${kpi.gradient.from}33`,
            }}
          >
            <Icon size={16} style={{ color: kpi.gradient.from }} strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-white/45 uppercase tracking-wider">
              {kpi.label}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${
            positive
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
          }`}
        >
          {positive ? <ArrowUpRight size={11} strokeWidth={2.8} /> : <ArrowDownRight size={11} strokeWidth={2.8} />}
          <span>{Math.abs(kpi.change).toFixed(1)}%</span>
        </div>
      </div>

      {/* Value */}
      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div>
          <div className="text-[32px] leading-none font-semibold text-white tracking-tight tabular-nums">
            {kpi.value}
          </div>
          <div className="text-[11.5px] text-white/40 mt-1.5">{kpi.changeLabel}</div>
        </div>

        {/* Sparkline */}
        <div className="h-12 w-24 -mb-1 -mr-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={kpi.gradient.from} stopOpacity={0.55} />
                  <stop offset="100%" stopColor={kpi.gradient.to} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={kpi.gradient.from}
                strokeWidth={2}
                fill={`url(#spark-${kpi.id})`}
                isAnimationActive={true}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
