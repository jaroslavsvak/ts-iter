import { pipe } from '../../fn/pipe';
import * as core from '../../fn/index';

describe('fn/core', () => {
    let input: number[] = [];

    beforeEach(() => input = [5, 3, 5, 8, 12, 1, 20]);

    it('map+filter', () => {
        const result = pipe(
            core.iterate(input),
            core.map(x => x + 1),
            core.filter(x => x > 6),
            core.map(x => x * 2),
            core.toArray);

        const cmp = input
            .map(x => x + 1)
            .filter(x => x > 6)
            .map(x => x * 2);
        
        expect(result).toEqual(cmp);
    });

    it('map w index', () => {
        const result = pipe(
            core.iterate(input),
            core.map((x, i) => x + i),
            core.toArray);

        const cmp = input.map((x, i) => x + i);
        expect(result).toEqual(cmp);
    });

    it('filter w index', () => {
        const result = pipe(
            core.iterate(input),
            core.filter((x, i) => x + i > 10),
            core.toArray);

        const cmp = input.filter((x, i) => x + i > 10);
        expect(result).toEqual(cmp);
    });

    it('length', () => {
        const result = core.length(core.iterate(input));
        expect(result).toEqual(input.length);
    });

    it('isEmpty', () => {
        let result = core.isEmpty(core.iterate(input));
        expect(result).toBe(false);

        result = core.isEmpty(core.iterate([]));
        expect(result).toBe(true);
    });

    it('find', () => {
        let result = core.find(x => x > 5)(core.iterate(input));
        expect(result).toEqual(input.find(x => x > 5));

        result = core.find(x => x > 500)(core.iterate(input));
        expect(result).toBeUndefined();
    });

    it('findIndex', () => {
        let result = core.findIndex(x => x > 5)(core.iterate(input));
        expect(result).toEqual(input.findIndex(x => x > 5));

        result = core.findIndex(x => x > 500)(core.iterate(input));
        expect(result).toEqual(-1);
    });

    it('some', () => {
        let result = core.some(x => x > 5)(core.iterate(input));
        expect(result).toBe(true);

        result = core.some(x => x > 500)(core.iterate(input));
        expect(result).toBe(false);
    });

    it('every', () => {
        let result = core.every(x => x > 0)(core.iterate(input));
        expect(result).toBe(true);

        result = core.every(x => x > 500)(core.iterate(input));
        expect(result).toBe(false);
    });
});
