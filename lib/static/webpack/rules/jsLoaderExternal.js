"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _babelPreset = _interopRequireDefault(require("../../../../babel-preset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(_ref) {
  var config = _ref.config;
  return {
    test: /\.(js|jsx|mjs)$/,
    exclude: [/@babel(?:\/|\\{1,2})runtime/].concat(_toConsumableArray(config.babelExcludes || [])),
    use: [// 'thread-loader',
    {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [[_babelPreset.default, {
          external: true,
          helpers: true
        }]],
        cacheDirectory: true,
        sourceMaps: false
      }
    }]
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

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/rules/jsLoaderExternal.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=jsLoaderExternal.js.map