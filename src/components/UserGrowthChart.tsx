import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { USER_GROWTH } from "../lib/data";
import { formatNumber } from "../lib/utils";

export function UserGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">User Growth</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">Active, new, and churned users</p>
        </div>
        <div className="flex items-center gap-3 text-[10.5px]">
          <LegendItem color="#8b5cf6" label="Active" />
          <LegendItem color="#10b981" label="New" />
          <LegendItem color="#f43f5e" label="Churn" />
        </div>
      </div>

      <div className="mt-4 h-[200px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={USER_GROWTH} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ug-active" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ug-new" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10.5, fill: "rgba(255,255,255,0.45)" }}
            />
            <YAxis
              tickFormatter={(v) => formatNumber(v, { compact: true })}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
              tick={{ fontSize: 10.5, fill: "rgba(255,255,255,0.45)" }}
            />
            <Tooltip
              content={({ active, payload, label }: any) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-lg bg-[#0f0d19]/95 border border-white/[0.08] backdrop-blur-xl px-3 py-2 text-[11.5px] min-w-[140px]">
                    <div className="text-white/60 text-[10.5px] mb-1">{String(label)}</div>
                    {payload.map((p: any) => (
                      <div key={String(p.dataKey)} className="flex items-center justify-between gap-3">
                        <span style={{ color: p.color }} className="capitalize">
                          {String(p.dataKey)}
                        </span>
                        <span className="text-white font-semibold tabular-nums">
                          {formatNumber(p.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="active"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#ug-active)"
            />
            <Area
              type="monotone"
              dataKey="new"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#ug-new)"
            />
            <Area
              type="monotone"
              dataKey="churn"
              stroke="#f43f5e"
              strokeWidth={1.5}
              fill="transparent"
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-white/65">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
