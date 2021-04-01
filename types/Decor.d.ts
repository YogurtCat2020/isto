export default abstract class Decor {
    static new(...args: any[]): Decor;
    protected static _new(...args: any[]): Decor;
    $(x: any): any;
    up(...args: any[]): Decor;
    static decor(name: string): any;
}
