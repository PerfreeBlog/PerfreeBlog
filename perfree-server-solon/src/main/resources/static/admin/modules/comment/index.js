(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".comment-editor[data-v-fa3fa865]{border:1px solid var(--el-border-color);width:100%;height:120px;color:var(--el-text-color-primary);padding:6px 12px;-webkit-transition:all .25s ease-in-out 0s;transition:all .25s ease-in-out 0s;outline:none;resize:vertical;border-radius:3px;box-sizing:border-box;overflow-y:auto;font-size:13px;font-family:var(--el-font-family)}.dialog-footer[data-v-fa3fa865]{display:flex;justify-content:flex-end}.emoji-picker[data-v-fa3fa865]{position:absolute;top:33px;border-radius:3px;right:0;z-index:99999}@media screen and (max-width:700px){.emoji-picker[data-v-fa3fa865]{position:absolute;top:33px;border-radius:3px;right:-100px;z-index:99999}}.dialog-footer[data-v-42ed477c]{display:flex;justify-content:flex-end}.comment-detail-box[data-v-42ed477c]{display:flex;flex-wrap:wrap;margin-top:15px;width:100%}.comment-detail-avatar-box img[data-v-42ed477c]{border-radius:50%}.comment-detail-avatar-box span[data-v-42ed477c]{display:inline-block;border-radius:50%;width:35px;height:35px;line-height:35px;background:var(--el-bg-color-page);text-align:center;font-weight:600;color:var(--el-text-color-regular)}.comment-detail-msg-box[data-v-42ed477c]{width:calc(100% - 45px);padding-left:10px}.comment-detail-content[data-v-42ed477c]{margin-top:5px;width:calc(100% - 24px);padding:8px 12px;border-radius:5px;margin-bottom:5px;word-break:break-all;line-height:24px;background:var(--el-bg-color-page);font-size:14px;opacity:.85}.comment-detail-name[data-v-42ed477c]{font-weight:500;font-size:14px}.comment-detail-info[data-v-42ed477c]{position:relative}.comment-detail-time[data-v-42ed477c]{font-size:12px;color:var(--el-text-color-regular);margin-left:10px}")),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const m = /* @__PURE__ */ Object.assign({ "./view/CommentView.vue": () => import("./CommentView-view.js") }), u = (r) => ({
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
