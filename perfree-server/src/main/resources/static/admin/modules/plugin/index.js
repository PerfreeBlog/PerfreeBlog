const i = /* @__PURE__ */ Object.assign({ "./view/PluginSettingView.vue": () => import("./PluginSettingView-view.js"), "./view/PluginView.vue": () => import("./PluginView-view.js") }), m = (u) => ({
  router: (o, t) => {
    let n = [
      {
        path: "/admin/plugin/setting/:id",
        name: "pluginSetting",
        component: i["./view/PluginSettingView.vue"],
        meta: {
          moduleName: t,
          title: "插件设置",
          keepAlive: !1
        }
      }
    ];
    for (let e of o)
      e.url && e.component && n.push({
        name: e.componentName,
        path: e.url,
        component: i[`.${e.component}.vue`],
        meta: {
          moduleName: t,
          title: e.name,
          keepAlive: !0
        }
      });
    return n;
  }
});
export {
  m as default
};
