"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _extractCssChunksWebpackPlugin = _interopRequireDefault(require("extract-css-chunks-webpack-plugin"));

var _path = _interopRequireDefault(require("path"));

var _rules = _interopRequireDefault(require("./rules"));

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
  var _config$paths = config.paths,
      ROOT = _config$paths.ROOT,
      DIST = _config$paths.DIST,
      NODE_MODULES = _config$paths.NODE_MODULES,
      SRC = _config$paths.SRC,
      HTML_TEMPLATE = _config$paths.HTML_TEMPLATE;
  process.env.REACT_STATIC_BASE_PATH = config.basePath;
  process.env.REACT_STATIC_PUBLIC_PATH = config.publicPath;
  process.env.REACT_STATIC_ASSETS_PATH = config.assetsPath;
  return {
    mode: 'development',
    optimization: {
      noEmitOnErrors: true,
      concatenateModules: true
    },
    context: _path.default.resolve(__dirname, '../../../node_modules'),
    entry: [require.resolve('react-dev-utils/webpackHotDevClient'), require.resolve('webpack/hot/only-dev-server')].concat(_toConsumableArray(config.disableRuntime ? [] : [require.resolve('../../bootstrapPlugins'), require.resolve('../../bootstrapTemplates')]), [_path.default.resolve(ROOT, config.entry)]).filter(Boolean),
    output: {
      filename: '[name].js',
      // never hash dev code
      chunkFilename: 'templates/[name].js',
      path: DIST,
      publicPath: process.env.REACT_STATIC_ASSETS_PATH || '/'
    },
    module: {
      rules: (0, _rules.default)({
        config: config,
        stage: 'dev'
      }),
      strictExportPresence: true
    },
    resolve: {
      modules: ['node_modules'].concat(_toConsumableArray([NODE_MODULES, SRC, DIST].map(function (d) {
        return _path.default.relative(process.cwd(), d);
      }))),
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    },
    plugins: [new _webpack.default.EnvironmentPlugin(process.env), new _htmlWebpackPlugin.default({
      inject: true,
      template: "!!raw-loader!".concat(HTML_TEMPLATE)
    }), new _webpack.default.HotModuleReplacementPlugin(), new _webpack.default.NamedModulesPlugin(), new _webpack.default.NoEmitOnErrorsPlugin(), new _caseSensitivePathsWebpackPlugin.default(), new _extractCssChunksWebpackPlugin.default({
      hot: true
    })],
    devtool: 'cheap-module-source-map'
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

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/webpack.config.dev.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=webpack.config.dev.js.map