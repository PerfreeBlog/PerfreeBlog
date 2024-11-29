import { s as yt, r as bt, u as Me, f as Ct } from "./lib/@element-plus.js";
import { _ as ie, d as ne, c as kt, h as xt, g as $t, u as At, t as Ue, a as Fe, b as Et, e as Nt } from "./lib/tabs.js";
import { V as St } from "./lib/vditor.js";
import { i as Tt } from "./lib/aieditor.js";
import { p as Re } from "./lib/js-pinyin.js";
function Bt(A) {
  return axios.post("/api/auth/attach/page", A);
}
function Mt() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function Ut(A) {
  return axios.put("/apiv/attach/update", A);
}
function Ft(A) {
  return axios.get("/api/auth/attach/get?id=" + A);
}
const Ee = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, Rt = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
};
function zt() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const C = window.Vue.resolveComponent, n = window.Vue.createVNode, r = window.Vue.withCtx, x = window.Vue.unref, te = window.Vue.renderList, le = window.Vue.Fragment, k = window.Vue.openBlock, F = window.Vue.createElementBlock, K = window.Vue.createBlock, G = window.Vue.createTextVNode, $ = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const ze = window.Vue.toDisplayString, Ge = window.Vue.normalizeClass, Gt = window.Vue.withModifiers, ke = window.Vue.isRef, Lt = { class: "page" }, It = { class: "search-box" }, Ht = { class: "table-box" }, Ot = { class: "attach-list-box" }, Dt = ["onClick"], Pt = { class: "attach-preview" }, Kt = { class: "imgLoading" }, Zt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", height: "100%" }
}, Jt = ["src"], qt = {
  key: 2,
  class: "attach-other"
}, jt = { class: "attach-name" }, Wt = { class: "operate-btn-box" }, Qt = { style: { "padding-right": "15px" } }, Xt = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Yt = ["src"], el = {
  key: 2,
  controls: "",
  preload: "none"
}, tl = ["src"], ll = { key: 3 }, ol = { class: "showForm" }, al = { class: "dialog-footer" }, nl = window.Vue.computed, il = window.Vue.reactive, E = window.Vue.ref, Z = window.ElementPlus.ElMessage, ul = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(A, { emit: T }) {
    const m = E(), e = E({
      pageNo: 1,
      pageSize: 18,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let s = E([]), g = E(!1), w = E(/* @__PURE__ */ new Map());
    const v = T, _ = A;
    let V = E(!1), B = E(""), M = E([]);
    const U = E(), i = E({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), b = il({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), u = E();
    let a = E(), t = E(!1), c = E([]);
    const p = E({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let X = localStorage.getItem(Ee.STORAGE_TOKEN), ue = Rt.baseURL, se = {
      Authorization: "Bearer " + JSON.parse(X).accessToken
    };
    const re = nl(() => {
      switch (_.attachType) {
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
    function Y() {
      i.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, U.value && U.value.resetFields();
    }
    function R() {
      _.attachType && (e.value.type = _.attachType), g.value = !0, Bt(e.value).then((h) => {
        h.data.list.forEach((l) => {
          l.selected = w.value.has(l.id);
        }), s.value = h.data.list, e.value.total = h.data.total, g.value = !1;
      });
    }
    function ye() {
      e.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, m.value.resetFields(), R();
    }
    function be(h) {
      if (!h.selected && w.value.size >= _.max) {
        Z.error(`最多选择${_.max}个`);
        return;
      }
      h.selected = !h.selected, h.selected ? w.value.set(h.id, h) : w.value.delete(h.id), v("update:selectedAttach", Array.from(w.value.values()));
    }
    function P() {
      Mt().then((h) => {
        M.value = h.data;
      });
    }
    function d(h) {
      Y(), P(), Ft(h.id).then((l) => {
        i.value = l.data, B.value = "详情", V.value = !0;
      });
    }
    function nt() {
      U.value.validate((h) => {
        h && Ut(i.value).then((l) => {
          l.code === 200 ? (Z.success("修改成功"), V.value = !1, Y(), R()) : Z.error(l.msg);
        });
      });
    }
    function it() {
      P(), R();
    }
    function ut(h, l, I) {
      h.code === 200 ? Z.success(`[${l.name}]上传成功`) : (Z.error(h.msg), a.value.handleRemove(l));
    }
    function st() {
      rt(), B.value = "上传附件", dt(), P(), t.value = !0;
    }
    function rt() {
      p.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, u.value && u.value.resetFields();
    }
    function dt() {
      zt().then((h) => {
        c.value = h.data, h.data.forEach((l) => {
          l.master && (p.value.attachConfigId = l.id);
        });
      });
    }
    function ct(h) {
      Z.error("上传失败,请检查网络是否通通畅");
    }
    return P(), R(), (h, l) => {
      const I = C("el-input"), N = C("el-form-item"), de = C("el-option"), ce = C("el-select"), ee = C("el-button"), Ce = C("el-form"), pt = C("Loading"), pe = C("el-icon"), Se = C("el-image"), mt = C("el-text"), ft = C("InfoFilled"), vt = C("SuccessFilled"), wt = C("el-pagination"), ht = C("el-link"), Te = C("el-col"), Vt = C("el-row"), Be = C("el-dialog"), gt = C("el-upload");
      return k(), F("div", Lt, [
        $("div", It, [
          n(Ce, {
            inline: !0,
            model: e.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: m
          }, {
            default: r(() => [
              n(N, { label: "附件名称" }, {
                default: r(() => [
                  n(I, {
                    modelValue: e.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (o) => e.value.name = o),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(N, { label: "分组" }, {
                default: r(() => [
                  n(ce, {
                    modelValue: e.value.attachGroup,
                    "onUpdate:modelValue": l[1] || (l[1] = (o) => e.value.attachGroup = o),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: r(() => [
                      (k(!0), F(le, null, te(x(M), (o) => (k(), K(de, {
                        key: o.attachGroup,
                        label: o.attachGroup,
                        value: o.attachGroup
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(N, null, {
                default: r(() => [
                  n(ee, {
                    type: "primary",
                    onClick: R,
                    icon: x(yt)
                  }, {
                    default: r(() => l[16] || (l[16] = [
                      G("查询")
                    ])),
                    _: 1
                  }, 8, ["icon"]),
                  n(ee, {
                    icon: x(bt),
                    onClick: ye
                  }, {
                    default: r(() => l[17] || (l[17] = [
                      G("重置")
                    ])),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              n(N, null, {
                default: r(() => [
                  n(ee, {
                    icon: x(Me),
                    type: "primary",
                    plain: "",
                    onClick: st
                  }, {
                    default: r(() => l[18] || (l[18] = [
                      G("上传附件")
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
        $("div", Ht, [
          $("div", Ot, [
            (k(!0), F(le, null, te(x(s), (o) => (k(), F("div", {
              class: Ge({ "attach-block": !0, selected: o.selected }),
              onClick: (_t) => be(o)
            }, [
              $("div", Pt, [
                o.type && o.type === "img" ? (k(), K(Se, {
                  key: o.url,
                  src: o.url,
                  lazy: "",
                  class: "attach-img",
                  loading: "lazy"
                }, {
                  placeholder: r(() => [
                    $("div", Kt, [
                      n(pe, { class: "is-loading" }, {
                        default: r(() => [
                          n(pt)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 2
                }, 1032, ["src"])) : o.type && o.type === "video" ? (k(), F("video", Zt, [
                  $("source", {
                    src: o.url
                  }, null, 8, Jt)
                ])) : (k(), F("div", qt, ze(o.path.split(".").pop()), 1))
              ]),
              $("div", jt, [
                n(mt, {
                  "line-clamp": "1",
                  style: { width: "100%" }
                }, {
                  default: r(() => [
                    G(ze(o.name), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              $("div", {
                class: Ge({ "operate-mask": !0, selected: o.selected })
              }, null, 2),
              $("div", Wt, [
                n(pe, {
                  class: "operate-btn",
                  onClick: Gt((_t) => d(o), ["stop"])
                }, {
                  default: r(() => [
                    n(ft)
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                n(pe, { class: "operate-btn select-btn" }, {
                  default: r(() => [
                    n(vt)
                  ]),
                  _: 1
                })
              ])
            ], 10, Dt))), 256))
          ]),
          n(wt, {
            "current-page": e.value.pageNo,
            "onUpdate:currentPage": l[2] || (l[2] = (o) => e.value.pageNo = o),
            "page-size": e.value.pageSize,
            "onUpdate:pageSize": l[3] || (l[3] = (o) => e.value.pageSize = o),
            "page-sizes": [18, 24, 48],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: R,
            total: e.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(Be, {
          modelValue: x(V),
          "onUpdate:modelValue": l[11] || (l[11] = (o) => ke(V) ? V.value = o : V = o),
          title: x(B),
          width: x(ne)(800),
          draggable: ""
        }, {
          footer: r(() => [
            $("span", al, [
              n(ee, {
                type: "primary",
                onClick: nt
              }, {
                default: r(() => l[21] || (l[21] = [
                  G("修 改")
                ])),
                _: 1
              }),
              n(ee, {
                onClick: l[10] || (l[10] = (o) => {
                  ke(V) ? V.value = !1 : V = !1, Y();
                })
              }, {
                default: r(() => l[22] || (l[22] = [
                  G("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            n(Vt, null, {
              default: r(() => [
                n(Te, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: r(() => [
                    $("div", Qt, [
                      i.value.type && i.value.type === "img" ? (k(), K(Se, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: i.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [i.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : i.value.type && i.value.type === "video" ? (k(), F("video", Xt, [
                        $("source", {
                          src: i.value.url
                        }, null, 8, Yt)
                      ])) : i.value.type && i.value.type === "audio" ? (k(), F("audio", el, [
                        $("source", {
                          src: i.value.url
                        }, null, 8, tl)
                      ])) : (k(), F("i", ll, [
                        l[20] || (l[20] = G("无法预览，点击 ")),
                        n(ht, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + i.value.configId + "/get/" + i.value.path
                        }, {
                          default: r(() => l[19] || (l[19] = [
                            G("下载 ")
                          ])),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                n(Te, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: r(() => [
                    $("div", ol, [
                      n(Ce, {
                        ref_key: "showFormRef",
                        ref: U,
                        model: i.value,
                        "label-width": "auto",
                        rules: b,
                        "label-position": "top"
                      }, {
                        default: r(() => [
                          n(N, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: r(() => [
                              n(I, {
                                modelValue: i.value.name,
                                "onUpdate:modelValue": l[4] || (l[4] = (o) => i.value.name = o)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(N, { label: "附件类型" }, {
                            default: r(() => [
                              n(I, {
                                modelValue: i.value.type,
                                "onUpdate:modelValue": l[5] || (l[5] = (o) => i.value.type = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(N, { label: "分组" }, {
                            default: r(() => [
                              n(ce, {
                                modelValue: i.value.attachGroup,
                                "onUpdate:modelValue": l[6] || (l[6] = (o) => i.value.attachGroup = o),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: r(() => [
                                  (k(!0), F(le, null, te(x(M), (o) => (k(), K(de, {
                                    key: o.attachGroup,
                                    label: o.attachGroup,
                                    value: o.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(N, { label: "存储路径" }, {
                            default: r(() => [
                              n(I, {
                                modelValue: i.value.path,
                                "onUpdate:modelValue": l[7] || (l[7] = (o) => i.value.path = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(N, { label: "访问地址" }, {
                            default: r(() => [
                              n(I, {
                                modelValue: i.value.url,
                                "onUpdate:modelValue": l[8] || (l[8] = (o) => i.value.url = o),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n(N, { label: "附件描述" }, {
                            default: r(() => [
                              n(I, {
                                modelValue: i.value.desc,
                                "onUpdate:modelValue": l[9] || (l[9] = (o) => i.value.desc = o),
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
        n(Be, {
          modelValue: x(t),
          "onUpdate:modelValue": l[15] || (l[15] = (o) => ke(t) ? t.value = o : t = o),
          title: x(B),
          width: x(ne)(600),
          draggable: "",
          onClose: it
        }, {
          default: r(() => [
            n(Ce, {
              ref_key: "addFormRef",
              ref: u,
              model: p.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: r(() => [
                n(N, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: r(() => [
                    n(ce, {
                      modelValue: p.value.attachConfigId,
                      "onUpdate:modelValue": l[12] || (l[12] = (o) => p.value.attachConfigId = o),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: r(() => [
                        (k(!0), F(le, null, te(x(c), (o) => (k(), K(de, {
                          key: o.id,
                          label: o.name,
                          value: o.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n(N, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: r(() => [
                    n(ce, {
                      modelValue: p.value.attachGroup,
                      "onUpdate:modelValue": l[13] || (l[13] = (o) => p.value.attachGroup = o),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: r(() => [
                        (k(!0), F(le, null, te(x(M), (o) => (k(), K(de, {
                          key: o.attachGroup,
                          label: o.attachGroup,
                          value: o.attachGroup
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n(N, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: r(() => [
                    n(gt, {
                      class: "upload-demo",
                      drag: "",
                      headers: x(se),
                      action: x(ue) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: a,
                      "file-list": p.value.fileList,
                      "onUpdate:fileList": l[14] || (l[14] = (o) => p.value.fileList = o),
                      data: { attachConfigId: p.value.attachConfigId, attachGroup: p.value.attachGroup },
                      "on-success": ut,
                      "on-error": ct,
                      accept: re.value
                    }, {
                      tip: r(() => l[23] || (l[23] = [
                        $("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)
                      ])),
                      default: r(() => [
                        n(pe, { class: "el-icon--upload" }, {
                          default: r(() => [
                            n(x(Me))
                          ]),
                          _: 1
                        }),
                        l[24] || (l[24] = $("div", { class: "el-upload__text" }, [
                          G(" 拖拽文件到此处或者"),
                          $("em", null, "点击上传")
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
}, Ne = /* @__PURE__ */ ie(ul, [["__scopeId", "data-v-3b66d397"]]), J = window.Vue.unref, xe = window.Vue.resolveComponent, q = window.Vue.createVNode, oe = window.Vue.withCtx, sl = window.Vue.toDisplayString, Le = window.Vue.openBlock, Ie = window.Vue.createElementBlock, rl = window.Vue.createCommentVNode, He = window.Vue.createTextVNode, Oe = window.Vue.isRef, dl = window.Vue.createElementVNode, cl = { style: { width: "100%" } }, pl = { class: "dialog-footer" }, ml = { key: 0 }, ae = window.Vue.ref, fl = window.Vue.watch, vl = {
  __name: "attach-select-input",
  props: ["attachType", "enableInput", "placeholder", "modelValue"],
  emits: ["update:modelValue", "attachSelectChange"],
  setup(A, { emit: T }) {
    ae("请选择图片");
    let m = ae(!1), e = ae(""), s = ae([]);
    const g = A, w = T, v = ae(g.modelValue);
    fl(() => g.modelValue, (i, b) => {
      v.value = i;
    });
    function _() {
      w("update:modelValue", v.value);
    }
    function V() {
      m.value = !0, e.value = "请选择附件";
    }
    function B() {
      let i = "";
      s.value.forEach((b, u) => {
        i += b.url;
      }), w("attachSelectChange", s.value), v.value = i, m.value = !1, s.value = [], w("update:modelValue", v.value);
    }
    function M() {
      m.value = !1, s.value = [];
    }
    function U(i) {
      s.value = i;
    }
    return (i, b) => {
      const u = xe("el-button"), a = xe("el-input"), t = xe("el-dialog");
      return Le(), Ie("div", cl, [
        q(a, {
          modelValue: v.value,
          "onUpdate:modelValue": b[0] || (b[0] = (c) => v.value = c),
          placeholder: g.placeholder,
          style: { width: "100%" },
          disabled: !g.enableInput,
          onChange: _
        }, {
          append: oe(() => [
            q(u, {
              icon: J(Ct),
              type: "info",
              onClick: V
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "disabled"]),
        q(t, {
          modelValue: J(m),
          "onUpdate:modelValue": b[2] || (b[2] = (c) => Oe(m) ? m.value = c : m = c),
          title: J(e),
          width: J(ne)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: oe(() => [
            dl("span", pl, [
              q(u, {
                type: "primary",
                onClick: B
              }, {
                default: oe(() => [
                  b[3] || (b[3] = He("确 定")),
                  J(s).length > 0 ? (Le(), Ie("span", ml, "(已选" + sl(J(s).length) + "个)", 1)) : rl("", !0)
                ]),
                _: 1
              }),
              q(u, {
                onClick: b[1] || (b[1] = (c) => {
                  Oe(m) ? m.value = !1 : m = !1, M();
                })
              }, {
                default: oe(() => b[4] || (b[4] = [
                  He("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: oe(() => [
            q(Ne, {
              "onUpdate:selectedAttach": U,
              max: 1,
              "attach-type": g.attachType
            }, null, 8, ["attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ]);
    };
  }
}, wl = /* @__PURE__ */ ie(vl, [["__scopeId", "data-v-52e51a92"]]), De = window.Vue.createElementVNode, H = window.Vue.unref, me = window.Vue.createVNode, hl = window.Vue.toDisplayString, Pe = window.Vue.openBlock, Ke = window.Vue.createElementBlock, Vl = window.Vue.createCommentVNode, Ze = window.Vue.createTextVNode, Je = window.Vue.resolveComponent, fe = window.Vue.withCtx, qe = window.Vue.isRef, gl = window.Vue.Fragment, _l = { class: "dialog-footer" }, yl = { key: 0 }, bl = window.Vue.onBeforeUnmount, Cl = window.Vue.onMounted, j = window.Vue.ref, kl = window.Vue.watch, xl = {
  __name: "vditor-md-editor",
  props: ["initValue", "height"],
  setup(A, { expose: T }) {
    const m = j();
    let e = null, s = j(!1), g = j(""), w = j([]), v = j(""), _ = j(0);
    const V = A;
    kl(() => V.initValue, (u) => {
      e && e.setValue(u);
    }), Cl(() => {
      e = new St(m.value, {
        height: V.height,
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
              v.value = "img", _.value = 8, g.value = "选择图片", s.value = !0;
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
              v.value = "video", _.value = 1, g.value = "选择视频", s.value = !0;
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
              v.value = "other", _.value = 1, g.value = "选择附件", s.value = !0;
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
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(Ee.STORAGE_TOKEN)).accessToken
          },
          fieldName: "file",
          filename: (u) => u.replace(/\W/g, ""),
          linkToImgUrl: "/api/auth/attach/uploadAttachByUrl",
          linkToImgFormat(u) {
            let a = null, t = JSON.parse(u);
            return t.code === 200 && (a = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                originalURL: t.data.originalURL,
                url: t.data.url
              }
            })), a;
          },
          multiple: !1,
          url: "/api/auth/attach/upload",
          format(u, a) {
            let t = null, c = JSON.parse(a);
            return c.code === 200 && (t = JSON.stringify({
              msg: "",
              code: 0,
              data: {
                errFiles: [],
                succMap: {
                  [c.data.path]: c.data.url
                }
              }
            })), t;
          },
          withCredentials: !1
        },
        after: () => {
          e.setValue(V.initValue ? V.initValue : "");
        }
      });
    }), bl(() => {
      e && (e.setValue(""), e.clearCache(), e.clearStack());
    });
    function B(u) {
      w.value = u;
    }
    function M() {
      w.value.forEach((u, a) => {
        if (v.value === "img") {
          let t = `
![${u.name}](${u.url})`;
          e.insertValue(t), a === w.value.length - 1 && e.insertValue(`
`);
        }
        if (v.value === "video") {
          let t = `
<video src="${u.url}" controls="controls" width="100%"></video>`;
          e.insertValue(t);
        }
        if (v.value === "other") {
          let t = `
[${u.name}](${u.url})`;
          e.insertValue(t);
        }
      }), s.value = !1, w.value = [];
    }
    function U() {
      s.value = !1, w.value = [];
    }
    function i() {
      e && (e.setValue(""), e.clearCache(), e.clearStack());
    }
    function b() {
      return {
        content: e.getValue(),
        parseContent: e.getHTML()
      };
    }
    return T({
      resetContent: i,
      getValue: b
    }), (u, a) => {
      const t = Je("el-button"), c = Je("el-dialog");
      return Pe(), Ke(gl, null, [
        De("div", {
          ref_key: "vditor",
          ref: m,
          id: "vditor"
        }, null, 512),
        me(c, {
          modelValue: H(s),
          "onUpdate:modelValue": a[1] || (a[1] = (p) => qe(s) ? s.value = p : s = p),
          title: H(g),
          width: H(ne)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: fe(() => [
            De("span", _l, [
              me(t, {
                type: "primary",
                onClick: M
              }, {
                default: fe(() => [
                  a[2] || (a[2] = Ze("确 定")),
                  H(w).length > 0 ? (Pe(), Ke("span", yl, "(已选" + hl(H(w).length) + "个)", 1)) : Vl("", !0)
                ]),
                _: 1
              }),
              me(t, {
                onClick: a[0] || (a[0] = (p) => {
                  qe(s) ? s.value = !1 : s = !1, U();
                })
              }, {
                default: fe(() => a[3] || (a[3] = [
                  Ze("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: fe(() => [
            me(Ne, {
              "onUpdate:selectedAttach": B,
              max: H(_),
              "attach-type": H(v)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ], 64);
    };
  }
}, $l = /* @__PURE__ */ ie(xl, [["__scopeId", "data-v-1636df32"]]), Al = window.Vue.normalizeStyle, je = window.Vue.createElementVNode, O = window.Vue.unref, ve = window.Vue.createVNode, El = window.Vue.toDisplayString, We = window.Vue.openBlock, Qe = window.Vue.createElementBlock, Nl = window.Vue.createCommentVNode, Xe = window.Vue.createTextVNode, Ye = window.Vue.resolveComponent, we = window.Vue.withCtx, et = window.Vue.isRef, Sl = window.Vue.Fragment, Tl = { class: "dialog-footer" }, Bl = { key: 0 }, Ml = window.Vue.onMounted, Ul = window.Vue.onUnmounted, W = window.Vue.ref, Fl = window.Vue.watch, he = window.ElementPlus.ElMessage, Rl = {
  __name: "ai-editor",
  props: ["initValue", "height"],
  setup(A, { expose: T }) {
    const m = W();
    let e = null, s = W(!1), g = W(""), w = W([]), v = W(""), _ = W(0);
    const V = A;
    Fl(() => V.initValue, (u) => {
      e && e.setContent(u);
    }), Ml(() => {
      e = new Tt({
        element: m.value,
        placeholder: "写点什么?",
        content: V.initValue ? V.initValue : "",
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
            onClick: (u, a) => {
              v.value = "img", _.value = 8, g.value = "选择图片", s.value = !0;
            },
            tip: "插入图片"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19V5H9.58579L11.5858 7H20V19H4ZM21 5H12.4142L10.4142 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V6C22 5.44772 21.5523 5 21 5ZM15.0008 12.667L10.1219 9.41435C10.0562 9.37054 9.979 9.34717 9.9 9.34717C9.6791 9.34717 9.5 9.52625 9.5 9.74717V16.2524C9.5 16.3314 9.5234 16.4086 9.5672 16.4743C9.6897 16.6581 9.9381 16.7078 10.1219 16.5852L15.0008 13.3326C15.0447 13.3033 15.0824 13.2656 15.1117 13.2217C15.2343 13.0379 15.1846 12.7895 15.0008 12.667Z"></path></svg>',
            onClick: (u, a) => {
              v.value = "video", _.value = 1, g.value = "选择视频", s.value = !0;
            },
            tip: "插入视频"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z"></path></svg>',
            onClick: (u, a) => {
              v.value = "other", _.value = 1, g.value = "选择附件", s.value = !0;
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
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(Ee.STORAGE_TOKEN)).accessToken
          },
          uploaderEvent: {
            onFailed: (u, a) => {
              he.error("文件上传失败");
            },
            onError: (u, a) => {
              he.error("文件上传失败");
            },
            onSuccess: (u, a) => a.code === 200 ? (he.success("文件上传成功"), {
              errorCode: 0,
              data: {
                src: a.data.url,
                alt: a.data.name
              }
            }) : (he.error(a.msg), !1)
          }
        }
      });
    }), Ul(() => {
      e && e.destroy();
    });
    function B(u) {
      w.value = u;
    }
    function M() {
      let u = "";
      w.value.forEach((a, t) => {
        v.value === "img" && (u += `![${a.name}](${a.url})`), v.value === "video" && (u += `<video src="${a.url}" controls="controls" width="100%"></video>`), v.value === "other" && (u += `[${a.name}](${a.url})`);
      }), e.insert(u), s.value = !1, w.value = [];
    }
    function U() {
      s.value = !1, w.value = [];
    }
    function i() {
      e.clear();
    }
    function b() {
      return {
        content: e.getMarkdown(),
        parseContent: e.getHtml()
      };
    }
    return T({
      resetContent: i,
      getValue: b
    }), (u, a) => {
      const t = Ye("el-button"), c = Ye("el-dialog");
      return We(), Qe(Sl, null, [
        je("div", {
          ref_key: "divRef",
          ref: m,
          style: Al({ height: V.height })
        }, null, 4),
        ve(c, {
          modelValue: O(s),
          "onUpdate:modelValue": a[1] || (a[1] = (p) => et(s) ? s.value = p : s = p),
          title: O(g),
          width: O(ne)(900),
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: we(() => [
            je("span", Tl, [
              ve(t, {
                type: "primary",
                onClick: M
              }, {
                default: we(() => [
                  a[2] || (a[2] = Xe("确 定")),
                  O(w).length > 0 ? (We(), Qe("span", Bl, "(已选" + El(O(w).length) + "个)", 1)) : Nl("", !0)
                ]),
                _: 1
              }),
              ve(t, {
                onClick: a[0] || (a[0] = (p) => {
                  et(s) ? s.value = !1 : s = !1, U();
                })
              }, {
                default: we(() => a[3] || (a[3] = [
                  Xe("取 消")
                ])),
                _: 1
              })
            ])
          ]),
          default: we(() => [
            ve(Ne, {
              "onUpdate:selectedAttach": B,
              max: O(_),
              "attach-type": O(v)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "width"])
      ], 64);
    };
  }
}, zl = /* @__PURE__ */ ie(Rl, [["__scopeId", "data-v-87814627"]]), $e = window.Vue.openBlock, tt = window.Vue.createBlock, lt = window.Vue.createCommentVNode, Gl = window.Vue.Fragment, Ll = window.Vue.createElementBlock, Il = window.Vue.ref, Hl = {
  __name: "custom-editor",
  props: ["editorType", "initValue", "height"],
  setup(A, { expose: T }) {
    const m = A, e = Il();
    function s() {
      e.value.resetContent();
    }
    function g() {
      return e.value.getValue();
    }
    return T({
      resetContent: s,
      getValue: g
    }), (w, v) => ($e(), Ll(Gl, null, [
      m.editorType === "Vditor" ? ($e(), tt($l, {
        key: 0,
        "init-value": m.initValue,
        height: m.height,
        ref_key: "editorRef",
        ref: e
      }, null, 8, ["init-value", "height"])) : lt("", !0),
      m.editorType === "AiEditor" ? ($e(), tt(zl, {
        key: 1,
        "init-value": m.initValue,
        height: m.height,
        ref_key: "editorRef",
        ref: e
      }, null, 8, ["init-value", "height"])) : lt("", !0)
    ], 64));
  }
}, Ve = window.Vue.unref, S = window.Vue.createElementVNode, L = window.Vue.createTextVNode, z = window.Vue.resolveComponent, f = window.Vue.createVNode, y = window.Vue.withCtx, ot = window.Vue.withModifiers, Q = window.Vue.openBlock, ge = window.Vue.createBlock, Ol = window.Vue.createCommentVNode, Dl = window.Vue.renderList, Pl = window.Vue.Fragment, at = window.Vue.createElementBlock, Kl = window.Vue.resolveDirective, Zl = window.Vue.withDirectives, Jl = { class: "page" }, ql = { class: "content-label" }, jl = { class: "content-label-right" }, Wl = { style: { display: "flex" } }, Ql = { style: { "margin-left": "15px" } }, Xl = { style: { "margin-left": "15px" } }, _e = window.ElementPlus.ElMessage, Ae = window.ElementPlus.ElMessageBox, Yl = window.Vue.reactive, D = window.Vue.ref, eo = {
  __name: "ArticleCreateView",
  setup(A) {
    const T = D();
    let m = D(!0);
    const e = D({
      id: null,
      title: "",
      content: "",
      parseContent: "",
      selectTags: [],
      categoryIds: [],
      summary: "",
      metaKeywords: "",
      metaDescription: "",
      thumbnail: "",
      slug: "",
      isTop: 0,
      isComment: 1,
      flag: "",
      type: "article",
      contentModel: "Vditor",
      visibility: 0
    }), s = Yl({
      children: "children",
      label: "name",
      value: "id"
    });
    let g = D([]), w = D([]);
    const v = D();
    let _ = D(!1);
    function V(a) {
      e.value.contentModel !== a && Ae.confirm("切换编辑器可能会造成内容丢失,是否切换?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let t = v.value.getValue();
        e.value.content = t.content, e.value.parseContent = t.parseContent, e.value.contentModel = a;
      }).catch(() => {
      });
    }
    function B() {
      kt({}).then((a) => {
        g.value = xt(a.data, "id", "pid", "children", -1);
      });
    }
    function M() {
      $t().then((a) => {
        w.value = a.data;
      });
    }
    function U() {
      e.value = {
        id: null,
        title: "",
        content: "",
        parseContent: "",
        selectTags: [],
        categoryIds: [],
        summary: "",
        metaKeywords: "",
        metaDescription: "",
        thumbnail: "",
        slug: "",
        isTop: 0,
        isComment: 1,
        flag: "",
        type: "article",
        contentModel: "Vditor",
        visibility: 0
      }, v.value.resetContent(), T.value.resetFields();
    }
    function i(a) {
      if (!e.value.title) {
        _e.error("文章标题不能为空");
        return;
      }
      let t = v.value.getValue();
      if (e.value.content = t.content, e.value.parseContent = t.parseContent, !e.value.content) {
        _e.error("文章内容不能为空");
        return;
      }
      e.value.status = a, e.value.tagIds = [], e.value.addTags = [], e.value.selectTags.forEach((c) => {
        c.id ? e.value.tagIds.push(c.id) : e.value.addTags.push(c);
      }), _.value = !0, e.value.id ? At(e.value).then((c) => {
        _.value = !1, c.code === 200 ? Ae.confirm("文章修改成功!", "提示", {
          confirmButtonText: "前往文章列表",
          cancelButtonText: "继续修改",
          type: "success"
        }).then(() => {
          Ue("", "/admin/article", ""), Fe(router.currentRoute.value.fullPath);
        }).catch(() => {
        }) : _e.error(c.msg);
      }) : Et(e.value).then((c) => {
        _.value = !1, c.code === 200 ? (U(), Ae.confirm("文章发表成功!", "提示", {
          confirmButtonText: "前往文章列表",
          cancelButtonText: "再写一篇",
          type: "success"
        }).then(() => {
          Ue("", "/admin/article", ""), Fe(router.currentRoute.value.fullPath);
        }).catch(() => {
        })) : _e.error(c.msg);
      });
    }
    function b() {
      e.value.id || (Re.setOptions({ charCase: 1, checkPolyphone: !1 }), e.value.slug = Re.getCamelChars(e.value.title));
    }
    function u() {
      if (m.value = !0, !router.currentRoute.value.params.id) {
        m.value = !1;
        return;
      }
      Nt(router.currentRoute.value.params.id).then((a) => {
        a.code === 200 && (e.value = a.data, e.value.categoryIds = [], a.data.categoryList.forEach((t) => {
          e.value.categoryIds.push(t.id);
        }), e.value.selectTags = a.data.tagList), m.value = !1;
      });
    }
    return u(), B(), M(), (a, t) => {
      const c = z("el-input"), p = z("el-form-item"), X = z("el-option"), ue = z("el-select"), se = z("el-col"), re = z("el-button"), Y = z("el-tree-select"), R = z("el-switch"), ye = z("el-row"), be = z("el-form"), P = Kl("loading");
      return Zl((Q(), at("div", Jl, [
        f(be, {
          model: e.value,
          class: "demo-form-inline",
          ref_key: "addFormRef",
          ref: T,
          "label-position": "top"
        }, {
          default: y(() => [
            f(ye, { gutter: 24 }, {
              default: y(() => [
                f(se, {
                  xs: 24,
                  sm: 24,
                  md: 17,
                  lg: 17,
                  xl: 17
                }, {
                  default: y(() => [
                    f(p, { prop: "title" }, {
                      label: y(() => t[17] || (t[17] = [
                        S("div", { class: "content-label" }, [
                          S("span", { class: "required" }, "*"),
                          L("文章标题 ")
                        ], -1)
                      ])),
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.title,
                          "onUpdate:modelValue": t[0] || (t[0] = (d) => e.value.title = d),
                          placeholder: "请输入文章标题",
                          clearable: "",
                          onChange: b
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      prop: "content",
                      class: "article-content-item"
                    }, {
                      label: y(() => [
                        S("div", ql, [
                          t[19] || (t[19] = S("div", { class: "content-label-left" }, [
                            S("span", { class: "required" }, "*"),
                            L("文章内容 ")
                          ], -1)),
                          S("div", jl, [
                            t[18] || (t[18] = L(" 切换编辑器: ")),
                            f(ue, {
                              placeholder: "Select",
                              size: "small",
                              style: { width: "180px" },
                              modelValue: e.value.contentModel,
                              "onUpdate:modelValue": t[3] || (t[3] = (d) => e.value.contentModel = d)
                            }, {
                              default: y(() => [
                                (Q(), ge(X, {
                                  key: "Vditor",
                                  label: "Vditor",
                                  value: "Vditor",
                                  onClick: t[1] || (t[1] = ot((d) => V("Vditor"), ["prevent"])),
                                  disabled: "",
                                  class: "editor-option"
                                })),
                                (Q(), ge(X, {
                                  key: "AiEditor",
                                  label: "AiEditor",
                                  value: "AiEditor",
                                  onClick: t[2] || (t[2] = ot((d) => V("AiEditor"), ["prevent"])),
                                  disabled: "",
                                  class: "editor-option"
                                }))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      default: y(() => [
                        Ve(m) ? Ol("", !0) : (Q(), ge(Hl, {
                          key: 0,
                          "editor-type": e.value.contentModel,
                          "init-value": e.value.content,
                          height: "666px",
                          ref_key: "editorRef",
                          ref: v
                        }, null, 8, ["editor-type", "init-value"]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                f(se, {
                  xs: 24,
                  sm: 24,
                  md: 7,
                  lg: 7,
                  xl: 7,
                  class: "article-right"
                }, {
                  default: y(() => [
                    f(p, null, {
                      default: y(() => [
                        f(re, {
                          type: "primary",
                          onClick: t[4] || (t[4] = (d) => i(0))
                        }, {
                          default: y(() => t[20] || (t[20] = [
                            L("发布")
                          ])),
                          _: 1
                        }),
                        f(re, {
                          onClick: t[5] || (t[5] = (d) => i(1))
                        }, {
                          default: y(() => t[21] || (t[21] = [
                            L("保存至草稿")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "访问地址别名",
                      prop: "slug"
                    }, {
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.slug,
                          "onUpdate:modelValue": t[6] || (t[6] = (d) => e.value.slug = d),
                          placeholder: "请输入访问地址别名",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "分类",
                      prop: "categoryIds"
                    }, {
                      default: y(() => [
                        f(Y, {
                          modelValue: e.value.categoryIds,
                          "onUpdate:modelValue": t[7] || (t[7] = (d) => e.value.categoryIds = d),
                          data: Ve(g),
                          props: s,
                          "check-strictly": "",
                          "render-after-expand": !1,
                          style: { width: "100%" },
                          clearable: "",
                          multiple: "",
                          placeholder: "请选择分类"
                        }, null, 8, ["modelValue", "data", "props"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "标签",
                      prop: "selectTags"
                    }, {
                      default: y(() => [
                        f(ue, {
                          modelValue: e.value.selectTags,
                          "onUpdate:modelValue": t[8] || (t[8] = (d) => e.value.selectTags = d),
                          multiple: "",
                          filterable: "",
                          "allow-create": "",
                          "default-first-option": "",
                          "reserve-keyword": !1,
                          placeholder: "请选择或新增标签",
                          "value-key": "id"
                        }, {
                          default: y(() => [
                            (Q(!0), at(Pl, null, Dl(Ve(w), (d) => (Q(), ge(X, {
                              key: d.id,
                              label: d.name,
                              value: d
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "文章摘要",
                      prop: "summary"
                    }, {
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.summary,
                          "onUpdate:modelValue": t[9] || (t[9] = (d) => e.value.summary = d),
                          placeholder: "请输入文章摘要",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "SEO关键字",
                      prop: "metaKeywords"
                    }, {
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.metaKeywords,
                          "onUpdate:modelValue": t[10] || (t[10] = (d) => e.value.metaKeywords = d),
                          placeholder: "请输入SEO关键字",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "SEO描述",
                      prop: "metaDescription"
                    }, {
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.metaDescription,
                          "onUpdate:modelValue": t[11] || (t[11] = (d) => e.value.metaDescription = d),
                          placeholder: "请输入SEO描述",
                          autosize: { minRows: 3, maxRows: 6 },
                          type: "textarea"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "文章标识",
                      prop: "flag"
                    }, {
                      default: y(() => [
                        f(c, {
                          modelValue: e.value.flag,
                          "onUpdate:modelValue": t[12] || (t[12] = (d) => e.value.flag = d),
                          placeholder: "请输入文章标识",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    f(p, null, {
                      default: y(() => [
                        S("div", Wl, [
                          S("div", null, [
                            t[22] || (t[22] = S("span", { class: "custom-label" }, "允许评论", -1)),
                            t[23] || (t[23] = L()),
                            f(R, {
                              modelValue: e.value.isComment,
                              "onUpdate:modelValue": t[13] || (t[13] = (d) => e.value.isComment = d),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ]),
                          S("div", Ql, [
                            t[24] || (t[24] = S("span", { class: "custom-label" }, "置顶", -1)),
                            t[25] || (t[25] = L()),
                            f(R, {
                              modelValue: e.value.isTop,
                              "onUpdate:modelValue": t[14] || (t[14] = (d) => e.value.isTop = d),
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue"])
                          ]),
                          S("div", Xl, [
                            t[26] || (t[26] = S("span", { class: "custom-label" }, "可见", -1)),
                            t[27] || (t[27] = L()),
                            f(R, {
                              modelValue: e.value.visibility,
                              "onUpdate:modelValue": t[15] || (t[15] = (d) => e.value.visibility = d),
                              "active-value": 0,
                              "inactive-value": 1,
                              "inline-prompt": "",
                              style: { "--el-switch-on-color": "var(--el-color-success)", "--el-switch-off-color": "var(--el-color-warning)", "margin-right": "10px" },
                              "active-text": "所有人可见",
                              "inactive-text": "仅自己可见"
                            }, null, 8, ["modelValue"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    f(p, {
                      label: "封面图",
                      prop: "thumbnail"
                    }, {
                      default: y(() => [
                        f(wl, {
                          "attach-type": "img",
                          "enable-input": !0,
                          placeholder: "请选择或输入封面图地址",
                          "model-value": e.value.thumbnail,
                          "onUpdate:modelValue": t[16] || (t[16] = (d) => e.value.thumbnail = d)
                        }, null, 8, ["model-value"])
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
        [P, Ve(_)]
      ]);
    };
  }
}, io = /* @__PURE__ */ ie(eo, [["__scopeId", "data-v-3186be16"]]);
export {
  io as default
};
