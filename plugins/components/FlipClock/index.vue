<template>
    <div class="outer" :class="{ center }">
        <slot name="header"></slot>
        <div class="clock" ref="clock" :style="[{
            transform: `translate(${offsetX}px,${offsetY}px)`,
            '-webkit-transform': `translate(${offsetX}px,${offsetY}px)`,
            '-moz-transform': `translate(${offsetX}px,${offsetY}px)`,
        }, clockSize, clockTheme]">
            <div class="box" v-for="i in formatter">
                <div class="flip down" v-if="isKey(i)">
                    <div class="digital front number0"></div>
                    <div class="digital back number1"></div>
                </div>
                <em v-else>{{ i.replace(' ', '&nbsp;') }}</em>
            </div>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
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
            default: 'dark',
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
        }

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

        const getTime = () => {
            const now = new Date((new Date()).getTime() + this.offset * 3600000)
            const nowTimeStr = this.$time(now, this.showFormatter)
            const nextTimeStr = this.$time(new Date(now.getTime() + 1000), this.showFormatter)
            return {
                nowTimeStr,
                nextTimeStr
            }
        }
        const clock = this.$refs.clock
        const flips = clock.querySelectorAll('.flip')
        const { nowTimeStr, nextTimeStr } = getTime()
        let flipObjs = []
        for (let i = 0; i < flips.length; i++) {
            flipObjs.push(new Flipper({
                node: flips[i],
                frontText: 'number' + nowTimeStr[i],
                backText: 'number' + nextTimeStr[i]
            }))
        }

        setInterval(() => {
            const { nowTimeStr, nextTimeStr } = getTime()
            for (let i = 0; i < flipObjs.length; i++) {
                if (nowTimeStr[i] === nextTimeStr[i]) {
                    continue
                }
                flipObjs[i].flipDown('number' + nowTimeStr[i], 'number' + nextTimeStr[i])
            }
        }, 1000)

    },
    methods: {
        isKey(str) {
            return 'YyMmDdHhIiSs'.includes(str)
        },
    },
    computed: {
        showFormatter() {
            return Array.from(this.formatter).filter(item => this.isKey(item)).join('')
        },
        clockSize() {
            const style = {}
            switch (this.size) {
                case 'large':
                    style['--size'] = `300px`
                    break
                case 'middle':
                    style['--size'] = `200px`
                    break
                case 'small':
                    style['--size'] = `100px`
                    break
                case 'fit':
                    style['--size'] = `max(${100 / this.formatter.length}vw,${100 / this.formatter.length}vmin)`
                    break
                default:
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
                default:
                    style['--bg'] = this.theme ? this.theme : '#333'
                    style['--font'] = '#fff'
            }
            return style
        },
        offset() {
            return new Date().getTimezoneOffset() / 60 + this.GMT
        }
    }
}
</script>

<style scoped>

.outer {
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
}

.outer.center {
    inset: 0;
    position: absolute;
    margin: auto;
}

.clock {
    display: flex;
    gap: calc(var(--size)*0.1);
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

.box {
    display: contents;
}

.flip {
    display: inline-block;
    position: relative;
    width: calc(var(--size)*0.666);
    height: var(--size);
    line-height: var(--size);
    border-radius: 10%;
    background: var(--font);
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
    box-shadow: 0 -2px calc(var(--size)*0.05) rgba(255, 255, 255, 0.3);
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
    box-shadow: 0 2px calc(var(--size)*0.05) rgba(255, 255, 255, 0.3);
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