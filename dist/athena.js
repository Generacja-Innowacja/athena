import { jsx as g } from "react/jsx-runtime";
import * as a from "react";
import { twMerge as E } from "tailwind-merge";
function b(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function j(...e) {
  return (n) => {
    let t = !1;
    const r = e.map((i) => {
      const o = b(i, n);
      return !t && typeof o == "function" && (t = !0), o;
    });
    if (t)
      return () => {
        for (let i = 0; i < r.length; i++) {
          const o = r[i];
          typeof o == "function" ? o() : b(e[i], null);
        }
      };
  };
}
var N = Symbol.for("react.lazy"), p = a[" use ".trim().toString()];
function R(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function C(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === N && "_payload" in e && R(e._payload);
}
// @__NO_SIDE_EFFECTS__
function A(e) {
  const n = /* @__PURE__ */ O(e), t = a.forwardRef((r, i) => {
    let { children: o, ...u } = r;
    C(o) && typeof p == "function" && (o = p(o._payload));
    const l = a.Children.toArray(o), f = l.find(w);
    if (f) {
      const s = f.props.children, c = l.map((d) => d === f ? a.Children.count(s) > 1 ? a.Children.only(null) : a.isValidElement(s) ? s.props.children : null : d);
      return /* @__PURE__ */ g(n, { ...u, ref: i, children: a.isValidElement(s) ? a.cloneElement(s, void 0, c) : null });
    }
    return /* @__PURE__ */ g(n, { ...u, ref: i, children: o });
  });
  return t.displayName = `${e}.Slot`, t;
}
var z = /* @__PURE__ */ A("Slot");
// @__NO_SIDE_EFFECTS__
function O(e) {
  const n = a.forwardRef((t, r) => {
    let { children: i, ...o } = t;
    if (C(i) && typeof p == "function" && (i = p(i._payload)), a.isValidElement(i)) {
      const u = T(i), l = $(o, i.props);
      return i.type !== a.Fragment && (l.ref = r ? j(r, u) : u), a.cloneElement(i, l);
    }
    return a.Children.count(i) > 1 ? a.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var P = Symbol("radix.slottable");
function w(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === P;
}
function $(e, n) {
  const t = { ...n };
  for (const r in n) {
    const i = e[r], o = n[r];
    /^on[A-Z]/.test(r) ? i && o ? t[r] = (...l) => {
      const f = o(...l);
      return i(...l), f;
    } : i && (t[r] = i) : r === "style" ? t[r] = { ...i, ...o } : r === "className" && (t[r] = [i, o].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function T(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning;
  return t ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
function _(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (n = 0; n < i; n++) e[n] && (t = _(e[n])) && (r && (r += " "), r += t);
  } else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function k() {
  for (var e, n, t = 0, r = "", i = arguments.length; t < i; t++) (e = arguments[t]) && (n = _(e)) && (r && (r += " "), r += n);
  return r;
}
const h = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, x = k, W = (e, n) => (t) => {
  var r;
  if (n?.variants == null) return x(e, t?.class, t?.className);
  const { variants: i, defaultVariants: o } = n, u = Object.keys(i).map((s) => {
    const c = t?.[s], d = o?.[s];
    if (c === null) return null;
    const v = h(c) || h(d);
    return i[s][v];
  }), l = t && Object.entries(t).reduce((s, c) => {
    let [d, v] = c;
    return v === void 0 || (s[d] = v), s;
  }, {}), f = n == null || (r = n.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((s, c) => {
    let { class: d, className: v, ...S } = c;
    return Object.entries(S).every((V) => {
      let [m, y] = V;
      return Array.isArray(y) ? y.includes({
        ...o,
        ...l
      }[m]) : {
        ...o,
        ...l
      }[m] === y;
    }) ? [
      ...s,
      d,
      v
    ] : s;
  }, []);
  return x(e, u, f, t?.class, t?.className);
};
function I(...e) {
  return E(k(e));
}
const L = W(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function F({
  className: e,
  variant: n,
  size: t,
  asChild: r = !1,
  ...i
}) {
  return /* @__PURE__ */ g(
    r ? z : "button",
    {
      "data-slot": "button",
      className: I(L({ variant: n, size: t, className: e })),
      ...i
    }
  );
}
export {
  F as Button,
  L as buttonVariants
};
