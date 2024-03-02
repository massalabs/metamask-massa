export type Handler<T, O> = (params: T) => Promise<O>;
