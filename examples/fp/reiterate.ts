import { pipe, prepare } from '../../fp/pipe';
import { iterate, map, filter, toReadonlyArray, toArray } from '../../fp';

const input = [5, 2, 9, 4, 0, 3, 6, 4];

let orig = prepare(
    input,
    map(x => x * 2)
);

console.log(toReadonlyArray(orig()));
console.log(toReadonlyArray(orig()));

const rep = prepare(orig(), filter(x => x > 11));
console.log(toArray(rep()));
console.log(toArray(rep()));
