import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Shell } from "@/components/shell";
import { formatDay, fullName, money, payslipFor, type LeaveKind, weekDays } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/portal")({ component: Portal });

function Portal() {
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const empId = usePayroll((s) => s.portalEmpId);
  const setPortal = usePayroll((s) => s.setPortal);
  const upsert = usePayroll((s) => s.upsertPunch);
  const emp = employees.find((e) => e.empId === empId) ?? employees[0];
  const slip = payslipFor(emp, "2027-01-11", punches);
  const [date, setDate] = useState("2027-01-18");
  const [hours, setHours] = useState(8);
  const [kind, setKind] = useState<LeaveKind>("worked");

  return (
    <Shell title="Staff portal" lede="A second door for the team: see the last payslip, punch a day, and read the note on file. This demo uses a name picker instead of a password.">
      <label className="mb-4 flex flex-col text-sm">
        Signed in as
        <select
          className="mt-1 max-w-sm min-h-11 rounded-xl border border-line bg-surface px-3"
          value={emp.empId}
          onChange={(ev) => setPortal(Number(ev.target.value))}
        >
          {employees.map((e) => (
            <option key={e.empId} value={e.empId}>
              {fullName(e)}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm text-muted">Payslip · week of {formatDay(slip.weekStart)}</p>
          <p className="font-display text-4xl text-good">{money(slip.net)}</p>
          <p className="mt-1 text-sm text-muted">
            Gross {money(slip.gross)} · SSB {money(slip.ssbEmployee)} · PAYE {money(slip.paye)} · loan {money(slip.loan)}
          </p>
          <p className="mt-3 text-sm">{emp.notes || "No performance note on file."}</p>
          {emp.contractEnd ? <p className="mt-2 text-sm text-warn">Contract ends {emp.contractEnd}</p> : null}
        </Card>
        <Card>
          <h2 className="font-display text-2xl">Punch</h2>
          <p className="text-sm text-muted">Week of 18 January is still open.</p>
          <div className="mt-3 grid gap-2">
            <select className="min-h-11 rounded-xl border border-line bg-bg px-3" value={date} onChange={(ev) => setDate(ev.target.value)}>
              {weekDays("2027-01-18").map((d) => (
                <option key={d} value={d}>
                  {formatDay(d)}
                </option>
              ))}
            </select>
            <input
              className="min-h-11 rounded-xl border border-line bg-bg px-3"
              type="number"
              min={0}
              step="0.5"
              value={hours}
              onChange={(ev) => setHours(Number(ev.target.value) || 0)}
            />
            <select className="min-h-11 rounded-xl border border-line bg-bg px-3" value={kind} onChange={(ev) => setKind(ev.target.value as LeaveKind)}>
              <option value="worked">Worked</option>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick</option>
              <option value="gift">Employer paid day</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <button
              type="button"
              className="min-h-11 rounded-full bg-accent font-semibold text-primary-fg"
              onClick={() => upsert(emp.empId, date, hours, kind, kind === "worked" ? "Portal punch" : kind)}
            >
              Save punch
            </button>
          </div>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {punches
              .filter((p) => p.empId === emp.empId && p.date >= "2027-01-18")
              .map((p) => (
                <li key={p.id}>
                  {formatDay(p.date)} · {p.hours}h · {p.kind}
                </li>
              ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}
