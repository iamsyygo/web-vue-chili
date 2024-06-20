type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type UnPromisifyData<Api extends (...args: any) => Promise<any>> = UnPromisify<ReturnType<Api>>;
