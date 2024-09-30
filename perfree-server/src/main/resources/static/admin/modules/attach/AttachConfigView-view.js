import { p as le, d as ae, a as te, b as oe, c as ne, e as se, g as ue, f as re } from "./lib/perfree.js";
import { s as ie, r as T, p as de, e as me, d as ce, a as pe } from "./lib/@element-plus.js";
const d = window.Vue.resolveComponent, o = window.Vue.createVNode, t = window.Vue.withCtx, r = window.Vue.unref, c = window.Vue.createTextVNode, q = window.Vue.resolveDirective, n = window.Vue.openBlock, u = window.Vue.createBlock, k = window.Vue.withDirectives, h = window.Vue.createElementVNode, P = window.Vue.createElementBlock, g = window.Vue.createCommentVNode, fe = window.Vue.toDisplayString, R = window.Vue.isRef, ge = { class: "page" }, ve = { class: "search-box" }, _e = { class: "right-tool" }, be = { class: "table-box" }, we = { key: 0 }, Ve = { key: 1 }, ke = { class: "dialog-footer" }, w = window.ElementPlus.ElMessage, M = window.ElementPlus.ElMessageBox, ye = window.Vue.reactive, b = window.Vue.ref, Se = {
  __name: "AttachConfigView",
  setup(Ce) {
    let z = b([]), U = b(!1);
    const A = b();
    let p = b(!1), x = b(!1), D = b("");
    const S = b(), l = b({
      id: "",
      name: "",
      remark: "",
      storage: void 0,
      basePath: "",
      endpoint: "",
      bucket: "",
      accessKey: "",
      accessSecret: "",
      domain: "",
      uploadDir: ""
    }), O = ye({
      name: [{ required: !0, message: "请输入配置名称", trigger: "blur" }],
      storage: [{ required: !0, message: "请选择存储器类型", trigger: "blur" }],
      basePath: [{ required: !0, message: "请输入存储路径", trigger: "blur" }],
      endpoint: [{ required: !0, message: "请输入节点地址", trigger: "blur" }],
      bucket: [{ required: !0, message: "请输入存储bucket", trigger: "blur" }],
      accessKey: [{ required: !0, message: "请输入accessKey", trigger: "blur" }],
      accessSecret: [{ required: !0, message: "请输入accessSecret", trigger: "blur" }]
    }), f = b({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    });
    function v() {
      U.value = !0, te(f.value).then((i) => {
        z.value = i.data.list, f.value.total = i.data.total, U.value = !1;
      });
    }
    function $() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, A.value.resetFields(), v();
    }
    function j() {
      x.value = !1, D.value = "新增配置", y(), p.value = !0;
    }
    function y() {
      l.value = {
        id: "",
        name: "",
        remark: "",
        storage: void 0,
        basePath: "",
        endpoint: "",
        bucket: "",
        accessKey: "",
        accessSecret: "",
        domain: "",
        uploadDir: ""
      }, S.value && S.value.resetFields();
    }
    function J() {
      S.value.validate((i) => {
        if (i) {
          let e;
          l.value.storage === 0 ? e = {
            basePath: l.value.basePath
          } : e = {
            endpoint: l.value.endpoint,
            bucket: l.value.bucket,
            accessKey: l.value.accessKey,
            accessSecret: l.value.accessSecret,
            domain: l.value.domain,
            uploadDir: l.value.uploadDir
          };
          const m = {
            id: l.value.id,
            name: l.value.name,
            remark: l.value.remark,
            storage: l.value.storage,
            config: JSON.stringify(e)
          };
          l.value.id ? oe(m).then((s) => {
            s.code === 200 ? (w.success("修改成功"), p.value = !1, y(), v()) : w.error(s.msg);
          }) : ne(m).then((s) => {
            s.code === 200 ? (w.success("添加成功"), p.value = !1, y(), v()) : w.error(s.msg);
          });
        }
      });
    }
    function L(i) {
      if (i.master) {
        w.error("默认配置不允许删除!");
        return;
      }
      M.confirm("确定要删除[" + i.name + "]吗？删除后该配置内上传的文件将无法展示!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        se(i.id).then((e) => {
          e.code === 200 && e.data ? (w.success("删除成功"), v()) : w.error(e.msg);
        });
      }).catch(() => {
      });
    }
    function W(i) {
      x.value = !0, D.value = "修改配置", y(), p.value = !0, ue(i.id).then((e) => {
        l.value = Object.assign(e.data, JSON.parse(e.data.config));
      });
    }
    function G(i) {
      M.confirm("确定要将除[" + i.name + "]设置为主配置吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        re({ id: i.id }).then((e) => {
          w.success("修改成功"), v();
        });
      }).catch(() => {
      });
    }
    return v(), (i, e) => {
      const m = d("el-input"), s = d("el-form-item"), _ = d("el-button"), B = d("el-form"), H = d("el-col"), I = d("el-row"), V = d("el-table-column"), F = d("el-tag"), Q = d("el-table"), X = d("el-pagination"), K = d("el-option"), Y = d("el-select"), N = d("el-text"), Z = d("el-dialog"), C = q("hasPermission"), ee = q("loading");
      return n(), P("div", ge, [
        h("div", ve, [
          o(B, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: A
          }, {
            default: t(() => [
              o(s, { label: "配置名称" }, {
                default: t(() => [
                  o(m, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (a) => f.value.name = a),
                    placeholder: "请输入配置名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(s, null, {
                default: t(() => [
                  k((n(), u(_, {
                    type: "primary",
                    onClick: v,
                    icon: r(ie)
                  }, {
                    default: t(() => e[15] || (e[15] = [
                      c("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [C, ["admin:attachConfig:query"]]
                  ]),
                  o(_, {
                    icon: r(T),
                    onClick: $
                  }, {
                    default: t(() => e[16] || (e[16] = [
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
        o(I, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            o(H, { span: 1.5 }, {
              default: t(() => [
                k((n(), u(_, {
                  icon: r(de),
                  type: "primary",
                  plain: "",
                  onClick: j
                }, {
                  default: t(() => e[17] || (e[17] = [
                    c("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [C, ["admin:attachConfig:create"]]
                ])
              ]),
              _: 1
            }),
            h("div", _e, [
              o(_, {
                icon: r(T),
                circle: "",
                onClick: v
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        h("div", be, [
          k((n(), u(Q, {
            data: r(z),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: t(() => [
              o(V, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              o(V, {
                prop: "name",
                label: "配置名称",
                "min-width": "240",
                "show-overflow-tooltip": ""
              }),
              o(V, {
                prop: "storage",
                label: "存储器类型",
                "min-width": "240"
              }, {
                default: t((a) => [
                  a.row.storage === 0 ? (n(), P("span", we, "本地磁盘")) : g("", !0),
                  a.row.storage === 1 ? (n(), P("span", Ve, "S3对象存储")) : g("", !0)
                ]),
                _: 1
              }),
              o(V, {
                prop: "remark",
                label: "备注",
                "min-width": "240",
                "show-overflow-tooltip": ""
              }),
              o(V, {
                prop: "master",
                label: "默认配置",
                "min-width": "100"
              }, {
                default: t((a) => [
                  a.row.master ? (n(), u(F, {
                    key: 0,
                    type: "success"
                  }, {
                    default: t(() => e[18] || (e[18] = [
                      c("是")
                    ])),
                    _: 1
                  })) : (n(), u(F, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: t(() => e[19] || (e[19] = [
                      c("否")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              o(V, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: t((a) => [
                  h("span", null, fe(r(le)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              o(V, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: t((a) => [
                  k((n(), u(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(me),
                    onClick: (E) => W(a.row)
                  }, {
                    default: t(() => e[20] || (e[20] = [
                      c("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:attachConfig:update"]]
                  ]),
                  k((n(), u(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(ce),
                    onClick: (E) => G(a.row)
                  }, {
                    default: t(() => e[21] || (e[21] = [
                      c("默认配置")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:attachConfig:master"]]
                  ]),
                  k((n(), u(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(pe),
                    onClick: (E) => L(a.row)
                  }, {
                    default: t(() => e[22] || (e[22] = [
                      c("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [C, ["admin:attachConfig:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ee, r(U)]
          ]),
          o(X, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": e[1] || (e[1] = (a) => f.value.pageNo = a),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": e[2] || (e[2] = (a) => f.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: v,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(Z, {
          modelValue: r(p),
          "onUpdate:modelValue": e[14] || (e[14] = (a) => R(p) ? p.value = a : p = a),
          title: r(D),
          width: r(ae)(600),
          draggable: ""
        }, {
          footer: t(() => [
            h("span", ke, [
              o(_, {
                type: "primary",
                onClick: J
              }, {
                default: t(() => e[26] || (e[26] = [
                  c("确 定")
                ])),
                _: 1
              }),
              o(_, {
                onClick: e[13] || (e[13] = (a) => {
                  R(p) ? p.value = !1 : p = !1, y();
                })
              }, {
                default: t(() => e[27] || (e[27] = [
                  c("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            o(B, {
              ref_key: "addFormRef",
              ref: S,
              model: l.value,
              "label-width": "120px",
              "status-icon": "",
              rules: O
            }, {
              default: t(() => [
                o(s, {
                  label: "配置名称",
                  prop: "name"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.name,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => l.value.name = a),
                      placeholder: "请输入配置名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(s, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.remark,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => l.value.remark = a),
                      placeholder: "请输入备注"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(s, {
                  label: "存储器类型",
                  prop: "storage"
                }, {
                  default: t(() => [
                    o(Y, {
                      modelValue: l.value.storage,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => l.value.storage = a),
                      placeholder: "请选择存储器类型",
                      disabled: r(x)
                    }, {
                      default: t(() => [
                        (n(), u(K, {
                          key: 0,
                          label: "本地磁盘",
                          value: 0
                        })),
                        (n(), u(K, {
                          key: 1,
                          label: "S3对象存储",
                          value: 1
                        }))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "disabled"])
                  ]),
                  _: 1
                }),
                l.value.storage === 0 ? (n(), u(s, {
                  key: 0,
                  label: "存储路径",
                  prop: "basePath"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.basePath,
                      "onUpdate:modelValue": e[6] || (e[6] = (a) => l.value.basePath = a),
                      placeholder: "请输入存储路径"
                    }, null, 8, ["modelValue"]),
                    r(x) ? (n(), u(N, {
                      key: 0,
                      class: "mx-1",
                      type: "danger"
                    }, {
                      default: t(() => e[23] || (e[23] = [
                        c("提示: 修改存储路径将会造成原有上传图片不能访问,建议新增存储策略")
                      ])),
                      _: 1
                    })) : g("", !0)
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 1,
                  label: "节点地址",
                  prop: "endpoint"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.endpoint,
                      "onUpdate:modelValue": e[7] || (e[7] = (a) => l.value.endpoint = a),
                      placeholder: "请输入节点地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 2,
                  label: "存储bucket",
                  prop: "bucket"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.bucket,
                      "onUpdate:modelValue": e[8] || (e[8] = (a) => l.value.bucket = a),
                      placeholder: "请输入存储bucket"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 3,
                  label: "accessKey",
                  prop: "accessKey"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.accessKey,
                      "onUpdate:modelValue": e[9] || (e[9] = (a) => l.value.accessKey = a),
                      placeholder: "请输入accessKey"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 4,
                  label: "accessSecret",
                  prop: "accessSecret"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.accessSecret,
                      "onUpdate:modelValue": e[10] || (e[10] = (a) => l.value.accessSecret = a),
                      placeholder: "请输入accessSecret"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 5,
                  label: "上传目录",
                  prop: "uploadDir"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.uploadDir,
                      "onUpdate:modelValue": e[11] || (e[11] = (a) => l.value.uploadDir = a),
                      placeholder: "请输入上传目录"
                    }, null, 8, ["modelValue"]),
                    o(N, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: t(() => e[24] || (e[24] = [
                        c("支持{year},{month}, {day}占位符,不填写则上传至根目录")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : g("", !0),
                l.value.storage === 1 ? (n(), u(s, {
                  key: 6,
                  label: "访问域名",
                  prop: "domain"
                }, {
                  default: t(() => [
                    o(m, {
                      modelValue: l.value.domain,
                      "onUpdate:modelValue": e[12] || (e[12] = (a) => l.value.domain = a),
                      placeholder: "请输入访问域名"
                    }, null, 8, ["modelValue"]),
                    o(N, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: t(() => e[25] || (e[25] = [
                        c("如未配置访问域名,将采用节点地址 + 存储bucket的形式作为访问域名")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : g("", !0)
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  Se as default
};
