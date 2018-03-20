export function iter<T>(array: T[]): IterableWrapper<T> {
    return new IterableWrapper(array[Symbol.iterator]());
}

export function wrap<T>(iterable: IterableIterator<T>): IterableWrapper<T> {
    return new IterableWrapper(iterable[Symbol.iterator]());
}

export class IterableWrapper<T> {
    constructor(private readonly iterator: IterableIterator<T>) {
    }

    map<TResult>(mapper: (item: T) => TResult): IterableWrapper<TResult> {
        const iterator = this.iterator;

        function* inner() {
            for (const item of iterator) {
                yield mapper(item);
            }
        };

        return new IterableWrapper(inner());
    }

    filter(predicate: (item: T) => boolean): IterableWrapper<T> {
        const iterator = this.iterator;

        function* inner() {
            for (const item of iterator) {
                if (predicate(item)) {
                    yield item;
                }
            }
        };

        return new IterableWrapper(inner());
    }

    toArray(): T[] {
        return [...this.iterator];
    }
}
