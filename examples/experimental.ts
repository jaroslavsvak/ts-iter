class Iter<T> {
    constructor(private openIterator: () => IterableIterator<T>) {
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.openIterator();
    }

    map<TResult>(mapper: (item: T) => TResult): Iter<TResult> {
        const self = this;

        const inner = () => {
            const iterator = this.openIterator();

            return (function* () {
                for (const item of iterator) {
                    yield mapper(item);
                }
            })();
        }

        return new Iter(inner);
    }

    filter(predicate: (item: T) => boolean): Iter<T> {
        const inner = () => {
            const iterator = this.openIterator();

            return (function* () {
                for (const item of iterator) {
                    if (predicate(item)) {
                        yield item;
                    }
                }
            })();
        }

        return new Iter(inner);
    }
}

function make<T>(array: T[]): Iter<T> {
    return new Iter(() => array[Symbol.iterator]());
}

const test = [1, 2, 3, 5, 6, 10, 8, 11];
const iter = make(test);
console.log([...iter]);
console.log([...iter]);

const recalc1 = iter.map(x => x + 1);
console.log([...recalc1]);
console.log([...recalc1]);

const recalc2 = recalc1.map(x => x + 2);
console.log([...recalc2]);
console.log([...recalc2]);

const recalc3 = recalc2.map(x => x + 3);
console.log([...recalc3]);
console.log([...recalc3]);

const filter1 = recalc3.filter(x => x > 10);
console.log([...filter1]);

const filter2 = filter1.filter(x => x % 2 == 0);
console.log([...filter2]);
