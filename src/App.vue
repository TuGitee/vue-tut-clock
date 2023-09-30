<template>
  <div id="app">

    <a style="display: block;width: fit-content; color:var(--color); text-decoration: none;margin: 60px auto;"
      href="https://github.com/TuGitee/vue-tut-clock">
      <h1>vue-tut-clock项目地址</h1>
    </a>

    <HighlightCode :code="code1"></HighlightCode>

    <flip-clock ref="clock" theme="dark" size="screen" deadline="2023-11-10 0:0:0" @handlerDeadline="handlerDeadline"
      formatter="DD天 hh:ii:ss" event="CVPR截稿">
    </flip-clock>

    <HighlightCode :code="code2"></HighlightCode>

    <p><time datetime="2023-1-7 12:03:22" v-time="'2023-1-7 12:03:22'"></time></p>

    <HighlightCode :code="code3"></HighlightCode>

    <p><button class="switch-btn" @click="$switchTheme()">主题切换</button></p>

    <HighlightCode :code="code4"></HighlightCode>

    <p style="margin: 0 auto;">
      <input type="datetime-local" v-model="time" style="margin: 20px auto;" />
      <flip-clock ref="clock" style="min-height: 0;" theme="dark" :deadline="time" @handlerDeadline="handlerDeadline"
        formatter="DD天 hh:ii:ss">
      </flip-clock>
    </p>

    <HighlightCode :code="code5"></HighlightCode>

    <circle-clock size="screen" :step="true">
      <template #header>
        <h1>Circle Clock Demo</h1>
      </template>
    </circle-clock>

    <HighlightCode :code="code6"></HighlightCode>

    <!-- 展示韩国时钟 -->
    <flip-clock :GMT="9">
      <template #header>
        <h1>South Korea Clock Demo</h1>
      </template>
      <template #footer>
        <p>🕓 TIME 🕓</p>
      </template>
    </flip-clock>

    <HighlightCode :code="code7"></HighlightCode>



    <ClockGroup :config="config">
      <template #header>
        <h2>ClockGroup Demo</h2>
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

      <template #header:2>
        <h3>时钟</h3>
      </template>

    </ClockGroup>

    <HighlightCode :code="code8"></HighlightCode>
    <p><time datetime="2023-1-7 12:03:22" v-time="date"></time></p>

    <HighlightCode :code="code9"></HighlightCode>

    <digit-clock class="digit-clock" size="60%" :dot="false"></digit-clock>
  </div>
</template>

<script>
import HighlightCode from './components/HighlightCode'
export default {
  name: 'App',
  components: {
    HighlightCode
  },
  data() {
    return {
      date: new Date(),
      config: {
        center: false,
        gap: 20,
        swiper: true,
        pagination: true,
        clocks: [{
          formatter: 'YYYY-MM-DD',
          theme: 'light',
          size: 'small'
        }, {
          formatter: 'HH:II:SS',
        }, {
          type: 'circle',
          step: false
        }]
      },
      time: null,
      code1: `<flip-clock ref="clock" theme="dark" size="screen" deadline="2023-11-10 0:0:0" @handlerDeadline="handlerDeadline" formatter="DD天 hh:ii:ss" event="CVPR截稿"></flip-clock>`,
      code2: `<time datetime="2023-1-7 12:03:22" v-time="Date('2023-1-7 12:03:22')"></time>`,
      code3: `<button class="switch-btn" @click="$switchTheme()">主题切换</button>`,
      code4: `// template
<input type="datetime-local" v-model="time" />
<flip-clock ref="clock" theme="dark" :deadline="time" @handlerDeadline="handlerDeadline" formatter="DD天 hh:ii:ss"></flip-clock>

// script -> data
time: null`,
      code5: `<circle-clock size="screen" :step="false">
  <template #header>
    <h1>Circle Clock Demo</h1>
  </template>
</circle-clock>`,
      code6: `<flip-clock :GMT="9">
  <template #header>
    <h1>South Korea Clock Demo</h1>
  </template>
  <template #footer>
    <p>🕓 TIME 🕓</p>
  </template>
</flip-clock>`,
      code7: `// template
<ClockGroup :config="config">
  <template #header>
    <h2>ClockGroup Demo</h2>
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

  <template #header:2>
    <h3>时钟</h3>
  </template>

</ClockGroup>

// script -> data
config: {
  center: false,
  gap: 20,
  swiper: true,
  pagination: true,
  clocks: [{
    formatter: 'YYYY-MM-DD',
    theme: 'light',
    size: 'small'
    }, {
    formatter: 'HH:II:SS',
    }, {
    type: 'circle',
    step: false
  }]
}
`,
      code8: `// template
<time datetime="2023-1-7 12:03:22" v-time="date"></time>

// script -> data
date: new Date()`,
      code9: `<digit-clock class="digit-clock" size="60%" :dot="false"></digit-clock>`
    }
  },
  methods: {
    handlerDeadline() {

    },
  },
}
</script>

<style>
body,
p {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 60px;
  color: var(--color);
  -webkit-overflow-scrolling: unset;
}

:root {
  --color: #ff6969;
  color-scheme: light;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color: #ffff80;
}

</style>
