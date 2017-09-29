require('./css/1.css')
import baseInput from './baseInput'
import creditInput from './creditInput'
import cvv2Input from './cvv2Input'
import amtInput from './amtInput'
import validityInput from './validityInput'
import idcardInput from './idcardInput'
import mobileInput from './mobileInput'
import blankInput from './blankInput'

// import cardtypeInput from './cardTypeInput'
// import birthInput from './birthInput'
// import addressInput from './addressInput'

function install (Vue, V2Components) {
  if (V2Components) {
    V2Components.base = baseInput
    V2Components.credit = creditInput
    V2Components.cvv2 = cvv2Input
    V2Components.amt = amtInput
    V2Components.validity = validityInput
    V2Components.idcard = idcardInput
    V2Components.mobile = mobileInput
    V2Components.blank = blankInput
    // V2Components.cardtype = cardtypeInput
    // V2Components.birth = birthInput
    // V2Components.address = addressInput
  }

  Vue.component('base-input', baseInput)
  Vue.component('credit-input', creditInput)
  Vue.component('cvv2-input', cvv2Input)
  Vue.component('amt-input', amtInput)
  Vue.component('validity-input', validityInput)
  Vue.component('mobile-input', mobileInput)
  Vue.component('idcard-input', idcardInput)
  Vue.component('blank-input', blankInput)
  // Vue.component('cardtype-input', cardtypeInput)
  // Vue.component('birth-input', birthInput)
  // Vue.component('address-input', addressInput)
}
export default install
