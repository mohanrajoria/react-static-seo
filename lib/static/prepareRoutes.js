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

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _getRoutes = _interopRequireDefault(require("./getRoutes"));

var _buildXML = _interopRequireDefault(require("./buildXML"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _prepareRoutes = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(config) {
    var opts,
        cb,
        beforePrepareRoutes,
        afterPrepareRoutes,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            opts = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            cb = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : function (d) {
              return d;
            };
            beforePrepareRoutes = (0, _utils.makeHookReducer)(config.plugins, 'beforePrepareRoutes');
            _context2.next = 5;
            return beforePrepareRoutes(config);

          case 5:
            config = _context2.sent;
            if (!opts.silent) console.log('=> Building Routes...'); // set the static routes

            process.env.REACT_STATIC_ROUTES_PATH = _path.default.join(config.paths.BUILD_ARTIFACTS, 'react-static-templates.js');
            if (!opts.silent) (0, _utils.time)(_chalk.default.green("=> [\u2713] Routes Built"));
            _context2.next = 11;
            return (0, _getRoutes.default)({
              config: config,
              opts: opts
            },
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(routes) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!opts.silent) (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Routes Built"));
                        config.routes = routes;
                        return _context.abrupt("return", cb(config));

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }());

          case 11:
            afterPrepareRoutes = (0, _utils.makeHookReducer)(config.plugins, 'afterPrepareRoutes');
            _context2.next = 14;
            return afterPrepareRoutes(config);

          case 14:
            config = _context2.sent;
            return _context2.abrupt("return", config);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function prepareRoutes(_x) {
    return _prepareRoutes.apply(this, arguments);
  }

  return prepareRoutes;
}();

exports.default = _default;
//# sourceMappingURL=prepareRoutes.js.map