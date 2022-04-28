"use strict";
exports.__esModule = true;
require("./style.css");
var we_can_1 = require("./we-can");
we_can_1["default"].can('strikeThroughLinks', function () {
    document.querySelectorAll(':any-link').forEach(function (link) { return link.style.textDecoration = 'line-through'; });
});
var app = document.querySelector('#app');
app.innerHTML = "\n  <h1>Hello Vite!</h1>\n  <a href=\"https://vitejs.dev/guide/features.html\" target=\"_blank\">Documentation</a>\n";
we_can_1["default"].should('strikeThroughLinks');
we_can_1["default"].should('boldenLinks');
we_can_1["default"].can('boldenLinks', function () {
    document.querySelectorAll(':any-link').forEach(function (link) { return link.style.fontWeight = '600'; });
});
