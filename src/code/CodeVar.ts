import {is, to, sugar} from '../base'
import Code from './Code'


export default class CodeVar extends Code {
  public constructor(args: {closure?: string, variable?: boolean, name?: string, init: any, opr?: any[]},
                     codeInit?: (init: any) => any) {
    let {template, T, codes, closure, C, variable, V, name, N, init, I, opr, O, ...rem} = <any> sugar(args, {
      template: 'T',
      closure: 'C',
      variable: 'V',
      name: 'N',
      init: 'I',
      opr: 'O'
    })

    if(is.un(closure)) closure = `(()=>{@})()`
    if(is.un(variable)) variable = false
    if(is.un(name)) name = 'R'

    if(is.un(codeInit)) codeInit = init => init

    if(!to.bool(opr)) super(Code.new({
      template: '@',
      codes: [codeInit(init)],
      ...rem
    }).$)
    else super(Code.new({
      template: closure,
      codes: [{
        template: `@ @ = @\n@\nreturn @`,
        codes: [
          variable? 'let': 'const',
          name,
          codeInit(init),
          opr,
          name
        ]
      }],
      ...rem
    }).$)
  }
}

Code.extension.set('var', x => new CodeVar(x))
Code.extension.set('V', x => new CodeVar(x))
