require('./css/cardTypeSelect.css')

let cardTypeSelect = Vue.extend({
  template: `<div><selection class="date_mask" :style="sMask" v-on:click="_submitCardType"></selection>
  	<dl class="date_pop" :class='animate' :style="sMask">
  		<dt>
  			<i v-on:click="_cancelDate">取消</i>
            <i v-on:click="_cancelDate"></i>
            <i v-on:click="_submitDate">确定</i>
  		</dt>
  		<dd v-on:touchstart="_touchstart" v-on:mousedown="_touchstart" v-on:touchmove="_touchmove" v-on:mousemove="_touchmove" v-on:mouseup="_touchend" v-on:touchend="_touchend">
  			<ul data-type="month" :data-y="distMonth" :style="sMonth">
                <li v-for="month in tMonth">{{month}}</li>
            </ul>
  		</dd>
  		<dd>
  			<ul :style="sMonthd">
                <li v-for="month in tMonth">{{ month }}</li>
            </ul>
  		</dd>
  	</dl>
  </div>`,
  data () {
  	return {

  	}
  },
  create () {

  }
})

export default cardTypeSelect
