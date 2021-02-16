import to from './to'
import {line} from './util'


export default new (class {
  public readonly $ = (...args: any[]): void => {
    console.log(...args)
  }

  public readonly obj = (...args: any[]): void => {
    this.$(...args.map(i => to.str(i)))
  }
  public readonly line = (...args: any[]): void => {
    this.$(line(...args))
  }
})()
