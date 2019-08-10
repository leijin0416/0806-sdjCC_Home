import * as types from '@/store/mutation-types.js'
import local from '@/common/api/localSession.js'

export default {
	namespaced: true,
	//1、要设置的全局访问的state对象
	state: {
		SessionId: '',
		global_url: 'http://39.105.201.42:8080/pc_img/img/',

		queryId: '',
		judgeTexts: '',
		
		otcYouself: '',  //otc-发布
		otcJudgeTexts: '',
		otcSellList: [], //otc列表数据

		feedback: [], //意见反馈
		addressList: '', //资产-币种id

		otcListInfo: '',
		OtcKK: '',
	},

	//2、实时监听state值的变化(最新状态)
	getters: {
		getUserInfo: (state) => {
			const { queryId } = state; //承载变化的datalist的值
			return `${queryId}`;
		},
		user_SessionId: (state) => state.SessionId,
		global_url: (state) => state.global_url,

		judgeTexts: (state) => state.judgeTexts, 
		otcJudgeTexts: (state) => state.otcJudgeTexts, 
		otcSellList: (state) => state.otcSellList,
		otcYouself: (state) => state.otcYouself,

		feedback: (state) => state.feedback, 
		addressList: (state) => state.addressList, 

		otcListInfo: (state) => state.otcListInfo,
		OtcKK: (state) => state.OtcKK,
	},

	//3、自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性，list 为要变化的形参
	// async/await 异步代码
	actions: {
	},

	//4、如何变化 datalist
	mutations: {
		//用户id
		handleUserSession: (state, user_SessionId) => {
			state.SessionId = user_SessionId;
			local.set('user_SessionId', user_SessionId);
		},
		//otc 购买/出售
		handleOtcJudgeText: (state, otcJudgeTexts) => {
			state.otcJudgeTexts = otcJudgeTexts;
			local.set('otcJudgeTexts', otcJudgeTexts);
		},
		//otc 购买/出售 数据
		handleOtcSellList: (state, otcSellList) => {
			state.otcSellList = otcSellList;
			local.set('otcSellList', otcSellList);
		},
		//otc - 发布-取消状态
		handleOtcYouself: (state, otcYouself) => {
			state.otcYouself = otcYouself;
			//local.set('otcYouself', otcYouself);
		},

		handleJudgeText: (state, judgeTexts) => {
			state.judgeTexts = judgeTexts;
			local.set('judgeTexts', judgeTexts);
		},
		//反馈
		handleUserFeedback: (state, feedback) => {
			state.feedback = feedback;
			local.set('feedback', feedback);
		},

		//资产-币种id-提现
		handleAddressList: (state, addressList) => {
			state.addressList = addressList;
			// local.set('addressList', addressList);
		},
		
		//OTC-账单明细-详情
		handleOtcTransactionInfo: (state, otcListInfo) => {
			state.otcListInfo = otcListInfo;
			local.set('otcListInfo', otcListInfo);
		},

		//行情 - 币币交易
		handleOtcKK: (state, OtcKK) => {
			state.OtcKK = OtcKK;
			local.set('OtcKK', OtcKK);
		},


	},
	//5、提前定义方法名 - "SET_RANKDATAS"
};