require('./css/1.css')

import smsInput from './smsInput.js'

export default function (Vue, V2Components) {
    if(V2Components) {
        V2Components.smsInput = smsInput
    }

    Vue.component('sms-input', smsInput)
}