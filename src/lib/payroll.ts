export type LeaveKind = "worked" | "vacation" | "sick" | "gift" | "unpaid";

export type Employee = {
  empId: number;
  firstName: string;
  lastName: string;
  position: string;
  rate: number;
  tin: string;
  ssn: string;
  weeklyLoan: number;
  contractEnd: string;
  notes: string;
};

export type Punch = {
  id: string;
  empId: number;
  date: string;
  hours: number;
  kind: LeaveKind;
  note: string;
  clockIn?: string;
  clockOut?: string;
  source?: "clock" | "fingerprint" | "edit";
};

export const STANDARD_WEEK = 45;
export const SSB_MIN_HOURS = 8;
export const PAYE_WEEKLY_TRIGGER = 567;
export const PAYE_THRESHOLD = 29000;
export const PAYE_RELIEF = 20000;
export const PAYE_UPPER = 32000;
export const PAYE_RATE = 0.25;

export const SSB_BANDS = [
  { min: 0.01, max: 69.99, employee: 1.03, employer: 4.47 },
  { min: 70, max: 109.99, employee: 1.69, employer: 7.31 },
  { min: 110, max: 139.99, employee: 2.44, employer: 10.56 },
  { min: 140, max: 179.99, employee: 3.94, employer: 12.06 },
  { min: 180, max: 219.99, employee: 5.94, employer: 14.06 },
  { min: 220, max: 259.99, employee: 7.94, employer: 16.06 },
  { min: 260, max: 299.99, employee: 9.94, employer: 18.06 },
  { min: 300, max: 339.99, employee: 11.94, employer: 20.06 },
  { min: 340, max: 379.99, employee: 13.98, employer: 22.02 },
  { min: 380, max: 419.99, employee: 16.15, employer: 23.85 },
  { min: 420, max: 459.99, employee: 18.45, employer: 25.55 },
  { min: 460, max: 499.99, employee: 20.86, employer: 27.14 },
  { min: 500, max: 1_000_000_000, employee: 23.4, employer: 28.6 },
] as const;

export const SEED_EMPLOYEES: Employee[] = [
  { empId: 105, firstName: "Abraham", lastName: "Tun", position: "Account Representative", rate: 12, tin: "", ssn: "", weeklyLoan: 0, contractEnd: "", notes: "" },
  { empId: 106, firstName: "Erick", lastName: "Santos", position: "Lead Graphic Designer", rate: 10, tin: "", ssn: "", weeklyLoan: 0, contractEnd: "", notes: "" },
  { empId: 108, firstName: "Trisha", lastName: "Garcia", position: "Graphic Designer", rate: 7.5, tin: "355085", ssn: "000329312", weeklyLoan: 0, contractEnd: "", notes: "" },
  { empId: 109, firstName: "Georgina", lastName: "Leiva", position: "Video Editor & Graphic Designer", rate: 7.5, tin: "", ssn: "", weeklyLoan: 0, contractEnd: "", notes: "" },
  { empId: 110, firstName: "Veronica", lastName: "Vellos", position: "Cleaner", rate: 10, tin: "364607", ssn: "000333546", weeklyLoan: 0, contractEnd: "", notes: "" },
  { empId: 112, firstName: "Roberto", lastName: "Beltran", position: "Video Editor", rate: 7.5, tin: "", ssn: "", weeklyLoan: 0, contractEnd: "2027-06-30", notes: "Temporary contract" },
  { empId: 113, firstName: "Priscilla", lastName: "Acosta", position: "Video Editor", rate: 7.5, tin: "159694", ssn: "000173167", weeklyLoan: 25, contractEnd: "", notes: "Weekly tool loan" },
];

function punch(empId: number, date: string, hours: number, kind: LeaveKind = "worked", note = ""): Punch {
  return { id: `${empId}-${date}`, empId, date, hours, kind, note };
}

export const SEED_PUNCHES: Punch[] = [
  punch(105, "2027-01-04", 8), punch(105, "2027-01-05", 8), punch(105, "2027-01-06", 5.5), punch(105, "2027-01-07", 8), punch(105, "2027-01-08", 7), punch(105, "2027-01-09", 5),
  punch(106, "2027-01-04", 8, "vacation", "Yr 2: Vac. Day"), punch(106, "2027-01-05", 8), punch(106, "2027-01-06", 5), punch(106, "2027-01-07", 8),
  punch(108, "2027-01-04", 6.5), punch(108, "2027-01-05", 7.5), punch(108, "2027-01-06", 8, "vacation", "Yr 2: Vac. Day"), punch(108, "2027-01-07", 8), punch(108, "2027-01-08", 8, "vacation", "Yr 2: Vac. Day"),
  punch(109, "2027-01-04", 6.5), punch(109, "2027-01-05", 6.5), punch(109, "2027-01-06", 5), punch(109, "2027-01-07", 8), punch(109, "2027-01-08", 8, "vacation", "Yr 1: Vac. Day"),
  punch(110, "2027-01-04", 5.5), punch(110, "2027-01-05", 4.5), punch(110, "2027-01-08", 5.5),
  punch(112, "2027-01-04", 8), punch(112, "2027-01-05", 8), punch(112, "2027-01-06", 8), punch(112, "2027-01-07", 8),
  punch(113, "2027-01-04", 6), punch(113, "2027-01-05", 6), punch(113, "2027-01-07", 6), punch(113, "2027-01-08", 6),
  punch(105, "2027-01-11", 8), punch(105, "2027-01-12", 8), punch(105, "2027-01-13", 8.5), punch(105, "2027-01-14", 9), punch(105, "2027-01-15", 8),
  punch(106, "2027-01-11", 8, "vacation", "Yr 2: Vac. Day"), punch(106, "2027-01-13", 9), punch(106, "2027-01-14", 9), punch(106, "2027-01-15", 9),
  punch(108, "2027-01-11", 8), punch(108, "2027-01-12", 8, "vacation", "Yr 2: Vac. Day"), punch(108, "2027-01-13", 8), punch(108, "2027-01-14", 8), punch(108, "2027-01-15", 8),
  punch(109, "2027-01-11", 8, "vacation", "Yr 1: Vac. Day"), punch(109, "2027-01-12", 8), punch(109, "2027-01-13", 8, "vacation", "Yr 1: Vac. Day"), punch(109, "2027-01-14", 6), punch(109, "2027-01-15", 8),
  punch(110, "2027-01-12", 6), punch(110, "2027-01-13", 5), punch(110, "2027-01-15", 6),
  punch(112, "2027-01-11", 8), punch(112, "2027-01-12", 8), punch(112, "2027-01-13", 8), punch(112, "2027-01-14", 8), punch(112, "2027-01-15", 8),
  punch(113, "2027-01-11", 8), punch(113, "2027-01-12", 8), punch(113, "2027-01-14", 8), punch(113, "2027-01-15", 8),
];

export const DEMO_TODAY = "2027-01-18";
export const DEMO_WEEKS = ["2027-01-04", "2027-01-11", "2027-01-18", "2027-01-25"] as const;

export function spanHours(clockIn: string, clockOut: string) {
  const [ih, im] = clockIn.split(":").map(Number);
  const [oh, om] = clockOut.split(":").map(Number);
  let mins = oh * 60 + om - (ih * 60 + im);
  if (mins < 0) mins += 24 * 60;
  return Math.round((mins / 60) * 4) / 4;
}

export function hm(date = new Date()) {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function money(n: number) {
  return new Intl.NumberFormat("en-BZ", { style: "currency", currency: "BZD", minimumFractionDigits: 2 }).format(n);
}

export function mondayOf(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function weekDays(weekStart: string) {
  return Array.from({ length: 6 }, (_, i) => addDays(weekStart, i));
}

export function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function fullName(e: Employee) {
  return `${e.firstName} ${e.lastName}`;
}

export function paidHours(kind: LeaveKind) {
  return kind !== "unpaid";
}

export function ssbFor(weeklyGross: number, hours: number) {
  if (hours < SSB_MIN_HOURS || weeklyGross <= 0) {
    return { employee: 0, employer: 0, total: 0, band: "Not triggered" };
  }
  const band = SSB_BANDS.find((b) => weeklyGross >= b.min && weeklyGross <= b.max) ?? SSB_BANDS[SSB_BANDS.length - 1];
  return {
    employee: band.employee,
    employer: band.employer,
    total: +(band.employee + band.employer).toFixed(2),
    band: band.max >= 1_000_000 ? `${band.min}+` : `${band.min}–${band.max}`,
  };
}

export function payeFor(weeklyGross: number) {
  if (weeklyGross <= PAYE_WEEKLY_TRIGGER) {
    return { tax: 0, note: "At or under weekly $567 — no PAYE" };
  }
  const annual = weeklyGross * 52;
  if (annual <= PAYE_THRESHOLD) {
    return { tax: 0, note: "Projected annual at or under $29,000" };
  }
  const chargeable = Math.max(0, annual - PAYE_RELIEF);
  let taxAnnual = chargeable * PAYE_RATE;
  let note = `Above $32,000: $20,000 relief, then ${PAYE_RATE * 100}%`;
  if (annual <= PAYE_UPPER) {
    const maxTax = annual - PAYE_THRESHOLD;
    if (taxAnnual > maxTax) {
      taxAnnual = maxTax;
      note = "$29,001–$32,000: relief plus credit so net stays at least $29,000";
    } else {
      note = "$29,001–$32,000: $20,000 relief, then 25%";
    }
  }
  return { tax: Math.round((taxAnnual / 52) * 100) / 100, note };
}

export type Payslip = {
  empId: number;
  weekStart: string;
  weekEnd: string;
  hours: number;
  paidHours: number;
  otHours: number;
  regularPay: number;
  otPay: number;
  gross: number;
  ssbEmployee: number;
  ssbEmployer: number;
  loan: number;
  paye: number;
  net: number;
  payeNote: string;
  ssbBand: string;
};

export function payslipFor(emp: Employee, weekStart: string, punches: Punch[]): Payslip {
  const days = new Set(weekDays(weekStart));
  const mine = punches.filter((p) => p.empId === emp.empId && days.has(p.date));
  const hours = mine.reduce((s, p) => s + p.hours, 0);
  const payable = mine.filter((p) => paidHours(p.kind)).reduce((s, p) => s + p.hours, 0);
  const regular = Math.min(payable, STANDARD_WEEK);
  const ot = Math.max(0, payable - STANDARD_WEEK);
  const regularPay = +(regular * emp.rate).toFixed(2);
  const otPay = +(ot * emp.rate * 1.5).toFixed(2);
  const gross = +(regularPay + otPay).toFixed(2);
  const ssb = ssbFor(gross, payable);
  const paye = payeFor(gross);
  const loan = gross > 0 ? emp.weeklyLoan : 0;
  const net = +(gross - ssb.employee - paye.tax - loan).toFixed(2);
  return {
    empId: emp.empId,
    weekStart,
    weekEnd: addDays(weekStart, 6),
    hours,
    paidHours: payable,
    otHours: ot,
    regularPay,
    otPay,
    gross,
    ssbEmployee: ssb.employee,
    ssbEmployer: ssb.employer,
    loan,
    paye: paye.tax,
    net,
    payeNote: paye.note,
    ssbBand: ssb.band,
  };
}

export function monthWeeks(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const weeks: string[] = [];
  const cursor = new Date(first);
  const day = cursor.getDay();
  cursor.setDate(cursor.getDate() + (day === 0 ? -6 : 1 - day));
  while (cursor <= last) {
    const iso = cursor.toISOString().slice(0, 10);
    const end = addDays(iso, 6);
    if (end >= `${year}-${String(monthIndex + 1).padStart(2, "0")}-01` && iso <= last.toISOString().slice(0, 10)) {
      weeks.push(iso);
    }
    cursor.setDate(cursor.getDate() + 7);
  }
  return weeks;
}
