"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNonNullValues = void 0;
const filterNonNullValues = (obj) => {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (value !== null && value !== undefined && value !== '') {
            result[key] = value;
        }
    }
    return result;
};
exports.filterNonNullValues = filterNonNullValues;
