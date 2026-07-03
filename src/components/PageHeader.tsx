import { motion } from "framer-motion";
import { Share2, Download, RefreshCw, Plus, Calendar, Filter } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  onSettingsClick,
}: {
  title: string;
  subtitle: string;
  onSettingsClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <div className="flex items-center gap-2 text-[11.5px] text-white/45">
          <span>Workspace</span>
          <span className="text-white/25">/</span>
          <span>Acme Corp</span>
          <span className="text-white/25">/</span>
          <span className="text-white/75">Dashboard</span>
        </div>
        <h1 className="mt-1.5 text-[28px] font-semibold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-[13px] text-white/50 mt-1 max-w-xl">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden md:flex h-9 items-center gap-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12px] text-white/75 hover:bg-white/[0.05] hover:border-white/[0.12] transition">
          <Calendar size={12} />
          Last 30 days
        </button>
        <button className="hidden md:flex h-9 items-center gap-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12px] text-white/75 hover:bg-white/[0.05] hover:border-white/[0.12] transition">
          <Filter size={12} />
          Filter
        </button>
        <button className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-white/65 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition">
          <RefreshCw size={13} />
        </button>
        <button className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-white/65 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition">
          <Share2 size={13} />
        </button>
        <button className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-white/65 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition">
          <Download size={13} />
        </button>
        <button
          onClick={onSettingsClick}
          className="h-9 px-3 rounded-lg flex items-center gap-1.5 text-[12px] font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-lg shadow-violet-500/25 transition"
        >
          <Plus size={13} strokeWidth={2.5} />
          New report
        </button>
      </div>
    </motion.div>
  );
}
