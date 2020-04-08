"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _slash = _interopRequireDefault(require("slash"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _extractTemplates = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(config) {
    var opts,
        templates,
        notFoundPending,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            console.log('=> Building Templates');
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Templates Built")); // Dedupe all templates into an array

            templates = [];
            notFoundPending = true;
            config.routes.forEach(function (route) {
              if (!route.component) {
                return;
              }

              route.template = (0, _slash.default)(_path.default.relative(config.paths.BUILD_ARTIFACTS, _path.default.resolve(config.paths.ROOT, route.component))); // Check if the template has already been added

              var index = templates.indexOf(route.template);

              if (index === -1) {
                // If it's new, add it
                if (route.path === '404') {
                  templates.unshift(route.template);
                  notFoundPending = false;
                } else {
                  templates.push(route.template);
                }
              }
            });
            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Templates Built"));

            if (!(!opts.incremental && notFoundPending)) {
              _context.next = 9;
              break;
            }

            throw new Error('A 404 template was not found at template extraction time. It should have been at least defaulted to one by now, so this is very bad. File an issue if you see this.');

          case 9:
            // Make sure 404 template is the first one
            config.templates = templates;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function extractTemplates(_x) {
    return _extractTemplates.apply(this, arguments);
  }

  return extractTemplates;
}();

exports.default = _default;
//# sourceMappingURL=extractTemplates.js.map