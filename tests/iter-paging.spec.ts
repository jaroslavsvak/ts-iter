import { iter } from '../index';

describe('iter-paging', () => {
    const input = [5, 3, 20, 8, 16, 10, 6, 19];

    it('isEmpty', () => {
        expect(iter([]).isEmpty()).toEqual(true);
        expect(iter(input).isEmpty()).toEqual(false);
    });

    it('length', () => {
        expect(iter([]).length()).toEqual(0);
        expect(iter(input).length()).toEqual(input.length);
    });

    it('concat', () => {
        const another = [50, 100, 300];
        const result = iter(input).concat(another);

        expect(result.toArray()).toEqual(input.concat(another));
        expect(iter(input).concat(iter(another)).toArray()).toEqual(input.concat(another));

        // reconstrunction test
        expect(result.concat(result).toArray())
            .toEqual(input.concat(another).concat(input).concat(another));
    });

    it('skip and take', () => {
        const result = iter(input).skip(2).take(3).toArray();
        expect(result).toEqual([20, 8, 16]);
    });

    it('skip non-array', () => {
        const nonArray = input.map(x => x * 2);
        const result = iter(nonArray).skip(input.length - 1);
        expect(result.toArray()).toEqual([input[input.length - 1] * 2]);
    });

    it('takeWhile', () => {
        const result = iter(input).takeWhile(x => x < 10);
        expect(result.toArray()).toEqual([5, 3]);
    });

    it('tryGetAt', () => {
        expect(iter(input).tryGetAt(0)).toEqual(input[0]);
        expect(iter(input).tryGetAt(4)).toEqual(input[4]);
        expect(iter(input).tryGetAt(1000)).toEqual(undefined);
        expect(iter(input).tryGetAt(-2)).toEqual(undefined);
    });

    it('tryGetAt non-array', () => {
        const inx = iter(input).map(x => x + 1);
        expect(inx.tryGetAt(0)).toEqual(input[0] + 1);
        expect(inx.tryGetAt(4)).toEqual(input[4] + 1);
        expect(inx.tryGetAt(1000)).toEqual(undefined);
        expect(inx.tryGetAt(-2)).toEqual(undefined);
    });

    it('getAt', () => {
        expect(iter(input).getAt(0)).toEqual(input[0]);
        expect(iter(input).getAt(4)).toEqual(input[4]);
        expect(() => iter(input).getAt(1000)).toThrowError();
        expect(() => iter(input).getAt(-2)).toThrowError();
    });

    it('getAt non-array', () => {
        const inx = iter(input).map(x => x + 1);
        expect(inx.getAt(0)).toEqual(input[0] + 1);
        expect(inx.getAt(4)).toEqual(input[4] + 1);
        expect(() => inx.getAt(1000)).toThrowError();
        expect(() => inx.getAt(-2)).toThrowError();
    });
});
