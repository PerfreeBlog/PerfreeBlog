(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".table-box[data-v-65c2206e]{margin-top:20px}.attach-block[data-v-65c2206e]{position:relative;height:150px;width:100%;cursor:pointer;background-color:var(--el-color-info-light-9);margin-bottom:15px;overflow:hidden;border-radius:5px;border:2px solid var(--el-bg-color)}.attach-block.selected[data-v-65c2206e]{border:2px solid var(--el-color-primary)}.operate-mask[data-v-65c2206e]{position:absolute;top:0;left:0;width:100%;height:50px;background-image:linear-gradient(to bottom,var(--el-overlay-color-light),rgb(255 255 255 / 0%));border:none}.attach-preview[data-v-65c2206e]{width:100%;height:calc(100% - 30px)}.attach-img[data-v-65c2206e]{width:100%;height:100%}.image-slot[data-v-65c2206e]{display:flex;justify-content:center;align-items:center}.attach-other[data-v-65c2206e]{height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.attach-name[data-v-65c2206e]{height:30px;overflow:hidden;text-align:center;line-height:30px}.operate-btn-box[data-v-65c2206e]{position:absolute;right:12px;top:3px}.operate-btn[data-v-65c2206e]{font-weight:700;font-size:22px;color:#fff;margin-left:5px}.selected .select-btn[data-v-65c2206e]{color:var(--el-color-primary)}[data-v-c65d9d19] .el-dialog.is-draggable .el-dialog__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:none;position:initial;right:0;top:0;z-index:1}.tableColor[data-v-8518ef75]{width:20px;height:20px}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const m = /* @__PURE__ */ Object.assign({ "./view/TagView.vue": () => import("./TagView-view.js") }), u = (r) => ({
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
