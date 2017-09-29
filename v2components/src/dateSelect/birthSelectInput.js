require('./css/birthSelect.css');
var support = {
    transform3d: ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix())
};

var unit = (function() {
    var fn = {};

    fn.getPage = function(event, page) {
        return event.changedTouches[0][page];
    };

    fn.getTranslate = function(x, y) {
        var distX = x,
            distY = y;

        return support.transform3d ? "translate3d(" + distX + "px, " + distY + "px, 0)" : "translate(" + distX + "px, " + distY + "px)";
    };

    fn.eventStop = function(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    fn.formatDate = function() {
        var tDate = new Date(),
            day = tDate.getDate(),
            month = tDate.getMonth() + 1,
            year = parseInt(tDate.getFullYear(), 0);

        return {
            day:day,
            month: month,
            year: year
        };
    };

    fn.addZero = function(num) {
        num = num+'';
        if (num.length<2) {
            num = '0' + num;
        }

        return num;
    };
    

    fn.getDay = function(year, month){
        var days = ['','','','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
        var largeMonth = [1,3,5,7,8,10,12];
        var middleMonth = [4,6,9,11];
        var isLeapYear = year%4 == 0? true:false;
        if (largeMonth.indexOf(month)>-1) {
            days = days.concat(['29','30', '31', '','','']);
        }

        if (middleMonth.indexOf(month)>-1) {
            days = days.concat(['29','30', '','','']);
        }

        if (month == 2) {
            if (isLeapYear) {
                days.push('29');
            };
            days = days.concat(['', '', '']);
        }
        return days;
    }

    fn.getMonth = function() {
        var arr = ['', '', '','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '', '','']

        return arr;
    };

    fn.getYear = function() {
        var tDate = new Date(),
            year = parseInt(tDate.getFullYear().toString(), 0);
        var arr = ['', '',''];

        for (var i = 0; i <= 60; i++) {
            arr.push(year - i);
        }

        arr = arr.concat(['', '', '']);
        return arr;
    };
    return fn;
})();

let birthSelectInput = Vue.extend({
    template : `<div><section class="date_mask" :style="sMask"></section>
    <dl class="birth_date_pop" :class='animate' :style="sMask">
        <dt>
            <i v-on:click="_cancelDate">取消</i>
            <i>选择出生日期</i>
            <i v-on:click="_submitDate">确定</i>
        </dt>
        <dd v-on:touchstart="_touchstart" v-on:touchmove="_touchmove" v-on:touchend="_touchend">
            <ul data-type="year" :data-y="distYear" :style="sYear">
                <li v-for="year in tYear">{{year?year+'年':''}}</li>
            </ul>
            <ul data-type="month" :data-y="distMonth" :style="sMonth">
                <li v-for="month in tMonth">{{month?month+'月':''}}</li>
            </ul>
            <ul data-type="day" :data-y="distDay" :style="sDay">
                <li v-for="day in tDays">{{day?day+'日':''}}</li>
            </ul>
        </dd>
        <dd>
            <ul :style="sYeard">
                <li v-for="year in tYear">{{year?year+'年':''}}</li>
            </ul>
            <ul :style="sMonthd">
                <li v-for="month in tMonth">{{month?month+'月':''}}</li>
            </ul>
            <ul :style="sDayd">
                <li v-for="day in tDays">{{day?day+'日':''}}</li>
            </ul>
        </dd></dl></div>`,
   data () {
        return {
                inputModel: '',

                tTextHolder: true,
                tMonth: unit.getMonth(),
                tYear: unit.getYear(),

                sMonth: {},
                sMonthd: {},
                sYear: {},
                sYeard: {},
                sMask: {},
                sDay:{},
                sDayd:{},

                dDate: '',
                dMonth: '',
                dYear: '',
                dDay:'',

                distMonth: 0,
                distYear: 0,
                distDay:0,

                animate: ''
        };
    },
    computed:{
        tDays(){ return unit.getDay(this.dYear,Number(this.dMonth))}
    },
    methods: {
        showDate: function() {
            var self = this;

            if (!self.dDay) {
                self.dDay = unit.formatDate().day;
            }

            if (!self.dMonth) {
                self.dMonth = unit.formatDate().month;
            }

            if (!self.dYear) {
                self.dYear = unit.formatDate().year;
            }

            var d = (4 - self.dDay) * 30 - 90,
                dd = (1 - self.dDay) * 30 - 90,
                m = (4 - self.dMonth) * 30 - 90,
                md = (1 - self.dMonth) * 30 - 90,
                y = (3 - (unit.formatDate().year - self.dYear)) * 30 - 90,
                yd = (self.dYear - unit.formatDate().year ) * 30 - 90;

            self.sMonth = {
                '-webkit-transform': 'translate3d(0, ' + m + 'px, 0)'
            };
            self.sMonthd = {
                '-webkit-transform': 'translate3d(0, ' + md + 'px, 0)'
            };
            self.sYear = {
                '-webkit-transform': 'translate3d(0, ' + y + 'px, 0)'
            };
            self.sYeard = {
                '-webkit-transform': 'translate3d(0, ' + yd + 'px, 0)'
            };
            self.sDay = {
                '-webkit-transform': 'translate3d(0, ' + d + 'px, 0)'
            };
            self.sDayd = {
                '-webkit-transform': 'translate3d(0, ' + dd + 'px, 0)'
            };
            self.sMask = {
                'display': 'block'
            };

            self.distDay = d;
            self.distMonth = m;
            self.distYear = y;

            setTimeout(function() {
                self.animate = "animate_show";
            }, 50);
        },
        _cancelDate: function(e) {
            var self = this;

            // self.dDate = self.tText;
            // self.dMonth = "";
            // self.dYear = "";
            // self.inputModel = "";

            self.animate = "animate_hide";
            setTimeout(function() {
                self.sMask = {
                    'display': 'none'
                };
            }, 210);

            self.tTextHolder = true;
            this.$emit('cancelDate', self.dDate)
        },

        _submitDate: function(e) {
            var self = this;

            
            if (!self.dMonth || (self.dYear === unit.formatDate().year && self.dMonth > unit.formatDate().month)) {
                self.dMonth = unit.formatDate().month;
                self.dMonth = unit.addZero(self.dMonth)
            } else {
                self.dMonth = unit.addZero(self.dMonth)
            }

            if (!self.dYear) {
                self.dYear = unit.formatDate().year;
            }
            if (!self.dDay || (self.dYear === unit.formatDate().year && self.dMonth == unit.formatDate().month && self.dDay > unit.formatDate().day)) {
                self.dDay = unit.formatDate().day;
                self.dDay = unit.addZero(self.dDay)
            } else {
                self.dDay = unit.addZero(self.dDay)
            }

            self.inputModel = self.dDate = `${self.dYear}-${self.dMonth}-${self.dDay}`;

            self.animate = "animate_hide";
            setTimeout(function() {
                self.sMask = {
                    'display': 'none'
                };
            }, 210);

            self.tTextHolder = false;
            this.$emit('submitDate', self.dDate)
        },

        _touchstart: function(e) {
            var self = this,
                $that = e.target.parentNode;

            unit.eventStop(e);

            self.newY = parseInt($that.dataset.y, 0);
            self.len = $that.querySelectorAll('li').length;
            self.h = (self.len - 7) * 30;
            self.itype = $that.dataset.type;
            self.basePageY = unit.getPage(e, "pageY");
        },

        _touchmove: function(e) {
            var self = this,
                $that = e.target.parentNode,
                pageY = unit.getPage(e, "pageY"),
                distY,
                moveY = 0;

            unit.eventStop(e);

            distY = pageY - self.basePageY;
            self.moveY = distY;
            moveY = distY + self.newY;

            if (moveY <= 0 && moveY >= -self.h) {
                moveY = moveY;
            } else if (moveY > 0) {
                moveY = moveY / 3;
            } else if (moveY < -self.h) {
                moveY = (moveY + self.h) / 3 - self.h;
            }

            self._refresh({
                'e': e,
                'x': 0,
                'y': moveY,
                'timer': '0s',
                'type': 'ease',
                'move': true
            });
        },

        _touchend: function(e) {
            var self = this,
                $that = e.target.parentNode;

            if (!self.moveY) return;

            var moveY = self.moveY + self.newY;

            if (moveY >= 0) {
                moveY = 0;
            } else if (moveY <= -self.h) {
                moveY = -self.h;
            }

            self.newY = moveY;

            $that.dataset.y = self.newY;

            self._refresh({
                'e': e,
                'x': 0,
                'y': moveY,
                'timer': '0.5s',
                'type': 'ease-in-out',
                'move': false
            });
        },
        _resetDay: function(dtmp, timer){
            var self = this;
            dtmp = Number(dtmp);
            if (dtmp < 10) {
                dtmp = '0'+dtmp.toString();
            }
            if (self.tDays.indexOf(dtmp.toString())>-1) {
                self.dDay = dtmp;
            }else{
                self.dDay = self.tDays[self.tDays.length-4];
                var dayY = -(Number(self.dDay)-1)*30;
                //修改位移
                self.sDay = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + 'day',
                    '-webkit-transform': unit.getTranslate(0, dayY)
                };
                self.sDayd = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + 'day',
                    '-webkit-transform': unit.getTranslate(0, dayY-90)
                };
            }
        },
        _refresh: function(params) {
            var self = this;
            var $that = params.e.target.parentNode,
                timer = params.timer,
                type = params.type,
                x = params.x,
                y = params.y;
            var dayY = 0;

            if (!params.move) {
                var num = Math.round(Math.abs(y) / 30),
                    tmp = num + 1,
                    dtmp = parseInt(self.dDay, 0),
                    mtmp = parseInt(self.dMonth, 0),
                    ytmp = parseInt(self.dYear, 0);

                if (!dtmp) {
                    dtmp = unit.formatDate().day;
                }

                if (!mtmp) {
                    mtmp = unit.formatDate().month;
                }

                if (!ytmp) {
                    ytmp = unit.formatDate().year;
                }
                

                if (self.itype == 'day') {
                    tmp = unit.addZero(tmp);
                    self.dDay = num + 1;
                    self.dMonth = mtmp;
                    self.dYear = ytmp;
                }else if (self.itype == 'month') {
                    tmp = unit.addZero(tmp);
                    self.dMonth = num + 1;
                    self.dYear = ytmp;

                    //29、30、31有可能没有
                    this._resetDay(dtmp, timer);
                } else {
                    self.dMonth = mtmp;
                    self.dYear = unit.formatDate().year - num;

                    //29、30、31有可能没有
                    this._resetDay(dtmp, timer);
                }
                // self.inputModel = self.dDate = self.dYear+self.dMonth+self.dDay;
                y = -(num * 30);

                self.tTextHolder = false;
            }

            if (self.itype == 'day') {
                self.sDay = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y)
                };
                self.sDayd = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y - 90)
                };
            }
            if (self.itype == 'month') {
                self.sMonth = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y)
                };
                self.sMonthd = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y - 90)
                };
            } 

            if(self.itype == 'year') {
                self.sYear = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y)
                };
                self.sYeard = {
                    '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
                    '-webkit-transform': unit.getTranslate(x, y - 90)
                };
            }
        }
    }
   
   
})

export default birthSelectInput