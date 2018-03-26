import { range } from '../generators';
import { iter } from '../index';

describe('wraps various objects', () => {
    it('JS generator function', () => {
        const result = iter(range(1, 11))
            .map(x => x + 1)
            .reduce((acc, x) => acc + x, 0);

        expect(result).toEqual(65);
    });

    it('set', () => {
        const input = new Set([1, 5, 10]);
        const result = iter(input.keys()).reduce((acc, x) => acc + x, 0);
        expect(result).toEqual(16);
    });
});
