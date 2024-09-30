import { s as ee, r as B, p as te, u as le, e as ae, d as oe } from "./lib/@element-plus.js";
import { _ as ne, p as ie, d as E, A as re, a as se, b as de, c as ue, e as ce, f as me, g as pe, h as fe } from "./lib/attachLibraryItems.js";
const u = window.Vue.resolveComponent, t = window.Vue.createVNode, l = window.Vue.withCtx, n = window.Vue.unref, c = window.Vue.createTextVNode, v = window.Vue.createElementVNode, U = window.Vue.toDisplayString, ve = window.Vue.resolveDirective, x = window.Vue.openBlock, we = window.Vue.createBlock, _e = window.Vue.withDirectives, C = window.Vue.isRef, D = window.Vue.createElementBlock, he = window.Vue.createCommentVNode, ge = { class: "search-box" }, be = { class: "right-tool" }, ye = { class: "table-box" }, Ve = {
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, ke = ["src"], Ae = { class: "dialog-footer" }, Ce = { class: "dialog-footer" }, Ie = { key: 0 }, Le = window.Vue.reactive, m = window.Vue.ref, w = window.ElementPlus.ElMessage, xe = window.ElementPlus.ElMessageBox, Ne = {
  __name: "AttachLibraryItemsVideo",
  props: ["attachLibraryId"],
  setup(R) {
    const g = R, r = m({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      attachLibraryId: g.attachLibraryId
    }), i = m({
      id: null,
      attachLibraryId: g.attachLibraryId,
      name: null,
      description: null,
      url: null
    }), T = Le({
      name: [{ required: !0, message: "视频库名称不能为空", trigger: "blur" }],
      url: [{ required: !0, message: "视频地址不能为空", trigger: "blur" }]
    }), N = m(), k = m();
    let s = m(!1), S = m([]), I = m(!1), b = m(""), p = m(!1), y = m([]);
    function P(o) {
      y.value = o;
    }
    function L() {
      y.value = [];
    }
    function M() {
      b.value = "选择视频", L(), p.value = !0;
    }
    function q() {
      let o = {
        attachList: []
      };
      y.value.forEach((e, A) => {
        let _ = {
          name: e.name,
          attachLibraryId: g.attachLibraryId,
          url: e.url
        };
        o.attachList.push(_);
      }), de(o).then((e) => {
        e.code === 200 ? (w.success("导入成功"), p.value = !1, L(), f()) : w.error(e.msg);
      });
    }
    function $(o) {
      o.length > 0 && !i.value.name && (i.value.name = o[0].name);
    }
    function V() {
      i.value = {
        id: null,
        name: null,
        description: null,
        attachLibraryId: g.attachLibraryId,
        url: null
      }, k.value && k.value.resetFields();
    }
    function j() {
      k.value.validate((o) => {
        o && (i.value.id ? ue(i.value).then((e) => {
          e.code === 200 ? (w.success("操作成功"), s.value = !1, V(), f()) : w.error(e.msg);
        }) : ce(i.value).then((e) => {
          e.code === 200 ? (w.success("操作成功"), s.value = !1, V(), f()) : w.error(e.msg);
        }));
      });
    }
    function G(o) {
      xe.confirm("确定要删除[" + o.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        me(o.id).then((e) => {
          e.code === 200 && e.data ? (w.success("删除成功"), f()) : w.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function W(o) {
      V(), b.value = "修改视频", s.value = !0, pe(o.id).then((e) => {
        i.value = e.data;
      });
    }
    function f() {
      I.value = !0, fe(r.value).then((o) => {
        S.value = o.data.list, r.value.total = o.data.total, I.value = !1;
      });
    }
    function H() {
      r.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        attachLibraryId: g.attachLibraryId
      }, N.value.resetFields(), f();
    }
    function J() {
      V(), b.value = "添加视频", s.value = !0;
    }
    return f(), (o, e) => {
      const A = u("el-input"), _ = u("el-form-item"), d = u("el-button"), z = u("el-form"), K = u("el-col"), O = u("el-row"), h = u("el-table-column"), Q = u("el-table"), X = u("el-pagination"), F = u("el-dialog"), Y = ve("loading");
      return x(), D("div", null, [
        v("div", ge, [
          t(z, {
            inline: !0,
            model: r.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: N
          }, {
            default: l(() => [
              t(_, { label: "视频名称" }, {
                default: l(() => [
                  t(A, {
                    modelValue: r.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => r.value.name = a),
                    placeholder: "请输入视频名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(_, null, {
                default: l(() => [
                  t(d, {
                    type: "primary",
                    onClick: f,
                    icon: n(ee)
                  }, {
                    default: l(() => e[10] || (e[10] = [
                      c("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  t(d, {
                    icon: n(B),
                    onClick: H
                  }, {
                    default: l(() => e[11] || (e[11] = [
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
        t(O, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            t(K, { span: 1.5 }, {
              default: l(() => [
                t(d, {
                  icon: n(te),
                  type: "primary",
                  plain: "",
                  onClick: J
                }, {
                  default: l(() => e[12] || (e[12] = [
                    c("新增")
                  ])),
                  _: 1
                }, 8, ["icon"]),
                t(d, {
                  icon: n(le),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: l(() => e[13] || (e[13] = [
                    c("从附件导入")
                  ])),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            v("div", be, [
              t(d, {
                icon: n(B),
                circle: "",
                onClick: f
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        v("div", ye, [
          _e((x(), we(Q, {
            data: n(S),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              t(h, {
                prop: "name",
                label: "视频名称",
                "min-width": "160",
                "show-overflow-tooltip": ""
              }),
              t(h, {
                prop: "url",
                label: "视频",
                "min-width": "160"
              }, {
                default: l((a) => [
                  v("video", Ve, [
                    v("source", {
                      src: a.row.url
                    }, null, 8, ke)
                  ])
                ]),
                _: 1
              }),
              t(h, {
                prop: "description",
                label: "描述",
                "min-width": "160",
                "show-overflow-tooltip": ""
              }),
              t(h, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "140",
                "show-overflow-tooltip": ""
              }),
              t(h, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: l((a) => [
                  v("span", null, U(n(ie)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(h, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: l((a) => [
                  t(d, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(ae),
                    onClick: (Z) => W(a.row)
                  }, {
                    default: l(() => e[14] || (e[14] = [
                      c("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(d, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(oe),
                    onClick: (Z) => G(a.row)
                  }, {
                    default: l(() => e[15] || (e[15] = [
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
            [Y, n(I)]
          ]),
          t(X, {
            "current-page": r.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => r.value.pageNo = a),
            "page-size": r.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => r.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: f,
            total: r.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(F, {
          modelValue: n(s),
          "onUpdate:modelValue": e[7] || (e[7] = (a) => C(s) ? s.value = a : s = a),
          title: n(b),
          width: n(E)(600),
          draggable: ""
        }, {
          footer: l(() => [
            v("span", Ae, [
              t(d, {
                type: "primary",
                onClick: j
              }, {
                default: l(() => e[16] || (e[16] = [
                  c("确 定")
                ])),
                _: 1
              }),
              t(d, {
                onClick: e[6] || (e[6] = (a) => {
                  C(s) ? s.value = !1 : s = !1, V();
                })
              }, {
                default: l(() => e[17] || (e[17] = [
                  c("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            t(z, {
              ref_key: "addFormRef",
              ref: k,
              model: i.value,
              "label-width": "130px",
              "status-icon": "",
              rules: T
            }, {
              default: l(() => [
                t(_, {
                  label: "视频",
                  prop: "url"
                }, {
                  default: l(() => [
                    t(re, {
                      "attach-type": "video",
                      "enable-input": !0,
                      placeholder: "请选择或输入视频地址",
                      "model-value": i.value.url,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => i.value.url = a),
                      onAttachSelectChange: $
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                t(_, {
                  label: "视频名称",
                  prop: "name"
                }, {
                  default: l(() => [
                    t(A, {
                      modelValue: i.value.name,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => i.value.name = a),
                      placeholder: "请输入视频名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(_, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: l(() => [
                    t(A, {
                      modelValue: i.value.description,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => i.value.description = a),
                      placeholder: "请输入描述",
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
        }, 8, ["modelValue", "title", "width"]),
        t(F, {
          modelValue: n(p),
          "onUpdate:modelValue": e[9] || (e[9] = (a) => C(p) ? p.value = a : p = a),
          title: n(b),
          width: n(E)(1e3),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: l(() => [
            v("span", Ce, [
              t(d, {
                type: "primary",
                onClick: q
              }, {
                default: l(() => [
                  e[18] || (e[18] = c("确 定")),
                  n(y).length > 0 ? (x(), D("span", Ie, "(已选" + U(n(y).length) + "个)", 1)) : he("", !0)
                ]),
                _: 1
              }),
              t(d, {
                onClick: e[8] || (e[8] = (a) => {
                  C(p) ? p.value = !1 : p = !1, L();
                })
              }, {
                default: l(() => e[19] || (e[19] = [
                  c("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            t(se, {
              "onUpdate:selectedAttach": P,
              max: 99,
              "attach-type": "video"
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Fe = /* @__PURE__ */ ne(Ne, [["__scopeId", "data-v-f0e4150c"]]);
export {
  Fe as default
};
