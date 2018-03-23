import { iter } from '../src/iter';

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
});
