import directives from './directives'
import components from './components'
import methods from './methods'

import { getStartTimeOfNextSecond } from "./store/time";

async function updateCurrentTime(){
    await getStartTimeOfNextSecond()
    updateCurrentTime()
}

const install = {
    install(Vue, options) {
        directives.forEach(directive => Vue.use(directive, options))
        components.forEach(component => Vue.use(component))
        methods.forEach(method => Vue.use(method))

        updateCurrentTime()
    },
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install)
}
