export default abstract class Decor {
    static new(...args: any[]): Decor;
    protected static _new(...args: any[]): Decor;
    decor<T>(x: T): T;
}
