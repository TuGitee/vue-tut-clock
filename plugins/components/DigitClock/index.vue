<template>
    <div class="clock" ref="clock">
        <div class="content" v-for="i in 4" :key="i">
            <div class="block" v-for="j in 15" :key="j"
                :class="{ active: numsMap[time[i - 1]][j - 1], second: second == getSeconds(i, j) }">
                {{ getSeconds(i, j).toString().padStart(2, '0') }}
            </div>
        </div>
    </div>
</template>

<script>
import time from '../../mixin/time'
export default {
    name: "DigitClock",
    mixins: [time],
    data() {
        return {
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
            const hour = this.currentTime.getHours().toString().padStart(2, '0')
            const minute = this.currentTime.getMinutes().toString().padStart(2, '0')
            return [Number(hour[0]), Number(hour[1]), Number(minute[0]), Number(minute[1])]
        },
        second() {
            return this.currentTime.getSeconds()
        }
    },
    methods: {
        getSeconds(i, j) {
            return (i - 1) * 15 + j - 1
        },
    },
}
</script>

<style scoped>
[data-theme="dark"] .clock {
    --bg: #333;
    --color: #eee;
}

.clock {
    position: relative;
    display: flex;
    flex-flow: column wrap;
    width: 320px;
    height: 100px;
    box-sizing: border-box;
    --bg: #eee;
    --color: #333;
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
}

.block:last-child {
    padding-right: calc(100% / 16);
}

.block.active {
    color: var(--color);
    font-weight: 500;
}

.block.second {
    font-weight: bold;
    color: #FF8300;
}
</style>