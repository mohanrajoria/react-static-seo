"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ChalkColor: true,
  findAvailablePort: true,
  copyPublicFolder: true,
  createIndexFilePlaceholder: true,
  glob: true,
  time: true,
  timeEnd: true,
  debounce: true,
  escapeRegExp: true,
  progress: true
};
exports.copyPublicFolder = copyPublicFolder;
exports.createIndexFilePlaceholder = createIndexFilePlaceholder;
exports.glob = glob;
exports.time = time;
exports.timeEnd = timeEnd;
exports.debounce = debounce;
exports.escapeRegExp = escapeRegExp;
Object.defineProperty(exports, "progress", {
  enumerable: true,
  get: function get() {
    return _progress.default;
  }
});
exports.findAvailablePort = exports.ChalkColor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _portfinder = _interopRequireDefault(require("portfinder"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _perf_hooks = require("perf_hooks");

var _RootComponents = require("../static/RootComponents");

var _utils = require("../browser/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _progress = _interopRequireDefault(require("./progress"));

var _jsxFileName = "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ChalkColor = {
  yarn: '#2c8ebb',
  npm: '#cb3837'
};
exports.ChalkColor = ChalkColor;

var findAvailablePort = function findAvailablePort(start) {
  return _portfinder.default.getPortPromise({
    port: start,
    stopPort: start + 1000
  });
};

exports.findAvailablePort = findAvailablePort;

function copyPublicFolder(config) {
  _fsExtra.default.ensureDirSync(config.paths.PUBLIC);

  _fsExtra.default.copySync(config.paths.PUBLIC, config.paths.DIST, {
    dereference: true,
    filter: function filter(file) {
      return file !== config.paths.INDEX;
    }
  });
}

function createIndexFilePlaceholder(_x) {
  return _createIndexFilePlaceholder.apply(this, arguments);
}

function _createIndexFilePlaceholder() {
  _createIndexFilePlaceholder = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var _ref$config, Document, paths, siteData, Component, DocumentHtml, html;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$config = _ref.config, Document = _ref$config.Document, paths = _ref$config.paths, siteData = _ref$config.siteData;
            // Render the base document component to string with siteprops
            Component = Document || _RootComponents.DefaultDocument;
            DocumentHtml = (0, _server.renderToString)(_react.default.createElement(Component, {
              renderMeta: {},
              Html: _RootComponents.Html,
              Head: _RootComponents.Head,
              Body: _RootComponents.Body,
              siteData: siteData,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 41
              },
              __self: this
            }, _react.default.createElement("div", {
              id: "root",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 48
              },
              __self: this
            })));
            html = "<!DOCTYPE html>".concat(DocumentHtml); // Write the Document to index.html

            _context.next = 6;
            return _fsExtra.default.outputFile(paths.HTML_TEMPLATE, html);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _createIndexFilePlaceholder.apply(this, arguments);
}

function glob(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    return (0, _glob.default)(path, options, function (err, files) {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });
}

var times = {};

function time(message) {
  times[message] = _perf_hooks.performance.now() / 1000;
}

function timeEnd(message) {
  if (times[message]) {
    var seconds = (_perf_hooks.performance.now() / 1000 - times[message]) * 10;
    times[message] = null;

    if (seconds < 0.1) {
      console.log("".concat(message));
      return;
    }

    if (seconds < 1) {
      seconds = Math.round(seconds * 10) / 10;
    } else {
      seconds = Math.round(seconds) / 10;
    }

    console.log("".concat(message, " (").concat(seconds, "s)"));
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(void 0, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(void 0, args);
  };
}

var escapeReg = /[\\^$.*+?()[\]{}|]/g;

function escapeRegExp(str) {
  return str.replace(escapeReg, '\\$&');
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChalkColor, "ChalkColor", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(findAvailablePort, "findAvailablePort", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(copyPublicFolder, "copyPublicFolder", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(createIndexFilePlaceholder, "createIndexFilePlaceholder", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(glob, "glob", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(times, "times", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(time, "time", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(timeEnd, "timeEnd", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(debounce, "debounce", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(escapeReg, "escapeReg", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
  reactHotLoader.register(escapeRegExp, "escapeRegExp", "/Users/weikaizhang/react-static/packages/react-static/src/utils/index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=index.js.map