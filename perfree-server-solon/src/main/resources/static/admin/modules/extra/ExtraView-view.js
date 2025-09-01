import { s as G, r as S, p as H, e as Y, d as J } from "./lib/@element-plus.js";
const Q = window.Pinia.defineStore;
Q({
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
    setMenuInit(t) {
      this.menuInit = t;
    },
    setOptionInit(t) {
      this.optionInit = t;
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
function X(t, i) {
  if (arguments.length === 0 || !t)
    return null;
  const n = i || "{y}-{m}-{d} {h}:{i}:{s}";
  let u;
  typeof t == "object" ? u = t : (typeof t == "string" && /^[0-9]+$/.test(t) ? t = parseInt(t) : typeof t == "string" && (t = t.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), u = new Date(t));
  const z = {
    y: u.getFullYear(),
    m: u.getMonth() + 1,
    d: u.getDate(),
    h: u.getHours(),
    i: u.getMinutes(),
    s: u.getSeconds(),
    a: u.getDay()
  };
  return n.replace(/{([ymdhisa])+}/g, (r, x) => {
    let c = z[x];
    return x === "a" ? ["日", "一", "二", "三", "四", "五", "六"][c] : (r.length > 0 && c < 10 && (c = "0" + c), c || 0);
  });
}
function Z(t) {
  return window.document.body.clientWidth < t ? window.document.body.clientWidth : t;
}
function ee(t) {
  return axios.post("/api/auth/extra/page", t);
}
function te(t) {
  return axios.get("/api/auth/extra/get?id=" + t);
}
function ae(t) {
  return axios.post("/api/auth/extra/add", t);
}
function oe(t) {
  return axios.post("/api/auth/extra/update", t);
}
function le(t) {
  return axios.delete("/api/auth/extra/del?id=" + t);
}
const p = window.Vue.resolveComponent, a = window.Vue.createVNode, l = window.Vue.withCtx, s = window.Vue.unref, w = window.Vue.createTextVNode, I = window.Vue.resolveDirective, v = window.Vue.openBlock, D = window.Vue.createBlock, N = window.Vue.withDirectives, C = window.Vue.createElementVNode, ne = window.Vue.toDisplayString, B = window.Vue.isRef, ie = window.Vue.createElementBlock, re = { class: "page" }, se = { class: "search-box" }, ue = { class: "right-tool" }, de = { class: "table-box" }, pe = { class: "dialog-footer" }, h = window.ElementPlus.ElMessage, ce = window.ElementPlus.ElMessageBox, me = window.Vue.reactive, g = window.Vue.ref, ge = {
  __name: "ExtraView",
  setup(t) {
    const i = g({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      extraName: ""
    }), n = g({
      id: "",
      extraName: "",
      extraDescription: "",
      extraKey: "",
      extraData: ""
    }), u = me({
      extraName: [{ required: !0, message: "请输入名称", trigger: "blur" }],
      extraKey: [{ required: !0, message: "请输入key", trigger: "blur" }],
      extraData: [{ required: !0, message: "请输入附加数据值", trigger: "blur" }]
    }), z = g(), V = g();
    let r = g(!1), x = g(""), c = g([]), R = g(!1);
    function M() {
      V.value.validate((d) => {
        d && (n.value.id ? oe(n.value).then((e) => {
          e.code === 200 ? (h.success("操作成功"), r.value = !1, y(), m()) : h.error(e.msg);
        }) : ae(n.value).then((e) => {
          e.code === 200 ? (h.success("操作成功"), r.value = !1, y(), m()) : h.error(e.msg);
        }));
      });
    }
    function U() {
      y(), x.value = "添加附加数据", r.value = !0;
    }
    function A(d) {
      y(), x.value = "修改附加数据", r.value = !0, te(d.id).then((e) => {
        n.value = e.data;
      });
    }
    function T(d) {
      ce.confirm("确定要删除[" + d.extraName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        le(d.id).then((e) => {
          e.code === 200 && e.data ? (h.success("删除成功"), m()) : h.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function m() {
      R.value = !0, ee(i.value).then((d) => {
        c.value = d.data.list, i.value.total = d.data.total, R.value = !1;
      });
    }
    function K() {
      i.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        extraName: ""
      }, z.value.resetFields(), m();
    }
    function y() {
      n.value = {
        id: "",
        extraName: "",
        extraDescription: "",
        extraKey: "",
        extraData: ""
      }, V.value && V.value.resetFields();
    }
    return m(), (d, e) => {
      const b = p("el-input"), _ = p("el-form-item"), f = p("el-button"), F = p("el-form"), P = p("el-col"), L = p("el-row"), k = p("el-table-column"), q = p("el-table"), j = p("el-pagination"), O = p("el-dialog"), E = I("hasPermission"), $ = I("loading");
      return v(), ie("div", re, [
        C("div", se, [
          a(F, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: l(() => [
              a(_, { label: "附加数据名称" }, {
                default: l(() => [
                  a(b, {
                    modelValue: i.value.extraName,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => i.value.extraName = o),
                    placeholder: "请输入附加数据名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(_, null, {
                default: l(() => [
                  N((v(), D(f, {
                    type: "primary",
                    onClick: m,
                    icon: s(G)
                  }, {
                    default: l(() => e[9] || (e[9] = [
                      w("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [E, ["admin:extra:query"]]
                  ]),
                  a(f, {
                    icon: s(S),
                    onClick: K
                  }, {
                    default: l(() => e[10] || (e[10] = [
                      w("重置")
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
        a(L, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            a(P, { span: 1.5 }, {
              default: l(() => [
                N((v(), D(f, {
                  icon: s(H),
                  type: "primary",
                  plain: "",
                  onClick: U
                }, {
                  default: l(() => e[11] || (e[11] = [
                    w("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [E, ["admin:extra:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", ue, [
              a(f, {
                icon: s(S),
                circle: "",
                onClick: m
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", de, [
          N((v(), D(q, {
            data: s(c),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              a(k, {
                prop: "extraName",
                label: "名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              a(k, {
                prop: "extraKey",
                label: "key",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              a(k, {
                prop: "extraDescription",
                label: "描述",
                "min-width": "240",
                "show-overflow-tooltip": ""
              }),
              a(k, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: l((o) => [
                  C("span", null, ne(s(X)(o.row.createTime)), 1)
                ]),
                _: 1
              }),
              a(k, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: l((o) => [
                  N((v(), D(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: s(Y),
                    onClick: (W) => A(o.row)
                  }, {
                    default: l(() => e[12] || (e[12] = [
                      w("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:extra:update"]]
                  ]),
                  N((v(), D(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: s(J),
                    onClick: (W) => T(o.row)
                  }, {
                    default: l(() => e[13] || (e[13] = [
                      w("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:extra:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [$, s(R)]
          ]),
          a(j, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (o) => i.value.pageNo = o),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (o) => i.value.pageSize = o),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: m,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        a(O, {
          modelValue: s(r),
          "onUpdate:modelValue": e[8] || (e[8] = (o) => B(r) ? r.value = o : r = o),
          title: s(x),
          width: s(Z)(600),
          draggable: ""
        }, {
          footer: l(() => [
            C("span", pe, [
              a(f, {
                type: "primary",
                onClick: M
              }, {
                default: l(() => e[14] || (e[14] = [
                  w("确 定")
                ])),
                _: 1
              }),
              a(f, {
                onClick: e[7] || (e[7] = (o) => {
                  B(r) ? r.value = !1 : r = !1, y();
                })
              }, {
                default: l(() => e[15] || (e[15] = [
                  w("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            a(F, {
              ref_key: "addFormRef",
              ref: V,
              model: n.value,
              "label-width": "80px",
              "status-icon": "",
              rules: u
            }, {
              default: l(() => [
                a(_, {
                  label: "名称",
                  prop: "extraName"
                }, {
                  default: l(() => [
                    a(b, {
                      modelValue: n.value.extraName,
                      "onUpdate:modelValue": e[3] || (e[3] = (o) => n.value.extraName = o),
                      placeholder: "请输入名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(_, {
                  label: "key",
                  prop: "extraKey"
                }, {
                  default: l(() => [
                    a(b, {
                      modelValue: n.value.extraKey,
                      "onUpdate:modelValue": e[4] || (e[4] = (o) => n.value.extraKey = o),
                      placeholder: "请输入key"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(_, {
                  label: "描述",
                  prop: "extraDescription"
                }, {
                  default: l(() => [
                    a(b, {
                      modelValue: n.value.extraDescription,
                      "onUpdate:modelValue": e[5] || (e[5] = (o) => n.value.extraDescription = o),
                      placeholder: "请输入描述",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(_, {
                  label: "附加值",
                  prop: "extraData"
                }, {
                  default: l(() => [
                    a(b, {
                      modelValue: n.value.extraData,
                      "onUpdate:modelValue": e[6] || (e[6] = (o) => n.value.extraData = o),
                      placeholder: "请输入附加数据值",
                      autosize: { minRows: 5, maxRows: 10 },
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
  ge as default
};
