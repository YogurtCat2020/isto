import to from './to'


export default function*<T>(x: any, func: (v: any, k: any, i: number) => T): Generator<T> {
  for(const [v, k, i] of to.vki(x)) yield func(v, k, i)
}
