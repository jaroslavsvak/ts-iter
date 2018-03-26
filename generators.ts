/**
 * Generates a sequence of numbers.
 * @param from Starting from
 * @param to Ends with (excluding this value)
 * @param step Step to increment or decrement. 1 by default.
 */
export function* range(from: number, to: number, step: number = 1) {
    for (let i = from; i < to; i += step) {
        yield i;
    }
}

/**
 * Generates a sequence of numbers.
 * @param from Starting from
 * @param to Ends with (including this value)
 * @param step Step to increment or decrement. 1 by default.
 */
export function* rangeInclusive(from: number, to: number, step: number = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
