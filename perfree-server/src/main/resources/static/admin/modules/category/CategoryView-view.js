import { s as Ie, r as Ce, u as Ee, f as Xe, p as Re, e as Ze, d as et } from "./lib/@element-plus.js";
import { p as Fe } from "./lib/js-pinyin.js";
function ye(o) {
  return axios.post("/api/auth/category/pageList", o);
}
function tt(o) {
  return axios.post("/api/auth/category/add", o);
}
function lt(o) {
  return axios.put("/api/auth/category/update", o);
}
function at(o) {
  return axios.get("/api/auth/category/get?id=" + o);
}
function ot(o) {
  return axios.delete("/api/auth/category/del?id=" + o);
}
const nt = window.Pinia.defineStore;
nt({
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
function ut(o, $) {
  if (arguments.length === 0 || !o)
    return null;
  const c = $ || "{y}-{m}-{d} {h}:{i}:{s}";
  let d;
  typeof o == "object" ? d = o : (typeof o == "string" && /^[0-9]+$/.test(o) ? o = parseInt(o) : typeof o == "string" && (o = o.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof o == "number" && o.toString().length === 10 && (o = o * 1e3), d = new Date(o));
  const v = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: d.getDay()
  };
  return c.replace(/{([ymdhisa])+}/g, (m, _) => {
    let w = v[_];
    return _ === "a" ? ["日", "一", "二", "三", "四", "五", "六"][w] : (m.length > 0 && w < 10 && (w = "0" + w), w || 0);
  });
}
function be(o, $, c, d, v) {
  $ = $ || "id", c = c || "parentId", v = v || Math.min.apply(Math, o.map((_) => _[c])) || 0;
  const k = JSON.parse(JSON.stringify(o)), m = k.filter((_) => {
    let w = k.filter((h) => _[$] === h[c]);
    return w.length > 0 && (_.children = w), _[c] === v;
  });
  return m.length === 0 && o.length > 0 ? o : m.length > 0 ? m : o;
}
function pe(o) {
  return window.document.body.clientWidth < o ? window.document.body.clientWidth : o;
}
function it(o) {
  return axios.post("/api/auth/attach/page", o);
}
function st() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function dt(o) {
  return axios.put("/apiv/attach/update", o);
}
function rt(o) {
  return axios.get("/api/auth/attach/get?id=" + o);
}
const ct = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, pt = {
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
function mt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const Me = (o, $) => {
  const c = o.__vccOpts || o;
  for (const [d, v] of $)
    c[d] = v;
  return c;
}, g = window.Vue.resolveComponent, n = window.Vue.createVNode, s = window.Vue.withCtx, y = window.Vue.unref, ee = window.Vue.renderList, te = window.Vue.Fragment, V = window.Vue.openBlock, G = window.Vue.createElementBlock, J = window.Vue.createBlock, I = window.Vue.createTextVNode, b = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ne = window.Vue.toDisplayString, Ue = window.Vue.normalizeClass, ft = window.Vue.withModifiers, ke = window.Vue.isRef, vt = { class: "page" }, _t = { class: "search-box" }, wt = { class: "table-box" }, ht = { class: "attach-list-box" }, gt = ["onClick"], Vt = { class: "attach-preview" }, yt = { class: "imgLoading" }, bt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, kt = ["src"], xt = {
  key: 2,
  class: "attach-other"
}, Ct = { class: "attach-name" }, At = { class: "operate-btn-box" }, St = { style: { "padding-right": "15px" } }, $t = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Et = ["src"], Rt = {
  key: 2,
  controls: "",
  preload: "none"
}, Ft = ["src"], Nt = { key: 3 }, Ut = { class: "showForm" }, Gt = { class: "dialog-footer" }, Tt = window.Vue.computed, Dt = window.Vue.reactive, A = window.Vue.ref, W = window.ElementPlus.ElMessage, zt = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(o, { emit: $ }) {
    const c = A(), d = A({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let v = A([]), k = A(!1), m = A(/* @__PURE__ */ new Map());
    const _ = $, w = o;
    let h = A(!1), M = A(""), r = A([]);
    const P = A(), u = A({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), f = Dt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), B = A();
    let K = A(), E = A(!1), L = A([]);
    const R = A({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let me = localStorage.getItem(ct.STORAGE_TOKEN), fe = pt.baseURL, C = {
      Authorization: "Bearer " + JSON.parse(me).accessToken
    };
    const a = Tt(() => {
      switch (w.attachType) {
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
    function F() {
      u.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, P.value && P.value.resetFields();
    }
    function x() {
      w.attachType && (d.value.type = w.attachType), k.value = !0, it(d.value).then((l) => {
        l.data.list.forEach((e) => {
          e.selected = m.value.has(e.id);
        }), v.value = l.data.list, d.value.total = l.data.total, k.value = !1;
      });
    }
    function z() {
      d.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, c.value.resetFields(), x();
    }
    function ue(l) {
      if (!l.selected && m.value.size >= w.max) {
        W.error(`最多选择${w.max}个`);
        return;
      }
      l.selected = !l.selected, l.selected ? m.value.set(l.id, l) : m.value.delete(l.id), _("update:selectedAttach", Array.from(m.value.values()));
    }
    function q() {
      st().then((l) => {
        r.value = l.data;
      });
    }
    function ve(l) {
      F(), q(), rt(l.id).then((e) => {
        u.value = e.data, M.value = "详情", h.value = !0;
      });
    }
    function N() {
      P.value.validate((l) => {
        l && dt(u.value).then((e) => {
          e.code === 200 ? (W.success("修改成功"), h.value = !1, F(), x()) : W.error(e.msg);
        });
      });
    }
    function _e() {
      q(), x();
    }
    function ie(l, e, j) {
      l.code === 200 ? W.success(`[${e.name}]上传成功`) : (W.error(l.msg), K.value.handleRemove(e));
    }
    function we() {
      he(), M.value = "上传附件", ge(), q(), E.value = !0;
    }
    function he() {
      R.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, B.value && B.value.resetFields();
    }
    function ge() {
      mt().then((l) => {
        L.value = l.data, l.data.forEach((e) => {
          e.master && (R.value.attachConfigId = e.id);
        });
      });
    }
    function se(l) {
      W.error("上传失败,请检查网络是否通通畅");
    }
    return q(), x(), (l, e) => {
      const j = g("el-input"), U = g("el-form-item"), de = g("el-option"), re = g("el-select"), Z = g("el-button"), Ve = g("el-form"), Pe = g("Loading"), ce = g("el-icon"), Ae = g("el-image"), Ke = g("el-text"), je = g("InfoFilled"), qe = g("SuccessFilled"), Je = g("el-pagination"), We = g("el-link"), Se = g("el-col"), He = g("el-row"), $e = g("el-dialog"), Ye = g("el-upload");
      return V(), G("div", vt, [
        b("div", _t, [
          n(Ve, {
            inline: !0,
            model: d.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: c
          }, {
            default: s(() => [
              n(U, { label: "附件名称" }, {
                default: s(() => [
                  n(j, {
                    modelValue: d.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => d.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(U, { label: "分组" }, {
                default: s(() => [
                  n(re, {
                    modelValue: d.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => d.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: s(() => [
                      (V(!0), G(te, null, ee(y(r), (t) => (V(), J(de, {
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
              n(U, null, {
                default: s(() => [
                  n(Z, {
                    type: "primary",
                    onClick: x,
                    icon: y(Ie)
                  }, {
                    default: s(() => e[16] || (e[16] = [
                      I("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  n(Z, {
                    icon: y(Ce),
                    onClick: z
                  }, {
                    default: s(() => e[17] || (e[17] = [
                      I("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              n(U, null, {
                default: s(() => [
                  n(Z, {
                    icon: y(Ee),
                    type: "primary",
                    plain: "",
                    onClick: we
                  }, {
                    default: s(() => e[18] || (e[18] = [
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
        b("div", wt, [
          b("div", ht, [
            (V(!0), G(te, null, ee(y(v), (t) => (V(), G("div", {
              class: Ue({ "attach-block": !0, selected: t.selected }),
              onClick: (Qe) => ue(t)
            }, [
              b("div", Vt, [
                t.type && t.type === "img" ? (V(), J(Ae, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: s(() => [
                    b("div", yt, [
                      n(ce, { class: "is-loading" }, {
                        default: s(() => [
                          n(Pe)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (V(), G("video", bt, [
                  b("source", {
                    src: t.url
                  }, null, 8, kt)
                ])) : (V(), G("div", xt, Ne(t.path.split(".").pop()), 1))
              ]),
              b("div", Ct, [
                n(Ke, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: s(() => [
                    I(Ne(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              b("div", {
                class: Ue({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              b("div", At, [
                n(ce, {
                  class: "operate-btn",
                  onClick: ft((Qe) => ve(t), ["stop"])
                }, {
                  default: s(() => [
                    n(je)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                n(ce, { class: "operate-btn select-btn" }, {
                  default: s(() => [
                    n(qe)
                  ]),
                  _: 1
                })
              ])
            ], 10, gt))), 256))
          ]),
          n(Je, {
            "current-page": d.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => d.value.pageNo = t),
            "page-size": d.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => d.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: x,
            total: d.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n($e, {
          modelValue: y(h),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => ke(h) ? h.value = t : h = t),
          title: y(M),
          width: y(pe)(800),
          draggable: ""
        }, {
          footer: s(() => [
            b("span", Gt, [
              n(Z, {
                type: "primary",
                onClick: N
              }, {
                default: s(() => e[21] || (e[21] = [
                  I("修 改")
                ])),
                _: 1
              }),
              n(Z, {
                onClick: e[10] || (e[10] = (t) => {
                  ke(h) ? h.value = !1 : h = !1, F();
                })
              }, {
                default: s(() => e[22] || (e[22] = [
                  I("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            n(He, null, {
              default: s(() => [
                n(Se, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    b("div", St, [
                      u.value.type && u.value.type === "img" ? (V(), J(Ae, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: u.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [u.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : u.value.type && u.value.type === "video" ? (V(), G("video", $t, [
                        b("source", {
                          src: u.value.url
                        }, null, 8, Et)
                      ])) : u.value.type && u.value.type === "audio" ? (V(), G("audio", Rt, [
                        b("source", {
                          src: u.value.url
                        }, null, 8, Ft)
                      ])) : (V(), G("i", Nt, [
                        e[20] || (e[20] = I("无法预览，点击 ")),
                        n(We, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + u.value.configId + "/get/" + u.value.path
                        }, {
                          default: s(() => e[19] || (e[19] = [
                            I("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                n(Se, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    b("div", Ut, [
                      n(Ve, {
                        ref_key: "showFormRef",
                        ref: P,
                        model: u.value,
                        "label-width": "auto",
                        rules: f,
                        "label-position": "top"
                      }, {
                        default: s(() => [
                          n(U, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: s(() => [
                              n(j, {
                                modelValue: u.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => u.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(U, { label: "附件类型" }, {
                            default: s(() => [
                              n(j, {
                                modelValue: u.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => u.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(U, { label: "分组" }, {
                            default: s(() => [
                              n(re, {
                                modelValue: u.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => u.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: s(() => [
                                  (V(!0), G(te, null, ee(y(r), (t) => (V(), J(de, {
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
                          n(U, { label: "存储路径" }, {
                            default: s(() => [
                              n(j, {
                                modelValue: u.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => u.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(U, { label: "访问地址" }, {
                            default: s(() => [
                              n(j, {
                                modelValue: u.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => u.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(U, { label: "附件描述" }, {
                            default: s(() => [
                              n(j, {
                                modelValue: u.value.desc,
                                "onUpdate:modelValue": e[9] || (e[9] = (t) => u.value.desc = t),
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
        n($e, {
          modelValue: y(E),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => ke(E) ? E.value = t : E = t),
          title: y(M),
          width: y(pe)(600),
          draggable: "",
          onClose: _e
        }, {
          default: s(() => [
            n(Ve, {
              ref_key: "addFormRef",
              ref: B,
              model: R.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: s(() => [
                n(U, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: s(() => [
                    n(re, {
                      modelValue: R.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => R.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: s(() => [
                        (V(!0), G(te, null, ee(y(L), (t) => (V(), J(de, {
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
                n(U, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: s(() => [
                    n(re, {
                      modelValue: R.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => R.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: s(() => [
                        (V(!0), G(te, null, ee(y(r), (t) => (V(), J(de, {
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
                n(U, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: s(() => [
                    n(Ye, {
                      class: "upload-demo",
                      drag: "",
                      headers: y(C),
                      action: y(fe) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: K,
                      "file-list": R.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => R.value.fileList = t),
                      data: { attachConfigId: R.value.attachConfigId, attachGroup: R.value.attachGroup },
                      "on-success": ie,
                      "on-error": se,
                      accept: a.value
                    }, {
                      tip: s(() => e[23] || (e[23] = [
                        b("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: s(() => [
                        n(ce, { class: "el-icon--upload" }, {
                          default: s(() => [
                            n(y(Ee))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = b("div", { class: "el-upload__text" }, [
                          I(" 拖拽文件到此处或者"),
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
}, Bt = /* @__PURE__ */ Me(zt, [["__scopeId", "data-v-3b66d397"]]), H = window.Vue.unref, xe = window.Vue.resolveComponent, Y = window.Vue.createVNode, le = window.Vue.withCtx, Lt = window.Vue.toDisplayString, Ge = window.Vue.openBlock, Te = window.Vue.createElementBlock, Ot = window.Vue.createCommentVNode, De = window.Vue.createTextVNode, ze = window.Vue.isRef, It = window.Vue.createElementVNode, Mt = { style: { width: "100%" } }, Pt = { class: "dialog-footer" }, Kt = { key: 0 }, ae = window.Vue.ref, jt = window.Vue.watch, qt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(o, { emit: $ }) {
    ae("请选择图片");
    let c = ae(!1), d = ae(""), v = ae([]);
    const k = o, m = $, _ = ae(k.modelValue);
    jt(() => k.modelValue, (u, f) => {
      _.value = u;
    });
    function w() {
      m("update:modelValue", _.value);
    }
    function h() {
      c.value = !0, d.value = "请选择附件";
    }
    function M() {
      let u = "";
      v.value.forEach((f, B) => {
        u += f.url;
      }), m("attachSelectChange", v.value), _.value = u, c.value = !1, v.value = [], m("update:modelValue", _.value);
    }
    function r() {
      c.value = !1, v.value = [];
    }
    function P(u) {
      v.value = u;
    }
    return (u, f) => {
      const B = xe("el-button"), K = xe("el-input"), E = xe("el-dialog");
      return Ge(), Te("div", Mt, [
        Y(K, {
          modelValue: _.value,
          "onUpdate:modelValue": f[0] || (f[0] = (L) => _.value = L),
          placeholder: k.placeholder,
          style: { width: "100%" },
          disabled: !k.enableInput,
          onChange: w
        }, {
          append: le(() => [
            Y(B, {
              icon: H(Xe),
              type: "info",
              onClick: h
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        Y(E, {
          modelValue: H(c),
          "onUpdate:modelValue": f[2] || (f[2] = (L) => ze(c) ? c.value = L : c = L),
          title: H(d),
          width: H(pe)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: le(() => [
            It("span", Pt, [
              Y(B, {
                type: "primary",
                onClick: M
              }, {
                default: le(() => [
                  f[3] || (f[3] = De("确 定")),
                  H(v).length > 0 ? (Ge(), Te("span", Kt, "(已选" + Lt(H(v).length) + "个)", 1)) : Ot("", !0)
                ]),
                _: 1
              }),
              Y(B, {
                onClick: f[1] || (f[1] = (L) => {
                  ze(c) ? c.value = !1 : c = !1, r();
                })
              }, {
                default: le(() => f[4] || (f[4] = [
                  De("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: le(() => [
            Y(Bt, {
              "onUpdate:selectedAttach": P,
              max: 1,
              "attach-type": k.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Jt = /* @__PURE__ */ Me(qt, [["__scopeId", "data-v-52e51a92"]]), T = window.Vue.resolveComponent, i = window.Vue.createVNode, p = window.Vue.withCtx, S = window.Vue.unref, O = window.Vue.createTextVNode, oe = window.Vue.createElementVNode, Q = window.Vue.openBlock, ne = window.Vue.createBlock, Wt = window.Vue.createCommentVNode, Ht = window.Vue.toDisplayString, Yt = window.Vue.resolveDirective, Be = window.Vue.withDirectives, Le = window.Vue.isRef, Qt = window.Vue.createElementBlock, Xt = { class: "page" }, Zt = { class: "search-box" }, el = { class: "right-tool" }, tl = { class: "table-box" }, ll = { class: "dialog-footer" }, X = window.ElementPlus.ElMessage, al = window.ElementPlus.ElMessageBox, Oe = window.Vue.reactive, D = window.Vue.ref, ul = {
  __name: "CategoryView",
  setup(o) {
    const $ = D(), c = D({
      name: ""
    });
    let d = D(!1), v = D([]);
    D([]);
    let k = D([]), m = D(!1), _ = D("");
    const w = D();
    let h = D(!1);
    const M = Oe({
      children: "children",
      label: "name",
      value: "id"
    }), r = D({
      pid: -1,
      id: "",
      name: "",
      desc: "",
      metaKeywords: "",
      thumbnail: "",
      slug: "",
      metaDescription: ""
    }), P = Oe({
      pid: [{ required: !0, message: "请选择父级分类", trigger: "blur" }],
      name: [{ required: !0, message: "请输入分类名称", trigger: "blur" }]
    }), u = D();
    function f() {
      d.value = !0, ye(c.value).then((C) => {
        v.value = be(C.data, "id", "pid", "children", -1), d.value = !1;
      });
    }
    function B() {
      c.value = {
        name: ""
      }, $.value.resetFields(), f();
    }
    function K(C) {
      E(), C && C.id && (r.value.pid = C.id), _.value = "添加分类", m.value = !0, h.value = !0, ye({}).then((a) => {
        k.value = [{ id: -1, name: "主类目", children: be(a.data, "id", "pid", "children", -1) }], h.value = !1;
      });
    }
    function E() {
      r.value = {
        pid: -1,
        id: "",
        name: "",
        desc: "",
        metaKeywords: "",
        thumbnail: "",
        slug: "",
        metaDescription: ""
      }, u.value && u.value.resetFields();
    }
    function L() {
      u.value.validate((C) => {
        C && (r.value.id ? lt(r.value).then((a) => {
          a.code === 200 ? (X.success("修改成功"), m.value = !1, E(), f()) : X.error(a.msg);
        }) : tt(r.value).then((a) => {
          a.code === 200 ? (X.success("添加成功"), m.value = !1, E(), f()) : X.error(a.msg);
        }));
      });
    }
    function R(C) {
      _.value = "修改分类", E(), m.value = !0, h.value = !0, ye({}).then((a) => {
        k.value = [{ id: -1, name: "主类目", children: be(a.data, "id", "pid", "children", -1) }], at(C.id).then((F) => {
          r.value = F.data, w.value.setCurrentKey(F.data.pid), h.value = !1;
        });
      });
    }
    function me(C) {
      al.confirm("确定要删除[" + C.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ot(C.id).then((a) => {
          a.code === 200 && a.data ? (X.success("删除成功"), f()) : X.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function fe() {
      r.value.id || (Fe.setOptions({ charCase: 1, checkPolyphone: !1 }), r.value.slug = Fe.getCamelChars(r.value.name));
    }
    return f(), (C, a) => {
      const F = T("el-input"), x = T("el-form-item"), z = T("el-button"), ue = T("el-form"), q = T("el-col"), ve = T("el-row"), N = T("el-table-column"), _e = T("el-image"), ie = T("el-tag"), we = T("el-table"), he = T("el-tree-select"), ge = T("el-dialog"), se = Yt("loading");
      return Q(), Qt("div", Xt, [
        oe("div", Zt, [
          i(ue, {
            inline: !0,
            model: c.value,
            ref_key: "searchFormRef",
            ref: $
          }, {
            default: p(() => [
              i(x, { label: "分类名称" }, {
                default: p(() => [
                  i(F, {
                    modelValue: c.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => c.value.name = l),
                    placeholder: "请输入分类名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(x, null, {
                default: p(() => [
                  i(z, {
                    type: "primary",
                    onClick: f,
                    icon: S(Ie)
                  }, {
                    default: p(() => a[10] || (a[10] = [
                      O("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  i(z, {
                    icon: S(Ce),
                    onClick: B
                  }, {
                    default: p(() => a[11] || (a[11] = [
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
        i(ve, {
          gutter: 10,
          class: "mb8"
        }, {
          default: p(() => [
            i(q, { span: 1.5 }, {
              default: p(() => [
                i(z, {
                  icon: S(Re),
                  type: "primary",
                  plain: "",
                  onClick: K
                }, {
                  default: p(() => a[12] || (a[12] = [
                    O("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            oe("div", el, [
              i(z, {
                icon: S(Ce),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        oe("div", tl, [
          Be((Q(), ne(we, {
            data: S(v),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: p(() => [
              i(N, {
                prop: "name",
                label: "分类名称",
                width: "200",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "desc",
                label: "描述",
                width: "150",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "count",
                label: "文章数量",
                "min-width": "80"
              }),
              i(N, {
                prop: "slug",
                label: "slug",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: p((l) => [
                  l.row.thumbnail ? (Q(), ne(_e, {
                    key: 0,
                    style: { height: "50px" },
                    src: l.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [l.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : Wt("", !0)
                ]),
                _: 1
              }),
              i(N, {
                prop: "metaKeywords",
                label: "SEO关键字",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "metaDescription",
                label: "SEO描述",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: p((l) => [
                  l.row.status === 0 ? (Q(), ne(ie, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: p(() => a[13] || (a[13] = [
                      O("正常")
                    ])),
                    _: 1
                  })) : (Q(), ne(ie, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: p(() => a[14] || (a[14] = [
                      O("禁用")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              i(N, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              i(N, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: p((l) => [
                  oe("span", null, Ht(S(ut)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              i(N, {
                label: "操作",
                width: "220",
                fixed: "right"
              }, {
                default: p((l) => [
                  i(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(Ze),
                    onClick: (e) => R(l.row)
                  }, {
                    default: p(() => a[15] || (a[15] = [
                      O("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  i(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(Re),
                    onClick: (e) => K(l.row)
                  }, {
                    default: p(() => a[16] || (a[16] = [
                      O("新增")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  i(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(et),
                    onClick: (e) => me(l.row)
                  }, {
                    default: p(() => a[17] || (a[17] = [
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
            [se, S(d)]
          ])
        ]),
        i(ge, {
          modelValue: S(m),
          "onUpdate:modelValue": a[9] || (a[9] = (l) => Le(m) ? m.value = l : m = l),
          title: S(_),
          width: S(pe)(600),
          draggable: ""
        }, {
          footer: p(() => [
            oe("span", ll, [
              i(z, {
                type: "primary",
                onClick: L
              }, {
                default: p(() => a[18] || (a[18] = [
                  O("确 定")
                ])),
                _: 1
              }),
              i(z, {
                onClick: a[8] || (a[8] = (l) => {
                  Le(m) ? m.value = !1 : m = !1, E();
                })
              }, {
                default: p(() => a[19] || (a[19] = [
                  O("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            Be((Q(), ne(ue, {
              ref_key: "addFormRef",
              ref: u,
              model: r.value,
              "label-width": "100px",
              "status-icon": "",
              rules: P
            }, {
              default: p(() => [
                i(x, {
                  label: "父级分类",
                  prop: "pid"
                }, {
                  default: p(() => [
                    i(he, {
                      modelValue: r.value.pid,
                      "onUpdate:modelValue": a[1] || (a[1] = (l) => r.value.pid = l),
                      data: S(k),
                      props: M,
                      "check-strictly": "",
                      "render-after-expand": !1,
                      style: { width: "100%" },
                      "node-key": "id",
                      ref_key: "addTreeRef",
                      ref: w,
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "分类名称",
                  prop: "name",
                  onChange: fe
                }, {
                  default: p(() => [
                    i(F, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": a[2] || (a[2] = (l) => r.value.name = l),
                      placeholder: "请输入分类名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "分类描述",
                  prop: "desc"
                }, {
                  default: p(() => [
                    i(F, {
                      modelValue: r.value.desc,
                      "onUpdate:modelValue": a[3] || (a[3] = (l) => r.value.desc = l),
                      placeholder: "请输入分类描述",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "分类slug",
                  prop: "slug"
                }, {
                  default: p(() => [
                    i(F, {
                      modelValue: r.value.slug,
                      "onUpdate:modelValue": a[4] || (a[4] = (l) => r.value.slug = l),
                      placeholder: "请输入分类slug"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: p(() => [
                    i(Jt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择封面图",
                      "model-value": r.value.thumbnail,
                      "onUpdate:modelValue": a[5] || (a[5] = (l) => r.value.thumbnail = l)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "SEO关键字",
                  prop: "metaKeywords"
                }, {
                  default: p(() => [
                    i(F, {
                      modelValue: r.value.metaKeywords,
                      "onUpdate:modelValue": a[6] || (a[6] = (l) => r.value.metaKeywords = l),
                      placeholder: "请输入SEO关键字",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "SEO描述内容",
                  prop: "metaDescription"
                }, {
                  default: p(() => [
                    i(F, {
                      modelValue: r.value.metaDescription,
                      "onUpdate:modelValue": a[7] || (a[7] = (l) => r.value.metaDescription = l),
                      placeholder: "请输入SEO描述内容",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [se, S(h)]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  ul as default
};
