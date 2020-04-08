"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHtmlWithMeta = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HtmlWithMeta.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Instead of using the default components, we need to hard code meta
// from react-helmet into the components
var makeHtmlWithMeta = function makeHtmlWithMeta(_ref) {
  var head = _ref.head;
  return function (_ref2) {
    var children = _ref2.children,
        rest = _objectWithoutProperties(_ref2, ["children"]);

    return _react.default.createElement("html", _extends({
      lang: "en"
    }, head.htmlProps, rest, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    }), children);
  };
};

exports.makeHtmlWithMeta = makeHtmlWithMeta;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(makeHtmlWithMeta, "makeHtmlWithMeta", "/Users/weikaizhang/react-static/packages/react-static/src/static/components/HtmlWithMeta.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=HtmlWithMeta.js.map