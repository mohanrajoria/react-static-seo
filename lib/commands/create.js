"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _gitPromise = _interopRequireDefault(require("git-promise"));

var _child_process = require("child_process");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _inquirerAutocompletePrompt = _interopRequireDefault(require("inquirer-autocomplete-prompt"));

var _matchSorter = _interopRequireDefault(require("match-sorter"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _util = require("util");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_inquirer.default.registerPrompt('autocomplete', _inquirerAutocompletePrompt.default);

var typeLocal = 'Local Directory...';
var typeGit = 'GIT Repository...';
var typeExample = 'React Static Example';

var templatesDir = _path.default.resolve(__dirname, '../../templates');

var templates = _fsExtra.default.readdirSync(templatesDir).filter(function (d) {
  return !d.startsWith('.');
});

var _default =
/*#__PURE__*/
function () {
  var _create = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref) {
    var name, template, isCLI, isYarn, exampleChoices, templateType, answers, dest, _answers, _ref2, localDirectory, _ref3, githubRepoName, getGitHubRepo;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = _ref.name, template = _ref.template, isCLI = _ref.isCLI;
            isYarn = shouldUseYarn();
            console.log('');
            exampleChoices = _toConsumableArray(templates).concat([typeLocal, typeGit]);
            templateType = typeExample; // prompt if --name argument is not passed from CLI
            // warning: since name will be set as a function by commander by default
            //   unless it's assigned as an argument from the CLI, we can't simply just
            //   check for its existence. if it has not been set by the CLI, we properly
            //   set it to null for later conditional checks.

            if (!(isCLI && !name)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return _inquirer.default.prompt({
              type: 'input',
              name: 'name',
              message: 'What should we name this project?',
              default: 'my-static-site'
            });

          case 8:
            answers = _context2.sent;
            name = answers.name;

          case 10:
            if (name) {
              _context2.next = 12;
              break;
            }

            throw new Error('A project name is required. Please use options.name to define one.');

          case 12:
            dest = _path.default.resolve(process.cwd(), name);

            if (!_fsExtra.default.existsSync(dest)) {
              _context2.next = 15;
              break;
            }

            throw new Error("Could not create project. Directory already exists at ".concat(dest, "!"));

          case 15:
            if (!(isCLI && !template)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 18;
            return _inquirer.default.prompt({
              type: 'autocomplete',
              name: 'template',
              message: 'Select a template below...',
              source: function () {
                var _source = _asyncToGenerator(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(answersSoFar, input) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", !input ? exampleChoices : (0, _matchSorter.default)(exampleChoices, input));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                function source(_x2, _x3) {
                  return _source.apply(this, arguments);
                }

                return source;
              }()
            });

          case 18:
            _answers = _context2.sent;
            template = _answers.template;

          case 20:
            if (template) {
              _context2.next = 22;
              break;
            }

            throw new Error('A project template is required. Please use options.template to define one.');

          case 22:
            (0, _utils.time)(_chalk.default.green("=> [\u2713] Project \"".concat(name, "\" created")));
            console.log('=> Creating new react-static project...');

            if (!(template === typeLocal)) {
              _context2.next = 31;
              break;
            }

            templateType = typeLocal;
            _context2.next = 28;
            return _inquirer.default.prompt([{
              type: 'input',
              name: 'localDirectory',
              message: "Enter an local directory's absolute location (~/Desktop/my-template)"
            }]);

          case 28:
            _ref2 = _context2.sent;
            localDirectory = _ref2.localDirectory;
            template = localDirectory;

          case 31:
            if (!(template === typeGit)) {
              _context2.next = 38;
              break;
            }

            templateType = typeGit;
            _context2.next = 35;
            return _inquirer.default.prompt([{
              type: 'input',
              name: 'githubRepoName',
              message: 'Enter a repository URL from GitHub, BitBucket, GitLab, or any other public repo. (https://github.com/ownerName/repoName.git)'
            }]);

          case 35:
            _ref3 = _context2.sent;
            githubRepoName = _ref3.githubRepoName;
            template = githubRepoName;

          case 38:
            console.log(''); // GIT repositories

            if (!(templateType === typeGit)) {
              _context2.next = 67;
              break;
            }

            if (!(template.startsWith('https://') || template.startsWith('git@'))) {
              _context2.next = 53;
              break;
            }

            _context2.prev = 41;
            console.log(_chalk.default.green("Cloning Git template: ".concat(template)));
            _context2.next = 45;
            return (0, _gitPromise.default)("clone --recursive ".concat(template, " ").concat(dest));

          case 45:
            _context2.next = 51;
            break;

          case 47:
            _context2.prev = 47;
            _context2.t0 = _context2["catch"](41);
            console.log(_chalk.default.red("Cloning Git template: ".concat(template, " failed!")));
            throw _context2.t0;

          case 51:
            _context2.next = 65;
            break;

          case 53:
            if (!template.startsWith('http://')) {
              _context2.next = 65;
              break;
            }

            // use download-git-repo to fetch remote repository
            getGitHubRepo = (0, _util.promisify)(_downloadGitRepo.default);
            _context2.prev = 55;
            console.log(_chalk.default.green("Cloning Git template: ".concat(template)));
            _context2.next = 59;
            return getGitHubRepo(template, dest);

          case 59:
            _context2.next = 65;
            break;

          case 61:
            _context2.prev = 61;
            _context2.t1 = _context2["catch"](55);
            console.log(_chalk.default.red("Cloning Git template: ".concat(template, " failed!")));
            throw _context2.t1;

          case 65:
            _context2.next = 90;
            break;

          case 67:
            if (!(templateType === typeExample)) {
              _context2.next = 80;
              break;
            }

            // React Static templates
            console.log(_chalk.default.green("Using React Static template: ".concat(template)));
            _context2.prev = 69;
            _context2.next = 72;
            return _fsExtra.default.copy(_path.default.resolve(templatesDir, template), _path.default.resolve(process.cwd(), dest));

          case 72:
            _context2.next = 78;
            break;

          case 74:
            _context2.prev = 74;
            _context2.t2 = _context2["catch"](69);
            console.log(_chalk.default.red("Copying React Static template: ".concat(template, " failed!")));
            throw _context2.t2;

          case 78:
            _context2.next = 90;
            break;

          case 80:
            _context2.prev = 80;
            console.log(_chalk.default.green("Using template from directory: ".concat(template)));
            _context2.next = 84;
            return _fsExtra.default.copy(_path.default.resolve(process.cwd(), template), dest);

          case 84:
            _context2.next = 90;
            break;

          case 86:
            _context2.prev = 86;
            _context2.t3 = _context2["catch"](80);
            console.log(_chalk.default.red("Copying the template from directory: ".concat(template, " failed!")));
            throw _context2.t3;

          case 90:
            if (!(!_fsExtra.default.pathExistsSync(_path.default.join(dest, '.gitignore')) && _fsExtra.default.pathExistsSync(_path.default.join(dest, 'gitignore')))) {
              _context2.next = 93;
              break;
            }

            _context2.next = 93;
            return _fsExtra.default.move(_path.default.join(dest, 'gitignore'), _path.default.join(dest, '.gitignore'));

          case 93:
            if (_fsExtra.default.pathExistsSync(_path.default.join(dest, 'gitignore'))) {
              _fsExtra.default.removeSync(_path.default.join(dest, 'gitignore'));
            }

            if (isCLI) {
              console.log("=> Installing dependencies with: ".concat(isYarn ? _chalk.default.hex(_utils.ChalkColor.yarn)('Yarn') : _chalk.default.hex(_utils.ChalkColor.npm)('NPM'), "...")); // We install react-static separately to ensure we always have the latest stable release

              (0, _child_process.execSync)("cd \"".concat(name, "\" && ").concat(isYarn ? 'yarn' : 'npm install'));
              console.log('');
            }

            (0, _utils.timeEnd)(_chalk.default.green("=> [\u2713] Project \"".concat(name, "\" created")));
            console.log("\n  ".concat(_chalk.default.green('=> To get started:'), "\n\n    cd \"").concat(name, "\" ").concat(!isCLI ? "&& ".concat(isYarn ? _chalk.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk.default.hex(_utils.ChalkColor.npm)('npm install')) : '', "\n\n    ").concat(isYarn ? _chalk.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk.default.hex(_utils.ChalkColor.npm)('npm run'), " start ").concat(_chalk.default.green('- Start the development server'), "\n    ").concat(isYarn ? _chalk.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk.default.hex(_utils.ChalkColor.npm)('npm run'), " build ").concat(_chalk.default.green('- Build for production'), "\n    ").concat(isYarn ? _chalk.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk.default.hex(_utils.ChalkColor.npm)('npm run'), " serve ").concat(_chalk.default.green('- Test a production build locally'), "\n  "));

          case 97:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[41, 47], [55, 61], [69, 74], [80, 86]]);
  }));

  function create(_x) {
    return _create.apply(this, arguments);
  }

  return create;
}();

exports.default = _default;

function shouldUseYarn() {
  try {
    (0, _child_process.execSync)('yarnpkg --version', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    return false;
  }
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(typeLocal, "typeLocal", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
  reactHotLoader.register(typeGit, "typeGit", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
  reactHotLoader.register(typeExample, "typeExample", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
  reactHotLoader.register(templatesDir, "templatesDir", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
  reactHotLoader.register(templates, "templates", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
  reactHotLoader.register(shouldUseYarn, "shouldUseYarn", "/Users/weikaizhang/react-static/packages/react-static/src/commands/create.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();
//# sourceMappingURL=create.js.map