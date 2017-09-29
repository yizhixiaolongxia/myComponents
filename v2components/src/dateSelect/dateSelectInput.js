require('./css/1.css');
var support = {
    transform3d: ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix())
};

var isPc = (function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        })()
var unit = (function() {
    var fn = {};

    fn.getPage = function(event, page) {
        if(isPc) {
            return event[page];
        } else {
           return event.changedTouches[0][page]; 
        }
        
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
            month = tDate.getMonth() + 1,
            year = parseInt(fn.getTwoYear(tDate.getFullYear()), 0);

        return {
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

    fn.getMonth = function() {
        var arr = [' ', ' ', ' ','01 月', '02 月', '03 月', '04 月', '05 月', '06 月', '07 月', '08 月', '09 月', '10 月', '11 月', '12 月', ' ', ' ',' '];

        return arr;
    };

    fn.getYear = function() {
        var tDate = new Date(),
            year = parseInt(tDate.getFullYear().toString(), 0);
        var arr = [' ', ' ',' '];

        for (var i = 0; i <= 30; i++) {
            arr.push((year + i) + " 年");
        }

        arr.push(' ');
        arr.push(' ');
        arr.push(' ');
        console.log()
        return arr;
    };

    fn.getTwoYear = function(year) {
        return year.toString().substr(2);
    };

    return fn;
})();

let dateSelectInput = Vue.extend({
    template : `<div><section class="date_mask" :style="sMask" v-on:click="_submitDate"></section>
    <dl class="date_pop" :class='animate' :style="sMask">
        <dt>
            <i v-on:click="_cancelDate">取消</i>
            <i v-on:click="_cancelDate"></i>
            <i v-on:click="_submitDate">确定</i>
        </dt>
        <dd  v-on:touchstart="_touchstart" v-on:mousedown="_touchstart" v-on:touchmove="_touchmove" v-on:mousemove="_touchmove" v-on:mouseup="_touchend" v-on:touchend="_touchend">
            <ul data-type="month" :data-y="distMonth" :style="sMonth">
                <li v-for="month in tMonth">{{month}}</li>
            </ul>
            <ul data-type="year" :data-y="distYear" :style="sYear">
                <li v-for="year in tYear">{{year}}</li>
            </ul>
        </dd>
        <dd>
            <!-- <span class='month_tip'>月</span> -->
            <ul :style="sMonthd">
                <li v-for="month in tMonth">{{ month }}</li>
            </ul>
            <!-- <span class='space_tip'>/</span> -->
            <ul :style="sYeard">
                <li v-for="year in tYear">{{ year }}</li>
            </ul>
            <!-- <span class='year_tip'>年</span> -->
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

                dDate: '',
                dMonth: '',
                dYear: '',

                distMonth: 0,
                distYear: 0,

                animate: '',
                bDrag:false,
                distY:0

        };
    },
  created(){
        var toucheEvents={
            touchstart:"touchstart",
            touchmove:"touchmove",
            touchend:"touchend",
        }
        var initTouchEvents = function(){
            if(this.isPc()){
            this.touchstart="mousedown";
            this.touchmove="mousemove";
            this.touchend="mouseup";
           }
        }
     },
    methods: {
       isPc:function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        showDate: function() {
            var self = this;

            if (!self.dMonth) {
                self.dMonth = unit.formatDate().month;
            }

            if (!self.dYear) {
                self.dYear = unit.formatDate().year;
            }

            var m = (4 - self.dMonth) * 30 - 90,
                md = (1 - self.dMonth) * 30 - 90,
                y = (3 - (self.dYear - unit.formatDate().year)) * 30 - 90,
                yd = (unit.formatDate().year - self.dYear) * 30 - 90;

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
            self.sMask = {
                'display': 'block'
            };

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

            if (!self.dMonth) {
                self.dMonth = unit.formatDate().month;
            }

            if (!self.dYear) {
                self.dYear = unit.formatDate().year;
            }

            self.dDate = unit.addZero(self.dMonth) + "/" + self.dYear;
            self.inputModel = unit.addZero(self.dMonth) + "/" + self.dYear;

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
                if(isPc) {
                    this.bDrag = true
                }

            unit.eventStop(e);
            self.newY = parseInt($that.dataset.y, 0);
            self.len = $that.querySelectorAll('li').length;
            self.h = (self.len - 7) * 30;
            self.itype = $that.dataset.type;
            self.basePageY = unit.getPage(e, "pageY");
        },
        // _mousedown:function(e){ 
        //     var self=this,
        //     $that = e.target.parentNode;
        //     self.bDrag = true;
        //     self.distY=e.clientY-self.offsetTop;
        //     return false
        // },
        _touchmove: function(e) {
            if(isPc && !this.bDrag) {
                return
            }
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
        // _mousemove:function(e){
        //      var self = this,
        //         $that = e.target.parentNode;
        //        // var  pageY=0;
        //     if(!self.bDrag){
        //         return
        //     }
        //      var iT=e.clientY-self.distY
        //      // self.style.marginTop=self.style.marginLeft=0
        //       pageY = unit.getPage(e, "pageY"),
        //      //self.style.top=iT+'px',
        //      unit.eventStop(e);
        //      return false
        // },

        _touchend: function(e) {
            if(isPc) {
                this.bDrag = false
            }
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
        // _mouseup:function(){
        //    this.bDrag=false;
        // },

        _refresh: function(params) {
            var self = this;

            var $that = params.e.target.parentNode,
                timer = params.timer,
                type = params.type,
                x = params.x,
                y = params.y;

            if (!params.move) {
                var num = Math.round(Math.abs(y) / 30),
                    tmp = num + 1,
                    mtmp = parseInt(self.dMonth, 0),
                    ytmp = parseInt(self.dYear, 0);

                if (!mtmp) {
                    mtmp = unit.formatDate().month;
                }

                if (!ytmp) {
                    ytmp = unit.formatDate().year;
                }

                if (self.itype == 'month') {
                    tmp = unit.addZero(tmp);

                    self.dMonth = num + 1;
                    self.dYear = ytmp;
                    self.dDate = tmp + "/" + ytmp;
                    self.inputModel = tmp + "/" + ytmp;
                } else {
                    self.dMonth = mtmp;
                    self.dYear = unit.formatDate().year + num;
                    self.dDate = unit.addZero(mtmp) + "/" + (unit.formatDate().year + num);
                    self.inputModel = unit.addZero(mtmp) + "/" + (unit.formatDate().year + num);
                }

                y = -(num * 30);

                self.tTextHolder = false;
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
            } else {
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

export default dateSelectInput