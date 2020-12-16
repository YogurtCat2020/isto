import {is, to, sym, sugar, err} from './base'


export default abstract class Decor {
  public static new(...args: any[]): Decor {
    return this._new(...to.obj(args))
  }
  protected static _new(...args: any[]): Decor {
    if(args.length<=0) return decorNull
    else if(args.length==1) {
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

  public decor<T>(x: T): T {
    return err.notImplemented()
  }
}

class DecorNull extends Decor {
  public constructor() {
    super()
  }

  public [sym.bool](): boolean {
    return false
  }

  public decor<T>(x: T): T {
    return x
  }
}
class DecorAtom extends Decor {
  private readonly func: <T>(x: T) => T

  public constructor(func: <T>(x: T) => T) {
    super()
    this.func = func
  }

  public [sym.bool](): boolean {
    return true
  }

  public decor<T>(x: T): T {
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

  public decor<T>(x: T): T {
    for(const decor of this.decors) x = decor.decor(x)
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

  public decor<T>(x: T): T {
    x = this.before.decor(x)
    if(!is.un(this.decors)) x = this.decors.decor(x)
    x = this.after.decor(x)
    return x
  }

  public up(...args: any[]): void {
    if(is.un(this.decors)) this.decors = Decor.new(...args)
  }
}

const decorNull = new DecorNull()
