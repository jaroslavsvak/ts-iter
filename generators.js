"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a sequence of numbers.
 * @param from Starting from
 * @param to Ends with (excluding this value)
 * @param step Step to increment or decrement. 1 by default.
 */
function* range(from, to, step = 1) {
    for (let i = from; i < to; i += step) {
        yield i;
    }
}
exports.range = range;
/**
 * Generates a sequence of numbers.
 * @param from Starting from
 * @param to Ends with (including this value)
 * @param step Step to increment or decrement. 1 by default.
 */
function* rangeInclusive(from, to, step = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
exports.rangeInclusive = rangeInclusive;
