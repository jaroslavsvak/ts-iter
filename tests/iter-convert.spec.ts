import { iter } from '../index';

describe('iter-convert', () => {
    let input: number[];

    beforeEach(() => input = [5, 3, 3, 10, 5]);

    it('toSet', () => {
        const result = iter(input).toSet();
        expect(result).toEqual(new Set(input));
    });

    it('toMap', () => {
        const result = iter(input).toMap(x => x > 4 ? 'big' : 'small');
        expect(result.size).toEqual(2);

        const big = result.get('big')!.sort();
        expect(big).toEqual([10, 5, 5]);        

        const small = result.get('small');
        expect(small).toEqual([3, 3]);
    });

    it('distinct', () => {
        const distingElements = [10, 3, 5];
        const result = iter(input).distinct();
        expect(result.toArray().sort()).toEqual(distingElements);

        // reconstruction test
        expect(result.toArray().sort()).toEqual(distingElements);
        expect(result.sort().toArray()).toEqual(distingElements);
    });
    
    it('distinct with custom key', () => {
        const customers = [
            { id: '01', name: 'Peter' },
            { id: '02', name: 'Paul' },
            { id: '01', name: 'Peter2' },
            { id: '03', name: 'Jane' }
        ];

        const result = iter(customers)
            .distinct(c => c.id)
            .map(c => c.name)
            .toArray();

        expect(result).toEqual(['Peter', 'Paul', 'Jane']);
    });

    it('sort', () => {
        const orig = [...input],
              work = [...input];

        const result = iter(work).sort().toArray();
        expect(result).toEqual(input.sort());

        // make sure that the original input remains unchanged
        expect(work).toEqual(orig);
    });

    it('sort with sortFn', () => {
        const sortFn = (a: number, b: number) => b - a;
        const result = iter(input).sort(sortFn).toArray();
        expect(result).toEqual(input.sort(sortFn));
    });

    it('reverse', () => {
        const orig = [...input],
              work = [...input];

        // array as input
        let result = iter(work).reverse().toArray();
        expect(result).toEqual(input.reverse());

        // iterable as input
        result = iter(work).map(x => x * 2).reverse().toArray();
        expect(result).toEqual(input.map(x => x * 2));

        // make sure that the original input remains unchanged
        expect(work).toEqual(orig);
    });

    it('toSeparatedString', () => {
        let result = iter(input).toSeparatedString(':');
        expect(result).toEqual(input.join(':'));

        // undefined is skipped, null should be in the output
        result = iter([...input, undefined, null]).toSeparatedString(':');
        expect(result).toEqual(input.join(':') + ':null');
    });
});
