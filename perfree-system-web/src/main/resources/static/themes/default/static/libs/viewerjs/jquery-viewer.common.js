/*!
 * jQuery Viewer v1.0.1
 * https://fengyuanchen.github.io/jquery-viewer
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-12-14T09:00:02.315Z
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $ = _interopDefault(require('jquery'));
var Viewer = _interopDefault(require('viewerjs'));

if ($ && $.fn && Viewer) {
  var AnotherViewer = $.fn.viewer;
  var NAMESPACE = 'viewer';

  $.fn.viewer = function jQueryViewer(option) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result;
    this.each(function (i, element) {
      var $element = $(element);
      var isDestroy = option === 'destroy';
      var viewer = $element.data(NAMESPACE);

      if (!viewer) {
        if (isDestroy) {
          return;
        }

        var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
        viewer = new Viewer(element, options);
        $element.data(NAMESPACE, viewer);
      }

      if (typeof option === 'string') {
        var fn = viewer[option];

        if ($.isFunction(fn)) {
          result = fn.apply(viewer, args);

          if (result === viewer) {
            result = undefined;
          }

          if (isDestroy) {
            $element.removeData(NAMESPACE);
          }
        }
      }
    });
    return result !== undefined ? result : this;
  };

  $.fn.viewer.Constructor = Viewer;
  $.fn.viewer.setDefaults = Viewer.setDefaults;

  $.fn.viewer.noConflict = function noConflict() {
    $.fn.viewer = AnotherViewer;
    return this;
  };
}
