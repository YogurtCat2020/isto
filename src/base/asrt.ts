import is from './is'
import err from './err'


export default function(cdt: boolean, msg?: string): void {
  if(!cdt) {
    if(is.un(msg)) err.assertionFail()
    else err.err(msg)
  }
}
