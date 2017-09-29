import inputInstall from './inputs/install'
import dateChooserInstall from './dateChooser/install'
import passwordInstall from './password/install'
import smsInputInstall from './smsCode/install'
import swipeDeleteInstall from './swipeDelete/install'

const useBrowser = true

export default class V2Components {

}

V2Components.install = function (Vue) {
	inputInstall(Vue, V2Components)
	dateChooserInstall(Vue, V2Components)
	passwordInstall(Vue, V2Components)
	smsInputInstall(Vue, V2Components)
	swipeDeleteInstall(Vue, V2Components)
}

if(useBrowser && window.Vue) {
	window.V2Components = V2Components
	Vue.use(V2Components)
}