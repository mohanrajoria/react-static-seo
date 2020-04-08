"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "buildXML", {
  enumerable: true,
  get: function get() {
    return _buildXML.default;
  }
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _generateBrowserPlugins = _interopRequireDefault(require("./generateBrowserPlugins"));

var _buildXML = _interopRequireDefault(require("./buildXML"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _prepareBrowserPlugins = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(config) {
    var beforePrepareBrowserPlugins, afterPrepareBrowserPlugins;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            beforePrepareBrowserPlugins = (0, _utils.makeHookReducer)(config.plugins, 'beforePrepareBrowserPlugins');
            _context.next = 3;
            return beforePrepareBrowserPlugins(config);

          case 3:
            config = _context.sent;
            (0, _generateBrowserPlugins.default)({
              config: config
            });
            afterPrepareBrowserPlugins = (0, _utils.makeHookReducer)(config.plugins, 'afterPrepareBrowserPlugins');
            _context.next = 8;
            return afterPrepareBrowserPlugins(config);

          case 8:
            config = _context.sent;
            return _context.abrupt("return", config);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function prepareBrowserPlugins(_x) {
    return _prepareBrowserPlugins.apply(this, arguments);
  }

  return prepareBrowserPlugins;
}();

exports.default = _default;
//# sourceMappingURL=prepareBrowserPlugins.js.map