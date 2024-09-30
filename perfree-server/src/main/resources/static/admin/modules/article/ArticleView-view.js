import { s as ae, r as S, p as oe, c as A, a as E, b as ie, t as se, e as re, d as ce } from "./lib/@element-plus.js";
import { _ as de, p as ue, f as pe, c as me, h as _e, g as we, t as $, i as fe, j as ge, k as ve, l as he } from "./lib/tabs.js";
const s = window.Vue.resolveComponent, l = window.Vue.createVNode, a = window.Vue.withCtx, d = window.Vue.openBlock, _ = window.Vue.createBlock, i = window.Vue.unref, ye = window.Vue.renderList, Ve = window.Vue.Fragment, F = window.Vue.createElementBlock, u = window.Vue.createTextVNode, y = window.Vue.createElementVNode, C = window.Vue.createCommentVNode, M = window.Vue.toDisplayString, P = window.Vue.withModifiers, be = window.Vue.resolveDirective, ke = window.Vue.withDirectives, Ce = { class: "page" }, xe = { class: "search-box" }, Te = { class: "right-tool" }, Be = { class: "table-box" }, f = window.ElementPlus.ElMessage, V = window.ElementPlus.ElMessageBox, v = window.Vue.h, Ue = window.Vue.reactive, h = window.Vue.ref, ze = {
  __name: "ArticleView",
  setup(Ie) {
    const o = h({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      title: "",
      type: "article",
      status: null,
      categoryId: null,
      tagId: null
    }), x = h();
    let T = h([]), b = h(!1);
    const L = Ue({
      children: "children",
      label: "name",
      value: "id"
    });
    let B = h([]), U = h([]);
    function p() {
      b.value = !0, pe(o.value).then((n) => {
        T.value = n.data.list, o.value.total = n.data.total, b.value = !1;
      });
    }
    function j() {
      me({}).then((n) => {
        B.value = _e(n.data, "id", "pid", "children", -1);
      });
    }
    function R() {
      we().then((n) => {
        U.value = n.data;
      });
    }
    function q() {
      o.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        title: "",
        type: "article",
        status: null,
        categoryId: null,
        tagId: null
      }, x.value.resetFields(), p();
    }
    function G() {
      $("", "/admin/article/create", "");
    }
    function H(n) {
      $(`修改文章[${n.title}]`, "/admin/article/edit/" + n.id, "");
    }
    function J(n) {
      V.confirm("确定要删除文章[" + n.title + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        fe(n.id).then((t) => {
          t.code === 200 && t.data ? (f.success("删除成功"), p()) : f.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function K(n) {
      let t = n.isComment === 0 ? "允许评论" : "不允许评论";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改文章[${n.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: n.id,
          isComment: n.isComment === 0 ? 1 : 0
        };
        ge(g).then((c) => {
          c.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function O(n) {
      let t = n.isTop === 0 ? "置顶" : "不置顶";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改文章[${n.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: n.id,
          isTop: n.isTop === 0 ? 1 : 0
        };
        ve(g).then((c) => {
          c.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function z(n) {
      let t = n.status === 0 ? "草稿" : "发布";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要将文章[${n.title}]修改为`,
          v("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: n.id,
          status: n.status === 0 ? 1 : 0
        };
        he(g).then((c) => {
          c.code === 200 ? (p(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return p(), j(), R(), (n, t) => {
      const g = s("el-input"), c = s("el-form-item"), k = s("el-option"), I = s("el-select"), Q = s("el-tree-select"), w = s("el-button"), W = s("el-form"), X = s("el-col"), Y = s("el-row"), r = s("el-table-column"), N = s("el-tag"), Z = s("el-link"), ee = s("el-image"), D = s("el-switch"), te = s("el-table"), le = s("el-pagination"), ne = be("loading");
      return d(), F("div", Ce, [
        y("div", xe, [
          l(W, {
            inline: !0,
            model: o.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: x
          }, {
            default: a(() => [
              l(c, { label: "文章标题" }, {
                default: a(() => [
                  l(g, {
                    modelValue: o.value.title,
                    "onUpdate:modelValue": t[0] || (t[0] = (e) => o.value.title = e),
                    placeholder: "请输入文章标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(c, { label: "文章状态" }, {
                default: a(() => [
                  l(I, {
                    modelValue: o.value.status,
                    "onUpdate:modelValue": t[1] || (t[1] = (e) => o.value.status = e),
                    placeholder: "请选择文章状态",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: a(() => [
                      (d(), _(k, {
                        key: 0,
                        label: "已发布",
                        value: 0
                      })),
                      (d(), _(k, {
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
              l(c, { label: "所属分类" }, {
                default: a(() => [
                  l(Q, {
                    modelValue: o.value.categoryId,
                    "onUpdate:modelValue": t[2] || (t[2] = (e) => o.value.categoryId = e),
                    data: i(B),
                    props: L,
                    "check-strictly": "",
                    "render-after-expand": !1,
                    style: { width: "200px" },
                    clearable: "",
                    placeholder: "请选择所属分类"
                  }, null, 8, ["modelValue", "data", "props"])
                ]),
                _: 1
              }),
              l(c, { label: "所属标签" }, {
                default: a(() => [
                  l(I, {
                    modelValue: o.value.tagId,
                    "onUpdate:modelValue": t[3] || (t[3] = (e) => o.value.tagId = e),
                    placeholder: "请选择或新增标签",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: a(() => [
                      (d(!0), F(Ve, null, ye(i(U), (e) => (d(), _(k, {
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
              l(c, null, {
                default: a(() => [
                  l(w, {
                    type: "primary",
                    onClick: p,
                    icon: i(ae)
                  }, {
                    default: a(() => t[6] || (t[6] = [
                      u("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l(w, {
                    icon: i(S),
                    onClick: q
                  }, {
                    default: a(() => t[7] || (t[7] = [
                      u("重置")
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
        l(Y, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            l(X, { span: 1.5 }, {
              default: a(() => [
                l(w, {
                  icon: i(oe),
                  type: "primary",
                  plain: "",
                  onClick: G
                }, {
                  default: a(() => t[8] || (t[8] = [
                    u("写文章")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            y("div", Te, [
              l(w, {
                icon: i(S),
                circle: "",
                onClick: p
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        y("div", Be, [
          ke((d(), _(te, {
            data: i(T),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              l(r, {
                label: "序号",
                "min-width": "60",
                type: "index"
              }),
              l(r, {
                prop: "title",
                label: "文章标题",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(r, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: a((e) => [
                  e.row.status === 0 ? (d(), _(N, {
                    key: 0,
                    type: "success"
                  }, {
                    default: a(() => t[9] || (t[9] = [
                      u("已发布")
                    ])),
                    _: 1
                  })) : (d(), _(N, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: a(() => t[10] || (t[10] = [
                      u("草稿箱")
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
                default: a((e) => [
                  l(Z, {
                    href: "/article/" + e.row.slug,
                    target: "_blank"
                  }, {
                    default: a(() => [
                      u("/article/" + M(e.row.slug), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              l(r, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: a((e) => [
                  e.row.thumbnail ? (d(), _(ee, {
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
                  }, null, 8, ["src", "preview-src-list"])) : C("", !0)
                ]),
                _: 1
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
                default: a((e) => [
                  l(D, {
                    modelValue: e.row.isComment,
                    "onUpdate:modelValue": (m) => e.row.isComment = m,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": i(A),
                    "inactive-icon": i(E),
                    onClick: P((m) => K(e.row), ["prevent"]),
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
                default: a((e) => [
                  l(D, {
                    modelValue: e.row.isTop,
                    "onUpdate:modelValue": (m) => e.row.isTop = m,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": i(A),
                    "inactive-icon": i(E),
                    onClick: P((m) => O(e.row), ["prevent"]),
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
                default: a((e) => [
                  y("span", null, M(i(ue)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(r, {
                label: "操作",
                width: "190",
                fixed: "right"
              }, {
                default: a((e) => [
                  e.row.status === 1 ? (d(), _(w, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(ie),
                    onClick: (m) => z(e.row)
                  }, {
                    default: a(() => t[11] || (t[11] = [
                      u("发布")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : C("", !0),
                  e.row.status === 0 ? (d(), _(w, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(se),
                    onClick: (m) => z(e.row)
                  }, {
                    default: a(() => t[12] || (t[12] = [
                      u("草稿")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : C("", !0),
                  l(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(re),
                    onClick: (m) => H(e.row)
                  }, {
                    default: a(() => t[13] || (t[13] = [
                      u("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(ce),
                    onClick: (m) => J(e.row)
                  }, {
                    default: a(() => t[14] || (t[14] = [
                      u("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ne, i(b)]
          ]),
          l(le, {
            "current-page": o.value.pageNo,
            "onUpdate:currentPage": t[4] || (t[4] = (e) => o.value.pageNo = e),
            "page-size": o.value.pageSize,
            "onUpdate:pageSize": t[5] || (t[5] = (e) => o.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: p,
            total: o.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}, Se = /* @__PURE__ */ de(ze, [["__scopeId", "data-v-055c5385"]]);
export {
  Se as default
};
