import { p as K, d as Q } from "./lib/perfree.js";
import { m as X, a as Y, b as Z, c as ee, d as le, e as te } from "./lib/mailServer.js";
import { s as ae, r as M, d as oe, p as ne, e as ue, a as re } from "./lib/@element-plus.js";
const s = window.Vue.resolveComponent, l = window.Vue.createVNode, a = window.Vue.withCtx, r = window.Vue.unref, d = window.Vue.createTextVNode, L = window.Vue.resolveDirective, c = window.Vue.openBlock, v = window.Vue.createBlock, S = window.Vue.withDirectives, x = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const ie = window.Vue.toDisplayString, z = window.Vue.isRef, se = window.Vue.createElementBlock, de = { class: "page" }, me = { class: "search-box" }, pe = { class: "right-tool" }, ce = { class: "table-box" }, ve = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, fe = window.ElementPlus.ElMessageBox, we = window.Vue.reactive, _ = window.Vue.ref, Se = {
  __name: "MailServerView",
  setup(ge) {
    const n = _({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      account: null
    }), o = _({
      id: null,
      name: null,
      account: null,
      userName: null,
      password: null,
      address: null,
      port: null,
      status: 0,
      enableSSL: 0
    }), F = we({
      name: [{ required: !0, message: "邮箱服务名称不能为空", trigger: "blur" }],
      account: [
        { required: !0, message: "邮箱服务账号不能为空", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
      ],
      userName: [{ required: !0, message: "邮箱服务用户名不能为空", trigger: "blur" }],
      password: [{ required: !0, message: "邮箱服务密码不能为空", trigger: "blur" }],
      address: [{ required: !0, message: "邮箱服务SMTP域名不能为空", trigger: "blur" }],
      port: [{ required: !0, message: "邮箱服务SMTP端口不能为空", trigger: "blur" }],
      status: [{ required: !0, message: "状态不能为空", trigger: "blur" }],
      enableSSL: [{ required: !0, message: "是否开启SSL不能为空", trigger: "blur" }]
    }), U = _(), N = _();
    let m = _(!1), T = _(""), h = _([]), b = _(!1);
    function A() {
      N.value.validate((u) => {
        u && (o.value.id ? X(o.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), m.value = !1, y(), g()) : V.error(e.msg);
        }) : Y(o.value).then((e) => {
          e.code === 200 ? (V.success("操作成功"), m.value = !1, y(), g()) : V.error(e.msg);
        }));
      });
    }
    function B() {
      y(), T.value = "添加邮箱服务", m.value = !0;
    }
    function q(u) {
      y(), T.value = "修改邮箱服务", m.value = !0, Z(u.id).then((e) => {
        o.value = e.data;
      });
    }
    function D(u) {
      let e = Object.keys(u);
      fe.confirm("确定要删除[" + u[e[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ee(u.id).then((i) => {
          i.code === 200 && i.data ? (V.success("删除成功"), g()) : V.error(i.msg);
        });
      }).catch(() => {
      });
    }
    function g() {
      b.value = !0, le(n.value).then((u) => {
        h.value = u.data.list, n.value.total = u.data.total, b.value = !1;
      });
    }
    function R() {
      n.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        account: null
      }, U.value.resetFields(), g();
    }
    function y() {
      o.value = {
        id: null,
        name: null,
        account: null,
        userName: null,
        password: null,
        address: null,
        port: null,
        status: 0,
        enableSSL: 0
      }, N.value && N.value.resetFields();
    }
    function j() {
      b.value = !0, te(n.value).then((u) => {
        window.download.excel(u, "邮箱服务数据.xlsx"), b.value = !1;
      }).catch((u) => {
        V.error("导出失败"), b.value = !1;
      });
    }
    return g(), (u, e) => {
      const i = s("el-input"), p = s("el-form-item"), f = s("el-button"), P = s("el-form"), $ = s("el-col"), G = s("el-row"), w = s("el-table-column"), C = s("el-tag"), O = s("el-table"), W = s("el-pagination"), E = s("el-switch"), H = s("el-dialog"), k = L("hasPermission"), I = L("loading");
      return c(), se("div", de, [
        x("div", me, [
          l(P, {
            inline: !0,
            model: n.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: U
          }, {
            default: a(() => [
              l(p, { label: "名称" }, {
                default: a(() => [
                  l(i, {
                    modelValue: n.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => n.value.name = t),
                    placeholder: "请输入邮箱服务名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(p, { label: "账号" }, {
                default: a(() => [
                  l(i, {
                    modelValue: n.value.account,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => n.value.account = t),
                    placeholder: "请输入邮箱服务账号",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(p, null, {
                default: a(() => [
                  S((c(), v(f, {
                    type: "primary",
                    onClick: g,
                    icon: r(ae)
                  }, {
                    default: a(() => e[14] || (e[14] = [
                      d("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [k, ["admin:mailServer:query"]]
                  ]),
                  l(f, {
                    icon: r(M),
                    onClick: R
                  }, {
                    default: a(() => e[15] || (e[15] = [
                      d("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  S((c(), v(f, {
                    icon: r(oe),
                    onClick: j
                  }, {
                    default: a(() => e[16] || (e[16] = [
                      d("导出")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [k, ["admin:mailServer:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        l(G, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            l($, { span: 1.5 }, {
              default: a(() => [
                S((c(), v(f, {
                  icon: r(ne),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: a(() => e[17] || (e[17] = [
                    d("新增")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [k, ["admin:mailServer:create"]]
                ])
              ]),
              _: 1
            }),
            x("div", pe, [
              l(f, {
                icon: r(M),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        x("div", ce, [
          S((c(), v(O, {
            data: r(h),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              l(w, {
                prop: "name",
                label: "名称",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(w, {
                prop: "account",
                label: "账号",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(w, {
                prop: "userName",
                label: "用户名",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(w, {
                prop: "address",
                label: "SMTP域名",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(w, {
                prop: "port",
                label: "SMTP端口",
                "min-width": "80",
                "show-overflow-tooltip": ""
              }),
              l(w, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: a((t) => [
                  t.row.status === 0 ? (c(), v(C, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: a(() => e[18] || (e[18] = [
                      d("启用")
                    ])),
                    _: 1
                  })) : (c(), v(C, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: a(() => e[19] || (e[19] = [
                      d("禁用")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(w, {
                prop: "enableSSL",
                label: "SSL",
                "min-width": "80"
              }, {
                default: a((t) => [
                  t.row.enableSSL === 0 ? (c(), v(C, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: a(() => e[20] || (e[20] = [
                      d("启用")
                    ])),
                    _: 1
                  })) : (c(), v(C, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: a(() => e[21] || (e[21] = [
                      d("禁用")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(w, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "180"
              }, {
                default: a((t) => [
                  x("span", null, ie(r(K)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(w, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: a((t) => [
                  S((c(), v(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(ue),
                    onClick: (J) => q(t.row)
                  }, {
                    default: a(() => e[22] || (e[22] = [
                      d("修改")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [k, ["admin:mailServer:update"]]
                  ]),
                  S((c(), v(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(re),
                    onClick: (J) => D(t.row)
                  }, {
                    default: a(() => e[23] || (e[23] = [
                      d("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [k, ["admin:mailServer:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [I, r(b)]
          ]),
          l(W, {
            "current-page": n.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => n.value.pageNo = t),
            "page-size": n.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => n.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: n.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(H, {
          modelValue: r(m),
          "onUpdate:modelValue": e[13] || (e[13] = (t) => z(m) ? m.value = t : m = t),
          title: r(T),
          width: r(Q)(600),
          draggable: ""
        }, {
          footer: a(() => [
            x("span", ve, [
              l(f, {
                type: "primary",
                onClick: A
              }, {
                default: a(() => e[24] || (e[24] = [
                  d("确 定")
                ])),
                _: 1
              }),
              l(f, {
                onClick: e[12] || (e[12] = (t) => {
                  z(m) ? m.value = !1 : m = !1, y();
                })
              }, {
                default: a(() => e[25] || (e[25] = [
                  d("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            l(P, {
              ref_key: "addFormRef",
              ref: N,
              model: o.value,
              "label-width": "100px",
              "status-icon": "",
              rules: F
            }, {
              default: a(() => [
                l(p, {
                  label: "名称",
                  prop: "name"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.name,
                      "onUpdate:modelValue": e[4] || (e[4] = (t) => o.value.name = t),
                      placeholder: "请输入邮箱服务名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "账号",
                  prop: "account"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.account,
                      "onUpdate:modelValue": e[5] || (e[5] = (t) => o.value.account = t),
                      placeholder: "请输入邮箱服务账号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "密码",
                  prop: "password"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.password,
                      "onUpdate:modelValue": e[6] || (e[6] = (t) => o.value.password = t),
                      placeholder: "请输入邮箱服务密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "用户名",
                  prop: "userName"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.userName,
                      "onUpdate:modelValue": e[7] || (e[7] = (t) => o.value.userName = t),
                      placeholder: "请输入邮箱服务用户名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "SMTP域名",
                  prop: "address"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.address,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => o.value.address = t),
                      placeholder: "请输入邮箱服务SMTP域名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "SMTP端口",
                  prop: "port"
                }, {
                  default: a(() => [
                    l(i, {
                      modelValue: o.value.port,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => o.value.port = t),
                      placeholder: "请输入邮箱服务SMTP端口"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "状态",
                  prop: "status"
                }, {
                  default: a(() => [
                    l(E, {
                      modelValue: o.value.status,
                      "onUpdate:modelValue": e[10] || (e[10] = (t) => o.value.status = t),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "SSL",
                  prop: "enableSSL"
                }, {
                  default: a(() => [
                    l(E, {
                      modelValue: o.value.enableSSL,
                      "onUpdate:modelValue": e[11] || (e[11] = (t) => o.value.enableSSL = t),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
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
