"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHeadWithMeta = makeHeadWithMeta;
exports.InlineStyle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../utils");

var _jsxFileName = "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HeadWithMeta.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import packagejson from '../../../package.json'
// const { version } = packagejson
var REGEX_FOR_STYLE_TAG = /<style>|<\/style>/gi;

var InlineStyle = function InlineStyle(_ref) {
  var clientCss = _ref.clientCss;
  return _react.default.createElement("style", {
    key: "clientCss",
    type: "text/css",
    dangerouslySetInnerHTML: {
      __html: clientCss.toString().replace(REGEX_FOR_STYLE_TAG, '')
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  });
};

exports.InlineStyle = InlineStyle;

function makeHeadWithMeta(_x) {
  return _makeHeadWithMeta.apply(this, arguments);
}

function _makeHeadWithMeta() {
  _makeHeadWithMeta = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2) {
    var head, route, clientScripts, config, clientStyleSheets, clientCss, meta, HeadHookMapper, pluginHeads;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            head = _ref2.head, route = _ref2.route, clientScripts = _ref2.clientScripts, config = _ref2.config, clientStyleSheets = _ref2.clientStyleSheets, clientCss = _ref2.clientCss, meta = _ref2.meta;
            HeadHookMapper = (0, _utils.makeHookMapper)(config.plugins, 'Head');
            _context.next = 4;
            return HeadHookMapper({
              meta: meta
            });

          case 4:
            pluginHeads = _context.sent;
            return _context.abrupt("return", function (_ref3) {
              var children = _ref3.children,
                  rest = _objectWithoutProperties(_ref3, ["children"]);

              var renderLinkCSS = !route.redirect && !config.inlineCss;
              var useHelmetTitle = head.title && head.title[0] && head.title[0].props.children !== '';

              var childrenArray = _react.default.Children.toArray(children);

              if (useHelmetTitle) {
                head.title[0] = _react.default.cloneElement(head.title[0], {
                  key: 'title'
                });
                childrenArray = childrenArray.filter(function (child) {
                  if (child.type === 'title') {
                    // Filter out the title of the Document in static.config.js
                    // if there is a helmet title on this route
                    return false;
                  }

                  return true;
                });
              }

              var childrenCSS = childrenArray.filter(function (child) {
                if (child.type === 'link' && child.props && child.props.rel === 'stylesheet') {
                  return true;
                } else if (child.type === 'style') {
                  return true;
                }

                return false;
              });
              var childrenJS = childrenArray.filter(function (child) {
                return child.type === 'script';
              });
              childrenArray = childrenArray.filter(function (child) {
                if (child.type === 'link' && child.props && child.props.rel === 'stylesheet') {
                  return false;
                } else if (child.type === 'style') {
                  return false;
                } else if (child.type === 'script') {
                  return false;
                }

                return true;
              });
              return _react.default.createElement("head", _extends({}, rest, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                },
                __self: this
              }), head.base, useHelmetTitle && head.title, head.meta, childrenJS, !route.redirect && clientScripts.map(function (script) {
                return _react.default.createElement("link", {
                  key: "clientScript_".concat(script),
                  rel: "preload",
                  as: "script",
                  href: (0, _utils.makePathAbsolute)((0, _utils.pathJoin)(process.env.REACT_STATIC_ASSETS_PATH, script)),
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 86
                  },
                  __self: this
                });
              }), childrenCSS, renderLinkCSS && clientStyleSheets.reduce(function (memo, styleSheet) {
                var href = (0, _utils.makePathAbsolute)((0, _utils.pathJoin)(process.env.REACT_STATIC_ASSETS_PATH, styleSheet));
                return _toConsumableArray(memo).concat([_react.default.createElement("link", {
                  key: "clientStyleSheetPreload_".concat(styleSheet),
                  rel: "preload",
                  as: "style",
                  href: href,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                  },
                  __self: this
                }), _react.default.createElement("link", {
                  key: "clientStyleSheet_".concat(styleSheet),
                  rel: "stylesheet",
                  href: href,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 110
                  },
                  __self: this
                })]);
              }, []), head.link, head.noscript, head.script, config.inlineCss && _react.default.createElement(InlineStyle, {
                clientCss: clientCss,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 120
                },
                __self: this
              }), head.style, pluginHeads, childrenArray);
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _makeHeadWithMeta.apply(this, arguments);
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(REGEX_FOR_STYLE_TAG, "REGEX_FOR_STYLE_TAG", "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HeadWithMeta.js");
  reactHotLoader.register(InlineStyle, "InlineStyle", "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HeadWithMeta.js");
  reactHotLoader.register(makeHeadWithMeta, "makeHeadWithMeta", "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HeadWithMeta.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=HeadWithMeta.js.map