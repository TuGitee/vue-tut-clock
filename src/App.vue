<template>
  <div id="app">
    <time datetime="2023-1-7 12:03:22" v-time="'2023-1-7 12:03:22'"></time>
    <p><button class="switch-btn" @click="$switchTheme()">主题切换</button></p>

    <CircleClock size="fit" :step="false"></CircleClock>

    <!-- 展示韩国时钟 -->
    <template>
      <FlipClock :GMT="9">
        <template #header>
          <h1>South Korea Clock</h1>
        </template>
        <template #footer>
          <p>🕓 TIME 🕓</p>
        </template>
      </FlipClock>
    </template>

    <FlipClockGroup :config="config">

      <template #header:0>
        <h1>年/月/日</h1>
      </template>
      <template #footer:0>
        <p>日期仅供参考</p>
      </template>

      <template #header:1>
        <h1>时/分/秒</h1>
      </template>
      <template #footer:1>
        <p>时间仅供参考</p>
      </template>

    </FlipClockGroup>

    <time datetime="2023-1-7 12:03:22">{{ $time(date, 'YYYY年MM月DD日') }}</time>
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
          size: 'middle'
        }]
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px auto;
}

:root[data-theme="dark"] {
  color-scheme: dark;
}
</style>
