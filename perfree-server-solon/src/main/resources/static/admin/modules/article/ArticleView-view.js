import { s as re, r as E, p as de, c as P, a as F, b as ue, t as ce, e as pe, d as me } from "./lib/@element-plus.js";
import { _ as ve, p as we, f as fe, c as _e, h as ge, g as he, t as M, i as ye, j as be, k as Ve, l as ke, m as Ce } from "./lib/tabs.js";
const s = window.Vue.resolveComponent, l = window.Vue.createVNode, i = window.Vue.withCtx, r = window.Vue.openBlock, c = window.Vue.createBlock, o = window.Vue.unref, xe = window.Vue.renderList, Te = window.Vue.Fragment, L = window.Vue.createElementBlock, w = window.Vue.createTextVNode, C = window.Vue.createElementVNode, j = window.Vue.resolveDirective, h = window.Vue.withDirectives, U = window.Vue.createCommentVNode, R = window.Vue.toDisplayString, z = window.Vue.withModifiers, Be = { class: "page" }, Ue = { class: "search-box" }, ze = { class: "right-tool" }, Ie = { class: "table-box" }, f = window.ElementPlus.ElMessage, k = window.ElementPlus.ElMessageBox, g = window.Vue.h, Ne = window.Vue.reactive, y = window.Vue.ref, Se = {
  __name: "ArticleView",
  setup($e) {
    const n = y({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      title: "",
      type: "article",
      status: null,
      categoryId: null,
      tagId: null,
      visibility: null,
      flag: ""
    }), I = y();
    let N = y([]), x = y(!1);
    const q = Ne({
      children: "children",
      label: "name",
      value: "id"
    });
    let S = y([]), $ = y([]);
    function m() {
      x.value = !0, fe(n.value).then((a) => {
        N.value = a.data.list, n.value.total = a.data.total, x.value = !1;
      });
    }
    function G() {
      _e({}).then((a) => {
        S.value = ge(a.data, "id", "pid", "children", -1);
      });
    }
    function H() {
      he().then((a) => {
        $.value = a.data;
      });
    }
    function J() {
      n.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        title: "",
        type: "article",
        status: null,
        categoryId: null,
        tagId: null,
        visibility: null,
        flag: ""
      }, I.value.resetFields(), m();
    }
    function K() {
      M("", "/admin/article/create", "");
    }
    function O(a) {
      M(`修改文章[${a.title}]`, "/admin/article/edit/" + a.id, "");
    }
    function Q(a) {
      k.confirm("确定要删除文章[" + a.title + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ye(a.id).then((t) => {
          t.code === 200 && t.data ? (f.success("删除成功"), m()) : f.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function W(a) {
      let t = a.isComment === 0 ? "允许评论" : "不允许评论";
      k({
        title: "提示",
        message: g("p", null, [
          `确定要修改文章[${a.title}]为`,
          g("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let v = {
          id: a.id,
          isComment: a.isComment === 0 ? 1 : 0
        };
        be(v).then((d) => {
          d.code === 200 ? (m(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function X(a) {
      let t = a.isTop === 0 ? "置顶" : "不置顶";
      k({
        title: "提示",
        message: g("p", null, [
          `确定要修改文章[${a.title}]为`,
          g("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let v = {
          id: a.id,
          isTop: a.isTop === 0 ? 1 : 0
        };
        Ve(v).then((d) => {
          d.code === 200 ? (m(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function Y(a) {
      let t = a.visibility === 0 ? "仅自己可见" : "所有人可见";
      k({
        title: "提示",
        message: g("p", null, [
          `确定要修改文章[${a.title}]为`,
          g("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let v = {
          id: a.id,
          visibility: a.visibility === 0 ? 1 : 0
        };
        ke(v).then((d) => {
          d.code === 200 ? (m(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function A(a) {
      let t = a.status === 0 ? "草稿" : "发布";
      k({
        title: "提示",
        message: g("p", null, [
          `确定要将文章[${a.title}]修改为`,
          g("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let v = {
          id: a.id,
          status: a.status === 0 ? 1 : 0
        };
        Ce(v).then((d) => {
          d.code === 200 ? (m(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return m(), G(), H(), (a, t) => {
      const v = s("el-input"), d = s("el-form-item"), b = s("el-option"), T = s("el-select"), Z = s("el-tree-select"), _ = s("el-button"), ee = s("el-form"), te = s("el-col"), le = s("el-row"), u = s("el-table-column"), D = s("el-tag"), ae = s("el-link"), ie = s("el-image"), B = s("el-switch"), ne = s("el-table"), oe = s("el-pagination"), V = j("hasPermission"), se = j("loading");
      return r(), L("div", Be, [
        C("div", Ue, [
          l(ee, {
            inline: !0,
            model: n.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: I
          }, {
            default: i(() => [
              l(d, { label: "文章标题" }, {
                default: i(() => [
                  l(v, {
                    modelValue: n.value.title,
                    "onUpdate:modelValue": t[0] || (t[0] = (e) => n.value.title = e),
                    placeholder: "请输入文章标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(d, { label: "文章状态" }, {
                default: i(() => [
                  l(T, {
                    modelValue: n.value.status,
                    "onUpdate:modelValue": t[1] || (t[1] = (e) => n.value.status = e),
                    placeholder: "请选择文章状态",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: i(() => [
                      (r(), c(b, {
                        key: 0,
                        label: "已发布",
                        value: 0
                      })),
                      (r(), c(b, {
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
              l(d, { label: "是否可见" }, {
                default: i(() => [
                  l(T, {
                    modelValue: n.value.visibility,
                    "onUpdate:modelValue": t[2] || (t[2] = (e) => n.value.visibility = e),
                    placeholder: "请选择是否可见",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: i(() => [
                      (r(), c(b, {
                        key: 0,
                        label: "所有人可见",
                        value: 0
                      })),
                      (r(), c(b, {
                        key: 1,
                        label: "仅自己可见",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(d, { label: "所属分类" }, {
                default: i(() => [
                  l(Z, {
                    modelValue: n.value.categoryId,
                    "onUpdate:modelValue": t[3] || (t[3] = (e) => n.value.categoryId = e),
                    data: o(S),
                    props: q,
                    "check-strictly": "",
                    "render-after-expand": !1,
                    style: { width: "200px" },
                    clearable: "",
                    placeholder: "请选择所属分类"
                  }, null, 8, ["modelValue", "data", "props"])
                ]),
                _: 1
              }),
              l(d, { label: "所属标签" }, {
                default: i(() => [
                  l(T, {
                    modelValue: n.value.tagId,
                    "onUpdate:modelValue": t[4] || (t[4] = (e) => n.value.tagId = e),
                    placeholder: "请选择或新增标签",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: i(() => [
                      (r(!0), L(Te, null, xe(o($), (e) => (r(), c(b, {
                        key: e.id,
                        label: e.name,
                        value: e.id
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(d, { label: "文章标识" }, {
                default: i(() => [
                  l(v, {
                    modelValue: n.value.flag,
                    "onUpdate:modelValue": t[5] || (t[5] = (e) => n.value.flag = e),
                    placeholder: "请输入文章标识",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(d, null, {
                default: i(() => [
                  l(_, {
                    type: "primary",
                    onClick: m,
                    icon: o(re)
                  }, {
                    default: i(() => t[8] || (t[8] = [
                      w("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l(_, {
                    icon: o(E),
                    onClick: J
                  }, {
                    default: i(() => t[9] || (t[9] = [
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
        l(le, {
          gutter: 10,
          class: "mb8"
        }, {
          default: i(() => [
            l(te, { span: 1.5 }, {
              default: i(() => [
                h((r(), c(_, {
                  icon: o(de),
                  type: "primary",
                  plain: "",
                  onClick: K
                }, {
                  default: i(() => t[10] || (t[10] = [
                    w("写文章")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [V, ["admin:article:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", ze, [
              l(_, {
                icon: o(E),
                circle: "",
                onClick: m
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", Ie, [
          h((r(), c(ne, {
            data: o(N),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: i(() => [
              l(u, {
                label: "序号",
                "min-width": "60",
                type: "index"
              }),
              l(u, {
                prop: "title",
                label: "文章标题",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(u, {
                prop: "status",
                label: "状态",
                "min-width": "120"
              }, {
                default: i((e) => [
                  e.row.status === 0 ? (r(), c(D, {
                    key: 0,
                    type: "success"
                  }, {
                    default: i(() => t[11] || (t[11] = [
                      w("已发布")
                    ])),
                    _: 1
                  })) : (r(), c(D, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: i(() => t[12] || (t[12] = [
                      w("草稿箱")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(u, {
                prop: "slug",
                label: "访问地址",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }, {
                default: i((e) => [
                  l(ae, {
                    href: "/article/" + e.row.slug,
                    target: "_blank"
                  }, {
                    default: i(() => [
                      w("/article/" + R(e.row.slug), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              l(u, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: i((e) => [
                  e.row.thumbnail ? (r(), c(ie, {
                    key: 0,
                    style: { width: "100%", "max-height": "100%" },
                    src: e.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [e.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : U("", !0)
                ]),
                _: 1
              }),
              l(u, {
                prop: "viewCount",
                label: "阅读数量",
                "min-width": "100",
                align: "center"
              }),
              l(u, {
                prop: "greatCount",
                label: "点赞数量",
                "min-width": "100",
                align: "center"
              }),
              l(u, {
                prop: "commentCount",
                label: "评论数量",
                "min-width": "100",
                align: "center"
              }),
              l(u, {
                prop: "isComment",
                label: "允许评论",
                "min-width": "100",
                align: "center"
              }, {
                default: i((e) => [
                  l(B, {
                    modelValue: e.row.isComment,
                    "onUpdate:modelValue": (p) => e.row.isComment = p,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": o(P),
                    "inactive-icon": o(F),
                    onClick: z((p) => W(e.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              l(u, {
                prop: "isTop",
                label: "是否置顶",
                "min-width": "80",
                align: "center"
              }, {
                default: i((e) => [
                  l(B, {
                    modelValue: e.row.isTop,
                    "onUpdate:modelValue": (p) => e.row.isTop = p,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": o(P),
                    "inactive-icon": o(F),
                    onClick: z((p) => X(e.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              l(u, {
                prop: "visibility",
                label: "是否可见",
                "min-width": "120"
              }, {
                default: i((e) => [
                  l(B, {
                    modelValue: e.row.visibility,
                    "onUpdate:modelValue": (p) => e.row.visibility = p,
                    "active-value": 0,
                    "inactive-value": 1,
                    "inline-prompt": "",
                    style: { "--el-switch-on-color": "var(--el-color-success)", "--el-switch-off-color": "var(--el-color-warning)", "margin-right": "10px" },
                    "active-text": "所有人可见",
                    "inactive-text": "仅自己可见",
                    onClick: z((p) => Y(e.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                ]),
                _: 1
              }),
              l(u, {
                prop: "user.userName",
                label: "创建人",
                "min-width": "100"
              }),
              l(u, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: i((e) => [
                  C("span", null, R(o(we)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(u, {
                label: "操作",
                width: "190",
                fixed: "right"
              }, {
                default: i((e) => [
                  e.row.status === 1 ? h((r(), c(_, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(ue),
                    onClick: (p) => A(e.row)
                  }, {
                    default: i(() => t[13] || (t[13] = [
                      w("发布")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:article:updateStatus"]]
                  ]) : U("", !0),
                  e.row.status === 0 ? h((r(), c(_, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(ce),
                    onClick: (p) => A(e.row)
                  }, {
                    default: i(() => t[14] || (t[14] = [
                      w("草稿")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:article:updateStatus"]]
                  ]) : U("", !0),
                  h((r(), c(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(pe),
                    onClick: (p) => O(e.row)
                  }, {
                    default: i(() => t[15] || (t[15] = [
                      w("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:article:update"]]
                  ]),
                  h((r(), c(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(me),
                    onClick: (p) => Q(e.row)
                  }, {
                    default: i(() => t[16] || (t[16] = [
                      w("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [V, ["admin:article:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [se, o(x)]
          ]),
          l(oe, {
            "current-page": n.value.pageNo,
            "onUpdate:currentPage": t[6] || (t[6] = (e) => n.value.pageNo = e),
            "page-size": n.value.pageSize,
            "onUpdate:pageSize": t[7] || (t[7] = (e) => n.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: m,
            total: n.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}, Ee = /* @__PURE__ */ ve(Se, [["__scopeId", "data-v-a1aedcd1"]]);
export {
  Ee as default
};
