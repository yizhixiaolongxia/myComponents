// import V2Component from '../src/components/inputs/index'
// Vue.use(V2Component)

new Vue({
    el: '#app',
    data(){
        return {
            btnDisable:'no_click',
            A:'hello',
            placeholder:'请输入转出金额',
            errMsg:'输入格式错误',
            gtMaxMsg:'输入金额不能大于最大限额',
            maxAmt:500,
            B: '',
            RT: '',
            T: false,
            passwordTest: '',
            mb: '',
            Y: 3
        }
    },
    methods: {
        tg() {
            this.T = !this.T
        },
        t9 () {
            console.log(98989)
        },
    	amtOK(inputData){
    		//input is legal
    		//var inputData = this.$refs.amtInput.inputData;
    		console.log('inputData == ' + inputData);
    		console.log('input is legal');
    		if (inputData>this.maxAmt) {
    			this.errMsg = this.errMsgGtMax;
    			//this.$refs.amtInput.errShow = true;
    			this.btnDisable = 'no_click';
    		}else{
    			this.btnDisable = '';
                this.A = 'hello world';
    		}
    		
    		//todo
    	},
    	amtFail(inputData){
            console.log('inputData == ' + inputData);
    		console.log('input is unlegal');
    		this.btnDisable = 'no_click'
    	},
    	submit(){

    	},

        r1 () {
            this.B = '对'
        },

        r2 () {
            this.B = '错'
        },

        r3 (value) {
            console.log(`已选择${value}`)
        },
        openC () {
            this.$refs.dateChooser.open()
        },
        r9 (a) {
            console.log(a)
            this.$refs.dateChooser.close()
        },
        w33 (a) {
            console.log(this.passwordTest = `您输入的密码为${a}`)
        },
        sendSmsCode () {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('我自己发了个验证码')
                    resolve({
                        resultCode: '1000'
                    })
                }, 30)
            })
        },
        c12 () {
            this.$refs.t01.forEach(sd => {
                sd.close()
            })
        },
        del (s) {
            this.Y-- //做个样子
        }

    },
    components: {
        'mine' : V2Components.base.extend({
            methods : {
                onBlur () {
                    this.inputData = '我重写了baseInput的失焦事件'
                }
            }
        })
    }
})
