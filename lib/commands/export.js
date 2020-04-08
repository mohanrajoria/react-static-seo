"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _static = require("../static");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _ref2,
        originalConfig,
        staging,
        debug,
        isBuild,
        incremental,
        config,
        clientStats,
        PrettyError,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, originalConfig = _ref2.config, staging = _ref2.staging, debug = _ref2.debug, isBuild = _ref2.isBuild, incremental = _ref2.incremental;

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
            }

            if (incremental) {
              process.env.REACT_STATIC_INCREMENTAL = 'true';
            }

            if (isBuild) {
              _context.next = 19;
              break;
            }

            _context.next = 10;
            return (0, _static.getConfig)(originalConfig);

          case 10:
            config = _context.sent;
            config.originalConfig = originalConfig;
            _context.next = 14;
            return (0, _static.prepareRoutes)(config, {
              incremental: incremental
            });

          case 14:
            config = _context.sent;
            _context.next = 17;
            return (0, _static.extractTemplates)(config, {
              incremental: incremental
            });

          case 17:
            _context.next = 20;
            break;

          case 19:
            config = originalConfig;

          case 20:
            if (config.routes) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return (0, _static.prepareRoutes)(config);

          case 23:
            if (debug) {
              console.log('DEBUG - Resolved static.config.js:');
              console.log(config);
            }

            _context.next = 26;
            return (0, _static.importClientStats)(config);

          case 26:
            clientStats = _context.sent;
            _context.prev = 27;
            _context.next = 30;
            return (0, _static.exportRoutes)({
              config: config,
              clientStats: clientStats,
              incremental: incremental
            });

          case 30:
            _context.next = 37;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](27);
            PrettyError = require('pretty-error');
            console.log(new PrettyError().render(_context.t0));
            process.exit(1);

          case 37:
            _context.next = 39;
            return (0, _static.buildXML)({
              config: config
            });

          case 39:
            if (!config.onBuild) {
              _context.next = 42;
              break;
            }

            _context.next = 42;
            return config.onBuild({
              config: config
            });

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[27, 32]]);
  }));

  return function _default() {
    return _ref.apply(this, arguments);
  };
}();

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/commands/export.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=export.js.map