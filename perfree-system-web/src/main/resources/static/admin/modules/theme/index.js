(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".header[data-v-938a32f8]{font-size:17px;text-align:center;font-weight:700;line-height:50px}.box-card[data-v-938a32f8]{width:100%;margin-bottom:15px;color:var(--el-text-color-regular)}.theme-btn-box[data-v-938a32f8]{display:flex;height:40px;line-height:40px;padding-top:5px;padding-bottom:5px}.theme-box-body[data-v-938a32f8]{position:relative;overflow:hidden}.theme-desc[data-v-938a32f8]{position:absolute;bottom:-100%;background:var(--el-overlay-color);width:100%;padding:5px;background:linear-gradient(#00000054,#414141a8);transition:all .3s}.theme-box-body:hover .theme-desc[data-v-938a32f8]{bottom:0}.theme-desc-text[data-v-938a32f8]{width:100%;color:var(--el-fill-color-light)}.theme-btn-item[data-v-938a32f8]{flex:1;text-align:center;border-right:1px solid #e8e8e8}.theme-btn-box>.theme-btn-item[data-v-938a32f8]:last-child{border:none}.theme-btn-icon[data-v-938a32f8]{margin-right:5px}.theme-active[data-v-938a32f8]{color:var(--el-color-primary)}.theme-desc-link[data-v-938a32f8]{color:var(--el-fill-color-light)}.upload-theme[data-v-938a32f8]{display:flex}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const n = /* @__PURE__ */ Object.assign({ "./view/ThemeSettingView.vue": () => import("./ThemeSettingView-view.js"), "./view/ThemeView.vue": () => import("./ThemeView-view.js") }), u = (r) => ({
  router: (o, m) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: n[`.${e.component}.vue`],
        meta: {
          moduleName: m,
          title: e.name,
          keepAlive: !0
        }
      });
    return t;
  }
});
export {
  u as default
};
