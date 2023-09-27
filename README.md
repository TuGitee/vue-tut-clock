# :timer_clock: tut-flip-clock

[![npm](https://img.shields.io/npm/v/tut-flip-clock.svg)](https://www.npmjs.com/package/tut-flip-clock) [![npm](https://img.shields.io/npm/dt/tut-flip-clock.svg)](https://www.npmjs.com/package/tut-flip-clock) ![Version](https://img.shields.io/github/package-json/version/TuGitee/tut-flip-clock) ![stars](https://img.shields.io/github/stars/TuGitee/tut-flip-clock) ![forks](https://img.shields.io/github/forks/TuGitee/tut-flip-clock) ![last commit](https://img.shields.io/github/last-commit/TuGitee/tut-flip-clock) ![views](https://komarev.com/ghpvc/?username=TuGitee&label=Views&color=0e75b6&style=flat) ![language](https://img.shields.io/github/languages/top/TuGitee/tut-flip-clock) ![license](https://img.shields.io/github/license/TuGitee/tut-flip-clock)

:clock1: 这是一个翻页时钟，用于展示当前时间！适用于Vue 2 项目！

## 安装

使用NPM:
```shell
$ npm install tut-flip-clock
or
$ npm i tut-flip-clock
```
## 完整引入

```js
// main.js
import Vue from 'vue'
import TutFlipClock from 'tut-flip-clock';
Vue.use(TutFlipClock)
```

## 使用

### 基本用法

```vue
<template>
	<FlipClock></FlipClock>
</template>
```

### 配置参数

| 名称      | 类型           | 默认         | 说明                                                         |
| --------- | -------------- | ------------ | ------------------------------------------------------------ |
| formatter | String         | hh:ii::ss    | 格式化显示时间格式，可选的字符格式：['YYYY', 'MM', 'DD', 'hh', 'ii', 'ss']，分别对应年、月、日、时、分、秒，不区分大小写，除此外文本可自定义，例如：YYYY年MM月DD日（:warning:倒计时模式下，只可选用日时分秒） |
| size      | Number\|String | fit          | 翻转时钟大小，可选值为large（大号），middle（中号），small（小号），fit（适应容器大小），screen（适应屏幕大小），任意数值（单位：px） |
| center    | Boolean        | false        | 使用absolute定位居中，推荐页面中只有此组件为主题内容时配置   |
| offsetX   | Number         | 0            | X轴偏移量，单位px                                            |
| offsetY   | Number         | 0            | Y轴偏移量，单位px                                            |
| theme     | String         | auto         | 翻页时钟主题，可选值为dark，light，auto以及任意其他rgba形式或单词形式的颜色，auto模式为适应当前浏览器深色或浅色模式，使用auto模式颜色会根据html根结点自定义属性[data-theme="dark"]或[data-theme="light"]进行自动切换 |
| GMT       | Number         | 当前所在时区 | 取值范围在-12至12之间                                        |
| warp      | Boolean        | true         | 横向宽度不足以容纳时钟组件时换行展示                         |
| deadline  | String\|Date   | ——           | 开启倒计时模式（开启此模式最好重新配置formatter），并指定截止时间 |
| prevent   | Boolean        | false        | 倒计时模式下是否展示时间到时的默认动画，动画持续时间为2s（不可调整） |
| event     | String         | 重要事件     | 倒计时事件名称                                               |

#### 事件

| 事件名          | 参数 | 返回值 | 说明                           |
| --------------- | ---- | ------ | ------------------------------ |
| handlerDeadline | void | void   | 当Deadline到达时，执行回调函数 |

#### 示例

```vue
<!-- GMT-4时区 -->
<template>
	<FlipClock formatter="HH时II分SS秒"
				size="fit"
				center
				:GMT="-4">
	</FlipClock>
</template>

<!-- 倒计时模式 -->
<template>
	<FlipClock deadline="2023-11-27"
				@handlerDeadline="handlerDeadline"
				formatter="DD天 hh:ii:ss"
				event="CVPR截稿">
	</FlipClock>
</template>

<!-- 配合input框修改deadline -->
<template>
	<div>
		<input type="datetime-local" v-model="time" />
		<FlipClock :deadline="time" formatter="DD天 hh:ii:ss"></FlipClock>
	</div>
</template>

<script>
export default {
	data(){
		return {
			time: null
		}
	}
}
</script>
```

### 插槽

| 插槽名 | 说明         |
| ------ | ------------ |
| header | 时钟顶部内容 |
| footer | 时钟底部内容 |

#### 示例

```vue
<template>
	<FlipClock>
		<!-- # 是 v-slot 的缩写形式 -->
		<template #header>
			<h1>China Clock</h1>
	  	</template>
	  	<template #footer>
			 	<p>时间仅供参考</p>
	  	</template>
	</FlipClock>
	<!-- 倒计时模式插槽有默认值，重新书写插槽自行定义 -->
</template>
```

#### 综合使用

```vue
// 展示韩国时钟
<template>
	<FlipClock center :GMT="9">
		<template #header>
		<h1>South Korea Clock</h1>
	  	</template>
	  	<template #footer>
			 	<p>🕓 TIME 🕓</p>
	  	</template>
	</FlipClock>
</template>
```

### 圆形时钟

tut-flip-clock同时支持圆形时钟。

#### 基本用法

```vue
<template>
	<CircleClock></CircleClock>
</template>
```

#### 配置参数

| 名称    | 类型           | 默认         | 说明                                                         |
| ------- | -------------- | ------------ | ------------------------------------------------------------ |
| GMT     | Number         | 当前所在时区 | 取值范围在-12至12之间                                        |
| size    | Number\|String | fit          | 圆形时钟大小，可选值为large（大号），middle（中号），small（小号），fit（适应容器大小），screen（适应屏幕大小），任意数值（单位px） |
| center  | Boolean        | false        | 使用absolute定位居中，推荐页面中只有此组件为主题内容时配置   |
| offsetX | Number         | 0            | X轴偏移量，单位px                                            |
| offsetY | Number         | 0            | Y轴偏移量，单位px                                            |
| theme   | String         | auto         | 圆形时钟主题，可选值为dark，light，auto以及任意其他rgba形式或单词形式的颜色，auto模式为适应当前浏览器深色或浅色模式，使用auto模式颜色会根据html根结点自定义属性[data-theme="dark"]或[data-theme="light"]进行自动切换 |
| step    | Boolean        | false        | 指针运动方式：步进或连续                                     |

##### 示例

```vue
<template>
	<CircleClock size="fit" center :GMT="8" :step="true"></CircleClock>
</template>
```

#### 插槽

| 插槽名 | 说明         |
| ------ | ------------ |
| header | 时钟顶部内容 |
| footer | 时钟底部内容 |

##### 示例

```vue
<template>
	<CircleClock>
		<template #header>
			<h1>China Clock</h1>
	  	</template>
	  	<template #footer>
			 	<p>时间仅供参考</p>
	  	</template>
	</CircleClock>
</template>
```

### 时钟组

时钟组的作用主要为换行显示。例如：你想要在页面中使用`FlipClock`组件同时开启center，多个`FlipClock`将重叠在一起（由于absolute定位），此时可以使用时钟组，将整个时钟组居中即可。

```vue
<ClockGroup></ClockGroup>
```

#### 配置参数

| 名称       | 类型          | 默认                                                         | 说明                                                         |
| ---------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| config     | Object\|Array | {center: false, gap: 10, clocks: [{ formatter: 'YYYY-MM-DD'},{formatter: 'hh:ii:ss'}]} | 传递对象时可传递center，gap，clocks参数，传递数组时，即只传递clocks对象数组即可，center和gap采用默认值，默认分行显示年月日和时分秒，配置项信息见下 |
| center     | Boolean       | false                                                        | 使用absolute定位居中，推荐页面中只有此组件为主题内容时配置   |
| gap        | Number        | 10                                                           | 时钟组间距，单位px                                           |
| swiper     | Boolean       | false                                                        | 配置时钟组是否开启轮播模式                                   |
| pagination | Boolean       | false                                                        | 轮播模式下是否显示下方分页小圆点                             |
| vertical   | Boolean       | false                                                        | 时钟组轮播方式是否垂直                                       |
| autoplay   | Boolean       | false                                                        | 轮播模式下是否开启自动轮播                                   |
| duration   | Number        | 5000                                                         | 自动轮播时间（单位：毫秒ms）                                 |
| clocks     | Array         | [{ formatter: 'YYYY-MM-DD'},{formatter: 'hh:ii:ss'}]         | 配置时钟对象，可指定每个时钟类型type，默认为flip，可选值为flip或circle；每个时钟的配置参数与对应Clock配置参数相似，但不可配置center属性，默认值与之相同 |

#### 示例

```vue
<template>
	<ClockGroup :config="config"></ClockGroup>
</template>

<script>
export default {
	data() {
		return {
			config: {
				center: false,
				gap: 20,
				swiper: true,
				clocks: [{
		  			formatter: 'YYYY-MM-DD',
		  			theme: 'light',
		  			size: 'small'
				}, {
		  			formatter: 'HH:II:SS',
		  			size: 'fit'
				}, {
		  			type: 'circle',
		  			step: false
				}]
	  		}
		}
	}
}
</script>
```

##### 插槽

| 插槽名       | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| header       | 时钟组顶部内容                                          |
| footer       | 时钟组底部内容                                          |
| header:index | 第[index]个时钟顶部内容，index的取值范围为[0, 时钟数量) |
| footer:index | 第[index]个时钟底部内容，index的取值范围为[0, 时钟数量) |

##### 示例

```vue
<template>
	<!-- config 同上，有三个时钟，此处设置前两个时钟的插槽 -->
	<ClockGroup :config="config">
		
		<template #header>
			<h2>Demo</h2>
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

	</ClockGroup>
</template>
```

### 格式化时间

#### 全局方法

tut-flip-clock 为 Vue.prototype 添加了全局方法 `$time`。因此在 Vue Instance 中可以直接采用此方法格式化时间。

##### 参数说明

| 参数      | 类型         | 默认                | 说明                                                         |
| --------- | ------------ | ------------------- | ------------------------------------------------------------ |
| time      | String\|Date | 当前时间            | 格式化的时间                                                 |
| formatter | String       | YYYY-MM-DD hh:ii:ss | 格式化显示时间格式，可选的字符格式：['YYYY', 'MM', 'DD', 'hh', 'ii', 'ss']，分别对应年、月、日、时、分、秒，不区分大小写，除此外文本可自定义，例如：YYYY年MM月DD日 |
| 返回值    | String       | ——                  | 返回结果为按照格式化输出的结果                               |

##### 示例

```vue
<template>
	<time> {{ $time('2023-9-25','YYYY年MM月DD日') }} </time>
</template>

<script>
export default {
	mounted(){
		this.$time('2023-9-26 1:16','YYYY年MM月DD日 hh:ii')
	}
}
</script>
```

#### 自定义指令

为便于使用，tut-flip-clock 注册了自定义指令 `v-time`。因此可以直接使用此指令达到格式化时间的效果。

> :warning:v-time渲染时，dom元素中不能有任何子节点，用法与 `v-text` 以及 `v-html` 相似。
>
> 此指令设计存在缺陷，无法配置formatter，推荐使用全局方法代替此方法。

##### 示例

```vue
<template>
	 <time datetime="2023-1-7 12:03:22" v-time="'2023-1-7 12:03:22'"></time>
</template>
```

### 切换主题

#### 全局方法

tut-flip-clock 为 Vue.prototype 添加了全局方法 `$switchTheme`,可以直接采用此方法切换主题，使用`theme="auto"`的组件将会跟随主题颜色变化。

| 方法名       | 参数 | 返回值   | 说明                                        |
| ------------ | ---- | -------- | ------------------------------------------- |
| $switchTheme | void | 当前主题 | 切换主题方法，返回值有且仅有dark和light两种 |

#### 示例

```vue
<template>
	<button class="switch-btn" @click="$switchTheme()">主题切换</button>
</template>

<script>
export default {
	mounted(){
		let theme = this.$switchTheme()
	}
}
</script>
```

#### 一键换肤

使用此方法提供的切换主题只需在其余样式中添加相关css即可完成换肤适配。

```vue
// component.vue
<style scoped>
/* .box 即选择器 设置默认颜色（浅色模式颜色） */
.box {
	--color: #888;
	--text: #111;  
}
/* 加前缀[data-theme="dark"]指定深色模式下的颜色 */
[data-theme="dark"] .box {
	--color: #888;
	--text: #111;
}
</style>
```

若在根节点设置不同主题，只需修改如下代码：

```vue
// App.vue
<style scoped>
:root[data-theme="dark"] {
	color-scheme: dark;
	--color: #888;
}
</style>
```

## 体验网址

[翻页时钟](https://tugitee.github.io/tut-flip-clock)

## 关于

### 开源协议

Copyright © 2023 [tut-flip-clock](https://github.com/TuGitee/tut-flip-clock/blob/main/LICENSE) (MIT)

> 如存在任何问题，请提交pr或联系作者[_tut](mailto:1137725646@qq.com)。