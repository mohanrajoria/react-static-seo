"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _fetchSiteData = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(config) {
    var siteData;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('=> Fetching Site Data...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Site Data Downloaded")); // Get the site data

            _context.next = 4;
            return config.getSiteData({
              dev: false
            });

          case 4:
            siteData = _context.sent;
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Site Data Downloaded"));
            return _context.abrupt("return", siteData);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function fetchSiteData(_x) {
    return _fetchSiteData.apply(this, arguments);
  }

  return fetchSiteData;
}();

exports.default = _default;
//# sourceMappingURL=fetchSiteData.js.map