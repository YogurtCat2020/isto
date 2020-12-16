import CodeVar from './CodeVar';
export default abstract class CodeContainer extends CodeVar {
    protected constructor(args: object, initClosure: string, initItem: string, codeInitItem: (v: any, k: any, i: number) => any);
}
export declare class CodeList extends CodeContainer {
    constructor(args: object);
}
export declare class CodeDict extends CodeContainer {
    constructor(args: any);
}
export declare class CodeSet extends CodeContainer {
    constructor(args: object);
}
export declare class CodeArr extends CodeContainer {
    constructor(args: object);
}
export declare class CodeMap extends CodeContainer {
    constructor(args: any);
}
export declare class CodeObj extends CodeContainer {
    constructor(args: any);
}
