import { pipe } from '../../fp/pipe';
import * as core from '../../fp/index';
import * as math from '../../fp/math';

describe('fn/nav', () => {
    let input: number[] = [];

    beforeEach(() => input = [5, 10, 3, 2, 0, 1, 7]);

    it('min 1', () => {
        const result = pipe(
            core.iterate(input),
            math.min(x => x)
        );

        expect(result).toEqual(0);
    });

    it('min 2', () => {
        const result = math.min()(core.iterate(input));
        expect(result).toEqual(0);
    });

    it('max 1', () => {
        const result = pipe(
            core.iterate(input),
            math.max(x => x)
        );
        
        expect(result).toEqual(10);
    });

    it('max 2', () => {
        const result = math.max()(core.iterate(input));
        expect(result).toEqual(10);
    });

    it('sum 1', () => {
        const result = pipe(
            core.iterate(input),
            math.sum(x => x)
        );

        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(result).toEqual(cmp);
    });

    it('sum 2', () => {
        const result = math.sum()(core.iterate(input));
        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(result).toEqual(cmp);
    });
});
