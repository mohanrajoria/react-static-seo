"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _reactUniversalComponent = require("react-universal-component");

var _webpackFlushChunks = _interopRequireDefault(require("webpack-flush-chunks"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Redirect = _interopRequireDefault(require("./components/Redirect"));

var _utils = require("../utils");

var _chunkBuilder = require("../utils/chunkBuilder");

var _HtmlWithMeta = require("./components/HtmlWithMeta");

var _HeadWithMeta = require("./components/HeadWithMeta");

var _BodyWithMeta = require("./components/BodyWithMeta");

var _jsxFileName = "/Users/weikaizhang/react-static/packages/react-static/src/static/exportRoute.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
var cachedBasePath;
var cachedHrefReplace;
var cachedSrcReplace;

var _default =
/*#__PURE__*/
function () {
  var _exportRoute = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var config, Comp, DocumentTemplate, route, siteData, clientStats, incremental, sharedHashesByProp, template, data, sharedData, routePath, remove, removeLocation, basePath, hrefReplace, srcReplace, routeInfo, embeddedRouteInfo, renderMeta, chunkNames, head, clientScripts, clientStyleSheets, clientCss, FinalComp, renderToStringAndExtract, appHtml, beforeRenderToElementHook, RenderedComp, beforeRenderToHtml, beforeHtmlToDocument, DocumentHtml, html, beforeDocumentToFile, publicPath, htmlFilename, routeInfoFilename, jsRouteInfoFilename, jsRouteInfo, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref.config, Comp = _ref.Comp, DocumentTemplate = _ref.DocumentTemplate, route = _ref.route, siteData = _ref.siteData, clientStats = _ref.clientStats, incremental = _ref.incremental;
            sharedHashesByProp = route.sharedHashesByProp, template = route.template, data = route.data, sharedData = route.sharedData, routePath = route.path, remove = route.remove;

            if (!(incremental && remove)) {
              _context.next = 7;
              break;
            }

            if (!(route.path === '404' || route.path === '/')) {
              _context.next = 5;
              break;
            }

            throw new Error("You are attempting to incrementally remove the ".concat(route.path === '404' ? '404' : 'index', " route from your export. This is currently not supported (or recommended) by React Static."));

          case 5:
            removeLocation = _path.default.join(config.paths.DIST, route.path);
            return _context.abrupt("return", _fsExtra.default.remove(removeLocation));

          case 7:
            basePath = cachedBasePath || (cachedBasePath = config.basePath);
            hrefReplace = cachedHrefReplace || (cachedHrefReplace = new RegExp("(href=[\"'])\\/(".concat(basePath ? "".concat(basePath, "\\/") : '', ")?([^\\/])"), 'gm'));
            srcReplace = cachedSrcReplace || (cachedSrcReplace = new RegExp("(src=[\"'])\\/(".concat(basePath ? "".concat(basePath, "\\/") : '', ")?([^\\/])"), 'gm')); // This routeInfo will be saved to disk. It should only include the
            // data and hashes to construct all of the props later.

            routeInfo = {
              template: template,
              sharedHashesByProp: sharedHashesByProp,
              data: data,
              path: routePath // This embeddedRouteInfo will be inlined into the HTML for this route.
              // It should include all of the data, including shared data

            };
            embeddedRouteInfo = _objectSpread({}, routeInfo, {
              sharedData: sharedData,
              siteData: siteData // Make a place to collect chunks, meta info and head tags

            });
            renderMeta = {};
            chunkNames = [];
            head = {};
            clientScripts = [];
            clientStyleSheets = [];
            clientCss = {};
            // Get the react component from the Comp and
            // pass it the export context. This uses
            // reactContext under the hood to pass down
            // the exportContext, since react's new context
            // api doesn't survive across bundling.
            Comp = config.disableRuntime ? Comp : Comp(embeddedRouteInfo);

            if (route.redirect) {
              FinalComp = function FinalComp() {
                return _react.default.createElement(_Redirect.default, {
                  fromPath: route.path,
                  to: route.redirect,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                  },
                  __self: this
                });
              };
            } else {
              FinalComp = function FinalComp(props) {
                return _react.default.createElement(_reactUniversalComponent.ReportChunks, {
                  report: function report(chunkName) {
                    // if we are building to a absolute path we must make the detected chunkName relative and matching to the one we set in generateTemplates
                    if (!config.paths.DIST.startsWith(config.paths.ROOT)) {
                      chunkName = (0, _chunkBuilder.absoluteToRelativeChunkName)(config.paths.ROOT, chunkName);
                    }

                    chunkNames.push(chunkName);
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 107
                  },
                  __self: this
                }, _react.default.createElement(Comp, _extends({}, props, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 120
                  },
                  __self: this
                })));
              };
            }

            renderToStringAndExtract = function renderToStringAndExtract(comp) {
              // Rend the app to string!
              var appHtml = (0, _server.renderToString)(comp);

              var _flushChunks = (0, _webpackFlushChunks.default)(clientStats, {
                chunkNames: chunkNames,
                outputPath: config.paths.DIST
              }),
                  scripts = _flushChunks.scripts,
                  stylesheets = _flushChunks.stylesheets,
                  css = _flushChunks.css;

              clientScripts = scripts;
              clientStyleSheets = stylesheets;
              clientCss = css; // Extract head calls using Helmet synchronously right after renderToString
              // to not introduce any race conditions in the meta data rendering

              var helmet = _reactHelmet.default.renderStatic();

              head = {
                htmlProps: helmet.htmlAttributes.toComponent(),
                bodyProps: helmet.bodyAttributes.toComponent(),
                base: helmet.base.toComponent(),
                link: helmet.link.toComponent(),
                meta: helmet.meta.toComponent(),
                noscript: helmet.noscript.toComponent(),
                script: helmet.script.toComponent(),
                style: helmet.style.toComponent(),
                title: helmet.title.toComponent()
              };
              return appHtml;
            };

            _context.prev = 21;
            beforeRenderToElementHook = (0, _utils.makeHookReducer)(config.plugins, 'beforeRenderToElement');
            _context.next = 25;
            return beforeRenderToElementHook(FinalComp, {
              config: config,
              meta: renderMeta
            });

          case 25:
            FinalComp = _context.sent;

            if (!config.renderToElement) {
              _context.next = 28;
              break;
            }

            throw new Error("config.renderToElement has been deprecated in favor of the 'beforeRenderToElement' or 'beforeRenderToHtml' hooks instead.");

          case 28:
            RenderedComp = _react.default.createElement(FinalComp, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 172
              },
              __self: this
            }); // Run the beforeRenderToHtml hook
            // Rum the Html hook

            beforeRenderToHtml = (0, _utils.makeHookReducer)(config.plugins, 'beforeRenderToHtml');
            _context.next = 32;
            return beforeRenderToHtml(RenderedComp, {
              config: config,
              meta: renderMeta
            });

          case 32:
            RenderedComp = _context.sent;

            if (!config.renderToHtml) {
              _context.next = 35;
              break;
            }

            throw new Error("config.renderToHtml has been deprecated in favor of the 'beforeRenderToHtml' or 'beforeHtmlToDocument' hooks instead.");

          case 35:
            appHtml = renderToStringAndExtract(RenderedComp); // Rum the beforeHtmlToDocument hook

            beforeHtmlToDocument = (0, _utils.makeHookReducer)(config.plugins, 'beforeHtmlToDocument');
            _context.next = 39;
            return beforeHtmlToDocument(appHtml, {
              config: config,
              meta: renderMeta
            });

          case 39:
            appHtml = _context.sent;
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t0 = _context["catch"](21);
            _context.t0.message = "Failed exporting HTML for URL ".concat(route.path, " (").concat(route.component, "): ").concat(_context.t0.message);
            throw _context.t0;

          case 46:
            _context.t1 = _server.renderToStaticMarkup;
            _context.t2 = _react.default;
            _context.t3 = DocumentTemplate;
            _context.t4 = (0, _HtmlWithMeta.makeHtmlWithMeta)({
              head: head
            });
            _context.next = 52;
            return (0, _HeadWithMeta.makeHeadWithMeta)({
              head: head,
              route: route,
              clientScripts: clientScripts,
              config: config,
              clientStyleSheets: clientStyleSheets,
              clientCss: clientCss,
              meta: renderMeta
            });

          case 52:
            _context.t5 = _context.sent;
            _context.t6 = (0, _BodyWithMeta.makeBodyWithMeta)({
              head: head,
              route: route,
              embeddedRouteInfo: embeddedRouteInfo,
              clientScripts: clientScripts,
              config: config
            });
            _context.t7 = siteData;
            _context.t8 = embeddedRouteInfo;
            _context.t9 = renderMeta;
            _context.t10 = {
              fileName: _jsxFileName,
              lineNumber: 207
            };
            _context.t11 = this;
            _context.t12 = {
              Html: _context.t4,
              Head: _context.t5,
              Body: _context.t6,
              siteData: _context.t7,
              routeInfo: _context.t8,
              renderMeta: _context.t9,
              __source: _context.t10,
              __self: _context.t11
            };
            _context.t13 = _react.default.createElement("div", {
              id: "root",
              dangerouslySetInnerHTML: {
                __html: appHtml
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 231
              },
              __self: this
            });
            _context.t14 = _context.t2.createElement.call(_context.t2, _context.t3, _context.t12, _context.t13);
            DocumentHtml = (0, _context.t1)(_context.t14);
            // Render the html for the page inside of the base document.
            html = "<!DOCTYPE html>".concat(DocumentHtml); // Rum the beforeDocumentToFile hook

            beforeDocumentToFile = (0, _utils.makeHookReducer)(config.plugins, 'beforeDocumentToFile');
            _context.next = 67;
            return beforeDocumentToFile(html, {
              meta: renderMeta
            });

          case 67:
            html = _context.sent;
            // If the siteRoot is set and we're not in staging, prefix all absolute URLs
            // with the siteRoot
            publicPath = (0, _utils.makePathAbsolute)(process.env.REACT_STATIC_PUBLIC_PATH);

            if (process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING !== 'true') {
              html = html.replace(hrefReplace, "$1".concat(publicPath, "$3"));
            }

            html = html.replace(srcReplace, "$1".concat(publicPath, "$3")); // If the route is a 404 page, write it directly to 404.html, instead of
            // inside a directory.

            htmlFilename = route.path === '404' ? _path.default.join(config.paths.DIST, '404.html') : _path.default.join(config.paths.DIST, route.path, 'index.html'); // Make the routeInfo sit right next to its companion html file

            routeInfoFilename = _path.default.join(config.paths.DIST, route.path, 'routeInfo.json');
            jsRouteInfoFilename = _path.default.join(config.paths.DIST, route.path, 'routeInfo.js');
            jsRouteInfo = "window.__routeInfo = ".concat(JSON.stringify(routeInfo));
            _context.next = 77;
            return Promise.all([_fsExtra.default.outputFile(htmlFilename, html), !route.redirect ? _fsExtra.default.outputJson(routeInfoFilename, routeInfo) : Promise.resolve(), !route.redirect ? _fsExtra.default.outputFile(jsRouteInfoFilename, jsRouteInfo) : Promise.resolve()]);

          case 77:
            res = _context.sent;
            return _context.abrupt("return", res);

          case 79:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[21, 42]]);
  }));

  function exportRoute(_x) {
    return _exportRoute.apply(this, arguments);
  }

  return exportRoute;
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cachedBasePath, "cachedBasePath", "/Users/weikaizhang/react-static/packages/react-static/src/static/exportRoute.js");
  reactHotLoader.register(cachedHrefReplace, "cachedHrefReplace", "/Users/weikaizhang/react-static/packages/react-static/src/static/exportRoute.js");
  reactHotLoader.register(cachedSrcReplace, "cachedSrcReplace", "/Users/weikaizhang/react-static/packages/react-static/src/static/exportRoute.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=exportRoute.js.map