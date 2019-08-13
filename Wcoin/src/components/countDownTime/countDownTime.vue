<template>
    <!-- 时间计时器 -->
    <span :endTime="endTime" :callback="callback" :endText="endText">
        <slot>{{content}}</slot>
    </span>
</template>

<script>
export default {
    data() {
        return {
            content: ""
        };
    },
    props: {
        endTime: {
            type: String,
            default: ""
        },
        endText: {
            type: String,
            default: "已结束"
        },
        callback: {
            type: Function,
            default: ""
        }
    },
    mounted() {
        this.countdowm(this.endTime);
    },
    methods: {
        countdowm(timestamp) {
            let self = this;
            let timer = setInterval(function() {
                
                let EndTime= timestamp / 1000;//结束时间
                let NowTime = new Date();//当前时间

                let zz = parseInt(EndTime);
                //后台给我的是10位 精确到秒的  所有下面 NowTime 就除以了1000，不要小数点后面的
                let t = EndTime - (NowTime.getTime()/1000).toFixed(0);

                // let nowTime = new Date();
                // let endTime = new Date(timestamp * 1000);
                // let t = endTime.getTime() - nowTime.getTime();

                if (t > 0) {
                    
                    //Math.floor(t/1000/60/60/24)
                    let day = Math.floor(t/60/60/24);
                    let hour = Math.floor(t/60/60%24);
                    let min = Math.floor(t/60%60);
                    let sec = Math.floor(t%60);

                    // let day = Math.floor(t / 86400000);
                    // let hour = Math.floor((t / 3600000) % 24);
                    // let min = Math.floor((t / 60000) % 60);
                    // let sec = Math.floor((t / 1000) % 60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = "";
                    if (day > 0) {
                        format = `${day}天${hour}小时${min}分${sec}秒`;
                    }
                    if (day <= 0 && hour > 0) {
                        format = `${hour}小时${min}分${sec}秒`;
                    }
                    if (day <= 0 && hour <= 0) {
                        format = `${min}分${sec}秒`;
                    }
                    self.content = format;
                    } else {
                        clearInterval(timer);
                        self.content = self.endText;
                        self._callback();
                }
            }, 1000);
        },
        _callback() {
            if (this.callback && this.callback instanceof Function) {
                //ES6 延展运算符
                // this.callback(...this);
                this.callback(this.endTime);
            }
        }
    }
};
</script>