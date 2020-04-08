"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _chalk = _interopRequireDefault(require("chalk"));

var _static = require("../static");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _bundle = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _ref,
        originalConfig,
        staging,
        debug,
        config,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, originalConfig = _ref.config, staging = _ref.staging, debug = _ref.debug;

            // ensure ENV variables are set
            if (typeof process.env.NODE_ENV === 'undefined' && !debug) {
              process.env.NODE_ENV = 'production';
            }

            process.env.REACT_STATIC_ENV = 'production';
            process.env.BABEL_ENV = 'production';

            if (staging) {
              process.env.REACT_STATIC_STAGING = 'true';
            }

            if (debug) {
              process.env.REACT_STATIC_DEBUG = 'true';
            } // Allow config location to be overriden


            _context.next = 8;
            return (0, _static.getConfig)(originalConfig);

          case 8:
            config = _context.sent;
            config.originalConfig = originalConfig;

            if (debug) {
              console.log('DEBUG - Resolved static.config.js:');
              console.log(config);
            }

            console.log('');

            if (!config.siteRoot) {
              console.log("=> Info: No 'siteRoot' is defined in 'static.config.js'. This is suggested for absolute urls and also required to automatically generate a sitemap.xml.");
              console.log('');
            } // Remove the DIST folder


            console.log('=> Cleaning dist...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Dist cleaned"));
            _context.next = 17;
            return _fsExtra.default.remove(config.paths.DIST);

          case 17:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Dist cleaned")); // Remove the ARTIFACTS folder

            console.log('=> Cleaning artifacts...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Artifacts cleaned"));
            _context.next = 22;
            return _fsExtra.default.remove(config.paths.BUILD_ARTIFACTS);

          case 22:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Artifacts cleaned")); // Empty ASSETS folder

            if (!(config.paths.ASSETS && config.paths.ASSETS !== config.paths.DIST)) {
              _context.next = 29;
              break;
            }

            console.log('=> Cleaning assets...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Assets cleaned"));
            _context.next = 28;
            return _fsExtra.default.emptyDir(config.paths.ASSETS);

          case 28:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Assets cleaned"));

          case 29:
            _context.next = 31;
            return (0, _static.prepareBrowserPlugins)(config);

          case 31:
            config = _context.sent;
            _context.next = 34;
            return (0, _static.prepareRoutes)(config);

          case 34:
            config = _context.sent;
            _context.next = 37;
            return (0, _static.extractTemplates)(config);

          case 37:
            _context.next = 39;
            return (0, _static.generateTemplates)(config);

          case 39:
            console.log('=> Copying public directory...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Public directory copied"));
            (0, _utils.copyPublicFolder)(config);
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Public directory copied")); // Build static pages and JSON

            console.log('=> Bundling App...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] App Bundled"));
            _context.next = 47;
            return (0, _static.buildProductionBundles)({
              config: config
            });

          case 47:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] App Bundled"));
            _context.next = 50;
            return (0, _static.outputBuildInfo)(config);

          case 50:
            if (!config.bundleAnalyzer) {
              _context.next = 53;
              break;
            }

            _context.next = 53;
            return new Promise(function () {});

          case 53:
            return _context.abrupt("return", config);

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function bundle() {
    return _bundle.apply(this, arguments);
  }

  return bundle;
}();

exports.default = _default;
//# sourceMappingURL=bundle.js.map