"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullCheck = void 0;
const nullCheck = (obj) => {
    for (let i in obj) {
        if (obj[i] != null && obj[i] != undefined && obj[i].length != 0) {
            delete obj[i];
        }
        else if (typeof obj[i] === 'object') {
            (0, exports.nullCheck)(obj[i]);
        }
    }
    return obj;
};
exports.nullCheck = nullCheck;
