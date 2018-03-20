/**
 * Wraps an Array into IterableWrapper<T>
 * in order to provide higher-order functions that operate over the array.
 */
export function iter<T>(array: T[]): IterableWrapper<T> {
    return new IterableWrapper(array[Symbol.iterator]());
}

/**
 * Wraps an existing iterable object
 * in order to provide higher-order functions that operate over it.
 * @param iterable An existing iterable such as generator function, Set.keys, Map.entries ...
 */
export function wrap<T>(iterable: IterableIterator<T>): IterableWrapper<T> {
    return new IterableWrapper(iterable[Symbol.iterator]());
}

/**
 * Wraps IterableIterator<T> into an object that provides functionality over the iterable
 */
export class IterableWrapper<T> implements Iterable<T> {
    /**
     * Creates a new instance.
     * @param iterator The wrapped iterable.
     */
    constructor(private readonly iterator: IterableIterator<T>) {
    }

    /**
     * Wrapped iterator of this instance. Allows enumeration using the for-of syntax.
     */
    public [Symbol.iterator]() {
        return this.iterator;
    }

    /**
     * The same functionality as Array.map. Converts all elements using a mapper function.
     * @param mapper Function that converts an item
     */
    map<TResult>(mapper: (item: T) => TResult): IterableWrapper<TResult> {
        const iterator = this.iterator;

        function* inner() {
            for (const item of iterator) {
                yield mapper(item);
            }
        };

        return new IterableWrapper(inner());
    }

    /**
     * The same functionality as Array.filter. Filters elements using a predicate.
     * @param predicate Predicate that accepts an element and return true to pass / false to skip it.
     */
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

    /**
     * The same functionality as Array.reduce. Passes all elements into an accumulator function to produce a single-value result.
     * @param accumulator An accumulator function
     */
    reduce<TResult>(accumulator: (acc: TResult, item: T) => TResult, initialValue: TResult): TResult {
        for (const item of this.iterator) {
            initialValue = accumulator(initialValue, item);
        }

        return initialValue;
    }

    /**
     * Finds the first element that matches provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns The found element or undefined if not found.
     */
    find(predicate: (item: T) => boolean): T | undefined {
        for (const item of this.iterator) {
            if (predicate(item)) {
                return item;
            };
        }

        return undefined;
    }

    /**
     * Finds the first element that matches provided predicate and returns its 0-base index.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns Index of the found element or -1 if not found.
     */
    findIndex(predicate: (item: T) => boolean): number {
        let index = 0;

        for (const item of this.iterator) {
            if (predicate(item)) {
                return index;
            };

            index++;
        }

        return -1;
    }

    /**
     * Finds the first element that matches provided predicate. Throws an Error if the element is not found.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns The found element.
     */
    getFirst(predicate: (item: T) => boolean): T {
        const result = this.find(predicate);
        if (!result) {
            throw new Error('getFirst failed - no element found');
        }

        return result;
    }

    /**
     * Evaluates whether all elements pass a provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns true if all elements pass or the sequence is empty.
     */
    every(predicate: (item: T) => boolean): boolean {
        for (const item of this.iterator) {
            if (!predicate(item)) {
                return false;
            };
        }

        return true;
    }

    /**
     * Evaluates whether at least one element pass a provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns true if at least one element passes; false if not or the sequence is empty.
     */
    some(predicate: (item: T) => boolean): boolean {
        for (const item of this.iterator) {
            if (predicate(item)) {
                return true;
            };
        }

        return false;
    }

    /**
     * Checks whether an item is present.
     * @param item Item to be found. Equality === is applied to compare.
     * @returns True if found.
     */
    contains(item: T): boolean {
        for (const element of this.iterator) {
            if (item === element) {
                return true;
            };
        }

        return false;
    }

    /**
     * Determines whether the iterable is empty.
     * @returns true if there are no elements.
     */
    isEmpty(): boolean {
        return this.iterator.next().done;
    }

    /**
     * Calculates lenght of the underlying iterable.
     * @returns number of elements in the iterable.
     */
    length(): number {
        let count = 0;
        while (!this.iterator.next().done) {
            count++;
        }

        return count;
    }

    /**
     * Constructs an Array out of the iterable collection.
     */
    toArray(): T[] {
        return [...this.iterator];
    }

    /**
     * Concatenates another iterable after this one.
     * @param another Another iterable such as this object or a plain Array.
     * @returns A new instance containing elements from this and the given iterable.
     */
    concat(another: Iterable<T>): IterableWrapper<T> {
        const iterator = this.iterator;

        function* inner() {
            for (const item of iterator) {
                yield item;
            }

            for (const item of another) {
                yield item;
            }
        };

        return new IterableWrapper(inner());
    }

    /**
     * Skips a given number of elements in the collection.
     * @param numElements Number of skipped elements.
     * @returns Another instance that skips n elements.
     */
    skip(numElements: number): IterableWrapper<T> {
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

        return new IterableWrapper(inner());
    }

    /**
     * Takes at most N elements and then discontinues the iteration.
     * @param maxElements Maximun number of elements.
     * @returns Another instance limited to max. n elements.
     */
    take(maxElements: number): IterableWrapper<T> {
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

        return new IterableWrapper(inner());
    }
}
