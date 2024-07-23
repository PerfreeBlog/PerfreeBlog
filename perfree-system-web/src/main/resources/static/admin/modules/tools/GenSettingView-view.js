import { a as M, l as B } from "./lib/@element-plus.js";
import { H as C, j as D } from "./lib/highlight.js.js";
import { u as U } from "./lib/@form-create.js";
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
  rule({ t: f }) {
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
  props(f, { t: g }) {
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
}, T = (f, g) => {
  const v = f.__vccOpts || f;
  for (const [a, l] of g)
    v[a] = l;
  return v;
}, r = window.Vue.unref, e = window.Vue.createVNode, d = window.Vue.resolveComponent, t = window.Vue.withCtx, c = window.Vue.createTextVNode, m = window.Vue.isRef, w = window.Vue.createElementVNode, q = window.Vue.resolveDirective, z = window.Vue.withDirectives, G = window.Vue.openBlock, H = window.Vue.createElementBlock;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const L = { class: "page" }, P = { class: "dialog-footer" }, F = { class: "hljs" }, K = { class: "dialog-footer" }, Q = window.VueUse.useClipboard, V = window.ElementPlus.ElMessage, W = window.Vue.onMounted, p = window.Vue.ref, X = {
  __name: "GenSettingView",
  setup(f) {
    const { copy: g, isSupported: v } = Q({ legacy: !0 }), a = p();
    let l = p(!1), s = p(!1), h = p(""), _ = p("");
    const J = p({
      //控制字段ID输入框能否输入
      fieldReadonly: !1,
      //隐藏所有子表单组件
      hiddenMenu: ["subform"]
      //隐藏输入框和密码输入框
      //hiddenItem: ['input','pasasword'],
    });
    function k() {
      l.value = !0, h.value = {
        option: a.value.getOption(),
        rule: a.value.getRule()
      };
    }
    function S() {
      s.value = !0;
    }
    function x() {
      const i = JSON.parse(_.value);
      a.value.setOption(i.option), a.value.setRule(i.rule), V.success("导入成功"), s.value = !1;
    }
    W(async () => {
      a.value.addComponent(A), C.registerLanguage("json", D);
    });
    const I = (i) => (i = JSON.stringify(i, null, 2), C.highlight("json", i, !0).value || "&nbsp;"), N = async () => {
      try {
        if (!v.value) {
          V.error("复制失败,可能浏览器不支持,请手动复制");
          return;
        }
        await g(JSON.stringify(h.value, null, 2) || ""), V.success("复制成功");
      } catch {
        V.error("复制失败,可能浏览器不支持,请手动复制");
      }
    };
    return (i, o) => {
      const y = d("el-icon"), u = d("el-button"), j = d("fc-designer"), O = d("el-input"), b = d("el-dialog"), E = d("el-scrollbar"), R = q("dompurify-html");
      return G(), H("div", L, [
        e(j, {
          ref_key: "designer",
          ref: a,
          height: "100%",
          config: J.value
        }, {
          handle: t(() => [
            e(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: S
            }, {
              default: t(() => [
                e(y, null, {
                  default: t(() => [
                    e(r(M))
                  ]),
                  _: 1
                }),
                c(" 导入 Json")
              ]),
              _: 1
            }),
            e(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: k
            }, {
              default: t(() => [
                e(y, null, {
                  default: t(() => [
                    e(r(B))
                  ]),
                  _: 1
                }),
                c(" 生成 Json")
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["config"]),
        e(b, {
          modelValue: r(s),
          "onUpdate:modelValue": o[2] || (o[2] = (n) => m(s) ? s.value = n : s = n),
          title: "导入Json",
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            w("span", P, [
              e(u, {
                type: "primary",
                onClick: x
              }, {
                default: t(() => [
                  c("确 定")
                ]),
                _: 1
              }),
              e(u, {
                onClick: o[1] || (o[1] = (n) => m(s) ? s.value = !1 : s = !1)
              }, {
                default: t(() => [
                  c("关 闭")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(O, {
              modelValue: r(_),
              "onUpdate:modelValue": o[0] || (o[0] = (n) => m(_) ? _.value = n : _ = n),
              style: { width: "100%" },
              rows: 10,
              type: "textarea",
              placeholder: "请输入或复制json内容"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        e(b, {
          modelValue: r(l),
          "onUpdate:modelValue": o[4] || (o[4] = (n) => m(l) ? l.value = n : l = n),
          title: "生成Json",
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            w("span", K, [
              e(u, {
                type: "primary",
                onClick: N
              }, {
                default: t(() => [
                  c("复制Json")
                ]),
                _: 1
              }),
              e(u, {
                onClick: o[3] || (o[3] = (n) => m(l) ? l.value = !1 : l = !1)
              }, {
                default: t(() => [
                  c("关 闭")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(E, { height: "580" }, {
              default: t(() => [
                w("div", null, [
                  w("pre", null, [
                    z(w("code", F, null, 512), [
                      [R, I(r(h))]
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
}, ee = /* @__PURE__ */ T(X, [["__scopeId", "data-v-ce65ead7"]]);
export {
  ee as default
};
