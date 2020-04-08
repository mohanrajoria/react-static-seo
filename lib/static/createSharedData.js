"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSharedData;

var _shorthash = _interopRequireDefault(require("shorthash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function createSharedData(data) {
  return {
    hash: _shorthash.default.unique(JSON.stringify(data)),
    data: data
  };
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createSharedData, "createSharedData", "/Users/weikaizhang/react-static/packages/react-static/src/static/createSharedData.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=createSharedData.js.map