TS-iter
=======

## Typescript library that enahnces ES 2015 iterables

The library is inspired by C# Linq and Enumerable class. It wraps an Array or another iterable and provides
chainable functions such as map, filter, and reduce. There is a significant performance gain over chaining
standard Array methods (filter, map, reduce ...). Methods in Arrays always construct a completely
new array whereas TS-iter does not.

The library runs well in NodeJS 8.x, 9.x and browsers that support ES 2015. Recent versions if Chrome, FireFox, Edge, and Safari
are fully supported. Beware that Internet Explorer does not support ES 2015 and thus this library is not working in IE (any version).

NPM package will be provided as soon as the library reaches Beta version.

As of now, copy src/iter.ts to include the library in your project. TypeScript compiler has to target ES 2015 to compile it successfully. Modify your tsconfig.json and set tartget to es2015 or newer.

```json
"target": "es2015"
```

## Usage

1. Map, filter, reduce with an array.
Note that there is no benefit in using this library over Array built-in methods.
However when you method calls chain togeter, Arrays are not reconstructed, only a new iterator gets created saving
potentially a lot of memory and CPU cycles.

If the original array is modified during the workflow, changes become visible in TS-iter libray. Make sure you don't
modify your arrays after wrapping them in TS-iter object.

```ts
import { iter } from '../src/iter';

const input = [5, 3, 20, 8, 16, 10, 6, 19];

// Filter does not construct a new array. It creates only a lightweight object.
const result = iter(input)
    .filter(x => x > 10)
    .map(x => x + 1)
    .toArray();

console.log(result);

// Filter does not construct a new array. It creates only a lightweight object.
const sum = iter(input)
    .filter(x => x > 10)
    .reduce((acc, x) => acc + x, 0);

console.log(sum);
```