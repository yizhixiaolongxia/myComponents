import baseInput from './baseInput'
import birthSelectInput from '../dateSelect/birthSelectInput'
//1.组件引用html模版里需要使用父组件里的方法v-on:submitDate='getDate' ref='dataselect'
//2.0里取消的双向绑定，如今的方法引用可以用v－on事件触发
//2.属性写法更改，之前是class={'style',size:''} 更换成:class='a',因为2.0模板和语法更改，所以属性写法也随之改变，这样也提高了代码运行的效率
let birthInput = baseInput.extend({
    template: "<div class='v2-input-container'>" +
    "<div class='v2-input'><label>{{labelText}}</label><input v-if='!readonly' :maxlength='maxLength' :placeholder='placeholder' readonly='readonly' v-on:click.stop.prevent='onFocus()'  type='text' v-model='inputData' /><div class='v-input-text' v-if='readonly'>{{inputData}}</div><div v-show='displayBlack' class='v2-input-black'><p>{{_inputData}}</p></div><div v-show='displayClear && !readonly' v-on:click='onClear' class='v2-input-clear'><i></i></div><slot></slot></div>" +
    "<div class='v2-input-error' :class='displayErr'>{{errMsg}}</div>" +
    "<birth-select v-on:submitDate='getDate' ref='birthselect'></birth-select></div>",
    props: {
        labelText : {
            type: String,
            default: '生日'
        },
        errMsg : {
            type: String,
            default: '格式错误'
        },
        placeholder: {
            type: String,
            default: '请填写出生日期'
        }
    },
    components : {
        'birth-select': birthSelectInput
    },
    data () {
        return {
            maxLength: 10,
            displayBlackCover: false
        }
    },
    methods:{
        onFocus () {
            this.$refs.birthselect.showDate();
        },
        getDate (date) {
            this.inputData = date
            // this.onInput()
        }

    }
})

export default birthInput