import { g as A, a as G, s as H } from "./lib/theme.js";
import { _ as J, h as K } from "./lib/_plugin-vue_export-helper.js";
import { F as r } from "./lib/@fortawesome.js";
import { C as Q } from "./lib/codemirror.js";
const t = window.Vue.unref, x = window.Vue.toDisplayString, a = window.Vue.createElementVNode, U = window.Vue.createTextVNode, d = window.Vue.resolveComponent, f = window.Vue.withCtx, _ = window.Vue.createVNode, o = window.Vue.openBlock, i = window.Vue.createBlock, X = window.Vue.createCommentVNode, Y = window.Vue.resolveDirective, b = window.Vue.withDirectives, Z = window.Vue.createElementBlock, $ = { class: "theme-header-box" }, ee = { class: "theme-editor-title" }, te = { class: "custom-tree-node" }, oe = { class: "codeEditorFileName" }, le = window.Vue.onMounted, s = window.Vue.ref, m = window.ElementPlus.ElMessage, ie = {
  __name: "ThemeEditView",
  setup(se) {
    const p = router.currentRoute.value.params.themePath;
    let k = s([]), w = s(!0), u = s(!1);
    const T = s();
    let l = null;
    le(() => {
      l = Q(T.value, {
        value: "",
        placeholder: "请在左侧文件列表选择文件进行编辑...",
        lineNumbers: !0,
        // 显示行号
        mode: "htmlmixed",
        // 设置语言模式
        theme: "material-darker",
        // 主题
        indentWithTabs: !0,
        // 使用 Tab 键缩进
        tabSize: 2,
        // 设置 Tab 键的宽度
        lineWrapping: !0
        // 自动换行
      });
    });
    const F = {
      children: "children",
      label: "fileName"
    };
    let N = s([]), h = s({});
    const I = s(), P = ["jpg", "png", "gif", "ico", "jpeg"];
    let C = s([]), v = s(!1);
    const B = ["java", "js", "css", "html", "json", "yaml", "less", "scss", "txt", "md"];
    function D() {
      w.value = !0, A(p).then((e) => {
        e.code === 200 ? k.value = K(e.data, "id", "pid", "children", "-1") : m.error(e.msg), w.value = !1;
      });
    }
    function O(e) {
      if (e.fileType === "dir")
        return;
      if (B.findIndex((n) => n === e.fileType) < 0) {
        if (P.findIndex((V) => V === e.fileType) < 0) {
          m.error("暂不支持该类型文件的预览和修改");
          return;
        }
        R(e.staticPath);
        return;
      }
      let y = {
        themePath: p,
        path: e.filePath
      };
      u.value = !0, G(y).then((n) => {
        n.code === 200 ? (l.setValue(n.data), M(e.fileType), N.value = [e.id], h.value = e) : m.error(n.msg), u.value = !1;
      });
    }
    function M(e) {
      e === "html" ? l.setOption("mode", "htmlmixed") : e === "css" ? l.setOption("mode", "css") : e === "js" || e === "json" ? l.setOption("mode", "javascript") : e === "yaml" ? l.setOption("mode", "yaml") : l.setOption("mode", "javascript");
    }
    function R(e) {
      C.value[0] = "/static/themes/" + e, v.value = !0;
    }
    function L() {
      v.value = !1;
    }
    function S() {
      h.value.filePath && (u.value = !0, H({ themePath: p, content: l.getValue(), path: h.value.filePath }).then((e) => {
        e.code === 200 && e.data ? m.success("保存成功") : m.error(e.msg), u.value = !1;
      }));
    }
    return D(), (e, g) => {
      const y = d("el-button"), n = d("el-divider"), V = d("el-tree"), E = d("el-col"), W = d("el-row"), q = d("el-image-viewer"), j = Y("loading");
      return o(), Z("div", null, [
        a("div", $, [
          a("h2", ee, "主题编辑: " + x(t(p)), 1),
          _(y, {
            type: "primary",
            style: { "margin-left": "auto" },
            onClick: S
          }, {
            default: f(() => g[0] || (g[0] = [
              U("保存")
            ])),
            _: 1
          })
        ]),
        _(n),
        _(W, { gutter: 20 }, {
          default: f(() => [
            b((o(), i(E, {
              xs: 24,
              sm: 24,
              md: 4,
              lg: 4,
              xl: 4
            }, {
              default: f(() => [
                _(V, {
                  style: { width: "100%", "max-height": "700px", overflow: "auto" },
                  data: t(k),
                  props: F,
                  onNodeClick: O,
                  "node-key": "id",
                  "highlight-current": !0,
                  "default-checked-keys": t(N),
                  ref_key: "treeRef",
                  ref: I
                }, {
                  default: f(({ node: z, data: c }) => [
                    a("span", te, [
                      c.fileType === "dir" ? (o(), i(t(r), {
                        key: 0,
                        icon: "fa-regular fa-folder-open ",
                        class: "file-list-icon folder"
                      })) : c.fileType === "js" ? (o(), i(t(r), {
                        key: 1,
                        icon: "fa-brands fa-js-square",
                        class: "file-list-icon js"
                      })) : c.fileType === "html" ? (o(), i(t(r), {
                        key: 2,
                        icon: "fa-brands fa-html5 ",
                        class: "file-list-icon html"
                      })) : c.fileType === "css" || c.fileType === "less" || c.fileType === "scss" ? (o(), i(t(r), {
                        key: 3,
                        icon: "fa-brands fa-css3 ",
                        class: "file-list-icon css"
                      })) : c.fileType === "txt" ? (o(), i(t(r), {
                        key: 4,
                        icon: "fa-solid fa-text-height ",
                        class: "file-list-icon txt"
                      })) : (o(), i(t(r), {
                        key: 5,
                        icon: "fa-regular fa-file ",
                        class: "file-list-icon"
                      })),
                      a("span", null, x(z.label), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["data", "default-checked-keys"])
              ]),
              _: 1
            })), [
              [j, t(w)]
            ]),
            b((o(), i(E, {
              xs: 24,
              sm: 24,
              md: 20,
              lg: 20,
              xl: 20
            }, {
              default: f(() => [
                a("div", oe, x(t(h).fileName), 1),
                a("div", {
                  ref_key: "codeEditorRef",
                  ref: T,
                  class: "codeEditor"
                }, null, 512)
              ]),
              _: 1
            })), [
              [j, t(u)]
            ])
          ]),
          _: 1
        }),
        t(v) ? (o(), i(q, {
          key: 0,
          "url-list": t(C),
          "hide-on-click-modal": "",
          onClose: L
        }, null, 8, ["url-list"])) : X("", !0)
      ]);
    };
  }
}, de = /* @__PURE__ */ J(ie, [["__scopeId", "data-v-4f1a082b"]]);
export {
  de as default
};
