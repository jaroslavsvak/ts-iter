import { iter } from '../index';

describe('iter-set-functions', () => {
    const input1 = [5, 3, 20, 8, 16, 10, 6, 19];
    const input2 = [20, 10];

    interface Person { id: string, name: string }

    const obj1: Person[] = [
        { id: '50518', name: 'Tom' },
        { id: '00554', name: 'Jane' },
        { id: '95410', name: 'Tim' },
        { id: '08632', name: 'Susane' },
    ];

    const obj2: Person[] = [
        { id: '00554', name: 'Jane' },
        { id: '95410', name: 'Tim' },
        { id: '22251', name: 'Albert' },
    ];

    function areEqual(a: Person, b: Person) {
        return a.id === b.id;
    }

    it('intersect', () => {
        let result = iter(input1).intersect(input2).toArray();
        expect(result).toEqual(input2);

        result = iter(input1).intersect(iter(input2)).toArray();
        expect(result).toEqual(input2);

        result = iter(input2).intersect(input1).toArray();
        expect(result).toEqual(input2);

        result = iter(input2).intersect(iter(input1)).toArray();
        expect(result).toEqual(input2);
    });

    it('intersect using equals fn', () => {
        const areEqual = (a: Person, b: Person) => a.id === b.id;
        const expectedIntersection = [obj2[0], obj2[1]];

        let result = iter(obj1).intersect(obj2, areEqual).toArray();
        expect(result).toEqual(expectedIntersection);

        result = iter(obj1).intersect(iter(obj2), areEqual).toArray();
        expect(result).toEqual(expectedIntersection);

        result = iter(obj2).intersect(obj1, areEqual).toArray();
        expect(result).toEqual(expectedIntersection);

        result = iter(obj2).intersect(iter(obj1), areEqual).toArray();
        expect(result).toEqual(expectedIntersection);
    });

    it('except', () => {
        const expectedResult = [5, 3, 8, 16, 6, 19];

        let result = iter(input1).except(input2).toArray();
        expect(result).toEqual(expectedResult);

        result = iter(input1).except(iter(input2)).toArray();
        expect(result).toEqual(expectedResult);
    });

    it('except using equals fn', () => {
        const expectedResult = ['50518', '08632'];

        let result = iter(obj1).except(obj2, areEqual).map(p => p.id).toArray()
        expect(result).toEqual(expectedResult);

        result = iter(obj1).except(iter(obj2), areEqual).map(p => p.id).toArray()
        expect(result).toEqual(expectedResult);
    });

    it('intersect restartable', () => {
        const m1 = iter(input1).map(x => x + 1);
        const m2 = iter(input2).map(x => x + 1);
        const result = m1.intersect(m2);

        expect(result.toArray()).toEqual([21, 11]);

        // reiteration test
        expect(result.toArray()).toEqual([21, 11]);
    });

    it('except restartable', () => {
        const m1 = iter(input1).map(x => x + 1);
        const m2 = iter(input2).map(x => x + 1);
        const result = m1.except(m2);
        const expeceted = [6, 4, 9, 17, 7, 20];

        expect(result.toArray()).toEqual(expeceted);

        // reiteration test
        expect(result.toArray()).toEqual(expeceted);
    });

    it('sequenceEquals', () => {
        expect(iter(input1).sequenceEquals(input2)).toBe(false);
        expect(iter(input2).sequenceEquals(input1)).toBe(false);

        const clone = [...input1];
        expect(iter(input1).sequenceEquals(clone)).toBe(true);
        expect(iter(clone).sequenceEquals(input1)).toBe(true);
    });
});
