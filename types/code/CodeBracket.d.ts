import Code from './Code';
export default abstract class CodeBracket extends Code {
    protected constructor(args: {
        code: any;
    }, bracket: string);
}
export declare class CodeBracketRound extends CodeBracket {
    constructor(args: object);
}
export declare class CodeBracketSquare extends CodeBracket {
    constructor(args: object);
}
export declare class CodeBracketCurly extends CodeBracket {
    constructor(args: object);
}
