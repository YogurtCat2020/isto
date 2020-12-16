
export default new (class {
  public readonly err = (msg: string): null => {throw `<err> ${msg} </err>`}
  public readonly notImplemented = (): null => this.err('not implemented !')
  public readonly assertionFail = (): null => this.err('assertion fail !')
})()
