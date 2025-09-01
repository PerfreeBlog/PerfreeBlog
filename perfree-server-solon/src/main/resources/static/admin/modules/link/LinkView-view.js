import { s as ze, r as ye, u as Ce, f as Je, p as Ye, e as Qe, d as Xe } from "./lib/@element-plus.js";
const Ze = window.Pinia.defineStore;
Ze({
  id: "common",
  state: () => ({
    menuInit: !1,
    optionInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getOptionInit() {
      return this.optionInit;
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
    setOptionInit(o) {
      this.optionInit = o;
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
function et(o, f) {
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
function ce(o) {
  return window.document.body.clientWidth < o ? window.document.body.clientWidth : o;
}
function tt(o) {
  return axios.post("/api/auth/attach/page", o);
}
function lt() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function ot(o) {
  return axios.put("/apiv/attach/update", o);
}
function at(o) {
  return axios.get("/api/auth/attach/get?id=" + o);
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
};
function it() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const Ie = (o, f) => {
  const m = o.__vccOpts || o;
  for (const [u, _] of f)
    m[u] = _;
  return m;
}, g = window.Vue.resolveComponent, a = window.Vue.createVNode, i = window.Vue.withCtx, V = window.Vue.unref, te = window.Vue.renderList, le = window.Vue.Fragment, w = window.Vue.openBlock, E = window.Vue.createElementBlock, q = window.Vue.createBlock, I = window.Vue.createTextVNode, y = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ae = window.Vue.toDisplayString, $e = window.Vue.normalizeClass, st = window.Vue.withModifiers, he = window.Vue.isRef, dt = { class: "page" }, rt = { class: "search-box" }, ct = { class: "table-box" }, pt = { class: "attach-list-box" }, mt = ["onClick"], ft = { class: "attach-preview" }, _t = { class: "imgLoading" }, vt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, gt = ["src"], wt = {
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
    let b = S(!1), A = S(""), T = S([]);
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
        T.value = c.data;
      });
    }
    function _e(c) {
      X(), j(), at(c.id).then((e) => {
        n.value = e.data, A.value = "详情", b.value = !0;
      });
    }
    function Z() {
      B.value.validate((c) => {
        c && ot(n.value).then((e) => {
          e.code === 200 ? (K.success("修改成功"), b.value = !1, X(), $()) : K.error(e.msg);
        });
      });
    }
    function ve() {
      j(), $();
    }
    function s(c, e, M) {
      c.code === 200 ? K.success(`[${e.name}]上传成功`) : (K.error(c.msg), P.value.handleRemove(e));
    }
    function ge() {
      Te(), A.value = "上传附件", Be(), j(), v.value = !0;
    }
    function Te() {
      k.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, R.value && R.value.resetFields();
    }
    function Be() {
      it().then((c) => {
        l.value = c.data, c.data.forEach((e) => {
          e.master && (k.value.attachConfigId = e.id);
        });
      });
    }
    function Le(c) {
      K.error("上传失败,请检查网络是否通通畅");
    }
    return j(), $(), (c, e) => {
      const M = g("el-input"), N = g("el-form-item"), ie = g("el-option"), se = g("el-select"), ee = g("el-button"), we = g("el-form"), De = g("Loading"), de = g("el-icon"), be = g("el-image"), Me = g("el-text"), Oe = g("InfoFilled"), Pe = g("SuccessFilled"), je = g("el-pagination"), qe = g("el-link"), ke = g("el-col"), Ke = g("el-row"), xe = g("el-dialog"), We = g("el-upload");
      return w(), E("div", dt, [
        y("div", rt, [
          a(we, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: i(() => [
              a(N, { label: "附件名称" }, {
                default: i(() => [
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
                default: i(() => [
                  a(se, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: i(() => [
                      (w(!0), E(le, null, te(V(T), (t) => (w(), q(ie, {
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
                default: i(() => [
                  a(ee, {
                    type: "primary",
                    onClick: $,
                    icon: V(ze)
                  }, {
                    default: i(() => e[16] || (e[16] = [
                      I("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  a(ee, {
                    icon: V(ye),
                    onClick: me
                  }, {
                    default: i(() => e[17] || (e[17] = [
                      I("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              a(N, null, {
                default: i(() => [
                  a(ee, {
                    icon: V(Ce),
                    type: "primary",
                    plain: "",
                    onClick: ge
                  }, {
                    default: i(() => e[18] || (e[18] = [
                      I("上传附件")
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
            (w(!0), E(le, null, te(V(_), (t) => (w(), E("div", {
              class: $e({ "attach-block": !0, selected: t.selected }),
              onClick: (He) => fe(t)
            }, [
              y("div", ft, [
                t.type && t.type === "img" ? (w(), q(be, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: i(() => [
                    y("div", _t, [
                      a(de, { class: "is-loading" }, {
                        default: i(() => [
                          a(De)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (w(), E("video", vt, [
                  y("source", {
                    src: t.url
                  }, null, 8, gt)
                ])) : (w(), E("div", wt, Ae(t.path.split(".").pop()), 1))
              ]),
              y("div", ht, [
                a(Me, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: i(() => [
                    I(Ae(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              y("div", {
                class: $e({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              y("div", Vt, [
                a(de, {
                  class: "operate-btn",
                  onClick: st((He) => _e(t), ["stop"])
                }, {
                  default: i(() => [
                    a(Oe)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                a(de, { class: "operate-btn select-btn" }, {
                  default: i(() => [
                    a(Pe)
                  ]),
                  _: 1
                })
              ])
            ], 10, mt))), 256))
          ]),
          a(je, {
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
        a(xe, {
          modelValue: V(b),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => he(b) ? b.value = t : b = t),
          title: V(A),
          width: V(ce)(800),
          draggable: ""
        }, {
          footer: i(() => [
            y("span", St, [
              a(ee, {
                type: "primary",
                onClick: Z
              }, {
                default: i(() => e[21] || (e[21] = [
                  I("修 改")
                ])),
                _: 1
              }),
              a(ee, {
                onClick: e[10] || (e[10] = (t) => {
                  he(b) ? b.value = !1 : b = !1, X();
                })
              }, {
                default: i(() => e[22] || (e[22] = [
                  I("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            a(Ke, null, {
              default: i(() => [
                a(ke, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    y("div", yt, [
                      n.value.type && n.value.type === "img" ? (w(), q(be, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (w(), E("video", bt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, kt)
                      ])) : n.value.type && n.value.type === "audio" ? (w(), E("audio", xt, [
                        y("source", {
                          src: n.value.url
                        }, null, 8, Ct)
                      ])) : (w(), E("i", At, [
                        e[20] || (e[20] = I("无法预览，点击 ")),
                        a(qe, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: i(() => e[19] || (e[19] = [
                            I("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                a(ke, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    y("div", $t, [
                      a(we, {
                        ref_key: "showFormRef",
                        ref: B,
                        model: n.value,
                        "label-width": "auto",
                        rules: h,
                        "label-position": "top"
                      }, {
                        default: i(() => [
                          a(N, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: i(() => [
                              a(M, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "附件类型" }, {
                            default: i(() => [
                              a(M, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "分组" }, {
                            default: i(() => [
                              a(se, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: i(() => [
                                  (w(!0), E(le, null, te(V(T), (t) => (w(), q(ie, {
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
                            default: i(() => [
                              a(M, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "访问地址" }, {
                            default: i(() => [
                              a(M, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(N, { label: "附件描述" }, {
                            default: i(() => [
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
        a(xe, {
          modelValue: V(v),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => he(v) ? v.value = t : v = t),
          title: V(A),
          width: V(ce)(600),
          draggable: "",
          onClose: ve
        }, {
          default: i(() => [
            a(we, {
              ref_key: "addFormRef",
              ref: R,
              model: k.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: i(() => [
                a(N, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: i(() => [
                    a(se, {
                      modelValue: k.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => k.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: i(() => [
                        (w(!0), E(le, null, te(V(l), (t) => (w(), q(ie, {
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
                  default: i(() => [
                    a(se, {
                      modelValue: k.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => k.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: i(() => [
                        (w(!0), E(le, null, te(V(T), (t) => (w(), q(ie, {
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
                  default: i(() => [
                    a(We, {
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
                      "on-success": s,
                      "on-error": Le,
                      accept: pe.value
                    }, {
                      tip: i(() => e[23] || (e[23] = [
                        y("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: i(() => [
                        a(de, { class: "el-icon--upload" }, {
                          default: i(() => [
                            a(V(Ce))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = y("div", { class: "el-upload__text" }, [
                          I(" 拖拽文件到此处或者"),
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
}, Ut = /* @__PURE__ */ Ie(Et, [["__scopeId", "data-v-3b66d397"]]), W = window.Vue.unref, Ve = window.Vue.resolveComponent, H = window.Vue.createVNode, oe = window.Vue.withCtx, Gt = window.Vue.toDisplayString, Se = window.Vue.openBlock, Ne = window.Vue.createElementBlock, Rt = window.Vue.createCommentVNode, Fe = window.Vue.createTextVNode, Ee = window.Vue.isRef, zt = window.Vue.createElementVNode, It = { style: { width: "100%" } }, Tt = { class: "dialog-footer" }, Bt = { key: 0 }, ae = window.Vue.ref, Lt = window.Vue.watch, Dt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(o, { emit: f }) {
    ae("请选择图片");
    let m = ae(!1), u = ae(""), _ = ae([]);
    const F = o, x = f, r = ae(F.modelValue);
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
    function T() {
      m.value = !1, _.value = [];
    }
    function B(n) {
      _.value = n;
    }
    return (n, h) => {
      const R = Ve("el-button"), P = Ve("el-input"), v = Ve("el-dialog");
      return Se(), Ne("div", It, [
        H(P, {
          modelValue: r.value,
          "onUpdate:modelValue": h[0] || (h[0] = (l) => r.value = l),
          placeholder: F.placeholder,
          style: { width: "100%" },
          disabled: !F.enableInput,
          onChange: C
        }, {
          append: oe(() => [
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
          footer: oe(() => [
            zt("span", Tt, [
              H(R, {
                type: "primary",
                onClick: A
              }, {
                default: oe(() => [
                  h[3] || (h[3] = Fe("确 定")),
                  W(_).length > 0 ? (Se(), Ne("span", Bt, "(已选" + Gt(W(_).length) + "个)", 1)) : Rt("", !0)
                ]),
                _: 1
              }),
              H(R, {
                onClick: h[1] || (h[1] = (l) => {
                  Ee(m) ? m.value = !1 : m = !1, T();
                })
              }, {
                default: oe(() => h[4] || (h[4] = [
                  Fe("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: oe(() => [
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
}, Mt = /* @__PURE__ */ Ie(Dt, [["__scopeId", "data-v-52e51a92"]]);
function Ot(o) {
  return axios.post("/api/auth/link/page", o);
}
function Pt(o) {
  return axios.post("/api/auth/link/add", o);
}
function jt(o) {
  return axios.put("/api/auth/link/update", o);
}
function qt(o) {
  return axios.get("/api/auth/link/get?id=" + o);
}
function Kt(o) {
  return axios.delete("/api/auth/link/del?id=" + o);
}
const G = window.Vue.resolveComponent, d = window.Vue.createVNode, p = window.Vue.withCtx, U = window.Vue.unref, O = window.Vue.createTextVNode, J = window.Vue.createElementVNode, Ue = window.Vue.resolveDirective, Y = window.Vue.openBlock, ne = window.Vue.createBlock, re = window.Vue.withDirectives, Wt = window.Vue.createCommentVNode, Ge = window.Vue.toDisplayString, Re = window.Vue.isRef, Ht = window.Vue.createElementBlock, Jt = { class: "page" }, Yt = { class: "search-box" }, Qt = { class: "right-tool" }, Xt = { class: "table-box" }, Zt = ["href"], el = { class: "dialog-footer" }, Q = window.ElementPlus.ElMessage, tl = window.ElementPlus.ElMessageBox, ll = window.Vue.reactive, D = window.Vue.ref, al = {
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
      x.value = !0, Ot(f.value).then((v) => {
        F.value = v.data.list, f.value.total = v.data.total, x.value = !1;
      });
    }
    function T() {
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
                    "onUpdate:modelValue": l[0] || (l[0] = (s) => f.value.name = s),
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
                    onClick: T
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
                default: p((s) => [
                  s.row.logo ? (Y(), ne(me, {
                    key: 0,
                    style: { height: "50px" },
                    src: s.row.logo,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [s.row.logo],
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
                default: p((s) => [
                  J("a", {
                    href: s.row.address,
                    target: "_blank"
                  }, Ge(s.row.address), 9, Zt)
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
                default: p((s) => [
                  J("span", null, Ge(U(et)(s.row.createTime)), 1)
                ]),
                _: 1
              }),
              d($, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: p((s) => [
                  re((Y(), ne(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: U(Qe),
                    onClick: (ge) => R(s.row)
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
                    onClick: (ge) => P(s.row)
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
            "onUpdate:currentPage": l[1] || (l[1] = (s) => f.value.pageNo = s),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (s) => f.value.pageSize = s),
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
          "onUpdate:modelValue": l[8] || (l[8] = (s) => Re(u) ? u.value = s : u = s),
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
                onClick: l[7] || (l[7] = (s) => {
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
                      "onUpdate:modelValue": l[3] || (l[3] = (s) => r.value.name = s),
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
                      "onUpdate:modelValue": l[4] || (l[4] = (s) => r.value.address = s),
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
                      "onUpdate:modelValue": l[5] || (l[5] = (s) => r.value.logo = s)
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
                      "onUpdate:modelValue": l[6] || (l[6] = (s) => r.value.desc = s),
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
