import { s as oe, r as P, p as ne, e as ie, f as ue, d as se } from "./lib/@element-plus.js";
function de(t) {
  return axios.get("/api/auth/role/getRoleMenus?id=" + t);
}
function re(t) {
  return axios.post("/api/auth/role/assignRoleMenu", t);
}
function ce(t) {
  return axios.post("/api/auth/menu/list", t);
}
const pe = window.Pinia.defineStore;
pe({
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
    setMenuInit(t) {
      this.menuInit = t;
    },
    setMenuList(t) {
      this.menuList = t;
    },
    setCachedViews(t) {
      this.cachedViews = t;
    }
  },
  persist: {
    enabled: !1
  }
});
function me(t, w) {
  if (arguments.length === 0 || !t)
    return null;
  const _ = w || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof t == "object" ? i = t : (typeof t == "string" && /^[0-9]+$/.test(t) ? t = parseInt(t) : typeof t == "string" && (t = t.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), i = new Date(t));
  const u = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return _.replace(/{([ymdhisa])+}/g, (k, s) => {
    let m = u[s];
    return s === "a" ? ["日", "一", "二", "三", "四", "五", "六"][m] : (k.length > 0 && m < 10 && (m = "0" + m), m || 0);
  });
}
function fe(t, w, _, i, u) {
  w = w || "id", _ = _ || "parentId", u = u || Math.min.apply(Math, t.map((s) => s[_])) || 0;
  const r = JSON.parse(JSON.stringify(t)), k = r.filter((s) => {
    let m = r.filter((C) => s[w] === C[_]);
    return m.length > 0 && (s.children = m), s[_] === u;
  });
  return k !== "" ? k : t;
}
function ve(t) {
  return axios.post("/api/auth/role/page", t);
}
function ge(t) {
  return axios.get("/api/auth/role/get?id=" + t);
}
function _e(t) {
  return axios.post("/api/auth/role/addOrUpdate", t);
}
function he(t) {
  return axios.delete("/api/auth/role/del?id=" + t);
}
const p = window.Vue.resolveComponent, l = window.Vue.createVNode, o = window.Vue.withCtx, d = window.Vue.unref, g = window.Vue.createTextVNode, x = window.Vue.createElementVNode, we = window.Vue.toDisplayString, Ve = window.Vue.resolveDirective, $ = window.Vue.openBlock, be = window.Vue.createBlock, I = window.Vue.withDirectives, E = window.Vue.isRef, xe = window.Vue.createElementBlock, ye = { class: "page" }, ke = { class: "search-box" }, Ce = { class: "right-tool" }, Me = { class: "table-box" }, Re = { style: { width: "100%", border: "1px solid rgb(228 231 237)", padding: "5px" } }, Ae = { class: "dialog-footer" }, Fe = { class: "dialog-footer" }, y = window.ElementPlus.ElMessage, Ee = window.ElementPlus.ElMessageBox, De = window.Vue.reactive, c = window.Vue.ref, Te = {
  __name: "RoleView",
  setup(t) {
    let w = c([]);
    const _ = {
      children: "children",
      label: "name"
    }, i = c({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    }), u = c({
      id: "",
      name: "",
      code: "",
      expand: !1,
      selectAll: !1
    }), r = c({
      id: "",
      name: "",
      code: "",
      description: ""
    }), k = De({
      name: [{ required: !0, message: "请输入角色名称", trigger: "blur" }],
      code: [{ required: !0, message: "请输入角色编码", trigger: "blur" }]
    }), s = c(), m = c(), C = c(), D = c();
    let h = c(!1), v = c(!1), R = c(""), N = c([]), U = c(!1), T = c(!1);
    function K() {
      C.value.validate((n) => {
        n && _e(r.value).then((e) => {
          e.code === 200 ? (y.success("操作成功"), v.value = !1, F(), M()) : y.error(e.msg);
        });
      });
    }
    function q() {
      F(), R.value = "添加角色", v.value = !0;
    }
    function H(n) {
      F(), R.value = "修改角色", v.value = !0, ge(n.id).then((e) => {
        r.value = e.data;
      });
    }
    function J(n) {
      Ee.confirm("确定要删除[" + n.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        he(n.id).then((e) => {
          e.code === 200 && e.data ? (y.success("删除成功"), M()) : y.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function M() {
      U.value = !0, ve(i.value).then((n) => {
        N.value = n.data.list, i.value.total = n.data.total, U.value = !1;
      });
    }
    function G() {
      i.value = {
        name: ""
      }, m.value.resetFields();
    }
    function F() {
      r.value = {
        id: "",
        name: "",
        code: "",
        description: ""
      }, C.value && C.value.resetFields();
    }
    function S() {
      u.value = {
        id: "",
        name: "",
        code: "",
        expand: !1,
        selectAll: !1
      }, D.value && D.value.resetFields();
    }
    function Y(n) {
      if (n.code === "admin") {
        y.warning("admin角色默认拥有所有权限,不可修改");
        return;
      }
      S(), h.value = !0, u.value.name = n.name, u.value.code = n.code, u.value.id = n.id, R.value = "菜单权限", T.value = !0, ce({}).then((e) => {
        w.value = fe(e.data, "id", "pid", "children", "-1"), de(n.id).then((V) => {
          s.value.setCheckedKeys(V.data), T.value = !1;
        });
      });
    }
    function Q() {
      u.value.expand ? Object.values(s.value.store.nodesMap).forEach((n) => n.expand()) : Object.values(s.value.store.nodesMap).forEach((n) => n.collapse());
    }
    function W() {
      u.value.selectAll ? Object.values(s.value.store.nodesMap).forEach((n) => {
        n.checked = !0;
      }) : Object.values(s.value.store.nodesMap).forEach((n) => {
        n.checked = !1;
      });
    }
    function X() {
      let n = {
        menuIds: [...s.value.getCheckedKeys(), ...s.value.getHalfCheckedKeys()],
        roleId: u.value.id
      };
      re(n).then((e) => {
        e.code === 200 && e.data ? (y.success("操作成功"), h.value = !1, S()) : y.error(e.msg);
      });
    }
    return M(), (n, e) => {
      const V = p("el-input"), b = p("el-form-item"), f = p("el-button"), z = p("el-form"), Z = p("el-col"), ee = p("el-row"), A = p("el-table-column"), le = p("el-table"), te = p("el-pagination"), B = p("el-checkbox"), ae = p("el-tree"), O = p("el-dialog"), L = Ve("loading");
      return $(), xe("div", ye, [
        x("div", ke, [
          l(z, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: o(() => [
              l(b, { label: "角色名称" }, {
                default: o(() => [
                  l(V, {
                    modelValue: i.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => i.value.name = a),
                    placeholder: "请输入角色名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(b, null, {
                default: o(() => [
                  l(f, {
                    type: "primary",
                    onClick: M,
                    icon: d(oe)
                  }, {
                    default: o(() => [
                      g("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  l(f, {
                    icon: d(P),
                    onClick: G
                  }, {
                    default: o(() => [
                      g("重置")
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
        l(ee, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            l(Z, { span: 1.5 }, {
              default: o(() => [
                l(f, {
                  icon: d(ne),
                  type: "primary",
                  plain: "",
                  onClick: q
                }, {
                  default: o(() => [
                    g("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            x("div", Ce, [
              l(f, {
                icon: d(P),
                circle: "",
                onClick: M
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        x("div", Me, [
          I(($(), be(le, {
            data: d(N),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              l(A, {
                prop: "name",
                label: "角色名称",
                "min-width": "150"
              }),
              l(A, {
                prop: "code",
                label: "角色编码",
                "min-width": "150"
              }),
              l(A, {
                prop: "description",
                label: "描述",
                "min-width": "240"
              }),
              l(A, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((a) => [
                  x("span", null, we(d(me)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(A, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: o((a) => [
                  l(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(ie),
                    onClick: (j) => H(a.row)
                  }, {
                    default: o(() => [
                      g("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(ue),
                    onClick: (j) => Y(a.row)
                  }, {
                    default: o(() => [
                      g("菜单权限 ")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(se),
                    onClick: (j) => J(a.row)
                  }, {
                    default: o(() => [
                      g("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [L, d(U)]
          ]),
          l(te, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => i.value.pageNo = a),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => i.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: M,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(O, {
          modelValue: d(h),
          "onUpdate:modelValue": e[8] || (e[8] = (a) => E(h) ? h.value = a : h = a),
          title: d(R),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            x("span", Ae, [
              l(f, {
                type: "primary",
                onClick: X
              }, {
                default: o(() => [
                  g("确 定")
                ]),
                _: 1
              }),
              l(f, {
                onClick: e[7] || (e[7] = (a) => {
                  E(h) ? h.value = !1 : h = !1, S();
                })
              }, {
                default: o(() => [
                  g("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "menuFormRef",
              ref: D,
              model: u.value,
              "label-width": "80px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: o(() => [
                l(b, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    l(V, {
                      modelValue: u.value.name,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => u.value.name = a),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(b, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: o(() => [
                    l(V, {
                      modelValue: u.value.code,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => u.value.code = a),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(b, {
                  label: "菜单权限",
                  prop: "code"
                }, {
                  default: o(() => [
                    l(B, {
                      modelValue: u.value.expand,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => u.value.expand = a),
                      label: "展开/折叠",
                      onChange: Q
                    }, null, 8, ["modelValue"]),
                    l(B, {
                      modelValue: u.value.selectAll,
                      "onUpdate:modelValue": e[6] || (e[6] = (a) => u.value.selectAll = a),
                      label: "全选/全不选",
                      onChange: W
                    }, null, 8, ["modelValue"]),
                    x("div", Re, [
                      I(l(ae, {
                        props: _,
                        data: d(w),
                        "node-key": "id",
                        "show-checkbox": "",
                        ref_key: "menuTree",
                        ref: s,
                        "check-strictly": !0
                      }, null, 8, ["data"]), [
                        [L, d(T)]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l(O, {
          modelValue: d(v),
          "onUpdate:modelValue": e[13] || (e[13] = (a) => E(v) ? v.value = a : v = a),
          title: d(R),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            x("span", Fe, [
              l(f, {
                type: "primary",
                onClick: K
              }, {
                default: o(() => [
                  g("确 定")
                ]),
                _: 1
              }),
              l(f, {
                onClick: e[12] || (e[12] = (a) => {
                  E(v) ? v.value = !1 : v = !1, F();
                })
              }, {
                default: o(() => [
                  g("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "addFormRef",
              ref: C,
              model: r.value,
              "label-width": "80px",
              "status-icon": "",
              rules: k
            }, {
              default: o(() => [
                l(b, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    l(V, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": e[9] || (e[9] = (a) => r.value.name = a),
                      placeholder: "请输入角色名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(b, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: o(() => [
                    l(V, {
                      modelValue: r.value.code,
                      "onUpdate:modelValue": e[10] || (e[10] = (a) => r.value.code = a),
                      placeholder: "请输入角色编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(b, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: o(() => [
                    l(V, {
                      modelValue: r.value.description,
                      "onUpdate:modelValue": e[11] || (e[11] = (a) => r.value.description = a),
                      placeholder: "请输入角色描述",
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
  Te as default
};
