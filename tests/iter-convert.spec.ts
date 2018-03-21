import { iter } from '../src/iter';

describe('iter-convert', () => {
    const input = [5, 3, 3, 10, 5];

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
        const result = iter(input).distinct().toArray().sort();
        expect(result).toEqual([10, 3, 5]);
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
        const result = iter(input).sort().toArray();
        expect(result).toEqual(input.sort());
    });

    it('sort with sortFn', () => {
        const sortFn = (a: number, b: number) => b - a;
        const result = iter(input).sort(sortFn).toArray();
        expect(result).toEqual(input.sort(sortFn));
    });
});
