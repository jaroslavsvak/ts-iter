"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toMap(keyMapper) {
    return (source) => {
        const result = new Map();
        for (const item of source) {
            const key = keyMapper(item), group = result.get(key);
            if (group) {
                group.push(item);
            }
            else {
                result.set(key, [item]);
            }
        }
        return result;
    };
}
exports.toMap = toMap;
function toReadonlyMap(keyMapper) {
    return (source) => toMap(keyMapper)(source);
}
exports.toReadonlyMap = toReadonlyMap;
function toSet(source) {
    const result = new Set();
    for (const item of source) {
        result.add(item);
    }
    return result;
}
exports.toSet = toSet;
function toReadolnySet(source) {
    return toSet(source);
}
exports.toReadolnySet = toReadolnySet;
function distinct(keyMapper) {
    return function* (source) {
        keyMapper = keyMapper || ((x) => x);
        const uniqueItems = new Set();
        for (const item of source) {
            const key = keyMapper(item);
            if (!uniqueItems.has(key)) {
                uniqueItems.add(key);
                yield item;
            }
        }
    };
}
exports.distinct = distinct;
