import baseInput from './baseInput'
// require('./css/onecardTypeSelect.css')

var support = {
  transform3d: ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())
}

var unit = (function () {
  var fn = {}

  fn.getPage = function (event, page) {
    return event.changedTouches[0][page]
  }

  fn.getTranslate = function (x, y) {
    var distX = x,
      distY = y

    return support.transform3d ? 'translate3d(' + 0 + 'px, ' + distY + 'px, 0)' : 'translate(' + distX + 'px, ' + distY + 'px)'
  }

  fn.eventStop = function (e) {
    e.preventDefault()
    e.stopPropagation()
  }

    // fn.getArea = function(cityid){
    //     if (!cityid) {
    //         cityid = 1;
    //     }
    //     var arr = ['','',''];
    //     arr = arr.concat(AREA.filter(function(ele, index){
    //         return ele.CityID == cityid
    //     }));
    //     return arr.concat(['','','']);
    // }

    // fn.getCity = function(proid) {
    //     if (!proid) {
    //         proid = 1;
    //     }
    //     var arr = ['','',''];
    //     arr = arr.concat(CITY.filter(function(ele, index){
    //         return ele.ProID == proid;
    //     }));
    //     return arr.concat(['','',''])
    // };

    // fn.getProvin = function() {
    //     var arr = ['','',''];
    //     arr = arr.concat(PROVINCES);
    //     return arr.concat(['', '', '']);
    // };
  // fn.getIndex = function (arr, one) {
  //   let zarr = ['', '', '']
  //   zarr = zarr.concat(arr)
  //   zarr = zarr.concat(['', '', ''])

  //   for (let i = 0; i < zarr.length; i++) {
  //     if (zarr[i] === one) {
  //       return i
  //     }
  //   }
  //   return 0
  // }
  fn.getCardType = function (array) {
    var arr = ['', '', '']
    if (array) {
      arr = arr.concat(array)
    }
    return arr.concat(['', '', ''])
  }
  return fn
})()

let cardTypeSelectInput = Vue.extend({
  template: `<div><section class="date_mask" :style="sMask" ></section>
    <dl class="birth_date_pop_one" :class='animate' :style="sMask">
        <dt>
            <i v-on:click="_cancelAddr">取消</i>
            <i>{{titleText}}</i>
            <i v-on:click="_submitAddr">确定</i>
        </dt>
        <dd v-on:touchstart="_touchstart" v-on:touchmove="_touchmove" v-on:touchend="_touchend">
            <ul data-type="provin" :data-y="distYear" :style="sYear">
                <li v-for="provin in tProvins">{{provin}}</li>
            </ul>
            
        </dd>
        <dd>
            <ul :style="sYeard">
                <li v-for="provin in tProvins">{{provin}}</li>
            </ul>
            
        </dd></dl></div>`,
  data () {
    return {
      inputModel: '',
      tTextHolder: true,
      tProvins: unit.getCardType(),
      sMonth: {},
      sMonthd: {},
      sYear: {},
      sYeard: {},
      sMask: {},
      sDay: {},
      sDayd: {},

      dAddress: '',
      dCity: 1,
      dProvin: 1,
      dArea: 1,

      distMonth: 0,
      distYear: 0,
      distDay: 0,

      animate: ''
    }
  },
  props:{
    titleText: {
      type: String,
      default: '请选择'
    },
  },
  methods: {
    showAddr: function (arr) {
      this.tProvins = unit.getCardType(arr)
      
      var self = this
      // self.dProvin = Index - 2
      self.dCity = 1
      self.dArea = 1
      var d = 0,
        dd = -90,
        m = 0,
        md = -90,
        // y = 0,
        // yd = -90
        // y = -(Index * 30 - 90),
        // yd = -(Index * 30)
        y = (4-self.dProvin)*30 - 90,
        yd = (1-self.dProvin)*30 - 90

      self.sYear = {
        '-webkit-transform': 'translate3d(0, ' + y + 'px, 0)'
      }
      self.sYeard = {
        '-webkit-transform': 'translate3d(0, ' + yd + 'px, 0)'
      }
      self.sMask = {
        'display': 'block'
      }

      self.distDay = d
      self.distMonth = m
      self.distYear = y

      setTimeout(function () {
        self.animate = 'animate_show'
      }, 50)
    },
    _cancelAddr: function (e) {
      var self = this
      self.animate = 'animate_hide'
      setTimeout(function () {
        self.sMask = {
          'display': 'none'
        }
      }, 210)

      self.tTextHolder = true
      this.$emit('cancelAddr', self.dAddress)
    },

    _submitAddr: function (e) {
      var self = this
      self.inputModel = self.dAddress = `${this.tProvins[this.dProvin + 2]}`
      self.animate = 'animate_hide'
      setTimeout(function () {
        self.sMask = {
          'display': 'none'
        }
      }, 210)

      self.tTextHolder = false
      this.$emit('submitAddr', self.dAddress)
    },

    _touchstart: function (e) {
      var self = this,
        $that = e.target.parentNode

      unit.eventStop(e)

      self.newY = parseInt($that.dataset.y, 0)
      self.len = $that.querySelectorAll('li').length
      self.h = (self.len - 7) * 30
      self.itype = $that.dataset.type
      self.basePageY = unit.getPage(e, 'pageY')
    },

    _touchmove: function (e) {
      var self = this,
        $that = e.target.parentNode,
        pageY = unit.getPage(e, 'pageY'),
        distY,
        moveY = 0

      unit.eventStop(e)

      distY = pageY - self.basePageY
      self.moveY = distY
      moveY = distY + self.newY

      if (moveY <= 0 && moveY >= -self.h) {
        moveY = moveY
      } else if (moveY > 0) {
        moveY = moveY / 3
      } else if (moveY < -self.h) {
        moveY = (moveY + self.h) / 3 - self.h
      }

      self._refresh({
        'e': e,
        'x': 100,
        'y': moveY,
        'timer': '0s',
        'type': 'ease',
        'move': true
      })
    },

    _touchend: function (e) {
      var self = this,
        $that = e.target.parentNode

      if (!self.moveY) return

      var moveY = self.moveY + self.newY

      if (moveY >= 0) {
        moveY = 0
      } else if (moveY <= -self.h) {
        moveY = -self.h
      }

      self.newY = moveY

      $that.dataset.y = self.newY

      self._refresh({
        'e': e,
        'x': 100,
        'y': moveY,
        'timer': '0.5s',
        'type': 'ease-in-out',
        'move': false
      })
    },
    _refresh: function (params) {
      var self = this
      var $that = params.e.target.parentNode,
        timer = params.timer,
        type = params.type,
        x = params.x,
        y = params.y
      var dayY = 0

      if (!params.move) {
        var num = Math.round(Math.abs(y) / 30),
          tmp = num + 1,
          dtmp = parseInt(self.dArea, 0),
          mtmp = parseInt(self.dCity, 0),
          ytmp = parseInt(self.dProvin, 0)

        if (self.itype == 'area') {
          self.dArea = tmp
                    // self.dCity = mtmp;
                    // self.dProvin = ytmp;
        } else if (self.itype == 'city') {
          self.dArea = 1
          self.dCity = tmp
          self.dProvin = ytmp
        } else {
          self.dArea = 1
          self.dCity = 1
          self.dProvin = tmp
        }

        y = -(num * 30)
        self.tTextHolder = false
      }

      if (self.itype == 'area') {
        self.sDay = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y)
        }
        self.sDayd = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y - 90)
        }
      }
      if (self.itype == 'city') {
        self.sDay = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, 0)
        }
        self.sDayd = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, -90)
        }

        self.sMonth = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y)
        }
        self.sMonthd = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y - 90)
        }
      }

      if (self.itype == 'provin') {
        self.sDay = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, 0)
        }
        self.sDayd = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, -90)
        }

        self.sMonth = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, 0)
        }
        self.sMonthd = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, -90)
        }
        self.sYear = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y)
        }
        self.sYeard = {
          '-webkit-transition': '-webkit-transform ' + timer + ' ' + type,
          '-webkit-transform': unit.getTranslate(x, y - 90)
        }
      }
    }

  }
})

// 创建卡类型组件
let cardtypeInput = baseInput.extend({
  template: `<div class='v2-input-container'>
    <div class='v2-input'><label>{{labelText}}</label><input v-if='!readonly' :maxlength='maxLength' :placeholder='placeholder' readonly='readonly' v-on:click.stop.prevent='onFocus(selectedArr)'  type='text' v-model='inputData' /><div class='v-input-text' v-if='readonly'>{{inputData}}</div><div v-show='displayBlack' class='v2-input-black'><p>{{_inputData}}</p></div><div v-show='displayClear && !readonly' v-on:click='onClear' class='v2-input-clear'><i></i></div><slot></slot></div>
    <div class='v2-input-error' :class='displayErr'>{{errMsg}}</div>
    <cardtype-select v-on:submitAddr='getAddr' ref='addressSelect' :title-text='titleText'></cardtype-select></div>`,
  props: {
    labelText: {
      type: String,
      default: '证件类型'
    },
    titleText: {
      type: String,
      default: '请选择'
    },
    errMsg: {
      type: String,
      default: '格式错误'
    },
    placeholder: {
      type: String,
      default: '请选择类型'
    },
    selectedArr: ['selectedArr']
  },
  components: {
    'cardtype-select': cardTypeSelectInput
  },
  data () {
    return {
      maxLength: 10,
      displayBlackCover: false
    }
  },
  methods: {
    onFocus (data) {
      this.$refs.addressSelect.showAddr(data)
    },
    getAddr (addr) {
      this.inputData = addr
    }

  }
})

export default cardtypeInput
