import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDay, d as usePayroll, f as weekDays, i as Shell, o as fullName, r as DEMO_WEEKS, u as payslipFor } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timesheet-CUFrUQ_H.js
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"worked",
	"vacation",
	"sick",
	"gift",
	"unpaid"
];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		wide: true,
		title: role === "employee" ? "My timecard" : "Timecards",
		lede: "One row per day. Hours over 9, or a clock-in with no clock-out, show as exceptions.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: DEMO_WEEKS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setWeek(w),
					className: `min-h-11 rounded-lg px-3 text-sm ${w === weekStart ? "bg-primary text-primary-fg" : "border border-line bg-surface"}`,
					children: formatDay(w)
				}, w))
			}),
			role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2 overflow-x-auto",
				children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPortal(e.empId),
					className: `min-h-11 shrink-0 rounded-lg px-3 text-sm ${e.empId === focus.empId ? "bg-ink text-primary-fg" : "bg-surface border border-line"}`,
					children: e.firstName
				}, e.empId))
			}) : null,
			focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardRow, {
				empId: focus.empId,
				name: fullName(focus),
				days,
				punches,
				weekStart,
				upsert
			}) : null
		]
	});
}
function CardRow({ empId, name, days, punches, weekStart, upsert }) {
	const emp = usePayroll((s) => s.employees).find((e) => e.empId === empId);
	const slip = payslipFor(emp, weekStart, punches);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-x-auto rounded-xl border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					slip.paidHours,
					" paid hours · ",
					slip.otHours ? `${slip.otHours} overtime` : "no overtime"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-left text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 font-medium",
							children: "Day"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Out"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Hours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Pay code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2 font-medium",
							children: "Exception"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: days.map((date) => {
				const row = punches.find((p) => p.empId === empId && p.date === date);
				const hours = row?.hours ?? 0;
				const flag = Boolean(row?.clockIn && !row?.clockOut) ? "Missing clock-out" : hours > 9 ? "Long day" : row?.kind === "unpaid" ? "Unpaid" : "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2",
							children: formatDay(date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 tabular-nums",
							children: row?.clockIn ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 tabular-nums",
							children: row?.clockOut ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": `Hours ${date}`,
								className: "w-20 rounded-md border border-line bg-bg px-2 py-2",
								type: "number",
								min: 0,
								step: "0.25",
								value: hours,
								onChange: (ev) => upsert(empId, date, Number(ev.target.value) || 0, row?.kind ?? "worked", row?.note ?? "")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": `Pay code ${date}`,
								className: "min-h-11 rounded-md border border-line bg-bg px-2",
								value: row?.kind ?? "worked",
								onChange: (ev) => upsert(empId, date, hours, ev.target.value, row?.note ?? ""),
								children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: k
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: `px-4 py-2 ${flag ? "text-warn" : "text-muted"}`,
							children: flag || "OK"
						})
					]
				}, date);
			}) })]
		})]
	});
}
//#endregion
export { Timecards as component };
