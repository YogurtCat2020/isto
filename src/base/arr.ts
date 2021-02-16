import is from './is'


export default new (class {
  public readonly last = <T>(arr: T[], item?: T): T => {
    if(is.un(item)) return arr[arr.length-1]
    arr[arr.length-1] = item
    return null
  }
  public readonly appends = <T>(arr: T[], items: T[]): void => {
    arr.splice(arr.length, 0, ...items)
  }
})()
