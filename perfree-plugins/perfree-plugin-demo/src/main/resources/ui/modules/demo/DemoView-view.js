function I(e, d) {
  if (arguments.length === 0 || !e)
    return null;
  const a = d || "{y}-{m}-{d} {h}:{i}:{s}";
  let l;
  typeof e == "object" ? l = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), l = new Date(e));
  const C = {
    y: l.getFullYear(),
    m: l.getMonth() + 1,
    d: l.getDate(),
    h: l.getHours(),
    i: l.getMinutes(),
    s: l.getSeconds(),
    a: l.getDay()
  };
  return a.replace(/{([ymdhisa])+}/g, (N, k) => {
    let i = C[k];
    return k === "a" ? ["日", "一", "二", "三", "四", "五", "六"][i] : (N.length > 0 && i < 10 && (i = "0" + i), i || 0);
  });
}
/*! Element Plus Icons Vue v2.3.1 */
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const O = window.Vue.defineComponent, Y = window.Vue.createElementVNode, G = window.Vue.openBlock, J = window.Vue.createElementBlock;
var K = /* @__PURE__ */ O({
  name: "Delete",
  __name: "delete",
  setup(e) {
    return (d, a) => (G(), J("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), Q = K;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const W = window.Vue.defineComponent, y = window.Vue.createElementVNode, X = window.Vue.openBlock, Z = window.Vue.createElementBlock;
var ee = /* @__PURE__ */ W({
  name: "Edit",
  __name: "edit",
  setup(e) {
    return (d, a) => (X(), Z("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      y("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      y("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), oe = ee;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const ne = window.Vue.defineComponent, we = window.Vue.createElementVNode, de = window.Vue.openBlock, te = window.Vue.createElementBlock;
var ie = /* @__PURE__ */ ne({
  name: "Plus",
  __name: "plus",
  setup(e) {
    return (d, a) => (de(), te("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      we("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), le = ie;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const Ve = window.Vue.defineComponent, ue = window.Vue.createElementVNode, ce = window.Vue.openBlock, me = window.Vue.createElementBlock;
var ae = /* @__PURE__ */ Ve({
  name: "Refresh",
  __name: "refresh",
  setup(e) {
    return (d, a) => (ce(), me("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      ue("path", {
        fill: "currentColor",
        d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
      })
    ]));
  }
}), b = ae;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
const re = window.Vue.defineComponent, pe = window.Vue.createElementVNode, ke = window.Vue.openBlock, Be = window.Vue.createElementBlock;
var Ee = /* @__PURE__ */ re({
  name: "Search",
  __name: "search",
  setup(e) {
    return (d, a) => (ke(), Be("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      pe("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), fe = Ee;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.defineComponent;
window.Vue.createElementVNode;
window.Vue.openBlock;
window.Vue.createElementBlock;
function Ce(e) {
  return axios.post("/api/auth/plugin-demo/demo/page", e);
}
function Ne(e) {
  return axios.post("/api/auth/plugin-demo/demo/add", e);
}
function se(e) {
  return axios.put("/api/auth/plugin-demo/demo/update", e);
}
function _e(e) {
  return axios.delete("/api/auth/plugin-demo/demo/del?id=" + e);
}
function ve(e) {
  return axios.get("/api/auth/plugin-demo/demo/get?id=" + e);
}
const m = window.Vue.resolveComponent, n = window.Vue.createVNode, w = window.Vue.withCtx, u = window.Vue.unref, E = window.Vue.createTextVNode, _ = window.Vue.createElementVNode, ge = window.Vue.toDisplayString, he = window.Vue.resolveDirective, z = window.Vue.openBlock, xe = window.Vue.createBlock, ye = window.Vue.withDirectives, D = window.Vue.isRef, be = window.Vue.createElementBlock, ze = { class: "page" }, De = { class: "search-box" }, Me = { class: "right-tool" }, Fe = { class: "table-box" }, He = { class: "dialog-footer" }, Ae = window.Vue.reactive, p = window.Vue.ref, f = window.ElementPlus.ElMessage, Re = window.ElementPlus.ElMessageBox, Se = {
  __name: "DemoView",
  setup(e) {
    const d = p({
      pageNo: 1,
      pageSize: 20,
      total: 0,
      name: ""
    }), a = p();
    let l = p([]), C = p(!1), V = p(!1), N = p("");
    const k = p(), i = p({
      id: "",
      name: "",
      msg: ""
    }), M = Ae({
      name: [
        { required: !0, message: "请输入名称", trigger: "blur" },
        { min: 2, max: 20, message: "名称必须在2-20字之间", trigger: "blur" }
      ]
    });
    function F() {
      s(), N.value = "添加", V.value = !0;
    }
    function s() {
      i.value = {
        id: "",
        name: "",
        msg: ""
      }, k.value && k.value.resetFields();
    }
    function B() {
      C.value = !0, Ce(d.value).then((c) => {
        l.value = c.data.list, d.value.total = c.data.total, C.value = !1;
      });
    }
    function H() {
      d.value = {
        name: ""
      }, a.value.resetFields();
    }
    function A(c) {
      s(), N.value = "修改", V.value = !0, ve(c.id).then((o) => {
        i.value = o.data;
      });
    }
    function R() {
      k.value.validate((c) => {
        c && (i.value.id ? se(i.value).then((o) => {
          o.code === 200 ? (f.success("更新成功"), V.value = !1, s(), B()) : f.error(o.msg);
        }) : Ne(i.value).then((o) => {
          o.code === 200 ? (f.success("添加成功"), V.value = !1, s(), B()) : f.error(o.msg);
        }));
      });
    }
    function S(c) {
      Re.confirm("确定要删除[" + c.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _e(c.id).then((o) => {
          o.code === 200 && o.data ? (f.success("删除成功"), B()) : f.error(o.msg);
        });
      }).catch(() => {
      });
    }
    return B(), (c, o) => {
      const h = m("el-input"), v = m("el-form-item"), r = m("el-button"), x = m("el-form"), T = m("el-col"), U = m("el-row"), g = m("el-table-column"), L = m("el-table"), P = m("el-pagination"), j = m("el-dialog"), $ = he("loading");
      return z(), be("div", ze, [
        _("div", De, [
          n(x, {
            inline: !0,
            model: d.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: a
          }, {
            default: w(() => [
              n(v, { label: "名称" }, {
                default: w(() => [
                  n(h, {
                    modelValue: d.value.name,
                    "onUpdate:modelValue": o[0] || (o[0] = (t) => d.value.name = t),
                    placeholder: "请输入名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(v, null, {
                default: w(() => [
                  n(r, {
                    type: "primary",
                    onClick: B,
                    icon: u(fe)
                  }, {
                    default: w(() => [
                      E("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  n(r, {
                    icon: u(b),
                    onClick: H
                  }, {
                    default: w(() => [
                      E("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        n(U, {
          gutter: 10,
          class: "mb8"
        }, {
          default: w(() => [
            n(T, { span: 1.5 }, {
              default: w(() => [
                n(r, {
                  icon: u(le),
                  type: "primary",
                  plain: "",
                  onClick: F
                }, {
                  default: w(() => [
                    E("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            _("div", Me, [
              n(r, {
                icon: u(b),
                circle: "",
                onClick: B
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        _("div", Fe, [
          ye((z(), xe(L, {
            data: u(l),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: w(() => [
              n(g, {
                prop: "name",
                label: "名称",
                "min-width": "150"
              }),
              n(g, {
                prop: "msg",
                label: "信息",
                "min-width": "150"
              }),
              n(g, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: w((t) => [
                  _("span", null, ge(u(I)(t.row.createTime)), 1)
                ]),
                _: 1
              }),
              n(g, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: w((t) => [
                  n(r, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(oe),
                    onClick: (q) => A(t.row)
                  }, {
                    default: w(() => [
                      E("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  n(r, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Q),
                    onClick: (q) => S(t.row)
                  }, {
                    default: w(() => [
                      E("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [$, u(C)]
          ]),
          n(P, {
            "current-page": d.value.pageNo,
            "onUpdate:currentPage": o[1] || (o[1] = (t) => d.value.pageNo = t),
            "page-size": d.value.pageSize,
            "onUpdate:pageSize": o[2] || (o[2] = (t) => d.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: B,
            total: d.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(j, {
          modelValue: u(V),
          "onUpdate:modelValue": o[6] || (o[6] = (t) => D(V) ? V.value = t : V = t),
          title: u(N),
          width: "600px",
          draggable: ""
        }, {
          footer: w(() => [
            _("span", He, [
              n(r, {
                type: "primary",
                onClick: R
              }, {
                default: w(() => [
                  E("确 定")
                ]),
                _: 1
              }),
              n(r, {
                onClick: o[5] || (o[5] = (t) => {
                  D(V) ? V.value = !1 : V = !1, s();
                })
              }, {
                default: w(() => [
                  E("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: w(() => [
            n(x, {
              ref_key: "addFormRef",
              ref: k,
              model: i.value,
              "label-width": "60px",
              "status-icon": "",
              rules: M
            }, {
              default: w(() => [
                n(v, {
                  label: "名称",
                  prop: "name"
                }, {
                  default: w(() => [
                    n(h, {
                      modelValue: i.value.name,
                      "onUpdate:modelValue": o[3] || (o[3] = (t) => i.value.name = t),
                      placeholder: "请输入名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n(v, {
                  label: "信息",
                  prop: "msg"
                }, {
                  default: w(() => [
                    n(h, {
                      modelValue: i.value.msg,
                      "onUpdate:modelValue": o[4] || (o[4] = (t) => i.value.msg = t),
                      placeholder: "请输入信息"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  Se as default
};
