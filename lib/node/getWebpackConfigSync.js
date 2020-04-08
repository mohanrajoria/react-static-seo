"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getConfig = _interopRequireDefault(require("../static/getConfig"));

var _webpack = require("../static/webpack");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Required so handle static.config.js defined as es module
require('../utils/binHelper');

var getWebpackConfigSync = function getWebpackConfigSync(configPath) {
  var stage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dev';
  var staticConfig = (0, _getConfig.default)(configPath, undefined, {
    sync: true
  });
  return (0, _webpack.webpackConfig)({
    config: staticConfig,
    stage: stage,
    sync: true
  });
};

exports.default = getWebpackConfigSync;
//# sourceMappingURL=getWebpackConfigSync.js.map