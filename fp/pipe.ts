export function pipe<TInput, TResult>(
    source: TInput,
    op0: (src: TInput) => TResult) : TResult;

export function pipe<TInput, TOp0, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TOp7, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TOp7,
    op8: (src: TOp7) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TOp7, TOp8, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TOp7,
    op8: (src: TOp7) => TOp8,
    op9: (src: TOp8) => TResult) : TResult;

export function pipe(input: any, ...ops: any[]) {
    let result = input;

    for (const operation of ops) {
        result = operation(result);
    }

    return result;
}

// ----------------------------------------------------------------------------------------------

export function prepare<TInput, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TOp7, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TOp7,
    op8: (src: TOp7) => TResult) : () => TResult;

export function prepare<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TOp6, TOp7, TOp8, TResult>(
    source: Iterable<TInput>,
    op0: (src: IterableIterator<TInput>) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TOp6,
    op7: (src: TOp6) => TOp7,
    op8: (src: TOp7) => TOp8,
    op9: (src: TOp8) => TResult) : () => TResult;

export function prepare<T>(input: Iterable<T>, ...ops: any[]) {
    return function() {
        let result = input[Symbol.iterator]();

        for (const operation of ops) {
            result = operation(result);
        }

        return result;
    }
}
