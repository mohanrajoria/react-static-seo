"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _exportSharedRouteData = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(config, sharedDataByHash) {
    var sharedDataArr, jsonProgress;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Write all shared props to file
            sharedDataArr = Array.from(sharedDataByHash);

            if (!sharedDataArr.length) {
              _context2.next = 8;
              break;
            }

            console.log('=> Exporting Shared Route Data...');
            jsonProgress = (0, _utils.progress)(sharedDataArr.length);
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Shared Route Data Exported"));
            _context2.next = 7;
            return (0, _utils.poolAll)(sharedDataArr.map(function (cachedProp) {
              return (
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee() {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _fsExtra.default.outputFile(_path.default.join(config.paths.STATIC_DATA, "".concat(cachedProp[1].hash, ".json")), JSON.stringify(cachedProp[1].data));

                        case 2:
                          jsonProgress.tick();

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }))
              );
            }), Number(config.outputFileRate));

          case 7:
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Shared Route Data Exported"));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function exportSharedRouteData(_x, _x2) {
    return _exportSharedRouteData.apply(this, arguments);
  }

  return exportSharedRouteData;
}();

exports.default = _default;
//# sourceMappingURL=exportSharedRouteData.js.map