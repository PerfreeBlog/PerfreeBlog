(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.file-list-icon[data-v-3f1727be]{margin-right:5px}.file-list-icon.folder[data-v-3f1727be],.file-list-icon.js[data-v-3f1727be]{color:#ebd109}.file-list-icon.css[data-v-3f1727be]{color:#eb6909}.file-list-icon.html[data-v-3f1727be],.file-list-icon.txt[data-v-3f1727be]{color:#09eb46}[data-v-3f1727be] .ͼ1.cm-focused{outline:none!important}[data-v-3f1727be] .ͼ1 .cm-scroller{font-family:Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,serif;font-size:14px}[data-v-3f1727be] .el-tree-node.is-checked{background-color:var(--el-fill-color-darker)!important}.theme-editor-title[data-v-3f1727be]{font-size:17px;margin:0;color:var(--el-text-color-regular)}.el-divider--horizontal[data-v-3f1727be]{margin:15px 0}.theme-header-box[data-v-3f1727be]{display:flex}
.header[data-v-b5a33458]{font-size:17px;text-align:center;font-weight:700;line-height:50px}.box-card[data-v-b5a33458]{width:100%;margin-bottom:15px;color:var(--el-text-color-regular)}.theme-btn-box[data-v-b5a33458]{display:flex;height:40px;line-height:40px;padding-top:5px;padding-bottom:5px}.theme-box-body[data-v-b5a33458]{position:relative;overflow:hidden}.theme-desc[data-v-b5a33458]{position:absolute;bottom:-100%;background:var(--el-overlay-color);width:100%;padding:5px;background:linear-gradient(#00000054,#414141a8);transition:all .3s}.theme-box-body:hover .theme-desc[data-v-b5a33458]{bottom:0}.theme-desc-text[data-v-b5a33458]{width:100%;color:var(--el-fill-color-light)}.theme-btn-item[data-v-b5a33458]{flex:1;text-align:center;border-right:1px solid #e8e8e8}.theme-btn-box>.theme-btn-item[data-v-b5a33458]:last-child{border:none}.theme-btn-icon[data-v-b5a33458]{margin-right:5px}.theme-active[data-v-b5a33458]{color:var(--el-color-primary)}.theme-desc-link[data-v-b5a33458]{color:var(--el-fill-color-light)}.upload-theme[data-v-b5a33458]{display:flex}`)),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const i = /* @__PURE__ */ Object.assign({ "./view/ThemeEditView.vue": () => import("./ThemeEditView-view.js"), "./view/ThemeSettingView.vue": () => import("./ThemeSettingView-view.js"), "./view/ThemeView.vue": () => import("./ThemeView-view.js") }), u = (n) => ({
  router: (o, t) => {
    let m = [
      {
        path: "/admin/theme/edit/:themePath",
        name: "themeEdit",
        component: i["./view/ThemeEditView.vue"],
        meta: {
          moduleName: t,
          title: "编辑主题",
          keepAlive: !1
        }
      }
    ];
    for (let e of o)
      e.url && e.component && m.push({
        name: e.componentName,
        path: e.url,
        component: i[`.${e.component}.vue`],
        meta: {
          moduleName: t,
          title: e.name,
          keepAlive: !0
        }
      });
    return m;
  }
});
export {
  u as default
};
