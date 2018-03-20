TS-iter
=======

## Typescript library that enahnces ES 2015 iterables

The library is inspired by C# Linq and Enumerable class. It wraps an Array or another iterable and provides
chainable functions such as map, filter, and reduce. There is a significant performance gain over chaining
standard Array methods (filter, map, reduce ...). Methods in Arrays always construct a completely
new array whereas TS-iter does not.

The library runs well in NodeJS 8.x, 9.x and browsers that support ES 2015. Recent versions of Chrome, FireFox, Edge, and Safari
are fully supported. Beware that Internet Explorer does not support ES 2015 and thus this library is not working in any version of IE.

NPM package will be provided as soon as the library reaches Beta version.

As of now, copy src/iter.ts to include the library in your project. TypeScript compiler has to target ES 2015 to compile it successfully. Modify your tsconfig.json and set tartget to es2015 or newer.

```json
"target": "es2015"
```

## Basic usage - map, filter, reduce.
```ts
import { iter } from '../src/iter';

const input = [5, 3, 20, 8, 16, 10, 6, 19];

// Filter does not construct a new array. It creates only a lightweight object.
const result = iter(input)
    .filter(x => x > 10)
    .map(x => x + 1);

// IterableWrapper<T>.toArray() constructs a new Array
console.log(result.toArray());

// Filter does not construct a new array. It creates only a lightweight object.
const sum = iter(input)
    .filter(x => x > 10)
    .reduce((acc, x) => acc + x, 0);

console.log(sum);
```

Note that there is no benefit in using this library over Array built-in methods unless you chain method calls togeter.
Arrays are not reconstructed, only a lightweight iterator gets created.
If the original array is modified during your work, changes become visible in TS-iter libray immediatelly.
Make sure you don't modify your arrays after wrapping them in TS-iter object.