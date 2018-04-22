import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	loginway: '',
	show: 'home',
	clientheight: 0,
	clientwidth: 0,
	footItems: [
		{ title: '关于我们', contents: { content_1: '联系我们', content_2: '关于此网站' } },
		{ title: '友情链接', contents: { content_1: '安工大官网', content_2: '安工大贴吧' } },
		{ title: '服务', contents: { content_1: '支付须知', content_2: '联系卖家' } },
		{ title: '关注我们', contents: { content_1: 'Sina Weibo', content_2: 'Github' } },
	],
	left_nav: {
		home: 'home',
		shop: 'shop'
	},
	right_nav: {
		usercenter: 'usercenter',
		publish: 'publish'
	},
	goods: [
		//商品信息
		{
			src: '../static/images/goods_7.jpg',
			title: 'Staple 联名 V/Sual MA1 鸽子 裸女 飞行员空军夹克外套',
			shopsSrc: '../static/images/shops_1.jpg',
			shopsName: 'jenry',
			price: 679,
			isLike: true,
			likes: 10,
			flag: false,
			num: 1,
			description: '版型选择中长款MA1进行改良 合身塑形 •使用杜邦梭织面料，抗风防水耐磨 •内里填充300克重鸭绒，恒温保暖 •胸口定制四个联名胸章 玩味十足 •DIE WELLE 延续秋冬沙漠主题将SAHARA之眼至于肩覆水，并将石莲花与TEAMAGE标志性玫瑰花置于左臂与面料质感形成强烈对比',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_8.jpg',
			title: 'MOSTWANTEDLAB 2016AW MWTD 植绒印花MA1飞行员夹克棉衣外套',
			shopsSrc: '../static/images/shops_2.jpg',
			shopsName: '买物教室',
			price: 499,
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '大家都喜欢吃披萨，当然喵星人也不例外，萌猫躲在披萨里头仿佛在向主人抗议，简直萌化了。这件Stay gold 三色贪吃猫披萨卫衣正面采用刺绣工艺，完美呈现披萨拉丝效果，而且采用10支350克加绒面料，兼具舒适性和保暖性。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_9.jpg',
			title: 'FTW FORTHEWIN M65 JTK 秋冬男重度水洗军事风四口袋工装夹克外套',
			shopsSrc: '../static/images/shops_1.jpg',
			price: 380,
			shopsName: 'jenry',
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '外星人系列。春秋教练夹克，白蓝黑红四色任意挑选。胸前的外星人设计，更显年轻时尚，街头范十足。冲锋衣面料，防水透气，穿着舒适，相比同类的冲锋衣夹克，这款性价比更高。推荐入手。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_4.jpg',
			title: '[PAPERWORKS]沙丁鱼罐头食物系列苹果i7/6/6S/plus原创全包手机壳',
			shopsSrc: '../static/images/shops_3.jpg',
			shopsName: 'QW',
			price: 119,
			isLike: true,
			likes: 10,
			flag: false,
			num: 1,
			description: '版型选择中长款MA1进行改良 合身塑形 •使用杜邦梭织面料，抗风防水耐磨 •内里填充300克重鸭绒，恒温保暖 •胸口定制四个联名胸章 玩味十足 •DIE WELLE 延续秋冬沙漠主题将SAHARA之眼至于肩覆水，并将石莲花与TEAMAGE标志性玫瑰花置于左臂与面料质感形成强烈对比',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_5.jpg',
			title: 'SSUR Plus 16秋冬新款 背后大字母 喷染 卫衣 帽衫 情侣',
			shopsSrc: '../static/images/shops_2.jpg',
			shopsName: 'QW',
			price: 698,
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '大家都喜欢吃披萨，当然喵星人也不例外，萌猫躲在披萨里头仿佛在向主人抗议，简直萌化了。这件Stay gold 三色贪吃猫披萨卫衣正面采用刺绣工艺，完美呈现披萨拉丝效果，而且采用10支350克加绒面料，兼具舒适性和保暖性。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_6.jpg',
			title: '羽绒道袍保暖棉衣和服外套mdns 16aw',
			shopsSrc: '../static/images/shops_1.jpg',
			price: 428,
			shopsName: 'jenry',
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '外星人系列。春秋教练夹克，白蓝黑红四色任意挑选。胸前的外星人设计，更显年轻时尚，街头范十足。冲锋衣面料，防水透气，穿着舒适，相比同类的冲锋衣夹克，这款性价比更高。推荐入手。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_1.jpg',
			title: 'DIE WELLE X TEAMAGE 联名款冲锋羽绒服 撒哈拉之眼 长款MA1 棉服',
			shopsSrc: '../static/images/shops_1.jpg',
			shopsName: 'jenry',
			price: 679,
			isLike: true,
			likes: 10,
			flag: false,
			num: 1,
			description: '版型选择中长款MA1进行改良 合身塑形 •使用杜邦梭织面料，抗风防水耐磨 •内里填充300克重鸭绒，恒温保暖 •胸口定制四个联名胸章 玩味十足 •DIE WELLE 延续秋冬沙漠主题将SAHARA之眼至于肩覆水，并将石莲花与TEAMAGE标志性玫瑰花置于左臂与面料质感形成强烈对比',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_2.jpg',
			title: '玩味十足！Stay gold  贪吃猫圆领披萨卫衣',
			shopsSrc: '../static/images/shops_2.jpg',
			shopsName: '买物教室',
			price: 199,
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '大家都喜欢吃披萨，当然喵星人也不例外，萌猫躲在披萨里头仿佛在向主人抗议，简直萌化了。这件Stay gold 三色贪吃猫披萨卫衣正面采用刺绣工艺，完美呈现披萨拉丝效果，而且采用10支350克加绒面料，兼具舒适性和保暖性。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},
		{
			src: '../static/images/goods_3.jpg',
			title: 'SOMETHNEW WTAPS原宿风格 纯色基础款打底抓绒套头圆领卫衣',
			shopsSrc: '../static/images/shops_1.jpg',
			price: 199,
			shopsName: 'jenry',
			isLike: true,
			likes: 5,
			flag: false,
			num: 1,
			description: '外星人系列。春秋教练夹克，白蓝黑红四色任意挑选。胸前的外星人设计，更显年轻时尚，街头范十足。冲锋衣面料，防水透气，穿着舒适，相比同类的冲锋衣夹克，这款性价比更高。推荐入手。',
			sizes: ['S', 'M', 'L', 'XL'],
			size: '',
			colors: ['黑色', '白色', '红色', '灰色'],
			color: '',
			completed: false//用来检测购物车中是否选中
		},

	],
	selectedItem: {},
	sessionSelectedItem: {},
	cart: []
}
const mutations = {
	CHANGE_HW(state, obj) {
		state.clientwidth = obj.w;
		state.clientheight = obj.h;
	},
	CHANGE_SHOW(state, type) {
		state.show = type
	},
	CHANGE_NOWBRAND(state, type) {
		state.nowbrand = type + 'Intro'
	},
	CHANGE_LIKE(state, index) {
		state.goods[index].isLike = !state.goods[index].isLike;
		if (!state.goods[index].isLike) {
			state.goods[index].likes += 1
		} else {
			state.goods[index].likes -= 1
		}
	},
	CHANGE_FLAG_TURE(state, index) {
		state.goods[index].flag = true
	},
	CHANGE_FLAG_FALSE(state, index) {
		state.goods[index].flag = false
	},
	CHANGE_SELECTED_ITEM(state, index) {
		state.selectedItem = mutations.clone(state.goods[index]);
		var temp = mutations.clone(state.selectedItem);
		sessionStorage.setItem('storageItem', JSON.stringify(temp));
	},
	CHANGE_SIZE(state, index) {
		state.selectedItem.size = state.selectedItem.sizes[index]
	},
	CHANGE_COLOR(state, num) {
		state.selectedItem.color = state.selectedItem.colors[num]
	},
	//选中的商品数量增减
	CHANGE_NUM_SUB(state, index) {
		if (typeof (index) != 'number') {
			state.selectedItem.num -= 1
		} else {
			state.cart[index].num -= 1
		}

	},
	CHANGE_NUM_ADD(state, index) {
		if (typeof (index) != 'number') {
			state.selectedItem.num += 1
		} else {
			state.cart[index].num += 1
		}
	},

	ADD_TO_CART(state) {
		var cart = state.cart;
		var thing = mutations.clone(state.selectedItem);
		//查看购物车是否已经有相同的商品，信息都一样

		if (!cart.length) {
			cart.push(thing)
		} else {
			var flag = cart.some(function (e) {
				return e.color == thing.color && e.size == thing.size && e.src == thing.src
			})
			try {
				if (!flag) {
					cart.push(thing);
					throw new Error("can't find")
				}
				cart.forEach(function (e, index) {
					if (e.color == thing.color && e.size == thing.size && e.src == thing.src) {
						cart[index].num += thing.num;
						foreach.break = new Error("StopIteration");
					}
				})
			} catch (e) {
				//用于跳出循环
			}

		}
		state.selectedItem = {};
	},
	//删除商品
	REMOVE(state, index) {
		state.cart.splice(index, 1)
	},
	//js复制对象
	clone(myObj) {
		if (typeof (myObj) != 'object') return myObj;
		if (myObj == null) return myObj;

		var myNewObj = new Object();

		for (var i in myObj)
			myNewObj[i] = mutations.clone(myObj[i]);

		return myNewObj;
	},
	CHANGE_LOGINWAY(state, type) {
		state.loginway = type
	}
}
const actions = {
	change_hw({ commit }, obj) {
		commit('CHANGE_HW', obj)
	},
	changeShow({ commit }, type) {
		commit('CHANGE_SHOW', type)
	},
	changeNowbrand({ commit }, type) {
		commit('CHANGE_NOWBRAND', type)
	},
	changeLike({ commit }, index) {
		commit('CHANGE_LIKE', index)
	},
	changeFlagTrue({ commit }, index) {
		commit('CHANGE_FLAG_TURE', index)
	},
	changeFlagFalse({ commit }, index) {
		commit('CHANGE_FLAG_FALSE', index)
	},
	changeSelectedItem({ commit }, index) {
		commit('CHANGE_SELECTED_ITEM', index)
	},
	changeSize({ commit }, index) {
		commit('CHANGE_SIZE', index)
	},
	changeColor({ commit }, num) {
		commit('CHANGE_COLOR', num)
	},
	//选中的商品数量增减，包括购物车和单个商品
	changeNumSub({ commit }, index) {
		commit('CHANGE_NUM_SUB', index)
	},
	changeNumAdd({ commit }, index) {
		commit('CHANGE_NUM_ADD', index)
	},
	addToCart({ commit }) {
		commit('ADD_TO_CART')
	},
	remove({ commit }, index) {
		commit('REMOVE', index)
	},
	//改变登录方式
	changeLoginway({ commit }, type) {
		commit('CHANGE_LOGINWAY', type)
	}
}
const getters = {
	getHW: function (state) {
		return {
			h: state.clientheight,
			w: state.clientwidth
		}
	},
	getLeft_nav: function (state) {
		return state.left_nav
	},
	getRight_nav: function (state) {
		return state.right_nav
	},
	getShow: function (state) {
		return state.show
	},
	getFootItems: function (state) {
		return state.footItems
	},
	//返回点击的品牌
	getIntro: function (state) {
		return state[state.nowbrand];
	},
	getNews: function (state) {
		return state.news;
	},
	getGoods: function (state) {
		return state.goods
	},
	getSelectedItem: function (state) {
		return state.selectedItem
	},
	getCart: function (state) {
		return state.cart
	},
	getLoginway: function (state) {
		return state.loginway
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})