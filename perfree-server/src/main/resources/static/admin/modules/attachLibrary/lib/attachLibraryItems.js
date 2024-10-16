import { s as Ue, r as Ee, u as ae, f as Re } from "./@element-plus.js";
const Te = window.Pinia.defineStore;
Te({
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
    setMenuInit(a) {
      this.menuInit = a;
    },
    setOptionInit(a) {
      this.optionInit = a;
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
function kt(a, I) {
  if (arguments.length === 0 || !a)
    return null;
  const i = I || "{y}-{m}-{d} {h}:{i}:{s}";
  let u;
  typeof a == "object" ? u = a : (typeof a == "string" && /^[0-9]+$/.test(a) ? a = parseInt(a) : typeof a == "string" && (a = a.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof a == "number" && a.toString().length === 10 && (a = a * 1e3), u = new Date(a));
  const h = {
    y: u.getFullYear(),
    m: u.getMonth() + 1,
    d: u.getDate(),
    h: u.getHours(),
    i: u.getMinutes(),
    s: u.getSeconds(),
    a: u.getDay()
  };
  return i.replace(/{([ymdhisa])+}/g, (w, V) => {
    let _ = h[V];
    return V === "a" ? ["日", "一", "二", "三", "四", "五", "六"][_] : (w.length > 0 && _ < 10 && (_ = "0" + _), _ || 0);
  });
}
function X(a) {
  return window.document.body.clientWidth < a ? window.document.body.clientWidth : a;
}
function ze(a) {
  return axios.post("/api/auth/attach/page", a);
}
function $e() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function Oe(a) {
  return axios.put("/apiv/attach/update", a);
}
function Be(a) {
  return axios.get("/api/auth/attach/get?id=" + a);
}
const Me = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, De = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function Pe() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const de = (a, I) => {
  const i = a.__vccOpts || a;
  for (const [u, h] of I)
    i[u] = h;
  return i;
}, d = window.Vue.resolveComponent, l = window.Vue.createVNode, o = window.Vue.withCtx, c = window.Vue.unref, O = window.Vue.renderList, B = window.Vue.Fragment, r = window.Vue.openBlock, g = window.Vue.createElementBlock, E = window.Vue.createBlock, k = window.Vue.createTextVNode, p = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const le = window.Vue.toDisplayString, oe = window.Vue.normalizeClass, je = window.Vue.withModifiers, Y = window.Vue.isRef, Ke = { class: "page" }, We = { class: "search-box" }, qe = { class: "table-box" }, He = { class: "attach-list-box" }, Je = ["onClick"], Ye = { class: "attach-preview" }, Qe = { class: "imgLoading" }, Xe = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, Ze = ["src"], et = {
  key: 2,
  class: "attach-other"
}, tt = { class: "attach-name" }, at = { class: "operate-btn-box" }, lt = { style: { "padding-right": "15px" } }, ot = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, nt = ["src"], ut = {
  key: 2,
  controls: "",
  preload: "none"
}, st = ["src"], it = { key: 3 }, dt = { class: "showForm" }, rt = { class: "dialog-footer" }, ct = window.Vue.computed, pt = window.Vue.reactive, m = window.Vue.ref, R = window.ElementPlus.ElMessage, ft = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(a, { emit: I }) {
    const i = m(), u = m({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let h = m([]), x = m(!1), w = m(/* @__PURE__ */ new Map());
    const V = I, _ = a;
    let y = m(!1), L = m(""), F = m([]);
    const N = m(), n = m({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), f = pt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), A = m();
    let P = m(), G = m(!1), C = m([]);
    const b = m({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let re = localStorage.getItem(Me.STORAGE_TOKEN), ce = De.baseURL, pe = {
      Authorization: "Bearer " + JSON.parse(re).accessToken
    };
    const fe = ct(() => {
      switch (_.attachType) {
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
    function H() {
      n.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, N.value && N.value.resetFields();
    }
    function U() {
      _.attachType && (u.value.type = _.attachType), x.value = !0, ze(u.value).then((s) => {
        s.data.list.forEach((e) => {
          e.selected = w.value.has(e.id);
        }), h.value = s.data.list, u.value.total = s.data.total, x.value = !1;
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
      }, i.value.resetFields(), U();
    }
    function he(s) {
      if (!s.selected && w.value.size >= _.max) {
        R.error(`最多选择${_.max}个`);
        return;
      }
      s.selected = !s.selected, s.selected ? w.value.set(s.id, s) : w.value.delete(s.id), V("update:selectedAttach", Array.from(w.value.values()));
    }
    function j() {
      $e().then((s) => {
        F.value = s.data;
      });
    }
    function _e(s) {
      H(), j(), Be(s.id).then((e) => {
        n.value = e.data, L.value = "详情", y.value = !0;
      });
    }
    function ve() {
      N.value.validate((s) => {
        s && Oe(n.value).then((e) => {
          e.code === 200 ? (R.success("修改成功"), y.value = !1, H(), U()) : R.error(e.msg);
        });
      });
    }
    function ge() {
      j(), U();
    }
    function we(s, e, S) {
      s.code === 200 ? R.success(`[${e.name}]上传成功`) : (R.error(s.msg), P.value.handleRemove(e));
    }
    function Ve() {
      ye(), L.value = "上传附件", be(), j(), G.value = !0;
    }
    function ye() {
      b.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, A.value && A.value.resetFields();
    }
    function be() {
      Pe().then((s) => {
        C.value = s.data, s.data.forEach((e) => {
          e.master && (b.value.attachConfigId = e.id);
        });
      });
    }
    function xe(s) {
      R.error("上传失败,请检查网络是否通通畅");
    }
    return j(), U(), (s, e) => {
      const S = d("el-input"), v = d("el-form-item"), K = d("el-option"), W = d("el-select"), $ = d("el-button"), J = d("el-form"), ke = d("Loading"), q = d("el-icon"), Z = d("el-image"), Ae = d("el-text"), Ce = d("InfoFilled"), Ie = d("SuccessFilled"), Ge = d("el-pagination"), Se = d("el-link"), ee = d("el-col"), Le = d("el-row"), te = d("el-dialog"), Fe = d("el-upload");
      return r(), g("div", Ke, [
        p("div", We, [
          l(J, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: i
          }, {
            default: o(() => [
              l(v, { label: "附件名称" }, {
                default: o(() => [
                  l(S, {
                    modelValue: u.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => u.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(v, { label: "分组" }, {
                default: o(() => [
                  l(W, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: o(() => [
                      (r(!0), g(B, null, O(c(F), (t) => (r(), E(K, {
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
              l(v, null, {
                default: o(() => [
                  l($, {
                    type: "primary",
                    onClick: U,
                    icon: c(Ue)
                  }, {
                    default: o(() => e[16] || (e[16] = [
                      k("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l($, {
                    icon: c(Ee),
                    onClick: me
                  }, {
                    default: o(() => e[17] || (e[17] = [
                      k("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              l(v, null, {
                default: o(() => [
                  l($, {
                    icon: c(ae),
                    type: "primary",
                    plain: "",
                    onClick: Ve
                  }, {
                    default: o(() => e[18] || (e[18] = [
                      k("上传附件")
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
        p("div", qe, [
          p("div", He, [
            (r(!0), g(B, null, O(c(h), (t) => (r(), g("div", {
              class: oe({ "attach-block": !0, selected: t.selected }),
              onClick: (Ne) => he(t)
            }, [
              p("div", Ye, [
                t.type && t.type === "img" ? (r(), E(Z, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: o(() => [
                    p("div", Qe, [
                      l(q, { class: "is-loading" }, {
                        default: o(() => [
                          l(ke)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (r(), g("video", Xe, [
                  p("source", {
                    src: t.url
                  }, null, 8, Ze)
                ])) : (r(), g("div", et, le(t.path.split(".").pop()), 1))
              ]),
              p("div", tt, [
                l(Ae, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: o(() => [
                    k(le(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              p("div", {
                class: oe({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              p("div", at, [
                l(q, {
                  class: "operate-btn",
                  onClick: je((Ne) => _e(t), ["stop"])
                }, {
                  default: o(() => [
                    l(Ce)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                l(q, { class: "operate-btn select-btn" }, {
                  default: o(() => [
                    l(Ie)
                  ]),
                  _: 1
                })
              ])
            ], 10, Je))), 256))
          ]),
          l(Ge, {
            "current-page": u.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => u.value.pageNo = t),
            "page-size": u.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => u.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: U,
            total: u.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(te, {
          modelValue: c(y),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => Y(y) ? y.value = t : y = t),
          title: c(L),
          width: c(X)(800),
          draggable: ""
        }, {
          footer: o(() => [
            p("span", rt, [
              l($, {
                type: "primary",
                onClick: ve
              }, {
                default: o(() => e[21] || (e[21] = [
                  k("修 改")
                ])),
                _: 1
              }),
              l($, {
                onClick: e[10] || (e[10] = (t) => {
                  Y(y) ? y.value = !1 : y = !1, H();
                })
              }, {
                default: o(() => e[22] || (e[22] = [
                  k("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(Le, null, {
              default: o(() => [
                l(ee, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: o(() => [
                    p("div", lt, [
                      n.value.type && n.value.type === "img" ? (r(), E(Z, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (r(), g("video", ot, [
                        p("source", {
                          src: n.value.url
                        }, null, 8, nt)
                      ])) : n.value.type && n.value.type === "audio" ? (r(), g("audio", ut, [
                        p("source", {
                          src: n.value.url
                        }, null, 8, st)
                      ])) : (r(), g("i", it, [
                        e[20] || (e[20] = k("无法预览，点击 ")),
                        l(Se, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: o(() => e[19] || (e[19] = [
                            k("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                l(ee, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: o(() => [
                    p("div", dt, [
                      l(J, {
                        ref_key: "showFormRef",
                        ref: N,
                        model: n.value,
                        "label-width": "auto",
                        rules: f,
                        "label-position": "top"
                      }, {
                        default: o(() => [
                          l(v, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: o(() => [
                              l(S, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(v, { label: "附件类型" }, {
                            default: o(() => [
                              l(S, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(v, { label: "分组" }, {
                            default: o(() => [
                              l(W, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: o(() => [
                                  (r(!0), g(B, null, O(c(F), (t) => (r(), E(K, {
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
                          l(v, { label: "存储路径" }, {
                            default: o(() => [
                              l(S, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(v, { label: "访问地址" }, {
                            default: o(() => [
                              l(S, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(v, { label: "附件描述" }, {
                            default: o(() => [
                              l(S, {
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
        l(te, {
          modelValue: c(G),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => Y(G) ? G.value = t : G = t),
          title: c(L),
          width: c(X)(600),
          draggable: "",
          onClose: ge
        }, {
          default: o(() => [
            l(J, {
              ref_key: "addFormRef",
              ref: A,
              model: b.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: o(() => [
                l(v, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: o(() => [
                    l(W, {
                      modelValue: b.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => b.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: o(() => [
                        (r(!0), g(B, null, O(c(C), (t) => (r(), E(K, {
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
                l(v, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: o(() => [
                    l(W, {
                      modelValue: b.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => b.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: o(() => [
                        (r(!0), g(B, null, O(c(F), (t) => (r(), E(K, {
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
                l(v, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: o(() => [
                    l(Fe, {
                      class: "upload-demo",
                      drag: "",
                      headers: c(pe),
                      action: c(ce) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: P,
                      "file-list": b.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => b.value.fileList = t),
                      data: { attachConfigId: b.value.attachConfigId, attachGroup: b.value.attachGroup },
                      "on-success": we,
                      "on-error": xe,
                      accept: fe.value
                    }, {
                      tip: o(() => e[23] || (e[23] = [
                        p("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: o(() => [
                        l(q, { class: "el-icon--upload" }, {
                          default: o(() => [
                            l(c(ae))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = p("div", { class: "el-upload__text" }, [
                          k(" 拖拽文件到此处或者"),
                          p("em", null, "点击上传")
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
}, mt = /* @__PURE__ */ de(ft, [["__scopeId", "data-v-3b66d397"]]), T = window.Vue.unref, Q = window.Vue.resolveComponent, z = window.Vue.createVNode, M = window.Vue.withCtx, ht = window.Vue.toDisplayString, ne = window.Vue.openBlock, ue = window.Vue.createElementBlock, _t = window.Vue.createCommentVNode, se = window.Vue.createTextVNode, ie = window.Vue.isRef, vt = window.Vue.createElementVNode, gt = { style: { width: "100%" } }, wt = { class: "dialog-footer" }, Vt = { key: 0 }, D = window.Vue.ref, yt = window.Vue.watch, bt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(a, { emit: I }) {
    D("请选择图片");
    let i = D(!1), u = D(""), h = D([]);
    const x = a, w = I, V = D(x.modelValue);
    yt(() => x.modelValue, (n, f) => {
      V.value = n;
    });
    function _() {
      w("update:modelValue", V.value);
    }
    function y() {
      i.value = !0, u.value = "请选择附件";
    }
    function L() {
      let n = "";
      h.value.forEach((f, A) => {
        n += f.url;
      }), w("attachSelectChange", h.value), V.value = n, i.value = !1, h.value = [], w("update:modelValue", V.value);
    }
    function F() {
      i.value = !1, h.value = [];
    }
    function N(n) {
      h.value = n;
    }
    return (n, f) => {
      const A = Q("el-button"), P = Q("el-input"), G = Q("el-dialog");
      return ne(), ue("div", gt, [
        z(P, {
          modelValue: V.value,
          "onUpdate:modelValue": f[0] || (f[0] = (C) => V.value = C),
          placeholder: x.placeholder,
          style: { width: "100%" },
          disabled: !x.enableInput,
          onChange: _
        }, {
          append: M(() => [
            z(A, {
              icon: T(Re),
              type: "info",
              onClick: y
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        z(G, {
          modelValue: T(i),
          "onUpdate:modelValue": f[2] || (f[2] = (C) => ie(i) ? i.value = C : i = C),
          title: T(u),
          width: T(X)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: M(() => [
            vt("span", wt, [
              z(A, {
                type: "primary",
                onClick: L
              }, {
                default: M(() => [
                  f[3] || (f[3] = se("确 定")),
                  T(h).length > 0 ? (ne(), ue("span", Vt, "(已选" + ht(T(h).length) + "个)", 1)) : _t("", !0)
                ]),
                _: 1
              }),
              z(A, {
                onClick: f[1] || (f[1] = (C) => {
                  ie(i) ? i.value = !1 : i = !1, F();
                })
              }, {
                default: M(() => f[4] || (f[4] = [
                  se("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: M(() => [
            z(mt, {
              "onUpdate:selectedAttach": N,
              max: 1,
              "attach-type": x.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, At = /* @__PURE__ */ de(bt, [["__scopeId", "data-v-52e51a92"]]);
function Ct(a) {
  return axios.post("/api/auth/attachLibraryItems/page", a);
}
function It(a) {
  return axios.post("/api/auth/attachLibraryItems/batchAdd", a);
}
function Gt(a) {
  return axios.post("/api/auth/attachLibraryItems/add", a);
}
function St(a) {
  return axios.post("/api/auth/attachLibraryItems/update", a);
}
function Lt(a) {
  return axios.delete("/api/auth/attachLibraryItems/del?id=" + a);
}
function Ft(a) {
  return axios.get("/api/auth/attachLibraryItems/get?id=" + a);
}
export {
  At as A,
  de as _,
  mt as a,
  It as b,
  St as c,
  X as d,
  Gt as e,
  Lt as f,
  Ft as g,
  Ct as h,
  kt as p
};
