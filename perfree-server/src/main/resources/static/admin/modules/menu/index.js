(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".el-icon-picker[data-v-feaa3af9]{overflow:hidden}.icon-panel[data-v-feaa3af9]{height:256px;overflow-y:scroll;display:flex;justify-content:space-around;flex-wrap:wrap}.icon[data-v-feaa3af9]{display:inline-block;width:20px;height:20px;color:var(--el-text-color-regular);font-size:20px;border-radius:4px;cursor:pointer;text-align:center;line-height:45px;margin:5px}.icon[data-v-feaa3af9]:hover,.icon-active[data-v-feaa3af9]{color:var(--el-color-primary)}")),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const u = /* @__PURE__ */ Object.assign({ "./view/MenuView.vue": () => import("./MenuView-view.js") }), r = (m) => ({
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
