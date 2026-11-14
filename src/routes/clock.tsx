import { createFileRoute } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { DEMO_TODAY, formatDay, fullName, hm } from "@/lib/payroll";
import { usePayroll } from "@/lib/store";

export const Route = createFileRoute("/clock")({ component: ClockPage });

function ClockPage() {
  const employees = usePayroll((s) => s.employees);
  const punches = usePayroll((s) => s.punches);
  const role = usePayroll((s) => s.role);
  const portalId = usePayroll((s) => s.portalEmpId);
  const setPortal = usePayroll((s) => s.setPortal);
  const clock = usePayroll((s) => s.clock);
  const [picked, setPicked] = useState(portalId);
  const [now, setNow] = useState("");
  const [message, setMessage] = useState("Tap your name, then clock in or out.");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const tick = () => setNow(hm());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const visible = role === "employee" ? employees.filter((e) => e.empId === portalId) : employees;
  const emp = employees.find((e) => e.empId === (role === "employee" ? portalId : picked)) ?? employees[0];
  const row = punches.find((p) => p.empId === emp.empId && p.date === DEMO_TODAY);
  const open = Boolean(row?.clockIn && !row?.clockOut);

  async function punch(source: "clock" | "fingerprint") {
    if (source === "fingerprint") {
      setBusy(true);
      const check = await deviceFingerprint();
      setBusy(false);
      if (!check.ok) {
        setMessage(check.reason);
        return;
      }
    }
    const action = clock(emp.empId, DEMO_TODAY, hm(), source);
    setPortal(emp.empId);
    setMessage(action === "in" ? `${emp.firstName} clocked in.` : `${emp.firstName} clocked out. Hours are on the timecard.`);
  }

  return (
    <Shell title="Time clock" lede="Same idea as a Kronos clock: one person, one punch. A wall fingerprint reader is not connected. This screen can only ask the phone or laptop you are holding.">
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <section className="rounded-xl border border-line bg-primary px-5 py-6 text-primary-fg">
          <p className="text-sm text-primary-fg/70">{formatDay(DEMO_TODAY)} · business date</p>
          <p className="mt-2 font-display text-6xl tabular-nums">{now || "––:––"}</p>
          <p className="mt-4 text-lg font-semibold">{fullName(emp)}</p>
          <p className="text-sm text-primary-fg/80">{open ? `In since ${row?.clockIn}` : row?.clockOut ? `Done · ${row.clockIn}–${row.clockOut}` : "Not clocked in"}</p>
        </section>
        <section className="rounded-xl border border-line bg-surface p-4">
          {role === "admin" ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {visible.map((e) => {
                const mine = punches.find((p) => p.empId === e.empId && p.date === DEMO_TODAY);
                const state = mine?.clockIn && !mine.clockOut ? "In" : mine?.clockOut ? "Out" : "—";
                const active = e.empId === emp.empId;
                return (
                  <button
                    key={e.empId}
                    type="button"
                    onClick={() => setPicked(e.empId)}
                    className={`min-h-16 rounded-lg border px-3 py-2 text-left ${active ? "border-primary bg-bg" : "border-line"}`}
                  >
                    <span className="block font-semibold">{e.firstName}</span>
                    <span className="text-sm text-muted">{e.lastName} · {state}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted">You are signed in as {fullName(emp)}. A manager can switch people from the Manager view.</p>
          )}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" disabled={open || busy} onClick={() => punch("clock")} className="min-h-14 rounded-lg bg-good text-lg font-semibold text-primary-fg disabled:opacity-40">
              Clock in
            </button>
            <button type="button" disabled={!open || busy} onClick={() => punch("clock")} className="min-h-14 rounded-lg bg-accent text-lg font-semibold text-primary-fg disabled:opacity-40">
              Clock out
            </button>
            <button type="button" disabled={busy} onClick={() => punch("fingerprint")} className="flex min-h-14 items-center justify-center gap-2 rounded-lg border border-line text-base font-semibold sm:col-span-2">
              <Fingerprint className="size-5" />
              {busy ? "Waiting for this device…" : open ? "Clock out with fingerprint" : "Clock in with fingerprint"}
            </button>
          </div>
          <p className="mt-3 text-sm text-muted">{message}</p>
        </section>
      </div>
    </Shell>
  );
}

async function deviceFingerprint(): Promise<{ ok: boolean; reason: string }> {
  if (typeof window === "undefined" || !window.PublicKeyCredential) {
    return { ok: false, reason: "This browser cannot use a fingerprint sensor. Use Clock in, or a real time clock with a reader." };
  }
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    await navigator.credentials.get({
      publicKey: {
        challenge,
        timeout: 30000,
        userVerification: "required",
        rpId: window.location.hostname,
      },
    });
    return { ok: true, reason: "" };
  } catch {
    return {
      ok: false,
      reason: "Fingerprint was not accepted. The preview often blocks the sensor. A shop-floor reader would plug into the clock, not this page.",
    };
  }
}
