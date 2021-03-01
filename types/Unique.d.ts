export declare type subKey = () => string;
export default class Unique {
    private readonly key2subKeys;
    private readonly subKey;
    constructor(subKey: subKey);
    put(key: string): string;
    pick(key: string, subKey: string): void;
}
