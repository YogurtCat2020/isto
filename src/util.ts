import {is, to} from './base'


export function print(...args: any[]): void {
  console.log(...args)
}
export function printObj(...args: any[]): void {
  print(...args.map(i => to.str(i)))
}
export function printLine(...args: any[]): void {
  print(line(...args))
}

export function line(str?: string, num?: number): string {
  if(is.un(str)) str = '-'
  if(is.un(num)) num = 64
  return str.repeat(num)
}


export function getTestData(): Map<any, any> {
  return new Map<any, any>([
    ['undefined', undefined],
    ['null', null],
    ['false', false],
    ['true', true],
    ['0', 0],
    ['123', 123],
    ['0.0', 0.0],
    ['3.14', 3.14],
    ["''", ''],
    ["'Hello'", 'Hello'],
    [Symbol(), Symbol()],
    ['func', function(){}],
    ['lambda', () => {}],
    ['{}', {}],
    ['{...}', {a:123, b:'hahaha'}],
    ['[]', []],
    ['[...]', [11, 22, 22, 33]],
    ['Set()', new Set()],
    ['Set(...)', new Set([11, 22, 22, 33])],
    ['Map()', new Map()],
    ['Map(...)', new Map<any, any>([['a',123], ['b','hahaha']])],
  ])
}
