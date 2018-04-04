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
function distinct() {
}
exports.distinct = distinct;
