/**
 * Shortcut to `IterableWrapper<T>` constructor.<br>
 * Wraps an `Array` or `IterableIterator<T>` into `IterableWrapper<T>`
 * in order to provide higher-order functions that operate over the collection.
 * @returns IterableWrapper<T> with added functionality
 */
export function iter<T>(arrayOrIterable: T[] | IterableIterator<T>): IterableWrapper<T> {
    return new IterableWrapper(() => arrayOrIterable);
}

/**
 * Wraps `IterableIterator<T>` to provide additional functionality.
 * There may be performance benefits when you chain multiple calls together since the wrapped
 * `Array` is not reconstructed.<br>
 * Do not modify the wrapped collection as long as you are working with its wrapper object.
 * @type T Type of elements in the colllection.
 */
export class IterableWrapper<T> implements Iterable<T> {
    /**
     * Creates a new instance.<br>
     * There is usually no need to create an instance directly. Prefer shortcut function `iter`
     * to wrap an `Array` or other object supporting the iterable contract.
     * @param openIteratorFn Functions that returns an `Array` or other ES 2015 iterable.
     * The function is called lazily on each demand to start the iteration.
     */
    constructor(private openIteratorFn: () => T[] | IterableIterator<T>) {
    }

    /**
     * Iterator wrapped into this instance. Allows enumeration by using the `for-of` syntax.
     */
    public [Symbol.iterator](): IterableIterator<T> {
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
    map<TResult>(mapper: (item: T, index: number) => TResult): IterableWrapper<TResult> {
        const inner = () => {
            const iterator = this.iterate();
            let i = 0;

            return (function* () {
                for (const item of iterator) {
                    yield mapper(item, i++);
                }
            })();
        }

        return new IterableWrapper(inner);
    }

    /**
     * Similar to `Array.filter`.<br>
     * Creates a new `IterableWrapper<T>` on top of this one that filters elements using a predicate.
     * @param predicate Predicate that says whether to accept or reject an element.
     * Predicate is supposed to return `true` to accept and `false` to reject it.
     * @returns New `IterableWrapper<T>` with filtered content.
     */
    filter(predicate: (item: T, index: number) => boolean): IterableWrapper<T> {
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
        }

        return new IterableWrapper(inner);
    }

    /**
     * The same functionality as `Array.reduce`.<br>
     * Passes all elements into a function to produce a single-value result.
     * @param accumulator An aggregation function.
     * @returns Aggregated value produced by the aggregator function.
     */
    reduce<TResult>(aggregator: (acc: TResult, item: T) => TResult, initialValue: TResult): TResult {
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
    find(predicate: (item: T) => boolean): T | undefined {
        for (const item of this.iterate()) {
            if (predicate(item)) {
                return item;
            };
        }

        return undefined;
    }

    /**
     * Similar to `Array.findIndex`.<br>
     * Finds the first element that matches provided predicate and returns its index. Returns -1 if not found.
     * @param predicate Predicate that has to return true when passed element is the desired one.
     * @returns Zero-based index of the found element or -1 if it's not found.
     */
    findIndex(predicate: (item: T) => boolean): number {
        let index = 0;

        for (const item of this.iterate()) {
            if (predicate(item)) {
                return index;
            };

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
    every(predicate: (item: T) => boolean): boolean {
        for (const item of this.iterate()) {
            if (!predicate(item)) {
                return false;
            };
        }

        return true;
    }

    /**
     * Similar to `Array.some`.<br>
     * Evaluates whether at least one element is accepted by provided predicate.
     * @param predicate Predicate that has to return `true` to accept the passed element.
     * @returns `true` if at least one element is accepted. `false` if none is accepted or the sequence is empty.
     */
    some(predicate: (item: T) => boolean): boolean {
        for (const item of this.iterate()) {
            if (predicate(item)) {
                return true;
            };
        }

        return false;
    }

    /**
     * Checks whether an item is present in the collection.
     * @param item Item to be found. Equality operator === is applied to compare with content of this collection.
     * @returns `true` if found. Otherwise `false`.
     */
    contains(item: T): boolean {
        for (const element of this.iterate()) {
            if (item === element) {
                return true;
            };
        }

        return false;
    }

    /**
     * Determines whether the iterable is empty.
     * @returns `true` if there are no elements in the wrapped iterable.
     */
    isEmpty(): boolean {
        return !!this.iterate().next().done;
    }

    /**
     * Calculates lenght of the underlying iterable.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns Number of elements in the iterable.
     */
    length(): number {
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
    toArray(): T[] {
        return [...this.iterate()];
    }

    /**
     * Constructs a new `ReadonlyArray` out of the iterable collection.<br>
     * Note that `ReadonlyArray<T>` is TypeScript-specific interface. No such object exists in JS.
     * It's an Array protected from writing by the TS compiler.
     */
    toReadonlyArray(): ReadonlyArray<T> {
        return [...this.iterate()] as ReadonlyArray<T>;
    }    

    /**
     * Constructs a new `Map<TKey, T[]>` (built-in JavaScript object) out of all elements in the iterable collection.
     * @param keyMapper Function that produces a key for each individual element.
     * @returns A new `Map<TKey, T[]>`.
     */
    toMap<TKey>(keyMapper: (item: T) => TKey): Map<TKey, T[]> {
        const result = new Map<TKey, T[]>();

        for (const item of this.iterate()) {
            const key: TKey = keyMapper(item),
                  group: T[] | undefined = result.get(key);

            if (group) {
                group.push(item);
            } else {
                result.set(key, [item]);
            }
        }

        return result;
    }

    /**
     * Constructs a new `ReadonlyMap<TKey, T[]>` out of all elements in the iterable collection.
     * @param keyMapper Function that produces a key for each individual element.
     * @returns A new `ReadonlyMap<TKey, T[]>`. ReadonlyMap is TypeScript-specific version of `Map`
     * protected from writing.
     */
    toReadonlyMap<TKey>(keyMapper: (item: T) => TKey): ReadonlyMap<TKey, T[]> {
        return this.toMap(keyMapper) as ReadonlyMap<TKey, T[]>;
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
    groupBy<TKey>(keyMapper: (item: T) => TKey): IterableWrapper<{ key: TKey, items: IterableWrapper<T> }> {
        return iter(this.toMap(keyMapper).entries())
            .map(e => {
                return {
                    key: e[0],
                    items: iter(e[1])
                }
            });
    }

    /**
     * Creates `Set<T>` (built-in JavaScript object) out of the iterable sequence.
     * Duplicated elements are removed.
     * @return `Set<T>` of unique elements in the iterable sequence.
     */
    toSet(): Set<T> {
        return new Set<T>(this.iterate());
    }

    /**
     * Constructs a `ReadonlySet<T>` out of the iterable collection. Duplicated elements are removed.
     * Note that `ReadonlySet<T>` is TypeScript-specific interface. No such object exists in JS.
     * It's a `Set<T>` protected from writing by TS compiler.
     * @returns `ReadonlySet<T>` of unique elements in the iterable sequence.
     */
    toReadonlySet(): ReadonlySet<T> {
        return new Set<T>(this.iterate()) as ReadonlySet<T>;
    }

    /**
     * Creates antoher iterable with distinct elements contained in the wrapped collection (removes duplicates).
     * @param keyMapper A function that produces key used to distinguish among elements.
     * Elements with duplicate keys are considered as duplicates. If not specified,
     * the function uses comparison by equality operator ===.
     * @returns Another iterable based on this one without duplicate elements.
     */
    distinct(keyMapper?: (item: T) => any): IterableWrapper<T> {
        if (!keyMapper) {
            keyMapper = (item) => item;
        }

        const inner = () => {
            const iterator = this.iterate();
            const uniqueValues = new Set();

            return function* () {
                for (const item of iterator) {
                    const key = keyMapper!(item);
    
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
    toSeparatedString(separator: string = ', ', convert?: (item: T) => string | undefined): string {
        if (!convert) {
            convert = (item) => item && (<any>item).toString();
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
     * @param index Index of the element.
     */
    forEach(action: (item: T, index: number) => void): void {
        let index = 0;
        for (const item of this.iterate()) {
            action(item, index++);
        }
    }

    /**
     * Accesses nested collections as a single iterable. Provide a `mapper` function that is supposed
     * to return the nested `Array` contained within the element.
     * This function makes a new `IterableWrapper<TChildItem>` over all nested elements.
     * @param nestedAccessor Returns nested collection for each element.
     * @returns `Iterable<TChildItem>` over all items in nested collections.
     */
    flatMap<TItem>(nestedAccessor: (item: T) => TItem[]): IterableWrapper<TItem> {
        const inner = () => {
            const iterator = this.iterate();

            return function* () {
                for (const item of iterator) {
                    yield* nestedAccessor(item);
                }
            }();
        }

        return new IterableWrapper(inner);
    }

    /**
     * Flattens a tree-like structure.<br>
     * Creates an `IterableWrapper<T>` that recursivelly walks through all elements.
     * @param nestedAccessor Function that is supposed to return nested collection. Each element in the nested collection
     * may contain another nested collection which will be processed in the same way.<br>
     * If the function returns `undefined`, it means that the gived element has no nested items
     * or you want to skip them.
     * @returns `IterableWrapper<T>` over the full tree-like structure.
     */
    flatten(nestedAccessor?: (item: T, level: number) => IterableIterator<T> | T[] | undefined) : IterableWrapper<T> {
        const inner = () => {
            nestedAccessor = nestedAccessor || (x => Array.isArray(x) ? x : undefined);

            function* walk(iterator: IterableIterator<T>, level: number): IterableIterator<T> {
                for (const item of iterator) {
                    const subitems = nestedAccessor!(item, level);
                    if (<any>subitems !== item) {
                        yield item;
                    }

                    if (subitems) {
                        if (Array.isArray(subitems)) {
                            yield* walk(subitems[Symbol.iterator](), level + 1);
                        } else {
                            yield* walk(subitems, level + 1);
                        }
                    }
                }
            };

            return walk(this.iterate(), 0);
        }

        return new IterableWrapper(inner);
    }

    /**
     * Flattens a tree-like structure and creates new elements based on the source.<br>
     * Creates an `IterableWrapper<T>` that recursivelly walks through all elements.
     * Additionally maps each element passing it to a mapper function.
     * @param nestedAccessor Function that is supposed to return nested collection. Each element in the nested collection
     * may contain another nested collection which will be processed in the same way.<br>
     * If the function returns `undefined`, it means that the gived element has no nested items
     * or you want to skip them.
     * @param mapper Function that converts each item. Called lazily on demand.
     * @returns `IterableWrapper<T>` over the full tree-like structure.
     */
    flattenAndMap<TResult>(
        nestedAccessor: (item: T, level: number) => IterableIterator<T> | T[] | undefined,
        mapper: (item: T, level: number) => TResult)
        : IterableWrapper<TResult> {

        const inner = () => {
            nestedAccessor = nestedAccessor || (x => Array.isArray(x) ? x : undefined);

            function* walk(iterator: IterableIterator<T>, level: number): IterableIterator<TResult> {
                for (const item of iterator) {
                    const subitems = nestedAccessor(item, level);
                    yield mapper(item, level);

                    if (subitems) {
                        if (Array.isArray(subitems)) {
                            yield* walk(subitems[Symbol.iterator](), level + 1);
                        } else {
                            yield* walk(subitems, level + 1);
                        }
                    }
                }
            };

            return walk(this.iterate(), 0);
        }

        return new IterableWrapper(inner);
    }

    /**
     * Similar to `Array.concat`.<br>
     * Concatenates another iterable after this one and returns a new `IterableWrapper<T>` that
     * goes through both collections.
     * @param another Another iterable such as this object or a plain Array.
     * @returns A new iterable containing elements from both collections.
     */
    concat(another: Iterable<T>): IterableWrapper<T> {
        const inner = () => {
            const iterator = this.iterate();

            return function* () {
                yield* iterator;
                yield* another;
            }();
        }

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
    sort(compareFn?: (a: T, b: T) => number): IterableWrapper<T> {
        const allItems = [...this.iterate()];
        return iter(allItems.sort(compareFn));
    }

    /**
     * Similar to `Array,reverse`.<br>
     * Creates a reversed iterable sequence based on this one.<br>
     * Optimized if the input iterable is an `Array`. Constructs a temporary `Array` in case it's other kind of iterable.
     * @returns Reversed iterable `IterableWrapper<T>`
     */
    reverse(): IterableWrapper<T> {
        const iterator = this.openIteratorFn();
        if (Array.isArray(iterator)) {
            const inner = () => {
                return (function* () {
                    for (let i = iterator.length - 1; i >= 0; i--) {
                        yield iterator[i];
                    }
                })();
            }
    
            return new IterableWrapper(inner);
        } else {
            const allItems = [...iterator];
            return iter(allItems.reverse());
        }
    }

    /**
     * Returns the first element in the iterable sequence. Throws an error in case the iterable is empty.
     * @returns The first element.
     * @see {@link tryGetHead}
     */
    head(): T {
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
    tryGetHead(): T | undefined {
        const result = this.iterate().next();
        return result.done ? undefined : result.value;
    }

    /**
     * Returns the last element in the iterable sequence. Returns `undefined` in case the iterable is empty.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns The last element or undefined.
     * @see {@link tryGetLast}
     */
    last(): T {
        const result = this.tryGetLast();
        if (result === undefined) {
            throw new Error(ERR_EMPTY);
        }

        return result;
    }

    /**
     * Returns the last element in the iterable sequence. Returns `undefined` in case the iterable is empty.<br>
     * Optimized if the underlying iterable is an `Array`.
     * @returns The last element or undefined.
     * @see {@link last}
     */
    tryGetLast(): T | undefined {
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
    getAt(index: number): T {
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
    tryGetAt(index: number): T | undefined {
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
    skip(numElements: number): IterableWrapper<T> {
        const iterator = this.openIteratorFn();

        if (Array.isArray(iterator)) {
            const array = iterator;
            
            function* innerArray() {
                for (let i = numElements; i < array.length; i++) {
                    yield array[i];
                }
            };

            return new IterableWrapper(innerArray);

        } else {
            function* inner() {
                let counter = 0;
                for (const item of iterator) {
                    if (counter++ >= numElements) {
                        yield item;
                    }
                }
            };

            return new IterableWrapper(inner);
        }
    }

    /**
     * Takes at most N elements and then stops the iteration.
     * @param maxElements Maximum number of elements.
     * @returns Another `IterableWrapper<T>` limited to maximum of N elements.
     */
    take(maxElements: number): IterableWrapper<T> {
        const iterator = this.iterate();

        function* inner() {
            let counter = 0;
            for (const item of iterator) {
                if (++counter > maxElements) {
                    break;
                }

                yield item;
            }
        };

        return new IterableWrapper(inner);
    }

    /**
     * Returns elements in the collection as long as a condition is met.
     * Stops iteration when given predicate returns `false` for the first time.
     * @param predicate Predicate that accepts an element and return `true` to continue / `false` to stop.
     * @returns New iterable that is limited by given condition.
     */
    takeWhile(predicate: (item: T) => boolean): IterableWrapper<T> {
        const inner = () => {
            const iterator = this.iterate();

            return (function* () {
                for (const item of iterator) {
                    if (predicate(item)) {
                        yield item;
                    } else {
                        break;
                    }
                }
            })();
        }

        return new IterableWrapper(inner);
    }

    /**
     * Calculates sum using a mapper funcation that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns Sum of all numbers returned by mapper function.
     */
    sum(mapper: (item: T) => number): number {
        return this.reduce((acc, item) => acc + mapper(item), 0);
    }

    /**
     * Finds minimum using a mapper function that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns The smalllest of all numbers returned by the mapper function. Undefined if iterable sequence is empty.
     */
    min(mapper: (item: T) => number): number | undefined {
        return this.reduce((acc: number | undefined, item) =>
            Math.min(acc === undefined ? Number.MAX_VALUE : acc, mapper(item)),
            undefined);
    }

    /**
     * Finds maximum using a mapper function that produces a number for each element.
     * @param mapper Function that returns a number for each element.
     * @returns The biggest of all numbers returned by the mapper function. Undefined if iterable sequence is empty.
     */
    max(mapper: (item: T) => number): number | undefined {
        return this.reduce((acc: number | undefined, item) =>
            Math.max(acc === undefined ? Number.MIN_VALUE : acc, mapper(item)),
            undefined);
    }

    /**
     * Returns new `IterableWrapper<T>` which is contains intersection of this instance and another one or an `Array`.
     * @param anotherCollection Another `IterableWrapper<T>` or `Array<T>`.
     * @param equalsFn Function that compares two elements. If ommitted, comparison will use equality operator ===.
     * @returns `IterableWrapper<T>` containing intersection of these iterables or arrays.
     */
    intersect(
        anotherCollection: IterableWrapper<T> | T[],
        equalsFn?: (a: T, b: T) => boolean)
        : IterableWrapper<T> {

        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();

        const innerUseIndexOf = () => {
            const iterator = this.iterate();
            return function*() {
                for (const item of iterator) {
                    if (another.indexOf(item) !== -1) {
                        yield item;
                    }
                }
            }();
        };

        const innerUseEqualsFn = () => {
            const iterator = this.iterate();
            return function*() {
                for (const item of iterator) {
                    if (another.find(x => equalsFn!(x, item))) {
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
    except(
        anotherCollection: IterableWrapper<T> | T[],
        equalsFn?: (a: T, b: T) => boolean)
        : IterableWrapper<T> {

        const another = Array.isArray(anotherCollection) ? anotherCollection : anotherCollection.toArray();        

        const innerUseIndexOf = () => {
            const iterator = this.iterate();
            return function*() {
                for (const item of iterator) {
                    if (another.indexOf(item) === -1) {
                        yield item;
                    }
                }
            }();
        };

        const innerUseEqualsFn = () => {
            const iterator = this.iterate();
            return function*() {
                for (const item of iterator) {
                    if (!another.find(x => equalsFn!(x, item))) {
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
    sequenceEquals(anotherCollection: Iterable<T>, equalsFn?: (a: T, b: T) => boolean): boolean {
        if (!equalsFn) {
            equalsFn = (a: T, b: T) => a === b;
        }

        const iterThis = this.iterate();
        const iterAnother = anotherCollection[Symbol.iterator]();

        for (;;) {
            const itThis = iterThis.next();
            const itAnother = iterAnother.next();

            if (itThis.done || itAnother.done) {
                return (itThis.done && itAnother.done) || false;
            }

            if (!equalsFn(itThis.value, itAnother.value)) {
                return false;
            }
        }
    }

    private iterate(): IterableIterator<T> {
        return this.openIteratorFn()[Symbol.iterator]();
    }
}

const ERR_EMPTY = 'The iterable sequence is empty';
