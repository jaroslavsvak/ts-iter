export function* range(from: number, to: number, step: number = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
