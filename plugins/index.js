import directives from './directives'
import components from './components'
import theme from './utils/theme'

export default {
    install(Vue){
        Vue.use(directives)
        Vue.use(components)
        Vue.use(theme)
    }
}