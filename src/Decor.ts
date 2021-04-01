import {is, to, sym, decor, decorator, err, sugar} from './base'


export default abstract class Decor {
  public static new(...args: any[]): Decor {
    return this._new(...to.obj(args))
  }
  protected static _new(...args: any[]): Decor {
    if(args.length <= 0) return decorNull
    else if(args.length == 1) {
      let [arg] = args
      if(arg instanceof Decor) return arg
      if(is.un(arg)) return decorNull
      if(is.func(arg)) return new DecorAtom(arg)
      if(is.arr(arg)) return new DecorChain(arg)
      if(is.obj(arg)) return new DecorTree(arg)
    } else return new DecorChain(args)
  }

  public [sym.obj](): object {
    return this
  }
  public [sym.bool](): boolean {
    return err.notImplemented()
  }

  public $(x: any): any {
    return err.notImplemented()
  }

  public up(...args: any[]): Decor {
    err.notImplemented()
    return this
  }

  public static decor(name: string): any {
    return (cls: any): any => {
      const func = function(...args: any[]): any {
        return Decor.new(...args).$(this)
      }
      const meth =  decor.cls.newMeth(func)
      decor.cls.setMeth(cls, name, meth)
      return cls
    }
  }
}

class DecorNull extends Decor {
  public constructor() {
    super()
  }

  public [sym.bool](): boolean {
    return false
  }

  public $(x: any): any {
    return x
  }
}
class DecorAtom extends Decor {
  private readonly func: decorator

  public constructor(func: decorator) {
    super()
    this.func = func
  }

  public [sym.bool](): boolean {
    return true
  }

  public $(x: any): any {
    const r = this.func(x)
    if(is.un(r)) return x
    return r
  }
}
class DecorChain extends Decor {
  private readonly decors: Decor[]

  public constructor(args: any[]) {
    super()
    this.decors = args.map(i => i instanceof Decor? i: Decor._new(i))
  }

  public [sym.bool](): boolean {
    return to.bool(this.decors)
  }

  public $(x: any): any {
    for(const decor of this.decors) x = decor.$(x)
    return x
  }
}
class DecorTree extends Decor {
  private readonly before: Decor
  private readonly after: Decor
  private decors: Decor

  public constructor(args: {before?: any, after?: any}) {
    super()
    const {before, after} = <any> sugar(args, {
      before: 'B',
      after: 'A'
    })

    this.before = before instanceof Decor? before: Decor._new(before)
    this.after = after instanceof Decor? after: Decor._new(after)
  }

  public [sym.bool](): boolean {
    return to.bool(this.before) || to.bool(this.after) || to.bool(this.decors)
  }

  public $(x: any): any {
    x = this.before.$(x)
    if(!is.un(this.decors)) x = this.decors.$(x)
    x = this.after.$(x)
    return x
  }

  public up(...args: any[]): Decor {
    if(is.un(this.decors)) this.decors = Decor.new(...args)
    return this
  }
}

const decorNull = new DecorNull()
