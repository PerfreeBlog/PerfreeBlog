import { s as W, r as R, p as X, u as Z, l as ee, d as te, a as ne } from "./lib/@element-plus.js";
const oe = window.Pinia.defineStore, le = oe({
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
function ae() {
  return axios.get("/api/auth/menuAdminList");
}
function ie(e, s) {
  if (arguments.length === 0 || !e)
    return null;
  const v = s || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof e == "object" ? i = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), i = new Date(e));
  const m = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return v.replace(/{([ymdhisa])+}/g, (S, k) => {
    let h = m[k];
    return k === "a" ? ["日", "一", "二", "三", "四", "五", "六"][h] : (S.length > 0 && h < 10 && (h = "0" + h), h || 0);
  });
}
function P() {
  return new Promise((e, s) => {
    const v = le();
    ae().then((i) => {
      if (i.code === 200) {
        let m = i.data;
        m.unshift(
          {
            name: "首页",
            url: "/admin",
            icon: "fa-solid fa-home",
            seq: 0,
            type: 1,
            target: 0,
            status: 0,
            pluginId: null,
            flag: null,
            component: "/view/Home",
            componentName: "home",
            moduleName: "home",
            menuType: 1,
            perms: "",
            isFrame: 1,
            id: "home",
            pid: "-1",
            children: []
          }
        ), v.setMenuList(m), e();
      }
    });
  });
}
function se(e) {
  return axios.post("/api/auth/plugins/page", e);
}
function ue(e) {
  return axios.post("/api/auth/plugins/disablePlugin?id=" + e);
}
function re(e) {
  return axios.post("/api/auth/plugins/enablePlugin?id=" + e);
}
function ce(e) {
  return axios.post("/api/auth/plugins/uninstallPlugin?id=" + e);
}
const de = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, pe = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, r = window.Vue.resolveComponent, t = window.Vue.createVNode, o = window.Vue.withCtx, u = window.Vue.unref, p = window.Vue.createTextVNode, f = window.Vue.createElementVNode, b = window.Vue.openBlock, V = window.Vue.createBlock, z = window.Vue.createCommentVNode, A = window.Vue.toDisplayString, me = window.Vue.resolveDirective, _e = window.Vue.withDirectives, fe = window.Vue.isRef, ge = window.Vue.createElementBlock, he = { class: "page" }, we = { class: "search-box" }, ve = { class: "right-tool" }, be = { class: "table-box" }, ye = ["href"], Ve = /* @__PURE__ */ f("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ p(" 拖拽插件文件到此或"),
  /* @__PURE__ */ f("em", null, "点击上传插件文件")
], -1), ke = /* @__PURE__ */ f("div", { class: "el-upload__tip" }, " 插件文件为zip格式,若插件已存在,则会自动覆盖更新! ", -1), d = window.ElementPlus.ElMessage, E = window.ElementPlus.ElMessageBox, y = window.Vue.ref, Se = {
  __name: "PluginView",
  setup(e) {
    const s = y({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    }), v = y();
    let i = y([]), m = y(!1), g = y(!1), S = localStorage.getItem(de.STORAGE_TOKEN), k = pe.baseURL, h = {
      Authorization: "Bearer " + JSON.parse(S).accessToken
    }, C = y();
    function _() {
      m.value = !0, se(s.value).then((a) => {
        i.value = a.data.list, s.value.total = a.data.total, m.value = !1;
      });
    }
    function L() {
      s.value = {
        name: ""
      }, v.value.resetFields();
    }
    function U() {
      g.value = !0;
    }
    function M(a, n, x) {
      a.code === 200 ? (d.success("插件安装成功"), g.value = !1, C.value.clearFiles(), _()) : (d.error(a.msg), C.value.handleRemove(n));
    }
    function D(a) {
      d.error("插件上传失败,请检查网络是否通通畅");
    }
    function I(a) {
      E.confirm("确定要禁用[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ue(a.id).then((n) => {
          n.code === 200 && n.data ? (P().then((x) => {
          }), d.success("插件禁用成功"), _()) : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function O(a) {
      E.confirm("确定要启用[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        re(a.id).then((n) => {
          n.code === 200 && n.data ? (P().then((x) => {
          }), d.success("插件启用成功"), _()) : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function F(a) {
      E.confirm("确定要卸载[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ce(a.id).then((n) => {
          n.code === 200 ? n.data ? (d.success("插件卸载成功"), _()) : d.error("插件卸载失败") : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    return _(), (a, n) => {
      const x = r("el-input"), T = r("el-form-item"), w = r("el-button"), G = r("el-form"), j = r("el-col"), $ = r("el-row"), c = r("el-table-column"), N = r("el-tag"), H = r("el-table"), K = r("el-pagination"), q = r("el-icon"), J = r("el-upload"), Y = r("el-dialog"), Q = me("loading");
      return b(), ge("div", he, [
        f("div", we, [
          t(G, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: v
          }, {
            default: o(() => [
              t(T, { label: "插件名称" }, {
                default: o(() => [
                  t(x, {
                    modelValue: s.value.name,
                    "onUpdate:modelValue": n[0] || (n[0] = (l) => s.value.name = l),
                    placeholder: "请输入插件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(T, null, {
                default: o(() => [
                  t(w, {
                    type: "primary",
                    onClick: _,
                    icon: u(W)
                  }, {
                    default: o(() => [
                      p("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  t(w, {
                    icon: u(R),
                    onClick: L
                  }, {
                    default: o(() => [
                      p("重置")
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
        t($, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            t(j, { span: 1.5 }, {
              default: o(() => [
                t(w, {
                  icon: u(X),
                  type: "primary",
                  plain: "",
                  onClick: U
                }, {
                  default: o(() => [
                    p("安装插件")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            f("div", ve, [
              t(w, {
                icon: u(R),
                circle: "",
                onClick: _
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        f("div", be, [
          _e((b(), V(H, {
            data: u(i),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              t(c, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              t(c, {
                prop: "name",
                label: "插件名称",
                "min-width": "150"
              }),
              t(c, {
                prop: "desc",
                label: "描述信息",
                "min-width": "200"
              }),
              t(c, {
                prop: "version",
                label: "版本",
                "min-width": "80"
              }),
              t(c, {
                prop: "status",
                label: "状态",
                width: "100"
              }, {
                default: o((l) => [
                  l.row.status === 1 ? (b(), V(N, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: o(() => [
                      p("已启用")
                    ]),
                    _: 1
                  })) : (b(), V(N, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: o(() => [
                      p("已禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(c, {
                prop: "author",
                label: "作者",
                "min-width": "150"
              }),
              t(c, {
                prop: "website",
                label: "作者网站",
                "min-width": "150"
              }, {
                default: o((l) => [
                  f("a", {
                    href: l.row.website,
                    target: "_blank"
                  }, A(l.row.website), 9, ye)
                ]),
                _: 1
              }),
              t(c, {
                prop: "email",
                label: "联系方式",
                "min-width": "150"
              }),
              t(c, {
                prop: "createTime",
                label: "安装时间",
                "min-width": "150"
              }, {
                default: o((l) => [
                  f("span", null, A(u(ie)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(c, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: o((l) => [
                  l.row.status === 0 ? (b(), V(w, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Z),
                    onClick: (B) => O(l.row)
                  }, {
                    default: o(() => [
                      p("启用")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : z("", !0),
                  l.row.status === 1 ? (b(), V(w, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(ee),
                    onClick: (B) => I(l.row)
                  }, {
                    default: o(() => [
                      p("禁用")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : z("", !0),
                  t(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(te),
                    onClick: (B) => F(l.row)
                  }, {
                    default: o(() => [
                      p("卸载")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [Q, u(m)]
          ]),
          t(K, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": n[1] || (n[1] = (l) => s.value.pageNo = l),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": n[2] || (n[2] = (l) => s.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: _,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(Y, {
          modelValue: u(g),
          "onUpdate:modelValue": n[3] || (n[3] = (l) => fe(g) ? g.value = l : g = l),
          title: "安装插件",
          width: "500px",
          draggable: ""
        }, {
          default: o(() => [
            t(J, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: C,
              accept: "application/zip",
              "on-success": M,
              "on-error": D,
              headers: u(h),
              action: u(k) + "/api/auth/plugins/installPlugin"
            }, {
              tip: o(() => [
                ke
              ]),
              default: o(() => [
                t(q, { class: "el-icon--upload" }, {
                  default: o(() => [
                    t(u(ne))
                  ]),
                  _: 1
                }),
                Ve
              ]),
              _: 1
            }, 8, ["headers", "action"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
export {
  Se as default
};
