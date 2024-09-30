import { g as z, a as A, s as G } from "./lib/theme.js";
import { _ as K, h as U } from "./lib/_plugin-vue_export-helper.js";
import { F as r } from "./lib/@fortawesome.js";
import { T as H } from "./lib/vue-codemirror.js";
import { F as J, G as O } from "./lib/@codemirror.js";
const t = window.Vue.unref, F = window.Vue.toDisplayString, h = window.Vue.createElementVNode, Q = window.Vue.createTextVNode, u = window.Vue.resolveComponent, f = window.Vue.withCtx, a = window.Vue.createVNode, l = window.Vue.openBlock, c = window.Vue.createBlock, W = window.Vue.createCommentVNode, X = window.Vue.resolveDirective, Y = window.Vue.createElementBlock, Z = window.Vue.withDirectives, $ = { class: "theme-header-box" }, ee = { class: "theme-editor-title" }, te = { class: "custom-tree-node" }, i = window.Vue.ref, m = window.ElementPlus.ElMessage, oe = {
  __name: "ThemeEditView",
  setup(le) {
    const p = router.currentRoute.value.params.name;
    let x = i([]), s = i(!0);
    const I = {
      children: "children",
      label: "fileName"
    };
    let k = i([]), w = i({});
    const T = i(), b = ["jpg", "png", "gif", "ico", "jpeg"];
    let N = i([]), v = i(!1);
    const _ = i(""), E = [J(), O], j = ["java", "js", "css", "html", "json", "yaml", "less", "scss", "txt", "md"];
    function B() {
      s.value = !0, z(p).then((e) => {
        e.code === 200 ? x.value = U(e.data, "id", "pid", "children", "-1") : m.error(e.msg), s.value = !1;
      });
    }
    function D(e) {
      if (e.fileType === "dir")
        return;
      if (j.findIndex((o) => o === e.fileType) < 0) {
        if (b.findIndex((g) => g === e.fileType) < 0) {
          m.error("暂不支持该类型文件的预览和修改");
          return;
        }
        P(e.staticPath);
        return;
      }
      let y = {
        themeName: p,
        path: e.filePath
      };
      s.value = !0, A(y).then((o) => {
        o.code === 200 ? (k.value = [e.id], _.value = o.data, w.value = e, T.value.setCheckedKeys([e.id], !0)) : m.error(o.msg), s.value = !1;
      });
    }
    function P(e) {
      N.value[0] = "/static/themes/" + e, v.value = !0;
    }
    function L() {
      v.value = !1;
    }
    function R() {
      w.value.filePath && (s.value = !0, G({ themeName: p, content: _.value, path: w.value.filePath }).then((e) => {
        e.code === 200 && e.data ? m.success("保存成功") : m.error(e.msg), s.value = !1;
      }));
    }
    return B(), (e, d) => {
      const y = u("el-button"), o = u("el-divider"), g = u("el-tree"), C = u("el-col"), M = u("el-row"), S = u("el-image-viewer"), q = X("loading");
      return Z((l(), Y("div", null, [
        h("div", $, [
          h("h2", ee, "主题编辑: " + F(t(p)), 1),
          a(y, {
            type: "primary",
            style: { "margin-left": "auto" },
            onClick: R
          }, {
            default: f(() => d[1] || (d[1] = [
              Q("保存")
            ])),
            _: 1
          })
        ]),
        a(o),
        a(M, { gutter: 20 }, {
          default: f(() => [
            a(C, {
              xs: 24,
              sm: 24,
              md: 4,
              lg: 4,
              xl: 4
            }, {
              default: f(() => [
                a(g, {
                  style: { width: "100%", "max-height": "700px", overflow: "auto" },
                  data: t(x),
                  props: I,
                  onNodeClick: D,
                  "node-key": "id",
                  "default-checked-keys": t(k),
                  ref_key: "treeRef",
                  ref: T
                }, {
                  default: f(({ node: V, data: n }) => [
                    h("span", te, [
                      n.fileType === "dir" ? (l(), c(t(r), {
                        key: 0,
                        icon: "fa-regular fa-folder-open ",
                        class: "file-list-icon folder"
                      })) : n.fileType === "js" ? (l(), c(t(r), {
                        key: 1,
                        icon: "fa-brands fa-js-square",
                        class: "file-list-icon js"
                      })) : n.fileType === "html" ? (l(), c(t(r), {
                        key: 2,
                        icon: "fa-brands fa-html5 ",
                        class: "file-list-icon html"
                      })) : n.fileType === "css" || n.fileType === "less" || n.fileType === "scss" ? (l(), c(t(r), {
                        key: 3,
                        icon: "fa-brands fa-css3 ",
                        class: "file-list-icon css"
                      })) : n.fileType === "txt" ? (l(), c(t(r), {
                        key: 4,
                        icon: "fa-solid fa-text-height ",
                        class: "file-list-icon txt"
                      })) : (l(), c(t(r), {
                        key: 5,
                        icon: "fa-regular fa-file ",
                        class: "file-list-icon"
                      })),
                      h("span", null, F(V.label), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["data", "default-checked-keys"])
              ]),
              _: 1
            }),
            a(C, {
              xs: 24,
              sm: 24,
              md: 20,
              lg: 20,
              xl: 20
            }, {
              default: f(() => [
                a(t(H), {
                  modelValue: _.value,
                  "onUpdate:modelValue": d[0] || (d[0] = (V) => _.value = V),
                  placeholder: "请选择左侧要编辑的文件...",
                  style: { height: "700px" },
                  autofocus: !0,
                  "indent-with-tab": !0,
                  "tab-size": 2,
                  extensions: E
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        t(v) ? (l(), c(S, {
          key: 0,
          "url-list": t(N),
          "hide-on-click-modal": "",
          onClose: L
        }, null, 8, ["url-list"])) : W("", !0)
      ])), [
        [q, t(s)]
      ]);
    };
  }
}, re = /* @__PURE__ */ K(oe, [["__scopeId", "data-v-cef3a125"]]);
export {
  re as default
};
