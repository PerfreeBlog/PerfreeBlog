(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("h2[data-v-d6881e5e]{font-size:17px;font-weight:600;margin:10px 0 0;color:var(--el-text-color-primary)}.el-divider[data-v-d6881e5e]{margin:10px 0}.img-panel[data-v-d6881e5e]{display:flex}.img-box[data-v-d6881e5e]{display:inline-block;width:200px;margin-left:15px;border-radius:5px;overflow:hidden;box-shadow:var(--el-box-shadow-lighter);border:1px solid var(--el-border-color-extra-light)}.img-name[data-v-d6881e5e]{text-align:center;display:flex;align-content:center;justify-content:center;flex-direction:column;height:46px;font-size:13px;border-top:1px solid var(--el-border-color-extra-light)}.plugin[data-v-d6881e5e]{margin-right:8px}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const u = /* @__PURE__ */ Object.assign({ "./view/AboutView.vue": () => import("./AboutView-view.js") }), r = (m) => ({
  router: (o, n) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: u[`.${e.component}.vue`],
        meta: {
          moduleName: n,
          title: e.name,
          keepAlive: !0
        }
      });
    return t;
  }
});
export {
  r as default
};
