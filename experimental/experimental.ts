import { pipe, map, filter, toArray } from './iter';

const input = [5, 10, 6, 8];
let result = pipe(input, map(x => x + 5), filter(x => x > 5), map(x => x + 1), toArray());
console.log(result);

const im = pipe(input, map(x => x * 2), map(x => x * x));
result = pipe(im, map(x => x + 1), toArray());
console.log(result);
