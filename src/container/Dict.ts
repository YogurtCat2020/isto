import {to} from '../base'
import Container from './Container'


export default class Dict<K, V> extends Container<K, V> {
  public readonly container: Map<K, V>

  public constructor(container?: any) {
    super(to.map(container))
  }

  protected _get(key: K): V {
    return this.container.get(key)
  }
  protected _set(key: K, val: V): void {
    this.container.set(key, val)
  }
  protected _del(key: K): void {
    this.container.delete(key)
  }

  protected _merge(args: object): void {
    for(const k in args) this._set(<any> k, args[k])
  }
}
