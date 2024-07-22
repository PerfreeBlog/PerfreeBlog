import { s as E, r as y, u as J, e as K, f as B, d as O } from "./lib/index.js";
import { p as Q, a as W, b as X, d as Y, t as Z } from "./lib/tabs.js";
const u = window.Vue.resolveComponent, e = window.Vue.createVNode, l = window.Vue.withCtx, a = window.Vue.unref, d = window.Vue.createTextVNode, p = window.Vue.createElementVNode, ee = window.Vue.toDisplayString, le = window.Vue.resolveDirective, C = window.Vue.openBlock, U = window.Vue.createBlock, $ = window.Vue.withDirectives, L = window.Vue.isRef, te = window.Vue.createElementBlock, ae = { class: "page" }, oe = { class: "search-box" }, ne = { class: "right-tool" }, ie = { class: "table-box" }, de = { class: "dialog-footer" }, re = window.ElementPlus.ElMessage, r = window.Vue.ref, se = window.VueRouter.useRouter, pe = {
  __name: "CodegenView",
  setup(ue) {
    const s = r({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      tableName: ""
    }), P = r(), f = r({
      tableName: ""
    });
    se();
    const g = r(), v = r();
    let N = r([]), R = r([]), b = r(!1), h = r(!1), c = r(!1), S = r("");
    function _() {
      h.value = !0, W(s.value).then((o) => {
        h.value = !1, N.value = o.data.list, s.value.total = o.data.total;
      });
    }
    function A() {
      k(), S.value = "导入表", c.value = !0, z();
    }
    function z() {
      b.value = !0, X(f.value).then((o) => {
        R.value = o.data, b.value = !1;
      });
    }
    function k() {
      f.value = {
        tableName: ""
      }, g.value && g.value.resetFields();
    }
    function M() {
      if (v.value.getSelectionRows().length <= 0) {
        re.error("至少选择一张表!");
        return;
      }
      let o = {
        tableNames: []
      };
      v.value.getSelectionRows().forEach((n) => {
        o.tableNames.push(n.name);
      }), Y(o).then((n) => {
        _(), c.value = !1;
      });
    }
    function j(o) {
      Z(`代码生成-配置[${o.tableName}]`, "/admin/codegen/editConfig/" + o.id, "");
    }
    return _(), (o, n) => {
      const T = u("el-input"), w = u("el-form-item"), i = u("el-button"), F = u("el-form"), G = u("el-col"), I = u("el-row"), m = u("el-table-column"), D = u("el-table"), q = u("el-pagination"), H = u("el-dialog"), x = le("loading");
      return C(), te("div", ae, [
        p("div", oe, [
          e(F, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: P
          }, {
            default: l(() => [
              e(w, { label: "表名称" }, {
                default: l(() => [
                  e(T, {
                    modelValue: s.value.tableName,
                    "onUpdate:modelValue": n[0] || (n[0] = (t) => s.value.tableName = t),
                    placeholder: "请输入表名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(w, null, {
                default: l(() => [
                  e(i, {
                    type: "primary",
                    onClick: _,
                    icon: a(E)
                  }, {
                    default: l(() => [
                      d("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  e(i, {
                    icon: a(y),
                    onClick: o.resetSearchForm
                  }, {
                    default: l(() => [
                      d("重置")
                    ]),
                    _: 1
                  }, 8, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        e(I, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            e(G, { span: 1.5 }, {
              default: l(() => [
                e(i, {
                  icon: a(J),
                  type: "primary",
                  plain: "",
                  onClick: A
                }, {
                  default: l(() => [
                    d("导入表")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            p("div", ne, [
              e(i, {
                icon: a(y),
                circle: "",
                onClick: _
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        p("div", ie, [
          $((C(), U(D, {
            data: a(N),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              e(m, {
                prop: "tableName",
                label: "表名称",
                "min-width": "150"
              }),
              e(m, {
                prop: "tableComment",
                label: "表描述",
                "min-width": "150"
              }),
              e(m, {
                prop: "className",
                label: "类名称",
                "min-width": "150"
              }),
              e(m, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: l((t) => [
                  p("span", null, ee(a(Q)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              e(m, {
                label: "操作",
                width: "280",
                fixed: "right"
              }, {
                default: l((t) => [
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(K),
                    onClick: (V) => o.handleUpdate(t.row)
                  }, {
                    default: l(() => [
                      d("预览")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(B),
                    onClick: (V) => j(t.row)
                  }, {
                    default: l(() => [
                      d("配置")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(B),
                    onClick: (V) => o.handleRoleMenu(t.row)
                  }, {
                    default: l(() => [
                      d("下载")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(O),
                    onClick: (V) => o.handleDelete(t.row)
                  }, {
                    default: l(() => [
                      d("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [x, a(h)]
          ]),
          e(q, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": n[1] || (n[1] = (t) => s.value.pageNo = t),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": n[2] || (n[2] = (t) => s.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: _,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        e(H, {
          modelValue: a(c),
          "onUpdate:modelValue": n[5] || (n[5] = (t) => L(c) ? c.value = t : c = t),
          title: a(S),
          width: "600px",
          draggable: ""
        }, {
          footer: l(() => [
            p("span", de, [
              e(i, {
                type: "primary",
                onClick: M
              }, {
                default: l(() => [
                  d("确 定")
                ]),
                _: 1
              }),
              e(i, {
                onClick: n[4] || (n[4] = (t) => {
                  L(c) ? c.value = !1 : c = !1, k();
                })
              }, {
                default: l(() => [
                  d("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            p("div", null, [
              e(F, {
                inline: !0,
                model: f.value,
                class: "demo-form-inline",
                ref_key: "addSearchFormRef",
                ref: g
              }, {
                default: l(() => [
                  e(w, { label: "表名称" }, {
                    default: l(() => [
                      e(T, {
                        modelValue: f.value.tableName,
                        "onUpdate:modelValue": n[3] || (n[3] = (t) => f.value.tableName = t),
                        placeholder: "请输入表名称",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  e(w, null, {
                    default: l(() => [
                      e(i, {
                        type: "primary",
                        onClick: z,
                        icon: a(E)
                      }, {
                        default: l(() => [
                          d("查询")
                        ]),
                        _: 1
                      }, 8, ["icon"]),
                      e(i, {
                        icon: a(y),
                        onClick: k
                      }, {
                        default: l(() => [
                          d("重置")
                        ]),
                        _: 1
                      }, 8, ["icon"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              $((C(), U(D, {
                data: a(R),
                style: { width: "100%", height: "100%" },
                "row-key": "id",
                ref_key: "multipleTableRef",
                ref: v,
                "max-height": "260"
              }, {
                default: l(() => [
                  e(m, {
                    type: "selection",
                    width: "55"
                  }),
                  e(m, {
                    prop: "name",
                    label: "表名称",
                    "min-width": "150"
                  }),
                  e(m, {
                    prop: "comment",
                    label: "表描述",
                    "min-width": "150"
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [x, a(b)]
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
  pe as default
};
