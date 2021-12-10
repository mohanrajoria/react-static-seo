"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _RootComponents = require("./RootComponents");

var _utils = require("../utils");

var _exportRoute = _interopRequireDefault(require("./exportRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable import/first, import/no-dynamic-require */
var _require = require('../utils/binHelper'),
    setIgnorePath = _require.setIgnorePath;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref) {
    var config, routes, siteData, clientStats, incremental, htmlProgress, Comp, DocumentTemplate, tasks, _loop, i;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = _ref.config, routes = _ref.routes, siteData = _ref.siteData, clientStats = _ref.clientStats, incremental = _ref.incremental;
            htmlProgress = (0, _utils.progress)(routes.length); // Use the node version of the app created with webpack

            setIgnorePath(config.paths.BUILD_ARTIFACTS);
            Comp = require(_path.default.resolve(config.paths.BUILD_ARTIFACTS, 'static-app.js')).default; // Retrieve the document template

            DocumentTemplate = config.Document || _RootComponents.DefaultDocument;

            console.log("-------------------------------------------------------------");
            console.log("-------------------------------------------------------------");
            console.log("In exporter : Now will start creating tasks, routes count is: ");
            console.log(routes.length);
            console.log("-------------------------------------------------------------");
            console.log("-------------------------------------------------------------");

            tasks = [];

            _loop = function _loop(i) {
              var route = routes[i]; // eslint-disable-next-line

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
                        return (0, _exportRoute.default)({
                          config: config,
                          Comp: Comp,
                          DocumentTemplate: DocumentTemplate,
                          route: route,
                          siteData: siteData,
                          clientStats: clientStats,
                          incremental: incremental
                        });

                      case 2:
                        htmlProgress.tick();

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

            _context2.next = 10;
            return (0, _utils.poolAll)(tasks, Number(config.outputFileRate));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function _default(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/exporter.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=exporter.js.map