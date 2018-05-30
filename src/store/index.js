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
	ahuterArr: [
		{ name: 'ahtuer1', src: '../static/images/ahuter1.jpg' },
		{ name: 'ahuter2', src: '../static/images/ahuter2.jpg' },
	],
	goods: {},
	isLogin: 0,
	user: {}
}
const mutations = {
	CHANGE_USER(state, data) {
		for (var key in data) {
			state.user[key] = data[key];
		}
	},
	CHANGE_GOODS(state, data) {
		for (var key in data) {
			state.goods[key] = data[key];
		}
	},
	CHANGE_LOGIN(state, data) {
		state.isLogin = data;
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
	//改变登录方式
	changeLoginway({ commit }, type) {
		commit('CHANGE_LOGINWAY', type)
	}
}
const getters = {
	getUser: function (state) {
		var result = {}
		for (var key in state.user) {
			result[key] = state.user[key]
		}
		return result
	},
	getGoods: function (state) {
		var result = {}
		for (var key in state.goods) {
			result[key] = state.goods[key]
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
	getLoginway: function (state) {
		return state.loginway
	},
	getAhuter: function (state) {
		return state.ahuterArr
	},
	getIsLogin: function (state) {
		return state.isLogin
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})