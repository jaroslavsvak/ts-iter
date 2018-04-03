export function iterate<T>(array: T[]): IterableIterator<T> {
    return array[Symbol.iterator]();
}

export function map<T, TResult>(mapper: (item: T, index: number) => TResult)
    : (source: IterableIterator<T>) => IterableIterator<TResult> {

    return function*(source: IterableIterator<T>) {
        let index = 0;
        for (const item of source) {
            yield mapper(item, index++);
        }
    };
}

export function filter<T>(predicate: (item: T, index: number) => boolean)
    : (source: IterableIterator<T>) => IterableIterator<T> {

    return function*(source: IterableIterator<T>) {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
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

export function length<T>(source: IterableIterator<T>): number {
    let count = 0;
    while (!source.next().done) {
        count++;
    }

    return count;
}

export function isEmpty<T>(source: IterableIterator<T>): boolean {
    return source.next().done;
}

export function find<T>(predicate: (item: T) => boolean): (source: IterableIterator<T>) => T | undefined {
    return (source: IterableIterator<T>) => {
        for (const item of source) {
            if (predicate(item)) {
                return item;
            }
        }

        return undefined;
    };
}

export function findIndex<T>(predicate: (item: T) => boolean): (source: IterableIterator<T>) => number {
    return (source: IterableIterator<T>) => {
        let index = 0;
        for (const item of source) {
            if (predicate(item)) {
                return index;
            }

            index++;
        }

        return -1;
    };
}

export function some<T>(predicate: (item: T) => boolean): (source: IterableIterator<T>) => boolean {
    return (source: IterableIterator<T>) => {
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }

        return false;
    };
}

export function every<T>(predicate: (item: T) => boolean): (source: IterableIterator<T>) => boolean {
    return (source: IterableIterator<T>) => {
        for (const item of source) {
            if (!predicate(item)) {
                return false;
            }
        }

        return true;
    };
}

export function includes<T>(item: T): (source: IterableIterator<T>) => boolean {
    return (source: IterableIterator<T>) => {
        for (const content of source) {
            if (content === item) {
                return true;
            }
        }

        return false;
    };
}

export function flatMap<T, TNestedItem>(nestedAccessor: (item: T) => TNestedItem[])
    : (source: IterableIterator<T>) => IterableIterator<TNestedItem> {
    
    return function* (source: IterableIterator<T>) {
        for (const item of source) {
            const nestedColl = nestedAccessor(item);
            for (const subitem of nestedColl) {
                yield subitem;
            }
        }
    };
}

export function sort<T>(compareFn: (a: T, b: T) => number)
    : (source: IterableIterator<T>) => IterableIterator<T> {

    return function(source: IterableIterator<T>) {
        const temp = [...source];
        temp.sort(compareFn);
        return temp[Symbol.iterator]();
    };
}

export function toArray<T>(source: IterableIterator<T>): T[] {
    return [...source];
}

export function forEach<T>(action: (item: T, index: number) => void): (source: IterableIterator<T>) => void {
    return (source: IterableIterator<T>) => {
        let index = 0;
        for (const item of source) {
            action(item, index++);
        }
    };
}
