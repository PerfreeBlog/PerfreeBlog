const d = (r, l) => {
  const t = r.__vccOpts || r;
  for (const [n, _] of l)
    t[n] = _;
  return t;
}, i = {}, s = window.Vue.createElementVNode, o = window.Vue.createTextVNode, a = window.Vue.resolveComponent, c = window.Vue.withCtx, e = window.Vue.createVNode, u = window.Vue.openBlock, p = window.Vue.createElementBlock, w = /* @__PURE__ */ s("div", null, "home", -1), f = /* @__PURE__ */ s("div", null, "我改了改2222", -1);
function m(r, l) {
  const t = a("el-button"), n = a("el-alert");
  return u(), p("div", null, [
    w,
    e(t, null, {
      default: c(() => [
        o("Default")
      ]),
      _: 1
    }),
    e(t, { type: "primary" }, {
      default: c(() => [
        o("Primary")
      ]),
      _: 1
    }),
    e(t, { type: "success" }, {
      default: c(() => [
        o("Success")
      ]),
      _: 1
    }),
    e(t, { type: "info" }, {
      default: c(() => [
        o("Info")
      ]),
      _: 1
    }),
    e(t, { type: "warning" }, {
      default: c(() => [
        o("Warning")
      ]),
      _: 1
    }),
    e(t, { type: "danger" }, {
      default: c(() => [
        o("Danger")
      ]),
      _: 1
    }),
    f,
    e(n, {
      title: "Success alert",
      type: "success"
    }),
    e(n, {
      title: "Info alert",
      type: "info"
    }),
    e(n, {
      title: "Warning alert",
      type: "warning"
    }),
    e(n, {
      title: "Error alert",
      type: "error"
    })
  ]);
}
const V = /* @__PURE__ */ d(i, [["render", m]]);
export {
  V as default
};
