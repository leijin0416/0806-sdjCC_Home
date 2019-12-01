# 组件：

![grow-number](https://github.com/leijin0416/0806-Record_sdj.cc_Home/blob/master/%E7%81%AB%E9%B8%9F%E9%A1%B9%E7%9B%AE/Images/grow-number.gif)

```html
<template>
    <div class="number-grow-warp">
        <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 2
        },
        value: {
            type: Number,
            default: 720000
        }
    },
    methods: {
        numberGrow (ele) {
            let _this = this
            let step = (_this.value * 10) / (_this.time * 1000)
            let current = 0
            let start = 0
            let t = setInterval(function () {
                start += step
                if (start > _this.value) {
                    clearInterval(t)
                    start = _this.value
                    t = null
                }
                if (current === start) {
                    return
                }
                // 保留整数
                current = Math.round(start)
                ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
            }, 10)
        }
    },
    mounted () {
        this.numberGrow(this.$refs.numberGrow)
    }
}
</script>

<style>
    .number-grow-warp{
        transform: translateZ(0);
    }
    .number-grow {
        letter-spacing: 2px;
    }
</style>
```

# 引用：

```js
<v-grow :value="num" v-if="scrollTop == true" />

import growNumber from "@/components/growNumber/growNumber"

components: {
    'v-grow': numberGrow
}

const num = '123456' 

```