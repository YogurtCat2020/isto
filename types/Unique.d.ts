export default class Unique {
    private readonly key2subKeys;
    private readonly subKey;
    constructor(subKey: () => string);
    put(key: string): string;
    pick(key: string, subKey: string): void;
}
