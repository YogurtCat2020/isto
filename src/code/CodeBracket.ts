import {sugar} from '../base'
import Code from './Code'


export default abstract class CodeBracket extends Code {
  protected constructor(args: {codes: any}, bracket: string) {
    const {template, T, codes, C, ...rem} = <any> sugar(args, {
      template: 'T',
      codes: 'C'
    })

    super(Code.new({
      template: bracket,
      codes: [codes],
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
