"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.buildConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _resolveFrom = _interopRequireDefault(require("resolve-from"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _getDirname = _interopRequireDefault(require("../utils/getDirname"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// the default static.config.js location
var defaultConfig = {};
var DEFAULT_NAME_FOR_STATIC_CONFIG_FILE = 'static.config';

var DEFAULT_PATH_FOR_STATIC_CONFIG = _path.default.resolve(_path.default.join(process.cwd(), DEFAULT_NAME_FOR_STATIC_CONFIG_FILE));

var DEFAULT_ROUTES = [{
  path: '/'
}];
var DEFAULT_ENTRY = 'index';
var DEFAULT_EXTENSIONS = ['.js', '.jsx'];

var buildConfig = function buildConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      sync = _ref.sync;

  // path defaults
  config.paths = _objectSpread({
    root: _path.default.resolve(process.cwd()),
    src: 'src',
    dist: 'dist',
    temp: 'tmp',
    buildArtifacts: 'artifacts',
    devDist: 'tmp/dev-server',
    public: 'public',
    plugins: 'plugins',
    pages: 'src/pages',
    nodeModules: 'node_modules',
    assets: ''
  }, config.paths || {}); // Use the root to resolve all other relative paths

  var resolvePath = function resolvePath(relativePath) {
    return _path.default.resolve(config.paths.root, relativePath);
  }; // Resolve all paths


  var DIST = process.env.REACT_STATIC_ENV === 'development' ? resolvePath(config.paths.devDist || config.paths.dist) : resolvePath(config.paths.dist);

  var ASSETS = _path.default.resolve(DIST, config.paths.assets);

  var paths = {
    ROOT: config.paths.root,
    LOCAL_NODE_MODULES: _path.default.resolve((0, _getDirname.default)(), '../../node_modules'),
    SRC: resolvePath(config.paths.src),
    PAGES: resolvePath(config.paths.pages),
    DIST: DIST,
    ASSETS: ASSETS,
    PLUGINS: resolvePath(config.paths.plugins),
    TEMP: resolvePath(config.paths.temp),
    BUILD_ARTIFACTS: resolvePath(config.paths.buildArtifacts),
    PUBLIC: resolvePath(config.paths.public),
    NODE_MODULES: resolvePath(config.paths.nodeModules),
    EXCLUDE_MODULES: config.paths.excludeResolvedModules || resolvePath(config.paths.nodeModules),
    PACKAGE: resolvePath('package.json'),
    HTML_TEMPLATE: _path.default.join(DIST, 'index.html'),
    STATIC_DATA: _path.default.join(ASSETS, 'staticData')
  };
  var siteRoot = '';
  var basePath = '';

  if (process.env.REACT_STATIC_ENV === 'development') {
    basePath = (0, _utils.cleanSlashes)(config.devBasePath);
  } else if (process.env.REACT_STATIC_STAGING === 'true') {
    siteRoot = (0, _utils.cutPathToRoot)(config.stagingSiteRoot, '$1');
    basePath = (0, _utils.cleanSlashes)(config.stagingBasePath);
  } else {
    siteRoot = (0, _utils.cutPathToRoot)(config.siteRoot, '$1');
    basePath = (0, _utils.cleanSlashes)(config.basePath);
  }

  var publicPath = "".concat((0, _utils.cleanSlashes)("".concat(siteRoot, "/").concat(basePath)), "/");
  var assetsPath = (0, _utils.cleanSlashes)(config.assetsPath || paths.assets);

  if (assetsPath && !(0, _utils.isAbsoluteUrl)(assetsPath)) {
    assetsPath = "/".concat((0, _utils.cleanSlashes)("".concat(basePath, "/").concat(assetsPath)), "/");
  } // Add the project root as a plugin. This allows the dev
  // to use the plugin api directory in their project if they want


  var plugins = _toConsumableArray(config.plugins || []).concat([paths.ROOT]);

  var DEFAULT_ENTRY_PATH = _path.default.join(paths.SRC, DEFAULT_ENTRY); // Defaults


  config = _objectSpread({
    // Defaults
    entry: resolveModule(DEFAULT_ENTRY_PATH, config) || "".concat(DEFAULT_ENTRY_PATH, ".js"),
    getSiteData: function getSiteData() {
      return {};
    },
    prefetchRate: 5,
    maxThreads: Infinity,
    disableRoutePrefixing: false,
    outputFileRate: 100,
    extensions: DEFAULT_EXTENSIONS,
    getRoutes: function () {
      var _getRoutes = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", DEFAULT_ROUTES);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRoutes() {
        return _getRoutes.apply(this, arguments);
      }

      return getRoutes;
    }(),
    minLoadTime: 200,
    disablePreload: false,
    disableRuntime: false,
    preloadPollInterval: 300
  }, config, {
    // Materialized Overrides
    plugins: plugins,
    paths: paths,
    babelExcludes: config.babelExcludes || [],
    siteRoot: siteRoot,
    basePath: basePath,
    publicPath: publicPath,
    assetsPath: assetsPath,
    extractCssChunks: config.extractCssChunks || false,
    inlineCss: config.inlineCss || false // Set env variables to be used client side

  });
  process.env.REACT_STATIC_MIN_LOAD_TIME = config.minLoadTime;
  process.env.REACT_STATIC_PREFETCH_RATE = config.prefetchRate;
  process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING = config.disableRoutePrefixing;
  process.env.REACT_STATIC_DISABLE_PRELOAD = config.disablePreload;
  process.env.REACT_STATIC_DISABLE_RUNTIME = config.disableRuntime;
  process.env.REACT_STATIC_PRELOAD_POLL_INTERVAL = config.preloadPollInterval;
  process.env.REACT_STATIC_TEMPLATES_PATH = _path.default.join(paths.BUILD_ARTIFACTS, 'react-static-templates.js');
  process.env.REACT_STATIC_PLUGINS_PATH = _path.default.join(paths.BUILD_ARTIFACTS, 'react-static-browser-plugins.js');
  process.env.REACT_STATIC_UNIVERSAL_PATH = require.resolve('react-universal-component');

  var resolvePlugin = function resolvePlugin(originalLocation) {
    var options = {};

    if (Array.isArray(originalLocation)) {
      options = originalLocation[1] || {};
      originalLocation = originalLocation[0];
    }

    var location = [function () {
      // Absolute
      if (_fsExtra.default.pathExistsSync(originalLocation)) {
        return originalLocation;
      }
    }, function () {
      // Absolute require
      try {
        var found = require.resolve(originalLocation);

        return found.includes('.') ? _path.default.resolve(found, '../') : found;
      } catch (err) {//
      }
    }, function () {
      // Plugins Dir
      var found = _path.default.resolve(paths.PLUGINS, originalLocation);

      if (_fsExtra.default.pathExistsSync(found)) {
        return found;
      }
    }, function () {
      // Plugins Dir require
      try {
        var found = (0, _resolveFrom.default)(paths.PLUGINS, originalLocation);
        return found.includes('.') ? _path.default.resolve(found, '../') : found;
      } catch (err) {//
      }
    }, function () {
      // CWD
      var found = _path.default.resolve(process.cwd(), originalLocation);

      if (_fsExtra.default.pathExistsSync(found)) {
        return found;
      }
    }, function () {
      // CWD require
      try {
        var found = (0, _resolveFrom.default)(process.cwd(), originalLocation);
        return found.includes('.') ? _path.default.resolve(found, '../') : found;
      } catch (err) {//
      }
    }, function () {
      if (process.env.NODE_ENV === 'test') {
        // Allow plugins to be mocked
        return 'mock-plugin';
      }
    }].reduce(function (prev, curr) {
      return prev || curr();
    }, null); // TODO: We have to do this because we don't have a good mock for process.cwd() :(

    if (!location) {
      throw new Error("Oh crap! Could not find a plugin directory for the plugin: \"".concat(originalLocation, "\". We must bail!"));
    }

    var nodeLocation = resolveModule(_path.default.join(location, 'node.api'), config);
    var browserLocation = resolveModule(_path.default.join(location, 'browser.api'), config);

    var getHooks = function getHooks() {
      return {};
    };

    try {
      // Get the hooks for the node api
      if (nodeLocation) {
        getHooks = require(nodeLocation).default;
      }

      var resolvedPlugin = {
        location: location,
        nodeLocation: nodeLocation,
        browserLocation: browserLocation,
        options: options,
        hooks: getHooks(options) || {} // Recursively resolve plugins

      };

      if (resolvedPlugin.plugins) {
        resolvedPlugin.plugins = resolvedPlugin.plugins.map(resolvePlugin);
      }

      return resolvedPlugin;
    } catch (err) {
      console.error("The following error occurred in the plugin located at \"".concat(nodeLocation, "\""));
      throw err;
    }
  };

  config.plugins = config.plugins.map(resolvePlugin);
  var configHook = (0, _utils.makeHookReducer)(config.plugins, 'config', {
    sync: sync
  });
  return configHook(config);
};

exports.buildConfig = buildConfig;

var buildConfigFromPath = function buildConfigFromPath(configPath, options) {
  delete require.cache[configPath];

  var config = require(configPath).default;

  return buildConfig(config, options);
}; // Retrieves the static.config.js from the current project directory


var getConfig = function getConfig() {
  var configPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PATH_FOR_STATIC_CONFIG;
  var subscription = arguments.length > 1 ? arguments[1] : undefined;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resolvedPath = resolveModule(configPath);
  var noConfig = configPath === DEFAULT_PATH_FOR_STATIC_CONFIG && !resolvedPath;

  var executeBuildConfig = function executeBuildConfig() {
    return noConfig ? buildConfig(defaultConfig, options) : buildConfigFromPath(resolvedPath || configPath, options);
  };

  if (!subscription) {
    return executeBuildConfig();
  } // If subscribing, return a never ending promise
  // Note: All subscriptions will be handled async


  return new Promise(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!noConfig) {
              _context3.next = 8;
              break;
            }

            _context3.t1 = subscription;
            _context3.next = 4;
            return executeBuildConfig();

          case 4:
            _context3.t2 = _context3.sent;
            _context3.t0 = (0, _context3.t1)(_context3.t2);
            _context3.next = 9;
            break;

          case 8:
            _context3.t0 = _chokidar.default.watch(resolvedPath).on('all',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee2() {
              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.t0 = subscription;
                      _context2.next = 3;
                      return executeBuildConfig();

                    case 3:
                      _context2.t1 = _context2.sent;
                      return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })));

          case 9:
            return _context3.abrupt("return", _context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
};

exports.default = getConfig;

function resolveModule(path, config) {
  try {
    // Load any module extension that is supported by Node (.js, .mjs, .node, etc),
    // or that have been registered via Node require hooks (.jsx, .ts, etc)
    return require.resolve(path);
  } catch (_unused) {
    // Fallback to the extensions that have been registered with Babel
    var extensions = config && config.extensions || DEFAULT_EXTENSIONS;
    return extensions.map(function (ext) {
      return path + ext;
    }).find(_fsExtra.default.pathExistsSync);
  }
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultConfig, "defaultConfig", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(DEFAULT_NAME_FOR_STATIC_CONFIG_FILE, "DEFAULT_NAME_FOR_STATIC_CONFIG_FILE", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(DEFAULT_PATH_FOR_STATIC_CONFIG, "DEFAULT_PATH_FOR_STATIC_CONFIG", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(DEFAULT_ROUTES, "DEFAULT_ROUTES", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(DEFAULT_ENTRY, "DEFAULT_ENTRY", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(DEFAULT_EXTENSIONS, "DEFAULT_EXTENSIONS", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(buildConfig, "buildConfig", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(buildConfigFromPath, "buildConfigFromPath", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
  reactHotLoader.register(resolveModule, "resolveModule", "/Users/weikaizhang/react-static/packages/react-static/src/static/getConfig.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=getConfig.js.map