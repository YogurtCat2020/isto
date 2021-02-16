import {List, Dict} from '../container'


export default new (class {
  public readonly bool = () => false
  public readonly num = () => 0
  public readonly str = () => ''
  public readonly sym = () => Symbol()
  public readonly func = () => () => {}
  public readonly obj = () => ({})
  public readonly arr = <T>(): T[] => []
  public readonly set = <T>() => new Set<T>()
  public readonly map = <K, V>() => new Map<K, V>()
  public readonly list = <T>() => new List<T>()
  public readonly dict = <K, V>() => new Dict<K, V>()
})()
