"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var stage = _ref.stage,
      isNode = _ref.isNode;

  if (stage === 'node' || isNode) {
    return {
      loader: 'url-loader',
      exclude: [/\.js$/, /\.html$/, /\.json$/] // Don't generate extra files during node build

    };
  }

  return {
    loader: 'url-loader',
    exclude: [/\.js$/, /\.html$/, /\.json$/],
    query: {
      limit: 10000,
      name: 'static/[name].[hash:8].[ext]'
    }
  };
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/rules/fileLoader.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=fileLoader.js.map