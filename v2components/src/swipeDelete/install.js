import swipeDelete from './swipeDelete.js'

export default function (Vue, V2Components) {
    if(V2Components) {
        V2Components.swipeDelete = swipeDelete
    }
    Vue.component('swipe-delete', swipeDelete)
}
