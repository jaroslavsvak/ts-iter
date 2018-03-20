import { iter } from '../src/iter';

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

const salesTotal = iter(orders)
    .flatMap(o => o.rows)
    .sum(r => r.pricePerUnit * r.qty);

console.log('Total sales', salesTotal);
