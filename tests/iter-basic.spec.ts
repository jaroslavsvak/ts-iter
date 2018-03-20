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

    it('reduce', () => {
        const sum = iter(input).reduce((acc, x) => acc + x, 0);
        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(sum).toEqual(cmp);
    }),

    it('supports looping', () => {
        const result: number[] = [];

        for (const x of iter(input)) {
            result.push(x);
        }

        expect(result).toEqual(input);
    });

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

