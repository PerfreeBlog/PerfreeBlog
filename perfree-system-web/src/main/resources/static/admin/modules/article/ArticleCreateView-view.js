import { C as Z } from "./lib/cherry-markdown.js";
import { s as Ee, r as Se } from "./lib/@element-plus.js";
import { _ as we, c as Fe, h as Ae, g as Ne, a as Be, t as Me, b as Ue } from "./lib/tabs.js";
import { p as Ie } from "./lib/js-pinyin.js";
function Re(_) {
  return axios.post("/api/auth/attach/page", _);
}
function ze() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function De(_) {
  return axios.put("/apiv/attach/update", _);
}
function Ge(_) {
  return axios.get("/api/auth/attach/get?id=" + _);
}
const m = window.Vue.resolveComponent, o = window.Vue.createVNode, d = window.Vue.withCtx, L = window.Vue.unref, z = window.Vue.createTextVNode, V = window.Vue.createElementVNode, ae = window.Vue.renderList, ne = window.Vue.Fragment, k = window.Vue.openBlock, U = window.Vue.createElementBlock, j = window.Vue.createBlock;
window.Vue.createCommentVNode;
const se = window.Vue.toDisplayString, ue = window.Vue.normalizeClass, Pe = window.Vue.withModifiers, de = window.Vue.isRef;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const Le = { class: "page" }, qe = { class: "search-box" }, Oe = { class: "table-box" }, Ke = { class: "attach-preview" }, He = { class: "image-slot" }, je = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Je = ["src"], Qe = {
  key: 2,
  class: "attach-other"
}, We = { class: "attach-name" }, Xe = { class: "operate-btn-box" }, Ye = { style: { "padding-right": "15px" } }, Ze = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, et = ["src"], tt = {
  key: 2,
  controls: "",
  preload: "none"
}, lt = ["src"], ot = { key: 3 }, at = { class: "showForm" }, nt = { class: "dialog-footer" }, st = window.Vue.reactive, A = window.Vue.ref, ut = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(_, { emit: E }) {
    const N = A(), e = A({
      pageNo: 1,
      pageSize: 8,
      total: 0,
      name: "",
      type: ""
    });
    let B = A([]), c = A(!1), h = A(/* @__PURE__ */ new Map());
    const g = E, w = _;
    let p = A(!1), I = A(""), R = A([]);
    const M = A(), n = A({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), b = st({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    });
    function t() {
      n.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, M.value && M.value.resetFields();
    }
    function y() {
      w.attachType && (e.value.type = w.attachType), c.value = !0, Re(e.value).then((i) => {
        i.data.list.forEach((a) => {
          const S = h.value.has(a.id);
          a.selected = S;
        }), B.value = i.data.list, e.value.total = i.data.total, c.value = !1;
      });
    }
    function f() {
      e.value = {
        attachConfigId: void 0,
        attachGroup: void 0,
        storage: void 0,
        name: ""
      }, N.value.resetFields();
    }
    function v(i) {
      if (!i.selected && h.value.size >= w.max) {
        ElMessage.error(`最多选择${w.max}个`);
        return;
      }
      i.selected = !i.selected, i.selected ? h.value.set(i.id, i) : h.value.delete(i.id), g("update:selectedAttach", Array.from(h.value.values()));
    }
    function C() {
      ze().then((i) => {
        R.value = i.data;
      });
    }
    function x(i) {
      t(), C(), Ge(i.id).then((a) => {
        n.value = a.data, I.value = "详情", p.value = !0;
      });
    }
    function G() {
      M.value.validate((i) => {
        i && De(n.value).then((a) => {
          a.code === 200 ? (ElMessage.success("修改成功"), p.value = !1, t(), y()) : ElMessage.error(a.msg);
        });
      });
    }
    return y(), (i, a) => {
      const S = m("el-input"), F = m("el-form-item"), P = m("el-button"), s = m("el-form"), he = m("Loading"), X = m("el-icon"), le = m("el-image"), ge = m("el-text"), Ve = m("InfoFilled"), ye = m("SuccessFilled"), Y = m("el-col"), oe = m("el-row"), be = m("el-pagination"), ke = m("el-link"), Ce = m("el-option"), xe = m("el-select"), $e = m("el-dialog");
      return k(), U("div", Le, [
        V("div", qe, [
          o(s, {
            inline: !0,
            model: e.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: N
          }, {
            default: d(() => [
              o(F, { label: "附件名称" }, {
                default: d(() => [
                  o(S, {
                    modelValue: e.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => e.value.name = l),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(F, null, {
                default: d(() => [
                  o(P, {
                    type: "primary",
                    onClick: y,
                    icon: L(Ee)
                  }, {
                    default: d(() => [
                      z("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  o(P, {
                    icon: L(Se),
                    onClick: f
                  }, {
                    default: d(() => [
                      z("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        V("div", Oe, [
          o(oe, { gutter: 15 }, {
            default: d(() => [
              (k(!0), U(ne, null, ae(L(B), (l) => (k(), j(Y, {
                span: 6,
                class: "attach-col",
                onClick: (Te) => v(l)
              }, {
                default: d(() => [
                  V("div", {
                    class: ue({ "attach-block": !0, selected: l.selected })
                  }, [
                    V("div", Ke, [
                      l.type && l.type === "img" ? (k(), j(le, {
                        key: l.url,
                        src: l.url,
                        lazy: "",
                        class: "attach-img",
                        loading: "lazy"
                      }, {
                        placeholder: d(() => [
                          V("div", He, [
                            o(X, { class: "is-loading" }, {
                              default: d(() => [
                                o(he)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 2
                      }, 1032, ["src"])) : l.type && l.type === "video" ? (k(), U("video", je, [
                        V("source", {
                          src: l.url
                        }, null, 8, Je)
                      ])) : (k(), U("div", Qe, se(l.path.split(".").pop()), 1))
                    ]),
                    V("div", We, [
                      o(ge, {
                        "line-clamp": "1",
                        style: { width: "100%" }
                      }, {
                        default: d(() => [
                          z(se(l.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    V("div", {
                      class: ue({ "operate-mask": !0, selected: l.selected })
                    }, null, 2),
                    V("div", Xe, [
                      o(X, {
                        class: "operate-btn",
                        onClick: Pe((Te) => x(l), ["stop"])
                      }, {
                        default: d(() => [
                          o(Ve)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      o(X, { class: "operate-btn select-btn" }, {
                        default: d(() => [
                          o(ye)
                        ]),
                        _: 1
                      })
                    ])
                  ], 2)
                ]),
                _: 2
              }, 1032, ["onClick"]))), 256))
            ]),
            _: 1
          }),
          o(be, {
            "current-page": e.value.pageNo,
            "onUpdate:currentPage": a[1] || (a[1] = (l) => e.value.pageNo = l),
            "page-size": e.value.pageSize,
            "onUpdate:pageSize": a[2] || (a[2] = (l) => e.value.pageSize = l),
            "page-sizes": [8, 16, 24],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: y,
            total: e.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o($e, {
          modelValue: L(p),
          "onUpdate:modelValue": a[10] || (a[10] = (l) => de(p) ? p.value = l : p = l),
          title: L(I),
          width: "800px",
          draggable: ""
        }, {
          footer: d(() => [
            V("span", nt, [
              o(P, {
                type: "primary",
                onClick: G
              }, {
                default: d(() => [
                  z("修 改")
                ]),
                _: 1
              }),
              o(P, {
                onClick: a[9] || (a[9] = (l) => {
                  de(p) ? p.value = !1 : p = !1, t();
                })
              }, {
                default: d(() => [
                  z("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: d(() => [
            o(oe, null, {
              default: d(() => [
                o(Y, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: d(() => [
                    V("div", Ye, [
                      n.value.type && n.value.type === "img" ? (k(), j(le, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (k(), U("video", Ze, [
                        V("source", {
                          src: n.value.url
                        }, null, 8, et)
                      ])) : n.value.type && n.value.type === "audio" ? (k(), U("audio", tt, [
                        V("source", {
                          src: n.value.url
                        }, null, 8, lt)
                      ])) : (k(), U("i", ot, [
                        z("无法预览，点击 "),
                        o(ke, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: d(() => [
                            z("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                o(Y, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: d(() => [
                    V("div", at, [
                      o(s, {
                        ref_key: "showFormRef",
                        ref: M,
                        model: n.value,
                        "label-width": "auto",
                        rules: b,
                        "label-position": "top"
                      }, {
                        default: d(() => [
                          o(F, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: d(() => [
                              o(S, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": a[3] || (a[3] = (l) => n.value.name = l)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(F, { label: "附件类型" }, {
                            default: d(() => [
                              o(S, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": a[4] || (a[4] = (l) => n.value.type = l),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(F, { label: "分组" }, {
                            default: d(() => [
                              o(xe, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": a[5] || (a[5] = (l) => n.value.attachGroup = l),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: d(() => [
                                  (k(!0), U(ne, null, ae(L(R), (l) => (k(), j(Ce, {
                                    key: l.attachGroup,
                                    label: l.attachGroup,
                                    value: l.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(F, { label: "存储路径" }, {
                            default: d(() => [
                              o(S, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": a[6] || (a[6] = (l) => n.value.path = l),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(F, { label: "访问地址" }, {
                            default: d(() => [
                              o(S, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": a[7] || (a[7] = (l) => n.value.url = l),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(F, { label: "附件描述" }, {
                            default: d(() => [
                              o(S, {
                                modelValue: n.value.desc,
                                "onUpdate:modelValue": a[8] || (a[8] = (l) => n.value.desc = l),
                                autosize: { minRows: 2, maxRows: 4 },
                                type: "textarea",
                                resize: "none",
                                placeholder: "请输入附件描述"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}, dt = /* @__PURE__ */ we(ut, [["__scopeId", "data-v-65c2206e"]]), ie = window.Vue.createElementVNode, q = window.Vue.unref, J = window.Vue.createVNode, it = window.Vue.toDisplayString, re = window.Vue.openBlock, ce = window.Vue.createElementBlock, rt = window.Vue.createCommentVNode, pe = window.Vue.createTextVNode, me = window.Vue.resolveComponent, Q = window.Vue.withCtx, _e = window.Vue.isRef, ct = window.Vue.Fragment, pt = { class: "dialog-footer" }, mt = { key: 0 }, _t = window.Vue.onMounted, O = window.Vue.ref, ft = {
  __name: "cherry-md-editor",
  props: ["initValue"],
  emits: ["contentChange"],
  setup(_, { expose: E, emit: N }) {
    let e = null;
    const B = O();
    let c = O(!1), h = O(""), g = O([]), w = O(""), p = O(0);
    const I = _, R = N;
    let M = Z.createMenuHook("插入图片", {
      iconName: "image",
      onClick: function(v) {
        w.value = "img", p.value = 8, h.value = "选择图片", c.value = !0;
      }
    }), n = Z.createMenuHook("插入视频", {
      iconName: "video",
      onClick: function(v) {
        w.value = "video", p.value = 1, h.value = "选择视频", c.value = !0;
      }
    });
    function b(v) {
      g.value = v;
    }
    function t() {
      g.value.forEach((v, C) => {
        if (w.value === "img") {
          let x = `
![${v.name}](${v.url})`;
          e.insert(x), C === g.value.length - 1 && e.insert(`
`);
        }
        if (w.value === "video") {
          let x = `
<video src="${v.url}" controls="controls" width="100%"></video>`;
          e.insert(x);
        }
      }), c.value = !1, g.value = [];
    }
    function y() {
      c.value = !1, g.value = [];
    }
    _t(() => {
      function v() {
        R("contentChange", e.getMarkdown(), e.getHtml());
      }
      e = new Z({
        el: B.value,
        value: I.initValue ? I.initValue : "写点什么?",
        forceAppend: !1,
        engine: {
          global: {
            classicBr: !0
          },
          syntax: {
            table: {
              enableChart: !1
            }
          }
        },
        toolbars: {
          // 定义顶部工具栏
          toolbar: [
            "undo",
            "redo",
            "|",
            "header",
            { bold: ["bold", "italic", "underline", "hr", "br", "strikethrough"] },
            "justify",
            "quote",
            "list",
            "link",
            "code",
            "table",
            "customImage",
            "customVideo"
          ],
          // 定义侧边栏，默认为空
          sidebar: ["theme", "mobilePreview", "copy"],
          // 定义顶部右侧工具栏，默认为空
          toolbarRight: ["fullScreen", "export"],
          // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
          bubble: ["bold", "italic", "underline", "strikethrough", "quote"],
          // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
          float: ["h1", "h2", "h3", "|", "checklist", "quote", "table", "code"],
          customMenu: {
            customImage: M,
            customVideo: n
          }
        },
        previewer: {
          enablePreviewerBubble: !1
        }
      }), e.on("afterChange", v);
    });
    function f() {
      e.setValue("写点什么?");
    }
    return E({
      resetContent: f
    }), (v, C) => {
      const x = me("el-button"), G = me("el-dialog");
      return re(), ce(ct, null, [
        ie("div", {
          ref_key: "markdownContainer",
          ref: B,
          style: { height: "600px", width: "100%" }
        }, null, 512),
        J(G, {
          modelValue: q(c),
          "onUpdate:modelValue": C[1] || (C[1] = (i) => _e(c) ? c.value = i : c = i),
          title: q(h),
          width: "800px",
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: Q(() => [
            ie("span", pt, [
              J(x, {
                type: "primary",
                onClick: t
              }, {
                default: Q(() => [
                  pe("确 定"),
                  q(g).length > 0 ? (re(), ce("span", mt, "(已选" + it(q(g).length) + "个)", 1)) : rt("", !0)
                ]),
                _: 1
              }),
              J(x, {
                onClick: C[0] || (C[0] = (i) => {
                  _e(c) ? c.value = !1 : c = !1, y();
                })
              }, {
                default: Q(() => [
                  pe("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: Q(() => [
            J(dt, {
              "onUpdate:selectedAttach": b,
              max: q(p),
              "attach-type": q(w)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
}, vt = window.Vue.openBlock, wt = window.Vue.createBlock, ht = window.Vue.createCommentVNode, gt = window.Vue.ref, Vt = {
  __name: "custom-editor",
  props: ["editorType", "initValue"],
  emits: ["contentChange"],
  setup(_, { expose: E, emit: N }) {
    const e = _, B = N, c = gt();
    function h(w, p) {
      B("contentChange", w, p);
    }
    function g() {
      c.value.resetContent();
    }
    return E({
      resetContent: g
    }), (w, p) => e.editorType === "Cherry(markdown)" ? (vt(), wt(ft, {
      key: 0,
      onContentChange: h,
      "init-value": e.initValue,
      ref_key: "editorRef",
      ref: c
    }, null, 8, ["init-value"])) : ht("", !0);
  }
}, T = window.Vue.createElementVNode, D = window.Vue.createTextVNode, $ = window.Vue.resolveComponent, u = window.Vue.createVNode, r = window.Vue.withCtx, H = window.Vue.openBlock, ee = window.Vue.createBlock, fe = window.Vue.unref, yt = window.Vue.renderList, bt = window.Vue.Fragment, ve = window.Vue.createElementBlock, kt = window.Vue.pushScopeId, Ct = window.Vue.popScopeId, W = (_) => (kt("data-v-07bb37ae"), _ = _(), Ct(), _), xt = { class: "page" }, $t = /* @__PURE__ */ W(() => /* @__PURE__ */ T("div", { class: "content-label" }, [
  /* @__PURE__ */ T("span", { class: "required" }, "*"),
  /* @__PURE__ */ D("文章标题 ")
], -1)), Tt = { class: "content-label" }, Et = /* @__PURE__ */ W(() => /* @__PURE__ */ T("div", { class: "content-label-left" }, [
  /* @__PURE__ */ T("span", { class: "required" }, "*"),
  /* @__PURE__ */ D("文章内容 ")
], -1)), St = { class: "content-label-right" }, Ft = { style: { display: "flex" } }, At = /* @__PURE__ */ W(() => /* @__PURE__ */ T("span", { class: "custom-label" }, "允许评论", -1)), Nt = { style: { "margin-left": "15px" } }, Bt = /* @__PURE__ */ W(() => /* @__PURE__ */ T("span", { class: "custom-label" }, "置顶", -1)), te = window.ElementPlus.ElMessage, Mt = window.ElementPlus.ElMessageBox, Ut = window.Vue.reactive, K = window.Vue.ref, It = {
  __name: "ArticleCreateView",
  setup(_) {
    const E = K("Cherry(markdown)"), N = K(), e = K({
      title: "",
      content: "",
      parseContent: "",
      selectTags: [],
      categoryIds: [],
      summary: "",
      metaKeywords: "",
      metaDescription: "",
      thumbnail: "",
      slug: "",
      isTop: 0,
      isComment: 1,
      flag: "",
      type: "article",
      contentModel: ""
    }), B = Ut({
      children: "children",
      label: "name",
      value: "id"
    });
    let c = K([]), h = K([]);
    const g = K();
    function w() {
      Fe({}).then((b) => {
        c.value = Ae(b.data, "id", "pid", "children", -1);
      });
    }
    function p() {
      Ne().then((b) => {
        h.value = b.data;
      });
    }
    function I() {
      e.value = {
        title: "",
        content: "",
        parseContent: "",
        selectTags: [],
        categoryIds: [],
        summary: "",
        metaKeywords: "",
        metaDescription: "",
        thumbnail: "",
        slug: "",
        isTop: 0,
        isComment: 1,
        flag: "",
        type: "article",
        contentModel: ""
      }, g.value.resetContent(), N.value.resetFields();
    }
    function R(b) {
      if (!e.value.title) {
        te.error("文章标题不能为空");
        return;
      }
      if (!e.value.content) {
        te.error("文章内容不能为空");
        return;
      }
      E.value.indexOf("markdown") >= 0 ? e.value.contentModel = "markdown" : e.value.contentModel = "html", e.value.status = b, e.value.tagIds = [], e.value.addTags = [], e.value.selectTags.forEach((t) => {
        t.id ? e.value.tagIds.push(t.id) : e.value.addTags.push(t);
      }), Be(e.value).then((t) => {
        t.code === 200 ? (I(), Mt.confirm("文章发表成功!", "提示", {
          confirmButtonText: "前往文章列表",
          cancelButtonText: "再写一篇",
          type: "success"
        }).then(() => {
          Me("", "/admin/article", ""), Ue("/admin/article/create");
        }).catch(() => {
        })) : te.error(t.msg);
      });
    }
    function M(b, t) {
      e.value.content = b, e.value.parseContent = t;
    }
    function n() {
      e.value.slug = Ie.getCamelChars(e.value.title);
    }
    return w(), p(), (b, t) => {
      const y = $("el-input"), f = $("el-form-item"), v = $("el-option"), C = $("el-select"), x = $("el-col"), G = $("el-button"), i = $("el-tree-select"), a = $("el-switch"), S = $("attach-select-input"), F = $("el-row"), P = $("el-form");
      return H(), ve("div", xt, [
        u(P, {
          model: e.value,
          class: "demo-form-inline",
          ref_key: "addFormRef",
          ref: N,
          "label-position": "top"
        }, {
          default: r(() => [
            u(F, { gutter: 24 }, {
              default: r(() => [
                u(x, { span: 17 }, {
                  default: r(() => [
                    u(f, { prop: "title" }, {
                      label: r(() => [
                        $t
                      ]),
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.title,
                          "onUpdate:modelValue": t[0] || (t[0] = (s) => e.value.title = s),
                          placeholder: "请输入文章标题",
                          clearable: "",
                          onChange: n
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      prop: "content",
                      class: "article-content-item"
                    }, {
                      label: r(() => [
                        T("div", Tt, [
                          Et,
                          T("div", St, [
                            D(" 切换编辑器: "),
                            u(C, {
                              placeholder: "Select",
                              size: "small",
                              style: { width: "180px" },
                              modelValue: E.value,
                              "onUpdate:modelValue": t[1] || (t[1] = (s) => E.value = s)
                            }, {
                              default: r(() => [
                                (H(), ee(v, {
                                  key: "MdEditor(markdown)",
                                  label: "MdEditor(markdown)",
                                  value: "MdEditor(markdown)"
                                })),
                                (H(), ee(v, {
                                  key: "Cherry(markdown)",
                                  label: "Cherry(markdown)",
                                  value: "Cherry(markdown)"
                                }))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      default: r(() => [
                        u(Vt, {
                          "editor-type": E.value,
                          "init-value": e.value.content,
                          onContentChange: M,
                          ref_key: "editorRef",
                          ref: g
                        }, null, 8, ["editor-type", "init-value"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                u(x, {
                  span: 7,
                  class: "article-right"
                }, {
                  default: r(() => [
                    u(f, null, {
                      default: r(() => [
                        u(G, {
                          type: "primary",
                          onClick: t[2] || (t[2] = (s) => R(0))
                        }, {
                          default: r(() => [
                            D("发布")
                          ]),
                          _: 1
                        }),
                        u(G, {
                          onClick: t[3] || (t[3] = (s) => R(1))
                        }, {
                          default: r(() => [
                            D("保存至草稿")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "访问地址别名",
                      prop: "slug"
                    }, {
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.slug,
                          "onUpdate:modelValue": t[4] || (t[4] = (s) => e.value.slug = s),
                          placeholder: "请输入访问地址别名",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "分类",
                      prop: "categoryIds"
                    }, {
                      default: r(() => [
                        u(i, {
                          modelValue: e.value.categoryIds,
                          "onUpdate:modelValue": t[5] || (t[5] = (s) => e.value.categoryIds = s),
                          data: fe(c),
                          props: B,
                          "check-strictly": "",
                          "render-after-expand": !1,
                          style: { width: "100%" },
                          clearable: "",
                          multiple: "",
                          placeholder: "请选择分类"
                        }, null, 8, ["modelValue", "data", "props"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "标签",
                      prop: "selectTags"
                    }, {
                      default: r(() => [
                        u(C, {
                          modelValue: e.value.selectTags,
                          "onUpdate:modelValue": t[6] || (t[6] = (s) => e.value.selectTags = s),
                          multiple: "",
                          filterable: "",
                          "allow-create": "",
                          "default-first-option": "",
                          "reserve-keyword": !1,
                          placeholder: "请选择或新增标签",
                          "value-key": "id"
                        }, {
                          default: r(() => [
                            (H(!0), ve(bt, null, yt(fe(h), (s) => (H(), ee(v, {
                              key: s.id,
                              label: s.name,
                              value: s
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "文章摘要",
                      prop: "summary"
                    }, {
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.summary,
                          "onUpdate:modelValue": t[7] || (t[7] = (s) => e.value.summary = s),
                          placeholder: "请输入文章摘要",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "SEO关键字",
                      prop: "metaKeywords"
                    }, {
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.metaKeywords,
                          "onUpdate:modelValue": t[8] || (t[8] = (s) => e.value.metaKeywords = s),
                          placeholder: "请输入SEO关键字",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "SEO描述",
                      prop: "metaDescription"
                    }, {
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.metaDescription,
                          "onUpdate:modelValue": t[9] || (t[9] = (s) => e.value.metaDescription = s),
                          placeholder: "请输入SEO描述",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "文章标识",
                      prop: "flag"
                    }, {
                      default: r(() => [
                        u(y, {
                          modelValue: e.value.flag,
                          "onUpdate:modelValue": t[10] || (t[10] = (s) => e.value.flag = s),
                          placeholder: "请输入文章标识",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    u(f, null, {
                      default: r(() => [
                        T("div", Ft, [
                          T("div", null, [
                            At,
                            D(),
                            u(a, {
                              modelValue: e.value.isComment,
                              "onUpdate:modelValue": t[11] || (t[11] = (s) => e.value.isComment = s),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ]),
                          T("div", Nt, [
                            Bt,
                            D(),
                            u(a, {
                              modelValue: e.value.isTop,
                              "onUpdate:modelValue": t[12] || (t[12] = (s) => e.value.isTop = s),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    u(f, {
                      label: "封面图",
                      prop: "thumbnail"
                    }, {
                      default: r(() => [
                        u(S, {
                          "attach-type": "img",
                          "enable-input": !0,
                          placeholder: "请选择或输入封面图地址",
                          "model-value": e.value.thumbnail,
                          "onUpdate:modelValue": t[13] || (t[13] = (s) => e.value.thumbnail = s)
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]);
    };
  }
}, Pt = /* @__PURE__ */ we(It, [["__scopeId", "data-v-07bb37ae"]]);
export {
  Pt as default
};
