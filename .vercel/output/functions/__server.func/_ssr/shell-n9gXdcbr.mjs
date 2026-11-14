import { C as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as CalendarRange, i as LayoutDashboard, n as Users, o as FileSpreadsheet, s as Clock3, t as Wallet } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-n9gXdcbr.js
var import_jsx_runtime = require_jsx_runtime();
var PAYE_THRESHOLD = 29e3;
var PAYE_RELIEF = 2e4;
var PAYE_RATE = .25;
var SSB_BANDS = [
	{
		min: .01,
		max: 69.99,
		employee: 1.03,
		employer: 4.47
	},
	{
		min: 70,
		max: 109.99,
		employee: 1.69,
		employer: 7.31
	},
	{
		min: 110,
		max: 139.99,
		employee: 2.44,
		employer: 10.56
	},
	{
		min: 140,
		max: 179.99,
		employee: 3.94,
		employer: 12.06
	},
	{
		min: 180,
		max: 219.99,
		employee: 5.94,
		employer: 14.06
	},
	{
		min: 220,
		max: 259.99,
		employee: 7.94,
		employer: 16.06
	},
	{
		min: 260,
		max: 299.99,
		employee: 9.94,
		employer: 18.06
	},
	{
		min: 300,
		max: 339.99,
		employee: 11.94,
		employer: 20.06
	},
	{
		min: 340,
		max: 379.99,
		employee: 13.98,
		employer: 22.02
	},
	{
		min: 380,
		max: 419.99,
		employee: 16.15,
		employer: 23.85
	},
	{
		min: 420,
		max: 459.99,
		employee: 18.45,
		employer: 25.55
	},
	{
		min: 460,
		max: 499.99,
		employee: 20.86,
		employer: 27.14
	},
	{
		min: 500,
		max: 1e9,
		employee: 23.4,
		employer: 28.6
	}
];
var SEED_EMPLOYEES = [
	{
		empId: 105,
		firstName: "Abraham",
		lastName: "Tun",
		position: "Account Representative",
		rate: 12,
		tin: "",
		ssn: "",
		weeklyLoan: 0,
		contractEnd: "",
		notes: ""
	},
	{
		empId: 106,
		firstName: "Erick",
		lastName: "Santos",
		position: "Lead Graphic Designer",
		rate: 10,
		tin: "",
		ssn: "",
		weeklyLoan: 0,
		contractEnd: "",
		notes: ""
	},
	{
		empId: 108,
		firstName: "Trisha",
		lastName: "Garcia",
		position: "Graphic Designer",
		rate: 7.5,
		tin: "355085",
		ssn: "000329312",
		weeklyLoan: 0,
		contractEnd: "",
		notes: ""
	},
	{
		empId: 109,
		firstName: "Georgina",
		lastName: "Leiva",
		position: "Video Editor & Graphic Designer",
		rate: 7.5,
		tin: "",
		ssn: "",
		weeklyLoan: 0,
		contractEnd: "",
		notes: ""
	},
	{
		empId: 110,
		firstName: "Veronica",
		lastName: "Vellos",
		position: "Cleaner",
		rate: 10,
		tin: "364607",
		ssn: "000333546",
		weeklyLoan: 0,
		contractEnd: "",
		notes: ""
	},
	{
		empId: 112,
		firstName: "Roberto",
		lastName: "Beltran",
		position: "Video Editor",
		rate: 7.5,
		tin: "",
		ssn: "",
		weeklyLoan: 0,
		contractEnd: "2027-06-30",
		notes: "Temporary contract"
	},
	{
		empId: 113,
		firstName: "Priscilla",
		lastName: "Acosta",
		position: "Video Editor",
		rate: 7.5,
		tin: "159694",
		ssn: "000173167",
		weeklyLoan: 25,
		contractEnd: "",
		notes: "Weekly tool loan"
	}
];
function punch(empId, date, hours, kind = "worked", note = "") {
	return {
		id: `${empId}-${date}`,
		empId,
		date,
		hours,
		kind,
		note
	};
}
var SEED_PUNCHES = [
	punch(105, "2027-01-04", 8),
	punch(105, "2027-01-05", 8),
	punch(105, "2027-01-06", 5.5),
	punch(105, "2027-01-07", 8),
	punch(105, "2027-01-08", 7),
	punch(105, "2027-01-09", 5),
	punch(106, "2027-01-04", 8, "vacation", "Yr 2: Vac. Day"),
	punch(106, "2027-01-05", 8),
	punch(106, "2027-01-06", 5),
	punch(106, "2027-01-07", 8),
	punch(108, "2027-01-04", 6.5),
	punch(108, "2027-01-05", 7.5),
	punch(108, "2027-01-06", 8, "vacation", "Yr 2: Vac. Day"),
	punch(108, "2027-01-07", 8),
	punch(108, "2027-01-08", 8, "vacation", "Yr 2: Vac. Day"),
	punch(109, "2027-01-04", 6.5),
	punch(109, "2027-01-05", 6.5),
	punch(109, "2027-01-06", 5),
	punch(109, "2027-01-07", 8),
	punch(109, "2027-01-08", 8, "vacation", "Yr 1: Vac. Day"),
	punch(110, "2027-01-04", 5.5),
	punch(110, "2027-01-05", 4.5),
	punch(110, "2027-01-08", 5.5),
	punch(112, "2027-01-04", 8),
	punch(112, "2027-01-05", 8),
	punch(112, "2027-01-06", 8),
	punch(112, "2027-01-07", 8),
	punch(113, "2027-01-04", 6),
	punch(113, "2027-01-05", 6),
	punch(113, "2027-01-07", 6),
	punch(113, "2027-01-08", 6),
	punch(105, "2027-01-11", 8),
	punch(105, "2027-01-12", 8),
	punch(105, "2027-01-13", 8.5),
	punch(105, "2027-01-14", 9),
	punch(105, "2027-01-15", 8),
	punch(106, "2027-01-11", 8, "vacation", "Yr 2: Vac. Day"),
	punch(106, "2027-01-13", 9),
	punch(106, "2027-01-14", 9),
	punch(106, "2027-01-15", 9),
	punch(108, "2027-01-11", 8),
	punch(108, "2027-01-12", 8, "vacation", "Yr 2: Vac. Day"),
	punch(108, "2027-01-13", 8),
	punch(108, "2027-01-14", 8),
	punch(108, "2027-01-15", 8),
	punch(109, "2027-01-11", 8, "vacation", "Yr 1: Vac. Day"),
	punch(109, "2027-01-12", 8),
	punch(109, "2027-01-13", 8, "vacation", "Yr 1: Vac. Day"),
	punch(109, "2027-01-14", 6),
	punch(109, "2027-01-15", 8),
	punch(110, "2027-01-12", 6),
	punch(110, "2027-01-13", 5),
	punch(110, "2027-01-15", 6),
	punch(112, "2027-01-11", 8),
	punch(112, "2027-01-12", 8),
	punch(112, "2027-01-13", 8),
	punch(112, "2027-01-14", 8),
	punch(112, "2027-01-15", 8),
	punch(113, "2027-01-11", 8),
	punch(113, "2027-01-12", 8),
	punch(113, "2027-01-14", 8),
	punch(113, "2027-01-15", 8)
];
var DEMO_TODAY = "2027-01-18";
var DEMO_WEEKS = [
	"2027-01-04",
	"2027-01-11",
	"2027-01-18",
	"2027-01-25"
];
function spanHours(clockIn, clockOut) {
	const [ih, im] = clockIn.split(":").map(Number);
	const [oh, om] = clockOut.split(":").map(Number);
	let mins = oh * 60 + om - (ih * 60 + im);
	if (mins < 0) mins += 1440;
	return Math.round(mins / 60 * 4) / 4;
}
function hm(date = /* @__PURE__ */ new Date()) {
	return date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
}
function money(n) {
	return new Intl.NumberFormat("en-BZ", {
		style: "currency",
		currency: "BZD",
		minimumFractionDigits: 2
	}).format(n);
}
function addDays(iso, days) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
function weekDays(weekStart) {
	return Array.from({ length: 6 }, (_, i) => addDays(weekStart, i));
}
function formatDay(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00`)).toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
}
function fullName(e) {
	return `${e.firstName} ${e.lastName}`;
}
function paidHours(kind) {
	return kind !== "unpaid";
}
function ssbFor(weeklyGross, hours) {
	if (hours < 8 || weeklyGross <= 0) return {
		employee: 0,
		employer: 0,
		total: 0,
		band: "Not triggered"
	};
	const band = SSB_BANDS.find((b) => weeklyGross >= b.min && weeklyGross <= b.max) ?? SSB_BANDS[SSB_BANDS.length - 1];
	return {
		employee: band.employee,
		employer: band.employer,
		total: +(band.employee + band.employer).toFixed(2),
		band: band.max >= 1e6 ? `${band.min}+` : `${band.min}–${band.max}`
	};
}
function payeFor(weeklyGross) {
	if (weeklyGross <= 567) return {
		tax: 0,
		note: "At or under weekly $567 — no PAYE"
	};
	const annual = weeklyGross * 52;
	if (annual <= 29e3) return {
		tax: 0,
		note: "Projected annual at or under $29,000"
	};
	let taxAnnual = Math.max(0, annual - PAYE_RELIEF) * PAYE_RATE;
	let note = `Above $32,000: $20,000 relief, then ${PAYE_RATE * 100}%`;
	if (annual <= 32e3) {
		const maxTax = annual - PAYE_THRESHOLD;
		if (taxAnnual > maxTax) {
			taxAnnual = maxTax;
			note = "$29,001–$32,000: relief plus credit so net stays at least $29,000";
		} else note = "$29,001–$32,000: $20,000 relief, then 25%";
	}
	return {
		tax: Math.round(taxAnnual / 52 * 100) / 100,
		note
	};
}
function payslipFor(emp, weekStart, punches) {
	const days = new Set(weekDays(weekStart));
	const mine = punches.filter((p) => p.empId === emp.empId && days.has(p.date));
	const hours = mine.reduce((s, p) => s + p.hours, 0);
	const payable = mine.filter((p) => paidHours(p.kind)).reduce((s, p) => s + p.hours, 0);
	const regular = Math.min(payable, 45);
	const ot = Math.max(0, payable - 45);
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
		ssbBand: ssb.band
	};
}
function monthWeeks(year, monthIndex) {
	const first = new Date(year, monthIndex, 1);
	const last = new Date(year, monthIndex + 1, 0);
	const weeks = [];
	const cursor = new Date(first);
	const day = cursor.getDay();
	cursor.setDate(cursor.getDate() + (day === 0 ? -6 : 1 - day));
	while (cursor <= last) {
		const iso = cursor.toISOString().slice(0, 10);
		if (addDays(iso, 6) >= `${year}-${String(monthIndex + 1).padStart(2, "0")}-01` && iso <= last.toISOString().slice(0, 10)) weeks.push(iso);
		cursor.setDate(cursor.getDate() + 7);
	}
	return weeks;
}
var usePayroll = create()((set) => ({
	employees: SEED_EMPLOYEES,
	punches: SEED_PUNCHES,
	role: "admin",
	portalEmpId: 105,
	weekStart: "2027-01-04",
	setRole: (role) => set({ role }),
	setPortal: (portalEmpId) => set({ portalEmpId }),
	setWeek: (weekStart) => set({ weekStart }),
	bumpRate: (empId, delta) => set((s) => ({ employees: s.employees.map((e) => e.empId === empId ? {
		...e,
		rate: Math.max(0, +(e.rate + delta).toFixed(2))
	} : e) })),
	setLoan: (empId, weeklyLoan) => set((s) => ({ employees: s.employees.map((e) => e.empId === empId ? {
		...e,
		weeklyLoan
	} : e) })),
	setNote: (empId, notes) => set((s) => ({ employees: s.employees.map((e) => e.empId === empId ? {
		...e,
		notes
	} : e) })),
	upsertPunch: (empId, date, hours, kind, note) => set((s) => {
		const id = `${empId}-${date}`;
		const prev = s.punches.find((p) => p.id === id);
		const next = s.punches.filter((p) => p.id !== id);
		if (hours > 0 || kind && kind !== "worked") next.push({
			...prev,
			id,
			empId,
			date,
			hours,
			kind,
			note,
			source: prev?.source ?? "edit"
		});
		return { punches: next };
	}),
	clock: (empId, date, time, source) => {
		let action = "in";
		set((s) => {
			const id = `${empId}-${date}`;
			const current = s.punches.find((p) => p.id === id);
			const rest = s.punches.filter((p) => p.id !== id);
			if (current?.clockIn && !current.clockOut) {
				action = "out";
				rest.push({
					...current,
					clockOut: time,
					hours: spanHours(current.clockIn, time),
					source,
					note: source === "fingerprint" ? "Fingerprint clock" : "Time clock"
				});
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
					source
				});
			}
			return { punches: rest };
		});
		return action;
	}
}));
var OFFICE = [
	{
		to: "/",
		label: "Today",
		icon: LayoutDashboard
	},
	{
		to: "/clock",
		label: "Time clock",
		icon: Clock3
	},
	{
		to: "/timesheet",
		label: "Timecards",
		icon: CalendarRange
	},
	{
		to: "/payroll",
		label: "Pay period",
		icon: Wallet
	},
	{
		to: "/employees",
		label: "People",
		icon: Users
	},
	{
		to: "/reports",
		label: "Filings",
		icon: FileSpreadsheet
	}
];
var STAFF = [
	{
		to: "/clock",
		label: "Time clock",
		icon: Clock3
	},
	{
		to: "/timesheet",
		label: "My timecard",
		icon: CalendarRange
	},
	{
		to: "/portal",
		label: "My pay",
		icon: Wallet
	}
];
function Shell({ title, lede, children, wide = false }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const role = usePayroll((s) => s.role);
	const setRole = usePayroll((s) => s.setRole);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-display text-xl leading-none",
					children: "The Agency"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Pay period 4–31 Jan 2027"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-full border border-line p-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `min-h-11 rounded-full px-3 ${role === "admin" ? "bg-primary text-primary-fg" : ""}`,
					onClick: () => setRole("admin"),
					children: "Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `min-h-11 rounded-full px-3 ${role === "employee" ? "bg-primary text-primary-fg" : ""}`,
					onClick: () => setRole("employee"),
					children: "Staff"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:grid md:grid-cols-[200px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 py-2 md:block md:min-h-[calc(100vh-57px)] md:border-r md:border-b-0 md:px-2 md:py-4",
				children: (role === "admin" ? OFFICE : STAFF).map((item) => {
					const active = path === item.to;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm ${active ? "bg-primary text-primary-fg" : "text-ink hover:bg-bg"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-4 py-5 md:px-8 md:py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: wide ? "" : "max-w-5xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl tracking-tight",
							children: title
						}),
						lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm text-muted",
							children: lede
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children
						})
					]
				})
			})]
		})]
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `rounded-xl border border-line bg-surface p-4 ${className}`,
		children
	});
}
//#endregion
export { formatDay as a, money as c, usePayroll as d, weekDays as f, Shell as i, monthWeeks as l, DEMO_TODAY as n, fullName as o, DEMO_WEEKS as r, hm as s, Card as t, payslipFor as u };
