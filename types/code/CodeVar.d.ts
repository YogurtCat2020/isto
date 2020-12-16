import Code from './Code';
export default class CodeVar extends Code {
    constructor(args: {
        closure?: string;
        variable?: boolean;
        name?: string;
        init: any;
        opr?: any[];
    }, codeInit?: (init: any) => any);
}
