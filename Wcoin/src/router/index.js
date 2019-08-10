import Vue from 'vue'
import Router from 'vue-router'

/*
*	按需（懒）加载（vue实现）
	- index(首页)
		|—— Login               (登录)
		|—— Register            (注册)
		|—— ForgetPassword      (修改密码)
		|
        |—— Apartment           (otc- 入口)
        |   |——     Appeal          (otc-交易订单申诉)
        |   |——     Appeal          (otc-交易订单申诉)
		|
		|—— Renting             (行情)
        |   |——     Office          (行情)
        |   |——     Contract        (行情)
		|
		|—— personal            (个人中心)
        |   |——     Primary         (账号认证 -初级)
        |   |——     Examine         (账号认证)
		|
		|—— Industry      (工业)
		|—— Apartment       (详情)
*/

const Index = () => import( /* webpackChunkName: "index" */ '../views/index')  
const Login = () => import( /* webpackChunkName: "login" */ '../views/login/login')
const Register = () => import( /* webpackChunkName: "register" */ '../views/login/register')
const ForgetPassword = () => import( /* webpackChunkName: "forgetPassword" */ '../views/login/forgetPassword')
const Exchange = () => import( /* webpackChunkName: "exchange" */ '../views/htmls/exchange')


const Ieoinfo = () => import( /* webpackChunkName: "ieoInfolist" */ '../views/htmls/ieo_infolist')

const Articles = () => import( /* webpackChunkName: "articles" */ '../views/htmls/articles')

const Renting = () => import( /* webpackChunkName: "renting" */ '../views/htmls/renting')
const Office = () => import( /* webpackChunkName: "market" */ '../views/htmls/office')
const Contract = () => import( /* webpackChunkName: "contract" */ '../views/htmls/contract')
const Notice = () => import( /* webpackChunkName: "notice" */ '../views/htmls/notice')
const Apartment = () => import( /* webpackChunkName: "apartment" */ '../views/htmls/apartment')
const Order = () => import( /* webpackChunkName: "order" */ '../views/htmls/ap_order')
const Details = () => import( /* webpackChunkName: "details" */ '../views/htmls/ap_od_details')
const Purchase = () => import( /* webpackChunkName: "purchase" */ '../views/htmls/ap_purchase')
const Appeal = () => import( /* webpackChunkName: "appeal" */ '../views/htmls/ap_pu_appeal')


// 个人中心
const Personal = () => import( /* webpackChunkName: "personal" */ '../views/htmls/personal')

const Primary = () => import( /* webpackChunkName: "primary" */ '../views/personal/primary')
const Examine = () => import( /* webpackChunkName: "Pwallet" */ '../views/personal/examine')
const Security = () => import( /* webpackChunkName: "security" */ '../views/personal/security')
const Collect = () => import( /* webpackChunkName: "collect" */ '../views/personal/collect')
const Invite = () => import( /* webpackChunkName: "invite" */ '../views/personal/invite')
const Feedback = () => import( /* webpackChunkName: "feedback" */ '../views/personal/feedback')
const Found = () => import( /* webpackChunkName: "found" */ '../views/personal/fb_found')
const Foundinfo = () => import( /* webpackChunkName: "foundinfo" */ '../views/personal/fb_info')
const Service = () => import( /* webpackChunkName: "service" */ '../views/personal/service')
const Assets = () => import( /* webpackChunkName: "assets" */ '../views/personal/assets')
const Assetslist = () => import( /* webpackChunkName: "assetslist" */ '../views/personal/assets_list')

Vue.use(Router)

let base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
	
    mode: 'hash',
	//打包本地服务器上需要换成根目录地址,否则不用
	//base: 'webPeoject',
    base: base,
	
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
			meta:{ title:'WCOIN交易所'}
        }, 
		{
            path: '/exchange',
            name: 'exchange',
            component: Exchange,
            meta: { title: 'WCOIN交易所-币币交易' }
        }, 
        {
            path: '/ieoinfo',
            name: 'ieoinfo',
            component: Ieoinfo,
            meta: { title: 'WCOIN交易所-IEO' }
        },
        {
            path: '/articles',
            name: 'articles',
            component: Articles,
            meta: { title: 'WCOIN交易所-用户协议' }
        },
		{
            path: '/login',
            name: 'login',
            component: Login,
			meta:{ title:'WCOIN交易所-用户登录'}
        },
		{
            path: '/register',
            name: 'register',
            component: Register,
			meta:{ title:'WCOIN交易所-用户注册'}
        },
        {
            path: '/resetpwd',
            name: 'resetPwd',
            component: ForgetPassword,
            meta: { title: 'WCOIN交易所-重置密码' }
        },
		{
            path: 'renting',
            name: 'renting',
            component: Renting,
            meta:{ title:'WCOIN交易所-行情'},
            children: [
                {
                    path: '/market',
                    name: 'market',
                    component: Office,
                    meta: { title: 'WCOIN交易所-行情' }
                },
                {
                    path: '/contract',
                    name: 'contract',
                    component: Contract,
                    meta: { title: 'WCOIN交易所-行情' }
                },
            ]
        },
        {
            path: '/notice',
            name: 'notice',
            component: Notice,
            meta: { title: 'WCOIN交易所-公告' }
        }, 
		{
            path: '/apartment',
            name: 'apartment',
            component: Apartment,
            meta: { title:'WCOIN交易所-OTC'}
        },
		{
            path: '/order',
            name: 'order',
            component: Order, 
            meta: { title: 'WCOIN交易所-OTC' },
            children: [],
        }, 
        {
            path: '/details',
            name: 'details',
            component: Details,
            meta: { title: 'WCOIN交易所-OTC' },
        },
        {
            path: '/purchase',
            name: 'purchase',
            component: Purchase,
            meta: { title: 'WCOIN交易所-OTC' },
        },
        {
            path: '/appeal',
            name: 'appeal',
            component: Appeal,
            meta: { title: 'WCOIN交易所-OTC' },
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal,
            meta: { title: 'WCOIN交易所-个人中心' },
            children: [
                {
                    path: '/examine',
                    name: 'examine',
                    component: Examine,
                    meta: { title: 'WCOIN交易所-账号认证' },
                },
                {
                    path: '/primary',
                    name: 'primary',
                    component: Primary,
                    meta: { title: 'WCOIN交易所-账号认证' }, 
                },
                {
                    path: '/security',
                    name: 'security',
                    component: Security,
                    meta: { title: 'WCOIN交易所-安全中心' }, 
                }, 
                {
                    path: '/assets',
                    name: 'assets',
                    component: Assets,
                    meta: { title: 'WCOIN交易所-我的资产' },
                },
                {
                    path: '/assetslist',
                    name: 'assetslist',
                    component: Assetslist,
                    meta: { title: 'WCOIN交易所-我的资产' },
                },
                {
                    path: '/collect',
                    name: 'collect',
                    component: Collect,
                    meta: { title: 'WCOIN交易所-收款方式' }, 
                },
                {
                    path: '/invite',
                    name: 'invite',
                    component: Invite,
                    meta: { title: 'WCOIN交易所-我的邀请' }, 
                }, 
                {
                    path: '/feedback',
                    name: 'feedback',
                    component: Feedback,
                    meta: { title: 'WCOIN交易所-建议反馈' }, 
                },
                {
                    path: '/found',
                    name: 'found',
                    component: Found,
                    meta: { title: 'WCOIN交易所-建议反馈' },
                }, 
                {
                    path: '/foundinfo',
                    name: 'foundinfo',
                    component: Foundinfo,
                    meta: { title: 'WCOIN交易所-建议反馈' },
                },
                {
                    path: '/service',
                    name: 'service',
                    component: Service,
                    meta: { title: 'WCOIN交易所-在线客服' },
                },
            ],
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    let seesionId = sessionStorage.getItem('seesion');
    // if (seesionId === null) {
    //     console.log('登录信息已过期,请重新登录');
    // }

    if (seesionId === null || seesionId === '') {
        localStorage.setItem('user_SessionId', '1');
        next();
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     // 做些什么，通常权限控制就在这里做哦

//     // 必须写next()哦，不然你的页面就会白白的，而且不报错，俗称"代码下毒"
//     next();
// });

export default router;
