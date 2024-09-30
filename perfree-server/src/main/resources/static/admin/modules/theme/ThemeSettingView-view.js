import { b as V } from "./lib/theme.js";
function h(p) {
  return axios.post("/api/auth/option/saveCurrentThemeSetting", p);
}
function C() {
  return axios.get("/api/auth/option/getCurrentThemeSettingValue");
}
const g = window.Vue.resolveComponent, S = window.Vue.createVNode, w = window.Vue.openBlock, k = window.Vue.createBlock, T = window.Vue.createCommentVNode, B = window.Vue.resolveDirective, E = window.Vue.createElementBlock, b = window.Vue.withDirectives, x = { class: "page" }, l = window.ElementPlus.ElMessage, i = window.Vue.ref, A = {
  __name: "ThemeSettingView",
  setup(p) {
    const d = i({}), s = i({}), r = i({}), m = i([]), v = i(!1), a = i(!0);
    function f() {
      V().then((t) => {
        if (t.code === 200) {
          if (!t.data) {
            v.value = !0, a.value = !1;
            return;
          }
          r.value = t.data.option, r.value.onSubmit = _, m.value = t.data.rule, C().then((e) => {
            e.code === 200 ? s.value = e.data.reduce((n, { key: o, value: u }) => (n[o] = u, n), {}) : l.error(e.msg), a.value = !1;
          });
        } else
          l.error(t.msg), a.value = !1;
      });
    }
    function _(t) {
      a.value = !0;
      const e = Object.keys(t);
      let n = {
        options: []
      };
      e.forEach((o) => {
        let u = {
          key: o,
          value: t[o]
        };
        n.options.push(u);
      }), h(n).then((o) => {
        o.code === 200 ? l.success("保存成功") : l.success(o.msg), a.value = !1;
      });
    }
    return f(), (t, e) => {
      const n = g("form-create"), o = g("el-empty"), u = B("loading");
      return b((w(), E("div", x, [
        S(n, {
          modelValue: s.value,
          "onUpdate:modelValue": e[0] || (e[0] = (c) => s.value = c),
          api: d.value,
          "onUpdate:api": e[1] || (e[1] = (c) => d.value = c),
          rule: m.value,
          option: r.value
        }, null, 8, ["modelValue", "api", "rule", "option"]),
        v.value ? (w(), k(o, {
          key: 0,
          description: "当前主题无设置项"
        })) : T("", !0)
      ])), [
        [u, a.value]
      ]);
    };
  }
};
export {
  A as default
};
