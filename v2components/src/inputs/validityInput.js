import baseInput from './baseInput'
import dateSelectInput from '../dateSelect/dateSelectInput'
//1.组件引用html模版里需要使用父组件里的方法v-on:submitDate='getDate' ref='dataselect'
//2.0里取消的双向绑定，如今的方法引用可以用v－on事件触发
//2.属性写法更改，之前是class={'style',size:''} 更换成:class='a',因为2.0模板和语法更改，所以属性写法也随之改变，这样也提高了代码运行的效率
let validityInput = baseInput.extend({
    template: "<div class='v2-input-container'>" +
    "<div class='v2-input'><label>{{labelText}}</label><input ref='inputDom' v-if='!readonly' :maxlength='maxLength' :placeholder='placeholder' readonly='readonly' v-on:click.stop.prevent='onFocus($event)' v-on:blur='onBlur' type='text' v-model='inputData' /><div class='v-input-text' v-if='readonly'>{{inputData}}</div><div v-show='displayBlack' class='v2-input-black'><p>{{_inputData}}</p></div><div v-show='displayClear && !readonly' v-on:click='onClear' class='v2-input-clear'><i></i></div><slot></slot></div>" +
    "<div class='v2-input-error' :class='displayErr'>{{errMsg}}</div>" +
    "<date-select v-on:submitDate='getDate' ref='dataselect'></date-select></div>",
    props: {
        labelText : {
            type: String,
            default: '有效期'
        },

        errMsg : {
            type: String,
            default: '输入的有效期错误'
        },

        placeholder: {
            type: String,
            default: '月/年'
        }
    },
    components : {  //引用日期选择组件
        'date-select': dateSelectInput
    },
    data () {
        return {
            maxLength: 5,
            displayBlackCover: false,
            errShow: false
        }
    },
    methods:{
    	validate (inputData) {
    		return /^[0][1-9]\/[0-9]{2}$|^[1][0-2]\/[0-9]{2}$|^[0][1-9][0-9]{2}$|^[1][0-2][0-9]{2}$/.test(inputData);
        },
        onFocus (e) {
            this.$refs.dataselect.showDate();
        },
        getDate (date) {
            this.inputData = date
            this.errShow = false
        }

    },
    filter:{
    //这一段逻辑是输入日期的格式化，如果存在手动输入日期的情况下，此处将日期格式为xx/xx
    //此处没有用到，已注释
         formatValidDate:function(inputData){
            var a = inputData.replace(/[^0-9]/g, '');
            var len = a.length;
            if (a[0] > 1) {
                a = '';
            } else {
                if (parseInt(a.substr(0, 2), 10) > 12) {
                    a = a.substr(0, 1);
                }
            }
            if (len < 2) {
                a = a.replace(/[2-9\/]/g, '');
            } else if (len < 3) {
                if (a[0] == 1) {
                    a = a.replace(/[3-9]/g, '');
                } else {
                    a = a.replace(/[0]{2}/g, 0);
                }
            } else {
                if (len > 4) {
                    a = a.substr(0, 4);
                }
                var currentYear, latestYear, year, month, currentMonth;
                currentMonth = parseInt((new Date().getMonth() + 1), 10);
                currentYear = (new Date().getFullYear() + '').substr(2);
                latestYear = parseInt((new Date().getFullYear() + '').substr(2), 10) + 20;
                var lastestYearFrist = parseInt(latestYear / 10, 10);
                if (a[2] != currentYear[0] && a[2] > lastestYearFrist) {
                    return a.substr(0, 2);
                }
                if (a.length == 3) {
                    if (currentYear[1] == "9" && a[2] == currentYear[0]) {
                        if (currentMonth > parseInt(a.substr(0, 2), 10)) {
                            return a.substr(0, 2);
                        }
                    }
                    return a;
                }

                year = parseInt(a.substr(2), 10);
                month = parseInt(a.substr(0, 2), 10)
                if (latestYear < year || year < currentYear) {
                    a = a.substr(0, 3);
                } else if (year == currentYear && month < currentMonth) {
                    a = a.substr(0, 3);
                }
            }
            return a;
            }
    },
    
})

export default validityInput