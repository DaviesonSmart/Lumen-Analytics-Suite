import { motion } from "framer-motion";
import { TEAM_MEMBERS, TASKS, MEETINGS } from "../lib/data";
import { Video, MessageCircle, Phone, Calendar, CheckCircle2, Circle, Clock, Plus } from "lucide-react";

export function TeamPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-white tracking-tight">Team Collaboration</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">
            <span className="text-emerald-300 font-medium">4 online</span> · 6 members
          </p>
        </div>
        <button className="h-7 w-7 rounded-lg flex items-center justify-center bg-violet-500/15 border border-violet-500/30 text-violet-300 hover:bg-violet-500/25 transition">
          <Plus size={13} />
        </button>
      </div>

      {/* Online members */}
      <div className="mt-4">
        <div className="text-[10.5px] uppercase tracking-wider text-white/40 font-medium mb-2.5">
          Online now
        </div>
        <div className="flex -space-x-2">
          {TEAM_MEMBERS.slice(0, 5).map((m, i) => (
            <div key={m.name} className="relative group" style={{ zIndex: 5 - i }}>
              <div
                className={`h-9 w-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[11px] font-semibold text-white ring-2 ring-[#0a0914] transition group-hover:scale-110`}
              >
                {m.avatar}
              </div>
              {m.status === "online" && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0914]" />
              )}
              {m.status === "away" && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-[#0a0914]" />
              )}
            </div>
          ))}
          <button className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] border-dashed flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition text-[11px]">
            <Plus size={13} />
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[10.5px] uppercase tracking-wider text-white/40 font-medium">
            Assigned tasks
          </div>
          <button className="text-[10.5px] text-violet-300 hover:text-violet-200">View all</button>
        </div>
        <ul className="space-y-1.5">
          {TASKS.slice(0, 3).map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.025] transition cursor-pointer group"
            >
              <button className="shrink-0 text-white/30 hover:text-violet-300 transition">
                <Circle size={15} strokeWidth={2} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white/80 truncate group-hover:text-white">
                  {t.title}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[9.5px] uppercase font-semibold tracking-wider ${
                      t.priority === "high"
                        ? "text-rose-300"
                        : t.priority === "medium"
                        ? "text-amber-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {t.priority}
                  </span>
                  <span className="text-[10px] text-white/35">·</span>
                  <span className="text-[10px] text-white/45">{t.due}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming meetings */}
      <div className="mt-5 flex-1">
        <div className="text-[10.5px] uppercase tracking-wider text-white/40 font-medium mb-2.5">
          Upcoming meetings
        </div>
        <div className="space-y-1.5">
          {MEETINGS.map((m) => (
            <div
              key={m.title}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition cursor-pointer"
            >
              <div className={`shrink-0 h-9 w-1 rounded-full ${m.color}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-white/85 font-medium truncate">{m.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10.5px] text-white/45">
                  <Clock size={10} />
                  {m.time} · {m.duration}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 rounded-md flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.05] transition">
                  <Video size={12} />
                </button>
                <button className="h-7 w-7 rounded-md flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.05] transition">
                  <MessageCircle size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
