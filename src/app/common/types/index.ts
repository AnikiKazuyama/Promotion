// eslint-disable-next-line
export type AnyType = any;
export type AnyArgumentsFunction = <R = void>(...args: Array<AnyType>) => R;

export type AnyArgumentsPromiseFunction<R> = (...args: any[]) => Promise<R>;
