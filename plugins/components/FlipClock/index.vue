<template>
    <div class="clock-box" :class="{ center, active }" :style="[{
        transform: `translate(${offsetX}px,${offsetY}px)`,
        '-webkit-transform': `translate(${offsetX}px,${offsetY}px)`,
        '-moz-transform': `translate(${offsetX}px,${offsetY}px)`,
        'flex-wrap': wrap ? 'wrap' : 'nowrap'
    }, clockSize, clockTheme]">
        <header class="header">
            <slot name="header">
                <h2 v-if="deadline" v-html="missMessage"></h2>
                <p v-if="deadline">今日 {{ $time(void (0), 'YYYY-MM-DD') }}</p>
            </slot>
        </header>
        <div class="clock" ref="clock">
            <div class="contents" v-for="i in formatter">
                <div class="flip down" v-if="isKey(i)">
                    <div class="digital front number0"></div>
                    <div class="digital back number1"></div>
                </div>
                <em v-else>{{ i.replace(' ', '&nbsp;') }}</em>
            </div>
        </div>

        <footer class="footer">
            <slot name="footer">
                <p v-if="deadline">到达日 {{ $time(deadline) }}</p>
            </slot>
        </footer>
    </div>
</template>

<script>
import { getTimeGap } from '../../utils/time'
export default {
    name: 'FlipClock',
    props: {
        formatter: {
            type: String,
            default: 'hh:ii:ss',
            validator(val) {
                return val.trim()
            }
        },
        size: {
            type: String | Number,
            default: 'fit',
            validator(val) {
                return val.trim()
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
                return val.trim()
            }
        },
        GMT: {
            type: Number,
            default: -new Date().getTimezoneOffset() / 60,
            validator(val) {
                return val <= 12 && val >= -12
            }
        },
        wrap: {
            type: Boolean,
            default: true,
        },
        deadline: {
            type: String,
            validator(val) {
                return new Date(val) != 'Invalid Date'
            }
        },
        prevent: {
            type: Boolean,
            default: false,
        },
        event: {
            type: String,
            default: "重要事件",
        }
    },
    data() {
        return {
            timer: null,
            date: null,
            active: false,
            pre: {
                nowTimeStr: '',
                nextTimeStr: ''
            }
        }
    },
    beforeMount() {
        this.setTime()
    },
    mounted() {
        function Flipper(config) {
            this.config = {
                node: null,
                frontText: 'number0',
                backText: 'number1',
                duration: 600,
            }
            this.nodeClass = {
                flip: 'flip',
                front: 'digital front',
                back: 'digital back'
            }
            Object.assign(this.config, config)
            this.frontNode = this.config.node.querySelector('.front')
            this.backNode = this.config.node.querySelector('.back')
            this.isFlipping = false
            this._init()
        }
        Flipper.prototype = {
            constructor: Flipper,
            _init: function () {
                this._setFront(this.config.frontText)
                this._setBack(this.config.backText)
            },
            _setFront: function (className) {
                this.frontNode.setAttribute('class', this.nodeClass.front + ' ' + className)
            },
            _setBack: function (className) {
                this.backNode.setAttribute('class', this.nodeClass.back + ' ' + className)
            },
            _flip: function (type, front, back) {
                if (this.isFlipping) {
                    return false
                }
                this.isFlipping = true
                this._setFront(front)
                this._setBack(back)
                let flipClass = this.nodeClass.flip;
                if (type === 'down') {
                    flipClass += ' down'
                } else {
                    flipClass += ' up'
                }
                this.config.node.setAttribute('class', flipClass + ' go')
                setTimeout(() => {
                    this.config.node.setAttribute('class', flipClass)
                    this.isFlipping = false
                    this._setFront(back)
                }, this.config.duration)
            },
            flipDown: function (front, back) {
                this._flip('down', front, back)
            },
            flipUp: function (front, back) {
                this._flip('up', front, back)
            }
        }

        const clock = this.$refs.clock
        const flips = clock.querySelectorAll('.flip')
        const { nowTimeStr, nextTimeStr } = this.getTime()
        this.pre.nowTimeStr = nowTimeStr
        this.pre.nextTimeStr = nextTimeStr

        let flipObjs = []

        for (let i = 0; i < flips.length; i++) {
            flipObjs.push(new Flipper({
                node: flips[i],
                frontText: 'number' + nowTimeStr[i],
                backText: 'number' + nextTimeStr[i]
            }))
        }

        this.timer = setInterval(() => {
            this.setTime()
            const { nowTimeStr, nextTimeStr } = this.getTime()
            for (let i = 0; i < flipObjs.length; i++) {
                if (this.pre.nowTimeStr[i] === nowTimeStr[i] && this.pre.nextTimeStr[i] === nextTimeStr[i] && nowTimeStr[i] === nextTimeStr[i]) {
                    continue
                }
                this.deadline ?
                    flipObjs[i].flipDown('number' + nowTimeStr[i], 'number' + nextTimeStr[i]) :
                    flipObjs[i].flipDown('number' + nowTimeStr[i], 'number' + nextTimeStr[i])
            }
            this.pre.nowTimeStr = nowTimeStr
            this.pre.nextTimeStr = nextTimeStr
        }, 1000)

    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
    },
    methods: {
        getTimeGap,
        isKey(str) {
            return 'YyMmDdHhIiSs'.includes(str)
        },
        getTime() {
            const nowTimeStr = this.deadline ? this.getTimeGap(this.curDate, this.showFormatter) : this.$time(this.curDate, this.showFormatter)
            const nextTimeStr = this.deadline ? this.getTimeGap(new Date(this.curDate - 1000), this.showFormatter) : this.$time(new Date(this.curDate.getTime() + 1000), this.showFormatter)
            return {
                nowTimeStr,
                nextTimeStr
            }
        },
        setTime() {
            this.date = this.deadline ? new Date(this.deadline) : new Date()
        },
        handlerDeadline() {
            if (this.active) return;
            if (!this.prevent) {
                this.active = true
                setTimeout(() => {
                    this.active = false
                }, 2000)
            }
            setTimeout(() => {
                this.$emit('handlerDeadline')
            }, 1000)
        }
    },
    computed: {
        showFormatter() {
            return Array.from(this.formatter).filter(item => this.isKey(item)).join('')
        },
        clockSize() {
            const style = {}
            switch (this.size) {
                case 'large':
                    style['--size'] = `150px`
                    break
                case 'middle':
                    style['--size'] = `80px`
                    break
                case 'small':
                    style['--size'] = `50px`
                    break
                case 'fit':
                    style['--size'] = `max(${100 / (this.formatter.length + 2)}vw,${100 / (this.formatter.length + 2)}vmin)`
                    break
                default:
                    if (this.size.includes('%'))
                        style['--size'] = `${this.size}`
                    else
                        style['--size'] = `${this.size}px`
            }
            return style
        },
        clockTheme() {
            const style = {}
            switch (this.theme) {
                case 'dark':
                    style['--bg'] = '#333'
                    style['--font'] = '#fff'
                    break
                case 'light':
                    style['--bg'] = '#fff'
                    style['--font'] = '#333'
                    break
                case 'auto':
                    break
                default:
                    style['--bg'] = this.theme ? this.theme : '#333'
                    style['--font'] = '#fff'
            }
            return style
        },
        offset() {
            return new Date().getTimezoneOffset() / 60 + this.GMT
        },
        curDate() {
            return new Date(this.date.getTime() + this.offset * 3600000)
        },
        isMiss() {
            return this.deadline ? Math.floor((new Date() - this.date) / 1000 + 2) : null
        },
        missMessage() {
            return this.isMiss > 0 ? `<em>${this.event}</em> 距今已过` : this.isMiss == 0 ? `<em>${this.event}</em> 就是现在` : `距离 <em>${this.event}</em> 还有`
        }
    },
    watch: {
        isMiss: {
            immediate: false,
            handler(newVal, oldVal) {
                if (newVal >= 0 && oldVal <= 0) {
                    this.handlerDeadline()
                }
            }
        },
        deadline() {
            this.setTime()
        }
    }
}
</script>

<style scoped>
@keyframes shake {
    0% {
        transform: rotate(0.5deg);
    }

    50% {
        transform: rotate(-0.5deg);
    }

    100% {
        transform: rotate(0.5deg) scale(1.01);
    }
}

.active {
    animation: shake .2s ease infinite;
}

.clock-box {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: calc(var(--size)*0.1);
    height: fit-content;
    margin: 0 auto;
    flex-wrap: wrap;
    user-select: none;
    font-size: 3vmin;
    color: #888;
    text-shadow: 0 1px 0 rgba(0, 0, 0, .3);

    --bg: #333;
    --font: #fff;
}

.clock {
    display: flex;
    gap: calc(var(--size)*0.1);
    padding: 0 calc(var(--size)*0.2);
}

[data-theme="dark"] .clock-box {
    --bg: #fff;
    --font: #333;
}

.clock-box.center {
    inset: 0;
    position: absolute;
    margin: auto;
}

.header,
.footer {
    margin: calc(var(--size)*0.2) 0;
}

.clock em {
    display: inline-block;
    line-height: var(--size);
    font-size: calc(var(--size)*0.666);
    font-style: normal;
    vertical-align: top;
    user-select: none;
    -webkit-user-drag: none;
}

.contents {
    display: contents;
}

.flip {
    display: inline-block;
    position: relative;
    width: calc(var(--size)*0.666);
    height: var(--size);
    line-height: var(--size);
    border-radius: 10%;
    font-size: calc(var(--size)*0.888);
    color: var(--font);
    box-shadow: 0 0 calc(var(--size)*0.05) var(--bg);
    text-align: center;
    font-family: "Helvetica Neue";
    font-weight: bold;
}

.flip .digital:before,
.flip .digital:after {
    content: "";
    position: absolute;
    left: 0;
    line-height: var(--size);
    right: 0;
    background: var(--bg);
    overflow: hidden;
}

.flip .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10% 10% 0 0;
    border-bottom: 1px solid lighten(var(--font), 10%);
}

.flip .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10% 10%;
    border-top: 1px solid lighten(var(--font), 10%);
}

.flip .number0:before,
.flip .number0:after {
    content: "0";
}

.flip .number1:before,
.flip .number1:after {
    content: "1";
}

.flip .number2:before,
.flip .number2:after {
    content: "2";
}

.flip .number3:before,
.flip .number3:after {
    content: "3";
}

.flip .number4:before,
.flip .number4:after {
    content: "4";
}

.flip .number5:before,
.flip .number5:after {
    content: "5";
}

.flip .number6:before,
.flip .number6:after {
    content: "6";
}

.flip .number7:before,
.flip .number7:after {
    content: "7";
}

.flip .number8:before,
.flip .number8:after {
    content: "8";
}

.flip .number9:before,
.flip .number9:after {
    content: "9";
}

.flip .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10% 10%;
    line-height: 0;
}

.flip.down .front:before {
    z-index: 3;
}

.flip.down .back:after {
    z-index: 2;
}

.flip.down .front:after,
.flip.down .back:before {
    z-index: 1;
}

.flip.down .back:after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(calc(var(--size)*1.5)) rotateX(180deg);
}

.flip.up .front:after {
    z-index: 3;
}

.flip.up .back:before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(calc(var(--size)*1.5)) rotateX(-180deg);
}

.flip.up .front:before,
.flip.up .back:after {
    z-index: 1;
}

.flip.down.go .front:before {
    transform-origin: 50% 100%;
    animation: frontFlipDown 0.6s ease-in-out both;
    backface-visibility: hidden;
}

.flip.down.go .back:after {
    animation: backFlipDown 0.6s ease-in-out both;
}

.flip.down.go .front:after {
    animation: backShadow 0.6s ease-in-out both;
}

.flip.down.go .back::before {
    animation: frontShadow 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
    0% {
        filter: brightness(1);
        transform: perspective(calc(var(--size)*1.5)) rotateX(0deg);
    }

    100% {
        filter: brightness(.1);
        transform: perspective(calc(var(--size)*1.5)) rotateX(-180deg);
    }
}

@keyframes backFlipDown {
    0% {
        filter: brightness(.1);
        transform: perspective(calc(var(--size)*1.5)) rotateX(180deg);
    }

    50% {
        filter: brightness(.8);
    }

    100% {
        filter: brightness(1);
        transform: perspective(calc(var(--size)*1.5)) rotateX(0deg);
    }
}

@keyframes frontShadow {
    0% {
        filter: brightness(.1);
    }

    70% {
        filter: brightness(1);
    }
}

@keyframes backShadow {
    30% {
        filter: brightness(1);
    }

    100% {
        filter: brightness(.1);
    }
}

.flip.up.go .front:after {
    transform-origin: 50% 0;
    animation: frontFlipUp 0.6s ease-in-out both;
    backface-visibility: hidden;
}

.flip.up.go .back:after {
    animation: backShadow 0.6s ease-in-out both;
}

.flip.up.go .front::before {
    animation: frontShadow 0.6s ease-in-out both;
}

.flip.up.go .back:before {
    animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipUp {
    0% {
        transform: perspective(calc(var(--size)*1.5)) rotateX(0deg);
    }

    100% {
        transform: perspective(calc(var(--size)*1.5)) rotateX(180deg);
    }
}

@keyframes backFlipUp {
    0% {
        transform: perspective(calc(var(--size)*1.5)) rotateX(-180deg);
    }

    100% {
        transform: perspective(calc(var(--size)*1.5)) rotateX(0deg);
    }
}
</style>