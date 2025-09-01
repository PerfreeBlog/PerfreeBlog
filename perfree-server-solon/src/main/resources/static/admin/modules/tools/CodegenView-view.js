import { s as F, r as y, u as X, e as Y, f as P, d as Z } from "./lib/@element-plus.js";
import { p as ee, c as le, d as te, e as oe, f as ae, i as ne } from "./lib/codegen.js";
import { t as $ } from "./lib/tabs.js";
const u = window.Vue.resolveComponent, l = window.Vue.createVNode, t = window.Vue.withCtx, n = window.Vue.unref, d = window.Vue.createTextVNode, f = window.Vue.createElementVNode, ie = window.Vue.toDisplayString, de = window.Vue.resolveDirective, C = window.Vue.openBlock, L = window.Vue.createBlock, U = window.Vue.withDirectives, A = window.Vue.isRef, se = window.Vue.createElementBlock, re = { class: "page" }, ue = { class: "search-box" }, me = { class: "right-tool" }, ce = { class: "table-box" }, pe = { class: "dialog-footer" }, N = window.ElementPlus.ElMessage, fe = window.ElementPlus.ElMessageBox, s = window.Vue.ref, we = window.VueRouter.useRouter, ke = {
  __name: "CodegenView",
  setup(_e) {
    const r = s({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableName: ""
    }), M = s(), w = s({
      tableName: ""
    });
    we();
    const g = s(), v = s();
    let x = s([]), z = s([]), b = s(!1), k = s(!1), m = s(!1), R = s("");
    function p() {
      k.value = !0, le(r.value).then((o) => {
        k.value = !1, x.value = o.data.list, r.value.total = o.data.total;
      });
    }
    function j() {
      V(), R.value = "导入表", m.value = !0, S();
    }
    function S() {
      b.value = !0, te(w.value).then((o) => {
        z.value = o.data, b.value = !1;
      });
    }
    function V() {
      w.value = {
        tableName: ""
      }, g.value && g.value.resetFields();
    }
    function G() {
      if (v.value.getSelectionRows().length <= 0) {
        N.error("至少选择一张表!");
        return;
      }
      let o = {
        tableNames: []
      };
      v.value.getSelectionRows().forEach((e) => {
        o.tableNames.push(e.name);
      }), oe(o).then((e) => {
        p(), m.value = !1;
      });
    }
    function I(o) {
      $(`代码生成-配置[${o.tableName}]`, "/admin/codegen/editConfig/" + o.id, "");
    }
    function q(o) {
      $(`代码生成-预览[${o.tableName}]`, "/admin/codegen/preview/" + o.id, "");
    }
    function H(o) {
      fe.confirm("确定要删除[" + o.tableName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ae(o.id).then((e) => {
          e.code === 200 && e.data ? (N.success("删除成功"), p()) : N.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function J(o) {
      ne(o.id).then((e) => {
        window.download.zip(e, o.tableName + ".zip");
      });
    }
    return p(), (o, e) => {
      const T = u("el-input"), _ = u("el-form-item"), i = u("el-button"), E = u("el-form"), K = u("el-col"), O = u("el-row"), c = u("el-table-column"), B = u("el-table"), Q = u("el-pagination"), W = u("el-dialog"), D = de("loading");
      return C(), se("div", re, [
        f("div", ue, [
          l(E, {
            inline: !0,
            model: r.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: M
          }, {
            default: t(() => [
              l(_, { label: "表名称" }, {
                default: t(() => [
                  l(T, {
                    modelValue: r.value.tableName,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => r.value.tableName = a),
                    placeholder: "请输入表名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(_, null, {
                default: t(() => [
                  l(i, {
                    type: "primary",
                    onClick: p,
                    icon: n(F)
                  }, {
                    default: t(() => e[6] || (e[6] = [
                      d("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l(i, {
                    icon: n(y),
                    onClick: o.resetSearchForm
                  }, {
                    default: t(() => e[7] || (e[7] = [
                      d("重置")
                    ])),
                    _: 1
                  }, 8, ["icon", "onClick"])
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
          default: t(() => [
            l(K, { span: 1.5 }, {
              default: t(() => [
                l(i, {
                  icon: n(X),
                  type: "primary",
                  plain: "",
                  onClick: j
                }, {
                  default: t(() => e[8] || (e[8] = [
                    d("导入表")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            f("div", me, [
              l(i, {
                icon: n(y),
                circle: "",
                onClick: p
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        f("div", ce, [
          U((C(), L(B, {
            data: n(x),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: t(() => [
              l(c, {
                prop: "tableName",
                label: "表名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(c, {
                prop: "tableComment",
                label: "表描述",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(c, {
                prop: "className",
                label: "类名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(c, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: t((a) => [
                  f("span", null, ie(n(ee)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(c, {
                label: "操作",
                width: "280",
                fixed: "right"
              }, {
                default: t((a) => [
                  l(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Y),
                    onClick: (h) => q(a.row)
                  }, {
                    default: t(() => e[9] || (e[9] = [
                      d("预览")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(P),
                    onClick: (h) => I(a.row)
                  }, {
                    default: t(() => e[10] || (e[10] = [
                      d("配置")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(P),
                    onClick: (h) => J(a.row)
                  }, {
                    default: t(() => e[11] || (e[11] = [
                      d("下载")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Z),
                    onClick: (h) => H(a.row)
                  }, {
                    default: t(() => e[12] || (e[12] = [
                      d("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [D, n(k)]
          ]),
          l(Q, {
            "current-page": r.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => r.value.pageNo = a),
            "page-size": r.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => r.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: p,
            total: r.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(W, {
          modelValue: n(m),
          "onUpdate:modelValue": e[5] || (e[5] = (a) => A(m) ? m.value = a : m = a),
          title: n(R),
          width: "600px",
          draggable: ""
        }, {
          footer: t(() => [
            f("span", pe, [
              l(i, {
                type: "primary",
                onClick: G
              }, {
                default: t(() => e[15] || (e[15] = [
                  d("确 定")
                ])),
                _: 1
              }),
              l(i, {
                onClick: e[4] || (e[4] = (a) => {
                  A(m) ? m.value = !1 : m = !1, V();
                })
              }, {
                default: t(() => e[16] || (e[16] = [
                  d("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            f("div", null, [
              l(E, {
                inline: !0,
                model: w.value,
                class: "demo-form-inline",
                ref_key: "addSearchFormRef",
                ref: g
              }, {
                default: t(() => [
                  l(_, { label: "表名称" }, {
                    default: t(() => [
                      l(T, {
                        modelValue: w.value.tableName,
                        "onUpdate:modelValue": e[3] || (e[3] = (a) => w.value.tableName = a),
                        placeholder: "请输入表名称",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  l(_, null, {
                    default: t(() => [
                      l(i, {
                        type: "primary",
                        onClick: S,
                        icon: n(F)
                      }, {
                        default: t(() => e[13] || (e[13] = [
                          d("查询")
                        ])),
                        _: 1
                      }, 8, ["icon"]),
                      l(i, {
                        icon: n(y),
                        onClick: V
                      }, {
                        default: t(() => e[14] || (e[14] = [
                          d("重置")
                        ])),
                        _: 1
                      }, 8, ["icon"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              U((C(), L(B, {
                data: n(z),
                style: { width: "100%", height: "100%" },
                "row-key": "id",
                ref_key: "multipleTableRef",
                ref: v,
                "max-height": "260"
              }, {
                default: t(() => [
                  l(c, {
                    type: "selection",
                    width: "55"
                  }),
                  l(c, {
                    prop: "name",
                    label: "表名称",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }),
                  l(c, {
                    prop: "comment",
                    label: "表描述",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [D, n(b)]
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  ke as default
};
