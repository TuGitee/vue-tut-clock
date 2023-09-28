import directives from './directives'
import components from './components'
import methods from './methods'

export default {
    install(Vue,options) {
        directives.forEach(directive => Vue.use(directive, options))
        components.forEach(component => Vue.use(component))
        methods.forEach(method => Vue.use(method))
    },
}