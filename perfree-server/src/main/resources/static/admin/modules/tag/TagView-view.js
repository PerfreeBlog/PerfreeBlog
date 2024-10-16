import { s as De, r as ke, u as $e, f as Qe, p as Xe, e as Ze, d as et } from "./lib/@element-plus.js";
import { p as Ne } from "./lib/js-pinyin.js";
const tt = window.Pinia.defineStore;
tt({
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
function lt(a, f) {
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
function me(a) {
  return window.document.body.clientWidth < a ? window.document.body.clientWidth : a;
}
function at(a) {
  return axios.post("/api/auth/tag/page", a);
}
function ot(a) {
  return axios.post("/api/auth/tag/add", a);
}
function nt(a) {
  return axios.get("/api/auth/tag/get?id=" + a);
}
function ut(a) {
  return axios.put("/api/auth/tag/update", a);
}
function it(a) {
  return axios.delete("/api/auth/tag/del?id=" + a);
}
function st(a) {
  return axios.post("/api/auth/attach/page", a);
}
function dt() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function rt(a) {
  return axios.put("/apiv/attach/update", a);
}
function ct(a) {
  return axios.get("/api/auth/attach/get?id=" + a);
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
const xe = (a, f) => {
  const m = a.__vccOpts || a;
  for (const [u, v] of f)
    m[u] = v;
  return m;
}, g = window.Vue.resolveComponent, o = window.Vue.createVNode, i = window.Vue.withCtx, V = window.Vue.unref, le = window.Vue.renderList, ae = window.Vue.Fragment, w = window.Vue.openBlock, N = window.Vue.createElementBlock, W = window.Vue.createBlock, R = window.Vue.createTextVNode, b = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Fe = window.Vue.toDisplayString, Ee = window.Vue.normalizeClass, _t = window.Vue.withModifiers, be = window.Vue.isRef, vt = { class: "page" }, gt = { class: "search-box" }, wt = { class: "table-box" }, ht = { class: "attach-list-box" }, Vt = ["onClick"], bt = { class: "attach-preview" }, yt = { class: "imgLoading" }, kt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, xt = ["src"], Ct = {
  key: 2,
  class: "attach-other"
}, At = { class: "attach-name" }, St = { class: "operate-btn-box" }, $t = { style: { "padding-right": "15px" } }, Nt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Ft = ["src"], Et = {
  key: 2,
  controls: "",
  preload: "none"
}, Gt = ["src"], Ut = { key: 3 }, zt = { class: "showForm" }, It = { class: "dialog-footer" }, Rt = window.Vue.computed, Tt = window.Vue.reactive, A = window.Vue.ref, H = window.ElementPlus.ElMessage, Bt = {
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
    let y = A(!1), C = A(""), T = A([]);
    const B = A(), n = A({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), h = Tt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), U = A();
    let q = A(), I = A(!1), _ = A([]);
    const l = A({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let X = localStorage.getItem(pt.STORAGE_TOKEN), L = mt.baseURL, z = {
      Authorization: "Bearer " + JSON.parse(X).accessToken
    };
    const se = Rt(() => {
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
    function Z() {
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
      x.attachType && (u.value.type = x.attachType), $.value = !0, st(u.value).then((c) => {
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
    function fe(c) {
      if (!c.selected && k.value.size >= x.max) {
        H.error(`最多选择${x.max}个`);
        return;
      }
      c.selected = !c.selected, c.selected ? k.value.set(c.id, c) : k.value.delete(c.id), r("update:selectedAttach", Array.from(k.value.values()));
    }
    function K() {
      dt().then((c) => {
        T.value = c.data;
      });
    }
    function _e(c) {
      Z(), K(), ct(c.id).then((e) => {
        n.value = e.data, C.value = "详情", y.value = !0;
      });
    }
    function ve() {
      B.value.validate((c) => {
        c && rt(n.value).then((e) => {
          e.code === 200 ? (H.success("修改成功"), y.value = !1, Z(), D()) : H.error(e.msg);
        });
      });
    }
    function ge() {
      K(), D();
    }
    function ee(c, e, M) {
      c.code === 200 ? H.success(`[${e.name}]上传成功`) : (H.error(c.msg), q.value.handleRemove(e));
    }
    function we() {
      s(), C.value = "上传附件", he(), K(), I.value = !0;
    }
    function s() {
      l.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, U.value && U.value.resetFields();
    }
    function he() {
      ft().then((c) => {
        _.value = c.data, c.data.forEach((e) => {
          e.master && (l.value.attachConfigId = e.id);
        });
      });
    }
    function Oe(c) {
      H.error("上传失败,请检查网络是否通通畅");
    }
    return K(), D(), (c, e) => {
      const M = g("el-input"), S = g("el-form-item"), de = g("el-option"), re = g("el-select"), te = g("el-button"), Ve = g("el-form"), Me = g("Loading"), ce = g("el-icon"), Ce = g("el-image"), Pe = g("el-text"), je = g("InfoFilled"), qe = g("SuccessFilled"), Ke = g("el-pagination"), We = g("el-link"), Ae = g("el-col"), He = g("el-row"), Se = g("el-dialog"), Je = g("el-upload");
      return w(), N("div", vt, [
        b("div", gt, [
          o(Ve, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: i(() => [
              o(S, { label: "附件名称" }, {
                default: i(() => [
                  o(M, {
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
                  o(re, {
                    modelValue: u.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: i(() => [
                      (w(!0), N(ae, null, le(V(T), (t) => (w(), W(de, {
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
                  o(te, {
                    type: "primary",
                    onClick: D,
                    icon: V(De)
                  }, {
                    default: i(() => e[16] || (e[16] = [
                      R("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  o(te, {
                    icon: V(ke),
                    onClick: G
                  }, {
                    default: i(() => e[17] || (e[17] = [
                      R("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              o(S, null, {
                default: i(() => [
                  o(te, {
                    icon: V($e),
                    type: "primary",
                    plain: "",
                    onClick: we
                  }, {
                    default: i(() => e[18] || (e[18] = [
                      R("上传附件")
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
            (w(!0), N(ae, null, le(V(v), (t) => (w(), N("div", {
              class: Ee({ "attach-block": !0, selected: t.selected }),
              onClick: (Ye) => fe(t)
            }, [
              b("div", bt, [
                t.type && t.type === "img" ? (w(), W(Ce, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: i(() => [
                    b("div", yt, [
                      o(ce, { class: "is-loading" }, {
                        default: i(() => [
                          o(Me)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (w(), N("video", kt, [
                  b("source", {
                    src: t.url
                  }, null, 8, xt)
                ])) : (w(), N("div", Ct, Fe(t.path.split(".").pop()), 1))
              ]),
              b("div", At, [
                o(Pe, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: i(() => [
                    R(Fe(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              b("div", {
                class: Ee({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              b("div", St, [
                o(ce, {
                  class: "operate-btn",
                  onClick: _t((Ye) => _e(t), ["stop"])
                }, {
                  default: i(() => [
                    o(je)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                o(ce, { class: "operate-btn select-btn" }, {
                  default: i(() => [
                    o(qe)
                  ]),
                  _: 1
                })
              ])
            ], 10, Vt))), 256))
          ]),
          o(Ke, {
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
        o(Se, {
          modelValue: V(y),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => be(y) ? y.value = t : y = t),
          title: V(C),
          width: V(me)(800),
          draggable: ""
        }, {
          footer: i(() => [
            b("span", It, [
              o(te, {
                type: "primary",
                onClick: ve
              }, {
                default: i(() => e[21] || (e[21] = [
                  R("修 改")
                ])),
                _: 1
              }),
              o(te, {
                onClick: e[10] || (e[10] = (t) => {
                  be(y) ? y.value = !1 : y = !1, Z();
                })
              }, {
                default: i(() => e[22] || (e[22] = [
                  R("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            o(He, null, {
              default: i(() => [
                o(Ae, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    b("div", $t, [
                      n.value.type && n.value.type === "img" ? (w(), W(Ce, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: n.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [n.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : n.value.type && n.value.type === "video" ? (w(), N("video", Nt, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, Ft)
                      ])) : n.value.type && n.value.type === "audio" ? (w(), N("audio", Et, [
                        b("source", {
                          src: n.value.url
                        }, null, 8, Gt)
                      ])) : (w(), N("i", Ut, [
                        e[20] || (e[20] = R("无法预览，点击 ")),
                        o(We, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + n.value.configId + "/get/" + n.value.path
                        }, {
                          default: i(() => e[19] || (e[19] = [
                            R("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                o(Ae, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    b("div", zt, [
                      o(Ve, {
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
                              o(M, {
                                modelValue: n.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => n.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "附件类型" }, {
                            default: i(() => [
                              o(M, {
                                modelValue: n.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => n.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "分组" }, {
                            default: i(() => [
                              o(re, {
                                modelValue: n.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => n.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: i(() => [
                                  (w(!0), N(ae, null, le(V(T), (t) => (w(), W(de, {
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
                              o(M, {
                                modelValue: n.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => n.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "访问地址" }, {
                            default: i(() => [
                              o(M, {
                                modelValue: n.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => n.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          o(S, { label: "附件描述" }, {
                            default: i(() => [
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
        o(Se, {
          modelValue: V(I),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => be(I) ? I.value = t : I = t),
          title: V(C),
          width: V(me)(600),
          draggable: "",
          onClose: ge
        }, {
          default: i(() => [
            o(Ve, {
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
                    o(re, {
                      modelValue: l.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => l.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: i(() => [
                        (w(!0), N(ae, null, le(V(_), (t) => (w(), W(de, {
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
                    o(re, {
                      modelValue: l.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => l.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: i(() => [
                        (w(!0), N(ae, null, le(V(T), (t) => (w(), W(de, {
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
                    o(Je, {
                      class: "upload-demo",
                      drag: "",
                      headers: V(z),
                      action: V(L) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: q,
                      "file-list": l.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => l.value.fileList = t),
                      data: { attachConfigId: l.value.attachConfigId, attachGroup: l.value.attachGroup },
                      "on-success": ee,
                      "on-error": Oe,
                      accept: se.value
                    }, {
                      tip: i(() => e[23] || (e[23] = [
                        b("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: i(() => [
                        o(ce, { class: "el-icon--upload" }, {
                          default: i(() => [
                            o(V($e))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = b("div", { class: "el-upload__text" }, [
                          R(" 拖拽文件到此处或者"),
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
}, Lt = /* @__PURE__ */ xe(Bt, [["__scopeId", "data-v-3b66d397"]]), J = window.Vue.unref, ye = window.Vue.resolveComponent, Y = window.Vue.createVNode, oe = window.Vue.withCtx, Dt = window.Vue.toDisplayString, Ge = window.Vue.openBlock, Ue = window.Vue.createElementBlock, Ot = window.Vue.createCommentVNode, ze = window.Vue.createTextVNode, Ie = window.Vue.isRef, Mt = window.Vue.createElementVNode, Pt = { style: { width: "100%" } }, jt = { class: "dialog-footer" }, qt = { key: 0 }, ne = window.Vue.ref, Kt = window.Vue.watch, Wt = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(a, { emit: f }) {
    ne("请选择图片");
    let m = ne(!1), u = ne(""), v = ne([]);
    const $ = a, k = f, r = ne($.modelValue);
    Kt(() => $.modelValue, (n, h) => {
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
    function T() {
      m.value = !1, v.value = [];
    }
    function B(n) {
      v.value = n;
    }
    return (n, h) => {
      const U = ye("el-button"), q = ye("el-input"), I = ye("el-dialog");
      return Ge(), Ue("div", Pt, [
        Y(q, {
          modelValue: r.value,
          "onUpdate:modelValue": h[0] || (h[0] = (_) => r.value = _),
          placeholder: $.placeholder,
          style: { width: "100%" },
          disabled: !$.enableInput,
          onChange: x
        }, {
          append: oe(() => [
            Y(U, {
              icon: J(Qe),
              type: "info",
              onClick: y
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        Y(I, {
          modelValue: J(m),
          "onUpdate:modelValue": h[2] || (h[2] = (_) => Ie(m) ? m.value = _ : m = _),
          title: J(u),
          width: J(me)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: oe(() => [
            Mt("span", jt, [
              Y(U, {
                type: "primary",
                onClick: C
              }, {
                default: oe(() => [
                  h[3] || (h[3] = ze("确 定")),
                  J(v).length > 0 ? (Ge(), Ue("span", qt, "(已选" + Dt(J(v).length) + "个)", 1)) : Ot("", !0)
                ]),
                _: 1
              }),
              Y(U, {
                onClick: h[1] || (h[1] = (_) => {
                  Ie(m) ? m.value = !1 : m = !1, T();
                })
              }, {
                default: oe(() => h[4] || (h[4] = [
                  ze("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: oe(() => [
            Y(Lt, {
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
}, Ht = /* @__PURE__ */ xe(Wt, [["__scopeId", "data-v-52e51a92"]]), F = window.Vue.resolveComponent, d = window.Vue.createVNode, p = window.Vue.withCtx, E = window.Vue.unref, P = window.Vue.createTextVNode, ue = window.Vue.createElementVNode, Re = window.Vue.resolveDirective, j = window.Vue.openBlock, ie = window.Vue.createBlock, pe = window.Vue.withDirectives, Jt = window.Vue.normalizeStyle, Te = window.Vue.createElementBlock, Be = window.Vue.createCommentVNode, Yt = window.Vue.toDisplayString, Le = window.Vue.isRef, Qt = { class: "page" }, Xt = { class: "search-box" }, Zt = { class: "right-tool" }, el = { class: "table-box" }, tl = { class: "dialog-footer" }, Q = window.ElementPlus.ElMessage, ll = window.ElementPlus.ElMessageBox, al = window.Vue.reactive, O = window.Vue.ref, ol = {
  __name: "TagView",
  setup(a) {
    const f = O({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), m = O();
    let u = O(!1), v = O(""), $ = O([]), k = O(!1);
    const r = O({
      id: "",
      name: "",
      thumbnail: "",
      color: "",
      slug: ""
    }), x = al({
      name: [{ required: !0, message: "请输入标签名称", trigger: "blur" }]
    }), y = O();
    function C() {
      k.value = !0, at(f.value).then((_) => {
        $.value = _.data.list, f.value.total = _.data.total, k.value = !1;
      });
    }
    function T() {
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
        _ && (r.value.id ? ut(r.value).then((l) => {
          l.code === 200 ? (Q.success("修改成功"), u.value = !1, n(), C()) : Q.error(l.msg);
        }) : ot(r.value).then((l) => {
          l.code === 200 ? (Q.success("添加成功"), u.value = !1, n(), C()) : Q.error(l.msg);
        }));
      });
    }
    function U(_) {
      v.value = "修改标签", n(), nt(_.id).then((l) => {
        r.value = l.data, u.value = !0;
      });
    }
    function q(_) {
      ll.confirm("确定要删除[" + _.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        it(_.id).then((l) => {
          l.code === 200 && l.data ? (Q.success("删除成功"), C()) : Q.error(l.msg);
        });
      }).catch(() => {
      });
    }
    function I() {
      r.value.id || (Ne.setOptions({ charCase: 1, checkPolyphone: !1 }), r.value.slug = Ne.getCamelChars(r.value.name));
    }
    return C(), (_, l) => {
      const X = F("el-input"), L = F("el-form-item"), z = F("el-button"), se = F("el-form"), Z = F("el-col"), D = F("el-row"), G = F("el-table-column"), fe = F("el-image"), K = F("el-table"), _e = F("el-pagination"), ve = F("el-color-picker"), ge = F("el-dialog"), ee = Re("hasPermission"), we = Re("loading");
      return j(), Te("div", Qt, [
        ue("div", Xt, [
          d(se, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: p(() => [
              d(L, { label: "标签名称" }, {
                default: p(() => [
                  d(X, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (s) => f.value.name = s),
                    placeholder: "请输入标签名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              d(L, null, {
                default: p(() => [
                  d(z, {
                    type: "primary",
                    onClick: C,
                    icon: E(De)
                  }, {
                    default: p(() => l[9] || (l[9] = [
                      P("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  d(z, {
                    icon: E(ke),
                    onClick: T
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
        d(D, {
          gutter: 10,
          class: "mb8"
        }, {
          default: p(() => [
            d(Z, { span: 1.5 }, {
              default: p(() => [
                pe((j(), ie(z, {
                  icon: E(Xe),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: p(() => l[11] || (l[11] = [
                    P("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [ee, ["admin:tag:create"]]
                ])
              ]),
              _: 1
            }),
            ue("div", Zt, [
              d(z, {
                icon: E(ke),
                circle: "",
                onClick: C
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        ue("div", el, [
          pe((j(), ie(K, {
            data: E($),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: p(() => [
              d(G, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              d(G, {
                prop: "name",
                label: "标签名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d(G, {
                prop: "color",
                label: "颜色",
                "min-width": "150"
              }, {
                default: p((s) => [
                  s.row.color ? (j(), Te("div", {
                    key: 0,
                    class: "tableColor",
                    style: Jt({ "background-color": s.row.color })
                  }, null, 4)) : Be("", !0)
                ]),
                _: 1
              }),
              d(G, {
                prop: "slug",
                label: "slug",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d(G, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "120"
              }, {
                default: p((s) => [
                  s.row.thumbnail ? (j(), ie(fe, {
                    key: 0,
                    style: { height: "50px" },
                    src: s.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [s.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : Be("", !0)
                ]),
                _: 1
              }),
              d(G, {
                prop: "articleCount",
                label: "文章数量",
                "min-width": "80"
              }),
              d(G, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: p((s) => [
                  ue("span", null, Yt(E(lt)(s.row.createTime)), 1)
                ]),
                _: 1
              }),
              d(G, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              d(G, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: p((s) => [
                  pe((j(), ie(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: E(Ze),
                    onClick: (he) => U(s.row)
                  }, {
                    default: p(() => l[12] || (l[12] = [
                      P("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [ee, ["admin:tag:update"]]
                  ]),
                  pe((j(), ie(z, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: E(et),
                    onClick: (he) => q(s.row)
                  }, {
                    default: p(() => l[13] || (l[13] = [
                      P("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [ee, ["admin:tag:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [we, E(k)]
          ]),
          d(_e, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (s) => f.value.pageNo = s),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (s) => f.value.pageSize = s),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: C,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        d(ge, {
          modelValue: E(u),
          "onUpdate:modelValue": l[8] || (l[8] = (s) => Le(u) ? u.value = s : u = s),
          title: E(v),
          width: E(me)(600),
          draggable: ""
        }, {
          footer: p(() => [
            ue("span", tl, [
              d(z, {
                type: "primary",
                onClick: h
              }, {
                default: p(() => l[14] || (l[14] = [
                  P("确 定")
                ])),
                _: 1
              }),
              d(z, {
                onClick: l[7] || (l[7] = (s) => {
                  Le(u) ? u.value = !1 : u = !1, n();
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
            d(se, {
              ref_key: "addFormRef",
              ref: y,
              model: r.value,
              "label-width": "80px",
              "status-icon": "",
              rules: x
            }, {
              default: p(() => [
                d(L, {
                  label: "标签名称",
                  prop: "name"
                }, {
                  default: p(() => [
                    d(X, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": l[3] || (l[3] = (s) => r.value.name = s),
                      placeholder: "请输入标签名称",
                      onChange: I
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "标签颜色",
                  prop: "color"
                }, {
                  default: p(() => [
                    d(ve, {
                      modelValue: r.value.color,
                      "onUpdate:modelValue": l[4] || (l[4] = (s) => r.value.color = s)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "标签slug",
                  prop: "slug"
                }, {
                  default: p(() => [
                    d(X, {
                      modelValue: r.value.slug,
                      "onUpdate:modelValue": l[5] || (l[5] = (s) => r.value.slug = s),
                      placeholder: "请输入标签slug"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                d(L, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: p(() => [
                    d(Ht, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择封面图",
                      "model-value": r.value.thumbnail,
                      "onUpdate:modelValue": l[6] || (l[6] = (s) => r.value.thumbnail = s)
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
}, il = /* @__PURE__ */ xe(ol, [["__scopeId", "data-v-35b0dc97"]]);
export {
  il as default
};
