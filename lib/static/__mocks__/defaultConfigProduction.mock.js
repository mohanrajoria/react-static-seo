"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = {
  siteRoot: '',
  basePath: '',
  assetsPath: '',
  prefetchRate: 5,
  inlineCss: false,
  outputFileRate: 100,
  extractCssChunks: false,
  entry: './root/src/index.js',
  paths: {
    ROOT: './root/',
    TEMP: './root/tmp',
    SRC: './root/src',
    DIST: './root/dist',
    ASSETS: './root/dist',
    PUBLIC: './root/public',
    PACKAGE: './root/package.json',
    NODE_MODULES: './root/node_modules',
    STATIC_DATA: './root/dist/staticData',
    HTML_TEMPLATE: './root/dist/index.html',
    LOCAL_NODE_MODULES: './dirname/../../node_modules'
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/__mocks__/defaultConfigProduction.mock.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=defaultConfigProduction.mock.js.map