import { s as Me, r as Ae, u as Re, f as Ze, p as Fe, e as et, d as tt } from "./lib/@element-plus.js";
import { p as Ne } from "./lib/js-pinyin.js";
function be(l) {
  return axios.post("/api/auth/category/pageList", l);
}
function lt(l) {
  return axios.post("/api/auth/category/add", l);
}
function at(l) {
  return axios.put("/api/auth/category/update", l);
}
function ot(l) {
  return axios.get("/api/auth/category/get?id=" + l);
}
function nt(l) {
  return axios.delete("/api/auth/category/del?id=" + l);
}
const ut = window.Pinia.defineStore;
ut({
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
    setMenuInit(l) {
      this.menuInit = l;
    },
    setOptionInit(l) {
      this.optionInit = l;
    },
    setMenuList(l) {
      this.menuList = l;
    },
    setCachedViews(l) {
      this.cachedViews = l;
    }
  },
  persist: {
    enabled: !1
  }
});
function it(l, $) {
  if (arguments.length === 0 || !l)
    return null;
  const r = $ || "{y}-{m}-{d} {h}:{i}:{s}";
  let s;
  typeof l == "object" ? s = l : (typeof l == "string" && /^[0-9]+$/.test(l) ? l = parseInt(l) : typeof l == "string" && (l = l.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof l == "number" && l.toString().length === 10 && (l = l * 1e3), s = new Date(l));
  const v = {
    y: s.getFullYear(),
    m: s.getMonth() + 1,
    d: s.getDate(),
    h: s.getHours(),
    i: s.getMinutes(),
    s: s.getSeconds(),
    a: s.getDay()
  };
  return r.replace(/{([ymdhisa])+}/g, (m, _) => {
    let h = v[_];
    return _ === "a" ? ["日", "一", "二", "三", "四", "五", "六"][h] : (m.length > 0 && h < 10 && (h = "0" + h), h || 0);
  });
}
function ke(l, $, r, s, v) {
  $ = $ || "id", r = r || "parentId", v = v || Math.min.apply(Math, l.map((_) => _[r])) || 0;
  const k = JSON.parse(JSON.stringify(l)), m = k.filter((_) => {
    let h = k.filter((w) => _[$] === w[r]);
    return h.length > 0 && (_.children = h), _[r] === v;
  });
  return m.length === 0 && l.length > 0 ? l : m.length > 0 ? m : l;
}
function me(l) {
  return window.document.body.clientWidth < l ? window.document.body.clientWidth : l;
}
function st(l) {
  return axios.post("/api/auth/attach/page", l);
}
function dt() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function rt(l) {
  return axios.put("/apiv/attach/update", l);
}
function ct(l) {
  return axios.get("/api/auth/attach/get?id=" + l);
}
const pt = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, mt = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function ft() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const Pe = (l, $) => {
  const r = l.__vccOpts || l;
  for (const [s, v] of $)
    r[s] = v;
  return r;
}, g = window.Vue.resolveComponent, o = window.Vue.createVNode, u = window.Vue.withCtx, y = window.Vue.unref, ae = window.Vue.renderList, oe = window.Vue.Fragment, V = window.Vue.openBlock, G = window.Vue.createElementBlock, Y = window.Vue.createBlock, P = window.Vue.createTextVNode, b = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ue = window.Vue.toDisplayString, Ge = window.Vue.normalizeClass, vt = window.Vue.withModifiers, xe = window.Vue.isRef, _t = { class: "page" }, ht = { class: "search-box" }, wt = { class: "table-box" }, gt = { class: "attach-list-box" }, Vt = ["onClick"], yt = { class: "attach-preview" }, bt = { class: "imgLoading" }, kt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, xt = ["src"], Ct = {
  key: 2,
  class: "attach-other"
}, At = { class: "attach-name" }, St = { class: "operate-btn-box" }, $t = { style: { "padding-right": "15px" } }, Et = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Rt = ["src"], Ft = {
  key: 2,
  controls: "",
  preload: "none"
}, Nt = ["src"], Ut = { key: 3 }, Gt = { class: "showForm" }, Tt = { class: "dialog-footer" }, Dt = window.Vue.computed, zt = window.Vue.reactive, A = window.Vue.ref, Q = window.ElementPlus.ElMessage, It = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(l, { emit: $ }) {
    const r = A(), s = A({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let v = A([]), k = A(!1), m = A(/* @__PURE__ */ new Map());
    const _ = $, h = l;
    let w = A(!1), j = A(""), d = A([]);
    const q = A(), n = A({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), f = zt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), I = A();
    let J = A(), E = A(!1), O = A([]);
    const R = A({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let fe = localStorage.getItem(pt.STORAGE_TOKEN), ve = mt.baseURL, C = {
      Authorization: "Bearer " + JSON.parse(fe).accessToken
    };
    const a = Dt(() => {
      switch (h.attachType) {
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
      n.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, q.value && q.value.resetFields();
    }
    function x() {
      h.attachType && (s.value.type = h.attachType), k.value = !0, st(s.value).then((p) => {
        p.data.list.forEach((e) => {
          e.selected = m.value.has(e.id);
        }), v.value = p.data.list, s.value.total = p.data.total, k.value = !1;
      });
    }
    function z() {
      s.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, r.value.resetFields(), x();
    }
    function se(p) {
      if (!p.selected && m.value.size >= h.max) {
        Q.error(`最多选择${h.max}个`);
        return;
      }
      p.selected = !p.selected, p.selected ? m.value.set(p.id, p) : m.value.delete(p.id), _("update:selectedAttach", Array.from(m.value.values()));
    }
    function W() {
      dt().then((p) => {
        d.value = p.data;
      });
    }
    function _e(p) {
      F(), W(), ct(p.id).then((e) => {
        n.value = e.data, j.value = "详情", w.value = !0;
      });
    }
    function N() {
      q.value.validate((p) => {
        p && rt(n.value).then((e) => {
          e.code === 200 ? (Q.success("修改成功"), w.value = !1, F(), x()) : Q.error(e.msg);
        });
      });
    }
    function he() {
      W(), x();
    }
    function de(p, e, B) {
      p.code === 200 ? Q.success(`[${e.name}]上传成功`) : (Q.error(p.msg), J.value.handleRemove(e));
    }
    function we() {
      ge(), j.value = "上传附件", Ve(), W(), E.value = !0;
    }
    function ge() {
      R.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, I.value && I.value.resetFields();
    }
    function Ve() {
      ft().then((p) => {
        O.value = p.data, p.data.forEach((e) => {
          e.master && (R.value.attachConfigId = e.id);
        });
      });
    }
    function H(p) {
      Q.error("上传失败,请检查网络是否通通畅");
    }
    return W(), x(), (p, e) => {
      const B = g("el-input"), U = g("el-form-item"), re = g("el-option"), ce = g("el-select"), le = g("el-button"), ye = g("el-form"), Ke = g("Loading"), pe = g("el-icon"), Se = g("el-image"), je = g("el-text"), qe = g("InfoFilled"), Je = g("SuccessFilled"), We = g("el-pagination"), He = g("el-link"), $e = g("el-col"), Ye = g("el-row"), Ee = g("el-dialog"), Qe = g("el-upload");
      return V(), G("div", _t, [
        b("div", ht, [
          o(ye, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: r
          }, {
            default: u(() => [
              o(U, { label: "附件名称" }, {
                default: u(() => [
                  o(B, {
                    modelValue: s.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => s.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(U, { label: "分组" }, {
                default: u(() => [
                  o(ce, {
                    modelValue: s.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => s.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: u(() => [
                      (V(!0), G(oe, null, ae(y(d), (t) => (V(), Y(re, {
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
              o(U, null, {
                default: u(() => [
                  o(le, {
                    type: "primary",
                    onClick: x,
                    icon: y(Me)
                  }, {
                    default: u(() => e[16] || (e[16] = [
                      P("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  o(le, {
                    icon: y(Ae),
                    onClick: z
                  }, {
                    default: u(() => e[17] || (e[17] = [
                      P("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              o(U, null, {
                default: u(() => [
                  o(le, {
                    icon: y(Re),
                    type: "primary",
                    plain: "",
                    onClick: we
                  }, {
                    default: u(() => e[18] || (e[18] = [
                      P("上传附件")
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
          b("div", gt, [
            (V(!0), G(oe, null, ae(y(v), (t) => (V(), G("div", {
              class: Ge({ "attach-block": !0, selected: t.selected }),
              onClick: (Xe) => se(t)
            }, [
              b("div", yt, [
                t.type && t.type === "img" ? (V(), Y(Se, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: u(() => [
                    b("div", bt, [
                      o(pe, { class: "is-loading" }, {
                        default: u(() => [
                          o(Ke)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (V(), G("video", kt, [
                  b("source", {
                    src: t.url
                  }, null, 8, xt)
                ])) : (V(), G("div", Ct, Ue(t.path.split(".").pop()), 1))
              ]),
              b("div", At, [
                o(je, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: u(() => [
                    P(Ue(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              b("div", {
                class: Ge({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              b("div", St, [
                o(pe, {
                  class: "operate-btn",
                  onClick: vt((Xe) => _e(t), ["stop"])
                }, {
                  default: u(() => [
                    o(qe)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                o(pe, { class: "operate-btn select-btn" }, {
                  default: u(() => [
                    o(Je)
                  ]),
                  _: 1
                })
              ])
            ], 10, Vt))), 256))
          ]),
          o(We, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => s.value.pageNo = t),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => s.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: x,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(Ee, {
          modelValue: y(w),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => xe(w) ? w.value = t : w = t),
          title: y(j),
          width: y(me)(800),
          draggable: ""
        }, {
          footer: u(() => [
            b("span", Tt, [
              o(le, {
                type: "primary",
                onClick: N
              }, {
                default: u(() => e[21] || (e[21] = [
                  P("修 改")
                ])),
                _: 1
              }),
              o(le, {
                onClick: e[10] || (e[10] = (t) => {
                  xe(w) ? w.value = !1 : w = !1, F();
                })
              }, {
                default: u(() => e[22] || (e[22] = [
                  P("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: u(() => [
            o(Ye, null, {
              default: u(() => [
                o($e, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: u(() => [
                    b("div", $t, [
                      n.value.type && n.value.type === "img" ? (V(), Y(Se, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (V(), G("video", Et, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, Rt)
                      ])) : n.value.type && n.value.type === "audio" ? (V(), G("audio", Ft, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, Nt)
                      ])) : (V(), G("i", Ut, [
                        e[20] || (e[20] = P("无法预览，点击 ")),
                        o(He, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: u(() => e[19] || (e[19] = [
                            P("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                o($e, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: u(() => [
                    b("div", Gt, [
                      o(ye, {
                        ref_key: "showFormRef",
                        ref: q,
                        model: n.value,
                        "label-width": "auto",
                        rules: f,
                        "label-position": "top"
                      }, {
                        default: u(() => [
                          o(U, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: u(() => [
                              o(B, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(U, { label: "附件类型" }, {
                            default: u(() => [
                              o(B, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(U, { label: "分组" }, {
                            default: u(() => [
                              o(ce, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: u(() => [
                                  (V(!0), G(oe, null, ae(y(d), (t) => (V(), Y(re, {
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
                          o(U, { label: "存储路径" }, {
                            default: u(() => [
                              o(B, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(U, { label: "访问地址" }, {
                            default: u(() => [
                              o(B, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(U, { label: "附件描述" }, {
                            default: u(() => [
                              o(B, {
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
        o(Ee, {
          modelValue: y(E),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => xe(E) ? E.value = t : E = t),
          title: y(j),
          width: y(me)(600),
          draggable: "",
          onClose: he
        }, {
          default: u(() => [
            o(ye, {
              ref_key: "addFormRef",
              ref: I,
              model: R.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: u(() => [
                o(U, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: u(() => [
                    o(ce, {
                      modelValue: R.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => R.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: u(() => [
                        (V(!0), G(oe, null, ae(y(O), (t) => (V(), Y(re, {
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
                o(U, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: u(() => [
                    o(ce, {
                      modelValue: R.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => R.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: u(() => [
                        (V(!0), G(oe, null, ae(y(d), (t) => (V(), Y(re, {
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
                o(U, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: u(() => [
                    o(Qe, {
                      class: "upload-demo",
                      drag: "",
                      headers: y(C),
                      action: y(ve) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: J,
                      "file-list": R.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => R.value.fileList = t),
                      data: { attachConfigId: R.value.attachConfigId, attachGroup: R.value.attachGroup },
                      "on-success": de,
                      "on-error": H,
                      accept: a.value
                    }, {
                      tip: u(() => e[23] || (e[23] = [
                        b("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: u(() => [
                        o(pe, { class: "el-icon--upload" }, {
                          default: u(() => [
                            o(y(Re))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = b("div", { class: "el-upload__text" }, [
                          P(" 拖拽文件到此处或者"),
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
}, Ot = /* @__PURE__ */ Pe(It, [["__scopeId", "data-v-3b66d397"]]), X = window.Vue.unref, Ce = window.Vue.resolveComponent, Z = window.Vue.createVNode, ne = window.Vue.withCtx, Bt = window.Vue.toDisplayString, Te = window.Vue.openBlock, De = window.Vue.createElementBlock, Lt = window.Vue.createCommentVNode, ze = window.Vue.createTextVNode, Ie = window.Vue.isRef, Mt = window.Vue.createElementVNode, Pt = { style: { width: "100%" } }, Kt = { class: "dialog-footer" }, jt = { key: 0 }, ue = window.Vue.ref, qt = window.Vue.watch, Jt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(l, { emit: $ }) {
    ue("请选择图片");
    let r = ue(!1), s = ue(""), v = ue([]);
    const k = l, m = $, _ = ue(k.modelValue);
    qt(() => k.modelValue, (n, f) => {
      _.value = n;
    });
    function h() {
      m("update:modelValue", _.value);
    }
    function w() {
      r.value = !0, s.value = "请选择附件";
    }
    function j() {
      let n = "";
      v.value.forEach((f, I) => {
        n += f.url;
      }), m("attachSelectChange", v.value), _.value = n, r.value = !1, v.value = [], m("update:modelValue", _.value);
    }
    function d() {
      r.value = !1, v.value = [];
    }
    function q(n) {
      v.value = n;
    }
    return (n, f) => {
      const I = Ce("el-button"), J = Ce("el-input"), E = Ce("el-dialog");
      return Te(), De("div", Pt, [
        Z(J, {
          modelValue: _.value,
          "onUpdate:modelValue": f[0] || (f[0] = (O) => _.value = O),
          placeholder: k.placeholder,
          style: { width: "100%" },
          disabled: !k.enableInput,
          onChange: h
        }, {
          append: ne(() => [
            Z(I, {
              icon: X(Ze),
              type: "info",
              onClick: w
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        Z(E, {
          modelValue: X(r),
          "onUpdate:modelValue": f[2] || (f[2] = (O) => Ie(r) ? r.value = O : r = O),
          title: X(s),
          width: X(me)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: ne(() => [
            Mt("span", Kt, [
              Z(I, {
                type: "primary",
                onClick: j
              }, {
                default: ne(() => [
                  f[3] || (f[3] = ze("确 定")),
                  X(v).length > 0 ? (Te(), De("span", jt, "(已选" + Bt(X(v).length) + "个)", 1)) : Lt("", !0)
                ]),
                _: 1
              }),
              Z(I, {
                onClick: f[1] || (f[1] = (O) => {
                  Ie(r) ? r.value = !1 : r = !1, d();
                })
              }, {
                default: ne(() => f[4] || (f[4] = [
                  ze("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: ne(() => [
            Z(Ot, {
              "onUpdate:selectedAttach": q,
              max: 1,
              "attach-type": k.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Wt = /* @__PURE__ */ Pe(Jt, [["__scopeId", "data-v-52e51a92"]]), T = window.Vue.resolveComponent, i = window.Vue.createVNode, c = window.Vue.withCtx, S = window.Vue.unref, L = window.Vue.createTextVNode, ie = window.Vue.createElementVNode, Oe = window.Vue.resolveDirective, M = window.Vue.openBlock, K = window.Vue.createBlock, ee = window.Vue.withDirectives, Ht = window.Vue.createCommentVNode, Yt = window.Vue.toDisplayString, Be = window.Vue.isRef, Qt = window.Vue.createElementBlock, Xt = { class: "page" }, Zt = { class: "search-box" }, el = { class: "right-tool" }, tl = { class: "table-box" }, ll = { class: "dialog-footer" }, te = window.ElementPlus.ElMessage, al = window.ElementPlus.ElMessageBox, Le = window.Vue.reactive, D = window.Vue.ref, ul = {
  __name: "CategoryView",
  setup(l) {
    const $ = D(), r = D({
      name: ""
    });
    let s = D(!1), v = D([]);
    D([]);
    let k = D([]), m = D(!1), _ = D("");
    const h = D();
    let w = D(!1);
    const j = Le({
      children: "children",
      label: "name",
      value: "id"
    }), d = D({
      pid: -1,
      id: "",
      name: "",
      desc: "",
      metaKeywords: "",
      thumbnail: "",
      slug: "",
      metaDescription: ""
    }), q = Le({
      pid: [{ required: !0, message: "请选择父级分类", trigger: "blur" }],
      name: [{ required: !0, message: "请输入分类名称", trigger: "blur" }]
    }), n = D();
    function f() {
      s.value = !0, be(r.value).then((C) => {
        v.value = ke(C.data, "id", "pid", "children", -1), s.value = !1;
      });
    }
    function I() {
      r.value = {
        name: ""
      }, $.value.resetFields(), f();
    }
    function J(C) {
      E(), C && C.id && (d.value.pid = C.id), _.value = "添加分类", m.value = !0, w.value = !0, be({}).then((a) => {
        k.value = [{ id: -1, name: "主类目", children: ke(a.data, "id", "pid", "children", -1) }], w.value = !1;
      });
    }
    function E() {
      d.value = {
        pid: -1,
        id: "",
        name: "",
        desc: "",
        metaKeywords: "",
        thumbnail: "",
        slug: "",
        metaDescription: ""
      }, n.value && n.value.resetFields();
    }
    function O() {
      n.value.validate((C) => {
        C && (d.value.id ? at(d.value).then((a) => {
          a.code === 200 ? (te.success("修改成功"), m.value = !1, E(), f()) : te.error(a.msg);
        }) : lt(d.value).then((a) => {
          a.code === 200 ? (te.success("添加成功"), m.value = !1, E(), f()) : te.error(a.msg);
        }));
      });
    }
    function R(C) {
      _.value = "修改分类", E(), m.value = !0, w.value = !0, be({}).then((a) => {
        k.value = [{ id: -1, name: "主类目", children: ke(a.data, "id", "pid", "children", -1) }], ot(C.id).then((F) => {
          d.value = F.data, h.value.setCurrentKey(F.data.pid), w.value = !1;
        });
      });
    }
    function fe(C) {
      al.confirm("确定要删除[" + C.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        nt(C.id).then((a) => {
          a.code === 200 && a.data ? (te.success("删除成功"), f()) : te.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function ve() {
      d.value.id || (Ne.setOptions({ charCase: 1, checkPolyphone: !1 }), d.value.slug = Ne.getCamelChars(d.value.name));
    }
    return f(), (C, a) => {
      const F = T("el-input"), x = T("el-form-item"), z = T("el-button"), se = T("el-form"), W = T("el-col"), _e = T("el-row"), N = T("el-table-column"), he = T("el-image"), de = T("el-tag"), we = T("el-table"), ge = T("el-tree-select"), Ve = T("el-dialog"), H = Oe("hasPermission"), p = Oe("loading");
      return M(), Qt("div", Xt, [
        ie("div", Zt, [
          i(se, {
            inline: !0,
            model: r.value,
            ref_key: "searchFormRef",
            ref: $
          }, {
            default: c(() => [
              i(x, { label: "分类名称" }, {
                default: c(() => [
                  i(F, {
                    modelValue: r.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (e) => r.value.name = e),
                    placeholder: "请输入分类名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              i(x, null, {
                default: c(() => [
                  i(z, {
                    type: "primary",
                    onClick: f,
                    icon: S(Me)
                  }, {
                    default: c(() => a[10] || (a[10] = [
                      L("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  i(z, {
                    icon: S(Ae),
                    onClick: I
                  }, {
                    default: c(() => a[11] || (a[11] = [
                      L("重置")
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
        i(_e, {
          gutter: 10,
          class: "mb8"
        }, {
          default: c(() => [
            i(W, { span: 1.5 }, {
              default: c(() => [
                ee((M(), K(z, {
                  icon: S(Fe),
                  type: "primary",
                  plain: "",
                  onClick: J
                }, {
                  default: c(() => a[12] || (a[12] = [
                    L("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [H, ["admin:category:create"]]
                ])
              ]),
              _: 1
            }),
            ie("div", el, [
              i(z, {
                icon: S(Ae),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        ie("div", tl, [
          ee((M(), K(we, {
            data: S(v),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: c(() => [
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
                default: c((e) => [
                  e.row.thumbnail ? (M(), K(he, {
                    key: 0,
                    style: { height: "50px" },
                    src: e.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [e.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : Ht("", !0)
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
                default: c((e) => [
                  e.row.status === 0 ? (M(), K(de, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: c(() => a[13] || (a[13] = [
                      L("正常")
                    ])),
                    _: 1
                  })) : (M(), K(de, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: c(() => a[14] || (a[14] = [
                      L("禁用")
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
                default: c((e) => [
                  ie("span", null, Yt(S(it)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              i(N, {
                label: "操作",
                width: "220",
                fixed: "right"
              }, {
                default: c((e) => [
                  ee((M(), K(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(et),
                    onClick: (B) => R(e.row)
                  }, {
                    default: c(() => a[15] || (a[15] = [
                      L("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [H, ["admin:category:update"]]
                  ]),
                  ee((M(), K(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(Fe),
                    onClick: (B) => J(e.row)
                  }, {
                    default: c(() => a[16] || (a[16] = [
                      L("新增")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [H, ["admin:category:create"]]
                  ]),
                  ee((M(), K(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: S(tt),
                    onClick: (B) => fe(e.row)
                  }, {
                    default: c(() => a[17] || (a[17] = [
                      L("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [H, ["admin:category:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [p, S(s)]
          ])
        ]),
        i(Ve, {
          modelValue: S(m),
          "onUpdate:modelValue": a[9] || (a[9] = (e) => Be(m) ? m.value = e : m = e),
          title: S(_),
          width: S(me)(600),
          draggable: ""
        }, {
          footer: c(() => [
            ie("span", ll, [
              i(z, {
                type: "primary",
                onClick: O
              }, {
                default: c(() => a[18] || (a[18] = [
                  L("确 定")
                ])),
                _: 1
              }),
              i(z, {
                onClick: a[8] || (a[8] = (e) => {
                  Be(m) ? m.value = !1 : m = !1, E();
                })
              }, {
                default: c(() => a[19] || (a[19] = [
                  L("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: c(() => [
            ee((M(), K(se, {
              ref_key: "addFormRef",
              ref: n,
              model: d.value,
              "label-width": "100px",
              "status-icon": "",
              rules: q
            }, {
              default: c(() => [
                i(x, {
                  label: "父级分类",
                  prop: "pid"
                }, {
                  default: c(() => [
                    i(ge, {
                      modelValue: d.value.pid,
                      "onUpdate:modelValue": a[1] || (a[1] = (e) => d.value.pid = e),
                      data: S(k),
                      props: j,
                      "check-strictly": "",
                      "render-after-expand": !1,
                      style: { width: "100%" },
                      "node-key": "id",
                      ref_key: "addTreeRef",
                      ref: h,
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "分类名称",
                  prop: "name",
                  onChange: ve
                }, {
                  default: c(() => [
                    i(F, {
                      modelValue: d.value.name,
                      "onUpdate:modelValue": a[2] || (a[2] = (e) => d.value.name = e),
                      placeholder: "请输入分类名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "分类描述",
                  prop: "desc"
                }, {
                  default: c(() => [
                    i(F, {
                      modelValue: d.value.desc,
                      "onUpdate:modelValue": a[3] || (a[3] = (e) => d.value.desc = e),
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
                  default: c(() => [
                    i(F, {
                      modelValue: d.value.slug,
                      "onUpdate:modelValue": a[4] || (a[4] = (e) => d.value.slug = e),
                      placeholder: "请输入分类slug"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: c(() => [
                    i(Wt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择封面图",
                      "model-value": d.value.thumbnail,
                      "onUpdate:modelValue": a[5] || (a[5] = (e) => d.value.thumbnail = e)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                i(x, {
                  label: "SEO关键字",
                  prop: "metaKeywords"
                }, {
                  default: c(() => [
                    i(F, {
                      modelValue: d.value.metaKeywords,
                      "onUpdate:modelValue": a[6] || (a[6] = (e) => d.value.metaKeywords = e),
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
                  default: c(() => [
                    i(F, {
                      modelValue: d.value.metaDescription,
                      "onUpdate:modelValue": a[7] || (a[7] = (e) => d.value.metaDescription = e),
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
              [p, S(w)]
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
