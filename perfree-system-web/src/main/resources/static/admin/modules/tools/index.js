(function(){"use strict";try{if(typeof document<"u"){var l=document.createElement("style");l.appendChild(document.createTextNode(`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-keyword,.hljs-formula{color:#a626a4}.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string{color:#50a14f}.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number{color:#986801}.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-title.class_,.hljs-class .hljs-title{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
.page[data-v-ce65ead7]{height:100%}pre[data-v-ce65ead7],code[data-v-ce65ead7]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}`)),document.head.appendChild(l)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const n = /* @__PURE__ */ Object.assign({ "./view/CodegenEditConfig.vue": () => import("./CodegenEditConfig-view.js"), "./view/CodegenView.vue": () => import("./CodegenView-view.js"), "./view/GenSettingView.vue": () => import("./GenSettingView-view.js") }), u = (m) => ({
  router: (i, t) => {
    let o = [
      {
        path: "/admin/codegen/editConfig/:id",
        name: "editConfig",
        component: n["./view/CodegenEditConfig.vue"],
        meta: {
          moduleName: t,
          title: "修改代码生成配置",
          keepAlive: !1
        }
      }
    ];
    for (let e of i)
      e.url && e.component && o.push({
        name: e.componentName,
        path: e.url,
        component: n[`.${e.component}.vue`],
        meta: {
          moduleName: t,
          title: e.name,
          keepAlive: !0
        }
      });
    return o;
  }
});
export {
  u as default
};
