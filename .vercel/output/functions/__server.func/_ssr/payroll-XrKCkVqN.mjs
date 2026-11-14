import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDay, c as money, d as usePayroll, i as Shell, o as fullName, r as DEMO_WEEKS, t as Card, u as payslipFor } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payroll-XrKCkVqN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Payroll() {
	const employees = usePayroll((s) => s.employees);
	const punches = usePayroll((s) => s.punches);
	const weekStart = usePayroll((s) => s.weekStart);
	const setWeek = usePayroll((s) => s.setWeek);
	const [advice, setAdvice] = (0, import_react.useState)(null);
	const slips = employees.map((e) => ({
		emp: e,
		slip: payslipFor(e, weekStart, punches)
	}));
	const totals = slips.reduce((a, { slip }) => ({
		gross: a.gross + slip.gross,
		ssb: a.ssb + slip.ssbEmployee,
		er: a.er + slip.ssbEmployer,
		paye: a.paye + slip.paye,
		loan: a.loan + slip.loan,
		net: a.net + slip.net
	}), {
		gross: 0,
		ssb: 0,
		er: 0,
		paye: 0,
		loan: 0,
		net: 0
	});
	const open = slips.find((s) => s.emp.empId === advice);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Pay period",
		lede: "Review the week, then open a payment advice. SSB bands and 2025 PAYE run on these hours.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: DEMO_WEEKS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setWeek(w),
					className: `min-h-11 rounded-full px-4 text-sm ${w === weekStart ? "bg-primary text-primary-fg" : "border border-line bg-surface"}`,
					children: formatDay(w)
				}, w))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Person"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Hours"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Gross"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "SSB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "PAYE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Loan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Net"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "pb-2 font-medium" })
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slips.map(({ emp, slip }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: fullName(emp)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: slip.ssbBand
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: slip.paidHours }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(slip.gross) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(slip.ssbEmployee) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(slip.paye) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(slip.loan) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "font-semibold text-good",
									children: money(slip.net)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 text-sm font-semibold text-accent",
									onClick: () => setAdvice(emp.empId),
									children: "Advice"
								}) })
							]
						}, emp.empId)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: "Week total"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(totals.gross) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(totals.ssb) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(totals.paye) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(totals.loan) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(totals.net) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {})
							]
						}) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Employer SSB this week ",
						money(totals.er),
						". That is not deducted from staff."
					]
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: "Payment advice · ready to email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl",
						children: [
							fullName(open.emp),
							" · ",
							formatDay(open.slip.weekStart),
							" to ",
							formatDay(open.slip.weekEnd)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-2 text-sm sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Regular pay",
								v: money(open.slip.regularPay)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Overtime",
								v: money(open.slip.otPay)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Gross",
								v: money(open.slip.gross)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "SSB employee",
								v: money(open.slip.ssbEmployee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "PAYE",
								v: money(open.slip.paye)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Loan",
								v: money(open.slip.loan)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Net pay",
								v: money(open.slip.net)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: open.slip.payeNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							"To: ",
							open.emp.firstName.toLowerCase(),
							"@theagency.bz · From: payroll@theagency.bz"
						]
					})
				]
			}) : null
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b border-line py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-semibold",
			children: v
		})]
	});
}
//#endregion
export { Payroll as component };
