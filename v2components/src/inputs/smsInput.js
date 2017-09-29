import baseInput from './baseInput'

let smsInput = baseInput.extend({
	template : "<div class='v2-input-container'>" +
	    "<div class='v2-input'><label>{{labelText}}</label><input v-if='!readonly' :maxlength='maxLength' :placeholder='placeholder' v-on:focus='onFocus' v-on:input='onInput' v-on:blur='onBlur' type='tel' v-model='inputData' /><div class='v-input-text' v-if='readonly'>{{inputData}}</div><div v-show='displayBlack' class='v2-input-black'><p>{{_inputData}}</p></div><div v-show='displayClear && !readonly' v-on:click='onClear' class='v2-input-clear'><i></i></div><div class='free-access' :class='count_down' :disabled='disabled' v-on:click='sendMsg'>{{sendWord}}</div><slot></slot></div>" +
	    "<div class='v2-input-error' :class='displayErr'>{{errMsg}}</div>" +
	    "</div>",
    props:{
    	labelText : {
            type: String,
            default: '验证码'
        },

        errMsg : {
            type: String,
            default: '输入的验证码错误'
        },

        placeholder: {
            type: String,
            default: '请输入短信验证码'
        }
    },
    data(){
    	return {
            maxLength:6,
            displayBlackCover: false,
            disabled:'',
            count_down:'',
            sendWord:'获取',
            isReady:true,
            sendAgainTime: 60
    	}
    },
    methods:{
    	validate (inputData) {
    		return /^[0-9]{6}$/g.test(inputData.replace(/\s/g, '')) ? true : false; 
        },
        getNewOtpTimeout(endTime, fn) { //调用倒计时方法
	        var time = this.sendAgainTime;
	        if (endTime > 0) {
	            var currStemp = new Date();
	            var nowTime = currStemp.getTime();
	            var diffTime = endTime - nowTime;
	            if (diffTime > 0) {
	                //还没有结束
	                var timeInt = diffTime / 1000 >> 0;
	                time = timeInt;
	            } else {
	                //已结束
	                time = 0;
	            }
	        }

	        var countdown = () => { //倒计时
	            this.startCount(); //倒计时开始
	            if (time > 0) {
	                var currStempF = new Date();
	                var nowTimeF = currStempF.getTime();
	                var diffTimeF = endTime - nowTimeF;
	                var smallT = 0;
	                if (diffTimeF > 1000) {
	                    //还没有结束
	                    var timeIntF = diffTimeF / 1000 >> 0;
	                    var smallTT = diffTimeF % 1000;
	                    if (smallTT > 700) {
	                        smallT = smallTT - 700;
	                        timeIntF++;
	                    } else if (smallTT < 300) {
	                        smallT = smallTT;
	                    }
	                    time = timeIntF;
	                } else {
	                    //已结束
	                    time = 1;
	                }
	                this.runningCount(time); //倒计时进行
	                time--;
	                setTimeout(function() { countdown() }, 1000 - smallT);
	            } else {
	                this.afterCount(); //倒计时结束
	                fn && fn();
	            }
	        }; //倒计时
	        countdown();
	    },
	    startCount() { //倒计时开始
	        this.count_down = "count-down";
	        this.disabled = "disabled";
	    },
	    runningCount(time) { //倒计时中
	        this.sendWord = time + " 秒";
	    },
	    afterCount() { //倒计时结束
	        this.count_down = "";
	        this.sendWord = "重新获取";
	        this.disabled = false;
	        this.isReady = true;

	    },
	    updateReady() {
	        this.isReady = true;
	    },
	    sendMsg() {
	    console.log(this.inputData) 
	    	// 发送验证码
	        if (this.isReady) {
	            this.isReady = false;
	        } else {
	            return;
	        }
	        if (this.disabled == "disabled") {
	            this.isReady = true;
	            return;
	        }
	        this.$emit('sendcode', this.inputData);
	    }
    },
})
//备注：验证码从3秒倒计时的bug，检测代码是否偶现此类问题，获取当前时间，超过60s去计算
export default smsInput