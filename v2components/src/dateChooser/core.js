"use strict"

//天文台日历（农历）1900 - 2049
//eg : 19416 转16进制 0x04bd8
//              
//转二进制 0x 0000 0100 1011 1101 1000
//第17位表示润月天数 1:30天, 0:29天
//第16-5位，12个二进制，对应 1 - 12 月 是大月还是小月
//后4位表示润哪个月，0表示不润月

var P = [ 
        19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176,
        39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944,
        44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396,
        11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248,
        11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416,
        22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416,
        86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710,
        43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176,
        38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496,
        103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870,
        43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952,
        43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176,
        43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977,
        19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378,
        19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608,
        19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224,
        21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448 ];
var K = "甲乙丙丁戊己庚辛壬癸";
var J = "子丑寅卯辰巳午未申酉戌亥";
var O = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var L = [ "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满",
        "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
        "立冬", "小雪", "大雪", "冬至" ];
var D = [ 0, 21208, 43467, 63836, 85337, 107014, 128867, 150921,
        173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033,
        353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758 ];
var B = "日一二三四五六七八九十";
var H = [ "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊" ];
var E = "初十廿卅";
var V = {
    "0101" : "元旦节",
    "0214" : "情人节",
    "0308" : "妇女节",
    "0312" : "植树节",
    "0401" : "愚人节",
    "0501" : "劳动节",
    "0504" : "青年节",
    "0601" : "儿童节",
    "0701" : "建党节",
    "0801" : "建军节",
    "0910" : "教师节",
    "1001" : "国庆节",
    "1224" : "平安夜",
    "1225" : "圣诞节"
};
var T = {
    "0101" : "春节",
    "0102" : "初二",
    "0103" : "初三",
    "0104" : "初四",
    "0105" : "初五",
    "0106" : "初六",
    "0107" : "初七",
    "0115" : "元宵节",
    "0505" : "端午节",
    "0815" : "中秋节",
    "0909" : "重阳节",
    "1208" : "腊八节",
    "0100" : "除夕"
};
function U(Y, TODAY) {
    //节日为几日，返回阳历日
    function c(j, i) {
        var h = new Date((31556925974.7 * (j - 1900) + D[i] * 60000)
                + Date.UTC(1900, 0, 6, 2, 5));
        return (h.getUTCDate())
    }
    function d(k) {
        var h, j = 348;
        //右移位运算
        for (h = 32768; h > 8; h >>= 1) {
            j += (P[k - 1900] & h) ? 1 : 0
        }
        return (j + b(k))
    }
    function a(h) {
        return (K.charAt(h % 10) + J.charAt(h % 12))
    }
    function b(h) {
        if (g(h)) {
            return ((P[h - 1900] & 65536) ? 30 : 29)
        } else {
            return (0)
        }
    }
    function g(h) {
        return (P[h - 1900] & 15)
    }
    function e(i, h) {
        return ((P[i - 1900] & (65536 >> h)) ? 30 : 29)
    }
    function C(m) {
        var k, j = 0, h = 0;
        var l = new Date(1900, 0, 31);
        var n = (m - l) / 86400000;
        this.dayCyl = n + 40;
        this.monCyl = 14;
        for (k = 1900; k<2050&&n>0; k++) {
            h = d(k);
            n -= h;
            this.monCyl += 12
        }
        if (n < 0) {
            n += h;
            k--;
            this.monCyl -= 12
        }
        this.year = k;
        this.yearCyl = k - 1864;
        j = g(k);
        this.isLeap = false;
        for (k = 1; k<13&&n>0; k++) {
            if (j > 0 && k == (j + 1) && this.isLeap == false) {
                --k;
                this.isLeap = true;
                h = b(this.year)
            } else {
                h = e(this.year, k)
            }
            if (this.isLeap == true && k == (j + 1)) {
                this.isLeap = false
            }
            n -= h;
            if (this.isLeap == false) {
                this.monCyl++
            }
        }
        if (n == 0 && j > 0 && k == j + 1) {
            if (this.isLeap) {
                this.isLeap = false
            } else {
                this.isLeap = true;
                --k;
                --this.monCyl
            }
        }
        if (n < 0) {
            n += h;
            --k;
            --this.monCyl
        }
        this.month = k;
        this.day = n + 1
    }
    function G(h) {
        return h < 10 ? "0" + h : h
    }
    function f(i, j) {
        var h = i;
        return j.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function(k) {
            switch (k) {
            case "yyyy":
                var l = "000" + h.getFullYear();
                return l.substring(l.length - 4);
            case "dd":
                return G(h.getDate());
            case "d":
                return h.getDate().toString();
            case "MM":
                return G((h.getMonth() + 1));
            case "M":
                return h.getMonth() + 1
            }
        })
    }
    function Z(i, h) {
        var j;
        switch (i, h) {
        case 10:
            j = "初十";
            break;
        case 20:
            j = "二十";
            break;
        case 30:
            j = "三十";
            break;
        default:
            j = E.charAt(Math.floor(h / 10));
            j += B.charAt(h % 10)
        }
        return (j)
    }
    this.date = Y;
    this.isToday = false;
    this.isCurrentDay = false;
    if (!TODAY) {
        TODAY = new Date();
    };
    if (Y.getFullYear() == TODAY.getFullYear() && Y.getMonth() == TODAY.getMonth() && Y.getDate() == TODAY.getDate()) {
        this.isToday = true;
    }

    var _currentDay = new Date();
    if (Y.getFullYear() == _currentDay.getFullYear() && Y.getMonth() == _currentDay.getMonth() && Y.getDate() == _currentDay.getDate()) {
        this.isCurrentDay = true;
    }

    this.isRestDay = false;
    this.solarYear = f(Y, "yyyy");
    this.solarMonth = f(Y, "M");
    this.solarDate = f(Y, "d");
    this.solarWeekDay = Y.getDay();
    this.solarWeekDayInChinese = "星期" + B.charAt(this.solarWeekDay);
    var X = new C(Y);
    this.lunarYear = X.year;
    this.shengxiao = O.charAt((this.lunarYear - 4) % 12);
    this.lunarMonth = X.month;
    this.lunarIsLeapMonth = X.isLeap;
    this.lunarMonthInChinese = this.lunarIsLeapMonth ? "闰"
            + H[X.month - 1] : H[X.month - 1];
    this.lunarDate = X.day;
    this.showInLunar = this.lunarDateInChinese = Z(this.lunarMonth,
            this.lunarDate);
    if (this.lunarDate == 1) {
        this.showInLunar = this.lunarMonthInChinese + "月"
    }
    this.ganzhiYear = a(X.yearCyl);
    this.ganzhiMonth = a(X.monCyl);
    this.ganzhiDate = a(X.dayCyl++);
    this.jieqi = "";
    this.restDays = 0;
    if (c(this.solarYear, (this.solarMonth - 1) * 2) == f(Y, "d")) {
        this.showInLunar = this.jieqi = L[(this.solarMonth - 1) * 2]
    }
    if (c(this.solarYear, (this.solarMonth - 1) * 2 + 1) == f(Y, "d")) {
        this.showInLunar = this.jieqi = L[(this.solarMonth - 1) * 2 + 1]
    }
    if (this.showInLunar == "清明") {
        this.showInLunar = "清明节";
        this.restDays = 1
    }
    this.solarFestival = V[f(Y, "MM") + f(Y, "dd")];
    if (typeof this.solarFestival == "undefined") {
        this.solarFestival = ""
    } else {
        if (/\*(\d)/.test(this.solarFestival)) {
            this.restDays = parseInt(RegExp.$1);
            this.solarFestival = this.solarFestival.replace(/\*\d/, "")
        }
    }
    //是否显示农历
    //是否显示节假日
    this.showInLunar = (this.solarFestival == "") ? this.showInLunar == "清明节"?"清明节":""
            : this.solarFestival;

    this.lunarFestival = T[this.lunarIsLeapMonth ? "00"
            : G(this.lunarMonth) + G(this.lunarDate)];
    if (typeof this.lunarFestival == "undefined") {
        this.lunarFestival = ""
    } else {
        if (/\*(\d)/.test(this.lunarFestival)) {
            this.restDays = (this.restDays > parseInt(RegExp.$1)) ? this.restDays
                    : parseInt(RegExp.$1);
            this.lunarFestival = this.lunarFestival.replace(/\*\d/, "")
        }
    }
    if (this.lunarMonth == 12
            && this.lunarDate == e(this.lunarYear, 12)) {
        this.lunarFestival = T["0100"];
        this.restDays = 1
    }
    this.showInLunar = (this.lunarFestival == "") ? this.showInLunar
            : this.lunarFestival;
    this.showInLunar = (this.showInLunar.length > 4) ? this.showInLunar
            .substr(0, 2)
            + "..." : this.showInLunar
}

function MyDateSelect (today = new Date(), futureLength = 4) {
    let totalHtml = ''
    let currentDay = today.getDate(),
        currentMonth = today.getMonth(),
        currentYear = today.getFullYear()
    let dateDom = document.createElement('div')
    let pass = false
    dateDom.className = 'calendars-container calendar-div-init-class'

    const headTableHtml =`
        <table class="calendar-head">
            <tr>
                <th class='rest-day'>日</th>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th class='rest-day'>六</th>
            </tr>
        </table><div class="fixed-style">`

    totalHtml += headTableHtml

    function produceFullMonth (year, month) {
        //第一天星期几
        let dayOfFirstDay = (new Date(year, month, 1)).getDay()
        let thisMonthDaysNum = (new Date(year, month + 1, 0)).getDate()
        const monthData = {
            year: year,
            month: month,
            firstDay: dayOfFirstDay, //第一天星期几
            dayNum: thisMonthDaysNum //这月一共几天
        }
        return monthData
    }

    for(let n = 0; n < futureLength; n++) {
        let m = (currentMonth + n) % 12
        let y = currentYear + Math.floor((currentMonth + n) / 12)
        totalHtml += render(produceFullMonth(y, m))
    }

    dateDom.innerHTML = totalHtml + `</div>`

    function render (monthData) {
        let { month, year} = monthData,
            todayStr = `${currentYear},${currentMonth+1},${currentDay}`
        month ++ // month月要自加一, eg: 二月 getMonth会返回1
        let emptyTdHeadLength = monthData.firstDay,
            emptyTdEndLength = 6 - ((monthData.firstDay + monthData.dayNum - 1)%7)

        let html = `<h3>${year}年${month}月</h3><table class="calendar">`

        function defineClass (today) {

            if (today.isToday || today.isCurrentDay) {
                pass = true //今天都过了后面就不判断了
                return 'current-day'
            // } else if(today.solarYear < currentYear || today.solarMonth < currentMonth || today.solarDate < currentDay){
            } else if(new Date(today.solarYear, today.solarMonth-1, today.solarDate).getTime() < new Date(currentYear, currentMonth, currentDay).getTime()){
                return 'past'
            }else if(today.isRest || today.solarWeekDay%7 == 6 || today.solarWeekDay%7 == 0){
                //节假日或周末
                return 'rest-day';
            } else {
                return ''
            }
        }

        for(let n = 0; n < monthData.dayNum + emptyTdHeadLength + emptyTdEndLength; n ++) {
            if(n % 7 === 0) {
                html += '<tr>'
            }
            
            if(n < emptyTdHeadLength) {
                html += `<td></td>`
            } else if(n < emptyTdHeadLength + monthData.dayNum){
                let thisDay = n + 1 - emptyTdHeadLength //计算当天几号
                let TODAY = new U(new Date(year, month-1, thisDay), new Date(currentYear, currentMonth, currentDay));
                let className = '';
                className = defineClass(TODAY);
                html += `<td class="${className}" data="${year},${month},${thisDay}" data-past="${pass?'1':'0'}">${TODAY.showInLunar ? `<i>${TODAY.showInLunar}</i>` : ''}<span>${TODAY.isCurrentDay?"今天":thisDay}</span></td>`
            } else {
                html += `<td></td>`
            }

            if(n % 7 === 6) {
                html += '</tr>'
            }
        }

        html += `</table>`

        return html

    }

    return totalHtml 
}

export default MyDateSelect
