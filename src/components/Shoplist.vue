 <template>
	<div class="shop">
		<ul class="shop_ul">
			<li class="shop_li" v-for="(good,index) in goods">
					<img :src="good.src" alt="good" class="good_img" @mouseover="changeFlagTrue(index)" />
					<div class="good_info">
						<p @click="changeSelectedItem(index)">
							<router-link to="/shoppingitem" class="title_info">{{good.title}}</router-link>
						</p>
						<p class="good_info_bottom">
							<span class="user_info"><img :src="good.shopsSrc" alt="shop"/><span class="user_name">{{good.shopsName}}</span></span>
							<span class="price_info"><img :src="'../static/images/price.png'" alt="price"/><span class="price_num">{{good.price}}</span></span>
						</p>
					</div>
					
					<div class="layout" v-if="good.flag" @mouseout="changeFlagFalse(index,$event)" @click="changeSelectedItem(index)">
						<router-link to="/shoppingitem" tag="div" class="link">
						 	<p><img :src="'../static/images/like.png'" alt="like"/><span class="like_num">{{good.likes}}</span></p>
							 <!-- 这里的：class绑定的背景图，对应css在islike.css中 -->
						 </router-link>
					</div>					
					<div class="like" :class="good.isLike?'toLike':'noLike'" @click="changeLike(index)" v-if="good.flag"></div>				
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
	export default {
		data (){
			return {
			}
		},
		created (){
			this.$store.dispatch('changeShow','shop')//此步改变导航栏
		},
		computed:mapGetters({
				goods:'getGoods'
			}),
		methods:{
			changeLike(index){
				this.$store.dispatch('changeLike',index)//改变是否喜欢
			},
			changeFlagTrue(index){
				this.$store.dispatch('changeFlagTrue',index)//改变是否显示喜欢
			},
			changeFlagFalse(index,e){
				var evt=this.getRelatedTarget(e)
				if(evt.getAttribute('class')){
					if(!(evt.getAttribute('class').indexOf('like')!=-1)){
						this.$store.dispatch('changeFlagFalse',index)//改变是否显示喜欢
					}	
				}
			},
			changeSelectedItem(index){
				this.$store.dispatch('changeSelectedItem',index)//改变进入商品
			},
			getRelatedTarget: function (event) {
		        if (event.relatedTarget) {
		            return event.relatedTarget;
		        } else if (event.toElement) {
		            return event.toElement;
		        } else if (event.fromElement) {
		            return event.fromElement;
		        } else {
		            return null;
		        }
    		}
		}
	}
</script>
<style scoped>
	.shop{width: 1000px;margin: 0 auto;padding-top: 20px}
	.shop:after{width: 0;height: 0;display: block;clear:both;content: ""}
	.shop_li{float:left;width: 322px;padding: 10px;border:1px solid #d9d9d9;margin-left:10px;margin-bottom: 20px;position: relative;box-sizing: border-box;}
	.good_img{width: 300px;height: 300px;border:none;}
	.title_info{display: inline-block;width: 300px;margin: 4px 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;height: 24px;line-height: 24px;font-size:16px; }
	.good_info_bottom{height: 24px;display: block}
	.good_info_bottom:after{width: 0;height: 0;display: block;clear:both;content: ""}
	.price_info,.user_info{height: 24px;display: inline-block}
	.user_info{float:left;}
	.price_info{vertical-align: top;float:right;}
	.user_info img{width: 24px;height: 24px;margin-right:5px ;border: none}
	.price_info img{width: 18px;height: 18px;border: none;}
	.user_name{color:rgb(114, 113, 118);font-size: 12px;vertical-align: top;line-height: 24px;height: 24px;display: inline-block;}
	.price_num{color: #2C2C2C;font-size: 21px;line-height: 24px;font-weight: bold;height: 24px;display: inline-block;margin-left:3px;}
	.layout{z-index:2;width: 300px;height: 300px;opacity: 0.8;background: #111;position: absolute;top:10px;left: 10px;opacity: 0.8;cursor:pointer;}
	.layout p{text-align: right;}
	.layout img{width: 21px;height: 20px;margin-right:5px ;border: none;}
	.layout .like_num{color:#fff;font-size: 18px;vertical-align: top;line-height: 20px;height: 20px;display: inline-block;font-weight: bold}
	 .like{top:115px;left: 50%;margin-left: -35px;position: absolute;width: 70px;height: 90px;    z-index: 9999;opacity: 1;cursor: pointer;}
	 .link{width: 290px;height: 290px;padding: 10px 10px 0 0}
	</style>