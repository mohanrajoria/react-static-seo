"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _path = _interopRequireDefault(require("path"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));

var _extractCssChunksWebpackPlugin = _interopRequireDefault(require("extract-css-chunks-webpack-plugin"));

var _optimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("optimize-css-assets-webpack-plugin"));

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

function common(config) {
  var _config$paths = config.paths,
      ROOT = _config$paths.ROOT,
      DIST = _config$paths.DIST,
      NODE_MODULES = _config$paths.NODE_MODULES,
      SRC = _config$paths.SRC,
      ASSETS = _config$paths.ASSETS;
  process.env.REACT_STATIC_ENTRY_PATH = _path.default.resolve(ROOT, config.entry);
  process.env.REACT_STATIC_SITE_ROOT = config.siteRoot;
  process.env.REACT_STATIC_BASE_PATH = config.basePath;
  process.env.REACT_STATIC_PUBLIC_PATH = config.publicPath;
  process.env.REACT_STATIC_ASSETS_PATH = config.assetsPath;

  if (!DIST.startsWith(ROOT)) {
    // we build outside of project dir, so reset some paths
    process.env.REACT_STATIC_ASSETS_PATH = config.assetsPath.replace(DIST, '');
  }

  var splitChunks = {
    chunks: 'all',
    minSize: 10000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 5,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all'
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  };
  var extrackCSSChunks = new _extractCssChunksWebpackPlugin.default({
    filename: '[name].[chunkHash:8].css',
    chunkFilename: '[id].[chunkHash:8].css'
  });

  if (!config.extractCssChunks) {
    splitChunks.cacheGroups = {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    };
    extrackCSSChunks = new _extractCssChunksWebpackPlugin.default({
      filename: '[name].[chunkHash:8].css'
    });
  }

  return {
    mode: 'production',
    context: _path.default.resolve(__dirname, '../../../node_modules'),
    entry: config.disableRuntime ? _path.default.resolve(ROOT, config.entry) : [require.resolve('../../bootstrapPlugins'), require.resolve('../../bootstrapTemplates'), require.resolve('../../bootstrapApp')],
    output: {
      filename: '[name].[hash:8].js',
      // dont use chunkhash, its not a chunk
      chunkFilename: 'templates/[name].[chunkHash:8].js',
      path: ASSETS,
      publicPath: process.env.REACT_STATIC_ASSETS_PATH || '/'
    },
    optimization: {
      sideEffects: true,
      minimize: true,
      minimizer: [new _terserWebpackPlugin.default({
        cache: true,
        parallel: true,
        exclude: /\.min\.js/,
        sourceMap: false,
        terserOptions: {
          ie8: false,
          mangle: {
            safari10: true
          },
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5
          },
          output: {
            ecma: 5
          } // consider passing terser options here in future

        } // consider passing more options here in future

      }), new _optimizeCssAssetsWebpackPlugin.default({})],
      splitChunks: splitChunks
    },
    module: {
      rules: (0, _rules.default)({
        config: config,
        stage: 'prod',
        isNode: false
      }),
      strictExportPresence: true
    },
    resolve: {
      modules: ['node_modules'].concat(_toConsumableArray([NODE_MODULES, SRC, DIST].map(function (d) {
        return DIST.startsWith(ROOT) ? _path.default.relative(process.cwd(), d) : _path.default.resolve(d);
      }))),
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    },
    externals: [],
    target: undefined,
    plugins: [new _webpack.default.EnvironmentPlugin(process.env), extrackCSSChunks, new _caseSensitivePathsWebpackPlugin.default(), config.bundleAnalyzer && new _webpackBundleAnalyzer.BundleAnalyzerPlugin()].filter(function (d) {
      return d;
    }),
    devtool: false
  };
}

var _default = function _default(_ref) {
  var config = _ref.config,
      isNode = _ref.isNode;
  var result = common(config);
  if (!isNode) return result; // Node only!!!

  result.output.filename = 'static-app.js';
  result.output.path = config.paths.BUILD_ARTIFACTS;
  result.output.libraryTarget = 'umd';
  result.optimization.minimize = false;
  result.optimization.minimizer = [];
  result.target = 'node';
  result.devtool = false;
  result.externals = [(0, _webpackNodeExternals.default)({
    whitelist: ['react-universal-component', 'webpack-flush-chunks', 'react-static']
  })];
  result.module.rules = (0, _rules.default)({
    config: config,
    stage: 'prod',
    isNode: true
  });
  result.plugins = [new _webpack.default.EnvironmentPlugin(process.env), new _caseSensitivePathsWebpackPlugin.default(), new _webpack.default.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  })];
  return result;
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(common, "common", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/webpack.config.prod.js");
  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/webpack.config.prod.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=webpack.config.prod.js.map