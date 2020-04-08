"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _slash = _interopRequireDefault(require("slash"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var config, pluginImports, recurse, pluginsText, pluginImportsText, file, targetPath;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref.config;
            // A deduped list of pluginImports
            pluginImports = [];

            recurse = function recurse(plugins) {
              return (// Return an array of plugins
                "[".concat(plugins.map(function (plugin) {
                  var browserLocation = plugin.browserLocation; // Add the plugin to the list of pluginImports

                  var pluginIndex = browserLocation ? pluginImports.indexOf(browserLocation) : -1;

                  if (pluginIndex === -1 && browserLocation) {
                    pluginImports.push((0, _slash.default)(browserLocation));
                    pluginIndex = pluginImports.length - 1;
                  }

                  var location = plugin.location,
                      plugins = plugin.plugins,
                      options = plugin.options; // IIF to return the final plugin

                  return "{\n  location: \"".concat((0, _slash.default)(location), "\",\n  plugins: ").concat(recurse(plugins || []), ",\n  hooks: ").concat(browserLocation ? "plugin".concat(pluginIndex, "(").concat(JSON.stringify(options), ")") : "{}", "\n}");
                }).join(',\n'), "]")
              );
            }; // Create the pluginsText


            pluginsText = recurse(config.plugins || []); // Create the pluginImportsText

            pluginImportsText = pluginImports.map(function (imp, index) {
              return "import plugin".concat(index, " from '").concat(imp, "'");
            }).join('\n'); // Create the file text

            file = "// Imports\n".concat(pluginImportsText, "\n\n// Plugins\nconst plugins = ").concat(pluginsText, "\n\n// Export em!\nexport default plugins");
            targetPath = _path.default.join(process.env.REACT_STATIC_PLUGINS_PATH);
            _context.next = 9;
            return _fsExtra.default.remove(targetPath);

          case 9:
            _context.next = 11;
            return _fsExtra.default.outputFile(targetPath, file);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
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

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/generateBrowserPlugins.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=generateBrowserPlugins.js.map