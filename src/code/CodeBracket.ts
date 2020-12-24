import {sugar} from '../base'
import Code from './Code'


export default abstract class CodeBracket extends Code {
  protected constructor(args: {code: any}, bracket: string) {
    const {template, T, codes, code, C, ...rem} = <any> sugar(args, {
      template: 'T',
      code: 'C'
    })

    super(Code.new({
      template: bracket,
      codes: [code],
      ...rem
    }).code)
  }
}


export class CodeBracketRound extends CodeBracket {
  public constructor(args: object) {
    super(<any> args, `(@)`)
  }
}

export class CodeBracketSquare extends CodeBracket {
  public constructor(args: object) {
    super(<any> args, `[@]`)
  }
}

export class CodeBracketCurly extends CodeBracket {
  public constructor(args: object) {
    super(<any> args, `{@}`)
  }
}


Code.extension.set('()', x => new CodeBracketRound(x))
Code.extension.set('[]', x => new CodeBracketSquare(x))
Code.extension.set('{}', x => new CodeBracketCurly(x))
