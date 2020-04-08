"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _progress = _interopRequireDefault(require("progress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = function _default(total, label, options) {
  if (!options) {
    options = {};
  }

  if (!options.format) {
    options.format = "=> ".concat(label ? "".concat(label, " ") : '', "[:bar] :current/:total :percent :rate/s :etas ");
  }

  var stream = options.stream || process.stderr;

  if (stream.isTTY && !options.forceNonTTY) {
    options.total = total;
    return new _progress.default(options.format, options);
  }

  var curr = 0;
  var percent = 0;
  var start = new Date();
  return {
    tick: function tick() {
      curr += 1;
      var ratio = Math.min(Math.max(curr / total, 0), 1);
      var value = Math.floor(ratio * 100);

      if (value >= percent + 5) {
        percent = value;
        var elapsed = new Date() - start;
        var eta = percent === 100 ? 0 : elapsed * (total / curr - 1);
        var rate = curr / (elapsed / 1000);
        stream.write("".concat(options.format.replace('[:bar] ', '').replace('[:bar]', '').replace(':current', curr).replace(':total', total).replace(':elapsed', Number.isNaN(elapsed) ? '0.0' : (elapsed / 1000).toFixed(1)).replace(':eta', Number.isNaN(eta) || !Number.isFinite(eta) ? '0.0' : (eta / 1000).toFixed(1)).replace(':percent', "".concat(percent.toFixed(0), "%")).replace(':rate', Math.round(rate)), "\n"));
      }
    }
  };
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/weikaizhang/react-static/packages/react-static/src/utils/progress.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=progress.js.map