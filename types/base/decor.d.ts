export declare type decorator = (obj: any) => any;
declare const _default: {
    readonly $: (x: any, ...funcs: decorator[]) => any;
    readonly obj: {
        readonly add: (attr: string, val: any) => decorator;
        readonly get: (attr: string) => decorator;
        readonly set: (attr: string, val: any) => decorator;
    };
    readonly cls: {
        readonly hasMeth: (cls: any, name: string) => boolean;
        readonly newMeth: (func: any, args?: {
            writable?: boolean;
            enumerable?: boolean;
            configurable?: boolean;
        }) => any;
        readonly setMeth: (cls: any, name: string, meth: any) => void;
        readonly applyParam: (decor: any, cls: any, name: string, indx: number) => void;
        readonly applyMeth: (decor: any, cls: any, name: string, meth: any) => any;
        readonly applyClass: (decor: any, cls: any) => any;
    };
};
export default _default;
