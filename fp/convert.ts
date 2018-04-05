export function toMap<T, TKey>(keyMapper: (item: T) => TKey)
    : (source: IterableIterator<T>) => Map<TKey, T[]> {

    return (source: IterableIterator<T>) => {
        const result = new Map<TKey, T[]>();

        for (const item of source) {
            const key: TKey = keyMapper(item),
                group: T[] | undefined = result.get(key);

            if (group) {
                group.push(item);
            } else {
                result.set(key, [item]);
            }
        }

        return result;
    };
}

export function toReadonlyMap<T, TKey>(keyMapper: (item: T) => TKey)
    : (source: IterableIterator<T>) => ReadonlyMap<TKey, T[]> {

    return (source: IterableIterator<T>) => toMap(keyMapper)(source) as ReadonlyMap<TKey, T[]>;
}

export function toSet<T>(source: IterableIterator<T>): Set<T> {
    const result = new Set<T>();

    for (const item of source) {
        result.add(item);
    }

    return result;
}

export function toReadolnySet<T>(source: IterableIterator<T>): ReadonlySet<T> {
    return toSet(source) as ReadonlySet<T>;
}

export function distinct<T, TKey>(keyMapper?: (item: T) => any): (source: IterableIterator<T>) => IterableIterator<T> {
    return function* (source: IterableIterator<T>) {
        keyMapper = keyMapper || ((x: T) => x);
        const uniqueItems = new Set<TKey>();

        for (const item of source) {
            const key = keyMapper(item);
            if (!uniqueItems.has(key)) {
                uniqueItems.add(key);
                yield item;
            }
        }
    };
}
