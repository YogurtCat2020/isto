import is from './is'


export default function(x: any, a: string|symbol): x is Function|object {
  return (is.func(x) || is.obj(x)) && a in x
}

export function funcHas(x: any, a: string|symbol): x is Function {
  return is.func(x) && a in x
}
export function objHas(x: any, a: string|symbol): x is object {
  return is.obj(x) && a in x
}
