const o = window.Vue.createElementVNode, t = window.Vue.createTextVNode, s = window.Vue.resolveComponent, n = window.Vue.withCtx, e = window.Vue.createVNode, i = window.Vue.unref, w = window.Vue.isRef, p = window.Vue.Fragment, f = window.Vue.openBlock, V = window.Vue.createElementBlock, m = /* @__PURE__ */ o("div", null, "插件demo页面示例", -1), g = /* @__PURE__ */ o("br", null, null, -1), y = /* @__PURE__ */ o("br", null, null, -1), b = /* @__PURE__ */ o("br", null, null, -1), h = /* @__PURE__ */ o("br", null, null, -1), x = /* @__PURE__ */ o("br", null, null, -1), N = /* @__PURE__ */ o("br", null, null, -1), k = window.Vue.ref, v = {
  __name: "DemoView",
  setup(C) {
    let u = k(!1);
    function _() {
      u.value = !0;
    }
    return (E, c) => {
      const l = s("el-button"), r = s("el-alert"), d = s("el-dialog");
      return f(), V(p, null, [
        m,
        g,
        e(l, null, {
          default: n(() => [
            t("Default")
          ]),
          _: 1
        }),
        e(l, {
          type: "primary",
          onClick: _
        }, {
          default: n(() => [
            t("打开弹窗")
          ]),
          _: 1
        }),
        e(l, { type: "success" }, {
          default: n(() => [
            t("Success")
          ]),
          _: 1
        }),
        e(l, { type: "info" }, {
          default: n(() => [
            t("Info")
          ]),
          _: 1
        }),
        e(l, { type: "warning" }, {
          default: n(() => [
            t("Warning")
          ]),
          _: 1
        }),
        e(l, { type: "danger" }, {
          default: n(() => [
            t("Danger")
          ]),
          _: 1
        }),
        y,
        b,
        e(r, {
          title: "Success alert",
          type: "success"
        }),
        h,
        e(r, {
          title: "Info alert",
          type: "info"
        }),
        x,
        e(r, {
          title: "Warning alert",
          type: "warning"
        }),
        N,
        e(r, {
          title: "Error alert",
          type: "error"
        }),
        e(d, {
          modelValue: i(u),
          "onUpdate:modelValue": c[0] || (c[0] = (a) => w(u) ? u.value = a : u = a),
          title: "测试",
          width: "600px",
          draggable: ""
        }, {
          default: n(() => [
            t(" 测试 ")
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
export {
  v as default
};
