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
