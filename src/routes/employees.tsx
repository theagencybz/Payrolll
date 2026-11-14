import { createFileRoute } from "@tanstack/react-router";
import { Card, Shell } from "@/components/shell";
import { money } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/employees")({ component: People });

function People() {
  const employees = usePayroll((s) => s.employees);
  const bumpRate = usePayroll((s) => s.bumpRate);
  const setLoan = usePayroll((s) => s.setLoan);
  const setNote = usePayroll((s) => s.setNote);

  return (
    <Shell title="People" lede="Rates, loans, contract dates, and a short performance note stay with each person.">
      <div className="grid gap-3">
        {employees.map((e) => (
          <Card key={e.empId}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-2xl">
                  {e.firstName} {e.lastName}
                </p>
                <p className="text-sm text-muted">
                  #{e.empId} · {e.position || "Staff"}
                  {e.contractEnd ? ` · contract ends ${e.contractEnd}` : ""}
                </p>
                <p className="mt-1 text-sm text-muted">
                  TIN {e.tin || "—"} · SSN {e.ssn || "—"}
                </p>
              </div>
              <p className="font-display text-3xl">{money(e.rate)}<span className="text-base text-muted">/hr</span></p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => bumpRate(e.empId, 0.5)}>
                Raise $0.50
              </button>
              <label className="flex min-h-11 items-center gap-2 text-sm">
                Weekly loan
                <input
                  className="w-24 rounded-lg border border-line bg-bg px-2 py-2"
                  type="number"
                  min={0}
                  step="1"
                  value={e.weeklyLoan}
                  onChange={(ev) => setLoan(e.empId, Number(ev.target.value) || 0)}
                />
              </label>
            </div>
            <label className="mt-3 block text-sm">
              <span className="text-muted">Performance / behaviour note</span>
              <textarea
                className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2"
                rows={2}
                value={e.notes}
                onChange={(ev) => setNote(e.empId, ev.target.value)}
                placeholder="What should show on the performance report"
              />
            </label>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
