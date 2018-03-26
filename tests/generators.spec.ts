import { range, rangeInclusive } from '../generators';

describe('generators', () => {
    it('simple range', () => {
        const result = [...range(0, 5)];
        expect(result).toEqual([0, 1, 2, 3, 4]);
    }),

    it('range with step', () => {
        const result = [...range(10, 50, 10)];
        expect(result).toEqual([10, 20, 30, 40]);
    }),

    it('rangeInclusive', () => {
        const result = [...rangeInclusive(0, 5)];
        expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });
});
