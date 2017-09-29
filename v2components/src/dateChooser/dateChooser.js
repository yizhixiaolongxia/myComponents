import core from './core.js'
let a = new Date()
let dateChooser = Vue.extend({
	template: `<div class='calendars-container' @click='handlerClick($event)' v-html='html'></div>`,
	props : {
		length: {
            type: Number,
            default: 12
        },
        start : {
            type: String,
            default: ''
        },
        callback : {
        	type: Function,
        	default: function () {}
        }
	},
	created () {
		let startDate = new Date()
		if (this.start !== '') {
			let d = this.start.split(',')
			startDate = new Date(d[0], Number(d[1]) - 1, d[2])
		}
		this.html = core(startDate, this.length)
	},
	mounted () {
		//获取屏幕宽高
		// let w = document.body.clientWidth, h = document.body.clientHeight
		// this.$el.style.width = w + 'px'
		// this.$el.style.height = h + 'px'
	},
	methods: {
		handlerClick: function (e) {
        	let dom = e.target
        	if(dom.parentNode && dom.parentNode.tagName.toLocaleLowerCase() === 'td') {
            	dom = dom.parentNode
        	}
        	let data = dom.getAttribute('data')
        	let past = dom.getAttribute('data-past')
        	if(data && past == '1') {
            	this.callback(data)
        	}
    	},
		open () {
			let w = document.body.clientWidth, h = document.body.clientHeight
			this.$el.style.width = w + 'px'
			this.$el.style.height = h + 'px'
			this.$el.style.top = 0;
			this.$el.style.overflow = 'scroll';
		},
		close () {
			this.$el.style.top = '100%'
			this.$el.style.overflow = 'hidden';
		}
	}
})

export default dateChooser