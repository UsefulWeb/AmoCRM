"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.delay = delay;
