"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackConfig = webpackConfig;
exports.startDevServer = startDevServer;
exports.buildProductionBundles = buildProductionBundles;
exports.reloadRoutes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _formatWebpackMessages = _interopRequireDefault(require("react-dev-utils/formatWebpackMessages"));

var _chalk = _interopRequireDefault(require("chalk"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _socket = _interopRequireDefault(require("socket.io"));

var _rules = require("./rules");

var _ = require("../");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resolvedReloadRoutes;
var reloadWebpackRoutes;
var devServer;

var reloadRoutes = function reloadRoutes() {
  if (!resolvedReloadRoutes) {
    // Not ready yet, so just wait
    return;
  }

  return resolvedReloadRoutes.apply(void 0, arguments);
};

exports.reloadRoutes = reloadRoutes;

// Builds a compiler using a stage preset, then allows extension via
// webpackConfigurator
function webpackConfig(_ref) {
  var config = _ref.config,
      stage = _ref.stage,
      sync = _ref.sync;
  var webpackConfig;

  if (stage === 'dev') {
    webpackConfig = require('./webpack.config.dev').default({
      config: config
    });
  } else if (stage === 'prod') {
    webpackConfig = require('./webpack.config.prod').default({
      config: config
    });
  } else if (stage === 'node') {
    webpackConfig = require('./webpack.config.prod').default({
      config: config,
      isNode: true
    });
  } else {
    throw new Error('A stage is required when building a compiler.');
  }

  var defaultLoaders = (0, _rules.getStagedRules)({
    config: config,
    stage: stage
  });
  var webpackHook = (0, _utils.makeHookReducer)(config.plugins, 'webpack', {
    sync: sync
  });
  return webpackHook(webpackConfig, {
    config: config,
    stage: stage,
    defaultLoaders: defaultLoaders
  });
} // Starts the development server


function startDevServer(_x) {
  return _startDevServer.apply(this, arguments);
}

function _startDevServer() {
  _startDevServer = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(_ref2) {
    var config, devCompiler, intendedPort, port, messagePort, host, devServerConfig, first, socket;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = _ref2.config;

            if (!devServer) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", devServer);

          case 3:
            _context6.t0 = _webpack.default;
            _context6.next = 6;
            return webpackConfig({
              config: config,
              stage: 'dev'
            });

          case 6:
            _context6.t1 = _context6.sent;
            devCompiler = (0, _context6.t0)(_context6.t1);
            // Default to localhost:3000, or use a custom combo if defined in static.config.js
            // or environment variables
            intendedPort = config.devServer && config.devServer.port || process.env.PORT || 3000;
            _context6.next = 11;
            return (0, _utils.findAvailablePort)(Number(intendedPort));

          case 11:
            port = _context6.sent;
            _context6.next = 14;
            return (0, _utils.findAvailablePort)(4000, [port]);

          case 14:
            messagePort = _context6.sent;

            if (intendedPort !== port) {
              (0, _utils.time)(_chalk.default.red("=> Warning! Port ".concat(intendedPort, " is not available. Using port ").concat(_chalk.default.green(intendedPort), " instead!")));
            }

            host = config.devServer && config.devServer.host || process.env.HOST || 'http://localhost';
            devServerConfig = _objectSpread({
              hot: true,
              disableHostCheck: true,
              contentBase: [config.paths.PUBLIC, config.paths.DIST],
              publicPath: '/',
              historyApiFallback: true,
              compress: false,
              quiet: true
            }, config.devServer, {
              watchOptions: _objectSpread({
                ignored: 'node_modules'
              }, config.devServer ? config.devServer.watchOptions || {} : {}),
              before: function before(app) {
                // Serve the site data
                app.get('/__react-static__/getMessagePort',
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee(req, res) {
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            res.json({
                              port: messagePort
                            });

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x3, _x4) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                app.get('/__react-static__/siteData',
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee2(req, res, next) {
                    var siteData;
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return config.getSiteData({
                              dev: true
                            });

                          case 3:
                            siteData = _context2.sent;
                            res.json(siteData);
                            _context2.next = 12;
                            break;

                          case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);
                            res.status(500);
                            res.json(_context2.t0);
                            next(_context2.t0);

                          case 12:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this, [[0, 7]]);
                  }));

                  return function (_x5, _x6, _x7) {
                    return _ref5.apply(this, arguments);
                  };
                }()); // Since routes may change during dev, this function can rebuild all of the config
                // routes. It also references the original config when possible, to make sure it
                // uses any up to date getData callback generated from new or replacement routes.

                reloadWebpackRoutes = function reloadWebpackRoutes(config) {
                  // Serve each routes data
                  config.routes.forEach(function (_ref6) {
                    var routePath = _ref6.path;
                    app.get("/__react-static__/routeInfo/".concat(encodeURI(routePath === '/' ? '' : routePath)),
                    /*#__PURE__*/
                    function () {
                      var _ref7 = _asyncToGenerator(
                      /*#__PURE__*/
                      _regenerator.default.mark(function _callee3(req, res, next) {
                        var route, data, sharedData;
                        return _regenerator.default.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                // Make sure we have the most up to date route from the config, not
                                // an out of dat object.
                                route = config.routes.find(function (d) {
                                  return d.path === routePath;
                                });
                                _context3.prev = 1;

                                if (route) {
                                  _context3.next = 4;
                                  break;
                                }

                                throw new Error('Route could not be found!');

                              case 4:
                                if (!route.getData) {
                                  _context3.next = 10;
                                  break;
                                }

                                _context3.next = 7;
                                return route.getData({
                                  route: route,
                                  dev: true
                                });

                              case 7:
                                _context3.t0 = _context3.sent;
                                _context3.next = 11;
                                break;

                              case 10:
                                _context3.t0 = {};

                              case 11:
                                data = _context3.t0;
                                // Auto-include any shared data
                                sharedData = {};

                                if (route.sharedData) {
                                  Object.keys(route.sharedData).forEach(function (key) {
                                    sharedData[key] = route.sharedData[key].data;
                                  });
                                } // Don't use any hashProp, just pass all the data in dev


                                res.json(_objectSpread({}, route, {
                                  sharedHashesByProp: {},
                                  data: data,
                                  sharedData: sharedData
                                }));
                                _context3.next = 21;
                                break;

                              case 17:
                                _context3.prev = 17;
                                _context3.t1 = _context3["catch"](1);
                                res.status(500);
                                next(_context3.t1);

                              case 21:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3, this, [[1, 17]]);
                      }));

                      return function (_x8, _x9, _x10) {
                        return _ref7.apply(this, arguments);
                      };
                    }());
                  });
                };

                reloadWebpackRoutes(config);

                if (config.devServer && config.devServer.before) {
                  config.devServer.before(app);
                }
              },
              port: port,
              host: host
            });
            first = true;
            console.log('=> Building App Bundle...');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Build Complete"));
            devCompiler.hooks.invalid.tap({
              name: 'React-Static'
            }, function (file) {
              console.log('=> File changed:', file.replace(config.paths.ROOT, ''));
              console.log('=> Updating build...');
              (0, _utils.time)(_chalk.default.green("=> [\u2713] Build Updated"));
            });
            devCompiler.hooks.done.tap({
              name: 'React-Static'
            }, function (stats) {
              var messages = (0, _formatWebpackMessages.default)(stats.toJson({}, true));
              var isSuccessful = !messages.errors.length && !messages.warnings.length;

              if (isSuccessful) {
                if (first) {
                  (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Build Complete"));
                  console.log(_chalk.default.green("=> [\u2713] App serving at"), "".concat(host, ":").concat(port));
                } else {
                  (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Build Updated"));
                }

                if (first && config.onStart) {
                  config.onStart({
                    devServerConfig: devServerConfig
                  });
                }
              }

              first = false;

              if (messages.errors.length) {
                console.log(_chalk.default.red('Failed to build! Fix any errors and try again!'));
                messages.errors.forEach(function (message) {
                  console.log(message);
                  console.log();
                });
              }

              if (messages.warnings.length) {
                console.log(_chalk.default.yellow('Build complete with warnings.'));
                console.log();
                messages.warnings.forEach(function (message) {
                  console.log(message);
                  console.log();
                });
              }
            }); // Start the webpack dev server

            devServer = new _webpackDevServer.default(devCompiler, devServerConfig); // Start the messages socket

            socket = (0, _socket.default)();

            resolvedReloadRoutes =
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee5(paths) {
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt("return", (0, _.prepareRoutes)(config, {
                          dev: true,
                          silent: true
                        },
                        /*#__PURE__*/
                        function () {
                          var _ref9 = _asyncToGenerator(
                          /*#__PURE__*/
                          _regenerator.default.mark(function _callee4(config) {
                            return _regenerator.default.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    if (!paths) {
                                      paths = config.routes.map(function (route) {
                                        return route.path;
                                      });
                                    }

                                    paths = paths.map(_utils.getRoutePath);
                                    reloadWebpackRoutes(config);
                                    socket.emit('message', {
                                      type: 'reloadRoutes',
                                      paths: paths
                                    });

                                  case 4:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4, this);
                          }));

                          return function (_x12) {
                            return _ref9.apply(this, arguments);
                          };
                        }()));

                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));

              return function resolvedReloadRoutes(_x11) {
                return _ref8.apply(this, arguments);
              };
            }();

            _context6.next = 28;
            return new Promise(function (resolve, reject) {
              devServer.listen(port, null, function (err) {
                if (err) {
                  return reject(err);
                }

                resolve();
              });
            });

          case 28:
            // Make sure we start listening on the message port after the dev server.
            // We do this mostly to appease codesandbox.io, since they autobind to the first
            // port that opens up for their preview window.
            socket.listen(messagePort);
            return _context6.abrupt("return", devServer);

          case 30:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _startDevServer.apply(this, arguments);
}

function buildProductionBundles(_x2) {
  return _buildProductionBundles.apply(this, arguments);
}

function _buildProductionBundles() {
  _buildProductionBundles = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(_ref3) {
    var config, allWebpackConfigs;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            config = _ref3.config;
            _context9.next = 3;
            return webpackConfig({
              config: config,
              stage: 'prod'
            });

          case 3:
            _context9.t0 = _context9.sent;
            _context9.next = 6;
            return webpackConfig({
              config: config,
              stage: 'node'
            });

          case 6:
            _context9.t1 = _context9.sent;
            allWebpackConfigs = [_context9.t0, _context9.t1];
            return _context9.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref10 = _asyncToGenerator(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee8(resolve, reject) {
                return _regenerator.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        (0, _webpack.default)(allWebpackConfigs).run(
                        /*#__PURE__*/
                        function () {
                          var _ref11 = _asyncToGenerator(
                          /*#__PURE__*/
                          _regenerator.default.mark(function _callee7(err, stats) {
                            var _stats$stats, prodStats, nodeStats, checkBuildStats, prodStatsJson;

                            return _regenerator.default.wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    checkBuildStats = function _ref12(stage, stageStats) {
                                      var buildErrors = stageStats.hasErrors();
                                      var buildWarnings = stageStats.hasWarnings();

                                      if (buildErrors || buildWarnings) {
                                        console.log(stageStats.toString({
                                          context: config.context,
                                          performance: false,
                                          hash: false,
                                          timings: true,
                                          entrypoints: false,
                                          chunkOrigins: false,
                                          chunkModules: false,
                                          colors: true
                                        }));

                                        if (buildErrors) {
                                          console.log(_chalk.default.red.bold("\n                => There were ERRORS during the ".concat(stage, " build stage! :(\n                => Fix them and try again!\n              ")));
                                        } else if (buildWarnings) {
                                          console.log(_chalk.default.yellow("\n=> There were WARNINGS during the ".concat(stage, " build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.\n")));
                                        }
                                      }
                                    };

                                    if (!err) {
                                      _context7.next = 5;
                                      break;
                                    }

                                    console.log(_chalk.default.red(err.stack || err));

                                    if (err.details) {
                                      console.log(_chalk.default.red(err.details));
                                    }

                                    return _context7.abrupt("return", reject(err));

                                  case 5:
                                    stats.toJson('verbose');
                                    _stats$stats = _slicedToArray(stats.stats, 2), prodStats = _stats$stats[0], nodeStats = _stats$stats[1];
                                    checkBuildStats('prod', prodStats);
                                    checkBuildStats('node', nodeStats);
                                    prodStatsJson = prodStats.toJson();
                                    _context7.next = 12;
                                    return (0, _.outputClientStats)(config, prodStatsJson);

                                  case 12:
                                    resolve(prodStatsJson);

                                  case 13:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7, this);
                          }));

                          return function (_x15, _x16) {
                            return _ref11.apply(this, arguments);
                          };
                        }());

                      case 1:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));

              return function (_x13, _x14) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _buildProductionBundles.apply(this, arguments);
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(resolvedReloadRoutes, "resolvedReloadRoutes", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(reloadWebpackRoutes, "reloadWebpackRoutes", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(devServer, "devServer", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(reloadRoutes, "reloadRoutes", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(webpackConfig, "webpackConfig", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(startDevServer, "startDevServer", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
  reactHotLoader.register(buildProductionBundles, "buildProductionBundles", "/Users/weikaizhang/react-static/packages/react-static/src/static/webpack/index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=index.js.map