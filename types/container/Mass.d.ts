import Container from './Container';
export default abstract class Mass extends Container<any, any> {
    static new(container?: any): any;
    protected container: any;
    protected constructor(container?: any);
    protected relocate(key: any): [any, any];
    protected reg(val: any): any;
    protected init(key: any): void;
    protected _get(key: any): any;
    protected _set(key: any, val: any): void;
    protected _del(key: any): void;
    protected _splice(key: any, num: number, ...vals: any[]): any[];
    protected _merge(args: object): void;
}
