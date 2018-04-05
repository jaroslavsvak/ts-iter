import { pipe } from '../../fp/pipe';
import * as core from '../../fp/index';
import * as convert from '../../fp/convert';

describe('fn/convert', () => {
    it('toMap', () => {
        const customers = [
            { id: '01', name: 'Peter' },
            { id: '02', name: 'Paul' },
            { id: '01', name: 'Peter2' },
            { id: '03', name: 'Jane' }
        ];

        const result = pipe(
            core.iterate(customers),
            convert.toMap(c => c.id)
        );

        expect(result.size).toEqual(3);
        expect(result.get('01')).toEqual([customers[0], customers[2]]);
        expect(result.get('02')).toEqual([customers[1]]);
        expect(result.get('03')).toEqual([customers[3]]);
    });

    it('toSet', () => {
        const input = [3, 6, 5, 6, 3, 5];
        const result = pipe(
            core.iterate(input),
            convert.toSet
        );

        expect([...result.keys()]).toEqual([3, 6, 5]);
    });

    it('distinct', () => {
        const input = [3, 6, 5, 6, 3, 5];
        const result = pipe(
            core.iterate(input),
            convert.distinct(),
            core.toArray
        );

        expect(result).toEqual([3, 6, 5]);
    });

    it('distinct w keyMapper', () => {
        const customers = [
            { id: '01', name: 'Peter' },
            { id: '02', name: 'Paul' },
            { id: '01', name: 'Peter2' },
            { id: '03', name: 'Jane' }
        ];

        const result = pipe(
            core.iterate(customers),
            convert.distinct(x => x.id),
            core.map(x => x.id),
            core.toArray
        );

        expect(result).toEqual(['01', '02', '03']);
    });
});
