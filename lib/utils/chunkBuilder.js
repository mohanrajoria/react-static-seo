"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absoluteToRelativeChunkName = exports.chunkNameFromFile = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var chunkNameFromFile = function chunkNameFromFile(filename) {
  var chunkName = filename.replace(_path.default.extname(filename), '') // extension
  .replace(new RegExp("[".concat(_path.default.sep, "]"), 'g'), '-'); // slash to -

  if (chunkName[0] === '-') {
    return chunkName.substr(1);
  }

  return chunkName;
};

exports.chunkNameFromFile = chunkNameFromFile;

var absoluteToRelativeChunkName = function absoluteToRelativeChunkName(ROOT, chunkName) {
  var pathPrefix = ROOT.replace(new RegExp("[".concat(_path.default.sep, "]"), 'g'), '-').substr(1); // inner components can simply be added aswell

  if (!chunkName.startsWith(pathPrefix)) {
    return chunkName;
  } // the templates starts with the absolute path, thats the ones we want to replace


  var relativeChunkName = chunkName.replace(new RegExp("".concat(pathPrefix), 'g'), '');

  if (relativeChunkName.startsWith('-')) {
    relativeChunkName = relativeChunkName.substr(1);
  } // cut of the extension if any


  if (relativeChunkName.indexOf('.')) {
    relativeChunkName = relativeChunkName.substr(0, relativeChunkName.indexOf('.'));
  }

  return relativeChunkName;
};

exports.absoluteToRelativeChunkName = absoluteToRelativeChunkName;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(chunkNameFromFile, "chunkNameFromFile", "/Users/weikaizhang/react-static/packages/react-static/src/utils/chunkBuilder.js");
  reactHotLoader.register(absoluteToRelativeChunkName, "absoluteToRelativeChunkName", "/Users/weikaizhang/react-static/packages/react-static/src/utils/chunkBuilder.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=chunkBuilder.js.map