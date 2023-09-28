<template>
    <pre
        class="highlight"><p style="margin-bottom: 5px;"><span style="background-color: #FF5F5D;" class="dot"></span><span style="background-color: #FEC048" class="dot"></span><span style="background-color: #3AC44A;" class="dot"></span></p><code class="language-html" v-html="highlightedCode"></code></pre>
</template>

<script>
import hljs from 'highlight.js'
import "@/assets/highlight.css"
export default {
    props: {
        code: String
    },
    computed:{
        highlightedCode(){
            return hljs.highlightAuto(this.code).value
        }
    }
}
</script>

<style scoped>
.dot {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  user-select: none;
  margin-right: 8px;
}
</style>