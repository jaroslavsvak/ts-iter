import { iter } from '../index';

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
