import baseInput from './baseInput'

let amtInput = baseInput.extend({
    props : {
        type: {
            type:String,
            default:'number'
        },
        labelText: {
            type:String,
            default:'金额'
        },
        placeholder: {
            type: String,
            default: '请输入金额'
        },
        errMsg: {
            type:String,
            default:'输入金额非法'
        },
        maxAmt: {
            type:Number,
            default: -1
        },
        maxMsg: {
            type:String,
            default:'金额超过最大限额'
        }
    },
    data () {
        return {
            displayBlackCover:false,
        }
    },
    computed:{
        errMsg(){
            if (this.maxAmt>-1 && (Number(this.inputData)>this.maxAmt)) {
                return this.maxMsg;
            }
        }
    },
    methods:{
    	validate(){
    		if (this.inputData === '') {
    			this.errShow = false;
    			return false;
    		}

            if (this.inputData === 0) {
                this.inputData = 0;
                this.errShow = false;
                return false;
            }

    		var reg = /^(([1-9]\d*)|0)(\.\d{0,2})?$/;
    		if (!reg.test(this.inputData)) {
    			this.inputData = this.inputData.slice(0, this.inputData.length-1);
                if (this.inputData === '' || Number(this.inputData) === 0) {
                    this.errShow = false;
                    return false;
                }
    		}else{
    			if (Number(this.inputData) === 0) {
    				return false;
    			}
    			if (this.maxAmt>0 && (Number(this.inputData) > this.maxAmt)) {
    				this.errShow = true;
    				return false;
    			}
    			this.errShow = false;
    		}
    		return true;
    	},
    	onInput(){
    		var r = this.validate();
    		if(r){
    			this.$emit('correct', this.inputData);
    		}else{
    			this.$emit('incorrect', this.inputData);
    		}
    	},
    	onBlur(){
    		this.onInput();
    	},
    	onFocus(){
    		this.onInput();
    	}
    }
})

export default amtInput