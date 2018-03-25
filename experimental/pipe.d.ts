export function pipe<TInput, TResult>(
    source: IterableIterator<TInput> | TInput[],
    op0: (src: IterableIterator<TInput>) => TResult) : TResult;

export function pipe<TInput, TOp0, TResult>(
    source: IterableIterator<TInput> | TInput[],
    op0: (src: IterableIterator<TInput>) => IterableIterator<TOp0>,
    op1: (src: IterableIterator<TOp0>) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TResult>(
    source: IterableIterator<TInput> | TInput[],
    op0: (src: IterableIterator<TInput>) => IterableIterator<TOp0>,
    op1: (src: IterableIterator<TOp0>) => IterableIterator<TOp1>,
    op2: (src: IterableIterator<TOp1>) => TResult) : TResult;

export function pipe<TInput, TOp0, TOp1, TOp2, TResult>(
    source: IterableIterator<TInput> | TInput[],
    op0: (src: IterableIterator<TInput>) => IterableIterator<TOp0>,
    op1: (src: IterableIterator<TOp0>) => IterableIterator<TOp1>,
    op2: (src: IterableIterator<TOp1>) => IterableIterator<TOp2>,
    op3: (src: IterableIterator<TOp2>) => TResult) : TResult;
