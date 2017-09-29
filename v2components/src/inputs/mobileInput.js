import baseInput from './baseInput'

let mobileInput = baseInput.extend({
    props: {
        type: {
            type:String,
            default:'tel'
        },

        labelText : {
            type: String,
            default: '手机号'
        },

        errMsg : {
            type: String,
            default: '输入的手机号错误'
        },

        placeholder: {
            type: String,
            default: '请输入手机号码'
        }
    },
    data () {
        return {
            maxLength: 13
        }
    },
    methods:{
    	validate (inputData) {
            return /^1[0-9]{10}$/.test(inputData.replace(/\s/g, ''));          
        },
        blackFilter: function(inputData) {
            var a = inputData.replace(/\D/g, '')
            var len = a.length;
            if (len < 4) {
                return a;
            } else if (len < 8) {
                a = a.replace(/(\d{3})(.*)/g, "$1 $2");
            } else {
                if (len > 11) {
                    a = a.substr(0, 11);
                }
                a = a.replace(/(\d{3})(\d{4})(?=\d)/g, "$1 $2 ");
            }
            return a;
        }
    }
})

export default mobileInput