import { g as B, h as I, a as P } from "./lib/codegen.js";
import { F as r } from "./lib/@fortawesome.js";
import { T as R } from "./lib/vue-codemirror.js";
import { F as L, G } from "./lib/@codemirror.js";
import { _ as q } from "./lib/_plugin-vue_export-helper.js";
const t = window.Vue.unref, o = window.Vue.openBlock, i = window.Vue.createBlock;
window.Vue.createCommentVNode;
const M = window.Vue.toDisplayString, x = window.Vue.createElementVNode, _ = window.Vue.resolveComponent, d = window.Vue.withCtx, h = window.Vue.createVNode, S = window.Vue.resolveDirective, C = window.Vue.withDirectives, z = window.Vue.createElementBlock, A = { class: "page" }, K = { class: "custom-tree-node" }, c = window.Vue.ref, T = window.ElementPlus.ElMessage, O = window.VueRouter.useRoute, U = {
  __name: "CodeGenPreview",
  setup(H) {
    const v = O();
    let y = c([]), u = c(!0), f = c(!0);
    const F = {
      children: "children",
      label: "fileName"
    };
    let p = c([]), b = c({});
    const k = c(), m = c(""), E = [L(), G], N = ["java", "js", "css", "html", "json", "yaml", "less", "scss", "txt", "md", "vue", "xml", "sql"];
    function j() {
      u.value = !0, B(v.params.id).then((e) => {
        if (e.code === 200) {
          let n = null;
          e.data.forEach((s) => {
            s.fileType !== "dir" && n === null && (n = s, p.value = [s.id]);
          }), y.value = I(e.data, "id", "pid", "children", "-1"), V(n);
        } else
          T.error(e.msg);
        u.value = !1;
      });
    }
    function V(e) {
      if (e.fileType === "dir" || N.findIndex((l) => l === e.fileType) < 0)
        return;
      let s = {
        tableId: v.params.id,
        path: e.filePath
      };
      f.value = !0, P(s).then((l) => {
        l.code === 200 ? (p.value = [e.id], m.value = l.data, b.value = e, k.value.setCheckedKeys([e.id], !0)) : T.error(l.msg), f.value = !1;
      });
    }
    return j(), (e, n) => {
      const s = _("el-tree"), l = _("el-col"), D = _("el-row"), g = S("loading");
      return o(), z("div", A, [
        h(D, { gutter: 20 }, {
          default: d(() => [
            C((o(), i(l, { span: 6 }, {
              default: d(() => [
                h(s, {
                  style: { width: "100%", "max-height": "700px", overflow: "auto" },
                  data: t(y),
                  props: F,
                  onNodeClick: V,
                  "node-key": "id",
                  "default-checked-keys": t(p),
                  "default-expand-all": "",
                  ref_key: "treeRef",
                  ref: k
                }, {
                  default: d(({ node: w, data: a }) => [
                    x("span", K, [
                      a.fileType === "dir" ? (o(), i(t(r), {
                        key: 0,
                        icon: "fa-regular fa-folder-open ",
                        class: "file-list-icon folder"
                      })) : a.fileType === "js" ? (o(), i(t(r), {
                        key: 1,
                        icon: "fa-brands fa-js-square",
                        class: "file-list-icon js"
                      })) : a.fileType === "html" ? (o(), i(t(r), {
                        key: 2,
                        icon: "fa-brands fa-html5 ",
                        class: "file-list-icon html"
                      })) : a.fileType === "css" || a.fileType === "less" || a.fileType === "scss" ? (o(), i(t(r), {
                        key: 3,
                        icon: "fa-brands fa-css3 ",
                        class: "file-list-icon css"
                      })) : a.fileType === "txt" ? (o(), i(t(r), {
                        key: 4,
                        icon: "fa-solid fa-text-height ",
                        class: "file-list-icon txt"
                      })) : (o(), i(t(r), {
                        key: 5,
                        icon: "fa-regular fa-file ",
                        class: "file-list-icon"
                      })),
                      x("span", null, M(w.label), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["data", "default-checked-keys"])
              ]),
              _: 1
            })), [
              [g, t(u)]
            ]),
            C((o(), i(l, { span: 18 }, {
              default: d(() => [
                h(t(R), {
                  modelValue: m.value,
                  "onUpdate:modelValue": n[0] || (n[0] = (w) => m.value = w),
                  placeholder: "请选择左侧要编辑的文件...",
                  style: { height: "700px" },
                  autofocus: !0,
                  "indent-with-tab": !0,
                  "tab-size": 2,
                  extensions: E
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })), [
              [g, t(f)]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
}, Z = /* @__PURE__ */ q(U, [["__scopeId", "data-v-c5b497c7"]]);
export {
  Z as default
};
