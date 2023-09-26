<template>
  <div id="app">

    <FlipClock ref="clock" theme="dark" deadline="2023-11-27" @handlerDeadline="handlerDeadline" formatter="DD天 hh:ii:ss"
      event="CVPR截稿">
    </FlipClock>

    <p><time datetime="2023-1-7 12:03:22" v-time="'2023-1-7 12:03:22'"></time></p>
    <p><button class="switch-btn" @click="$switchTheme()">主题切换</button></p>

    <p style="margin: 40vh auto;">
      <input type="datetime-local" v-model="time" />
      <FlipClock ref="clock" style="min-height: 0;" theme="dark" :deadline="time" @handlerDeadline="handlerDeadline"
        formatter="DD天 hh:ii:ss">
      </FlipClock>
    </p>

    <CircleClock size="fit" :step="false">
      <template #header>
        <h1>Circle Clock Demo</h1>
      </template>
    </CircleClock>

    <!-- 展示韩国时钟 -->
    <FlipClock :GMT="9">
      <template #header>
        <h1>South Korea Clock Demo</h1>
      </template>
      <template #footer>
        <p>🕓 TIME 🕓</p>
      </template>
    </FlipClock>

    <FlipClockGroup :config="config">
      <template #header>
        <h2>FlipClockGroup Demo</h2>
      </template>

      <template #header:0>
        <h3>年/月/日</h3>
      </template>
      <template #footer:0>
        <p>日期仅供参考</p>
      </template>

      <template #header:1>
        <h3>时/分/秒</h3>
      </template>
      <template #footer:1>
        <p>时间仅供参考</p>
      </template>

    </FlipClockGroup>

    <p><time datetime="2023-1-7 12:03:22">{{ $time(date, 'YYYY年MM月DD日') }}</time></p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      date: new Date(),
      config: {
        center: false,
        gap: 20,
        clocks: [{
          formatter: 'YYYY-MM-DD',
          theme: 'light',
          size: 'small'
        }, {
          formatter: 'HH:II:SS',
        }]
      },
      time: null
    }
  },
  methods: {
    handlerDeadline() {

    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 60px;
  color: var(--color);
}

:root {
  --color: #ff6969;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color: #ffff80;
}

.clock-group,
:not(.clock-group .clock-box).clock-box {
  min-height: 100vh;
}
</style>
