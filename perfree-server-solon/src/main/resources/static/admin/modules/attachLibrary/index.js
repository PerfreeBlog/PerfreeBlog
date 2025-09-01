(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.attach-items-list[data-v-e521b90e]{column-count:5;column-gap:15px;break-inside:avoid}.attach-item[data-v-e521b90e]{border-radius:5px;overflow:hidden;margin-bottom:15px;box-shadow:0 1px 8px #0000001a}.attach-item-name[data-v-e521b90e]{font-size:15px;padding-left:5px;padding-right:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:30px}
.attach-items-list[data-v-1bae4937]{column-count:5;column-gap:15px;break-inside:avoid}.attach-item[data-v-1bae4937]{border-radius:5px;overflow:hidden;margin-bottom:15px;box-shadow:0 1px 8px #0000001a}.attach-item-name[data-v-1bae4937]{font-size:15px;padding-left:5px;padding-right:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:30px}
.attach-items-list[data-v-04984df2]{column-count:5;column-gap:15px;break-inside:avoid}.attach-item[data-v-04984df2]{border-radius:5px;overflow:hidden;margin-bottom:15px;box-shadow:0 1px 8px #0000001a}.attach-item-name[data-v-04984df2]{font-size:15px;padding-left:5px;padding-right:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:30px}
.attach-items-list[data-v-f0e4150c]{column-count:5;column-gap:15px;break-inside:avoid}.attach-item[data-v-f0e4150c]{border-radius:5px;overflow:hidden;margin-bottom:15px;box-shadow:0 1px 8px #0000001a}.attach-item-name[data-v-f0e4150c]{font-size:15px;padding-left:5px;padding-right:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:30px}
.table-box[data-v-3b66d397]{margin-top:20px}.attach-list-box[data-v-3b66d397]{display:flex;flex-wrap:wrap;gap:10px}.attach-block[data-v-3b66d397]{position:relative;height:130px;width:125px;cursor:pointer;background-color:var(--el-color-info-light-9);overflow:hidden;border-radius:5px;border:2px solid var(--el-bg-color)}.attach-block.selected[data-v-3b66d397]{border:2px solid var(--el-color-primary)}.operate-mask[data-v-3b66d397]{position:absolute;top:0;left:0;width:100%;height:30px;background-image:linear-gradient(to bottom,var(--el-overlay-color-lighter),rgb(255 255 255 / 0%));border:none}.attach-preview[data-v-3b66d397]{width:100%;height:calc(100% - 30px)}.attach-img[data-v-3b66d397]{width:100%;height:100%}.image-slot[data-v-3b66d397]{display:flex;justify-content:center;align-items:center}.attach-other[data-v-3b66d397]{height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.attach-name[data-v-3b66d397]{height:30px;overflow:hidden;text-align:center;line-height:30px}.operate-btn-box[data-v-3b66d397]{position:absolute;right:4px;top:3px}.operate-btn[data-v-3b66d397]{font-weight:700;font-size:18px;color:#fff;margin-left:3px}.selected .select-btn[data-v-3b66d397]{color:var(--el-color-primary)}[data-v-52e51a92] .el-dialog.is-draggable .el-dialog__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:none;position:initial;right:0;top:0;z-index:1}`)),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const i = /* @__PURE__ */ Object.assign({ "./view/AttachLibraryItemsAudio.vue": () => import("./AttachLibraryItemsAudio-view.js"), "./view/AttachLibraryItemsImg.vue": () => import("./AttachLibraryItemsImg-view.js"), "./view/AttachLibraryItemsOther.vue": () => import("./AttachLibraryItemsOther-view.js"), "./view/AttachLibraryItemsVideo.vue": () => import("./AttachLibraryItemsVideo-view.js"), "./view/AttachLibraryView.vue": () => import("./AttachLibraryView-view.js") }), a = (m) => ({
  router: (r, o) => {
    let t = [];
    for (let e of r)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: i[`.${e.component}.vue`],
        meta: {
          moduleName: o,
          title: e.name,
          keepAlive: !0
        }
      });
    return t;
  }
});
export {
  a as default
};
