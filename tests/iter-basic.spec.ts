import { iter } from '../src/iter';

describe('iter-basic', () => {
    const input = [5, 3, 20, 8, 16, 10, 6, 19];

    it('map', () => {
        const result = iter(input).map(x => x + 1).toArray();
        const cmp = input.map(x => x + 1);
        expect(result).toEqual(cmp);
    }),

    it('filter', () => {
        const result = iter(input).filter(x => x > 10).toArray();
        const cmp = input.filter(x => x > 10);
        expect(result).toEqual(cmp);
    }),

    it('chain', () => {
        const result = iter(input)
            .filter(x => x > 10)
            .map(x => x + 1)
            .toArray();

        const cmp = input
            .filter(x => x > 10)
            .map(x => x + 1);
        
        expect(result).toEqual(cmp);
    })
});

