import FlipClock from './FlipClock'
import ClockGroup from './ClockGroup'
import CircleClock from './CircleClock'

export default {
    install(Vue) {
        const componentList = [FlipClock, ClockGroup, CircleClock]
        componentList.forEach((component) => Vue.component(component.name, component))
    }
}