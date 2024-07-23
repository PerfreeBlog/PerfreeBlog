import { s as H, r as F, p as O, e as Y, d as J } from "./lib/@element-plus.js";
const K = window.Pinia.defineStore;
K({
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
    setMenuInit(e) {
      this.menuInit = e;
    },
    setMenuList(e) {
      this.menuList = e;
    },
    setCachedViews(e) {
      this.cachedViews = e;
    }
  },
  persist: {
    enabled: !1
  }
});
function Q(e, v) {
  if (arguments.length === 0 || !e)
    return null;
  const x = v || "{y}-{m}-{d} {h}:{i}:{s}";
  let n;
  typeof e == "object" ? n = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), n = new Date(e));
  const h = {
    y: n.getFullYear(),
    m: n.getMonth() + 1,
    d: n.getDate(),
    h: n.getHours(),
    i: n.getMinutes(),
    s: n.getSeconds(),
    a: n.getDay()
  };
  return x.replace(/{([ymdhisa])+}/g, (_, s) => {
    let i = h[s];
    return s === "a" ? ["日", "一", "二", "三", "四", "五", "六"][i] : (_.length > 0 && i < 10 && (i = "0" + i), i || 0);
  });
}
function W(e) {
  return axios.post("/api/auth/site/page", e);
}
function X(e) {
  return axios.post("/api/auth/site/add", e);
}
function Z(e) {
  return axios.get("/api/auth/site/get?id=" + e);
}
function ee(e) {
  return axios.post("/api/auth/site/update", e);
}
function te(e) {
  return axios.delete("/api/auth/site/del?id=" + e);
}
const u = window.Vue.resolveComponent, t = window.Vue.createVNode, a = window.Vue.withCtx, r = window.Vue.unref, c = window.Vue.createTextVNode, y = window.Vue.createElementVNode, S = window.Vue.openBlock, D = window.Vue.createBlock;
window.Vue.createCommentVNode;
const le = window.Vue.toDisplayString, ae = window.Vue.resolveDirective, oe = window.Vue.withDirectives, z = window.Vue.isRef, ne = window.Vue.createElementBlock, ie = { class: "page" }, se = { class: "search-box" }, ue = { class: "right-tool" }, re = { class: "table-box" }, de = { class: "dialog-footer" }, w = window.ElementPlus.ElMessage, ce = window.ElementPlus.ElMessageBox, pe = window.Vue.reactive, m = window.Vue.ref, fe = {
  __name: "SiteView",
  setup(e) {
    let v = m(!1), x = m([]), n = m(!1), h = m("");
    const C = m(), _ = m(), s = m({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    }), i = m({
      id: "",
      siteName: "",
      siteSlug: "",
      siteDesc: ""
    }), R = pe({
      siteName: [{ required: !0, message: "请输入站点名称", trigger: "blur" }],
      siteSlug: [{ required: !0, message: "请输入站点访问标识", trigger: "blur" }]
    });
    function B() {
      s.value = {
        name: ""
      }, C.value.resetFields();
    }
    function f() {
      v.value = !0, W(s.value).then((d) => {
        x.value = d.data.list, s.value.total = d.data.total, v.value = !1;
      });
    }
    function M() {
      V(), h.value = "添加站点", n.value = !0;
    }
    function V() {
      i.value = {
        id: "",
        siteName: "",
        siteSlug: "",
        siteDesc: ""
      }, _.value && _.value.resetFields();
    }
    function A() {
      _.value.validate((d) => {
        d && (i.value.id ? ee(i.value).then((l) => {
          l.code === 200 ? (w.success("操作成功"), n.value = !1, V(), f()) : w.error(l.msg);
        }) : X(i.value).then((l) => {
          l.code === 200 ? (w.success("操作成功"), n.value = !1, V(), f()) : w.error(l.msg);
        }));
      });
    }
    function U(d) {
      V(), h.value = "修改站点", n.value = !0, Z(d.id).then((l) => {
        i.value = l.data;
      });
    }
    function T(d) {
      ce.confirm("确定要删除[" + d.siteName + "]吗？删除后将造成该站点下所有数据不可访问!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        te(d.id).then((l) => {
          l.code === 200 && l.data ? (w.success("删除成功"), f()) : w.error(l.msg);
        });
      }).catch(() => {
      });
    }
    return f(), (d, l) => {
      const k = u("el-input"), b = u("el-form-item"), p = u("el-button"), N = u("el-form"), I = u("el-col"), L = u("el-row"), g = u("el-table-column"), E = u("el-tag"), P = u("el-table"), j = u("el-pagination"), $ = u("el-dialog"), q = ae("loading");
      return S(), ne("div", ie, [
        y("div", se, [
          t(N, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: C
          }, {
            default: a(() => [
              t(b, { label: "站点名称" }, {
                default: a(() => [
                  t(k, {
                    modelValue: s.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (o) => s.value.name = o),
                    placeholder: "请输入站点名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(b, null, {
                default: a(() => [
                  t(p, {
                    type: "primary",
                    onClick: f,
                    icon: r(H)
                  }, {
                    default: a(() => [
                      c("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  t(p, {
                    icon: r(F),
                    onClick: B
                  }, {
                    default: a(() => [
                      c("重置")
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
        t(L, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            t(I, { span: 1.5 }, {
              default: a(() => [
                t(p, {
                  icon: r(O),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: a(() => [
                    c("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            y("div", ue, [
              t(p, {
                icon: r(F),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        y("div", re, [
          oe((S(), D(P, {
            data: r(x),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              t(g, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              t(g, {
                prop: "siteName",
                label: "站点名称",
                "min-width": "150"
              }),
              t(g, {
                prop: "siteSlug",
                label: "访问标识",
                "min-width": "240"
              }),
              t(g, {
                prop: "siteDesc",
                label: "站点描述",
                "min-width": "150"
              }),
              t(g, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: a((o) => [
                  o.row.status === 0 ? (S(), D(E, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: a(() => [
                      c("开启")
                    ]),
                    _: 1
                  })) : (S(), D(E, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: a(() => [
                      c("关闭")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(g, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: a((o) => [
                  y("span", null, le(r(Q)(o.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(g, {
                label: "操作",
                width: "180",
                fixed: "right"
              }, {
                default: a((o) => [
                  t(p, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(Y),
                    onClick: (G) => U(o.row)
                  }, {
                    default: a(() => [
                      c("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(p, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(J),
                    onClick: (G) => T(o.row)
                  }, {
                    default: a(() => [
                      c("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [q, r(v)]
          ]),
          t(j, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (o) => s.value.pageNo = o),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (o) => s.value.pageSize = o),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: f,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t($, {
          modelValue: r(n),
          "onUpdate:modelValue": l[7] || (l[7] = (o) => z(n) ? n.value = o : n = o),
          title: r(h),
          width: "600px",
          draggable: ""
        }, {
          footer: a(() => [
            y("span", de, [
              t(p, {
                type: "primary",
                onClick: A
              }, {
                default: a(() => [
                  c("确 定")
                ]),
                _: 1
              }),
              t(p, {
                onClick: l[6] || (l[6] = (o) => {
                  z(n) ? n.value = !1 : n = !1, V();
                })
              }, {
                default: a(() => [
                  c("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t(N, {
              ref_key: "addFormRef",
              ref: _,
              model: i.value,
              "label-width": "80px",
              "status-icon": "",
              rules: R
            }, {
              default: a(() => [
                t(b, {
                  label: "站点名称",
                  prop: "siteName"
                }, {
                  default: a(() => [
                    t(k, {
                      modelValue: i.value.siteName,
                      "onUpdate:modelValue": l[3] || (l[3] = (o) => i.value.siteName = o),
                      placeholder: "请输入站点名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(b, {
                  label: "站点标识",
                  prop: "siteSlug"
                }, {
                  default: a(() => [
                    t(k, {
                      modelValue: i.value.siteSlug,
                      "onUpdate:modelValue": l[4] || (l[4] = (o) => i.value.siteSlug = o),
                      placeholder: "请输入站点访问标识"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(b, {
                  label: "站点描述",
                  prop: "siteDesc"
                }, {
                  default: a(() => [
                    t(k, {
                      modelValue: i.value.siteDesc,
                      "onUpdate:modelValue": l[5] || (l[5] = (o) => i.value.siteDesc = o),
                      placeholder: "请输入站点描述",
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
  fe as default
};
