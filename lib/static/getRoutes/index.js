"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRoutes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../../utils");

var _getRoutesFromPages = _interopRequireDefault(require("./getRoutesFromPages"));

var _normalizeAllRoutes2 = _interopRequireDefault(require("./normalizeAllRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getRoutes(_ref) {
  var config = _ref.config,
      opts = _ref.opts;
  var subscription = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
    return d;
  };
  // We use the callback pattern here, because getRoutesFromPages supports a subscription
  return (0, _getRoutesFromPages.default)({
    config: config,
    opts: opts
  },
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(pageRoutes) {
      var routes, afterGetRoutes, allRoutes, _normalizeAllRoutes, allNormalizedRoutes, hasIndex, has404;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return config.getRoutes(opts);

            case 2:
              routes = _context.sent;
              afterGetRoutes = (0, _utils.makeHookReducer)(config.plugins, 'afterGetRoutes');
              _context.next = 6;
              return afterGetRoutes(routes, {
                config: config
              });

            case 6:
              routes = _context.sent;
              allRoutes = _toConsumableArray(pageRoutes).concat(_toConsumableArray(routes));
              _normalizeAllRoutes = (0, _normalizeAllRoutes2.default)(allRoutes, config, opts), allNormalizedRoutes = _normalizeAllRoutes.routes, hasIndex = _normalizeAllRoutes.hasIndex, has404 = _normalizeAllRoutes.has404; // If no Index page was found, throw an error. This is required

              if (!(!hasIndex && !opts.incremental)) {
                _context.next = 11;
                break;
              }

              throw new Error('Could not find a route for the "index" page of your site! This is required. Please create a page or specify a route and template for this page.');

            case 11:
              // If no 404 page was found, add one. This is required.
              if (!has404 && !opts.incremental) {
                allNormalizedRoutes.unshift({
                  path: '404',
                  component: _path.default.relative(config.paths.ROOT, _path.default.resolve(__dirname, '../../browser/components/Default404'))
                });
              }

              return _context.abrupt("return", subscription(allNormalizedRoutes));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getRoutes, "getRoutes", "/Users/weikaizhang/react-static/packages/react-static/src/static/getRoutes/index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=index.js.map