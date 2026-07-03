import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { KPICards } from "./components/KPICards";
import { RevenueChart } from "./components/RevenueChart";
import { SalesChart } from "./components/SalesChart";
import { UserGrowthChart } from "./components/UserGrowthChart";
import { TrafficSources, DeviceAnalytics } from "./components/DonutCharts";
import { CustomerAcquisition } from "./components/CustomerAcquisition";
import { ActivityFeed } from "./components/ActivityFeed";
import { TeamPanel } from "./components/TeamPanel";
import { DataTable } from "./components/DataTable";
import { AIInsights } from "./components/AIInsights";
import { Integrations } from "./components/Integrations";
import { SettingsModal } from "./components/SettingsModal";
import { PageHeader } from "./components/PageHeader";

function App() {
  const [active, setActive] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07060d] text-white grid-bg">
      <Sidebar
        active={active}
        onSelect={(id) => {
          setActive(id);
          if (id === "settings") setSettingsOpen(true);
        }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-5 lg:space-y-6">
            <PageHeader
              title="Welcome back, Alex"
              subtitle="Here's what's happening with your business today. Revenue is up 18.4% vs last month."
              onSettingsClick={() => setSettingsOpen(true)}
            />

            {/* KPI Cards */}
            <KPICards />

            {/* Revenue + Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2">
                <RevenueChart />
              </div>
              <ActivityFeed />
            </div>

            {/* Sales + User Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SalesChart />
              <UserGrowthChart />
            </div>

            {/* Donuts + Acquisition */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <TrafficSources />
              <DeviceAnalytics />
              <CustomerAcquisition />
            </div>

            {/* Team + AI Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-1">
                <TeamPanel />
              </div>
              <div className="xl:col-span-2">
                <AIInsights />
              </div>
            </div>

            {/* Data Table */}
            <DataTable />

            {/* Integrations */}
            <Integrations />

            {/* Footer */}
            <div className="pt-2 pb-4 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-white/40">
              <div className="flex items-center gap-3">
                <span>© 2024 Lumen Analytics, Inc.</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">v4.2.1</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All systems operational
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a className="hover:text-white/80 transition cursor-pointer">Privacy</a>
                <a className="hover:text-white/80 transition cursor-pointer">Terms</a>
                <a className="hover:text-white/80 transition cursor-pointer">Status</a>
                <a className="hover:text-white/80 transition cursor-pointer">Docs</a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
