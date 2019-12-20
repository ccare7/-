<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item,index) in alltype" :key="index" class="f-item b-b" :class="{active: item.id === currentid}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scrolltolower="Tolower" :scroll-top="tabScrollTop">
			<view v-for="(item,index) in goodlist" :key="index" class="s-list" :id="'main-'+item.id">
				<view class="good_list">
					<image class="goodthumb" :src="baseBanner+item.thumb"></image>
					<view class="wenzi">
					<text class="s-item">{{item.name}}</text><br>
					<view class="s-description">{{item.description}}</view><br>
					<text class="s-price">单价￥{{item.price}}</text>
					<view class="s-shuliang">
						<template v-if="item.count">
							<view class="addview" @tap="dec(item)">-</view>
							<view>{{item.count}}</view>
						</template>
						<view class="addview addbtn" @tap="add(item)">+</view>
					</view>
					</view>
				</view>
<!-- 			<view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="baseBanner+item.thumb"></image>
						<text>{{item.name}}</text>
					</view>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alltype:[],
				goodlist:[],
				currentid:0,
				page:1,
				baseBanner:this.$http.bannerUrl,
				total:0,
				n:0
			}
		},
		onLoad(){
			// this.loadData();
		},
		async onShow(){
			let tid=uni.getStorageSync("tid");
			this.alltype=await this.$http.alltype();
			if(tid){
				this.currentid=tid;
			}else{
				this.currentid=this.alltype[0].id
			}
			this.goodlist=await this.$http.goodstype(this.page,this.currentid);
			this.goodlist.forEach(item=>{
				item.count=0;
				this.$store.state.shoppingcar.forEach(ele=>{
					if(ele.id==item.id){
						item.count=ele.count
					}
				})
			})
			this.total=await this.$http.total();
		},
		methods: {
			// async loadData(){
			// 	this.alltype=await this.$http.alltype();
			// },
			async Tolower(){
				this.page++;
				if(this.goodlist.length===this.total){
					uni.showToast({
						title:"没有更多商品",
						icon:"none",
						mask:true
					});
					return
				}
				this.goodlist=[...this.goodlist,...await this.$http.goodstype(this.page,this.currentid)]
				
			},
			async tabtap(item){
				if(item.id===this.currentid){
					return;
				}
				this.currentid=item.id;
				this.goodlist=[];
				this.page=1;
				this.goodlist=await this.$http.goodstype(this.page,item.id);
				this.goodlist.forEach(item=>{
					item.count=0;
					this.$store.state.shoppingcar.forEach(ele=>{
						if(ele.id==item.id){
							item.count=ele.count
						}
					})
				})
				this.total=await this.$http.goodstypeAll(item.id)
			},
			asideScroll(){
			
			},
			add(item){
				item.count++;
				this.n++;
				this.$store.commit("add",item);
			},
			dec(item){
				item.count--;
				this.n++;
				if(item.count==0){
					this.$store.commit("dec",item);
				}else{
					this.$store.commit("add",item);
				}
			}
		},
		
		
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
	},
	.good_list{
		background: #fff;
		height: 170upx;
		border-bottom: 1upx solid #ccc;
	}
	.goodthumb{
		display: inline-block;
		margin: 15upx;
		width: 140upx;
		height: 140upx;
	}
	.wenzi{
		margin-top: -155upx;
		margin-left: 165upx;
	}
	.s-item{
		font-weight: bold;
		font-size: 25upx;
	}
	.s-price{
		text-align: right;
		font-size: 30upx;
	}
	.s-description{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 250upx;
		font-size: 25upx;
		color: #3e3e3e;
		margin-bottom: 15upx;
	}
	/* 数量加减器 */
	.s-shuliang {
		/* float: right; */
		/* width: 130upx; */
		margin-right: 20upx;
		float: right;
		/* display: flex;
		justify-content: space-between; */
		
	}
	.s-shuliang view{
		width: 40upx;
		height: 40upx;
		float: left;
		text-align: center;
		line-height: 40upx;
	}
	.s-shuliang .addview{
		/* float: right; */
		border-radius: 100%;
		background-color: red;
		color:white;
	}
	
</style>
