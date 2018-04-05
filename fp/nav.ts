export function tryGetAt<T>(index: number): (source: IterableIterator<T>) => T | undefined {
    return (source: IterableIterator<T>) => {
        let i = 0;
        for (const item of source) {
            if (i++ === index) {
                return item;
            }
        }

        return undefined;
    };
}

export function getAt<T>(index: number): (source: IterableIterator<T>) => T {
    return (source: IterableIterator<T>) => {
        const result = tryGetAt<T>(index)(source);
        if (result === undefined) {
            throw new RangeError();
        } else {
            return result;
        }
    };
}

export function tryGetHead<T>(): (source: IterableIterator<T>) => T | undefined {
    return (source: IterableIterator<T>) => {
        const result = source.next();
        if (result.done) {
            return undefined;
        }

        return result.value;
    };
}

export function head<T>(): (source: IterableIterator<T>) => T {
    return (source: IterableIterator<T>) => {
        const result = source.next();
        if (result.done) {
            throw new RangeError('The iterable is empty');
        }

        return result.value;
    };
}

export function skip<T>(numElements: number): (source: IterableIterator<T>) => IterableIterator<T> {
    return function* (source: IterableIterator<T>) {
        let counter = 0;
        for (const item of source) {
            if (counter++ >= numElements) {
                yield item;
            }
        }
    };
}

export function take<T>(numElements: number): (source: IterableIterator<T>) => IterableIterator<T> {
    return function* (source: IterableIterator<T>) {
        let counter = 0;
        for (const item of source) {
            if (counter++ >= numElements) {
                break;
            }

            yield item;            
        }
    };
}
