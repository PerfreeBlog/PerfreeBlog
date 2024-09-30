(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".panelBox[data-v-90528c19]{background:var(--el-bg-color);padding:15px;border-radius:5px;margin-bottom:15px;width:calc(100% - 30px)}.shortcuts-item[data-v-90528c19]{text-align:center;margin-top:15px}.shortcuts-item-name[data-v-90528c19]{font-size:14px;margin-top:5px}.loginBoxRight[data-v-90528c19]{padding-left:10px}.loginBoxRight .title[data-v-90528c19]{padding-top:5px;font-size:18px;font-weight:600;color:var(--el-text-color-primary)}.loginBoxRight .welcome[data-v-90528c19]{padding-top:5px}[data-v-90528c19] .my-label{background:var(--el-bg-color)!important}.panelTitle[data-v-90528c19]{font-size:14px;border-bottom:1px solid var(--el-border-color-light);padding-bottom:10px}.link-ul[data-v-90528c19]{list-style:none;padding:0;margin:0}.link-ul li[data-v-90528c19]{line-height:30px}.link-ul li .el-link[data-v-90528c19]{width:100%;justify-content:left}[data-v-90528c19] .el-link__inner{padding-left:5px}.latest-article[data-v-90528c19]{display:block;text-align:left;width:100%;line-height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.comment-detail-box[data-v-90528c19]{display:flex;flex-wrap:wrap;margin-top:15px;width:100%}.comment-detail-avatar-box img[data-v-90528c19]{border-radius:50%}.comment-detail-avatar-box span[data-v-90528c19]{display:inline-block;border-radius:50%;width:35px;height:35px;line-height:35px;background:var(--el-bg-color-page);text-align:center;font-weight:600;color:var(--el-text-color-regular)}.comment-detail-msg-box[data-v-90528c19]{width:calc(100% - 45px);padding-left:10px}.comment-detail-content[data-v-90528c19]{margin-top:5px;width:calc(100% - 24px);padding:8px 12px;border-radius:5px;margin-bottom:5px;word-break:break-all;line-height:24px;background:var(--el-bg-color-page);font-size:14px;opacity:.85}.comment-detail-name[data-v-90528c19]{font-weight:500;font-size:14px}.comment-detail-info[data-v-90528c19]{position:relative}.comment-detail-time[data-v-90528c19]{font-size:12px;color:var(--el-text-color-regular);margin-left:10px}@media screen and (max-width:700px){.weather-widget[data-v-90528c19]{display:none}}")),document.head.appendChild(t)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const m = /* @__PURE__ */ Object.assign({ "./view/Home.vue": () => import("./Home-view.js") }), u = (r) => ({
  router: (o, n) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: m[`.${e.component}.vue`],
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
  u as default
};
