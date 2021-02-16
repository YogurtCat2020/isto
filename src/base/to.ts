import is from './is'
import sym from './sym'
import {objHas} from './util'


export default new (class {
  public readonly type = (x?: any): Function => {
    if(is.un(x)) return null
    if(is.bool(x)) return Boolean
    if(is.num(x)) return Number
    if(is.str(x)) return String
    if(is.sym(x)) return Symbol
    return x.constructor
  }
  public readonly obj = (x?: any): any => {
    if(objHas(x, sym.obj)) return x[sym.obj]()
    if(is.map(x)) {
      const r = {}
      for(let [k, v] of x) {
        if(!(is.str(k) || is.sym(k))) k = String(k)
        r[k] = this.obj(v)
      }
      return r
    }
    if(is.iter(x)) {
      const r = []
      for(const i of x) r.push(this.obj(i))
      return r
    }
    if(is.obj(x)) {
      const r = {}
      for(const k in x) r[k] = this.obj(x[k])
      return r
    }
    return x
  }
  public readonly str = (x?: any, ...args: any[]): string => {
    if(objHas(x, sym.str)) return x[sym.str](...args)

    const strToKey = (x: string): string => {
      const r = x.match(/^[$A-Za-z_][$0-9A-Za-z_]*$/)
      if(!is.un(r)) return x
      return strToStr(x)
    }
    const strToStr = (x: string): string => {
      let q: string
      if(this.has(x, '\n')) {
        q = '`'
        x = x.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
      }
      else if(!this.has(x, "'")) q = "'"
      else if(!this.has(x, '"')) q = '"'
      else if(!this.has(x, '`')) q = '`'
      else {
        q = "'"
        x = x.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      }
      return q+x+q
    }
    const objToStr = (x: object, n: number): string => {
      n += 1
      const ind_in = ' '.repeat(2*n)
      const ind_out = ' '.repeat(2*(n-1))
      if(is.arr(x)) return '['+x
        .map(i => '\n'+ind_in+toStr(i, n))
        .join(',')+'\n'+ind_out+']'
      return '{'+this.arr(x)
        .map(([k, v]) => '\n'+ind_in+strToKey(k)+': '+toStr(v, n))
        .join(',')+'\n'+ind_out+'}'
    }
    const toStr = (x: any, n: number): string => {
      if(is.str(x)) return strToStr(x)
      if(is.obj(x)) return objToStr(x, n)
      return String(x)
    }

    let [n] = args
    if(is.un(n)) n = 0
    return toStr(this.obj(x), n)
  }

  public readonly bool = (x?: any): boolean => {
    if(objHas(x, sym.bool)) return x[sym.bool]()
    if(is.un(x)) return false
    if(is.bool(x)) return x
    if(is.num(x)) return x !== 0
    if(is.str(x) || is.arr(x)) return x.length>0
    if(is.set(x) || is.map(x)) return x.size>0
    if(is.obj(x)) {
      for(const k in x) return true
      return false
    }
    return true
  }
  public readonly size = (x?: any): number => {
    if(objHas(x, sym.size)) return x[sym.size]()
    if(is.str(x) || is.arr(x)) return x.length
    if(is.set(x) || is.map(x)) return x.size
    if(is.obj(x)) {
      let r = 0
      for(const k in x) r += 1
      return r
    }
    return null
  }
  public readonly has = (x: any, i:any): boolean => {
    if(objHas(x, sym.has)) return x[sym.has](i)
    if(is.str(x)) {
      if(is.str(i)) return x.indexOf(i) >= 0
      return false
    }
    if(is.arr(x)) return x.indexOf(i) >= 0
    if(is.set(x)) return x.has(i)
    if(is.map(x)) return !is.un(x.get(i))
    if(is.obj(x)) return i in x
    return false
  }

  public readonly iter = (x?: any): Generator<any> => {
    if(objHas(x, sym.iter)) return x[sym.iter]()
    if(is.iter(x)) return x[Symbol.iterator]()
    return (function*(x) {
      if(is.un(x)) return
      else if(is.obj(x))
        for(const k in x) yield [k, x[k]]
      else yield x
    })(x)
  }
  public readonly vki = (x?: any): Generator<[v: any, k: any, i: number]> => {
    if(objHas(x, sym.vki)) return x[sym.vki]()
    return (function*(x): any {
      if(is.un(x)) return
      if(is.map(x)) {
        let i = 0
        for(const [k, v] of x) {
          yield [v, k, i]
          i++
        }
      } else if(is.iter(x)) {
        let i = 0
        for(const v of x) {
          yield [v, i, i]
          i++
        }
      } else if(is.obj(x)) {
        let i = 0
        for(const k in x) {
          yield [x[k], k, i]
          i++
        }
      } else yield [x, 0, 0]
    })(x)
  }

  public readonly arr = (x?: any): any[] => {
    return [...this.iter(x)]
  }
  public readonly set = (x?: any): Set<any> => {
    return new Set(this.iter(x))
  }
  public readonly map = (x?: object): Map<any, any> => {
    return new Map(this.iter(x))
  }
})()
