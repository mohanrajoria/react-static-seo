"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _os = _interopRequireDefault(require("os"));

var _child_process = require("child_process");

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

var _exporter = _interopRequireDefault(require("./exporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cores = Math.max(_os.default.cpus().length, 1);

var _default =
/*#__PURE__*/
function () {
  var _buildHTML = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var oldConfig, siteData, clientStats, incremental, routes, config, threads, htmlProgress, exporters, _i, exporterRoutes;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            oldConfig = _ref.config, siteData = _ref.siteData, clientStats = _ref.clientStats, incremental = _ref.incremental;
            routes = oldConfig.routes, config = _objectWithoutProperties(oldConfig, ["routes"]);
            (0, _utils.time)(_chalk.default.green("=> [\u2713] HTML Exported")); // in case of an absolute path for DIST we must tell node to load the modules from our project root

            if (!config.paths.DIST.startsWith(config.paths.ROOT)) {
              process.env.NODE_PATH = config.paths.NODE_MODULES;

              require('module').Module._initPaths();
            } // Single threaded export


            if (!(config.maxThreads <= 1)) {
              _context.next = 10;
              break;
            }

            console.log('=> Exporting HTML...');
            _context.next = 8;
            return (0, _exporter.default)({
              config: config,
              routes: routes,
              siteData: siteData,
              clientStats: clientStats,
              incremental: incremental
            });

          case 8:
            _context.next = 19;
            break;

          case 10:
            // Multi-threaded export
            threads = Math.min(cores, config.maxThreads);
            htmlProgress = (0, _utils.progress)(routes.length);
            console.log("=> Exporting HTML across ".concat(threads, " threads..."));
            exporters = [];

            for (_i = 0; _i < threads; _i++) {
              exporters.push((0, _child_process.fork)(require.resolve('./exporter.threaded'), [], {
                env: _objectSpread({}, process.env, {
                  REACT_STATIC_SLAVE: 'true'
                }),
                stdio: 'inherit'
              }));
            }

            exporterRoutes = exporters.map(function () {
              return [];
            });
            routes.forEach(function (route, i) {
              exporterRoutes[i % exporterRoutes.length].push(route);
            });
            _context.next = 19;
            return Promise.all(exporters.map(function (exporter, i) {
              var routes = exporterRoutes[i];
              return new Promise(function (resolve, reject) {
                exporter.send({
                  config: config,
                  routes: routes,
                  siteData: siteData,
                  clientStats: clientStats,
                  incremental: incremental
                });
                exporter.on('message', function (_ref2) {
                  var type = _ref2.type,
                      payload = _ref2.payload;

                  if (type === 'error') {
                    reject(payload);
                  }

                  if (type === 'log') {
                    var _console;

                    (_console = console).log.apply(_console, _toConsumableArray(payload));
                  }

                  if (type === 'tick') {
                    htmlProgress.tick();
                  }

                  if (type === 'done') {
                    resolve();
                  }
                });
              });
            }));

          case 19:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] HTML Exported"));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function buildHTML(_x) {
    return _buildHTML.apply(this, arguments);
  }

  return buildHTML;
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cores, "cores", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildHTML.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=buildHTML.js.map