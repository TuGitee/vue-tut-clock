import FlipClock from './FlipClock'
import FlipColckGroup from './FlipClockGroup'

export default {
    install(Vue) {
        const componentList = [FlipClock, FlipColckGroup]
        componentList.forEach((component) => Vue.component(component.name, component))
    }
}