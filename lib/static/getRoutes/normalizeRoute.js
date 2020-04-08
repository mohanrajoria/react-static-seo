"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeRoute;

var _utils = require("../../utils");

var _utils2 = require("../../browser/utils");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function normalizeRoute(route) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _parent$path = parent.path,
      parentPath = _parent$path === void 0 ? '/' : _parent$path;

  if (!route.path) {
    if (route.is404) {
      throw new Error("route.is404 has been deprecated. Use `path: '404'` instead! Route: ".concat(JSON.stringify(route)));
    }

    throw new Error("No path defined for route: ".concat(JSON.stringify(route)));
  }

  var originalRoutePath = (0, _utils.pathJoin)(route.path);
  var routePath = (0, _utils.pathJoin)(parentPath, route.path);

  if (typeof route.noIndex !== 'undefined') {
    console.warn("=> Warning: Route ".concat(route.path, " is using 'noIndex'. Did you mean 'noindex'?"));
  }

  var normalizedRoute = _objectSpread({}, route, {
    path: (0, _utils2.getRoutePath)(routePath),
    originalPath: originalRoutePath,
    noindex: typeof route.noindex !== 'undefined' ? route.noindex : parent.noindex,
    hasGetProps: !!route.getData,
    fromConfig: !route.isPage
  });

  return normalizedRoute;
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(normalizeRoute, "normalizeRoute", "/Users/weikaizhang/react-static/packages/react-static/src/static/getRoutes/normalizeRoute.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=normalizeRoute.js.map