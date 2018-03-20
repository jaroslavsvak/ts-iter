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

        expect(iter(input).concat(another).toArray()).toEqual(input.concat(another));
        expect(iter(input).concat(iter(another)).toArray()).toEqual(input.concat(another));
    });

    it('skip and take', () => {
        const result = iter(input).skip(2).take(3).toArray();
        expect(result).toEqual([20, 8, 16]);
    })
});
