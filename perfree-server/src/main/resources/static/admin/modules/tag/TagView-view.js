import { s as Ie, r as Ve, u as Ce, f as Je, p as Ye, e as Qe, d as Xe } from "./lib/@element-plus.js";
import { p as Ae } from "./lib/js-pinyin.js";
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
  const v = {
    y: u.getFullYear(),
    m: u.getMonth() + 1,
    d: u.getDate(),
    h: u.getHours(),
    i: u.getMinutes(),
    s: u.getSeconds(),
    a: u.getDay()
  };
  return m.replace(/{([ymdhisa])+}/g, (k, r) => {
    let x = v[r];
    return r === "a" ? ["日", "一", "二", "三", "四", "五", "六"][x] : (k.length > 0 && x < 10 && (x = "0" + x), x || 0);
  });
}
function re(a) {
  return window.document.body.clientWidth < a ? window.document.body.clientWidth : a;
}
function tt(a) {
  return axios.post("/api/auth/tag/page", a);
}
function lt(a) {
  return axios.post("/api/auth/tag/add", a);
}
function at(a) {
  return axios.get("/api/auth/tag/get?id=" + a);
}
function ot(a) {
  return axios.put("/api/auth/tag/update", a);
}
function nt(a) {
  return axios.delete("/api/auth/tag/del?id=" + a);
}
function ut(a) {
  return axios.post("/api/auth/attach/page", a);
}
function it() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function st(a) {
  return axios.put("/apiv/attach/update", a);
}
function dt(a) {
  return axios.get("/api/auth/attach/get?id=" + a);
}
const rt = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, ct = {
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
function pt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const be = (a, f) => {
  const m = a.__vccOpts || a;
  for (const [u, v] of f)
    m[u] = v;
  return m;
}, g = window.Vue.resolveComponent, o = window.Vue.createVNode, i = window.Vue.withCtx, V = window.Vue.unref, ee = window.Vue.renderList, te = window.Vue.Fragment, w = window.Vue.openBlock, N = window.Vue.createElementBlock, K = window.Vue.createBlock, T = window.Vue.createTextVNode, b = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Se = window.Vue.toDisplayString, $e = window.Vue.normalizeClass, mt = window.Vue.withModifiers, we = window.Vue.isRef, ft = { class: "page" }, _t = { class: "search-box" }, vt = { class: "table-box" }, gt = { class: "attach-list-box" }, wt = ["onClick"], ht = { class: "attach-preview" }, Vt = { class: "imgLoading" }, bt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, yt = ["src"], kt = {
  key: 2,
  class: "attach-other"
}, xt = { class: "attach-name" }, Ct = { class: "operate-btn-box" }, At = { style: { "padding-right": "15px" } }, St = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, $t = ["src"], Nt = {
  key: 2,
  controls: "",
  preload: "none"
}, Ft = ["src"], Et = { key: 3 }, Gt = { class: "showForm" }, Ut = { class: "dialog-footer" }, zt = window.Vue.computed, Rt = window.Vue.reactive, A = window.Vue.ref, W = window.ElementPlus.ElMessage, Tt = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(a, { emit: f }) {
    const m = A(), u = A({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let v = A([]), $ = A(!1), k = A(/* @__PURE__ */ new Map());
    const r = f, x = a;
    let y = A(!1), C = A(""), I = A([]);
    const B = A(), n = A({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), h = Rt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), U = A();
    let j = A(), R = A(!1), _ = A([]);
    const l = A({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let Q = localStorage.getItem(rt.STORAGE_TOKEN), L = ct.baseURL, z = {
      Authorization: "Bearer " + JSON.parse(Q).accessToken
    };
    const ne = zt(() => {
      switch (x.attachType) {
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
    function D() {
      x.attachType && (u.value.type = x.attachType), $.value = !0, ut(u.value).then((c) => {
        c.data.list.forEach((e) => {
          e.selected = k.value.has(e.id);
        }), v.value = c.data.list, u.value.total = c.data.total, $.value = !1;
      });
    }
    function G() {
      u.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, m.value.resetFields(), D();
    }
    function ce(c) {
      if (!c.selected && k.value.size >= x.max) {
        W.error(`最多选择${x.max}个`);
        return;
      }
      c.selected = !c.selected, c.selected ? k.value.set(c.id, c) : k.value.delete(c.id), r("update:selectedAttach", Array.from(k.value.values()));
    }
    function q() {
      it().then((c) => {
        I.value = c.data;
      });
    }
    function pe(c) {
      X(), q(), dt(c.id).then((e) => {
        n.value = e.data, C.value = "详情", y.value = !0;
      });
    }
    function me() {
      B.value.validate((c) => {
        c && st(n.value).then((e) => {
          e.code === 200 ? (W.success("修改成功"), y.value = !1, X(), D()) : W.error(e.msg);
        });
      });
    }
    function fe() {
      q(), D();
    }
    function _e(c, e, O) {
      c.code === 200 ? W.success(`[${e.name}]上传成功`) : (W.error(c.msg), j.value.handleRemove(e));
    }
    function d() {
      ve(), C.value = "上传附件", Be(), q(), R.value = !0;
    }
    function ve() {
      l.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, U.value && U.value.resetFields();
    }
    function Be() {
      pt().then((c) => {
        _.value = c.data, c.data.forEach((e) => {
          e.master && (l.value.attachConfigId = e.id);
        });
      });
    }
    function Le(c) {
      W.error("上传失败,请检查网络是否通通畅");
    }
    return q(), D(), (c, e) => {
      const O = g("el-input"), S = g("el-form-item"), ue = g("el-option"), ie = g("el-select"), Z = g("el-button"), ge = g("el-form"), De = g("Loading"), se = g("el-icon"), ye = g("el-image"), Me = g("el-text"), Oe = g("InfoFilled"), Pe = g("SuccessFilled"), je = g("el-pagination"), qe = g("el-link"), ke = g("el-col"), Ke = g("el-row"), xe = g("el-dialog"), We = g("el-upload");
      return w(), N("div", ft, [
        b("div", _t, [
          o(ge, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: i(() => [
              o(S, { label: "附件名称" }, {
                default: i(() => [
                  o(O, {
                    modelValue: u.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => u.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(S, { label: "分组" }, {
                default: i(() => [
                  o(ie, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: i(() => [
                      (w(!0), N(te, null, ee(V(I), (t) => (w(), K(ue, {
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
              o(S, null, {
                default: i(() => [
                  o(Z, {
                    type: "primary",
                    onClick: D,
                    icon: V(Ie)
                  }, {
                    default: i(() => e[16] || (e[16] = [
                      T("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  o(Z, {
                    icon: V(Ve),
                    onClick: G
                  }, {
                    default: i(() => e[17] || (e[17] = [
                      T("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              o(S, null, {
                default: i(() => [
                  o(Z, {
                    icon: V(Ce),
                    type: "primary",
                    plain: "",
                    onClick: d
                  }, {
                    default: i(() => e[18] || (e[18] = [
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
        b("div", vt, [
          b("div", gt, [
            (w(!0), N(te, null, ee(V(v), (t) => (w(), N("div", {
              class: $e({ "attach-block": !0, selected: t.selected }),
              onClick: (He) => ce(t)
            }, [
              b("div", ht, [
                t.type && t.type === "img" ? (w(), K(ye, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: i(() => [
                    b("div", Vt, [
                      o(se, { class: "is-loading" }, {
                        default: i(() => [
                          o(De)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (w(), N("video", bt, [
                  b("source", {
                    src: t.url
                  }, null, 8, yt)
                ])) : (w(), N("div", kt, Se(t.path.split(".").pop()), 1))
              ]),
              b("div", xt, [
                o(Me, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: i(() => [
                    T(Se(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              b("div", {
                class: $e({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              b("div", Ct, [
                o(se, {
                  class: "operate-btn",
                  onClick: mt((He) => pe(t), ["stop"])
                }, {
                  default: i(() => [
                    o(Oe)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                o(se, { class: "operate-btn select-btn" }, {
                  default: i(() => [
                    o(Pe)
                  ]),
                  _: 1
                })
              ])
            ], 10, wt))), 256))
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
            onChange: D,
            total: u.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(xe, {
          modelValue: V(y),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => we(y) ? y.value = t : y = t),
          title: V(C),
          width: V(re)(800),
          draggable: ""
        }, {
          footer: i(() => [
            b("span", Ut, [
              o(Z, {
                type: "primary",
                onClick: me
              }, {
                default: i(() => e[21] || (e[21] = [
                  T("修 改")
                ])),
                _: 1
              }),
              o(Z, {
                onClick: e[10] || (e[10] = (t) => {
                  we(y) ? y.value = !1 : y = !1, X();
                })
              }, {
                default: i(() => e[22] || (e[22] = [
                  T("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            o(Ke, null, {
              default: i(() => [
                o(ke, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    b("div", At, [
                      n.value.type && n.value.type === "img" ? (w(), K(ye, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (w(), N("video", St, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, $t)
                      ])) : n.value.type && n.value.type === "audio" ? (w(), N("audio", Nt, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, Ft)
                      ])) : (w(), N("i", Et, [
                        e[20] || (e[20] = T("无法预览，点击 ")),
                        o(qe, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: i(() => e[19] || (e[19] = [
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
                  default: i(() => [
                    b("div", Gt, [
                      o(ge, {
                        ref_key: "showFormRef",
                        ref: B,
                        model: n.value,
                        "label-width": "auto",
                        rules: h,
                        "label-position": "top"
                      }, {
                        default: i(() => [
                          o(S, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: i(() => [
                              o(O, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "附件类型" }, {
                            default: i(() => [
                              o(O, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "分组" }, {
                            default: i(() => [
                              o(ie, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: i(() => [
                                  (w(!0), N(te, null, ee(V(I), (t) => (w(), K(ue, {
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
                          o(S, { label: "存储路径" }, {
                            default: i(() => [
                              o(O, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "访问地址" }, {
                            default: i(() => [
                              o(O, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "附件描述" }, {
                            default: i(() => [
                              o(O, {
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
          modelValue: V(R),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => we(R) ? R.value = t : R = t),
          title: V(C),
          width: V(re)(600),
          draggable: "",
          onClose: fe
        }, {
          default: i(() => [
            o(ge, {
              ref_key: "addFormRef",
              ref: U,
              model: l.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: i(() => [
                o(S, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: i(() => [
                    o(ie, {
                      modelValue: l.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => l.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: i(() => [
                        (w(!0), N(te, null, ee(V(_), (t) => (w(), K(ue, {
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
                o(S, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: i(() => [
                    o(ie, {
                      modelValue: l.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => l.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: i(() => [
                        (w(!0), N(te, null, ee(V(I), (t) => (w(), K(ue, {
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
                o(S, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: i(() => [
                    o(We, {
                      class: "upload-demo",
                      drag: "",
                      headers: V(z),
                      action: V(L) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: j,
                      "file-list": l.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => l.value.fileList = t),
                      data: { attachConfigId: l.value.attachConfigId, attachGroup: l.value.attachGroup },
                      "on-success": _e,
                      "on-error": Le,
                      accept: ne.value
                    }, {
                      tip: i(() => e[23] || (e[23] = [
                        b("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: i(() => [
                        o(se, { class: "el-icon--upload" }, {
                          default: i(() => [
                            o(V(Ce))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = b("div", { class: "el-upload__text" }, [
                          T(" 拖拽文件到此处或者"),
                          b("em", null, "点击上传")
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
}, It = /* @__PURE__ */ be(Tt, [["__scopeId", "data-v-3b66d397"]]), H = window.Vue.unref, he = window.Vue.resolveComponent, J = window.Vue.createVNode, le = window.Vue.withCtx, Bt = window.Vue.toDisplayString, Ne = window.Vue.openBlock, Fe = window.Vue.createElementBlock, Lt = window.Vue.createCommentVNode, Ee = window.Vue.createTextVNode, Ge = window.Vue.isRef, Dt = window.Vue.createElementVNode, Mt = { style: { width: "100%" } }, Ot = { class: "dialog-footer" }, Pt = { key: 0 }, ae = window.Vue.ref, jt = window.Vue.watch, qt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(a, { emit: f }) {
    ae("请选择图片");
    let m = ae(!1), u = ae(""), v = ae([]);
    const $ = a, k = f, r = ae($.modelValue);
    jt(() => $.modelValue, (n, h) => {
      r.value = n;
    });
    function x() {
      k("update:modelValue", r.value);
    }
    function y() {
      m.value = !0, u.value = "请选择附件";
    }
    function C() {
      let n = "";
      v.value.forEach((h, U) => {
        n += h.url;
      }), k("attachSelectChange", v.value), r.value = n, m.value = !1, v.value = [], k("update:modelValue", r.value);
    }
    function I() {
      m.value = !1, v.value = [];
    }
    function B(n) {
      v.value = n;
    }
    return (n, h) => {
      const U = he("el-button"), j = he("el-input"), R = he("el-dialog");
      return Ne(), Fe("div", Mt, [
        J(j, {
          modelValue: r.value,
          "onUpdate:modelValue": h[0] || (h[0] = (_) => r.value = _),
          placeholder: $.placeholder,
          style: { width: "100%" },
          disabled: !$.enableInput,
          onChange: x
        }, {
          append: le(() => [
            J(U, {
              icon: H(Je),
              type: "info",
              onClick: y
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        J(R, {
          modelValue: H(m),
          "onUpdate:modelValue": h[2] || (h[2] = (_) => Ge(m) ? m.value = _ : m = _),
          title: H(u),
          width: H(re)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: le(() => [
            Dt("span", Ot, [
              J(U, {
                type: "primary",
                onClick: C
              }, {
                default: le(() => [
                  h[3] || (h[3] = Ee("确 定")),
                  H(v).length > 0 ? (Ne(), Fe("span", Pt, "(已选" + Bt(H(v).length) + "个)", 1)) : Lt("", !0)
                ]),
                _: 1
              }),
              J(U, {
                onClick: h[1] || (h[1] = (_) => {
                  Ge(m) ? m.value = !1 : m = !1, I();
                })
              }, {
                default: le(() => h[4] || (h[4] = [
                  Ee("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: le(() => [
            J(It, {
              "onUpdate:selectedAttach": B,
              max: 1,
              "attach-type": $.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Kt = /* @__PURE__ */ be(qt, [["__scopeId", "data-v-52e51a92"]]), F = window.Vue.resolveComponent, s = window.Vue.createVNode, p = window.Vue.withCtx, E = window.Vue.unref, P = window.Vue.createTextVNode, oe = window.Vue.createElementVNode, Wt = window.Vue.normalizeStyle, de = window.Vue.openBlock, Ue = window.Vue.createElementBlock, ze = window.Vue.createCommentVNode, Re = window.Vue.createBlock, Ht = window.Vue.toDisplayString, Jt = window.Vue.resolveDirective, Yt = window.Vue.withDirectives, Te = window.Vue.isRef, Qt = { class: "page" }, Xt = { class: "search-box" }, Zt = { class: "right-tool" }, el = { class: "table-box" }, tl = { class: "dialog-footer" }, Y = window.ElementPlus.ElMessage, ll = window.ElementPlus.ElMessageBox, al = window.Vue.reactive, M = window.Vue.ref, ol = {
  __name: "TagView",
  setup(a) {
    const f = M({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), m = M();
    let u = M(!1), v = M(""), $ = M([]), k = M(!1);
    const r = M({
      id: "",
      name: "",
      thumbnail: "",
      color: "",
      slug: ""
    }), x = al({
      name: [{ required: !0, message: "请输入标签名称", trigger: "blur" }]
    }), y = M();
    function C() {
      k.value = !0, tt(f.value).then((_) => {
        $.value = _.data.list, f.value.total = _.data.total, k.value = !1;
      });
    }
    function I() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, m.value.resetFields(), C();
    }
    function B() {
      n(), v.value = "添加标签", u.value = !0;
    }
    function n() {
      r.value = {
        id: "",
        name: "",
        thumbnail: "",
        color: "",
        slug: ""
      }, y.value && y.value.resetFields();
    }
    function h() {
      y.value.validate((_) => {
        _ && (r.value.id ? ot(r.value).then((l) => {
          l.code === 200 ? (Y.success("修改成功"), u.value = !1, n(), C()) : Y.error(l.msg);
        }) : lt(r.value).then((l) => {
          l.code === 200 ? (Y.success("添加成功"), u.value = !1, n(), C()) : Y.error(l.msg);
        }));
      });
    }
    function U(_) {
      v.value = "修改标签", n(), at(_.id).then((l) => {
        r.value = l.data, u.value = !0;
      });
    }
    function j(_) {
      ll.confirm("确定要删除[" + _.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        nt(_.id).then((l) => {
          l.code === 200 && l.data ? (Y.success("删除成功"), C()) : Y.error(l.msg);
        });
      }).catch(() => {
      });
    }
    function R() {
      r.value.id || (Ae.setOptions({ charCase: 1, checkPolyphone: !1 }), r.value.slug = Ae.getCamelChars(r.value.name));
    }
    return C(), (_, l) => {
      const Q = F("el-input"), L = F("el-form-item"), z = F("el-button"), ne = F("el-form"), X = F("el-col"), D = F("el-row"), G = F("el-table-column"), ce = F("el-image"), q = F("el-table"), pe = F("el-pagination"), me = F("el-color-picker"), fe = F("el-dialog"), _e = Jt("loading");
      return de(), Ue("div", Qt, [
        oe("div", Xt, [
          s(ne, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: p(() => [
              s(L, { label: "标签名称" }, {
                default: p(() => [
                  s(Q, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (d) => f.value.name = d),
                    placeholder: "请输入标签名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              s(L, null, {
                default: p(() => [
                  s(z, {
                    type: "primary",
                    onClick: C,
                    icon: E(Ie)
                  }, {
                    default: p(() => l[9] || (l[9] = [
                      P("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  s(z, {
                    icon: E(Ve),
                    onClick: I
                  }, {
                    default: p(() => l[10] || (l[10] = [
                      P("重置")
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
        s(D, {
          gutter: 10,
          class: "mb8"
        }, {
          default: p(() => [
            s(X, { span: 1.5 }, {
              default: p(() => [
                s(z, {
                  icon: E(Ye),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: p(() => l[11] || (l[11] = [
                    P("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            oe("div", Zt, [
              s(z, {
                icon: E(Ve),
                circle: "",
                onClick: C
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        oe("div", el, [
          Yt((de(), Re(q, {
            data: E($),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: p(() => [
              s(G, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              s(G, {
                prop: "name",
                label: "标签名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              s(G, {
                prop: "color",
                label: "颜色",
                "min-width": "150"
              }, {
                default: p((d) => [
                  d.row.color ? (de(), Ue("div", {
                    key: 0,
                    class: "tableColor",
                    style: Wt({ "background-color": d.row.color })
                  }, null, 4)) : ze("", !0)
                ]),
                _: 1
              }),
              s(G, {
                prop: "slug",
                label: "slug",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              s(G, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "120"
              }, {
                default: p((d) => [
                  d.row.thumbnail ? (de(), Re(ce, {
                    key: 0,
                    style: { height: "50px" },
                    src: d.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [d.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : ze("", !0)
                ]),
                _: 1
              }),
              s(G, {
                prop: "articleCount",
                label: "文章数量",
                "min-width": "80"
              }),
              s(G, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: p((d) => [
                  oe("span", null, Ht(E(et)(d.row.createTime)), 1)
                ]),
                _: 1
              }),
              s(G, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              s(G, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: p((d) => [
                  s(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: E(Qe),
                    onClick: (ve) => U(d.row)
                  }, {
                    default: p(() => l[12] || (l[12] = [
                      P("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  s(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: E(Xe),
                    onClick: (ve) => j(d.row)
                  }, {
                    default: p(() => l[13] || (l[13] = [
                      P("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [_e, E(k)]
          ]),
          s(pe, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (d) => f.value.pageNo = d),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (d) => f.value.pageSize = d),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: C,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        s(fe, {
          modelValue: E(u),
          "onUpdate:modelValue": l[8] || (l[8] = (d) => Te(u) ? u.value = d : u = d),
          title: E(v),
          width: E(re)(600),
          draggable: ""
        }, {
          footer: p(() => [
            oe("span", tl, [
              s(z, {
                type: "primary",
                onClick: h
              }, {
                default: p(() => l[14] || (l[14] = [
                  P("确 定")
                ])),
                _: 1
              }),
              s(z, {
                onClick: l[7] || (l[7] = (d) => {
                  Te(u) ? u.value = !1 : u = !1, n();
                })
              }, {
                default: p(() => l[15] || (l[15] = [
                  P("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            s(ne, {
              ref_key: "addFormRef",
              ref: y,
              model: r.value,
              "label-width": "80px",
              "status-icon": "",
              rules: x
            }, {
              default: p(() => [
                s(L, {
                  label: "标签名称",
                  prop: "name"
                }, {
                  default: p(() => [
                    s(Q, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": l[3] || (l[3] = (d) => r.value.name = d),
                      placeholder: "请输入标签名称",
                      onChange: R
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                s(L, {
                  label: "标签颜色",
                  prop: "color"
                }, {
                  default: p(() => [
                    s(me, {
                      modelValue: r.value.color,
                      "onUpdate:modelValue": l[4] || (l[4] = (d) => r.value.color = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                s(L, {
                  label: "标签slug",
                  prop: "slug"
                }, {
                  default: p(() => [
                    s(Q, {
                      modelValue: r.value.slug,
                      "onUpdate:modelValue": l[5] || (l[5] = (d) => r.value.slug = d),
                      placeholder: "请输入标签slug"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                s(L, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: p(() => [
                    s(Kt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择封面图",
                      "model-value": r.value.thumbnail,
                      "onUpdate:modelValue": l[6] || (l[6] = (d) => r.value.thumbnail = d)
                    }, null, 8, ["model-value"])
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
}, il = /* @__PURE__ */ be(ol, [["__scopeId", "data-v-3ea78b15"]]);
export {
  il as default
};
