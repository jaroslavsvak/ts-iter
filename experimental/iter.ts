import * as piping from './pipe';

export function map<T, R>(mapper: (item: T) => R): (source: IterableIterator<T>) => IterableIterator<R> {
    return function*(source: IterableIterator<T>) {
        for (const item of source) {
            yield mapper(item);
        }
    };
}

export function filter<T>(predicate: (item: T) => boolean): (source: IterableIterator<T>) => IterableIterator<T> {
    return function*(source: IterableIterator<T>) {
        for (const item of source) {
            if (predicate(item)) {
               yield item;
            }
        }
    };
}

export function toArray<T>(): (source: IterableIterator<T>) => T[] {
    return function(source: IterableIterator<T>) {
        return [...source];
    };
}

export { pipe } from './pipe';
