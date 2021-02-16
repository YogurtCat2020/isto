import is from './is'


export default new (class {
  public readonly join = (strs: string[], sep?: string): string => {
    if(is.un(sep)) sep = ''
    return strs.join(sep)
  }
  public readonly reverse = (str: string): string => str.split('').reverse().join('')
  public readonly tightSpaces = (str: string): string => str.replace(/ +/g, ' ')
  public readonly trimLeft = (str: string): string => str.replace(/^[ \n]+/, '')
  public readonly trimRight = (str: string): string => str.replace(/[ \n]+$/, '')
  public readonly trim = (str: string): string => this.trimRight(this.trimLeft(str))
  public readonly split = (str: string): string[] => str.split(/[ \n]+/)
  public readonly splitLines = (str: string): string[] => str.split(/\n+/)
  public readonly splitLeft = (str: string): [string, string] => {
    const i = str.indexOf(' ')
    if(i < 0) return [str, null]
    return [str.slice(0, i), str.slice(i+1)]
  }
})()
