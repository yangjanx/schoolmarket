<template>
  <div class="goodsitem">
    <div class="item_left">
      <img :src="['static/public/uploads/'+good.goods_picture]" class="item_img">
    </div>
    <div class="item_right">
      <label>标题：</label><h1>{{good.goods_name}}</h1>
      <p>
        <label>描述：</label>
        <span class="descri">{{good.goods_recommend}}</span>
      </p>
      <div>
				<label>成新率：</label>
				<span class="newold"><em>{{good.goods_newold}}</em> 成新</span>
			</div>
      <div>
				<label>价格：</label>
				<span class="price"><img src="static/images/price.png"><em> {{good.goods_price}}</em></span>
			</div>
      <div>
				<label>卖家联系方式：</label>
				<span class="sellerqq"><img src="static/images/qqicon.jpg" style="width:30px;height:30px;"> <em>{{good.qq}}</em></span>
			</div>
      <div class="addToCart">
				<span class="addToCart_btn" @click="addToCart">
          <router-link :to="'/cart?goods_id='+good.goods_id">加入购物车</router-link>
        </span>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      good: []
    };
  },
  created() {
    var that = this;
    this.$http
      .post(
        "api/user/getSinglegood",
        {
          id: this.$route.query.goods_id
        },
        {}
      )
      .then(response => {
        that.good = response.body[0];
      });
  },
  methods:{
    addToCart(){
        layer.msg('加入购物车成功！');
        this.$store.dispatch('addToCart');
    }
  }
};
</script>

<style scoped>
.goodsitem {
  width: 1000px;
  height: 622px;
  margin: 30px auto;
  padding: 20px;
}
.goodsitem:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
}
.item_left {
  float: left;
  width: 400px;
}
.item_img {
  width: 400px;
  height: 400px;
  border: none;
}
.item_right {
  float: right;
  width: 540px;
}
.item_right h1 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 22px;
  display: inline-block;
}
label {
  display: inline-block;
  color: #111;
  font-size: 15px;
  padding-right: 20px;
  font-weight: 400;
  vertical-align: top;
}
.item_right div {
  margin: 20px 0;
  border-top: 1px solid #00bc9b;
  padding-top: 20px;
}
.item_right .descri {
  font-size: 12px;
  font-weight: 400;
  color: #666;
  display: inline-block;
  width: 459px;
  word-break: break-all;
}
.addToCart_btn {
  display: inline-block;
  font-weight: bold;
  margin-left: 180px;
}
.addToCart_btn a {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  font-size: 20px;
  background: #00bc9b;
  border-radius: 5px;
  cursor: pointer;
 } 
em{
  font-weight: bold;
  font-size: 18px;
}
.item_right img{
  margin-bottom: 5px;
}
</style>


