"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _exportSharedRouteData = _interopRequireDefault(require("./exportSharedRouteData"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _fetchRoutes = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(config) {
    var sharedDataByHash, dataProgress, downloadTasks, _loop, i;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Set up some scaffolding for automatic data splitting
            sharedDataByHash = new Map();
            console.log('=> Fetching Route Data...');
            dataProgress = (0, _utils.progress)(config.routes.length);
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Route Data Downloaded")); // Use a traditional for loop here for perf

            downloadTasks = [];

            _loop = function _loop(i) {
              var route = config.routes[i];
              /* eslint-disable no-loop-func */

              downloadTasks.push(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee() {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = !!route.getData;

                        if (!_context.t0) {
                          _context.next = 5;
                          break;
                        }

                        _context.next = 4;
                        return route.getData({
                          route: route,
                          dev: false
                        });

                      case 4:
                        _context.t0 = _context.sent;

                      case 5:
                        route.data = _context.t0;

                        // Default data (must be an object)
                        if (!route.data) {
                          route.data = {};
                        } // Extract any shared data


                        route.sharedHashesByProp = {};

                        if (route.sharedData) {
                          Object.keys(route.sharedData).forEach(function (name) {
                            var sharedPiece = route.sharedData[name];
                            sharedDataByHash.set(sharedPiece.hash, sharedPiece);
                            route.sharedHashesByProp[name] = sharedPiece.hash;
                            route.sharedData[name] = sharedPiece.data;
                          });
                        }

                        dataProgress.tick();

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));
            };

            for (i = 0; i < config.routes.length; i++) {
              _loop(i);
            }

            _context2.next = 9;
            return (0, _utils.poolAll)(downloadTasks, Number(config.outputFileRate));

          case 9:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Route Data Downloaded"));
            return _context2.abrupt("return", (0, _exportSharedRouteData.default)(config, sharedDataByHash));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function fetchRoutes(_x) {
    return _fetchRoutes.apply(this, arguments);
  }

  return fetchRoutes;
}();

exports.default = _default;
//# sourceMappingURL=fetchRoutes.js.map