import FlipClock from './FlipClock'
import ClockGroup from './ClockGroup'
import CircleClock from './CircleClock'
import DigitClock from './DigitClock'

export default [FlipClock, ClockGroup, CircleClock,DigitClock].map(component =>
({
    install(Vue) {
        Vue.component(component.name, component)
    }
}))