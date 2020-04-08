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

var getWebpackConfig = function getWebpackConfig(configPath) {
  var stage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dev';
  return new Promise(function (resolve) {
    return (0, _getConfig.default)(configPath, function (staticConfig) {
      return resolve((0, _webpack.webpackConfig)({
        config: staticConfig,
        stage: stage
      }));
    });
  });
};

exports.default = getWebpackConfig;
//# sourceMappingURL=getWebpackConfig.js.map