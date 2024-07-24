import { s as ye, r as ue, f as Fe, p as de, e as Ee, d as Ne } from "./lib/@element-plus.js";
function Ue(i) {
  return axios.post("/api/auth/category/listTree", i);
}
function ze(i) {
  return axios.post("/api/auth/category/add", i);
}
function Re(i) {
  return axios.put("/api/auth/category/update", i);
}
function De(i) {
  return axios.get("/api/auth/category/get?id=" + i);
}
function Be(i) {
  return axios.delete("/api/auth/category/del?id=" + i);
}
const Me = window.Pinia.defineStore;
Me({
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
    setMenuInit(i) {
      this.menuInit = i;
    },
    setMenuList(i) {
      this.menuList = i;
    },
    setCachedViews(i) {
      this.cachedViews = i;
    }
  },
  persist: {
    enabled: !1
  }
});
function Te(i, b, c, m, f) {
  b = b || "id", c = c || "parentId", f = f || Math.min.apply(Math, i.map((v) => v[c])) || 0;
  const V = JSON.parse(JSON.stringify(i)), _ = V.filter((v) => {
    let S = V.filter((a) => v[b] === a[c]);
    return S.length > 0 && (v.children = S), v[c] === f;
  });
  return _ !== "" ? _ : i;
}
function Ie(i) {
  return axios.post("/api/auth/attach/page", i);
}
function Ge() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function Le(i) {
  return axios.put("/apiv/attach/update", i);
}
function Oe(i) {
  return axios.get("/api/auth/attach/get?id=" + i);
}
const be = (i, b) => {
  const c = i.__vccOpts || i;
  for (const [m, f] of b)
    c[m] = f;
  return c;
}, h = window.Vue.resolveComponent, n = window.Vue.createVNode, p = window.Vue.withCtx, K = window.Vue.unref, G = window.Vue.createTextVNode, y = window.Vue.createElementVNode, ce = window.Vue.renderList, re = window.Vue.Fragment, k = window.Vue.openBlock, I = window.Vue.createElementBlock, Z = window.Vue.createBlock;
window.Vue.createCommentVNode;
const pe = window.Vue.toDisplayString, me = window.Vue.normalizeClass, Pe = window.Vue.withModifiers, _e = window.Vue.isRef;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const Ke = { class: "page" }, qe = { class: "search-box" }, Je = { class: "table-box" }, je = { class: "attach-preview" }, He = { class: "image-slot" }, Qe = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, We = ["src"], Xe = {
  key: 2,
  class: "attach-other"
}, Ye = { class: "attach-name" }, Ze = { class: "operate-btn-box" }, et = { style: { "padding-right": "15px" } }, tt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, lt = ["src"], ot = {
  key: 2,
  controls: "",
  preload: "none"
}, at = ["src"], nt = { key: 3 }, st = { class: "showForm" }, it = { class: "dialog-footer" }, ut = window.Vue.reactive, N = window.Vue.ref, dt = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(i, { emit: b }) {
    const c = N(), m = N({
      pageNo: 1,
      pageSize: 8,
      total: 0,
      name: "",
      type: ""
    });
    let f = N([]), V = N(!1), _ = N(/* @__PURE__ */ new Map());
    const v = b, S = i;
    let a = N(!1), L = N(""), z = N([]);
    const w = N(), e = N({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), R = ut({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    });
    function A() {
      e.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, w.value && w.value.resetFields();
    }
    function M() {
      S.attachType && (m.value.type = S.attachType), V.value = !0, Ie(m.value).then((r) => {
        r.data.list.forEach((t) => {
          const F = _.value.has(t.id);
          t.selected = F;
        }), f.value = r.data.list, m.value.total = r.data.total, V.value = !1;
      });
    }
    function D() {
      m.value = {
        attachConfigId: void 0,
        attachGroup: void 0,
        storage: void 0,
        name: ""
      }, c.value.resetFields();
    }
    function le(r) {
      if (!r.selected && _.value.size >= S.max) {
        ElMessage.error(`最多选择${S.max}个`);
        return;
      }
      r.selected = !r.selected, r.selected ? _.value.set(r.id, r) : _.value.delete(r.id), v("update:selectedAttach", Array.from(_.value.values()));
    }
    function g() {
      Ge().then((r) => {
        z.value = r.data;
      });
    }
    function s(r) {
      A(), g(), Oe(r.id).then((t) => {
        e.value = t.data, L.value = "详情", a.value = !0;
      });
    }
    function T() {
      w.value.validate((r) => {
        r && Le(e.value).then((t) => {
          t.code === 200 ? (ElMessage.success("修改成功"), a.value = !1, A(), M()) : ElMessage.error(t.msg);
        });
      });
    }
    return M(), (r, t) => {
      const F = h("el-input"), E = h("el-form-item"), O = h("el-button"), x = h("el-form"), oe = h("Loading"), P = h("el-icon"), Y = h("el-image"), ae = h("el-text"), ne = h("InfoFilled"), se = h("SuccessFilled"), u = h("el-col"), j = h("el-row"), xe = h("el-pagination"), ke = h("el-link"), Ce = h("el-option"), $e = h("el-select"), Se = h("el-dialog");
      return k(), I("div", Ke, [
        y("div", qe, [
          n(x, {
            inline: !0,
            model: m.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: c
          }, {
            default: p(() => [
              n(E, { label: "附件名称" }, {
                default: p(() => [
                  n(F, {
                    modelValue: m.value.name,
                    "onUpdate:modelValue": t[0] || (t[0] = (o) => m.value.name = o),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(E, null, {
                default: p(() => [
                  n(O, {
                    type: "primary",
                    onClick: M,
                    icon: K(ye)
                  }, {
                    default: p(() => [
                      G("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  n(O, {
                    icon: K(ue),
                    onClick: D
                  }, {
                    default: p(() => [
                      G("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        y("div", Je, [
          n(j, { gutter: 15 }, {
            default: p(() => [
              (k(!0), I(re, null, ce(K(f), (o) => (k(), Z(u, {
                span: 6,
                class: "attach-col",
                onClick: (Ae) => le(o)
              }, {
                default: p(() => [
                  y("div", {
                    class: me({ "attach-block": !0, selected: o.selected })
                  }, [
                    y("div", je, [
                      o.type && o.type === "img" ? (k(), Z(Y, {
                        key: o.url,
                        src: o.url,
                        lazy: "",
                        class: "attach-img",
                        loading: "lazy"
                      }, {
                        placeholder: p(() => [
                          y("div", He, [
                            n(P, { class: "is-loading" }, {
                              default: p(() => [
                                n(oe)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 2
                      }, 1032, ["src"])) : o.type && o.type === "video" ? (k(), I("video", Qe, [
                        y("source", {
                          src: o.url
                        }, null, 8, We)
                      ])) : (k(), I("div", Xe, pe(o.path.split(".").pop()), 1))
                    ]),
                    y("div", Ye, [
                      n(ae, {
                        "line-clamp": "1",
                        style: { width: "100%" }
                      }, {
                        default: p(() => [
                          G(pe(o.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    y("div", {
                      class: me({ "operate-mask": !0, selected: o.selected })
                    }, null, 2),
                    y("div", Ze, [
                      n(P, {
                        class: "operate-btn",
                        onClick: Pe((Ae) => s(o), ["stop"])
                      }, {
                        default: p(() => [
                          n(ne)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(P, { class: "operate-btn select-btn" }, {
                        default: p(() => [
                          n(se)
                        ]),
                        _: 1
                      })
                    ])
                  ], 2)
                ]),
                _: 2
              }, 1032, ["onClick"]))), 256))
            ]),
            _: 1
          }),
          n(xe, {
            "current-page": m.value.pageNo,
            "onUpdate:currentPage": t[1] || (t[1] = (o) => m.value.pageNo = o),
            "page-size": m.value.pageSize,
            "onUpdate:pageSize": t[2] || (t[2] = (o) => m.value.pageSize = o),
            "page-sizes": [8, 16, 24],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: M,
            total: m.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(Se, {
          modelValue: K(a),
          "onUpdate:modelValue": t[10] || (t[10] = (o) => _e(a) ? a.value = o : a = o),
          title: K(L),
          width: "800px",
          draggable: ""
        }, {
          footer: p(() => [
            y("span", it, [
              n(O, {
                type: "primary",
                onClick: T
              }, {
                default: p(() => [
                  G("修 改")
                ]),
                _: 1
              }),
              n(O, {
                onClick: t[9] || (t[9] = (o) => {
                  _e(a) ? a.value = !1 : a = !1, A();
                })
              }, {
                default: p(() => [
                  G("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            n(j, null, {
              default: p(() => [
                n(u, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: p(() => [
                    y("div", et, [
                      e.value.type && e.value.type === "img" ? (k(), Z(Y, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: e.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [e.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : e.value.type && e.value.type === "video" ? (k(), I("video", tt, [
                        y("source", {
                          src: e.value.url
                        }, null, 8, lt)
                      ])) : e.value.type && e.value.type === "audio" ? (k(), I("audio", ot, [
                        y("source", {
                          src: e.value.url
                        }, null, 8, at)
                      ])) : (k(), I("i", nt, [
                        G("无法预览，点击 "),
                        n(ke, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + e.value.configId + "/get/" + e.value.path
                        }, {
                          default: p(() => [
                            G("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                n(u, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: p(() => [
                    y("div", st, [
                      n(x, {
                        ref_key: "showFormRef",
                        ref: w,
                        model: e.value,
                        "label-width": "auto",
                        rules: R,
                        "label-position": "top"
                      }, {
                        default: p(() => [
                          n(E, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: p(() => [
                              n(F, {
                                modelValue: e.value.name,
                                "onUpdate:modelValue": t[3] || (t[3] = (o) => e.value.name = o)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(E, { label: "附件类型" }, {
                            default: p(() => [
                              n(F, {
                                modelValue: e.value.type,
                                "onUpdate:modelValue": t[4] || (t[4] = (o) => e.value.type = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(E, { label: "分组" }, {
                            default: p(() => [
                              n($e, {
                                modelValue: e.value.attachGroup,
                                "onUpdate:modelValue": t[5] || (t[5] = (o) => e.value.attachGroup = o),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: p(() => [
                                  (k(!0), I(re, null, ce(K(z), (o) => (k(), Z(Ce, {
                                    key: o.attachGroup,
                                    label: o.attachGroup,
                                    value: o.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(E, { label: "存储路径" }, {
                            default: p(() => [
                              n(F, {
                                modelValue: e.value.path,
                                "onUpdate:modelValue": t[6] || (t[6] = (o) => e.value.path = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(E, { label: "访问地址" }, {
                            default: p(() => [
                              n(F, {
                                modelValue: e.value.url,
                                "onUpdate:modelValue": t[7] || (t[7] = (o) => e.value.url = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(E, { label: "附件描述" }, {
                            default: p(() => [
                              n(F, {
                                modelValue: e.value.desc,
                                "onUpdate:modelValue": t[8] || (t[8] = (o) => e.value.desc = o),
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}, ct = /* @__PURE__ */ be(dt, [["__scopeId", "data-v-65c2206e"]]), H = window.Vue.unref, ie = window.Vue.resolveComponent, q = window.Vue.createVNode, Q = window.Vue.withCtx, rt = window.Vue.toDisplayString, fe = window.Vue.openBlock, we = window.Vue.createElementBlock, pt = window.Vue.createCommentVNode, ve = window.Vue.createTextVNode, he = window.Vue.isRef, mt = window.Vue.createElementVNode;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const _t = { style: { width: "100%" } }, ft = { class: "dialog-footer" }, wt = { key: 0 }, W = window.Vue.ref, vt = window.Vue.watch, ht = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue"],
  setup(i, { emit: b }) {
    W("请选择图片");
    let c = W(!1), m = W(""), f = W([]);
    const V = i, _ = b, v = W(V.modelValue);
    vt(() => V.modelValue, (w, e) => {
      v.value = w;
    });
    function S() {
      c.value = !0, m.value = "请选择附件";
    }
    function a() {
      let w = "";
      f.value.forEach((e, R) => {
        w += e.url;
      }), v.value = w, c.value = !1, f.value = [], _("update:modelValue", v.value);
    }
    function L() {
      c.value = !1, f.value = [];
    }
    function z(w) {
      f.value = w;
    }
    return (w, e) => {
      const R = ie("el-button"), A = ie("el-input"), M = ie("el-dialog");
      return fe(), we("div", _t, [
        q(A, {
          modelValue: v.value,
          "onUpdate:modelValue": e[0] || (e[0] = (D) => v.value = D),
          placeholder: V.placeholder,
          style: { width: "100%" },
          disabled: !V.enableInput
        }, {
          append: Q(() => [
            q(R, {
              icon: H(Fe),
              type: "info",
              onClick: S
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        q(M, {
          modelValue: H(c),
          "onUpdate:modelValue": e[2] || (e[2] = (D) => he(c) ? c.value = D : c = D),
          title: H(m),
          width: "900px",
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: Q(() => [
            mt("span", ft, [
              q(R, {
                type: "primary",
                onClick: a
              }, {
                default: Q(() => [
                  ve("确 定"),
                  H(f).length > 0 ? (fe(), we("span", wt, "(已选" + rt(H(f).length) + "个)", 1)) : pt("", !0)
                ]),
                _: 1
              }),
              q(R, {
                onClick: e[1] || (e[1] = (D) => {
                  he(c) ? c.value = !1 : c = !1, L();
                })
              }, {
                default: Q(() => [
                  ve("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: Q(() => [
            q(ct, {
              "onUpdate:selectedAttach": z,
              max: 1,
              "attach-type": V.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}, gt = /* @__PURE__ */ be(ht, [["__scopeId", "data-v-c65d9d19"]]), C = window.Vue.resolveComponent, l = window.Vue.createVNode, d = window.Vue.withCtx, $ = window.Vue.unref, U = window.Vue.createTextVNode, ee = window.Vue.createElementVNode, X = window.Vue.openBlock, te = window.Vue.createBlock, Vt = window.Vue.createCommentVNode, yt = window.Vue.resolveDirective, bt = window.Vue.withDirectives, ge = window.Vue.isRef, xt = window.Vue.createElementBlock, kt = { class: "page" }, Ct = { class: "search-box" }, $t = { class: "right-tool" }, St = { class: "table-box" }, At = { class: "dialog-footer" }, J = window.ElementPlus.ElMessage, Ft = window.ElementPlus.ElMessageBox, Ve = window.Vue.reactive, B = window.Vue.ref, Nt = {
  __name: "CategoryView",
  setup(i) {
    const b = B(), c = B({
      name: ""
    });
    let m = B(!1), f = B([]), V = B([]), _ = B(!1), v = B("");
    const S = Ve({
      children: "children",
      label: "name",
      value: "id"
    }), a = B({
      pid: -1,
      id: "",
      name: "",
      desc: "",
      metaKeywords: "",
      thumbnail: "",
      slug: "",
      metaDescription: ""
    }), L = Ve({
      pid: [{ required: !0, message: "请选择父级分类", trigger: "blur" }],
      name: [{ required: !0, message: "请输入分类名称", trigger: "blur" }]
    }), z = B();
    function w() {
      m.value = !0, Ue(c.value).then((g) => {
        f.value = Te(g.data, "id", "pid", "children", -1), V.value = [{ id: -1, name: "主类目", children: f.value }], m.value = !1;
      });
    }
    function e() {
      c.value = {
        name: ""
      }, b.value.resetFields();
    }
    function R(g) {
      A(), g && g.id && (a.value.pid = g.id), v.value = "添加分类", _.value = !0;
    }
    function A() {
      a.value = {
        pid: -1,
        id: "",
        name: "",
        desc: "",
        metaKeywords: "",
        thumbnail: "",
        slug: "",
        metaDescription: ""
      }, z.value && z.value.resetFields();
    }
    function M() {
      z.value.validate((g) => {
        g && (a.value.id ? Re(a.value).then((s) => {
          s.code === 200 ? (J.success("修改成功"), _.value = !1, A(), w()) : J.error(s.msg);
        }) : ze(a.value).then((s) => {
          s.code === 200 ? (J.success("添加成功"), _.value = !1, A(), w()) : J.error(s.msg);
        }));
      });
    }
    function D(g) {
      v.value = "修改分类", A(), De(g.id).then((s) => {
        a.value = s.data, _.value = !0;
      });
    }
    function le(g) {
      Ft.confirm("确定要删除[" + g.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Be(g.id).then((s) => {
          s.code === 200 && s.data ? (J.success("删除成功"), w()) : J.error(s.msg);
        });
      }).catch(() => {
      });
    }
    return w(), (g, s) => {
      const T = C("el-input"), r = C("el-form-item"), t = C("el-button"), F = C("el-form"), E = C("el-col"), O = C("el-row"), x = C("el-table-column"), oe = C("el-image"), P = C("el-tag"), Y = C("el-table"), ae = C("el-tree-select"), ne = C("el-dialog"), se = yt("loading");
      return X(), xt("div", kt, [
        ee("div", Ct, [
          l(F, {
            inline: !0,
            model: c.value,
            ref_key: "searchFormRef",
            ref: b
          }, {
            default: d(() => [
              l(r, { label: "分类名称" }, {
                default: d(() => [
                  l(T, {
                    modelValue: c.value.name,
                    "onUpdate:modelValue": s[0] || (s[0] = (u) => c.value.name = u),
                    placeholder: "请输入分类名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: d(() => [
                  l(t, {
                    type: "primary",
                    onClick: w,
                    icon: $(ye)
                  }, {
                    default: d(() => [
                      U("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  l(t, {
                    icon: $(ue),
                    onClick: e
                  }, {
                    default: d(() => [
                      U("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        l(O, {
          gutter: 10,
          class: "mb8"
        }, {
          default: d(() => [
            l(E, { span: 1.5 }, {
              default: d(() => [
                l(t, {
                  icon: $(de),
                  type: "primary",
                  plain: "",
                  onClick: R
                }, {
                  default: d(() => [
                    U("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            ee("div", $t, [
              l(t, {
                icon: $(ue),
                circle: "",
                onClick: w
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        ee("div", St, [
          bt((X(), te(Y, {
            data: $(f),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: d(() => [
              l(x, {
                prop: "name",
                label: "分类名称",
                width: "240"
              }),
              l(x, {
                prop: "desc",
                label: "描述",
                width: "150"
              }),
              l(x, {
                prop: "count",
                label: "文章数量",
                "min-width": "150"
              }),
              l(x, {
                prop: "slug",
                label: "slug",
                "min-width": "150"
              }),
              l(x, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: d((u) => [
                  u.row.thumbnail ? (X(), te(oe, {
                    key: 0,
                    style: { width: "100%", "max-height": "100%" },
                    src: u.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [u.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : Vt("", !0)
                ]),
                _: 1
              }),
              l(x, {
                prop: "metaKeywords",
                label: "SEO关键字",
                "min-width": "150"
              }),
              l(x, {
                prop: "metaDescription",
                label: "SEO描述",
                "min-width": "150"
              }),
              l(x, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: d((u) => [
                  u.row.status === 0 ? (X(), te(P, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: d(() => [
                      U("正常")
                    ]),
                    _: 1
                  })) : (X(), te(P, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: d(() => [
                      U("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(x, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: d((u) => [
                  l(t, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: $(Ee),
                    onClick: (j) => D(u.row)
                  }, {
                    default: d(() => [
                      U("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(t, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: $(de),
                    onClick: (j) => R(u.row)
                  }, {
                    default: d(() => [
                      U("新增")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(t, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: $(Ne),
                    onClick: (j) => le(u.row)
                  }, {
                    default: d(() => [
                      U("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [se, $(m)]
          ])
        ]),
        l(ne, {
          modelValue: $(_),
          "onUpdate:modelValue": s[9] || (s[9] = (u) => ge(_) ? _.value = u : _ = u),
          title: $(v),
          width: "600px",
          draggable: ""
        }, {
          footer: d(() => [
            ee("span", At, [
              l(t, {
                type: "primary",
                onClick: M
              }, {
                default: d(() => [
                  U("确 定")
                ]),
                _: 1
              }),
              l(t, {
                onClick: s[8] || (s[8] = (u) => {
                  ge(_) ? _.value = !1 : _ = !1, A();
                })
              }, {
                default: d(() => [
                  U("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: d(() => [
            l(F, {
              ref_key: "addFormRef",
              ref: z,
              model: a.value,
              "label-width": "100px",
              "status-icon": "",
              rules: L
            }, {
              default: d(() => [
                l(r, {
                  label: "父级分类",
                  prop: "pid"
                }, {
                  default: d(() => [
                    l(ae, {
                      modelValue: a.value.pid,
                      "onUpdate:modelValue": s[1] || (s[1] = (u) => a.value.pid = u),
                      data: $(V),
                      props: S,
                      "check-strictly": "",
                      "render-after-expand": !1,
                      style: { width: "100%" },
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "分类名称",
                  prop: "name"
                }, {
                  default: d(() => [
                    l(T, {
                      modelValue: a.value.name,
                      "onUpdate:modelValue": s[2] || (s[2] = (u) => a.value.name = u),
                      placeholder: "请输入分类名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "分类描述",
                  prop: "desc"
                }, {
                  default: d(() => [
                    l(T, {
                      modelValue: a.value.desc,
                      "onUpdate:modelValue": s[3] || (s[3] = (u) => a.value.desc = u),
                      placeholder: "请输入分类描述",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "分类slug",
                  prop: "slug"
                }, {
                  default: d(() => [
                    l(T, {
                      modelValue: a.value.slug,
                      "onUpdate:modelValue": s[4] || (s[4] = (u) => a.value.slug = u),
                      placeholder: "请输入分类slug"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: d(() => [
                    l(gt, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择封面图",
                      "model-value": a.value.thumbnail,
                      "onUpdate:modelValue": s[5] || (s[5] = (u) => a.value.thumbnail = u)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "SEO关键字",
                  prop: "metaKeywords"
                }, {
                  default: d(() => [
                    l(T, {
                      modelValue: a.value.metaKeywords,
                      "onUpdate:modelValue": s[6] || (s[6] = (u) => a.value.metaKeywords = u),
                      placeholder: "请输入SEO关键字",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(r, {
                  label: "SEO描述内容",
                  prop: "metaDescription"
                }, {
                  default: d(() => [
                    l(T, {
                      modelValue: a.value.metaDescription,
                      "onUpdate:modelValue": s[7] || (s[7] = (u) => a.value.metaDescription = u),
                      placeholder: "请输入SEO描述内容",
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  Nt as default
};
