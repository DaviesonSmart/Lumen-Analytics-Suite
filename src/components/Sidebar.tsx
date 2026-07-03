import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Megaphone,
  Puzzle,
  Bell,
  UserCircle2,
  Settings,
  ChevronsUpDown,
  Plus,
  Sparkles,
  Command,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  count?: number;
};

const PRIMARY_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3, badge: "New" },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "customers", label: "Customers", icon: Users, count: 2841 },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "marketing", label: "Marketing", icon: Megaphone },
];

const SECONDARY_NAV: NavItem[] = [
  { id: "integrations", label: "Integrations", icon: Puzzle, count: 7 },
  { id: "notifications", label: "Notifications", icon: Bell, count: 12 },
  { id: "team", label: "Team", icon: UserCircle2 },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0914]/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Sparkles size={18} className="text-white" strokeWidth={2.5} />
          <div className="absolute inset-0 rounded-xl bg-white/10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-white tracking-tight">Lumen</div>
          <div className="text-[11px] text-white/40 -mt-0.5">Analytics Suite</div>
        </div>
        <button
          className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition"
          aria-label="Toggle sidebar"
        >
          <ChevronsUpDown size={14} />
        </button>
      </div>

      {/* Workspace selector */}
      <div className="px-3 pt-4">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10 transition group">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[11px] font-semibold text-white">
            AC
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-[13px] font-medium text-white/90 truncate">Acme Corp</div>
            <div className="text-[10.5px] text-white/40">Pro Workspace</div>
          </div>
          <Plus size={14} className="text-white/40 group-hover:text-white/70 transition" />
        </button>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-3 scrollbar-hide">
        <div className="px-2 mb-2 text-[10.5px] font-medium uppercase tracking-wider text-white/30">
          Main
        </div>
        <ul className="space-y-0.5">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              hovered={hovered === item.id}
              onHover={() => setHovered(item.id)}
              onLeave={() => setHovered(null)}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </ul>

        <div className="px-2 mt-6 mb-2 text-[10.5px] font-medium uppercase tracking-wider text-white/30">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {SECONDARY_NAV.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              hovered={hovered === item.id}
              onHover={() => setHovered(item.id)}
              onLeave={() => setHovered(null)}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </ul>

        {/* Upgrade card */}
        <div className="mt-6 mx-1 p-4 rounded-xl bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent border border-violet-500/20 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-500/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-300">
              <Sparkles size={12} />
              ENTERPRISE
            </div>
            <div className="mt-2 text-[13px] font-semibold text-white leading-snug">
              Unlock AI-powered forecasts
            </div>
            <div className="mt-1 text-[11px] text-white/50 leading-relaxed">
              Get predictive insights, custom models, and dedicated support.
            </div>
            <button className="mt-3 w-full py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[12px] font-medium hover:from-violet-400 hover:to-indigo-400 transition shadow-lg shadow-violet-500/30">
              Upgrade plan
            </button>
          </div>
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-white/[0.06] p-3">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.04] transition group">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[12px] font-semibold text-white">
              AR
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0a0914]" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-[13px] font-medium text-white/90 truncate">Alex Rivera</div>
            <div className="text-[11px] text-white/40 truncate">alex@acme.com</div>
          </div>
          <Command size={14} className="text-white/30 group-hover:text-white/60 transition" />
        </button>
      </div>
    </aside>
  );
}

function NavLink({
  item,
  active,
  hovered,
  onHover,
  onLeave,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <li>
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={`relative w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
          active
            ? "text-white"
            : "text-white/55 hover:text-white/85"
        }`}
      >
        {active && (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/15 to-indigo-500/10 border border-violet-500/20"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        {!active && hovered && (
          <div className="absolute inset-0 rounded-lg bg-white/[0.03]" />
        )}
        <Icon
          size={16}
          strokeWidth={active ? 2.4 : 2}
          className={`relative shrink-0 ${active ? "text-violet-300" : "text-white/50"}`}
        />
        <span className="relative flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="relative px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9.5px] font-semibold">
            {item.badge}
          </span>
        )}
        {item.count !== undefined && (
          <span
            className={`relative text-[11px] tabular-nums ${
              active ? "text-violet-300" : "text-white/35"
            }`}
          >
            {item.count.toLocaleString()}
          </span>
        )}
      </button>
    </li>
  );
}
