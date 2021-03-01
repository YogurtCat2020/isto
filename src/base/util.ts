import is from './is'
import to from './to'
import err from './err'


export function has(x: any, attr: string|symbol): x is Function|object {
  return (is.func(x) || is.obj(x)) && attr in x
}
export function funcHas(x: any, attr: string|symbol): x is Function {
  return is.func(x) && attr in x
}
export function objHas(x: any, attr: string|symbol): x is object {
  return is.obj(x) && attr in x
}

export function* map<T>(x: any, func: (v: any, k: any, i: number) => T): Generator<T> {
  for(const [v, k, i] of to.vki(x)) yield func(v, k, i)
}
export function join(arr: any, sep?: string): string {
  if(is.un(sep)) sep = ''
  return [...to.iter(arr)].join(sep)
}
export function split(str: string): string[] {
  const r = []
  let q = null
  let p = null
  for(let i = 0; i < str.length; i++) {
    const c = str.charAt(i)
    if(!is.un(q)) {
      if(c === '\\') i++
      else if(c === q) {
        r.push(eval(str.slice(p, i+1)))
        q = null
        p = null
      }
    } else if(to.has('\'"`', c)) {
      q = c
      p = i
    } else if(!is.un(p)) {
      if(to.has(' \n', c)) {
        r.push(str.slice(p, i))
        p = null
      }
    } else if(!to.has(' \n', c)) p = i
  }
  if(!is.un(p)) r.push(str.slice(p))
  return r
}
export function line(str?: string, num?: number): string {
  if(is.un(str)) str = '-'
  if(is.un(num)) num = 64
  return str.repeat(num)
}

export function sugar(args: object, keys: object): object {
  for(const k in keys) {
    const s = keys[k]
    if(is.un(args[k])) args[k] = args[s]
  }
  return args
}

export function promisify<T>(func: Function) {
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      func(...args, (err, ret) => {
        if(is.un(err)) resolve(ret)
        else reject(err)
      })
    })
  }
}

export function assert(cdt: boolean, msg?: string): void {
  if(!cdt) {
    if(is.un(msg)) err.assertionFail()
    else err.$(msg)
  }
}
