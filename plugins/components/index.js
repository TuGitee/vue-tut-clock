import FlipClock from './FlipClock'
import ClockGroup from './ClockGroup'
import CircleClock from './CircleClock'

export default [FlipClock, ClockGroup, CircleClock].map(component =>
({
    install(Vue) {
        Vue.component(component.name, component)
    }
}))