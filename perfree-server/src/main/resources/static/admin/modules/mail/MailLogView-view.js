import { p as F } from "./lib/perfree.js";
import { s as A, r as D, d as R } from "./lib/@element-plus.js";
function j(_) {
  return axios.post("/api/auth/mailLog/page", _);
}
function q(_) {
  return axios.post("/api/auth/mailLog/export", _, { responseType: "blob" });
}
const n = window.Vue.resolveComponent, l = window.Vue.createVNode, a = window.Vue.withCtx, i = window.Vue.openBlock, u = window.Vue.createBlock, r = window.Vue.unref, w = window.Vue.createTextVNode, M = window.Vue.resolveDirective, b = window.Vue.withDirectives, g = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const G = window.Vue.toDisplayString, H = window.Vue.createElementBlock, I = { class: "page" }, J = { class: "search-box" }, K = { class: "right-tool" }, O = { class: "table-box" }, Q = window.ElementPlus.ElMessage;
window.ElementPlus.ElMessageBox;
window.Vue.reactive;
const V = window.Vue.ref, Y = {
  __name: "MailLogView",
  setup(_) {
    const o = V({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      mailTemplateCode: null,
      sendDate: [],
      receiveMail: null,
      mailTitle: null,
      sendStatus: null,
      sendMail: null
    }), h = V();
    let x = V([]), p = V(!1);
    function c() {
      p.value = !0, j(o.value).then((m) => {
        x.value = m.data.list, o.value.total = m.data.total, p.value = !1;
      });
    }
    function S() {
      o.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        mailTemplateCode: null,
        sendDate: [],
        receiveMail: null,
        mailTitle: null,
        sendStatus: null,
        sendMail: null
      }, h.value.resetFields(), c();
    }
    function T() {
      p.value = !0, q(o.value).then((m) => {
        window.download.excel(m, "邮件日志数据.xlsx"), p.value = !1;
      }).catch((m) => {
        Q.error("导出失败"), p.value = !1;
      });
    }
    return c(), (m, e) => {
      const v = n("el-input"), s = n("el-form-item"), E = n("el-date-picker"), k = n("el-option"), N = n("el-select"), f = n("el-button"), z = n("el-form"), L = n("el-row"), d = n("el-table-column"), y = n("el-tag"), U = n("el-table"), B = n("el-pagination"), C = M("hasPermission"), P = M("loading");
      return i(), H("div", I, [
        g("div", J, [
          l(z, {
            inline: !0,
            model: o.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: h
          }, {
            default: a(() => [
              l(s, { label: "模板编号" }, {
                default: a(() => [
                  l(v, {
                    modelValue: o.value.mailTemplateCode,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => o.value.mailTemplateCode = t),
                    placeholder: "请输入模板编号",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "发送时间" }, {
                default: a(() => [
                  l(E, {
                    modelValue: o.value.sendDate,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => o.value.sendDate = t),
                    type: "datetimerange",
                    "start-placeholder": "请选择开始时间",
                    "end-placeholder": "请选择结束时间",
                    "default-time": [/* @__PURE__ */ new Date("1 00:00:00"), /* @__PURE__ */ new Date("1 23:59:59")]
                  }, null, 8, ["modelValue", "default-time"])
                ]),
                _: 1
              }),
              l(s, { label: "接收邮箱" }, {
                default: a(() => [
                  l(v, {
                    modelValue: o.value.receiveMail,
                    "onUpdate:modelValue": e[2] || (e[2] = (t) => o.value.receiveMail = t),
                    placeholder: "请输入接收邮箱",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "邮件标题" }, {
                default: a(() => [
                  l(v, {
                    modelValue: o.value.mailTitle,
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => o.value.mailTitle = t),
                    placeholder: "请输入邮件标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "发送状态" }, {
                default: a(() => [
                  l(N, {
                    modelValue: o.value.sendStatus,
                    "onUpdate:modelValue": e[4] || (e[4] = (t) => o.value.sendStatus = t),
                    placeholder: "请选择发送状态",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (i(), u(k, {
                        key: 0,
                        label: "发送成功",
                        value: 0
                      })),
                      (i(), u(k, {
                        key: 1,
                        label: "发送失败",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "发件邮箱" }, {
                default: a(() => [
                  l(v, {
                    modelValue: o.value.sendMail,
                    "onUpdate:modelValue": e[5] || (e[5] = (t) => o.value.sendMail = t),
                    placeholder: "请输入发件邮箱",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, null, {
                default: a(() => [
                  b((i(), u(f, {
                    type: "primary",
                    onClick: c,
                    icon: r(A)
                  }, {
                    default: a(() => e[8] || (e[8] = [
                      w("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [C, ["admin:mailLog:query"]]
                  ]),
                  l(f, {
                    icon: r(D),
                    onClick: S
                  }, {
                    default: a(() => e[9] || (e[9] = [
                      w("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  b((i(), u(f, {
                    icon: r(R),
                    onClick: T
                  }, {
                    default: a(() => e[10] || (e[10] = [
                      w("导出")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [C, ["admin:mailLog:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        l(L, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            g("div", K, [
              l(f, {
                icon: r(D),
                circle: "",
                onClick: c
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        g("div", O, [
          b((i(), u(U, {
            data: r(x),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              l(d, {
                prop: "mailTemplateCode",
                label: "模板编号",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              l(d, {
                prop: "receiveMail",
                label: "接收邮箱",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(d, {
                prop: "mailTitle",
                label: "邮件标题",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(d, {
                prop: "sendStatus",
                label: "发送状态",
                "min-width": "80"
              }, {
                default: a((t) => [
                  t.row.sendStatus === 0 ? (i(), u(y, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: a(() => e[11] || (e[11] = [
                      w("发送成功")
                    ])),
                    _: 1
                  })) : (i(), u(y, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: a(() => e[12] || (e[12] = [
                      w("发送失败")
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(d, {
                prop: "sendMail",
                label: "发件邮箱",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              l(d, {
                prop: "content",
                label: "邮件内容",
                "min-width": "300",
                "show-overflow-tooltip": ""
              }),
              l(d, {
                prop: "sendDate",
                label: "发送时间",
                "min-width": "180"
              }, {
                default: a((t) => [
                  g("span", null, G(r(F)(t.row.sendDate)), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [P, r(p)]
          ]),
          l(B, {
            "current-page": o.value.pageNo,
            "onUpdate:currentPage": e[6] || (e[6] = (t) => o.value.pageNo = t),
            "page-size": o.value.pageSize,
            "onUpdate:pageSize": e[7] || (e[7] = (t) => o.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: c,
            total: o.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
};
export {
  Y as default
};
