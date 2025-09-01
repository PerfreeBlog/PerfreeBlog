import { s as We, r as Ne, u as Be, f as nt, p as it, c as Me, a as De, e as st, d as ut } from "./lib/@element-plus.js";
import { $ as dt } from "./lib/emoji-mart.js";
import { d as rt } from "./lib/@emoji-mart.js";
const ct = window.Pinia.defineStore;
ct({
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
function pt(o, _) {
  if (arguments.length === 0 || !o)
    return null;
  const U = _ || "{y}-{m}-{d} {h}:{i}:{s}";
  let n;
  typeof o == "object" ? n = o : (typeof o == "string" && /^[0-9]+$/.test(o) ? o = parseInt(o) : typeof o == "string" && (o = o.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof o == "number" && o.toString().length === 10 && (o = o * 1e3), n = new Date(o));
  const h = {
    y: n.getFullYear(),
    m: n.getMonth() + 1,
    d: n.getDate(),
    h: n.getHours(),
    i: n.getMinutes(),
    s: n.getSeconds(),
    a: n.getDay()
  };
  return U.replace(/{([ymdhisa])+}/g, ($, S) => {
    let r = h[S];
    return S === "a" ? ["日", "一", "二", "三", "四", "五", "六"][r] : ($.length > 0 && r < 10 && (r = "0" + r), r || 0);
  });
}
function Ce(o) {
  return window.document.body.clientWidth < o ? window.document.body.clientWidth : o;
}
function mt(o) {
  return axios.post("/api/auth/journal/page", o);
}
function ft(o) {
  return axios.post("/api/auth/journal/updateIsComment", o);
}
function vt(o) {
  return axios.post("/api/auth/journal/updateIsTop", o);
}
function _t(o) {
  return axios.delete("/api/auth/journal/del?id=" + o);
}
function wt(o) {
  return axios.post("/api/auth/attach/page", o);
}
function ht() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function gt(o) {
  return axios.put("/apiv/attach/update", o);
}
function Vt(o) {
  return axios.get("/api/auth/attach/get?id=" + o);
}
const yt = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, bt = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function kt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const ze = (o, _) => {
  const U = o.__vccOpts || o;
  for (const [n, h] of _)
    U[n] = h;
  return U;
}, V = window.Vue.resolveComponent, a = window.Vue.createVNode, s = window.Vue.withCtx, k = window.Vue.unref, we = window.Vue.renderList, he = window.Vue.Fragment, y = window.Vue.openBlock, M = window.Vue.createElementBlock, ie = window.Vue.createBlock, K = window.Vue.createTextVNode, x = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Pe = window.Vue.toDisplayString, je = window.Vue.normalizeClass, xt = window.Vue.withModifiers, Te = window.Vue.isRef, Ct = { class: "page" }, $t = { class: "search-box" }, At = { class: "table-box" }, St = { class: "attach-list-box" }, Tt = ["onClick"], Et = { class: "attach-preview" }, Ft = { class: "imgLoading" }, Ut = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, It = ["src"], Nt = {
  key: 2,
  class: "attach-other"
}, zt = { class: "attach-name" }, Lt = { class: "operate-btn-box" }, Gt = { style: { "padding-right": "15px" } }, Rt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Bt = ["src"], Mt = {
  key: 2,
  controls: "",
  preload: "none"
}, Dt = ["src"], Pt = { key: 3 }, jt = { class: "showForm" }, Ot = { class: "dialog-footer" }, Jt = window.Vue.computed, qt = window.Vue.reactive, E = window.Vue.ref, se = window.ElementPlus.ElMessage, Ht = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(o, { emit: _ }) {
    const U = E(), n = E({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let h = E([]), c = E(!1), $ = E(/* @__PURE__ */ new Map());
    const S = _, r = o;
    let I = E(!1), z = E(""), L = E([]);
    const R = E(), d = E({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), re = qt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), f = E();
    let i = E(), T = E(!1), B = E([]);
    const A = E({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let ce = localStorage.getItem(yt.STORAGE_TOKEN), j = bt.baseURL, ne = {
      Authorization: "Bearer " + JSON.parse(ce).accessToken
    };
    const pe = Jt(() => {
      switch (r.attachType) {
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
    function w() {
      d.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, R.value && R.value.resetFields();
    }
    function l() {
      r.attachType && (n.value.type = r.attachType), c.value = !0, wt(n.value).then((p) => {
        p.data.list.forEach((e) => {
          e.selected = $.value.has(e.id);
        }), h.value = p.data.list, n.value.total = p.data.total, c.value = !1;
      });
    }
    function q() {
      n.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, U.value.resetFields(), l();
    }
    function H(p) {
      if (!p.selected && $.value.size >= r.max) {
        se.error(`最多选择${r.max}个`);
        return;
      }
      p.selected = !p.selected, p.selected ? $.value.set(p.id, p) : $.value.delete(p.id), S("update:selectedAttach", Array.from($.value.values()));
    }
    function O() {
      ht().then((p) => {
        L.value = p.data;
      });
    }
    function me(p) {
      w(), O(), Vt(p.id).then((e) => {
        d.value = e.data, z.value = "详情", I.value = !0;
      });
    }
    function fe() {
      R.value.validate((p) => {
        p && gt(d.value).then((e) => {
          e.code === 200 ? (se.success("修改成功"), I.value = !1, w(), l()) : se.error(e.msg);
        });
      });
    }
    function ee() {
      O(), l();
    }
    function ve(p, e, X) {
      p.code === 200 ? se.success(`[${e.name}]上传成功`) : (se.error(p.msg), i.value.handleRemove(e));
    }
    function u() {
      g(), z.value = "上传附件", $e(), O(), T.value = !0;
    }
    function g() {
      A.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, f.value && f.value.resetFields();
    }
    function $e() {
      kt().then((p) => {
        B.value = p.data, p.data.forEach((e) => {
          e.master && (A.value.attachConfigId = e.id);
        });
      });
    }
    function Ae(p) {
      se.error("上传失败,请检查网络是否通通畅");
    }
    return O(), l(), (p, e) => {
      const X = V("el-input"), G = V("el-form-item"), Ve = V("el-option"), ye = V("el-select"), _e = V("el-button"), Se = V("el-form"), Ye = V("Loading"), be = V("el-icon"), Le = V("el-image"), Qe = V("el-text"), Xe = V("InfoFilled"), Ze = V("SuccessFilled"), et = V("el-pagination"), tt = V("el-link"), Ge = V("el-col"), lt = V("el-row"), Re = V("el-dialog"), ot = V("el-upload");
      return y(), M("div", Ct, [
        x("div", $t, [
          a(Se, {
            inline: !0,
            model: n.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: U
          }, {
            default: s(() => [
              a(G, { label: "附件名称" }, {
                default: s(() => [
                  a(X, {
                    modelValue: n.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => n.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(G, { label: "分组" }, {
                default: s(() => [
                  a(ye, {
                    modelValue: n.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => n.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: s(() => [
                      (y(!0), M(he, null, we(k(L), (t) => (y(), ie(Ve, {
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
              a(G, null, {
                default: s(() => [
                  a(_e, {
                    type: "primary",
                    onClick: l,
                    icon: k(We)
                  }, {
                    default: s(() => e[16] || (e[16] = [
                      K("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  a(_e, {
                    icon: k(Ne),
                    onClick: q
                  }, {
                    default: s(() => e[17] || (e[17] = [
                      K("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              a(G, null, {
                default: s(() => [
                  a(_e, {
                    icon: k(Be),
                    type: "primary",
                    plain: "",
                    onClick: u
                  }, {
                    default: s(() => e[18] || (e[18] = [
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
        x("div", At, [
          x("div", St, [
            (y(!0), M(he, null, we(k(h), (t) => (y(), M("div", {
              class: je({ "attach-block": !0, selected: t.selected }),
              onClick: (at) => H(t)
            }, [
              x("div", Et, [
                t.type && t.type === "img" ? (y(), ie(Le, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: s(() => [
                    x("div", Ft, [
                      a(be, { class: "is-loading" }, {
                        default: s(() => [
                          a(Ye)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (y(), M("video", Ut, [
                  x("source", {
                    src: t.url
                  }, null, 8, It)
                ])) : (y(), M("div", Nt, Pe(t.path.split(".").pop()), 1))
              ]),
              x("div", zt, [
                a(Qe, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: s(() => [
                    K(Pe(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              x("div", {
                class: je({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              x("div", Lt, [
                a(be, {
                  class: "operate-btn",
                  onClick: xt((at) => me(t), ["stop"])
                }, {
                  default: s(() => [
                    a(Xe)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                a(be, { class: "operate-btn select-btn" }, {
                  default: s(() => [
                    a(Ze)
                  ]),
                  _: 1
                })
              ])
            ], 10, Tt))), 256))
          ]),
          a(et, {
            "current-page": n.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => n.value.pageNo = t),
            "page-size": n.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => n.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: l,
            total: n.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        a(Re, {
          modelValue: k(I),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => Te(I) ? I.value = t : I = t),
          title: k(z),
          width: k(Ce)(800),
          draggable: ""
        }, {
          footer: s(() => [
            x("span", Ot, [
              a(_e, {
                type: "primary",
                onClick: fe
              }, {
                default: s(() => e[21] || (e[21] = [
                  K("修 改")
                ])),
                _: 1
              }),
              a(_e, {
                onClick: e[10] || (e[10] = (t) => {
                  Te(I) ? I.value = !1 : I = !1, w();
                })
              }, {
                default: s(() => e[22] || (e[22] = [
                  K("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            a(lt, null, {
              default: s(() => [
                a(Ge, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    x("div", Gt, [
                      d.value.type && d.value.type === "img" ? (y(), ie(Le, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: d.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [d.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : d.value.type && d.value.type === "video" ? (y(), M("video", Rt, [
                        x("source", {
                          src: d.value.url
                        }, null, 8, Bt)
                      ])) : d.value.type && d.value.type === "audio" ? (y(), M("audio", Mt, [
                        x("source", {
                          src: d.value.url
                        }, null, 8, Dt)
                      ])) : (y(), M("i", Pt, [
                        e[20] || (e[20] = K("无法预览，点击 ")),
                        a(tt, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + d.value.configId + "/get/" + d.value.path
                        }, {
                          default: s(() => e[19] || (e[19] = [
                            K("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                a(Ge, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: s(() => [
                    x("div", jt, [
                      a(Se, {
                        ref_key: "showFormRef",
                        ref: R,
                        model: d.value,
                        "label-width": "auto",
                        rules: re,
                        "label-position": "top"
                      }, {
                        default: s(() => [
                          a(G, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: s(() => [
                              a(X, {
                                modelValue: d.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => d.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(G, { label: "附件类型" }, {
                            default: s(() => [
                              a(X, {
                                modelValue: d.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => d.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(G, { label: "分组" }, {
                            default: s(() => [
                              a(ye, {
                                modelValue: d.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => d.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: s(() => [
                                  (y(!0), M(he, null, we(k(L), (t) => (y(), ie(Ve, {
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
                          a(G, { label: "存储路径" }, {
                            default: s(() => [
                              a(X, {
                                modelValue: d.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => d.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(G, { label: "访问地址" }, {
                            default: s(() => [
                              a(X, {
                                modelValue: d.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => d.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          a(G, { label: "附件描述" }, {
                            default: s(() => [
                              a(X, {
                                modelValue: d.value.desc,
                                "onUpdate:modelValue": e[9] || (e[9] = (t) => d.value.desc = t),
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
        a(Re, {
          modelValue: k(T),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => Te(T) ? T.value = t : T = t),
          title: k(z),
          width: k(Ce)(600),
          draggable: "",
          onClose: ee
        }, {
          default: s(() => [
            a(Se, {
              ref_key: "addFormRef",
              ref: f,
              model: A.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: s(() => [
                a(G, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: s(() => [
                    a(ye, {
                      modelValue: A.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => A.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: s(() => [
                        (y(!0), M(he, null, we(k(B), (t) => (y(), ie(Ve, {
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
                a(G, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: s(() => [
                    a(ye, {
                      modelValue: A.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => A.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: s(() => [
                        (y(!0), M(he, null, we(k(L), (t) => (y(), ie(Ve, {
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
                a(G, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: s(() => [
                    a(ot, {
                      class: "upload-demo",
                      drag: "",
                      headers: k(ne),
                      action: k(j) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: i,
                      "file-list": A.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => A.value.fileList = t),
                      data: { attachConfigId: A.value.attachConfigId, attachGroup: A.value.attachGroup },
                      "on-success": ve,
                      "on-error": Ae,
                      accept: pe.value
                    }, {
                      tip: s(() => e[23] || (e[23] = [
                        x("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: s(() => [
                        a(be, { class: "el-icon--upload" }, {
                          default: s(() => [
                            a(k(Be))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = x("div", { class: "el-upload__text" }, [
                          K(" 拖拽文件到此处或者"),
                          x("em", null, "点击上传")
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
}, Kt = /* @__PURE__ */ ze(Ht, [["__scopeId", "data-v-3b66d397"]]);
function Wt(o) {
  return axios.post("/api/auth/journal/createJournal", o);
}
function Yt(o) {
  return axios.put("/api/auth/journal/updateJournal", o);
}
function Qt(o) {
  return axios.get("/api/auth/journal/get?id=" + o);
}
const J = window.Vue.unref, Xt = window.Vue.vModelText, D = window.Vue.createElementVNode, Ee = window.Vue.withDirectives, Zt = window.Vue.renderList, el = window.Vue.Fragment, W = window.Vue.openBlock, te = window.Vue.createElementBlock, P = window.Vue.resolveComponent, Oe = window.Vue.createBlock, tl = window.Vue.createCommentVNode, b = window.Vue.createVNode, F = window.Vue.withCtx, Je = window.Vue.toDisplayString, le = window.Vue.createTextVNode, ll = window.Vue.resolveDirective, Fe = window.Vue.isRef, ol = window.Vue.vShow, al = { class: "content-box" }, nl = { class: "attach-list-box" }, il = { class: "attach-box" }, sl = {
  key: 1,
  class: "attach-video",
  controls: "",
  preload: "none"
}, ul = ["src"], dl = {
  key: 2,
  class: "attach-audio",
  controls: "",
  preload: "none"
}, rl = ["src"], cl = {
  key: 3,
  class: "attach-other"
}, pl = ["onClick"], ml = { class: "bottom-box" }, fl = { style: { position: "relative" } }, vl = { class: "dialog-footer" }, _l = { key: 0 }, wl = window.Vue.nextTick, hl = window.Vue.onMounted, gl = window.Vue.onUnmounted, Y = window.Vue.ref, ue = window.ElementPlus.ElMessage, Vl = window.VueUse.useDark, yl = {
  __name: "JournalCreate",
  props: ["updateId"],
  emits: ["submitSuccess", "close"],
  setup(o, { emit: _ }) {
    const U = _, n = o;
    let h = Y(!1);
    const c = Y({
      id: "",
      content: "",
      contentModel: "journal",
      parseContent: "",
      visibility: 0,
      attachList: []
    }), $ = Y(), S = Y();
    let r = Y(!1), I = Y(null), z = Y([]), L = Y(!1);
    const R = Y();
    function d() {
      f(), U("close");
    }
    function re() {
      $.value.validate((w) => {
        if (w) {
          if (!c.value.content && c.value.attachList.length <= 0) {
            ue.error("内容和附件不能全部为空");
            return;
          }
          c.value.parseContent = c.value.content, L.value = !0, c.value.id ? Yt(c.value).then((l) => {
            L.value = !1, l.code === 200 ? (ue.success("修改成功"), f(), U("submitSuccess")) : ue.error(l.msg);
          }) : Wt(c.value).then((l) => {
            L.value = !1, l.code === 200 ? (ue.success("发布成功"), f(), U("submitSuccess")) : ue.error(l.msg);
          });
        }
      });
    }
    function f() {
      c.value = {
        id: "",
        content: "",
        contentModel: "journal",
        parseContent: "",
        visibility: 0,
        attachList: []
      }, $.value && $.value.resetFields();
    }
    function i(w) {
      c.value.attachList = c.value.attachList.filter((l) => l.attachId !== w.attachId);
    }
    function T() {
      z.value = [];
    }
    function B() {
      if (c.value.attachList.length + z.value.length > 9) {
        ue.error("最多只能添加9个附件!");
        return;
      }
      z.value.forEach((l, q) => {
        c.value.attachList.push({ url: l.url, attachId: l.id, type: l.type, name: l.name, mineType: l.mineType });
      }), r.value = !1, T();
    }
    function A(w) {
      z.value = w;
    }
    function ce() {
      I.value = "选择图片", T(), r.value = !0;
    }
    function j(w) {
      const l = S.value.selectionStart, q = S.value.selectionEnd;
      c.value.content = c.value.content.slice(0, l) + w.native + c.value.content.slice(q), S.value.focus(), wl(() => {
        S.value.focus();
        const H = l + w.native.length;
        S.value.setSelectionRange(H, H);
      });
    }
    hl(() => {
      window.Picker || (window.Picker = dt), R.value !== null && new window.Picker({
        data: rt,
        parent: R.value,
        searchPosition: "sticky",
        skinTonePosition: "search",
        previewPosition: "none",
        autoFocus: !0,
        onEmojiSelect: j,
        locale: "zh",
        theme: Vl().value ? "dark" : "light"
      }), document.addEventListener("mousedown", ne);
    }), gl(() => {
      document.removeEventListener("mousedown", ne);
    });
    function ne(w) {
      const l = w.composedPath();
      R.value && !l.includes(R.value) && h.value && (h.value = !1);
    }
    function pe() {
      n.updateId && (L.value = !0, Qt(n.updateId).then((w) => {
        L.value = !1, c.value = w.data;
      }));
    }
    return pe(), (w, l) => {
      const q = P("el-image"), H = P("Link"), O = P("el-icon"), me = P("el-text"), fe = P("el-tooltip"), ee = P("CircleCloseFilled"), ve = P("el-form-item"), u = P("el-form"), g = P("el-button"), $e = P("el-switch"), Ae = P("el-dialog"), p = ll("loading");
      return W(), te("div", null, [
        Ee((W(), Oe(u, {
          ref_key: "addFormRef",
          ref: $,
          model: c.value,
          "status-icon": ""
        }, {
          default: F(() => [
            b(ve, null, {
              default: F(() => [
                D("div", al, [
                  Ee(D("textarea", {
                    placeholder: "写点什么?",
                    class: "comment-editor",
                    ref_key: "editor",
                    ref: S,
                    "onUpdate:modelValue": l[0] || (l[0] = (e) => c.value.content = e),
                    required: ""
                  }, null, 512), [
                    [Xt, c.value.content]
                  ]),
                  D("div", nl, [
                    (W(!0), te(el, null, Zt(c.value.attachList, (e) => (W(), te("div", il, [
                      e.type && e.type === "img" ? (W(), Oe(q, {
                        key: 0,
                        class: "attach-img",
                        src: e.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [e.url],
                        "initial-index": 4,
                        "append-to-body": "",
                        "preview-teleported": ""
                      }, null, 8, ["src", "preview-src-list"])) : e.type && e.type === "video" ? (W(), te("video", sl, [
                        D("source", {
                          src: e.url
                        }, null, 8, ul)
                      ])) : e.type && e.type === "audio" ? (W(), te("audio", dl, [
                        D("source", {
                          src: e.url
                        }, null, 8, rl)
                      ])) : (W(), te("div", cl, [
                        b(O, null, {
                          default: F(() => [
                            b(H)
                          ]),
                          _: 1
                        })
                      ])),
                      b(fe, {
                        class: "box-item",
                        effect: "dark",
                        content: e.name,
                        placement: "bottom-start"
                      }, {
                        default: F(() => [
                          b(me, { truncated: "" }, {
                            default: F(() => [
                              le(Je(e.name), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["content"]),
                      D("span", {
                        class: "attach-close-btn",
                        onClick: (X) => i(e)
                      }, [
                        b(O, null, {
                          default: F(() => [
                            b(ee)
                          ]),
                          _: 1
                        })
                      ], 8, pl)
                    ]))), 256))
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])), [
          [p, J(L)]
        ]),
        D("div", ml, [
          b(g, {
            text: "",
            onClick: ce
          }, {
            default: F(() => [
              b(O, null, {
                default: F(() => [
                  b(J(nt))
                ]),
                _: 1
              }),
              l[5] || (l[5] = le(" 附件"))
            ]),
            _: 1
          }),
          D("div", fl, [
            b(g, {
              text: "",
              onClick: l[1] || (l[1] = (e) => Fe(h) ? h.value = !J(h) : h = !J(h))
            }, {
              default: F(() => l[6] || (l[6] = [
                D("svg", {
                  t: "1726277716465",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "24517",
                  width: "18",
                  height: "18"
                }, [
                  D("path", {
                    d: "M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z",
                    fill: "#555555",
                    "p-id": "24518"
                  })
                ], -1),
                le("表情")
              ])),
              _: 1
            }),
            Ee(D("div", {
              ref_key: "pickerRef",
              ref: R,
              class: "emoji-picker"
            }, null, 512), [
              [ol, J(h)]
            ])
          ]),
          b($e, {
            modelValue: c.value.visibility,
            "onUpdate:modelValue": l[2] || (l[2] = (e) => c.value.visibility = e),
            "active-value": 0,
            "inactive-value": 1,
            "inline-prompt": "",
            style: { "--el-switch-on-color": "var(--el-color-success)", "--el-switch-off-color": "var(--el-color-warning)", "margin-right": "10px" },
            "active-text": "所有人可见",
            "inactive-text": "仅自己可见"
          }, null, 8, ["modelValue"]),
          b(g, {
            type: "primary",
            onClick: re
          }, {
            default: F(() => l[7] || (l[7] = [
              le("发 布")
            ])),
            _: 1
          }),
          b(g, { onClick: d }, {
            default: F(() => l[8] || (l[8] = [
              le("取 消")
            ])),
            _: 1
          })
        ]),
        b(Ae, {
          modelValue: J(r),
          "onUpdate:modelValue": l[4] || (l[4] = (e) => Fe(r) ? r.value = e : r = e),
          title: J(I),
          width: J(Ce)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: F(() => [
            D("span", vl, [
              b(g, {
                type: "primary",
                onClick: B
              }, {
                default: F(() => [
                  l[9] || (l[9] = le("确 定")),
                  J(z).length > 0 ? (W(), te("span", _l, "(已选" + Je(J(z).length) + "个)", 1)) : tl("", !0)
                ]),
                _: 1
              }),
              b(g, {
                onClick: l[3] || (l[3] = (e) => {
                  Fe(r) ? r.value = !1 : r = !1, T();
                })
              }, {
                default: F(() => l[10] || (l[10] = [
                  le("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: F(() => [
            b(Kt, {
              "onUpdate:selectedAttach": A,
              max: 9,
              "attach-type": ""
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, bl = /* @__PURE__ */ ze(yl, [["__scopeId", "data-v-d93d4acb"]]), N = window.Vue.resolveComponent, m = window.Vue.createVNode, v = window.Vue.withCtx, Q = window.Vue.openBlock, Z = window.Vue.createBlock, C = window.Vue.unref, oe = window.Vue.createTextVNode, ge = window.Vue.createElementVNode, qe = window.Vue.resolveDirective, ke = window.Vue.withDirectives, He = window.Vue.toDisplayString, Ke = window.Vue.withModifiers;
window.Vue.createCommentVNode;
const Ue = window.Vue.isRef, kl = window.Vue.createElementBlock, xl = { class: "page" }, Cl = { class: "search-box" }, $l = { class: "right-tool" }, Al = { class: "table-box" }, de = window.ElementPlus.ElMessage, Ie = window.ElementPlus.ElMessageBox, xe = window.Vue.h, ae = window.Vue.ref, Sl = {
  __name: "JournalView",
  setup(o) {
    const _ = ae({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      content: null,
      visibility: null
    }), U = ae();
    let n = ae(!1), h = ae(""), c = ae([]), $ = ae(!1), S = ae(null);
    function r() {
      $.value = !0, mt(_.value).then((f) => {
        c.value = f.data.list, _.value.total = f.data.total, $.value = !1;
      });
    }
    function I() {
      _.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        content: null,
        visibility: null
      }, U.value.resetFields(), r();
    }
    function z() {
      S.value = null, h.value = "发表动态", n.value = !0;
    }
    function L(f) {
      S.value = f.id, h.value = "修改动态", n.value = !0;
    }
    function R(f) {
      Ie.confirm("确定要删除[" + f.id + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _t(f.id).then((i) => {
          i.code === 200 && i.data ? (de.success("删除成功"), r()) : de.error(i.msg);
        });
      }).catch(() => {
      });
    }
    function d(f) {
      let i = f.isComment === 0 ? "允许评论" : "不允许评论";
      Ie({
        title: "提示",
        message: xe("p", null, [
          `确定要修改动态[${f.id}]为`,
          xe("font", { style: "color: var(--el-color-warning)" }, i),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let T = {
          id: f.id,
          isComment: f.isComment === 0 ? 1 : 0
        };
        ft(T).then((B) => {
          B.code === 200 ? (r(), de.success("修改成功")) : de.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function re(f) {
      let i = f.isTop === 0 ? "置顶" : "不置顶";
      Ie({
        title: "提示",
        message: xe("p", null, [
          `确定要修改动态[${f.id}]为`,
          xe("font", { style: "color: var(--el-color-warning)" }, i),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let T = {
          id: f.id,
          isTop: f.isTop === 0 ? 1 : 0
        };
        vt(T).then((B) => {
          B.code === 200 ? (r(), de.success("修改成功")) : de.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return r(), (f, i) => {
      const T = N("el-input"), B = N("el-form-item"), A = N("el-option"), ce = N("el-select"), j = N("el-button"), ne = N("el-form"), pe = N("el-col"), w = N("el-row"), l = N("el-table-column"), q = N("el-switch"), H = N("el-tag"), O = N("el-table"), me = N("el-pagination"), fe = N("el-dialog"), ee = qe("hasPermission"), ve = qe("loading");
      return Q(), kl("div", xl, [
        ge("div", Cl, [
          m(ne, {
            inline: !0,
            model: _.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: U
          }, {
            default: v(() => [
              m(B, { label: "内容" }, {
                default: v(() => [
                  m(T, {
                    modelValue: _.value.content,
                    "onUpdate:modelValue": i[0] || (i[0] = (u) => _.value.content = u),
                    placeholder: "请输入内容",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              m(B, { label: "是否可见" }, {
                default: v(() => [
                  m(ce, {
                    modelValue: _.value.visibility,
                    "onUpdate:modelValue": i[1] || (i[1] = (u) => _.value.visibility = u),
                    placeholder: "请选择是否可见",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: v(() => [
                      (Q(), Z(A, {
                        key: 0,
                        label: "所有人可见",
                        value: 0
                      })),
                      (Q(), Z(A, {
                        key: 1,
                        label: "仅自己可见",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              m(B, null, {
                default: v(() => [
                  m(j, {
                    type: "primary",
                    onClick: r,
                    icon: C(We)
                  }, {
                    default: v(() => i[7] || (i[7] = [
                      oe("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  m(j, {
                    icon: C(Ne),
                    onClick: I
                  }, {
                    default: v(() => i[8] || (i[8] = [
                      oe("重置")
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
        m(w, {
          gutter: 10,
          class: "mb8"
        }, {
          default: v(() => [
            m(pe, { span: 1.5 }, {
              default: v(() => [
                ke((Q(), Z(j, {
                  icon: C(it),
                  type: "primary",
                  plain: "",
                  onClick: z
                }, {
                  default: v(() => i[9] || (i[9] = [
                    oe("发表动态")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [ee, ["admin:journal:create"]]
                ])
              ]),
              _: 1
            }),
            ge("div", $l, [
              m(j, {
                icon: C(Ne),
                circle: "",
                onClick: r
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        ge("div", Al, [
          ke((Q(), Z(O, {
            data: C(c),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: v(() => [
              m(l, {
                label: "标识",
                "min-width": "80",
                prop: "id"
              }),
              m(l, {
                prop: "content",
                label: "内容",
                "min-width": "400",
                "show-overflow-tooltip": ""
              }),
              m(l, {
                prop: "greatCount",
                label: "附件数量",
                "min-width": "80"
              }, {
                default: v((u) => {
                  var g;
                  return [
                    ge("span", null, He((g = u.row.attachList) == null ? void 0 : g.length), 1)
                  ];
                }),
                _: 1
              }),
              m(l, {
                prop: "greatCount",
                label: "点赞数量",
                "min-width": "80"
              }),
              m(l, {
                prop: "commentCount",
                label: "评论数量",
                "min-width": "80"
              }),
              m(l, {
                prop: "isComment",
                label: "允许评论",
                "min-width": "80",
                align: "center"
              }, {
                default: v((u) => [
                  m(q, {
                    modelValue: u.row.isComment,
                    "onUpdate:modelValue": (g) => u.row.isComment = g,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": C(Me),
                    "inactive-icon": C(De),
                    onClick: Ke((g) => d(u.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              m(l, {
                prop: "isTop",
                label: "是否置顶",
                "min-width": "80",
                align: "center"
              }, {
                default: v((u) => [
                  m(q, {
                    modelValue: u.row.isTop,
                    "onUpdate:modelValue": (g) => u.row.isTop = g,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": C(Me),
                    "inactive-icon": C(De),
                    onClick: Ke((g) => re(u.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              m(l, {
                prop: "visibility",
                label: "是否可见",
                "min-width": "120"
              }, {
                default: v((u) => [
                  u.row.visibility === 0 ? (Q(), Z(H, {
                    key: 0,
                    type: "success"
                  }, {
                    default: v(() => i[10] || (i[10] = [
                      oe("所有人可见")
                    ])),
                    _: 1
                  })) : (Q(), Z(H, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: v(() => i[11] || (i[11] = [
                      oe("仅自己可见")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              m(l, {
                prop: "user.userName",
                label: "创建人",
                "min-width": "100"
              }),
              m(l, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: v((u) => [
                  ge("span", null, He(C(pt)(u.row.createTime)), 1)
                ]),
                _: 1
              }),
              m(l, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: v((u) => [
                  ke((Q(), Z(j, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: C(st),
                    onClick: (g) => L(u.row)
                  }, {
                    default: v(() => i[12] || (i[12] = [
                      oe("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [ee, ["admin:journal:update"]]
                  ]),
                  ke((Q(), Z(j, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: C(ut),
                    onClick: (g) => R(u.row)
                  }, {
                    default: v(() => i[13] || (i[13] = [
                      oe("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [ee, ["admin:journal:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ve, C($)]
          ]),
          m(me, {
            "current-page": _.value.pageNo,
            "onUpdate:currentPage": i[2] || (i[2] = (u) => _.value.pageNo = u),
            "page-size": _.value.pageSize,
            "onUpdate:pageSize": i[3] || (i[3] = (u) => _.value.pageSize = u),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: r,
            total: _.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        m(fe, {
          modelValue: C(n),
          "onUpdate:modelValue": i[6] || (i[6] = (u) => Ue(n) ? n.value = u : n = u),
          title: C(h),
          width: C(Ce)(650),
          draggable: "",
          "destroy-on-close": ""
        }, {
          default: v(() => [
            m(bl, {
              onClose: i[4] || (i[4] = (u) => Ue(n) ? n.value = !1 : n = !1),
              onSubmitSuccess: i[5] || (i[5] = (u) => {
                Ue(n) ? n.value = !1 : n = !1, r();
              }),
              "update-id": C(S)
            }, null, 8, ["update-id"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Ul = /* @__PURE__ */ ze(Sl, [["__scopeId", "data-v-457f6d3f"]]);
export {
  Ul as default
};
