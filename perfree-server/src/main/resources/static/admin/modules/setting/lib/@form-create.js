/*!
 * @form-create/element-ui v3.2.10
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
const ae = window.Vue.defineComponent, K = window.Vue.toRef, ft = window.Vue.ref, J = window.Vue.watch, w = window.Vue.createVNode, A = window.Vue.resolveComponent, re = window.Vue.mergeProps, Ve = window.Vue.openBlock, Se = window.Vue.createElementBlock, ve = window.Vue.createElementVNode, Nt = window.Vue.isVNode, Q = window.Vue.nextTick, Vn = window.Vue.createTextVNode, _e = window.Vue.markRaw, ce = window.Vue.reactive, tt = window.Vue.getCurrentInstance, Sn = window.Vue.provide, On = window.Vue.inject, yt = window.Vue.toRefs, Fn = window.Vue.onBeforeMount, En = window.Vue.watchEffect, Rn = window.Vue.onMounted, Dn = window.Vue.onBeforeUnmount, An = window.Vue.onUpdated, Lt = window.Vue.computed, Pn = window.Vue.withDirectives, jn = window.Vue.resolveDirective, In = window.Vue.createApp, Bn = window.Vue.h;
function bt(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), e.push.apply(e, r);
  }
  return e;
}
function _(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bt(Object(e), !0).forEach(function(r) {
      H(n, r, e[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : bt(Object(e)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
    });
  }
  return n;
}
function L(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? L = function(t) {
    return typeof t;
  } : L = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, L(n);
}
function xn(n, t) {
  if (!(n instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function H(n, t, e) {
  return t in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function kn(n, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), t && nt(n, t);
}
function Te(n) {
  return Te = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Te(n);
}
function nt(n, t) {
  return nt = Object.setPrototypeOf || function(r, i) {
    return r.__proto__ = i, r;
  }, nt(n, t);
}
function Tn() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Mn(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function Nn(n, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Mn(n);
}
function Ln(n) {
  var t = Tn();
  return function() {
    var r = Te(n), i;
    if (t) {
      var a = Te(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return Nn(this, i);
  };
}
function D(n) {
  return Un(n) || Hn(n) || zn(n) || Gn();
}
function Un(n) {
  if (Array.isArray(n)) return rt(n);
}
function Hn(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function zn(n, t) {
  if (n) {
    if (typeof n == "string") return rt(n, t);
    var e = Object.prototype.toString.call(n).slice(8, -1);
    if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set") return Array.from(n);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return rt(n, t);
  }
}
function rt(n, t) {
  (t == null || t > n.length) && (t = n.length);
  for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
  return r;
}
function Gn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Le(n, t) {
  return Object.keys(n).reduce(function(e, r) {
    return (!t || t.indexOf(r) === -1) && e.push(n[r]), e;
  }, []);
}
function X(n) {
  return Array.isArray(n) ? n : [null, void 0, ""].indexOf(n) > -1 ? [] : [n];
}
var Yn = "fcCheckbox", qn = ae({
  name: Yn,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: String,
    input: Boolean,
    inputValue: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t, e) {
    var r = K(t.formCreateInject, "options", []), i = K(t, "modelValue"), a = K(t, "inputValue", ""), o = ft(a.value), u = K(t, "input", !1), s = function(d) {
      var h = D(X(i.value)), g = h.indexOf(o.value);
      o.value = d, g > -1 && (h.splice(g, 1), h.push(d), f(h));
    };
    J(a, function(c) {
      if (!u.value) {
        o.value = c;
        return;
      }
      s(c);
    });
    var l = function() {
      return Array.isArray(r.value) ? r.value : [];
    }, f = function(d) {
      e.emit("update:modelValue", d);
    };
    return {
      options: l,
      value: i,
      onInput: f,
      updateCustomValue: s,
      makeInput: function(d) {
        if (u.value)
          return w(d, {
            value: o.value || void 0,
            label: o.value || void 0
          }, {
            default: function() {
              return [w(A("ElInput"), {
                size: "small",
                modelValue: o.value,
                "onUpdate:modelValue": s
              }, null)];
            }
          });
      }
    };
  },
  render: function() {
    var t, e, r = this, i = this.type === "button" ? "ElCheckboxButton" : "ElCheckbox", a = A(i);
    return w(A("ElCheckboxGroup"), re(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": this.onInput,
      ref: "el"
    }), _({
      default: function() {
        return [r.options().map(function(u, s) {
          var l = _({}, u), f = l.value, c = l.label;
          return delete l.value, delete l.label, w(a, re(l, {
            label: f,
            value: f,
            key: i + s + "-" + f
          }), {
            default: function() {
              return [c || f || ""];
            }
          });
        }), (t = (e = r.$slots).default) === null || t === void 0 ? void 0 : t.call(e), r.makeInput(a)];
      }
    }, Le(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
});
function Ut(n) {
  n = n || /* @__PURE__ */ new Map();
  var t = {
    $on: function(r, i) {
      var a = n.get(r), o = a && a.push(i);
      o || n.set(r, [i]);
    },
    $once: function(r, i) {
      i._once = !0, t.$on(r, i);
    },
    $off: function(r, i) {
      var a = n.get(r);
      a && a.splice(a.indexOf(i) >>> 0, 1);
    },
    $emit: function(r) {
      for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        a[o - 1] = arguments[o];
      (n.get(r) || []).slice().map(function(u) {
        u._once && (t.$off(r, u), delete u._once), u.apply(void 0, a);
      }), (n.get("*") || []).slice().map(function(u) {
        u(r, a);
      });
    }
  };
  return t;
}
function Ue(n, t) {
  t === void 0 && (t = {});
  var e = t.insertAt;
  if (!(!n || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", e === "top" && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n));
  }
}
var Jn = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-btn{border:1px dashed #c0ccda;cursor:pointer}._fc-frame._fc-disabled ._fc-upload-btn,._fc-frame._fc-disabled .el-button{color:#999;cursor:not-allowed!important}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}._fc-frame ._fc-upload-cover i{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .el-upload{display:block}._fc-frame ._fc-upload-icon{cursor:pointer}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;-webkit-box-shadow:2px 2px 5px rgba(0,0,0,.1);box-shadow:2px 2px 5px rgba(0,0,0,.1);-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;height:58px;line-height:58px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:58px}";
Ue(Jn);
var Ht = {
  name: "IconCircleClose"
}, Wn = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Kn = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"
}, null, -1), Xn = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
}, null, -1), Qn = [Kn, Xn];
function Zn(n, t, e, r, i, a) {
  return Ve(), Se("svg", Wn, Qn);
}
Ht.render = Zn;
var zt = {
  name: "IconDocument"
}, er = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, tr = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 01-32 32H160a32 32 0 01-32-32V96a32 32 0 0132-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
}, null, -1), nr = [tr];
function rr(n, t, e, r, i, a) {
  return Ve(), Se("svg", er, nr);
}
zt.render = rr;
var Gt = {
  name: "IconDelete"
}, ir = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, ar = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"
}, null, -1), or = [ar];
function ur(n, t, e, r, i, a) {
  return Ve(), Se("svg", ir, or);
}
Gt.render = ur;
var Yt = {
  name: "IconView"
}, sr = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, lr = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1), fr = [lr];
function cr(n, t, e, r, i, a) {
  return Ve(), Se("svg", sr, fr);
}
Yt.render = cr;
var qt = {
  name: "IconFolderOpened"
}, dr = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, pr = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 01216.96 384H832zm-24.96 512H96a32 32 0 01-32-32V160a32 32 0 0132-32h287.872l128.384 128H864a32 32 0 0132 32v96h23.04a32 32 0 0131.04 39.744l-112 448A32 32 0 01807.04 896z"
}, null, -1), hr = [pr];
function mr(n, t, e, r, i, a) {
  return Ve(), Se("svg", dr, hr);
}
qt.render = mr;
function _t(n) {
  return typeof n == "function" || Object.prototype.toString.call(n) === "[object Object]" && !Nt(n);
}
var vr = "fcFrame", gr = ae({
  name: vr,
  props: {
    type: {
      type: String,
      default: "input"
    },
    field: String,
    helper: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    src: {
      type: String,
      required: !0
    },
    icon: {
      type: String,
      default: "IconFolderOpened"
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "370px"
    },
    maxLength: {
      type: Number,
      default: 0
    },
    okBtnText: {
      type: String,
      default: "确定"
    },
    closeBtnText: {
      type: String,
      default: "关闭"
    },
    modalTitle: String,
    handleIcon: {
      type: [String, Boolean],
      default: void 0
    },
    title: String,
    allowRemove: {
      type: Boolean,
      default: !0
    },
    onOpen: {
      type: Function,
      default: function() {
      }
    },
    onOk: {
      type: Function,
      default: function() {
      }
    },
    onCancel: {
      type: Function,
      default: function() {
      }
    },
    onLoad: {
      type: Function,
      default: function() {
      }
    },
    onBeforeRemove: {
      type: Function,
      default: function() {
      }
    },
    onRemove: {
      type: Function,
      default: function() {
      }
    },
    onHandle: Function,
    modal: {
      type: Object,
      default: function() {
        return {};
      }
    },
    srcKey: [String, Number],
    modelValue: [Array, String, Number, Object],
    previewMask: void 0,
    footer: {
      type: Boolean,
      default: !0
    },
    reload: {
      type: Boolean,
      default: !0
    },
    closeBtn: {
      type: Boolean,
      default: !0
    },
    okBtn: {
      type: Boolean,
      default: !0
    },
    formCreateInject: Object
  },
  emits: ["update:modelValue", "change"],
  components: {
    IconFolderOpened: qt,
    IconView: Yt
  },
  data: function() {
    return {
      fileList: X(this.modelValue),
      previewVisible: !1,
      frameVisible: !1,
      previewImage: "",
      bus: new Ut()
    };
  },
  watch: {
    modelValue: function(t) {
      this.fileList = X(t);
    }
  },
  methods: {
    close: function() {
      this.closeModel(!0);
    },
    closeModel: function(t) {
      this.bus.$emit(t ? "$close" : "$ok"), this.reload && (this.bus.$off("$ok"), this.bus.$off("$close")), this.frameVisible = !1;
    },
    handleCancel: function() {
      this.previewVisible = !1;
    },
    showModel: function() {
      this.disabled || this.onOpen() === !1 || (this.frameVisible = !0);
    },
    input: function() {
      var t = this.fileList, e = this.maxLength === 1 ? t[0] || "" : t;
      this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    makeInput: function() {
      var t = this;
      return w(A("ElInput"), re({
        type: "text",
        modelValue: this.fileList.map(function(e) {
          return t.getSrc(e);
        }).toString(),
        readonly: !0
      }, {
        key: 1
      }), {
        append: function() {
          return w(A("ElButton"), {
            icon: A(t.icon),
            onClick: function() {
              return t.showModel();
            }
          }, null);
        },
        suffix: function() {
          return t.fileList.length && !t.disabled ? w(A("ElIcon"), {
            class: "el-input__icon _fc-upload-icon",
            onClick: function() {
              t.fileList = [], t.input();
            }
          }, {
            default: function() {
              return [w(Ht, null, null)];
            }
          }) : null;
        }
      });
    },
    makeGroup: function(t) {
      return (!this.maxLength || this.fileList.length < this.maxLength) && t.push(this.makeBtn()), w("div", {
        key: 2
      }, [t]);
    },
    makeItem: function(t, e) {
      return w("div", {
        class: "_fc-files",
        key: "3" + t
      }, [e]);
    },
    valid: function(t) {
      var e = this.formCreateInject.field || this.field;
      if (e && t !== e)
        throw new Error("[frame]无效的字段值");
    },
    makeIcons: function(t, e) {
      if (this.handleIcon !== !1 || this.allowRemove === !0) {
        var r = [];
        return (this.type !== "file" && this.handleIcon !== !1 || this.type === "file" && this.handleIcon) && r.push(this.makeHandleIcon(t, e)), this.allowRemove && r.push(this.makeRemoveIcon(t, e)), w("div", {
          class: "_fc-upload-cover",
          key: 4
        }, [r]);
      }
    },
    makeHandleIcon: function(t, e) {
      var r = this, i = A(this.handleIcon === !0 || this.handleIcon === void 0 ? "icon-view" : this.handleIcon);
      return w(A("ElIcon"), {
        onClick: function() {
          return r.handleClick(t);
        },
        key: "5" + e
      }, {
        default: function() {
          return [w(i, null, null)];
        }
      });
    },
    makeRemoveIcon: function(t, e) {
      var r = this;
      return w(A("ElIcon"), {
        onClick: function() {
          return r.handleRemove(t);
        },
        key: "6" + e
      }, {
        default: function() {
          return [w(Gt, null, null)];
        }
      });
    },
    makeFiles: function() {
      var t = this;
      return this.makeGroup(this.fileList.map(function(e, r) {
        return t.makeItem(r, [w(A("ElIcon"), {
          onClick: function() {
            return t.handleClick(e);
          }
        }, {
          default: function() {
            return [w(zt, null, null)];
          }
        }), t.makeIcons(e, r)]);
      }));
    },
    makeImages: function() {
      var t = this;
      return this.makeGroup(this.fileList.map(function(e, r) {
        return t.makeItem(r, [w("img", {
          src: t.getSrc(e)
        }, null), t.makeIcons(e, r)]);
      }));
    },
    makeBtn: function() {
      var t = this, e = A(this.icon);
      return w("div", {
        class: "_fc-upload-btn",
        onClick: function() {
          return t.showModel();
        },
        key: 7
      }, [w(A("ElIcon"), null, {
        default: function() {
          return [w(e, null, null)];
        }
      })]);
    },
    handleClick: function(t) {
      if (this.onHandle)
        return this.onHandle(t);
      this.previewImage = this.getSrc(t), this.previewVisible = !0;
    },
    handleRemove: function(t) {
      this.disabled || this.onBeforeRemove(t) !== !1 && (this.fileList.splice(this.fileList.indexOf(t), 1), this.input(), this.onRemove(t));
    },
    getSrc: function(t) {
      return this.srcKey ? t[this.srcKey] : t;
    },
    frameLoad: function(t) {
      var e = this;
      this.onLoad(t);
      try {
        this.helper === !0 && (t.form_create_helper = {
          api: this.formCreateInject.api,
          close: function(i) {
            e.valid(i), e.closeModel();
          },
          set: function(i, a) {
            e.valid(i), !e.disabled && e.$emit("update:modelValue", a);
          },
          get: function(i) {
            return e.valid(i), e.modelValue;
          },
          onOk: function(i) {
            return e.bus.$on("$ok", i);
          },
          onClose: function(i) {
            return e.bus.$on("$close", i);
          }
        });
      } catch (r) {
        console.error(r);
      }
    },
    makeFooter: function() {
      var t = this, e = this.$props, r = e.okBtnText, i = e.closeBtnText, a = e.closeBtn, o = e.okBtn, u = e.footer;
      if (u)
        return w("div", null, [a ? w(A("ElButton"), {
          onClick: function() {
            return t.onCancel() !== !1 && (t.frameVisible = !1);
          }
        }, _t(i) ? i : {
          default: function() {
            return [i];
          }
        }) : null, o ? w(A("ElButton"), {
          type: "primary",
          onClick: function() {
            return t.onOk() !== !1 && t.closeModel();
          }
        }, _t(r) ? r : {
          default: function() {
            return [r];
          }
        }) : null]);
    }
  },
  render: function() {
    var t = this, e = this.type, r;
    e === "input" ? r = this.makeInput() : e === "image" ? r = this.makeImages() : r = this.makeFiles();
    var i = this.$props, a = i.width, o = a === void 0 ? "30%" : a, u = i.height, s = i.src, l = i.title, f = i.modalTitle;
    return Q(function() {
      t.$refs.frame && t.frameLoad(t.$refs.frame.contentWindow || {});
    }), w("div", {
      class: {
        "_fc-frame": !0,
        "_fc-disabled": this.disabled
      }
    }, [r, w(A("ElDialog"), {
      appendToBody: !0,
      modal: this.previewMask,
      title: f,
      modelValue: this.previewVisible,
      onClose: this.handleCancel
    }, {
      default: function() {
        return [w("img", {
          style: "width: 100%",
          src: t.previewImage
        }, null)];
      }
    }), w(A("ElDialog"), re({
      appendToBody: !0
    }, _({
      width: o,
      title: l
    }, this.modal), {
      modelValue: this.frameVisible,
      onClose: function() {
        return t.closeModel(!0);
      }
    }), {
      default: function() {
        return [t.frameVisible || !t.reload ? w("iframe", {
          ref: "frame",
          src: s,
          frameBorder: "0",
          style: {
            height: u,
            border: "0 none",
            width: "100%"
          }
        }, null) : null];
      },
      footer: function() {
        return t.makeFooter();
      }
    })]);
  },
  beforeMount: function() {
    var t = this.formCreateInject, e = t.name, r = t.field, i = t.api;
    e && i.on("fc:closeModal:" + e, this.close), r && i.on("fc:closeModal:" + r, this.close);
  },
  beforeUnmount: function() {
    var t = this.formCreateInject, e = t.name, r = t.field, i = t.api;
    e && i.off("fc:closeModal:" + e, this.close), r && i.off("fc:closeModal:" + r, this.close);
  }
}), yr = "fcRadio", br = ae({
  name: yr,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    type: String,
    input: Boolean,
    inputValue: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t, e) {
    var r = K(t.formCreateInject, "options", []), i = K(t, "modelValue"), a = K(t, "inputValue", ""), o = ft(a.value), u = K(t, "input", !1), s = function() {
      return Array.isArray(r.value) ? r.value : [];
    };
    J(a, function(c) {
      if (!u.value) {
        o.value = c;
        return;
      }
      f(c);
    });
    var l = function(d) {
      e.emit("update:modelValue", d);
    }, f = function(d) {
      var h = o.value;
      o.value = d, i.value === h && l(d);
    };
    return {
      options: s,
      value: i,
      onInput: l,
      updateCustomValue: f,
      customValue: o,
      makeInput: function(d) {
        if (u.value)
          return w(d, {
            checked: !1,
            value: o.value || void 0,
            label: o.value || void 0
          }, {
            default: function() {
              return [w(A("ElInput"), {
                size: "small",
                modelValue: o.value,
                "onUpdate:modelValue": f
              }, null)];
            }
          });
      }
    };
  },
  render: function() {
    var t, e, r = this, i = this.type === "button" ? "ElRadioButton" : "ElRadio", a = A(i);
    return w(A("ElRadioGroup"), re(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": this.onInput,
      ref: "el"
    }), _({
      default: function() {
        return [r.options().map(function(u, s) {
          var l = _({}, u), f = l.value, c = l.label;
          return delete l.value, delete l.label, w(a, re(l, {
            label: f,
            value: f,
            key: i + s + "-" + f
          }), {
            default: function() {
              return [c || f || ""];
            }
          });
        }), (t = (e = r.$slots).default) === null || t === void 0 ? void 0 : t.call(e), r.makeInput(a)];
      }
    }, Le(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
}), v = {
  type: function(t, e) {
    return Object.prototype.toString.call(t) === "[object " + e + "]";
  },
  Undef: function(t) {
    return t == null;
  },
  Element: function(t) {
    return L(t) === "object" && t !== null && t.nodeType === 1 && !v.Object(t);
  },
  trueArray: function(t) {
    return Array.isArray(t) && t.length > 0;
  },
  Function: function(t) {
    var e = this.getType(t);
    return e === "Function" || e === "AsyncFunction";
  },
  getType: function(t) {
    var e = Object.prototype.toString.call(t);
    return /^\[object (.*)\]$/.exec(e)[1];
  },
  empty: function(t) {
    return t == null || Array.isArray(t) && Array.isArray(t) && !t.length ? !0 : typeof t == "string" && !t;
  }
};
["Date", "Object", "String", "Boolean", "Array", "Number"].forEach(function(n) {
  v[n] = function(t) {
    return v.type(t, n);
  };
});
function x(n, t) {
  return {}.hasOwnProperty.call(n, t);
}
var _r = "fcSelect", $r = ae({
  name: _r,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: void 0
    },
    type: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t) {
    var e = K(t.formCreateInject, "options", []), r = K(t, "modelValue"), i = function() {
      return Array.isArray(e.value) ? e.value : [];
    };
    return {
      options: i,
      value: r
    };
  },
  render: function() {
    var t = this, e, r, i = function(s, l) {
      return w(A("ElOption"), re(s, {
        key: "" + l + "-" + s.value
      }), null);
    }, a = function(s, l) {
      return w(A("ElOptionGroup"), {
        label: s.label,
        key: "" + l + "-" + s.label
      }, {
        default: function() {
          return [v.trueArray(s.options) && s.options.map(function(c, d) {
            return i(c, d);
          })];
        }
      });
    }, o = this.options();
    return w(A("ElSelect"), re(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": function(s) {
        return t.$emit("update:modelValue", s);
      },
      ref: "el"
    }), _({
      default: function() {
        return [o.map(function(s, l) {
          return x(s || "", "options") ? a(s, l) : i(s, l);
        }), (e = (r = t.$slots).default) === null || e === void 0 ? void 0 : e.call(r)];
      }
    }, Le(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
}), wr = "fcTree", Cr = ae({
  name: wr,
  inheritAttrs: !1,
  formCreateParser: {
    mergeProp: function(t) {
      var e = t.prop.props;
      e.nodeKey || (e.nodeKey = "id"), e.props || (e.props = {
        label: "title"
      });
    }
  },
  props: {
    type: String,
    modelValue: {
      type: [Array, String, Number],
      default: function() {
        return [];
      }
    }
  },
  emits: ["update:modelValue", "fc.el"],
  watch: {
    modelValue: function() {
      this.setValue();
    }
  },
  methods: {
    updateValue: function() {
      if (this.$refs.tree) {
        var t;
        this.type === "selected" ? t = this.$refs.tree.getCurrentKey() : t = this.$refs.tree.getCheckedKeys(), this.$emit("update:modelValue", t);
      }
    },
    setValue: function() {
      if (this.$refs.tree) {
        var t = this.type;
        t === "selected" ? this.$refs.tree.setCurrentKey(this.modelValue) : this.$refs.tree.setCheckedKeys(X(this.modelValue));
      }
    }
  },
  render: function() {
    return w(A("ElTree"), re(this.$attrs, {
      ref: "tree",
      onCheck: this.updateValue,
      onNodeClick: this.updateValue
    }), this.$slots);
  },
  mounted: function() {
    this.setValue(), this.$emit("fc.el", this.$refs.tree);
  }
}), Vr = "._fc-upload{width:100%}._fc-exceed .el-upload{display:none}.el-upload-list.is-disabled .el-upload{cursor:not-allowed!important}";
Ue(Vr);
var Jt = {
  name: "IconUpload"
}, Sr = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Or = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M160 832h704a32 32 0 110 64H160a32 32 0 110-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
}, null, -1), Fr = [Or];
function Er(n, t, e, r, i, a) {
  return Ve(), Se("svg", Sr, Fr);
}
Jt.render = Er;
function $t(n, t) {
  return {
    url: n,
    name: Rr(n),
    uid: t
  };
}
function Rr(n) {
  return ("" + n).split("/").pop();
}
var Dr = "fcUpload", Ar = ae({
  name: Dr,
  inheritAttrs: !1,
  formCreateParser: {
    toFormValue: function(t) {
      return X(t);
    },
    toValue: function(t, e) {
      return e.prop.props.limit === 1 ? t[0] || "" : t;
    }
  },
  props: {
    previewMask: void 0,
    onPreview: Function,
    modalTitle: String,
    listType: String,
    modelValue: [Array, String]
  },
  emits: ["update:modelValue", "change", "remove", "fc.el"],
  data: function() {
    return {
      previewVisible: !1,
      previewImage: "",
      fileList: []
    };
  },
  created: function() {
    this.fileList = X(this.modelValue).map($t);
  },
  watch: {
    modelValue: function(t) {
      this.fileList = X(t).map($t);
    }
  },
  methods: {
    handlePreview: function(t) {
      this.onPreview ? this.onPreview.apply(this, arguments) : this.listType === "text" ? window.open(t.url) : (this.previewImage = t.url, this.previewVisible = !0);
    },
    update: function(t) {
      var e = t.map(function(r) {
        return r.url;
      }).filter(function(r) {
        return r !== void 0;
      });
      this.$emit("update:modelValue", e);
    },
    handleCancel: function() {
      this.previewVisible = !1;
    },
    handleChange: function(t, e) {
      this.$emit.apply(this, ["change"].concat(Array.prototype.slice.call(arguments))), t.status === "success" && this.update(e);
    },
    handleRemove: function(t, e) {
      this.$emit.apply(this, ["remove"].concat(Array.prototype.slice.call(arguments))), this.update(e);
    }
  },
  render: function() {
    var t, e, r = this, i = X(this.modelValue).length;
    return w("div", {
      class: "_fc-upload"
    }, [w(A("ElUpload"), re({
      key: i
    }, this.$attrs, {
      listType: this.listType || "picture-card",
      class: {
        "_fc-exceed": this.$attrs.limit ? this.$attrs.limit <= i : !1
      },
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      fileList: this.fileList,
      ref: "upload"
    }), _({
      default: function() {
        return [(t = (e = r.$slots).default) !== null && t !== void 0 && t.call(e) || ["text", "picture"].indexOf(r.listType) === -1 ? w(A("ElIcon"), null, {
          default: function() {
            return [w(Jt, null, null)];
          }
        }) : w(A("ElButton"), {
          type: "primary"
        }, {
          default: function() {
            return [Vn("点击上传")];
          }
        })];
      }
    }, Le(this.$slots, ["default"]))), w(A("ElDialog"), {
      appendToBody: !0,
      modal: this.previewMask,
      title: this.modalTitle,
      modelValue: this.previewVisible,
      onClose: this.handleCancel
    }, {
      default: function() {
        return [w("img", {
          style: "width: 100%",
          src: r.previewImage
        }, null)];
      }
    })]);
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.upload);
  }
});
function ee(n, t, e) {
  n[t] = e;
}
function ye(n, t) {
  delete n[t];
}
function je(n) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 ? arguments[2] : void 0, r = !1;
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var a = t[i];
      if ((r = Array.isArray(a)) || v.Object(a)) {
        var o = n[i] === void 0;
        if (r)
          r = !1, o && ee(n, i, []);
        else if (a._clone && e !== void 0)
          if (e)
            a = a.getRule(), o && ee(n, i, {});
          else {
            ee(n, i, a._clone());
            continue;
          }
        else
          o && ee(n, i, {});
        n[i] = je(n[i], a, e);
      } else
        ee(n, i, a), v.Undef(a) || (v.Undef(a.__json) || (n[i].__json = a.__json), v.Undef(a.__origin) || (n[i].__origin = a.__origin));
    }
  return e !== void 0 && Array.isArray(n) ? n.filter(function(u) {
    return !u || !u.__ctrl;
  }) : n;
}
function te(n) {
  return je({}, {
    value: n
  }).value;
}
var Pr = Object.assign || function(n) {
  for (var t, e = 1; e < arguments.length; e++)
    for (var r in t = arguments[e], t)
      Object.prototype.hasOwnProperty.call(t, r) && ee(n, r, t[r]);
  return n;
};
function C() {
  return Pr.apply(this, arguments);
}
function it(n) {
  return L(n) !== "object" || n === null ? n : n instanceof Array ? D(n) : _({}, n);
}
var jr = '._fc-group{display:flex;flex-direction:column;justify-content:center;min-height:38px;width:100%}._fc-group-disabled ._fc-group-add,._fc-group-disabled ._fc-group-btn{cursor:not-allowed}._fc-group-handle{background-color:#fff;border:1px dashed #d9d9d9;border-radius:15px;bottom:-15px;display:flex;flex-direction:row;padding:3px 8px;position:absolute;right:30px}._fc-group-btn{cursor:pointer}._fc-group-idx{align-items:center;background:#eee;border-radius:15px;bottom:-15px;display:flex;font-weight:700;height:30px;justify-content:center;left:10px;position:absolute;width:30px}._fc-group-handle ._fc-group-btn+._fc-group-btn{margin-left:7px}._fc-group-container{border:1px dashed #d9d9d9;border-radius:5px;display:flex;flex-direction:column;margin:5px 5px 25px;padding:20px 20px 25px;position:relative}._fc-group-arrow{height:20px;position:relative;width:20px}._fc-group-arrow:before{border-left:2px solid #999;border-top:2px solid #999;content:"";height:9px;left:5px;position:absolute;top:8px;transform:rotate(45deg);width:9px}._fc-group-arrow._fc-group-down{transform:rotate(180deg)}._fc-group-plus-minus{cursor:pointer;height:20px;position:relative;width:20px}._fc-group-plus-minus:after,._fc-group-plus-minus:before{background-color:#409eff;content:"";height:2px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:60%}._fc-group-plus-minus:before{transform:translate(-50%,-50%) rotate(90deg)}._fc-group-plus-minus._fc-group-minus:before{display:none}._fc-group-plus-minus._fc-group-minus:after{background-color:#f56c6c}._fc-group-add{border:1px solid rgba(64,158,255,.5);border-radius:15px;cursor:pointer;height:25px;width:25px}._fc-group-add._fc-group-plus-minus:after,._fc-group-add._fc-group-plus-minus:before{width:50%}';
Ue(jr);
var Ir = "fcGroup", Br = ae({
  name: Ir,
  props: {
    field: String,
    rule: Array,
    expand: Number,
    options: Object,
    button: {
      type: Boolean,
      default: !0
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultValue: Object,
    sortBtn: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    syncDisabled: {
      type: Boolean,
      default: !0
    },
    onBeforeRemove: {
      type: Function,
      default: function() {
      }
    },
    onBeforeAdd: {
      type: Function,
      default: function() {
      }
    },
    formCreateInject: Object,
    parse: Function
  },
  data: function() {
    return {
      len: 0,
      cacheRule: {},
      cacheValue: {},
      sort: [],
      form: _e(this.formCreateInject.form.$form())
    };
  },
  emits: ["update:modelValue", "change", "itemMounted", "remove", "add"],
  watch: {
    rule: {
      handler: function(t, e) {
        var r = this;
        Object.keys(this.cacheRule).forEach(function(i) {
          var a = r.cacheRule[i];
          if (a.$f) {
            var o = a.$f.formData();
            if (t === e)
              a.$f.deferSyncValue(function() {
                je(a.rule, t), a.$f.setValue(o);
              }, !0);
            else {
              var u = a.$f.formData();
              a.$f.once("reloading", function() {
                a.$f.setValue(u);
              }), a.rule = te(t);
            }
          }
        });
      },
      deep: !0
    },
    expand: function(t) {
      var e = t - this.modelValue.length;
      e > 0 && this.expandRule(e);
    },
    modelValue: {
      handler: function(t) {
        var e = this;
        t = t || [];
        var r = this.sort, i = r.length, a = i - t.length;
        if (a < 0) {
          for (var o = a; o < 0; o++)
            this.addRule(t.length + o, !0);
          for (var u = 0; u < i; u++)
            this.setValue(r[u], t[u]);
        } else {
          if (a > 0)
            for (var s = 0; s < a; s++)
              this.removeRule(r[i - s - 1]);
          t.forEach(function(l, f) {
            e.setValue(r[f], t[f]);
          });
        }
      },
      deep: !0
    }
  },
  methods: {
    _value: function(t) {
      return t && x(t, this.field) ? t[this.field] : t;
    },
    cache: function(t, e) {
      this.cacheValue[t] = JSON.stringify(e);
    },
    input: function(t) {
      this.$emit("update:modelValue", t), this.$emit("change", t);
    },
    formData: function(t, e) {
      var r = this, i = this.cacheRule, a = this.sort;
      if (a.filter(function(u) {
        return i[u].$f;
      }).length === a.length) {
        var o = a.map(function(u) {
          var s = t === u ? e : _({}, r.cacheRule[u].$f.form), l = r.field ? s[r.field] || null : s;
          return r.cache(u, l), l;
        });
        this.input(o);
      }
    },
    setValue: function(t, e) {
      var r = this.field;
      r && (e = H({}, r, this._value(e))), this.cacheValue[t] !== JSON.stringify(r ? e[r] : e) && this.cache(t, e);
    },
    addRule: function(t, e) {
      var r = this, i = this.formCreateInject.form.copyRules(this.rule || []), a = this.options ? _({}, this.options) : {
        submitBtn: !1,
        resetBtn: !1
      };
      if (this.defaultValue) {
        a.formData || (a.formData = {});
        var o = te(this.defaultValue);
        C(a.formData, this.field ? H({}, this.field, o) : o);
      }
      this.parse && this.parse({
        rule: i,
        options: a,
        index: this.sort.length
      }), this.cacheRule[++this.len] = {
        rule: i,
        options: a
      }, e && Q(function() {
        return r.$emit("add", i, Object.keys(r.cacheRule).length - 1);
      });
    },
    add$f: function(t, e, r) {
      var i = this;
      this.cacheRule[e].$f = r, Q(function() {
        i.$emit("itemMounted", r, Object.keys(i.cacheRule).indexOf(e));
      });
    },
    removeRule: function(t, e) {
      var r = this, i = Object.keys(this.cacheRule).indexOf(t);
      delete this.cacheRule[t], delete this.cacheValue[t], e && Q(function() {
        return r.$emit("remove", i);
      });
    },
    add: function(t) {
      if (!(this.disabled || this.onBeforeAdd(this.modelValue) === !1)) {
        var e = D(this.modelValue);
        e.push(this.defaultValue ? te(this.defaultValue) : this.field ? null : {}), this.input(e);
      }
    },
    del: function(t, e) {
      if (!(this.disabled || this.onBeforeRemove(this.modelValue, t) === !1)) {
        this.removeRule(e, !0);
        var r = D(this.modelValue);
        r.splice(t, 1), this.input(r);
      }
    },
    addIcon: function(t) {
      return w("div", {
        class: "_fc-group-btn _fc-group-plus-minus",
        onClick: this.add
      }, null);
    },
    delIcon: function(t, e) {
      var r = this;
      return w("div", {
        class: "_fc-group-btn _fc-group-plus-minus _fc-group-minus",
        onClick: function() {
          return r.del(t, e);
        }
      }, null);
    },
    sortUpIcon: function(t) {
      var e = this;
      return w("div", {
        class: "_fc-group-btn _fc-group-arrow _fc-group-up",
        onClick: function() {
          return e.changeSort(t, -1);
        }
      }, null);
    },
    sortDownIcon: function(t) {
      var e = this;
      return w("div", {
        class: "_fc-group-btn _fc-group-arrow _fc-group-down",
        onClick: function() {
          return e.changeSort(t, 1);
        }
      }, null);
    },
    changeSort: function(t, e) {
      var r = this, i = this.sort[t];
      this.sort[t] = this.sort[t + e], this.sort[t + e] = i, this.formCreateInject.subForm(this.sort.map(function(a) {
        return r.cacheRule[a].$f;
      })), this.formData(0);
    },
    makeIcon: function(t, e, r) {
      var i = this;
      if (this.$slots.button)
        return this.$slots.button({
          total: t,
          index: e,
          vm: this,
          key: r,
          del: function() {
            return i.del(e, r);
          },
          add: this.add
        });
      var a = [];
      return (!this.max || t < this.max) && t === e + 1 && a.push(this.addIcon(r)), t > this.min && a.push(this.delIcon(e, r)), this.sortBtn && e && a.push(this.sortUpIcon(e)), this.sortBtn && e !== t - 1 && a.push(this.sortDownIcon(e)), a;
    },
    emitEvent: function(t, e, r, i) {
      this.$emit.apply(this, [t].concat(D(e), [this.cacheRule[i].$f, r]));
    },
    expandRule: function(t) {
      for (var e = 0; e < t; e++)
        this.addRule(e);
    }
  },
  created: function() {
    var t = this;
    J(function() {
      return _({}, t.cacheRule);
    }, function(i) {
      t.sort = Object.keys(i);
    }, {
      immediate: !0
    });
    for (var e = (this.expand || 0) - this.modelValue.length, r = 0; r < this.modelValue.length; r++)
      this.addRule(r);
    e > 0 && this.expandRule(e);
  },
  render: function() {
    var t = this, e = this.sort, r = this.button, i = this.form, a = this.disabled, o = e.length === 0 ? this.$slots.default ? this.$slots.default({
      vm: this,
      add: this.add
    }) : w("div", {
      key: "a_def",
      class: "_fc-group-plus-minus _fc-group-add fc-clock",
      onClick: this.add
    }, null) : e.map(function(u, s) {
      var l = t.cacheRule[u], f = l.rule, c = l.options, d = r && !a ? t.makeIcon(e.length, s, u) : [];
      return w("div", {
        class: "_fc-group-container",
        key: u
      }, [w(i, re({
        key: u
      }, {
        disabled: a,
        "onUpdate:modelValue": function(g) {
          return t.formData(u, g);
        },
        "onEmit-event": function(g) {
          for (var b = arguments.length, V = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
            V[F - 1] = arguments[F];
          return t.emitEvent(g, V, s, u);
        },
        "onUpdate:api": function(g) {
          return t.add$f(s, u, g);
        },
        inFor: !0,
        modelValue: t.field ? H({}, t.field, t._value(t.modelValue[s])) : t.modelValue[s],
        rule: f,
        option: c,
        extendOption: !0
      }), null), w("div", {
        class: "_fc-group-idx"
      }, [s + 1]), d.length ? w("div", {
        class: "_fc-group-handle fc-clock"
      }, [d]) : null]);
    });
    return w("div", {
      key: "con",
      class: "_fc-group " + (a ? "_fc-group-disabled" : "")
    }, [o]);
  }
}), xr = "fcSubForm", kr = ae({
  name: xr,
  props: {
    rule: Array,
    options: {
      type: Object,
      default: function() {
        return ce({
          submitBtn: !1,
          resetBtn: !1
        });
      }
    },
    modelValue: {
      type: Object,
      default: function() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    syncDisabled: {
      type: Boolean,
      default: !0
    },
    formCreateInject: Object
  },
  data: function() {
    return {
      cacheValue: {},
      subApi: {},
      form: _e(this.formCreateInject.form.$form())
    };
  },
  emits: ["fc:subform", "update:modelValue", "change", "itemMounted"],
  watch: {
    modelValue: function(t) {
      this.setValue(t);
    }
  },
  methods: {
    formData: function(t) {
      this.cacheValue = JSON.stringify(t), this.$emit("update:modelValue", t), this.$emit("change", t);
    },
    setValue: function(t) {
      var e = JSON.stringify(t);
      this.cacheValue !== e && (this.cacheValue = e, this.subApi.coverValue(t || {}));
    },
    add$f: function(t) {
      var e = this;
      this.subApi = t, Q(function() {
        e.$emit("itemMounted", t);
      });
    }
  },
  render: function() {
    var t = this.form;
    return w(t, {
      disabled: this.disabled,
      "onUpdate:modelValue": this.formData,
      modelValue: this.modelValue,
      "onEmit-event": this.$emit,
      "onUpdate:api": this.add$f,
      rule: this.rule,
      option: this.options,
      extendOption: !0
    }, null);
  }
}), Wt = {
  name: "IconWarning"
}, Tr = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Mr = /* @__PURE__ */ ve("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm48-176a48 48 0 11-96 0 48 48 0 0196 0zm-48-464a32 32 0 0132 32v288a32 32 0 01-64 0V288a32 32 0 0132-32z"
}, null, -1), Nr = [Mr];
function Lr(n, t, e, r, i, a) {
  return Ve(), Se("svg", Tr, Nr);
}
Wt.render = Lr;
var Ur = [qn, gr, br, $r, Cr, Ar, Br, kr, Wt];
function Ee(n, t) {
  var e = null;
  return function() {
    for (var r = this, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    e !== null && clearTimeout(e), e = setTimeout(function() {
      return n.call.apply(n, [r].concat(a));
    }, t);
  };
}
function Pe(n) {
  var t = n.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
  return t.indexOf("-") === 0 && (t = t.substr(1)), t;
}
function Hr(n) {
  return n.replace(n[0], n[0].toLocaleUpperCase());
}
var xe = function(t, e) {
  if (!(!t || t === e)) {
    if (t.props.formCreateInject)
      return t.props.formCreateInject;
    if (t.parent)
      return xe(t.parent, e);
  }
};
function zr(n, t, e) {
  return ae({
    name: "FormCreate" + (n.isMobile ? "Mobile" : ""),
    components: t,
    directives: e,
    props: {
      rule: {
        type: Array,
        required: !0,
        default: function() {
          return [];
        }
      },
      option: {
        type: Object,
        default: function() {
          return {};
        }
      },
      extendOption: Boolean,
      driver: [String, Object],
      modelValue: Object,
      disabled: {
        type: Boolean,
        default: void 0
      },
      preview: {
        type: Boolean,
        default: void 0
      },
      index: [String, Number],
      api: Object,
      name: String,
      subForm: {
        type: Boolean,
        default: !0
      },
      inFor: Boolean
    },
    emits: ["update:api", "update:modelValue", "mounted", "submit", "change", "emit-event", "control", "remove-rule", "remove-field", "sync", "reload", "repeat-field", "update", "validate-field-fail", "validate-fail", "created"],
    render: function() {
      return this.fc.render();
    },
    setup: function(i) {
      var a = tt();
      Sn("parentFC", a);
      var o = On("parentFC", null), u = o;
      if (o)
        for (; u.setupState.parent; )
          u = u.setupState.parent;
      else
        u = a;
      var s = yt(i), l = s.rule, f = s.modelValue, c = s.subForm, d = s.inFor, h = ce({
        ctxInject: {},
        destroyed: !1,
        isShow: !0,
        unique: 1,
        renderRule: D(l.value || []),
        updateValue: JSON.stringify(f.value || {})
      }), g = new n(a), b = g.api(), V = d.value, F = function() {
        if (o) {
          var I = xe(a, o);
          if (I) {
            var M;
            V ? (M = X(I.getSubForm()), M.push(b)) : M = b, I.subForm(M);
          }
        }
      }, E = function() {
        var I = xe(a, o);
        if (I)
          if (V) {
            var M = X(I.getSubForm()), ue = M.indexOf(b);
            ue > -1 && M.splice(ue, 1);
          } else
            I.subForm();
      }, P = null;
      Fn(function() {
        En(function() {
          var R = "", I = i.option && i.option.globalClass || {};
          Object.keys(I).forEach(function(M) {
            var ue = "";
            I[M].style && Object.keys(I[M].style).forEach(function(G) {
              ue += Pe(G) + ":" + I[M].style[G] + ";";
            }), I[M].content && (ue += I[M].content + ";"), ue && (R += ".".concat(M, "{").concat(ue, "}"));
          }), i.option && i.option.style && (R += i.option.style), P || (P = document.createElement("style"), P.type = "text/css", document.head.appendChild(P)), P.innerHTML = R || "";
        });
      });
      var z = Ee(function() {
        g.bus.$emit("$loadData.$topForm");
      }, 100), T = Ee(function() {
        g.bus.$emit("$loadData.$form");
      }, 100), W = function(I) {
        g.bus.$emit("change-$form." + I);
      };
      return Rn(function() {
        o && (b.top.bus.$on("$loadData.$form", z), b.top.bus.$on("change", W)), g.mounted();
      }), Dn(function() {
        o && (b.top.bus.$off("$loadData.$form", z), b.top.bus.$off("change", W)), P && document.head.removeChild(P), E(), h.destroyed = !0, g.unmount();
      }), An(function() {
        g.updated();
      }), J(c, function(R) {
        R ? F() : E();
      }, {
        immediate: !0
      }), J(function() {
        return D(l.value);
      }, function(R) {
        g.$handle.isBreakWatch() || R.length === h.renderRule.length && R.every(function(I) {
          return h.renderRule.indexOf(I) > -1;
        }) || (g.$handle.updateAppendData(), g.$handle.reloadRule(l.value), a.setupState.renderRule());
      }), J(function() {
        return i.option;
      }, function() {
        g.initOptions(), b.refresh();
      }, {
        deep: !0
      }), J(function() {
        return [i.disabled, i.preview];
      }, function() {
        b.refresh();
      }), J(f, function(R) {
        JSON.stringify(R || {}) !== h.updateValue && (b.config.forceCoverValue ? b.coverValue(R || {}) : b.setValue(R || {}));
      }, {
        deep: !0,
        flush: "post"
      }), J(function() {
        return i.index;
      }, function() {
        b.coverValue({}), g.$handle.updateAppendData(), Q(function() {
          Q(function() {
            b.clearValidateState();
          });
        });
      }, {
        flush: "sync"
      }), _(_({
        fc: _e(g),
        parent: o && _e(o),
        top: _e(u),
        fapi: _e(b)
      }, yt(h)), {}, {
        getGroupInject: function() {
          return xe(a, o);
        },
        refresh: function() {
          ++h.unique;
        },
        renderRule: function() {
          h.renderRule = D(l.value || []);
        },
        updateValue: function(I) {
          if (!h.destroyed) {
            var M = JSON.stringify(I);
            h.updateValue !== M && (h.updateValue = M, a.emit("update:modelValue", I), Q(function() {
              T(), o || z();
            }));
          }
        }
      });
    },
    created: function() {
      var i = tt();
      i.emit("update:api", i.setupState.fapi), i.setupState.fc.init();
    }
  });
}
var Kt = ["props"], Xt = ["class", "style", "directives"], Qt = ["on"], he = function n(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = [].concat(Kt, D(r.normal || [])), a = [].concat(Xt, D(r.array || [])), o = [].concat(Qt, D(r.functional || [])), u = r.props || [];
  return t.reduce(function(s, l) {
    for (var f in l)
      if (s[f])
        if (u.indexOf(f) > -1)
          s[f] = n([l[f]], s[f]);
        else if (i.indexOf(f) > -1)
          s[f] = _(_({}, s[f]), l[f]);
        else if (a.indexOf(f) > -1) {
          var c = s[f] instanceof Array ? s[f] : [s[f]], d = l[f] instanceof Array ? l[f] : [l[f]];
          s[f] = [].concat(D(c), D(d));
        } else if (o.indexOf(f) > -1)
          for (var h in l[f])
            if (s[f][h]) {
              var g = s[f][h] instanceof Array ? s[f][h] : [s[f][h]], b = l[f][h] instanceof Array ? l[f][h] : [l[f][h]];
              s[f][h] = [].concat(D(g), D(b));
            } else
              s[f][h] = l[f][h];
        else if (f === "hook")
          for (var V in l[f])
            s[f][V] ? s[f][V] = Gr(s[f][V], l[f][V]) : s[f][V] = l[f][V];
        else
          s[f] = l[f];
      else
        i.indexOf(f) > -1 || o.indexOf(f) > -1 || u.indexOf(f) > -1 ? s[f] = _({}, l[f]) : a.indexOf(f) > -1 ? s[f] = l[f] instanceof Array ? D(l[f]) : L(l[f]) === "object" ? _({}, l[f]) : l[f] : s[f] = l[f];
    return s;
  }, e);
}, Gr = function(t, e) {
  return function() {
    t && t.apply(this, arguments), e && e.apply(this, arguments);
  };
}, at = ["type", "slot", "emitPrefix", "value", "name", "native", "hidden", "display", "inject", "options", "emit", "link", "prefix", "suffix", "update", "sync", "optionsTo", "key", "slotUpdate", "computed", "preview", "component", "cache", "modelEmit"], Me = ["validate", "children", "control"], Ne = ["effect", "deep"];
function Zt() {
  return [].concat(at, D(Kt), D(Xt), D(Qt), Me, Ne);
}
function en(n, t, e) {
  return "[form-create ".concat(n, "]: ").concat(t) + "";
}
function ct(n, t) {
  console.error(en("err", n));
}
function Yr(n) {
  ct(n.toString()), console.error(n);
}
function ne(n) {
  var t = n.replace(/(-[a-z])/g, function(e) {
    return e.replace("-", "").toLocaleUpperCase();
  });
  return tn(t);
}
function tn(n) {
  return n.replace(n[0], n[0].toLowerCase());
}
var ot = "[[FORM-CREATE-PREFIX-", ut = "-FORM-CREATE-SUFFIX]]", wt = "$FN:", Ct = "$FNX:", Vt = "$GLOBAL:", Ae = "function";
function nn(n, t) {
  return JSON.stringify(je(Array.isArray(n) ? [] : {}, n, !0), function(e, r) {
    if (!(r && r._isVue === !0)) {
      if (L(r) !== Ae)
        return r;
      if (r.__json)
        return r.__json;
      if (r.__origin && (r = r.__origin), !r.__emit)
        return ot + r + ut;
    }
  }, t);
}
function St(n) {
  return new Function("return " + n)();
}
function de(n, t) {
  if (n && v.String(n) && n.length > 4) {
    var e = n.trim(), r = !1;
    try {
      if (e.indexOf(ut) > 0 && e.indexOf(ot) === 0)
        e = e.replace(ut, "").replace(ot, ""), r = !0;
      else if (e.indexOf(wt) === 0)
        e = e.replace(wt, ""), r = !0;
      else if (e.indexOf(Vt) === 0) {
        var i = e.replace(Vt, "");
        return e = function() {
          for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++)
            s[l] = arguments[l];
          var f = s[0].api.getGlobalEvent(i);
          if (f)
            return f.call.apply(f, [this].concat(s));
        }, e.__json = n, e.__inject = !0, e;
      } else {
        if (e.indexOf(Ct) === 0)
          return e = St("function($inject){" + e.replace(Ct, "") + "}"), e.__json = n, e.__inject = !0, e;
        !t && e.indexOf(Ae) === 0 && e !== Ae && (r = !0);
      }
      if (!r) return n;
      var a = St(e.indexOf(Ae) === -1 && e.indexOf("(") !== 0 ? Ae + " " + e : e);
      return a.__json = n, a;
    } catch (o) {
      ct("解析失败:".concat(e, `

err: `).concat(o));
      return;
    }
  }
  return n;
}
function qr(n, t) {
  return JSON.parse(n, function(e, r) {
    return v.Undef(r) || !r.indexOf ? r : de(r, t);
  });
}
function rn(n, t) {
  return {
    value: n,
    enumerable: !1,
    configurable: !1,
    writable: !!t
  };
}
function dt(n, t) {
  return an([n], t || !1)[0];
}
function an(n, t) {
  return je([], D(n), t || !1);
}
function me(n, t) {
  return he(Array.isArray(t) ? t : [t], n, {
    array: Me,
    normal: Ne
  }), n;
}
function Ot(n) {
  var t = v.Function(n.getRule) ? n.getRule() : n;
  return t.type || (t.type = "input"), t;
}
function Jr(n, t) {
  return n ? (Object.keys(t || {}).forEach(function(e) {
    t[e] && (n[e] = me(n[e] || {}, t[e]));
  }), n) : t;
}
function on(n, t) {
  Object.defineProperties(n, Object.keys(t).reduce(function(e, r) {
    return e[r] = {
      get: function() {
        return t[r]();
      }
    }, e;
  }, {}));
}
function be(n) {
  return n.__fc__ || (n.__origin__ ? n.__origin__.__fc__ : null);
}
function j(n, t) {
  try {
    t = n();
  } catch (e) {
    Yr(e);
  }
  return t;
}
function qe() {
  var n = {}, t = function(r) {
    return r || "default";
  };
  return {
    setSlot: function(r, i) {
      r = t(r), !(!i || Array.isArray(i) && i.length) && (n[r] || (n[r] = []), n[r].push(i));
    },
    getSlot: function(r, i) {
      r = t(r);
      var a = [];
      return (n[r] || []).forEach(function(o) {
        if (Array.isArray(o))
          a.push.apply(a, D(o));
        else if (v.Function(o)) {
          var u = o.apply(void 0, D(i || []));
          Array.isArray(u) ? a.push.apply(a, D(u)) : a.push(u);
        } else v.Undef(o) || a.push(o);
      }), a;
    },
    getSlots: function() {
      var r = this, i = {};
      return Object.keys(n).forEach(function(a) {
        i[a] = function() {
          for (var o = arguments.length, u = new Array(o), s = 0; s < o; s++)
            u[s] = arguments[s];
          return r.getSlot(a, u);
        };
      }), i;
    },
    slotLen: function(r) {
      return r = t(r), n[r] ? n[r].length : 0;
    },
    mergeBag: function(r) {
      var i = this;
      if (!r) return this;
      var a = v.Function(r.getSlots) ? r.getSlots() : r;
      return Array.isArray(r) || Nt(r) ? this.setSlot(void 0, function() {
        return r;
      }) : Object.keys(a).forEach(function(o) {
        i.setSlot(o, a[o]);
      }), this;
    }
  };
}
function Ft(n) {
  var t = _({}, n.props || {});
  return Object.keys(n.on || {}).forEach(function(e) {
    e.indexOf("-") > 0 && (e = ne(e));
    var r = "on".concat(Hr(e));
    Array.isArray(t[r]) ? t[r] = [].concat(D(t[r]), [n.on[e]]) : t[r] ? t[r] = [t[r], n.on[e]] : t[r] = n.on[e];
  }), t.key = n.key, t.ref = n.ref, t.class = n.class, t.id = n.id, t.style = n.style, t.slot && delete t.slot, t;
}
function Je(n, t) {
  return Object.setPrototypeOf(n, t), n;
}
var Et = function(t, e) {
  return typeof t == "string" ? String(e) : typeof t == "number" ? Number(e) : e;
}, $e = {
  "==": function(t, e) {
    return JSON.stringify(t) === JSON.stringify(Et(t, e));
  },
  "!=": function(t, e) {
    return !$e["=="](t, e);
  },
  ">": function(t, e) {
    return t > e;
  },
  ">=": function(t, e) {
    return t >= e;
  },
  "<": function(t, e) {
    return t < e;
  },
  "<=": function(t, e) {
    return t <= e;
  },
  on: function(t, e) {
    return t && t.indexOf && t.indexOf(Et(t[0], e)) > -1;
  },
  notOn: function(t, e) {
    return !$e.on(t, e);
  },
  in: function(t, e) {
    return e && e.indexOf && e.indexOf(t) > -1;
  },
  notIn: function(t, e) {
    return !$e.in(t, e);
  },
  between: function(t, e) {
    return t > e[0] && t < e[1];
  },
  notBetween: function(t, e) {
    return t < e[0] || t > e[1];
  },
  empty: function(t) {
    return v.empty(t);
  },
  notEmpty: function(t) {
    return !v.empty(t);
  },
  pattern: function(t, e) {
    return new RegExp(e, "g").test(t);
  }
};
function fe(n, t) {
  return (Array.isArray(t) ? t : (t || "").split(".")).forEach(function(e) {
    n != null && (n = n[e]);
  }), n;
}
function Wr(n) {
  for (var t = /{{\s*(.*?)\s*}}/g, e, r = {}; (e = t.exec(n)) !== null; )
    e[1] && (r[e[1]] = !0);
  return Object.keys(r);
}
function un() {
  return {
    props: {},
    on: {},
    options: [],
    children: [],
    hidden: !1,
    display: !0,
    value: void 0
  };
}
function q(n, t) {
  return function(e, r, i) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, o = new pt(n, e, r, i, a);
    return t && (v.Function(t) ? t(o) : o.props(t)), o;
  };
}
function pt(n, t, e, r, i) {
  this._data = C(un(), {
    type: n,
    title: t,
    field: e,
    value: r,
    props: i || {}
  }), this.event = this.on;
}
C(pt.prototype, {
  getRule: function() {
    return this._data;
  },
  setProp: function(t, e) {
    return ee(this._data, t, e), this;
  },
  modelField: function(t) {
    return this._data.modelField = t, this;
  },
  _clone: function() {
    var t = new this.constructor();
    return t._data = dt(this._data), t;
  }
});
function sn(n) {
  n.forEach(function(t) {
    pt.prototype[t] = function(e) {
      return me(this._data, H({}, t, arguments.length < 2 ? e : H({}, e, arguments[1]))), this;
    };
  });
}
sn(Zt());
var Kr = q("");
function Xr(n, t, e) {
  var r = Kr("", t);
  return r._data.type = n, r._data.title = e, r;
}
function Qr() {
  return {
    create: Xr,
    factory: q
  };
}
function Zr(n, t, e) {
  var r = "fail to ".concat(n, " ").concat(e.status, "'"), i = new Error(r);
  return i.status = e.status, i.url = n, i;
}
function Rt(n) {
  var t = n.responseText || n.response;
  if (!t)
    return t;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}
function ln(n) {
  if (!(typeof XMLHttpRequest > "u")) {
    var t = new XMLHttpRequest(), e = n.action;
    t.onerror = function(o) {
      n.onError(o);
    }, t.onload = function() {
      if (t.status < 200 || t.status >= 300)
        return n.onError(Zr(e, n, t), Rt(t));
      n.onSuccess(Rt(t));
    }, t.open(n.method || "get", e, !0);
    var r;
    n.data && ((n.dataType || "").toLowerCase() !== "json" ? (r = new FormData(), Object.keys(n.data).map(function(a) {
      r.append(a, n.data[a]);
    })) : (r = JSON.stringify(n.data), t.setRequestHeader("content-type", "application/json"))), n.withCredentials && "withCredentials" in t && (t.withCredentials = !0);
    var i = n.headers || {};
    Object.keys(i).forEach(function(a) {
      i[a] != null && t.setRequestHeader(a, i[a]);
    }), t.send(r);
  }
}
function Dt(n, t) {
  return new Promise(function(e, r) {
    (t || ln)(_(_({}, n), {}, {
      onSuccess: function(a) {
        var o = function(l) {
          return l;
        }, u = de(n.parse);
        v.Function(u) ? o = u : u && v.String(u) && (o = function(l) {
          return fe(l, u);
        }), e(o(a));
      },
      onError: function(a) {
        r(a);
      }
    }));
  });
}
function De(n) {
  return te(n);
}
function ei(n) {
  function t(a) {
    return v.Undef(a) ? a = n.fields() : Array.isArray(a) || (a = [a]), a;
  }
  function e(a, o, u) {
    t(a).forEach(function(s) {
      n.getCtxs(s).forEach(function(l) {
        ee(l.rule, o, u), n.$render.clearCache(l);
      });
    });
  }
  function r() {
    var a = n.subForm;
    return Object.keys(a).reduce(function(o, u) {
      var s = a[u];
      return s && (Array.isArray(s) ? o.push.apply(o, D(s)) : o.push(s)), o;
    }, []);
  }
  var i = {
    get config() {
      return n.options;
    },
    set config(a) {
      n.fc.options.value = a;
    },
    get options() {
      return n.options;
    },
    set options(a) {
      n.fc.options.value = a;
    },
    get form() {
      return n.form;
    },
    get rule() {
      return n.rules;
    },
    get parent() {
      return n.vm.setupState.parent && n.vm.setupState.parent.setupState.fapi;
    },
    get top() {
      return i.parent ? i.parent.top : i;
    },
    get children() {
      return r();
    },
    get siblings() {
      var a = n.vm.setupState.getGroupInject();
      if (a) {
        var o = a.getSubForm();
        if (Array.isArray(o))
          return D(o);
      }
    },
    get index() {
      var a = i.siblings;
      if (a) {
        var o = a.indexOf(i);
        return o > -1 ? o : void 0;
      }
    },
    formData: function(o) {
      return t(o).reduce(function(u, s) {
        var l = n.getFieldCtx(s);
        return l && (u[l.field] = De(l.rule.value)), u;
      }, n.options.appendValue !== !1 ? De(n.appendData) : {});
    },
    getValue: function(o) {
      var u = n.getFieldCtx(o);
      if (u)
        return De(u.rule.value);
    },
    coverValue: function(o) {
      var u = _({}, o || {});
      n.deferSyncValue(function() {
        n.appendData = {}, i.fields().forEach(function(s) {
          var l = n.fieldCtx[s];
          if (l) {
            var f = x(o, s);
            l.forEach(function(c) {
              c.rule.value = f ? o[s] : void 0;
            }), delete u[s];
          }
        }), C(n.appendData, u);
      }, !0);
    },
    setValue: function(o) {
      var u = o;
      arguments.length >= 2 && (u = H({}, o, arguments[1])), n.deferSyncValue(function() {
        Object.keys(u).forEach(function(s) {
          var l = n.fieldCtx[s];
          if (!l) return n.appendData[s] = u[s];
          l.forEach(function(f) {
            f.rule.value = u[s];
          });
        });
      }, !0);
    },
    removeField: function(o) {
      var u = n.getCtx(o);
      return n.deferSyncValue(function() {
        n.getCtxs(o).forEach(function(s) {
          s.rm();
        });
      }, !0), u ? u.origin : void 0;
    },
    removeRule: function(o) {
      var u = o && be(o);
      if (u)
        return u.rm(), u.origin;
    },
    fields: function() {
      return n.fields();
    },
    append: function(o, u, s) {
      var l = n.sort.length - 1, f, c = n.getCtx(u);
      if (c)
        if (s) {
          if (f = c.getPending("children", c.rule.children), !Array.isArray(f)) return;
          l = c.rule.children.length - 1;
        } else
          l = c.root.indexOf(c.origin), f = c.root;
      else f = n.rules;
      f.splice(l + 1, 0, o);
    },
    prepend: function(o, u, s) {
      var l = 0, f, c = n.getCtx(u);
      if (c)
        if (s) {
          if (f = c.getPending("children", c.rule.children), !Array.isArray(f)) return;
        } else
          l = c.root.indexOf(c.origin), f = c.root;
      else f = n.rules;
      f.splice(l, 0, o);
    },
    hidden: function(o, u) {
      e(u, "hidden", !!o), n.refresh();
    },
    hiddenStatus: function(o) {
      var u = n.getCtx(o);
      if (u)
        return !!u.rule.hidden;
    },
    display: function(o, u) {
      e(u, "display", !!o), n.refresh();
    },
    displayStatus: function(o) {
      var u = n.getCtx(o);
      if (u)
        return !!u.rule.display;
    },
    disabled: function(o, u) {
      t(u).forEach(function(s) {
        n.getCtxs(s).forEach(function(l) {
          ee(l.rule.props, "disabled", !!o);
        });
      }), n.refresh();
    },
    all: function(o) {
      return Object.keys(n.ctxs).map(function(u) {
        var s = n.ctxs[u];
        return o ? s.origin : s.rule;
      });
    },
    model: function(o) {
      return n.fields().reduce(function(u, s) {
        var l = n.fieldCtx[s][0];
        return u[s] = o ? l.origin : l.rule, u;
      }, {});
    },
    component: function(o) {
      return Object.keys(n.nameCtx).reduce(function(u, s) {
        var l = n.nameCtx[s].map(function(f) {
          return o ? f.origin : f.rule;
        });
        return u[s] = l.length === 1 ? l[0] : l, u;
      }, {});
    },
    bind: function() {
      return i.form;
    },
    reload: function(o) {
      n.reloadRule(o);
    },
    updateOptions: function(o) {
      n.fc.updateOptions(o), i.refresh();
    },
    onSubmit: function(o) {
      i.updateOptions({
        onSubmit: o
      });
    },
    sync: function(o) {
      if (Array.isArray(o)) {
        o.forEach(function(s) {
          return i.sync(s);
        });
        return;
      }
      var u = v.Object(o) ? be(o) : n.getCtxs(o);
      u && (u = Array.isArray(u) ? u : [u], u.forEach(function(s) {
        if (!s.deleted) {
          var l = n.subForm[s.id];
          l && (Array.isArray(l) ? l.forEach(function(f) {
            f.refresh();
          }) : l && l.refresh()), n.$render.clearCache(s);
        }
      }), n.refresh());
    },
    refresh: function() {
      r().forEach(function(o) {
        o.refresh();
      }), n.$render.clearCacheAll(), n.refresh();
    },
    refreshOptions: function() {
      n.$manager.updateOptions(n.options), i.refresh();
    },
    hideForm: function(o) {
      n.vm.setupState.isShow = !o;
    },
    changeStatus: function() {
      return n.changeStatus;
    },
    clearChangeStatus: function() {
      n.changeStatus = !1;
    },
    updateRule: function(o, u) {
      n.getCtxs(o).forEach(function(s) {
        C(s.rule, u);
      });
    },
    updateRules: function(o) {
      Object.keys(o).forEach(function(u) {
        i.updateRule(u, o[u]);
      });
    },
    mergeRule: function(o, u) {
      n.getCtxs(o).forEach(function(s) {
        me(s.rule, u);
      });
    },
    mergeRules: function(o) {
      Object.keys(o).forEach(function(u) {
        i.mergeRule(u, o[u]);
      });
    },
    getRule: function(o, u) {
      var s = n.getCtx(o);
      if (s)
        return u ? s.origin : s.rule;
    },
    getRenderRule: function(o) {
      var u = n.getCtx(o);
      if (u)
        return u.prop;
    },
    getRefRule: function(o) {
      var u = n.getCtxs(o);
      if (u) {
        var s = u.map(function(l) {
          return l.rule;
        });
        return s.length === 1 ? s[0] : s;
      }
    },
    setEffect: function(o, u, s) {
      var l = n.getCtx(o);
      l && u && (u[0] === "$" && (u = u.substr(1)), x(l.rule, "$" + u) && ee(l.rule, "$" + u, s), x(l.rule, "effect") || (l.rule.effect = {}), ee(l.rule.effect, u, s));
    },
    clearEffectData: function(o, u) {
      var s = n.getCtx(o);
      s && (u && u[0] === "$" && (u = u.substr(1)), s.clearEffectData(u), i.sync(o));
    },
    updateValidate: function(o, u, s) {
      s ? i.mergeRule(o, {
        validate: u
      }) : e(o, "validate", u);
    },
    updateValidates: function(o, u) {
      Object.keys(o).forEach(function(s) {
        i.updateValidate(s, o[s], u);
      });
    },
    refreshValidate: function() {
      i.refresh();
    },
    resetFields: function(o) {
      t(o).forEach(function(u) {
        n.getCtxs(u).forEach(function(s) {
          n.$render.clearCache(s), s.rule.value = De(s.defaultValue);
        });
      }), Q(function() {
        i.clearValidateState();
      });
    },
    method: function(o, u) {
      var s = i.el(o);
      if (!s || !s[u]) throw new Error(en("err", "".concat(u, " 方法不存在")));
      return function() {
        return s[u].apply(s, arguments);
      };
    },
    exec: function(o, u) {
      for (var s = arguments.length, l = new Array(s > 2 ? s - 2 : 0), f = 2; f < s; f++)
        l[f - 2] = arguments[f];
      return j(function() {
        return i.method(o, u).apply(void 0, l);
      });
    },
    toJson: function(o) {
      return nn(i.rule, o);
    },
    trigger: function(o, u) {
      for (var s = i.el(o), l = arguments.length, f = new Array(l > 2 ? l - 2 : 0), c = 2; c < l; c++)
        f[c - 2] = arguments[c];
      s && s.$emit.apply(s, [u].concat(f));
    },
    el: function(o) {
      var u = n.getCtx(o);
      if (u) return u.el || n.vm.refs[u.ref];
    },
    closeModal: function(o) {
      n.bus.$emit("fc:closeModal:" + o);
    },
    getSubForm: function(o) {
      var u = n.getCtx(o);
      return u ? n.subForm[u.id] : void 0;
    },
    getChildrenRuleList: function(o) {
      var u = L(o) === "object", s = u ? be(o) : n.getCtx(o), l = s ? s.rule : u ? o : i.getRule(o);
      if (!l)
        return [];
      var f = [], c = function(h) {
        h && h.forEach(function(g) {
          L(g) === "object" && (g.field && f.push(g), f.push.apply(f, D(i.getChildrenRuleList(g))));
        });
      };
      return c(s ? s.loadChildrenPending() : l.children), f;
    },
    getParentRule: function(o) {
      var u = L(o) === "object", s = u ? be(o) : n.getCtx(o);
      return s.parent.rule;
    },
    getParentSubRule: function(o) {
      var u = L(o) === "object", s = u ? be(o) : n.getCtx(o);
      if (s) {
        var l = s.getParentGroup();
        if (l)
          return l.rule;
      }
    },
    getChildrenFormData: function(o) {
      var u = i.getChildrenRuleList(o);
      return u.reduce(function(s, l) {
        return s[l.field] = De(l.value), s;
      }, {});
    },
    setChildrenFormData: function(o, u, s) {
      var l = i.getChildrenRuleList(o);
      n.deferSyncValue(function() {
        l.forEach(function(f) {
          x(u, f.field) ? f.value = u[f.field] : s && (f.value = void 0);
        });
      });
    },
    getGlobalEvent: function(o) {
      var u = i.options.globalEvent[o];
      if (u)
        return L(u) === "object" && (u = u.handle), de(u);
    },
    getGlobalData: function(o) {
      return new Promise(function(u, s) {
        var l = i.options.globalData[o];
        l || u(n.fc.loadData[o]), l.type === "fetch" ? i.fetch(l).then(function(f) {
          u(f);
        }).catch(s) : u(l.data);
      });
    },
    nextTick: function(o) {
      n.bus.$once("next-tick", o), n.refresh();
    },
    nextRefresh: function(o) {
      n.nextRefresh(), o && j(o);
    },
    deferSyncValue: function(o, u) {
      n.deferSyncValue(o, u);
    },
    emit: function(o) {
      for (var u, s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), f = 1; f < s; f++)
        l[f - 1] = arguments[f];
      (u = n.vm).emit.apply(u, [o].concat(l));
    },
    bus: n.bus,
    fetch: function(o) {
      return new Promise(function(u, s) {
        o = te(o), o = n.loadFetchVar(o), n.beforeFetch(o).then(function() {
          return Dt(o, n.fc.create.fetch).then(function(l) {
            j(function() {
              return o.onSuccess && o.onSuccess(l);
            }), u(l);
          }).catch(function(l) {
            j(function() {
              return o.onError && o.onError(l);
            }), s(l);
          });
        });
      });
    },
    watchFetch: function(o, u, s) {
      return n.fc.watchLoadData(function(l, f) {
        var c = te(o);
        c = n.loadFetchVar(c, l), n.beforeFetch(c).then(function() {
          return Dt(c, n.fc.create.fetch).then(function(d) {
            j(function() {
              return c.onSuccess && c.onSuccess(d);
            }), u && u(d, f);
          }).catch(function(d) {
            j(function() {
              return c.onError && c.onError(d);
            }), s && s(d);
          });
        });
      });
    },
    getData: function(o, u) {
      return n.fc.getLoadData(o, u);
    },
    setData: function(o, u, s) {
      return n.fc.setData(o, u, s);
    },
    refreshData: function(o) {
      return n.fc.refreshData(o);
    },
    helper: {
      tidyFields: t,
      props: e
    }
  };
  return ["on", "once", "off"].forEach(function(a) {
    i[a] = function() {
      var o;
      (o = n.bus)["$".concat(a)].apply(o, arguments);
    };
  }), i.changeValue = i.changeField = i.setValue, i;
}
function ti(n) {
  C(n.prototype, {
    initCache: function() {
      this.clearCacheAll();
    },
    clearCache: function(e) {
      if (!e.rule.cache) {
        if (!this.cache[e.id]) {
          e.parent && this.clearCache(e.parent);
          return;
        }
        (this.cache[e.id].use === !0 || this.cache[e.id].parent) && this.$handle.refresh(), this.cache[e.id].parent && this.clearCache(this.cache[e.id].parent), this.cache[e.id] = null;
      }
    },
    clearCacheAll: function() {
      this.cache = {};
    },
    setCache: function(e, r, i) {
      this.cache[e.id] = {
        vnode: r,
        use: !1,
        parent: i,
        slot: e.rule.slot
      };
    },
    getCache: function(e) {
      var r = this.cache[e.id];
      if (r)
        return r.use = !0, r.vnode;
    }
  });
}
function fn(n) {
  return n == null ? "" : L(n) === "object" ? JSON.stringify(n, null, 2) : String(n);
}
var ni = 0;
function He() {
  var n = 370 + ++ni;
  return "F" + Math.random().toString(36).substr(3, 3) + Number("".concat(Date.now())).toString(36) + n.toString(36) + "c";
}
function we(n, t, e) {
  var r = n, i;
  return (t || "").split(".").forEach(function(a) {
    i && ((!r[i] || L(r[i]) != "object") && (r[i] = {}), r = r[i]), i = a;
  }), r[i] = e, r;
}
function ri(n) {
  C(n.prototype, {
    initRender: function() {
      this.cacheConfig = {};
    },
    getTypeSlot: function(e) {
      var r = function i(a) {
        if (a) {
          var o = void 0;
          return e.rule.field && (o = a.slots["field-" + Pe(e.rule.field)] || a.slots["field-" + e.rule.field]), o || (o = a.slots["type-" + Pe(e.type)] || a.slots["type-" + e.type]), o || i(a.setupState.parent);
        }
      };
      return r(this.vm);
    },
    render: function() {
      var e = this;
      if (this.vm.setupState.isShow) {
        this.$manager.beforeRender();
        var r = qe();
        return this.sort.forEach(function(i) {
          e.renderSlot(r, e.$handle.ctxs[i]);
        }), this.$manager.render(r);
      }
    },
    renderSlot: function(e, r, i) {
      if (this.isFragment(r)) {
        r.initProp(), this.mergeGlobal(r), r.initNone();
        var a = this.renderChildren(r.loadChildrenPending(), r), o = a.default;
        o && e.setSlot(r.rule.slot, function() {
          return o();
        }), delete a.default, e.mergeBag(a);
      } else
        e.setSlot(r.rule.slot, this.renderCtx(r, i));
    },
    mergeGlobal: function(e) {
      var r = this, i = this.$handle.options.global;
      i && (this.cacheConfig[e.trueType] || (this.cacheConfig[e.trueType] = Lt(function() {
        var a = r.$handle.options.global;
        return me({}, [a["*"], a[e.originType] || a[e.type] || a[e.type] || {}]);
      })), e.prop = me({}, [this.cacheConfig[e.trueType].value, e.prop]));
    },
    setOptions: function(e) {
      var r = e.loadPending({
        key: "options",
        origin: e.prop.options,
        def: []
      });
      e.prop.options = r, e.prop.optionsTo && r && we(e.prop, e.prop.optionsTo, r);
    },
    deepSet: function(e) {
      var r = e.rule.deep;
      r && Object.keys(r).sort(function(i, a) {
        return i.length < a.length ? -1 : 1;
      }).forEach(function(i) {
        we(e.prop, i, r[i]);
      });
    },
    parseSide: function(e, r) {
      return v.Object(e) ? me({
        props: {
          formCreateInject: r.prop.props.formCreateInject
        }
      }, e) : e;
    },
    renderSides: function(e, r, i) {
      var a = r[i ? "rule" : "prop"];
      return [this.renderRule(this.parseSide(a.prefix, r)), e, this.renderRule(this.parseSide(a.suffix, r))];
    },
    renderId: function(e, r) {
      var i = this, a = this.$handle[r === "field" ? "fieldCtx" : "nameCtx"][e];
      return a ? a.map(function(o) {
        return i.renderCtx(o, o.parent);
      }) : void 0;
    },
    renderCtx: function(e, r) {
      var i = this;
      try {
        if (e.type === "hidden") return;
        var a = e.rule;
        if (!this.cache[e.id] || this.cache[e.id].slot !== a.slot) {
          var o;
          e.initProp(), this.mergeGlobal(e), e.initNone(), this.$manager.tidyRule(e), this.deepSet(e), this.setOptions(e), this.ctxProp(e);
          var u = e.prop;
          u.preview = !!(u.preview != null ? u.preview : this.$handle.preview), u.props.formCreateInject = this.injectProp(e);
          var s = u.cache !== !1, l = u.preview;
          if (u.hidden) {
            this.setCache(e, void 0, r);
            return;
          }
          o = function() {
            for (var c = arguments.length, d = new Array(c), h = 0; h < c; h++)
              d[h] = arguments[h];
            var g = {
              rule: a,
              prop: u,
              preview: l,
              api: i.$handle.api,
              model: u.model || {},
              slotValue: d
            };
            d.length && a.slotUpdate && j(function() {
              return a.slotUpdate(g);
            });
            var b = {}, V = e.loadChildrenPending();
            e.parser.renderChildren ? b = e.parser.renderChildren(V, e) : e.parser.loadChildren !== !1 && (b = i.renderChildren(V, e));
            var F = i.getTypeSlot(e), E;
            return F ? (g.children = b, E = F(g)) : E = l ? e.parser.preview(it(b), e) : e.parser.render(it(b), e), E = i.renderSides(E, e), !(!e.input && v.Undef(u.native)) && u.native !== !0 && (i.fc.targetFormDriver("updateWrap", e), E = i.$manager.makeWrap(e, E)), e.none && (Array.isArray(E) ? E = E.map(function(P) {
              return !P || !P.__v_isVNode ? P : i.none(P);
            }) : E = i.none(E)), s && i.setCache(e, function() {
              return i.stable(E);
            }, r), E;
          }, this.setCache(e, o, r);
        }
        return function() {
          var f = i.getCache(e);
          if (f)
            return f.apply(void 0, arguments);
          if (i.cache[e.id])
            return;
          var c = i.renderCtx(e, e.parent);
          if (c)
            return c();
        };
      } catch (f) {
        console.error(f);
        return;
      }
    },
    none: function(e) {
      if (e)
        return Array.isArray(e.props.class) ? e.props.class.push("fc-none") : e.props.class = e.props.class ? [e.props.class, "fc-none"] : "fc-none", e;
    },
    stable: function(e) {
      var r = this, i = Array.isArray(e) ? e : [e];
      return i.forEach(function(a) {
        a && a.__v_isVNode && a.children && L(a.children) === "object" && (a.children.$stable = !0, r.stable(a.children));
      }), e;
    },
    getModelField: function(e) {
      return e.prop.modelField || e.parser.modelField || this.fc.modelFields[this.vNode.aliasMap[e.type]] || this.fc.modelFields[e.type] || this.fc.modelFields[e.originType] || "modelValue";
    },
    isFragment: function(e) {
      return e.type === "fragment" || e.type === "template";
    },
    injectProp: function(e) {
      var r = this, i = this.vm.setupState;
      i.ctxInject[e.id] || (i.ctxInject[e.id] = {
        api: this.$handle.api,
        form: this.fc.create,
        subForm: function(u) {
          r.$handle.addSubForm(e, u);
        },
        getSubForm: function() {
          return r.$handle.subForm[e.id];
        },
        options: [],
        children: [],
        preview: !1,
        id: e.id,
        field: e.field,
        rule: e.rule,
        input: e.input,
        updateValue: function(u) {
          r.$handle.onUpdateValue(e, u);
        }
      });
      var a = i.ctxInject[e.id];
      return C(a, {
        preview: e.prop.preview,
        options: e.prop.options,
        children: e.loadChildrenPending()
      }), a;
    },
    ctxProp: function(e) {
      var r = this, i = e.ref, a = e.key, o = e.rule;
      this.$manager.mergeProp(e), e.parser.mergeProp(e);
      var u = [{
        ref: i,
        key: o.key || "".concat(a, "fc"),
        slot: void 0,
        on: {
          vnodeMounted: function(c) {
            c.el.__rule__ = e.rule, r.onMounted(e, c.el);
          },
          "fc.updateValue": function(c) {
            r.$handle.onUpdateValue(e, c);
          },
          "fc.el": function(c) {
            e.exportEl = c, c && ((c.$el || c).__rule__ = e.rule);
          }
        }
      }];
      if (e.input) {
        this.vm.props.disabled === !0 && (e.prop.props.disabled = !0);
        var s = this.getModelField(e), l = {
          callback: function(c) {
            r.onInput(e, c);
          },
          value: this.$handle.getFormData(e)
        };
        u.push({
          on: _(H({}, "update:".concat(s), l.callback), e.prop.modelEmit ? H({}, e.prop.modelEmit, function() {
            return r.onEmitInput(e);
          }) : {}),
          props: H({}, s, l.value)
        }), e.prop.model = l;
      }
      return he(u, e.prop), e.prop;
    },
    onMounted: function(e, r) {
      e.el = this.vm.refs[e.ref] || r, e.parser.mounted(e), this.$handle.effect(e, "mounted");
    },
    onInput: function(e, r) {
      if (e.prop.modelEmit) {
        this.$handle.onBaseInput(e, r);
        return;
      }
      this.$handle.onInput(e, r);
    },
    onEmitInput: function(e) {
      this.$handle.setValue(e, e.parser.toValue(e.modelValue, e), e.modelValue);
    },
    renderChildren: function(e, r) {
      var i = this;
      if (!v.trueArray(e)) return {};
      var a = qe();
      return e.map(function(o) {
        if (o) {
          if (v.String(o)) return a.setSlot(null, o);
          if (o.__fc__)
            return i.renderSlot(a, o.__fc__, r);
          o.type && Q(function() {
            i.$handle.loadChildren(e, r), i.$handle.refresh();
          });
        }
      }), a.getSlots();
    },
    defaultRender: function(e, r) {
      var i = e.prop;
      return i.component ? typeof i.component == "string" ? this.vNode.make(i.component, i, r) : this.vNode.makeComponent(i.component, i, r) : this.vNode[e.type] ? this.vNode[e.type](i, r) : this.vNode[e.originType] ? this.vNode[e.originType](i, r) : this.vNode.make(tn(i.type), i, r);
    },
    renderRule: function(e, r, i) {
      var a = this;
      if (e) {
        if (v.String(e)) return e;
        var o;
        if (i)
          o = e.type;
        else if (o = e.is, e.type) {
          o = ne(e.type);
          var u = this.vNode.aliasMap[o];
          u && (o = ne(u));
        }
        if (o) {
          var s = qe();
          v.trueArray(e.children) && e.children.forEach(function(f) {
            f && s.setSlot(f == null ? void 0 : f.slot, function() {
              return a.renderRule(f);
            });
          });
          var l = _({}, e);
          return delete l.type, delete l.is, this.vNode.make(o, l, s.mergeBag(r).getSlots());
        }
      }
    }
  });
}
var ii = 1;
function ht(n) {
  C(this, {
    $handle: n,
    fc: n.fc,
    vm: n.vm,
    $manager: n.$manager,
    vNode: new n.fc.CreateNode(n.vm),
    id: ii++
  }), on(this, {
    options: function() {
      return n.options;
    },
    sort: function() {
      return n.sort;
    }
  }), this.initCache(), this.initRender();
}
ti(ht);
ri(ht);
function ai(n) {
  C(n.prototype, {
    parseInjectEvent: function(e, r) {
      var i = e.inject || this.options.injectEvent;
      return this.parseEventLst(e, r, i);
    },
    parseEventLst: function(e, r, i, a) {
      var o = this;
      return Object.keys(r).forEach(function(u) {
        var s = o.parseEvent(e, r[u], i, a);
        s && (r[u] = s);
      }), r;
    },
    parseEvent: function(e, r, i, a) {
      if (v.Function(r) && (i !== !1 && !v.Undef(i) || r.__inject))
        return this.inject(e, r, i);
      if (!a && Array.isArray(r) && r[0] && (v.String(r[0]) || v.Function(r[0])))
        return this.parseEventLst(e, r, i, !0);
      if (v.String(r)) {
        var o = de(r);
        if (o && r !== o)
          return o.__inject ? this.parseEvent(e, o, i, !0) : o;
      }
    },
    parseEmit: function(e) {
      var r = this, i = {}, a = e.rule, o = a.emitPrefix, u = a.field, s = a.name, l = a.inject, f = a.emit || [];
      return v.trueArray(f) && f.forEach(function(c) {
        if (c) {
          var d, h = o || u || s;
          if (v.Object(c) && (d = c.inject, c = c.name, h = c.prefix || h), h) {
            var g = Pe("".concat(h, "-").concat(c)), b = function() {
              var E, P, z;
              r.vm.emitsOptions && (r.vm.emitsOptions[g] = null);
              for (var T = arguments.length, W = new Array(T), R = 0; R < T; R++)
                W[R] = arguments[R];
              (E = r.vm).emit.apply(E, [g].concat(W)), (P = r.vm).emit.apply(P, ["emit-event", g].concat(W)), (z = r.bus).$emit.apply(z, [g].concat(W));
            };
            if (b.__emit = !0, !d && l === !1)
              i[c] = b;
            else {
              var V = d || l || r.options.injectEvent;
              i[c] = v.Undef(V) ? b : r.inject(a, b, V);
            }
          }
        }
      }), e.computed.on = i, i;
    },
    getInjectData: function(e, r) {
      var i = e.__fc__ && e.__fc__.$api, a = e.__fc__ && e.__fc__.$handle.vm || this.vm.props, o = a.props, u = o.option, s = o.rule;
      return {
        $f: i || this.api,
        api: i || this.api,
        rule: s,
        self: e.__origin__,
        option: u,
        inject: r
      };
    },
    inject: function(e, r, i) {
      if (r.__origin) {
        if (this.watching && !this.loading) return r;
        r = r.__origin;
      }
      var a = this, o = function() {
        for (var s = a.getInjectData(e, i), l = arguments.length, f = new Array(l), c = 0; c < l; c++)
          f[c] = arguments[c];
        return s.args = [].concat(f), f.unshift(s), r.apply(this, f);
      };
      return o.__origin = r, o.__json = r.__json, o;
    },
    loadStrVar: function(e, r) {
      var i = this;
      if (e && typeof e == "string" && e.indexOf("{{") > -1 && e.indexOf("}}") > -1) {
        var a = e, o = Wr(e), u;
        if (o.forEach(function(s) {
          var l = s.split("||"), f = l[0].trim();
          if (f) {
            var c = (l[1] || "").trim(), d = r ? r(f, c) : i.fc.getLoadData(f, c);
            u = d, e = e.replaceAll("{{".concat(s, "}}"), d ?? "");
          }
        }), o.length === 1 && a === "{{".concat(o[0], "}}"))
          return u;
      }
      return e;
    },
    loadFetchVar: function(e, r) {
      var i = this, a = function(l) {
        return i.loadStrVar(l, r);
      };
      if (e.action = a(e.action), e.headers) {
        var o = {};
        Object.keys(e.headers).forEach(function(s) {
          o[a(s)] = a(e.headers[s]);
        }), e.headers = o;
      }
      if (e.data) {
        var u = {};
        Object.keys(e.data).forEach(function(s) {
          u[a(s)] = a(e.data[s]);
        }), e.data = u;
      }
      return e;
    }
  });
}
var At = ["hook:updated", "hook:mounted"];
function oi(n) {
  C(n.prototype, {
    usePage: function() {
      var e = this, r = this.options.page;
      if (r) {
        var i = 25, a = ui(this.rules);
        v.Object(r) && (r.first && (i = parseInt(r.first, 10) || i), r.limit && (a = parseInt(r.limit, 10) || a)), C(this, {
          first: i,
          limit: a,
          pageEnd: this.rules.length <= i
        }), this.bus.$on("page-end", function() {
          return e.vm.emit("page-end", e.api);
        }), this.pageLoad();
      }
    },
    pageLoad: function() {
      var e = this, r = function i() {
        e.pageEnd ? (e.bus.$off(At, i), e.bus.$emit("page-end")) : (e.first += e.limit, e.pageEnd = e.rules.length <= e.first, e.loadRule(), e.refresh());
      };
      this.bus.$on(At, r);
    }
  });
}
function ui(n) {
  return n.length < 31 ? 31 : Math.ceil(n.length / 3);
}
function si(n) {
  C(n.prototype, {
    clearNextTick: function() {
      this.nextTick && clearTimeout(this.nextTick), this.nextTick = null;
    },
    bindNextTick: function(e) {
      var r = this;
      this.clearNextTick(), this.nextTick = setTimeout(function() {
        e(), r.nextTick = null;
      }, 10);
    },
    render: function() {
      return ++this.loadedId, this.vm.setupState.unique > 0 ? this.$render.render() : (this.vm.setupState.unique = 1, []);
    }
  });
}
function li(n) {
  Object.defineProperties(n.origin, {
    __fc__: rn(_e(n), !0)
  });
}
function cn(n, t, e) {
  var r = He(), i = !!t.field;
  C(this, {
    id: r,
    ref: r,
    wrapRef: r + "fi",
    rule: t,
    origin: t.__origin__ || t,
    name: t.name,
    pending: {},
    none: !1,
    watch: [],
    linkOn: [],
    root: [],
    ctrlRule: [],
    children: [],
    parent: null,
    group: t.subRule ? this : null,
    cacheConfig: null,
    prop: _({}, t),
    computed: {},
    payload: {},
    refRule: {},
    input: i,
    el: void 0,
    exportEl: void 0,
    defaultValue: i ? te(e) : void 0,
    field: t.field || void 0
  }), this.updateKey(), li(this), this.update(n, !0);
}
C(cn.prototype, {
  getParentGroup: function() {
    for (var t = this.parent; t; ) {
      if (t.group)
        return t;
      t = t.parent;
    }
  },
  loadChildrenPending: function() {
    var t = this, e = this.rule.children || [];
    return Array.isArray(e) ? e : this.loadPending({
      key: "children",
      origin: e,
      def: [],
      onLoad: function(i) {
        t.$handle && t.$handle.loadChildren(i, t);
      },
      onUpdate: function(i, a) {
        t.$handle && (i === a ? t.$handle.loadChildren(i, t) : t.$handle.updateChildren(t, i, a));
      },
      onReload: function(i) {
        t.$handle ? t.$handle.updateChildren(t, [], i) : delete t.pending.children;
      }
    });
  },
  loadPending: function(t) {
    var e = this, r = t.key, i = t.origin, a = t.def, o = t.onLoad, u = t.onReload, s = t.onUpdate;
    if (this.pending[r] && this.pending[r].origin === i)
      return this.getPending(r, a);
    delete this.pending[r];
    var l = i;
    if (v.Function(i)) {
      var f = j(function() {
        return i({
          rule: e.rule,
          api: e.$api,
          update: function(d) {
            var h = d || a, g = e.getPending(r, a);
            e.setPending(r, i, h), s && s(h, g);
          },
          reload: function() {
            var d = e.getPending(r, a);
            delete e.pending[r], u && u(d), e.$api && e.$api.sync(e.rule);
          }
        });
      });
      f && v.Function(f.then) ? (f.then(function(c) {
        var d = c || a;
        e.setPending(r, i, d), o && o(d), e.$api && e.$api.sync(e.rule);
      }).catch(function(c) {
        console.error(c);
      }), l = a, this.setPending(r, i, l)) : (l = f || a, this.setPending(r, i, l), o && o(l));
    }
    return l;
  },
  getPending: function(t, e) {
    return this.pending[t] && this.pending[t].value || e;
  },
  setPending: function(t, e, r) {
    this.pending[t] = {
      origin: e,
      value: ce(r)
    };
  },
  effectData: function(t) {
    return this.payload[t] || (this.payload[t] = {}), this.payload[t];
  },
  clearEffectData: function(t) {
    t === void 0 ? this.payload = {} : delete this.payload[t];
  },
  updateKey: function(t) {
    this.key = He(), t && this.parent && this.parent.updateKey(t);
  },
  updateType: function() {
    this.originType = this.rule.type, this.type = ne(this.rule.type), this.trueType = this.$handle.getType(this.originType);
  },
  setParser: function(t) {
    this.parser = t, t.init(this);
  },
  initProp: function() {
    var t = this, e = _({}, this.rule);
    delete e.children, this.prop = me({}, [e].concat(D(Object.keys(this.payload).map(function(r) {
      return t.payload[r];
    })), [this.computed]));
  },
  initNone: function() {
    this.none = !(v.Undef(this.prop.display) || this.prop.display);
  },
  injectValidate: function() {
    var t = this;
    return X(this.prop.validate).map(function(e) {
      if (v.Function(e.validator)) {
        var r = _({}, e), i = t;
        return r.validator = function() {
          for (var a, o = arguments.length, u = new Array(o), s = 0; s < o; s++)
            u[s] = arguments[s];
          return (a = e.validator).call.apply(a, [{
            that: this,
            id: i.id,
            field: i.field,
            rule: i.rule,
            api: i.$handle.api
          }].concat(u));
        }, r;
      }
      return e;
    });
  },
  check: function(t) {
    return this.vm === t.vm;
  },
  unwatch: function() {
    this.watch.forEach(function(t) {
      return t();
    }), this.watch = [], this.refRule = {};
  },
  unlink: function() {
    this.linkOn.forEach(function(t) {
      return t();
    }), this.linkOn = [];
  },
  link: function() {
    this.unlink(), this.$handle.appendLink(this);
  },
  watchTo: function() {
    this.$handle.watchCtx(this);
  },
  delete: function() {
    this.unwatch(), this.unlink(), this.rmCtrl(), this.parent && this.parent.children.splice(this.parent.children.indexOf(this) >>> 0, 1), C(this, {
      deleted: !0,
      computed: {},
      parent: null,
      children: [],
      cacheConfig: null,
      none: !1
    });
  },
  rmCtrl: function() {
    this.ctrlRule.forEach(function(t) {
      return t.__fc__ && t.__fc__.rm();
    }), this.ctrlRule = [];
  },
  rm: function() {
    var t = this, e = function() {
      var i = t.root.indexOf(t.origin);
      i > -1 && (t.root.splice(i, 1), t.$handle && t.$handle.refresh());
    };
    if (this.deleted) {
      e();
      return;
    }
    this.$handle.noWatch(function() {
      t.$handle.deferSyncValue(function() {
        t.rmCtrl(), e(), t.$handle.rmCtx(t), C(t, {
          root: []
        });
      }, t.input);
    });
  },
  update: function(t, e) {
    C(this, {
      deleted: !1,
      $handle: t,
      $render: t.$render,
      $api: t.api,
      vm: t.vm,
      vNode: t.$render.vNode,
      updated: !1,
      cacheValue: this.rule.value
    }), !e && this.unwatch(), this.watchTo(), this.link(), this.updateType();
  }
});
function fi(n) {
  C(n.prototype, {
    nextRefresh: function(e) {
      var r = this, i = this.loadedId;
      Q(function() {
        i === r.loadedId && (e ? e() : r.refresh());
      });
    },
    parseRule: function(e) {
      var r = this, i = Ot(e);
      return Object.defineProperties(i, {
        __origin__: rn(e, !0)
      }), ci(i), this.appendValue(i), [i, i.prefix, i.suffix].forEach(function(a) {
        a && r.loadFn(a, i);
      }), this.loadCtrl(i), i.update && (i.update = de(i.update)), i;
    },
    loadFn: function(e, r) {
      var i = this;
      ["on", "props", "deep"].forEach(function(a) {
        e[a] && i.parseInjectEvent(r, e[a]);
      });
    },
    loadCtrl: function(e) {
      e.control && e.control.forEach(function(r) {
        r.handle && (r.handle = de(r.handle));
      });
    },
    syncProp: function(e) {
      var r = this, i = e.rule;
      v.trueArray(i.sync) && he([{
        on: i.sync.reduce(function(a, o) {
          return a["update:".concat(o)] = function(u) {
            i.props[o] = u, r.vm.emit("sync", o, u, i, r.fapi);
          }, a;
        }, {})
      }], e.computed);
    },
    loadRule: function() {
      var e = this;
      this.cycleLoad = !1, this.loading = !0, this.pageEnd && this.bus.$emit("load-start"), this.deferSyncValue(function() {
        if (e._loadRule(e.rules), e.loading = !1, e.cycleLoad && e.pageEnd)
          return e.loadRule();
        e.syncForm(), e.pageEnd && e.bus.$emit("load-end"), e.vm.setupState.renderRule();
      });
    },
    loadChildren: function(e, r) {
      if (this.cycleLoad = !1, this.loading = !0, this.bus.$emit("load-start"), this._loadRule(e, r), this.loading = !1, this.cycleLoad)
        return this.loadRule();
      this.syncForm(), this.bus.$emit("load-end"), this.$render.clearCache(r);
    },
    _loadRule: function(e, r) {
      var i = this, a = function s(l) {
        var f = e[l - 1];
        if (!f || !f.__fc__)
          return l > 0 ? s(l - 1) : -1;
        var c = i.sort.indexOf(f.__fc__.id);
        return c > -1 ? c : s(l - 1);
      }, o = function(l, f) {
        v.trueArray(l) && i._loadRule(l, f);
      }, u = e.map(function(s, l) {
        if (!(r && !v.Object(s)) && !(!i.pageEnd && !r && l >= i.first)) {
          if (s.__fc__ && s.__fc__.root === e && i.ctxs[s.__fc__.id])
            return o(s.__fc__.loadChildrenPending(), s.__fc__), s.__fc__;
          var f = Ot(s), c = function() {
            return !!(f.field && i.fieldCtx[f.field] && i.fieldCtx[f.field][0] !== s.__fc__);
          };
          i.fc.targetFormDriver("loadRule", {
            rule: f,
            api: i.api
          }, i.fc), i.ruleEffect(f, "init", {
            repeat: c()
          }), c() && i.vm.emit("repeat-field", s, i.api);
          var d, h = !1, g = !!s.__fc__, b = f.value;
          if (g) {
            if (d = s.__fc__, b = d.defaultValue, d.deleted) {
              if (Pt(d))
                return;
              d.update(i);
            } else if (!d.check(i)) {
              if (Pt(d))
                return;
              e[l] = s = s._clone ? s._clone() : dt(s), d = null, h = !0;
            }
          }
          if (d)
            d.originType !== d.rule.type && d.updateType(), i.bindParser(d), i.appendValue(d.rule), d.parent && d.parent !== r && i.rmSubRuleData(d);
          else {
            var V = i.parseRule(s);
            d = new cn(i, V, b), i.bindParser(d);
          }
          i.parseEmit(d), i.syncProp(d), d.parent = r || null, d.root = e, i.setCtx(d), !h && !g && i.effect(d, "load"), i.effect(d, "created");
          var F = d.loadChildrenPending();
          if (d.parser.loadChildren === !1 || o(F, d), !r) {
            var E = a(l);
            E > -1 || !l ? i.sort.splice(E + 1, 0, d.id) : i.sort.push(d.id);
          }
          var P = d.rule;
          return d.updated || (d.updated = !0, v.Function(P.update) && i.bus.$once("load-end", function() {
            i.refreshUpdate(d, P.value, "init");
          }), i.effect(d, "loaded")), i.refreshControl(d) && (i.cycleLoad = !0), d;
        }
      }).filter(function(s) {
        return !!s;
      });
      r && (r.children = u);
    },
    refreshControl: function(e) {
      return e.input && e.rule.control && this.useCtrl(e);
    },
    useCtrl: function(e) {
      var r = this, i = di(e), a = [], o = this.api;
      if (!i.length) return !1;
      for (var u = function(h) {
        var g = i[h], b = g.handle || function(F) {
          return ($e[g.condition || "=="] || $e["=="])(F, g.value);
        };
        if (!v.trueArray(g.rule)) return "continue";
        var V = _(_({}, g), {}, {
          valid: j(function() {
            return b(e.rule.value, o);
          }),
          ctrl: pi(e, g.rule),
          isHidden: v.String(g.rule[0])
        });
        if (V.valid && V.ctrl || !V.valid && !V.ctrl && !V.isHidden) return "continue";
        a.push(V);
      }, s = 0; s < i.length; s++)
        var l = u(s);
      if (!a.length) return !1;
      var f = [], c = !1;
      return this.deferSyncValue(function() {
        a.reverse().forEach(function(d) {
          var h = d.isHidden, g = d.valid, b = d.rule, V = d.prepend, F = d.append, E = d.child, P = d.ctrl, z = d.method;
          if (h) {
            g ? e.ctrlRule.push({
              __ctrl: !0,
              children: b,
              valid: g
            }) : e.ctrlRule.splice(e.ctrlRule.indexOf(P), 1), f[g ? "push" : "unshift"](function() {
              z === "disabled" ? r.api.disabled(!g, b) : z === "display" ? r.api.display(g, b) : z === "required" ? (b.forEach(function(R) {
                r.api.setEffect(R, "required", g);
              }), g || r.api.clearValidateState(b)) : r.api.hidden(!g, b);
            });
            return;
          }
          if (g) {
            c = !0;
            var T = {
              type: "fragment",
              native: !0,
              __ctrl: !0,
              children: b
            };
            e.ctrlRule.push(T), r.bus.$once("load-start", function() {
              V ? o.prepend(T, V, E) : F || E ? o.append(T, F || e.id, E) : e.root.splice(e.root.indexOf(e.origin) + 1, 0, T);
            });
          } else {
            e.ctrlRule.splice(e.ctrlRule.indexOf(P), 1);
            var W = be(P);
            W && W.rm();
          }
        });
      }), f.length && (this.loading ? f.length && this.bus.$once("load-end", function() {
        f.forEach(function(d) {
          return d();
        });
      }) : f.length && Q(function() {
        f.forEach(function(d) {
          return d();
        });
      })), this.vm.emit("control", e.origin, this.api), this.effect(e, "control"), c;
    },
    reloadRule: function(e) {
      return this._reloadRule(e);
    },
    _reloadRule: function(e) {
      var r = this;
      e || (e = this.rules);
      var i = _({}, this.ctxs);
      this.clearNextTick(), this.initData(e), this.fc.rules = e, this.deferSyncValue(function() {
        r.bus.$once("load-end", function() {
          Object.keys(i).filter(function(a) {
            return r.ctxs[a] === void 0;
          }).forEach(function(a) {
            return r.rmCtx(i[a]);
          }), r.$render.clearCacheAll();
        }), r.reloading = !0, r.loadRule(), r.reloading = !1, r.refresh(), r.bus.$emit("reloading", r.api);
      }), this.bus.$off("next-tick", this.nextReload), this.bus.$once("next-tick", this.nextReload), this.bus.$emit("update", this.api);
    },
    //todo 组件生成全部通过 alias
    refresh: function() {
      this.vm.setupState.refresh();
    }
  });
}
function ci(n) {
  var t = un();
  return Object.keys(t).forEach(function(e) {
    x(n, e) || (n[e] = t[e]);
  }), n;
}
function di(n) {
  var t = n.rule.control || [];
  return v.Object(t) ? [t] : t;
}
function pi(n, t) {
  for (var e = 0; e < n.ctrlRule.length; e++) {
    var r = n.ctrlRule[e];
    if (r.children === t) return r;
  }
}
function Pt(n) {
  return !!n.rule.__ctrl;
}
function hi(n) {
  C(n.prototype, {
    setValue: function(e, r, i, a) {
      e.deleted || (e.rule.value = r, this.changeStatus = !0, this.nextRefresh(), this.$render.clearCache(e), this.setFormData(e, i), this.syncValue(), this.valueChange(e, r), this.vm.emit("change", e.field, r, e.origin, this.api, a || !1), this.effect(e, "value"), this.emitEvent("change", e.field, r, {
        rule: e.origin,
        api: this.api,
        setFlag: a || !1
      }));
    },
    onInput: function(e, r) {
      var i;
      e.input && (this.isQuote(e, i = e.parser.toValue(r, e)) || this.isChange(e, r)) && this.setValue(e, i, r);
    },
    onUpdateValue: function(e, r) {
      var i = this;
      this.deferSyncValue(function() {
        var a = e.getParentGroup(), o = a ? i.subRuleData[a.id] : null, u = {};
        Object.keys(r || {}).forEach(function(s) {
          o && x(o, s) ? u[s] = r[s] : x(i.api.form, s) ? i.api.form[s] = r[s] : i.api.top !== i.api && x(i.api.top.form, s) && (i.api.top.form[s] = r[s]);
        }), Object.keys(u).length && i.api.setChildrenFormData(a.rule, u);
      });
    },
    onBaseInput: function(e, r) {
      this.setFormData(e, r), e.modelValue = r, this.nextRefresh(), this.$render.clearCache(e);
    },
    setFormData: function(e, r) {
      e.modelValue = r;
      var i = e.getParentGroup();
      i && (this.subRuleData[i.id] || (this.subRuleData[i.id] = {}), this.subRuleData[i.id][e.field] = e.rule.value), ee(this.formData, e.id, r);
    },
    rmSubRuleData: function(e) {
      var r = e.getParentGroup();
      r && this.subRuleData[r.id] && delete this.subRuleData[r.id][e.field];
    },
    getFormData: function(e) {
      return this.formData[e.id];
    },
    syncForm: function() {
      var e = this, r = ce({}), i = this.fields();
      this.options.appendValue !== !1 && Object.keys(this.appendData).reduce(function(a, o) {
        return i.indexOf(o) === -1 && (a[o] = K(e.appendData, o)), a;
      }, r), i.reduce(function(a, o) {
        var u = e.getCtx(o);
        return a[o] = K(u.rule, "value"), a;
      }, r), this.form = r, this.syncValue();
    },
    appendValue: function(e) {
      (!e.field || !x(this.appendData, e.field)) && !this.options.forceCoverValue || (e.value = this.appendData[e.field], delete this.appendData[e.field]);
    },
    addSubForm: function(e, r) {
      this.subForm[e.id] = r;
    },
    deferSyncValue: function(e, r) {
      this.deferSyncFn || (this.deferSyncFn = e), this.deferSyncFn.sync || (this.deferSyncFn.sync = r), j(e), this.deferSyncFn === e && (this.deferSyncFn = null, e.sync && this.syncForm());
    },
    syncValue: function() {
      if (this.deferSyncFn)
        return this.deferSyncFn.sync = !0;
      this.vm.setupState.updateValue(_({}, this.form));
    },
    isChange: function(e, r) {
      return JSON.stringify(this.getFormData(e), jt) !== JSON.stringify(r, jt);
    },
    isQuote: function(e, r) {
      return (v.Object(r) || Array.isArray(r)) && r === e.rule.value;
    },
    refreshUpdate: function(e, r, i, a) {
      var o = this;
      if (v.Function(e.rule.update)) {
        var u = j(function() {
          return e.rule.update(r, e.origin, o.api, {
            origin: i || "change",
            linkField: a
          });
        });
        if (u === void 0) return;
        e.rule.hidden = u === !0;
      }
    },
    valueChange: function(e, r) {
      this.refreshRule(e, r), this.bus.$emit("change-" + e.field, r);
    },
    refreshRule: function(e, r, i, a) {
      this.refreshControl(e) && (this.$render.clearCacheAll(), this.loadRule(), this.bus.$emit("update", this.api), this.refresh()), this.refreshUpdate(e, r, i, a);
    },
    appendLink: function(e) {
      var r = this, i = e.rule.link;
      v.trueArray(i) && i.forEach(function(a) {
        var o = function() {
          return r.refreshRule(e, e.rule.value, "link", a);
        };
        r.bus.$on("change-" + a, o), e.linkOn.push(function() {
          return r.bus.$off("change-" + a, o);
        });
      });
    },
    fields: function() {
      return Object.keys(this.fieldCtx);
    }
  });
}
function jt(n, t) {
  return typeof t == "function" ? "" + t : t;
}
var ke = {
  init: function(t) {
  },
  toFormValue: function(t, e) {
    return t;
  },
  toValue: function(t, e) {
    return t;
  },
  mounted: function(t) {
  },
  render: function(t, e) {
    return e.$handle.fc.renderDriver && e.$handle.fc.renderDriver.defaultRender ? e.$handle.fc.renderDriver.defaultRender(e, t) : e.$render.defaultRender(e, t);
  },
  preview: function(t, e) {
    return e.$handle.fc.renderDriver && e.$handle.fc.renderDriver.defaultPreview ? e.$handle.fc.renderDriver.defaultPreview(e, t) : this.render(t, e);
  },
  mergeProp: function(t) {
  }
}, mi = ["field", "value", "vm", "template", "name", "config", "control", "inject", "sync", "payload", "optionsTo", "update", "slotUpdate", "computed", "component", "cache"];
function vi(n) {
  C(n.prototype, {
    getCtx: function(e) {
      return this.getFieldCtx(e) || this.getNameCtx(e)[0] || this.ctxs[e];
    },
    getCtxs: function(e) {
      return this.fieldCtx[e] || this.nameCtx[e] || (this.ctxs[e] ? [this.ctxs[e]] : []);
    },
    setIdCtx: function(e, r, i) {
      var a = "".concat(i, "Ctx");
      this[a][r] ? this[a][r].push(e) : this[a][r] = [e];
    },
    rmIdCtx: function(e, r, i) {
      var a = "".concat(i, "Ctx"), o = this[a][r];
      if (!o) return !1;
      var u = o.splice(o.indexOf(e) >>> 0, 1).length > 0;
      return o.length || delete this[a][r], u;
    },
    getFieldCtx: function(e) {
      return (this.fieldCtx[e] || [])[0];
    },
    getNameCtx: function(e) {
      return this.nameCtx[e] || [];
    },
    setCtx: function(e) {
      var r = e.id, i = e.field, a = e.name, o = e.rule;
      this.ctxs[r] = e, a && this.setIdCtx(e, a, "name"), e.input && (this.setIdCtx(e, i, "field"), this.setFormData(e, e.parser.toFormValue(o.value, e)), this.isMounted && !this.reloading && this.vm.emit("change", e.field, o.value, e.origin, this.api));
    },
    getParser: function(e) {
      var r = this.fc.parsers, i = this.fc.renderDriver;
      if (i) {
        var a = i.parsers || {}, o = a[e.originType] || a[ne(e.type)] || a[e.trueType];
        if (o)
          return o;
      }
      return r[e.originType] || r[ne(e.type)] || r[e.trueType] || ke;
    },
    bindParser: function(e) {
      e.setParser(this.getParser(e));
    },
    getType: function(e) {
      var r = this.fc.CreateNode.aliasMap, i = r[e] || r[ne(e)] || e;
      return ne(i);
    },
    noWatch: function(e) {
      this.noWatchFn || (this.noWatchFn = e), j(e), this.noWatchFn === e && (this.noWatchFn = null);
    },
    watchCtx: function(e) {
      var r = this, i = Zt();
      if (i.filter(function(o) {
        return o[0] !== "_" && o[0] !== "$" && mi.indexOf(o) === -1;
      }).forEach(function(o) {
        var u = K(e.rule, o), s = o === "children";
        e.refRule[o] = u, e.watch.push(J(s ? function() {
          return v.Function(u.value) ? u.value : D(u.value || []);
        } : function() {
          return u.value;
        }, function(l, f) {
          var c = u.value;
          if (!r.isBreakWatch()) {
            if (s && e.parser.loadChildren === !1) {
              r.$render.clearCache(e), r.nextRefresh();
              return;
            }
            if (r.watching = !0, o === "link") {
              e.link();
              return;
            } else ["props", "on", "deep"].indexOf(o) > -1 ? (r.parseInjectEvent(e.rule, c || {}), o === "props" && e.input && r.setFormData(e, e.parser.toFormValue(e.rule.value, e))) : o === "emit" ? r.parseEmit(e) : o === "hidden" && !!c != !!f ? r.$render.clearCacheAll() : ["prefix", "suffix"].indexOf(o) > -1 ? c && r.loadFn(c, e.rule) : o === "type" ? (e.updateType(), r.bindParser(e)) : s && (v.Function(f) && (f = e.getPending("children", [])), v.Function(c) && (c = e.loadChildrenPending()), r.updateChildren(e, c, f));
            r.$render.clearCache(e), r.refresh(), r.watching = !1;
          }
        }, {
          deep: !s,
          sync: s
        }));
      }), e.input) {
        var a = K(e.rule, "value");
        e.watch.push(J(function() {
          return a.value;
        }, function() {
          var o = e.parser.toFormValue(a.value, e);
          r.isChange(e, o) && r.setValue(e, a.value, o, !0);
        }));
      }
      this.bus.$once("load-end", function() {
        var o = e.rule.computed;
        o && (L(o) !== "object" && (o = {
          value: o
        }), Object.keys(o).forEach(function(u) {
          var s = Lt(function() {
            var f = o[u];
            if (f)
              return r.compute(e, f);
          }), l = function(c) {
            u === "value" ? r.onInput(e, c) : u[0] === "$" ? r.api.setEffect(e.id, u, c) : we(e.rule, u, c);
          };
          (u === "value" ? [void 0, null, ""].indexOf(e.rule.value) > -1 : s.value !== fe(e.rule, u)) && l(s.value), e.watch.push(J(s, function(f) {
            setTimeout(function() {
              l(f);
            });
          }));
        }));
      }), this.watchEffect(e);
    },
    compute: function(e, r) {
      var i = this, a;
      if (L(r) === "object") {
        var o = e.getParentGroup(), u = function d(h) {
          if (h = Array.isArray(h) ? {
            mode: "AND",
            group: h
          } : h, !v.trueArray(h.group))
            return !0;
          for (var g = h.mode === "OR", b = !0, V = 0; V < h.group.length; V++) {
            var F = h.group[V], E = void 0;
            if (F.mode ? E = d(F) : $e[F.condition] ? E = new Function("$condition", "$val", "$form", "$group", "with($form){with(this){with($group){ return $condition['".concat(F.condition, "'](").concat(F.field, ", ").concat(F.compare ? F.compare : "$val", "); }}}")).call(i.api.form, $e, F.value, i.api.top.form, o ? i.subRuleData[o.id] || {} : {}) : E = !1, g && E)
              return !0;
            g || (b = b && E);
          }
          return g ? !1 : b;
        }, s = u(r);
        return r.invert === !0 ? !s : s;
      } else if (v.Function(r))
        a = function() {
          return r(i.api.form, i.api);
        };
      else {
        var l = this, f = Object.keys(this.fc.formulas).reduce(function(d, h) {
          return d[h] = function() {
            for (var g, b = arguments.length, V = new Array(b), F = 0; F < b; F++)
              V[F] = arguments[F];
            return (g = l.fc.formulas[h]).call.apply(g, [{
              that: this,
              rule: e.rule,
              api: l.api,
              fc: l.fc
            }].concat(V));
          }, d;
        }, {}), c = e.getParentGroup();
        a = function() {
          return new Function("$formulas", "$form", "$group", "$rule", "$api", "with($form){with(this){with($group){with($formulas){ return ".concat(r, " }}}}")).call(i.api.form, f, i.api.top.form, c ? i.subRuleData[c.id] || {} : {}, e.rule, i.api);
        };
      }
      return j(a, void 0);
    },
    updateChildren: function(e, r, i) {
      var a = this;
      this.deferSyncValue(function() {
        i && i.forEach(function(o) {
          (r || []).indexOf(o) === -1 && o && !v.String(o) && o.__fc__ && o.__fc__.parent === e && a.rmCtx(o.__fc__);
        }), v.trueArray(r) && (a.loadChildren(r, e), a.bus.$emit("update", a.api));
      });
    },
    rmSub: function(e) {
      var r = this;
      v.trueArray(e) && e.forEach(function(i) {
        i && i.__fc__ && r.rmCtx(i.__fc__);
      });
    },
    rmCtx: function(e) {
      var r = this;
      if (!e.deleted) {
        var i = e.id, a = e.field, o = e.input, u = e.name;
        ye(this.ctxs, i), ye(this.formData, i), ye(this.subForm, i), ye(this.vm.setupState.ctxInject, i);
        var s = e.getParentGroup();
        s && this.subRuleData[s.id] && ye(this.subRuleData[s.id], a), e.group && ye(this.subRuleData, i), o && this.rmIdCtx(e, a, "field"), u && this.rmIdCtx(e, u, "name"), o && !x(this.fieldCtx, a) && ye(this.form, a), this.deferSyncValue(function() {
          if (!r.reloading) {
            if (e.parser.loadChildren !== !1) {
              var f = e.getPending("children", e.rule.children);
              v.trueArray(f) && f.forEach(function(c) {
                return c.__fc__ && r.rmCtx(c.__fc__);
              });
            }
            e.root === r.rules && r.vm.setupState.renderRule();
          }
        }, o);
        var l = this.sort.indexOf(i);
        return l > -1 && this.sort.splice(l, 1), this.$render.clearCache(e), e.delete(), this.effect(e, "deleted"), o && !this.fieldCtx[a] && this.vm.emit("remove-field", a, e.rule, this.api), e.rule.__ctrl || this.vm.emit("remove-rule", e.rule, this.api), e;
      }
    }
  });
}
function gi(n) {
  C(n.prototype, {
    mounted: function() {
      var e = this, r = function() {
        e.isMounted = !0, e.lifecycle("mounted");
      };
      this.pageEnd ? r() : this.bus.$once("page-end", r);
    },
    lifecycle: function(e) {
      this.fc.targetFormDriver(e, this.api, this.fc), this.vm.emit(e, this.api), this.emitEvent(e, this.api);
    },
    emitEvent: function(e) {
      for (var r, i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        a[o - 1] = arguments[o];
      var u = this.options[e] || this.options[ne("on-" + e)];
      if (u) {
        var s = de(u);
        v.Function(s) && j(function() {
          return s.apply(void 0, a);
        });
      }
      (r = this.bus).$emit.apply(r, [e].concat(a));
    }
  });
}
function yi(n) {
  C(n.prototype, {
    useProvider: function() {
      var e = this, r = this.fc.providers;
      Object.keys(r).forEach(function(i) {
        var a = r[i];
        v.Function(a) && (a = a(e.fc)), a._c = _i(a), e.onEffect(a), e.providers[i] = a;
      });
    },
    onEffect: function(e) {
      var r = this, i = [];
      (e._c || ["*"]).forEach(function(a) {
        var o = a === "*" ? "*" : r.getType(a);
        i.indexOf(o) > -1 || (i.push(o), r.bus.$on("p:".concat(e.name, ":").concat(o, ":").concat(e.input ? 1 : 0), function(u, s) {
          e[u] && e[u].apply(e, D(s));
        }));
      }), e._used = i;
    },
    watchEffect: function(e) {
      var r = this, i = {
        required: function() {
          var o, u;
          return (x(e.rule, "$required") ? e.rule.$required : (o = e.rule) === null || o === void 0 || (u = o.effect) === null || u === void 0 ? void 0 : u.required) || !1;
        }
      };
      Object.keys(e.rule.effect || {}).forEach(function(a) {
        i[a] = function() {
          return e.rule.effect[a];
        };
      }), Object.keys(e.rule).forEach(function(a) {
        a[0] === "$" && (i[a.substr(1)] = function() {
          return e.rule[a];
        });
      }), Object.keys(i).forEach(function(a) {
        e.watch.push(J(i[a], function(o) {
          r.effect(e, "watch", H({}, a, o));
        }, {
          deep: !0
        }));
      });
    },
    ruleEffect: function(e, r, i) {
      this.emitEffect({
        rule: e,
        input: !!e.field,
        type: this.getType(e.type)
      }, r, i);
    },
    effect: function(e, r, i) {
      this.emitEffect({
        rule: e.rule,
        input: e.input,
        type: e.trueType,
        ctx: e,
        custom: i
      }, r);
    },
    getEffect: function(e, r) {
      if (x(e, "$" + r))
        return e["$" + r];
      if (x(e, "effect") && x(e.effect, r)) return e.effect[r];
    },
    emitEffect: function(e, r, i) {
      var a = this, o = e.ctx, u = e.rule, s = e.input, l = e.type, f = e.custom;
      if (!(!l || ["fcFragment", "fragment"].indexOf(l) > -1)) {
        var c = f || Object.keys(u).reduce(function(d, h) {
          return h[0] === "$" && (d[h.substr(1)] = u[h]), d;
        }, _({}, u.effect || {}));
        Object.keys(c).forEach(function(d) {
          var h = a.providers[d];
          if (!(!h || h.input && !s)) {
            var g;
            if (!h._c)
              g = "*";
            else if (h._used.indexOf(l) > -1)
              g = l;
            else
              return;
            var b = _({
              value: c[d],
              getValue: function() {
                return a.getEffect(u, d);
              }
            }, i || {});
            o && (b.getProp = function() {
              return o.effectData(d);
            }, b.clearProp = function() {
              return o.clearEffectData(d);
            }, b.mergeProp = function(V) {
              return me(b.getProp(), [V]);
            }, b.id = o.id), a.bus.$emit("p:".concat(d, ":").concat(g, ":").concat(h.input ? 1 : 0), r, [b, u, a.api]);
          }
        });
      }
    }
  });
}
function bi(n) {
  return n.filter(function(t, e, r) {
    return r.indexOf(t, 0) === e;
  });
}
function _i(n) {
  var t = n.components;
  if (Array.isArray(t)) {
    var e = bi(t.filter(function(r) {
      return r !== "*";
    }));
    return e.length ? e : !1;
  } else return v.String(t) ? [t] : !1;
}
function oe(n) {
  var t = this;
  on(this, {
    options: function() {
      return n.options.value || {};
    },
    bus: function() {
      return n.bus;
    },
    preview: function() {
      return n.vm.props.preview != null ? n.vm.props.preview : n.options.value.preview || !1;
    }
  }), C(this, {
    fc: n,
    vm: n.vm,
    watching: !1,
    loading: !1,
    reloading: !1,
    noWatchFn: null,
    deferSyncFn: null,
    isMounted: !1,
    formData: ce({}),
    subRuleData: ce({}),
    subForm: {},
    form: ce({}),
    appendData: {},
    providers: {},
    cycleLoad: null,
    loadedId: 1,
    nextTick: null,
    changeStatus: !1,
    pageEnd: !0,
    nextReload: function() {
      t.lifecycle("reload");
    }
  }), this.initData(n.rules), this.$manager = new n.manager(this), this.$render = new ht(this), this.api = n.extendApiFn.reduce(function(e, r) {
    return C(e, j(function() {
      return r(e, t);
    }, {})), e;
  }, ei(this));
}
C(oe.prototype, {
  initData: function(t) {
    C(this, {
      ctxs: {},
      fieldCtx: {},
      nameCtx: {},
      sort: [],
      rules: t
    });
  },
  init: function() {
    this.updateAppendData(), this.useProvider(), this.usePage(), this.loadRule(), this.$manager.__init(), this.lifecycle("created");
  },
  updateAppendData: function() {
    this.appendData = _(_(_({}, this.options.formData || {}), this.fc.vm.props.modelValue || {}), this.appendData);
  },
  isBreakWatch: function() {
    return this.loading || this.noWatchFn || this.reloading;
  },
  beforeFetch: function(t) {
    var e = this;
    return new Promise(function(r) {
      var i = e.options.beforeFetch && j(function() {
        return e.options.beforeFetch(t, {
          api: e.api
        });
      });
      i && v.Function(i.then) ? i.then(r) : r();
    });
  }
});
ai(oe);
oi(oe);
si(oe);
fi(oe);
hi(oe);
vi(oe);
gi(oe);
yi(oe);
var $i = "fcFragment", We = ae({
  name: $i,
  inheritAttrs: !1,
  props: ["vnode"],
  render: function() {
    return this.vnode;
  }
});
function wi(n) {
  return Object.keys(n).map(function(t) {
    var e = n[t], r = jn(t);
    if (r)
      return [r, e.value, e.arg, e.modifiers];
  }).filter(function(t) {
    return !!t;
  });
}
function It(n, t) {
  var e = n.directives;
  return e ? (Array.isArray(e) || (e = [e]), Pn(t, e.reduce(function(r, i) {
    return r.concat(wi(i));
  }, []))) : t;
}
function Ci() {
  var n = {};
  function t() {
  }
  return C(t.prototype, {
    make: function(r, i, a) {
      return It(i, this.h(r, Ft(i), a));
    },
    makeComponent: function(r, i, a) {
      try {
        return It(i, w(r, Ft(i), a));
      } catch (o) {
        return console.error(o), w("");
      }
    },
    h: function(r, i, a) {
      var o = tt().appContext.config.isNativeTag(r);
      o && delete i.formCreateInject;
      try {
        return w(o ? r : A(r), i, a);
      } catch (u) {
        return console.error(u), w("");
      }
    },
    aliasMap: n
  }), C(t, {
    aliasMap: n,
    alias: function(r, i) {
      n[r] = i;
    },
    use: function(r) {
      Object.keys(r).forEach(function(i) {
        var a = Pe(i), o = fn(i).toLocaleLowerCase(), u = r[i];
        [i, a, o].forEach(function(s) {
          t.alias(i, u), t.prototype[s] = function(l, f) {
            return this.make(u, l, f);
          };
        });
      });
    }
  }), t;
}
function Vi(n) {
  var t = /* @__PURE__ */ function(e) {
    kn(i, e);
    var r = Ln(i);
    function i() {
      return xn(this, i), r.apply(this, arguments);
    }
    return i;
  }(dn);
  return Object.assign(t.prototype, n), t;
}
function dn(n) {
  C(this, {
    $handle: n,
    vm: n.vm,
    options: {},
    ref: "fcForm",
    mergeOptionsRule: {
      normal: ["form", "row", "info", "submitBtn", "resetBtn"]
    }
  }), this.updateKey(), this.init();
}
C(dn.prototype, {
  __init: function() {
    var t = this;
    this.$render = this.$handle.$render, this.$r = function() {
      var e;
      return (e = t.$render).renderRule.apply(e, arguments);
    };
  },
  updateKey: function() {
    this.key = He();
  },
  //TODO interface
  init: function() {
  },
  update: function() {
  },
  beforeRender: function() {
  },
  form: function() {
    return this.vm.refs[this.ref];
  },
  getSlot: function(t) {
    var e = function r(i) {
      if (i) {
        var a = i.slots[t];
        return a || r(i.setupState.parent);
      }
    };
    return e(this.vm);
  },
  mergeOptions: function(t, e) {
    var r = this;
    return he(t.map(function(i) {
      return r.tidyOptions(i);
    }), e, this.mergeOptionsRule);
  },
  updateOptions: function(t) {
    this.$handle.fc.targetFormDriver("updateOptions", t, {
      handle: this.$handle,
      api: this.$handle.api
    }), this.options = this.mergeOptions([t], this.getDefaultOptions()), this.update();
  },
  tidyOptions: function(t) {
    return t;
  },
  tidyRule: function(t) {
  },
  mergeProp: function(t) {
  },
  getDefaultOptions: function() {
    return {};
  },
  render: function(t) {
  }
});
var Si = function(t) {
  var e = {
    name: "loadData",
    _fn: [],
    mounted: function(i, a, o) {
      this.deleted(i);
      var u = X(i.getValue()), s = [];
      u.forEach(function(l) {
        if (l && (l.attr || l.template)) {
          var f = t.watchLoadData(Ee(function(c) {
            var d;
            l.template ? d = t.$handle.loadStrVar(l.template, c) : d = c(l.attr, l.default), l.copy !== !1 && (d = te(d));
            var h = l.modify ? a : i.getProp();
            l.to === "child" ? h.children ? h.children[0] = d : h.children = [d] : we(h, l.to || "options", d), o.sync(a);
          }, l.wait || 300));
          l.watch !== !1 ? s.push(f) : f();
        }
      }), this._fn[i.id] = s;
    },
    deleted: function(i) {
      this._fn[i.id] && this._fn[i.id].forEach(function(a) {
        a();
      }), i.clearProp();
    }
  };
  return e.watch = e.created, e;
}, st = {
  name: "componentValidate",
  load: function(t, e, r) {
    var i = t.getValue();
    if (!i || i.method === !1)
      t.clearProp(), r.clearValidateState([e.field]);
    else {
      v.Object(i) || (i = {
        method: i
      });
      var a = i.method;
      delete i.method, t.getProp().validate = [_(_({}, i), {}, {
        validator: function() {
          var u = be(e);
          if (u) {
            for (var s = arguments.length, l = new Array(s), f = 0; f < s; f++)
              l[f] = arguments[f];
            return r.exec.apply(r, [u.id, v.String(a) ? a : "formCreateValidate"].concat(l, [{
              attr: t,
              rule: e,
              api: r
            }]));
          }
        }
      })];
    }
  },
  watch: function() {
    st.load.apply(st, arguments);
  }
}, Oi = function(t) {
  function e(a) {
    return v.String(a) && (a = {
      action: a,
      to: "options"
    }), a;
  }
  function r(a, o, u) {
    var s = a.value;
    i.deleted(a), v.Function(s) && (s = s(o, u)), s = e(s);
    var l = function(g) {
      g === void 0 ? a.clearProp() : we(a.getProp(), s.to || "options", g), u.sync(o);
    };
    if (!s || !s.action && !s.key) {
      l(void 0);
      return;
    }
    if (s = te(s), s.to || (s.to = "options"), s.key) {
      var f = t.$handle.options.globalData[s.key];
      if (!f) {
        l(void 0);
        return;
      }
      if (f.type === "static") {
        l(f.data);
        return;
      } else
        s = _(_({}, s), f);
    }
    var c = s.onError, d = function() {
      if (!a.getValue())
        return a.clearProp(), u.sync(o), !0;
    };
    i._fn[a.id] = t.watchLoadData(Ee(function(h, g) {
      if (g && s.watch === !1)
        return i._fn[a.id]();
      var b = t.$handle.loadFetchVar(te(s), h), V = _(_({
        headers: {}
      }, b), {}, {
        onSuccess: function(E, P) {
          if (!d()) {
            var z = function(R) {
              return P ? R : x(R, "data") ? R.data : R;
            }, T = de(b.parse);
            v.Function(T) ? z = T : T && v.String(T) && (z = function(R) {
              return fe(R, T);
            }), l(z(E, o, u)), u.sync(o);
          }
        },
        onError: function(E) {
          l(void 0), !d() && (c || function(P) {
            return ct(P.message || "fetch fail " + b.action);
          })(E, o, u);
        }
      });
      t.$handle.beforeFetch(V, {
        rule: o,
        api: u
      }).then(function() {
        if (v.Function(b.action)) {
          b.action(o, u).then(function(F) {
            V.onSuccess(F, !0);
          }).catch(function(F) {
            V.onError(F);
          });
          return;
        }
        j(function() {
          return t.create.fetch(V, {
            inject: a,
            rule: o,
            api: u
          });
        });
      });
    }, s.wait || 600));
  }
  var i = {
    name: "fetch",
    _fn: [],
    mounted: function() {
      r.apply(void 0, arguments);
    },
    watch: function() {
      r.apply(void 0, arguments);
    },
    deleted: function(o) {
      this._fn[o.id] && this._fn[o.id](), o.clearProp();
    }
  };
  return i;
}, Fi = {
  fetch: Oi,
  loadData: Si,
  componentValidate: st
}, Ei = "html", Ri = {
  name: Ei,
  loadChildren: !1,
  render: function(t, e) {
    return e.prop.props.innerHTML = t.default(), e.vNode.make(e.prop.props.tag || "div", e.prop);
  },
  renderChildren: function(t) {
    return {
      default: function() {
        return t.filter(function(r) {
          return v.String(r);
        }).join("");
      }
    };
  }
};
function Di(n) {
  n = n + "=";
  for (var t = decodeURIComponent(document.cookie), e = t.split(";"), r = 0; r < e.length; r++) {
    for (var i = e[r]; i.charAt(0) === " "; )
      i = i.substring(1);
    if (i.indexOf(n) === 0) {
      i = i.substring(n.length, i.length);
      try {
        return JSON.parse(i);
      } catch {
        return i;
      }
    }
  }
  return null;
}
function Ai(n) {
  var t = localStorage.getItem(n);
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  return null;
}
function pn(n, t) {
  if (!t)
    return null;
  var e = t.split("."), r = n(e.shift());
  return e.length ? r == null ? null : fe(r, e) : r;
}
function Pi(n) {
  return pn(Di, n);
}
function ji(n) {
  return pn(Ai, n);
}
function Ii(n, t) {
  var e;
  return arguments.length === 2 ? (e = arguments[1], t = e[n]) : e = arguments[2], {
    id: t,
    prop: e
  };
}
function Ke() {
  return Ii.apply(void 0, ["name"].concat(Array.prototype.slice.call(arguments)));
}
function Bi(n) {
  var t = n.key || [], e = n.array || [], r = n.normal || [];
  at.push.apply(at, D(t)), Me.push.apply(Me, D(e)), Ne.push.apply(Ne, D(r)), sn([].concat(D(t), D(e), D(r)));
}
var xi = 1, Z = {};
function hn(n) {
  var t = H({}, We.name, We), e = {}, r = {}, i = {}, a = {}, o = [], u = [], s = [n.extendApi], l = _({}, Fi), f = Qr(), c = {
    global: {}
  }, d = ce({}), h = Ci(), g = {}, b = n.isMobile === !0;
  Bi(n.attrs || {});
  function V(m) {
    var p = Z[m];
    if (Array.isArray(p))
      return p.map(function(y) {
        return y.api();
      });
    if (p)
      return p.api();
  }
  function F(m) {
    o.push(m);
  }
  function E() {
    var m = Ke.apply(void 0, arguments);
    m.id && m.prop && (r[m.id] = m.prop);
  }
  function P() {
    var m = Ke.apply(void 0, arguments);
    m.id && m.prop && (l[m.id] = v.Function(m.prop) ? m.prop : _(_({}, m.prop), {}, {
      name: m.id
    }));
  }
  function z(m) {
    h.use(m);
  }
  function T() {
    var m = Ke.apply(void 0, arguments);
    if (!m.id || !m.prop) return ke;
    var p = ne(m.id), y = m.prop, $ = y.merge === !0 ? e[p] : void 0;
    e[p] = Je(y, $ || ke), f[p] = q(p), y.maker && C(f, y.maker);
  }
  function W(m, p) {
    var y;
    if (v.String(m)) {
      if (y = m, p === void 0)
        return t[y];
    } else
      y = m.displayName || m.name, p = m;
    if (!(!y || !p)) {
      var $ = ne(y);
      t[y] = p, t[$] = p, delete h.aliasMap[y], delete h.aliasMap[$], delete e[y], delete e[$], p.formCreateParser && T(y, p.formCreateParser);
    }
  }
  function R() {
    return zr(Ye, t, r);
  }
  function I(m, p) {
    var y = R();
    return In({
      data: function() {
        return ce({
          rule: m,
          option: p
        });
      },
      render: function() {
        return Bn(y, _({
          ref: "fc"
        }, this.$data));
      }
    });
  }
  function M() {
    return We;
  }
  function ue(m, p) {
    return v.Function(m.install) ? m.install(G, p) : v.Function(m) && m(G, p), this;
  }
  function G(m, p) {
    var y = I(m, p || {});
    o.forEach(function(O) {
      j(function() {
        return O(G, y);
      });
    });
    var $ = document.createElement("div");
    ((p == null ? void 0 : p.el) || document.body).appendChild($);
    var S = y.mount($);
    return S.$refs.fc.fapi;
  }
  function vn(m) {
    var p = _({}, n);
    return m ? p.inherit = {
      components: t,
      parsers: e,
      directives: r,
      modelFields: i,
      providers: l,
      useApps: o,
      maker: f,
      formulas: g,
      loadData: d
    } : delete p.inherit, hn(p);
  }
  function gn(m, p) {
    i[m] = p;
  }
  function yn(m, p) {
    g[m] = p;
  }
  function bn(m, p) {
    var y = a[m] || {}, $ = y.parsers || {};
    p.parsers && Object.keys(p.parsers).forEach(function(S) {
      $[S] = Je(p.parsers[S], ke);
    }), p.name = m, a[m] = _(_(_({}, y), p), {}, {
      parsers: $
    });
  }
  function Ie(m) {
    m && Object.keys(Z).forEach(function(p) {
      var y = Array.isArray(Z[p]) ? Z[p] : [Z[p]];
      y.forEach(function($) {
        $.bus.$emit("$loadData." + m);
      });
    });
  }
  function ze(m, p) {
    we(d, m, p), Ie(m);
  }
  function Ge(m, p) {
    var y = function() {
      for (var S = arguments.length, O = new Array(S), B = 0; B < S; B++)
        O[B] = arguments[B];
      return j(function() {
        return p.apply(void 0, O);
      });
    };
    y._driver = !0, ze(m, y);
  }
  function mt(m, p) {
    var y = (m || "").split(".");
    m = y.shift();
    var $ = y.join(".");
    if (x(d, m)) {
      var S = d[m];
      return S && S._driver ? S = S($) : y.length && (S = fe(S, y)), S == null || S === "" ? p : S;
    } else
      return p;
  }
  function _n(m) {
    s.push(m);
  }
  function $n(m) {
    delete d[m], Ie(m);
  }
  function wn(m, p) {
    u.push({
      name: m,
      callback: p
    });
  }
  function Ye(m) {
    var p = this;
    C(this, {
      id: xi++,
      create: G,
      vm: m,
      manager: Vi(n.manager),
      parsers: e,
      providers: l,
      modelFields: i,
      formulas: g,
      isMobile: b,
      rules: m.props.rule,
      name: m.props.name || He(),
      inFor: m.props.inFor,
      prop: {
        components: t,
        directives: r
      },
      drivers: a,
      renderDriver: null,
      refreshData: Ie,
      loadData: d,
      CreateNode: h,
      bus: new Ut(),
      unwatch: [],
      options: ft({}),
      extendApiFn: s,
      fetchCache: /* @__PURE__ */ new WeakMap(),
      tmpData: {}
    }), u.forEach(function(y) {
      p.bus.$on(y.name, y.callback);
    }), Q(function() {
      J(p.options, function() {
        p.$handle.$manager.updateOptions(p.options.value), p.api().refresh();
      }, {
        deep: !0
      });
    }), C(m.appContext.components, t), C(m.appContext.directives, r), this.$handle = new oe(this), this.name && (this.inFor ? (Z[this.name] || (Z[this.name] = []), Z[this.name].push(this)) : Z[this.name] = this);
  }
  Ye.isMobile = b, C(Ye.prototype, {
    init: function() {
      var p = this;
      this.isSub() && this.unwatch.push(J(function() {
        return p.vm.setupState.parent.setupState.fc.options.value;
      }, function() {
        p.initOptions(), p.$handle.api.refresh();
      }, {
        deep: !0
      })), this.vm.props.driver && (this.renderDriver = L(this.vm.props.driver) === "object" ? this.vm.props.driver : this.drivers[this.vm.props.driver]), !this.renderDriver && this.vm.setupState.parent && (this.renderDriver = this.vm.setupState.parent.setupState.fc.renderDriver), this.renderDriver || (this.renderDriver = this.drivers.default), this.initOptions(), this.$handle.init();
    },
    targetFormDriver: function(p) {
      for (var y = this, $ = arguments.length, S = new Array($ > 1 ? $ - 1 : 0), O = 1; O < $; O++)
        S[O - 1] = arguments[O];
      if (this.renderDriver && this.renderDriver[p])
        return j(function() {
          var B;
          return (B = y.renderDriver)[p].apply(B, S);
        });
    },
    globalDataDriver: function(p) {
      var y = this, $ = p.split("."), S = $.shift(), O = this.options.value.globalData && this.options.value.globalData[S];
      if (O) {
        if (O.type === "static")
          return fe(O.data, $);
        var B, Y = this.fetchCache.get(O);
        if (Y) {
          if (Y.status && (B = fe(Y.data, $)), !Y.loading)
            return B;
          Y.loading = !1, this.fetchCache.set(O, Y);
        } else
          this.fetchCache.set(O, {
            status: !1
          });
        var N = Ee(function() {
          Fe();
          var ie = y.fetchCache.get(O);
          y.options.value.globalData && Object.values(y.options.value.globalData).indexOf(O) !== -1 ? (ie && (ie.loading = !0, y.fetchCache.set(O, ie)), y.bus.$emit("$loadData.$globalData." + S)) : y.fetchCache.delete(O);
        }, O.wait || 600), se = function(pe) {
          y.fetchCache.set(O, {
            status: !0,
            data: pe
          }), y.bus.$emit("$loadData.$globalData." + S);
        }, Oe = function(pe, ge) {
          if (ge && O.watch === !1)
            return Fe();
          if (ge) {
            N();
            return;
          }
          var Re = y.$handle.loadFetchVar(it(O), pe);
          y.$handle.api.fetch(Re).then(function(gt) {
            se(gt);
          }).catch(function(gt) {
            se(null);
          });
        }, Fe = this.watchLoadData(Oe);
        return this.unwatch.push(Fe), B;
      }
    },
    globalVarDriver: function(p) {
      var y = this, $ = p.split("."), S = $.shift(), O = this.options.value.globalVariable && this.options.value.globalVariable[S];
      if (O) {
        var B = v.Function(O) ? O : O.handle;
        if (B) {
          var Y, N = this.watchLoadData(function(se, Oe) {
            if (Oe)
              return N(), y.bus.$emit("$loadData.$var." + S), Y;
            Y = j(function() {
              return B(se, y.$handle.api);
            });
          });
          return this.unwatch.push(N), Y;
        }
      }
    },
    setData: function(p, y, $) {
      $ ? ze(p, y) : (we(this.vm.setupState.top.setupState.fc.tmpData, p, y), this.bus.$emit("$loadData." + p));
    },
    getLoadData: function(p, y) {
      var $ = null;
      if (p != null) {
        var S = p.split("."), O = S.shift();
        if (O === "$form")
          $ = this.$handle.api.top.formData();
        else if (O === "$subForm")
          $ = this.$handle.api.formData();
        else if (O === "$options")
          $ = this.options.value;
        else if (O === "$globalData")
          $ = this.globalDataDriver(S.join(".")), S = [];
        else if (O === "$var")
          $ = this.globalVarDriver(S.join(".")), S = [];
        else {
          var B = this.vm.setupState.top.setupState.fc.tmpData;
          $ = x(B, O) ? fe(B, p) : mt(O), S = [];
        }
        $ && S.length && ($ = fe($, S));
      }
      return $ == null || $ === "" ? y : $;
    },
    watchLoadData: function(p) {
      var y = this, $ = {}, S = function(N) {
        j(function() {
          p(O, N);
        });
      }, O = function(N, se) {
        if ($[N])
          return $[N].val;
        var Oe = y.getLoadData(N, se), Fe = N.split("."), ie = Fe.shift(), pe = Fe.shift() || "", ge = Ee(function() {
          var Re = y.getLoadData(N, se);
          JSON.stringify(Re) !== JSON.stringify($[N].val) && ($[N].val = Re, S(!0));
        }, 0);
        return y.bus.$on("$loadData." + ie, ge), pe && y.bus.$on("$loadData." + ie + "." + pe, ge), $[N] = {
          fn: function() {
            y.bus.$off("$loadData." + ie, ge), pe && y.bus.$off("$loadData." + ie + "." + pe, ge);
          },
          val: Oe
        }, Oe;
      };
      S(!1);
      var B = function() {
        Object.keys($).forEach(function(N) {
          return $[N].fn();
        }), $ = {};
      };
      return this.unwatch.push(B), B;
    },
    isSub: function() {
      return this.vm.setupState.parent && this.vm.props.extendOption;
    },
    initOptions: function() {
      this.options.value = {};
      var p = _({
        formData: {},
        submitBtn: {},
        resetBtn: {},
        globalEvent: {},
        globalData: {}
      }, te(c));
      this.isSub() && (p = this.mergeOptions(p, this.vm.setupState.parent.setupState.fc.options.value || {}, !0)), p = this.mergeOptions(p, this.vm.props.option), this.updateOptions(p);
    },
    mergeOptions: function(p, y, $) {
      return y = te(y), $ && ["page", "onSubmit", "mounted", "reload", "formData", "el", "globalClass", "style"].forEach(function(S) {
        delete y[S];
      }), y.global && (p.global = Jr(p.global, y.global), delete y.global), this.$handle.$manager.mergeOptions([y], p), p;
    },
    updateOptions: function(p) {
      this.options.value = this.mergeOptions(this.options.value, p), this.$handle.$manager.updateOptions(this.options.value), this.bus.$emit("$loadData.$options");
    },
    api: function() {
      return this.$handle.api;
    },
    render: function() {
      return this.$handle.render();
    },
    mounted: function() {
      this.$handle.mounted();
    },
    unmount: function() {
      var p = this;
      if (this.name)
        if (this.inFor) {
          var y = Z[this.name].indexOf(this);
          Z[this.name].splice(y, 1);
        } else
          delete Z[this.name];
      u.forEach(function($) {
        p.bus.$off($.name, $.callback);
      }), this.tmpData = {}, this.unwatch.forEach(function($) {
        return $();
      }), this.unwatch = [], this.$handle.reloadRule([]);
    },
    updated: function() {
      var p = this;
      this.$handle.bindNextTick(function() {
        return p.bus.$emit("next-tick", p.$handle.api);
      });
    }
  });
  function vt(m) {
    C(m, {
      version: n.version,
      ui: n.ui,
      extendApi: _n,
      getData: mt,
      setDataDriver: Ge,
      setData: ze,
      removeData: $n,
      refreshData: Ie,
      maker: f,
      component: W,
      directive: E,
      setModelField: gn,
      setFormula: yn,
      setDriver: bn,
      register: P,
      $vnode: M,
      parser: T,
      use: ue,
      factory: vn,
      componentAlias: z,
      copyRule: dt,
      copyRules: an,
      fetch: ln,
      $form: R,
      parseFn: de,
      parseJson: qr,
      toJson: nn,
      useApp: F,
      getApi: V,
      on: wn
    });
  }
  function Cn(m) {
    C(m, {
      create: G,
      isMobile: b,
      install: function(y, $) {
        c = _(_({}, c), $ || {});
        var S = "_installedFormCreate_" + n.ui;
        if (y[S] !== !0) {
          y[S] = !0;
          var O = function(N) {
            var se = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return G(N, se);
          };
          vt(O), y.config.globalProperties.$formCreate = O;
          var B = R();
          y.component(B.name, B), o.forEach(function(Y) {
            j(function() {
              return Y(m, y);
            });
          });
        }
      }
    });
  }
  if (vt(G), Cn(G), Ge("$cookie", Pi), Ge("$localStorage", ji), h.use({
    fragment: "fcFragment"
  }), n.install && G.use(n), F(function(m, p) {
    p.mixin({
      props: ["formCreateInject"]
    });
  }), T(Ri), n.inherit) {
    var U = n.inherit;
    U.components && C(t, U.components), U.parsers && C(e, U.parsers), U.directives && C(r, U.directives), U.modelFields && C(i, U.modelFields), U.providers && C(l, U.providers), U.useApps && C(o, U.useApps), U.maker && C(f, U.maker), U.loadData && C(d, U.loadData), U.formulas && C(g, U.formulas);
  }
  var Be = R();
  return Je(Be, G), Object.defineProperties(Be, {
    fetch: {
      get: function() {
        return G.fetch;
      },
      set: function(p) {
        G.fetch = p;
      }
    }
  }), Be.util = G, Be;
}
var Bt = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  datetime: "YYYY-MM-DD HH:mm:ss",
  timerange: "HH:mm:ss",
  daterange: "YYYY-MM-DD",
  monthrange: "YYYY-MM",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  year: "YYYY"
}, xt = "datePicker", ki = {
  name: xt,
  maker: function() {
    return ["year", "month", "date", "dates", "week", "datetime", "datetimeRange", "dateRange", "monthRange"].reduce(function(n, t) {
      return n[t] = q(xt, {
        type: t.toLowerCase()
      }), n;
    }, {});
  }(),
  mergeProp: function(t) {
    var e = t.prop.props;
    e.valueFormat || (e.valueFormat = Bt[e.type] || Bt.date);
  }
}, Xe = "hidden", Ti = {
  name: Xe,
  maker: H({}, Xe, function(n, t) {
    return q(Xe)("", n, t);
  }),
  render: function() {
    return [];
  }
}, Qe = "input", Mi = {
  name: Qe,
  maker: function() {
    var n = ["password", "url", "email", "text", "textarea"].reduce(function(t, e) {
      return t[e] = q(Qe, {
        type: e
      }), t;
    }, {});
    return n.idate = q(Qe, {
      type: "date"
    }), n;
  }(),
  mergeProp: function(t) {
    var e = t.prop.props;
    e && e.autosize && e.autosize.minRows && (e.rows = e.autosize.minRows || 2);
  }
}, kt = "slider", Ni = {
  name: kt,
  maker: {
    sliderRange: q(kt, {
      range: !0
    })
  },
  toFormValue: function(t, e) {
    var r = Array.isArray(t), i = e.prop.props, a = i.min || 0, o;
    return i.range === !0 ? o = r ? t : [a, parseFloat(t) || a] : o = r ? parseFloat(t[0]) || a : parseFloat(t), o;
  }
}, Ze = "timePicker", Li = {
  name: Ze,
  maker: {
    time: q(Ze, function(n) {
      return n.props.isRange = !1;
    }),
    timeRange: q(Ze, function(n) {
      return n.props.isRange = !0;
    })
  },
  mergeProp: function(t) {
    var e = t.prop.props;
    e.valueFormat || (e.valueFormat = "HH:mm:ss");
  }
}, Ui = {
  name: "FcRow",
  render: function(t, e) {
    return e.vNode.col({
      props: {
        span: 24
      }
    }, {
      default: function() {
        return [e.vNode.row(e.prop, t)];
      }
    });
  }
}, Hi = "select", zi = {
  name: Hi,
  toFormValue: function(t, e) {
    return e.prop.props.multiple && !Array.isArray(t) ? X(t) : t;
  }
}, Gi = [ki, Ti, Mi, Ni, Li, Ui, zi], k = "el", Yi = {
  button: k + "-button",
  icon: k + "-icon",
  slider: k + "-slider",
  rate: k + "-rate",
  upload: "fc-upload",
  cascader: k + "-cascader",
  popover: k + "-popover",
  tooltip: k + "-tooltip",
  colorPicker: k + "-colorPicker",
  timePicker: k + "-time-picker",
  timeSelect: k + "-time-select",
  datePicker: k + "-date-picker",
  switch: k + "-switch",
  select: "fc-select",
  checkbox: "fc-checkbox",
  radio: "fc-radio",
  inputNumber: k + "-input-number",
  number: k + "-input-number",
  input: k + "-input",
  formItem: k + "-form-item",
  form: k + "-form",
  frame: "fc-frame",
  col: k + "-col",
  row: k + "-row",
  tree: "fc-tree",
  autoComplete: k + "-autocomplete",
  auto: k + "-autocomplete",
  group: "fc-group",
  object: "fc-sub-form",
  subForm: "fc-sub-form"
};
function qi() {
  return {
    form: {
      inline: !1,
      labelPosition: "right",
      labelWidth: "125px",
      disabled: !1,
      size: void 0
    },
    row: {
      show: !0,
      gutter: 0
    },
    submitBtn: {
      type: "primary",
      loading: !1,
      disabled: !1,
      innerText: "提交",
      show: !0,
      col: void 0,
      click: void 0
    },
    resetBtn: {
      type: "default",
      loading: !1,
      disabled: !1,
      innerText: "重置",
      show: !1,
      col: void 0,
      click: void 0
    }
  };
}
function Ji(n) {
  return n.type === "tooltip";
}
function Tt(n, t) {
  if (x(n, t) && v.String(n[t])) {
    var e;
    n[t] = (e = {}, H(e, t, n[t]), H(e, "show", !0), e);
  }
}
function le(n) {
  return n === !1;
}
function Wi(n, t) {
  x(n, t) && !v.Object(n[t]) && (n[t] = {
    show: !!n[t]
  });
}
function et(n) {
  var t = _({}, n);
  return delete t.children, t;
}
var Ki = {
  validate: function() {
    var t = this.form();
    return t ? t.validate() : new Promise(function(e) {
      return e();
    });
  },
  validateField: function(t) {
    var e = this;
    return new Promise(function(r, i) {
      var a = e.form();
      a ? a.validateField(t, function(o, u) {
        u ? i(u) : r(o);
      }) : r();
    });
  },
  clearValidateState: function(t) {
    var e = this.vm.refs[t.wrapRef];
    e && e.clearValidate();
  },
  tidyOptions: function(t) {
    return ["submitBtn", "resetBtn", "row", "info", "wrap", "col", "title"].forEach(function(e) {
      Wi(t, e);
    }), t;
  },
  tidyRule: function(t) {
    var e = t.prop;
    return Tt(e, "title"), Tt(e, "info"), e;
  },
  mergeProp: function(t) {
    t.prop = he([{
      info: this.options.info || {},
      wrap: this.options.wrap || {},
      col: this.options.col || {},
      title: this.options.title || {}
    }, t.prop], {
      info: {
        trigger: "hover",
        placement: "top-start",
        icon: !0
      },
      title: {},
      col: {
        span: 24
      },
      wrap: {}
    }, {
      normal: ["title", "info", "col", "wrap"]
    });
  },
  getDefaultOptions: function() {
    return qi();
  },
  update: function() {
    var t = this.options.form;
    this.rule = {
      props: _({}, t),
      on: {
        submit: function(r) {
          r.preventDefault();
        }
      },
      class: [t.className, t.class, "form-create", this.$handle.preview ? "is-preview" : ""],
      style: t.style,
      type: "form"
    };
  },
  beforeRender: function() {
    var t = this.key, e = this.ref, r = this.$handle;
    C(this.rule, {
      key: t,
      ref: e
    }), C(this.rule.props, {
      model: _({}, r.formData)
    });
  },
  render: function(t) {
    var e = this;
    return t.slotLen() && !this.$handle.preview && t.setSlot(void 0, function() {
      return e.makeFormBtn();
    }), this.$r(this.rule, le(this.options.row.show) ? t.getSlots() : [this.makeRow(t)]);
  },
  makeWrap: function(t, e) {
    var r = this, i = t.prop, a = "".concat(this.key).concat(t.key), o = i.col, u = this.isTitle(i) && i.wrap.title !== !1, s = !o.labelWidth && !u ? 0 : o.labelWidth, l = this.rule.props, f = l.inline, c = l.col;
    delete i.wrap.title;
    var d = le(i.wrap.show) ? e : this.$r(he([i.wrap, {
      props: _(_({
        labelWidth: s === void 0 ? s : fn(s),
        label: u ? i.title.title : void 0
      }, et(i.wrap || {})), {}, {
        prop: t.id,
        rules: t.injectValidate()
      }),
      class: i.className,
      key: "".concat(a, "fi"),
      ref: t.wrapRef,
      type: "formItem"
    }]), _({
      default: function() {
        return e;
      }
    }, u ? {
      label: function() {
        return r.makeInfo(i, a, t);
      }
    } : {}));
    return f === !0 || le(c) || le(o.show) ? d : this.makeCol(i, a, [d]);
  },
  isTitle: function(t) {
    if (this.options.form.title === !1) return !1;
    var e = t.title;
    return !(!e.title && !e.native || le(e.show));
  },
  makeInfo: function(t, e, r) {
    var i = this, a = _({}, t.title), o = _({}, t.info), u = Ji(o), s = this.options.form, l = this.getSlot("title"), f = [l ? l({
      title: a.title || "",
      rule: r.rule,
      options: this.options
    }) : (a.title || "") + (s.labelSuffix || s["label-suffix"] || "")];
    if (!le(o.show) && (o.info || o.native) && !le(o.icon)) {
      var c = {
        type: o.type || "popover",
        props: et(o),
        key: "".concat(e, "pop")
      };
      delete c.props.icon, delete c.props.show, delete c.props.info, delete c.props.align, delete c.props.native;
      var d = "content";
      o.info && !x(c.props, d) && (c.props[d] = o.info), f[o.align !== "left" ? "unshift" : "push"](this.$r(he([o, c]), H({}, a.slot || (u ? "default" : "reference"), function() {
        return i.$r({
          type: "ElIcon",
          style: "top:2px",
          key: "".concat(e, "i")
        }, {
          default: function() {
            return i.$r({
              type: o.icon === !0 ? "icon-warning" : o.icon
            });
          }
        }, !0);
      })));
    }
    var h = he([a, {
      props: et(a),
      key: "".concat(e, "tit"),
      type: a.type || "span"
    }]);
    return delete h.props.show, delete h.props.title, delete h.props.native, this.$r(h, f);
  },
  makeCol: function(t, e, r) {
    var i = t.col;
    return this.$r({
      class: i.class,
      type: "col",
      props: i || {
        span: 24
      },
      key: "".concat(e, "col")
    }, r);
  },
  makeRow: function(t) {
    var e = this.options.row || {};
    return this.$r({
      type: "row",
      props: e,
      class: e.class,
      key: "".concat(this.key, "row")
    }, t);
  },
  makeFormBtn: function() {
    var t = [];
    if (le(this.options.submitBtn.show) || t.push(this.makeSubmitBtn()), le(this.options.resetBtn.show) || t.push(this.makeResetBtn()), !!t.length) {
      var e = this.$r({
        type: "formItem",
        key: "".concat(this.key, "fb")
      }, t);
      return this.rule.props.inline === !0 ? e : this.$r({
        type: "col",
        props: {
          span: 24
        },
        key: "".concat(this.key, "fc")
      }, [e]);
    }
  },
  makeResetBtn: function() {
    var t = this, e = _({}, this.options.resetBtn), r = e.innerText;
    return delete e.innerText, delete e.click, delete e.col, delete e.show, this.$r({
      type: "button",
      props: e,
      class: "_fc-reset-btn",
      style: {
        width: e.width
      },
      on: {
        click: function() {
          var a = t.$handle.api;
          t.options.resetBtn.click ? t.options.resetBtn.click(a) : a.resetFields();
        }
      },
      key: "".concat(this.key, "b2")
    }, [r]);
  },
  makeSubmitBtn: function() {
    var t = this, e = _({}, this.options.submitBtn), r = e.innerText;
    return delete e.innerText, delete e.click, delete e.col, delete e.show, this.$r({
      type: "button",
      props: e,
      class: "_fc-submit-btn",
      style: {
        width: e.width
      },
      on: {
        click: function() {
          var a = t.$handle.api;
          t.options.submitBtn.click ? t.options.submitBtn.click(a) : a.submit().catch(function() {
          });
        }
      },
      key: "".concat(this.key, "b1")
    }, [r]);
  }
}, Ce = {};
Xi(Ce);
Qi(Ce);
Zi(Ce);
ea(Ce);
ta(Ce);
function Xi(n) {
  ["group", "tree", "switch", "upload", "autoComplete", "checkbox", "cascader", "colorPicker", "datePicker", "frame", "inputNumber", "radio", "rate"].forEach(function(t) {
    n[t] = q(t);
  }), n.auto = n.autoComplete, n.number = n.inputNumber, n.color = n.colorPicker;
}
function Qi(n) {
  var t = "select", e = "multiple";
  n.selectMultiple = q(t, H({}, e, !0)), n.selectOne = q(t, H({}, e, !1));
}
function Zi(n) {
  var t = "tree", e = {
    treeSelected: "selected",
    treeChecked: "checked"
  };
  Object.keys(e).reduce(function(r, i) {
    return r[i] = q(t, {
      type: e[i]
    }), r;
  }, n);
}
function ea(n) {
  var t = "upload", e = {
    image: ["image", 0],
    file: ["file", 0],
    uploadFileOne: ["file", 1],
    uploadImageOne: ["image", 1]
  };
  Object.keys(e).reduce(function(r, i) {
    return r[i] = q(t, function(a) {
      return a.props({
        uploadType: e[i][0],
        maxLength: e[i][1]
      });
    }), r;
  }, n), n.uploadImage = n.image, n.uploadFile = n.file;
}
function ta(n) {
  var t = {
    frameInputs: ["input", 0],
    frameFiles: ["file", 0],
    frameImages: ["image", 0],
    frameInputOne: ["input", 1],
    frameFileOne: ["file", 1],
    frameImageOne: ["image", 1]
  };
  return Object.keys(t).reduce(function(e, r) {
    return e[r] = q("frame", function(i) {
      return i.props({
        type: t[r][0],
        maxLength: t[r][1]
      });
    }), e;
  }, n), n.frameInput = n.frameInputs, n.frameFile = n.frameFiles, n.frameImage = n.frameImages, n;
}
var na = ".form-create .form-create .el-form-item{margin-bottom:22px}.form-create{width:100%}.form-create .fc-none,.form-create.is-preview .el-form-item.is-required>.el-form-item__label-wrap>.el-form-item__label:before,.form-create.is-preview .el-form-item.is-required>.el-form-item__label:before,.form-create.is-preview .fc-clock{display:none!important}.fc-wrap-left .el-form-item__label{justify-content:flex-start;justify-content:flex-end}.fc-wrap-top.el-form-item{display:block}.fc-wrap-top.el-form-item .el-form-item__label{display:block;height:auto;line-height:22px;margin-bottom:8px;text-align:left}.el-form--large .fc-wrap-top.el-form-item .el-form-item__label{line-height:22px;margin-bottom:12px}.el-form--default .fc-wrap-top.el-form-item .el-form-item__label{line-height:22px;margin-bottom:8px}.el-form--small .fc-wrap-top.el-form-item .el-form-item__label{line-height:20px;margin-bottom:4px}";
Ue(na);
function Mt(n, t) {
  return v.Boolean(n) ? n = {
    show: n
  } : !v.Undef(n) && !v.Object(n) && (n = {
    show: t
  }), n;
}
function ra(n, t) {
  return {
    formEl: function() {
      return t.$manager.form();
    },
    wrapEl: function(r) {
      var i = t.getFieldCtx(r);
      if (i)
        return t.vm.refs[i.wrapRef];
    },
    validate: function(r) {
      return new Promise(function(i, a) {
        var o = n.children, u = [t.$manager.validate()];
        o.forEach(function(s) {
          u.push(s.validate());
        }), Promise.all(u).then(function() {
          i(!0), r && r(!0);
        }).catch(function(s) {
          a(s), r && r(s), t.vm.emit("validate-fail", s, {
            api: n
          });
        });
      });
    },
    validateField: function(r, i) {
      return new Promise(function(a, o) {
        var u = t.getFieldCtx(r);
        if (u) {
          var s = t.subForm[u.id], l = [t.$manager.validateField(u.id)];
          X(s).forEach(function(f) {
            l.push(f.validate());
          }), Promise.all(l).then(function() {
            a(null), i && i(null);
          }).catch(function(f) {
            o(f), i && i(f), t.vm.emit("validate-field-fail", f, {
              field: r,
              api: n
            });
          });
        }
      });
    },
    clearValidateState: function(r) {
      var i = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      n.helper.tidyFields(r).forEach(function(o) {
        a && i.clearSubValidateState(o), t.getCtxs(o).forEach(function(u) {
          t.$manager.clearValidateState(u);
        });
      });
    },
    clearSubValidateState: function(r) {
      n.helper.tidyFields(r).forEach(function(i) {
        t.getCtxs(i).forEach(function(a) {
          var o = t.subForm[a.id];
          o && (Array.isArray(o) ? o.forEach(function(u) {
            u.clearValidateState();
          }) : o && o.clearValidateState());
        });
      });
    },
    btn: {
      loading: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          loading: !!r
        });
      },
      disabled: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          disabled: !!r
        });
      },
      show: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          show: !!r
        });
      }
    },
    resetBtn: {
      loading: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          loading: !!r
        });
      },
      disabled: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          disabled: !!r
        });
      },
      show: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          show: !!r
        });
      }
    },
    submitBtnProps: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = Mt(t.options.submitBtn, !0);
      C(i, r), t.options.submitBtn = i, n.refreshOptions();
    },
    resetBtnProps: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = Mt(t.options.resetBtn, !1);
      C(i, r), t.options.resetBtn = i, n.refreshOptions();
    },
    submit: function(r, i) {
      return new Promise(function(a, o) {
        n.validate().then(function() {
          var u = n.formData();
          v.Function(r) && j(function() {
            return r(u, n);
          }), v.Function(t.options.onSubmit) && j(function() {
            return t.options.onSubmit(u, n);
          }), t.vm.emit("submit", u, n), a(u);
        }).catch(function() {
          for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++)
            s[l] = arguments[l];
          v.Function(i) && j(function() {
            return i.apply(void 0, [n].concat(s));
          }), o.apply(void 0, s);
        });
      });
    }
  };
}
var lt = {
  name: "required",
  load: function(t, e, r) {
    var i = ia(t.getValue());
    if (i.required === !1)
      t.clearProp(), r.clearValidateState([e.field]);
    else {
      var a = _({
        required: !0,
        validator: function(s, l, f) {
          v.empty(l) ? f(a.message) : f();
        }
      }, i);
      if (!a.message) {
        var o = e.title || "";
        a.message = ((L(o) === "object" ? o.title : o) || "") + "不能为空";
      }
      t.getProp().validate = [a];
    }
    r.sync(e);
  },
  watch: function() {
    lt.load.apply(lt, arguments);
  }
};
function ia(n) {
  return v.Boolean(n) ? {
    required: n
  } : v.String(n) ? {
    message: n
  } : v.Undef(n) ? {
    required: !1
  } : v.Function(n) ? {
    validator: n
  } : v.Object(n) ? n : {};
}
function aa(n) {
  n.componentAlias(Yi), Ur.forEach(function(t) {
    n.component(t.name, t);
  }), n.register(lt), Gi.forEach(function(t) {
    n.parser(t);
  }), Object.keys(Ce).forEach(function(t) {
    n.maker[t] = Ce[t];
  }), typeof window < "u" && window.ElementPlus && n.useApp(function(t, e) {
    e.use(window.ElementPlus);
  });
}
function oa() {
  return hn({
    ui: "element-ui",
    version: "3.2.10",
    manager: Ki,
    extendApi: ra,
    install: aa,
    attrs: {
      normal: ["col", "wrap"],
      array: ["className"],
      key: ["title", "info"]
    }
  });
}
var mn = oa();
typeof window < "u" && (window.formCreate = mn);
mn.maker;
export {
  mn as F
};
