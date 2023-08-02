"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedVaules = void 0;
const removeUndefinedVaules = (obj) => {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
    return obj;
};
exports.removeUndefinedVaules = removeUndefinedVaules;
