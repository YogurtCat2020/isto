import {is, assert} from './base'


export default class Unique {
  private readonly key2subKeys: {[key: string]: Set<string>}
  private readonly subKey: () => string

  public constructor(subKey: () => string) {
    this.key2subKeys = {}
    this.subKey = subKey
  }

  public put(key: string): string {
    let subKeys = this.key2subKeys[key]
    if(is.un(subKeys)) {
      subKeys = new Set<string>()
      this.key2subKeys[key] = subKeys
    }

    let subKey: string
    while(true) {
      subKey = this.subKey()
      if(!subKeys.has(subKey)) {
        subKeys.add(subKey)
        return subKey
      }
    }
  }
  public pick(key: string, subKey: string): void {
    const subKeys = this.key2subKeys[key]
    assert(!is.un(subKeys), `key=${key} 不存在！`)
    subKeys.delete(subKey)
  }
}
