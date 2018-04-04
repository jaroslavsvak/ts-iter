import { pipe } from '../../fp/pipe';
import * as core from '../../fp/index';

interface FileSystemObj {
    name: string,
    content?: FileSystemObj[],
    size?: number
}

describe('iter-nested', () => {
    const orders = [
        {
            customer: 'Cust 1',
            rows: [
                { item: 'Pancake', qty: 1, pricePerUnit: 1.5 },
                { item: 'Apple Pie', qty: 5, pricePerUnit: 2 },
                { item: 'Coke', qty: 3, pricePerUnit: 2.5 }
            ]
        },
        {
            customer: 'Cust 1',
            rows: [
                { item: 'Bread', qty: 7, pricePerUnit: 2 },
                { item: 'Coke', qty: 1, pricePerUnit: 2.5 },
            ]
        },
        {
            customer: 'Cust 2',
            rows: [
                { item: 'Coke', qty: 2, pricePerUnit: 2.5 }
            ]
        }
    ];

    const folderStructure: FileSystemObj = {
        name: 'root',
        content: [
            {
                name: 'system',
                content: [
                    { name: 'drivers', content: [] },
                    { name: 'kernel', size: 20 }
                ]
            },
            {
                name: 'data',
                content: [
                    { name: 'app-settings', content: [] },
                    {
                        name: 'documents',
                        content: [
                            { name: 'photo1', size: 50 },
                            { name: 'letter', size: 5 },
                            { name: 'spreasheet', size: 17 }
                        ]
                    }
                ]
            },
            {
                name: 'software',
                content: [
                    { name: 'office suite', size: 50 },
                    { name: 'photo editor', size: 78 },
                    { name: 'media player', size: 20 }
                ]
            }
        ]
    };

    it('flatMap', () => {
        const orderRows = pipe(core.iterate(orders), core.flatMap(o => o.rows));
        expect(core.length(orderRows)).toEqual(6);

        // reconstruction test
        //expect(core.length(orderRows)).toEqual(6);
    });

    /*it('flatten, flattenAndMap', () => {
        const allNames = iter([folderStructure])
            .flatten(x => x.content)
            .map(x => x.name)
            .sort((a, b) => a.localeCompare(b, 'en-US'))
            .toArray();
        
        expect(allNames).toEqual(['app-settings', 'data', 'documents', 'drivers', 'kernel', 'letter',
            'media player', 'office suite', 'photo editor', 'photo1', 'root', 'software', 'spreasheet',
            'system']);

        let totalSize = iter([folderStructure]).flatten(x => x.content).sum(x => x.size || 0);
        expect(totalSize).toEqual(240);

        totalSize = iter([folderStructure])
            .flattenAndMap(x => x.content, x => x)
            .sum(x => x.size || 0);
        
        expect(totalSize).toEqual(240);
    });

    it('flatten limit depth', () => {
        const firstLevel = iter([folderStructure])
            .flatten((x, depth) => depth > 0 ? undefined : x.content)
            .map(x => x.name)
            .toArray();
        
        expect(firstLevel).toEqual(['root', 'system', 'data', 'software']);
    });

    it('flatten multidimensional array', () => {
        const input = [4, 5, [2, 0, 2], [20, [1]], 6, 10];
        const result = iter(input).flatten();
        expect(result.toArray()).toEqual([4, 5, 2, 0, 2, 20, 1, 6, 10]);
    });*/
});
