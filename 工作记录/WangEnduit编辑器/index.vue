<template lang="html">
    <div class="editor-box" >
        <editor-bar 
            v-model="values" 
            :isClear="isClear" 
            @change="OnTextChangeGg" />
    </div>
</template>

<script>
import EditorBar from '@/components/wangEnduit/wangEnduit'
export default {
    name: 'editoritem',
    data() {
        return {
            values: '',
        }
    },
    components: {
        EditorBar,
    },
    model: {
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        isClear: {
            type: Boolean,
            default: false
        }
    },
    watch: {
    },
    mounted() {

    },
    methods: {
        /**
         *  子组件传过来的值
         */
        OnTextChangeGg(val) {
            //双向绑定
            this.values=val;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>