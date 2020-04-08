"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _jsxFileName = "/Users/weikaizhang/react-static/packages/react-static/src/static/__mocks__/static.config.mock.jsx";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = {
  Document: function Document(_ref) {
    var Html = _ref.Html,
        Head = _ref.Head,
        Body = _ref.Body,
        children = _ref.children;
    return React.createElement(Html, {
      lang: "en-US",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 5
      },
      __self: this
    }, React.createElement(Head, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    }, React.createElement("meta", {
      charSet: "UTF-8",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      },
      __self: this
    }), React.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: this
    })), React.createElement(Body, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: this
    }, children));
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/__mocks__/static.config.mock.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=static.config.mock.js.map