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
				<span class="sellerqq">
          <img src="static/images/qqicon.jpg" style="width:30px;height:30px;"> <em>{{good.qq}}</em>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="static/images/phoneicon.png" style="width:30px;height:23px;"> <em>{{good.phone}}</em>
        </span>
			</div>
      <div class="addToCart">
				<span class="addToCart_btn" @click="addToCart">
          <button>加入购物车</button>
        </span>
        <i class="addtoClec" @click="addToCollection">添加至收藏夹</i>
			</div>
    </div>
    <div class="comment">
      <em>评论 / 留言</em>
      <textarea class="form-control write" v-model="commentcontent" placeholder="请输入评论或留言..." @keyup.enter="addComment"></textarea>
      <button class="form-control fabiao" @click="addComment">发布评论</button>
      <strong>全部评论</strong>
      <div class="commented" v-for="comment in comments">
        <div class="portrait">
          <img :src="[comment.headphoto?('static/public/uploads/'+comment.headphoto):('static/images/touxiang.jpg')]">
        </div>
        <div class="commentarea">
          <p class="commentuser">
            <span class="commentusername">{{comment.user_nick}}</span>
            <span class="commenttime">{{comment.comment_addtime}}</span>
          </p>
          <div class="commentcontent">{{comment.comment_content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      good: [],
      comments:[],
      commentcontent:''
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
    this.$http.post('api/user/getComment',{
      goodsid:this.$route.query.goods_id
    },{})
    .then(reponse=>{
      that.comments=reponse.body;
    })
  },
  methods: {
    addToCart() {
      var that = this;
      this.$http
        .post(
          "api/user/addToCart",
          {
            goodsid: that.good.goods_id,
            userid: that.$store.state.user.id
          },
          {}
        )
        .then(response => {
          if (response.body.code == -1) {
            layer.msg(response.body.msg, function() {});
            return;
          }
          that.$store.commit("CHANGE_USER", {
            cartnum: that.$store.state.user.cartnum + 1
          });
          layer.msg("加入购物车成功！");
          setTimeout(() => {
            this.$router.push("/cart");
          }, 1000);
        });
    },
    addToCollection(){
      var that=this;
      this.$http.post('api/user/addToCollection',{
        goodsid: that.good.goods_id,
        userid: that.$store.state.user.id
      },{})
      .then(response => {
          if (response.body.code == -1) {
            layer.msg(response.body.msg, function() {});
            return;
          }
          that.$store.commit("CHANGE_USER", {
            collectnum: that.$store.state.user.collectnum + 1
          });
          layer.msg("添加至收藏夹成功！");
        });
    },
    addComment(){
      var that=this;
      if(this.$store.state.isLogin==0){
        layer.msg('登录后才能评论！',function(){})
      }else{
      this.$http.post('api/user/addComment',{
        userid:that.$store.state.user.id,
        goodsid:that.good.goods_id,
        content:that.commentcontent
      },{})
      .then(response=>{
        layer.msg('评论成功！');
        setTimeout(()=>{
          window.location.reload();
        },1000)
      })
      }
    }
  }
};
</script>

<style scoped>
.goodsitem {
  width: 1000px;
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
  margin-left: 170px;
}
.addToCart_btn button {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  font-size: 20px;
  background: #00bc9b;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}
.addToCart_btn button:hover {
  background: green;
}
em {
  font-weight: bold;
  font-size: 18px;
}
.item_right img {
  margin-bottom: 5px;
}
.addtoClec{
  margin-left: 118px;
  font-size: 14px;
  font-style: italic;
  color: orange;
  text-decoration: underline;
  cursor: pointer;
}
.addtoClec:hover{
  color: orangered
}
.comment{
  width: 650px;
  margin-top: 480px;
  margin-left: 175px;
}
.write{
  margin-top: 10px;
  height: 75px;
}
.fabiao{
  border-radius: 20px;
  width:85px;
  height: 30px;
  display: inline-block;
  margin-top: 20px;
  margin-left: 565px;
  background: #379be9;
  color: #fff;
}
.fabiao:hover{
  background: #0a78ce
}
.commented{
  border-top: 1px solid #f0f0f0;
  margin-top: 10px;
  display: flex;
}
.portrait{
  display: block;
  position: relative;
  left: 0;
  top: 15px;
  width: 50px;
  height: 50px;
  font-size: 0;
  border-radius: 50%;
  overflow: hidden;
}
.portrait img{
  width: 100%;
  height: 100%;
}
.commentarea{
  width: 579px;
  margin-top: 15px;
  margin-left: 20px;
  margin-bottom: 15px;
}
.commentuser{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
.commentusername{
  font-weight: bold;
  color: #379be9;
}
.commenttime{
  color: #999;
  display: inline-block;
  margin-left: 12px;
}
.commentcontent{
  margin-top: 2px;
  font-size: 14px;
  color: #4b4b4b;
  line-height: 24px;
  word-wrap: break-word;
}
</style>


