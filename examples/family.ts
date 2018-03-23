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

const kids = iter(family).filter(p => p.age < 18);

for (const kid of kids) {
    console.log(kid.name);
}

console.log('Num of kids in family', kids.length());

// reduce example
const ageTotal = iter(family).reduce((acc, p) => acc + p.age, 0);
const ageAvg = ageTotal / family.length;
console.log('Avg age', ageAvg);
