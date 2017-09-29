const TIME = 60

const IMAGECODE = "1184"

import request from '../../../framework/common/request'

require('./css/picsms.css')
/*
 sendFuc: 发送验证码的函数, return一个promise对象,必须传,或者async 必须return一个res
 autoSend : 是否加载组件时自动发送验证码 强烈建议全部改为true
 initTime: 发送间隔,默认60秒
 success: 当验证码默认输入6位执行回调 回调参数为用户输入的6位验证码
 codeLength: 验证码长度 默认6位
 memoryKey: 一个唯一的随机秘钥, 自动记录间隔时间, 不传不记录
 needImage: 是否启用图片验证码 默认启用
 phone: 手机号校验图形验证码时候使用
 */
export default Vue.extend({
    props: {
        useVirtualKeyboard: {
            type: Boolean,
            default: false
        },
        sendFuc: {
            type: Function,
            default: function () {
                console.error('sending sms code function missing')
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            resultCode: "1000",
                            resultMsg: "mock 验证码 已经发送"
                        })
                    }, 2000)
                })
            }
        },
        memoryKey: {
            type: String,
            default: ''
        },
        autoSend: {
            type: Boolean,
            default: true
        },
        initTime: {
            type: Number,
            default: TIME
        },
        success: {
            type: Function,
            default: function (inputData) {

            }
        },
        codeLength: {
            type: Number,
            default: 6
        },
        preSent: {
            type: Boolean,
            default: false
        },
        needImage: {
            type: Boolean,
            default: true
        },
        phone: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default:'请输入短信验证码'
        },
        displayErr: {
            type: Boolean,
            default: true
        },
        errMsg: {
            type: String,
            default: '输入的验证码错误'
        }
    },
    data () {
        return {
            status: 2, //0: 尚未发送, 1: 已经发送进入倒计时, 2: 已经发送,可以重发
            smsTime: this.initTime,
            inputData: "",
            sendButtonText: "获取",
            showImg: false,
            captchaUrl: "",
            defaultUrl: "",
            imgCodeLength: 4,
            msg: "",
            imageParams: {},
            picSmsErrMsg: "",
            cl:"cl_49",
            showClear:false,
            hideErr:true
        }
    },
    template: `<div class="sms-input-container rn-sms-input-container">
                    <div class="sms-input">
                        <label>验证码</label>
                        <div class="s17" @click="_click($event)">
                            <input :placeholder="placeholder" @focus="_focus($event)" @blur="_blur($event)" type="tel" ref="smsInput" :disabled="useVirtualKeyboard" :maxlength="codeLength" v-model="inputData" />
                        </div>
                        <div class="sms-input-clear" :class='{ opacity100: showClear}' @click="onClear"><i></i></div>
                        <div v-if="status === 0" class="sms-code-retry-text" :class="cl">
                            验证码发送中
                        </div>
                        <div v-if="status === 1" class="sms-code-retry-text" :class="cl">
                            请{{smsTime}}秒后重试
                        </div>
                        <div v-if="status === 2" class="sms-code-retry-text" :class="cl">
                            <span @click="sendCode">{{sendButtonText}}</span>
                        </div>
                    </div>
                    <div class="sms-input-error" :class='{error_none:hideErr}'>{{errMsg}}</div>
                    <!-- 图片验证码哦 -->
                    <div class="_black" v-show="showImg">
                        <div class="_alert">
                            <div class="top_p bn">
                            <div class="top_close" @click="closeAlert"></div>
                                <p>请输入图形验证码</p>
                            </div>
                            <div class="picsms wrapper" @click="refreshImg">
                                <img :src="captchaUrl ? captchaUrl : defaultUrl">
                            </div>
            
                            <div class="changepic" @click="refreshImg(true)">看不清，换一张</div>
                                <div class="inputsms wrapper">
                                    <ul>
                	                    <li v-for="ix in imgCodeLength">
                		                    {{msg.charAt(ix-1)}}
            		                    </li>
                                    </ul>
                                    <div @click="_click2($event)">
                                    <input type="text" v-model="msg" ref="picSmsInput" :maxlength='imgCodeLength' v-focus :disabled="useVirtualKeyboard" v-on:focus="_focus2" v-on:blur="_blur2">
                                    </div>
                            </div>
                            <div class="errormsg inner text_c f12">{{picSmsErrMsg}}</div>
                        </div>
                    </div>
               </div>`,
    components: {

    },
    created () {
        this.$watch('status', (status) => {
            switch (status) {
                case 0:
                    this.smsTime = this.initTime
                    this.cl = "cl_bbb"
                    break
                case 1:
                    let r2 = setInterval(() => {
                        if(this.smsTime <= 0) {
                            clearInterval(r2)
                            this.smsTime = 0
                            this.status = 2
                            this.cl = "cl_49"
                        } else {
                            this.smsTime --
                            this.cl = "cl_bbb"
                        }
                    }, 1000)
                    break
                case 2:
                    this.smsTime = 0
                    this.cl = "cl_49"
                    break
            }
        })

        this.$watch('inputData', (inputData) => {
            this.showClear = inputData.length > 0 ? true : false
            if(inputData.length >= this.codeLength) {
                this.success(inputData)
            }
        })

        this.$watch('msg', (msg) => {
            if(msg.length) {
                this.picSmsErrMsg = ''
            }
            if(msg.length >= this.imgCodeLength) {
                this._verifyPicSms(msg)
            }
        })

        if(this.autoSend) {
            if(this.preSent) {
                this.status = 1
                this.cl = "cl_bbb"
            } else {
                let key = this.memoryKey
                if(key && window[key] && typeof window[key].store === 'number') {
                    let G = Math.floor((new Date().getTime() - window[key].now.getTime())/1000)
                    if( G < window[key].store) {
                        this.smsTime = window[key].store - G
                        this.status = 1
                        this.cl = "cl_bbb"
                    } else {
                        this.sendCode()
                    }
                } else {
                    this.sendCode()
                }
            }

        } else {
            this.status = 2
            this.cl = "cl_49"
        }
    },
    methods: {
        onClear(){
            this.inputData = ''
            if(this.displayErr){
                this.hideErr = true
            }
            this.$emit('clear', this)
        },
        sendCode () {
            this.status = 0
            this.cl = "cl_bbb"
            function A (r) {
                if(r && r.resultCode === '1000') {
                    this.status = 1
                    this.cl = "cl_bbb"
                    return
                }

                if(r && r.resultCode === IMAGECODE && this.needImage) {
                    this.showImg = true
                    this._handleKeyboard(this.showImg)
                    this.captchaUrl = r.captchaUrl
                    this.imageParams = {
                        captchaId: r.captchaId,
                        businessId: r.businessId
                    }

                    this.$nextTick(() => {
                        setTimeout(() => {
                            this && this.$refs && this.$refs.picSmsInput && (this.$refs.picSmsInput.focus())
                        }, 1)
                    })

                    return
                }
                this.status = 2
                this.cl = "cl_49"
            }

            A = A.bind(this)

            let r = this.sendFuc().then((r) => {
                if (r === undefined) {
                    this.status = 2
                    this.cl = "cl_49"
                    return
                }
                this.sendButtonText = "重新获取"
                A(r)
            }).catch((r) => {
                A(r)
            })
        },
        refreshImg (clearMsg) {
            if(clearMsg) {
                this.picSmsErrMsg = ''
            }
            this.msg = ''
            if(this.useVirtualKeyboard && COMPLEXKEYBOARD) {
                COMPLEXKEYBOARD.inputData = ""
            }
            request({ operationType: 'refresh_img_code' }).then(r => {
                if(r && r.resultCode === "1000") {
                    this.captchaUrl = r.captchaUrl
                    this.imageParams.captchaId = r.captchaId
                }
            }).catch(err => {

            })

        },
        _verifyPicSms (msg) {
            let a = {
                operationType:'verify_img_code',
                captchaId:'',
                captchaInput: msg,
                businessId:'',
                mp: this.phone,
                useType: 4,
            }
            request(Object.assign({}, a, this.imageParams)).then((r) => {
                if(r && r.resultCode === '1000') {
                    this.showImg = false
                    this._handleKeyboard(this.showImg)
                    this.status = 1
                    this.cl = "cl_bbb"
                    this.$refs.smsInput.focus()
                } else {
                    this.picSmsErrMsg = r.resultMsg || "输入错误,请刷新重试"
                    this.refreshImg()
                }
            }).catch(err => {
                WEBVIEW.pb_toast(err.resultMsg || '网络错误')
            })
        },
        _focus (e) {
            if(this.displayErr){
                this.hideErr = true
            }
            this.showClear = this.inputData.length>0?true:false
            this.$emit('focus', e)
        },
        _blur (e) {
            if(this.displayErr){
                if(/^[0-9]{6}$/g.test(this.inputData)||this.inputData == ''){
                    this.hideErr = true
                }else{
                    this.hideErr = false
                }
            }
            this.showClear = false
            this.$emit('blur', e)
        },
        _click(e) {
            if(this.useVirtualKeyboard) {
                //为启用虚拟键盘的时候,模拟focus事件
                this.$emit('focus', e)
            }
        },
        _focus2 (e) {
            this.$emit('focus2', e)
        },
        _blur2 (e) {
            this.$emit('blur2', e)
        },
        _click2 (e) {
            if(this.useVirtualKeyboard) {
                //为启用虚拟键盘的时候,模拟focus事件
                this.$emit('focus2', e)
            }
        },
        closeAlert () {
            this.showImg = false
            this._handleKeyboard(this.showImg)
            this.status = 2
            this.cl = "cl_bbb"
        },
        _handleKeyboard(a) {
            if(a === true && COMPLEXKEYBOARD && this.useVirtualKeyboard) {
                COMPLEXKEYBOARD.show(this.msg)
            } else if(a === false && KEYBOARD && this.useVirtualKeyboard) {
                KEYBOARD.show(this.inputData)
            }
        }
    },
    destroyed () {
        if(this.smsTime > 0 && this.memoryKey && this.status === 1) {
            window[this.memoryKey] = {
                store: this.smsTime,
                now: new Date()
            }

        } else if(this.memoryKey) {
            delete window[this.memoryKey]
        }
    }
})