import FlipClock from './FlipClock'
import FlipColckGroup from './FlipClockGroup'
import CircleClock from './CircleClock'

export default {
    install(Vue) {
        const componentList = [FlipClock, FlipColckGroup, CircleClock]
        componentList.forEach((component) => Vue.component(component.name, component))
    }
}