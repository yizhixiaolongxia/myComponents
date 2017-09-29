import baseInput from './baseInput'

let cvv2Input = baseInput.extend({
	props: {
        type: {
            type:String,
            default:'tel'
        },

		labelText : {
            type: String,
            default: '安全码'
        },

        errMsg : {
            type: String,
            default: '输入的安全码错误'
        },

        placeholder: {
            type: String,
            default: '卡背面 末三位数字'
        }
	},
    data () {
        return {
            displayBlackCover: false,
            maxLength:3
        }
    },
    methods:{
    	validate (inputData) {
    		return /^[0-9]{3}$/g.test(inputData);         
        },
    }

})

export default cvv2Input
