import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { DEMO_WEEKS, formatDay, fullName, type LeaveKind, payslipFor, weekDays } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/timesheet")({ component: Timecards });

const KINDS: LeaveKind[] = ["worked", "vacation", "sick", "gift", "unpaid"];

function Timecards() {
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const role = usePayroll((s) => s.role);
  const weekStart = usePayroll((s) => s.weekStart);
  const setWeek = usePayroll((s) => s.setWeek);
  const portalId = usePayroll((s) => s.portalEmpId);
  const setPortal = usePayroll((s) => s.setPortal);
  const upsert = usePayroll((s) => s.upsertPunch);
  const days = weekDays(weekStart);
  const list = role === "employee" ? employees.filter((e) => e.empId === portalId) : employees;
  const focus = list.find((e) => e.empId === portalId) ?? list[0];

  return (
    <Shell wide title={role === "employee" ? "My timecard" : "Timecards"} lede="One row per day. Hours over 9, or a clock-in with no clock-out, show as exceptions.">
      <div className="mb-4 flex flex-wrap gap-2">
        {DEMO_WEEKS.map((w) => (
          <button key={w} type="button" onClick={() => setWeek(w)} className={`min-h-11 rounded-lg px-3 text-sm ${w === weekStart ? "bg-primary text-primary-fg" : "border border-line bg-surface"}`}>
            {formatDay(w)}
          </button>
        ))}
      </div>
      {role === "admin" ? (
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {employees.map((e) => (
            <button key={e.empId} type="button" onClick={() => setPortal(e.empId)} className={`min-h-11 shrink-0 rounded-lg px-3 text-sm ${e.empId === focus.empId ? "bg-ink text-primary-fg" : "bg-surface border border-line"}`}>
              {e.firstName}
            </button>
          ))}
        </div>
      ) : null}
      {focus ? <CardRow empId={focus.empId} name={fullName(focus)} days={days} punches={punches} weekStart={weekStart} upsert={upsert} /> : null}
    </Shell>
  );
}

function CardRow({
  empId,
  name,
  days,
  punches,
  weekStart,
  upsert,
}: {
  empId: number;
  name: string;
  days: string[];
  punches: ReturnType<typeof usePayroll.getState>["punches"];
  weekStart: string;
  upsert: (empId: number, date: string, hours: number, kind: LeaveKind, note: string) => void;
}) {
  const employees = usePayroll((s) => s.employees);
  const emp = employees.find((e) => e.empId === empId)!;
  const slip = payslipFor(emp, weekStart, punches);
  return (
    <section className="overflow-x-auto rounded-xl border border-line bg-surface">
      <div className="flex items-baseline justify-between px-4 py-3">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-muted">{slip.paidHours} paid hours · {slip.otHours ? `${slip.otHours} overtime` : "no overtime"}</p>
      </div>
      <table className="w-full min-w-[720px] text-sm">
        <thead className="text-left text-muted">
          <tr className="border-t border-line">
            <th className="px-4 py-2 font-medium">Day</th>
            <th className="px-2 py-2 font-medium">In</th>
            <th className="px-2 py-2 font-medium">Out</th>
            <th className="px-2 py-2 font-medium">Hours</th>
            <th className="px-2 py-2 font-medium">Pay code</th>
            <th className="px-4 py-2 font-medium">Exception</th>
          </tr>
        </thead>
        <tbody>
          {days.map((date) => {
            const row = punches.find((p) => p.empId === empId && p.date === date);
            const hours = row?.hours ?? 0;
            const open = Boolean(row?.clockIn && !row?.clockOut);
            const long = hours > 9;
            const flag = open ? "Missing clock-out" : long ? "Long day" : row?.kind === "unpaid" ? "Unpaid" : "";
            return (
              <tr key={date} className="border-t border-line">
                <td className="px-4 py-2">{formatDay(date)}</td>
                <td className="px-2 py-2 tabular-nums">{row?.clockIn ?? "—"}</td>
                <td className="px-2 py-2 tabular-nums">{row?.clockOut ?? "—"}</td>
                <td className="px-2 py-2">
                  <input
                    aria-label={`Hours ${date}`}
                    className="w-20 rounded-md border border-line bg-bg px-2 py-2"
                    type="number"
                    min={0}
                    step="0.25"
                    value={hours}
                    onChange={(ev) => upsert(empId, date, Number(ev.target.value) || 0, row?.kind ?? "worked", row?.note ?? "")}
                  />
                </td>
                <td className="px-2 py-2">
                  <select
                    aria-label={`Pay code ${date}`}
                    className="min-h-11 rounded-md border border-line bg-bg px-2"
                    value={row?.kind ?? "worked"}
                    onChange={(ev) => upsert(empId, date, hours, ev.target.value as LeaveKind, row?.note ?? "")}
                  >
                    {KINDS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </td>
                <td className={`px-4 py-2 ${flag ? "text-warn" : "text-muted"}`}>{flag || "OK"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
