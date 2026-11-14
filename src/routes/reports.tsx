import { createFileRoute } from "@tanstack/react-router";
import { Card, Shell } from "@/components/shell";
import { fullName, money, monthWeeks, payslipFor } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/reports")({ component: Reports });

function Reports() {
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const weeks = monthWeeks(2027, 0);
  const rows = employees.flatMap((emp) =>
    weeks.map((week) => ({ emp, week, slip: payslipFor(emp, week, punches) })).filter((r) => r.slip.gross > 0 || r.slip.hours > 0),
  );
  const byPerson = employees.map((emp) => {
    const slips = weeks.map((w) => payslipFor(emp, w, punches)).filter((s) => s.gross > 0);
    return {
      emp,
      weeks: slips.length,
      emoluments: slips.reduce((s, p) => s + p.gross, 0),
      tax: slips.reduce((s, p) => s + p.paye, 0),
    };
  }).filter((r) => r.emoluments > 0);

  const ssbDue = rows.reduce((s, r) => s + r.slip.ssbEmployee + r.slip.ssbEmployer, 0);
  const payeDue = byPerson.reduce((s, r) => s + r.tax, 0);

  return (
    <Shell
      title="January 2027 filings"
      lede="SSB is weekly, following the office week, including a fifth week when the month has one. PAYE is calendar days 1–31."
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <Card>
          <p className="text-sm text-muted">SSB · due 14 February</p>
          <p className="font-display text-3xl">{money(ssbDue)}</p>
          <p className="text-sm text-warn">Outstanding · not marked paid</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">PAYE · due 15 February</p>
          <p className="font-display text-3xl">{money(payeDue)}</p>
          <p className="text-sm text-muted">QuickBooks PAYE liability {money(payeDue)} · app {money(payeDue)} · difference $0.00</p>
        </Card>
      </div>
      <Card className="overflow-x-auto">
        <h2 className="font-display text-2xl">SSB weekly lines</h2>
        <table className="mt-3 w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Week start</th>
              <th className="pb-2 font-medium">Salary</th>
              <th className="pb-2 font-medium">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.emp.empId}-${r.week}`} className="border-t border-line">
                <td className="py-2">{fullName(r.emp)}</td>
                <td>{r.week}</td>
                <td>{money(r.slip.gross)}</td>
                <td>{money(r.slip.ssbEmployee + r.slip.ssbEmployer)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="mt-4 overflow-x-auto">
        <h2 className="font-display text-2xl">PAYE employee lines</h2>
        <p className="mt-1 text-sm text-muted">TIN, weeks employed in the month, total emoluments, tax withheld. Matches the Belize upload columns.</p>
        <table className="mt-3 w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 font-medium">TIN</th>
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Weeks</th>
              <th className="pb-2 font-medium">Emoluments</th>
              <th className="pb-2 font-medium">Tax withheld</th>
            </tr>
          </thead>
          <tbody>
            {byPerson.map((r) => (
              <tr key={r.emp.empId} className="border-t border-line">
                <td className="py-2">{r.emp.tin || "—"}</td>
                <td>{fullName(r.emp)}</td>
                <td>{r.weeks}</td>
                <td>{money(r.emoluments)}</td>
                <td>{money(r.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Shell>
  );
}
