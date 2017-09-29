import passwordInput from './password.js'

export default function (Vue, V2Components) {
    if(V2Components) {
        V2Components.passwordInput = passwordInput
    }
    Vue.component('password-input', passwordInput)
}
