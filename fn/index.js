"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iterate(array) {
    return array[Symbol.iterator]();
}
exports.iterate = iterate;
function map(mapper) {
    return function* (source) {
        let index = 0;
        for (const item of source) {
            yield mapper(item, index++);
        }
    };
}
exports.map = map;
function filter(predicate) {
    return function* (source) {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
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
function length(source) {
    let count = 0;
    while (!source.next().done) {
        count++;
    }
    return count;
}
exports.length = length;
function isEmpty(source) {
    return source.next().done;
}
exports.isEmpty = isEmpty;
function find(predicate) {
    return (source) => {
        for (const item of source) {
            if (predicate(item)) {
                return item;
            }
        }
        return undefined;
    };
}
exports.find = find;
function findIndex(predicate) {
    return (source) => {
        let index = 0;
        for (const item of source) {
            if (predicate(item)) {
                return index;
            }
            index++;
        }
        return -1;
    };
}
exports.findIndex = findIndex;
function some(predicate) {
    return (source) => {
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    };
}
exports.some = some;
function every(predicate) {
    return (source) => {
        for (const item of source) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    };
}
exports.every = every;
function flatMap(nestedAccessor) {
    return function* (source) {
        for (const item of source) {
            const nestedColl = nestedAccessor(item);
            for (const subitem of nestedColl) {
                yield subitem;
            }
        }
    };
}
exports.flatMap = flatMap;
function toArray(source) {
    return [...source];
}
exports.toArray = toArray;
