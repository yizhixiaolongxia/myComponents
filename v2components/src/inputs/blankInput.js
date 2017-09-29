import baseInput from './baseInput'

let blankInput = baseInput.extend({
	props: {
		labelText : {
			default: '白'
		}
	},
	data () {
		return {
			maxLength: 20,
            displayBlackCover: false
		}
	},

	methods: {
		validate (inputData) {
    		return inputData.replace(/\s/g, '') ? true : false;           
        }
	}
})

export default blankInput