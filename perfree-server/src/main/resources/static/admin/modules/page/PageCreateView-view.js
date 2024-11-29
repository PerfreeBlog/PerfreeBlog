import { V as pt } from "./lib/vditor.js";
import { s as mt, r as ft, u as ke } from "./lib/@element-plus.js";
import { _ as pe, d as ce, u as vt, t as xe, c as $e, a as ht, b as wt } from "./lib/tabs.js";
import { i as gt } from "./lib/aieditor.js";
import { p as Ae } from "./lib/js-pinyin.js";
function Vt(A) {
  return axios.post("/api/auth/attach/page", A);
}
function _t() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function yt(A) {
  return axios.put("/apiv/attach/update", A);
}
function Ct(A) {
  return axios.get("/api/auth/attach/get?id=" + A);
}
const _e = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, bt = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function kt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const y = window.Vue.resolveComponent, u = window.Vue.createVNode, r = window.Vue.withCtx, k = window.Vue.unref, W = window.Vue.renderList, Q = window.Vue.Fragment, C = window.Vue.openBlock, S = window.Vue.createElementBlock, P = window.Vue.createBlock, U = window.Vue.createTextVNode, x = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ee = window.Vue.toDisplayString, Ne = window.Vue.normalizeClass, xt = window.Vue.withModifiers, he = window.Vue.isRef, $t = { class: "page" }, At = { class: "search-box" }, Et = { class: "table-box" }, Nt = { class: "attach-list-box" }, St = ["onClick"], Mt = { class: "attach-preview" }, Tt = { class: "imgLoading" }, Bt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, Ft = ["src"], Rt = {
  key: 2,
  class: "attach-other"
}, Ut = { class: "attach-name" }, zt = { class: "operate-btn-box" }, Gt = { style: { "padding-right": "15px" } }, Ht = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Lt = ["src"], Ot = {
  key: 2,
  controls: "",
  preload: "none"
}, It = ["src"], Pt = { key: 3 }, Dt = { class: "showForm" }, Kt = { class: "dialog-footer" }, Zt = window.Vue.computed, Jt = window.Vue.reactive, $ = window.Vue.ref, D = window.ElementPlus.ElMessage, qt = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(A, { emit: T }) {
    const o = $(), n = $({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let d = $([]), _ = $(!1), v = $(/* @__PURE__ */ new Map());
    const g = T, b = A;
    let h = $(!1), B = $(""), F = $([]);
    const R = $(), s = $({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), l = Jt({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), i = $();
    let a = $(), p = $(!1), E = $([]);
    const w = $({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let Y = localStorage.getItem(_e.STORAGE_TOKEN), ee = bt.baseURL, me = {
      Authorization: "Bearer " + JSON.parse(Y).accessToken
    };
    const fe = Zt(() => {
      switch (b.attachType) {
        case "img":
          return "image/*";
        case "video":
          return "video/*";
        case "audio":
          return "audio/*";
        default:
          return "*";
      }
    });
    function q() {
      s.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, R.value && R.value.resetFields();
    }
    function c() {
      b.attachType && (n.value.type = b.attachType), _.value = !0, Vt(n.value).then((f) => {
        f.data.list.forEach((e) => {
          e.selected = v.value.has(e.id);
        }), d.value = f.data.list, n.value.total = f.data.total, _.value = !1;
      });
    }
    function Je() {
      n.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, o.value.resetFields(), c();
    }
    function qe(f) {
      if (!f.selected && v.value.size >= b.max) {
        D.error(`最多选择${b.max}个`);
        return;
      }
      f.selected = !f.selected, f.selected ? v.value.set(f.id, f) : v.value.delete(f.id), g("update:selectedAttach", Array.from(v.value.values()));
    }
    function te() {
      _t().then((f) => {
        F.value = f.data;
      });
    }
    function je(f) {
      q(), te(), Ct(f.id).then((e) => {
        s.value = e.data, B.value = "详情", h.value = !0;
      });
    }
    function We() {
      R.value.validate((f) => {
        f && yt(s.value).then((e) => {
          e.code === 200 ? (D.success("修改成功"), h.value = !1, q(), c()) : D.error(e.msg);
        });
      });
    }
    function Qe() {
      te(), c();
    }
    function Xe(f, e, G) {
      f.code === 200 ? D.success(`[${e.name}]上传成功`) : (D.error(f.msg), a.value.handleRemove(e));
    }
    function Ye() {
      et(), B.value = "上传附件", tt(), te(), p.value = !0;
    }
    function et() {
      w.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, i.value && i.value.resetFields();
    }
    function tt() {
      kt().then((f) => {
        E.value = f.data, f.data.forEach((e) => {
          e.master && (w.value.attachConfigId = e.id);
        });
      });
    }
    function lt(f) {
      D.error("上传失败,请检查网络是否通通畅");
    }
    return te(), c(), (f, e) => {
      const G = y("el-input"), N = y("el-form-item"), le = y("el-option"), oe = y("el-select"), j = y("el-button"), ve = y("el-form"), ot = y("Loading"), ae = y("el-icon"), ye = y("el-image"), at = y("el-text"), nt = y("InfoFilled"), it = y("SuccessFilled"), ut = y("el-pagination"), st = y("el-link"), Ce = y("el-col"), rt = y("el-row"), be = y("el-dialog"), dt = y("el-upload");
      return C(), S("div", $t, [
        x("div", At, [
          u(ve, {
            inline: !0,
            model: n.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: o
          }, {
            default: r(() => [
              u(N, { label: "附件名称" }, {
                default: r(() => [
                  u(G, {
                    modelValue: n.value.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => n.value.name = t),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              u(N, { label: "分组" }, {
                default: r(() => [
                  u(oe, {
                    modelValue: n.value.attachGroup,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => n.value.attachGroup = t),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: r(() => [
                      (C(!0), S(Q, null, W(k(F), (t) => (C(), P(le, {
                        key: t.attachGroup,
                        label: t.attachGroup,
                        value: t.attachGroup
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              u(N, null, {
                default: r(() => [
                  u(j, {
                    type: "primary",
                    onClick: c,
                    icon: k(mt)
                  }, {
                    default: r(() => e[16] || (e[16] = [
                      U("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  u(j, {
                    icon: k(ft),
                    onClick: Je
                  }, {
                    default: r(() => e[17] || (e[17] = [
                      U("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              u(N, null, {
                default: r(() => [
                  u(j, {
                    icon: k(ke),
                    type: "primary",
                    plain: "",
                    onClick: Ye
                  }, {
                    default: r(() => e[18] || (e[18] = [
                      U("上传附件")
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
        x("div", Et, [
          x("div", Nt, [
            (C(!0), S(Q, null, W(k(d), (t) => (C(), S("div", {
              class: Ne({ "attach-block": !0, selected: t.selected }),
              onClick: (ct) => qe(t)
            }, [
              x("div", Mt, [
                t.type && t.type === "img" ? (C(), P(ye, {
                  key: t.url,
                  src: t.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: r(() => [
                    x("div", Tt, [
                      u(ae, { class: "is-loading" }, {
                        default: r(() => [
                          u(ot)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : t.type && t.type === "video" ? (C(), S("video", Bt, [
                  x("source", {
                    src: t.url
                  }, null, 8, Ft)
                ])) : (C(), S("div", Rt, Ee(t.path.split(".").pop()), 1))
              ]),
              x("div", Ut, [
                u(at, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: r(() => [
                    U(Ee(t.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              x("div", {
                class: Ne({ "operate-mask": !0, selected: t.selected })
              }, null, 2),
              x("div", zt, [
                u(ae, {
                  class: "operate-btn",
                  onClick: xt((ct) => je(t), ["stop"])
                }, {
                  default: r(() => [
                    u(nt)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                u(ae, { class: "operate-btn select-btn" }, {
                  default: r(() => [
                    u(it)
                  ]),
                  _: 1
                })
              ])
            ], 10, St))), 256))
          ]),
          u(ut, {
            "current-page": n.value.pageNo,
            "onUpdate:currentPage": e[2] || (e[2] = (t) => n.value.pageNo = t),
            "page-size": n.value.pageSize,
            "onUpdate:pageSize": e[3] || (e[3] = (t) => n.value.pageSize = t),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: c,
            total: n.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        u(be, {
          modelValue: k(h),
          "onUpdate:modelValue": e[11] || (e[11] = (t) => he(h) ? h.value = t : h = t),
          title: k(B),
          width: k(ce)(800),
          draggable: ""
        }, {
          footer: r(() => [
            x("span", Kt, [
              u(j, {
                type: "primary",
                onClick: We
              }, {
                default: r(() => e[21] || (e[21] = [
                  U("修 改")
                ])),
                _: 1
              }),
              u(j, {
                onClick: e[10] || (e[10] = (t) => {
                  he(h) ? h.value = !1 : h = !1, q();
                })
              }, {
                default: r(() => e[22] || (e[22] = [
                  U("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            u(rt, null, {
              default: r(() => [
                u(Ce, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: r(() => [
                    x("div", Gt, [
                      s.value.type && s.value.type === "img" ? (C(), P(ye, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: s.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [s.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : s.value.type && s.value.type === "video" ? (C(), S("video", Ht, [
                        x("source", {
                          src: s.value.url
                        }, null, 8, Lt)
                      ])) : s.value.type && s.value.type === "audio" ? (C(), S("audio", Ot, [
                        x("source", {
                          src: s.value.url
                        }, null, 8, It)
                      ])) : (C(), S("i", Pt, [
                        e[20] || (e[20] = U("无法预览，点击 ")),
                        u(st, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + s.value.configId + "/get/" + s.value.path
                        }, {
                          default: r(() => e[19] || (e[19] = [
                            U("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                u(Ce, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: r(() => [
                    x("div", Dt, [
                      u(ve, {
                        ref_key: "showFormRef",
                        ref: R,
                        model: s.value,
                        "label-width": "auto",
                        rules: l,
                        "label-position": "top"
                      }, {
                        default: r(() => [
                          u(N, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: r(() => [
                              u(G, {
                                modelValue: s.value.name,
                                "onUpdate:modelValue": e[4] || (e[4] = (t) => s.value.name = t)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          u(N, { label: "附件类型" }, {
                            default: r(() => [
                              u(G, {
                                modelValue: s.value.type,
                                "onUpdate:modelValue": e[5] || (e[5] = (t) => s.value.type = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          u(N, { label: "分组" }, {
                            default: r(() => [
                              u(oe, {
                                modelValue: s.value.attachGroup,
                                "onUpdate:modelValue": e[6] || (e[6] = (t) => s.value.attachGroup = t),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: r(() => [
                                  (C(!0), S(Q, null, W(k(F), (t) => (C(), P(le, {
                                    key: t.attachGroup,
                                    label: t.attachGroup,
                                    value: t.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          u(N, { label: "存储路径" }, {
                            default: r(() => [
                              u(G, {
                                modelValue: s.value.path,
                                "onUpdate:modelValue": e[7] || (e[7] = (t) => s.value.path = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          u(N, { label: "访问地址" }, {
                            default: r(() => [
                              u(G, {
                                modelValue: s.value.url,
                                "onUpdate:modelValue": e[8] || (e[8] = (t) => s.value.url = t),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          u(N, { label: "附件描述" }, {
                            default: r(() => [
                              u(G, {
                                modelValue: s.value.desc,
                                "onUpdate:modelValue": e[9] || (e[9] = (t) => s.value.desc = t),
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
        }, 8, ["modelValue", "title", "width"]),
        u(be, {
          modelValue: k(p),
          "onUpdate:modelValue": e[15] || (e[15] = (t) => he(p) ? p.value = t : p = t),
          title: k(B),
          width: k(ce)(600),
          draggable: "",
          onClose: Qe
        }, {
          default: r(() => [
            u(ve, {
              ref_key: "addFormRef",
              ref: i,
              model: w.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: r(() => [
                u(N, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: r(() => [
                    u(oe, {
                      modelValue: w.value.attachConfigId,
                      "onUpdate:modelValue": e[12] || (e[12] = (t) => w.value.attachConfigId = t),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: r(() => [
                        (C(!0), S(Q, null, W(k(E), (t) => (C(), P(le, {
                          key: t.id,
                          label: t.name,
                          value: t.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(N, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: r(() => [
                    u(oe, {
                      modelValue: w.value.attachGroup,
                      "onUpdate:modelValue": e[13] || (e[13] = (t) => w.value.attachGroup = t),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: r(() => [
                        (C(!0), S(Q, null, W(k(F), (t) => (C(), P(le, {
                          key: t.attachGroup,
                          label: t.attachGroup,
                          value: t.attachGroup
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(N, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: r(() => [
                    u(dt, {
                      class: "upload-demo",
                      drag: "",
                      headers: k(me),
                      action: k(ee) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: a,
                      "file-list": w.value.fileList,
                      "onUpdate:fileList": e[14] || (e[14] = (t) => w.value.fileList = t),
                      data: { attachConfigId: w.value.attachConfigId, attachGroup: w.value.attachGroup },
                      "on-success": Xe,
                      "on-error": lt,
                      accept: fe.value
                    }, {
                      tip: r(() => e[23] || (e[23] = [
                        x("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: r(() => [
                        u(ae, { class: "el-icon--upload" }, {
                          default: r(() => [
                            u(k(ke))
                          ]),
                          _: 1
                        }),
                        e[24] || (e[24] = x("div", { class: "el-upload__text" }, [
                          U(" 拖拽文件到此处或者"),
                          x("em", null, "点击上传")
                        ], -1))
                      ]),
                      _: 1
                    }, 8, ["headers", "action", "file-list", "data", "accept"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, Ze = /* @__PURE__ */ pe(qt, [["__scopeId", "data-v-3b66d397"]]), Se = window.Vue.createElementVNode, H = window.Vue.unref, ne = window.Vue.createVNode, jt = window.Vue.toDisplayString, Me = window.Vue.openBlock, Te = window.Vue.createElementBlock, Wt = window.Vue.createCommentVNode, Be = window.Vue.createTextVNode, Fe = window.Vue.resolveComponent, ie = window.Vue.withCtx, Re = window.Vue.isRef, Qt = window.Vue.Fragment, Xt = { class: "dialog-footer" }, Yt = { key: 0 }, el = window.Vue.onBeforeUnmount, tl = window.Vue.onMounted, K = window.Vue.ref, ll = window.Vue.watch, ol = {
  __name: "vditor-md-editor",
  props: ["initValue", "height"],
  setup(A, { expose: T }) {
    const o = K();
    let n = null, d = K(!1), _ = K(""), v = K([]), g = K(""), b = K(0);
    const h = A;
    ll(() => h.initValue, (i) => {
      n && n.setValue(i);
    }), tl(() => {
      n = new pt(o.value, {
        height: h.height,
        width: "100%",
        cdn: "/api/static/public/libs/vditor",
        placeholder: "写点什么?",
        toolbarConfig: {
          hide: !1,
          pin: !1
        },
        outline: {
          enable: !1
        },
        mode: "ir",
        preview: {
          hljs: {
            lineNumber: !0
          }
        },
        cache: {
          enable: !1
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          {
            hotkey: "⇧⌘S",
            name: "video",
            tipPosition: "s",
            tip: "插入图片",
            className: "right",
            icon: '<svg t="1721714738903" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2729" width="200" height="200"><path d="M426.663822 378.880887A126.292491 126.292491 0 1 0 303.784641 256.001707 126.292491 126.292491 0 0 0 426.663822 378.880887z m0-176.638822a50.346331 50.346331 0 1 1-47.786348 53.759642 50.346331 50.346331 0 0 1 47.786348-53.759642zM1090.55273 341.334471L767.99488 699.732082 533.329778 535.893174a40.106399 40.106399 0 0 0-30.719795-11.093259 40.106399 40.106399 0 0 0-30.719796 11.093259L243.198379 837.97116a39.253072 39.253072 0 0 0 0 56.319625 40.959727 40.959727 0 0 0 57.172952 0L511.996587 616.105973l231.251791 163.838907a44.373038 44.373038 0 0 0 58.879608 0l341.331058-378.877474a39.253072 39.253072 0 0 0 0-56.319624 40.959727 40.959727 0 0 0-52.906314-3.413311z" fill="#333333" p-id="2730"></path><path d="M1262.924914 0.003413H102.399317A101.54599 101.54599 0 0 0 0 101.549403v820.047866A103.252645 103.252645 0 0 0 102.399317 1023.996587h1160.525597a101.54599 101.54599 0 0 0 102.399317-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.924914 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.745648a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832935a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="2731"></path></svg>',
            click() {
              g.value = "img", b.value = 8, _.value = "选择图片", d.value = !0;
            }
          },
          {
            hotkey: "⇧⌘S",
            name: "video",
            tipPosition: "s",
            tip: "插入视频",
            className: "right",
            icon: '<svg t="1721714674236" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1700" width="200" height="200"><path d="M256.006827 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0zM554.671502 383.147526c0-23.039846 16.213225-33.279778 37.546417-23.039847l227.838481 114.345905c41.813055 21.333191 40.959727 55.466297 0 75.94616l-33.279778 17.066553-193.705376 96.426024c-21.333191 10.239932-38.399744 0-38.399744-23.039847z" fill="#333333" p-id="1701"></path><path d="M0.008533 384.000853A41.813055 41.813055 0 0 1 41.821588 341.334471h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294A42.666382 42.666382 0 0 1 0.008533 384.000853zM0.008533 639.999147A41.813055 41.813055 0 0 1 41.821588 597.332764h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294A42.666382 42.666382 0 0 1 0.008533 639.999147zM1024.001707 384.000853a41.813055 41.813055 0 0 1 41.813054-42.666382h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666383zM1024.001707 639.999147a41.813055 41.813055 0 0 1 41.813054-42.666383h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666382z" fill="#333333" p-id="1702"></path><path d="M1024.001707 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0z" fill="#333333" p-id="1703"></path><path d="M1262.933447 0.003413H102.407851A101.54599 101.54599 0 0 0 0.008533 101.549403v820.047866A103.252645 103.252645 0 0 0 102.407851 1023.996587h1160.525596a101.54599 101.54599 0 0 0 102.399318-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.933447 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.754182a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832934a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="1704"></path></svg>',
            click() {
              g.value = "video", b.value = 1, _.value = "选择视频", d.value = !0;
            }
          },
          {
            hotkey: "⇧⌘S",
            name: "file",
            tipPosition: "s",
            tip: "插入附件",
            className: "right",
            icon: '<svg t="1721726209680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5092" width="200" height="200"><path d="M923.2 261.4h-45.7c-19.9 0-36 16.1-36 36s16.1 36 36 36h9.7v488.2h-748V217.2h196.7l85.6 103v0.1l0.1 0.1c6.6 7.9 16.6 13 27.7 13h182.4c19.9 0 36-16.1 36-36s-16.1-36-36-36h-81.5c13.4-35.3 44.7-60.1 81.1-60.1 48.6 0 88.1 44.3 88.1 98.7v304.2c0 54.4-39.5 98.7-88.1 98.7s-88.1-44.3-88.1-98.7V479.4c0-17.5 11.8-31.7 26.3-31.7s26.3 14.2 26.3 31.7h0.3c-0.2 1.4-0.3 2.8-0.3 4.2V601c0 19.9 16.1 36 36 36s36-16.1 36-36V483.5c0-1.4-0.1-2.8-0.3-4.2h0.3c0-57.2-44.1-103.7-98.3-103.7-51.9 0-94.6 42.7-98 96.6h-0.2v134.5c0.6 44.1 16.8 85.5 45.9 117 30.3 32.9 70.9 51 114.2 51s83.9-18.1 114.2-51c29-31.5 45.2-73 45.9-117V300c0-45-16.3-87.5-45.9-119.6-30.3-32.9-70.9-51-114.2-51s-83.9 18.1-114.2 51c-21 22.7-35.2 50.7-41.8 81h-9l-85.7-103.2c-6.8-8.2-17-13-27.7-13H103.1c-19.9 0-36 16.1-36 36V857.6c0 19.9 16.1 36 36 36h820c19.9 0 36-16.1 36-36V297.4c0.1-19.9-16-36-35.9-36z" fill="#333333" p-id="5093"></path></svg>',
            click() {
              g.value = "other", b.value = 1, _.value = "选择附件", d.value = !0;
            }
          },
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          { name: "more", toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview"] }
        ],
        upload: {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(_e.STORAGE_TOKEN)).accessToken
          },
          fieldName: "file",
          filename: (i) => i.replace(/\W/g, ""),
          linkToImgUrl: "/api/auth/attach/uploadAttachByUrl",
          linkToImgFormat(i) {
            let a = null, p = JSON.parse(i);
            return p.code === 200 && (a = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                originalURL: p.data.originalURL,
                url: p.data.url
              }
            })), a;
          },
          multiple: !1,
          url: "/api/auth/attach/upload",
          format(i, a) {
            let p = null, E = JSON.parse(a);
            return E.code === 200 && (p = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                errFiles: [],
                succMap: {
                  [E.data.path]: E.data.url
                }
              }
            })), p;
          },
          withCredentials: !1
        },
        after: () => {
          n.setValue(h.initValue ? h.initValue : "");
        }
      });
    }), el(() => {
      n && (n.setValue(""), n.clearCache(), n.clearStack());
    });
    function B(i) {
      v.value = i;
    }
    function F() {
      v.value.forEach((i, a) => {
        if (g.value === "img") {
          let p = `
![${i.name}](${i.url})`;
          n.insertValue(p), a === v.value.length - 1 && n.insertValue(`
`);
        }
        if (g.value === "video") {
          let p = `
<video src="${i.url}" controls="controls" width="100%"></video>`;
          n.insertValue(p);
        }
        if (g.value === "other") {
          let p = `
[${i.name}](${i.url})`;
          n.insertValue(p);
        }
      }), d.value = !1, v.value = [];
    }
    function R() {
      d.value = !1, v.value = [];
    }
    function s() {
      n && (n.setValue(""), n.clearCache(), n.clearStack());
    }
    function l() {
      return {
        content: n.getValue(),
        parseContent: n.getHTML()
      };
    }
    return T({
      resetContent: s,
      getValue: l
    }), (i, a) => {
      const p = Fe("el-button"), E = Fe("el-dialog");
      return Me(), Te(Qt, null, [
        Se("div", {
          ref_key: "vditor",
          ref: o,
          id: "vditor"
        }, null, 512),
        ne(E, {
          modelValue: H(d),
          "onUpdate:modelValue": a[1] || (a[1] = (w) => Re(d) ? d.value = w : d = w),
          title: H(_),
          width: H(ce)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: ie(() => [
            Se("span", Xt, [
              ne(p, {
                type: "primary",
                onClick: F
              }, {
                default: ie(() => [
                  a[2] || (a[2] = Be("确 定")),
                  H(v).length > 0 ? (Me(), Te("span", Yt, "(已选" + jt(H(v).length) + "个)", 1)) : Wt("", !0)
                ]),
                _: 1
              }),
              ne(p, {
                onClick: a[0] || (a[0] = (w) => {
                  Re(d) ? d.value = !1 : d = !1, R();
                })
              }, {
                default: ie(() => a[3] || (a[3] = [
                  Be("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: ie(() => [
            ne(Ze, {
              "onUpdate:selectedAttach": B,
              max: H(b),
              "attach-type": H(g)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ], 64);
    };
  }
}, al = /* @__PURE__ */ pe(ol, [["__scopeId", "data-v-1636df32"]]), nl = window.Vue.normalizeStyle, Ue = window.Vue.createElementVNode, L = window.Vue.unref, ue = window.Vue.createVNode, il = window.Vue.toDisplayString, ze = window.Vue.openBlock, Ge = window.Vue.createElementBlock, ul = window.Vue.createCommentVNode, He = window.Vue.createTextVNode, Le = window.Vue.resolveComponent, se = window.Vue.withCtx, Oe = window.Vue.isRef, sl = window.Vue.Fragment, rl = { class: "dialog-footer" }, dl = { key: 0 }, cl = window.Vue.onMounted, pl = window.Vue.onUnmounted, Z = window.Vue.ref, ml = window.Vue.watch, re = window.ElementPlus.ElMessage, fl = {
  __name: "ai-editor",
  props: ["initValue", "height"],
  setup(A, { expose: T }) {
    const o = Z();
    let n = null, d = Z(!1), _ = Z(""), v = Z([]), g = Z(""), b = Z(0);
    const h = A;
    ml(() => h.initValue, (i) => {
      n && n.setContent(i);
    }), cl(() => {
      n = new gt({
        element: o.value,
        placeholder: "写点什么?",
        content: h.initValue ? h.initValue : "",
        toolbarKeys: [
          "undo",
          "redo",
          "brush",
          "eraser",
          "|",
          "heading",
          "font-family",
          "font-size",
          "|",
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "code",
          "subscript",
          "superscript",
          "hr",
          "todo",
          "emoji",
          "|",
          "highlight",
          "font-color",
          "|",
          "align",
          "line-height",
          "|",
          "bullet-list",
          "ordered-list",
          "indent-decrease",
          "indent-increase",
          "break",
          "|",
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5ZM18 17L14 11L7 17H18Z"></path></svg>',
            onClick: (i, a) => {
              g.value = "img", b.value = 8, _.value = "选择图片", d.value = !0;
            },
            tip: "插入图片"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19V5H9.58579L11.5858 7H20V19H4ZM21 5H12.4142L10.4142 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V6C22 5.44772 21.5523 5 21 5ZM15.0008 12.667L10.1219 9.41435C10.0562 9.37054 9.979 9.34717 9.9 9.34717C9.6791 9.34717 9.5 9.52625 9.5 9.74717V16.2524C9.5 16.3314 9.5234 16.4086 9.5672 16.4743C9.6897 16.6581 9.9381 16.7078 10.1219 16.5852L15.0008 13.3326C15.0447 13.3033 15.0824 13.2656 15.1117 13.2217C15.2343 13.0379 15.1846 12.7895 15.0008 12.667Z"></path></svg>',
            onClick: (i, a) => {
              g.value = "video", b.value = 1, _.value = "选择视频", d.value = !0;
            },
            tip: "插入视频"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z"></path></svg>',
            onClick: (i, a) => {
              g.value = "other", b.value = 1, _.value = "选择附件", d.value = !0;
            },
            tip: "插入附件"
          },
          "quote",
          "code-block",
          "table",
          "|",
          "printer",
          "fullscreen"
        ],
        image: {
          allowBase64: !1,
          uploadUrl: "/api/auth/attach/upload",
          uploadFormName: "file",
          uploadHeaders: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(_e.STORAGE_TOKEN)).accessToken
          },
          uploaderEvent: {
            onFailed: (i, a) => {
              re.error("文件上传失败");
            },
            onError: (i, a) => {
              re.error("文件上传失败");
            },
            onSuccess: (i, a) => a.code === 200 ? (re.success("文件上传成功"), {
              errorCode: 0,
              data: {
                src: a.data.url,
                alt: a.data.name
              }
            }) : (re.error(a.msg), !1)
          }
        }
      });
    }), pl(() => {
      n && n.destroy();
    });
    function B(i) {
      v.value = i;
    }
    function F() {
      let i = "";
      v.value.forEach((a, p) => {
        g.value === "img" && (i += `![${a.name}](${a.url})`), g.value === "video" && (i += `<video src="${a.url}" controls="controls" width="100%"></video>`), g.value === "other" && (i += `[${a.name}](${a.url})`);
      }), n.insert(i), d.value = !1, v.value = [];
    }
    function R() {
      d.value = !1, v.value = [];
    }
    function s() {
      n.clear();
    }
    function l() {
      return {
        content: n.getMarkdown(),
        parseContent: n.getHtml()
      };
    }
    return T({
      resetContent: s,
      getValue: l
    }), (i, a) => {
      const p = Le("el-button"), E = Le("el-dialog");
      return ze(), Ge(sl, null, [
        Ue("div", {
          ref_key: "divRef",
          ref: o,
          style: nl({ height: h.height })
        }, null, 4),
        ue(E, {
          modelValue: L(d),
          "onUpdate:modelValue": a[1] || (a[1] = (w) => Oe(d) ? d.value = w : d = w),
          title: L(_),
          width: L(ce)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: se(() => [
            Ue("span", rl, [
              ue(p, {
                type: "primary",
                onClick: F
              }, {
                default: se(() => [
                  a[2] || (a[2] = He("确 定")),
                  L(v).length > 0 ? (ze(), Ge("span", dl, "(已选" + il(L(v).length) + "个)", 1)) : ul("", !0)
                ]),
                _: 1
              }),
              ue(p, {
                onClick: a[0] || (a[0] = (w) => {
                  Oe(d) ? d.value = !1 : d = !1, R();
                })
              }, {
                default: se(() => a[3] || (a[3] = [
                  He("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: se(() => [
            ue(Ze, {
              "onUpdate:selectedAttach": B,
              max: L(b),
              "attach-type": L(g)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ], 64);
    };
  }
}, vl = /* @__PURE__ */ pe(fl, [["__scopeId", "data-v-87814627"]]), we = window.Vue.openBlock, Ie = window.Vue.createBlock, Pe = window.Vue.createCommentVNode, hl = window.Vue.Fragment, wl = window.Vue.createElementBlock, gl = window.Vue.ref, Vl = {
  __name: "custom-editor",
  props: ["editorType", "initValue", "height"],
  setup(A, { expose: T }) {
    const o = A, n = gl();
    function d() {
      n.value.resetContent();
    }
    function _() {
      return n.value.getValue();
    }
    return T({
      resetContent: d,
      getValue: _
    }), (v, g) => (we(), wl(hl, null, [
      o.editorType === "Vditor" ? (we(), Ie(al, {
        key: 0,
        "init-value": o.initValue,
        height: o.height,
        ref_key: "editorRef",
        ref: n
      }, null, 8, ["init-value", "height"])) : Pe("", !0),
      o.editorType === "AiEditor" ? (we(), Ie(vl, {
        key: 1,
        "init-value": o.initValue,
        height: o.height,
        ref_key: "editorRef",
        ref: n
      }, null, 8, ["init-value", "height"])) : Pe("", !0)
    ], 64));
  }
};
function _l() {
  return axios.get("/api/auth/theme/getThemePageTpl");
}
const ge = window.Vue.unref, M = window.Vue.createElementVNode, O = window.Vue.createTextVNode, z = window.Vue.resolveComponent, m = window.Vue.createVNode, V = window.Vue.withCtx, De = window.Vue.withModifiers, I = window.Vue.openBlock, X = window.Vue.createBlock, yl = window.Vue.createCommentVNode, Cl = window.Vue.renderList, bl = window.Vue.Fragment, Ke = window.Vue.createElementBlock, kl = window.Vue.resolveDirective, xl = window.Vue.withDirectives, $l = { class: "page" }, Al = { class: "content-label" }, El = { class: "content-label-right" }, Nl = { style: { display: "flex" } }, Sl = { style: { "margin-left": "15px" } }, de = window.ElementPlus.ElMessage, Ve = window.ElementPlus.ElMessageBox, J = window.Vue.ref, Ml = {
  __name: "PageCreateView",
  setup(A) {
    const T = J(), o = J({
      id: null,
      title: "",
      content: "",
      parseContent: "",
      summary: "",
      metaKeywords: "",
      metaDescription: "",
      thumbnail: "",
      slug: "",
      isComment: 1,
      isTop: 0,
      flag: "",
      type: "page",
      contentModel: "Vditor",
      template: "default"
    }), n = J();
    let d = J(!1), _ = J(!0), v = J([]);
    function g(s) {
      o.value.contentModel !== s && Ve.confirm("切换编辑器可能会造成内容丢失,是否切换?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let l = n.value.getValue();
        o.value.content = l.content, o.value.parseContent = l.parseContent, o.value.contentModel = s;
      }).catch(() => {
      });
    }
    function b() {
      o.value = {
        id: null,
        title: "",
        content: "",
        parseContent: "",
        summary: "",
        metaKeywords: "",
        metaDescription: "",
        thumbnail: "",
        slug: "",
        isComment: 1,
        isTop: 0,
        flag: "",
        type: "page",
        contentModel: "Vditor",
        template: "default"
      }, n.value.resetContent(), T.value.resetFields();
    }
    function h(s) {
      if (!o.value.title) {
        de.error("页面标题不能为空");
        return;
      }
      let l = n.value.getValue();
      if (o.value.content = l.content, o.value.parseContent = l.parseContent, !o.value.content) {
        de.error("页面内容不能为空");
        return;
      }
      o.value.status = s, d.value = !0, o.value.id ? vt(o.value).then((i) => {
        d.value = !1, i.code === 200 ? Ve.confirm("页面修改成功!", "提示", {
          confirmButtonText: "前往页面列表",
          cancelButtonText: "继续修改",
          type: "success"
        }).then(() => {
          xe("", "/admin/page", ""), $e(router.currentRoute.value.fullPath);
        }).catch(() => {
        }) : de.error(i.msg);
      }) : ht(o.value).then((i) => {
        d.value = !1, i.code === 200 ? (b(), Ve.confirm("页面添加成功!", "提示", {
          confirmButtonText: "前往页面列表",
          cancelButtonText: "再添加一个页面",
          type: "success"
        }).then(() => {
          xe("", "/admin/page", ""), $e(router.currentRoute.value.fullPath);
        }).catch(() => {
        })) : de.error(i.msg);
      });
    }
    function B() {
      o.value.id || (Ae.setOptions({ charCase: 1, checkPolyphone: !1 }), o.value.slug = Ae.getCamelChars(o.value.title));
    }
    function F() {
      if (_.value = !0, !router.currentRoute.value.params.id) {
        _.value = !1;
        return;
      }
      wt(router.currentRoute.value.params.id).then((s) => {
        s.code === 200 && (o.value = s.data), _.value = !1;
      });
    }
    function R() {
      _l().then((s) => {
        v.value = s.data;
      });
    }
    return F(), R(), (s, l) => {
      const i = z("el-input"), a = z("el-form-item"), p = z("el-option"), E = z("el-select"), w = z("el-col"), Y = z("el-button"), ee = z("el-switch"), me = z("el-row"), fe = z("el-form"), q = kl("loading");
      return xl((I(), Ke("div", $l, [
        m(fe, {
          model: o.value,
          class: "demo-form-inline",
          ref_key: "addFormRef",
          ref: T,
          "label-position": "top"
        }, {
          default: V(() => [
            m(me, { gutter: 24 }, {
              default: V(() => [
                m(w, {
                  xs: 24,
                  sm: 24,
                  md: 17,
                  lg: 17,
                  xl: 17
                }, {
                  default: V(() => [
                    m(a, { prop: "title" }, {
                      label: V(() => l[14] || (l[14] = [
                        M("div", { class: "content-label" }, [
                          M("span", { class: "required" }, "*"),
                          O("页面标题 ")
                        ], -1)
                      ])),
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.title,
                          "onUpdate:modelValue": l[0] || (l[0] = (c) => o.value.title = c),
                          placeholder: "请输入页面标题",
                          clearable: "",
                          onChange: B
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      prop: "content",
                      class: "article-content-item"
                    }, {
                      label: V(() => [
                        M("div", Al, [
                          l[16] || (l[16] = M("div", { class: "content-label-left" }, [
                            M("span", { class: "required" }, "*"),
                            O("页面内容 ")
                          ], -1)),
                          M("div", El, [
                            l[15] || (l[15] = O(" 切换编辑器: ")),
                            m(E, {
                              placeholder: "Select",
                              size: "small",
                              style: { width: "180px" },
                              modelValue: o.value.contentModel,
                              "onUpdate:modelValue": l[3] || (l[3] = (c) => o.value.contentModel = c)
                            }, {
                              default: V(() => [
                                (I(), X(p, {
                                  key: "Vditor",
                                  label: "Vditor",
                                  value: "Vditor",
                                  onClick: l[1] || (l[1] = De((c) => g("Vditor"), ["prevent"])),
                                  disabled: "",
                                  class: "editor-option"
                                })),
                                (I(), X(p, {
                                  key: "AiEditor",
                                  label: "AiEditor",
                                  value: "AiEditor",
                                  onClick: l[2] || (l[2] = De((c) => g("AiEditor"), ["prevent"])),
                                  disabled: "",
                                  class: "editor-option"
                                }))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      default: V(() => [
                        ge(_) ? yl("", !0) : (I(), X(Vl, {
                          key: 0,
                          "editor-type": o.value.contentModel,
                          "init-value": o.value.content,
                          height: "666px",
                          ref_key: "editorRef",
                          ref: n
                        }, null, 8, ["editor-type", "init-value"]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                m(w, {
                  xs: 24,
                  sm: 24,
                  md: 7,
                  lg: 7,
                  xl: 7,
                  class: "article-right"
                }, {
                  default: V(() => [
                    m(a, null, {
                      default: V(() => [
                        m(Y, {
                          type: "primary",
                          onClick: l[4] || (l[4] = (c) => h(0))
                        }, {
                          default: V(() => l[17] || (l[17] = [
                            O("发布")
                          ])),
                          _: 1
                        }),
                        m(Y, {
                          onClick: l[5] || (l[5] = (c) => h(1))
                        }, {
                          default: V(() => l[18] || (l[18] = [
                            O("保存至草稿")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "访问地址别名",
                      prop: "slug"
                    }, {
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.slug,
                          "onUpdate:modelValue": l[6] || (l[6] = (c) => o.value.slug = c),
                          placeholder: "请输入访问地址别名",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "主题模板",
                      prop: "template"
                    }, {
                      default: V(() => [
                        m(E, {
                          modelValue: o.value.template,
                          "onUpdate:modelValue": l[7] || (l[7] = (c) => o.value.template = c),
                          placeholder: "请选择主题模板"
                        }, {
                          default: V(() => [
                            (I(), X(p, {
                              key: "default",
                              label: "默认匹配",
                              value: "default"
                            })),
                            (I(!0), Ke(bl, null, Cl(ge(v), (c) => (I(), X(p, {
                              key: c,
                              label: c,
                              value: c
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "页面摘要",
                      prop: "summary"
                    }, {
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.summary,
                          "onUpdate:modelValue": l[8] || (l[8] = (c) => o.value.summary = c),
                          placeholder: "请输入页面摘要",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "SEO关键字",
                      prop: "metaKeywords"
                    }, {
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.metaKeywords,
                          "onUpdate:modelValue": l[9] || (l[9] = (c) => o.value.metaKeywords = c),
                          placeholder: "请输入SEO关键字",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "SEO描述",
                      prop: "metaDescription"
                    }, {
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.metaDescription,
                          "onUpdate:modelValue": l[10] || (l[10] = (c) => o.value.metaDescription = c),
                          placeholder: "请输入SEO描述",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, {
                      label: "页面标识",
                      prop: "flag"
                    }, {
                      default: V(() => [
                        m(i, {
                          modelValue: o.value.flag,
                          "onUpdate:modelValue": l[11] || (l[11] = (c) => o.value.flag = c),
                          placeholder: "请输入页面标识",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    m(a, null, {
                      default: V(() => [
                        M("div", Nl, [
                          M("div", null, [
                            l[19] || (l[19] = M("span", { class: "custom-label" }, "允许评论", -1)),
                            l[20] || (l[20] = O()),
                            m(ee, {
                              modelValue: o.value.isComment,
                              "onUpdate:modelValue": l[12] || (l[12] = (c) => o.value.isComment = c),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ]),
                          M("div", Sl, [
                            l[21] || (l[21] = M("span", { class: "custom-label" }, "置顶", -1)),
                            l[22] || (l[22] = O()),
                            m(ee, {
                              modelValue: o.value.isTop,
                              "onUpdate:modelValue": l[13] || (l[13] = (c) => o.value.isTop = c),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ])
                        ])
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
        }, 8, ["model"])
      ])), [
        [q, ge(d)]
      ]);
    };
  }
}, zl = /* @__PURE__ */ pe(Ml, [["__scopeId", "data-v-ce833d9a"]]);
export {
  zl as default
};
