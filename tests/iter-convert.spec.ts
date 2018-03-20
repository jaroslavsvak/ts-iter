import { iter } from '../src/iter';

describe('iter-convert', () => {
    const input = [5, 3, 3, 10, 5];

    it('toSet', () => {
        const input = [5, 3, 3, 10, 5];
        const result = iter(input).toSet();

        expect([...result.keys()]).toEqual([5, 3, 10]);
    });
});
