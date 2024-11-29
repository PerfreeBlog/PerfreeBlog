import { d as me, p as tl } from "./lib/perfree.js";
import { s as Ke, r as Me, u as ze, d as al, p as ol, b as nl, e as il, a as ul } from "./lib/@element-plus.js";
import { f as rl } from "./lib/mailServer.js";
import { i as dl } from "./lib/aieditor.js";
function sl(m) {
  return axios.post("/api/auth/mailTemplate/page", m);
}
function pl(m) {
  return axios.post("/api/auth/mailTemplate/add", m);
}
function cl(m) {
  return axios.post("/api/auth/mailTemplate/update", m);
}
function ml(m) {
  return axios.delete("/api/auth/mailTemplate/del?id=" + m);
}
function Ge(m) {
  return axios.get("/api/auth/mailTemplate/get?id=" + m);
}
function fl(m) {
  return axios.post("/api/auth/mailTemplate/export", m, { responseType: "blob" });
}
function vl(m) {
  return axios.post("/api/auth/mailTemplate/testMail", m);
}
function wl(m) {
  return axios.post("/api/auth/attach/page", m);
}
function _l() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function gl(m) {
  return axios.put("/apiv/attach/update", m);
}
function Vl(m) {
  return axios.get("/api/auth/attach/get?id=" + m);
}
const Je = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, hl = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function bl() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const We = (m, P) => {
  const f = m.__vccOpts || m;
  for (const [o, V] of P)
    f[o] = V;
  return f;
}, h = window.Vue.resolveComponent, n = window.Vue.createVNode, d = window.Vue.withCtx, k = window.Vue.unref, pe = window.Vue.renderList, ce = window.Vue.Fragment, b = window.Vue.openBlock, B = window.Vue.createElementBlock, ne = window.Vue.createBlock, K = window.Vue.createTextVNode, C = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Le = window.Vue.toDisplayString, Ie = window.Vue.normalizeClass, yl = window.Vue.withModifiers, Fe = window.Vue.isRef, kl = { class: "page" }, Cl = { class: "search-box" }, xl = { class: "table-box" }, Tl = { class: "attach-list-box" }, Al = ["onClick"], Sl = { class: "attach-preview" }, $l = { class: "imgLoading" }, Fl = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, Ul = ["src"], El = {
  key: 2,
  class: "attach-other"
}, Ml = { class: "attach-name" }, Nl = { class: "operate-btn-box" }, Rl = { style: { "padding-right": "15px" } }, zl = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Gl = ["src"], Ll = {
  key: 2,
  controls: "",
  preload: "none"
}, Il = ["src"], Bl = { key: 3 }, Hl = { class: "showForm" }, Pl = { class: "dialog-footer" }, Ol = window.Vue.computed, Dl = window.Vue.reactive, U = window.Vue.ref, ie = window.ElementPlus.ElMessage, ql = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(m, { emit: P }) {
    const f = U(), o = U({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let V = U([]), L = U(!1), S = U(/* @__PURE__ */ new Map());
    const E = P, v = m;
    let g = U(!1), q = U(""), R = U([]);
    const O = U(), r = U({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), X = Dl({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), c = U();
    let p = U(), H = U(!1), W = U([]);
    const y = U({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let ye = localStorage.getItem(Je.STORAGE_TOKEN), ke = hl.baseURL, Ce = {
      Authorization: "Bearer " + JSON.parse(ye).accessToken
    };
    const D = Ol(() => {
      switch (v.attachType) {
        case "img":
          return "image/*";
        case "video":
          return "video/*";
        case "audio":
          return "audio/*";
        default:
          return "*";
      }
    });
    function de() {
      r.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, O.value && O.value.resetFields();
    }
    function I() {
      v.attachType && (o.value.type = v.attachType), L.value = !0, wl(o.value).then((s) => {
        s.data.list.forEach((l) => {
          l.selected = S.value.has(l.id);
        }), V.value = s.data.list, o.value.total = s.data.total, L.value = !1;
      });
    }
    function xe() {
      o.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, f.value.resetFields(), I();
    }
    function Te(s) {
      if (!s.selected && S.value.size >= v.max) {
        ie.error(`最多选择${v.max}个`);
        return;
      }
      s.selected = !s.selected, s.selected ? S.value.set(s.id, s) : S.value.delete(s.id), E("update:selectedAttach", Array.from(S.value.values()));
    }
    function ae() {
      _l().then((s) => {
        R.value = s.data;
      });
    }
    function Ae(s) {
      de(), ae(), Vl(s.id).then((l) => {
        r.value = l.data, q.value = "详情", g.value = !0;
      });
    }
    function Se() {
      O.value.validate((s) => {
        s && gl(r.value).then((l) => {
          l.code === 200 ? (ie.success("修改成功"), g.value = !1, de(), I()) : ie.error(l.msg);
        });
      });
    }
    function w() {
      ae(), I();
    }
    function e(s, l, Z) {
      s.code === 200 ? ie.success(`[${l.name}]上传成功`) : (ie.error(s.msg), p.value.handleRemove(l));
    }
    function $() {
      T(), q.value = "上传附件", fe(), ae(), H.value = !0;
    }
    function T() {
      y.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, c.value && c.value.resetFields();
    }
    function fe() {
      bl().then((s) => {
        W.value = s.data, s.data.forEach((l) => {
          l.master && (y.value.attachConfigId = l.id);
        });
      });
    }
    function ve(s) {
      ie.error("上传失败,请检查网络是否通通畅");
    }
    return ae(), I(), (s, l) => {
      const Z = h("el-input"), F = h("el-form-item"), M = h("el-option"), Y = h("el-select"), ee = h("el-button"), se = h("el-form"), $e = h("Loading"), le = h("el-icon"), j = h("el-image"), we = h("el-text"), a = h("InfoFilled"), oe = h("SuccessFilled"), Qe = h("el-pagination"), Xe = h("el-link"), Ne = h("el-col"), Ye = h("el-row"), Re = h("el-dialog"), el = h("el-upload");
      return b(), B("div", kl, [
        C("div", Cl, [
          n(se, {
            inline: !0,
            model: o.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: f
          }, {
            default: d(() => [
              n(F, { label: "附件名称" }, {
                default: d(() => [
                  n(Z, {
                    modelValue: o.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (t) => o.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(F, { label: "分组" }, {
                default: d(() => [
                  n(Y, {
                    modelValue: o.value.attachGroup,
                    "onUpdate:modelValue": l[1] || (l[1] = (t) => o.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: d(() => [
                      (b(!0), B(ce, null, pe(k(R), (t) => (b(), ne(M, {
                        key: t.attachGroup,
                        label: t.attachGroup,
                        value: t.attachGroup
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(F, null, {
                default: d(() => [
                  n(ee, {
                    type: "primary",
                    onClick: I,
                    icon: k(Ke)
                  }, {
                    default: d(() => l[16] || (l[16] = [
                      K("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  n(ee, {
                    icon: k(Me),
                    onClick: xe
                  }, {
                    default: d(() => l[17] || (l[17] = [
                      K("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              n(F, null, {
                default: d(() => [
                  n(ee, {
                    icon: k(ze),
                    type: "primary",
                    plain: "",
                    onClick: $
                  }, {
                    default: d(() => l[18] || (l[18] = [
                      K("上传附件")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        C("div", xl, [
          C("div", Tl, [
            (b(!0), B(ce, null, pe(k(V), (t) => (b(), B("div", {
              class: Ie({ "attach-block": !0, selected: t.selected }),
              onClick: (ll) => Te(t)
            }, [
              C("div", Sl, [
                t.type && t.type === "img" ? (b(), ne(j, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: d(() => [
                    C("div", $l, [
                      n(le, { class: "is-loading" }, {
                        default: d(() => [
                          n($e)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (b(), B("video", Fl, [
                  C("source", {
                    src: t.url
                  }, null, 8, Ul)
                ])) : (b(), B("div", El, Le(t.path.split(".").pop()), 1))
              ]),
              C("div", Ml, [
                n(we, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: d(() => [
                    K(Le(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              C("div", {
                class: Ie({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              C("div", Nl, [
                n(le, {
                  class: "operate-btn",
                  onClick: yl((ll) => Ae(t), ["stop"])
                }, {
                  default: d(() => [
                    n(a)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                n(le, { class: "operate-btn select-btn" }, {
                  default: d(() => [
                    n(oe)
                  ]),
                  _: 1
                })
              ])
            ], 10, Al))), 256))
          ]),
          n(Qe, {
            "current-page": o.value.pageNo,
            "onUpdate:currentPage": l[2] || (l[2] = (t) => o.value.pageNo = t),
            "page-size": o.value.pageSize,
            "onUpdate:pageSize": l[3] || (l[3] = (t) => o.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: I,
            total: o.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(Re, {
          modelValue: k(g),
          "onUpdate:modelValue": l[11] || (l[11] = (t) => Fe(g) ? g.value = t : g = t),
          title: k(q),
          width: k(me)(800),
          draggable: ""
        }, {
          footer: d(() => [
            C("span", Pl, [
              n(ee, {
                type: "primary",
                onClick: Se
              }, {
                default: d(() => l[21] || (l[21] = [
                  K("修 改")
                ])),
                _: 1
              }),
              n(ee, {
                onClick: l[10] || (l[10] = (t) => {
                  Fe(g) ? g.value = !1 : g = !1, de();
                })
              }, {
                default: d(() => l[22] || (l[22] = [
                  K("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: d(() => [
            n(Ye, null, {
              default: d(() => [
                n(Ne, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: d(() => [
                    C("div", Rl, [
                      r.value.type && r.value.type === "img" ? (b(), ne(j, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: r.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [r.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : r.value.type && r.value.type === "video" ? (b(), B("video", zl, [
                        C("source", {
                          src: r.value.url
                        }, null, 8, Gl)
                      ])) : r.value.type && r.value.type === "audio" ? (b(), B("audio", Ll, [
                        C("source", {
                          src: r.value.url
                        }, null, 8, Il)
                      ])) : (b(), B("i", Bl, [
                        l[20] || (l[20] = K("无法预览，点击 ")),
                        n(Xe, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + r.value.configId + "/get/" + r.value.path
                        }, {
                          default: d(() => l[19] || (l[19] = [
                            K("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                n(Ne, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: d(() => [
                    C("div", Hl, [
                      n(se, {
                        ref_key: "showFormRef",
                        ref: O,
                        model: r.value,
                        "label-width": "auto",
                        rules: X,
                        "label-position": "top"
                      }, {
                        default: d(() => [
                          n(F, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: d(() => [
                              n(Z, {
                                modelValue: r.value.name,
                                "onUpdate:modelValue": l[4] || (l[4] = (t) => r.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(F, { label: "附件类型" }, {
                            default: d(() => [
                              n(Z, {
                                modelValue: r.value.type,
                                "onUpdate:modelValue": l[5] || (l[5] = (t) => r.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(F, { label: "分组" }, {
                            default: d(() => [
                              n(Y, {
                                modelValue: r.value.attachGroup,
                                "onUpdate:modelValue": l[6] || (l[6] = (t) => r.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: d(() => [
                                  (b(!0), B(ce, null, pe(k(R), (t) => (b(), ne(M, {
                                    key: t.attachGroup,
                                    label: t.attachGroup,
                                    value: t.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(F, { label: "存储路径" }, {
                            default: d(() => [
                              n(Z, {
                                modelValue: r.value.path,
                                "onUpdate:modelValue": l[7] || (l[7] = (t) => r.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(F, { label: "访问地址" }, {
                            default: d(() => [
                              n(Z, {
                                modelValue: r.value.url,
                                "onUpdate:modelValue": l[8] || (l[8] = (t) => r.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(F, { label: "附件描述" }, {
                            default: d(() => [
                              n(Z, {
                                modelValue: r.value.desc,
                                "onUpdate:modelValue": l[9] || (l[9] = (t) => r.value.desc = t),
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
        }, 8, ["modelValue", "title", "width"]),
        n(Re, {
          modelValue: k(H),
          "onUpdate:modelValue": l[15] || (l[15] = (t) => Fe(H) ? H.value = t : H = t),
          title: k(q),
          width: k(me)(600),
          draggable: "",
          onClose: w
        }, {
          default: d(() => [
            n(se, {
              ref_key: "addFormRef",
              ref: c,
              model: y.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: d(() => [
                n(F, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: d(() => [
                    n(Y, {
                      modelValue: y.value.attachConfigId,
                      "onUpdate:modelValue": l[12] || (l[12] = (t) => y.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: d(() => [
                        (b(!0), B(ce, null, pe(k(W), (t) => (b(), ne(M, {
                          key: t.id,
                          label: t.name,
                          value: t.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n(F, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: d(() => [
                    n(Y, {
                      modelValue: y.value.attachGroup,
                      "onUpdate:modelValue": l[13] || (l[13] = (t) => y.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: d(() => [
                        (b(!0), B(ce, null, pe(k(R), (t) => (b(), ne(M, {
                          key: t.attachGroup,
                          label: t.attachGroup,
                          value: t.attachGroup
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n(F, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: d(() => [
                    n(el, {
                      class: "upload-demo",
                      drag: "",
                      headers: k(Ce),
                      action: k(ke) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: p,
                      "file-list": y.value.fileList,
                      "onUpdate:fileList": l[14] || (l[14] = (t) => y.value.fileList = t),
                      data: { attachConfigId: y.value.attachConfigId, attachGroup: y.value.attachGroup },
                      "on-success": e,
                      "on-error": ve,
                      accept: D.value
                    }, {
                      tip: d(() => l[23] || (l[23] = [
                        C("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: d(() => [
                        n(le, { class: "el-icon--upload" }, {
                          default: d(() => [
                            n(k(ze))
                          ]),
                          _: 1
                        }),
                        l[24] || (l[24] = C("div", { class: "el-upload__text" }, [
                          K(" 拖拽文件到此处或者"),
                          C("em", null, "点击上传")
                        ], -1))
                      ]),
                      _: 1
                    }, 8, ["headers", "action", "file-list", "data", "accept"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Zl = /* @__PURE__ */ We(ql, [["__scopeId", "data-v-3b66d397"]]), jl = window.Vue.normalizeStyle, Be = window.Vue.createElementVNode, te = window.Vue.unref, _e = window.Vue.createVNode, Kl = window.Vue.toDisplayString, He = window.Vue.openBlock, Pe = window.Vue.createElementBlock, Jl = window.Vue.createCommentVNode, Oe = window.Vue.createTextVNode, De = window.Vue.resolveComponent, ge = window.Vue.withCtx, qe = window.Vue.isRef, Wl = window.Vue.Fragment, Ql = { class: "dialog-footer" }, Xl = { key: 0 }, Yl = window.Vue.onMounted, et = window.Vue.onUnmounted, ue = window.Vue.ref, lt = window.Vue.watch, Ve = window.ElementPlus.ElMessage, tt = {
  __name: "ai-editor",
  props: ["initValue", "height"],
  setup(m, { expose: P }) {
    const f = ue();
    let o = null, V = ue(!1), L = ue(""), S = ue([]), E = ue(""), v = ue(0);
    const g = m;
    lt(() => g.initValue, (c) => {
      o && o.setContent(c);
    }), Yl(() => {
      o = new dl({
        element: f.value,
        placeholder: "写点什么?",
        content: g.initValue ? g.initValue : "",
        toolbarKeys: [
          "undo",
          "redo",
          "brush",
          "eraser",
          "|",
          "heading",
          "font-family",
          "font-size",
          "|",
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "code",
          "subscript",
          "superscript",
          "hr",
          "todo",
          "emoji",
          "|",
          "highlight",
          "font-color",
          "|",
          "align",
          "line-height",
          "|",
          "bullet-list",
          "ordered-list",
          "indent-decrease",
          "indent-increase",
          "break",
          "|",
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5ZM18 17L14 11L7 17H18Z"></path></svg>',
            onClick: (c, p) => {
              E.value = "img", v.value = 8, L.value = "选择图片", V.value = !0;
            },
            tip: "插入图片"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19V5H9.58579L11.5858 7H20V19H4ZM21 5H12.4142L10.4142 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V6C22 5.44772 21.5523 5 21 5ZM15.0008 12.667L10.1219 9.41435C10.0562 9.37054 9.979 9.34717 9.9 9.34717C9.6791 9.34717 9.5 9.52625 9.5 9.74717V16.2524C9.5 16.3314 9.5234 16.4086 9.5672 16.4743C9.6897 16.6581 9.9381 16.7078 10.1219 16.5852L15.0008 13.3326C15.0447 13.3033 15.0824 13.2656 15.1117 13.2217C15.2343 13.0379 15.1846 12.7895 15.0008 12.667Z"></path></svg>',
            onClick: (c, p) => {
              E.value = "video", v.value = 1, L.value = "选择视频", V.value = !0;
            },
            tip: "插入视频"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z"></path></svg>',
            onClick: (c, p) => {
              E.value = "other", v.value = 1, L.value = "选择附件", V.value = !0;
            },
            tip: "插入附件"
          },
          "quote",
          "code-block",
          "table",
          "|",
          "printer",
          "fullscreen"
        ],
        image: {
          allowBase64: !1,
          uploadUrl: "/api/auth/attach/upload",
          uploadFormName: "file",
          uploadHeaders: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(Je.STORAGE_TOKEN)).accessToken
          },
          uploaderEvent: {
            onFailed: (c, p) => {
              Ve.error("文件上传失败");
            },
            onError: (c, p) => {
              Ve.error("文件上传失败");
            },
            onSuccess: (c, p) => p.code === 200 ? (Ve.success("文件上传成功"), {
              errorCode: 0,
              data: {
                src: p.data.url,
                alt: p.data.name
              }
            }) : (Ve.error(p.msg), !1)
          }
        }
      });
    }), et(() => {
      o && o.destroy();
    });
    function q(c) {
      S.value = c;
    }
    function R() {
      let c = "";
      S.value.forEach((p, H) => {
        E.value === "img" && (c += `![${p.name}](${p.url})`), E.value === "video" && (c += `<video src="${p.url}" controls="controls" width="100%"></video>`), E.value === "other" && (c += `[${p.name}](${p.url})`);
      }), o.insert(c), V.value = !1, S.value = [];
    }
    function O() {
      V.value = !1, S.value = [];
    }
    function r() {
      o.clear();
    }
    function X() {
      return {
        content: o.getMarkdown(),
        parseContent: o.getHtml()
      };
    }
    return P({
      resetContent: r,
      getValue: X
    }), (c, p) => {
      const H = De("el-button"), W = De("el-dialog");
      return He(), Pe(Wl, null, [
        Be("div", {
          ref_key: "divRef",
          ref: f,
          style: jl({ height: g.height })
        }, null, 4),
        _e(W, {
          modelValue: te(V),
          "onUpdate:modelValue": p[1] || (p[1] = (y) => qe(V) ? V.value = y : V = y),
          title: te(L),
          width: te(me)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: ge(() => [
            Be("span", Ql, [
              _e(H, {
                type: "primary",
                onClick: R
              }, {
                default: ge(() => [
                  p[2] || (p[2] = Oe("确 定")),
                  te(S).length > 0 ? (He(), Pe("span", Xl, "(已选" + Kl(te(S).length) + "个)", 1)) : Jl("", !0)
                ]),
                _: 1
              }),
              _e(H, {
                onClick: p[0] || (p[0] = (y) => {
                  qe(V) ? V.value = !1 : V = !1, O();
                })
              }, {
                default: ge(() => p[3] || (p[3] = [
                  Oe("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: ge(() => [
            _e(Zl, {
              "onUpdate:selectedAttach": q,
              max: te(v),
              "attach-type": te(E)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ], 64);
    };
  }
}, at = /* @__PURE__ */ We(tt, [["__scopeId", "data-v-87814627"]]), N = window.Vue.resolveComponent, i = window.Vue.createVNode, u = window.Vue.withCtx, _ = window.Vue.unref, Ue = window.Vue.renderList, Ee = window.Vue.Fragment, x = window.Vue.openBlock, he = window.Vue.createElementBlock, z = window.Vue.createBlock, G = window.Vue.createTextVNode, Ze = window.Vue.resolveDirective, Q = window.Vue.withDirectives, re = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const ot = window.Vue.toDisplayString, be = window.Vue.isRef, nt = { class: "page" }, it = { class: "search-box" }, ut = { class: "right-tool" }, rt = { class: "table-box" }, dt = { class: "dialog-footer" }, st = { class: "dialog-footer" }, J = window.ElementPlus.ElMessage, pt = window.ElementPlus.ElMessageBox, je = window.Vue.reactive, A = window.Vue.ref, wt = {
  __name: "MailTemplateView",
  setup(m) {
    let P = A("");
    const f = A({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      code: null,
      mailServerId: null
    }), o = A({
      id: null,
      name: null,
      code: null,
      mailServerId: null,
      nickname: null,
      mailTitle: null,
      mailContent: null,
      status: 0,
      remark: null
    }), V = je({
      name: [{ required: !0, message: "模板名称不能为空", trigger: "blur" }],
      code: [{ required: !0, message: "模板编码不能为空", trigger: "blur" }],
      mailServerId: [{ required: !0, message: "邮箱服务不能为空", trigger: "blur" }],
      nickname: [{ required: !0, message: "发送人名称不能为空", trigger: "blur" }],
      mailTitle: [{ required: !0, message: "邮件标题不能为空", trigger: "blur" }],
      mailContent: [{ required: !0, message: "邮件内容不能为空", trigger: "blur" }],
      status: [{ required: !0, message: "状态不能为空", trigger: "blur" }]
    }), L = A(), S = A(), E = A();
    let v = A(!1), g = A(""), q = A([]), R = A(!1), O = A([]), r = A(!1), X = A(!1);
    const c = A({
      mailTemplateId: "",
      receiveMail: "",
      mailParams: {}
    }), p = A(), H = je({
      receiveMail: [
        { required: !0, message: "收件邮箱不能为空", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
      ],
      mailParams: [{ required: !0, message: "参数不能为空", trigger: "blur" }]
    });
    let W = A([]);
    function y() {
      o.value.mailContent = L.value.getValue().parseContent, E.value.validate((w) => {
        w && (o.value.id ? cl(o.value).then((e) => {
          e.code === 200 ? (J.success("操作成功"), v.value = !1, I(), D()) : J.error(e.msg);
        }) : pl(o.value).then((e) => {
          e.code === 200 ? (J.success("操作成功"), v.value = !1, I(), D()) : J.error(e.msg);
        }));
      });
    }
    function ye() {
      I(), g.value = "添加邮件模板", v.value = !0;
    }
    function ke(w) {
      I(), g.value = "修改邮件模板", v.value = !0, Ge(w.id).then((e) => {
        o.value = e.data, P.value = o.value.mailContent;
      });
    }
    function Ce(w) {
      let e = Object.keys(w);
      pt.confirm("确定要删除[" + w[e[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ml(w.id).then(($) => {
          $.code === 200 && $.data ? (J.success("删除成功"), D()) : J.error($.msg);
        });
      }).catch(() => {
      });
    }
    function D() {
      R.value = !0, sl(f.value).then((w) => {
        q.value = w.data.list, f.value.total = w.data.total, R.value = !1;
      });
    }
    function de() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        code: null,
        mailServerId: null
      }, S.value.resetFields(), D();
    }
    function I() {
      P.value = "", L.value && L.value.resetContent(), o.value = {
        id: null,
        name: null,
        code: null,
        mailServerId: null,
        nickname: null,
        mailTitle: null,
        mailContent: null,
        status: 0,
        remark: null
      }, E.value && E.value.resetFields();
    }
    function xe() {
      R.value = !0, fl(f.value).then((w) => {
        window.download.excel(w, "邮件模板数据.xlsx"), R.value = !1;
      }).catch((w) => {
        J.error("导出失败"), R.value = !1;
      });
    }
    function Te() {
      rl().then((w) => {
        O.value = w.data;
      });
    }
    function ae(w) {
      g.value = "发送测试邮件", r.value = !0, W.value = [], Ge(w.id).then((e) => {
        c.value.mailTemplateId = e.data.id, P.value = e.data.mailContent, W.value = e.data.mailParams;
      });
    }
    function Ae() {
      p.value.validate((w) => {
        w && (X.value = !0, vl(c.value).then((e) => {
          e.code === 200 && e.data ? (J.success("发送成功"), r.value = !1) : J.error("发送失败,请检查邮箱服务配置"), X.value = !1;
        }));
      });
    }
    function Se() {
      c.value = {
        mailTemplateId: "",
        receiveMail: "",
        mailParams: {}
      }, p.value && p.value.resetFields();
    }
    return Te(), D(), (w, e) => {
      const $ = N("el-input"), T = N("el-form-item"), fe = N("el-option"), ve = N("el-select"), s = N("el-button"), l = N("el-form"), Z = N("el-col"), F = N("el-row"), M = N("el-table-column"), Y = N("el-tag"), ee = N("el-table"), se = N("el-pagination"), $e = N("el-switch"), le = N("el-dialog"), j = Ze("hasPermission"), we = Ze("loading");
      return x(), he("div", nt, [
        re("div", it, [
          i(l, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: S
          }, {
            default: u(() => [
              i(T, { label: "模板名称" }, {
                default: u(() => [
                  i($, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => f.value.name = a),
                    placeholder: "请输入模板名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(T, { label: "模板编码" }, {
                default: u(() => [
                  i($, {
                    modelValue: f.value.code,
                    "onUpdate:modelValue": e[1] || (e[1] = (a) => f.value.code = a),
                    placeholder: "请输入模板编码",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(T, { label: "邮箱服务" }, {
                default: u(() => [
                  i(ve, {
                    modelValue: f.value.mailServerId,
                    "onUpdate:modelValue": e[2] || (e[2] = (a) => f.value.mailServerId = a),
                    placeholder: "请选择邮箱服务",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: u(() => [
                      (x(!0), he(Ee, null, Ue(_(O), (a) => (x(), z(fe, {
                        key: a.id,
                        label: a.name,
                        value: a.id
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(T, null, {
                default: u(() => [
                  Q((x(), z(s, {
                    type: "primary",
                    onClick: D,
                    icon: _(Ke)
                  }, {
                    default: u(() => e[17] || (e[17] = [
                      G("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [j, ["admin:mailTemplate:query"]]
                  ]),
                  i(s, {
                    icon: _(Me),
                    onClick: de
                  }, {
                    default: u(() => e[18] || (e[18] = [
                      G("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  Q((x(), z(s, {
                    icon: _(al),
                    onClick: xe
                  }, {
                    default: u(() => e[19] || (e[19] = [
                      G("导出")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [j, ["admin:mailTemplate:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        i(F, {
          gutter: 10,
          class: "mb8"
        }, {
          default: u(() => [
            i(Z, { span: 1.5 }, {
              default: u(() => [
                Q((x(), z(s, {
                  icon: _(ol),
                  type: "primary",
                  plain: "",
                  onClick: ye
                }, {
                  default: u(() => e[20] || (e[20] = [
                    G("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [j, ["admin:mailTemplate:create"]]
                ])
              ]),
              _: 1
            }),
            re("div", ut, [
              i(s, {
                icon: _(Me),
                circle: "",
                onClick: D
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        re("div", rt, [
          Q((x(), z(ee, {
            data: _(q),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: u(() => [
              i(M, {
                prop: "name",
                label: "模板名称",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "code",
                label: "模板编码",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "nickname",
                label: "发送人名称",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "mailTitle",
                label: "邮件标题",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "mailContent",
                label: "邮件内容",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: u((a) => [
                  a.row.status === 0 ? (x(), z(Y, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: u(() => e[21] || (e[21] = [
                      G("启用")
                    ])),
                    _: 1
                  })) : (x(), z(Y, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: u(() => e[22] || (e[22] = [
                      G("禁用")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              i(M, {
                prop: "remark",
                label: "备注",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i(M, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: u((a) => [
                  re("span", null, ot(_(tl)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              i(M, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: u((a) => [
                  Q((x(), z(s, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: _(nl),
                    onClick: (oe) => ae(a.row)
                  }, {
                    default: u(() => e[23] || (e[23] = [
                      G("测试")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:testMail"]]
                  ]),
                  Q((x(), z(s, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: _(il),
                    onClick: (oe) => ke(a.row)
                  }, {
                    default: u(() => e[24] || (e[24] = [
                      G("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:update"]]
                  ]),
                  Q((x(), z(s, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: _(ul),
                    onClick: (oe) => Ce(a.row)
                  }, {
                    default: u(() => e[25] || (e[25] = [
                      G("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [we, _(R)]
          ]),
          i(se, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": e[3] || (e[3] = (a) => f.value.pageNo = a),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": e[4] || (e[4] = (a) => f.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: D,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        i(le, {
          modelValue: _(v),
          "onUpdate:modelValue": e[13] || (e[13] = (a) => be(v) ? v.value = a : v = a),
          title: _(g),
          width: _(me)(800),
          draggable: ""
        }, {
          footer: u(() => [
            re("span", dt, [
              i(s, {
                type: "primary",
                onClick: y
              }, {
                default: u(() => e[26] || (e[26] = [
                  G("确 定")
                ])),
                _: 1
              }),
              i(s, {
                onClick: e[12] || (e[12] = (a) => {
                  be(v) ? v.value = !1 : v = !1, I();
                })
              }, {
                default: u(() => e[27] || (e[27] = [
                  G("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: u(() => [
            i(l, {
              ref_key: "addFormRef",
              ref: E,
              model: o.value,
              "label-width": "100px",
              "status-icon": "",
              rules: V
            }, {
              default: u(() => [
                i(T, {
                  label: "模板名称",
                  prop: "name"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: o.value.name,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => o.value.name = a),
                      placeholder: "请输入模板名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "模板编码",
                  prop: "code"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: o.value.code,
                      "onUpdate:modelValue": e[6] || (e[6] = (a) => o.value.code = a),
                      placeholder: "请输入模板编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "邮箱服务",
                  prop: "mailServerId"
                }, {
                  default: u(() => [
                    i(ve, {
                      modelValue: o.value.mailServerId,
                      "onUpdate:modelValue": e[7] || (e[7] = (a) => o.value.mailServerId = a),
                      placeholder: "请选择邮箱服务",
                      clearable: "",
                      style: { width: "200px" }
                    }, {
                      default: u(() => [
                        (x(!0), he(Ee, null, Ue(_(O), (a) => (x(), z(fe, {
                          key: a.id,
                          label: a.name,
                          value: a.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "发送人名称",
                  prop: "nickname"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: o.value.nickname,
                      "onUpdate:modelValue": e[8] || (e[8] = (a) => o.value.nickname = a),
                      placeholder: "请输入发送人名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "邮件标题",
                  prop: "mailTitle"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: o.value.mailTitle,
                      "onUpdate:modelValue": e[9] || (e[9] = (a) => o.value.mailTitle = a),
                      placeholder: "请输入邮件标题"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "邮件内容",
                  prop: "mailContent"
                }, {
                  default: u(() => [
                    i(at, {
                      "init-value": _(P),
                      ref_key: "editorRef",
                      ref: L,
                      height: "400px"
                    }, null, 8, ["init-value"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "状态",
                  prop: "status"
                }, {
                  default: u(() => [
                    i($e, {
                      modelValue: o.value.status,
                      "onUpdate:modelValue": e[10] || (e[10] = (a) => o.value.status = a),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(T, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: o.value.remark,
                      "onUpdate:modelValue": e[11] || (e[11] = (a) => o.value.remark = a),
                      placeholder: "请输入备注",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"]),
        i(le, {
          modelValue: _(r),
          "onUpdate:modelValue": e[16] || (e[16] = (a) => be(r) ? r.value = a : r = a),
          title: _(g),
          width: _(me)(800),
          draggable: ""
        }, {
          footer: u(() => [
            re("span", st, [
              i(s, {
                type: "primary",
                onClick: Ae
              }, {
                default: u(() => e[28] || (e[28] = [
                  G("发 送")
                ])),
                _: 1
              }),
              i(s, {
                onClick: e[15] || (e[15] = (a) => {
                  be(r) ? r.value = !1 : r = !1, Se();
                })
              }, {
                default: u(() => e[29] || (e[29] = [
                  G("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: u(() => [
            Q((x(), z(l, {
              ref_key: "testMailFormRef",
              ref: p,
              model: c.value,
              "label-width": "200px",
              "status-icon": "",
              rules: H
            }, {
              default: u(() => [
                i(T, {
                  label: "收件邮箱",
                  prop: "receiveMail"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: c.value.receiveMail,
                      "onUpdate:modelValue": e[14] || (e[14] = (a) => c.value.receiveMail = a),
                      placeholder: "请输入收件邮箱"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                (x(!0), he(Ee, null, Ue(_(W), (a) => (x(), z(T, {
                  label: "参数 [" + a + "]",
                  prop: "mailParams"
                }, {
                  default: u(() => [
                    i($, {
                      modelValue: c.value.mailParams[a],
                      "onUpdate:modelValue": (oe) => c.value.mailParams[a] = oe,
                      placeholder: "请输入参数 [" + a + "]"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  _: 2
                }, 1032, ["label"]))), 256))
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [we, _(X)]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  wt as default
};
