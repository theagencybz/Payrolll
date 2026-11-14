import { createFileRoute } from "@tanstack/react-router";
import { Card, Shell } from "@/components/shell";
import { DEMO_WEEKS, formatDay, fullName, money, payslipFor } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/payroll")({ component: Payroll });

function Payroll() {
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const weekStart = usePayroll((s) => s.weekStart);
  const setWeek = usePayroll((s) => s.setWeek);
  const [advice, setAdvice] = useState<number | null>(null);
  const slips = employees.map((e) => ({ emp: e, slip: payslipFor(e, weekStart, punches) }));
  const totals = slips.reduce(
    (a, { slip }) => ({
      gross: a.gross + slip.gross,
      ssb: a.ssb + slip.ssbEmployee,
      er: a.er + slip.ssbEmployer,
      paye: a.paye + slip.paye,
      loan: a.loan + slip.loan,
      net: a.net + slip.net,
    }),
    { gross: 0, ssb: 0, er: 0, paye: 0, loan: 0, net: 0 },
  );
  const open = slips.find((s) => s.emp.empId === advice);

  return (
    <Shell title="Pay period" lede="Review the week, then open a payment advice. SSB bands and 2025 PAYE run on these hours.">
      <div className="mb-4 flex flex-wrap gap-2">
        {DEMO_WEEKS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWeek(w)}
            className={`min-h-11 rounded-full px-4 text-sm ${w === weekStart ? "bg-primary text-primary-fg" : "border border-line bg-surface"}`}
          >
            {formatDay(w)}
          </button>
        ))}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 font-medium">Person</th>
              <th className="pb-2 font-medium">Hours</th>
              <th className="pb-2 font-medium">Gross</th>
              <th className="pb-2 font-medium">SSB</th>
              <th className="pb-2 font-medium">PAYE</th>
              <th className="pb-2 font-medium">Loan</th>
              <th className="pb-2 font-medium">Net</th>
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {slips.map(({ emp, slip }) => (
              <tr key={emp.empId} className="border-t border-line">
                <td className="py-3">
                  <span className="font-semibold">{fullName(emp)}</span>
                  <span className="block text-xs text-muted">{slip.ssbBand}</span>
                </td>
                <td>{slip.paidHours}</td>
                <td>{money(slip.gross)}</td>
                <td>{money(slip.ssbEmployee)}</td>
                <td>{money(slip.paye)}</td>
                <td>{money(slip.loan)}</td>
                <td className="font-semibold text-good">{money(slip.net)}</td>
                <td>
                  <button type="button" className="min-h-11 text-sm font-semibold text-accent" onClick={() => setAdvice(emp.empId)}>
                    Advice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-line font-semibold">
              <td className="py-3">Week total</td>
              <td />
              <td>{money(totals.gross)}</td>
              <td>{money(totals.ssb)}</td>
              <td>{money(totals.paye)}</td>
              <td>{money(totals.loan)}</td>
              <td>{money(totals.net)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
        <p className="mt-3 text-sm text-muted">Employer SSB this week {money(totals.er)}. That is not deducted from staff.</p>
      </Card>
      {open ? (
        <Card className="mt-4">
          <p className="text-xs uppercase tracking-wide text-muted">Payment advice · ready to email</p>
          <h2 className="font-display text-3xl">
            {fullName(open.emp)} · {formatDay(open.slip.weekStart)} to {formatDay(open.slip.weekEnd)}
          </h2>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <Row k="Regular pay" v={money(open.slip.regularPay)} />
            <Row k="Overtime" v={money(open.slip.otPay)} />
            <Row k="Gross" v={money(open.slip.gross)} />
            <Row k="SSB employee" v={money(open.slip.ssbEmployee)} />
            <Row k="PAYE" v={money(open.slip.paye)} />
            <Row k="Loan" v={money(open.slip.loan)} />
            <Row k="Net pay" v={money(open.slip.net)} />
          </dl>
          <p className="mt-3 text-sm text-muted">{open.slip.payeNote}</p>
          <p className="mt-2 text-sm">To: {open.emp.firstName.toLowerCase()}@theagency.bz · From: payroll@theagency.bz</p>
        </Card>
      ) : null}
    </Shell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-line py-2">
      <dt className="text-muted">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
