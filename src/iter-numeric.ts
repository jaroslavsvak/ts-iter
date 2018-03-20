import { Iter } from './iter';

export function sum(nums: Iter<number>): number {
    return nums.reduce((acc, x) => acc + x, 0);
}

export function countSum(nums: Iter<number>): [number, number] {
    let count = 0, sum = 0;

    for (const num of nums) {
        count++;
        sum += num;
    }

    return [count, sum];
}

export function sequence(from: number, to: number): Iter<number> {
    function* inner() {
        for (let i = from; i <= to; i++) {
            yield i;
        }
    }

    return new Iter(inner());
}
