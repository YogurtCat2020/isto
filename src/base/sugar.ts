import is from './is'


export default function(args: object, keys: object): object {
  for(const k in keys) {
    const s = keys[k]
    if(is.un(args[k])) args[k] = args[s]
  }
  return args
}
