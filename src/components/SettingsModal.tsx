import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  User,
  Shield,
  CreditCard,
  Key,
  Users,
  Bell,
  Palette,
  Check,
  Sun,
  Moon,
  Monitor,
  Copy,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";

type Section = {
  id: string;
  label: string;
  icon: any;
  description: string;
};

const SECTIONS: Section[] = [
  { id: "profile", label: "Profile", icon: User, description: "Manage your personal information" },
  { id: "security", label: "Security", icon: Shield, description: "Password and authentication" },
  { id: "billing", label: "Billing", icon: CreditCard, description: "Plans and payment methods" },
  { id: "api", label: "API Keys", icon: Key, description: "Developer access tokens" },
  { id: "team", label: "Team Permissions", icon: Users, description: "Roles and access control" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Email and push preferences" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Theme and display" },
];

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const [active, setActive] = useState("profile");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [showKey, setShowKey] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[88vh] glass rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex pointer-events-auto"
            >
              {/* Sidebar */}
              <div className="w-60 shrink-0 border-r border-white/[0.06] bg-[#0a0914]/50 flex flex-col">
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <div className="text-[15px] font-semibold text-white">Settings</div>
                  <p className="text-[11px] text-white/40 mt-0.5">Manage your workspace</p>
                </div>
                <nav className="flex-1 p-2 overflow-y-auto scrollbar-hide">
                  {SECTIONS.map((s) => {
                    const Icon = s.icon;
                    const isActive = active === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        className={`relative w-full flex items-start gap-2.5 p-2.5 rounded-lg text-left transition ${
                          isActive ? "" : "hover:bg-white/[0.03]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="settings-active"
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/15 to-indigo-500/10 border border-violet-500/20"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <Icon
                          size={14}
                          className={`relative mt-0.5 shrink-0 ${isActive ? "text-violet-300" : "text-white/45"}`}
                          strokeWidth={2.2}
                        />
                        <div className="relative flex-1 min-w-0">
                          <div
                            className={`text-[12.5px] font-medium ${
                              isActive ? "text-white" : "text-white/75"
                            }`}
                          >
                            {s.label}
                          </div>
                          <div className="text-[10.5px] text-white/40 mt-0.5 truncate">
                            {s.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
                <div className="p-3 border-t border-white/[0.06]">
                  <div className="rounded-lg p-3 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 border border-violet-500/20">
                    <div className="text-[11px] font-semibold text-violet-200">Need help?</div>
                    <div className="text-[10.5px] text-white/45 mt-0.5">
                      Check our documentation or contact support.
                    </div>
                    <button className="mt-2 w-full py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-[11px] text-white transition border border-white/[0.08]">
                      View docs
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-[16px] font-semibold text-white">
                      {SECTIONS.find((s) => s.id === active)?.label}
                    </h2>
                    <p className="text-[11.5px] text-white/45 mt-0.5">
                      {SECTIONS.find((s) => s.id === active)?.description}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-white/55 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {active === "profile" && <ProfileSection />}
                  {active === "security" && <SecuritySection />}
                  {active === "billing" && <BillingSection />}
                  {active === "api" && <ApiKeysSection showKey={showKey} setShowKey={setShowKey} />}
                  {active === "team" && <TeamSection />}
                  {active === "notifications" && <NotificationsSection />}
                  {active === "appearance" && (
                    <AppearanceSection theme={theme} setTheme={setTheme} />
                  )}
                </div>

                <div className="px-6 py-3.5 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="h-9 px-4 rounded-lg text-[12.5px] text-white/75 hover:text-white hover:bg-white/[0.05] transition"
                  >
                    Cancel
                  </button>
                  <button className="h-9 px-4 rounded-lg text-[12.5px] text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-lg shadow-violet-500/25 transition">
                    Save changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11.5px] font-medium text-white/65">{label}</label>
      {children}
      {hint && <p className="text-[10.5px] text-white/40">{hint}</p>}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-9 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12.5px] text-white placeholder:text-white/30 outline-none focus:bg-white/[0.05] focus:border-violet-400/40 transition ${
        props.className || ""
      }`}
    />
  );
}

function ProfileSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[18px] font-semibold text-white shadow-lg shadow-violet-500/30">
          AR
        </div>
        <div>
          <button className="h-8 px-3 rounded-lg text-[12px] text-white bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition">
            Upload new avatar
          </button>
          <p className="text-[10.5px] text-white/40 mt-1.5">PNG, JPG up to 2MB · 256×256 recommended</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="First name">
          <Input defaultValue="Alex" />
        </Field>
        <Field label="Last name">
          <Input defaultValue="Rivera" />
        </Field>
        <Field label="Email address">
          <Input defaultValue="alex@acme.com" type="email" />
        </Field>
        <Field label="Username">
          <Input defaultValue="alexrivera" />
        </Field>
        <Field label="Job title" hint="Your role within the organization">
          <Input defaultValue="Head of Product" />
        </Field>
        <Field label="Time zone">
          <Input defaultValue="(GMT-08:00) Pacific Time" />
        </Field>
      </div>

      <Field label="Bio" hint="Brief description for your profile.">
        <textarea
          rows={3}
          defaultValue="Product leader with 8+ years of experience building data-driven SaaS products. Passionate about analytics and user experience."
          className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12.5px] text-white placeholder:text-white/30 outline-none focus:bg-white/[0.05] focus:border-violet-400/40 transition resize-none"
        />
      </Field>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <Shield size={14} className="text-emerald-300" />
          </div>
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold text-white">Your account is secure</div>
            <p className="text-[11.5px] text-white/55 mt-0.5">
              Two-factor authentication is enabled and your password was last changed 14 days ago.
            </p>
          </div>
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
            Strong
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-[12px] font-semibold text-white/80">Change password</div>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Current password">
            <Input type="password" placeholder="••••••••••••" />
          </Field>
          <Field label="New password">
            <Input type="password" />
          </Field>
          <Field label="Confirm new password">
            <Input type="password" />
          </Field>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.05] space-y-3">
        <div className="text-[12px] font-semibold text-white/80">Two-factor authentication</div>
        <ToggleRow
          title="Authenticator app"
          description="Use an authenticator app for 2FA codes."
          enabled
        />
        <ToggleRow
          title="SMS verification"
          description="Receive codes via SMS to your phone."
          enabled={false}
        />
        <ToggleRow
          title="Backup codes"
          description="Generate one-time backup codes for account recovery."
          enabled
        />
      </div>

      <div className="pt-3 border-t border-white/[0.05]">
        <div className="text-[12px] font-semibold text-white/80 mb-3">Active sessions</div>
        <div className="rounded-lg p-3 bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <Monitor size={14} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-medium text-white">MacBook Pro · San Francisco</div>
              <div className="text-[10.5px] text-white/40">
                Current session · Chrome 121 · Active now
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-[10px] font-medium">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl p-5 bg-gradient-to-br from-violet-500/15 via-indigo-500/8 to-transparent border border-violet-500/25 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9.5px] font-semibold uppercase tracking-wider">
              Current plan
            </span>
            <span className="text-[10.5px] text-white/50">Renews Dec 14, 2025</span>
          </div>
          <div className="mt-2 text-[22px] font-semibold text-white">Pro Workspace</div>
          <p className="text-[11.5px] text-white/55 mt-1">
            $49/month per user · 24 of 50 seats used
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="h-8 px-3 rounded-lg text-[11.5px] font-medium text-white bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition">
              Manage plan
            </button>
            <button className="h-8 px-3 rounded-lg text-[11.5px] font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-lg shadow-violet-500/25 transition">
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="text-[12px] font-semibold text-white/80 mb-3">Payment method</div>
        <div className="rounded-lg p-3 bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
          <div className="h-10 w-14 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-[9.5px] text-white/80 font-mono">
            VISA
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-medium text-white">Visa ending in 4242</div>
            <div className="text-[10.5px] text-white/40">Expires 09/2027 · Default</div>
          </div>
          <button className="h-7 px-2.5 rounded-md text-[11px] text-white/65 hover:text-white hover:bg-white/[0.05] transition">
            Edit
          </button>
        </div>
      </div>

      <div>
        <div className="text-[12px] font-semibold text-white/80 mb-3">Recent invoices</div>
        <div className="space-y-1.5">
          {[
            { date: "Nov 14, 2024", amount: "$1,176.00", status: "Paid" },
            { date: "Oct 14, 2024", amount: "$1,176.00", status: "Paid" },
            { date: "Sep 14, 2024", amount: "$1,176.00", status: "Paid" },
          ].map((inv) => (
            <div
              key={inv.date}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition"
            >
              <div className="h-7 w-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/45 text-[10px]">
                📄
              </div>
              <div className="flex-1">
                <div className="text-[12px] text-white/85">{inv.date}</div>
                <div className="text-[10.5px] text-white/40">{inv.amount}</div>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-[10px] font-medium">
                {inv.status}
              </span>
              <button className="h-7 px-2.5 rounded-md text-[11px] text-white/65 hover:text-white hover:bg-white/[0.05] transition">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApiKeysSection({ showKey, setShowKey }: { showKey: boolean; setShowKey: (b: boolean) => void }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl p-4 bg-amber-500/8 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <Shield size={14} className="text-amber-300 mt-0.5" />
          <div className="text-[11.5px] text-amber-200/80 leading-relaxed">
            Keep your API keys secret. They provide full access to your workspace. Never share them
            in publicly accessible areas.
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-semibold text-white/80">Active API keys</div>
          <button className="h-7 px-2.5 rounded-md text-[11px] text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 transition flex items-center gap-1">
            <Plus size={11} strokeWidth={2.5} />
            New key
          </button>
        </div>
        {[
          { name: "Production", last: "2 hours ago", prefix: "sk_live_51N" },
          { name: "Staging", last: "3 days ago", prefix: "sk_test_51N" },
        ].map((k) => (
          <div
            key={k.name}
            className="rounded-lg p-3 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[12px] font-semibold text-white">{k.name}</div>
                <div className="text-[10.5px] text-white/40">Last used {k.last}</div>
              </div>
              <button className="text-[10.5px] text-rose-300 hover:text-rose-200">Revoke</button>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-black/30 border border-white/[0.05]">
              <code className="flex-1 text-[11px] font-mono text-white/65 truncate">
                {showKey
                  ? `${k.prefix}_8XkQp2nV4mL9jR3wT6yF8sB1vC0xZ7aH5dE2kM4nP9q`
                  : `${k.prefix}${"•".repeat(40)}`}
              </code>
              <button
                onClick={() => setShowKey(!showKey)}
                className="h-6 w-6 rounded flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.05] transition"
              >
                {showKey ? <EyeOff size={11} /> : <Eye size={11} />}
              </button>
              <button className="h-6 w-6 rounded flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.05] transition">
                <Copy size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="space-y-3">
      <div className="text-[12px] font-semibold text-white/80">Team members & roles</div>
      {[
        { name: "Alex Rivera", email: "alex@acme.com", role: "Admin", avatar: "AR", color: "from-violet-500 to-fuchsia-500" },
        { name: "Maya Patel", email: "maya@acme.com", role: "Editor", avatar: "MP", color: "from-pink-500 to-rose-500" },
        { name: "Jordan Smith", email: "jordan@acme.com", role: "Viewer", avatar: "JS", color: "from-cyan-500 to-blue-500" },
        { name: "Lina Park", email: "lina@acme.com", role: "Editor", avatar: "LP", color: "from-amber-500 to-orange-500" },
      ].map((m) => (
        <div
          key={m.email}
          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition"
        >
          <div
            className={`h-9 w-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[11px] font-semibold text-white`}
          >
            {m.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-medium text-white truncate">{m.name}</div>
            <div className="text-[10.5px] text-white/40 truncate">{m.email}</div>
          </div>
          <select
            defaultValue={m.role}
            className="h-8 px-2 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11.5px] text-white/85 outline-none focus:border-violet-400/40 transition cursor-pointer"
          >
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
      ))}
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="space-y-3">
      <div className="text-[12px] font-semibold text-white/80">Email notifications</div>
      <ToggleRow title="Product updates" description="New features and improvements" enabled />
      <ToggleRow title="Weekly digest" description="Summary of your weekly performance" enabled />
      <ToggleRow title="Customer activity" description="New signups and payments" enabled />
      <ToggleRow title="Team mentions" description="When someone mentions you" enabled={false} />

      <div className="pt-3 border-t border-white/[0.05]">
        <div className="text-[12px] font-semibold text-white/80 mb-3">Push notifications</div>
        <ToggleRow title="Desktop notifications" description="Show notifications on your desktop" enabled />
        <ToggleRow title="Sound alerts" description="Play sound for important alerts" enabled />
        <ToggleRow title="Mobile push" description="Send push to mobile devices" enabled={false} />
      </div>
    </div>
  );
}

function AppearanceSection({
  theme,
  setTheme,
}: {
  theme: "dark" | "light" | "system";
  setTheme: (t: "dark" | "light" | "system") => void;
}) {
  const themes: { id: "dark" | "light" | "system"; label: string; icon: any; gradient: string }[] = [
    { id: "dark", label: "Dark", icon: Moon, gradient: "from-slate-800 to-slate-950" },
    { id: "light", label: "Light", icon: Sun, gradient: "from-slate-100 to-slate-300" },
    { id: "system", label: "System", icon: Monitor, gradient: "from-slate-500 to-slate-700" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <div className="text-[12px] font-semibold text-white/80 mb-3">Theme</div>
        <div className="grid grid-cols-3 gap-2.5">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative p-3 rounded-xl border transition ${
                  isActive
                    ? "bg-violet-500/10 border-violet-500/40"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                <div
                  className={`h-16 rounded-lg bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-2`}
                >
                  <Icon size={20} className="text-white/85" />
                </div>
                <div className="text-[12px] font-medium text-white">{t.label}</div>
                {isActive && (
                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-violet-500 flex items-center justify-center">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-[12px] font-semibold text-white/80 mb-3">Accent color</div>
        <div className="flex items-center gap-2.5">
          {["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#ec4899", "#3b82f6"].map((c) => (
            <button
              key={c}
              className="relative h-8 w-8 rounded-lg ring-1 ring-white/10 hover:ring-white/30 transition"
              style={{ background: c }}
            >
              {c === "#8b5cf6" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[12px] font-semibold text-white/80 mb-3">Display</div>
        <ToggleRow title="Compact mode" description="Reduce spacing for more content" enabled={false} />
        <ToggleRow title="Reduce motion" description="Disable animations and transitions" enabled={false} />
        <ToggleRow title="High contrast" description="Increase contrast for better readability" enabled={false} />
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition">
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-medium text-white">{title}</div>
        <div className="text-[10.5px] text-white/45 mt-0.5">{description}</div>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-5 w-9 rounded-full transition shrink-0 ${
          enabled ? "bg-gradient-to-r from-violet-500 to-indigo-500" : "bg-white/[0.08] border border-white/[0.08]"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );
}
