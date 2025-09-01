import { p as le, d as P, A as te } from "./lib/attachLibraryItems.js";
import { s as ae, r as M, p as ie, e as oe, f as ne, d as re } from "./lib/@element-plus.js";
import ue from "./AttachLibraryItemsImg-view.js";
import de from "./AttachLibraryItemsVideo-view.js";
import se from "./AttachLibraryItemsAudio-view.js";
import pe from "./AttachLibraryItemsOther-view.js";
function me(y) {
  return axios.post("/api/auth/attachLibrary/page", y);
}
function ce(y) {
  return axios.post("/api/auth/attachLibrary/add", y);
}
function ye(y) {
  return axios.post("/api/auth/attachLibrary/update", y);
}
function fe(y) {
  return axios.delete("/api/auth/attachLibrary/del?id=" + y);
}
function ve(y) {
  return axios.get("/api/auth/attachLibrary/get?id=" + y);
}
const s = window.Vue.resolveComponent, l = window.Vue.createVNode, a = window.Vue.withCtx, o = window.Vue.openBlock, n = window.Vue.createBlock, i = window.Vue.unref, p = window.Vue.createTextVNode, C = window.Vue.createElementVNode, q = window.Vue.resolveDirective, N = window.Vue.withDirectives, be = window.Vue.createCommentVNode, we = window.Vue.toDisplayString, E = window.Vue.isRef, ge = window.Vue.createElementBlock, _e = { class: "page" }, he = { class: "search-box" }, Ve = { class: "right-tool" }, ke = { class: "table-box" }, xe = { class: "dialog-footer" }, k = window.ElementPlus.ElMessage, Le = window.ElementPlus.ElMessageBox, Ae = window.Vue.reactive, f = window.Vue.ref, Ee = {
  __name: "AttachLibraryView",
  setup(y) {
    const u = f({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      type: null,
      visibility: null
    }), r = f({
      id: null,
      name: null,
      description: null,
      type: null,
      visibility: 0,
      thumbnail: null
    }), O = Ae({
      name: [{ required: !0, message: "附件库名称不能为空", trigger: "blur" }],
      type: [{ required: !0, message: "附件库类型不能为空", trigger: "blur" }],
      visibility: [{ required: !0, message: "是否仅自己可见不能为空", trigger: "blur" }]
    }), D = f(), z = f();
    let c = f(!1), x = f(!1), L = f(""), I = f([]), F = f(!1), w = f(null);
    function j(d) {
      w.value = d, L.value = d.name, x.value = !0;
    }
    function $() {
      z.value.validate((d) => {
        d && (r.value.id ? ye(r.value).then((e) => {
          e.code === 200 ? (k.success("操作成功"), c.value = !1, A(), g()) : k.error(e.msg);
        }) : ce(r.value).then((e) => {
          e.code === 200 ? (k.success("操作成功"), c.value = !1, A(), g()) : k.error(e.msg);
        }));
      });
    }
    function G() {
      A(), L.value = "添加附件库", c.value = !0;
    }
    function W(d) {
      A(), L.value = "修改附件库", c.value = !0, ve(d.id).then((e) => {
        r.value = e.data;
      });
    }
    function H(d) {
      let e = Object.keys(d);
      Le.confirm("确定要删除[" + d[e[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        fe(d.id).then((h) => {
          h.code === 200 && h.data ? (k.success("删除成功"), g()) : k.error(h.msg);
        });
      }).catch(() => {
      });
    }
    function g() {
      F.value = !0, me(u.value).then((d) => {
        I.value = d.data.list, u.value.total = d.data.total, F.value = !1;
      });
    }
    function J() {
      u.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        type: null,
        visibility: null
      }, D.value.resetFields(), g();
    }
    function A() {
      r.value = {
        id: null,
        name: null,
        description: null,
        type: null,
        visibility: 0,
        thumbnail: null
      }, z.value && z.value.resetFields();
    }
    return g(), (d, e) => {
      const h = s("el-input"), v = s("el-form-item"), m = s("el-option"), U = s("el-select"), b = s("el-button"), R = s("el-form"), K = s("el-col"), Q = s("el-row"), _ = s("el-table-column"), X = s("el-image"), V = s("el-tag"), Y = s("el-table"), Z = s("el-pagination"), S = s("el-dialog"), B = q("hasPermission"), ee = q("loading");
      return o(), ge("div", _e, [
        C("div", he, [
          l(R, {
            inline: !0,
            model: u.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: D
          }, {
            default: a(() => [
              l(v, { label: "附件库名称" }, {
                default: a(() => [
                  l(h, {
                    modelValue: u.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => u.value.name = t),
                    placeholder: "请输入附件库名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(v, { label: "附件库类型" }, {
                default: a(() => [
                  l(U, {
                    modelValue: u.value.type,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value.type = t),
                    placeholder: "请选择附件库类型",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      l(m, {
                        key: "img",
                        label: "图库",
                        value: "img"
                      }),
                      l(m, {
                        key: "video",
                        label: "视频库",
                        value: "video"
                      }),
                      l(m, {
                        key: "audio",
                        label: "音乐库",
                        value: "audio"
                      }),
                      l(m, {
                        key: "other",
                        label: "其他",
                        value: "other"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(v, { label: "是否仅自己可见" }, {
                default: a(() => [
                  l(U, {
                    modelValue: u.value.visibility,
                    "onUpdate:modelValue": e[2] || (e[2] = (t) => u.value.visibility = t),
                    placeholder: "请选择是否仅自己可见",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (o(), n(m, {
                        key: 0,
                        label: "否",
                        value: 0
                      })),
                      (o(), n(m, {
                        key: 1,
                        label: "是",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(v, null, {
                default: a(() => [
                  l(b, {
                    type: "primary",
                    onClick: g,
                    icon: i(ae)
                  }, {
                    default: a(() => e[13] || (e[13] = [
                      p("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  l(b, {
                    icon: i(M),
                    onClick: J
                  }, {
                    default: a(() => e[14] || (e[14] = [
                      p("重置")
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
        l(Q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            l(K, { span: 1.5 }, {
              default: a(() => [
                N((o(), n(b, {
                  icon: i(ie),
                  type: "primary",
                  plain: "",
                  onClick: G
                }, {
                  default: a(() => e[15] || (e[15] = [
                    p("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [B, ["admin:attachLibrary:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", Ve, [
              l(b, {
                icon: i(M),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", ke, [
          N((o(), n(Y, {
            data: i(I),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              l(_, {
                prop: "name",
                label: "附件库名称",
                "min-width": "180"
              }),
              l(_, {
                prop: "thumbnail",
                label: "封面图",
                "min-width": "80"
              }, {
                default: a((t) => [
                  t.row.thumbnail ? (o(), n(X, {
                    key: 0,
                    style: { width: "100%", "max-height": "100%" },
                    src: t.row.thumbnail,
                    "zoom-rate": 1.2,
                    "max-scale": 7,
                    "min-scale": 0.2,
                    "preview-src-list": [t.row.thumbnail],
                    "initial-index": 4,
                    "append-to-body": "",
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : be("", !0)
                ]),
                _: 1
              }),
              l(_, {
                prop: "description",
                label: "描述",
                "min-width": "240"
              }),
              l(_, {
                prop: "type",
                label: "附件库类型",
                "min-width": "120"
              }, {
                default: a((t) => [
                  t.row.type === "img" ? (o(), n(V, {
                    key: 0,
                    type: "primary"
                  }, {
                    default: a(() => e[16] || (e[16] = [
                      p("图库")
                    ])),
                    _: 1
                  })) : t.row.type === "video" ? (o(), n(V, {
                    key: 1,
                    type: "success"
                  }, {
                    default: a(() => e[17] || (e[17] = [
                      p("视频库")
                    ])),
                    _: 1
                  })) : t.row.type === "audio" ? (o(), n(V, {
                    key: 2,
                    type: "warning"
                  }, {
                    default: a(() => e[18] || (e[18] = [
                      p("音乐库")
                    ])),
                    _: 1
                  })) : (o(), n(V, {
                    key: 3,
                    type: "info"
                  }, {
                    default: a(() => e[19] || (e[19] = [
                      p("其他")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(_, {
                prop: "visibility",
                label: "状态",
                "min-width": "120"
              }, {
                default: a((t) => [
                  t.row.visibility === 0 ? (o(), n(V, {
                    key: 0,
                    type: "success"
                  }, {
                    default: a(() => e[20] || (e[20] = [
                      p("所有人可见")
                    ])),
                    _: 1
                  })) : (o(), n(V, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: a(() => e[21] || (e[21] = [
                      p("仅自己可见")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(_, {
                prop: "userInfo.userName",
                label: "创建人",
                "min-width": "140"
              }),
              l(_, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: a((t) => [
                  C("span", null, we(i(le)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(_, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: a((t) => [
                  N((o(), n(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(oe),
                    onClick: (T) => W(t.row)
                  }, {
                    default: a(() => e[22] || (e[22] = [
                      p("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [B, ["admin:attachLibrary:update"]]
                  ]),
                  l(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(ne),
                    onClick: (T) => j(t.row)
                  }, {
                    default: a(() => e[23] || (e[23] = [
                      p("附件管理")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  N((o(), n(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: i(re),
                    onClick: (T) => H(t.row)
                  }, {
                    default: a(() => e[24] || (e[24] = [
                      p("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [B, ["admin:attachLibrary:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ee, i(F)]
          ]),
          l(Z, {
            "current-page": u.value.pageNo,
            "onUpdate:currentPage": e[3] || (e[3] = (t) => u.value.pageNo = t),
            "page-size": u.value.pageSize,
            "onUpdate:pageSize": e[4] || (e[4] = (t) => u.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: u.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(S, {
          modelValue: i(c),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => E(c) ? c.value = t : c = t),
          title: i(L),
          width: i(P)(650),
          draggable: ""
        }, {
          footer: a(() => [
            C("span", xe, [
              l(b, {
                type: "primary",
                onClick: $
              }, {
                default: a(() => e[25] || (e[25] = [
                  p("确 定")
                ])),
                _: 1
              }),
              l(b, {
                onClick: e[10] || (e[10] = (t) => {
                  E(c) ? c.value = !1 : c = !1, A();
                })
              }, {
                default: a(() => e[26] || (e[26] = [
                  p("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            l(R, {
              ref_key: "addFormRef",
              ref: z,
              model: r.value,
              "label-width": "130px",
              "status-icon": "",
              rules: O
            }, {
              default: a(() => [
                l(v, {
                  label: "附件库名称",
                  prop: "name"
                }, {
                  default: a(() => [
                    l(h, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": e[5] || (e[5] = (t) => r.value.name = t),
                      placeholder: "请输入附件库名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(v, {
                  label: "附件库类型",
                  prop: "type"
                }, {
                  default: a(() => [
                    l(U, {
                      modelValue: r.value.type,
                      "onUpdate:modelValue": e[6] || (e[6] = (t) => r.value.type = t),
                      placeholder: "请选择附件库类型",
                      style: { width: "100%" }
                    }, {
                      default: a(() => [
                        l(m, {
                          key: "img",
                          label: "图库",
                          value: "img"
                        }),
                        l(m, {
                          key: "video",
                          label: "视频库",
                          value: "video"
                        }),
                        l(m, {
                          key: "audio",
                          label: "音乐库",
                          value: "audio"
                        }),
                        l(m, {
                          key: "other",
                          label: "其他",
                          value: "other"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(v, {
                  label: "是否仅自己可见",
                  prop: "visibility"
                }, {
                  default: a(() => [
                    l(U, {
                      modelValue: r.value.visibility,
                      "onUpdate:modelValue": e[7] || (e[7] = (t) => r.value.visibility = t),
                      placeholder: "请选择是否仅自己可见",
                      style: { width: "100%" }
                    }, {
                      default: a(() => [
                        (o(), n(m, {
                          key: 0,
                          label: "否",
                          value: 0
                        })),
                        (o(), n(m, {
                          key: 1,
                          label: "是",
                          value: 1
                        }))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(v, {
                  label: "封面图",
                  prop: "thumbnail"
                }, {
                  default: a(() => [
                    l(te, {
                      "attach-type": "img",
                      "enable-input": !0,
                      placeholder: "请选择或输入封面图地址",
                      "model-value": r.value.thumbnail,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => r.value.thumbnail = t)
                    }, null, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                l(v, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: a(() => [
                    l(h, {
                      modelValue: r.value.description,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => r.value.description = t),
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
        l(S, {
          modelValue: i(x),
          "onUpdate:modelValue": e[12] || (e[12] = (t) => E(x) ? x.value = t : x = t),
          title: i(L),
          width: i(P)(1200),
          draggable: "",
          "destroy-on-close": ""
        }, {
          default: a(() => [
            i(w).type === "img" ? (o(), n(ue, {
              key: 0,
              "attach-library-id": i(w).id
            }, null, 8, ["attach-library-id"])) : i(w).type === "video" ? (o(), n(de, {
              key: 1,
              "attach-library-id": i(w).id
            }, null, 8, ["attach-library-id"])) : i(w).type === "audio" ? (o(), n(se, {
              key: 2,
              "attach-library-id": i(w).id
            }, null, 8, ["attach-library-id"])) : (o(), n(pe, {
              key: 3,
              "attach-library-id": i(w).id
            }, null, 8, ["attach-library-id"]))
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  Ee as default
};
