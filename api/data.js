const basicUrl = "http://www.baidu1.com:3367/index.php";
const bannerUrl = "http://www.baidu1.com:3367/";

export default {
	basicUrl,
	bannerUrl,
	banner() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: bannerUrl + "/api/Banner/banner",
				success(res) {
					resolve(res.data.data)
				}
			})
		})
	},
	type() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + '/api/type/type',
				date: {
					page: 1.,
					pageSize: 1
				},
				success(res) {
					resolve(res.data.data)
				}
			})
		})
	},
	alltype() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/type/type",
				success: res => {
					resolve(res.data.data)
				}
			})
		})
	},
	// 获取商品分类下的商品
	goodstype(page, tid) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/goods/goods",
				data: {
					page: page,
					pageSize: 10,
					tid: tid
				},
				success: res => {
					resolve(res.data.data)
				}
			})
		})
	},
	//获取商品总条数
	goodstypeAll(tid) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/goods/goods",
				data: {
					page: 1,
					pageSize: 1,
					tid: tid
				},
				success: res => {
					resolve(res.data.total)
				}
			})
		})
	},
	goods(page) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + '/api/goods/goods',
				data: {
					page: page,
					pageSize: 4
				},
				success(res) {
					resolve(res.data.data)
				}
			})
		})
	},
	total() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + '/api/goods/goods',
				data: {
					page: 1,
					pageSize: 1
				},
				success(res) {
					resolve(res.data.total);
				}
			})
		})
	},
	allType() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/type/type",
				success(res) {
					resolve(res.data.data);
				}
			})
		})
	},
	getGoodsType(page, tid) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/goods/goods",
				data: {
					page: page,
					pageSize: 4,
					tid: tid
				},
				success(res) {
					resolve(res.data.data);
				}
			})
		})
	},
	getThis(page) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + '/api/goods/goods',
				data: {
					page: page,
					pageSize: 1
				},
				success(res) {
					resolve(res.data.total);
				}
			})
		})
	},
	getTotalType(page, tid) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicUrl + "/api/goods/goods",
				data: {
					page: page,
					pageSize: 4,
					tid: tid
				},
				success(res) {
					resolve(res.data.data);
				}
			})
		})
	},
	getGoodsDetail(page,goodsId){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:bannerUrl+"api/goods/goods",
				data:{
					id:goodsId,
					page:page,
					pageSize:10
				},
				success: (res) => {
					resolve(res.data.data);
				}
			})
		})
	}
}
