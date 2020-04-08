"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePageRoutes;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function makePageRoutes(_ref) {
  var items = _ref.items,
      pageSize = _ref.pageSize,
      _ref$pageToken = _ref.pageToken,
      pageToken = _ref$pageToken === void 0 ? 'page' : _ref$pageToken,
      route = _ref.route,
      decorate = _ref.decorate;

  var itemsCopy = _toConsumableArray(items); // Make a copy of the items


  var pages = []; // Make an array for all of the different pages

  while (itemsCopy.length) {
    // Splice out all of the items into separate pages using a set pageSize
    pages.push(itemsCopy.splice(0, pageSize));
  }

  var totalPages = pages.length; // Move the first page out of pagination. This is so page one doesn't require a page number.

  var firstPage = pages[0];
  var routes = [_objectSpread({}, route, decorate(firstPage, 1, totalPages))].concat(_toConsumableArray(pages.map(function (page, i) {
    return _objectSpread({}, route, {
      // route defaults
      path: "".concat(route.path, "/").concat(pageToken, "/").concat(i + 1)
    }, decorate(page, i + 1, totalPages));
  })));
  return routes;
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(makePageRoutes, "makePageRoutes", "/Users/weikaizhang/react-static/packages/react-static/src/node/makePageRoutes.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=makePageRoutes.js.map