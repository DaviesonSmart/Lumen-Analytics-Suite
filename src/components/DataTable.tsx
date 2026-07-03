import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CUSTOMERS } from "../lib/data";
import { formatCurrency } from "../lib/utils";
import {
  Search,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  Download,
  Plus,
} from "lucide-react";

type SortKey = "name" | "company" | "revenue" | "status" | "plan" | "lastActive";
type SortDir = "asc" | "desc";

const statusMap: Record<string, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-white/[0.04] text-white/55 border-white/[0.1]",
  },
};

const planMap: Record<string, { className: string }> = {
  Enterprise: { className: "bg-violet-500/12 text-violet-300 border-violet-500/25" },
  Pro: { className: "bg-cyan-500/12 text-cyan-300 border-cyan-500/25" },
  Starter: { className: "bg-white/[0.04] text-white/65 border-white/[0.1]" },
};

export function DataTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
    );
  }, [search]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const toggleRow = (id: number) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    if (selectedRows.size === sorted.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sorted.map((c) => c.id)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-white/[0.05]">
        <div>
          <h3 className="text-[15px] font-semibold text-white tracking-tight">Top Customers</h3>
          <p className="text-[11.5px] text-white/40 mt-0.5">
            {sorted.length} of {CUSTOMERS.length} customers ·{" "}
            <span className="text-white/65">
              {formatCurrency(sorted.reduce((s, c) => s + c.revenue, 0))} total
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="h-8 pl-8 pr-3 w-[200px] rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12px] text-white/90 placeholder:text-white/30 outline-none focus:bg-white/[0.05] focus:border-violet-400/40 transition"
            />
          </div>
          <button className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-[11.5px] text-white/65 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition">
            <Filter size={12} />
            Filter
          </button>
          <button className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-[11.5px] text-white/65 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition">
            <Download size={12} />
            Export
          </button>
          <button className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-[11.5px] text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 shadow-lg shadow-violet-500/25 transition">
            <Plus size={12} strokeWidth={2.5} />
            Add customer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="px-5 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.size === sorted.length && sorted.length > 0}
                  onChange={toggleAll}
                  className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] text-violet-500 focus:ring-violet-500/30 cursor-pointer accent-violet-500"
                />
              </th>
              <SortHeader label="Customer" sortKey="name" current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortHeader label="Company" sortKey="company" current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortHeader label="Revenue" sortKey="revenue" current={sortKey} dir={sortDir} onSort={handleSort} align="right" />
              <SortHeader label="Status" sortKey="status" current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortHeader label="Plan" sortKey="plan" current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortHeader label="Last Active" sortKey="lastActive" current={sortKey} dir={sortDir} onSort={handleSort} />
              <th className="px-5 py-3 w-12 text-right text-[10.5px] font-medium uppercase tracking-wider text-white/40">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const status = statusMap[c.status];
              const plan = planMap[c.plan];
              return (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 + i * 0.03 }}
                  className="group border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition"
                >
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(c.id)}
                      onChange={() => toggleRow(c.id)}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] text-violet-500 focus:ring-violet-500/30 cursor-pointer accent-violet-500"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-8 w-8 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-[10.5px] font-semibold text-white shrink-0`}
                      >
                        {c.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-medium text-white/90 truncate">
                          {c.name}
                        </div>
                        <div className="text-[10.5px] text-white/40 truncate">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px]">{c.country}</span>
                      <span className="text-[12px] text-white/80">{c.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="text-[12.5px] font-semibold text-white tabular-nums">
                      {formatCurrency(c.revenue)}
                    </div>
                    <div className="text-[10.5px] text-emerald-300 tabular-nums">+12.4%</div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10.5px] font-medium ${status.className}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10.5px] font-medium ${plan.className}`}
                    >
                      {c.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[11.5px] text-white/55">{c.lastActive}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="h-7 w-7 rounded-md flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.05] transition opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
        <div className="text-[11.5px] text-white/45">
          {selectedRows.size > 0 ? (
            <>
              <span className="text-violet-300 font-medium">{selectedRows.size}</span> selected ·{" "}
              <button className="text-white/65 hover:text-white">Bulk actions</button>
            </>
          ) : (
            <>Showing 1-{sorted.length} of {CUSTOMERS.length} results</>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="h-7 px-2.5 rounded-md text-[11px] text-white/55 hover:text-white hover:bg-white/[0.05] transition">
            Previous
          </button>
          <button className="h-7 w-7 rounded-md text-[11px] text-white bg-white/[0.05] border border-white/[0.08]">
            1
          </button>
          <button className="h-7 w-7 rounded-md text-[11px] text-white/55 hover:text-white hover:bg-white/[0.05] transition">
            2
          </button>
          <button className="h-7 w-7 rounded-md text-[11px] text-white/55 hover:text-white hover:bg-white/[0.05] transition">
            3
          </button>
          <span className="text-white/30 px-1">…</span>
          <button className="h-7 px-2.5 rounded-md text-[11px] text-white/55 hover:text-white hover:bg-white/[0.05] transition">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SortHeader({
  label,
  sortKey,
  current,
  dir,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (k: SortKey) => void;
  align?: "left" | "right";
}) {
  const isActive = current === sortKey;
  return (
    <th className={`px-5 py-3 ${align === "right" ? "text-right" : ""}`}>
      <button
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-wider transition ${
          isActive ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        {label}
        {isActive ? (
          dir === "asc" ? (
            <ChevronUp size={11} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={11} strokeWidth={2.5} />
          )
        ) : (
          <ArrowUpDown size={11} className="opacity-50" />
        )}
      </button>
    </th>
  );
}
