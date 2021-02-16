import {is, to, split} from '../base'
import Container from './Container'
import List from './List'
import Dict from './Dict'


export default abstract class Mass extends Container<any, any> {
  public static new(container?: any): any {
    if(is.un(container)) return new MassConstructor()
    if(container instanceof Mass) return container
    if(container instanceof List || container instanceof Dict) return new MassConstructor(container)
    if(is.map(container)) return new MassConstructor(new Dict(container))
    if(is.iter(container)) return new MassConstructor(new List(container))
    if(is.obj(container)) return new MassConstructor(new Dict(container))
    return container
  }

  protected container: any

  protected constructor(container?: any) {
    super(container)
  }

  protected relocate(key: any): [any, any] {
    if(is.str(key)) key = split(key)
    if(!is.arr(key)) key = to.arr(key)
    if(!to.bool(key)) return [this, null]
    let curr = this
    let i = 0
    for(; i < key.length-1; i++) {
      let k = key[i]
      k = curr.init(k)
      let next = curr._get(k)
      if(is.un(next)) {
        next = Mass.new()
        curr._set(k, next)
      }
      curr = next
    }
    let k = key[i]
    k = curr.init(k)
    return [curr, k]
  }
  protected reg(val: any): any {
    return Mass.new(val)
  }
  protected init(key: any): void {
    if(is.un(this.container)) {
      if(is.un(key) || is.num(key) || is.str(key) && !is.nan(Number(key)))
        this.container = new List<any>()
      else this.container = new Dict<any, any>()
    }
    if(this.container instanceof List && is.str(key)) {
      if(key === '') key = null
      else key = Number(key)
    }
    return key
  }

  protected _get(key: any): any {
    return this.container.get(key)
  }
  protected _set(key: any, val: any): void {
    this.container.set(key, val)
  }
  protected _del(key: any): void {
    this.container.del(key)
  }

  protected _splice(key: any, num: number, ...vals: any[]): any[] {
    return this.container.splice(key, num, ...vals)
  }

  protected _merge(args: object): void {
    if(is.arr(args)) {
      const t = []
      for(const v of args) {
        if(is.obj(v)) {
          const m = Mass.new()
          m._merge(v)
          t.push(m)
        } else t.push(v)
      }
      this.init(null)
      this.splice(null, 0, ...t)
    } else for(const key in args) {
      const [c, k] = this.relocate(key)
      const v = args[key]

      if(is.un(k) && c.container instanceof List) c._merge(v)
      else if(is.obj(v)) {
        const t = c._get(k)
        if(t instanceof Mass) t._merge(v)
        else {
          const m = Mass.new()
          m._merge(v)
          c._set(k, m)
        }
      } else c._set(k, Mass.new(v))
    }
  }
}

class MassConstructor extends Mass {
  public constructor(container?: any) {
    super(container)
    if(this.container instanceof List)
      for(const i in this.container.container)
        this.container.container[i] = Mass.new(this.container.container[i])
    else if(this.container instanceof Dict)
      for(const [k, v] of this.container.container)
        this.container.container.set(k, Mass.new(v))
  }
}
