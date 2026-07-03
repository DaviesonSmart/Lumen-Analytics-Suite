import { motion } from "framer-motion";
import { ACTIVITY_FEED } from "../lib/data";
import { Activity, UserPlus, CreditCard, AlertCircle, Users, LogIn } from "lucide-react";

const typeMap: Record<string, { icon: any; label: string }> = {
  user: { icon: UserPlus, label: "User" },
  payment: { icon: CreditCard, label: "Payment" },
  team: { icon: Users, label: "Team" },
  alert: { icon: AlertCircle, label: "Alert" },
  login: { icon: LogIn, label: "Login" },
};

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">Recent Activity</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">Latest events in your workspace</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10.5px] text-emerald-300 font-medium">Live</span>
        </div>
      </div>

      <div className="mt-4 -mx-2 px-2 flex-1 overflow-y-auto max-h-[420px] scrollbar-hide">
        <ul className="space-y-0.5">
          {ACTIVITY_FEED.map((item, i) => {
            const meta = typeMap[item.type];
            const Icon = meta.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.04, duration: 0.4 }}
                className="relative flex gap-3 p-2.5 rounded-lg hover:bg-white/[0.025] transition group cursor-pointer"
              >
                {/* Timeline line */}
                {i !== ACTIVITY_FEED.length - 1 && (
                  <div className="absolute left-[26px] top-[44px] bottom-[-10px] w-px bg-white/[0.05]" />
                )}

                <div className="relative shrink-0">
                  <div
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-[11px] font-semibold text-white ring-2 ring-[#0a0914]`}
                  >
                    {item.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#0a0914] flex items-center justify-center">
                    <Icon size={9} className="text-white/60" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12.5px] text-white/85 leading-snug font-medium">
                      {item.title}
                    </p>
                    <span className="text-[10.5px] text-white/35 shrink-0 tabular-nums">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-white/45 mt-0.5 truncate">{item.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <button className="mt-3 w-full py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[12px] text-white/65 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.1] transition">
        View full activity log
      </button>
    </motion.div>
  );
}
