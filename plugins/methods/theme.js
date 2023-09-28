import { switchTheme } from '../utils/theme'

export default {
    install(Vue) {
        const switchThemeMethod = switchTheme()
        switchThemeMethod()
        Vue.prototype.$switchTheme = switchThemeMethod
    }
}
