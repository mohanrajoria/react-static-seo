"use strict";

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var path = require('path');

var _require = require('./'),
    escapeRegExp = _require.escapeRegExp;

var ignorePath; // Allow as much stack tracing as possible

Error.stackTraceLimit = Infinity;

require('@babel/register')({
  ignore: [function babelIgnore(filename) {
    // true if should ignore
    return new RegExp(escapeRegExp("".concat(path.sep, "node_modules").concat(path.sep))).test(filename) || ignorePath && ignorePath.test(filename);
  }]
});

var PrettyError = require('pretty-error'); // necesarry at any entry point of the cli to ensure that Babel-register
// does not attempt to transform non JavaScript files.


var ignoredExtensions = ['css', 'scss', 'styl', 'less', 'png', 'gif', 'jpg', 'jpeg', 'svg', 'woff', 'woff2', 'ttf', 'eot', 'otf', 'mp4', 'webm', 'ogg', 'mp3', 'wav', 'md', 'yaml'];
ignoredExtensions.forEach(function (ext) {
  require.extensions[".".concat(ext)] = function () {};
});

console.error = function (err) {
  var _console;

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return (_console = console).log.apply(_console, [new PrettyError().render(err)].concat(rest));
}; // Be sure to log useful information about unhandled exceptions. This should seriously
// be a default: https://github.com/nodejs/node/issues/9523#issuecomment-259303079


process.on('unhandledRejection', function (r) {
  console.error(r);
});
module.exports = {
  setIgnorePath: function setIgnorePath(path) {
    ignorePath = path ? new RegExp(escapeRegExp(path)) : undefined;
  }
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ignorePath, "ignorePath", "/Users/weikaizhang/react-static/packages/react-static/src/utils/binHelper.js");
  reactHotLoader.register(ignoredExtensions, "ignoredExtensions", "/Users/weikaizhang/react-static/packages/react-static/src/utils/binHelper.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=binHelper.js.map