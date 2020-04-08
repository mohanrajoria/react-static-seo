"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _chunkBuilder = require("../utils/chunkBuilder");

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
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(config) {
    var templates, paths, reactStaticUniversalPath, productionImports, developmentImports, productionTemplates, developmentTemplates, file, dynamicRoutesPath;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templates = config.templates, paths = config.paths; // convert Windows-style path separators to the Unix style to ensure sure the
            // string literal is valid and doesn't contain escaped characters

            reactStaticUniversalPath = process.env.REACT_STATIC_UNIVERSAL_PATH.split('\\').join('/');
            productionImports = "import universal, { setHasBabelPlugin } from '".concat(reactStaticUniversalPath, "'");
            developmentImports = '';
            productionTemplates = "\nsetHasBabelPlugin()\n\nconst universalOptions = {\n  loading: () => null,\n  error: props => {\n    console.error(props.error);\n    return <div>An error occurred loading this page's template. More information is available in the console.</div>;\n  },\n}\n\n".concat(templates.map(function (template, index) {
              var chunkName = ''; // relative resolving produces the wrong path, a "../" is missing
              // as the files looks equal, we simple use an absolute path then

              if (!paths.DIST.startsWith(paths.ROOT)) {
                chunkName = "/* webpackChunkName: \"".concat((0, _chunkBuilder.chunkNameFromFile)(template), "\" */");
              }

              return "const t_".concat(index, " = universal(import('").concat(template, "'").concat(chunkName, "), universalOptions)");
            }).join('\n'), "\n");
            developmentTemplates = templates.map(function (template, index) {
              return "import t_".concat(index, " from '").concat(template, "'");
            }).join('\n');
            file = "\n".concat(process.env.NODE_ENV === 'production' ? productionImports : developmentImports, "\n\n").concat(process.env.NODE_ENV === 'production' ? productionTemplates : developmentTemplates, "\n\n// Template Map\nexport default {\n  ").concat(templates.map(function (template, index) {
              return "'".concat(template, "': t_").concat(index);
            }).join(',\n'), "\n}\n\nexport const notFoundTemplate = ").concat(JSON.stringify(templates[0]), "\n");
            dynamicRoutesPath = _path.default.join(process.env.REACT_STATIC_TEMPLATES_PATH);
            _context.next = 10;
            return _fsExtra.default.remove(dynamicRoutesPath);

          case 10:
            _context.next = 12;
            return _fsExtra.default.outputFile(dynamicRoutesPath, file);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _default(_x) {
    return _ref.apply(this, arguments);
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

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/generateTemplates.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=generateTemplates.js.map