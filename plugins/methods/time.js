import { formatTime } from '../utils/time'
export default {
    install(Vue) {
        Vue.prototype.$time = formatTime
    }
}
