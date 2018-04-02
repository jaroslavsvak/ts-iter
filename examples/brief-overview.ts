import { iter } from '../index';

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

// Produces Iterable<number> = 5, 6, 7, 8, 9, 10 (concatenates another iterable)
iter(input).concat([9, 10]);

// Produces Iterable<number> = 8, 7, 6, 5
iter(input).sort((a, b) => b - a);

// Produces Iterable<number> = 8, 7, 6, 5
iter(input).reverse();


// *** Conversion functions ***
// Creates Array<number> = [5, 6, 7, 8]
iter(input).toArray();

// Creates ReadonlyArray<number> = [5, 6, 7, 8]
iter(input).toReadonlyArray();

// Creates Set<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toSet();

// Creates ReadonlySet<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toReadonlySet();

// Creates Map<string, number> = { 'small' => [ 5, 6 ], 'big' => [ 7, 8 ] }
iter(input).toMap(x => x > 6 ? 'big' : 'small');

// Creates string = "5; 6; 7; 8"
iter(input).toSeparatedString('; ');


// *** Additional stuff ***
// Returns boolean = false
iter(input).isEmpty();

// Returns number = 4 (length of the iterable collection)
iter(input).length();

// Returns number = 5 (the first element in the sequence; throws an error if it's empty)
iter(input).head();

// Returns number = 5 (the first element in the sequence; undefined if it's empty)
iter(input).tryGetHead();

// Returns number = 8 (the last element in the sequence; throws an error if it's empty)
iter(input).tail();

// Returns number = 8 (the last element in the sequence; undefined if it's empty)
iter(input).tryGetTail();

// Returns number = 6 (element at given index; throws an error if the index is out of bounds)
iter(input).getAt(1);

// Returns number = 6 (element at given index; undefined if the index is out of bounds)
iter(input).tryGetAt(1);

// Returns boolean = true (the iterable collection contains given value; applies equality check ===)
iter(input).contains(8);

// Produces Iterable<number> = 5, 6, 7 (stops as soon as an element does not pass the condition)
iter(input).takeWhile(x => x < 8);

// Produces Iterable<number> = 5, 6 (takes the first N elements)
iter(input).take(2);

// Produces Iterable<number> = 7, 8 (skips the first N elements)
iter(input).skip(2);

// Returns boolean = true
iter(input).sequenceEquals([5, 6, 7, 8]);


// *** Math functions ***
// Calculates sum - number = 26
iter(input).sum(x => x);

// Finds the smallest number = 5
iter(input).min(x => x);

// Finds the biggest number = 8
iter(input).max(x => x);


// *** Set functions ***
// Produces Iterable<number> = 5, 8 (intersection of both iterables)
iter(input).intersect([5, 8, 10]);

// Produces Iterable<number> = 6, 7 (input set minus another set)
iter(input).except([5, 8, 10]);


/*** Restructuring functions ***/
// Produces a groupping object { big: [7, 8]; small: [5, 6] }
iter(input).groupBy(x => x > 6 ? 'big' : 'small');

// Accesses nested collections as single iterable. Produces Iterable<number> = 1, 2, 3, 4, 5, 6
const groups = [
    { name: 'A', content: [1, 2, 3] },
    { name: 'B', content: [4, 5, 6] },
];

iter(groups).flatMap(g => g.content);

// Produced Iterable<number> = 4, 5, 2, 0, 2, 20, 1, 6, 10 (flattens hierarchy)
const multiDimMatrix = [4, 5, [2, 0, 2], [20, [1]], 6, 10];
iter(multiDimMatrix).flatten();
