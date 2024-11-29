import { g as B, h as D, a as I } from "./lib/codegen.js";
import { F as a } from "./lib/@fortawesome.js";
import { C as P } from "./lib/codemirror.js";
import { _ as L } from "./lib/_plugin-vue_export-helper.js";
const t = window.Vue.unref, o = window.Vue.openBlock, i = window.Vue.createBlock;
window.Vue.createCommentVNode;
const M = window.Vue.toDisplayString, _ = window.Vue.createElementVNode, m = window.Vue.resolveComponent, d = window.Vue.withCtx, x = window.Vue.createVNode, S = window.Vue.resolveDirective, C = window.Vue.withDirectives, q = window.Vue.createElementBlock, G = { class: "page" }, W = { class: "custom-tree-node" }, z = window.Vue.onMounted, n = window.Vue.ref, T = window.ElementPlus.ElMessage, A = window.VueRouter.useRoute, K = {
  __name: "CodeGenPreview",
  setup(O) {
    const w = A();
    let h = n([]), u = n(!0), f = n(!0);
    const E = {
      children: "children",
      label: "fileName"
    };
    let p = n([]), b = n({});
    const v = n();
    n(!1);
    const y = n();
    let k = null;
    z(() => {
      k = P(y.value, {
        value: "",
        placeholder: "请在左侧文件列表选择文件...",
        lineNumbers: !0,
        // 显示行号
        mode: "javascript",
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
    const F = ["java", "js", "css", "html", "json", "yaml", "less", "scss", "txt", "md", "vue", "xml", "sql"];
    function N() {
      u.value = !0, B(w.params.id).then((e) => {
        if (e.code === 200) {
          let r = null;
          e.data.forEach((s) => {
            s.fileType !== "dir" && r === null && (r = s, p.value = [s.id]);
          }), h.value = D(e.data, "id", "pid", "children", "-1"), V(r);
        } else
          T.error(e.msg);
        u.value = !1;
      });
    }
    function V(e) {
      if (e.fileType === "dir" || F.findIndex((l) => l === e.fileType) < 0)
        return;
      let s = {
        tableId: w.params.id,
        path: e.filePath
      };
      f.value = !0, I(s).then((l) => {
        l.code === 200 ? (p.value = [e.id], k.setValue(l.data), b.value = e, v.value.setCheckedKeys([e.id], !0)) : T.error(l.msg), f.value = !1;
      });
    }
    return N(), (e, r) => {
      const s = m("el-tree"), l = m("el-col"), j = m("el-row"), g = S("loading");
      return o(), q("div", G, [
        x(j, { gutter: 20 }, {
          default: d(() => [
            C((o(), i(l, { span: 6 }, {
              default: d(() => [
                x(s, {
                  style: { width: "100%", "max-height": "700px", overflow: "auto" },
                  data: t(h),
                  props: E,
                  onNodeClick: V,
                  "node-key": "id",
                  "default-checked-keys": t(p),
                  "default-expand-all": "",
                  ref_key: "treeRef",
                  ref: v
                }, {
                  default: d(({ node: R, data: c }) => [
                    _("span", W, [
                      c.fileType === "dir" ? (o(), i(t(a), {
                        key: 0,
                        icon: "fa-regular fa-folder-open ",
                        class: "file-list-icon folder"
                      })) : c.fileType === "js" ? (o(), i(t(a), {
                        key: 1,
                        icon: "fa-brands fa-js-square",
                        class: "file-list-icon js"
                      })) : c.fileType === "html" ? (o(), i(t(a), {
                        key: 2,
                        icon: "fa-brands fa-html5 ",
                        class: "file-list-icon html"
                      })) : c.fileType === "css" || c.fileType === "less" || c.fileType === "scss" ? (o(), i(t(a), {
                        key: 3,
                        icon: "fa-brands fa-css3 ",
                        class: "file-list-icon css"
                      })) : c.fileType === "txt" ? (o(), i(t(a), {
                        key: 4,
                        icon: "fa-solid fa-text-height ",
                        class: "file-list-icon txt"
                      })) : (o(), i(t(a), {
                        key: 5,
                        icon: "fa-regular fa-file ",
                        class: "file-list-icon"
                      })),
                      _("span", null, M(R.label), 1)
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
                _("div", {
                  ref_key: "codeEditorRef",
                  ref: y,
                  class: "codeEditor"
                }, null, 512)
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
}, X = /* @__PURE__ */ L(K, [["__scopeId", "data-v-2390cbb5"]]);
export {
  X as default
};
