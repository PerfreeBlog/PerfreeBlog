import { s as H, r as S, p as O, e as Y, d as J } from "./lib/@element-plus.js";
const Q = window.Pinia.defineStore;
Q({
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
function le(t) {
  return axios.post("/api/auth/extra/update", t);
}
function oe(t) {
  return axios.delete("/api/auth/extra/del?id=" + t);
}
const p = window.Vue.resolveComponent, a = window.Vue.createVNode, o = window.Vue.withCtx, s = window.Vue.unref, w = window.Vue.createTextVNode, B = window.Vue.resolveDirective, v = window.Vue.openBlock, D = window.Vue.createBlock, N = window.Vue.withDirectives, C = window.Vue.createElementVNode, ne = window.Vue.toDisplayString, M = window.Vue.isRef, ie = window.Vue.createElementBlock, re = { class: "page" }, se = { class: "search-box" }, ue = { class: "right-tool" }, de = { class: "table-box" }, pe = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, ce = window.ElementPlus.ElMessageBox, me = window.Vue.reactive, g = window.Vue.ref, ge = {
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
    }), z = g(), h = g();
    let r = g(!1), x = g(""), c = g([]), R = g(!1);
    function U() {
      h.value.validate((d) => {
        d && (n.value.id ? le(n.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), r.value = !1, y(), m()) : V.error(e.msg);
        }) : ae(n.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), r.value = !1, y(), m()) : V.error(e.msg);
        }));
      });
    }
    function A() {
      y(), x.value = "添加附加数据", r.value = !0;
    }
    function T(d) {
      y(), x.value = "修改附加数据", r.value = !0, te(d.id).then((e) => {
        n.value = e.data;
      });
    }
    function K(d) {
      ce.confirm("确定要删除[" + d.extraName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        oe(d.id).then((e) => {
          e.code === 200 && e.data ? (V.success("删除成功"), m()) : V.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function m() {
      R.value = !0, ee(i.value).then((d) => {
        c.value = d.data.list, i.value.total = d.data.total, R.value = !1;
      });
    }
    function P() {
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
      }, h.value && h.value.resetFields();
    }
    return m(), (d, e) => {
      const b = p("el-input"), _ = p("el-form-item"), f = p("el-button"), F = p("el-form"), I = p("el-col"), L = p("el-row"), k = p("el-table-column"), q = p("el-table"), j = p("el-pagination"), $ = p("el-dialog"), E = B("hasPermission"), W = B("loading");
      return v(), ie("div", re, [
        C("div", se, [
          a(F, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: o(() => [
              a(_, { label: "附加数据名称" }, {
                default: o(() => [
                  a(b, {
                    modelValue: i.value.extraName,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => i.value.extraName = l),
                    placeholder: "请输入附加数据名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(_, null, {
                default: o(() => [
                  N((v(), D(f, {
                    type: "primary",
                    onClick: m,
                    icon: s(H)
                  }, {
                    default: o(() => e[9] || (e[9] = [
                      w("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [E, ["admin:extra:query"]]
                  ]),
                  a(f, {
                    icon: s(S),
                    onClick: P
                  }, {
                    default: o(() => e[10] || (e[10] = [
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
          default: o(() => [
            a(I, { span: 1.5 }, {
              default: o(() => [
                N((v(), D(f, {
                  icon: s(O),
                  type: "primary",
                  plain: "",
                  onClick: A
                }, {
                  default: o(() => e[11] || (e[11] = [
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
            default: o(() => [
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
                default: o((l) => [
                  C("span", null, ne(s(X)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              a(k, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: o((l) => [
                  N((v(), D(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: s(Y),
                    onClick: (G) => T(l.row)
                  }, {
                    default: o(() => e[12] || (e[12] = [
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
                    onClick: (G) => K(l.row)
                  }, {
                    default: o(() => e[13] || (e[13] = [
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
            [W, s(R)]
          ]),
          a(j, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (l) => i.value.pageNo = l),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (l) => i.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: m,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        a($, {
          modelValue: s(r),
          "onUpdate:modelValue": e[8] || (e[8] = (l) => M(r) ? r.value = l : r = l),
          title: s(x),
          width: s(Z)(600),
          draggable: ""
        }, {
          footer: o(() => [
            C("span", pe, [
              a(f, {
                type: "primary",
                onClick: U
              }, {
                default: o(() => e[14] || (e[14] = [
                  w("确 定")
                ])),
                _: 1
              }),
              a(f, {
                onClick: e[7] || (e[7] = (l) => {
                  M(r) ? r.value = !1 : r = !1, y();
                })
              }, {
                default: o(() => e[15] || (e[15] = [
                  w("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            a(F, {
              ref_key: "addFormRef",
              ref: h,
              model: n.value,
              "label-width": "80px",
              "status-icon": "",
              rules: u
            }, {
              default: o(() => [
                a(_, {
                  label: "名称",
                  prop: "extraName"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraName,
                      "onUpdate:modelValue": e[3] || (e[3] = (l) => n.value.extraName = l),
                      placeholder: "请输入名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(_, {
                  label: "key",
                  prop: "extraKey"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraKey,
                      "onUpdate:modelValue": e[4] || (e[4] = (l) => n.value.extraKey = l),
                      placeholder: "请输入key"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(_, {
                  label: "描述",
                  prop: "extraDescription"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraDescription,
                      "onUpdate:modelValue": e[5] || (e[5] = (l) => n.value.extraDescription = l),
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
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraData,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => n.value.extraData = l),
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
