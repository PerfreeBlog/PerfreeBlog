import { s as W, r as N, p as X, c as U, a as E, f as Y, t as Z, e as ee, d as te } from "./lib/@element-plus.js";
import { _ as le, p as oe, e as ne, t as S, f as ae, g as ie, h as se, i as re } from "./lib/tabs.js";
const i = window.Vue.resolveComponent, t = window.Vue.createVNode, n = window.Vue.withCtx, _ = window.Vue.openBlock, g = window.Vue.createBlock, a = window.Vue.unref, c = window.Vue.createTextVNode, h = window.Vue.createElementVNode, $ = window.Vue.createCommentVNode, D = window.Vue.toDisplayString, P = window.Vue.withModifiers, ce = window.Vue.resolveDirective, ue = window.Vue.withDirectives, de = window.Vue.createElementBlock, pe = { class: "page" }, me = { class: "search-box" }, _e = { class: "right-tool" }, fe = { class: "table-box" }, f = window.ElementPlus.ElMessage, V = window.ElementPlus.ElMessageBox, v = window.Vue.h, k = window.Vue.ref, we = {
  __name: "PageView",
  setup(ge) {
    const s = k({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      title: "",
      type: "page",
      status: null
    }), C = k();
    let b = k([]), y = k(!1);
    function u() {
      y.value = !0, ne(s.value).then((o) => {
        b.value = o.data.list, s.value.total = o.data.total, y.value = !1;
      });
    }
    function A() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        title: "",
        type: "article",
        status: null
      }, C.value.resetFields(), u();
    }
    function M() {
      S("", "/admin/page/create", "");
    }
    function F(o) {
      S(`修改页面[${o.title}]`, "/admin/page/edit/" + o.id, "");
    }
    function I(o) {
      V.confirm("确定要删除页面[" + o.title + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ae(o.id).then((e) => {
          e.code === 200 && e.data ? (f.success("删除成功"), u()) : f.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function R(o) {
      let e = o.isComment === 0 ? "允许评论" : "不允许评论";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改页面[${o.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let w = {
          id: o.id,
          isComment: o.isComment === 0 ? 1 : 0
        };
        ie(w).then((d) => {
          d.code === 200 ? (u(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function j(o) {
      let e = o.isTop === 0 ? "置顶" : "不置顶";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改页面[${o.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let w = {
          id: o.id,
          isTop: o.isTop === 0 ? 1 : 0
        };
        se(w).then((d) => {
          d.code === 200 ? (u(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function x(o) {
      let e = o.status === 0 ? "草稿" : "发布";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要将页面[${o.title}]修改为`,
          v("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let w = {
          id: o.id,
          status: o.status === 0 ? 1 : 0
        };
        re(w).then((d) => {
          d.code === 200 ? (u(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return u(), (o, e) => {
      const w = i("el-input"), d = i("el-form-item"), T = i("el-option"), L = i("el-select"), m = i("el-button"), q = i("el-form"), G = i("el-col"), H = i("el-row"), r = i("el-table-column"), B = i("el-tag"), J = i("el-link"), z = i("el-switch"), K = i("el-table"), O = i("el-pagination"), Q = ce("loading");
      return _(), de("div", pe, [
        h("div", me, [
          t(q, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: C
          }, {
            default: n(() => [
              t(d, { label: "页面标题" }, {
                default: n(() => [
                  t(w, {
                    modelValue: s.value.title,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => s.value.title = l),
                    placeholder: "请输入文章标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(d, { label: "页面状态" }, {
                default: n(() => [
                  t(L, {
                    modelValue: s.value.status,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => s.value.status = l),
                    placeholder: "请选择文章状态",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: n(() => [
                      (_(), g(T, {
                        key: 0,
                        label: "已发布",
                        value: 0
                      })),
                      (_(), g(T, {
                        key: 1,
                        label: "草稿箱",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(d, null, {
                default: n(() => [
                  t(m, {
                    type: "primary",
                    onClick: u,
                    icon: a(W)
                  }, {
                    default: n(() => e[4] || (e[4] = [
                      c("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  t(m, {
                    icon: a(N),
                    onClick: A
                  }, {
                    default: n(() => e[5] || (e[5] = [
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
        t(H, {
          gutter: 10,
          class: "mb8"
        }, {
          default: n(() => [
            t(G, { span: 1.5 }, {
              default: n(() => [
                t(m, {
                  icon: a(X),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: n(() => e[6] || (e[6] = [
                    c("添加页面")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            h("div", _e, [
              t(m, {
                icon: a(N),
                circle: "",
                onClick: u
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        h("div", fe, [
          ue((_(), g(K, {
            data: a(b),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: n(() => [
              t(r, {
                label: "序号",
                "min-width": "60",
                type: "index"
              }),
              t(r, {
                prop: "title",
                label: "页面标题",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              t(r, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: n((l) => [
                  l.row.status === 0 ? (_(), g(B, {
                    key: 0,
                    type: "success"
                  }, {
                    default: n(() => e[7] || (e[7] = [
                      c("已发布")
                    ])),
                    _: 1
                  })) : (_(), g(B, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: n(() => e[8] || (e[8] = [
                      c("草稿箱")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(r, {
                prop: "slug",
                label: "访问地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: n((l) => [
                  t(J, {
                    href: "/page/" + l.row.slug,
                    target: "_blank"
                  }, {
                    default: n(() => [
                      c("/page/" + D(l.row.slug), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              t(r, {
                prop: "template",
                label: "主题模板",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              t(r, {
                prop: "viewCount",
                label: "阅读数量",
                "min-width": "70",
                align: "center"
              }),
              t(r, {
                prop: "greatCount",
                label: "点赞数量",
                "min-width": "70",
                align: "center"
              }),
              t(r, {
                prop: "commentCount",
                label: "评论数量",
                "min-width": "70",
                align: "center"
              }),
              t(r, {
                prop: "isComment",
                label: "允许评论",
                "min-width": "80",
                align: "center"
              }, {
                default: n((l) => [
                  t(z, {
                    modelValue: l.row.isComment,
                    "onUpdate:modelValue": (p) => l.row.isComment = p,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": a(U),
                    "inactive-icon": a(E),
                    onClick: P((p) => R(l.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              t(r, {
                prop: "isTop",
                label: "是否置顶",
                "min-width": "80",
                align: "center"
              }, {
                default: n((l) => [
                  t(z, {
                    modelValue: l.row.isTop,
                    "onUpdate:modelValue": (p) => l.row.isTop = p,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": a(U),
                    "inactive-icon": a(E),
                    onClick: P((p) => j(l.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              t(r, {
                prop: "user.userName",
                label: "创建人",
                "min-width": "100"
              }),
              t(r, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: n((l) => [
                  h("span", null, D(a(oe)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(r, {
                label: "操作",
                width: "190",
                fixed: "right"
              }, {
                default: n((l) => [
                  l.row.status === 1 ? (_(), g(m, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(Y),
                    onClick: (p) => x(l.row)
                  }, {
                    default: n(() => e[9] || (e[9] = [
                      c("发布")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : $("", !0),
                  l.row.status === 0 ? (_(), g(m, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(Z),
                    onClick: (p) => x(l.row)
                  }, {
                    default: n(() => e[10] || (e[10] = [
                      c("草稿")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : $("", !0),
                  t(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(ee),
                    onClick: (p) => F(l.row)
                  }, {
                    default: n(() => e[11] || (e[11] = [
                      c("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(te),
                    onClick: (p) => I(l.row)
                  }, {
                    default: n(() => e[12] || (e[12] = [
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
            [Q, a(y)]
          ]),
          t(O, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (l) => s.value.pageNo = l),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (l) => s.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: u,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}, Ve = /* @__PURE__ */ le(we, [["__scopeId", "data-v-fb8e7cb4"]]);
export {
  Ve as default
};
