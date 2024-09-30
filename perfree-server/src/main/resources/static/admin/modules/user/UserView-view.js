import { s as ve, r as W, d as be, p as Ve, e as _e, f as he, a as xe, b as ye } from "./lib/@element-plus.js";
function ke(a) {
  return axios.post("/api/auth/user/page", a);
}
function Ne(a) {
  return axios.get("/api/auth/user/get?id=" + a);
}
function Ue(a) {
  return axios.post("/api/auth/user/add", a);
}
function Ce(a) {
  return axios.post("/api/auth/user/update", a);
}
function Re(a) {
  return axios.delete("/api/auth/user/del?id=" + a);
}
function Le(a) {
  return axios.post("/api/auth/user/updateUserRole", a);
}
function Se(a) {
  return axios.get("/api/auth/user/getUserRole?id=" + a);
}
function Ee(a) {
  return axios.post("/api/auth/user/resetPassword", a);
}
function Fe(a) {
  return axios.post("/api/auth/user/export", a, { responseType: "blob" });
}
function Ae(a) {
  return axios.post("/api/auth/user/updateStatus", a);
}
function De() {
  return axios.get("/api/auth/role/listAll");
}
const Te = window.Pinia.defineStore;
Te({
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
    setMenuInit(a) {
      this.menuInit = a;
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
function Y(a, s) {
  if (arguments.length === 0 || !a)
    return null;
  const i = s || "{y}-{m}-{d} {h}:{i}:{s}";
  let u;
  typeof a == "object" ? u = a : (typeof a == "string" && /^[0-9]+$/.test(a) ? a = parseInt(a) : typeof a == "string" && (a = a.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof a == "number" && a.toString().length === 10 && (a = a * 1e3), u = new Date(a));
  const R = {
    y: u.getFullYear(),
    m: u.getMonth() + 1,
    d: u.getDate(),
    h: u.getHours(),
    i: u.getMinutes(),
    s: u.getSeconds(),
    a: u.getDay()
  };
  return i.replace(/{([ymdhisa])+}/g, (L, N) => {
    let p = R[N];
    return N === "a" ? ["日", "一", "二", "三", "四", "五", "六"][p] : (L.length > 0 && p < 10 && (p = "0" + p), p || 0);
  });
}
function Z(a) {
  return window.document.body.clientWidth < a ? window.document.body.clientWidth : a;
}
const H = {
  SEX: "SEX"
};
function Be(a, s) {
  if (s === "" || s === null || s === void 0)
    return null;
  if (s = s.toString(), !window.pinia || !window.pinia.state._value.dictList)
    return console.error("pinia or pinia dictList not found"), null;
  let u = window.pinia.state._value.dictList.dictList.filter((R) => R.parentDictType === a && R.dictValue === s);
  return u.length > 0 ? u[0] : (console.error("未查询到数据字典", a, s), null);
}
function ze(a) {
  return !window.pinia || !window.pinia.state._value.dictList ? (console.error("pinia or pinia dictList not found"), null) : window.pinia.state._value.dictList.dictList.filter((i) => i.parentDictType === a);
}
const w = window.Vue.resolveComponent, l = window.Vue.createVNode, o = window.Vue.withCtx, r = window.Vue.unref, g = window.Vue.createTextVNode, G = window.Vue.resolveDirective, c = window.Vue.openBlock, V = window.Vue.createBlock, k = window.Vue.withDirectives, C = window.Vue.createElementVNode, P = window.Vue.toDisplayString, Pe = window.Vue.withModifiers, J = window.Vue.renderList, K = window.Vue.Fragment, M = window.Vue.createElementBlock, A = window.Vue.isRef, Me = window.Vue.createCommentVNode, $e = { class: "page" }, Ie = { class: "search-box" }, qe = { class: "right-tool" }, Xe = { class: "table-box" }, je = { class: "dialog-footer" }, Oe = { class: "dialog-footer" }, v = window.ElementPlus.ElMessage, $ = window.ElementPlus.ElMessageBox, Q = window.Vue.h, We = window.Vue.reactive, b = window.Vue.ref, Ze = {
  __name: "UserView",
  setup(a) {
    const s = b({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      userName: "",
      account: ""
    }), i = b({
      id: "",
      userName: "",
      account: "",
      password: "",
      email: "",
      website: "",
      sex: void 0,
      remark: "",
      mobile: ""
    }), u = b({
      id: "",
      userName: "",
      account: "",
      roles: ""
    }), R = We({
      userName: [
        { required: !0, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 20, message: "昵称必须在2-20字之间", trigger: "blur" }
      ],
      account: [
        { required: !0, message: "请输入账户", trigger: "blur" },
        { min: 5, max: 16, message: "账户必须在5-16字之间", trigger: "blur" }
      ],
      password: [
        { required: !0, message: "请输入密码", trigger: "blur" },
        { min: 5, max: 16, message: "密码必须在5-16字之间", trigger: "blur" }
      ],
      email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
      mobile: [{ pattern: /^1[3|456789][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
      website: [{
        pattern: /^(https?:\/\/)?((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/,
        message: "请输入正确的网址",
        trigger: "blur"
      }]
    }), D = b(), L = b(), N = b();
    let p = b(!1), x = b(!1), E = b(""), I = b([]), S = b(!1), T = b(!1), q = b([]);
    function ee(n) {
      let e = n.status === 0 ? "启用" : "禁用";
      $({
        title: "提示",
        message: Q("p", null, [
          `确定要修改[${n.userName}]为`,
          Q("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let d = {
          id: n.id,
          status: n.status
        };
        Ae(d).then((m) => {
          m.code === 200 ? (_(), v.success("修改成功")) : (n.status = n.status === 0 ? 1 : 0, v.error("修改失败"));
        }).catch(() => {
          n.status = n.status === 0 ? 1 : 0;
        });
      }).catch(() => {
        n.status = n.status === 0 ? 1 : 0;
      });
    }
    function te(n) {
      $.prompt("请输入[" + n.userName + "]的新密码", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputValidator: le,
        inputPlaceholder: "请输入新密码",
        inputErrorMessage: "密码必须在5-16字之间"
      }).then(({ value: e }) => {
        Ee({ id: n.id, password: e }).then((d) => {
          d.code === 200 ? v.success("重置成功") : v.error(d.msg);
        });
      }).catch(() => {
      });
    }
    function le(n) {
      return !n || n.length < 4 ? !1 : n.length <= 16;
    }
    function ae() {
      N.value.validate((n) => {
        n && Le(u.value).then((e) => {
          e.code === 200 ? (v.success("操作成功"), x.value = !1, B(), _()) : v.error(e.msg);
        });
      });
    }
    function B() {
      u.value = {
        id: "",
        userName: "",
        account: "",
        roles: ""
      }, N.value && N.value.resetFields();
    }
    function oe() {
      L.value.validate((n) => {
        n && (i.value.id ? (i.value.password = null, Ce(i.value).then((e) => {
          e.code === 200 ? (v.success("更新成功"), p.value = !1, F(), _()) : v.error(e.msg);
        })) : Ue(i.value).then((e) => {
          e.code === 200 ? (v.success("添加成功"), p.value = !1, F(), _()) : v.error(e.msg);
        }));
      });
    }
    function ne() {
      F(), E.value = "添加用户", p.value = !0, T.value = !1;
    }
    function ie(n) {
      F(), E.value = "修改用户", p.value = !0, T.value = !0, Ne(n.id).then((e) => {
        i.value = e.data, i.value.sex = i.value.sex.toString(), i.value.password = "";
      });
    }
    function ue(n) {
      $.confirm("确定要删除[" + n.userName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Re(n.id).then((e) => {
          e.code === 200 && e.data ? (v.success("删除成功"), _()) : v.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function _() {
      S.value = !0, ke(s.value).then((n) => {
        I.value = n.data.list, s.value.total = n.data.total, S.value = !1;
      });
    }
    function se() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        userName: "",
        account: ""
      }, D.value.resetFields(), _();
    }
    function F() {
      i.value = {
        id: "",
        userName: "",
        account: "",
        password: "",
        email: "",
        website: "",
        sex: void 0,
        remark: "",
        mobile: ""
      }, L.value && L.value.resetFields();
    }
    function re(n) {
      B(), u.value.id = n.id, u.value.userName = n.userName, u.value.account = n.account, De().then((e) => {
        q.value = e.data, Se(n.id).then((d) => {
          u.value.roles = d.data.roles;
        });
      }), E.value = "分配角色", x.value = !0;
    }
    function de() {
      S.value = !0, Fe(s.value).then((n) => {
        window.download.excel(n, "用户数据.xlsx"), S.value = !1;
      }).catch((n) => {
        v.error("导出失败"), S.value = !1;
      });
    }
    return _(), (n, e) => {
      const d = w("el-input"), m = w("el-form-item"), f = w("el-button"), z = w("el-form"), pe = w("el-col"), me = w("el-row"), h = w("el-table-column"), ce = w("el-switch"), fe = w("el-table"), we = w("el-pagination"), X = w("el-option"), j = w("el-select"), O = w("el-dialog"), U = G("hasPermission"), ge = G("loading");
      return c(), M("div", $e, [
        C("div", Ie, [
          l(z, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: D
          }, {
            default: o(() => [
              l(m, { label: "昵称" }, {
                default: o(() => [
                  l(d, {
                    modelValue: s.value.userName,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => s.value.userName = t),
                    placeholder: "请输入昵称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(m, { label: "账户" }, {
                default: o(() => [
                  l(d, {
                    modelValue: s.value.account,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => s.value.account = t),
                    placeholder: "请输入账户",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(m, null, {
                default: o(() => [
                  k((c(), V(f, {
                    type: "primary",
                    onClick: _,
                    icon: r(ve)
                  }, {
                    default: o(() => e[19] || (e[19] = [
                      g("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:user:query"]]
                  ]),
                  l(f, {
                    icon: r(W),
                    onClick: se
                  }, {
                    default: o(() => e[20] || (e[20] = [
                      g("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  k((c(), V(f, {
                    icon: r(be),
                    onClick: de
                  }, {
                    default: o(() => e[21] || (e[21] = [
                      g("导出")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:user:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        l(me, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            l(pe, { span: 1.5 }, {
              default: o(() => [
                k((c(), V(f, {
                  icon: r(Ve),
                  type: "primary",
                  plain: "",
                  onClick: ne
                }, {
                  default: o(() => e[22] || (e[22] = [
                    g("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [U, ["admin:user:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", qe, [
              l(f, {
                icon: r(W),
                circle: "",
                onClick: _
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", Xe, [
          k((c(), V(fe, {
            data: r(I),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              l(h, {
                prop: "userName",
                label: "用户名称",
                "min-width": "100",
                "show-overflow-tooltip": ""
              }),
              l(h, {
                prop: "account",
                label: "账号",
                "min-width": "100",
                "show-overflow-tooltip": ""
              }),
              l(h, {
                prop: "sex",
                label: "性别",
                "min-width": "60"
              }, {
                default: o((t) => {
                  var y;
                  return [
                    g(P((y = r(Be)(r(H).SEX, t.row.sex)) == null ? void 0 : y.dictLabel), 1)
                  ];
                }),
                _: 1
              }),
              l(h, {
                prop: "email",
                label: "邮箱",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(h, {
                prop: "website",
                label: "网站",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(h, {
                prop: "loginIp",
                label: "最后登录ip",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(h, {
                prop: "loginDate",
                label: "最后登录时间",
                "min-width": "180"
              }, {
                default: o((t) => [
                  C("span", null, P(r(Y)(t.row.loginDate)), 1)
                ]),
                _: 1
              }),
              l(h, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: o((t) => [
                  l(ce, {
                    modelValue: t.row.status,
                    "onUpdate:modelValue": (y) => t.row.status = y,
                    "active-value": 0,
                    "inactive-value": 1,
                    "inline-prompt": "",
                    "active-text": "启用",
                    "inactive-text": "禁用",
                    onClick: Pe((y) => ee(t.row), ["prevent"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                ]),
                _: 1
              }),
              l(h, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: o((t) => [
                  C("span", null, P(r(Y)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(h, {
                label: "操作",
                width: "300",
                fixed: "right"
              }, {
                default: o((t) => [
                  k((c(), V(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(_e),
                    onClick: (y) => ie(t.row)
                  }, {
                    default: o(() => e[23] || (e[23] = [
                      g("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:update"]]
                  ]),
                  k((c(), V(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(he),
                    onClick: (y) => re(t.row)
                  }, {
                    default: o(() => e[24] || (e[24] = [
                      g("分配角色")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:configRole"]]
                  ]),
                  k((c(), V(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(xe),
                    onClick: (y) => te(t.row)
                  }, {
                    default: o(() => e[25] || (e[25] = [
                      g("重置密码")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:resetPassword"]]
                  ]),
                  k((c(), V(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(ye),
                    onClick: (y) => ue(t.row)
                  }, {
                    default: o(() => e[26] || (e[26] = [
                      g("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ge, r(S)]
          ]),
          l(we, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => s.value.pageNo = t),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => s.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: _,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(O, {
          modelValue: r(x),
          "onUpdate:modelValue": e[8] || (e[8] = (t) => A(x) ? x.value = t : x = t),
          title: r(E),
          width: r(Z)(600),
          draggable: ""
        }, {
          footer: o(() => [
            C("span", je, [
              l(f, {
                type: "primary",
                onClick: ae
              }, {
                default: o(() => e[27] || (e[27] = [
                  g("确 定")
                ])),
                _: 1
              }),
              l(f, {
                onClick: e[7] || (e[7] = (t) => {
                  A(x) ? x.value = !1 : x = !1, B();
                })
              }, {
                default: o(() => e[28] || (e[28] = [
                  g("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "userRoleFormRef",
              ref: N,
              model: u.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: o(() => [
                l(m, {
                  label: "昵称",
                  prop: "userName"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.userName,
                      "onUpdate:modelValue": e[4] || (e[4] = (t) => u.value.userName = t),
                      disabled: "",
                      placeholder: "请输入昵称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "账户",
                  prop: "account"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.account,
                      "onUpdate:modelValue": e[5] || (e[5] = (t) => u.value.account = t),
                      disabled: "",
                      placeholder: "请输入账户"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "角色",
                  prop: "roles"
                }, {
                  default: o(() => [
                    l(j, {
                      modelValue: u.value.roles,
                      "onUpdate:modelValue": e[6] || (e[6] = (t) => u.value.roles = t),
                      clearable: "",
                      multiple: "",
                      placeholder: "请选择角色",
                      style: { width: "100%" }
                    }, {
                      default: o(() => [
                        (c(!0), M(K, null, J(r(q), (t) => (c(), V(X, {
                          key: t.id,
                          label: t.name,
                          value: t.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"]),
        l(O, {
          modelValue: r(p),
          "onUpdate:modelValue": e[18] || (e[18] = (t) => A(p) ? p.value = t : p = t),
          title: r(E),
          width: r(Z)(600),
          draggable: ""
        }, {
          footer: o(() => [
            C("span", Oe, [
              l(f, {
                type: "primary",
                onClick: oe
              }, {
                default: o(() => e[29] || (e[29] = [
                  g("确 定")
                ])),
                _: 1
              }),
              l(f, {
                onClick: e[17] || (e[17] = (t) => {
                  A(p) ? p.value = !1 : p = !1, F();
                })
              }, {
                default: o(() => e[30] || (e[30] = [
                  g("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "addFormRef",
              ref: L,
              model: i.value,
              "label-width": "60px",
              "status-icon": "",
              rules: R
            }, {
              default: o(() => [
                l(m, {
                  label: "昵称",
                  prop: "userName"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.userName,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => i.value.userName = t),
                      placeholder: "请输入昵称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "账户",
                  prop: "account"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.account,
                      "onUpdate:modelValue": e[10] || (e[10] = (t) => i.value.account = t),
                      placeholder: "请输入账户"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                r(T) ? Me("", !0) : (c(), V(m, {
                  key: 0,
                  label: "密码",
                  prop: "password"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.password,
                      "onUpdate:modelValue": e[11] || (e[11] = (t) => i.value.password = t),
                      type: "password",
                      "show-password": "",
                      placeholder: "请输入密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })),
                l(m, {
                  label: "性别",
                  prop: "sex"
                }, {
                  default: o(() => [
                    l(j, {
                      modelValue: i.value.sex,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => i.value.sex = t),
                      placeholder: "请选择性别",
                      clearable: "",
                      style: { width: "200px" }
                    }, {
                      default: o(() => [
                        (c(!0), M(K, null, J(r(ze)(r(H).SEX), (t) => (c(), V(X, {
                          key: t.dictValue,
                          label: t.dictLabel,
                          value: t.dictValue
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.mobile,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => i.value.mobile = t),
                      placeholder: "请输入手机号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "邮箱",
                  prop: "email"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.email,
                      "onUpdate:modelValue": e[14] || (e[14] = (t) => i.value.email = t),
                      placeholder: "请输入邮箱地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "网站",
                  prop: "website"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.website,
                      "onUpdate:modelValue": e[15] || (e[15] = (t) => i.value.website = t),
                      placeholder: "请输入网站地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(m, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.remark,
                      "onUpdate:modelValue": e[16] || (e[16] = (t) => i.value.remark = t),
                      placeholder: "请输入备注",
                      autosize: { minRows: 3, maxRows: 5 },
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
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  Ze as default
};
