"use strict";

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/* eslint-disable import/no-dynamic-require */
var plugins = require(process.env.REACT_STATIC_PLUGINS_PATH).default;

var _require = require('./browser'),
    registerPlugins = _require.registerPlugins;

registerPlugins(plugins);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept(process.env.REACT_STATIC_PLUGINS_PATH, function () {
    registerPlugins(require(process.env.REACT_STATIC_PLUGINS_PATH).default);
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(plugins, "plugins", "/Users/weikaizhang/react-static/packages/react-static/src/bootstrapPlugins.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=bootstrapPlugins.js.map