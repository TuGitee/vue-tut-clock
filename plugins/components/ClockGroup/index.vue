<template>
    <div class="clock-group" :class="{ center: config.center }">
        <header class="header">
            <slot name="header">
            </slot>
        </header>

        <div :options="swiperOptions" :is="config.swiper ? 'swiper' : 'div'" class="container" :class="{ gap: config.gap }"
            :style="{ '--gap': `${config.gap}px` }">
            <div v-for="(item, index) in clockList" :key="index" :is="config.swiper ? 'swiper-slide' : 'div'" class="item">
                <ActiveComponent class="clock-item" v-bind="item" :is="item.type" ref="clock">
                    <template #header>
                        <slot :name="`header:${index}`"></slot>
                    </template>
                    <template #footer>
                        <slot :name="`footer:${index}`"></slot>
                    </template>
                </ActiveComponent>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
        </div>
        <footer class="footer">
            <slot name="footer">
            </slot>
        </footer>
    </div>
</template>

<script>
import ActiveComponent from '../ActiveComponent';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: "ClockGroup",
    props: {
        config: {
            type: Array | Object,
            default() {
                return {
                    center: false,
                    gap: 10,
                    swiper: false,
                    vertical: false,
                    loop: false,
                    duration: 5000,
                    pagination: true,
                    autoplay: false,
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
            return (Array.isArray(this.config) ? this.config : this.config.clocks)?.map(item => (item.type = item.type?.includes('-clock') ? item.type : item.type ? `${item.type}-clock` : 'flip-clock', item))
        },
        swiperOptions() {
            const config = this.config
            if (!config.swiper) return null
            const { vertical, loop, duration, pagination, autoplay } = config
            const obj = {
                slidesPerView: 'auto',
                observer: true,
                observeParents: true,
            }
            if (vertical) {
                obj.autoHeight = true
                obj.direction = 'vertical'
            }
            if (loop) {
                obj.loop = true
            }
            if (autoplay) {
                obj.autoplay = {
                    delay: duration ?? 5000,
                    disableOnInteraction: false
                }
            }
            if (pagination) {
                obj.pagination = {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
            return obj
        },
    },
    components: {
        ActiveComponent,
        swiper,
        swiperSlide
    },
}
</script>

<style scoped>
.clock-group {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}

.header,
.footer {
    margin: 20px 0;
}

.clock-group.center {
    inset: 0;
    position: absolute;
    margin: auto;
}

.clock-item {
    height: auto;
}


.swiper-container {
    width: 100%;
}

.swiper-container /deep/ .swiper-wrapper {
    align-items: center;
    padding-bottom: 60px;
}

.swiper-pagination:not(.swiper-container-vertical > .swiper-pagination-bullets) {
    bottom: 0;
    line-height: 1;
}

.gap {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
}
</style>