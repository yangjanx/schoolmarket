<template>
	<div class="cart" >
		<table :style="{height:home_first_height+'px'}" v-if="cart.length" ref="table">
			<!-- 本来想用minHeight,可是火狐不兼容，这样写，高度变高会自动撑开 -->
			<tbody>
				<tr>
					<th class="th_chk"><div><input type="checkbox" @change="selectAll" id="selectAll" v-model="isAll"/><label for="selectAll">全选</label></div></th>
					<th class="th_item"></th>
					<th class="th_info">商品信息</th>
					<th class="th_price">单价</th>
					<th class="th_amount">数量</th>
					<th class="th_sum">金额</th>
					<th class="th_op">操作</th>
				</tr>
				<tr v-for="(single,index) in cart">
					<td class="td_chk"><input type="checkbox" v-model="single.completed" name="singlecheck"/></td>
					<td class="td_item">
						<div>
							<img :src="single.src" alt="single"/><p>{{single.title}}</p>
						</div>
					</td>
					<td class="td_info">
						<p>颜色：{{single.color}}<br/>尺码：{{single.size}}</p>
					</td>
					<td class="td_price">
						￥{{parseFloat(single.price).toFixed(2)}}
					</td>
					<td class="td_amount">
						<div>
							<span class="subtract" @click="changeNumSub(index)" :class="{disabled:single.num<=1}">-</span>
							<input type="text" class="input_num" :value="single.num" disabled/>
							<span class="add" @click="changeNumAdd(index)" :class="{disabled:single.num>=8}">+</span>
						</div>	
					</td>
					<td class="td_sum">￥{{parseFloat(single.num*single.price).toFixed(2)}}</td>
					<td class="td_op"><span @click="remove(index)">删除</span></td>
				</tr>
			</tbody>
			<div class="t_foot">
				<p>
					已选<span>{{selectedSum}}</span>件
				</p>
				<p>共<span>{{priceSum}}</span>元</p>
				<p><button>结算</button></p>
			</div>
		</table>
		<div v-if="!cart.length" :style="{height:home_first_height+'px'}">
			<p class="empty">你的购物车空空如也</p>
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return {
				isSelectedAll:false,
			}
		},
		computed:{
			...mapGetters({
				cart:'getCart',
				hw:'getHW'
			}),
			selectedSum(){
				return this.cart.filter(function(e){
					return e.completed
				}).length
			},
			priceSum(){
				//浮点数加法
				var floatMul=function(m,n,sum){
					var _m=m.split('.')
					var _n=n.split('.')
					var maxFloatNum=Math.max(parseInt(_m[1].length),parseInt(_n[1].length))
					console.log(maxFloatNum)
					var multiple=(parseFloat(m)*Math.pow(10,maxFloatNum)+parseFloat(n)*Math.pow(10,maxFloatNum))/Math.pow(10,maxFloatNum)
					return multiple.toFixed(sum)
				}
				var sum='0.00';
				this.cart.filter(function(e){
					return e.completed
				}).forEach(function(n){
					sum=floatMul(sum,parseFloat(n.num*n.price).toFixed(2),2)
				})
				return sum
			},
			//点击单个选择到全部选到时，会将全选按钮一起带动
			isAll(){
				return this.cart.every(function(e){
					return e.completed
				})
			},
			home_first_height:function(){
				var a= parseInt(this.hw.h)-200
				return a<389?389:a
			},
		},
		methods:{
			selectAll(){
				
				//依靠isAll
				if(this.isAll){
					this.cart.forEach(function(e){
						e.completed=false
					})
				}else{
					this.cart.forEach(function(e){
						e.completed=true
					})
				}
			},
			changeNumSub(index){
				
				if(this.cart[index].num>1){
					this.$store.dispatch('changeNumSub',index)
				}
				
			},
			changeNumAdd(index){
				if(this.cart[index].num<8){
					this.$store.dispatch('changeNumAdd',index);
				}	
			},
			remove(index){
				this.$store.dispatch('remove',index)
			}
			
		},
		created(){
			this.cart.forEach(function(e){
					e.completed=false
			});
			this.$store.dispatch('changeShow','')
		},
	}
</script>
<style>
	/*简直就是坑爹的table，火狐和chrome的thead不一样*/
	table{margin:0 auto; padding-bottom: 60px;position: relative;}
	tbody{width:1060px;display: block;margin:0;}
	tbody tr{border:1px solid #00BC9B;display:block;margin: 20px 0}
	tbody tr:first-child{border: none;}
	tbody td{height: 100px;display: inline-block;padding-top: 20px;}
	th{text-align: left;display: inline-block;padding-top: 20px;font-size: 12px;height: 40px;}
	label{font-size: 12px}
	.td_chk{width: 80px;}
	.td_chk input{display: inline-block;margin:0 10px;cursor: pointer;}
	.td_item{width: 300px;overflow: hidden;}
	.td_item img{width: 80px;height: 80px;}
	.td_item p{display: inline-block;width: 186px;font-size: 12px;overflow: hidden;    text-overflow: ellipsis;    max-height: 36px;    color: #3c3c3c;;vertical-align: top;margin-left: 5px;cursor: pointer;}
	.td_item p:hover{color:#00BC9B;text-decoration: underline;}
	.td_info{width: 170px;}
	.td_info p{color:#9c9c9c;font-size: 12px;}
	.td_price,.td_sum{width: 120px;color: #3c3c3c;font-weight: 700; font-family: Verdana,Tahoma,arial;font-size: 12px;}
    .td_amount{width: 120px}
    .td_sum{color:#00BC9B;}
    .td_op{width: 120px;}
    .td_op span{cursor: pointer;font-size: 12px;}
    .td_op span:hover{color:#00BC9B;text-decoration: underline;}
	.th_chk{width: 80px;}
	.th_chk input{display: inline-block;margin:0 10px;cursor: pointer;}
	.th_item{width: 300px;}
	.th_info{width: 170px;}
	.th_price,.th_sum{width: 120px;}
	.th_amount{width: 120px}
	.th_op{width: 120px}
	.t_foot{border: 1px solid #00BC9B ;position: absolute;bottom: 3px;width:1060px;}
	.t_foot span{color:#00BC9B;}
	.t_foot p{display: inline-block;margin-right: 20px;width: 100px;text-align: center}
	.t_foot button{padding: 15px 30px;background:#00BC9B; border: none;cursor: pointer}
	.empty{width: 500px;height: 200px;font-size: 20px;text-align: center;border: 1px dashed #00BC9B;margin: 0 auto;padding-top: 100px}
	.disabled{color:#fff; cursor: not-allowed;background: #ededed;}
</style>