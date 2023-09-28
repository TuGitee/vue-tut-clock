import directives from './directives'
import components from './components'
import methods from './methods'

const install = {
    install(Vue, options) {
        directives.forEach(directive => Vue.use(directive, options))
        components.forEach(component => Vue.use(component))
        methods.forEach(method => Vue.use(method))
    },
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install)
}
