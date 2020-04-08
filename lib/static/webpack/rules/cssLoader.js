"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _extractCssChunksWebpackPlugin = _interopRequireDefault(require("extract-css-chunks-webpack-plugin"));

var _postcssFlexbugsFixes = _interopRequireDefault(require("postcss-flexbugs-fixes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function initCSSLoader() {
  var cssLoader = [{
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: false
    }
  }, {
    loader: 'postcss-loader',
    options: {
      // Necessary for external CSS imports to work
      // https://github.com/facebookincubator/create-react-app/issues/2677
      sourceMap: true,
      ident: 'postcss',
      plugins: function plugins() {
        return [_postcssFlexbugsFixes.default, (0, _autoprefixer.default)({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009' // I'd opt in for this - safari 9 & IE 10.

        })];
      }
    }
  }];
  return cssLoader;
}

var _default = function _default(_ref) {
  var stage = _ref.stage,
      isNode = _ref.isNode;
  var cssLoader = initCSSLoader();

  if (stage === 'node' || isNode) {
    return {
      test: /\.css$/,
      loader: cssLoader
    };
  }

  cssLoader = [_extractCssChunksWebpackPlugin.default.loader].concat(_toConsumableArray(cssLoader)); // seeing as it's HMR, why not :)

  return {
    test: /\.css$/,
    loader: cssLoader
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

  reactHotLoader.register(initCSSLoader, "initCSSLoader", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/rules/cssLoader.js");
  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/rules/cssLoader.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=cssLoader.js.map