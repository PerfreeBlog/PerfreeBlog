import { a as M, l as B } from "./lib/@element-plus.js";
import { H as b, j as D } from "./lib/highlight.js.js";
import { u as U } from "./lib/@form-create.js";
import { _ as A } from "./lib/_plugin-vue_export-helper.js";
const T = {
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
  rule({ t: v }) {
    return {
      type: "AttachSelectInput",
      //field不能重复!!!
      field: U(),
      title: "附件选择输入",
      info: "",
      $required: !1,
      props: {}
    };
  },
  //组件的属性配置
  props(v, { t: V }) {
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
}, r = window.Vue.unref, t = window.Vue.createVNode, d = window.Vue.resolveComponent, o = window.Vue.withCtx, p = window.Vue.createTextVNode, m = window.Vue.isRef, _ = window.Vue.createElementVNode, q = window.Vue.resolveDirective, z = window.Vue.withDirectives, G = window.Vue.openBlock, H = window.Vue.createElementBlock, L = { class: "page" }, P = { class: "dialog-footer" }, F = { class: "hljs" }, K = { class: "dialog-footer" }, Q = window.VueUse.useClipboard, w = window.ElementPlus.ElMessage, W = window.Vue.onMounted, c = window.Vue.ref, X = {
  __name: "GenSettingView",
  setup(v) {
    const { copy: V, isSupported: C } = Q({ legacy: !0 }), u = c();
    let s = c(!1), n = c(!1), g = c(""), f = c("");
    const J = c({
      //控制字段ID输入框能否输入
      fieldReadonly: !1,
      //隐藏所有子表单组件
      hiddenMenu: ["subform"]
      //隐藏输入框和密码输入框
      //hiddenItem: ['input','pasasword'],
    });
    function k() {
      s.value = !0, g.value = {
        option: u.value.getOption(),
        rule: u.value.getRule()
      };
    }
    function x() {
      n.value = !0;
    }
    function S() {
      const i = JSON.parse(f.value);
      u.value.setOption(i.option), u.value.setRule(i.rule), w.success("导入成功"), n.value = !1;
    }
    W(async () => {
      u.value.addComponent(T), b.registerLanguage("json", D);
    });
    const N = (i) => (i = JSON.stringify(i, null, 2), b.highlight("json", i, !0).value || "&nbsp;"), j = async () => {
      try {
        if (!C.value) {
          w.error("复制失败,可能浏览器不支持,请手动复制");
          return;
        }
        await V(JSON.stringify(g.value, null, 2) || ""), w.success("复制成功");
      } catch {
        w.error("复制失败,可能浏览器不支持,请手动复制");
      }
    };
    return (i, e) => {
      const y = d("el-icon"), a = d("el-button"), E = d("fc-designer"), I = d("el-input"), h = d("el-dialog"), O = d("el-scrollbar"), R = q("dompurify-html");
      return G(), H("div", L, [
        t(E, {
          ref_key: "designer",
          ref: u,
          height: "100%",
          config: J.value
        }, {
          handle: o(() => [
            t(a, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: x
            }, {
              default: o(() => [
                t(y, null, {
                  default: o(() => [
                    t(r(M))
                  ]),
                  _: 1
                }),
                e[5] || (e[5] = p(" 导入 Json"))
              ]),
              _: 1
            }),
            t(a, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: k
            }, {
              default: o(() => [
                t(y, null, {
                  default: o(() => [
                    t(r(B))
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
            _("span", P, [
              t(a, {
                type: "primary",
                onClick: S
              }, {
                default: o(() => e[7] || (e[7] = [
                  p("确 定")
                ])),
                _: 1
              }),
              t(a, {
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
              t(a, {
                type: "primary",
                onClick: j
              }, {
                default: o(() => e[9] || (e[9] = [
                  p("复制Json")
                ])),
                _: 1
              }),
              t(a, {
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
                    z(_("code", F, null, 512), [
                      [R, N(r(g))]
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
}, te = /* @__PURE__ */ A(X, [["__scopeId", "data-v-c2690f44"]]);
export {
  te as default
};
