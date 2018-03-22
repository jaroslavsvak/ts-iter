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

// flatten all order rows and sum total sales
const salesTotal = iter(orders)
    .flatMap(o => o.rows)
    .sum(r => r.pricePerUnit * r.qty);

console.log('Total sales', salesTotal);

// sum sales per customer
const ordersByCust = iter(orders).toMap(o => o.customer);

iter(ordersByCust.keys())
    .map(custName => {
        const orders = ordersByCust.get(custName)!;
        return {
            customer: custName,
            sales: iter(orders).sum(o => iter(o.rows).sum(r => r.qty * r.pricePerUnit)!)
        };
    })
    .forEach(c => console.log(c.customer, c.sales));

// sum sales per customer 2nd option
console.log('Sales per customer');

iter(orders)
    .groupBy(o => o.customer)
    .map(g => [g.key, g.group.sum(items => 1)])
    .forEach(c => console.log(c[0], c[1]));
