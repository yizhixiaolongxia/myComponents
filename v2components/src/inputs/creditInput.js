import baseInput from './baseInput'

let creditInput = baseInput.extend({
	props: {
        type: {
            type:String,
            default:'tel'
        },

		labelText : {
            type: String,
            default: '信用卡'
        },

        errMsg : {
            type: String,
            default: '输入的银行卡号错误'
        },

        placeholder: {
            type: String,
            default: '添加您本人的银行卡'
        }
	},
    data () {
        return {
			maxLength: 23
        }
    },
    methods:{
    	validate (inputData) {//不满足14-20位的数字则报错
    		return /^\d{14,20}$/.test(inputData.replace(/\s/g, '')) ? true : false;           
        },

        blackFilter (inputData) {
            var a = inputData.replace(/\s/g, '');
            var len = a.length;
            if (len > 19) {
                a = a.substr(0, 19);
            }
            a = a.replace(/\D/g, '');
            a = a.replace(/(\d{4})(?=\d)/g, "$1\ ");
            return a;
        }
    }
})

export default creditInput