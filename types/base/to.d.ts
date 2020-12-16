declare const _default: {
    readonly type: (x?: any) => Function;
    readonly obj: (x?: any) => any;
    readonly str: (x?: any, ...args: any[]) => string;
    readonly bool: (x?: any) => boolean;
    readonly size: (x?: any) => number;
    readonly has: (x: any, i: any) => boolean;
    readonly iter: (x?: any) => Generator<any>;
    readonly vki: (x?: any) => Generator<[v: any, k: any, i: number]>;
    readonly arr: (x?: any) => any[];
    readonly set: (x?: any) => Set<any>;
    readonly map: (x?: object) => Map<any, any>;
};
export default _default;
