<template>
  <div id="app">
    <a style="display: block;width: fit-content; color:var(--color); text-decoration: none;margin: 60px auto;"
      href="https://github.com/TuGitee/vue-tut-clock">
      <h1>vue-tut-clock项目地址</h1>
    </a>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code1)"></code></pre>

    <FlipClock ref="clock" theme="dark" size="screen" deadline="2023-11-10 0:0:0" @handlerDeadline="handlerDeadline"
      formatter="DD天 hh:ii:ss" event="CVPR截稿">
    </FlipClock>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code2)"></code></pre>

    <p><time datetime="2023-1-7 12:03:22" v-time="'2023-1-7 12:03:22'"></time></p>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code3)"></code></pre>

    <p><button class="switch-btn" @click="$switchTheme()">主题切换</button></p>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code4)"></code></pre>

    <p style="margin: 0 auto;">
      <input type="datetime-local" v-model="time" style="margin: 20px auto;" />
      <FlipClock ref="clock" style="min-height: 0;" theme="dark" :deadline="time" @handlerDeadline="handlerDeadline"
        formatter="DD天 hh:ii:ss">
      </FlipClock>
    </p>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code5)"></code></pre>


    <CircleClock size="screen" :step="false">
      <template #header>
        <h1>Circle Clock Demo</h1>
      </template>
    </CircleClock>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code6)"></code></pre>



    <!-- 展示韩国时钟 -->
    <FlipClock :GMT="9">
      <template #header>
        <h1>South Korea Clock Demo</h1>
      </template>
      <template #footer>
        <p>🕓 TIME 🕓</p>
      </template>
    </FlipClock>

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code7)"></code></pre>



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

    <pre
      class="highlight"><p style="margin-bottom: 5px;"><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FF5F5D;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #FEC048;margin-right: 5px;"></span><span style="display:inline-block;height: 10px;width: 10px;border-radius: 50%;background-color: #3AC44A;margin-right: 5px;"></span></p><code class="language-html" v-html="highlightedCode(code8)"></code></pre>
    <p><time datetime="2023-1-7 12:03:22" v-time="date"></time></p>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import "@/assets/highlight.css"
export default {
  name: 'App',
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
      code1: `<FlipClock ref="clock" theme="dark" size="screen" deadline="2023-11-10 0:0:0" @handlerDeadline="handlerDeadline" formatter="DD天 hh:ii:ss" event="CVPR截稿"></FlipClock>`,
      code2: `<time datetime="2023-1-7 12:03:22" v-time="Date('2023-1-7 12:03:22')"></time>`,
      code3: `<button class="switch-btn" @click="$switchTheme()">主题切换</button>`,
      code4: `<input type="datetime-local" v-model="time" />
<FlipClock ref="clock" theme="dark" :deadline="time" @handlerDeadline="handlerDeadline" formatter="DD天 hh:ii:ss"></FlipClock>`,
      code5: `<CircleClock size="screen" :step="false">
  <template #header>
    <h1>Circle Clock Demo</h1>
  </template>
</CircleClock>`,
      code6: `<FlipClock :GMT="9">
  <template #header>
    <h1>South Korea Clock Demo</h1>
  </template>
  <template #footer>
    <p>🕓 TIME 🕓</p>
  </template>
</FlipClock>`,
      code7: `<ClockGroup :config="config">
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

</ClockGroup>`,
      code8: `<time datetime="2023-1-7 12:03:22" v-time="date"></time>`
    }
  },
  methods: {
    handlerDeadline() {

    },
    highlightedCode(str) {
      return hljs.highlightAuto(str).value
    }
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
