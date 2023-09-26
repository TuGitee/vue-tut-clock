import { formatTime } from '../utils/time'

export default {
    install(Vue) {
        Vue.directive('time', {
            bind(el, binding, vnode) {
                if (typeof binding.value === 'number') {
                    throw new TypeError('Type of time Expression should be String or Date')
                }
                if (vnode.children?.length) {
                    console.warn('v-time will override element children.')
                }
                el.innerText = formatTime(binding.value)
            }
        })
        Vue.prototype.$time = formatTime
    }
}
