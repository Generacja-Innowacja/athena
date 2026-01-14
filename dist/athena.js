import { jsx as v, jsxs as L } from "react/jsx-runtime";
import * as s from "react";
import { twMerge as M } from "tailwind-merge";
import "react-dom";
function E(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function k(...e) {
  return (n) => {
    let t = !1;
    const o = e.map((r) => {
      const i = E(r, n);
      return !t && typeof i == "function" && (t = !0), i;
    });
    if (t)
      return () => {
        for (let r = 0; r < o.length; r++) {
          const i = o[r];
          typeof i == "function" ? i() : E(e[r], null);
        }
      };
  };
}
function _(...e) {
  return s.useCallback(k(...e), e);
}
var D = Symbol.for("react.lazy"), C = s[" use ".trim().toString()];
function F(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function N(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === D && "_payload" in e && F(e._payload);
}
// @__NO_SIDE_EFFECTS__
function U(e) {
  const n = /* @__PURE__ */ q(e), t = s.forwardRef((o, r) => {
    let { children: i, ...a } = o;
    N(i) && typeof C == "function" && (i = C(i._payload));
    const c = s.Children.toArray(i), u = c.find(K);
    if (u) {
      const l = u.props.children, d = c.map((f) => f === u ? s.Children.count(l) > 1 ? s.Children.only(null) : s.isValidElement(l) ? l.props.children : null : f);
      return /* @__PURE__ */ v(n, { ...a, ref: r, children: s.isValidElement(l) ? s.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ v(n, { ...a, ref: r, children: i });
  });
  return t.displayName = `${e}.Slot`, t;
}
var Z = /* @__PURE__ */ U("Slot");
// @__NO_SIDE_EFFECTS__
function q(e) {
  const n = s.forwardRef((t, o) => {
    let { children: r, ...i } = t;
    if (N(r) && typeof C == "function" && (r = C(r._payload)), s.isValidElement(r)) {
      const a = G(r), c = X(i, r.props);
      return r.type !== s.Fragment && (c.ref = o ? k(o, a) : a), s.cloneElement(r, c);
    }
    return s.Children.count(r) > 1 ? s.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var Y = Symbol("radix.slottable");
function K(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Y;
}
function X(e, n) {
  const t = { ...n };
  for (const o in n) {
    const r = e[o], i = n[o];
    /^on[A-Z]/.test(o) ? r && i ? t[o] = (...c) => {
      const u = i(...c);
      return r(...c), u;
    } : r && (t[o] = r) : o === "style" ? t[o] = { ...r, ...i } : o === "className" && (t[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function G(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning;
  return t ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
function $(e) {
  var n, t, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (n = 0; n < r; n++) e[n] && (t = $(e[n])) && (o && (o += " "), o += t);
  } else for (t in e) e[t] && (o && (o += " "), o += t);
  return o;
}
function z() {
  for (var e, n, t = 0, o = "", r = arguments.length; t < r; t++) (e = arguments[t]) && (n = $(e)) && (o && (o += " "), o += n);
  return o;
}
const P = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, R = z, J = (e, n) => (t) => {
  var o;
  if (n?.variants == null) return R(e, t?.class, t?.className);
  const { variants: r, defaultVariants: i } = n, a = Object.keys(r).map((l) => {
    const d = t?.[l], f = i?.[l];
    if (d === null) return null;
    const p = P(d) || P(f);
    return r[l][p];
  }), c = t && Object.entries(t).reduce((l, d) => {
    let [f, p] = d;
    return p === void 0 || (l[f] = p), l;
  }, {}), u = n == null || (o = n.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((l, d) => {
    let { class: f, className: p, ...h } = d;
    return Object.entries(h).every((b) => {
      let [m, g] = b;
      return Array.isArray(g) ? g.includes({
        ...i,
        ...c
      }[m]) : {
        ...i,
        ...c
      }[m] === g;
    }) ? [
      ...l,
      f,
      p
    ] : l;
  }, []);
  return R(e, a, u, t?.class, t?.className);
};
function w(...e) {
  return M(z(e));
}
const Q = J(
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
function Ee({
  className: e,
  variant: n,
  size: t,
  asChild: o = !1,
  ...r
}) {
  return /* @__PURE__ */ v(
    o ? Z : "button",
    {
      "data-slot": "button",
      className: w(Q({ variant: n, size: t, className: e })),
      ...r
    }
  );
}
function ee(e, n, { checkForDefaultPrevented: t = !0 } = {}) {
  return function(r) {
    if (e?.(r), t === !1 || !r.defaultPrevented)
      return n?.(r);
  };
}
function te(e, n = []) {
  let t = [];
  function o(i, a) {
    const c = s.createContext(a), u = t.length;
    t = [...t, a];
    const l = (f) => {
      const { scope: p, children: h, ...b } = f, m = p?.[e]?.[u] || c, g = s.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ v(m.Provider, { value: g, children: h });
    };
    l.displayName = i + "Provider";
    function d(f, p) {
      const h = p?.[e]?.[u] || c, b = s.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${f}\` must be used within \`${i}\``);
    }
    return [l, d];
  }
  const r = () => {
    const i = t.map((a) => s.createContext(a));
    return function(c) {
      const u = c?.[e] || i;
      return s.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: u } }),
        [c, u]
      );
    };
  };
  return r.scopeName = e, [o, ne(r, ...n)];
}
function ne(...e) {
  const n = e[0];
  if (e.length === 1) return n;
  const t = () => {
    const o = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(i) {
      const a = o.reduce((c, { useScope: u, scopeName: l }) => {
        const f = u(i)[`__scope${l}`];
        return { ...c, ...f };
      }, {});
      return s.useMemo(() => ({ [`__scope${n.scopeName}`]: a }), [a]);
    };
  };
  return t.scopeName = n.scopeName, t;
}
var A = globalThis?.document ? s.useLayoutEffect : () => {
}, re = s[" useInsertionEffect ".trim().toString()] || A;
function oe({
  prop: e,
  defaultProp: n,
  onChange: t = () => {
  },
  caller: o
}) {
  const [r, i, a] = ie({
    defaultProp: n,
    onChange: t
  }), c = e !== void 0, u = c ? e : r;
  {
    const d = s.useRef(e !== void 0);
    s.useEffect(() => {
      const f = d.current;
      f !== c && console.warn(
        `${o} is changing from ${f ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = c;
    }, [c, o]);
  }
  const l = s.useCallback(
    (d) => {
      if (c) {
        const f = se(d) ? d(e) : d;
        f !== e && a.current?.(f);
      } else
        i(d);
    },
    [c, e, i, a]
  );
  return [u, l];
}
function ie({
  defaultProp: e,
  onChange: n
}) {
  const [t, o] = s.useState(e), r = s.useRef(t), i = s.useRef(n);
  return re(() => {
    i.current = n;
  }, [n]), s.useEffect(() => {
    r.current !== t && (i.current?.(t), r.current = t);
  }, [t, r]), [t, o, i];
}
function se(e) {
  return typeof e == "function";
}
function ce(e) {
  const n = s.useRef({ value: e, previous: e });
  return s.useMemo(() => (n.current.value !== e && (n.current.previous = n.current.value, n.current.value = e), n.current.previous), [e]);
}
function ae(e) {
  const [n, t] = s.useState(void 0);
  return A(() => {
    if (e) {
      t({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const i = r[0];
        let a, c;
        if ("borderBoxSize" in i) {
          const u = i.borderBoxSize, l = Array.isArray(u) ? u[0] : u;
          a = l.inlineSize, c = l.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        t({ width: a, height: c });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else
      t(void 0);
  }, [e]), n;
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  const n = /* @__PURE__ */ ue(e), t = s.forwardRef((o, r) => {
    const { children: i, ...a } = o, c = s.Children.toArray(i), u = c.find(fe);
    if (u) {
      const l = u.props.children, d = c.map((f) => f === u ? s.Children.count(l) > 1 ? s.Children.only(null) : s.isValidElement(l) ? l.props.children : null : f);
      return /* @__PURE__ */ v(n, { ...a, ref: r, children: s.isValidElement(l) ? s.cloneElement(l, void 0, d) : null });
    }
    return /* @__PURE__ */ v(n, { ...a, ref: r, children: i });
  });
  return t.displayName = `${e}.Slot`, t;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const n = s.forwardRef((t, o) => {
    const { children: r, ...i } = t;
    if (s.isValidElement(r)) {
      const a = ve(r), c = pe(i, r.props);
      return r.type !== s.Fragment && (c.ref = o ? k(o, a) : a), s.cloneElement(r, c);
    }
    return s.Children.count(r) > 1 ? s.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var de = Symbol("radix.slottable");
function fe(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === de;
}
function pe(e, n) {
  const t = { ...n };
  for (const o in n) {
    const r = e[o], i = n[o];
    /^on[A-Z]/.test(o) ? r && i ? t[o] = (...c) => {
      const u = i(...c);
      return r(...c), u;
    } : r && (t[o] = r) : o === "style" ? t[o] = { ...r, ...i } : o === "className" && (t[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function ve(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning;
  return t ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = n && "isReactWarning" in n && n.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
var he = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], V = he.reduce((e, n) => {
  const t = /* @__PURE__ */ le(`Primitive.${n}`), o = s.forwardRef((r, i) => {
    const { asChild: a, ...c } = r, u = a ? t : n;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ v(u, { ...c, ref: i });
  });
  return o.displayName = `Primitive.${n}`, { ...e, [n]: o };
}, {}), x = "Switch", [be] = te(x), [me, ge] = be(x), O = s.forwardRef(
  (e, n) => {
    const {
      __scopeSwitch: t,
      name: o,
      checked: r,
      defaultChecked: i,
      required: a,
      disabled: c,
      value: u = "on",
      onCheckedChange: l,
      form: d,
      ...f
    } = e, [p, h] = s.useState(null), b = _(n, (S) => h(S)), m = s.useRef(!1), g = p ? d || !!p.closest("form") : !0, [y, W] = oe({
      prop: r,
      defaultProp: i ?? !1,
      onChange: l,
      caller: x
    });
    return /* @__PURE__ */ L(me, { scope: t, checked: y, disabled: c, children: [
      /* @__PURE__ */ v(
        V.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": a,
          "data-state": B(y),
          "data-disabled": c ? "" : void 0,
          disabled: c,
          value: u,
          ...f,
          ref: b,
          onClick: ee(e.onClick, (S) => {
            W((H) => !H), g && (m.current = S.isPropagationStopped(), m.current || S.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ v(
        T,
        {
          control: p,
          bubbles: !m.current,
          name: o,
          value: u,
          checked: y,
          required: a,
          disabled: c,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
O.displayName = x;
var I = "SwitchThumb", j = s.forwardRef(
  (e, n) => {
    const { __scopeSwitch: t, ...o } = e, r = ge(I, t);
    return /* @__PURE__ */ v(
      V.span,
      {
        "data-state": B(r.checked),
        "data-disabled": r.disabled ? "" : void 0,
        ...o,
        ref: n
      }
    );
  }
);
j.displayName = I;
var ye = "SwitchBubbleInput", T = s.forwardRef(
  ({
    __scopeSwitch: e,
    control: n,
    checked: t,
    bubbles: o = !0,
    ...r
  }, i) => {
    const a = s.useRef(null), c = _(a, i), u = ce(t), l = ae(n);
    return s.useEffect(() => {
      const d = a.current;
      if (!d) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (u !== t && h) {
        const b = new Event("click", { bubbles: o });
        h.call(d, t), d.dispatchEvent(b);
      }
    }, [u, t, o]), /* @__PURE__ */ v(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: t,
        ...r,
        tabIndex: -1,
        ref: c,
        style: {
          ...r.style,
          ...l,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
T.displayName = ye;
function B(e) {
  return e ? "checked" : "unchecked";
}
var Se = O, Ce = j;
function Pe({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ v(
    Se,
    {
      "data-slot": "switch",
      className: w(
        "peer data-[state=checked]:bg-gi-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n,
      children: /* @__PURE__ */ v(
        Ce,
        {
          "data-slot": "switch-thumb",
          className: w(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
export {
  Ee as Button,
  Pe as Switch,
  Q as buttonVariants
};
