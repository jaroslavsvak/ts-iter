import { map, filter, forEach, tap, toArray } from '../../fp';
import { sum } from '../../fp/math';
import { pipeArray } from '../../fp/pipe-array';

const family = [
    { name: 'Jack', age: 42 },
    { name: 'Leena', age: 39 },
    { name: 'Tim', age: 8 },
    { name: 'Jane', age: 17 },
    { name: 'Tina', age: 12 },
];

// filter and map example
console.log('Adults:');

pipeArray(
    family,
    filter(p => p.age >= 18),
    map(p => p.name),
    forEach(console.log)
);

console.log('Kids:');
const kids = pipeArray(
    family,
    filter(p => p.age < 18),
    tap(console.log),
    toArray
);

// sum example
const ageTotal = pipeArray(kids, sum(k => k.age));
console.log('Kids avg age', ageTotal / kids.length);
