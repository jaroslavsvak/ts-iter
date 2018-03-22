import { iter } from '../src/iter';

describe('iter-calc', () => {
    const input = [5, 3, 20, 8, 16, 10, 6, 19];

    it('sum', () => {
        const result = iter(input).sum(x => x);
        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(result).toEqual(cmp);
    });

    it('min', () => {
        const result = iter(input).min(x => x);
        expect(result).toEqual(3);
    });

    it('min on empty collection', () => {
        const empty: number[] = [];
        expect(iter(empty).min(x => x)).toBe(undefined);
    });

    it('max', () => {
        const result = iter(input).max(x => x);
        expect(result).toEqual(20);
    });

    it('max on empty collection', () => {
        const empty: number[] = [];
        expect(iter(empty).max(x => x)).toBe(undefined);
    });
});
