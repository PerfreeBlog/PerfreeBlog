import { p as Ve, d as Y, h as ke } from "./lib/perfree.js";
import { s as xe, r as Z, u as ee, v as Ge, b as Ce, a as Ae } from "./lib/@element-plus.js";
const Ue = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
}, Re = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
};
function Se(w) {
  return axios.post("/api/auth/attach/page", w);
}
function Te() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function Ee(w) {
  return axios.put("/api/auth/attach/update", w);
}
function Fe(w) {
  return axios.get("/api/auth/attach/get?id=" + w);
}
function ze(w) {
  return axios.delete("/api/auth/attach/del?id=" + w);
}
const u = window.Vue.unref, R = window.Vue.renderList, S = window.Vue.Fragment, n = window.Vue.openBlock, p = window.Vue.createElementBlock, r = window.Vue.resolveComponent, f = window.Vue.createBlock, a = window.Vue.withCtx, t = window.Vue.createVNode, v = window.Vue.createTextVNode, le = window.Vue.resolveDirective, C = window.Vue.withDirectives, m = window.Vue.createElementVNode, N = window.Vue.createCommentVNode, K = window.Vue.toDisplayString, $ = window.Vue.isRef, Ne = { class: "page" }, Ie = { class: "search-box" }, Be = { class: "right-tool" }, Le = { class: "table-box" }, Oe = { class: "block" }, De = {
  key: 1,
  controls: "",
  preload: "none",
  style: { height: "80px", width: "100%" }
}, Pe = ["src"], Me = { key: 2 }, qe = { key: 0 }, Ke = { key: 1 }, $e = { key: 2 }, je = { key: 3 }, Je = { style: { "padding-right": "15px" } }, We = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, He = ["src"], Qe = {
  key: 2,
  controls: "",
  preload: "none"
}, Xe = ["src"], Ye = { key: 3 }, Ze = { class: "showForm" }, el = { class: "dialog-footer" }, x = window.ElementPlus.ElMessage, ll = window.ElementPlus.ElMessageBox, tl = window.Vue.reactive, c = window.Vue.ref, nl = {
  __name: "AttachView",
  setup(w) {
    let te = localStorage.getItem(Re.STORAGE_TOKEN), ae = Ue.baseURL, j = c([]), I = c(!1);
    const J = c();
    let A = c(!1), _ = c(!1), T = c(""), E = c([]), B = c([]), L = c(null), oe = {
      Authorization: "Bearer " + JSON.parse(te).accessToken
    };
    const O = c(), F = c();
    let W = c();
    const h = c({
      attachConfigId: L.value,
      attachGroup: "default",
      fileList: []
    }), ne = tl({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), d = c({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: "",
      attachConfigId: void 0,
      storage: void 0,
      attachGroup: void 0
    }), o = c({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      remark: "",
      mineType: ""
    });
    function g() {
      I.value = !0, Se(d.value).then((i) => {
        j.value = i.data.list, d.value.total = i.data.total, I.value = !1;
      });
    }
    function ue() {
      D(), g();
    }
    function ie() {
      d.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: "",
        attachConfigId: void 0,
        storage: void 0,
        attachGroup: void 0
      }, J.value.resetFields(), g();
    }
    function de() {
      h.value = {
        attachConfigId: L.value,
        attachGroup: "default",
        fileList: []
      }, O.value && O.value.resetFields();
    }
    function re() {
      de(), T.value = "上传附件", D(), A.value = !0;
    }
    function D() {
      Te().then((i) => {
        E.value = i.data;
      });
    }
    function se() {
      ke().then((i) => {
        B.value = i.data, i.data.forEach((l) => {
          l.master && (L.value = l.id);
        });
      });
    }
    function pe(i) {
      P(), Fe(i.id).then((l) => {
        o.value = l.data, T.value = "详情", _.value = !0;
      });
    }
    function P() {
      o.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        remark: "",
        mineType: ""
      }, F.value && F.value.resetFields();
    }
    function fe() {
      F.value.validate((i) => {
        i && Ee(o.value).then((l) => {
          l.code === 200 ? (x.success("修改成功"), _.value = !1, P(), g()) : x.error(l.msg);
        });
      });
    }
    function me(i) {
      ll.confirm("确定要删除[" + i.name + "]吗？删除后该文件将无法找回!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ze(i.id).then((l) => {
          l.code === 200 && l.data ? (x.success("删除成功"), g()) : x.error("删除失败");
        });
      }).catch(() => {
      });
    }
    function ce(i, l, y) {
      i.code === 200 ? x.success(`[${l.name}]上传成功`) : (x.error(i.msg), W.value.handleRemove(l));
    }
    function ve(i) {
      x.error("上传失败,请检查网络是否通通畅");
    }
    return D(), se(), g(), (i, l) => {
      const y = r("el-option"), G = r("el-select"), s = r("el-form-item"), k = r("el-input"), b = r("el-button"), M = r("el-form"), q = r("el-col"), H = r("el-row"), V = r("el-table-column"), Q = r("el-image"), z = r("el-link"), he = r("el-table"), _e = r("el-pagination"), we = r("el-icon"), ge = r("el-upload"), X = r("el-dialog"), U = le("hasPermission"), ye = le("loading");
      return n(), p("div", Ne, [
        m("div", Ie, [
          t(M, {
            inline: !0,
            model: d.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: J
          }, {
            default: a(() => [
              t(s, { label: "分组" }, {
                default: a(() => [
                  t(G, {
                    modelValue: d.value.attachGroup,
                    "onUpdate:modelValue": l[0] || (l[0] = (e) => d.value.attachGroup = e),
                    placeholder: "请选择分组",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (n(!0), p(S, null, R(u(E), (e) => (n(), f(y, {
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
              t(s, { label: "附件名称" }, {
                default: a(() => [
                  t(k, {
                    modelValue: d.value.name,
                    "onUpdate:modelValue": l[1] || (l[1] = (e) => d.value.name = e),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(s, { label: "存储器类型" }, {
                default: a(() => [
                  t(G, {
                    modelValue: d.value.storage,
                    "onUpdate:modelValue": l[2] || (l[2] = (e) => d.value.storage = e),
                    placeholder: "请选择存储器类型",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (n(), f(y, {
                        key: 0,
                        label: "本地磁盘",
                        value: 0
                      })),
                      (n(), f(y, {
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
              t(s, { label: "存储策略" }, {
                default: a(() => [
                  t(G, {
                    modelValue: d.value.attachConfigId,
                    "onUpdate:modelValue": l[3] || (l[3] = (e) => d.value.attachConfigId = e),
                    placeholder: "请选择存储策略",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (n(!0), p(S, null, R(u(B), (e) => (n(), f(y, {
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
              t(s, null, {
                default: a(() => [
                  C((n(), f(b, {
                    type: "primary",
                    onClick: g,
                    icon: u(xe)
                  }, {
                    default: a(() => l[19] || (l[19] = [
                      v("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:attach:query"]]
                  ]),
                  t(b, {
                    icon: u(Z),
                    onClick: ie
                  }, {
                    default: a(() => l[20] || (l[20] = [
                      v("重置")
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
        t(H, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            t(q, { span: 1.5 }, {
              default: a(() => [
                C((n(), f(b, {
                  icon: u(ee),
                  type: "primary",
                  plain: "",
                  onClick: re
                }, {
                  default: a(() => l[21] || (l[21] = [
                    v("上传附件")
                  ])),
                  _: 1
                }, 8, ["icon"])), [
                  [U, ["admin:attach:upload"]]
                ])
              ]),
              _: 1
            }),
            m("div", Be, [
              t(b, {
                icon: u(Z),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        m("div", Le, [
          C((n(), f(he, {
            data: u(j),
            style: { width: "100%", height: "100%" },
            "row-key": "id",
            "show-overflow-tooltip": !0
          }, {
            default: a(() => [
              t(V, {
                label: "序号",
                "min-width": "50",
                type: "index"
              }),
              t(V, {
                prop: "name",
                label: "附件名称",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              t(V, {
                prop: "attachGroup",
                label: "预览",
                "min-width": "140"
              }, {
                default: a((e) => [
                  m("div", Oe, [
                    e.row.type && e.row.type === "img" ? (n(), f(Q, {
                      key: 0,
                      style: { height: "80px" },
                      src: e.row.url,
                      "zoom-rate": 1.2,
                      "max-scale": 7,
                      "min-scale": 0.2,
                      "preview-src-list": [e.row.url],
                      "initial-index": 4,
                      "append-to-body": "",
                      fit: "cover",
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])) : e.row.type && e.row.type === "video" ? (n(), p("video", De, [
                      m("source", {
                        src: e.row.url
                      }, null, 8, Pe)
                    ])) : (n(), p("i", Me, [
                      l[23] || (l[23] = v("无法预览，点击 ")),
                      t(z, {
                        type: "primary",
                        underline: !1,
                        style: { "font-size": "12px", "vertical-align": "baseline" },
                        target: "_blank",
                        href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                      }, {
                        default: a(() => l[22] || (l[22] = [
                          v("下载 ")
                        ])),
                        _: 2
                      }, 1032, ["href"])
                    ]))
                  ])
                ]),
                _: 1
              }),
              t(V, {
                prop: "url",
                label: "访问地址",
                "min-width": "350",
                "show-overflow-tooltip": ""
              }, {
                default: a((e) => [
                  t(z, {
                    href: e.row.url,
                    target: "_blank",
                    underline: !1
                  }, {
                    default: a(() => [
                      v(K(e.row.url), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              t(V, {
                prop: "type",
                label: "附件类型",
                "min-width": "100"
              }, {
                default: a((e) => [
                  e.row.type === "img" ? (n(), p("span", qe, "图片")) : N("", !0),
                  e.row.type === "video" ? (n(), p("span", Ke, "视频")) : N("", !0),
                  e.row.type === "audio" ? (n(), p("span", $e, "音频")) : N("", !0),
                  e.row.type === "other" ? (n(), p("span", je, "其他")) : N("", !0)
                ]),
                _: 1
              }),
              t(V, {
                prop: "attachGroup",
                label: "分组",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }, {
                default: a((e) => [
                  m("span", null, K(e.row.attachGroup), 1)
                ]),
                _: 1
              }),
              t(V, {
                prop: "createTime",
                label: "上传时间",
                "min-width": "180"
              }, {
                default: a((e) => [
                  m("span", null, K(u(Ve)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(V, {
                label: "操作",
                width: "180",
                fixed: "right"
              }, {
                default: a((e) => [
                  C((n(), f(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Ge),
                    onClick: (be) => pe(e.row)
                  }, {
                    default: a(() => l[24] || (l[24] = [
                      v("详情")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:attach:desc"]]
                  ]),
                  C((n(), f(z, {
                    type: "primary",
                    underline: !1,
                    target: "_blank",
                    icon: u(Ce),
                    style: { "font-size": "12px" },
                    href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                  }, {
                    default: a(() => l[25] || (l[25] = [
                      v("下载 ")
                    ])),
                    _: 2
                  }, 1032, ["icon", "href"])), [
                    [U, ["admin:attach:download"]]
                  ]),
                  C((n(), f(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Ae),
                    onClick: (be) => me(e.row)
                  }, {
                    default: a(() => l[26] || (l[26] = [
                      v("删除")
                    ])),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:attach:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ye, u(I)]
          ]),
          t(_e, {
            "current-page": d.value.pageNo,
            "onUpdate:currentPage": l[4] || (l[4] = (e) => d.value.pageNo = e),
            "page-size": d.value.pageSize,
            "onUpdate:pageSize": l[5] || (l[5] = (e) => d.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: d.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(X, {
          modelValue: u(A),
          "onUpdate:modelValue": l[9] || (l[9] = (e) => $(A) ? A.value = e : A = e),
          title: u(T),
          width: u(Y)(600),
          draggable: "",
          onClose: ue
        }, {
          default: a(() => [
            t(M, {
              ref_key: "addFormRef",
              ref: O,
              model: h.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: a(() => [
                t(s, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: a(() => [
                    t(G, {
                      modelValue: h.value.attachConfigId,
                      "onUpdate:modelValue": l[6] || (l[6] = (e) => h.value.attachConfigId = e),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: a(() => [
                        (n(!0), p(S, null, R(u(B), (e) => (n(), f(y, {
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
                t(s, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: a(() => [
                    t(G, {
                      modelValue: h.value.attachGroup,
                      "onUpdate:modelValue": l[7] || (l[7] = (e) => h.value.attachGroup = e),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: a(() => [
                        (n(!0), p(S, null, R(u(E), (e) => (n(), f(y, {
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
                t(s, {
                  label: "附件",
                  prop: "name"
                }, {
                  default: a(() => [
                    t(ge, {
                      class: "upload-demo",
                      drag: "",
                      headers: u(oe),
                      action: u(ae) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: W,
                      "file-list": h.value.fileList,
                      "onUpdate:fileList": l[8] || (l[8] = (e) => h.value.fileList = e),
                      data: { attachConfigId: h.value.attachConfigId, attachGroup: h.value.attachGroup },
                      "on-success": ce,
                      "on-error": ve
                    }, {
                      tip: a(() => l[27] || (l[27] = [
                        m("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: a(() => [
                        t(we, { class: "el-icon--upload" }, {
                          default: a(() => [
                            t(u(ee))
                          ]),
                          _: 1
                        }),
                        l[28] || (l[28] = m("div", { class: "el-upload__text" }, [
                          v(" 拖拽文件到此处或者"),
                          m("em", null, "点击上传")
                        ], -1))
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
        }, 8, ["modelValue", "title", "width"]),
        t(X, {
          modelValue: u(_),
          "onUpdate:modelValue": l[18] || (l[18] = (e) => $(_) ? _.value = e : _ = e),
          title: u(T),
          width: u(Y)(800),
          draggable: ""
        }, {
          footer: a(() => [
            m("span", el, [
              t(b, {
                type: "primary",
                onClick: fe
              }, {
                default: a(() => l[31] || (l[31] = [
                  v("修 改")
                ])),
                _: 1
              }),
              t(b, {
                onClick: l[17] || (l[17] = (e) => {
                  $(_) ? _.value = !1 : _ = !1, P();
                })
              }, {
                default: a(() => l[32] || (l[32] = [
                  v("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t(H, null, {
              default: a(() => [
                t(q, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: a(() => [
                    m("div", Je, [
                      o.value.type && o.value.type === "img" ? (n(), f(Q, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: o.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [o.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : o.value.type && o.value.type === "video" ? (n(), p("video", We, [
                        m("source", {
                          src: o.value.url
                        }, null, 8, He)
                      ])) : o.value.type && o.value.type === "audio" ? (n(), p("audio", Qe, [
                        m("source", {
                          src: o.value.url
                        }, null, 8, Xe)
                      ])) : (n(), p("i", Ye, [
                        l[30] || (l[30] = v("无法预览，点击 ")),
                        t(z, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + o.value.configId + "/get/" + o.value.path
                        }, {
                          default: a(() => l[29] || (l[29] = [
                            v("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                t(q, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: a(() => [
                    m("div", Ze, [
                      t(M, {
                        ref_key: "showFormRef",
                        ref: F,
                        model: o.value,
                        "label-width": "auto",
                        rules: ne,
                        "label-position": "top"
                      }, {
                        default: a(() => [
                          t(s, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.name,
                                "onUpdate:modelValue": l[10] || (l[10] = (e) => o.value.name = e)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          t(s, { label: "附件mineType" }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.mineType,
                                "onUpdate:modelValue": l[11] || (l[11] = (e) => o.value.mineType = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          t(s, { label: "附件类型" }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.type,
                                "onUpdate:modelValue": l[12] || (l[12] = (e) => o.value.type = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          t(s, { label: "分组" }, {
                            default: a(() => [
                              t(G, {
                                modelValue: o.value.attachGroup,
                                "onUpdate:modelValue": l[13] || (l[13] = (e) => o.value.attachGroup = e),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: a(() => [
                                  (n(!0), p(S, null, R(u(E), (e) => (n(), f(y, {
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
                          t(s, { label: "存储路径" }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.path,
                                "onUpdate:modelValue": l[14] || (l[14] = (e) => o.value.path = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          t(s, { label: "访问地址" }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.url,
                                "onUpdate:modelValue": l[15] || (l[15] = (e) => o.value.url = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          t(s, { label: "附件描述" }, {
                            default: a(() => [
                              t(k, {
                                modelValue: o.value.remark,
                                "onUpdate:modelValue": l[16] || (l[16] = (e) => o.value.remark = e),
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
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
};
export {
  nl as default
};
