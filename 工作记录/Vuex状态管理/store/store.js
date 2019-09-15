import Vue from 'vue'
import Vuex from 'vuex'

/**
 *  
 *  配置,暴露home模块
 */
import home from './modules'

let modulesData = {
    ...home,
}

Vue.use(Vuex)
/**
 *  全局导出 modulesData
 */
export default new Vuex.Store({
    state: {
		datalist: [],
    },
    modulesData,
})


/**
 *  还可以：
 *   
    export default new Vuex.Store({
        modules: {
            mc: modulesData
        },
    });
 */