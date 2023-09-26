import directives from './directives'
import components from './components'

export default {
    install(Vue){
        Vue.use(directives)
        Vue.use(components)
    }
}