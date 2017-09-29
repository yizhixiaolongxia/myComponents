require('./css/1.css')
require('./css/2.css')
// require('../inputs/css/1.css')
export default Vue.extend({
    template: `<div>
<div v-if="strongMode">
    <div class="v2-input-container" v-if='isMiniV'>
        <div class="v2-input">
            <label>支付密码</label>
            <input @focus="focus" @blur="blur" type="password" placeholder="请输入支付密码"  maxlength="16" v-model="inputData" />
            <div class='v2-input-clear'><i></i></div>
        </div>
        <div class='v2-input-error errorH'>输入的支付密码错误</div>
    </div>
    <div class="strong-psd-mode" v-else>
        <input @focus="focus" @blur="blur" type="password" placeholder="请输入支付密码" maxlength="16" v-model="inputData" />
        <button class='pswd_btn custom_btn1' :class="disable" v-if="showSubmit" @click="_success(inputData)">{{submitText}}</button>
    </div>
</div>
<div class="simple-psd-mode" v-else>
    <ul>
        <li v-for="n in L" :class="{'filled': inputData.charAt(n-1) !== ''}">
            <span></span>
        </li>
    </ul>
    <div @click="_click($event)">
    <input :disabled="useVirtualKeyboard" @focus="focus($event)" @blur="blur($event)" type="tel" maxlength="6" v-model="inputData" />
    </div>
</div>
</div>`,
    props: {
        useVirtualKeyboard: {
            type: Boolean,
            default: false
        },
        isMiniV: {
            type: Boolean,
            default: false
        },
        strongMode: {
            type: Boolean,
            default: false
        },
        submitText: {
            type: String,
            default: '确认'
        },
        showSubmit: {
            type: Boolean,
            default: true
        },
        success: {
            type: Function,
            default: function (inputData) {
                console.log(inputData)
                console.error('password input callback missing')
            }
        }
    },
    data () {
        return {
            inputData: '',
            L: 6,
            disable:'disable'
        }
    },
    created () {
        //简单模式不可输入空格 所以不用去空
        this.$watch('strongMode',  (strongMode) => {
            this.inputData = ''
        })
        this.$watch('inputData',  (inputData) => {
            if(!this.strongMode) {
                if (inputData.length >= 6) {
                    this.success(this.inputData)
                    
                }
            }else{
                if (inputData.length >= 6) {
                    this.disable = ""
                } else {
                    this.disable = 'disable'
                }
            }
        })

    },
    methods: {
        focus (e) {
            this.$emit('focus', e)
        },
        blur (e) {
            this.$emit('blur', e)
        },
        _click (e) {
            if(this.useVirtualKeyboard) {
                this.focus(e)
            }
        },
        _success(inputData){
            if(this.inputData.length >= 6){
                this.success(this.inputData)
            }else{
                return false
            }
        }
    }
})
