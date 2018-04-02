import { iter } from '../index';

const input = [4, 5, [2, 0, 2], [20, [1]], 6, 10];
const result = iter(input).flatten();
console.log(result.toArray());
