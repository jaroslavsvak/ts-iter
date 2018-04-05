import { pipe } from '../../fp/pipe';
import * as core from '../../fp/index';
import * as nav from '../../fp/nav';

describe('fn/nav', () => {
    let input: number[] = [];

    beforeEach(() => input = [5, 10, 3, 2, 0, 1, 7]);

    it('tryGetAt', () => {
        expect( nav.tryGetAt(0)(core.iterate(input)) ).toEqual(input[0]);
        expect( nav.tryGetAt(6)(core.iterate(input)) ).toEqual(input[6]);

        expect( nav.tryGetAt(-1)(core.iterate(input)) ).toEqual(undefined);
        expect( nav.tryGetAt(100)(core.iterate(input)) ).toEqual(undefined);
    });

    it('getAt', () => {
        expect( nav.getAt(0)(core.iterate(input)) ).toEqual(input[0]);
        expect( nav.getAt(6)(core.iterate(input)) ).toEqual(input[6]);

        expect( () => nav.getAt(-1)(core.iterate(input)) ).toThrowError();
        expect( () => nav.getAt(100)(core.iterate(input)) ).toThrowError();
    });

    it('tryGetHead', () => {
        expect( nav.tryGetHead()(core.iterate(input)) ).toEqual(input[0]);
        expect( nav.tryGetHead()(core.iterate([])) ).toEqual(undefined);
    });

    it('head', () => {
        expect( nav.head()(core.iterate(input)) ).toEqual(input[0]);
        expect( () => nav.head()(core.iterate([])) ).toThrowError();
    });

    it('skip', () => {
        let result = [...nav.skip(3)(core.iterate(input))];
        expect(result).toEqual([2, 0, 1, 7]);

        result = [...nav.skip(0)(core.iterate(input))];
        expect(result).toEqual(input);

        result = [...nav.skip(100)(core.iterate(input))];
        expect(result).toEqual([]);
    });

    it('take', () => {
        let result = [...nav.take(3)(core.iterate(input))];
        expect(result).toEqual([5, 10, 3]);

        result = [...nav.take(0)(core.iterate(input))];
        expect(result).toEqual([]);

        result = [...nav.take(100)(core.iterate(input))];
        expect(result).toEqual(input);
    });
});