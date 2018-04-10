export function min<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined {
    return (source: IterableIterator<T>) => {
        let result: number | undefined = undefined;

        for (const item of source) {
            result = Math.min(result === undefined ? Number.MAX_VALUE : result, mapper(item));
        }

        return result;
    };
}

export function max<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined {
    return (source: IterableIterator<T>) => {
        let result: number | undefined = undefined;

        for (const item of source) {
            result = Math.max(result === undefined ? Number.MIN_VALUE : result, mapper(item));
        }

        return result;
    };
}

export function sum<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number {
    return (source: IterableIterator<T>) => {
        let result = 0;

        for (const item of source) {
            result += mapper(item);
        }

        return result;
    };
}
