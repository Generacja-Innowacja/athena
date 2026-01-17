import { jsx as v, jsxs as Ae } from "react/jsx-runtime";
import * as i from "react";
import N, { forwardRef as X, createElement as U } from "react";
import { twMerge as _e } from "tailwind-merge";
import "react-dom";
function K(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function D(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = K(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : K(e[o], null);
        }
      };
  };
}
function A(...e) {
  return i.useCallback(D(...e), e);
}
var xe = Symbol.for("react.lazy"), M = i[" use ".trim().toString()];
function Pe(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function J(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === xe && "_payload" in e && Pe(e._payload);
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  const t = /* @__PURE__ */ ke(e), n = i.forwardRef((r, o) => {
    let { children: s, ...u } = r;
    J(s) && typeof M == "function" && (s = M(s._payload));
    const c = i.Children.toArray(s), l = c.find(Me);
    if (l) {
      const a = l.props.children, d = c.map((f) => f === l ? i.Children.count(a) > 1 ? i.Children.only(null) : i.isValidElement(a) ? a.props.children : null : f);
      return /* @__PURE__ */ v(t, { ...u, ref: o, children: i.isValidElement(a) ? i.cloneElement(a, void 0, d) : null });
    }
    return /* @__PURE__ */ v(t, { ...u, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Oe = /* @__PURE__ */ Te("Slot");
// @__NO_SIDE_EFFECTS__
function ke(e) {
  const t = i.forwardRef((n, r) => {
    let { children: o, ...s } = n;
    if (J(o) && typeof M == "function" && (o = M(o._payload)), i.isValidElement(o)) {
      const u = $e(o), c = De(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? D(r, u) : u), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Fe = Symbol("radix.slottable");
function Me(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Fe;
}
function De(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function $e(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Q(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Q(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ee() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Q(e)) && (r && (r += " "), r += t);
  return r;
}
const H = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, q = ee, Le = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return q(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, u = Object.keys(o).map((a) => {
    const d = n?.[a], f = s?.[a];
    if (d === null) return null;
    const g = H(d) || H(f);
    return o[a][g];
  }), c = n && Object.entries(n).reduce((a, d) => {
    let [f, g] = d;
    return g === void 0 || (a[f] = g), a;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((a, d) => {
    let { class: f, className: g, ...m } = d;
    return Object.entries(m).every((y) => {
      let [b, p] = y;
      return Array.isArray(p) ? p.includes({
        ...s,
        ...c
      }[b]) : {
        ...s,
        ...c
      }[b] === p;
    }) ? [
      ...a,
      f,
      g
    ] : a;
  }, []);
  return q(e, u, l, n?.class, n?.className);
};
function j(...e) {
  return _e(ee(e));
}
const Ve = Le(
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
function Zt({
  className: e,
  variant: t,
  size: n,
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ v(
    r ? Oe : "button",
    {
      "data-slot": "button",
      className: j(Ve({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function I(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function $(e, t = []) {
  let n = [];
  function r(s, u) {
    const c = i.createContext(u), l = n.length;
    n = [...n, u];
    const a = (f) => {
      const { scope: g, children: m, ...y } = f, b = g?.[e]?.[l] || c, p = i.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ v(b.Provider, { value: p, children: m });
    };
    a.displayName = s + "Provider";
    function d(f, g) {
      const m = g?.[e]?.[l] || c, y = i.useContext(m);
      if (y) return y;
      if (u !== void 0) return u;
      throw new Error(`\`${f}\` must be used within \`${s}\``);
    }
    return [a, d];
  }
  const o = () => {
    const s = n.map((u) => i.createContext(u));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return o.scopeName = e, [r, Ge(o, ...t)];
}
function Ge(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const u = r.reduce((c, { useScope: l, scopeName: a }) => {
        const f = l(s)[`__scope${a}`];
        return { ...c, ...f };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: u }), [u]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Ue(e) {
  const t = /* @__PURE__ */ We(e), n = i.forwardRef((r, o) => {
    const { children: s, ...u } = r, c = i.Children.toArray(s), l = c.find(ze);
    if (l) {
      const a = l.props.children, d = c.map((f) => f === l ? i.Children.count(a) > 1 ? i.Children.only(null) : i.isValidElement(a) ? a.props.children : null : f);
      return /* @__PURE__ */ v(t, { ...u, ref: o, children: i.isValidElement(a) ? i.cloneElement(a, void 0, d) : null });
    }
    return /* @__PURE__ */ v(t, { ...u, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function We(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (i.isValidElement(o)) {
      const u = Ke(o), c = Be(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? D(r, u) : u), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var je = Symbol("radix.slottable");
function ze(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === je;
}
function Be(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ke(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var He = [
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
], P = He.reduce((e, t) => {
  const n = /* @__PURE__ */ Ue(`Primitive.${t}`), r = i.forwardRef((o, s) => {
    const { asChild: u, ...c } = o, l = u ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ v(l, { ...c, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
// @__NO_SIDE_EFFECTS__
function Y(e) {
  const t = /* @__PURE__ */ qe(e), n = i.forwardRef((r, o) => {
    const { children: s, ...u } = r, c = i.Children.toArray(s), l = c.find(Ze);
    if (l) {
      const a = l.props.children, d = c.map((f) => f === l ? i.Children.count(a) > 1 ? i.Children.only(null) : i.isValidElement(a) ? a.props.children : null : f);
      return /* @__PURE__ */ v(t, { ...u, ref: o, children: i.isValidElement(a) ? i.cloneElement(a, void 0, d) : null });
    }
    return /* @__PURE__ */ v(t, { ...u, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function qe(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (i.isValidElement(o)) {
      const u = Je(o), c = Xe(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? D(r, u) : u), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ye = Symbol("radix.slottable");
function Ze(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ye;
}
function Xe(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Je(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Qe(e) {
  const t = e + "CollectionProvider", [n, r] = $(t), [o, s] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), u = (b) => {
    const { scope: p, children: C } = b, E = N.useRef(null), h = N.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ v(o, { scope: p, itemMap: h, collectionRef: E, children: C });
  };
  u.displayName = t;
  const c = e + "CollectionSlot", l = /* @__PURE__ */ Y(c), a = N.forwardRef(
    (b, p) => {
      const { scope: C, children: E } = b, h = s(c, C), R = A(p, h.collectionRef);
      return /* @__PURE__ */ v(l, { ref: R, children: E });
    }
  );
  a.displayName = c;
  const d = e + "CollectionItemSlot", f = "data-radix-collection-item", g = /* @__PURE__ */ Y(d), m = N.forwardRef(
    (b, p) => {
      const { scope: C, children: E, ...h } = b, R = N.useRef(null), _ = A(p, R), x = s(d, C);
      return N.useEffect(() => (x.itemMap.set(R, { ref: R, ...h }), () => void x.itemMap.delete(R))), /* @__PURE__ */ v(g, { [f]: "", ref: _, children: E });
    }
  );
  m.displayName = d;
  function y(b) {
    const p = s(e + "CollectionConsumer", b);
    return N.useCallback(() => {
      const E = p.collectionRef.current;
      if (!E) return [];
      const h = Array.from(E.querySelectorAll(`[${f}]`));
      return Array.from(p.itemMap.values()).sort(
        (x, k) => h.indexOf(x.ref.current) - h.indexOf(k.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return [
    { Provider: u, Slot: a, ItemSlot: m },
    y,
    r
  ];
}
var T = globalThis?.document ? i.useLayoutEffect : () => {
}, et = i[" useId ".trim().toString()] || (() => {
}), tt = 0;
function nt(e) {
  const [t, n] = i.useState(et());
  return T(() => {
    n((r) => r ?? String(tt++));
  }, [e]), t ? `radix-${t}` : "";
}
function rt(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
var ot = i[" useInsertionEffect ".trim().toString()] || T;
function te({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, u] = it({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : o;
  {
    const d = i.useRef(e !== void 0);
    i.useEffect(() => {
      const f = d.current;
      f !== c && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = c;
    }, [c, r]);
  }
  const a = i.useCallback(
    (d) => {
      if (c) {
        const f = st(d) ? d(e) : d;
        f !== e && u.current?.(f);
      } else
        s(d);
    },
    [c, e, s, u]
  );
  return [l, a];
}
function it({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = i.useState(e), o = i.useRef(n), s = i.useRef(t);
  return ot(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function st(e) {
  return typeof e == "function";
}
var ct = i.createContext(void 0);
function ne(e) {
  const t = i.useContext(ct);
  return e || t || "ltr";
}
var G = "rovingFocusGroup.onEntryFocus", at = { bubbles: !1, cancelable: !0 }, O = "RovingFocusGroup", [W, re, ut] = Qe(O), [lt, oe] = $(
  O,
  [ut]
), [dt, ft] = lt(O), ie = i.forwardRef(
  (e, t) => /* @__PURE__ */ v(W.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(W.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ v(pt, { ...e, ref: t }) }) })
);
ie.displayName = O;
var pt = i.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: s,
    currentTabStopId: u,
    defaultCurrentTabStopId: c,
    onCurrentTabStopIdChange: l,
    onEntryFocus: a,
    preventScrollOnEntryFocus: d = !1,
    ...f
  } = e, g = i.useRef(null), m = A(t, g), y = ne(s), [b, p] = te({
    prop: u,
    defaultProp: c ?? null,
    onChange: l,
    caller: O
  }), [C, E] = i.useState(!1), h = rt(a), R = re(n), _ = i.useRef(!1), [x, k] = i.useState(0);
  return i.useEffect(() => {
    const S = g.current;
    if (S)
      return S.addEventListener(G, h), () => S.removeEventListener(G, h);
  }, [h]), /* @__PURE__ */ v(
    dt,
    {
      scope: n,
      orientation: r,
      dir: y,
      loop: o,
      currentTabStopId: b,
      onItemFocus: i.useCallback(
        (S) => p(S),
        [p]
      ),
      onItemShiftTab: i.useCallback(() => E(!0), []),
      onFocusableItemAdd: i.useCallback(
        () => k((S) => S + 1),
        []
      ),
      onFocusableItemRemove: i.useCallback(
        () => k((S) => S - 1),
        []
      ),
      children: /* @__PURE__ */ v(
        P.div,
        {
          tabIndex: C || x === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: m,
          style: { outline: "none", ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            _.current = !0;
          }),
          onFocus: I(e.onFocus, (S) => {
            const Ee = !_.current;
            if (S.target === S.currentTarget && Ee && !C) {
              const B = new CustomEvent(G, at);
              if (S.currentTarget.dispatchEvent(B), !B.defaultPrevented) {
                const V = R().filter((w) => w.focusable), Ie = V.find((w) => w.active), we = V.find((w) => w.id === b), Ne = [Ie, we, ...V].filter(
                  Boolean
                ).map((w) => w.ref.current);
                ae(Ne, d);
              }
            }
            _.current = !1;
          }),
          onBlur: I(e.onBlur, () => E(!1))
        }
      )
    }
  );
}), se = "RovingFocusGroupItem", ce = i.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: s,
      children: u,
      ...c
    } = e, l = nt(), a = s || l, d = ft(se, n), f = d.currentTabStopId === a, g = re(n), { onFocusableItemAdd: m, onFocusableItemRemove: y, currentTabStopId: b } = d;
    return i.useEffect(() => {
      if (r)
        return m(), () => y();
    }, [r, m, y]), /* @__PURE__ */ v(
      W.ItemSlot,
      {
        scope: n,
        id: a,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ v(
          P.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": d.orientation,
            ...c,
            ref: t,
            onMouseDown: I(e.onMouseDown, (p) => {
              r ? d.onItemFocus(a) : p.preventDefault();
            }),
            onFocus: I(e.onFocus, () => d.onItemFocus(a)),
            onKeyDown: I(e.onKeyDown, (p) => {
              if (p.key === "Tab" && p.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (p.target !== p.currentTarget) return;
              const C = gt(p, d.orientation, d.dir);
              if (C !== void 0) {
                if (p.metaKey || p.ctrlKey || p.altKey || p.shiftKey) return;
                p.preventDefault();
                let h = g().filter((R) => R.focusable).map((R) => R.ref.current);
                if (C === "last") h.reverse();
                else if (C === "prev" || C === "next") {
                  C === "prev" && h.reverse();
                  const R = h.indexOf(p.currentTarget);
                  h = d.loop ? yt(h, R + 1) : h.slice(R + 1);
                }
                setTimeout(() => ae(h));
              }
            }),
            children: typeof u == "function" ? u({ isCurrentTabStop: f, hasTabStop: b != null }) : u
          }
        )
      }
    );
  }
);
ce.displayName = se;
var mt = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function vt(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function gt(e, t, n) {
  const r = vt(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return mt[r];
}
function ae(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function yt(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var bt = ie, ht = ce;
function Rt(e) {
  const [t, n] = i.useState(void 0);
  return T(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let u, c;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, a = Array.isArray(l) ? l[0] : l;
          u = a.inlineSize, c = a.blockSize;
        } else
          u = e.offsetWidth, c = e.offsetHeight;
        n({ width: u, height: c });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
function Ct(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function St(e, t) {
  return i.useReducer((n, r) => t[n][r] ?? n, e);
}
var ue = (e) => {
  const { present: t, children: n } = e, r = Et(t), o = typeof n == "function" ? n({ present: r.isPresent }) : i.Children.only(n), s = A(r.ref, It(o));
  return typeof n == "function" || r.isPresent ? i.cloneElement(o, { ref: s }) : null;
};
ue.displayName = "Presence";
function Et(e) {
  const [t, n] = i.useState(), r = i.useRef(null), o = i.useRef(e), s = i.useRef("none"), u = e ? "mounted" : "unmounted", [c, l] = St(u, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return i.useEffect(() => {
    const a = F(r.current);
    s.current = c === "mounted" ? a : "none";
  }, [c]), T(() => {
    const a = r.current, d = o.current;
    if (d !== e) {
      const g = s.current, m = F(a);
      e ? l("MOUNT") : m === "none" || a?.display === "none" ? l("UNMOUNT") : l(d && g !== m ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), T(() => {
    if (t) {
      let a;
      const d = t.ownerDocument.defaultView ?? window, f = (m) => {
        const b = F(r.current).includes(CSS.escape(m.animationName));
        if (m.target === t && b && (l("ANIMATION_END"), !o.current)) {
          const p = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", a = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = p);
          });
        }
      }, g = (m) => {
        m.target === t && (s.current = F(r.current));
      };
      return t.addEventListener("animationstart", g), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(a), t.removeEventListener("animationstart", g), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((a) => {
      r.current = a ? getComputedStyle(a) : null, n(a);
    }, [])
  };
}
function F(e) {
  return e?.animationName || "none";
}
function It(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var z = "Radio", [wt, le] = $(z), [Nt, At] = wt(z), de = i.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: s,
      disabled: u,
      value: c = "on",
      onCheck: l,
      form: a,
      ...d
    } = e, [f, g] = i.useState(null), m = A(t, (p) => g(p)), y = i.useRef(!1), b = f ? a || !!f.closest("form") : !0;
    return /* @__PURE__ */ Ae(Nt, { scope: n, checked: o, disabled: u, children: [
      /* @__PURE__ */ v(
        P.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": ve(o),
          "data-disabled": u ? "" : void 0,
          disabled: u,
          value: c,
          ...d,
          ref: m,
          onClick: I(e.onClick, (p) => {
            o || l?.(), b && (y.current = p.isPropagationStopped(), y.current || p.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ v(
        me,
        {
          control: f,
          bubbles: !y.current,
          name: r,
          value: c,
          checked: o,
          required: s,
          disabled: u,
          form: a,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
de.displayName = z;
var fe = "RadioIndicator", pe = i.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, s = At(fe, n);
    return /* @__PURE__ */ v(ue, { present: r || s.checked, children: /* @__PURE__ */ v(
      P.span,
      {
        "data-state": ve(s.checked),
        "data-disabled": s.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
pe.displayName = fe;
var _t = "RadioBubbleInput", me = i.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, s) => {
    const u = i.useRef(null), c = A(u, s), l = Ct(n), a = Rt(t);
    return i.useEffect(() => {
      const d = u.current;
      if (!d) return;
      const f = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (l !== n && m) {
        const y = new Event("click", { bubbles: r });
        m.call(d, n), d.dispatchEvent(y);
      }
    }, [l, n, r]), /* @__PURE__ */ v(
      P.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: c,
        style: {
          ...o.style,
          ...a,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
me.displayName = _t;
function ve(e) {
  return e ? "checked" : "unchecked";
}
var xt = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], L = "RadioGroup", [Pt] = $(L, [
  oe,
  le
]), ge = oe(), ye = le(), [Tt, Ot] = Pt(L), be = i.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: s,
      required: u = !1,
      disabled: c = !1,
      orientation: l,
      dir: a,
      loop: d = !0,
      onValueChange: f,
      ...g
    } = e, m = ge(n), y = ne(a), [b, p] = te({
      prop: s,
      defaultProp: o ?? null,
      onChange: f,
      caller: L
    });
    return /* @__PURE__ */ v(
      Tt,
      {
        scope: n,
        name: r,
        required: u,
        disabled: c,
        value: b,
        onValueChange: p,
        children: /* @__PURE__ */ v(
          bt,
          {
            asChild: !0,
            ...m,
            orientation: l,
            dir: y,
            loop: d,
            children: /* @__PURE__ */ v(
              P.div,
              {
                role: "radiogroup",
                "aria-required": u,
                "aria-orientation": l,
                "data-disabled": c ? "" : void 0,
                dir: y,
                ...g,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
be.displayName = L;
var he = "RadioGroupItem", Re = i.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, s = Ot(he, n), u = s.disabled || r, c = ge(n), l = ye(n), a = i.useRef(null), d = A(t, a), f = s.value === o.value, g = i.useRef(!1);
    return i.useEffect(() => {
      const m = (b) => {
        xt.includes(b.key) && (g.current = !0);
      }, y = () => g.current = !1;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", y);
      };
    }, []), /* @__PURE__ */ v(
      ht,
      {
        asChild: !0,
        ...c,
        focusable: !u,
        active: f,
        children: /* @__PURE__ */ v(
          de,
          {
            disabled: u,
            required: s.required,
            checked: f,
            ...l,
            ...o,
            name: s.name,
            ref: d,
            onCheck: () => s.onValueChange(o.value),
            onKeyDown: I((m) => {
              m.key === "Enter" && m.preventDefault();
            }),
            onFocus: I(o.onFocus, () => {
              g.current && a.current?.click();
            })
          }
        )
      }
    );
  }
);
Re.displayName = he;
var kt = "RadioGroupIndicator", Ce = i.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = ye(n);
    return /* @__PURE__ */ v(pe, { ...o, ...r, ref: t });
  }
);
Ce.displayName = kt;
var Ft = be, Mt = Re, Dt = Ce;
function Xt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ v(
    Ft,
    {
      "data-slot": "radio-group",
      className: j("grid gap-3", e),
      ...t
    }
  );
}
const $t = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Lt = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Z = (e) => {
  const t = Lt(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Se = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Vt = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Gt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Ut = X(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: s,
    iconNode: u,
    ...c
  }, l) => U(
    "svg",
    {
      ref: l,
      ...Gt,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Se("lucide", o),
      ...!s && !Vt(c) && { "aria-hidden": "true" },
      ...c
    },
    [
      ...u.map(([a, d]) => U(a, d)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
const Wt = (e, t) => {
  const n = X(
    ({ className: r, ...o }, s) => U(Ut, {
      ref: s,
      iconNode: t,
      className: Se(
        `lucide-${$t(Z(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Z(e), n;
};
const jt = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], zt = Wt("circle", jt);
function Jt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ v(
    Mt,
    {
      "data-slot": "radio-group-item",
      className: j(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t,
      children: /* @__PURE__ */ v(
        Dt,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ v(zt, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
export {
  Zt as Button,
  Xt as RadioGroup,
  Jt as RadioGroupItem,
  Ve as buttonVariants
};
