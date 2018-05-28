<template>
	<div class="goods">
		<ul class="goods_ul">
			<li class="goods_li" v-for="good in goods">
				<router-link :to="'/shopitem?goods_id='+good.goods_id"><img :src="['static/public/uploads/'+good.goods_picture]" class="goods_img"></router-link>
				<div class="goods_info">
					<p><router-link :to="'/shopitem?goods_id='+good.goods_id" class="goods_name">{{good.goods_name}}</router-link></p>
					<p class="goods_info_bottom">
						<span class="user_info">
						  <img :src="['static/public/uploads/'+good.headphoto]" @click="showSellerinfo" class="headpic1">
						  <span class="user_name" @click="showSellerinfo">{{good.user_nick}}</span>
              <div class="sellerinfo">
                <div class="triangle1"></div>
                <div class="triangle2"></div>
                <div class="qwe">
                  <div class="sellerhead">
                    <img :src="['static/public/uploads/'+good.headphoto]" class="headpic2">
                  </div>
                  <div class="sellerinfo1">
                    <p v-text="'昵称：'+good.user_nick"></p>
                    <p v-text="'ID：'+good.goods_sellerid"></p>
                    <p v-text="'已发布商品数：'+good.publishnum"></p>
                  </div>
                </div>
                <div class="sellerinfo2">
                  {{showgender(good.gender)}}|{{good.age}}岁|{{good.institute}}学院
                </div>
              </div>
						</span>
						<span class="price_info">
							<span class="oldprice"><del>￥{{good.goods_originprice}}</del></span>
							<img src="static/images/price.png">
							<span class="price">{{good.goods_price}}</span>
						</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data(){
		return{
			goods:[]
		}
	},
	created(){
		var that=this;
		this.$http.post('api/user/getGoodsinfo',{},{})
    	.then(response=>{
		  that.goods=response.body;
    });
  },
  methods:{
    showgender(temp) {
      if (temp == 0) {
        return "男";
      } else {
        return "女";
      }
    },
    showSellerinfo(e){
      var pop=$(e.currentTarget).next();
      pop.fadeIn();
      setTimeout(function(){
        pop.fadeOut();
      },3000)
    }
  }
};
</script>

<style scoped>
.goods {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.goods:after {
  width: 0;
  height: 0;
  display: block;
  clear: both;
  content: "";
}
.goods_li {
  float: left;
  width: 322px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  margin-left: 10px;
  margin-bottom: 20px;
  position: relative;
  box-sizing: border-box;
}
.goods_img {
  width: 300px;
  height: 300px;
  border: none;
}
.goods_name {
  display: inline-block;
  width: 300px;
  margin: 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
}
.goods_info_bottom {
  height: 24px;
  display: block;
}
.goods_info_bottom:after {
  width: 0;
  height: 0;
  display: block;
  clear: both;
  content: "";
}
.price_info,
.user_info {
  height: 24px;
  display: inline-block;
}
.user_info {
  float: left;
}
.price_info {
  vertical-align: top;
  float: right;
}
.headpic1{
  width: 24px;
  height: 24px;
  margin-right: 5px;
  border: none;
}
.price_info img {
  width: 18px;
  height: 18px;
  border: none;
}
.user_name {
  color: rgb(114, 113, 118);
  font-size: 13px;
  vertical-align: top;
  line-height: 24px;
  height: 24px;
  display: inline-block;
  cursor: pointer;
}
.user_name:hover{
  color: orangered
}
.oldprice{
  color: #777;
  font-size: 12px;
}
.price {
  color: #2c2c2c;
  font-size: 21px;
  line-height: 24px;
  font-weight: bold;
  height: 24px;
  display: inline-block;
  margin-left: 3px;
}
.sellerinfo{
  border: 3px solid #0C9;
  height: 100px;
  width: 200px;
  position: relative;
  top: -142px;
  left: 10px;
  background: #fff;
  opacity: 0.7;
  display: none;
}
.triangle1{
  height: 15px;
  width: 15px;
  display: block;
  position: absolute;
  top:97px;
  left: 30px;
  border-width: 15px;
  border-style: solid dashed dashed;
  border-color:#0C9 transparent transparent;
  font-size: 0;
  line-height: 0;
}
.triangle2{
  display: block;
  position: absolute;
  border-width: 17px;
  top: 90px;
  left: 29px;
  border-style: solid dashed dashed;
  border-color: #fff transparent transparent;
  font-size: 0;
  line-height: 0;
}
.user_info img{
  cursor: pointer;
}
.qwe{
  display: flex;
}
.sellerhead{
  height: 60px;
  width: 60px;
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
}
.headpic2{
  height: 60px;
  widows: 60px;
  border-radius: 30px;
}
.sellerinfo1{
  height: 60px;
  width: 111px;
  display: inline-block;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 12px;
}
.sellerinfo1 p{
  margin: 3px auto;
}
.sellerinfo2{
  height: 24px;
  line-height: 24px;
  text-align: center;
  width: 185px;
  margin: 2px auto;
  font-size: 12px;
}
</style>


