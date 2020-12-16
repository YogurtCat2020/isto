import {is, to} from '../base'
import Container from './Container'


export default class List<T> extends Container<number, T> {
  public readonly container: T[]

  public constructor(container?: any) {
    super(to.arr(container))
  }

  protected relocate(key: number): [List<T>, number] {
    if(is.un(key)) key = this.size
    else if(key > this.size) key = this.size
    else if(key < 0) {
      key = this.size+key
      if(key < 0) key = 0
    }
    return [this, key]
  }

  protected _get(key: number): T {
    return this.container[key]
  }
  protected _set(key: number, val: T): void {
    this.container[key] = val
  }
  protected _del(key: number): void {
    delete this.container[key]
  }

  protected _splice(key: number, num: number, ...vals: T[]): T[] {
    return this.container.splice(key, num, ...vals)
  }

  protected _merge(args: object): void {
    if(is.arr(args)) this._splice(this.size, 0, ...args)
    else for(const k in args) {
      if(k === '') this._splice(this.size, 0, ...args[k])
      else this.set(Number(k), args[k])
    }
  }
}
