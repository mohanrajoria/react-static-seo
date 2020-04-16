"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.generateXML = exports.makeGenerateRouteXML = exports.getPermaLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var REGEX_TO_GET_LAST_SLASH = /\/{1,}$/gm;

var getPermaLink = function getPermaLink(_ref) {
  var path = _ref.path,
      prefixPath = _ref.prefixPath;
  var permalink = "".concat(prefixPath).concat((0, _utils.pathJoin)(path));
  return "".concat(permalink, "/").replace(REGEX_TO_GET_LAST_SLASH, '/');
};

exports.getPermaLink = getPermaLink;

var makeGenerateRouteXML = function makeGenerateRouteXML(_ref2) {
  var prefixPath = _ref2.prefixPath;
  return function (route) {
    var path = route.path,
        lastModified = route.lastModified,
        _route$priority = route.priority,
        priority = _route$priority === void 0 ? 0.5 : _route$priority;
    return ['<url>', "<loc>".concat(getPermaLink({
      path: path,
      prefixPath: prefixPath
    }).replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<':
          return '&lt;';

        case '>':
          return '&gt;';

        case '&':
          return '&amp;';

        case "'":
          return '&apos;';

        case '"':
          return '&quot;';

        default:
          throw new Error('XML encoding failed');
      }
    }), "</loc>"), lastModified ? "<lastmod>".concat(lastModified, "</lastmod>") : '', "<priority>".concat(priority, "</priority>"), '</url>'].join('');
  };
};

exports.makeGenerateRouteXML = makeGenerateRouteXML;

var generateXML = function generateXML(_ref3) {
  var routes = _ref3.routes,
      prefixPath = _ref3.prefixPath;
  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">".concat(routes.filter(function (r) {
    return r.path !== '404';
  }).filter(function (r) {
    return !r.noindex;
  }).map(makeGenerateRouteXML({
    prefixPath: prefixPath
  })).join(''), "</urlset>");
};

exports.generateXML = generateXML;

var _default =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref4) {
    var config, routes, _config$paths, paths, disableRoutePrefixing, DIST, prefixPath, xml;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref4.config;
            routes = config.routes, _config$paths = config.paths, paths = _config$paths === void 0 ? {} : _config$paths, disableRoutePrefixing = config.disableRoutePrefixing;
            DIST = paths.DIST;
            prefixPath = disableRoutePrefixing ? config.siteRoot : process.env.REACT_STATIC_PUBLIC_PATH;

            if (config.siteRoot) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            xml = generateXML({
              routes: routes,
              prefixPath: prefixPath
            });
            console.log('Generating ' + _path.default.join(DIST, 'sitemap.xml'));

            _fsExtra.default.writeFileSync(_path.default.join(DIST, 'sitemap.xml'), xml);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _default(_x) {
    return _ref5.apply(this, arguments);
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

  reactHotLoader.register(REGEX_TO_GET_LAST_SLASH, "REGEX_TO_GET_LAST_SLASH", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildXML.js");
  reactHotLoader.register(getPermaLink, "getPermaLink", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildXML.js");
  reactHotLoader.register(makeGenerateRouteXML, "makeGenerateRouteXML", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildXML.js");
  reactHotLoader.register(generateXML, "generateXML", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildXML.js");
  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/static/buildXML.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=buildXML.js.map