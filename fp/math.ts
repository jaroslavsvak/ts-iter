export function min<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined {
    return (source: IterableIterator<T>) => {
        let result: number | undefined = undefined;

        for (const item of source) {
            const current = mapper(item);
            if (result === undefined || result > current) {
                result = current;
            }
        }

        return result;
    };
}

export function max<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined {
    return (source: IterableIterator<T>) => {
        let result: number | undefined = undefined;

        for (const item of source) {
            const current = mapper(item);
            if (result === undefined || result < current) {
                result = current;
            }
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
