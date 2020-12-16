import Container from './Container';
export default class Dict<K, V> extends Container<K, V> {
    readonly container: Map<K, V>;
    constructor(container?: any);
    protected _get(key: K): V;
    protected _set(key: K, val: V): void;
    protected _del(key: K): void;
    protected _merge(args: object): void;
}
