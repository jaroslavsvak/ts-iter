
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

export function distinct() {
    
}
