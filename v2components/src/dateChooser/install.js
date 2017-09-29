import dateChooser from './dateChooser.js'

export default function (Vue, V2Components) {
	if(V2Components) {
		V2Components.dateChooser = dateChooser
	}
	Vue.component('date-chooser', dateChooser)
}