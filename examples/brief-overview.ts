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

// Produces Iterable<number> = 5, 6, 7, 8, 9, 10
iter(input).concat([9, 10]);

// Produces Iterable<number> = 5, 6, 7, 8
iter(input).sort((a, b) => a - b);


// *** Conversion functions ***
// Produces Array<number> = [5, 6, 7, 8]
iter(input).toArray();

// Produces ReadonlyArray<number> = [5, 6, 7, 8]
iter(input).toReadonlyArray();

// Produces Set<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toSet();

// Produces ReadonlySet<number> = [5, 6, 7, 8], duplicate elements are removed from the set
iter(input).toReadonlySet();

// Produces Map<string, number> = { 'small' => [ 5, 6 ], 'big' => [ 7, 8 ] }
iter(input).toMap(x => x > 6 ? 'big' : 'small');


// *** Additional stuff ***
// Returns boolean = false
iter(input).isEmpty();

// Returns number = 4. Length of the iterable collection.
iter(input).length();

// Returns number = 5. The first element in the sequence or throws an error if it's empty.
iter(input).head();

// Returns number = 5. The first element in the sequence or undefined if it's empty
iter(input).tryGetHead();

// Returns element at given index or throws an error if the index is out of bounds
iter(input).getAt(1);

// Returns element at given index or undefined if the index is out of bounds
iter(input).tryGetAt(1);

// Returns true if the iterable collection contains given value (equality check === is applied).
iter(input).contains(8);

// Produces Iterable<number> 5, 6, 7. Stops as soon as an element does not pass the condition.
iter(input).takeWhile(x => x < 8);


// *** Math functions ***
// Calculates sum - number = 26
iter(input).sum(x => x);

// Finds the smallest number = 5
iter(input).min(x => x);

// Finds the biggest number = 8
iter(input).max(x => x);


// *** Set functions ***
// Produces Iterable<number> = 5, 8
iter(input).intersect([5, 8, 10]);

// Produces Iterable<number> = 6, 7
iter(input).except([5, 8, 10]);


/*** Restructuring functions ***/
// Produces a groupping object { big: [7, 8]; small: [5, 6] }, similar to .toMap function
iter(input).groupBy(x => x > 6 ? 'big' : 'small');
