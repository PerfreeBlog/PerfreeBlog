import { s as Ue, r as ge, u as be, f as We, p as He, e as Je, d as Ye } from "./lib/@element-plus.js";
const Qe = window.Pinia.defineStore;
Qe({
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
    setMenuInit(o) {
      this.menuInit = o;
    },
    setMenuList(o) {
      this.menuList = o;
    },
    setCachedViews(o) {
      this.cachedViews = o;
    }
  },
  persist: {
    enabled: !1
  }
});
function Xe(o, f) {
  if (arguments.length === 0 || !o)
    return null;
  const m = f || "{y}-{m}-{d} {h}:{i}:{s}";
  let u;
  typeof o == "object" ? u = o : (typeof o == "string" && /^[0-9]+$/.test(o) ? o = parseInt(o) : typeof o == "string" && (o = o.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof o == "number" && o.toString().length === 10 && (o = o * 1e3), u = new Date(o));
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
function se(o) {
  return window.document.body.clientWidth < o ? window.document.body.clientWidth : o;
}
function Ze(o) {
  return axios.post("/api/auth/attach/page", o);
}
function et() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function tt(o) {
  return axios.put("/apiv/attach/update", o);
}
function lt(o) {
  return axios.get("/api/auth/attach/get?id=" + o);
}
const ot = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, at = {
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
function nt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const Ge = (o, f) => {
  const m = o.__vccOpts || o;
  for (const [u, _] of f)
    m[u] = _;
  return m;
}, w = window.Vue.resolveComponent, a = window.Vue.createVNode, s = window.Vue.withCtx, V = window.Vue.unref, Z = window.Vue.renderList, ee = window.Vue.Fragment, g = window.Vue.openBlock, E = window.Vue.createElementBlock, q = window.Vue.createBlock, T = window.Vue.createTextVNode, y = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const ke = window.Vue.toDisplayString, xe = window.Vue.normalizeClass, ut = window.Vue.withModifiers, _e = window.Vue.isRef, st = { class: "page" }, it = { class: "search-box" }, dt = { class: "table-box" }, rt = { class: "attach-list-box" }, ct = ["onClick"], pt = { class: "attach-preview" }, mt = { class: "imgLoading" }, ft = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, _t = ["src"], vt = {
  key: 2,
  class: "attach-other"
}, wt = { class: "attach-name" }, gt = { class: "operate-btn-box" }, ht = { style: { "padding-right": "15px" } }, Vt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, yt = ["src"], bt = {
  key: 2,
  controls: "",
  preload: "none"
}, kt = ["src"], xt = { key: 3 }, Ct = { class: "showForm" }, At = { class: "dialog-footer" }, $t = window.Vue.computed, St = window.Vue.reactive, S = window.Vue.ref, K = window.ElementPlus.ElMessage, Nt = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(o, { emit: f }) {
    const m = S(), u = S({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let _ = S([]), F = S(!1), x = S(/* @__PURE__ */ new Map());
    const r = f, C = o;
    let b = S(!1), A = S(""), I = S([]);
    const B = S(), n = S({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), h = St({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), R = S();
    let P = S(), v = S(!1), l = S([]);
    const k = S({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let L = localStorage.getItem(ot.STORAGE_TOKEN), z = at.baseURL, oe = {
      Authorization: "Bearer " + JSON.parse(L).accessToken
    };
    const ie = $t(() => {
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
    function Q() {
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
      C.attachType && (u.value.type = C.attachType), F.value = !0, Ze(u.value).then((c) => {
        c.data.list.forEach((e) => {
          e.selected = x.value.has(e.id);
        }), _.value = c.data.list, u.value.total = c.data.total, F.value = !1;
      });
    }
    function de() {
      u.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, m.value.resetFields(), $();
    }
    function re(c) {
      if (!c.selected && x.value.size >= C.max) {
        K.error(`最多选择${C.max}个`);
        return;
      }
      c.selected = !c.selected, c.selected ? x.value.set(c.id, c) : x.value.delete(c.id), r("update:selectedAttach", Array.from(x.value.values()));
    }
    function j() {
      et().then((c) => {
        I.value = c.data;
      });
    }
    function ce(c) {
      Q(), j(), lt(c.id).then((e) => {
        n.value = e.data, A.value = "详情", b.value = !0;
      });
    }
    function pe() {
      B.value.validate((c) => {
        c && tt(n.value).then((e) => {
          e.code === 200 ? (K.success("修改成功"), b.value = !1, Q(), $()) : K.error(e.msg);
        });
      });
    }
    function d() {
      j(), $();
    }
    function me(c, e, M) {
      c.code === 200 ? K.success(`[${e.name}]上传成功`) : (K.error(c.msg), P.value.handleRemove(e));
    }
    function Re() {
      ze(), A.value = "上传附件", Te(), j(), v.value = !0;
    }
    function ze() {
      k.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, R.value && R.value.resetFields();
    }
    function Te() {
      nt().then((c) => {
        l.value = c.data, c.data.forEach((e) => {
          e.master && (k.value.attachConfigId = e.id);
        });
      });
    }
    function Ie(c) {
      K.error("上传失败,请检查网络是否通通畅");
    }
    return j(), $(), (c, e) => {
      const M = w("el-input"), N = w("el-form-item"), ae = w("el-option"), ne = w("el-select"), X = w("el-button"), fe = w("el-form"), Be = w("Loading"), ue = w("el-icon"), he = w("el-image"), Le = w("el-text"), De = w("InfoFilled"), Me = w("SuccessFilled"), Oe = w("el-pagination"), Pe = w("el-link"), Ve = w("el-col"), je = w("el-row"), ye = w("el-dialog"), qe = w("el-upload");
      return g(), E("div", st, [
        y("div", it, [
          a(fe, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: s(() => [
              a(N, { label: "附件名称" }, {
                default: s(() => [
                  a(M, {
                    modelValue: u.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => u.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(N, { label: "分组" }, {
                default: s(() => [
                  a(ne, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: s(() => [
                      (g(!0), E(ee, null, Z(V(I), (t) => (g(), q(ae, {
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
              a(N, null, {
                default: s(() => [
                  a(X, {
                    type: "primary",
                    onClick: $,
                    icon: V(Ue)
                  }, {
                    default: s(() => e[16] || (e[16] = [
                      T("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  a(X, {
                    icon: V(ge),
                    onClick: de
                  }, {
                    default: s(() => e[17] || (e[17] = [
                      T("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              a(N, null, {
                default: s(() => [
                  a(X, {
                    icon: V(be),
                    type: "primary",
                    plain: "",
                    onClick: Re
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
        y("div", dt, [
          y("div", rt, [
            (g(!0), E(ee, null, Z(V(_), (t) => (g(), E("div", {
              class: xe({ "attach-block": !0, selected: t.selected }),
              onClick: (Ke) => re(t)
            }, [
              y("div", pt, [
                t.type && t.type === "img" ? (g(), q(he, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: s(() => [
                    y("div", mt, [
                      a(ue, { class: "is-loading" }, {
                        default: s(() => [
                          a(Be)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (g(), E("video", ft, [
                  y("source", {
                    src: t.url
                  }, null, 8, _t)
                ])) : (g(), E("div", vt, ke(t.path.split(".").pop()), 1))
              ]),
              y("div", wt, [
                a(Le, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: s(() => [
                    T(ke(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              y("div", {
                class: xe({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              y("div", gt, [
                a(ue, {
                  class: "operate-btn",
                  onClick: ut((Ke) => ce(t), ["stop"])
                }, {
                  default: s(() => [
                    a(De)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                a(ue, { class: "operate-btn select-btn" }, {
                  default: s(() => [
                    a(Me)
                  ]),
                  _: 1
                })
              ])
            ], 10, ct))), 256))
          ]),
          a(Oe, {
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
        a(ye, {
          modelValue: V(b),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => _e(b) ? b.value = t : b = t),
          title: V(A),
          width: V(se)(800),
          draggable: ""
        }, {
          footer: s(() => [
            y("span", At, [
              a(X, {
                type: "primary",
                onClick: pe
              }, {
                default: s(() => e[21] || (e[21] = [
                  T("修 改")
                ])),
                _: 1
              }),
              a(X, {
                onClick: e[10] || (e[10] = (t) => {
                  _e(b) ? b.value = !1 : b = !1, Q();
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
            a(je, null, {
              default: s(() => [
                a(Ve, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    y("div", ht, [
                      n.value.type && n.value.type === "img" ? (g(), q(he, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (g(), E("video", Vt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, yt)
                      ])) : n.value.type && n.value.type === "audio" ? (g(), E("audio", bt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, kt)
                      ])) : (g(), E("i", xt, [
                        e[20] || (e[20] = T("无法预览，点击 ")),
                        a(Pe, {
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
                a(Ve, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    y("div", Ct, [
                      a(fe, {
                        ref_key: "showFormRef",
                        ref: B,
                        model: n.value,
                        "label-width": "auto",
                        rules: h,
                        "label-position": "top"
                      }, {
                        default: s(() => [
                          a(N, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: s(() => [
                              a(M, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "附件类型" }, {
                            default: s(() => [
                              a(M, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "分组" }, {
                            default: s(() => [
                              a(ne, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: s(() => [
                                  (g(!0), E(ee, null, Z(V(I), (t) => (g(), q(ae, {
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
                          a(N, { label: "存储路径" }, {
                            default: s(() => [
                              a(M, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "访问地址" }, {
                            default: s(() => [
                              a(M, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "附件描述" }, {
                            default: s(() => [
                              a(M, {
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
        a(ye, {
          modelValue: V(v),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => _e(v) ? v.value = t : v = t),
          title: V(A),
          width: V(se)(600),
          draggable: "",
          onClose: d
        }, {
          default: s(() => [
            a(fe, {
              ref_key: "addFormRef",
              ref: R,
              model: k.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: s(() => [
                a(N, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: s(() => [
                    a(ne, {
                      modelValue: k.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => k.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: s(() => [
                        (g(!0), E(ee, null, Z(V(l), (t) => (g(), q(ae, {
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
                a(N, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: s(() => [
                    a(ne, {
                      modelValue: k.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => k.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: s(() => [
                        (g(!0), E(ee, null, Z(V(I), (t) => (g(), q(ae, {
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
                a(N, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: s(() => [
                    a(qe, {
                      class: "upload-demo",
                      drag: "",
                      headers: V(oe),
                      action: V(z) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: P,
                      "file-list": k.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => k.value.fileList = t),
                      data: { attachConfigId: k.value.attachConfigId, attachGroup: k.value.attachGroup },
                      "on-success": me,
                      "on-error": Ie,
                      accept: ie.value
                    }, {
                      tip: s(() => e[23] || (e[23] = [
                        y("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: s(() => [
                        a(ue, { class: "el-icon--upload" }, {
                          default: s(() => [
                            a(V(be))
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
}, Ft = /* @__PURE__ */ Ge(Nt, [["__scopeId", "data-v-3b66d397"]]), W = window.Vue.unref, ve = window.Vue.resolveComponent, H = window.Vue.createVNode, te = window.Vue.withCtx, Et = window.Vue.toDisplayString, Ce = window.Vue.openBlock, Ae = window.Vue.createElementBlock, Ut = window.Vue.createCommentVNode, $e = window.Vue.createTextVNode, Se = window.Vue.isRef, Gt = window.Vue.createElementVNode, Rt = { style: { width: "100%" } }, zt = { class: "dialog-footer" }, Tt = { key: 0 }, le = window.Vue.ref, It = window.Vue.watch, Bt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(o, { emit: f }) {
    le("请选择图片");
    let m = le(!1), u = le(""), _ = le([]);
    const F = o, x = f, r = le(F.modelValue);
    It(() => F.modelValue, (n, h) => {
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
      const R = ve("el-button"), P = ve("el-input"), v = ve("el-dialog");
      return Ce(), Ae("div", Rt, [
        H(P, {
          modelValue: r.value,
          "onUpdate:modelValue": h[0] || (h[0] = (l) => r.value = l),
          placeholder: F.placeholder,
          style: { width: "100%" },
          disabled: !F.enableInput,
          onChange: C
        }, {
          append: te(() => [
            H(R, {
              icon: W(We),
              type: "info",
              onClick: b
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        H(v, {
          modelValue: W(m),
          "onUpdate:modelValue": h[2] || (h[2] = (l) => Se(m) ? m.value = l : m = l),
          title: W(u),
          width: W(se)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: te(() => [
            Gt("span", zt, [
              H(R, {
                type: "primary",
                onClick: A
              }, {
                default: te(() => [
                  h[3] || (h[3] = $e("确 定")),
                  W(_).length > 0 ? (Ce(), Ae("span", Tt, "(已选" + Et(W(_).length) + "个)", 1)) : Ut("", !0)
                ]),
                _: 1
              }),
              H(R, {
                onClick: h[1] || (h[1] = (l) => {
                  Se(m) ? m.value = !1 : m = !1, I();
                })
              }, {
                default: te(() => h[4] || (h[4] = [
                  $e("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: te(() => [
            H(Ft, {
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
}, Lt = /* @__PURE__ */ Ge(Bt, [["__scopeId", "data-v-52e51a92"]]);
function Dt(o) {
  return axios.post("/api/auth/link/page", o);
}
function Mt(o) {
  return axios.post("/api/auth/link/add", o);
}
function Ot(o) {
  return axios.put("/api/auth/link/update", o);
}
function Pt(o) {
  return axios.get("/api/auth/link/get?id=" + o);
}
function jt(o) {
  return axios.delete("/api/auth/link/del?id=" + o);
}
const G = window.Vue.resolveComponent, i = window.Vue.createVNode, p = window.Vue.withCtx, U = window.Vue.unref, O = window.Vue.createTextVNode, J = window.Vue.createElementVNode, we = window.Vue.openBlock, Ne = window.Vue.createBlock, qt = window.Vue.createCommentVNode, Fe = window.Vue.toDisplayString, Kt = window.Vue.resolveDirective, Wt = window.Vue.withDirectives, Ee = window.Vue.isRef, Ht = window.Vue.createElementBlock, Jt = { class: "page" }, Yt = { class: "search-box" }, Qt = { class: "right-tool" }, Xt = { class: "table-box" }, Zt = ["href"], el = { class: "dialog-footer" }, Y = window.ElementPlus.ElMessage, tl = window.ElementPlus.ElMessageBox, ll = window.Vue.reactive, D = window.Vue.ref, al = {
  __name: "LinkView",
  setup(o) {
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
      x.value = !0, Dt(f.value).then((v) => {
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
        v && (r.value.id ? Ot(r.value).then((l) => {
          l.code === 200 ? (Y.success("修改成功"), u.value = !1, n(), A()) : Y.error(l.msg);
        }) : Mt(r.value).then((l) => {
          l.code === 200 ? (Y.success("添加成功"), u.value = !1, n(), A()) : Y.error(l.msg);
        }));
      });
    }
    function R(v) {
      _.value = "修改标签", n(), Pt(v.id).then((l) => {
        r.value = l.data, u.value = !0;
      });
    }
    function P(v) {
      tl.confirm("确定要删除[" + v.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        jt(v.id).then((l) => {
          l.code === 200 && l.data ? (Y.success("删除成功"), A()) : Y.error(l.msg);
        });
      }).catch(() => {
      });
    }
    return A(), (v, l) => {
      const k = G("el-input"), L = G("el-form-item"), z = G("el-button"), oe = G("el-form"), ie = G("el-col"), Q = G("el-row"), $ = G("el-table-column"), de = G("el-image"), re = G("el-table"), j = G("el-pagination"), ce = G("el-dialog"), pe = Kt("loading");
      return we(), Ht("div", Jt, [
        J("div", Yt, [
          i(oe, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: p(() => [
              i(L, { label: "网站名称" }, {
                default: p(() => [
                  i(k, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (d) => f.value.name = d),
                    placeholder: "请输入网站名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(L, null, {
                default: p(() => [
                  i(z, {
                    type: "primary",
                    onClick: A,
                    icon: U(Ue)
                  }, {
                    default: p(() => l[9] || (l[9] = [
                      O("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  i(z, {
                    icon: U(ge),
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
        i(Q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: p(() => [
            i(ie, { span: 1.5 }, {
              default: p(() => [
                i(z, {
                  icon: U(He),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: p(() => l[11] || (l[11] = [
                    O("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            J("div", Qt, [
              i(z, {
                icon: U(ge),
                circle: "",
                onClick: A
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        J("div", Xt, [
          Wt((we(), Ne(re, {
            data: U(F),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: p(() => [
              i($, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              i($, {
                prop: "name",
                label: "网站名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i($, {
                prop: "logo",
                label: "网站logo",
                "min-width": "100"
              }, {
                default: p((d) => [
                  d.row.logo ? (we(), Ne(de, {
                    key: 0,
                    style: { height: "50px" },
                    src: d.row.logo,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [d.row.logo],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : qt("", !0)
                ]),
                _: 1
              }),
              i($, {
                prop: "desc",
                label: "网站描述",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i($, {
                prop: "address",
                label: "网站地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: p((d) => [
                  J("a", {
                    href: d.row.address,
                    target: "_blank"
                  }, Fe(d.row.address), 9, Zt)
                ]),
                _: 1
              }),
              i($, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i($, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: p((d) => [
                  J("span", null, Fe(U(Xe)(d.row.createTime)), 1)
                ]),
                _: 1
              }),
              i($, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: p((d) => [
                  i(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: U(Je),
                    onClick: (me) => R(d.row)
                  }, {
                    default: p(() => l[12] || (l[12] = [
                      O("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  i(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: U(Ye),
                    onClick: (me) => P(d.row)
                  }, {
                    default: p(() => l[13] || (l[13] = [
                      O("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [pe, U(x)]
          ]),
          i(j, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (d) => f.value.pageNo = d),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (d) => f.value.pageSize = d),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: A,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        i(ce, {
          modelValue: U(u),
          "onUpdate:modelValue": l[8] || (l[8] = (d) => Ee(u) ? u.value = d : u = d),
          title: U(_),
          width: U(se)(600),
          draggable: ""
        }, {
          footer: p(() => [
            J("span", el, [
              i(z, {
                type: "primary",
                onClick: h
              }, {
                default: p(() => l[14] || (l[14] = [
                  O("确 定")
                ])),
                _: 1
              }),
              i(z, {
                onClick: l[7] || (l[7] = (d) => {
                  Ee(u) ? u.value = !1 : u = !1, n();
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
            i(oe, {
              ref_key: "addFormRef",
              ref: b,
              model: r.value,
              "label-width": "80px",
              "status-icon": "",
              rules: C
            }, {
              default: p(() => [
                i(L, {
                  label: "网站名称",
                  prop: "name"
                }, {
                  default: p(() => [
                    i(k, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": l[3] || (l[3] = (d) => r.value.name = d),
                      placeholder: "请输入网站名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(L, {
                  label: "网站地址",
                  prop: "address"
                }, {
                  default: p(() => [
                    i(k, {
                      modelValue: r.value.address,
                      "onUpdate:modelValue": l[4] || (l[4] = (d) => r.value.address = d),
                      placeholder: "请输入网站地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(L, {
                  label: "网站logo",
                  prop: "logo"
                }, {
                  default: p(() => [
                    i(Lt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请输入网站logo地址",
                      "model-value": r.value.logo,
                      "onUpdate:modelValue": l[5] || (l[5] = (d) => r.value.logo = d)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                i(L, {
                  label: "网站描述",
                  prop: "desc"
                }, {
                  default: p(() => [
                    i(k, {
                      modelValue: r.value.desc,
                      "onUpdate:modelValue": l[6] || (l[6] = (d) => r.value.desc = d),
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
  al as default
};
