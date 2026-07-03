// Realistic sample business data for the SaaS Analytics Dashboard

type RevenuePoint = { label: string; revenue: number; expenses: number; profit: number };

export const REVENUE_DATA: Record<"daily" | "weekly" | "monthly" | "yearly", RevenuePoint[]> = {
  daily: [
    { label: "Mon", revenue: 28400, expenses: 18200, profit: 10200 },
    { label: "Tue", revenue: 32100, expenses: 19800, profit: 12300 },
    { label: "Wed", revenue: 29800, expenses: 18900, profit: 10900 },
    { label: "Thu", revenue: 36400, expenses: 21500, profit: 14900 },
    { label: "Fri", revenue: 41200, expenses: 23800, profit: 17400 },
    { label: "Sat", revenue: 38500, expenses: 22100, profit: 16400 },
    { label: "Sun", revenue: 44200, expenses: 25200, profit: 19000 },
  ],
  weekly: [
    { label: "W1", revenue: 184200, expenses: 112400, profit: 71800 },
    { label: "W2", revenue: 198700, expenses: 118900, profit: 79800 },
    { label: "W3", revenue: 212400, expenses: 124200, profit: 88200 },
    { label: "W4", revenue: 228900, expenses: 131800, profit: 97100 },
    { label: "W5", revenue: 245600, expenses: 138400, profit: 107200 },
    { label: "W6", revenue: 261300, expenses: 144700, profit: 116600 },
    { label: "W7", revenue: 278900, expenses: 151200, profit: 127700 },
    { label: "W8", revenue: 294500, expenses: 158900, profit: 135600 },
  ],
  monthly: [
    { label: "Jan", revenue: 824000, expenses: 482000, profit: 342000 },
    { label: "Feb", revenue: 891000, expenses: 512000, profit: 379000 },
    { label: "Mar", revenue: 968000, expenses: 538000, profit: 430000 },
    { label: "Apr", revenue: 1052000, expenses: 572000, profit: 480000 },
    { label: "May", revenue: 1148000, expenses: 614000, profit: 534000 },
    { label: "Jun", revenue: 1234000, expenses: 648000, profit: 586000 },
    { label: "Jul", revenue: 1342000, expenses: 692000, profit: 650000 },
    { label: "Aug", revenue: 1428000, expenses: 728000, profit: 700000 },
    { label: "Sep", revenue: 1534000, expenses: 762000, profit: 772000 },
    { label: "Oct", revenue: 1642000, expenses: 798000, profit: 844000 },
    { label: "Nov", revenue: 1748000, expenses: 832000, profit: 916000 },
    { label: "Dec", revenue: 1862000, expenses: 868000, profit: 994000 },
  ],
  yearly: [
    { label: "2019", revenue: 4200000, expenses: 2800000, profit: 1400000 },
    { label: "2020", revenue: 5800000, expenses: 3400000, profit: 2400000 },
    { label: "2021", revenue: 7900000, expenses: 4200000, profit: 3700000 },
    { label: "2022", revenue: 11200000, expenses: 5600000, profit: 5600000 },
    { label: "2023", revenue: 14800000, expenses: 7100000, profit: 7700000 },
    { label: "2024", revenue: 18600000, expenses: 8600000, profit: 10000000 },
  ],
};

export const SPARKLINE_DATA = {
  revenue: [62, 68, 71, 75, 82, 88, 92, 98, 105, 112, 118, 124],
  users: [320, 380, 420, 480, 540, 620, 680, 740, 820, 890, 960, 1042],
  growth: [4.2, 4.8, 5.2, 5.8, 6.4, 7.1, 7.6, 8.2, 8.8, 9.4, 10.1, 10.8],
  conversion: [2.4, 2.6, 2.8, 3.0, 3.2, 3.3, 3.5, 3.6, 3.7, 3.8, 3.9, 4.1],
};

export const SALES_PERFORMANCE = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 56 },
  { name: "Wed", value: 48 },
  { name: "Thu", value: 72 },
  { name: "Fri", value: 88 },
  { name: "Sat", value: 64 },
  { name: "Sun", value: 78 },
];

export const USER_GROWTH = [
  { month: "Jan", active: 4200, new: 820, churn: 120 },
  { month: "Feb", active: 4800, new: 940, churn: 140 },
  { month: "Mar", active: 5400, new: 1080, churn: 160 },
  { month: "Apr", active: 6200, new: 1240, churn: 180 },
  { month: "May", active: 7100, new: 1380, churn: 200 },
  { month: "Jun", active: 8200, new: 1520, churn: 220 },
  { month: "Jul", active: 9400, new: 1680, churn: 240 },
  { month: "Aug", active: 10800, new: 1820, churn: 260 },
  { month: "Sep", active: 12300, new: 1980, churn: 280 },
  { month: "Oct", active: 13900, new: 2120, churn: 300 },
  { month: "Nov", active: 15600, new: 2280, churn: 320 },
  { month: "Dec", active: 17400, new: 2420, churn: 340 },
];

export const TRAFFIC_SOURCES = [
  { name: "Organic Search", value: 38, color: "#8b5cf6" },
  { name: "Direct", value: 24, color: "#6366f1" },
  { name: "Referral", value: 18, color: "#06b6d4" },
  { name: "Social", value: 12, color: "#10b981" },
  { name: "Paid Ads", value: 8, color: "#f59e0b" },
];

export const DEVICE_ANALYTICS = [
  { name: "Desktop", value: 58, color: "#8b5cf6" },
  { name: "Mobile", value: 32, color: "#06b6d4" },
  { name: "Tablet", value: 8, color: "#10b981" },
  { name: "Other", value: 2, color: "#f59e0b" },
];

export const CUSTOMER_ACQUISITION = [
  { channel: "Organic", count: 2840, cost: 12 },
  { channel: "Paid Search", count: 1920, cost: 48 },
  { channel: "Social", count: 1640, cost: 24 },
  { channel: "Email", count: 1280, cost: 8 },
  { channel: "Referral", count: 980, cost: 6 },
  { channel: "Direct", count: 740, cost: 0 },
];

export const ACTIVITY_FEED = [
  {
    id: 1,
    type: "user",
    title: "Sarah Chen signed up for Pro plan",
    description: "Created account via referral link",
    time: "2 min ago",
    avatar: "SC",
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received — $2,499.00",
    description: "Acme Corp • Invoice #INV-2841",
    time: "8 min ago",
    avatar: "💳",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    type: "team",
    title: "Marcus Lee joined the workspace",
    description: "Invited by Alex Rivera as Product Designer",
    time: "24 min ago",
    avatar: "ML",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    type: "alert",
    title: "Server latency above threshold",
    description: "EU-West region • 2.4s avg response",
    time: "1 hour ago",
    avatar: "⚠️",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 5,
    type: "user",
    title: "12 new users from ProductHunt launch",
    description: "Conversion rate: 8.2%",
    time: "2 hours ago",
    avatar: "PH",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    type: "login",
    title: "Anya Patel logged in from new device",
    description: "MacBook Pro • San Francisco, CA",
    time: "3 hours ago",
    avatar: "AP",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 7,
    type: "payment",
    title: "Subscription renewed — $1,200.00",
    description: "Globex Inc • Annual plan",
    time: "5 hours ago",
    avatar: "💰",
    color: "from-emerald-500 to-green-500",
  },
];

export const TEAM_MEMBERS = [
  { name: "Alex Rivera", role: "Admin", status: "online", avatar: "AR", color: "from-violet-500 to-indigo-500" },
  { name: "Maya Patel", role: "Editor", status: "online", avatar: "MP", color: "from-pink-500 to-rose-500" },
  { name: "Jordan Smith", role: "Viewer", status: "online", avatar: "JS", color: "from-cyan-500 to-blue-500" },
  { name: "Lina Park", role: "Editor", status: "away", avatar: "LP", color: "from-amber-500 to-orange-500" },
  { name: "Noah Kim", role: "Admin", status: "online", avatar: "NK", color: "from-emerald-500 to-teal-500" },
  { name: "Sofia Reyes", role: "Editor", status: "offline", avatar: "SR", color: "from-fuchsia-500 to-purple-500" },
];

export const TASKS = [
  { id: 1, title: "Review Q4 analytics report", priority: "high", assignee: "AR", due: "Today" },
  { id: 2, title: "Approve pricing tier changes", priority: "high", assignee: "NK", due: "Today" },
  { id: 3, title: "Update onboarding flow copy", priority: "medium", assignee: "MP", due: "Tomorrow" },
  { id: 4, title: "Sync with Stripe integration team", priority: "medium", assignee: "JS", due: "Wed" },
  { id: 5, title: "Prepare investor update deck", priority: "low", assignee: "LP", due: "Friday" },
];

export const MEETINGS = [
  { title: "Weekly product review", time: "10:00 AM", duration: "30m", color: "bg-violet-500" },
  { title: "Sales pipeline sync", time: "1:30 PM", duration: "45m", color: "bg-emerald-500" },
  { title: "Design critique", time: "3:00 PM", duration: "1h", color: "bg-amber-500" },
];

export const CUSTOMERS = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    company: "Acme Corporation",
    avatar: "SC",
    color: "from-violet-500 to-indigo-500",
    revenue: 12480,
    status: "active",
    plan: "Enterprise",
    lastActive: "2 min ago",
    country: "🇺🇸",
  },
  {
    id: 2,
    name: "Marcus Webb",
    email: "marcus@globex.io",
    company: "Globex Industries",
    avatar: "MW",
    color: "from-pink-500 to-rose-500",
    revenue: 8420,
    status: "active",
    plan: "Pro",
    lastActive: "18 min ago",
    country: "🇬🇧",
  },
  {
    id: 3,
    name: "Anya Patel",
    email: "anya@stark.tech",
    company: "Stark Technologies",
    avatar: "AP",
    color: "from-cyan-500 to-blue-500",
    revenue: 22100,
    status: "active",
    plan: "Enterprise",
    lastActive: "1 hour ago",
    country: "🇨🇦",
  },
  {
    id: 4,
    name: "Diego Morales",
    email: "diego@wayne.co",
    company: "Wayne Enterprises",
    avatar: "DM",
    color: "from-amber-500 to-orange-500",
    revenue: 4280,
    status: "pending",
    plan: "Starter",
    lastActive: "4 hours ago",
    country: "🇪🇸",
  },
  {
    id: 5,
    name: "Lina Park",
    email: "lina@hooli.com",
    company: "Hooli Inc.",
    avatar: "LP",
    color: "from-emerald-500 to-teal-500",
    revenue: 18600,
    status: "active",
    plan: "Pro",
    lastActive: "6 hours ago",
    country: "🇰🇷",
  },
  {
    id: 6,
    name: "Oliver Stone",
    email: "oliver@pied.ai",
    company: "Pied Piper",
    avatar: "OS",
    color: "from-fuchsia-500 to-purple-500",
    revenue: 6740,
    status: "active",
    plan: "Pro",
    lastActive: "12 hours ago",
    country: "🇩🇪",
  },
  {
    id: 7,
    name: "Yuki Tanaka",
    email: "yuki@soylent.jp",
    company: "Soylent Corp",
    avatar: "YT",
    color: "from-rose-500 to-pink-500",
    revenue: 14200,
    status: "inactive",
    plan: "Enterprise",
    lastActive: "2 days ago",
    country: "🇯🇵",
  },
  {
    id: 8,
    name: "Noah Kim",
    email: "noah@umbrella.co",
    company: "Umbrella Corp",
    avatar: "NK",
    color: "from-indigo-500 to-violet-500",
    revenue: 9280,
    status: "active",
    plan: "Pro",
    lastActive: "1 day ago",
    country: "🇸🇬",
  },
];

export const AI_INSIGHTS = [
  {
    id: 1,
    type: "opportunity",
    title: "Revenue opportunity detected",
    description:
      "12 enterprise accounts in trial are showing 3x engagement vs. average. A targeted outreach could yield ~$148K in ARR within 30 days.",
    confidence: 94,
    impact: "+$148K ARR",
    icon: "trending-up",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "emerald",
  },
  {
    id: 2,
    type: "retention",
    title: "Customer retention risk",
    description:
      "Acme Corp usage dropped 42% over the last 14 days. Recommend scheduling a success call within 48 hours to prevent churn.",
    confidence: 87,
    impact: "Save $12.4K ARR",
    icon: "alert-triangle",
    color: "from-amber-500/20 to-orange-500/20",
    accent: "amber",
  },
  {
    id: 3,
    type: "marketing",
    title: "Marketing channel optimization",
    description:
      "LinkedIn ads have 2.4x higher LTV than Google Ads for the same spend. Reallocating $8K/month could increase ROAS by 38%.",
    confidence: 91,
    impact: "+38% ROAS",
    icon: "megaphone",
    color: "from-violet-500/20 to-indigo-500/20",
    accent: "violet",
  },
  {
    id: 4,
    type: "forecast",
    title: "Q1 sales forecast",
    description:
      "Based on current pipeline velocity and seasonal patterns, Q1 revenue is projected to reach $2.4M (±8%), 18% above target.",
    confidence: 89,
    impact: "$2.4M projected",
    icon: "bar-chart-3",
    color: "from-cyan-500/20 to-blue-500/20",
    accent: "cyan",
  },
  {
    id: 5,
    type: "risk",
    title: "Anomaly detected in EU region",
    description:
      "Signup conversion dropped 14% in the EU-West region over the last 48 hours. Likely cause: payment provider latency on Stripe.",
    confidence: 82,
    impact: "Investigate now",
    icon: "activity",
    color: "from-rose-500/20 to-pink-500/20",
    accent: "rose",
  },
];

export const INTEGRATIONS = [
  { name: "Slack", description: "Team communication", icon: "💬", color: "from-purple-500 to-pink-500", connected: true, users: "12.4K" },
  { name: "Stripe", description: "Payment processing", icon: "💳", color: "from-indigo-500 to-violet-500", connected: true, users: "8.2K" },
  { name: "Shopify", description: "E-commerce platform", icon: "🛍️", color: "from-emerald-500 to-green-500", connected: true, users: "5.7K" },
  { name: "Salesforce", description: "CRM & sales", icon: "☁️", color: "from-cyan-500 to-blue-500", connected: false, users: "4.1K" },
  { name: "HubSpot", description: "Marketing & CRM", icon: "🎯", color: "from-orange-500 to-red-500", connected: true, users: "3.8K" },
  { name: "Google Analytics", description: "Web analytics", icon: "📊", color: "from-amber-500 to-yellow-500", connected: true, users: "9.6K" },
  { name: "Zapier", description: "Workflow automation", icon: "⚡", color: "from-rose-500 to-pink-500", connected: false, users: "2.4K" },
  { name: "Notion", description: "Docs & wikis", icon: "📝", color: "from-slate-500 to-gray-500", connected: true, users: "6.2K" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "New comment on your dashboard", time: "Just now", unread: true, icon: "message" },
  { id: 2, title: "Payment of $2,499 received", time: "8m ago", unread: true, icon: "dollar" },
  { id: 3, title: "Maya mentioned you in a thread", time: "32m ago", unread: true, icon: "at" },
  { id: 4, title: "Weekly report is ready", time: "2h ago", unread: false, icon: "file" },
  { id: 5, title: "Storage is 80% full", time: "1d ago", unread: false, icon: "database" },
];

export const MESSAGES = [
  { id: 1, name: "Maya Patel", message: "Can you check the new dashboard layout?", time: "2m", unread: 2, avatar: "MP", color: "from-pink-500 to-rose-500" },
  { id: 2, name: "Jordan Smith", message: "The Q4 numbers look great 📈", time: "14m", unread: 0, avatar: "JS", color: "from-cyan-500 to-blue-500" },
  { id: 3, name: "Lina Park", message: "Reviewing the design specs now", time: "1h", unread: 1, avatar: "LP", color: "from-amber-500 to-orange-500" },
  { id: 4, name: "Noah Kim", message: "Let's sync at 3pm", time: "3h", unread: 0, avatar: "NK", color: "from-emerald-500 to-teal-500" },
];
