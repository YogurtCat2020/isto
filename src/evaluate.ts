import {
  is as _is,
  to as _to,
  sym as _sym,
  map as _map,
  join as _join,
  split as _split,
  has as _has,
  funcHas as _funcHas,
  objHas as _objHas,
  init as _init,
  sugar as _sugar,
  err as _err,
  asrt as _asrt,
} from './base'
import {
  Container as _Container,
  List as _List,
  Dict as _Dict,
  Mass as _Mass,
} from './container'
import {
  mount as _mount,
} from './mixin'
import {
  Code as _Code,
  CodeClosure as _CodeClosure,
  CodeBracket as _CodeBracket,
  CodeBracketRound as _CodeBracketRound,
  CodeBracketSquare as _CodeBracketSquare,
  CodeBracketCurly as _CodeBracketCurly,
  CodeVar as _CodeVar,
  CodeContainer as _CodeContainer,
  CodeList as _CodeList,
  CodeDict as _CodeDict,
  CodeSet as _CodeSet,
  CodeArr as _CodeArr,
  CodeMap as _CodeMap,
  CodeObj as _CodeObj,
} from './code'
import _Decor from './Decor'
import {
  print as _print,
  printObj as _printObj,
  printLine as _printLine,
} from './util'


const is = _is
const to = _to
const sym = _sym
const map = _map
const join = _join
const split = _split
const has = _has
const funcHas = _funcHas
const objHas = _objHas
const init = _init
const sugar = _sugar
const err = _err
const asrt = _asrt

const Container = _Container
const List = _List
const Dict = _Dict
const Mass = _Mass

const mount = _mount

const Code = _Code
const CodeClosure = _CodeClosure
const CodeBracket = _CodeBracket
const CodeBracketRound = _CodeBracketRound
const CodeBracketSquare = _CodeBracketSquare
const CodeBracketCurly = _CodeBracketCurly
const CodeVar = _CodeVar
const CodeContainer = _CodeContainer
const CodeList = _CodeList
const CodeDict = _CodeDict
const CodeSet = _CodeSet
const CodeArr = _CodeArr
const CodeMap = _CodeMap
const CodeObj = _CodeObj

const Decor = _Decor

const print = _print
const printObj = _printObj
const printLine = _printLine


export default function(code: any, context?: any, contextName?: string) {
  code = Code.new(code).code
  if(is.un(context)) return eval(code)
  if(is.un(contextName)) contextName = 'C'
  return eval(Code.new({
    template: `(@ => @)`,
    codes: [contextName, code]
  }).code)(context)
}


/*
const A = s => console.log(
  s.split('\n').map(i => i.trim()).filter(i => i[i.length-1]===',')
    .map(i => i.split(',')[0].trim()).map(i => `${i} as _${i},`)
    .join('\n')
)
const B = s => console.log(
  s.split('\n').map(i => i.trim()).filter(i => i[i.length-1]===',')
    .map(i => i.split(' as ')[0].trim()).map(i => `const ${i} = _${i}`)
    .join('\n')
)
*/
