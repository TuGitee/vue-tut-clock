<template>
    <div class="clock-group" :style="{ gap: `${config.gap}px` }" :class="{ center: config.center }">
        <slot name="header"></slot>
        <FlipClock class="clock-item" v-for="(item, index) in clockList" :key="index" v-bind="item">
            <template #header>
                <slot :name="`header:${index}`"></slot>
            </template>
            <template #footer>
                <slot :name="`footer:${index}`"></slot>
            </template>
        </FlipClock>
        <slot name="footer"></slot>
    </div>
</template>

<script>
import FlipClock from "../FlipClock"
export default {
    name: "FlipClockGroup",
    props: {
        config: {
            type: Array | Object,
            default() {
                return {
                    center: false,
                    gap: 10,
                    clocks: [{
                        formatter: 'YYYY-MM-DD',
                    },
                    {
                        formatter: 'hh:ii:ss',
                    }]
                }
            }
        }
    },
    computed: {
        clockList() {
            return Array.isArray(this.config) ? this.config : this.config.clocks
        }
    }
}
</script>

<style scoped>
.clock-group {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}

.clock-group.center {
    inset: 0;
    position: absolute;
    margin: auto;
}
</style>