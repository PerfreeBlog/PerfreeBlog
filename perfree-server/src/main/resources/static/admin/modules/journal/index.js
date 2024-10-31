(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".table-box[data-v-3b66d397]{margin-top:20px}.attach-list-box[data-v-3b66d397]{display:flex;flex-wrap:wrap;gap:10px}.attach-block[data-v-3b66d397]{position:relative;height:130px;width:125px;cursor:pointer;background-color:var(--el-color-info-light-9);overflow:hidden;border-radius:5px;border:2px solid var(--el-bg-color)}.attach-block.selected[data-v-3b66d397]{border:2px solid var(--el-color-primary)}.operate-mask[data-v-3b66d397]{position:absolute;top:0;left:0;width:100%;height:30px;background-image:linear-gradient(to bottom,var(--el-overlay-color-lighter),rgb(255 255 255 / 0%));border:none}.attach-preview[data-v-3b66d397]{width:100%;height:calc(100% - 30px)}.attach-img[data-v-3b66d397]{width:100%;height:100%}.image-slot[data-v-3b66d397]{display:flex;justify-content:center;align-items:center}.attach-other[data-v-3b66d397]{height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.attach-name[data-v-3b66d397]{height:30px;overflow:hidden;text-align:center;line-height:30px}.operate-btn-box[data-v-3b66d397]{position:absolute;right:4px;top:3px}.operate-btn[data-v-3b66d397]{font-weight:700;font-size:18px;color:#fff;margin-left:3px}.selected .select-btn[data-v-3b66d397]{color:var(--el-color-primary)}.bottom-box[data-v-d93d4acb]{display:flex;justify-content:flex-end}.comment-editor[data-v-d93d4acb]{border:none;width:100%;height:120px;color:var(--el-text-color-primary);padding:6px 12px;-webkit-transition:all .25s ease-in-out 0s;transition:all .25s ease-in-out 0s;outline:none;resize:none;border-radius:3px;box-sizing:border-box;overflow-y:auto;font-size:13px;font-family:var(--el-font-family)}.emoji-picker[data-v-d93d4acb]{position:absolute;top:33px;border-radius:3px;right:0;z-index:99999}.attach-list-box[data-v-d93d4acb]{display:flex;flex-wrap:wrap}.attach-box[data-v-d93d4acb]{width:130px;height:140px;border-radius:5px;overflow:hidden;border:1px solid var(--el-border-color);margin:5px;position:relative;display:flex;flex-direction:column}.content-box[data-v-d93d4acb]{width:100%;border:1px solid var(--el-border-color);border-radius:5px}.attach-close-btn[data-v-d93d4acb]{display:inline-block;position:absolute;top:0;right:4px;z-index:9;font-size:18px;color:var(--el-text-color-regular);cursor:pointer}audio[data-v-d93d4acb]::-webkit-media-controls-enclosure{background-color:unset}audio[data-v-d93d4acb]{background:var(--el-bg-color-page)}.attach-img[data-v-d93d4acb],.attach-audio[data-v-d93d4acb],.attach-video[data-v-d93d4acb]{width:100%;height:110px}.attach-other[data-v-d93d4acb]{width:100%;height:110px;line-height:110px;text-align:center;font-size:28px}@media screen and (max-width:700px){.emoji-picker[data-v-d93d4acb]{position:absolute;top:33px;border-radius:3px;right:-200px;z-index:99999}}.tableColor[data-v-457f6d3f]{width:20px;height:20px}[data-v-457f6d3f] .el-switch.is-disabled{opacity:1}[data-v-457f6d3f] .el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label[data-v-457f6d3f]{cursor:pointer!important}")),document.head.appendChild(t)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const r = /* @__PURE__ */ Object.assign({ "./view/JournalView.vue": () => import("./JournalView-view.js") }), m = (u) => ({
  router: (o, n) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: r[`.${e.component}.vue`],
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
  m as default
};
