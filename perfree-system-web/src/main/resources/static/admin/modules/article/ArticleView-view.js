import { s as ee, r as D, p as te, c as A, a as E, b as le, t as ae, e as ne, d as oe } from "./lib/@element-plus.js";
import { _ as ie, p as ce, d as se, c as re, h as de, g as ue, t as pe, e as me, f as _e, i as we, j as fe } from "./lib/tabs.js";
const c = window.Vue.resolveComponent, t = window.Vue.createVNode, a = window.Vue.withCtx, d = window.Vue.openBlock, p = window.Vue.createBlock, i = window.Vue.unref, ge = window.Vue.renderList, ve = window.Vue.Fragment, $ = window.Vue.createElementBlock, m = window.Vue.createTextVNode, y = window.Vue.createElementVNode, C = window.Vue.createCommentVNode, F = window.Vue.withModifiers, he = window.Vue.toDisplayString, ye = window.Vue.resolveDirective, Ve = window.Vue.withDirectives;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const be = { class: "page" }, ke = { class: "search-box" }, Ce = { class: "right-tool" }, xe = { class: "table-box" }, f = window.ElementPlus.ElMessage, V = window.ElementPlus.ElMessageBox, v = window.Vue.h, Te = window.Vue.reactive, h = window.Vue.ref, Be = {
  __name: "ArticleView",
  setup(Ie) {
    const o = h({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      title: "",
      type: "article",
      status: null,
      categoryId: null,
      tagId: null
    }), x = h();
    let T = h([]), b = h(!1);
    const M = Te({
      children: "children",
      label: "name",
      value: "id"
    });
    let B = h([]), I = h([]);
    function _() {
      b.value = !0, se(o.value).then((l) => {
        T.value = l.data.list, o.value.total = l.data.total, b.value = !1;
      });
    }
    function P() {
      re({}).then((l) => {
        B.value = de(l.data, "id", "pid", "children", -1);
      });
    }
    function L() {
      ue().then((l) => {
        I.value = l.data;
      });
    }
    function j() {
      o.value = {
        title: "",
        type: "article",
        status: null,
        categoryId: null,
        tagId: null
      }, x.value.resetFields();
    }
    function R() {
      pe("", "/admin/article/create", "");
    }
    function Ue(l) {
    }
    function q(l) {
      V.confirm("确定要删除文章[" + l.title + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        me(l.id).then((n) => {
          n.code === 200 && n.data ? (f.success("删除成功"), _()) : f.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function G(l) {
      let n = l.isComment === 0 ? "允许评论" : "不允许评论";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改文章[${l.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, n),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: l.id,
          isComment: l.isComment === 0 ? 1 : 0
        };
        _e(g).then((r) => {
          r.code === 200 ? (_(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function H(l) {
      let n = l.isTop === 0 ? "置顶" : "不置顶";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要修改文章[${l.title}]为`,
          v("font", { style: "color: var(--el-color-warning)" }, n),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: l.id,
          isTop: l.isTop === 0 ? 1 : 0
        };
        we(g).then((r) => {
          r.code === 200 ? (_(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    function U(l) {
      let n = l.status === 0 ? "草稿" : "发布";
      V({
        title: "提示",
        message: v("p", null, [
          `确定要将文章[${l.title}]修改为`,
          v("font", { style: "color: var(--el-color-warning)" }, n),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let g = {
          id: l.id,
          status: l.status === 0 ? 1 : 0
        };
        fe(g).then((r) => {
          r.code === 200 ? (_(), f.success("修改成功")) : f.error("修改失败");
        });
      }).catch(() => {
      });
    }
    return _(), P(), L(), (l, n) => {
      const g = c("el-input"), r = c("el-form-item"), k = c("el-option"), z = c("el-select"), J = c("el-tree-select"), w = c("el-button"), K = c("el-form"), O = c("el-col"), Q = c("el-row"), s = c("el-table-column"), N = c("el-tag"), W = c("el-image"), S = c("el-switch"), X = c("el-table"), Y = c("el-pagination"), Z = ye("loading");
      return d(), $("div", be, [
        y("div", ke, [
          t(K, {
            inline: !0,
            model: o.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: x
          }, {
            default: a(() => [
              t(r, { label: "文章标题" }, {
                default: a(() => [
                  t(g, {
                    modelValue: o.value.title,
                    "onUpdate:modelValue": n[0] || (n[0] = (e) => o.value.title = e),
                    placeholder: "请输入文章标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(r, { label: "文章状态" }, {
                default: a(() => [
                  t(z, {
                    modelValue: o.value.status,
                    "onUpdate:modelValue": n[1] || (n[1] = (e) => o.value.status = e),
                    placeholder: "请选择文章状态",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: a(() => [
                      (d(), p(k, {
                        key: 0,
                        label: "已发布",
                        value: 0
                      })),
                      (d(), p(k, {
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
              t(r, { label: "所属分类" }, {
                default: a(() => [
                  t(J, {
                    modelValue: o.value.categoryId,
                    "onUpdate:modelValue": n[2] || (n[2] = (e) => o.value.categoryId = e),
                    data: i(B),
                    props: M,
                    "check-strictly": "",
                    "render-after-expand": !1,
                    style: { width: "200px" },
                    clearable: "",
                    placeholder: "请选择所属分类"
                  }, null, 8, ["modelValue", "data", "props"])
                ]),
                _: 1
              }),
              t(r, { label: "所属标签" }, {
                default: a(() => [
                  t(z, {
                    modelValue: o.value.tagId,
                    "onUpdate:modelValue": n[3] || (n[3] = (e) => o.value.tagId = e),
                    placeholder: "请选择或新增标签",
                    style: { width: "200px" },
                    clearable: ""
                  }, {
                    default: a(() => [
                      (d(!0), $(ve, null, ge(i(I), (e) => (d(), p(k, {
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
              t(r, null, {
                default: a(() => [
                  t(w, {
                    type: "primary",
                    onClick: _,
                    icon: i(ee)
                  }, {
                    default: a(() => [
                      m("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  t(w, {
                    icon: i(D),
                    onClick: j
                  }, {
                    default: a(() => [
                      m("重置")
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
        t(Q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            t(O, { span: 1.5 }, {
              default: a(() => [
                t(w, {
                  icon: i(te),
                  type: "primary",
                  plain: "",
                  onClick: R
                }, {
                  default: a(() => [
                    m("写文章")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            y("div", Ce, [
              t(w, {
                icon: i(D),
                circle: "",
                onClick: _
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        y("div", xe, [
          Ve((d(), p(X, {
            data: i(T),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              t(s, {
                label: "序号",
                "min-width": "50",
                type: "index",
                fixed: ""
              }),
              t(s, {
                prop: "title",
                label: "文章标题",
                "min-width": "150",
                fixed: ""
              }),
              t(s, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: a((e) => [
                  e.row.status === 0 ? (d(), p(N, {
                    key: 0,
                    type: "success"
                  }, {
                    default: a(() => [
                      m("已发布")
                    ]),
                    _: 1
                  })) : (d(), p(N, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: a(() => [
                      m("草稿箱")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(s, {
                prop: "slug",
                label: "访问地址别名",
                "min-width": "100"
              }),
              t(s, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: a((e) => [
                  e.row.thumbnail ? (d(), p(W, {
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
              t(s, {
                prop: "viewCount",
                label: "阅读数量",
                "min-width": "70",
                align: "center"
              }),
              t(s, {
                prop: "greatCount",
                label: "点赞数量",
                "min-width": "70",
                align: "center"
              }),
              t(s, {
                prop: "commentCount",
                label: "评论数量",
                "min-width": "70",
                align: "center"
              }),
              t(s, {
                prop: "isComment",
                label: "允许评论",
                "min-width": "80",
                align: "center"
              }, {
                default: a((e) => [
                  t(S, {
                    modelValue: e.row.isComment,
                    "onUpdate:modelValue": (u) => e.row.isComment = u,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": i(A),
                    "inactive-icon": i(E),
                    onClick: F((u) => G(e.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              t(s, {
                prop: "isTop",
                label: "是否置顶",
                "min-width": "80",
                align: "center"
              }, {
                default: a((e) => [
                  t(S, {
                    modelValue: e.row.isTop,
                    "onUpdate:modelValue": (u) => e.row.isTop = u,
                    "active-value": 1,
                    "inactive-value": 0,
                    "inline-prompt": "",
                    "active-icon": i(A),
                    "inactive-icon": i(E),
                    onClick: F((u) => H(e.row), ["prevent"]),
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "active-icon", "inactive-icon", "onClick"])
                ]),
                _: 1
              }),
              t(s, {
                prop: "userName",
                label: "创建人",
                "min-width": "100"
              }),
              t(s, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: a((e) => [
                  y("span", null, he(i(ce)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(s, {
                label: "操作",
                width: "190",
                fixed: "right"
              }, {
                default: a((e) => [
                  e.row.status === 1 ? (d(), p(w, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(le),
                    onClick: (u) => U(e.row)
                  }, {
                    default: a(() => [
                      m("发布")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : C("", !0),
                  e.row.status === 0 ? (d(), p(w, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(ae),
                    onClick: (u) => U(e.row)
                  }, {
                    default: a(() => [
                      m("草稿")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])) : C("", !0),
                  t(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(ne),
                    onClick: (u) => (e.row, void 0)
                  }, {
                    default: a(() => [
                      m("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(w, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(oe),
                    onClick: (u) => q(e.row)
                  }, {
                    default: a(() => [
                      m("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [Z, i(b)]
          ]),
          t(Y, {
            "current-page": o.value.pageNo,
            "onUpdate:currentPage": n[4] || (n[4] = (e) => o.value.pageNo = e),
            "page-size": o.value.pageSize,
            "onUpdate:pageSize": n[5] || (n[5] = (e) => o.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: _,
            total: o.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}, Se = /* @__PURE__ */ ie(Be, [["__scopeId", "data-v-08ff0cf4"]]);
export {
  Se as default
};
