import { h as S, g as A, s as W, c as z, t as G } from "./lib/tabs.js";
function H(g) {
  return axios.post("/api/auth/menu/page", g);
}
const v = window.Vue.unref, r = window.Vue.resolveComponent, o = window.Vue.openBlock, t = window.Vue.createBlock, a = window.Vue.withCtx, e = window.Vue.createVNode, J = window.Vue.resolveDirective, K = window.Vue.withDirectives, N = window.Vue.createTextVNode, X = window.Vue.createElementVNode, Y = window.Vue.isRef, Z = window.Vue.createElementBlock, $ = { class: "page" }, ee = { style: { "text-align": "center", "margin-top": "15px" } }, le = window.ElementPlus.ElMessage, D = window.Vue.reactive, s = window.Vue.ref, ae = window.VueRouter.useRoute, te = {
  __name: "CodegenEditConfig",
  setup(g) {
    let w = s("base");
    const k = ae(), m = s({
      id: "",
      scene: 0,
      moduleName: "",
      className: "",
      classComment: "",
      author: "",
      parentMenuId: "-1"
    }), B = D({
      name: [{ required: !0, message: "请输入角色名称", trigger: "blur" }],
      code: [{ required: !0, message: "请输入角色编码", trigger: "blur" }]
    }), j = s();
    let y = s([]), U = s([]), h = s(!1);
    const I = D({
      children: "children",
      label: "name",
      value: "id"
    });
    function O() {
      H({ type: 1 }).then((p) => {
        U.value = [{ id: "-1", name: "主类目", children: S(p.data, "id", "pid", "children", "-1") }];
      });
    }
    function E() {
      h.value = !0, A(k.params.id).then((p) => {
        p.code === 200 && (m.value = p.data.codegenTable, y.value = p.data.codegenColumnList, h.value = !1);
      });
    }
    function R() {
      let p = {
        codegenTable: m.value,
        codegenColumnList: y.value
      };
      W(p).then((d) => {
        d.code === 200 && (le.success("配置成功"), T());
      });
    }
    function T() {
      z(k.fullPath), G("", "/admin/codegen", "");
    }
    return O(), E(), (p, d) => {
      const n = r("el-option"), V = r("el-select"), c = r("el-form-item"), _ = r("el-col"), M = r("el-tree-select"), b = r("el-input"), F = r("el-row"), L = r("el-form"), x = r("el-tab-pane"), i = r("el-table-column"), f = r("el-checkbox"), q = r("el-table"), C = r("el-button"), P = r("el-tabs"), Q = J("loading");
      return o(), Z("div", $, [
        e(P, {
          modelValue: v(w),
          "onUpdate:modelValue": d[5] || (d[5] = (l) => Y(w) ? w.value = l : w = l)
        }, {
          default: a(() => [
            e(x, {
              label: "基础信息",
              name: "base"
            }, {
              default: a(() => [
                e(L, {
                  ref_key: "baseFormRef",
                  ref: j,
                  model: m.value,
                  "label-width": "80px",
                  "status-icon": "",
                  rules: B
                }, {
                  default: a(() => [
                    e(F, { gutter: 24 }, {
                      default: a(() => [
                        e(_, { span: 12 }, {
                          default: a(() => [
                            e(c, {
                              label: "生成场景",
                              prop: "scene"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: m.value.scene,
                                  "onUpdate:modelValue": d[0] || (d[0] = (l) => m.value.scene = l),
                                  placeholder: "请选择生成场景",
                                  style: { width: "240px" }
                                }, {
                                  default: a(() => [
                                    (o(), t(n, {
                                      key: 0,
                                      label: "后台代码",
                                      value: 0
                                    })),
                                    (o(), t(n, {
                                      key: 1,
                                      label: "插件代码",
                                      value: 1
                                    }))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(_, { span: 12 }, {
                          default: a(() => [
                            e(c, {
                              label: "父级菜单",
                              prop: "parentMenuId"
                            }, {
                              default: a(() => [
                                e(M, {
                                  modelValue: m.value.parentMenuId,
                                  "onUpdate:modelValue": d[1] || (d[1] = (l) => m.value.parentMenuId = l),
                                  data: v(U),
                                  props: I,
                                  "check-strictly": "",
                                  "render-after-expand": !1,
                                  style: { width: "240px" },
                                  clearable: ""
                                }, null, 8, ["modelValue", "data", "props"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(_, { span: 12 }, {
                          default: a(() => [
                            e(c, {
                              label: "模块名称",
                              prop: "moduleName"
                            }, {
                              default: a(() => [
                                e(b, {
                                  modelValue: m.value.moduleName,
                                  "onUpdate:modelValue": d[2] || (d[2] = (l) => m.value.moduleName = l),
                                  placeholder: "请输入模块名称"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(_, { span: 12 }, {
                          default: a(() => [
                            e(c, {
                              label: "类名称",
                              prop: "className"
                            }, {
                              default: a(() => [
                                e(b, {
                                  modelValue: m.value.className,
                                  "onUpdate:modelValue": d[3] || (d[3] = (l) => m.value.className = l),
                                  placeholder: "请输入类名称"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(_, { span: 12 }, {
                          default: a(() => [
                            e(c, {
                              label: "作者",
                              prop: "author"
                            }, {
                              default: a(() => [
                                e(b, {
                                  modelValue: m.value.author,
                                  "onUpdate:modelValue": d[4] || (d[4] = (l) => m.value.author = l),
                                  placeholder: "请输入作者"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model", "rules"])
              ]),
              _: 1
            }),
            e(x, {
              label: "字段配置",
              name: "column"
            }, {
              default: a(() => [
                K((o(), t(q, {
                  data: v(y),
                  style: { width: "100%", height: "100%" },
                  "row-key": "id",
                  "max-height": "600px"
                }, {
                  default: a(() => [
                    e(i, {
                      prop: "columnName",
                      label: "字段名称",
                      "min-width": "100"
                    }),
                    e(i, {
                      prop: "dataType",
                      label: "字段类型",
                      "min-width": "100"
                    }),
                    e(i, {
                      prop: "columnComment",
                      label: "字段描述",
                      "min-width": "120"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.columnComment,
                          "onUpdate:modelValue": (u) => l.row.columnComment = u,
                          placeholder: "字段描述"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "javaType",
                      label: "java类型",
                      "min-width": "160"
                    }, {
                      default: a((l) => [
                        e(V, {
                          modelValue: l.row.javaType,
                          "onUpdate:modelValue": (u) => l.row.javaType = u,
                          placeholder: "java类型",
                          style: { width: "160px" }
                        }, {
                          default: a(() => [
                            (o(), t(n, {
                              key: 0,
                              label: "Long",
                              value: "Long"
                            })),
                            (o(), t(n, {
                              key: 1,
                              label: "String",
                              value: "String"
                            })),
                            (o(), t(n, {
                              key: 2,
                              label: "Integer",
                              value: "Integer"
                            })),
                            (o(), t(n, {
                              key: 3,
                              label: "Double",
                              value: "Double"
                            })),
                            (o(), t(n, {
                              key: 4,
                              label: "BigDecimal",
                              value: "BigDecimal"
                            })),
                            (o(), t(n, {
                              key: 5,
                              label: "LocalDateTime",
                              value: "LocalDateTime"
                            })),
                            (o(), t(n, {
                              key: 6,
                              label: "Date",
                              value: "Date"
                            })),
                            (o(), t(n, {
                              key: 7,
                              label: "Boolean",
                              value: "Boolean"
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "javaField",
                      label: "java字段名",
                      "min-width": "100"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.javaField,
                          "onUpdate:modelValue": (u) => l.row.javaField = u,
                          placeholder: "java字段名"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "formOperation",
                      label: "表单",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(f, {
                          modelValue: l.row.formOperation,
                          "onUpdate:modelValue": (u) => l.row.formOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "listOperation",
                      label: "列表",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(f, {
                          modelValue: l.row.listOperation,
                          "onUpdate:modelValue": (u) => l.row.listOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "listQueryOperation",
                      label: "查询",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(f, {
                          modelValue: l.row.listQueryOperation,
                          "onUpdate:modelValue": (u) => l.row.listQueryOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "nullable",
                      label: "允许空",
                      "min-width": "70"
                    }, {
                      default: a((l) => [
                        e(f, {
                          modelValue: l.row.nullable,
                          "onUpdate:modelValue": (u) => l.row.nullable = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "formType",
                      label: "表单类型",
                      "min-width": "100"
                    }, {
                      default: a((l) => [
                        e(V, {
                          modelValue: l.row.formType,
                          "onUpdate:modelValue": (u) => l.row.formType = u,
                          placeholder: "表单类型",
                          style: { width: "100px" }
                        }, {
                          default: a(() => [
                            (o(), t(n, {
                              key: 0,
                              label: "文本框",
                              value: 0
                            })),
                            (o(), t(n, {
                              key: 1,
                              label: "文本域",
                              value: 1
                            })),
                            (o(), t(n, {
                              key: 2,
                              label: "单选框",
                              value: 2
                            })),
                            (o(), t(n, {
                              key: 3,
                              label: "下拉框",
                              value: 3
                            })),
                            (o(), t(n, {
                              key: 4,
                              label: "日期框",
                              value: 4
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "queryType",
                      label: "查询方式",
                      "min-width": "100"
                    }, {
                      default: a((l) => [
                        e(V, {
                          modelValue: l.row.queryType,
                          "onUpdate:modelValue": (u) => l.row.queryType = u,
                          placeholder: "查询方式",
                          style: { width: "100px" }
                        }, {
                          default: a(() => [
                            (o(), t(n, {
                              key: 0,
                              label: "=",
                              value: 0
                            })),
                            (o(), t(n, {
                              key: 1,
                              label: "!=",
                              value: 1
                            })),
                            (o(), t(n, {
                              key: 2,
                              label: ">=",
                              value: 2
                            })),
                            (o(), t(n, {
                              key: 3,
                              label: "<=",
                              value: 3
                            })),
                            (o(), t(n, {
                              key: 4,
                              label: "like",
                              value: 4
                            })),
                            (o(), t(n, {
                              key: 5,
                              label: "NotNull",
                              value: 5
                            })),
                            (o(), t(n, {
                              key: 6,
                              label: "BetWeen",
                              value: 6
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [Q, v(h)]
                ])
              ]),
              _: 1
            }),
            X("div", ee, [
              e(C, {
                type: "primary",
                onClick: R
              }, {
                default: a(() => [
                  N("提交")
                ]),
                _: 1
              }),
              e(C, { onClick: T }, {
                default: a(() => [
                  N("返回")
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
export {
  te as default
};
