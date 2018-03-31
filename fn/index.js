"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(mapper) {
    return function* (source) {
        for (const item of source) {
            yield mapper(item);
        }
    };
}
exports.map = map;
function filter(predicate) {
    return function* (source) {
        for (const item of source) {
            if (predicate(item)) {
                yield item;
            }
        }
    };
}
exports.filter = filter;
function reduce(aggregator, initialValue) {
    return function* (source) {
        for (const item of source) {
            initialValue = aggregator(initialValue, item);
        }
        return initialValue;
    };
}
exports.reduce = reduce;
function toArray() {
    return function (source) {
        return [...source];
    };
}
exports.toArray = toArray;
