/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TResult>(
    source: TInput,
    op0: (src: TInput) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TOp1, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TOp1, TOp2, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
export function pipe<TInput, TOp0, TOp1, TOp2, TOp3, TOp4, TOp5, TResult>(
    source: TInput,
    op0: (src: TInput) => TOp0,
    op1: (src: TOp0) => TOp1,
    op2: (src: TOp1) => TOp2,
    op3: (src: TOp2) => TOp3,
    op4: (src: TOp3) => TOp4,
    op5: (src: TOp4) => TOp5,
    op6: (src: TOp5) => TResult) : TResult;

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
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

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
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

/**
 * General purpose piping function (replacement for missing operator |> in JavaScript).<br/>
 * Takes a parameters and passes it to the first function in the pipeline. Then passes the result to
 * the second function, thrid function, ...<br/>
 * Similar to `input |> fn1 |> fn2 |> fnX`
 */
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
