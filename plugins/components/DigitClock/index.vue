<template>
    <div class="clock-box" ref="clock" :class="{ center }" :style="[{
        transform: `translate(${offsetX}px,${offsetY}px)`,
        '-webkit-transform': `translate(${offsetX}px,${offsetY}px)`,
        '-moz-transform': `translate(${offsetX}px,${offsetY}px)`,
        '--size': clockSize,
    }, clockTheme]">
        <slot name="header"></slot>
        <div class="clock" :class="{ dot }">
            <div class="content" v-for="i in 4" :key="i">
                <div class="block" v-for="j in 15" :key="j"
                    :class="{ active: numsMap[time[i - 1]][j - 1], second: second == getSeconds(i, j), dot }">
                    {{ second != getSeconds(i, j) & dot ? '•' : getSeconds(i, j).toString().padStart(2, '0') }}
                </div>
            </div>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
import time from '../../mixin/time'
const perHour = 3600000
export default {
    name: "DigitClock",
    mixins: [time],
    props: {
        size: {
            type: String | Number,
            default: 'fit',
            validator(val) {
                if (typeof val === 'number' && val < 16 * 12) {
                    console.error('digit-clock size should greater equal than 240!')
                }
                return !!val
            }
        },
        center: {
            type: Boolean,
            default: false,
        },
        offsetX: {
            type: Number,
            default: 0,
        },
        offsetY: {
            type: Number,
            default: 0,
        },
        theme: {
            type: String,
            default: 'auto',
            validator(val) {
                return !!val.trim()
            }
        },
        GMT: {
            type: Number,
            default: -new Date().getTimezoneOffset() / 60,
            validator(val) {
                return val <= 12 && val >= -12
            }
        },
        dot: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            clockSize: null
        }
    },
    computed: {
        numsMap() {
            return [
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0
                [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 1
                [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
                [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 3
                [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 4
                [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 5
                [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 6
                [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 7
                [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 8
                [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]  // 9
            ]
        },
        time() {
            const hour = this.formatCurrentTime.getHours().toString().padStart(2, '0')
            const minute = this.formatCurrentTime.getMinutes().toString().padStart(2, '0')
            return [Number(hour[0]), Number(hour[1]), Number(minute[0]), Number(minute[1])]
        },
        second() {
            return this.formatCurrentTime.getSeconds()
        },
        clockTheme() {
            const style = {}
            switch (this.theme) {
                case 'dark':
                    style['--bg'] = '#333'
                    style['--color'] = '#eee'
                    break
                case 'light':
                    style['--bg'] = '#eee'
                    style['--color'] = '#333'
            }
            return style
        },
        formatCurrentTime() {
            return this.GMT ? new Date((this.currentTime.getTimezoneOffset() / 60 + this.GMT) * perHour + this.currentTime.getTime()) : this.currentTime
        }
    },
    methods: {
        getSeconds(i, j) {
            return (i - 1) * 15 + j - 1
        },
        fitSize() {
            switch (this.size) {
                case 'large':
                    this.clockSize = `720px`
                    break
                case 'middle':
                    this.clockSize = `480px`
                    break
                case 'small':
                    this.clockSize = `240px`
                    break
                case 'screen':
                    this.clockSize = `max(50vmin, 240px)`
                    break
                case 'fit':
                    this.$nextTick(() => {
                        const { height, width } = this.$refs.clock.getBoundingClientRect()
                        this.clockSize = `max(${width / 2}px, 240px)`
                    })
                    break
                default:
                    if (this.size.toString().includes('%')) {
                        const { width } = this.$refs.clock.getBoundingClientRect()
                        this.clockSize = `max(${width * parseInt(this.size) / 100}px, 240px)`
                    }
                    else if (!isNaN(parseInt(this.size)) && parseInt(this.size) < 240)
                        this.clockSize = null
                    else
                        this.clockSize = `max(240px,${this.size}px)`
            }
        }
    },
    mounted() {
        this.fitSize()
        window.addEventListener('resize', this.fitSize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.fitSize)
    }
}
</script>

<style scoped>
[data-theme="dark"] .clock-box {
    --bg: #333;
    --color: #eee;
}

.clock-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    --bg: #eee;
    --color: #333;
    --size: 300px;
}

.clock {
    position: relative;
    display: flex;
    flex-flow: column wrap;
    width: var(--size);
    height: calc(var(--size) / 3);
    font-size: calc(var(--size) / 24);
    box-sizing: border-box;
    color: var(--bg);
    font-family: 'Courier New', Courier, monospace;
}

.content {
    display: contents;
}

.block {
    width: calc(100% / 16);
    height: 20%;
    transition: .4s;
    line-height: 1;
}

.content:not(:last-child) .block:last-child {
    padding-right: calc(100% / 16);
}

.content:nth-child(2) .block:last-child {
    padding-right: calc(100% / 8);
}

.block.active {
    color: var(--color);
    font-weight: 500;
}

.block.second {
    font-weight: 700;
    color: #FF8300;
}

.clock-box.center {
    inset: 0;
    position: absolute;
    margin: auto;
    height: fit-content;
}

</style>