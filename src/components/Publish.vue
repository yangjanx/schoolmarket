<template>
  <div class="publish">
      <form>
          <div class="input_div">
              <input type="text" placeholder="商品名称" class="input_top input_normal">
          </div>
          <div class="input_div">
              <input type="text" placeholder="商品原始价" class="input_middle input_normal">
          </div>
          <div class="input_div">
              <input type="text" placeholder="商品现卖价" class="input_middle input_normal">
          </div>
          <div class="input_div">
              <select class="input_middle input_normal">
                  <option value="select">请选择商品类别</option>
                  <option value="book">书籍</option>
                  <option value="phone">手机</option>
              </select>
          </div>
          <div class="input_div">
              <textarea type="text" placeholder="商品介绍" class="input_bottom"></textarea>
          </div>
          <div class="uploadpic">
            <div class="up">
              <span>商品图片</span>
              <button class="upbtn" @click="change_input()">上传图片</button>
              <input type="file">
            </div>
            <div class="down">
              <div class="pic1"></div>
              <div class="pic2"></div>
              <div class="pic3"></div>
              <div class="pic4"></div>
            </div>
          </div>
          <div class="input_div">
              <input type="submit" value="发布商品" class="publish_button">
          </div>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("changeShow", "publish");
  },
  methods:{
    change_input(){
    }
  }
};
</script>

<style scoped>
.publish {
  width: 600px;
  height: 557px;
  margin: 100px auto;
}
.input_div {
  width: 400px;
  margin: 0 auto;
}
.input_top {
  border: 1px solid #c8c8c8;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.input_bottom {
  border: 1px solid #c8c8c8;
  border-radius: 0 0 4px 4px;
  background-color: hsla(0, 0%, 71%, 0.1);
  width: 100%;
  padding: 4px 0 4px 15px;
  height: 120px;
  box-sizing: border-box;
}
.input_middle {
  border: 1px solid #c8c8c8;
  border-radius: 0;
  border-bottom: none;
}
.input_normal {
  background-color: hsla(0, 0%, 71%, 0.1);
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
  width: 400px;
  height: 150px;
  margin: 0 auto;
}
.up {
  height: 40px;
}
.down {
  height: 90px;
  margin-top: 10px;
}
span {
  font-weight: 200;
  line-height: 40px;
  margin-left: 15px;
}
.upbtn {
  margin-left: 170px;
  border-radius: 5px;
  width: 120px;
  height: 35px;
  color: #fff;
  background: #00bc9b;
  border: none;
}
.pic1{
  width: 90px;
  height: 90px;
  display: inline-block;
  margin-left: 12px;
  border: 1px solid #c8c8c8;
}
.pic2{
  width: 90px;
  height: 90px;
  display: inline-block;
  border: 1px solid #c8c8c8;
}
.pic3{
  width: 90px;
  height: 90px;
  display: inline-block;
  border: 1px solid #c8c8c8;
}
.pic4{
  width: 90px;
  height: 90px;
  display: inline-block;
  border: 1px solid #c8c8c8;
}
</style>


