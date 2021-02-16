import { List, Dict } from '../container';
declare const _default: {
    readonly bool: () => boolean;
    readonly num: () => number;
    readonly str: () => string;
    readonly sym: () => symbol;
    readonly func: () => () => void;
    readonly obj: () => {};
    readonly arr: <T>() => T[];
    readonly set: <T_2>() => Set<T_2>;
    readonly map: <K, V>() => Map<K, V>;
    readonly list: <T_3>() => List<T_3>;
    readonly dict: <K_1, V_1>() => Dict<K_1, V_1>;
};
export default _default;
