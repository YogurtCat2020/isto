import Container from './Container';
export default class List<T> extends Container<number, T> {
    readonly container: T[];
    constructor(container?: any);
    protected relocate(key: number): [List<T>, number];
    protected _get(key: number): T;
    protected _set(key: number, val: T): void;
    protected _del(key: number): void;
    protected _splice(key: number, num: number, ...vals: T[]): T[];
    protected _merge(args: object): void;
}
