"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tryGetAt(index) {
    return (source) => {
        let i = 0;
        for (const item of source) {
            if (i++ === index) {
                return item;
            }
        }
        return undefined;
    };
}
exports.tryGetAt = tryGetAt;
function getAt(index) {
    return (source) => {
        const result = tryGetAt(index)(source);
        if (result === undefined) {
            throw new RangeError();
        }
        else {
            return result;
        }
    };
}
exports.getAt = getAt;
function tryGetHead() {
    return (source) => {
        const result = source.next();
        if (result.done) {
            return undefined;
        }
        return result.value;
    };
}
exports.tryGetHead = tryGetHead;
function head() {
    return (source) => {
        const result = source.next();
        if (result.done) {
            throw new RangeError('The iterable is empty');
        }
        return result.value;
    };
}
exports.head = head;
function skip(numElements) {
    return function* (source) {
        let counter = 0;
        for (const item of source) {
            if (counter++ >= numElements) {
                yield item;
            }
        }
    };
}
exports.skip = skip;
function take(numElements) {
    return function* (source) {
        let counter = 0;
        for (const item of source) {
            if (counter++ >= numElements) {
                break;
            }
            yield item;
        }
    };
}
exports.take = take;
