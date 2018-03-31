import { iter } from '../index';

describe('iter-find', () => {
    const input = ['apple', 'bannana', 'orange', 'lemon', 'pear'];

    it('find', () => {
        let result = iter(input).find(x => x === 'orange');
        expect(result).toEqual('orange');

        result = iter(input).find(x => x === 'non-existing-item');
        expect(result).toEqual(undefined);
    });

    it('findIndex', () => {
        let result = iter(input).findIndex(x => x === 'bannana');
        expect(result).toEqual(1);

        result = iter(input).findIndex(x => x === 'non-existing-item');
        expect(result).toEqual(-1);
    });

    it('every', () => {
        let result = iter(input).every(x => x.length > 2);
        expect(result).toEqual(true);

        result = iter(input).every(x => x === 'apple');
        expect(result).toEqual(false);
    });

    it('every-empty', () => {
        expect([].every(x => x > 5)).toEqual(true);

        // make sure that our behavior matches Array implementation
        expect([].every(x => x > 5)).toEqual(true);
    });

    it('some', () => {
        let result = iter(input).some(x => x.length > 200);
        expect(result).toEqual(false);

        result = iter(input).some(x => x === 'apple');
        expect(result).toEqual(true);
    });

    it('some-empty', () => {
        expect(iter([]).some(x => x > 5)).toEqual(false);

        // make sure that our behavior matches Array implementation
        expect([].some(x => x > 5)).toEqual(false);
    });

    it('contains', () => {
        expect(iter(input).contains('bannana')).toEqual(true);
        expect(iter(input).contains('non-existing-item')).toEqual(false);

        const empty: string[] = [];
        expect(iter(empty).contains('non-existing-item')).toEqual(false);
    });

    it('head', () => {
        const head = iter(input).head();
        expect(head).toEqual(input[0]);
        expect(() => iter([]).head()).toThrowError();
    });

    it('tryGetHead', () => {
        const head = iter(input).tryGetHead();
        expect(head).toEqual(input[0]);
        expect(iter([]).tryGetHead()).toEqual(undefined);
    });

    it('tail', () => {
        const tail = iter(input).tail();
        expect(tail).toEqual(input[input.length - 1]);
        expect(() => iter([]).tail()).toThrowError();
    });

    it('tryGetTail', () => {
        const tail = iter(input).tryGetTail();
        expect(tail).toEqual(input[input.length - 1]);
        expect(iter([]).tryGetTail()).toEqual(undefined);

        const input2 = input.map(x => x + 1);
        const tail2 = iter(input2).tryGetTail();
        expect(tail2).toEqual(input[input.length - 1] + 1);
        expect(iter([].map(x => x)).tryGetTail()).toEqual(undefined);
    });
});
