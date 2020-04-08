"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _getConfig = _interopRequireDefault(require("./getConfig"));

var _RootComponents = require("./RootComponents");

var _utils = require("../utils");

var _exportRoute = _interopRequireDefault(require("./exportRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable import/first, import/no-dynamic-require */
var _require = require('../utils/binHelper'),
    setIgnorePath = _require.setIgnorePath;

process.on('message',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(payload) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            return _context3.delegateYield(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee2() {
              var oldConfig, routes, incremental, config, Comp, DocumentTemplate, tasks, _loop, i;

              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      oldConfig = payload.config, routes = payload.routes, incremental = payload.incremental; // Get config again

                      _context2.next = 3;
                      return (0, _getConfig.default)(oldConfig.originalConfig);

                    case 3:
                      config = _context2.sent;
                      setIgnorePath(config.paths.DIST); // Use the node version of the app created with webpack

                      Comp = require(_glob.default.sync(_path.default.resolve(config.paths.BUILD_ARTIFACTS, 'static-app.js'))[0]).default; // Retrieve the document template

                      DocumentTemplate = config.Document || _RootComponents.DefaultDocument;
                      tasks = [];

                      _loop = function _loop(i) {
                        var route = routes[i];
                        tasks.push(
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee() {
                          return _regenerator.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return (0, _exportRoute.default)(_objectSpread({}, payload, {
                                    config: config,
                                    route: route,
                                    Comp: Comp,
                                    DocumentTemplate: DocumentTemplate,
                                    incremental: incremental
                                  }));

                                case 2:
                                  if (process.connected) {
                                    process.send({
                                      type: 'tick'
                                    });
                                  }

                                case 3:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee, this);
                        })));
                      };

                      for (i = 0; i < routes.length; i++) {
                        _loop(i);
                      }

                      _context2.next = 12;
                      return (0, _utils.poolAll)(tasks, Number(config.outputFileRate));

                    case 12:
                      if (process.connected) {
                        process.send({
                          type: 'done'
                        });
                      }

                      process.exit();

                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })(), "t0", 2);

          case 2:
            _context3.next = 9;
            break;

          case 4:
            _context3.prev = 4;
            _context3.t1 = _context3["catch"](0);
            console.error(_context3.t1);

            if (process.connected) {
              process.send({
                type: 'error',
                payload: _context3.t1
              });
            }

            process.exit(1);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 4]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=exporter.threaded.js.map