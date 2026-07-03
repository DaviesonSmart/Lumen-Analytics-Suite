import { motion } from "framer-motion";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { SALES_PERFORMANCE } from "../lib/data";

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">Sales Performance</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">Deals closed this week</p>
        </div>
        <div className="text-right">
          <div className="text-[20px] font-semibold text-white tabular-nums">$284K</div>
          <div className="text-[10.5px] text-emerald-300 font-medium">+24% vs last week</div>
        </div>
      </div>

      <div className="mt-4 h-[180px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SALES_PERFORMANCE} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="sales-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="sales-bar-hover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10.5, fill: "rgba(255,255,255,0.45)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={32}
              tick={{ fontSize: 10.5, fill: "rgba(255,255,255,0.45)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(139, 92, 246, 0.08)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-lg bg-[#0f0d19]/95 border border-white/[0.08] backdrop-blur-xl px-3 py-2 text-[12px]">
                    <div className="text-white/60 text-[10.5px] mb-0.5">{payload[0].payload.name}</div>
                    <div className="text-white font-semibold">{payload[0].value} deals</div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="value"
              fill="url(#sales-bar)"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
