import { g as V } from "./lib/plugin.js";
function k(l) {
  return axios.post("/api/auth/option/saveOptionList", l);
}
function B(l) {
  return axios.get("/api/auth/option/getOptionByIdentification?identification=" + l);
}
const f = window.Vue.resolveComponent, h = window.Vue.createVNode, g = window.Vue.openBlock, y = window.Vue.createBlock, E = window.Vue.createCommentVNode, S = window.Vue.resolveDirective, C = window.Vue.createElementBlock, O = window.Vue.withDirectives, x = { class: "page" }, s = window.ElementPlus.ElMessage, a = window.Vue.ref, D = {
  __name: "PluginSettingView",
  setup(l) {
    const d = a({}), r = a({}), c = a({}), v = a([]), m = a(!1), i = a(!0);
    function _() {
      V(router.currentRoute.value.params.id).then((t) => {
        if (t.code === 200) {
          if (!t.data) {
            m.value = !0, i.value = !1;
            return;
          }
          c.value = t.data.option, c.value.onSubmit = w, v.value = t.data.rule, B("plugin_" + router.currentRoute.value.params.id).then((e) => {
            e.code === 200 ? r.value = e.data.reduce((n, { key: o, value: u }) => (n[o] = u, n), {}) : s.error(e.msg), i.value = !1;
          });
        } else
          s.error(t.msg), i.value = !1;
      });
    }
    function w(t) {
      i.value = !0;
      const e = Object.keys(t);
      let n = {
        options: []
      };
      e.forEach((o) => {
        let u = {
          key: o,
          value: t[o],
          identification: "plugin_" + router.currentRoute.value.params.id
        };
        n.options.push(u);
      }), k(n).then((o) => {
        o.code === 200 ? s.success("保存成功") : s.success(o.msg), i.value = !1;
      });
    }
    return _(), (t, e) => {
      const n = f("form-create"), o = f("el-empty"), u = S("loading");
      return O((g(), C("div", x, [
        h(n, {
          modelValue: r.value,
          "onUpdate:modelValue": e[0] || (e[0] = (p) => r.value = p),
          api: d.value,
          "onUpdate:api": e[1] || (e[1] = (p) => d.value = p),
          rule: v.value,
          option: c.value
        }, null, 8, ["modelValue", "api", "rule", "option"]),
        m.value ? (g(), y(o, {
          key: 0,
          description: "当前主题无设置项"
        })) : E("", !0)
      ])), [
        [u, i.value]
      ]);
    };
  }
};
export {
  D as default
};
