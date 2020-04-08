"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fetchSiteData = _interopRequireDefault(require("./fetchSiteData"));

var _fetchRoutes = _interopRequireDefault(require("./fetchRoutes"));

var _buildHTML = _interopRequireDefault(require("./buildHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Exporting route HTML and JSON happens here. It's a big one.
var _default =
/*#__PURE__*/
function () {
  var _exportRoutes = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var config, clientStats, incremental, siteData;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref.config, clientStats = _ref.clientStats, incremental = _ref.incremental;
            _context.next = 3;
            return (0, _fetchSiteData.default)(config);

          case 3:
            siteData = _context.sent;
            _context.next = 6;
            return (0, _fetchRoutes.default)(config);

          case 6:
            _context.next = 8;
            return (0, _buildHTML.default)({
              config: config,
              siteData: siteData,
              clientStats: clientStats,
              incremental: incremental
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function exportRoutes(_x) {
    return _exportRoutes.apply(this, arguments);
  }

  return exportRoutes;
}();

exports.default = _default;
//# sourceMappingURL=exportRoutes.js.map