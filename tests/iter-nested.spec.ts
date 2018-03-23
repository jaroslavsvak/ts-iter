import { iter } from '../src/iter';

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

    it('flatMap', () => {
        const orderRows = iter(orders).flatMap(o => o.rows);
        expect(orderRows.length()).toEqual(6);

        // reconstruction test
        expect(orderRows.length()).toEqual(6);
    });
});
