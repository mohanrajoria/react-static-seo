"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputClientStats = outputClientStats;
exports.importClientStats = importClientStats;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function outputClientStats(config, statsJSON) {
  return _fsExtra.default.outputFileSync(_path.default.join(config.paths.BUILD_ARTIFACTS, 'client-stats.json'), JSON.stringify(statsJSON, null, 2));
}

function importClientStats(_x) {
  return _importClientStats.apply(this, arguments);
}

function _importClientStats() {
  _importClientStats = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(config) {
    var clientStats;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fsExtra.default.readJson(_path.default.join(config.paths.BUILD_ARTIFACTS, 'client-stats.json'));

          case 2:
            clientStats = _context.sent;

            if (clientStats) {
              _context.next = 5;
              break;
            }

            throw new Error('No Client Stats Found');

          case 5:
            return _context.abrupt("return", clientStats);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _importClientStats.apply(this, arguments);
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(outputClientStats, "outputClientStats", "/Users/weikaizhang/react-static/packages/react-static/src/static/clientStats.js");
  reactHotLoader.register(importClientStats, "importClientStats", "/Users/weikaizhang/react-static/packages/react-static/src/static/clientStats.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=clientStats.js.map