import { List, Dict } from '../container';
declare const _default: {
    readonly bool: () => boolean;
    readonly num: () => number;
    readonly str: () => string;
    readonly sym: () => symbol;
    readonly func: () => () => void;
    readonly obj: () => object;
    readonly arr: <T>() => T[];
    readonly set: <T_2>() => Set<T_2>;
    readonly map: <K, V>() => Map<K, V>;
    readonly list: <T_4>() => List<T_4>;
    readonly dict: <K_2, V_2>() => Dict<K_2, V_2>;
};
export default _default;
