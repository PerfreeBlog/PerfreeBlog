import { s as te, r as E, p as le, u as ae, e as oe, d as ne } from "./lib/@element-plus.js";
import { _ as ie, p as re, d as U, A as se, a as ue, b as de, c as ce, e as me, f as pe, g as fe, h as ve } from "./lib/attachLibraryItems.js";
const d = window.Vue.resolveComponent, t = window.Vue.createVNode, l = window.Vue.withCtx, n = window.Vue.unref, c = window.Vue.createTextVNode, h = window.Vue.createElementVNode, x = window.Vue.toDisplayString, we = window.Vue.resolveDirective, z = window.Vue.openBlock, _e = window.Vue.createBlock, he = window.Vue.withDirectives, C = window.Vue.isRef, D = window.Vue.createElementBlock, ge = window.Vue.createCommentVNode, be = { class: "search-box" }, ye = { class: "right-tool" }, Ve = { class: "table-box" }, ke = { class: "dialog-footer" }, Ae = { class: "dialog-footer" }, Ce = { key: 0 }, Ie = window.Vue.reactive, m = window.Vue.ref, v = window.ElementPlus.ElMessage, Le = window.ElementPlus.ElMessageBox, xe = {
  __name: "AttachLibraryItemsOther",
  props: ["attachLibraryId"],
  setup(R) {
    const g = R, r = m({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      attachLibraryId: g.attachLibraryId
    }), i = m({
      id: null,
      attachLibraryId: g.attachLibraryId,
      name: null,
      description: null,
      url: null
    }), T = Ie({
      name: [{ required: !0, message: "附件库名称不能为空", trigger: "blur" }],
      url: [{ required: !0, message: "附件地址不能为空", trigger: "blur" }]
    }), N = m(), k = m();
    let s = m(!1), S = m([]), I = m(!1), b = m(""), p = m(!1), y = m([]);
    function P(o) {
      y.value = o;
    }
    function L() {
      y.value = [];
    }
    function M() {
      b.value = "选择附件", L(), p.value = !0;
    }
    function q() {
      let o = {
        attachList: []
      };
      y.value.forEach((e, A) => {
        let w = {
          name: e.name,
          attachLibraryId: g.attachLibraryId,
          url: e.url
        };
        o.attachList.push(w);
      }), de(o).then((e) => {
        e.code === 200 ? (v.success("导入成功"), p.value = !1, L(), f()) : v.error(e.msg);
      });
    }
    function O(o) {
      o.length > 0 && !i.value.name && (i.value.name = o[0].name);
    }
    function V() {
      i.value = {
        id: null,
        name: null,
        description: null,
        attachLibraryId: g.attachLibraryId,
        url: null
      }, k.value && k.value.resetFields();
    }
    function $() {
      k.value.validate((o) => {
        o && (i.value.id ? ce(i.value).then((e) => {
          e.code === 200 ? (v.success("操作成功"), s.value = !1, V(), f()) : v.error(e.msg);
        }) : me(i.value).then((e) => {
          e.code === 200 ? (v.success("操作成功"), s.value = !1, V(), f()) : v.error(e.msg);
        }));
      });
    }
    function j(o) {
      Le.confirm("确定要删除[" + o.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pe(o.id).then((e) => {
          e.code === 200 && e.data ? (v.success("删除成功"), f()) : v.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function G(o) {
      V(), b.value = "修改附件", s.value = !0, fe(o.id).then((e) => {
        i.value = e.data;
      });
    }
    function f() {
      I.value = !0, ve(r.value).then((o) => {
        S.value = o.data.list, r.value.total = o.data.total, I.value = !1;
      });
    }
    function W() {
      r.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        attachLibraryId: g.attachLibraryId
      }, N.value.resetFields(), f();
    }
    function H() {
      V(), b.value = "添加附件", s.value = !0;
    }
    return f(), (o, e) => {
      const A = d("el-input"), w = d("el-form-item"), u = d("el-button"), F = d("el-form"), J = d("el-col"), K = d("el-row"), _ = d("el-table-column"), Q = d("el-link"), X = d("el-table"), Y = d("el-pagination"), B = d("el-dialog"), Z = we("loading");
      return z(), D("div", null, [
        h("div", be, [
          t(F, {
            inline: !0,
            model: r.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: N
          }, {
            default: l(() => [
              t(w, { label: "附件名称" }, {
                default: l(() => [
                  t(A, {
                    modelValue: r.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => r.value.name = a),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(w, null, {
                default: l(() => [
                  t(u, {
                    type: "primary",
                    onClick: f,
                    icon: n(te)
                  }, {
                    default: l(() => e[10] || (e[10] = [
                      c("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  t(u, {
                    icon: n(E),
                    onClick: W
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
        t(K, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            t(J, { span: 1.5 }, {
              default: l(() => [
                t(u, {
                  icon: n(le),
                  type: "primary",
                  plain: "",
                  onClick: H
                }, {
                  default: l(() => e[12] || (e[12] = [
                    c("新增")
                  ])),
                  _: 1
                }, 8, ["icon"]),
                t(u, {
                  icon: n(ae),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: l(() => e[13] || (e[13] = [
                    c("从附件导入")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            h("div", ye, [
              t(u, {
                icon: n(E),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        h("div", Ve, [
          he((z(), _e(X, {
            data: n(S),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              t(_, {
                prop: "name",
                label: "附件名称",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              t(_, {
                prop: "url",
                label: "附件",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }, {
                default: l((a) => [
                  t(Q, {
                    type: "primary",
                    underline: !1,
                    style: { "font-size": "12px", "vertical-align": "baseline" },
                    target: "_blank",
                    href: a.row.url
                  }, {
                    default: l(() => [
                      c(x(a.row.url), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              t(_, {
                prop: "description",
                label: "描述",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              t(_, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              t(_, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: l((a) => [
                  h("span", null, x(n(re)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(_, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: l((a) => [
                  t(u, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(oe),
                    onClick: (ee) => G(a.row)
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
                    icon: n(ne),
                    onClick: (ee) => j(a.row)
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
            [Z, n(I)]
          ]),
          t(Y, {
            "current-page": r.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => r.value.pageNo = a),
            "page-size": r.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => r.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: f,
            total: r.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(B, {
          modelValue: n(s),
          "onUpdate:modelValue": e[7] || (e[7] = (a) => C(s) ? s.value = a : s = a),
          title: n(b),
          width: n(U)(600),
          draggable: ""
        }, {
          footer: l(() => [
            h("span", ke, [
              t(u, {
                type: "primary",
                onClick: $
              }, {
                default: l(() => e[16] || (e[16] = [
                  c("确 定")
                ])),
                _: 1
              }),
              t(u, {
                onClick: e[6] || (e[6] = (a) => {
                  C(s) ? s.value = !1 : s = !1, V();
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
            t(F, {
              ref_key: "addFormRef",
              ref: k,
              model: i.value,
              "label-width": "130px",
              "status-icon": "",
              rules: T
            }, {
              default: l(() => [
                t(w, {
                  label: "附件",
                  prop: "url"
                }, {
                  default: l(() => [
                    t(se, {
                      "attach-type": "other",
                      "enable-input": !0,
                      placeholder: "请选择或输入附件地址",
                      "model-value": i.value.url,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => i.value.url = a),
                      onAttachSelectChange: O
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                t(w, {
                  label: "附件名称",
                  prop: "name"
                }, {
                  default: l(() => [
                    t(A, {
                      modelValue: i.value.name,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => i.value.name = a),
                      placeholder: "请输入附件名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(w, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: l(() => [
                    t(A, {
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
        t(B, {
          modelValue: n(p),
          "onUpdate:modelValue": e[9] || (e[9] = (a) => C(p) ? p.value = a : p = a),
          title: n(b),
          width: n(U)(1e3),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: l(() => [
            h("span", Ae, [
              t(u, {
                type: "primary",
                onClick: q
              }, {
                default: l(() => [
                  e[18] || (e[18] = c("确 定")),
                  n(y).length > 0 ? (z(), D("span", Ce, "(已选" + x(n(y).length) + "个)", 1)) : ge("", !0)
                ]),
                _: 1
              }),
              t(u, {
                onClick: e[8] || (e[8] = (a) => {
                  C(p) ? p.value = !1 : p = !1, L();
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
            t(ue, {
              "onUpdate:selectedAttach": P,
              max: 99,
              "attach-type": "other"
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Se = /* @__PURE__ */ ie(xe, [["__scopeId", "data-v-04984df2"]]);
export {
  Se as default
};
