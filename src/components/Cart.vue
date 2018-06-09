<template>
	<div class="cart">
		<table style="height:756px;" v-if="user.cartnum" ref="table">
			<tbody>
				<tr>
					<th class="th_chk"><div><input type="checkbox" id="selectAll" @change="selectAll"><label for="selectAll">全选</label></div></th>
					<th class="th_item"></th>
					<th class="th_info">商品信息</th>
					<th class="th_price">金额</th>
					<th class="th_op">操作</th>
				</tr>
				<tr id="singlebox" v-for="(good,index) in goods">
					<td class="td_chk"><input type="checkbox" :value="good.goods_price" :data-goodindex='index' name="goodcheck" @change="setselectAll"></td>
					<td class="td_item">
						<div>
							<img :src="['static/public/uploads/'+good.goods_picture]"/><p><router-link :to="'/shopitem?goods_id='+good.goods_id" class="ahover">{{good.goods_name}}</router-link></p>
						</div>
					</td>
					<td class="td_info">
						<p>成新率：{{good.goods_newold}}<br/>分类：{{good.classify_id}}<br>原价：{{good.goods_originprice}}<br>现价：{{good.goods_price}}</p>
					</td>
					<td class="td_price">
						￥{{good.goods_price}}
					</td>
					<td class="td_op">
						<span @click="Remove(good.goods_id)">删除</span>
					</td>
				</tr>
			</tbody>
			<div class="t_foot">
				<p>
					已选<span>{{selectSum}}</span>件
				</p>
				<p>共<span>{{priceSum}}</span>元</p>
				<button @click="Balance">立刻联系卖家</button>
			</div>
		</table>
		<div v-if="!user.cartnum" style="height:656px;">
			<p class="empty">你的购物车空空如也</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      goods: [],
      selectSum:0,
      priceSum:0
    };
  },
  created() {
    this.$store.dispatch("changeShow", "");
    var that = this;
    this.$http
      .post(
        "api/user/getCartinfo",
        {
          id: that.user.id
        },
        {}
      )
      .then(response => {
        that.goods = response.body;
      });
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  methods:{
	  Remove(goodsid){
		  var that=this;
		  this.$http.post('api/user/removefromCart',{
			  goodsid:goodsid,
			  userid:that.user.id
		  })
		  .then(response=>{
			that.$store.commit("CHANGE_USER", {
            cartnum: that.$store.state.user.cartnum - 1
		  });
		  layer.msg("删除商品成功！");
		  setTimeout(() => {
            window.location.reload();
          }, 500);
		  })
    },
    selectAll(){
      this.priceSum=0;
      if($("#selectAll").prop("checked")){
        $("input[type='checkbox'][name='goodcheck']").prop("checked",true);
        this.selectSum=this.goods.length; 
        for(var i=0;i<this.goods.length;i++)
        this.priceSum+=parseInt(this.goods[i].goods_price)
      }else{
        $("input[type='checkbox'][name='goodcheck']").prop("checked",false);
        this.selectSum=0;
      }
    },
    setselectAll(){
      if(!$("#goodcheck").checked){
        $("#selectAll").prop("checked",false)
      }
      var cartnum1=this.$store.state.user.cartnum;
      var checkedcart=$("input[type='checkbox'][name='goodcheck']:checked");
      this.selectSum=checkedcart.length;
      this.priceSum=0;
      for(var i=0;i<checkedcart.length;i++)
        this.priceSum+=parseInt($(checkedcart[i]).val())
        
      if(checkedcart.length==cartnum1){
        $("#selectAll").prop("checked",true)
      }
    },
    Balance(){
      var that=this;
      var goodsid=[];
      var checkedcart=$("input[type='checkbox'][name='goodcheck']:checked");
      if(checkedcart.length==0){
        layer.msg('你还没有选择任何商品！',function(){})
      }else{
        layer.confirm('快去商品详情页找寻卖家联系方式吧！',{
          btn:['确定','取消']
        },function(){
          layer.msg('现在就去！',{icon:1});
        },function(){
          layer.msg('请重新选择')
        })
      }
    }
  }
};
</script>

<style scoped>
table {
  margin: 0 auto;
  padding-bottom: 60px;
  position: relative;
}
tbody {
  width: 812px;
  display: block;
  margin: 0;
}
tbody tr {
  border: 1px solid #00bc9b;
  display: block;
  margin: 20px 0;
}
tbody tr:first-child {
  border: none;
}
tbody td {
  height: 100px;
  display: inline-block;
  padding-top: 15px;
}
th {
  text-align: left;
  display: inline-block;
  padding-top: 20px;
  font-size: 12px;
  height: 40px;
}
label {
  font-size: 12px;
}
.td_chk {
  width: 80px;
}
.td_chk input {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
.td_item {
  width: 300px;
  overflow: hidden;
}
.td_item img {
  width: 80px;
  height: 80px;
}
.td_item p {
  display: inline-block;
  width: 186px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 36px;
  color: #3c3c3c;
  vertical-align: top;
  margin-left: 5px;
  cursor: pointer;
}
.td_item a:hover {
  color: #00bc9b;
  text-decoration: underline;
}
.td_info {
  width: 170px;
}
.td_info p {
  color: #9c9c9c;
  font-size: 12px;
}
.td_price {
  width: 120px;
  color: #3c3c3c;
  font-weight: 700;
  font-family: Verdana, Tahoma, arial;
  font-size: 12px;
  color: #00bc9b;
}
.td_op {
  width: 120px;
}
.td_op span {
  cursor: pointer;
  font-size: 12px;
  color: #00bc9b;
}
.td_op span:hover {
  color: green;
  text-decoration: underline;
}
.th_chk {
  width: 80px;
}
.th_chk input {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
.th_item {
  width: 300px;
}
.th_info {
  width: 170px;
}
.th_price {
  width: 120px;
}
.th_op {
  width: 120px;
}
.t_foot {
  border: 1px solid #00bc9b;
  position: absolute;
  bottom: 3px;
  width: 812px;
}
.t_foot span {
  color: #00bc9b;
}
.t_foot p {
  display: inline-block;
  margin-right: 20px;
  width: 200px;
  text-align: center;
}
.t_foot button {
  display: inline-block;
  width: 180px;
  text-align: center;
  padding: 15px 30px;
  background: #00bc9b;
  border: none;
  cursor: pointer;
  margin-left: 181px;
}
.t_foot button:hover{
	background: green;
	color: #fff
}
.empty {
  width: 500px;
  height: 250px;
  font-size: 25px;
  text-align: center;
  border: 1px dashed #00bc9b;
  margin: 100px auto;
  padding-top: 100px;
  color: #00bc9b;
}
.disabled {
  color: #fff;
  cursor: not-allowed;
  background: #ededed;
}
</style>


