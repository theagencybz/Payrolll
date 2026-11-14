import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/shell";
import { DEMO_TODAY, fullName, money, payslipFor } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Today });

function Today() {
  const role = usePayroll((s) => s.role);
  const navigate = useNavigate();
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const slips = employees.map((e) => payslipFor(e, "2027-01-11", punches));
  const missing = employees.filter((e) => !punches.some((p) => p.empId === e.empId && p.date === "2027-01-09" && p.hours > 0));
  const onClock = punches.filter((p) => p.date === DEMO_TODAY && p.clockIn && !p.clockOut);

  useEffect(() => {
    if (role === "employee") navigate({ to: "/clock" });
  }, [role, navigate]);

  return (
    <Shell title="Today" lede="Business date is Monday 18 January 2027. Fix exceptions before you close the period.">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile label="On the clock" value={String(onClock.length)} />
        <Tile label="No Saturday 9 Jan" value={String(missing.length)} warn={missing.length > 0} />
        <Tile label="Last closed week net" value={money(slips.reduce((s, p) => s + p.net, 0))} />
      </div>
      <section className="mt-5 overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-semibold">Who needs a look</h2>
          <Link to="/timesheet" className="text-sm font-semibold text-primary">Open timecards</Link>
        </div>
        <ul>
          {missing.map((e) => (
            <li key={e.empId} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0">
              <span>
                <span className="font-medium">{fullName(e)}</span>
                <span className="block text-sm text-muted">{e.position}</span>
              </span>
              <span className="rounded-full bg-bg px-3 py-1 text-sm text-warn">No Friday punch</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/clock" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg">Open time clock</Link>
        <Link to="/payroll" className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold">Review pay period</Link>
      </div>
    </Shell>
  );
}

function Tile({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 font-display text-3xl ${warn ? "text-warn" : ""}`}>{value}</p>
    </div>
  );
}
