import { s as Y, r as K, p as Z, a as ee, e as ae, d as le, b as te, c as oe, f as ne, g as ue, h as se, i as re, j as de } from "./lib/perfree.js";
const r = window.Vue.resolveComponent, t = window.Vue.createVNode, o = window.Vue.withCtx, d = window.Vue.unref, c = window.Vue.createTextVNode, y = window.Vue.createElementVNode, u = window.Vue.openBlock, D = window.Vue.createElementBlock, g = window.Vue.createCommentVNode, m = window.Vue.createBlock, ie = window.Vue.toDisplayString, ce = window.Vue.resolveDirective, me = window.Vue.withDirectives, E = window.Vue.isRef, pe = { class: "page" }, fe = { class: "search-box" }, ge = { class: "right-tool" }, _e = { class: "table-box" }, ve = { key: 0 }, be = { key: 1 }, Ve = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, T = window.ElementPlus.ElMessageBox, we = window.Vue.reactive, v = window.Vue.ref, he = {
  __name: "AttachConfigView",
  setup(ke) {
    let N = v([]), x = v(!1);
    const A = v();
    let p = v(!1), h = v(!1), S = v("");
    const C = v(), e = v({
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
    }), q = we({
      name: [{ required: !0, message: "请输入配置名称", trigger: "blur" }],
      storage: [{ required: !0, message: "请选择存储器类型", trigger: "blur" }],
      basePath: [{ required: !0, message: "请输入存储路径", trigger: "blur" }],
      endpoint: [{ required: !0, message: "请输入节点地址", trigger: "blur" }],
      bucket: [{ required: !0, message: "请输入存储bucket", trigger: "blur" }],
      accessKey: [{ required: !0, message: "请输入accessKey", trigger: "blur" }],
      accessSecret: [{ required: !0, message: "请输入accessSecret", trigger: "blur" }]
    }), f = v({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    });
    function b() {
      x.value = !0, oe(f.value).then((s) => {
        N.value = s.data.list, f.value.total = s.data.total, x.value = !1;
      });
    }
    function R() {
      f.value = {
        name: ""
      }, A.value.resetFields();
    }
    function M() {
      h.value = !1, S.value = "新增配置", k(), p.value = !0;
    }
    function k() {
      e.value = {
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
      }, C.value && C.value.resetFields();
    }
    function j() {
      C.value.validate((s) => {
        if (s) {
          let a;
          e.value.storage === 0 ? a = {
            basePath: e.value.basePath
          } : a = {
            endpoint: e.value.endpoint,
            bucket: e.value.bucket,
            accessKey: e.value.accessKey,
            accessSecret: e.value.accessSecret,
            domain: e.value.domain,
            uploadDir: e.value.uploadDir
          };
          const i = {
            id: e.value.id,
            name: e.value.name,
            remark: e.value.remark,
            storage: e.value.storage,
            config: JSON.stringify(a)
          };
          e.value.id ? ne(i).then((n) => {
            n.code === 200 ? (V.success("修改成功"), p.value = !1, k(), b()) : V.error(n.msg);
          }) : ue(i).then((n) => {
            n.code === 200 ? (V.success("添加成功"), p.value = !1, k(), b()) : V.error(n.msg);
          });
        }
      });
    }
    function O(s) {
      if (s.master) {
        V.error("默认配置不允许删除!");
        return;
      }
      T.confirm("确定要删除[" + s.name + "]吗？删除后该配置内上传的文件将无法展示!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        se(s.id).then((a) => {
          a.code === 200 && a.data ? (V.success("删除成功"), b()) : V.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function $(s) {
      h.value = !0, S.value = "修改配置", k(), p.value = !0, re(s.id).then((a) => {
        e.value = Object.assign(a.data, JSON.parse(a.data.config));
      });
    }
    function J(s) {
      T.confirm("确定要将除[" + s.name + "]设置为主配置吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        de({ id: s.id }).then((a) => {
          V.success("修改成功"), b();
        });
      }).catch(() => {
      });
    }
    return b(), (s, a) => {
      const i = r("el-input"), n = r("el-form-item"), _ = r("el-button"), B = r("el-form"), L = r("el-col"), G = r("el-row"), w = r("el-table-column"), P = r("el-tag"), H = r("el-table"), I = r("el-pagination"), z = r("el-option"), Q = r("el-select"), U = r("el-text"), W = r("el-dialog"), X = ce("loading");
      return u(), D("div", pe, [
        y("div", fe, [
          t(B, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: A
          }, {
            default: o(() => [
              t(n, { label: "配置名称" }, {
                default: o(() => [
                  t(i, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => f.value.name = l),
                    placeholder: "请输入配置名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(n, null, {
                default: o(() => [
                  t(_, {
                    type: "primary",
                    onClick: b,
                    icon: d(Y)
                  }, {
                    default: o(() => [
                      c("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  t(_, {
                    icon: d(K),
                    onClick: R
                  }, {
                    default: o(() => [
                      c("重置")
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
        t(G, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            t(L, { span: 1.5 }, {
              default: o(() => [
                t(_, {
                  icon: d(Z),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: o(() => [
                    c("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            y("div", ge, [
              t(_, {
                icon: d(K),
                circle: "",
                onClick: b
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        y("div", _e, [
          me((u(), m(H, {
            data: d(N),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              t(w, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              t(w, {
                prop: "name",
                label: "配置名称",
                "min-width": "240"
              }),
              t(w, {
                prop: "storage",
                label: "存储器类型",
                "min-width": "240"
              }, {
                default: o((l) => [
                  l.row.storage === 0 ? (u(), D("span", ve, "本地磁盘")) : g("", !0),
                  l.row.storage === 1 ? (u(), D("span", be, "S3对象存储")) : g("", !0)
                ]),
                _: 1
              }),
              t(w, {
                prop: "remark",
                label: "备注",
                "min-width": "240"
              }),
              t(w, {
                prop: "master",
                label: "默认配置",
                "min-width": "100"
              }, {
                default: o((l) => [
                  l.row.master ? (u(), m(P, {
                    key: 0,
                    type: "success"
                  }, {
                    default: o(() => [
                      c("是")
                    ]),
                    _: 1
                  })) : (u(), m(P, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: o(() => [
                      c("否")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(w, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((l) => [
                  y("span", null, ie(d(ee)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(w, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: o((l) => [
                  t(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(ae),
                    onClick: (F) => $(l.row)
                  }, {
                    default: o(() => [
                      c("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(le),
                    onClick: (F) => J(l.row)
                  }, {
                    default: o(() => [
                      c("默认配置")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  t(_, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(te),
                    onClick: (F) => O(l.row)
                  }, {
                    default: o(() => [
                      c("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [X, d(x)]
          ]),
          t(I, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": a[1] || (a[1] = (l) => f.value.pageNo = l),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": a[2] || (a[2] = (l) => f.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: b,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(W, {
          modelValue: d(p),
          "onUpdate:modelValue": a[14] || (a[14] = (l) => E(p) ? p.value = l : p = l),
          title: d(S),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            y("span", Ve, [
              t(_, {
                type: "primary",
                onClick: j
              }, {
                default: o(() => [
                  c("确 定")
                ]),
                _: 1
              }),
              t(_, {
                onClick: a[13] || (a[13] = (l) => {
                  E(p) ? p.value = !1 : p = !1, k();
                })
              }, {
                default: o(() => [
                  c("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(B, {
              ref_key: "addFormRef",
              ref: C,
              model: e.value,
              "label-width": "120px",
              "status-icon": "",
              rules: q
            }, {
              default: o(() => [
                t(n, {
                  label: "配置名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.name,
                      "onUpdate:modelValue": a[3] || (a[3] = (l) => e.value.name = l),
                      placeholder: "请输入配置名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(n, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.remark,
                      "onUpdate:modelValue": a[4] || (a[4] = (l) => e.value.remark = l),
                      placeholder: "请输入备注"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(n, {
                  label: "存储器类型",
                  prop: "storage"
                }, {
                  default: o(() => [
                    t(Q, {
                      modelValue: e.value.storage,
                      "onUpdate:modelValue": a[5] || (a[5] = (l) => e.value.storage = l),
                      placeholder: "请选择存储器类型",
                      disabled: d(h)
                    }, {
                      default: o(() => [
                        (u(), m(z, {
                          key: 0,
                          label: "本地磁盘",
                          value: 0
                        })),
                        (u(), m(z, {
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
                e.value.storage === 0 ? (u(), m(n, {
                  key: 0,
                  label: "存储路径",
                  prop: "basePath"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.basePath,
                      "onUpdate:modelValue": a[6] || (a[6] = (l) => e.value.basePath = l),
                      placeholder: "请输入存储路径"
                    }, null, 8, ["modelValue"]),
                    d(h) ? (u(), m(U, {
                      key: 0,
                      class: "mx-1",
                      type: "danger"
                    }, {
                      default: o(() => [
                        c("提示: 修改存储路径将会造成原有上传图片不能访问,建议新增存储策略")
                      ]),
                      _: 1
                    })) : g("", !0)
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 1,
                  label: "节点地址",
                  prop: "endpoint"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.endpoint,
                      "onUpdate:modelValue": a[7] || (a[7] = (l) => e.value.endpoint = l),
                      placeholder: "请输入节点地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 2,
                  label: "存储bucket",
                  prop: "bucket"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.bucket,
                      "onUpdate:modelValue": a[8] || (a[8] = (l) => e.value.bucket = l),
                      placeholder: "请输入存储bucket"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 3,
                  label: "accessKey",
                  prop: "accessKey"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.accessKey,
                      "onUpdate:modelValue": a[9] || (a[9] = (l) => e.value.accessKey = l),
                      placeholder: "请输入accessKey"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 4,
                  label: "accessSecret",
                  prop: "accessSecret"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.accessSecret,
                      "onUpdate:modelValue": a[10] || (a[10] = (l) => e.value.accessSecret = l),
                      placeholder: "请输入accessSecret"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 5,
                  label: "上传目录",
                  prop: "uploadDir"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.uploadDir,
                      "onUpdate:modelValue": a[11] || (a[11] = (l) => e.value.uploadDir = l),
                      placeholder: "请输入上传目录"
                    }, null, 8, ["modelValue"]),
                    t(U, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: o(() => [
                        c("支持{year},{month}, {day}占位符,不填写则上传至根目录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (u(), m(n, {
                  key: 6,
                  label: "访问域名",
                  prop: "domain"
                }, {
                  default: o(() => [
                    t(i, {
                      modelValue: e.value.domain,
                      "onUpdate:modelValue": a[12] || (a[12] = (l) => e.value.domain = l),
                      placeholder: "请输入访问域名"
                    }, null, 8, ["modelValue"]),
                    t(U, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: o(() => [
                        c("如未配置访问域名,将采用节点地址 + 存储bucket的形式作为访问域名")
                      ]),
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  he as default
};
