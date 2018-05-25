<template>
  <div class="publish">
          <div class="input_div">
              <input type="text" placeholder="请输入商品名称，30字以内" class="input_top input_normal" v-model="goodsname">
          </div>
          <div class="goodsprice">
              <span class="input-group-addon" id="basic-addon1">￥</span>
              <input type="text" placeholder="商品原始价" class="input_middle input_normal" v-model="oldprice">
              <span class="input-group-addon aaa" id="basic-addon1">￥</span>
              <input type="text" placeholder="商品现卖价" class="input_middle input_normal" v-model="price">
          </div>
          <div class="goodstype">
              <span class="input-group-addon" id="basic-addona">请选择商品类别</span>
              <select class="form-control" v-model="goodstype">
                <option value="">请选择商品类别</option>
                <option :value="item.classify_id" v-for="item in options">{{item.classify_name}}</option>                          
              </select>
          </div>
          <div class="input_div">
              <textarea type="text" placeholder="请输入商品介绍，200字以内" class="input_bottom" v-model="recommend"></textarea>
          </div>
          <div class="goodspic">
            <p>商品图片（ 0~3 张）</p>
            <div class="addpic">
              <input type="file" id="upload" @change="addImg" style="display:none;">
              <div class="pic1">
                <img src="static/images/addphoto1.png" id="pic0" @click="chooseImg">
              </div>
              <div class="pic2">
                <img src="static/images/addphoto1.png" id="pic1" @click="chooseImg">
              </div>
              <div class="pic3">
                <img src="static/images/addphoto1.png" id="pic2" @click="chooseImg">
              </div>
            </div>
          </div>
          <button class="publish_button" @click="addGoods">发布商品</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsname: "",
      oldprice: "",
      price: "",
      goodstype: "",
      recommend: "",
      current_click_img: "",
      upload_files: [null,null,null],
      markuploadisselected: [0, 0, 0],
      options:[]
    };
  },
  created() {
    var that=this;
    this.$store.dispatch("changeShow", "publish");
    this.$http.post('api/user/getClassifyOptions',{},{})
    .then(response=>{
that.options=response.body;
    })
  },
  methods: {
    chooseImg(e) {
      this.current_click_img = e.currentTarget.id;
      $("#upload").click();
    },
    addImg(e) {
      var that = this;
      var reader = new FileReader();
      var f = $("#upload")[0].files[0];
      this.upload_files[parseInt(that.current_click_img[3])]=f;
      reader.readAsDataURL(f);
      reader.onload = function() {
        $("#" + that.current_click_img).attr("src", this.result);
        that.markuploadisselected[parseInt(that.current_click_img[3])] = 1;
      };
    },
    addGoods(){
      var goodsname=this.goodsname;
      var oldprice=this.oldprice;
      var price=this.price;
      var goodstype=this.goodstype;
      var recommend=this.recommend;
      var sellerid=this.$store.state.user.id;
      var that=this;
      var param = new FormData();
      for(var i=0;i<this.upload_files.length;i++){
        if(this.upload_files[i])
        param.append('file',this.upload_files[i],this.upload_files[i].name);
      }
      param.append('goodsname',goodsname);
      param.append('oldprice',oldprice);
      param.append('price',price);
      param.append('goodstype',goodstype);
      param.append('recommend',recommend);
      param.append('sellerid',sellerid);
      this.$http.post('/api/user/addGoods',param,{headers:{'Content-Type':'multipart/form-data'}})
      .then(response=>{
        // that.$store.commit('CHANGE_GOODS',{
        //   name:that.goodsname,
        //   sellerid:that.sellerid,
        //   oldprice:that.oldprice,
        //   price:that.price
        // });
        layer.msg('发布商品成功!');
        setTimeout(function() {
          that.$router.push({ path: "/home" });
          window.location.reload();
        }, 1000);
      })
    }
  }
};
</script>

<style scoped>
.publish {
  width: 600px;
  height: 727px;
  margin: 20px auto 10px auto;
}
.input_div {
  width: 600px;
  margin: 0 auto;
}
.input_top {
  font-weight: bold;
  border: 1px solid #c8c8c8;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  margin-bottom: 1px;
}
.input_bottom {
  font-size: 14px;
  border: 1px solid #c8c8c8;
  border-radius: 0 0 4px 4px;
  background-color: #f5f5f5;
  width: 100%;
  padding: 4px 0 4px 15px;
  height: 120px;
  box-sizing: border-box;
  margin-top: 1px;
}
.input_middle {
  border: 1px solid #c8c8c8;
  border-radius: 0;
  border-bottom: none;
  margin-bottom: 1px;
}
.input_normal {
  background-color: #f5f5f5;
  width: 100%;
  padding: 4px 0 4px 15px;
  height: 50px;
  box-sizing: border-box;
}
.publish_button {
  display: block;
  font-size: 18px;
  color: #fff;
  background: #00bc9b;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 300px;
  height: 43px;
  line-height: 43px;
  margin: 30px auto;
  cursor: pointer;
}
.publish_button:hover {
  background: green;
}
.uploadpic {
  width: 600px;
  height: 310px;
  margin: 0 auto;
}

.goodsprice {
  display: flex;
  width: 600px;
  margin: 0 auto;
}
.goodstype {
  display: flex;
  width: 600px;
  margin: 0 auto;
  margin-top: 1px;
}
#basic-addon1 {
  width: 100px;
  line-height: 36px;
  background: #ddd;
  border-radius: 3px;
  border-bottom: none;
}
#basic-addona {
  width: 250px;
  height: 35px;
  background-color: #ddd;
  line-height: 22px;
  margin: 0 auto;
  font-size: 16px;
}
.aaa {
  border-right: none;
}
.form-control {
  height: 35px;
}
.goodspic{
  width: 600px;
  height: 230px;
}
.goodspic p{
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  color: #555;
}
.addpic{
  width: 580px;
  height: 250px;
  margin: 0 auto;
}
.pic1,.pic2,.pic3{
  border: 1px solid #c8c8c8;
  width: 180px;
  height: 180px;
  display: inline-block;
  margin-left:6px;
}
.addpic img{
  cursor: pointer;
  width: 172px;
  height: 172px;
  margin: 3px;
}
</style>


