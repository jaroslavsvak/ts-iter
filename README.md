TS-iter
=======

Typescript library that provides higher-order functions to ES 2015 iterables

The library is inspired by C# Linq and Java streams. It wraps an Array or another iterable and provides
chainable functions such as map, filter, and reduce. There is a significant performance gain over chaining
standard Array methods (filter, map, reduce ...). Array methods always construct a new array which impacts
application performance.

The library runs well in NodeJS 8.x, 9.x and browsers that support ES 2015. Recent versions of Chrome, FireFox, Edge, and Safari
are fully supported. Beware that Internet Explorer does not support ES 2015 iterator contract
and thus this library is not working in any version of IE.

## Installation
```
npm install ts-iter
```
Alternatively copy index.ts into your project.

## Full API documentation
Front page [https://jsvak.azurewebsites.net/ts-iter](https://jsvak.azurewebsites.net/ts-iter)

All functions provided by IterableWrapper [https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html](https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html)

```json
"target": "es2015"
```

## Basic usage - map, filter, reduce
```ts
import { iter } from 'ts-iter';

const family = [
    { name: 'Jack', age: 42 },
    { name: 'Leena', age: 39 },
    { name: 'Tim', age: 8 },
    { name: 'Jane', age: 17 },
    { name: 'Tina', age: 12 },
];

// filter and map example
console.log('Adults:');

iter(family)
    .filter(p => p.age >= 18)
    .map(p => p.name)
    .forEach(name => console.log(name));

// IterableWrapper allows for-of looping as well as forEach
console.log('Kids:');
const kids = iter(family).filter(p => p.age < 18);

for (const kid of kids) {
    console.log(kid.name);
}

// length() counts elements in the sequence
console.log('There are', kids.length(), 'kids in our family');

// sum example
const ageTotal = kids.sum(k => k.age);
console.log('Kids avg age', ageTotal / kids.length());
```

Note that there is no benefit in using this library over Array built-in methods unless you chain method calls togeter.
When you chain calls, arrays are not reconstructed as it happens with Array API. Only a lightweight iterator is created
by each method.

Make sure that you don't modify your arrays while they are processed by IterableWrapper object. Modifications may become
visible during processing leading to undesired behavior.

## Advanced usage
```ts
import { iter } from 'ts-iter';

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
    .forEach(x => console.log(x));
```
## Set functions
```ts
import { iter } from 'ts-iter';

const fridge = iter(['Butter', 'Bread roll', 'Egg', 'Sausage', 'Steak', 'Ham', 'Fries']);
const breakfast = ['Bread roll', 'Butter', 'Egg', 'Ham'];
const lunch = ['Vegetable soup', 'Steak', 'Fries', 'Salad'];
const snack = ['Apple'];
const dinner = ['Bread roll', 'Sausage'];

const eatToday = iter(breakfast).concat(lunch).concat(snack).concat(dinner);

const missingInFridge = eatToday.except(fridge);
console.log('Shopping list', missingInFridge.toArray());

const alreadyAtHome = eatToday.intersect(fridge);
console.log('We already have', alreadyAtHome.toArray());
```