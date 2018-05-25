import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

const state = {
	loginway: 'login',
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
	ahuterArr:[
		{name:'ahtuer1',src:'../static/images/ahuter1.jpg'},
		{name:'ahuter2',src:'../static/images/ahuter2.jpg'},
	],
	classis:[
		{title:'商品分类'},
		{title:'书  籍'},
		{title:'手  机'},
		{title:'衣鞋伞帽'},
		{title:'电  脑'},
		{title:'配  件'},
		{title:'电  器'},
		{title:'代  步'},
		{title:'娱  乐'},
		{title:'运动健身'},
		{title:'其  他'}				
	],
	goods:{},
	selectedItem: {},
	sessionSelectedItem: {},
	cart: [],
	isLogin:0,
	user:{}
}
const mutations = {
	CHANGE_USER(state,data){
		for(var key in data){
			state.user[key]=data[key];
		}
	},
	CHANGE_GOODS(state,data){
		for(var key in data){
			state.goods[key]=data[key];
		}
	},
	CHANGE_LOGIN(state,data){
		state.isLogin=data;
	},
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
	getUser:function(state){
		var result={}
		for(var key in state.user){
			result[key]=state.user[key]
		}
		return result
	},
	getGoods: function (state) {
		var result={}
		for(var key in state.goods){
			result[key]=state.goods[key]
		}
		return result
	},
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
	getSelectedItem: function (state) {
		return state.selectedItem
	},
	getCart: function (state) {
		return state.cart
	},
	getLoginway: function (state) {
		return state.loginway
	},
	getAhuter:function(state){
		return state.ahuterArr
	},
	getClassis:function(state){
		return state.classis
	},
	getIsLogin:function(state){
		return state.isLogin
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})