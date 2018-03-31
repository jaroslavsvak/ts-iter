import { pipeArray } from '../pipe';
import * as core from '../index';

describe('fn/core', () => {
    let input: number[] = [];

    beforeEach(() => input = [5, 3, 5, 8, 12, 1, 20]);

    it('map+filter', () => {
        const result = pipeArray(
            input,
            core.map(x => x + 1),
            core.filter(x => x > 6),
            core.map(x => x * 2),
            core.toArray()
        );

        const cmp = input
            .map(x => x + 1)
            .filter(x => x > 6)
            .map(x => x * 2);
        
        expect(result).toEqual(cmp);
    });
});
