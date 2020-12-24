import {sugar} from '../base'
import Code from './Code'


export default class CodeClosure extends Code {
  public constructor(args: {template: string, code: any}) {
    const {template, T, codes, code, C, ...rem} = <any> sugar(args, {
      template: 'T',
      code: 'C'
    })

    super(Code.new({
      template: template,
      codes: [code],
      ...rem
    }).code)
  }
}


Code.extension.set('closure', x => new CodeClosure(x))
Code.extension.set('C', x => new CodeClosure(x))
