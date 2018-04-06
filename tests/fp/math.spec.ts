import { pipe } from '../../fp/pipe';
import * as core from '../../fp/index';
import * as math from '../../fp/math';

describe('fn/nav', () => {
    let input: number[] = [];

    beforeEach(() => input = [5, 10, 3, 2, 0, 1, 7]);

    it('min', () => {
        const result = pipe(
            core.iterate(input),
            math.min(x => x)
        );

        expect(result).toEqual(0);
    });

    it('max', () => {
        const result = pipe(
            core.iterate(input),
            math.max(x => x)
        );

        expect(result).toEqual(10);
    });

    it('sum', () => {
        const result = pipe(
            core.iterate(input),
            math.sum(x => x)
        );

        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(result).toEqual(cmp);
    });
});
