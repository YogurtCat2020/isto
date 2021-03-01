import {is, assert} from './base'


export default class Unique {
  private readonly key2subKeys: {[key: string]: Set<string>}
  private readonly subKey: () => string

  public constructor(subKey: () => string) {
    this.key2subKeys = {}
    this.subKey = subKey
  }

  public put(key: string): string {
    if(is.un(this.key2subKeys[key])) this.key2subKeys[key] = new Set<string>()
    const subKeys = this.key2subKeys[key]
    let subKey: string
    while(true) {
      subKey = this.subKey()
      if(!subKeys.has(subKey)) {
        subKeys.add(subKey)
        break
      }
    }
    return subKey
  }
  public pick(key: string, subKey: string): void {
    assert(!is.un(this.key2subKeys[key]), `key=${key} 不存在！`)
    this.key2subKeys[key].delete(subKey)
  }
}
