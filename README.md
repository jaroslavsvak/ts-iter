TS-iter
=======

## Typescript library that enahnces ES 2015 iterables

The library is inspired by C# Linq and Java streams. It wraps an Array or another iterable and provides
chainable functions such as map, filter, and reduce. There is a significant performance gain over chaining
standard Array methods (filter, map, reduce ...). Array methods always construct a new array which impacts
application performance.

The library runs well in NodeJS 8.x, 9.x and browsers that support ES 2015. Recent versions of Chrome, FireFox, Edge, and Safari
are fully supported. Beware that Internet Explorer does not support ES 2015 and thus this library is not working in any version of IE.

NPM package will be provided as soon as the library reaches Beta version.

As of now, copy src/iter.ts to include the library in your project. TypeScript compiler has to target ES 2015 to compile it successfully. Modify your tsconfig.json and set tartget to es2015 or newer.

```json
"target": "es2015"
```

## Basic usage - map, filter, reduce
```ts
import { iter } from '../src/iter';

const family = [
    { name: 'Jack', age: 42 },
    { name: 'Leena', age: 39 },
    { name: 'Tim', age: 8 },
    { name: 'Jane', age: 17 }
];

// filter and map example
console.log('Adults:');

iter(family)
    .filter(p => p.age >= 18)
    .map(p => p.name)
    .forEach(name => console.log(name));

// IterableWrapper allows for-of looping as well as forEach
console.log('Kids:');

const kidsNames = iter(family)
    .filter(p => p.age < 18)
    .map(p => p.name);

for (const name of kidsNames) {
    console.log(name);
}

// length() returns length of iterable (after applying filter)
console.log('There are', kidsNames.length(), ' kids in our family');

// reduce example
const ageTotal = iter(family).reduce((acc, p) => acc + p.age, 0);
const ageAvg = ageTotal / family.length;
console.log('Avg age', ageAvg);
```

Note that there is no benefit in using this library over Array built-in methods unless you chain method calls togeter.
When you chain calls, arrays are not reconstructed as it happens with Array API. Only a lightweight iterator is created
by each method.

Make sure that you don't modify your arrays while they are processed by IterableWrapper object. Modifications may become
visible during processing leading to undesired behavior.

## Advanced usage
```ts
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
```