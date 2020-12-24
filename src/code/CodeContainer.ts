import {to, map} from '../base'
import Code from './Code'
import CodeVar from './CodeVar'


export default abstract class CodeContainer extends CodeVar {
  protected constructor(args: object, initClosure: string, initItem: string,
                        codeInitItem: (v: any, k: any, i: number) => any) {
    super(<any> args, init => ({
      template: initClosure,
      codes: [map(init, (v, k, i) => ({
        template: initItem + (i+1 < to.size(init)? `,`: ``),
        codes: codeInitItem(v, k, i)
      }))]
    }))
  }
}


export class CodeList extends CodeContainer {
  public constructor(args: object) {
    super(args, `new List([@])`, `@`, v => [v])
  }
}

export class CodeDict extends CodeContainer {
  public constructor(args: any) {
    super(args, `new Dict({@})`, `@: @`, (v, k) => [k, v])
  }
}

export class CodeSet extends CodeContainer {
  public constructor(args: object) {
    super(args, `new Set([@])`, `@`, v => [v])
  }
}

export class CodeArr extends CodeContainer {
  public constructor(args: object) {
    super(args, `[@]`, `@`, v => [v])
  }
}

export class CodeMap extends CodeContainer {
  public constructor(args: any) {
    super(args, `to.map({@})`, `@: @`, (v, k) => [k, v])
  }
}

export class CodeObj extends CodeContainer {
  public constructor(args: any) {
    super(args, `{@}`, `@: @`, (v, k) => [k, v])
  }
}


Code.extension.set('list', x => new CodeList(x))
Code.extension.set('L', x => new CodeList(x))
Code.extension.set('dict', x => new CodeDict(x))
Code.extension.set('D', x => new CodeDict(x))
Code.extension.set('set', x => new CodeSet(x))
Code.extension.set('S', x => new CodeSet(x))
Code.extension.set('arr', x => new CodeArr(x))
Code.extension.set('A', x => new CodeArr(x))
Code.extension.set('map', x => new CodeMap(x))
Code.extension.set('M', x => new CodeMap(x))
Code.extension.set('obj', x => new CodeObj(x))
Code.extension.set('O', x => new CodeObj(x))
