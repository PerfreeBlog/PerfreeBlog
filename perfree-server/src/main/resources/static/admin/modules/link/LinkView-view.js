import { s as ze, r as ye, u as Ce, f as Je, p as Ye, e as Qe, d as Xe } from "./lib/@element-plus.js";
const Ze = window.Pinia.defineStore;
Ze({
  id: "common",
  state: () => ({
    menuInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getMenuList() {
      return this.menuList;
    },
    getCachedViews() {
      return this.cachedViews;
    }
  },
  actions: {
    setMenuInit(a) {
      this.menuInit = a;
    },
    setMenuList(a) {
      this.menuList = a;
    },
    setCachedViews(a) {
      this.cachedViews = a;
    }
  },
  persist: {
    enabled: !1
  }
});
function et(a, f) {
  if (arguments.length === 0 || !a)
    return null;
  const m = f || "{y}-{m}-{d} {h}:{i}:{s}";
  let u;
  typeof a == "object" ? u = a : (typeof a == "string" && /^[0-9]+$/.test(a) ? a = parseInt(a) : typeof a == "string" && (a = a.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof a == "number" && a.toString().length === 10 && (a = a * 1e3), u = new Date(a));
  const _ = {
    y: u.getFullYear(),
    m: u.getMonth() + 1,
    d: u.getDate(),
    h: u.getHours(),
    i: u.getMinutes(),
    s: u.getSeconds(),
    a: u.getDay()
  };
  return m.replace(/{([ymdhisa])+}/g, (x, r) => {
    let C = _[r];
    return r === "a" ? ["日", "一", "二", "三", "四", "五", "六"][C] : (x.length > 0 && C < 10 && (C = "0" + C), C || 0);
  });
}
function ce(a) {
  return window.document.body.clientWidth < a ? window.document.body.clientWidth : a;
}
function tt(a) {
  return axios.post("/api/auth/attach/page", a);
}
function lt() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function at(a) {
  return axios.put("/apiv/attach/update", a);
}
function ot(a) {
  return axios.get("/api/auth/attach/get?id=" + a);
}
const nt = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, ut = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
};
function st() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const Te = (a, f) => {
  const m = a.__vccOpts || a;
  for (const [u, _] of f)
    m[u] = _;
  return m;
}, w = window.Vue.resolveComponent, o = window.Vue.createVNode, s = window.Vue.withCtx, V = window.Vue.unref, te = window.Vue.renderList, le = window.Vue.Fragment, g = window.Vue.openBlock, E = window.Vue.createElementBlock, q = window.Vue.createBlock, T = window.Vue.createTextVNode, y = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ae = window.Vue.toDisplayString, $e = window.Vue.normalizeClass, it = window.Vue.withModifiers, he = window.Vue.isRef, dt = { class: "page" }, rt = { class: "search-box" }, ct = { class: "table-box" }, pt = { class: "attach-list-box" }, mt = ["onClick"], ft = { class: "attach-preview" }, _t = { class: "imgLoading" }, vt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, wt = ["src"], gt = {
  key: 2,
  class: "attach-other"
}, ht = { class: "attach-name" }, Vt = { class: "operate-btn-box" }, yt = { style: { "padding-right": "15px" } }, bt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, kt = ["src"], xt = {
  key: 2,
  controls: "",
  preload: "none"
}, Ct = ["src"], At = { key: 3 }, $t = { class: "showForm" }, St = { class: "dialog-footer" }, Nt = window.Vue.computed, Ft = window.Vue.reactive, S = window.Vue.ref, K = window.ElementPlus.ElMessage, Et = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(a, { emit: f }) {
    const m = S(), u = S({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let _ = S([]), F = S(!1), x = S(/* @__PURE__ */ new Map());
    const r = f, C = a;
    let b = S(!1), A = S(""), I = S([]);
    const B = S(), n = S({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), h = Ft({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), R = S();
    let P = S(), v = S(!1), l = S([]);
    const k = S({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let L = localStorage.getItem(nt.STORAGE_TOKEN), z = ut.baseURL, ue = {
      Authorization: "Bearer " + JSON.parse(L).accessToken
    };
    const pe = Nt(() => {
      switch (C.attachType) {
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
    function X() {
      n.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, B.value && B.value.resetFields();
    }
    function $() {
      C.attachType && (u.value.type = C.attachType), F.value = !0, tt(u.value).then((c) => {
        c.data.list.forEach((e) => {
          e.selected = x.value.has(e.id);
        }), _.value = c.data.list, u.value.total = c.data.total, F.value = !1;
      });
    }
    function me() {
      u.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, m.value.resetFields(), $();
    }
    function fe(c) {
      if (!c.selected && x.value.size >= C.max) {
        K.error(`最多选择${C.max}个`);
        return;
      }
      c.selected = !c.selected, c.selected ? x.value.set(c.id, c) : x.value.delete(c.id), r("update:selectedAttach", Array.from(x.value.values()));
    }
    function j() {
      lt().then((c) => {
        I.value = c.data;
      });
    }
    function _e(c) {
      X(), j(), ot(c.id).then((e) => {
        n.value = e.data, A.value = "详情", b.value = !0;
      });
    }
    function Z() {
      B.value.validate((c) => {
        c && at(n.value).then((e) => {
          e.code === 200 ? (K.success("修改成功"), b.value = !1, X(), $()) : K.error(e.msg);
        });
      });
    }
    function ve() {
      j(), $();
    }
    function i(c, e, M) {
      c.code === 200 ? K.success(`[${e.name}]上传成功`) : (K.error(c.msg), P.value.handleRemove(e));
    }
    function we() {
      Ie(), A.value = "上传附件", Be(), j(), v.value = !0;
    }
    function Ie() {
      k.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, R.value && R.value.resetFields();
    }
    function Be() {
      st().then((c) => {
        l.value = c.data, c.data.forEach((e) => {
          e.master && (k.value.attachConfigId = e.id);
        });
      });
    }
    function Le(c) {
      K.error("上传失败,请检查网络是否通通畅");
    }
    return j(), $(), (c, e) => {
      const M = w("el-input"), N = w("el-form-item"), se = w("el-option"), ie = w("el-select"), ee = w("el-button"), ge = w("el-form"), De = w("Loading"), de = w("el-icon"), be = w("el-image"), Me = w("el-text"), Oe = w("InfoFilled"), Pe = w("SuccessFilled"), je = w("el-pagination"), qe = w("el-link"), ke = w("el-col"), Ke = w("el-row"), xe = w("el-dialog"), We = w("el-upload");
      return g(), E("div", dt, [
        y("div", rt, [
          o(ge, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: s(() => [
              o(N, { label: "附件名称" }, {
                default: s(() => [
                  o(M, {
                    modelValue: u.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => u.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(N, { label: "分组" }, {
                default: s(() => [
                  o(ie, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: s(() => [
                      (g(!0), E(le, null, te(V(I), (t) => (g(), q(se, {
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
              o(N, null, {
                default: s(() => [
                  o(ee, {
                    type: "primary",
                    onClick: $,
                    icon: V(ze)
                  }, {
                    default: s(() => e[16] || (e[16] = [
                      T("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  o(ee, {
                    icon: V(ye),
                    onClick: me
                  }, {
                    default: s(() => e[17] || (e[17] = [
                      T("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              o(N, null, {
                default: s(() => [
                  o(ee, {
                    icon: V(Ce),
                    type: "primary",
                    plain: "",
                    onClick: we
                  }, {
                    default: s(() => e[18] || (e[18] = [
                      T("上传附件")
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
        y("div", ct, [
          y("div", pt, [
            (g(!0), E(le, null, te(V(_), (t) => (g(), E("div", {
              class: $e({ "attach-block": !0, selected: t.selected }),
              onClick: (He) => fe(t)
            }, [
              y("div", ft, [
                t.type && t.type === "img" ? (g(), q(be, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: s(() => [
                    y("div", _t, [
                      o(de, { class: "is-loading" }, {
                        default: s(() => [
                          o(De)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (g(), E("video", vt, [
                  y("source", {
                    src: t.url
                  }, null, 8, wt)
                ])) : (g(), E("div", gt, Ae(t.path.split(".").pop()), 1))
              ]),
              y("div", ht, [
                o(Me, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: s(() => [
                    T(Ae(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              y("div", {
                class: $e({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              y("div", Vt, [
                o(de, {
                  class: "operate-btn",
                  onClick: it((He) => _e(t), ["stop"])
                }, {
                  default: s(() => [
                    o(Oe)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                o(de, { class: "operate-btn select-btn" }, {
                  default: s(() => [
                    o(Pe)
                  ]),
                  _: 1
                })
              ])
            ], 10, mt))), 256))
          ]),
          o(je, {
            "current-page": u.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => u.value.pageNo = t),
            "page-size": u.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => u.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: $,
            total: u.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(xe, {
          modelValue: V(b),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => he(b) ? b.value = t : b = t),
          title: V(A),
          width: V(ce)(800),
          draggable: ""
        }, {
          footer: s(() => [
            y("span", St, [
              o(ee, {
                type: "primary",
                onClick: Z
              }, {
                default: s(() => e[21] || (e[21] = [
                  T("修 改")
                ])),
                _: 1
              }),
              o(ee, {
                onClick: e[10] || (e[10] = (t) => {
                  he(b) ? b.value = !1 : b = !1, X();
                })
              }, {
                default: s(() => e[22] || (e[22] = [
                  T("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            o(Ke, null, {
              default: s(() => [
                o(ke, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    y("div", yt, [
                      n.value.type && n.value.type === "img" ? (g(), q(be, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (g(), E("video", bt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, kt)
                      ])) : n.value.type && n.value.type === "audio" ? (g(), E("audio", xt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, Ct)
                      ])) : (g(), E("i", At, [
                        e[20] || (e[20] = T("无法预览，点击 ")),
                        o(qe, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: s(() => e[19] || (e[19] = [
                            T("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                o(ke, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    y("div", $t, [
                      o(ge, {
                        ref_key: "showFormRef",
                        ref: B,
                        model: n.value,
                        "label-width": "auto",
                        rules: h,
                        "label-position": "top"
                      }, {
                        default: s(() => [
                          o(N, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: s(() => [
                              o(M, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(N, { label: "附件类型" }, {
                            default: s(() => [
                              o(M, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(N, { label: "分组" }, {
                            default: s(() => [
                              o(ie, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: s(() => [
                                  (g(!0), E(le, null, te(V(I), (t) => (g(), q(se, {
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
                          o(N, { label: "存储路径" }, {
                            default: s(() => [
                              o(M, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(N, { label: "访问地址" }, {
                            default: s(() => [
                              o(M, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(N, { label: "附件描述" }, {
                            default: s(() => [
                              o(M, {
                                modelValue: n.value.desc,
                                "onUpdate:modelValue": e[9] || (e[9] = (t) => n.value.desc = t),
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
        o(xe, {
          modelValue: V(v),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => he(v) ? v.value = t : v = t),
          title: V(A),
          width: V(ce)(600),
          draggable: "",
          onClose: ve
        }, {
          default: s(() => [
            o(ge, {
              ref_key: "addFormRef",
              ref: R,
              model: k.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: s(() => [
                o(N, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: s(() => [
                    o(ie, {
                      modelValue: k.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => k.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: s(() => [
                        (g(!0), E(le, null, te(V(l), (t) => (g(), q(se, {
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
                o(N, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: s(() => [
                    o(ie, {
                      modelValue: k.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => k.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: s(() => [
                        (g(!0), E(le, null, te(V(I), (t) => (g(), q(se, {
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
                o(N, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: s(() => [
                    o(We, {
                      class: "upload-demo",
                      drag: "",
                      headers: V(ue),
                      action: V(z) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: P,
                      "file-list": k.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => k.value.fileList = t),
                      data: { attachConfigId: k.value.attachConfigId, attachGroup: k.value.attachGroup },
                      "on-success": i,
                      "on-error": Le,
                      accept: pe.value
                    }, {
                      tip: s(() => e[23] || (e[23] = [
                        y("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: s(() => [
                        o(de, { class: "el-icon--upload" }, {
                          default: s(() => [
                            o(V(Ce))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = y("div", { class: "el-upload__text" }, [
                          T(" 拖拽文件到此处或者"),
                          y("em", null, "点击上传")
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
}, Ut = /* @__PURE__ */ Te(Et, [["__scopeId", "data-v-3b66d397"]]), W = window.Vue.unref, Ve = window.Vue.resolveComponent, H = window.Vue.createVNode, ae = window.Vue.withCtx, Gt = window.Vue.toDisplayString, Se = window.Vue.openBlock, Ne = window.Vue.createElementBlock, Rt = window.Vue.createCommentVNode, Fe = window.Vue.createTextVNode, Ee = window.Vue.isRef, zt = window.Vue.createElementVNode, Tt = { style: { width: "100%" } }, It = { class: "dialog-footer" }, Bt = { key: 0 }, oe = window.Vue.ref, Lt = window.Vue.watch, Dt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(a, { emit: f }) {
    oe("请选择图片");
    let m = oe(!1), u = oe(""), _ = oe([]);
    const F = a, x = f, r = oe(F.modelValue);
    Lt(() => F.modelValue, (n, h) => {
      r.value = n;
    });
    function C() {
      x("update:modelValue", r.value);
    }
    function b() {
      m.value = !0, u.value = "请选择附件";
    }
    function A() {
      let n = "";
      _.value.forEach((h, R) => {
        n += h.url;
      }), x("attachSelectChange", _.value), r.value = n, m.value = !1, _.value = [], x("update:modelValue", r.value);
    }
    function I() {
      m.value = !1, _.value = [];
    }
    function B(n) {
      _.value = n;
    }
    return (n, h) => {
      const R = Ve("el-button"), P = Ve("el-input"), v = Ve("el-dialog");
      return Se(), Ne("div", Tt, [
        H(P, {
          modelValue: r.value,
          "onUpdate:modelValue": h[0] || (h[0] = (l) => r.value = l),
          placeholder: F.placeholder,
          style: { width: "100%" },
          disabled: !F.enableInput,
          onChange: C
        }, {
          append: ae(() => [
            H(R, {
              icon: W(Je),
              type: "info",
              onClick: b
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        H(v, {
          modelValue: W(m),
          "onUpdate:modelValue": h[2] || (h[2] = (l) => Ee(m) ? m.value = l : m = l),
          title: W(u),
          width: W(ce)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: ae(() => [
            zt("span", It, [
              H(R, {
                type: "primary",
                onClick: A
              }, {
                default: ae(() => [
                  h[3] || (h[3] = Fe("确 定")),
                  W(_).length > 0 ? (Se(), Ne("span", Bt, "(已选" + Gt(W(_).length) + "个)", 1)) : Rt("", !0)
                ]),
                _: 1
              }),
              H(R, {
                onClick: h[1] || (h[1] = (l) => {
                  Ee(m) ? m.value = !1 : m = !1, I();
                })
              }, {
                default: ae(() => h[4] || (h[4] = [
                  Fe("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: ae(() => [
            H(Ut, {
              "onUpdate:selectedAttach": B,
              max: 1,
              "attach-type": F.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Mt = /* @__PURE__ */ Te(Dt, [["__scopeId", "data-v-52e51a92"]]);
function Ot(a) {
  return axios.post("/api/auth/link/page", a);
}
function Pt(a) {
  return axios.post("/api/auth/link/add", a);
}
function jt(a) {
  return axios.put("/api/auth/link/update", a);
}
function qt(a) {
  return axios.get("/api/auth/link/get?id=" + a);
}
function Kt(a) {
  return axios.delete("/api/auth/link/del?id=" + a);
}
const G = window.Vue.resolveComponent, d = window.Vue.createVNode, p = window.Vue.withCtx, U = window.Vue.unref, O = window.Vue.createTextVNode, J = window.Vue.createElementVNode, Ue = window.Vue.resolveDirective, Y = window.Vue.openBlock, ne = window.Vue.createBlock, re = window.Vue.withDirectives, Wt = window.Vue.createCommentVNode, Ge = window.Vue.toDisplayString, Re = window.Vue.isRef, Ht = window.Vue.createElementBlock, Jt = { class: "page" }, Yt = { class: "search-box" }, Qt = { class: "right-tool" }, Xt = { class: "table-box" }, Zt = ["href"], el = { class: "dialog-footer" }, Q = window.ElementPlus.ElMessage, tl = window.ElementPlus.ElMessageBox, ll = window.Vue.reactive, D = window.Vue.ref, ol = {
  __name: "LinkView",
  setup(a) {
    const f = D({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), m = D();
    let u = D(!1), _ = D(""), F = D([]), x = D(!1);
    const r = D({
      id: "",
      name: "",
      logo: "",
      desc: "",
      address: ""
    }), C = ll({
      name: [{ required: !0, message: "请输入网站名称", trigger: "blur" }],
      address: [{ required: !0, message: "请输入网站地址", trigger: "blur" }]
    }), b = D();
    function A() {
      x.value = !0, Ot(f.value).then((v) => {
        F.value = v.data.list, f.value.total = v.data.total, x.value = !1;
      });
    }
    function I() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, m.value.resetFields(), A();
    }
    function B() {
      n(), _.value = "添加标签", u.value = !0;
    }
    function n() {
      r.value = {
        id: "",
        name: "",
        logo: "",
        desc: "",
        address: ""
      }, b.value && b.value.resetFields();
    }
    function h() {
      b.value.validate((v) => {
        v && (r.value.id ? jt(r.value).then((l) => {
          l.code === 200 ? (Q.success("修改成功"), u.value = !1, n(), A()) : Q.error(l.msg);
        }) : Pt(r.value).then((l) => {
          l.code === 200 ? (Q.success("添加成功"), u.value = !1, n(), A()) : Q.error(l.msg);
        }));
      });
    }
    function R(v) {
      _.value = "修改标签", n(), qt(v.id).then((l) => {
        r.value = l.data, u.value = !0;
      });
    }
    function P(v) {
      tl.confirm("确定要删除[" + v.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Kt(v.id).then((l) => {
          l.code === 200 && l.data ? (Q.success("删除成功"), A()) : Q.error(l.msg);
        });
      }).catch(() => {
      });
    }
    return A(), (v, l) => {
      const k = G("el-input"), L = G("el-form-item"), z = G("el-button"), ue = G("el-form"), pe = G("el-col"), X = G("el-row"), $ = G("el-table-column"), me = G("el-image"), fe = G("el-table"), j = G("el-pagination"), _e = G("el-dialog"), Z = Ue("hasPermission"), ve = Ue("loading");
      return Y(), Ht("div", Jt, [
        J("div", Yt, [
          d(ue, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: p(() => [
              d(L, { label: "网站名称" }, {
                default: p(() => [
                  d(k, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (i) => f.value.name = i),
                    placeholder: "请输入网站名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              d(L, null, {
                default: p(() => [
                  d(z, {
                    type: "primary",
                    onClick: A,
                    icon: U(ze)
                  }, {
                    default: p(() => l[9] || (l[9] = [
                      O("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  d(z, {
                    icon: U(ye),
                    onClick: I
                  }, {
                    default: p(() => l[10] || (l[10] = [
                      O("重置")
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
        d(X, {
          gutter: 10,
          class: "mb8"
        }, {
          default: p(() => [
            d(pe, { span: 1.5 }, {
              default: p(() => [
                re((Y(), ne(z, {
                  icon: U(Ye),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: p(() => l[11] || (l[11] = [
                    O("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [Z, ["admin:link:create"]]
                ])
              ]),
              _: 1
            }),
            J("div", Qt, [
              d(z, {
                icon: U(ye),
                circle: "",
                onClick: A
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        J("div", Xt, [
          re((Y(), ne(fe, {
            data: U(F),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: p(() => [
              d($, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              d($, {
                prop: "name",
                label: "网站名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d($, {
                prop: "logo",
                label: "网站logo",
                "min-width": "100"
              }, {
                default: p((i) => [
                  i.row.logo ? (Y(), ne(me, {
                    key: 0,
                    style: { height: "50px" },
                    src: i.row.logo,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [i.row.logo],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : Wt("", !0)
                ]),
                _: 1
              }),
              d($, {
                prop: "desc",
                label: "网站描述",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d($, {
                prop: "address",
                label: "网站地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: p((i) => [
                  J("a", {
                    href: i.row.address,
                    target: "_blank"
                  }, Ge(i.row.address), 9, Zt)
                ]),
                _: 1
              }),
              d($, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d($, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: p((i) => [
                  J("span", null, Ge(U(et)(i.row.createTime)), 1)
                ]),
                _: 1
              }),
              d($, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: p((i) => [
                  re((Y(), ne(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: U(Qe),
                    onClick: (we) => R(i.row)
                  }, {
                    default: p(() => l[12] || (l[12] = [
                      O("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [Z, ["admin:link:update"]]
                  ]),
                  re((Y(), ne(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: U(Xe),
                    onClick: (we) => P(i.row)
                  }, {
                    default: p(() => l[13] || (l[13] = [
                      O("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [Z, ["admin:link:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ve, U(x)]
          ]),
          d(j, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (i) => f.value.pageNo = i),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (i) => f.value.pageSize = i),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: A,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        d(_e, {
          modelValue: U(u),
          "onUpdate:modelValue": l[8] || (l[8] = (i) => Re(u) ? u.value = i : u = i),
          title: U(_),
          width: U(ce)(600),
          draggable: ""
        }, {
          footer: p(() => [
            J("span", el, [
              d(z, {
                type: "primary",
                onClick: h
              }, {
                default: p(() => l[14] || (l[14] = [
                  O("确 定")
                ])),
                _: 1
              }),
              d(z, {
                onClick: l[7] || (l[7] = (i) => {
                  Re(u) ? u.value = !1 : u = !1, n();
                })
              }, {
                default: p(() => l[15] || (l[15] = [
                  O("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            d(ue, {
              ref_key: "addFormRef",
              ref: b,
              model: r.value,
              "label-width": "80px",
              "status-icon": "",
              rules: C
            }, {
              default: p(() => [
                d(L, {
                  label: "网站名称",
                  prop: "name"
                }, {
                  default: p(() => [
                    d(k, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": l[3] || (l[3] = (i) => r.value.name = i),
                      placeholder: "请输入网站名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "网站地址",
                  prop: "address"
                }, {
                  default: p(() => [
                    d(k, {
                      modelValue: r.value.address,
                      "onUpdate:modelValue": l[4] || (l[4] = (i) => r.value.address = i),
                      placeholder: "请输入网站地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "网站logo",
                  prop: "logo"
                }, {
                  default: p(() => [
                    d(Mt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请输入网站logo地址",
                      "model-value": r.value.logo,
                      "onUpdate:modelValue": l[5] || (l[5] = (i) => r.value.logo = i)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "网站描述",
                  prop: "desc"
                }, {
                  default: p(() => [
                    d(k, {
                      modelValue: r.value.desc,
                      "onUpdate:modelValue": l[6] || (l[6] = (i) => r.value.desc = i),
                      placeholder: "请输入网站描述",
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
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  ol as default
};
