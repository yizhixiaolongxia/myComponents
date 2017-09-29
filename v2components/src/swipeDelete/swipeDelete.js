require('./css/swipeDelete.css')
let swipeDelete = Vue.extend({
    template: `
    <div class='zs-parent-drag' ref="parentDrag">
        <div class="zs-child-drag" v-on:touchstart.stop="touchstart($event)" v-on:touchmove.stop="touchmove($event)" v-on:touchend.stop="touchend($event)" ref="childDrag">
          <slot name='content'></slot>
        </div>
        <div class="zs-swipe-button">
            <slot name='button'></slot>
        </div>   
    </div>`,
    props: {
        initX: {//X轴最后的坐标
            type: Number,
            default: -1
        },
        buttonWidth: {//按钮宽度
            type: Number,
            default: 55
        },
        // totalWidth: {
        //     type: String,
        //     default: ''
        // },
        // totalHeight: {
        //     type: String,
        //     default: "10rem"
        // },
        helpWidth: {//阀值
            type: Number,
            default: 60
        },
        timeSlot: {//时间差,单位为毫秒
            type: Number,
            default: 100
        },
        widthSlot: {//点击移动距离判断
            type: Number,
            default: 40
        },
        swipeLimit: {
            type: Array,
            default: function () {
                return [-100, 10]
            }
        },
        tapStartCallback: {
            type: Function,
            default: function () {
            }
        },
        clickCallback: {
            type: Function,
            default: function () {
            }
        }
    },
    distX: 0,
    lastX: -1,
    dist2X: 0,
    T1: 0,
    T2: 0,
    wX1: 0,
    hY1: 0,
    styleObj: null,
    mounted () {
        this.styleObj = this.$refs.childDrag.style
        //this.$el.style.width = this.totalWidth
        //this.$el.style.height = this.totalHeight
    },
    methods: {
        getTranslate () {
            return parseInt(this.styleObj.webkitTransform.replace(/translate3d|\(|\)]/g, '')) || 0
        },
        touchstart (e) {
            //取屏幕坐标初值
            this.wX1 = e.touches[0].screenX
            this.hY1 = e.touches[0].screenY
            // let oDiv=document.getElementById("childDrag")
            //移动出的距离长度，初值,以left为坐标，按下时,正则表示只留数字和+-号
            let translateX = this.getTranslate()
            this.distX = e.touches[0].clientX - translateX
            this.T1 = (new Date()).getTime()//取按下的时间
            this.styleObj.webkitTransition = 'none'
            this.tapStartCallback(this)
            return false
        },
        touchmove (e) {
            let wX2 = e.touches[0].screenX
            let hY2 = e.touches[0].screenY
            if (Math.abs(hY2 - this.hY1) / Math.abs(wX2 - this.wX1) > 0.5) {
                return
            }
            let translateX = this.getTranslate()
            if (this.swipeLimit && (translateX > this.swipeLimit[1] || translateX < this.swipeLimit[0])) {
                return
            }

            this.lastX = e.touches[0].clientX//最后的x轴坐标
            let iL = e.touches[0].clientX - this.distX//移动出的距离长度
            this.styleObj.webkitTransform = "translate3d(" + iL + "px, 0, 0)"
            return false
        },
        touchend (e) {
            let iL = this.lastX - this.distX
            this.styleObj.webkitTransition = '-webkit-transform 0.3s linear'
            //判断点击事件
            let translateX = this.getTranslate()
            this.dist2X = this.lastX - translateX //取离开的距离长度
            this.T2 = (new Date()).getTime() //取离开的时间
            if (Math.abs(this.T2 - this.T1) < this.timeSlot && (Math.abs(this.dist2X - this.distX) < this.widthSlot) || this.lastX == -1) {
                this.clickCallback(this)
                this.close()
                return
            }

            if (iL < (-this.helpWidth)) {
                this.open()
            } else {
                this.close()
            }
        },
        open () {
            this.lastX = -1
            this.styleObj.webkitTransform = "translate3d(" + (-this.buttonWidth) + "px,0,0)"
        },
        close () {
            this.lastX = -1
            this.styleObj.webkitTransform = "translate3d(0px,0,0)"
        },
        destroy () {
            this.$el.remove()
            this.$destroy()
        }
    }
})

export default swipeDelete

