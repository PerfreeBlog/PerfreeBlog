(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".page[data-v-a9478938]{height:100%;padding:0;background-color:var(--el-bg-color-page)}.elRow[data-v-a9478938],.elCol[data-v-a9478938]{height:100%;margin-bottom:10px}.dictTypeBox[data-v-a9478938]{background-color:var(--el-bg-color);height:100%;border-radius:5px}.dictDataBox[data-v-a9478938]{background-color:var(--el-bg-color);padding:15px;border-radius:5px;height:calc(100% - 30px)}.dictTypeHead[data-v-a9478938]{padding:15px 15px 0}.searchDictTypeInput[data-v-a9478938]{margin-top:15px}.dictTypeList[data-v-a9478938]::-webkit-scrollbar{width:0}.dictTypeList[data-v-a9478938]::-webkit-scrollbar{height:0}.dictTypeList[data-v-a9478938]{padding:15px;height:calc(100% - 130px);overflow:auto}.dictTypeList ul[data-v-a9478938]{margin:0;padding:0;list-style:none}.dictTypeList ul li[data-v-a9478938]{display:flex;line-height:40px;margin-bottom:8px;background:var(--el-fill-color-light);padding-left:10px;padding-right:10px;border-radius:5px;cursor:pointer;transition:all .3s;font-size:14px}.dictTypeList ul li .dictTypeName[data-v-a9478938]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dictTypeList ul li .dictTypeOpt[data-v-a9478938]{margin-left:auto;width:60px}.dictTypeList ul li.active[data-v-a9478938]{background:#646cff1a;color:var(--el-color-primary)}.dictTypeList ul li[data-v-a9478938]:hover{background:#646cff1a}")),document.head.appendChild(a)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const m = /* @__PURE__ */ Object.assign({ "./view/DictView.vue": () => import("./DictView-view.js") }), u = (r) => ({
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
