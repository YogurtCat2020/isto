import Decor from '../Decor'


export default function(attr) {
  return function(cls: any): any {
    cls.prototype[attr] = function(...args: any[]): any {
      return Decor.new(...args).decor(this)
    }
    return cls
  }
}
