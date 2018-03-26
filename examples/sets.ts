import { iter } from '../index';

const input = [5, 3, 3, 10, 5];

const result = iter(input).toMap(x => x > 4 ? 'big' : 'small');
console.log(result);
