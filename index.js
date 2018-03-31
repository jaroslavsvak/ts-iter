"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Shortcut to `IterableWrapper<T>` constructor.<br>
 * Wraps an `Array` or `IterableIterator<T>` into `IterableWrapper<T>`
 * in order to provide higher-order functions that operate over the collection.
 * @returns IterableWrapper<T> with added functionality
 */
function iter(arrayOrIterable) {
    return new IterableWrapper(() => arrayOrIterable);
}
exports.iter = iter;
/**
 * Wraps `IterableIterator<T>` to provide additional functionality.
 * There may be performance benefits when you chain multiple calls together since the wrapped
 * `Array` is not reconstructed.<br>
 * Do not modify the wrapped collection as long as you are working with its wrapper object.
 * @type T Type of elements in the colllection.
 */
class IterableWrapper {
    /**
     * Creates a new instance.<br>
     * There is usually no need to create an instance directly. Prefer shortcut function `iter`
     * to wrap an `Array` or other object supporting the iterable contract.
     * @param openIteratorFn Functions that returns an `Array` or other ES 2015 iterable.
     * The function is called lazily on each demand to start the iteration.
     */
    constructor(openIteratorFn) {
        this.openIteratorFn = openIteratorFn;
    }
    /**
     * Iterator wrapped into this instance. Allows enumeration by using the `for-of` syntax.
     */
    [Symbol.iterator]() {
        return this.iterate();
    }
    /**
     * Similar to `Array.map`.<br>
     * Creates a new `IterableWrapper<T>` on top of this one.
     * All elements are passed to a mapper function which is supposed
     * to convert them and/or create another object based on the original.
     * @param mapper Function that converts each item. Called lazily on demand.
     * @returns New `IterableWrapper<T>` with mapped content.
     */
    map(mapper) {
        const inner = () => {
            const iterator = this.iterate();
            let i = 0;
            return (function* () {
                for (const item of iterator) {
                    yield mapper(item, i++);
                }
            })();
        };
        return new IterableWrapper(inner);
    }
    /**
     * Similar to `Array.filter`.<br>
     * Creates a new `IterableWrapper<T>` on top of this one that filters elements using a predicate.
     * @param predicate Predicate that says whether to accept or reject an element.
     * Predicate is supposed to return `true` to accept and `false` to reject it.
     * @returns New `IterableWrapper<T>` with filtered content.
     */
    filter(predicate) {
        const inner = () => {
            const iterator = this.iterate();
            let i = 0;
            return (function* () {
                for (const item of iterator) {
                    if (predicate(item, i++)) {
                        yield item;
                    }
                }
            })();
        };
        return new IterableWrapper(inner);
    }
    /**
     * The same functionality as `Array.reduce`.<br>
     * Passes all elements into a function to produce a single-value result.
     * @param accumulator An aggregation function.
     * @returns Aggregated value produced by the aggregator function.
     */
    reduce(aggregator, initialValue) {
        for (const item of this.iterate()) {
            initialValue = aggregator(initialValue, item);
        }
        return initialValue;
    }
    /**
     * Similar to `Array.find`.<br>
     * Finds the first element that matches provided predicate.
     * @param predicate Predicate that has to return `true` when passed element is the desired one.
     * @returns The found element or `undefined` if none is found.
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
     * Similar to `Array.findIndex`.<br>
     * Finds the first element that matches provided predicate and returns its index. Returns -1 if not found.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns Zero-based index of the found element or -1 if it's not found.
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
     * Similar to `Array.every`.<br>
     * Evaluates whether all elements meet a condition.
     * @param predicate Predicate that has to return `true` when passed element meets the condition.
     * @returns `true` if all elements are accepted or the sequence is empty.
     * `false` if one or more elements do not pass the given predicate.
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
     * Similar to `Array.some`.<br>
     * Evaluates whether at least one element is accepted by provided predicate.
     * @param predicate Predicate that has to return `true` to accept the passed element.
     * @returns `true` if at least one element is accepted. `false` if none is accepted or the sequence is empty.
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
     * Checks whether an item is present in the collection.
     * @param item Item to be found. Equality operator === is applied to compare with content of this collection.
     * @returns `true` if found. Otherwise `false`.
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
     * @returns `true` if there are no elements in the wrapped iterable.
     */
    isEmpty() {
        return this.iterate().next().done;
    }
    /**
     * Calculates lenght of the underlying iterable.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns Number of elements in the iterable.
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
     * Constructs a new `Array` out of the iterable collection.
     */
    toArray() {
        return [...this.iterate()];
    }
    /**
     * Constructs a new `ReadonlyArray` out of the iterable collection.<br>
     * Note that `ReadonlyArray<T>` is TypeScript-specific interface. No such object exists in JS.
     * It's an Array protected from writing by the TS compiler.
     */
    toReadonlyArray() {
        return [...this.iterate()];
    }
    /**
     * Constructs a new `Map<TKey, T[]>` (built-in JavaScript object) out of all elements in the iterable collection.
     * @param keyMapper Function that produces a key for each individual element.
     * @returns A new `Map<TKey, T[]>`.
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
     * Groups content of the collection into another `IterableWrapper`.
     * Each item is a group object with `key` and `items`.<br>
     * `key` is the value generated by given `keyMapper` functions. Equality === is used to determine what keys are the same.
     * `items` is array of elements belonging to the group distinguished by `key`.
     * @param keyMapper Makes a key for each element in the collection.
     * @returns Collection of groups with key and items associated with the key.
     * @see {@link toMap}
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
     * Duplicated elements are removed.
     * @return `Set<T>` of unique elements in the iterable sequence.
     */
    toSet() {
        return new Set(this.iterate());
    }
    /**
     * Constructs a `ReadonlySet<T>` out of the iterable collection. Duplicated elements are removed.
     * Note that `ReadonlySet<T>` is TypeScript-specific interface. No such object exists in JS.
     * It's a `Set<T>` protected from writing by TS compiler.
     * @returns `ReadonlySet<T>` of unique elements in the iterable sequence.
     */
    toReadonlySet() {
        return new Set(this.iterate());
    }
    /**
     * Creates antoher iterable with distinct elements contained in the wrapped collection (removes duplicates).
     * @param keyMapper A function that produces key used to distinguish among elements.
     * Elements with duplicate keys are considered as duplicates. If not specified,
     * the function uses comparison by equality operator ===.
     * @returns Another iterable based on this one without duplicate elements.
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
     * Converts all elements into strings and joins them together into single string separated by coma or other separator.
     * @param separator Separator among elements
     * @param convert Function that converts element to text. The function may return `undefined` to skip an element.
     * If ommitted `x.toString()` is applied.
     */
    toSeparatedString(separator = ', ', convert) {
        if (!convert) {
            convert = (item) => item && item.toString();
        }
        let result = '';
        for (const item of this.iterate()) {
            if (item === undefined) {
                continue;
            }
            if (result.length > 0) {
                result += separator;
            }
            result += convert(item);
        }
        return result;
    }
    /**
     * Similar to `Array.forEach`.<br>
     * Executes a function on each element in the iterable sequence.
     * @param action Function executed on each element.
     */
    forEach(action) {
        for (const item of this.iterate()) {
            action(item);
        }
    }
    /**
     * Accesses nested collections as a single iterable. Provide a `mapper` function that is supposed
     * to return the nested `Array` contained within the element.
     * This function makes a new `IterableWrapper<TChildItem>` over all nested elements.
     * @param mapper Returns nested collection for each element.
     * @returns `Iterable<TChildItem>` over all items in nested collections.
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
     * Similar to `Array.concat`.<br>
     * Concatenates another iterable after this one and returns a new `IterableWrapper<T>` that
     * goes through both collections.
     * @param another Another iterable such as this object or a plain Array.
     * @returns A new iterable containing elements from both collections.
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
     * Similar to `Array.sort`.<br>
     * Out-of-place sort function. Sorts the collection and returns a new `IteratorWrapper<T>` over ordered results.
     * Beware that this function constructs a temporary `Array` that might affect performance negatively.
     * @param compareFn Comparison function (same as `Array.sort` comparison function).
     * It has to return negative value if a < b, 0 if a === b, positive value if a > b.
     * @returns Sorted sequence.
     */
    sort(compareFn) {
        const allItems = [...this.iterate()];
        return iter(allItems.sort(compareFn));
    }
    /**
     * Similar to `Array,reverse`.<br>
     * Creates a reversed iterable sequence based on this one.<br>
     * Optimized if the input iterable is an `Array`. Constructs a temporary `Array` in case it's other kind of iterable.
     * @returns Reversed iterable `IterableWrapper<T>`
     */
    reverse() {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            const inner = () => {
                return (function* () {
                    for (let i = iterator.length - 1; i >= 0; i--) {
                        yield iterator[i];
                    }
                })();
            };
            return new IterableWrapper(inner);
        }
        else {
            const allItems = [...iterator];
            return iter(allItems.reverse());
        }
    }
    /**
     * Returns the first element in the iterable sequence. Throws an error in case the iterable is empty.
     * @returns The first element.
     * @see {@link tryGetHead}
     */
    head() {
        const result = this.iterate().next();
        if (result.done) {
            throw new Error(ERR_EMPTY);
        }
        return result.value;
    }
    /**
     * Returns the first element in the iterable sequence. Throws an error in case the iterable is empty.
     * @returns The last element.
     * @see {@link head}
     */
    tryGetHead() {
        const result = this.iterate().next();
        return result.done ? undefined : result.value;
    }
    /**
     * Returns the last element in the iterable sequence. Returns `undefined` in case the iterable is empty.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns The last element or undefined.
     * @see {@link tryGetTail}
     */
    tail() {
        const result = this.tryGetTail();
        if (result === undefined) {
            throw new Error(ERR_EMPTY);
        }
        return result;
    }
    /**
     * Returns the last element in the iterable sequence. Returns `undefined` in case the iterable is empty.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns The last element or undefined.
     * @see {@link tail}
     */
    tryGetTail() {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            return iterator.length === 0 ? undefined : iterator[iterator.length - 1];
        }
        let result = undefined;
        for (;;) {
            const current = iterator.next();
            if (current.done) {
                return result;
            }
            result = current.value;
        }
    }
    /**
     * Retrieves an element at given index.
     * @param index 0-based index
     * @returns Element at the index. Throws an error if the index is out of range.
     * @see {@link tryGetAt}
     */
    getAt(index) {
        const result = this.tryGetAt(index);
        if (result === undefined) {
            throw new Error('Index ' + index.toString() + ' out of range');
        }
        return result;
    }
    /**
     * Attempts to retrieve an element at given index.
     * @param index 0-based index
     * @returns Element at the index or `undefined` if the index is out of range.
     */
    tryGetAt(index) {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            return iterator[index];
        }
        return index < 0 ? undefined : this.skip(index).tryGetHead();
    }
    /**
     * Skips a given number of elements in the collection.<br>
     * Optimized if the underlying collection is an `Array`.
     * @param numElements Number of skipped elements.
     * @returns Another `IterableWrapper<T>` based on this one without the first N elements.
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
     * Takes at most N elements and then stops the iteration.
     * @param maxElements Maximum number of elements.
     * @returns Another `IterableWrapper<T>` limited to maximum of N elements.
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
     * @param predicate Predicate that accepts an element and return `true` to continue / `false` to stop.
     * @returns New iterable that is limited by given condition.
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
     * Calculates sum using a mapper funcation that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns Sum of all numbers returned by mapper function.
     */
    sum(mapper) {
        return this.reduce((acc, item) => acc + mapper(item), 0);
    }
    /**
     * Finds minimum using a mapper function that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns The smalllest of all numbers returned by the mapper function. Undefined if iterable sequence is empty.
     */
    min(mapper) {
        return this.reduce((acc, item) => Math.min(acc || Number.MAX_VALUE, mapper(item)), undefined);
    }
    /**
     * Finds maximum using a mapper function that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns The biggest of all numbers returned by the mapper function. Undefined if iterable sequence is empty.
     */
    max(mapper) {
        return this.reduce((acc, item) => Math.max(acc || Number.MIN_VALUE, mapper(item)), undefined);
    }
    /**
     * Returns new `IterableWrapper<T>` which is contains intersection of this instance and another one or an `Array`.
     * @param anotherCollection Another `IterableWrapper<T>` or `Array<T>`.
     * @param equalsFn Function that compares two elements. If ommitted, comparison will use equality operator ===.
     * @returns `IterableWrapper<T>` containing intersection of these iterables or arrays.
     */
    intersect(anotherCollection, equalsFn) {
        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();
        const innerUseIndexOf = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    if (another.indexOf(item) !== -1) {
                        yield item;
                    }
                }
            }();
        };
        const innerUseEqualsFn = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    if (another.find(x => equalsFn(x, item))) {
                        yield item;
                    }
                }
            }();
        };
        return new IterableWrapper(equalsFn ? innerUseEqualsFn : innerUseIndexOf);
    }
    /**
     * Subtracts another collection from this one (performs set minus operation).<br>
     * Creates new `IterableWrapper<T>` which contains all source elements except elements in another collection.
     * @param anotherCollection Another `IterableWrapper<T>` or `Array<T>`.
     * @param equalsFn Function that compares two elements. If ommitted, comparison will use equality operator ===.
     * @returns Copy of this iterable sequence wihout elements found in another collection.
     */
    except(anotherCollection, equalsFn) {
        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();
        const innerUseIndexOf = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    if (another.indexOf(item) === -1) {
                        yield item;
                    }
                }
            }();
        };
        const innerUseEqualsFn = () => {
            const iterator = this.iterate();
            return function* () {
                for (const item of iterator) {
                    if (!another.find(x => equalsFn(x, item))) {
                        yield item;
                    }
                }
            }();
        };
        return new IterableWrapper(equalsFn ? innerUseEqualsFn : innerUseIndexOf);
    }
    /**
     * Checks whether two collections are the same. I.e. they have the same length and elements at equal positions.
     * @param anotherCollection Another iterable collectio
     * @param equalsFn Equality check function. If omitted, equals operator === is applied.
     */
    sequenceEquals(anotherCollection, equalsFn) {
        if (!equalsFn) {
            equalsFn = (a, b) => a === b;
        }
        const iterThis = this.iterate();
        const iterAnother = anotherCollection[Symbol.iterator]();
        for (;;) {
            const itThis = iterThis.next();
            const itAnother = iterAnother.next();
            if (itThis.done || itAnother.done) {
                return itThis.done && itAnother.done;
            }
            if (!equalsFn(itThis.value, itAnother.value)) {
                return false;
            }
        }
    }
    iterate() {
        return this.openIteratorFn()[Symbol.iterator]();
    }
}
exports.IterableWrapper = IterableWrapper;
const ERR_EMPTY = 'The iterable sequence is empty';
