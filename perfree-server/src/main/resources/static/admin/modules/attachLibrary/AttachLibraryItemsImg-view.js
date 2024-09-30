import { s as ne, r as B, p as ie, u as re, e as se, d as de } from "./lib/@element-plus.js";
import { _ as ue, p as ce, d as E, A as me, a as pe, b as fe, c as ve, e as _e, f as we, g as ge, h as he } from "./lib/attachLibraryItems.js";
const r = window.Vue.resolveComponent, t = window.Vue.createVNode, l = window.Vue.withCtx, n = window.Vue.unref, c = window.Vue.createTextVNode, w = window.Vue.createElementVNode, I = window.Vue.openBlock, U = window.Vue.createBlock, D = window.Vue.createCommentVNode, R = window.Vue.toDisplayString, be = window.Vue.resolveDirective, ye = window.Vue.withDirectives, x = window.Vue.isRef, T = window.Vue.createElementBlock, Ve = { class: "search-box" }, ke = { class: "right-tool" }, Le = { class: "table-box" }, Ie = { class: "imgLoading" }, xe = { class: "dialog-footer" }, Ae = { class: "dialog-footer" }, Ce = { key: 0 }, ze = window.Vue.reactive, m = window.Vue.ref, v = window.ElementPlus.ElMessage, Ne = window.ElementPlus.ElMessageBox, Se = {
  __name: "AttachLibraryItemsImg",
  props: ["attachLibraryId"],
  setup(P) {
    const h = P, s = m({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      attachLibraryId: h.attachLibraryId
    }), i = m({
      id: null,
      attachLibraryId: h.attachLibraryId,
      name: null,
      description: null,
      url: null
    }), M = ze({
      name: [{ required: !0, message: "图片库名称不能为空", trigger: "blur" }],
      url: [{ required: !0, message: "图片地址不能为空", trigger: "blur" }]
    }), z = m(), k = m();
    let d = m(!1), N = m([]), A = m(!1), b = m(""), p = m(!1), y = m([]);
    function q(o) {
      y.value = o;
    }
    function C() {
      y.value = [];
    }
    function $() {
      b.value = "选择图片", C(), p.value = !0;
    }
    function j() {
      let o = {
        attachList: []
      };
      y.value.forEach((e, L) => {
        let _ = {
          name: e.name,
          attachLibraryId: h.attachLibraryId,
          url: e.url
        };
        o.attachList.push(_);
      }), fe(o).then((e) => {
        e.code === 200 ? (v.success("导入成功"), p.value = !1, C(), f()) : v.error(e.msg);
      });
    }
    function G(o) {
      o.length > 0 && !i.value.name && (i.value.name = o[0].name);
    }
    function V() {
      i.value = {
        id: null,
        name: null,
        description: null,
        attachLibraryId: h.attachLibraryId,
        url: null
      }, k.value && k.value.resetFields();
    }
    function W() {
      k.value.validate((o) => {
        o && (i.value.id ? ve(i.value).then((e) => {
          e.code === 200 ? (v.success("操作成功"), d.value = !1, V(), f()) : v.error(e.msg);
        }) : _e(i.value).then((e) => {
          e.code === 200 ? (v.success("操作成功"), d.value = !1, V(), f()) : v.error(e.msg);
        }));
      });
    }
    function H(o) {
      Ne.confirm("确定要删除[" + o.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        we(o.id).then((e) => {
          e.code === 200 && e.data ? (v.success("删除成功"), f()) : v.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function J(o) {
      V(), b.value = "修改图片", d.value = !0, ge(o.id).then((e) => {
        i.value = e.data;
      });
    }
    function f() {
      A.value = !0, he(s.value).then((o) => {
        N.value = o.data.list, s.value.total = o.data.total, A.value = !1;
      });
    }
    function K() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        attachLibraryId: h.attachLibraryId
      }, z.value.resetFields(), f();
    }
    function O() {
      V(), b.value = "添加图片", d.value = !0;
    }
    return f(), (o, e) => {
      const L = r("el-input"), _ = r("el-form-item"), u = r("el-button"), S = r("el-form"), Q = r("el-col"), X = r("el-row"), g = r("el-table-column"), Y = r("Loading"), Z = r("el-icon"), ee = r("el-image"), te = r("el-table"), le = r("el-pagination"), F = r("el-dialog"), ae = be("loading");
      return I(), T("div", null, [
        w("div", Ve, [
          t(S, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: l(() => [
              t(_, { label: "图片名称" }, {
                default: l(() => [
                  t(L, {
                    modelValue: s.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => s.value.name = a),
                    placeholder: "请输入图片名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(_, null, {
                default: l(() => [
                  t(u, {
                    type: "primary",
                    onClick: f,
                    icon: n(ne)
                  }, {
                    default: l(() => e[10] || (e[10] = [
                      c("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  t(u, {
                    icon: n(B),
                    onClick: K
                  }, {
                    default: l(() => e[11] || (e[11] = [
                      c("重置")
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
        t(X, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            t(Q, { span: 1.5 }, {
              default: l(() => [
                t(u, {
                  icon: n(ie),
                  type: "primary",
                  plain: "",
                  onClick: O
                }, {
                  default: l(() => e[12] || (e[12] = [
                    c("新增")
                  ])),
                  _: 1
                }, 8, ["icon"]),
                t(u, {
                  icon: n(re),
                  type: "primary",
                  plain: "",
                  onClick: $
                }, {
                  default: l(() => e[13] || (e[13] = [
                    c("从附件导入")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            w("div", ke, [
              t(u, {
                icon: n(B),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        w("div", Le, [
          ye((I(), U(te, {
            data: n(N),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              t(g, {
                prop: "name",
                label: "图片名称",
                "min-width": "160",
                "show-overflow-tooltip": ""
              }),
              t(g, {
                prop: "url",
                label: "图片",
                "min-width": "80"
              }, {
                default: l((a) => [
                  a.row.url ? (I(), U(ee, {
                    key: 0,
                    style: { width: "100%", "max-height": "100%" },
                    src: a.row.url,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [a.row.url],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": "",
                    lazy: ""
                  }, {
                    placeholder: l(() => [
                      w("div", Ie, [
                        t(Z, { class: "is-loading" }, {
                          default: l(() => [
                            t(Y)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 2
                  }, 1032, ["src", "preview-src-list"])) : D("", !0)
                ]),
                _: 1
              }),
              t(g, {
                prop: "description",
                label: "描述",
                "min-width": "160",
                "show-overflow-tooltip": ""
              }),
              t(g, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              t(g, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: l((a) => [
                  w("span", null, R(n(ce)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(g, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: l((a) => [
                  t(u, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(se),
                    onClick: (oe) => J(a.row)
                  }, {
                    default: l(() => e[14] || (e[14] = [
                      c("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(u, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(de),
                    onClick: (oe) => H(a.row)
                  }, {
                    default: l(() => e[15] || (e[15] = [
                      c("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ae, n(A)]
          ]),
          t(le, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => s.value.pageNo = a),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => s.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: f,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(F, {
          modelValue: n(d),
          "onUpdate:modelValue": e[7] || (e[7] = (a) => x(d) ? d.value = a : d = a),
          title: n(b),
          width: n(E)(600),
          draggable: ""
        }, {
          footer: l(() => [
            w("span", xe, [
              t(u, {
                type: "primary",
                onClick: W
              }, {
                default: l(() => e[16] || (e[16] = [
                  c("确 定")
                ])),
                _: 1
              }),
              t(u, {
                onClick: e[6] || (e[6] = (a) => {
                  x(d) ? d.value = !1 : d = !1, V();
                })
              }, {
                default: l(() => e[17] || (e[17] = [
                  c("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            t(S, {
              ref_key: "addFormRef",
              ref: k,
              model: i.value,
              "label-width": "130px",
              "status-icon": "",
              rules: M
            }, {
              default: l(() => [
                t(_, {
                  label: "图片",
                  prop: "url"
                }, {
                  default: l(() => [
                    t(me, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择或输入图片地址",
                      "model-value": i.value.url,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => i.value.url = a),
                      onAttachSelectChange: G
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                t(_, {
                  label: "图片名称",
                  prop: "name"
                }, {
                  default: l(() => [
                    t(L, {
                      modelValue: i.value.name,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => i.value.name = a),
                      placeholder: "请输入图片名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(_, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: l(() => [
                    t(L, {
                      modelValue: i.value.description,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => i.value.description = a),
                      placeholder: "请输入描述",
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
        }, 8, ["modelValue", "title", "width"]),
        t(F, {
          modelValue: n(p),
          "onUpdate:modelValue": e[9] || (e[9] = (a) => x(p) ? p.value = a : p = a),
          title: n(b),
          width: n(E)(1e3),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: l(() => [
            w("span", Ae, [
              t(u, {
                type: "primary",
                onClick: j
              }, {
                default: l(() => [
                  e[18] || (e[18] = c("确 定")),
                  n(y).length > 0 ? (I(), T("span", Ce, "(已选" + R(n(y).length) + "个)", 1)) : D("", !0)
                ]),
                _: 1
              }),
              t(u, {
                onClick: e[8] || (e[8] = (a) => {
                  x(p) ? p.value = !1 : p = !1, C();
                })
              }, {
                default: l(() => e[19] || (e[19] = [
                  c("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            t(pe, {
              "onUpdate:selectedAttach": q,
              max: 99,
              "attach-type": "img"
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Ee = /* @__PURE__ */ ue(Se, [["__scopeId", "data-v-1bae4937"]]);
export {
  Ee as default
};
