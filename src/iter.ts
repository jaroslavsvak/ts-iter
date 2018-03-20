export function iter<T>(iterable: IterableIterator<T>): Iter<T> {
    return new Iter(iterable[Symbol.iterator]());
}

export function iterReversed<T>(list: T[]): Iter<T> {
    function* inner() {
        for (let i = list.length - 1; i >= 0; i--) {
            yield list[i];
        }
    }

    return new Iter<T>(inner());
}

export class Iter<T> {
    private readonly iterator: IterableIterator<T>;

    constructor(iterator: IterableIterator<T>) {
        this.iterator = iterator;
    }

    public [Symbol.iterator]() {
        return this.iterator;
    }

    contains(predicate: (item: T) => boolean): boolean {
        for (const item of this.iterator) {
            if (predicate(item)) {
                return true;
            };
        }

        return false;
    }

    containsElement(searchItem: T): boolean {
        return this.contains(it => it === searchItem);
    }

    concat(another: Iter<T>): Iter<T> {
        const iterator = this.iterator;
        function* inner() {
            for (const item of iterator) {
                yield item;
            }

            for (const item of another) {
                yield item;
            }
        };

        return new Iter(inner());
    }

    count(): number {
        let count = 0;
        while (!this.iterator.next().done) {
            count++;
        }

        return count;
    }

    countElementOccurences(): Map<T, number> {
        const result = new Map<T, number>();
        for (const item of this.iterator) {
            let occurences = result.get(item);
            occurences = occurences ? occurences + 1 : 1;
            result.set(item, occurences);
        }

        return result;
    }

    collectTo(array: T[]): void {
        for (const item of this.iterator) {
            array.push(item);
        }
    }

    find(predicate: (item: T) => boolean): T | undefined {
        for (const item of this.iterator) {
            if (predicate(item)) {
                return item;
            };
        }

        return undefined;
    }

    filter(predicate: (item: T) => boolean): Iter<T> {
        const iterator = this.iterator;
        function* inner() {
            for (const item of iterator) {
                if (predicate(item)) {
                    yield item;
                }
            }
        };

        return new Iter(inner());
    }

    forEach(apply: (item: T) => void): void {
        for (const item of this.iterator) {
            apply(item);
        }
    }

    flatMap<TItem>(mapper: (item: T) => TItem[]): Iter<TItem> {
        const iterator = this.iterator;
        function* inner() {
            for (const item of iterator) {
                yield* mapper(item);
            }
        };

        return new Iter(inner());
    }

    get(predicate: (item: T) => boolean): T {
        const result = this.find(predicate);
        if (!result) {
            throw new Error('Iter.get failed - no matching item found');
        }

        return result;
    }

    head(): T {
        const result = this.iterator.next();
        if (result.done) {
            throw new Error('Head of the sequence is not available');
        }

        return result.value;
    }

    isEmpty(): boolean {
        return this.iterator.next().done;
    }

    map<TResult>(mapper: (item: T) => TResult): Iter<TResult> {
        const iterator = this.iterator;
        function* inner() {
            for (const item of iterator) {
                yield mapper(item);
            }
        };

        return new Iter(inner());
    }

    reduce<TResult>(accumulator: (acc: TResult, item: T) => TResult, initialValue: TResult): TResult {
        for (const item of this.iterator) {
            initialValue = accumulator(initialValue, item);
        }

        return initialValue;
    }

    skip(numElements: number): Iter<T> {
        const iterator = this.iterator;
        function* inner() {
            let counter = 0;
            for (const item of iterator) {
                if (counter++ < numElements) {
                    continue;
                }

                yield item;
            }
        };

        return new Iter(inner());
    }

    take(maxElements: number): Iter<T> {
        const iterator = this.iterator;
        function* inner() {
            let counter = 0;
            for (const item of iterator) {
                if (++counter > maxElements) {
                    break;
                }

                yield item;
            }
        };

        return new Iter(inner());
    }

    toArray(): T[] {
        const result: T[] = [];
        for (const item of this.iterator) {
            result.push(item);
        }

        return result;
    }

    toMap<TKey>(keyMapper: (item: T) => TKey): Map<TKey, T[]> {
        const result = new Map<TKey, T[]>();

        for (const item of this.iterator) {
            const key = keyMapper(item),
                  group = result.get(key);

            if (group) {
                group.push(item);
            } else {
                result.set(key, [item]);
            }
        }

        return result;
    }

    toSet(): Set<T> {
        return new Set<T>(this.iterator);
    }
}
