"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps an `Array` or IterableIterator<T> into IterableWrapper<T>
 * in order to provide higher-order functions that operate over the array.
 */
function iter(arrayOrIterable) {
    return new IterableWrapper(() => arrayOrIterable);
}
exports.iter = iter;
/**
 * Wraps IterableIterator<T> into an object that provides functionality over the iterable.
 * @template T Type of collection elements.
 * @type T Type of collection elements.
 */
class IterableWrapper {
    /**
     * Creates a new instance.
     * @param openIterator Functions that returns an `Array` or other iterable. The function lazy-called
     * on each demand to start the iteration.
     */
    constructor(openIteratorFn) {
        this.openIteratorFn = openIteratorFn;
    }
    /**
     * Wrapped iterator of this instance. Allows enumeration by using the `for-of` syntax.
     */
    [Symbol.iterator]() {
        return this.iterate();
    }
    /**
     * The same functionality as `Array.map`. Converts all elements using a mapper function.
     * @param mapper Function that converts each item.
     */
    map(mapper) {
        const inner = () => {
            const iterator = this.iterate();
            return (function* () {
                for (const item of iterator) {
                    yield mapper(item);
                }
            })();
        };
        return new IterableWrapper(inner);
    }
    /**
     * The same functionality as `Array.filter`. Filters elements using a predicate.
     * @param predicate Predicate that accepts an element and return true to pass / false to skip it.
     */
    filter(predicate) {
        const inner = () => {
            const iterator = this.iterate();
            return (function* () {
                for (const item of iterator) {
                    if (predicate(item)) {
                        yield item;
                    }
                }
            })();
        };
        return new IterableWrapper(inner);
    }
    /**
     * The same functionality as `Array.reduce`.
     * Passes all elements into an accumulator function to produce a single-value result.
     * @param accumulator An accumulator function
     */
    reduce(accumulator, initialValue) {
        for (const item of this.iterate()) {
            initialValue = accumulator(initialValue, item);
        }
        return initialValue;
    }
    /**
     * Finds the first element that matches provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns The found element or undefined if not found.
     */
    find(predicate) {
        for (const item of this.iterate()) {
            if (predicate(item)) {
                return item;
            }
            ;
        }
        return undefined;
    }
    /**
     * Finds the first element that matches provided predicate and returns its 0-base index.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns Index of the found element or -1 if not found.
     */
    findIndex(predicate) {
        let index = 0;
        for (const item of this.iterate()) {
            if (predicate(item)) {
                return index;
            }
            ;
            index++;
        }
        return -1;
    }
    /**
     * Evaluates whether all elements pass a provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns true if all elements pass or the sequence is empty.
     */
    every(predicate) {
        for (const item of this.iterate()) {
            if (!predicate(item)) {
                return false;
            }
            ;
        }
        return true;
    }
    /**
     * Evaluates whether at least one element pass a provided predicate.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns true if at least one element passes; false if not or the sequence is empty.
     */
    some(predicate) {
        for (const item of this.iterate()) {
            if (predicate(item)) {
                return true;
            }
            ;
        }
        return false;
    }
    /**
     * Checks whether an item is present.
     * @param item Item to be found. Equality === is applied to compare.
     * @returns True if found.
     */
    contains(item) {
        for (const element of this.iterate()) {
            if (item === element) {
                return true;
            }
            ;
        }
        return false;
    }
    /**
     * Determines whether the iterable is empty.
     * @returns true if there are no elements.
     */
    isEmpty() {
        return this.iterate().next().done;
    }
    /**
     * Calculates lenght of the underlying iterable.
     * @returns number of elements in the iterable.
     */
    length() {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            return iterator.length;
        }
        let count = 0;
        while (!iterator.next().done) {
            count++;
        }
        return count;
    }
    /**
     * Constructs an Array out of the iterable collection.
     */
    toArray() {
        return [...this.iterate()];
    }
    /**
     * Creates a `Map<TKey, TValue>` (built-in JavaScript object) out of all elements in the iterable sequence.
     * @param keyMapper Function that produces key for each individual element.
     * @returns A new Map.
     */
    toMap(keyMapper) {
        const result = new Map();
        for (const item of this.iterate()) {
            const key = keyMapper(item), group = result.get(key);
            if (group) {
                group.push(item);
            }
            else {
                result.set(key, [item]);
            }
        }
        return result;
    }
    /**
     * Groups content of the collection by a key generated by supplied function.
     * @param keyMapper Makes a key for each element in the collection.
     * @returns Collection of groups with key and items associated with the key.
     */
    groupBy(keyMapper) {
        return iter(this.toMap(keyMapper).entries())
            .map(e => {
            return {
                key: e[0],
                items: iter(e[1])
            };
        });
    }
    /**
     * Creates `Set<T>` (built-in JavaScript object) out of the iterable sequence.
     * Duplications are removed.
     * @return Set of unique elements in the iterable sequence.
     */
    toSet() {
        return new Set(this.iterate());
    }
    /**
     * Creates antoher iterable with distinct sequence (removes duplicates).
     * @param keyMapper Optional. A function that produces key used to distinguish among elements.
     * Elements with duplicate keys are ommitted. Don't specify to make comparison by equality operator ===.
     * @returns Another iterable sequence with unique elements.
     */
    distinct(keyMapper) {
        if (!keyMapper) {
            keyMapper = (item) => item;
        }
        const inner = () => {
            const iterator = this.iterate();
            const uniqueValues = new Set();
            return function* () {
                for (const item of iterator) {
                    const key = keyMapper(item);
                    if (!uniqueValues.has(key)) {
                        uniqueValues.add(key);
                        yield item;
                    }
                }
            }();
        };
        return new IterableWrapper(inner);
    }
    /**
     * Executes a function on each element in the iterable sequence.
     * @param action Function executed for each element.
     */
    forEach(action) {
        for (const item of this.iterate()) {
            action(item);
        }
    }
    /**
     * Flattens a nested iterable collection.
     * @param mapper Returns nested collection for each element.
     * @returns Iterable over all items in all nested collections.
     */
    flatMap(mapper) {
        const inner = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    yield* mapper(item);
                }
            }();
        };
        return new IterableWrapper(inner);
    }
    /**
     * Concatenates another iterable after this one.
     * @param another Another iterable such as this object or a plain Array.
     * @returns A new instance containing elements from this and the given iterable.
     */
    concat(another) {
        const inner = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    yield item;
                }
                for (const item of another) {
                    yield item;
                }
            }();
        };
        return new IterableWrapper(inner);
    }
    /**
     * Creates a sorted iterable sequence.
     * @param sortFn Sorting function. Same as Array.sort.
     * @returns Sorted sequence.
     */
    sort(sortFn) {
        const allItems = [...this.iterate()];
        allItems.sort(sortFn);
        return iter(allItems);
    }
    /**
     * Returns the first element in the iterable sequence. Throws an error in case the iterable is empty.
     * @returns The first element.
     */
    head() {
        const result = this.iterate().next();
        if (result.done) {
            throw new Error('The iterable sequence is empty');
        }
        return result.value;
    }
    /**
     * Returns the first element in the iterable sequence. Returns undefined in case the iterable is empty.
     * @returns The first element or undefined.
     */
    tryGetHead() {
        const result = this.iterate().next();
        return result.done ? undefined : result.value;
    }
    /**
     * Skips a given number of elements in the collection.
     * @param numElements Number of skipped elements.
     * @returns Another instance that skips n elements.
     */
    skip(numElements) {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            const array = iterator;
            function* innerArray() {
                for (let i = numElements; i < array.length; i++) {
                    yield array[i];
                }
            }
            ;
            return new IterableWrapper(innerArray);
        }
        else {
            function* inner() {
                let counter = 0;
                for (const item of iterator) {
                    if (counter++ < numElements) {
                        continue;
                    }
                    yield item;
                }
            }
            ;
            return new IterableWrapper(inner);
        }
    }
    /**
     * Takes at most N elements and then discontinues the iteration.
     * @param maxElements Maximun number of elements.
     * @returns Another instance limited to max. n elements.
     */
    take(maxElements) {
        const iterator = this.iterate();
        function* inner() {
            let counter = 0;
            for (const item of iterator) {
                if (++counter > maxElements) {
                    break;
                }
                yield item;
            }
        }
        ;
        return new IterableWrapper(inner);
    }
    /**
     * Returns elements in the collection as long as a condition is met.
     * Stops iteration when given predicate returns `false` for the first time.
     * @param predicate Predicate that accepts an element and return true to pass / false to skip it.
     */
    takeWhile(predicate) {
        const inner = () => {
            const iterator = this.iterate();
            return (function* () {
                for (const item of iterator) {
                    if (predicate(item)) {
                        yield item;
                    }
                    else {
                        break;
                    }
                }
            })();
        };
        return new IterableWrapper(inner);
    }
    /**
     * Calculates sum using a mapper funcation that produces the summed number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns Sum of all numbers returned by mapper function.
     */
    sum(mapper) {
        return this.reduce((acc, item) => acc + mapper(item), 0);
    }
    /**
     * Finds minimum using a mapper function that produces the summed number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns Minimum of all numbers returned by the mapper function. Undefined if iterable sequence is empty.
     */
    min(mapper) {
        return this.reduce((acc, item) => Math.min(acc || Number.MAX_VALUE, mapper(item)), undefined);
    }
    /**
     * Finds maximum using a mapper function that produces the summed number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns Maximum of all numbers returned by mapper function. Undefined if iterable sequence is empty.
     */
    max(mapper) {
        return this.reduce((acc, item) => Math.max(acc || Number.MIN_VALUE, mapper(item)), undefined);
    }
    /**
     * Returns new iterable that is an intersection with this instance and another one or an `Array`.
     * @param anotherCollection Another `IterableWrapper<T>` or `Array<T>`.
     * @param equalsFn Optional. Function that compares two elements. If ommitted, comparison will use equality operator ===.
     * @returns An intersection of these iterables or arrays.
     */
    intersect(anotherCollection, equalsFn) {
        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();
        const iterator = this.iterate();
        function* innerUseIndexOf() {
            for (const item of iterator) {
                if (another.indexOf(item) !== -1) {
                    yield item;
                }
            }
        }
        ;
        function* innerUseEqualsFn() {
            for (const item of iterator) {
                if (another.find(x => equalsFn(x, item))) {
                    yield item;
                }
            }
        }
        ;
        return new IterableWrapper(equalsFn ? innerUseEqualsFn : innerUseIndexOf);
    }
    /**
     * Subtracts another collection from this one. Elements present in the provided collection will be removed
     * from this iterable sequence.
     * @param anotherCollection Another `IterableWrapper<T>` or `Array<T>`.
     * @param equalsFn Optional. Function that compares two elements. If ommitted, comparison will use equality operator ===.
     * @returns Copy of this iterable sequence wihout elements found in another collection.
     */
    except(anotherCollection, equalsFn) {
        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();
        const iterator = this.iterate();
        function* innerUseIndexOf() {
            for (const item of iterator) {
                if (another.indexOf(item) === -1) {
                    yield item;
                }
            }
        }
        ;
        function* innerUseEqualsFn() {
            for (const item of iterator) {
                if (!another.find(x => equalsFn(x, item))) {
                    yield item;
                }
            }
        }
        ;
        return new IterableWrapper(equalsFn ? innerUseEqualsFn : innerUseIndexOf);
    }
    iterate() {
        return this.openIteratorFn()[Symbol.iterator]();
    }
}
exports.IterableWrapper = IterableWrapper;
