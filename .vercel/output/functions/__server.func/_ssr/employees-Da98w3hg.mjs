import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as money, d as usePayroll, i as Shell, t as Card } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees-Da98w3hg.js
var import_jsx_runtime = require_jsx_runtime();
function People() {
	const employees = usePayroll((s) => s.employees);
	const bumpRate = usePayroll((s) => s.bumpRate);
	const setLoan = usePayroll((s) => s.setLoan);
	const setNote = usePayroll((s) => s.setNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "People",
		lede: "Rates, loans, contract dates, and a short performance note stay with each person.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl",
							children: [
								e.firstName,
								" ",
								e.lastName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"#",
								e.empId,
								" · ",
								e.position || "Staff",
								e.contractEnd ? ` · contract ends ${e.contractEnd}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"TIN ",
								e.tin || "—",
								" · SSN ",
								e.ssn || "—"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl",
						children: [money(e.rate), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base text-muted",
							children: "/hr"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full border border-line px-4 text-sm",
						onClick: () => bumpRate(e.empId, .5),
						children: "Raise $0.50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: ["Weekly loan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "w-24 rounded-lg border border-line bg-bg px-2 py-2",
							type: "number",
							min: 0,
							step: "1",
							value: e.weeklyLoan,
							onChange: (ev) => setLoan(e.empId, Number(ev.target.value) || 0)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Performance / behaviour note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2",
						rows: 2,
						value: e.notes,
						onChange: (ev) => setNote(e.empId, ev.target.value),
						placeholder: "What should show on the performance report"
					})]
				})
			] }, e.empId))
		})
	});
}
//#endregion
export { People as component };
