/**
 *  Vuex + localStorage数据状态持久化
 */
import { setStore } from '@/common/util'

export default {
    //模块成为带有命名空间的模块
    namespaced: true,
    /**
     *  1、要设置的全局访问的state对象
     */
    state: {
		datalist: [],
		SessionId: '',
    },
    /**
     *  2、实时监听state值的变化(最新状态)
     */
    getters: {
        getUserInfo: (state) => {
            const { datalist } = state; //承载变化的datalist的值
            return `${datalist}`;
        },
		user_SessionId: (state) => state.SessionId,
    },
    /**
     *  3、自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性，list 为要变化的形参;
     *  async / await 异步代码
     */
    actions: {
		async getRankData({commit}, list) {
			let response = await axios.post('/redPackets/findRedPacketsDetail', {
				'rid' : '1',
				'id': '2'
			}).then( res => {
				if (res.data.code == '200') {
					let list = res.data.data.packets;  
					// 传值
					commit(types.SET_RANKDATAS, list);
					console.log('成功code: ' + res.data.code)
				}
			}).catch( res => {
				console.log('失败code: ' + res.data.code);
			})
		},
    },
    /**
     *  4、如何变化 datalist - mutations里面存放的是方法名
     *  提前定义方法名 - "SET_RANKDATAS"
     */
	//
    mutations: {
        [types.SET_RANKDATAS](state, list) {
			//能够获取到当前状态树的state,提交mutation的时候传的参数
            state.datalist = list;
        },
		//用户id
		handleUserSession: (state, user_SessionId) => {
            state.SessionId = user_SessionId;
            // 缓存
			setStore('user_SessionId', user_SessionId);
		},
    },
}


