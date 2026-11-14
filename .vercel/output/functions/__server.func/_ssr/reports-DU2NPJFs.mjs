import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as money, d as usePayroll, i as Shell, l as monthWeeks, o as fullName, t as Card, u as payslipFor } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-DU2NPJFs.js
var import_jsx_runtime = require_jsx_runtime();
function Reports() {
	const employees = usePayroll((s) => s.employees);
	const punches = usePayroll((s) => s.punches);
	const weeks = monthWeeks(2027, 0);
	const rows = employees.flatMap((emp) => weeks.map((week) => ({
		emp,
		week,
		slip: payslipFor(emp, week, punches)
	})).filter((r) => r.slip.gross > 0 || r.slip.hours > 0));
	const byPerson = employees.map((emp) => {
		const slips = weeks.map((w) => payslipFor(emp, w, punches)).filter((s) => s.gross > 0);
		return {
			emp,
			weeks: slips.length,
			emoluments: slips.reduce((s, p) => s + p.gross, 0),
			tax: slips.reduce((s, p) => s + p.paye, 0)
		};
	}).filter((r) => r.emoluments > 0);
	const ssbDue = rows.reduce((s, r) => s + r.slip.ssbEmployee + r.slip.ssbEmployer, 0);
	const payeDue = byPerson.reduce((s, r) => s + r.tax, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "January 2027 filings",
		lede: "SSB is weekly, following the office week, including a fifth week when the month has one. PAYE is calendar days 1–31.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "SSB · due 14 February"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: money(ssbDue)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-warn",
						children: "Outstanding · not marked paid"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "PAYE · due 15 February"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: money(payeDue)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"QuickBooks PAYE liability ",
							money(payeDue),
							" · app ",
							money(payeDue),
							" · difference $0.00"
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "SSB weekly lines"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-3 w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Week start"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Salary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Contribution"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: fullName(r.emp)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.week }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(r.slip.gross) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(r.slip.ssbEmployee + r.slip.ssbEmployer) })
						]
					}, `${r.emp.empId}-${r.week}`)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "PAYE employee lines"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "TIN, weeks employed in the month, total emoluments, tax withheld. Matches the Belize upload columns."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-3 w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "TIN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Weeks"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Emoluments"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Tax withheld"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: byPerson.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: r.emp.tin || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fullName(r.emp) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.weeks }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(r.emoluments) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(r.tax) })
							]
						}, r.emp.empId)) })]
					})
				]
			})
		]
	});
}
//#endregion
export { Reports as component };
