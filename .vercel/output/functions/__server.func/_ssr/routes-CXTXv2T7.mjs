import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as money, d as usePayroll, i as Shell, o as fullName, u as payslipFor } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CXTXv2T7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Today() {
	const role = usePayroll((s) => s.role);
	const navigate = useNavigate();
	const employees = usePayroll((s) => s.employees);
	const punches = usePayroll((s) => s.punches);
	const slips = employees.map((e) => payslipFor(e, "2027-01-11", punches));
	const missing = employees.filter((e) => !punches.some((p) => p.empId === e.empId && p.date === "2027-01-09" && p.hours > 0));
	const onClock = punches.filter((p) => p.date === "2027-01-18" && p.clockIn && !p.clockOut);
	(0, import_react.useEffect)(() => {
		if (role === "employee") navigate({ to: "/clock" });
	}, [role, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Today",
		lede: "Business date is Monday 18 January 2027. Fix exceptions before you close the period.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: "On the clock",
						value: String(onClock.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: "No Saturday 9 Jan",
						value: String(missing.length),
						warn: missing.length > 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: "Last closed week net",
						value: money(slips.reduce((s, p) => s + p.net, 0))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 overflow-hidden rounded-xl border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Who needs a look"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/timesheet",
						className: "text-sm font-semibold text-primary",
						children: "Open timecards"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: missing.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: fullName(e)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: e.position
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-bg px-3 py-1 text-sm text-warn",
						children: "No Friday punch"
					})]
				}, e.empId)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/clock",
					className: "inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg",
					children: "Open time clock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/payroll",
					className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold",
					children: "Review pay period"
				})]
			})
		]
	});
}
function Tile({ label, value, warn = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wide text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-display text-3xl ${warn ? "text-warn" : ""}`,
			children: value
		})]
	});
}
//#endregion
export { Today as component };
