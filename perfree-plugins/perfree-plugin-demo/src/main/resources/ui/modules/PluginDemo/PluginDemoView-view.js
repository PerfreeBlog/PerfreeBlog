import { s as J, r as N, d as K, p as Q, e as W, a as X } from "./lib/@element-plus.js";
function Z(e, a) {
  if (arguments.length === 0 || !e)
    return null;
  const s = a || "{y}-{m}-{d} {h}:{i}:{s}";
  let r;
  typeof e == "object" ? r = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), r = new Date(e));
  const z = {
    y: r.getFullYear(),
    m: r.getMonth() + 1,
    d: r.getDate(),
    h: r.getHours(),
    i: r.getMinutes(),
    s: r.getSeconds(),
    a: r.getDay()
  };
  return s.replace(/{([ymdhisa])+}/g, (u, V) => {
    let m = z[V];
    return V === "a" ? ["日", "一", "二", "三", "四", "五", "六"][m] : (u.length > 0 && m < 10 && (m = "0" + m), m || 0);
  });
}
function ee(e) {
  return axios.post("/api/auth/pluginDemo/page", e);
}
function le(e) {
  return axios.post("/api/auth/pluginDemo/add", e);
}
function te(e) {
  return axios.post("/api/auth/pluginDemo/update", e);
}
function oe(e) {
  return axios.delete("/api/auth/pluginDemo/del?id=" + e);
}
function ne(e) {
  return axios.get("/api/auth/pluginDemo/get?id=" + e);
}
function ae(e) {
  return axios.post("/api/auth/pluginDemo/export", e, { responseType: "blob" });
}
const c = window.Vue.resolveComponent, t = window.Vue.createVNode, o = window.Vue.withCtx, d = window.Vue.unref, _ = window.Vue.createTextVNode, S = window.Vue.resolveDirective, w = window.Vue.openBlock, b = window.Vue.createBlock, D = window.Vue.withDirectives, F = window.Vue.createElementVNode, ie = window.Vue.toDisplayString, R = window.Vue.isRef, ue = window.Vue.createElementBlock, se = { class: "page" }, de = { class: "search-box" }, re = { class: "right-tool" }, ce = { class: "table-box" }, pe = { class: "dialog-footer" }, h = window.ElementPlus.ElMessage, me = window.ElementPlus.ElMessageBox, fe = window.Vue.reactive, v = window.Vue.ref, _e = {
  __name: "PluginDemoView",
  setup(e) {
    const a = v({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      msg: null
    }), s = v({
      id: null,
      name: null,
      msg: null
    }), r = fe({}), z = v(), y = v();
    let u = v(!1), V = v(""), m = v([]), x = v(!1);
    function T() {
      y.value.validate((i) => {
        i && (s.value.id ? te(s.value).then((l) => {
          l.code === 200 ? (h.success("操作成功"), u.value = !1, k(), f()) : h.error(l.msg);
        }) : le(s.value).then((l) => {
          l.code === 200 ? (h.success("操作成功"), u.value = !1, k(), f()) : h.error(l.msg);
        }));
      });
    }
    function U() {
      k(), V.value = "添加测试", u.value = !0;
    }
    function P(i) {
      k(), V.value = "修改测试", u.value = !0, ne(i.id).then((l) => {
        s.value = l.data;
      });
    }
    function M(i) {
      let l = Object.keys(i);
      me.confirm("确定要删除[" + i[l[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        oe(i.id).then((g) => {
          g.code === 200 && g.data ? (h.success("删除成功"), f()) : h.error(g.msg);
        });
      }).catch(() => {
      });
    }
    function f() {
      x.value = !0, ee(a.value).then((i) => {
        m.value = i.data.list, a.value.total = i.data.total, x.value = !1;
      });
    }
    function j() {
      a.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        msg: null
      }, z.value.resetFields(), f();
    }
    function k() {
      s.value = {
        id: null,
        name: null,
        msg: null
      }, y.value && y.value.resetFields();
    }
    function $() {
      x.value = !0, ae(a.value).then((i) => {
        window.download.excel(i, "测试数据.xlsx"), x.value = !1;
      }).catch((i) => {
        h.error("导出失败"), x.value = !1;
      });
    }
    return f(), (i, l) => {
      const g = c("el-input"), C = c("el-form-item"), p = c("el-button"), B = c("el-form"), O = c("el-col"), q = c("el-row"), A = c("el-table-column"), G = c("el-table"), H = c("el-pagination"), I = c("el-dialog"), E = S("hasPermission"), L = S("loading");
      return w(), ue("div", se, [
        F("div", de, [
          t(B, {
            inline: !0,
            model: a.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: o(() => [
              t(C, { label: "名称" }, {
                default: o(() => [
                  t(g, {
                    modelValue: a.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (n) => a.value.name = n),
                    placeholder: "请输入名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(C, { label: "信息" }, {
                default: o(() => [
                  t(g, {
                    modelValue: a.value.msg,
                    "onUpdate:modelValue": l[1] || (l[1] = (n) => a.value.msg = n),
                    placeholder: "请输入信息",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(C, null, {
                default: o(() => [
                  D((w(), b(p, {
                    type: "primary",
                    onClick: f,
                    icon: d(J)
                  }, {
                    default: o(() => [
                      _("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [E, ["admin:pluginDemo:query"]]
                  ]),
                  t(p, {
                    icon: d(N),
                    onClick: j
                  }, {
                    default: o(() => [
                      _("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  D((w(), b(p, {
                    icon: d(K),
                    onClick: $
                  }, {
                    default: o(() => [
                      _("导出")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [E, ["admin:pluginDemo:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        t(q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            t(O, { span: 1.5 }, {
              default: o(() => [
                D((w(), b(p, {
                  icon: d(Q),
                  type: "primary",
                  plain: "",
                  onClick: U
                }, {
                  default: o(() => [
                    _("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [E, ["admin:pluginDemo:create"]]
                ])
              ]),
              _: 1
            }),
            F("div", re, [
              t(p, {
                icon: d(N),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        F("div", ce, [
          D((w(), b(G, {
            data: d(m),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              t(A, {
                prop: "name",
                label: "名称",
                "min-width": "150"
              }),
              t(A, {
                prop: "msg",
                label: "信息",
                "min-width": "150"
              }),
              t(A, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((n) => [
                  F("span", null, ie(d(Z)(n.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(A, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: o((n) => [
                  D((w(), b(p, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(W),
                    onClick: (Y) => P(n.row)
                  }, {
                    default: o(() => [
                      _("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:pluginDemo:update"]]
                  ]),
                  D((w(), b(p, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(X),
                    onClick: (Y) => M(n.row)
                  }, {
                    default: o(() => [
                      _("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:pluginDemo:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [L, d(x)]
          ]),
          t(H, {
            "current-page": a.value.pageNo,
            "onUpdate:currentPage": l[2] || (l[2] = (n) => a.value.pageNo = n),
            "page-size": a.value.pageSize,
            "onUpdate:pageSize": l[3] || (l[3] = (n) => a.value.pageSize = n),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: f,
            total: a.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(I, {
          modelValue: d(u),
          "onUpdate:modelValue": l[7] || (l[7] = (n) => R(u) ? u.value = n : u = n),
          title: d(V),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            F("span", pe, [
              t(p, {
                type: "primary",
                onClick: T
              }, {
                default: o(() => [
                  _("确 定")
                ]),
                _: 1
              }),
              t(p, {
                onClick: l[6] || (l[6] = (n) => {
                  R(u) ? u.value = !1 : u = !1, k();
                })
              }, {
                default: o(() => [
                  _("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(B, {
              ref_key: "addFormRef",
              ref: y,
              model: s.value,
              "label-width": "80px",
              "status-icon": "",
              rules: r
            }, {
              default: o(() => [
                t(C, {
                  label: "名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    t(g, {
                      modelValue: s.value.name,
                      "onUpdate:modelValue": l[4] || (l[4] = (n) => s.value.name = n),
                      placeholder: "请输入名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(C, {
                  label: "信息",
                  prop: "msg"
                }, {
                  default: o(() => [
                    t(g, {
                      modelValue: s.value.msg,
                      "onUpdate:modelValue": l[5] || (l[5] = (n) => s.value.msg = n),
                      placeholder: "请输入信息"
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
  _e as default
};
