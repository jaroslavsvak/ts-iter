import { iter } from '../index';

const orders = [
    {
        customer: 'Cust 1',
        rows: [
            { article: 'Pancake', qty: 1, pricePerUnit: 1.5 },
            { article: 'Apple Pie', qty: 5, pricePerUnit: 2 },
            { article: 'Coke', qty: 3, pricePerUnit: 2.5 }
        ]
    },
    {
        customer: 'Cust 1',
        rows: [
            { article: 'Bread', qty: 7, pricePerUnit: 2 },
            { article: 'Coke', qty: 1, pricePerUnit: 2.5 },
        ]
    },
    {
        customer: 'Cust 2',
        rows: [
            { article: 'Coke', qty: 2, pricePerUnit: 2.5 }
        ]
    }
];

// flatten all order rows and sum total sales
const salesTotal = iter(orders)
    .flatMap(o => o.rows)
    .sum(r => r.pricePerUnit * r.qty);

console.log('Total sales', salesTotal);

// sum sales per customer
console.log('Sales per customer');

iter(orders)
    .groupBy(o => o.customer)
    .map(g => [
        g.key,
        g.items.flatMap(o => o.rows).sum(r => r.pricePerUnit * r.qty)
    ])
    .forEach(c => console.log(c[0], c[1]));

// sales per item
iter(orders)
    .flatMap(o => o.rows)
    .groupBy(r => r.article)
    .map(i => {
        return {
            article:      i.key,
            totalQtySold: i.items.sum(a => a.qty),
            totalSales:   i.items.sum(a => a.qty * a.pricePerUnit)
        }
    })
    .forEach(console.log);
