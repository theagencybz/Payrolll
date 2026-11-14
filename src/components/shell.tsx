import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarRange, Clock3, FileSpreadsheet, LayoutDashboard, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { usePayroll } from "@/lib/store";

const OFFICE = [
  { to: "/", label: "Today", icon: LayoutDashboard },
  { to: "/clock", label: "Time clock", icon: Clock3 },
  { to: "/timesheet", label: "Timecards", icon: CalendarRange },
  { to: "/payroll", label: "Pay period", icon: Wallet },
  { to: "/employees", label: "People", icon: Users },
  { to: "/reports", label: "Filings", icon: FileSpreadsheet },
] as const;

const STAFF = [
  { to: "/clock", label: "Time clock", icon: Clock3 },
  { to: "/timesheet", label: "My timecard", icon: CalendarRange },
  { to: "/portal", label: "My pay", icon: Wallet },
] as const;

export function Shell({ title, lede, children, wide = false }: { title: string; lede?: string; children: ReactNode; wide?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const role = usePayroll((s) => s.role);
  const setRole = usePayroll((s) => s.setRole);
  const items = role === "admin" ? OFFICE : STAFF;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-xl leading-none">The Agency</p>
          <p className="text-xs text-muted">Pay period 4–31 Jan 2027</p>
        </div>
        <div className="flex rounded-full border border-line p-1 text-sm">
          <button type="button" className={`min-h-11 rounded-full px-3 ${role === "admin" ? "bg-primary text-primary-fg" : ""}`} onClick={() => setRole("admin")}>
            Manager
          </button>
          <button type="button" className={`min-h-11 rounded-full px-3 ${role === "employee" ? "bg-primary text-primary-fg" : ""}`} onClick={() => setRole("employee")}>
            Staff
          </button>
        </div>
      </header>
      <div className="md:grid md:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 py-2 md:block md:min-h-[calc(100vh-57px)] md:border-r md:border-b-0 md:px-2 md:py-4">
          {items.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm ${active ? "bg-primary text-primary-fg" : "text-ink hover:bg-bg"}`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="px-4 py-5 md:px-8 md:py-6">
          <div className={wide ? "" : "max-w-5xl"}>
            <h1 className="font-display text-3xl tracking-tight">{title}</h1>
            {lede ? <p className="mt-1 max-w-2xl text-sm text-muted">{lede}</p> : null}
            <div className="mt-5">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-line bg-surface p-4 ${className}`}>{children}</section>;
}
