import is from './is'


export type decorator = (obj: any) => any

export default new (class {
  public readonly $ = (x: any, ...funcs: decorator[]): any => {
    for(let func of funcs) {
      if(is.un(func)) continue
      let t = func(x)
      if(!is.un(t)) x = t
    }
    return x
  }

  public readonly obj = new (class {
    public readonly add = (attr: string, val: any): decorator => x => {
      if(is.un(x[attr])) {
        if(is.func(val)) val = val()
        x[attr] = val
      }
    }
    public readonly get = (attr: string): decorator => x => x[attr]
    public readonly set = (attr: string, val: any): decorator => x => {
      x[attr] = val
    }
  })()

  public readonly cls = new (class {
    public readonly hasMeth = (cls: any, name: string) => decorClsHasMeth(cls, name)
    public readonly newMeth = (func: any, args?: {
      writable?: boolean,
      enumerable?: boolean,
      configurable?: boolean
    }) => decorClsNewMeth(func, args)
    public readonly setMeth = (cls: any, name: string, meth: any) => decorClsSetMeth(cls, name, meth)

    public readonly applyParam = (decor: any, cls: any, name: string, indx: number) => decorClsApplyParam(decor, cls, name, indx)
    public readonly applyMeth = (decor: any, cls: any, name: string, meth: any) => decorClsApplyMeth(decor, cls, name, meth)
    public readonly applyClass = (decor: any, cls: any) => decorClsApplyClass(decor, cls)
  })()
})()

export function decorClsHasMeth(cls: any, name: string): boolean {
  return cls.prototype.hasOwnProperty(name)
}
export function decorClsNewMeth(func: any, args?: {
  writable?: boolean,
  enumerable?: boolean,
  configurable?: boolean
}): any {
  let {writable, enumerable, configurable} = args || {}
  writable = writable || true
  enumerable = enumerable || false
  configurable = configurable || true

  return {
    value: func,
    writable,
    enumerable,
    configurable
  }
}
export function decorClsSetMeth(cls: any, name: string, meth: any): void {
  Object.defineProperty(cls.prototype, name, meth)
}

export function decorClsApplyParam(decor: any, cls: any, name: string, indx: number): void {
  decor(cls.prototype, name, indx)
}
export function decorClsApplyMeth(decor: any, cls: any, name: string, meth: any): any {
  return decor(cls.prototype, name, meth) || meth
}
export function decorClsApplyClass(decor: any, cls: any): any {
  return decor(cls) || cls
}
