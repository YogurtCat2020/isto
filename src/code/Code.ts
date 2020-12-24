import {is, to, sym, sugar, asrt} from '../base'
import {Dict} from '../container'


export default abstract class Code {
  public static readonly extension = new Dict<any, (x: any) => any>()

  public static new(...args: any[]): Code {
    return this._new(...to.obj(args))
  }
  protected static _new(...args: any[]): Code {
    if(args.length <= 0) return codeNull
    else if(args.length == 1) {
      let [arg] = args
      if(arg instanceof Code) return arg
      if(is.un(arg)) return codeNull
      if(is.str(arg)) return new CodeAtom(arg)
      if(is.arr(arg)) return new CodeChain(arg)
      if(is.obj(arg)) {
        let {extension, X, ...rem} = <any> sugar(arg, {
          extension: 'X'
        })
        if(!is.un(extension)) {
          extension = this.extension.get(extension)
          if(is.un(extension)) return codeNull
          return extension(rem)
        }
        return new CodeTree(<any> rem)
      }
    } else return new CodeChain(args)
  }

  public readonly code: string

  protected constructor(code: string) {
    this.code = code
  }

  public [sym.obj](): object {
    return this
  }
  public [sym.str](): string {
    return this.code
  }
  public [sym.bool](): boolean {
    return to.bool(this.code)
  }

  public toString(): string {
    return this.code
  }
}

class CodeNull extends Code {
  public constructor() {
    super('')
  }
}
class CodeAtom extends Code {
  public constructor(code: string) {
    super(code)
  }
}
class CodeChain extends Code {
  public constructor(args: any[]) {
    super(args.map(i => i instanceof Code? i: Code._new(i)).join('\n'))
  }
}
class CodeTree extends Code {
  public constructor(args: {template: string, codes: any[], placeholder?: string|RegExp}) {
    let {template, codes, placeholder} = <any> sugar(args, {
      template: 'T',
      codes: 'C',
      placeholder: 'P'
    })

    if(is.un(placeholder)) placeholder = '@'
    asrt(to.bool(placeholder), 'placeholder不能为空字符串！')

    const templates = template.split(placeholder)

    const t = []
    for(let i = 0; i < templates.length-1; i++) {
      const code = codes[i]
      t.push(templates[i])
      t.push(code instanceof Code? code: Code._new(code))
    }
    t.push(templates[templates.length-1])

    super(t.join(''))
  }
}

const codeNull = new CodeNull()
