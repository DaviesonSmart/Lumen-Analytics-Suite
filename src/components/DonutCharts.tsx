import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";
import { TRAFFIC_SOURCES, DEVICE_ANALYTICS } from "../lib/data";

export function TrafficSources() {
  const total = TRAFFIC_SOURCES.reduce((s, d) => s + d.value, 0);
  return (
    <ChartCard title="Traffic Sources" subtitle="Where your users come from">
      <div className="flex items-center gap-4">
        <div className="relative w-[120px] h-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TRAFFIC_SOURCES}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={56}
                paddingAngle={3}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {TRAFFIC_SOURCES.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[18px] font-semibold text-white tabular-nums">
              {total.toLocaleString()}K
            </div>
            <div className="text-[10px] text-white/40">visits</div>
          </div>
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          {TRAFFIC_SOURCES.map((s) => (
            <div key={s.name} className="flex items-center gap-2 text-[11.5px]">
              <span className="h-2 w-2 rounded-sm shrink-0" style={{ background: s.color }} />
              <span className="text-white/65 flex-1 truncate">{s.name}</span>
              <span className="text-white/90 font-semibold tabular-nums">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

export function DeviceAnalytics() {
  return (
    <ChartCard title="Device Analytics" subtitle="By device type">
      <div className="flex items-center gap-4">
        <div className="relative w-[120px] h-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DEVICE_ANALYTICS}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={56}
                paddingAngle={3}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {DEVICE_ANALYTICS.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[18px] font-semibold text-white tabular-nums">17.4K</div>
            <div className="text-[10px] text-white/40">devices</div>
          </div>
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          {DEVICE_ANALYTICS.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-[11.5px]">
              <span className="h-2 w-2 rounded-sm shrink-0" style={{ background: d.color }} />
              <span className="text-white/65 flex-1 truncate">{d.name}</span>
              <span className="text-white/90 font-semibold tabular-nums">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">{subtitle}</p>
        </div>
        <button className="h-7 w-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition">
          <MoreHorizontal size={13} />
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}
