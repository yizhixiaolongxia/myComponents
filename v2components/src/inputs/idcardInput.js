import baseInput from './baseInput'

let idcardInput = baseInput.extend({
    props: {
        labelText: {
            type: String,
            default: '身份证'
        },

        errMsg: {
            type: String,
            default: '输入的证件号错误'
        },

        placeholder: {
            type: String,
            default: '添加您本人的证件号'
        }
    },
    data () {
        return {
            maxLength: 20,
        }
    },
    methods: {
        validate (inputData) {
            if (inputData === '') {
                return false;
            }
            var card = inputData.replace(/x/g, 'X').replace(/\s/g, '');
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if (reg.test(card) === false) {
                return false;
            }
            //检验身份证号前两位是否在这个枚举数据里
            var vcity = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91]
            var province = card.substr(0, 2);
            province = parseInt(province)
            if (vcity.indexOf(province) == -1) {
                return false;
            }
            if (this.checkBirthday(card) === false || this.checkParity(card) === false) {
                return false;
            }
            return true;
        },
        checkBirthday: function (inputData) {
            var len = inputData.length;
            if (len == '15') {//把取到的值放到对应的数组里
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arr_data = inputData.match(re_fifteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date('19' + year + '/' + month + '/' + day);
                return this.verifyBirthday('19' + year, month, day, birthday);
            }
            if (len == '18') {
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arr_data = inputData.match(re_eighteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date(year + '/' + month + '/' + day);
                return this.verifyBirthday(year, month, day, birthday);
            }
            return false;
        },
        checkParity: function (inputData) {//通过17位的身份证号通过arrInt规律计算出最后一位校验位，用这个校验位与实际输入的值作判断，如果一致，则通过校验，此套算法为政府发行时所制定
            var card = this.changeFivteenToEighteen(inputData);
            var len = card.length;
            if (len == '18') {
                //权重值
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0,
                    i, valnum;
                for (i = 0; i < 17; i++) {
                    cardTemp += card.substr(i, 1) * arrInt[i];
                }
                //权重值去摸
                valnum = arrCh[cardTemp % 11];
                if (valnum == card.substr(17, 1)) {
                    return true;
                }
                return false;
            }
            return false;
        },
        changeFivteenToEighteen: function (inputData) {// 把15位身份证转换成18位的函数方法
            if (inputData.length == '15') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0,
                    i;
                inputData = inputData.substr(0, 6) + '19' + inputData.substr(6, inputData.length - 6);
                for (i = 0; i < 17; i++) {
                    cardTemp += inputData.substr(i, 1) * arrInt[i];
                }
                inputData += arrCh[cardTemp % 11];
                return inputData;
            }
            return inputData;
        },
        verifyBirthday: function (year, month, day, birthday) {//把取到的出生年月日和系统时间做验证，这边的系统时间会存在错误
            var now = new Date();
            var now_year = now.getFullYear();
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                var time = now_year - year;
                return true;
            }
            return false;
        },
        blackFilter: function (inputData) {
            var a = inputData.replace(/\s/g, '');
            var len = a.length;
            if (len >= 18) {
                a = a.substr(0, 18);
            }
            var b = a.replace(/\D/g, '');
            var bLen = b.length;
            if (bLen < 7) {
                return b.replace(/\D/g, '');
            } else if (bLen < 15) {
                a = b.replace(/(\d{6})(.*)/g, "$1 $2");
            } else if (bLen < 17) {
                a = b.replace(/(\d{6})(\d{8})(.*)/g, "$1 $2 $3");
            } else {
                //a = a.replace(/(\d{6})(\d{8})(?=\d)/g,  "$1 $2 ").replace(/x$/g,"X");
                if (bLen == 18) {
                    a = b.replace(/(\d{6})(\d{8})(.*)/g, "$1 $2 $3");
                } else {
                    if (a.length == 18) {
                        var str = a.substr(17, 18);//取最后一位
                        if (str == "x" || str == "X") {
                            a = b.replace(/(\d{6})(\d{8})(.*)/g, "$1 $2 $3") + "X";
                        } else {
                            a = b.replace(/(\d{6})(\d{8})(.*)/g, "$1 $2 $3");
                        }
                    } else {
                        a = b.replace(/(\d{6})(\d{8})(.*)/g, "$1 $2 $3");
                    }
                }
            }
            return a;
        }
    }

})

export default idcardInput//为模块指定默认输出