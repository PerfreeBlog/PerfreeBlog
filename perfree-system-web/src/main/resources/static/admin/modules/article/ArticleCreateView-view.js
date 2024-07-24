import { s as Pe, r as He, f as Ke } from "./lib/@element-plus.js";
import { _ as se, c as Je, h as We, g as qe, a as je, t as Qe, b as Xe } from "./lib/tabs.js";
/* empty css                    */
import { V as Ye } from "./lib/vditor.js";
import { T as Ze, E as et } from "./lib/@wangeditor.js";
import { p as tt } from "./lib/js-pinyin.js";
function lt(h) {
  return axios.post("/api/auth/attach/page", h);
}
function ot() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function at(h) {
  return axios.put("/apiv/attach/update", h);
}
function nt(h) {
  return axios.get("/api/auth/attach/get?id=" + h);
}
const b = window.Vue.resolveComponent, i = window.Vue.createVNode, c = window.Vue.withCtx, M = window.Vue.unref, F = window.Vue.createTextVNode, $ = window.Vue.createElementVNode, re = window.Vue.renderList, ce = window.Vue.Fragment, C = window.Vue.openBlock, z = window.Vue.createElementBlock, j = window.Vue.createBlock;
window.Vue.createCommentVNode;
const pe = window.Vue.toDisplayString, me = window.Vue.normalizeClass, st = window.Vue.withModifiers, fe = window.Vue.isRef;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const it = { class: "page" }, ut = { class: "search-box" }, dt = { class: "table-box" }, rt = { class: "attach-preview" }, ct = { class: "image-slot" }, pt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, mt = ["src"], ft = {
  key: 2,
  class: "attach-other"
}, _t = { class: "attach-name" }, vt = { class: "operate-btn-box" }, wt = { style: { "padding-right": "15px" } }, ht = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Vt = ["src"], gt = {
  key: 2,
  controls: "",
  preload: "none"
}, yt = ["src"], bt = { key: 3 }, kt = { class: "showForm" }, xt = { class: "dialog-footer" }, $t = window.Vue.reactive, E = window.Vue.ref, Ct = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(h, { emit: k }) {
    const n = E(), e = E({
      pageNo: 1,
      pageSize: 8,
      total: 0,
      name: "",
      type: ""
    });
    let w = E([]), m = E(!1), _ = E(/* @__PURE__ */ new Map());
    const p = k, x = h;
    let V = E(!1), B = E(""), T = E([]);
    const g = E(), l = E({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), t = $t({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    });
    function d() {
      l.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, g.value && g.value.resetFields();
    }
    function s() {
      x.attachType && (e.value.type = x.attachType), m.value = !0, lt(e.value).then((v) => {
        v.data.list.forEach((u) => {
          const A = _.value.has(u.id);
          u.selected = A;
        }), w.value = v.data.list, e.value.total = v.data.total, m.value = !1;
      });
    }
    function y() {
      e.value = {
        attachConfigId: void 0,
        attachGroup: void 0,
        storage: void 0,
        name: ""
      }, n.value.resetFields();
    }
    function U(v) {
      if (!v.selected && _.value.size >= x.max) {
        ElMessage.error(`最多选择${x.max}个`);
        return;
      }
      v.selected = !v.selected, v.selected ? _.value.set(v.id, v) : _.value.delete(v.id), p("update:selectedAttach", Array.from(_.value.values()));
    }
    function J() {
      ot().then((v) => {
        T.value = v.data;
      });
    }
    function W(v) {
      d(), J(), nt(v.id).then((u) => {
        l.value = u.data, B.value = "详情", V.value = !0;
      });
    }
    function Z() {
      g.value.validate((v) => {
        v && at(l.value).then((u) => {
          u.code === 200 ? (ElMessage.success("修改成功"), V.value = !1, d(), s()) : ElMessage.error(u.msg);
        });
      });
    }
    return s(), (v, u) => {
      const A = b("el-input"), a = b("el-form-item"), q = b("el-button"), ie = b("el-form"), Ue = b("Loading"), ee = b("el-icon"), ue = b("el-image"), ze = b("el-text"), Fe = b("InfoFilled"), Re = b("SuccessFilled"), te = b("el-col"), de = b("el-row"), Me = b("el-pagination"), Ie = b("el-link"), Oe = b("el-option"), Ge = b("el-select"), De = b("el-dialog");
      return C(), z("div", it, [
        $("div", ut, [
          i(ie, {
            inline: !0,
            model: e.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: n
          }, {
            default: c(() => [
              i(a, { label: "附件名称" }, {
                default: c(() => [
                  i(A, {
                    modelValue: e.value.name,
                    "onUpdate:modelValue": u[0] || (u[0] = (o) => e.value.name = o),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(a, null, {
                default: c(() => [
                  i(q, {
                    type: "primary",
                    onClick: s,
                    icon: M(Pe)
                  }, {
                    default: c(() => [
                      F("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  i(q, {
                    icon: M(He),
                    onClick: y
                  }, {
                    default: c(() => [
                      F("重置")
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
        $("div", dt, [
          i(de, { gutter: 15 }, {
            default: c(() => [
              (C(!0), z(ce, null, re(M(w), (o) => (C(), j(te, {
                span: 6,
                class: "attach-col",
                onClick: (Le) => U(o)
              }, {
                default: c(() => [
                  $("div", {
                    class: me({ "attach-block": !0, selected: o.selected })
                  }, [
                    $("div", rt, [
                      o.type && o.type === "img" ? (C(), j(ue, {
                        key: o.url,
                        src: o.url,
                        lazy: "",
                        class: "attach-img",
                        loading: "lazy"
                      }, {
                        placeholder: c(() => [
                          $("div", ct, [
                            i(ee, { class: "is-loading" }, {
                              default: c(() => [
                                i(Ue)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 2
                      }, 1032, ["src"])) : o.type && o.type === "video" ? (C(), z("video", pt, [
                        $("source", {
                          src: o.url
                        }, null, 8, mt)
                      ])) : (C(), z("div", ft, pe(o.path.split(".").pop()), 1))
                    ]),
                    $("div", _t, [
                      i(ze, {
                        "line-clamp": "1",
                        style: { width: "100%" }
                      }, {
                        default: c(() => [
                          F(pe(o.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    $("div", {
                      class: me({ "operate-mask": !0, selected: o.selected })
                    }, null, 2),
                    $("div", vt, [
                      i(ee, {
                        class: "operate-btn",
                        onClick: st((Le) => W(o), ["stop"])
                      }, {
                        default: c(() => [
                          i(Fe)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      i(ee, { class: "operate-btn select-btn" }, {
                        default: c(() => [
                          i(Re)
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
          i(Me, {
            "current-page": e.value.pageNo,
            "onUpdate:currentPage": u[1] || (u[1] = (o) => e.value.pageNo = o),
            "page-size": e.value.pageSize,
            "onUpdate:pageSize": u[2] || (u[2] = (o) => e.value.pageSize = o),
            "page-sizes": [8, 16, 24],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: s,
            total: e.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        i(De, {
          modelValue: M(V),
          "onUpdate:modelValue": u[10] || (u[10] = (o) => fe(V) ? V.value = o : V = o),
          title: M(B),
          width: "800px",
          draggable: ""
        }, {
          footer: c(() => [
            $("span", xt, [
              i(q, {
                type: "primary",
                onClick: Z
              }, {
                default: c(() => [
                  F("修 改")
                ]),
                _: 1
              }),
              i(q, {
                onClick: u[9] || (u[9] = (o) => {
                  fe(V) ? V.value = !1 : V = !1, d();
                })
              }, {
                default: c(() => [
                  F("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: c(() => [
            i(de, null, {
              default: c(() => [
                i(te, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: c(() => [
                    $("div", wt, [
                      l.value.type && l.value.type === "img" ? (C(), j(ue, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: l.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [l.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : l.value.type && l.value.type === "video" ? (C(), z("video", ht, [
                        $("source", {
                          src: l.value.url
                        }, null, 8, Vt)
                      ])) : l.value.type && l.value.type === "audio" ? (C(), z("audio", gt, [
                        $("source", {
                          src: l.value.url
                        }, null, 8, yt)
                      ])) : (C(), z("i", bt, [
                        F("无法预览，点击 "),
                        i(Ie, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + l.value.configId + "/get/" + l.value.path
                        }, {
                          default: c(() => [
                            F("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                i(te, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: c(() => [
                    $("div", kt, [
                      i(ie, {
                        ref_key: "showFormRef",
                        ref: g,
                        model: l.value,
                        "label-width": "auto",
                        rules: t,
                        "label-position": "top"
                      }, {
                        default: c(() => [
                          i(a, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: c(() => [
                              i(A, {
                                modelValue: l.value.name,
                                "onUpdate:modelValue": u[3] || (u[3] = (o) => l.value.name = o)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          i(a, { label: "附件类型" }, {
                            default: c(() => [
                              i(A, {
                                modelValue: l.value.type,
                                "onUpdate:modelValue": u[4] || (u[4] = (o) => l.value.type = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          i(a, { label: "分组" }, {
                            default: c(() => [
                              i(Ge, {
                                modelValue: l.value.attachGroup,
                                "onUpdate:modelValue": u[5] || (u[5] = (o) => l.value.attachGroup = o),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: c(() => [
                                  (C(!0), z(ce, null, re(M(T), (o) => (C(), j(Oe, {
                                    key: o.attachGroup,
                                    label: o.attachGroup,
                                    value: o.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          i(a, { label: "存储路径" }, {
                            default: c(() => [
                              i(A, {
                                modelValue: l.value.path,
                                "onUpdate:modelValue": u[6] || (u[6] = (o) => l.value.path = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          i(a, { label: "访问地址" }, {
                            default: c(() => [
                              i(A, {
                                modelValue: l.value.url,
                                "onUpdate:modelValue": u[7] || (u[7] = (o) => l.value.url = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          i(a, { label: "附件描述" }, {
                            default: c(() => [
                              i(A, {
                                modelValue: l.value.desc,
                                "onUpdate:modelValue": u[8] || (u[8] = (o) => l.value.desc = o),
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
}, Be = /* @__PURE__ */ se(Ct, [["__scopeId", "data-v-65c2206e"]]), D = window.Vue.unref, le = window.Vue.resolveComponent, I = window.Vue.createVNode, L = window.Vue.withCtx, St = window.Vue.toDisplayString, _e = window.Vue.openBlock, ve = window.Vue.createElementBlock, At = window.Vue.createCommentVNode, we = window.Vue.createTextVNode, he = window.Vue.isRef, Et = window.Vue.createElementVNode;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const Nt = { style: { width: "100%" } }, Tt = { class: "dialog-footer" }, Bt = { key: 0 }, P = window.Vue.ref, Ut = window.Vue.watch, zt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue"],
  setup(h, { emit: k }) {
    P("请选择图片");
    let n = P(!1), e = P(""), w = P([]);
    const m = h, _ = k, p = P(m.modelValue);
    Ut(() => m.modelValue, (g, l) => {
      p.value = g;
    });
    function x() {
      n.value = !0, e.value = "请选择附件";
    }
    function V() {
      let g = "";
      w.value.forEach((l, t) => {
        g += l.url;
      }), p.value = g, n.value = !1, w.value = [], _("update:modelValue", p.value);
    }
    function B() {
      n.value = !1, w.value = [];
    }
    function T(g) {
      w.value = g;
    }
    return (g, l) => {
      const t = le("el-button"), d = le("el-input"), s = le("el-dialog");
      return _e(), ve("div", Nt, [
        I(d, {
          modelValue: p.value,
          "onUpdate:modelValue": l[0] || (l[0] = (y) => p.value = y),
          placeholder: m.placeholder,
          style: { width: "100%" },
          disabled: !m.enableInput
        }, {
          append: L(() => [
            I(t, {
              icon: D(Ke),
              type: "info",
              onClick: x
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        I(s, {
          modelValue: D(n),
          "onUpdate:modelValue": l[2] || (l[2] = (y) => he(n) ? n.value = y : n = y),
          title: D(e),
          width: "900px",
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: L(() => [
            Et("span", Tt, [
              I(t, {
                type: "primary",
                onClick: V
              }, {
                default: L(() => [
                  we("确 定"),
                  D(w).length > 0 ? (_e(), ve("span", Bt, "(已选" + St(D(w).length) + "个)", 1)) : At("", !0)
                ]),
                _: 1
              }),
              I(t, {
                onClick: l[1] || (l[1] = (y) => {
                  he(n) ? n.value = !1 : n = !1, B();
                })
              }, {
                default: L(() => [
                  we("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: L(() => [
            I(Be, {
              "onUpdate:selectedAttach": T,
              max: 1,
              "attach-type": m.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}, Ft = /* @__PURE__ */ se(zt, [["__scopeId", "data-v-c65d9d19"]]), Rt = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, Ve = window.Vue.createElementVNode, O = window.Vue.unref, Q = window.Vue.createVNode, Mt = window.Vue.toDisplayString, ge = window.Vue.openBlock, ye = window.Vue.createElementBlock, It = window.Vue.createCommentVNode, be = window.Vue.createTextVNode, ke = window.Vue.resolveComponent, X = window.Vue.withCtx, xe = window.Vue.isRef, Ot = window.Vue.Fragment, Gt = {
  ref: "vditor",
  id: "vditor"
}, Dt = { class: "dialog-footer" }, Lt = { key: 0 }, Pt = window.Vue.onBeforeUnmount, Ht = window.Vue.onMounted, H = window.Vue.ref, Kt = {
  __name: "vditor-md-editor",
  props: ["initValue"],
  setup(h, { expose: k }) {
    let n = "", e = H(!1), w = H(""), m = H([]), _ = H(""), p = H(0);
    const x = h;
    Ht(() => {
      n = new Ye("vditor", {
        height: 666,
        width: "100%",
        cdn: "/static/public/libs/vditor",
        placeholder: "写点什么?",
        toolbarConfig: {
          hide: !1,
          pin: !1
        },
        outline: {
          enable: !0
        },
        preview: {
          hljs: {
            lineNumber: !0
          }
        },
        cache: {
          enable: !1
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          {
            hotkey: "⇧⌘S",
            name: "video",
            tipPosition: "s",
            tip: "插入图片",
            className: "right",
            icon: '<svg t="1721714738903" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2729" width="200" height="200"><path d="M426.663822 378.880887A126.292491 126.292491 0 1 0 303.784641 256.001707 126.292491 126.292491 0 0 0 426.663822 378.880887z m0-176.638822a50.346331 50.346331 0 1 1-47.786348 53.759642 50.346331 50.346331 0 0 1 47.786348-53.759642zM1090.55273 341.334471L767.99488 699.732082 533.329778 535.893174a40.106399 40.106399 0 0 0-30.719795-11.093259 40.106399 40.106399 0 0 0-30.719796 11.093259L243.198379 837.97116a39.253072 39.253072 0 0 0 0 56.319625 40.959727 40.959727 0 0 0 57.172952 0L511.996587 616.105973l231.251791 163.838907a44.373038 44.373038 0 0 0 58.879608 0l341.331058-378.877474a39.253072 39.253072 0 0 0 0-56.319624 40.959727 40.959727 0 0 0-52.906314-3.413311z" fill="#333333" p-id="2730"></path><path d="M1262.924914 0.003413H102.399317A101.54599 101.54599 0 0 0 0 101.549403v820.047866A103.252645 103.252645 0 0 0 102.399317 1023.996587h1160.525597a101.54599 101.54599 0 0 0 102.399317-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.924914 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.745648a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832935a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="2731"></path></svg>',
            click() {
              _.value = "img", p.value = 8, w.value = "选择图片", e.value = !0;
            }
          },
          {
            hotkey: "⇧⌘S",
            name: "video",
            tipPosition: "s",
            tip: "插入视频",
            className: "right",
            icon: '<svg t="1721714674236" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1700" width="200" height="200"><path d="M256.006827 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0zM554.671502 383.147526c0-23.039846 16.213225-33.279778 37.546417-23.039847l227.838481 114.345905c41.813055 21.333191 40.959727 55.466297 0 75.94616l-33.279778 17.066553-193.705376 96.426024c-21.333191 10.239932-38.399744 0-38.399744-23.039847z" fill="#333333" p-id="1701"></path><path d="M0.008533 384.000853A41.813055 41.813055 0 0 1 41.821588 341.334471h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294A42.666382 42.666382 0 0 1 0.008533 384.000853zM0.008533 639.999147A41.813055 41.813055 0 0 1 41.821588 597.332764h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294A42.666382 42.666382 0 0 1 0.008533 639.999147zM1024.001707 384.000853a41.813055 41.813055 0 0 1 41.813054-42.666382h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666383zM1024.001707 639.999147a41.813055 41.813055 0 0 1 41.813054-42.666383h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666382z" fill="#333333" p-id="1702"></path><path d="M1024.001707 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0z" fill="#333333" p-id="1703"></path><path d="M1262.933447 0.003413H102.407851A101.54599 101.54599 0 0 0 0.008533 101.549403v820.047866A103.252645 103.252645 0 0 0 102.407851 1023.996587h1160.525596a101.54599 101.54599 0 0 0 102.399318-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.933447 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.754182a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832934a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="1704"></path></svg>',
            click() {
              _.value = "video", p.value = 1, w.value = "选择视频", e.value = !0;
            }
          },
          {
            hotkey: "⇧⌘S",
            name: "file",
            tipPosition: "s",
            tip: "插入附件",
            className: "right",
            icon: '<svg t="1721726209680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5092" width="200" height="200"><path d="M923.2 261.4h-45.7c-19.9 0-36 16.1-36 36s16.1 36 36 36h9.7v488.2h-748V217.2h196.7l85.6 103v0.1l0.1 0.1c6.6 7.9 16.6 13 27.7 13h182.4c19.9 0 36-16.1 36-36s-16.1-36-36-36h-81.5c13.4-35.3 44.7-60.1 81.1-60.1 48.6 0 88.1 44.3 88.1 98.7v304.2c0 54.4-39.5 98.7-88.1 98.7s-88.1-44.3-88.1-98.7V479.4c0-17.5 11.8-31.7 26.3-31.7s26.3 14.2 26.3 31.7h0.3c-0.2 1.4-0.3 2.8-0.3 4.2V601c0 19.9 16.1 36 36 36s36-16.1 36-36V483.5c0-1.4-0.1-2.8-0.3-4.2h0.3c0-57.2-44.1-103.7-98.3-103.7-51.9 0-94.6 42.7-98 96.6h-0.2v134.5c0.6 44.1 16.8 85.5 45.9 117 30.3 32.9 70.9 51 114.2 51s83.9-18.1 114.2-51c29-31.5 45.2-73 45.9-117V300c0-45-16.3-87.5-45.9-119.6-30.3-32.9-70.9-51-114.2-51s-83.9 18.1-114.2 51c-21 22.7-35.2 50.7-41.8 81h-9l-85.7-103.2c-6.8-8.2-17-13-27.7-13H103.1c-19.9 0-36 16.1-36 36V857.6c0 19.9 16.1 36 36 36h820c19.9 0 36-16.1 36-36V297.4c0.1-19.9-16-36-35.9-36z" fill="#333333" p-id="5093"></path></svg>',
            click() {
              _.value = "other", p.value = 1, w.value = "选择附件", e.value = !0;
            }
          },
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          { name: "more", toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview"] }
        ],
        upload: {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(Rt.STORAGE_TOKEN)).accessToken
          },
          fieldName: "file",
          filename: (t) => t.replace(/\W/g, ""),
          linkToImgUrl: "/api/auth/attach/uploadAttachByUrl",
          linkToImgFormat(t) {
            let d = null, s = JSON.parse(t);
            return s.code === 200 && (d = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                originalURL: s.data.originalURL,
                url: s.data.url
              }
            })), d;
          },
          multiple: !1,
          url: "/api/auth/attach/upload",
          format(t, d) {
            let s = null, y = JSON.parse(d);
            return y.code === 200 && (s = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                errFiles: [],
                succMap: {
                  [y.data.path]: y.data.url
                }
              }
            })), s;
          },
          withCredentials: !1
        },
        after: () => {
          n.setValue(x.initValue ? x.initValue : "");
        }
      });
    }), Pt(() => {
      g();
    });
    function V(t) {
      m.value = t;
    }
    function B() {
      m.value.forEach((t, d) => {
        if (_.value === "img") {
          let s = `
![${t.name}](${t.url})`;
          n.insertValue(s), d === m.value.length - 1 && n.insertValue(`
`);
        }
        if (_.value === "video") {
          let s = `
<video src="${t.url}" controls="controls" width="100%"></video>`;
          n.insertValue(s);
        }
        if (_.value === "other") {
          let s = `
[${t.name}](${t.url})`;
          n.insertValue(s);
        }
      }), e.value = !1, m.value = [];
    }
    function T() {
      e.value = !1, m.value = [];
    }
    function g() {
      n.deleteValue(), n.clearCache(), n.clearStack(), n.destroy();
    }
    function l() {
      return {
        content: n.getValue(),
        parseContent: n.getHTML()
      };
    }
    return k({
      resetContent: g,
      getValue: l
    }), (t, d) => {
      const s = ke("el-button"), y = ke("el-dialog");
      return ge(), ye(Ot, null, [
        Ve("div", Gt, null, 512),
        Q(y, {
          modelValue: O(e),
          "onUpdate:modelValue": d[1] || (d[1] = (U) => xe(e) ? e.value = U : e = U),
          title: O(w),
          width: "900px",
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: X(() => [
            Ve("span", Dt, [
              Q(s, {
                type: "primary",
                onClick: B
              }, {
                default: X(() => [
                  be("确 定"),
                  O(m).length > 0 ? (ge(), ye("span", Lt, "(已选" + Mt(O(m).length) + "个)", 1)) : It("", !0)
                ]),
                _: 1
              }),
              Q(s, {
                onClick: d[0] || (d[0] = (U) => {
                  xe(e) ? e.value = !1 : e = !1, T();
                })
              }, {
                default: X(() => [
                  be("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: X(() => [
            Q(Be, {
              "onUpdate:selectedAttach": V,
              max: O(p),
              "attach-type": O(_)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
}, $e = window.Vue.unref, Ce = window.Vue.createVNode, Jt = window.Vue.openBlock, Wt = window.Vue.createElementBlock, qt = { style: { border: "1px solid #ccc", "z-index": "999" } }, jt = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const Se = window.Vue.ref, Qt = window.Vue.shallowRef, Xt = {
  __name: "wang-rich-editor",
  setup(h) {
    const k = Se("default"), n = Qt(), e = Se(""), w = {}, m = { placeholder: "写点什么?" };
    jt(() => {
      const p = n.value;
      p != null && p.destroy();
    });
    const _ = (p) => {
      n.value = p, console.log(p.getConfig());
    };
    return (p, x) => (Jt(), Wt("div", qt, [
      Ce($e(Ze), {
        style: { "border-bottom": "1px solid #ccc" },
        editor: n.value,
        defaultConfig: w,
        mode: k.value
      }, null, 8, ["editor", "mode"]),
      Ce($e(et), {
        style: { height: "565px", "overflow-y": "hidden" },
        modelValue: e.value,
        "onUpdate:modelValue": x[0] || (x[0] = (V) => e.value = V),
        defaultConfig: m,
        mode: k.value,
        onOnCreated: _
      }, null, 8, ["modelValue", "mode"])
    ]));
  }
}, oe = window.Vue.openBlock, Ae = window.Vue.createBlock, Ee = window.Vue.createCommentVNode, Yt = window.Vue.Fragment, Zt = window.Vue.createElementBlock, el = window.Vue.ref, tl = {
  __name: "custom-editor",
  props: ["editorType", "initValue"],
  setup(h, { expose: k }) {
    const n = h, e = el();
    function w() {
      e.value.resetContent();
    }
    function m() {
      return e.value.getValue();
    }
    return k({
      resetContent: w,
      getValue: m
    }), (_, p) => (oe(), Zt(Yt, null, [
      n.editorType === "Vditor(markdown)" ? (oe(), Ae(Kt, {
        key: 0,
        "init-value": n.initValue,
        ref_key: "editorRef",
        ref: e
      }, null, 8, ["init-value"])) : Ee("", !0),
      n.editorType === "WangEditor(富文本)" ? (oe(), Ae(Xt, { key: 1 })) : Ee("", !0)
    ], 64));
  }
}, S = window.Vue.createElementVNode, R = window.Vue.createTextVNode, N = window.Vue.resolveComponent, r = window.Vue.createVNode, f = window.Vue.withCtx, K = window.Vue.openBlock, ae = window.Vue.createBlock, Ne = window.Vue.unref, ll = window.Vue.renderList, ol = window.Vue.Fragment, Te = window.Vue.createElementBlock, al = window.Vue.pushScopeId, nl = window.Vue.popScopeId, Y = (h) => (al("data-v-fe11a9a9"), h = h(), nl(), h), sl = { class: "page" }, il = /* @__PURE__ */ Y(() => /* @__PURE__ */ S("div", { class: "content-label" }, [
  /* @__PURE__ */ S("span", { class: "required" }, "*"),
  /* @__PURE__ */ R("文章标题 ")
], -1)), ul = { class: "content-label" }, dl = /* @__PURE__ */ Y(() => /* @__PURE__ */ S("div", { class: "content-label-left" }, [
  /* @__PURE__ */ S("span", { class: "required" }, "*"),
  /* @__PURE__ */ R("文章内容 ")
], -1)), rl = { class: "content-label-right" }, cl = { style: { display: "flex" } }, pl = /* @__PURE__ */ Y(() => /* @__PURE__ */ S("span", { class: "custom-label" }, "允许评论", -1)), ml = { style: { "margin-left": "15px" } }, fl = /* @__PURE__ */ Y(() => /* @__PURE__ */ S("span", { class: "custom-label" }, "置顶", -1)), ne = window.ElementPlus.ElMessage, _l = window.ElementPlus.ElMessageBox, vl = window.Vue.reactive, G = window.Vue.ref, wl = {
  __name: "ArticleCreateView",
  setup(h) {
    const k = G("Vditor(markdown)"), n = G(), e = G({
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
    }), w = vl({
      children: "children",
      label: "name",
      value: "id"
    });
    let m = G([]), _ = G([]);
    const p = G();
    function x() {
      Je({}).then((l) => {
        m.value = We(l.data, "id", "pid", "children", -1);
      });
    }
    function V() {
      qe().then((l) => {
        _.value = l.data;
      });
    }
    function B() {
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
      }, p.value.resetContent(), n.value.resetFields();
    }
    function T(l) {
      if (!e.value.title) {
        ne.error("文章标题不能为空");
        return;
      }
      k.value.indexOf("markdown") >= 0 ? e.value.contentModel = "markdown" : e.value.contentModel = "html";
      let t = p.value.getValue();
      if (e.value.content = t.content, e.value.parseContent = t.parseContent, !e.value.content) {
        ne.error("文章内容不能为空");
        return;
      }
      e.value.status = l, e.value.tagIds = [], e.value.addTags = [], e.value.selectTags.forEach((d) => {
        d.id ? e.value.tagIds.push(d.id) : e.value.addTags.push(d);
      }), je(e.value).then((d) => {
        d.code === 200 ? (B(), _l.confirm("文章发表成功!", "提示", {
          confirmButtonText: "前往文章列表",
          cancelButtonText: "再写一篇",
          type: "success"
        }).then(() => {
          Qe("", "/admin/article", ""), Xe("/admin/article/create");
        }).catch(() => {
        })) : ne.error(d.msg);
      });
    }
    function g() {
      e.value.slug = tt.getCamelChars(e.value.title);
    }
    return x(), V(), (l, t) => {
      const d = N("el-input"), s = N("el-form-item"), y = N("el-option"), U = N("el-select"), J = N("el-col"), W = N("el-button"), Z = N("el-tree-select"), v = N("el-switch"), u = N("el-row"), A = N("el-form");
      return K(), Te("div", sl, [
        r(A, {
          model: e.value,
          class: "demo-form-inline",
          ref_key: "addFormRef",
          ref: n,
          "label-position": "top"
        }, {
          default: f(() => [
            r(u, { gutter: 24 }, {
              default: f(() => [
                r(J, { span: 17 }, {
                  default: f(() => [
                    r(s, { prop: "title" }, {
                      label: f(() => [
                        il
                      ]),
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.title,
                          "onUpdate:modelValue": t[0] || (t[0] = (a) => e.value.title = a),
                          placeholder: "请输入文章标题",
                          clearable: "",
                          onChange: g
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      prop: "content",
                      class: "article-content-item"
                    }, {
                      label: f(() => [
                        S("div", ul, [
                          dl,
                          S("div", rl, [
                            R(" 切换编辑器: "),
                            r(U, {
                              placeholder: "Select",
                              size: "small",
                              style: { width: "180px" },
                              modelValue: k.value,
                              "onUpdate:modelValue": t[1] || (t[1] = (a) => k.value = a)
                            }, {
                              default: f(() => [
                                (K(), ae(y, {
                                  key: "Vditor(markdown)",
                                  label: "Vditor(markdown)",
                                  value: "Vditor(markdown)"
                                })),
                                (K(), ae(y, {
                                  key: "WangEditor(富文本)",
                                  label: "WangEditor(富文本)",
                                  value: "WangEditor(富文本)"
                                }))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      default: f(() => [
                        r(tl, {
                          "editor-type": k.value,
                          "init-value": e.value.content,
                          ref_key: "editorRef",
                          ref: p
                        }, null, 8, ["editor-type", "init-value"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                r(J, {
                  span: 7,
                  class: "article-right"
                }, {
                  default: f(() => [
                    r(s, null, {
                      default: f(() => [
                        r(W, {
                          type: "primary",
                          onClick: t[2] || (t[2] = (a) => T(0))
                        }, {
                          default: f(() => [
                            R("发布")
                          ]),
                          _: 1
                        }),
                        r(W, {
                          onClick: t[3] || (t[3] = (a) => T(1))
                        }, {
                          default: f(() => [
                            R("保存至草稿")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "访问地址别名",
                      prop: "slug"
                    }, {
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.slug,
                          "onUpdate:modelValue": t[4] || (t[4] = (a) => e.value.slug = a),
                          placeholder: "请输入访问地址别名",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "分类",
                      prop: "categoryIds"
                    }, {
                      default: f(() => [
                        r(Z, {
                          modelValue: e.value.categoryIds,
                          "onUpdate:modelValue": t[5] || (t[5] = (a) => e.value.categoryIds = a),
                          data: Ne(m),
                          props: w,
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
                    r(s, {
                      label: "标签",
                      prop: "selectTags"
                    }, {
                      default: f(() => [
                        r(U, {
                          modelValue: e.value.selectTags,
                          "onUpdate:modelValue": t[6] || (t[6] = (a) => e.value.selectTags = a),
                          multiple: "",
                          filterable: "",
                          "allow-create": "",
                          "default-first-option": "",
                          "reserve-keyword": !1,
                          placeholder: "请选择或新增标签",
                          "value-key": "id"
                        }, {
                          default: f(() => [
                            (K(!0), Te(ol, null, ll(Ne(_), (a) => (K(), ae(y, {
                              key: a.id,
                              label: a.name,
                              value: a
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "文章摘要",
                      prop: "summary"
                    }, {
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.summary,
                          "onUpdate:modelValue": t[7] || (t[7] = (a) => e.value.summary = a),
                          placeholder: "请输入文章摘要",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "SEO关键字",
                      prop: "metaKeywords"
                    }, {
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.metaKeywords,
                          "onUpdate:modelValue": t[8] || (t[8] = (a) => e.value.metaKeywords = a),
                          placeholder: "请输入SEO关键字",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "SEO描述",
                      prop: "metaDescription"
                    }, {
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.metaDescription,
                          "onUpdate:modelValue": t[9] || (t[9] = (a) => e.value.metaDescription = a),
                          placeholder: "请输入SEO描述",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "文章标识",
                      prop: "flag"
                    }, {
                      default: f(() => [
                        r(d, {
                          modelValue: e.value.flag,
                          "onUpdate:modelValue": t[10] || (t[10] = (a) => e.value.flag = a),
                          placeholder: "请输入文章标识",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    r(s, null, {
                      default: f(() => [
                        S("div", cl, [
                          S("div", null, [
                            pl,
                            R(),
                            r(v, {
                              modelValue: e.value.isComment,
                              "onUpdate:modelValue": t[11] || (t[11] = (a) => e.value.isComment = a),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ]),
                          S("div", ml, [
                            fl,
                            R(),
                            r(v, {
                              modelValue: e.value.isTop,
                              "onUpdate:modelValue": t[12] || (t[12] = (a) => e.value.isTop = a),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    r(s, {
                      label: "封面图",
                      prop: "thumbnail"
                    }, {
                      default: f(() => [
                        r(Ft, {
                          "attach-type": "img",
                          "enable-input": !0,
                          placeholder: "请选择或输入封面图地址",
                          "model-value": e.value.thumbnail,
                          "onUpdate:modelValue": t[13] || (t[13] = (a) => e.value.thumbnail = a)
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
}, xl = /* @__PURE__ */ se(wl, [["__scopeId", "data-v-fe11a9a9"]]);
export {
  xl as default
};
