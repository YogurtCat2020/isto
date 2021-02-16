import {is, to, sym, err} from '../base'
import Decor from '../Decor'


export default abstract class Container<K, V> {
  protected readonly container: any

  protected constructor(container?: any) {
    this.container = container
  }

  public [sym.obj](): object {
    return this.obj
  }
  public [sym.str](...args: any[]): string {
    return this.str(...args)
  }
  public [sym.bool](): boolean {
    return this.bool
  }
  public [sym.size](): number {
    return this.size
  }
  public [sym.has](item: any): boolean {
    return this.has(item)
  }
  public [sym.iter](): Generator<any> {
    return this.iter
  }
  public [sym.vki](): Generator<[V, K, number]> {
    return this.vki
  }

  public toString(): string {
    return this.str()
  }
  public [Symbol.iterator](): Generator<any> {
    return this.iter
  }

  public get obj(): object {
    return to.obj(this.container)
  }
  public str(...args: any[]): string {
    return to.str(this.container, ...args)
  }
  public get bool(): boolean {
    return this.size > 0
  }
  public get size(): number {
    return to.size(this.container)
  }
  public has(item: any): boolean {
    return to.has(this.container, item)
  }
  public get iter(): Generator<any> {
    return to.iter(this.container)
  }
  public get vki(): Generator<[V, K, number]> {
    return to.vki(this.container)
  }

  protected relocate(key: K): [Container<K, V>, K] {
    return [this, key]
  }
  protected reg(val: V): V {
    return val
  }

  protected _get(key: K): V {
    return err.notImplemented()
  }
  protected _set(key: K, val: V): void {
    err.notImplemented()
  }
  protected _del(key: K): void {
    err.notImplemented()
  }

  public get(key: K): V {
    const [c, k] = this.relocate(key)
    if(c !== this) return c.get(k)
    return c._get(k)
  }
  public set(key: K, val: V): Container<K, V> {
    const [c, k] = this.relocate(key)
    const v = this.reg(val)
    if(c !== this) c.set(k, v)
    else c._set(k, v)
    return this
  }
  public del(key: K): Container<K, V> {
    const [c, k] = this.relocate(key)
    if(c !== this) c.del(k)
    else c._del(k)
    return this
  }

  public take(key: K): V {
    const [c, k] = this.relocate(key)
    if(c !== this) return c.take(k)
    const r = c._get(k)
    c._del(k)
    return r
  }
  public replace(key: K, val: V): V {
    const [c, k] = this.relocate(key)
    const v = this.reg(val)
    if(c !== this) return c.replace(k, v)
    const r = c._get(k)
    c._set(k, v)
    return r
  }

  public enforce(key: K, val: V): V {
    const [c, k] = this.relocate(key)
    const v = this.reg(val)
    if(c !== this) return c.enforce(k, v)
    c._set(k, v)
    return v
  }

  protected _default_ensure(mode: boolean, key: K, val: V | (() => V)): V {
    const [c, k] = this.relocate(key)
    let v: any = () => this.reg(!is.func(val)? val: val())
    if(c !== this) return c._default_ensure(mode, k, v)
    const r = c._get(k)
    if(!is.un(r)) return r
    v = v()
    if(mode) c._set(k, v)
    return v
  }
  public default(key: K, val: V | (() => V)): V {
    return this._default_ensure(false, key, val)
  }
  public ensure(key: K, val: V | (() => V)): V {
    return this._default_ensure(true, key, val)
  }

  protected _splice(key: K, num: number, ...vals: V[]): V[] {
    return err.notImplemented()
  }
  public splice(key: K, num: number, ...vals: V[]): V[] {
    const [c, k] = this.relocate(key)
    const vs = vals.map(i => this.reg(i))
    if(c !== this) return c.splice(k, num, ...vs)
    return c._splice(k, num, ...vs)
  }

  protected _merge(args: object): void {
    err.notImplemented()
  }
  public merge(args: any): Container<K, V> {
    args = to.obj(args)
    this._merge(args)
    return this
  }

  public decor(...args: any[]): Container<K, V> {
    return Decor.new(...args).$(this)
  }
}
