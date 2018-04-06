"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function min(mapper) {
    return (source) => {
        let result = undefined;
        for (const item of source) {
            const current = mapper(item);
            if (result === undefined || result > current) {
                result = current;
            }
        }
        return result;
    };
}
exports.min = min;
function max(mapper) {
    return (source) => {
        let result = undefined;
        for (const item of source) {
            const current = mapper(item);
            if (result === undefined || result < current) {
                result = current;
            }
        }
        return result;
    };
}
exports.max = max;
function sum(mapper) {
    return (source) => {
        let result = 0;
        for (const item of source) {
            result += mapper(item);
        }
        return result;
    };
}
exports.sum = sum;
