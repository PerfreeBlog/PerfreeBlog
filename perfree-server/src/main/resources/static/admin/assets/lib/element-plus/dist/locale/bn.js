/*! Element Plus v2.8.8 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ElementPlusLocaleBn = factory());
})(this, (function () { 'use strict';

  var bn = {
    name: "bn",
    el: {
      breadcrumb: {
        label: "Breadcrumb"
      },
      colorpicker: {
        confirm: "\u09A0\u09BF\u0995 \u0986\u099B\u09C7",
        clear: "\u0995\u09CD\u09B2\u09BF\u09DF\u09BE\u09B0"
      },
      datepicker: {
        now: "\u098F\u0996\u09A8",
        today: "\u0986\u099C",
        cancel: "\u09AC\u09BE\u09A4\u09BF\u09B2",
        clear: "\u0995\u09CD\u09B2\u09BF\u09DF\u09BE\u09B0",
        confirm: "\u09A0\u09BF\u0995 \u0986\u099B\u09C7",
        selectDate: "\u09A4\u09BE\u09B0\u09BF\u0996 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
        selectTime: "\u09B8\u09AE\u09DF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
        startDate: "\u09AF\u09C7 \u09A4\u09BE\u09B0\u09BF\u0996 \u09A5\u09C7\u0995\u09C7",
        startTime: "\u09AF\u09C7 \u09B8\u09AE\u09DF \u09A5\u09C7\u0995\u09C7",
        endDate: "\u09AF\u09C7 \u09A4\u09BE\u09B0\u09BF\u0996 \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4",
        endTime: "\u09AF\u09C7 \u09B8\u09AE\u09DF \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4",
        prevYear: "\u09AA\u09C2\u09B0\u09CD\u09AC\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AC\u099B\u09B0",
        nextYear: "\u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AC\u099B\u09B0",
        prevMonth: "\u09AA\u09C2\u09B0\u09CD\u09AC\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AE\u09BE\u09B8",
        nextMonth: "\u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AE\u09BE\u09B8",
        year: "\u09B8\u09BE\u09B2",
        month1: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF",
        month2: "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09C0",
        month3: "\u09AE\u09BE\u09B0\u09CD\u099A",
        month4: "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2",
        month5: "\u09AE\u09C7",
        month6: "\u099C\u09C1\u09A8",
        month7: "\u099C\u09C1\u09B2\u09BE\u0987",
        month8: "\u0986\u0997\u09B7\u09CD\u099F",
        month9: "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0",
        month10: "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0",
        month11: "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0",
        month12: "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0",
        week: "\u09B8\u09BE\u09AA\u09CD\u09A4\u09BE\u09B9",
        weeks: {
          sun: "\u09B0\u09AC\u09BF",
          mon: "\u09B8\u09CB\u09AE",
          tue: "\u09AE\u0999\u09CD\u0997\u09B2",
          wed: "\u09AC\u09C1\u09A7",
          thu: "\u09AC\u09C3\u09B9\u0983",
          fri: "\u09B6\u09C1\u0995\u09CD\u09B0",
          sat: "\u09B6\u09A8\u09BF"
        },
        months: {
          jan: "\u099C\u09BE\u09A8\u09C1",
          feb: "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1",
          mar: "\u09AE\u09BE\u09B0\u09CD\u099A",
          apr: "\u098F\u09AA\u09CD\u09B0\u09BF",
          may: "\u09AE\u09C7",
          jun: "\u099C\u09C1\u09A8",
          jul: "\u099C\u09C1\u09B2\u09BE",
          aug: "\u0986\u0997",
          sep: "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7",
          oct: "\u0986\u0995\u09CD\u099F\u09CB",
          nov: "\u09A8\u09AD\u09C7",
          dec: "\u09A1\u09BF\u09B8\u09C7"
        }
      },
      select: {
        loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7",
        noMatch: "\u0995\u09CB\u09A8 \u09AE\u09BF\u09B2 \u09AA\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF",
        noData: "\u0995\u09CB\u09A8 \u09A1\u09BE\u099F\u09BE \u09A8\u09C7\u0987",
        placeholder: "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8"
      },
      mention: {
        loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7"
      },
      cascader: {
        noMatch: "\u0995\u09CB\u09A8 \u09AE\u09BF\u09B2 \u09AA\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF",
        loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7",
        placeholder: "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
        noData: "\u0995\u09CB\u09A8 \u09A1\u09BE\u099F\u09BE \u09A8\u09C7\u0987"
      },
      pagination: {
        goto: "\u09AF\u09BE\u09A8",
        pagesize: "/\u09AA\u09C7\u099C",
        total: "\u09AE\u09CB\u099F {total}",
        pageClassifier: "",
        page: "Page",
        prev: "Go to previous page",
        next: "Go to next page",
        currentPage: "page {pager}",
        prevPages: "Previous {pager} pages",
        nextPages: "Next {pager} pages",
        deprecationWarning: "\u0985\u09AA\u09CD\u09B0\u099A\u09B2\u09BF\u09A4 (Deprecated) \u09AC\u09CD\u09AF\u09BE\u09AC\u09B9\u09BE\u09B0 \u09AA\u0993\u09DF\u09BE \u0997\u09C7\u099B\u09C7, \u0986\u09B0\u0993 \u099C\u09BE\u09A8\u09A4\u09C7 \u099A\u09BE\u0987\u09B2\u09C7, \u09A6\u09DF\u09BE \u0995\u09B0\u09C7 el-pagination \u098F\u09B0 \u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F\u09C7\u09B6\u09A8 \u09A6\u09C7\u0996\u09C1\u09A8"
      },
      messagebox: {
        title: "\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE",
        confirm: "\u09A0\u09BF\u0995 \u0986\u099B\u09C7",
        cancel: "\u09AC\u09BE\u09A4\u09BF\u09B2",
        error: "\u0987\u09A8\u09AA\u09C1\u099F \u09A1\u09BE\u099F\u09BE \u0997\u09CD\u09B0\u09B9\u09A8\u09AF\u09CB\u0997\u09CD\u09AF \u09A8\u09DF"
      },
      upload: {
        deleteTip: '\u0985\u09AA\u09B8\u09BE\u09B0\u09A3 \u0995\u09B0\u09A4\u09C7 "\u09A1\u09BF\u09B2\u09BF\u099F" \u098F \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0\u09C1\u09A8',
        delete: "\u09A1\u09BF\u09B2\u09BF\u099F",
        preview: "\u09AA\u09CD\u09B0\u09BF\u09AD\u09BF\u0989",
        continue: "\u099A\u09BE\u09B2\u09BF\u09DF\u09C7 \u09AF\u09BE\u09A8"
      },
      table: {
        emptyText: "\u0995\u09CB\u09A8 \u09A1\u09BE\u099F\u09BE \u09A8\u09C7\u0987",
        confirmFilter: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8",
        resetFilter: "\u09B0\u09BF\u09B8\u09C7\u099F",
        clearFilter: "\u09B8\u09AC",
        sumText: "\u09B8\u09BE\u09B0\u09BE\u0982\u09B6"
      },
      tree: {
        emptyText: "\u0995\u09CB\u09A8 \u09A1\u09BE\u099F\u09BE \u09A8\u09C7\u0987"
      },
      transfer: {
        noMatch: "\u0995\u09CB\u09A8 \u09AE\u09BF\u09B2 \u09AA\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF",
        noData: "\u0995\u09CB\u09A8 \u09A1\u09BE\u099F\u09BE \u09A8\u09C7\u0987",
        titles: ["\u09B2\u09BF\u09B8\u09CD\u099F \u09E7", "\u09B2\u09BF\u09B8\u09CD\u099F \u09E8"],
        filterPlaceholder: "\u09B8\u09BE\u09B0\u09CD\u099A \u0995\u09B0\u09C1\u09A8",
        noCheckedFormat: "{total} \u0986\u0987\u099F\u09C7\u09AE",
        hasCheckedFormat: "{checked}/{total} \u099F\u09BF\u0995 \u0995\u09B0\u09BE \u09B9\u09DF\u09C7\u099B\u09C7"
      },
      image: {
        error: "\u09AC\u09CD\u09AF\u09B0\u09CD\u09A5 \u09B9\u09DF\u09C7\u099B\u09C7"
      },
      pageHeader: {
        title: "\u09AA\u09BF\u099B\u09A8\u09C7"
      },
      popconfirm: {
        confirmButtonText: "\u09B9\u09CD\u09AF\u09BE",
        cancelButtonText: "\u09A8\u09BE"
      },
      carousel: {
        leftArrow: "Carousel arrow left",
        rightArrow: "Carousel arrow right",
        indicator: "Carousel switch to index {index}"
      }
    }
  };

  return bn;

}));
