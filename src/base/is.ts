
export default new (class {
  public readonly undef = (x: any): x is undefined => {
    return x === undefined
  }
  public readonly null = (x: any): x is null => {
    return x === null
  }
  public readonly un = (x: any): x is undefined|null => {
    return this.undef(x) || this.null(x)
  }

  public readonly bool = (x: any): x is boolean => {
    return typeof x === 'boolean'
  }
  public readonly false = (x: any): x is boolean => {
    return x === false
  }
  public readonly true = (x: any): x is boolean => {
    return x === true
  }

  public readonly num = (x: any): x is number => {
    return typeof x === 'number'
  }
  public readonly int = (x: any): x is number => {
    return Number.isInteger(x)
  }
  public readonly real = (x: any): x is number => {
    return this.fin(x) || this.nan(x)
  }
  public readonly fin = (x: any): x is number => {
    return Number.isFinite(x)
  }
  public readonly nan = (x: any): x is number => {
    return Number.isNaN(x)
  }

  public readonly str = (x: any): x is string => {
    return typeof x === 'string'
  }
  public readonly sym = (x: any): x is symbol => {
    return typeof x === 'symbol'
  }

  public readonly func = (x: any): x is Function => {
    return typeof x === 'function'
  }
  public readonly type = (x: any): x is Function => {
    return this.func(x)
  }

  public readonly obj = (x: any): x is object => {
    return typeof x === 'object' && !this.null(x)
  }

  public readonly iter = (x: any): any => {
    return this.obj(x) && Symbol.iterator in x
  }
  public readonly arr = (x: any): x is Array<any> => {
    return Array.isArray(x)
  }
  public readonly set = (x: any): x is Set<any> => {
    return x instanceof Set
  }
  public readonly map = (x: any): x is Map<any, any> => {
    return x instanceof Map
  }
})()
