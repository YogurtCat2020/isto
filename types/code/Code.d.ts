import { Dict } from '../container';
export default abstract class Code {
    static readonly extension: Dict<any, (x: any) => any>;
    static new(...args: any[]): Code;
    protected static _new(...args: any[]): Code;
    private readonly code;
    protected constructor(code: string);
    toString(): string;
    get $(): string;
}
