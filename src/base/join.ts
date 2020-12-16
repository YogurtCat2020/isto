import is from './is'
import to from './to'


export default function(arr: any, sep?: string): string {
  if(is.un(sep)) sep = ''
  return [...to.iter(arr)].join(sep)
}
