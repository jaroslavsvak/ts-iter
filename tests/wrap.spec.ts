import { range } from '../src/generators';
import { iter, wrap } from '../src/iter';

describe('wraps various objects', () => {
    it('JS generator function', () => {
        const result = wrap(range(1, 10))
            .map(x => x + 1)
            .reduce((acc, x) => acc + x, 0);

        expect(result).toEqual(65);
    });

    it('set', () => {
        const input = new Set([1, 5, 10]);

        const result = wrap(input.keys())
            .reduce((acc, x) => acc + x, 0);

        expect(result).toEqual(16);
    });
});