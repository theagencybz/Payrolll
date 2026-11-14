import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Fingerprint } from "../_libs/lucide-react.mjs";
import { a as formatDay, d as usePayroll, i as Shell, n as DEMO_TODAY, o as fullName, s as hm } from "./shell-n9gXdcbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clock-Ba9XdTtN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClockPage() {
	const employees = usePayroll((s) => s.employees);
	const punches = usePayroll((s) => s.punches);
	const role = usePayroll((s) => s.role);
	const portalId = usePayroll((s) => s.portalEmpId);
	const setPortal = usePayroll((s) => s.setPortal);
	const clock = usePayroll((s) => s.clock);
	const [picked, setPicked] = (0, import_react.useState)(portalId);
	const [now, setNow] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("Tap your name, then clock in or out.");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(hm());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	const visible = role === "employee" ? employees.filter((e) => e.empId === portalId) : employees;
	const emp = employees.find((e) => e.empId === (role === "employee" ? portalId : picked)) ?? employees[0];
	const row = punches.find((p) => p.empId === emp.empId && p.date === "2027-01-18");
	const open = Boolean(row?.clockIn && !row?.clockOut);
	async function punch(source) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "Time clock",
		lede: "Same idea as a Kronos clock: one person, one punch. A wall fingerprint reader is not connected. This screen can only ask the phone or laptop you are holding.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-primary px-5 py-6 text-primary-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-primary-fg/70",
						children: [formatDay(DEMO_TODAY), " · business date"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-6xl tabular-nums",
						children: now || "––:––"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg font-semibold",
						children: fullName(emp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary-fg/80",
						children: open ? `In since ${row?.clockIn}` : row?.clockOut ? `Done · ${row.clockIn}–${row.clockOut}` : "Not clocked in"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [
					role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: visible.map((e) => {
							const mine = punches.find((p) => p.empId === e.empId && p.date === "2027-01-18");
							const state = mine?.clockIn && !mine.clockOut ? "In" : mine?.clockOut ? "Out" : "—";
							const active = e.empId === emp.empId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setPicked(e.empId),
								className: `min-h-16 rounded-lg border px-3 py-2 text-left ${active ? "border-primary bg-bg" : "border-line"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: e.firstName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [
										e.lastName,
										" · ",
										state
									]
								})]
							}, e.empId);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"You are signed in as ",
							fullName(emp),
							". A manager can switch people from the Manager view."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: open || busy,
								onClick: () => punch("clock"),
								className: "min-h-14 rounded-lg bg-good text-lg font-semibold text-primary-fg disabled:opacity-40",
								children: "Clock in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !open || busy,
								onClick: () => punch("clock"),
								className: "min-h-14 rounded-lg bg-accent text-lg font-semibold text-primary-fg disabled:opacity-40",
								children: "Clock out"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: () => punch("fingerprint"),
								className: "flex min-h-14 items-center justify-center gap-2 rounded-lg border border-line text-base font-semibold sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-5" }), busy ? "Waiting for this device…" : open ? "Clock out with fingerprint" : "Clock in with fingerprint"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: message
					})
				]
			})]
		})
	});
}
async function deviceFingerprint() {
	if (typeof window === "undefined" || !window.PublicKeyCredential) return {
		ok: false,
		reason: "This browser cannot use a fingerprint sensor. Use Clock in, or a real time clock with a reader."
	};
	try {
		const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
		await navigator.credentials.get({ publicKey: {
			challenge,
			timeout: 3e4,
			userVerification: "required",
			rpId: window.location.hostname
		} });
		return {
			ok: true,
			reason: ""
		};
	} catch {
		return {
			ok: false,
			reason: "Fingerprint was not accepted. The preview often blocks the sensor. A shop-floor reader would plug into the clock, not this page."
		};
	}
}
//#endregion
export { ClockPage as component };
