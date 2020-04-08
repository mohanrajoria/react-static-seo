"use strict";

/* eslint-disable import/no-dynamic-require */
var _require = require(process.env.REACT_STATIC_TEMPLATES_PATH),
    templates = _require.default,
    notFoundTemplate = _require.notFoundTemplate;

var _require2 = require('./browser'),
    registerTemplates = _require2.registerTemplates;

registerTemplates(templates, notFoundTemplate);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept(process.env.REACT_STATIC_TEMPLATES_PATH, function () {
    var _require3 = require(process.env.REACT_STATIC_TEMPLATES_PATH),
        templates = _require3.default,
        notFoundTemplate = _require3.notFoundTemplate;

    registerTemplates(templates, notFoundTemplate);
  });
}
//# sourceMappingURL=bootstrapTemplates.js.map