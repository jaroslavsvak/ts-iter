export function iterate<T>(array: T[]): IterableIterator<T> {
    return array[Symbol.iterator]();
}

export function map<T, TResult>(mapper: (item: T) => TResult)
    : (source: IterableIterator<T>) => IterableIterator<TResult> {

    return function*(source: IterableIterator<T>) {
        for (const item of source) {
            yield mapper(item);
        }
    };
}

export function filter<T>(predicate: (item: T) => boolean)
    : (source: IterableIterator<T>) => IterableIterator<T> {

    return function*(source: IterableIterator<T>) {
        for (const item of source) {
            if (predicate(item)) {
               yield item;
            }
        }
    };
}

export function reduce<T, TResult>(aggregator: (acc: TResult, item: T) => TResult, initialValue: TResult) {
    return function*(source: IterableIterator<T>) {
        for (const item of source) {
            initialValue = aggregator(initialValue, item);
        }

        return initialValue;
    };
}

export function toArray<T>(source: IterableIterator<T>): T[] {
    return [...source];
}
