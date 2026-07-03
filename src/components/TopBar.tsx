import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  Check,
  Settings,
  LogOut,
  User,
  CreditCard,
  Keyboard,
  Sparkles,
  Plus,
  Globe,
} from "lucide-react";
import { NOTIFICATIONS, MESSAGES } from "../lib/data";

export function TopBar() {
  const [searchValue, setSearchValue] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [openMenu, setOpenMenu] = useState<"notif" | "msg" | "profile" | "workspace" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#07060d]/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        {/* Workspace selector */}
        <div className="relative" ref={openMenu === "workspace" ? containerRef : undefined}>
          <button
            onClick={() => setOpenMenu(openMenu === "workspace" ? null : "workspace")}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition group"
          >
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-semibold text-white">
              AC
            </div>
            <span className="text-[13px] font-medium text-white/85">Acme Corp</span>
            <ChevronDown size={13} className="text-white/40 group-hover:text-white/70 transition" />
          </button>

          <AnimatePresence>
            {openMenu === "workspace" && (
              <DropdownPanel align="left">
                <div className="px-3 py-2 text-[10.5px] font-medium uppercase tracking-wider text-white/40 border-b border-white/[0.06]">
                  Your workspaces
                </div>
                {[
                  { name: "Acme Corp", plan: "Pro", active: true, color: "from-amber-400 to-orange-500" },
                  { name: "Lumen Studio", plan: "Free", active: false, color: "from-violet-500 to-fuchsia-500" },
                  { name: "Personal", plan: "Pro", active: false, color: "from-cyan-500 to-blue-500" },
                ].map((w) => (
                  <button
                    key={w.name}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] transition"
                  >
                    <div
                      className={`h-7 w-7 rounded-md bg-gradient-to-br ${w.color} flex items-center justify-center text-[10px] font-semibold text-white`}
                    >
                      {w.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[13px] font-medium text-white/90">{w.name}</div>
                      <div className="text-[10.5px] text-white/40">{w.plan}</div>
                    </div>
                    {w.active && <Check size={14} className="text-violet-300" />}
                  </button>
                ))}
                <div className="border-t border-white/[0.06] p-1.5">
                  <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-white/[0.04] text-[12.5px] text-white/70 transition">
                    <Plus size={13} />
                    Create workspace
                  </button>
                </div>
              </DropdownPanel>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block h-5 w-px bg-white/[0.06]" />

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-white/70 transition"
            />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search customers, reports, metrics..."
              className="w-full h-9 pl-9 pr-20 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[13px] text-white/90 placeholder:text-white/30 outline-none focus:bg-white/[0.05] focus:border-violet-400/40 transition"
            />
            <kbd className="hidden md:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 h-5 rounded border border-white/[0.08] bg-white/[0.04] text-[10.5px] text-white/40 font-mono">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5" ref={openMenu ? containerRef : undefined}>
          {/* Theme switch */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={15} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={15} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "msg" ? null : "msg")}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition border ${
                openMenu === "msg"
                  ? "bg-white/[0.06] text-white border-white/[0.1]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/[0.06]"
              }`}
              aria-label="Messages"
            >
              <MessageSquare size={15} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
            </button>

            <AnimatePresence>
              {openMenu === "msg" && (
                <DropdownPanel align="right" wide>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div className="text-[13px] font-semibold text-white">Messages</div>
                    <button className="text-[11.5px] text-violet-300 hover:text-violet-200">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {MESSAGES.map((m) => (
                      <button
                        key={m.id}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition text-left"
                      >
                        <div className="relative shrink-0">
                          <div
                            className={`h-9 w-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[11px] font-semibold text-white`}
                          >
                            {m.avatar}
                          </div>
                          {m.unread > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-violet-500 text-[9px] font-semibold text-white flex items-center justify-center">
                              {m.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[12.5px] font-medium text-white/90 truncate">
                              {m.name}
                            </div>
                            <div className="text-[10.5px] text-white/35 shrink-0">{m.time}</div>
                          </div>
                          <div className="text-[12px] text-white/55 truncate mt-0.5">
                            {m.message}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.06] p-2">
                    <button className="w-full py-1.5 rounded-md text-[12px] text-white/60 hover:text-white hover:bg-white/[0.04] transition">
                      View all messages
                    </button>
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "notif" ? null : "notif")}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition border relative ${
                openMenu === "notif"
                  ? "bg-white/[0.06] text-white border-white/[0.1]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/[0.06]"
              }`}
              aria-label="Notifications"
            >
              <Bell size={15} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-400">
                <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-75" />
              </span>
            </button>

            <AnimatePresence>
              {openMenu === "notif" && (
                <DropdownPanel align="right" wide>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="text-[13px] font-semibold text-white">Notifications</div>
                      <span className="px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-[10px] font-medium">
                        3 new
                      </span>
                    </div>
                    <button className="text-[11.5px] text-violet-300 hover:text-violet-200">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <button
                        key={n.id}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition text-left border-b border-white/[0.04] last:border-0"
                      >
                        <div
                          className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${
                            n.unread
                              ? "bg-violet-500/15 border border-violet-500/30"
                              : "bg-white/[0.04] border border-white/[0.06]"
                          }`}
                        >
                          <Bell size={13} className={n.unread ? "text-violet-300" : "text-white/40"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className={`text-[12.5px] truncate ${
                                n.unread ? "font-semibold text-white" : "font-medium text-white/75"
                              }`}
                            >
                              {n.title}
                            </div>
                            {n.unread && (
                              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-[10.5px] text-white/40 mt-0.5">{n.time}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.06] p-2">
                    <button className="w-full py-1.5 rounded-md text-[12px] text-white/60 hover:text-white hover:bg-white/[0.04] transition">
                      View all notifications
                    </button>
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block h-5 w-px bg-white/[0.06] mx-1" />

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "profile" ? null : "profile")}
              className={`flex items-center gap-2 pl-1.5 pr-2 h-9 rounded-lg transition border ${
                openMenu === "profile"
                  ? "bg-white/[0.06] border-white/[0.1]"
                  : "hover:bg-white/[0.04] border-transparent hover:border-white/[0.06]"
              }`}
            >
              <div className="relative">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[11px] font-semibold text-white">
                  AR
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-[#07060d]" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-[12px] font-medium text-white/90 leading-tight">Alex Rivera</div>
                <div className="text-[10px] text-white/40 leading-tight">Admin</div>
              </div>
              <ChevronDown size={12} className="text-white/40 hidden md:block" />
            </button>

            <AnimatePresence>
              {openMenu === "profile" && (
                <DropdownPanel align="right">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[12px] font-semibold text-white">
                        AR
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-white">Alex Rivera</div>
                        <div className="text-[11px] text-white/40 truncate">alex@acme.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <MenuItem icon={Sparkles} label="Upgrade to Enterprise" badge="New" />
                    <MenuItem icon={User} label="Your profile" />
                    <MenuItem icon={Settings} label="Account settings" />
                    <MenuItem icon={CreditCard} label="Billing & usage" />
                    <MenuItem icon={Keyboard} label="Keyboard shortcuts" />
                    <MenuItem icon={Globe} label="Language" suffix="English" />
                  </div>
                  <div className="border-t border-white/[0.06] p-1.5">
                    <MenuItem icon={LogOut} label="Sign out" danger />
                  </div>
                </DropdownPanel>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownPanel({
  children,
  align = "right",
  wide = false,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-50 mt-2 ${
        align === "right" ? "right-0" : "left-0"
      } ${wide ? "w-[360px]" : "w-[260px]"} glass rounded-xl shadow-2xl shadow-black/50 overflow-hidden`}
      style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
    >
      {children}
    </motion.div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  badge,
  suffix,
  danger,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  badge?: string;
  suffix?: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12.5px] transition ${
        danger
          ? "text-rose-300 hover:bg-rose-500/10"
          : "text-white/75 hover:text-white hover:bg-white/[0.04]"
      }`}
    >
      <Icon size={14} className={danger ? "" : "text-white/45"} />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9.5px] font-semibold">
          {badge}
        </span>
      )}
      {suffix && <span className="text-[11px] text-white/40">{suffix}</span>}
    </button>
  );
}
