TS-iter
=======

Typescript library that provides higher-order functions working with ES 2015 iterables.

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

## API documentation
Front page [https://jsvak.azurewebsites.net/ts-iter](https://jsvak.azurewebsites.net/ts-iter)

Index of all functions provided by IterableWrapper [https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html](https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html)

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
    .forEach(console.log);

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
    .forEach(console.log);
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

## All functions briefly
See more detailed documentation at [https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html](https://jsvak.azurewebsites.net/ts-iter/classes/_iter_.iterablewrapper.html)

```ts
import { iter } from 'ts-iter';

const input = [5, 6, 7, 8];

// *** Basic funcationality over Iterable that replicates Array methods ***
// Produces Iterable<number> = 6, 7, 8, 9
iter(input).map(x => x + 1);

// Produces Iterable<number> = 7, 8
iter(input).filter(x => x > 6);

// Produces number = 26 (sum of all input numbers)
iter(input).reduce((acc, x) => acc + x, 0);

// Produces number = 6 (finds the first element divisible by two)
iter(input).find(x => x % 2 === 0);

// Produces number = 1 (finds index of the first element divisible by two)
iter(input).findIndex(x => x % 2 === 0);

// Produces boolean = true (at least one element meets the condition)
iter(input).some(x => x === 8);

// Produces boolean = false (some elements do not meet the condition)
iter(input).every(x => x % 2 === 0);

// Calls a function for all elements
iter(input).forEach(console.log);

// Produces Iterable<number> = 5, 6, 7, 8, 9, 10
iter(input).concat([9, 10]);

// Produces Iterable<number> = 5, 6, 7, 8
iter(input).sort((a, b) => a - b);


// *** Conversion functions ***
// Produces Array<number> = [5, 6, 7, 8]
iter(input).toArray();

// Produces ReadonlyArray<number> = [5, 6, 7, 8]
iter(input).toReadonlyArray();

// Produces Set<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toSet();

// Produces ReadonlySet<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toReadonlySet();

// Produces Map<string, number> = { 'small' => [ 5, 6 ], 'big' => [ 7, 8 ] }. Passed function generates key for each element.
iter(input).toMap(x => x > 6 ? 'big' : 'small');


// *** Additional stuff ***
// Returns boolean = false
iter(input).isEmpty();

// Returns number = 4. Length of the iterable collection.
iter(input).length();

// Returns number = 5. The first element in the sequence or throws an error if it's empty.
iter(input).head();

// Returns number = 5. The first element in the sequence or undefined if it's empty
iter(input).tryGetHead();

// Returns element at given index or throws an error if the index is out of bounds
iter(input).getAt(1);

// Returns element at given index or undefined if the index is out of bounds
iter(input).tryGetAt(1);

// Returns true if the iterable collection contains given value (equality check === is applied).
iter(input).contains(8);

// Produces Iterable<number> 5, 6, 7. Stops as soon as an element does not pass the condition.
iter(input).takeWhile(x => x < 8);


// *** Math functions ***
// Calculates sum - number = 26
iter(input).sum(x => x);

// Finds the smallest number = 5
iter(input).min(x => x);

// Finds the biggest number = 8
iter(input).max(x => x);


// *** Set functions ***
// Produces Iterable<number> = 5, 8
iter(input).intersect([5, 8, 10]);

// Produces Iterable<number> = 6, 7
iter(input).except([5, 8, 10]);

// Produces Iterable<number> = 5, 6, 7, 8, 4, 10
iter(input).concat([4, 5, 8, 10]).distinct();


/*** Restructuring functions ***/
// Produces a groupping object { big: [7, 8]; small: [5, 6] }, similar to .toMap function
iter(input).groupBy(x => x > 6 ? 'big' : 'small');
```