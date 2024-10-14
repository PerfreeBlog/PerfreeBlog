import { s as Z, r as S, p as ee, c as E, a as $, f as te, t as le, e as oe, d as ne } from "./lib/@element-plus.js";
import { _ as ae, p as ie, e as se, t as D, f as re, g as ce, h as ue, i as de } from "./lib/tabs.js";
const i = window.Vue.resolveComponent, l = window.Vue.createVNode, n = window.Vue.withCtx, c = window.Vue.openBlock, u = window.Vue.createBlock, a = window.Vue.unref, d = window.Vue.createTextVNode, k = window.Vue.createElementVNode, P = window.Vue.resolveDirective, v = window.Vue.withDirectives, A = window.Vue.createCommentVNode, M = window.Vue.toDisplayString, F = window.Vue.withModifiers, pe = window.Vue.createElementBlock, me = { class: "page" }, _e = { class: "search-box" }, we = { class: "right-tool" }, fe = { class: "table-box" }, f = window.ElementPlus.ElMessage, y = window.ElementPlus.ElMessageBox, h = window.Vue.h, C = window.Vue.ref, ge = {
  __name: "PageView",
  setup(ve) {
    const s = C({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      title: "",
      type: "page",
      status: null
    }), x = C();
    let T = C([]), b = C(!1);
    function p() {
      b.value = !0, se(s.value).then((o) => {
        T.value = o.data.list, s.value.total = o.data.total, b.value = !1;
      });
    }
    function I() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        title: "",
        type: "article",
        status: null
      }, x.value.resetFields(), p();
    }
    function R() {
      D("", "/admin/page/create", "");
    }
    function j(o) {
      D(`修改页面[${o.title}]`, "/admin/page/edit/" + o.id, "");
    }
    function L(o) {
      y.confirm("确定要删除页面[" + o.title + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        re(o.id).then((e) => {
          e.code === 200 && e.data ? (f.success("删除成功"), p()) : f.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function q(o) {
      let e = o.isComment === 0 ? "允许评论" : "不允许评论";
      y({
        title: "提示",
        message: h("p", null, [
          `确定要修改页面[${o.title}]为`,
          h("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: o.id,
          isComment: o.isComment === 0 ? 1 : 0
        };
        ce(g).then((m) => {
          m.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function G(o) {
      let e = o.isTop === 0 ? "置顶" : "不置顶";
      y({
        title: "提示",
        message: h("p", null, [
          `确定要修改页面[${o.title}]为`,
          h("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: o.id,
          isTop: o.isTop === 0 ? 1 : 0
        };
        ue(g).then((m) => {
          m.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function B(o) {
      let e = o.status === 0 ? "草稿" : "发布";
      y({
        title: "提示",
        message: h("p", null, [
          `确定要将页面[${o.title}]修改为`,
          h("font", { style: "color: var(--el-color-warning)" }, e),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: o.id,
          status: o.status === 0 ? 1 : 0
        };
        de(g).then((m) => {
          m.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return p(), (o, e) => {
      const g = i("el-input"), m = i("el-form-item"), z = i("el-option"), H = i("el-select"), w = i("el-button"), J = i("el-form"), K = i("el-col"), O = i("el-row"), r = i("el-table-column"), N = i("el-tag"), Q = i("el-link"), U = i("el-switch"), W = i("el-table"), X = i("el-pagination"), V = P("hasPermission"), Y = P("loading");
      return c(), pe("div", me, [
        k("div", _e, [
          l(J, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: x
          }, {
            default: n(() => [
              l(m, { label: "页面标题" }, {
                default: n(() => [
                  l(g, {
                    modelValue: s.value.title,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => s.value.title = t),
                    placeholder: "请输入文章标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(m, { label: "页面状态" }, {
                default: n(() => [
                  l(H, {
                    modelValue: s.value.status,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => s.value.status = t),
                    placeholder: "请选择文章状态",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: n(() => [
                      (c(), u(z, {
                        key: 0,
                        label: "已发布",
                        value: 0
                      })),
                      (c(), u(z, {
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
              l(m, null, {
                default: n(() => [
                  l(w, {
                    type: "primary",
                    onClick: p,
                    icon: a(Z)
                  }, {
                    default: n(() => e[4] || (e[4] = [
                      d("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l(w, {
                    icon: a(S),
                    onClick: I
                  }, {
                    default: n(() => e[5] || (e[5] = [
                      d("重置")
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
        l(O, {
          gutter: 10,
          class: "mb8"
        }, {
          default: n(() => [
            l(K, { span: 1.5 }, {
              default: n(() => [
                v((c(), u(w, {
                  icon: a(ee),
                  type: "primary",
                  plain: "",
                  onClick: R
                }, {
                  default: n(() => e[6] || (e[6] = [
                    d("添加页面")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [V, ["admin:page:create"]]
                ])
              ]),
              _: 1
            }),
            k("div", we, [
              l(w, {
                icon: a(S),
                circle: "",
                onClick: p
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        k("div", fe, [
          v((c(), u(W, {
            data: a(T),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: n(() => [
              l(r, {
                label: "序号",
                "min-width": "60",
                type: "index"
              }),
              l(r, {
                prop: "title",
                label: "页面标题",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(r, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: n((t) => [
                  t.row.status === 0 ? (c(), u(N, {
                    key: 0,
                    type: "success"
                  }, {
                    default: n(() => e[7] || (e[7] = [
                      d("已发布")
                    ])),
                    _: 1
                  })) : (c(), u(N, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: n(() => e[8] || (e[8] = [
                      d("草稿箱")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(r, {
                prop: "slug",
                label: "访问地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: n((t) => [
                  l(Q, {
                    href: "/page/" + t.row.slug,
                    target: "_blank"
                  }, {
                    default: n(() => [
                      d("/page/" + M(t.row.slug), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              l(r, {
                prop: "template",
                label: "主题模板",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(r, {
                prop: "viewCount",
                label: "阅读数量",
                "min-width": "70",
                align: "center"
              }),
              l(r, {
                prop: "greatCount",
                label: "点赞数量",
                "min-width": "70",
                align: "center"
              }),
              l(r, {
                prop: "commentCount",
                label: "评论数量",
                "min-width": "70",
                align: "center"
              }),
              l(r, {
                prop: "isComment",
                label: "允许评论",
                "min-width": "80",
                align: "center"
              }, {
                default: n((t) => [
                  l(U, {
                    modelValue: t.row.isComment,
                    "onUpdate:modelValue": (_) => t.row.isComment = _,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": a(E),
                    "inactive-icon": a($),
                    onClick: F((_) => q(t.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              l(r, {
                prop: "isTop",
                label: "是否置顶",
                "min-width": "80",
                align: "center"
              }, {
                default: n((t) => [
                  l(U, {
                    modelValue: t.row.isTop,
                    "onUpdate:modelValue": (_) => t.row.isTop = _,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": a(E),
                    "inactive-icon": a($),
                    onClick: F((_) => G(t.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              l(r, {
                prop: "user.userName",
                label: "创建人",
                "min-width": "100"
              }),
              l(r, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: n((t) => [
                  k("span", null, M(a(ie)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(r, {
                label: "操作",
                width: "190",
                fixed: "right"
              }, {
                default: n((t) => [
                  t.row.status === 1 ? v((c(), u(w, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(te),
                    onClick: (_) => B(t.row)
                  }, {
                    default: n(() => e[9] || (e[9] = [
                      d("发布")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:page:updateStatus"]]
                  ]) : A("", !0),
                  t.row.status === 0 ? v((c(), u(w, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(le),
                    onClick: (_) => B(t.row)
                  }, {
                    default: n(() => e[10] || (e[10] = [
                      d("草稿")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:page:updateStatus"]]
                  ]) : A("", !0),
                  v((c(), u(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(oe),
                    onClick: (_) => j(t.row)
                  }, {
                    default: n(() => e[11] || (e[11] = [
                      d("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:page:update"]]
                  ]),
                  v((c(), u(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: a(ne),
                    onClick: (_) => L(t.row)
                  }, {
                    default: n(() => e[12] || (e[12] = [
                      d("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:page:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [Y, a(b)]
          ]),
          l(X, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => s.value.pageNo = t),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => s.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: p,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}, ke = /* @__PURE__ */ ae(ge, [["__scopeId", "data-v-71c7cd21"]]);
export {
  ke as default
};
