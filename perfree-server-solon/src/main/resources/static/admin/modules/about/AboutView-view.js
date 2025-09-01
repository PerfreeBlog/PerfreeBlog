function z() {
  return axios.get("/api/auth/adminHome/getServerInfo");
}
const P = (p, a) => {
  const r = p.__vccOpts || p;
  for (const [m, w] of a)
    r[m] = w;
  return r;
}, d = window.Vue.resolveComponent, t = window.Vue.createVNode, s = window.Vue.createTextVNode, i = window.Vue.createElementVNode, l = window.Vue.unref, g = window.Vue.toDisplayString, o = window.Vue.withCtx, D = window.Vue.renderList, I = window.Vue.Fragment, u = window.Vue.openBlock, V = window.Vue.createElementBlock, y = window.Vue.createBlock, N = window.Vue.resolveDirective, Q = window.Vue.withDirectives, C = { class: "page" }, E = { class: "img-panel" }, S = { class: "img-box" }, A = { class: "img-box" }, L = { class: "img-box" }, F = { class: "img-panel" }, T = { class: "img-box" }, H = { class: "img-box" }, x = window.Vue.ref, J = {
  __name: "AboutView",
  setup(p) {
    let a = x({}), r = x({}), m = x(!0);
    function w() {
      z().then((_) => {
        m.value = !1, console.log(_), a.value = _.data.sysInfo, r.value = _.data.jvmInfo;
      });
    }
    return w(), (_, e) => {
      const f = d("font-awesome-icon"), v = d("el-divider"), n = d("el-descriptions-item"), b = d("el-tag"), h = d("el-link"), B = d("el-descriptions"), c = d("el-image"), j = N("loading");
      return u(), V("div", C, [
        i("h2", null, [
          t(f, { icon: "fa-solid fa-gauge-high" }),
          e[0] || (e[0] = s(" 系统信息"))
        ]),
        t(v),
        Q((u(), y(B, {
          border: "",
          column: 1
        }, {
          default: o(() => [
            t(n, { label: "系统版本" }, {
              default: o(() => [
                s(g(l(a).version), 1)
              ]),
              _: 1
            }),
            t(n, { label: "JDK信息" }, {
              default: o(() => [
                s(g(l(r).home + " | " + l(r).name + " | " + l(r).version), 1)
              ]),
              _: 1
            }),
            t(n, { label: "操作系统" }, {
              default: o(() => [
                s(g(l(a).osName), 1)
              ]),
              _: 1
            }),
            t(n, { label: "已启用主题" }, {
              default: o(() => [
                t(b, { size: "small" }, {
                  default: o(() => [
                    s(g(l(a).theme), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            t(n, { label: "已启用插件" }, {
              default: o(() => [
                (u(!0), V(I, null, D(l(a).pluginList, (k) => (u(), y(b, {
                  size: "small",
                  class: "plugin"
                }, {
                  default: o(() => [
                    s(g(k), 1)
                  ]),
                  _: 2
                }, 1024))), 256))
              ]),
              _: 1
            }),
            t(n, { label: "官网地址" }, {
              default: o(() => [
                t(h, {
                  href: "https://www.perfree.org.cn",
                  target: "_blank"
                }, {
                  default: o(() => e[1] || (e[1] = [
                    s("https://www.perfree.org.cn")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }),
            t(n, { label: "源码地址(github)" }, {
              default: o(() => [
                t(h, {
                  href: "https://github.com/PerfreeBlog/PerfreeBlog",
                  target: "_blank"
                }, {
                  default: o(() => e[2] || (e[2] = [
                    s("https://github.com/PerfreeBlog/PerfreeBlog")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            }),
            t(n, { label: "源码地址(gitee)" }, {
              default: o(() => [
                t(h, {
                  href: "https://gitee.com/PerfreeBlog/PerfreeBlog",
                  target: "_blank"
                }, {
                  default: o(() => e[3] || (e[3] = [
                    s("https://gitee.com/PerfreeBlog/PerfreeBlog")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })), [
          [j, l(m)]
        ]),
        i("h2", null, [
          t(f, { icon: "fa-solid fa-comments" }),
          e[4] || (e[4] = s(" 系统交流"))
        ]),
        t(v),
        i("div", E, [
          i("div", S, [
            t(c, {
              src: "/static/images/wechat_public.jpg",
              style: { width: "100%", height: "200px" },
              "zoom-rate": 1.2,
              loading: "lazy",
              "max-scale": 7,
              "min-scale": 0.2,
              "preview-src-list": ["/static/images/wechat_public.jpg"],
              "initial-index": 4,
              fit: "cover"
            }),
            e[5] || (e[5] = i("div", { class: "img-name" }, "公众号", -1))
          ]),
          i("div", A, [
            t(c, {
              src: "/static/images/QQ.jpg",
              style: { width: "100%", height: "200px" },
              "zoom-rate": 1.2,
              loading: "lazy",
              "max-scale": 7,
              "min-scale": 0.2,
              "preview-src-list": ["/static/images/QQ.jpg"],
              "initial-index": 4,
              fit: "cover"
            }),
            e[6] || (e[6] = i("div", { class: "img-name" }, "QQ交流群", -1))
          ]),
          i("div", L, [
            t(c, {
              src: "/static/images/wechat.jpg",
              style: { width: "100%", height: "200px" },
              "zoom-rate": 1.2,
              loading: "lazy",
              "max-scale": 7,
              "min-scale": 0.2,
              "preview-src-list": ["/static/images/wechat.jpg"],
              "initial-index": 4,
              fit: "cover"
            }),
            e[7] || (e[7] = i("div", { class: "img-name" }, [
              i("div", null, "微信交流群"),
              i("div", null, "注：添加时备注PerfreeBlog")
            ], -1))
          ])
        ]),
        i("h2", null, [
          t(f, { icon: "fa-solid fa-thumbs-up" }),
          e[8] || (e[8] = s(" 捐赠支持"))
        ]),
        t(v),
        e[11] || (e[11] = i("div", { style: { "margin-bottom": "10px" } }, "开源不易,来包辣条支持下~", -1)),
        i("div", F, [
          i("div", T, [
            t(c, {
              src: "/static/images/wechat_donate.jpg",
              style: { width: "100%", height: "200px" },
              "zoom-rate": 1.2,
              loading: "lazy",
              "max-scale": 7,
              "min-scale": 0.2,
              "preview-src-list": ["/static/images/wechat_donate.jpg"],
              "initial-index": 4,
              fit: "cover"
            }),
            e[9] || (e[9] = i("div", { class: "img-name" }, "微信捐赠", -1))
          ]),
          i("div", H, [
            t(c, {
              src: "/static/images/ali_donate.jpg",
              style: { width: "100%", height: "200px" },
              "zoom-rate": 1.2,
              loading: "lazy",
              "max-scale": 7,
              "min-scale": 0.2,
              "preview-src-list": ["/static/images/ali_donate.jpg"],
              "initial-index": 4,
              fit: "cover"
            }),
            e[10] || (e[10] = i("div", { class: "img-name" }, "支付宝捐赠", -1))
          ])
        ])
      ]);
    };
  }
}, K = /* @__PURE__ */ P(J, [["__scopeId", "data-v-d6881e5e"]]);
export {
  K as default
};
