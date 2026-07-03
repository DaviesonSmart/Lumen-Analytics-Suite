import { motion } from "framer-motion";
import { useState } from "react";
import { INTEGRATIONS } from "../lib/data";
import { Plus, Check, Settings, ChevronRight } from "lucide-react";

export function Integrations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-white tracking-tight">Integrations</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">
            <span className="text-emerald-300 font-medium">6 connected</span> · 8 available
          </p>
        </div>
        <button className="h-8 px-3 rounded-lg flex items-center gap-1.5 text-[11.5px] font-medium text-white/75 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition">
          <Plus size={12} strokeWidth={2.5} />
          Add integration
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {INTEGRATIONS.map((int, i) => (
          <IntegrationCard key={int.name} integration={int} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function IntegrationCard({
  integration,
  index,
}: {
  integration: (typeof INTEGRATIONS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.75 + index * 0.04, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl p-3.5 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition cursor-pointer overflow-hidden"
    >
      {/* Glow on hover */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 bg-gradient-to-br ${integration.color}`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-[18px] shadow-lg`}
        >
          {integration.icon}
        </div>
        {integration.connected ? (
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[9.5px] font-semibold">
            <Check size={9} strokeWidth={3} />
            Connected
          </span>
        ) : (
          <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/55 text-[9.5px] font-medium">
            Available
          </span>
        )}
      </div>

      <div className="relative mt-3">
        <div className="text-[13px] font-semibold text-white">{integration.name}</div>
        <div className="text-[11px] text-white/45 mt-0.5">{integration.description}</div>
      </div>

      <div className="relative mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <div className="text-[10.5px] text-white/40">
          {integration.connected ? (
            <>
              <span className="text-white/65 font-medium">{integration.users}</span> users
            </>
          ) : (
            "Free to install"
          )}
        </div>
        <button
          className={`h-6 w-6 rounded-md flex items-center justify-center transition ${
            hovered
              ? "bg-white/[0.08] text-white"
              : "text-white/40"
          }`}
        >
          {integration.connected ? <Settings size={11} /> : <ChevronRight size={12} />}
        </button>
      </div>
    </motion.div>
  );
}
