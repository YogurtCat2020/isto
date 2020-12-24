import is from './is'
import to from './to'


export default function(str: string): string[] {
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
      if(c === ' ') {
        r.push(str.slice(p, i))
        p = null
      }
    } else if(c !== ' ') p = i
  }
  if(!is.un(p)) r.push(str.slice(p, str.length))
  return r
}
