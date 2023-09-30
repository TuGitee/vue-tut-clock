<template>
    <pre
        class="highlight"><header class="header"><div class="left"><span style="background-color: #FF5F5D;" class="dot"></span><span style="background-color: #FEC048" class="dot"></span><span style="background-color: #3AC44A;" class="dot"></span></div><div class="right"><span class="success" v-if="isCopy">✅</span> <svg t="1696076948321" @click="copy" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4016" width="16" height="16"><path d="M640 64a64 64 0 0 1 64 64v128h192a64 64 0 0 1 64 64v576a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64v-192H128a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h512z m224 256h-512a32 32 0 0 0-31.488 26.24L320 352v512a32 32 0 0 0 26.24 31.488L352 896h512a32 32 0 0 0 31.488-26.24L896 864v-512a32 32 0 0 0-32-32zM606.72 127.232H162.24a32 32 0 0 0-31.488 26.24l-0.512 5.76v448.64a32 32 0 0 0 26.24 31.424l5.76 0.576L256 639.808V320a64 64 0 0 1 64-64h318.656V159.232a32 32 0 0 0-32-32z" fill="#ffffff" p-id="4017"></path></svg></div></header><code class="language-html" v-html="highlightedCode"></code></pre>
</template>

<script>
import hljs from 'highlight.js'
import "@/assets/highlight.css"
let timer = null
export default {
    data(){
        return {
            isCopy: false
        }
    },
    props: {
        code: String
    },
    computed:{
        highlightedCode(){
            return hljs.highlightAuto(this.code).value
        }
    },
    methods:{
        copy(){
            window.navigator.clipboard.writeText(this.code)
            this.isCopy = true
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
                this.isCopy = false
            },1000)
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

.header {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
}
.right {
    line-height: 1;
    font-size: 14px;
    display: flex;
    justify-content: center;
    gap: 5px;
    user-select: none;
}
.right .icon {
    width: 16px;
    height: 16px;
}
</style>