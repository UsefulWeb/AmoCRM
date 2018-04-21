"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (typesKey) {
  return function hasElementType(value) {
    var types = this[typesKey],
        compareKey = function compareKey(key) {
      return types[key] === value;
    },
        type = Object.keys(types).filter(compareKey)[0];

    return type.toLowerCase();
  };
};