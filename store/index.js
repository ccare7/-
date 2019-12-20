import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		shoppingcar:uni.getStorageSync("shoopcar")||[]
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		add(state,payload){
			let index=state.shoppingcar.findIndex(function(ele){
				if(ele.id==payload.id){
					return true
				}
			});
			// console.log(index);
			if(index!==-1){
				state.shoppingcar.splice(index,1,payload);
			}else{
				state.shoppingcar.push(payload);
			}
			uni.setStorageSync("shoopcar",state.shoppingcar)
		},
		dec(state,payload){
			let index=state.shoppingcar.findIndex(function(ele){
				if(ele.id==payload.id){
					return true
				}
			});
			state.shoppingcar.splice(index,1);
			uni.setStorageSync("shoopcar",state.shoppingcar)
		}
	},
	actions: {
	
	}
})

export default store
