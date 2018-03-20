import { iter } from '../src/iter';

function* generateRnd(count: number) {
    for (let i = 0; i < count; i++) {
        yield Math.random();
    }
}

const input = [...generateRnd(1e7)];

function useTraditionalArray(): number[] {
    return input
        .map(x => x * 2)
        .filter(x => x > 0.75)
        .map(x => x + 10);
}

function useTsIter(): number[] {
    return iter(input)
        .map(x => x * 2)
        .filter(x => x > 0.75)
        .map(x => x + 10)
        .toArray();
}

let started = new Date();
useTraditionalArray();
console.log('Traditional', new Date().getTime() - started.getTime());

started = new Date();
useTsIter();
console.log('TS-iter', new Date().getTime() - started.getTime());
