"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _static = require("../static");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
var cleaned;
var indexCreated;

var _default =
/*#__PURE__*/
function () {
  var _start = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var _ref,
        configPath,
        debug,
        _args3 = arguments;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, configPath = _ref.config, debug = _ref.debug;

            // ensure ENV variables are set
            if (typeof process.env.NODE_ENV === 'undefined') {
              process.env.NODE_ENV = 'development';
            }

            if (debug) {
              process.env.REACT_STATIC_DEBUG = 'true';
            }

            process.env.REACT_STATIC_ENV = 'development';
            process.env.BABEL_ENV = 'development'; // Use callback style to subscribe to changes

            _context3.next = 7;
            return (0, _static.getConfig)(configPath,
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(config) {
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (debug) {
                          console.log('DEBUG - Resolved static.config.js:');
                          console.log(config);
                        }

                        if (cleaned) {
                          _context2.next = 5;
                          break;
                        }

                        cleaned = true; // Clean the dist folder

                        _context2.next = 5;
                        return _fsExtra.default.remove(config.paths.DIST);

                      case 5:
                        _context2.next = 7;
                        return config.getSiteData({
                          dev: true
                        });

                      case 7:
                        config.siteData = _context2.sent;

                        if (indexCreated) {
                          _context2.next = 12;
                          break;
                        }

                        indexCreated = true;
                        _context2.next = 12;
                        return (0, _utils.createIndexFilePlaceholder)({
                          config: config
                        });

                      case 12:
                        _context2.next = 14;
                        return (0, _static.prepareBrowserPlugins)(config);

                      case 14:
                        config = _context2.sent;
                        _context2.next = 17;
                        return (0, _static.prepareRoutes)(config, {
                          dev: true
                        },
                        /*#__PURE__*/
                        function () {
                          var _ref3 = _asyncToGenerator(
                          /*#__PURE__*/
                          _regenerator.default.mark(function _callee(config) {
                            return _regenerator.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return (0, _static.extractTemplates)(config, {
                                      dev: true
                                    });

                                  case 2:
                                    _context.next = 4;
                                    return (0, _static.generateTemplates)(config);

                                  case 4:
                                    (0, _static.reloadRoutes)(); // Build the JS bundle

                                    _context.next = 7;
                                    return (0, _static.startDevServer)({
                                      config: config
                                    });

                                  case 7:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee, this);
                          }));

                          return function (_x2) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 17:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 7:
            _context3.next = 9;
            return new Promise(function () {});

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function start() {
    return _start.apply(this, arguments);
  }

  return start;
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cleaned, "cleaned", "/Users/weikaizhang/react-static/packages/react-static/src/commands/start.js");
  reactHotLoader.register(indexCreated, "indexCreated", "/Users/weikaizhang/react-static/packages/react-static/src/commands/start.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=start.js.map