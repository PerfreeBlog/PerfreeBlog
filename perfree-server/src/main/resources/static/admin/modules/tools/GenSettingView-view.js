import { a as B, l as D } from "./lib/@element-plus.js";
import { H as C, j as U } from "./lib/highlight.js.js";
import { u as b } from "./lib/@form-create.js";
import { _ as q } from "./lib/_plugin-vue_export-helper.js";
const A = {
  //插入菜单位置
  menu: "main",
  //图标
  icon: "icon-upload",
  //名称
  label: "附件选择输入",
  //id,唯一!
  name: "AttachSelectInput",
  //是否可以操作, 除了容器类组件建议为true !
  mask: !0,
  //支持组件验证, 值的类型
  validate: ["string"],
  //定义组件的事件
  event: ["change"],
  //定义组件的渲染规则
  rule({ t: g }) {
    return {
      type: "AttachSelectInput",
      //field不能重复!!!
      field: b(),
      title: "附件选择输入",
      info: "",
      $required: !1,
      props: {}
    };
  },
  //组件的属性配置
  props(g, { t: v }) {
    return [
      {
        type: "select",
        title: "文件类型",
        field: "attachType",
        options: [
          { label: "图片", value: "img" },
          { label: "视频", value: "video" },
          { label: "音频", value: "audio" },
          { label: "其他", value: "other" }
        ]
      },
      {
        type: "switch",
        title: "是否允许输入",
        field: "enableInput"
      },
      {
        type: "input",
        title: "提示内容",
        field: "placeholder"
      }
    ];
  }
}, T = {
  //插入菜单位置
  menu: "main",
  //图标
  icon: "icon-refresh",
  //名称
  label: "轮播设置项",
  //id,唯一!
  name: "SettingCarousel",
  //是否可以操作, 除了容器类组件建议为true !
  mask: !0,
  //支持组件验证, 值的类型
  validate: ["string"],
  //定义组件的事件
  event: ["change"],
  //定义组件的渲染规则
  rule({ t: g }) {
    return {
      type: "SettingCarousel",
      //field不能重复!!!
      field: b(),
      title: "轮播设置项",
      info: "",
      $required: !1,
      props: {}
    };
  },
  //组件的属性配置
  props(g, { t: v }) {
    return [];
  }
}, r = window.Vue.unref, t = window.Vue.createVNode, d = window.Vue.resolveComponent, o = window.Vue.withCtx, p = window.Vue.createTextVNode, m = window.Vue.isRef, _ = window.Vue.createElementVNode, z = window.Vue.resolveDirective, G = window.Vue.withDirectives, H = window.Vue.openBlock, L = window.Vue.createElementBlock, P = { class: "page" }, $ = { class: "dialog-footer" }, F = { class: "hljs" }, K = { class: "dialog-footer" }, Q = window.VueUse.useClipboard, w = window.ElementPlus.ElMessage, W = window.Vue.onMounted, c = window.Vue.ref, X = {
  __name: "GenSettingView",
  setup(g) {
    const { copy: v, isSupported: J } = Q({ legacy: !0 }), a = c();
    let s = c(!1), n = c(!1), V = c(""), f = c("");
    const k = c({
      //控制字段ID输入框能否输入
      fieldReadonly: !1,
      //隐藏所有子表单组件
      hiddenMenu: ["subform"]
      //隐藏输入框和密码输入框
      //hiddenItem: ['input','pasasword'],
    });
    function S() {
      s.value = !0, V.value = {
        option: a.value.getOption(),
        rule: a.value.getRule()
      };
    }
    function x() {
      n.value = !0;
    }
    function N() {
      const i = JSON.parse(f.value);
      a.value.setOption(i.option), a.value.setRule(i.rule), w.success("导入成功"), n.value = !1;
    }
    W(async () => {
      a.value.addComponent(A), a.value.addComponent(T), C.registerLanguage("json", U);
    });
    const j = (i) => (i = JSON.stringify(i, null, 2), C.highlight("json", i, !0).value || "&nbsp;"), R = async () => {
      try {
        if (!J.value) {
          w.error("复制失败,可能浏览器不支持,请手动复制");
          return;
        }
        await v(JSON.stringify(V.value, null, 2) || ""), w.success("复制成功");
      } catch {
        w.error("复制失败,可能浏览器不支持,请手动复制");
      }
    };
    return (i, e) => {
      const y = d("el-icon"), u = d("el-button"), E = d("fc-designer"), I = d("el-input"), h = d("el-dialog"), O = d("el-scrollbar"), M = z("dompurify-html");
      return H(), L("div", P, [
        t(E, {
          ref_key: "designer",
          ref: a,
          height: "100%",
          config: k.value
        }, {
          handle: o(() => [
            t(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: x
            }, {
              default: o(() => [
                t(y, null, {
                  default: o(() => [
                    t(r(B))
                  ]),
                  _: 1
                }),
                e[5] || (e[5] = p(" 导入 Json"))
              ]),
              _: 1
            }),
            t(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: S
            }, {
              default: o(() => [
                t(y, null, {
                  default: o(() => [
                    t(r(D))
                  ]),
                  _: 1
                }),
                e[6] || (e[6] = p(" 生成 Json"))
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["config"]),
        t(h, {
          modelValue: r(n),
          "onUpdate:modelValue": e[2] || (e[2] = (l) => m(n) ? n.value = l : n = l),
          title: "导入Json",
          width: "800px",
          draggable: ""
        }, {
          footer: o(() => [
            _("span", $, [
              t(u, {
                type: "primary",
                onClick: N
              }, {
                default: o(() => e[7] || (e[7] = [
                  p("确 定")
                ])),
                _: 1
              }),
              t(u, {
                onClick: e[1] || (e[1] = (l) => m(n) ? n.value = !1 : n = !1)
              }, {
                default: o(() => e[8] || (e[8] = [
                  p("关 闭")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(I, {
              modelValue: r(f),
              "onUpdate:modelValue": e[0] || (e[0] = (l) => m(f) ? f.value = l : f = l),
              style: { width: "100%" },
              rows: 10,
              type: "textarea",
              placeholder: "请输入或复制json内容"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        t(h, {
          modelValue: r(s),
          "onUpdate:modelValue": e[4] || (e[4] = (l) => m(s) ? s.value = l : s = l),
          title: "生成Json",
          width: "800px",
          draggable: ""
        }, {
          footer: o(() => [
            _("span", K, [
              t(u, {
                type: "primary",
                onClick: R
              }, {
                default: o(() => e[9] || (e[9] = [
                  p("复制Json")
                ])),
                _: 1
              }),
              t(u, {
                onClick: e[3] || (e[3] = (l) => m(s) ? s.value = !1 : s = !1)
              }, {
                default: o(() => e[10] || (e[10] = [
                  p("关 闭")
                ])),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(O, { height: "580" }, {
              default: o(() => [
                _("div", null, [
                  _("pre", null, [
                    G(_("code", F, null, 512), [
                      [M, j(r(V))]
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}, oe = /* @__PURE__ */ q(X, [["__scopeId", "data-v-c38e9ae1"]]);
export {
  oe as default
};
