"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var watcher;
var routesCache;

var _default =
/*#__PURE__*/
function () {
  var _getRoutesFromPages = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref, subscription) {
    var config, _ref$opts, opts, globExtensions, pagesGlob, handle, pages, routes;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = _ref.config, _ref$opts = _ref.opts, opts = _ref$opts === void 0 ? {} : _ref$opts;
            // Make a glob extension to get all pages with the set extensions from the pages directory
            globExtensions = config.extensions.map(function (ext) {
              return "".concat(ext.slice(1));
            }).join(',');
            pagesGlob = "".concat(config.paths.PAGES, "/**/*.{").concat(globExtensions, "}"); // Get the pages

            handle = function handle(pages) {
              // Turn each page into a route
              var routes = pages.map(function (page) {
                // Glob path will always have unix style path, convert to windows if necessary
                page = _path.default.resolve(page); // Get the component path relative to ROOT

                var component = _path.default.relative(config.paths.ROOT, page); // Make sure the path is relative to the root of the site


                var path = page.replace("".concat(config.paths.PAGES), '').replace(/\..*/, ''); // turn windows paths back to unix

                path = path.split('\\').join('/'); // Turn `/index` paths into roots`

                path = path.replace(/\/index$/, '/'); // Return the route

                return {
                  path: path,
                  component: component,
                  isPage: true // tag it with isPage, so we know its origin

                };
              });
              return routes;
            };

            if (opts.dev && !watcher) {
              watcher = _chokidar.default.watch(config.paths.PAGES, {
                ignoreInitial: true
              }).on('all', (0, _utils.debounce)(
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(type, file) {
                  var filename, pages, routes;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (['add', 'unlink'].includes(type)) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return");

                        case 2:
                          filename = _path.default.basename(file);

                          if (!filename.startsWith('.')) {
                            _context.next = 5;
                            break;
                          }

                          return _context.abrupt("return");

                        case 5:
                          _context.next = 7;
                          return (0, _utils.glob)(pagesGlob);

                        case 7:
                          pages = _context.sent;
                          routes = handle(pages);
                          routesCache = routes;
                          subscription(routes);

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }()), 50);
            }

            if (!routesCache) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", subscription(routesCache));

          case 7:
            _context2.next = 9;
            return (0, _utils.glob)(pagesGlob);

          case 9:
            pages = _context2.sent;
            routes = handle(pages);
            return _context2.abrupt("return", subscription(routes));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function getRoutesFromPages(_x, _x2) {
    return _getRoutesFromPages.apply(this, arguments);
  }

  return getRoutesFromPages;
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(watcher, "watcher", "/Users/weikaizhang/react-static/packages/react-static/src/static/getRoutes/getRoutesFromPages.js");
  reactHotLoader.register(routesCache, "routesCache", "/Users/weikaizhang/react-static/packages/react-static/src/static/getRoutes/getRoutesFromPages.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=getRoutesFromPages.js.map