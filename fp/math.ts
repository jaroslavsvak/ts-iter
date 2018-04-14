export function min<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined;

export function min(): (source: IterableIterator<number>) => number | undefined;

export function min(mapper?: (item: any) => number): (source: IterableIterator<any>) => number | undefined {
    return (source: IterableIterator<any>) => {
        let result: number | undefined = undefined;
        mapper = mapper || (item => item as number);

        for (const item of source) {
            result = Math.min(result === undefined ? Number.MAX_VALUE : result, mapper(item));
        }

        return result;
    };
}

export function max<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number | undefined;

export function max(): (source: IterableIterator<number>) => number | undefined;

export function max(mapper?: (item: any) => number): (source: IterableIterator<any>) => number | undefined {
    return (source: IterableIterator<any>) => {
        let result: number | undefined = undefined;
        mapper = mapper ||  (item => item as number);

        for (const item of source) {
            result = Math.max(result === undefined ? Number.MIN_VALUE : result, mapper(item));
        }

        return result;
    };
}

export function sum<T>(mapper: (item: T) => number): (source: IterableIterator<T>) => number;

export function sum(): (source: IterableIterator<number>) => number;

export function sum(mapper?: (item: any) => number): (source: IterableIterator<any>) => number {
    return (source: IterableIterator<any>) => {
        let result = 0;
        mapper = mapper || (item => item as number);

        for (const item of source) {
            result += mapper(item);
        }

        return result;
    };
}
