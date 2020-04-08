"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputBuildInfo = outputBuildInfo;
exports.importBuildInfo = importBuildInfo;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function outputBuildInfo(config) {
  return _fsExtra.default.outputFileSync(_path.default.join(config.paths.BUILD_ARTIFACTS, 'react-static-build-config.json'), JSON.stringify(config, null, 2));
}

function importBuildInfo(config) {
  return _fsExtra.default.readJson(_path.default.join(config.paths.BUILD_ARTIFACTS, 'react-static-build-config.json'));
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(outputBuildInfo, "outputBuildInfo", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildInfo.js");
  reactHotLoader.register(importBuildInfo, "importBuildInfo", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildInfo.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=buildInfo.js.map