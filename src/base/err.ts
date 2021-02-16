
export default new (class {
  public readonly $ = (msg: string): null => {throw `<err> ${msg} </err>`}

  public readonly notImplemented = (): null => this.$('not implemented')
  public readonly assertionFail = (): null => this.$('assertion fail')
})()
