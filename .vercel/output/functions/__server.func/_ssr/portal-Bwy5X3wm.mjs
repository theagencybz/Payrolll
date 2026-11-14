import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDay, c as money, d as usePayroll, f as weekDays, i as Shell, o as fullName, t as Card, u as payslipFor } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-Bwy5X3wm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Portal() {
	const employees = usePayroll((s) => s.employees);
	const punches = usePayroll((s) => s.punches);
	const empId = usePayroll((s) => s.portalEmpId);
	const setPortal = usePayroll((s) => s.setPortal);
	const upsert = usePayroll((s) => s.upsertPunch);
	const emp = employees.find((e) => e.empId === empId) ?? employees[0];
	const slip = payslipFor(emp, "2027-01-11", punches);
	const [date, setDate] = (0, import_react.useState)("2027-01-18");
	const [hours, setHours] = (0, import_react.useState)(8);
	const [kind, setKind] = (0, import_react.useState)("worked");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Staff portal",
		lede: "A second door for the team: see the last payslip, punch a day, and read the note on file. This demo uses a name picker instead of a password.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mb-4 flex flex-col text-sm",
			children: ["Signed in as", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mt-1 max-w-sm min-h-11 rounded-xl border border-line bg-surface px-3",
				value: emp.empId,
				onChange: (ev) => setPortal(Number(ev.target.value)),
				children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: e.empId,
					children: fullName(e)
				}, e.empId))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Payslip · week of ", formatDay(slip.weekStart)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl text-good",
					children: money(slip.net)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Gross ",
						money(slip.gross),
						" · SSB ",
						money(slip.ssbEmployee),
						" · PAYE ",
						money(slip.paye),
						" · loan ",
						money(slip.loan)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: emp.notes || "No performance note on file."
				}),
				emp.contractEnd ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-warn",
					children: ["Contract ends ", emp.contractEnd]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Punch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Week of 18 January is still open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "min-h-11 rounded-xl border border-line bg-bg px-3",
							value: date,
							onChange: (ev) => setDate(ev.target.value),
							children: weekDays("2027-01-18").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: formatDay(d)
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "min-h-11 rounded-xl border border-line bg-bg px-3",
							type: "number",
							min: 0,
							step: "0.5",
							value: hours,
							onChange: (ev) => setHours(Number(ev.target.value) || 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "min-h-11 rounded-xl border border-line bg-bg px-3",
							value: kind,
							onChange: (ev) => setKind(ev.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "worked",
									children: "Worked"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "vacation",
									children: "Vacation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sick",
									children: "Sick"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gift",
									children: "Employer paid day"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "unpaid",
									children: "Unpaid"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-full bg-accent font-semibold text-primary-fg",
							onClick: () => upsert(emp.empId, date, hours, kind, kind === "worked" ? "Portal punch" : kind),
							children: "Save punch"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1 text-sm text-muted",
					children: punches.filter((p) => p.empId === emp.empId && p.date >= "2027-01-18").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						formatDay(p.date),
						" · ",
						p.hours,
						"h · ",
						p.kind
					] }, p.id))
				})
			] })]
		})]
	});
}
//#endregion
export { Portal as component };
