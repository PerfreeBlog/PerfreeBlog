import { s as me, r as H, u as Q, a as _e, v as he, k as ve, b as we, l as ge } from "./lib/perfree.js";
const be = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, ye = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
};
function Ve(w) {
  return axios.post("/api/auth/attach/page", w);
}
function ke() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function xe(w) {
  return axios.put("/apiv/attach/update", w);
}
function Ge(w) {
  return axios.get("/api/auth/attach/get?id=" + w);
}
function Ce(w) {
  return axios.delete("/api/auth/attach/del?id=" + w);
}
const n = window.Vue.unref, C = window.Vue.renderList, A = window.Vue.Fragment, u = window.Vue.openBlock, m = window.Vue.createElementBlock, d = window.Vue.resolveComponent, h = window.Vue.createBlock, t = window.Vue.withCtx, l = window.Vue.createVNode, f = window.Vue.createTextVNode, c = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const M = window.Vue.toDisplayString, Ae = window.Vue.resolveDirective, Ue = window.Vue.withDirectives, P = window.Vue.isRef, Te = { class: "page" }, Fe = { class: "search-box" }, Ee = { class: "right-tool" }, Se = { class: "table-box" }, ze = { class: "block" }, Re = {
  key: 1,
  controls: "",
  preload: "none",
  style: { width: "100%", "max-height": "100%" }
}, Ne = ["src"], Ie = { key: 2 }, Be = /* @__PURE__ */ c("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ f(" 拖拽文件到此处或者"),
  /* @__PURE__ */ c("em", null, "点击上传")
], -1), Le = /* @__PURE__ */ c("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1), Oe = { style: { "padding-right": "15px" } }, De = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Me = ["src"], Pe = {
  key: 2,
  controls: "",
  preload: "none"
}, Ke = ["src"], je = { key: 3 }, qe = { class: "showForm" }, Je = { class: "dialog-footer" }, S = window.ElementPlus.ElMessage, $e = window.ElementPlus.ElMessageBox, He = window.Vue.reactive, p = window.Vue.ref, We = {
  __name: "AttachView",
  setup(w) {
    let W = localStorage.getItem(ye.STORAGE_TOKEN), X = be.baseURL, K = p([]), z = p(!1);
    const j = p();
    let G = p(!1), v = p(!1), U = p(""), T = p([]), R = p([]), N = p(null), Y = {
      Authorization: "Bearer " + JSON.parse(W).accessToken
    };
    const I = p(), F = p(), _ = p({
      attachConfigId: N.value,
      attachGroup: "default",
      fileList: []
    }), Z = He({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), i = p({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: "",
      attachConfigId: void 0,
      storage: void 0,
      attachGroup: void 0
    }), o = p({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: "",
      mineType: ""
    });
    function y() {
      z.value = !0, Ve(i.value).then((r) => {
        K.value = r.data.list, i.value.total = r.data.total, z.value = !1;
      });
    }
    function ee() {
      B(), y();
    }
    function le() {
      i.value = {
        attachConfigId: void 0,
        attachGroup: void 0,
        storage: void 0,
        name: ""
      }, j.value.resetFields();
    }
    function te() {
      _.value = {
        attachConfigId: N.value,
        attachGroup: "default",
        fileList: []
      }, I.value && I.value.resetFields();
    }
    function ae() {
      te(), U.value = "上传附件", B(), G.value = !0;
    }
    function B() {
      ke().then((r) => {
        T.value = r.data;
      });
    }
    function oe() {
      ge().then((r) => {
        R.value = r.data, r.data.forEach((a) => {
          a.master && (N.value = a.id);
        });
      });
    }
    function ne(r) {
      L(), Ge(r.id).then((a) => {
        o.value = a.data, U.value = "详情", v.value = !0;
      });
    }
    function L() {
      o.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: "",
        mineType: ""
      }, F.value && F.value.resetFields();
    }
    function ue() {
      F.value.validate((r) => {
        r && xe(o.value).then((a) => {
          a.code === 200 ? (S.success("修改成功"), v.value = !1, L(), y()) : S.error(a.msg);
        });
      });
    }
    function ie(r) {
      $e.confirm("确定要删除[" + r.name + "]吗？删除后该文件将无法找回!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Ce(r.id).then((a) => {
          a.code === 200 && a.data ? (S.success("删除成功"), y()) : S.error("删除失败");
        });
      }).catch(() => {
      });
    }
    return B(), oe(), y(), (r, a) => {
      const V = d("el-option"), x = d("el-select"), s = d("el-form-item"), k = d("el-input"), g = d("el-button"), O = d("el-form"), D = d("el-col"), q = d("el-row"), b = d("el-table-column"), J = d("el-image"), E = d("el-link"), de = d("el-table"), re = d("el-pagination"), se = d("el-icon"), ce = d("el-upload"), $ = d("el-dialog"), pe = Ae("loading");
      return u(), m("div", Te, [
        c("div", Fe, [
          l(O, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: j
          }, {
            default: t(() => [
              l(s, { label: "分组" }, {
                default: t(() => [
                  l(x, {
                    modelValue: i.value.attachGroup,
                    "onUpdate:modelValue": a[0] || (a[0] = (e) => i.value.attachGroup = e),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (u(!0), m(A, null, C(n(T), (e) => (u(), h(V, {
                        key: e.attachGroup,
                        label: e.attachGroup,
                        value: e.attachGroup
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "附件名称" }, {
                default: t(() => [
                  l(k, {
                    modelValue: i.value.name,
                    "onUpdate:modelValue": a[1] || (a[1] = (e) => i.value.name = e),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "存储器类型" }, {
                default: t(() => [
                  l(x, {
                    modelValue: i.value.storage,
                    "onUpdate:modelValue": a[2] || (a[2] = (e) => i.value.storage = e),
                    placeholder: "请选择存储器类型",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (u(), h(V, {
                        key: 0,
                        label: "本地磁盘",
                        value: 0
                      })),
                      (u(), h(V, {
                        key: 1,
                        label: "S3对象存储",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "存储策略" }, {
                default: t(() => [
                  l(x, {
                    modelValue: i.value.attachConfigId,
                    "onUpdate:modelValue": a[3] || (a[3] = (e) => i.value.attachConfigId = e),
                    placeholder: "请选择存储策略",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (u(!0), m(A, null, C(n(R), (e) => (u(), h(V, {
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
              l(s, null, {
                default: t(() => [
                  l(g, {
                    type: "primary",
                    onClick: y,
                    icon: n(me)
                  }, {
                    default: t(() => [
                      f("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  l(g, {
                    icon: n(H),
                    onClick: le
                  }, {
                    default: t(() => [
                      f("重置")
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
        l(q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            l(D, { span: 1.5 }, {
              default: t(() => [
                l(g, {
                  icon: n(Q),
                  type: "primary",
                  plain: "",
                  onClick: ae
                }, {
                  default: t(() => [
                    f("上传附件")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            c("div", Ee, [
              l(g, {
                icon: n(H),
                circle: "",
                onClick: y
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        c("div", Se, [
          Ue((u(), h(de, {
            data: n(K),
            style: { width: "100%", height: "100%" },
            "row-key": "id",
            "show-overflow-tooltip": !0
          }, {
            default: t(() => [
              l(b, {
                label: "序号",
                "min-width": "50",
                type: "index"
              }),
              l(b, {
                prop: "name",
                label: "附件名称",
                "min-width": "150"
              }),
              l(b, {
                prop: "attachGroup",
                label: "预览",
                "min-width": "100"
              }, {
                default: t((e) => [
                  c("div", ze, [
                    e.row.type && e.row.type === "img" ? (u(), h(J, {
                      key: 0,
                      style: { width: "100%", "max-height": "100%" },
                      src: e.row.url,
                      "zoom-rate": 1.2,
                      "max-scale": 7,
                      "min-scale": 0.2,
                      "preview-src-list": [e.row.url],
                      "initial-index": 4,
                      "append-to-body": "",
                      fit: "cover",
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])) : e.row.type && e.row.type === "video" ? (u(), m("video", Re, [
                      c("source", {
                        src: e.row.url
                      }, null, 8, Ne)
                    ])) : (u(), m("i", Ie, [
                      f("无法预览，点击 "),
                      l(E, {
                        type: "primary",
                        underline: !1,
                        style: { "font-size": "12px", "vertical-align": "baseline" },
                        target: "_blank",
                        href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                      }, {
                        default: t(() => [
                          f("下载 ")
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]))
                  ])
                ]),
                _: 1
              }),
              l(b, {
                prop: "url",
                label: "访问地址",
                "min-width": "240"
              }, {
                default: t((e) => [
                  l(E, {
                    href: e.row.url,
                    target: "_blank",
                    underline: !1
                  }, {
                    default: t(() => [
                      f(M(e.row.url), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              l(b, {
                prop: "type",
                label: "附件类型",
                "min-width": "100"
              }),
              l(b, {
                prop: "attachGroup",
                label: "分组",
                "min-width": "100"
              }, {
                default: t((e) => [
                  c("span", null, M(e.row.attachGroup), 1)
                ]),
                _: 1
              }),
              l(b, {
                prop: "createTime",
                label: "上传时间",
                "min-width": "100"
              }, {
                default: t((e) => [
                  c("span", null, M(n(_e)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(b, {
                label: "操作",
                width: "180",
                fixed: "right"
              }, {
                default: t((e) => [
                  l(g, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(he),
                    onClick: (fe) => ne(e.row)
                  }, {
                    default: t(() => [
                      f("详情")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  l(E, {
                    type: "primary",
                    underline: !1,
                    target: "_blank",
                    icon: n(ve),
                    style: { "font-size": "12px" },
                    href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                  }, {
                    default: t(() => [
                      f("下载 ")
                    ]),
                    _: 2
                  }, 1032, ["icon", "href"]),
                  l(g, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(we),
                    onClick: (fe) => ie(e.row)
                  }, {
                    default: t(() => [
                      f("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [pe, n(z)]
          ]),
          l(re, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": a[4] || (a[4] = (e) => i.value.pageNo = e),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": a[5] || (a[5] = (e) => i.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: y,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l($, {
          modelValue: n(G),
          "onUpdate:modelValue": a[9] || (a[9] = (e) => P(G) ? G.value = e : G = e),
          title: n(U),
          width: "600px",
          draggable: "",
          onClose: ee
        }, {
          default: t(() => [
            l(O, {
              ref_key: "addFormRef",
              ref: I,
              model: _.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: t(() => [
                l(s, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: t(() => [
                    l(x, {
                      modelValue: _.value.attachConfigId,
                      "onUpdate:modelValue": a[6] || (a[6] = (e) => _.value.attachConfigId = e),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: t(() => [
                        (u(!0), m(A, null, C(n(R), (e) => (u(), h(V, {
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
                l(s, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: t(() => [
                    l(x, {
                      modelValue: _.value.attachGroup,
                      "onUpdate:modelValue": a[7] || (a[7] = (e) => _.value.attachGroup = e),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: t(() => [
                        (u(!0), m(A, null, C(n(T), (e) => (u(), h(V, {
                          key: e.attachGroup,
                          label: e.attachGroup,
                          value: e.attachGroup
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(s, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: t(() => [
                    l(ce, {
                      class: "upload-demo",
                      drag: "",
                      headers: n(Y),
                      action: n(X) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      "file-list": _.value.fileList,
                      "onUpdate:fileList": a[8] || (a[8] = (e) => _.value.fileList = e),
                      data: { attachConfigId: _.value.attachConfigId, attachGroup: _.value.attachGroup }
                    }, {
                      tip: t(() => [
                        Le
                      ]),
                      default: t(() => [
                        l(se, { class: "el-icon--upload" }, {
                          default: t(() => [
                            l(n(Q))
                          ]),
                          _: 1
                        }),
                        Be
                      ]),
                      _: 1
                    }, 8, ["headers", "action", "file-list", "data"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l($, {
          modelValue: n(v),
          "onUpdate:modelValue": a[18] || (a[18] = (e) => P(v) ? v.value = e : v = e),
          title: n(U),
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            c("span", Je, [
              l(g, {
                type: "primary",
                onClick: ue
              }, {
                default: t(() => [
                  f("修 改")
                ]),
                _: 1
              }),
              l(g, {
                onClick: a[17] || (a[17] = (e) => {
                  P(v) ? v.value = !1 : v = !1, L();
                })
              }, {
                default: t(() => [
                  f("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            l(q, null, {
              default: t(() => [
                l(D, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: t(() => [
                    c("div", Oe, [
                      o.value.type && o.value.type === "img" ? (u(), h(J, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: o.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [o.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : o.value.type && o.value.type === "video" ? (u(), m("video", De, [
                        c("source", {
                          src: o.value.url
                        }, null, 8, Me)
                      ])) : o.value.type && o.value.type === "audio" ? (u(), m("audio", Pe, [
                        c("source", {
                          src: o.value.url
                        }, null, 8, Ke)
                      ])) : (u(), m("i", je, [
                        f("无法预览，点击 "),
                        l(E, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + o.value.configId + "/get/" + o.value.path
                        }, {
                          default: t(() => [
                            f("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                l(D, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: t(() => [
                    c("div", qe, [
                      l(O, {
                        ref_key: "showFormRef",
                        ref: F,
                        model: o.value,
                        "label-width": "auto",
                        rules: Z,
                        "label-position": "top"
                      }, {
                        default: t(() => [
                          l(s, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.name,
                                "onUpdate:modelValue": a[10] || (a[10] = (e) => o.value.name = e)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件mineType" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.mineType,
                                "onUpdate:modelValue": a[11] || (a[11] = (e) => o.value.mineType = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件类型" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.type,
                                "onUpdate:modelValue": a[12] || (a[12] = (e) => o.value.type = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "分组" }, {
                            default: t(() => [
                              l(x, {
                                modelValue: o.value.attachGroup,
                                "onUpdate:modelValue": a[13] || (a[13] = (e) => o.value.attachGroup = e),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: t(() => [
                                  (u(!0), m(A, null, C(n(T), (e) => (u(), h(V, {
                                    key: e.attachGroup,
                                    label: e.attachGroup,
                                    value: e.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "存储路径" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.path,
                                "onUpdate:modelValue": a[14] || (a[14] = (e) => o.value.path = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "访问地址" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.url,
                                "onUpdate:modelValue": a[15] || (a[15] = (e) => o.value.url = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件描述" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.desc,
                                "onUpdate:modelValue": a[16] || (a[16] = (e) => o.value.desc = e),
                                autosize: { minRows: 2, maxRows: 4 },
                                type: "textarea",
                                resize: "none",
                                placeholder: "请输入附件描述"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  We as default
};
