import {List, Dict} from '../container'


export default new (class {
  public readonly bool = (): boolean => false
  public readonly num = (): number => 0
  public readonly str = (): string => ''
  public readonly sym = (): symbol => Symbol()
  public readonly func = () => () => {}
  public readonly obj = (): object => ({})
  public readonly arr = <T>(): T[] => []
  public readonly set = <T>(): Set<T> => new Set<T>()
  public readonly map = <K, V>(): Map<K, V> => new Map<K, V>()
  public readonly list = <T>(): List<T> => new List<T>()
  public readonly dict = <K, V>(): Dict<K, V> => new Dict<K, V>()
})()
