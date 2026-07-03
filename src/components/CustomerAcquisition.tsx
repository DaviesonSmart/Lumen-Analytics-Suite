import { motion } from "framer-motion";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { CUSTOMER_ACQUISITION } from "../lib/data";
import { formatNumber } from "../lib/utils";

export function CustomerAcquisition() {
  const maxCount = Math.max(...CUSTOMER_ACQUISITION.map((c) => c.count));
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">
            Customer Acquisition
          </h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">By acquisition channel</p>
        </div>
        <button className="h-7 w-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition">
          <MoreHorizontal size={13} />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {CUSTOMER_ACQUISITION.map((c, i) => {
          const pct = (c.count / maxCount) * 100;
          const colors = [
            "from-violet-500 to-indigo-500",
            "from-cyan-500 to-blue-500",
            "from-emerald-500 to-teal-500",
            "from-amber-500 to-orange-500",
            "from-rose-500 to-pink-500",
            "from-fuchsia-500 to-purple-500",
          ];
          return (
            <div key={c.channel}>
              <div className="flex items-center justify-between text-[11.5px] mb-1.5">
                <span className="text-white/75 font-medium">{c.channel}</span>
                <div className="flex items-center gap-2 text-white/55">
                  <span className="tabular-nums">{formatNumber(c.count)}</span>
                  <span className="text-white/30">·</span>
                  <span className="tabular-nums text-white/40">${c.cost} CAC</span>
                </div>
              </div>
              <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${colors[i]}`}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.05, duration: 0.3 }}
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${colors[i]} blur-md opacity-60`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-white/40">Blended CAC</div>
          <div className="text-[18px] font-semibold text-white mt-0.5 tabular-nums">$18.20</div>
        </div>
        <div className="text-right">
          <div className="text-[10.5px] uppercase tracking-wider text-white/40">LTV / CAC</div>
          <div className="flex items-center justify-end gap-1 text-[18px] font-semibold text-emerald-300 mt-0.5">
            4.2x
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
