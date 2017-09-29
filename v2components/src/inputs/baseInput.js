let baseInput = Vue.extend({
    template : `
    <div class='v2-input-container'>
        <div class='v2-input'>
            <label>{{labelText}}</label>
            <input ref='input' v-if='!readonly && type === "text"' :maxlength='maxLength' :placeholder='placeholder' v-on:focus='onFocus($event)' v-on:blur='onBlur($event)' type='text' v-model='inputData' />
            <input ref='input' v-if='!readonly && type === "tel"' :maxlength='maxLength' :placeholder='placeholder' v-on:focus='onFocus($event)' v-on:blur='onBlur($event)' type='tel' v-model='inputData' />
            <input ref='input' v-if='!readonly && type === "number"' :maxlength='maxLength' :placeholder='placeholder' v-on:focus='onFocus($event)' v-on:blur='onBlur($event)' type='number' v-model='inputData' />
            <div class='v-input-text f14' v-if='readonly'>{{inputData}}</div>
            <div v-show='displayBlack' class='v2-input-black' :class='arrowClass'>
                <p>{{_inputData}}</p>
            </div>
            <div :class='{ opacity100: displayClear && !readonly }' v-on:click='onClear' class='v2-input-clear'><i></i></div>
            <slot></slot>
        </div>
        <div class='v2-input-error' :class='displayErr'>{{errMsg}}</div>
    </div>`,
    props : {
        type: {
            type:String,
            default:'text'
        },
        readonly : {
            type: Boolean,
            default: false
        },
        labelText: {
            type:String,
            default:'基础'
        },
        placeholder: {
            type: String,
            default: '请输入信息'
        },
        errMsg: {
            type:String,
            default:'输入格式错误'
        },
        initValue: {
            type: String,
            default: ''
        },
        arrow: {
            type: String,
            default: ''
        }
    },

    watch: {
        inputData: function (inputData) {
            this.checkState = this.validate(inputData) || this.readonly
            if(this.checkState) {
                this.$emit('correct', this.inputData)
            } else {
                this.$emit('incorrect', this.inputData)
            }
        }
    },

    mounted () {
        this.$nextTick(() => {
            if(this.initValue !== '') {
                this.checkState = this.validate(this.initValue)
            }
            if(this.readonly) {
                this.checkState = true
            }
        })
    },

    data () {
        return {
            inputData: this.initValue,
            maxLength:10,
            errShow: false,
            typing: false,
            displayBlackCover: true,
            checkState: false
        }
    },

    computed: {
        displayBlack () {
            return this.inputData.length > 0 && this.typing && this.displayBlackCover
        },

        displayClear() {
            return this.inputData.length > 0 && this.typing
        },

        displayErr(){
            return this.errShow && this.inputData.length !== 0 ? '' : 'errorH'
        },

        _inputData () {
            return this.blackFilter(this.inputData)
        },

        arrowClass () {
            let c = ''
            switch (this.arrow) {
                case 'up':
                    c = 'v2-input-arrow-up'
                    break
                default: 
                    break
            }

            return c
        }
    },

    methods :{

        blackFilter (inputData) {
            return inputData
        },

        validate (inputData) {
            if(inputData === 'error') {
                return false
            }
            return true
        },

        onFocus (e) {
            this.typing = true
            this.errShow = false
            this.$emit('focus', this, e)
        },

        onClear () {
            if(this.readonly)
                return
            this.errShow = false
            this.inputData = ''
            //todo 加入回调
            this.$emit('clear', this)
            this.$refs.input.focus()
        },

        onBlur (e) {
            this.typing = false
            //修改inputData由其他组件emit改变校验超前的BUG
            //这是因为input控件显示试焦时慢于onBlur计算，所以值传过来时，onBlur还没有接受到，所以点击别处会报错，为了解决这个问题
            //对于报错的校验方法作了延迟
            this.$nextTick(() => {
                setTimeout(() => {
                    let inputData = this.inputData.replace(/\s/g, '')
                    inputData = this.blackFilter(inputData)
                    if(this.validate(inputData) || this.readonly) {
                        this.errShow = false
                    } else {
                        this.errShow = true
                    }
                    this.inputData = this.blackFilter(inputData)
                }, 0)
            })
            this.$emit('blur', this,e)
        }
    }
})

export default baseInput
