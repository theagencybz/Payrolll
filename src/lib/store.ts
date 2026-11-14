import { create } from "zustand";
import { SEED_EMPLOYEES, SEED_PUNCHES, spanHours, type Employee, type LeaveKind, type Punch } from "./payroll";

type Role = "admin" | "employee";

type State = {
  employees: Employee[];
  punches: Punch[];
  role: Role;
  portalEmpId: number;
  weekStart: string;
  setRole: (role: Role) => void;
  setPortal: (empId: number) => void;
  setWeek: (weekStart: string) => void;
  bumpRate: (empId: number, delta: number) => void;
  setLoan: (empId: number, weeklyLoan: number) => void;
  setNote: (empId: number, notes: string) => void;
  upsertPunch: (empId: number, date: string, hours: number, kind: LeaveKind, note: string) => void;
  clock: (empId: number, date: string, time: string, source: "clock" | "fingerprint") => "in" | "out";
};

export const usePayroll = create<State>()((set) => ({
  employees: SEED_EMPLOYEES,
  punches: SEED_PUNCHES,
  role: "admin",
  portalEmpId: 105,
  weekStart: "2027-01-04",
  setRole: (role) => set({ role }),
  setPortal: (portalEmpId) => set({ portalEmpId }),
  setWeek: (weekStart) => set({ weekStart }),
  bumpRate: (empId, delta) =>
    set((s) => ({
      employees: s.employees.map((e) =>
        e.empId === empId ? { ...e, rate: Math.max(0, +(e.rate + delta).toFixed(2)) } : e,
      ),
    })),
  setLoan: (empId, weeklyLoan) =>
    set((s) => ({
      employees: s.employees.map((e) => (e.empId === empId ? { ...e, weeklyLoan } : e)),
    })),
  setNote: (empId, notes) =>
    set((s) => ({
      employees: s.employees.map((e) => (e.empId === empId ? { ...e, notes } : e)),
    })),
  upsertPunch: (empId, date, hours, kind, note) =>
    set((s) => {
      const id = `${empId}-${date}`;
      const prev = s.punches.find((p) => p.id === id);
      const next = s.punches.filter((p) => p.id !== id);
      if (hours > 0 || (kind && kind !== "worked")) {
        next.push({ ...prev, id, empId, date, hours, kind, note, source: prev?.source ?? "edit" });
      }
      return { punches: next };
    }),
  clock: (empId, date, time, source) => {
    let action: "in" | "out" = "in";
    set((s) => {
      const id = `${empId}-${date}`;
      const current = s.punches.find((p) => p.id === id);
      const rest = s.punches.filter((p) => p.id !== id);
      if (current?.clockIn && !current.clockOut) {
        action = "out";
        rest.push({ ...current, clockOut: time, hours: spanHours(current.clockIn, time), source, note: source === "fingerprint" ? "Fingerprint clock" : "Time clock" });
      } else {
        action = "in";
        rest.push({
          id,
          empId,
          date,
          hours: 0,
          kind: "worked",
          note: source === "fingerprint" ? "Fingerprint clock" : "Time clock",
          clockIn: time,
          source,
        });
      }
      return { punches: rest };
    });
    return action;
  },
}));
