<template>
  <div class="container">
    <div class="modifypsd">
      <p class="modify">修改密码</p><br><br>
      <label class="a">&emsp;旧密码：&emsp;</label>
      <input type="password" class="form-control" id="psd1" v-model="oldpsd"><br><br>
      <label class="a">&emsp;新密码：&emsp;</label>
      <input type="password" class="form-control" id="psd2" v-model="newpsd"><br><br>
      <label class="a">确认密码：&emsp;</label>
      <input type="password" class="form-control" id="psd3" v-model="confirmnewpsd"><br><br>
      <button type="button" class="btn btn-default" id="btn" @click="modifyPsd()">保存修改</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      user:"getUser"
    })
  },
  methods:{
    modifyPsd(){
      var psd=this.newpsd;
      var that=this;
      this.$http.post("/api/user/modifypsd",{
        password:psd
      });
      layer.msg("修改密码成功！");
      setTimeout(function(){
        that.$router.push({ path: "/usercenter" });
        window.location.reload();
      },1000)
    }
  }
}
</script>

<style scoped>
  .container{
    width: 878px;
    height: 747px;
  }
  .modifypsd{
    width: 400px;
    margin: 50px auto;
    border-top: 1px solid skyblue;
    position: relative;
  }
  .modify{
    width: 100px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #f1f1f1;
    color: skyblue;
    position: absolute;
    top: -20px;
    left: 150px
  }
  #psd1,#psd2,#psd3{
    display: inline-block;
    width: 200px;
    height: 30px;
  }
  #btn{
    background: #f1f1f1;
    position: relative;
    margin-top: 15px;
    left: 140px;
  }
  #btn:hover{
    background: #e6e6e6;
  }
  .a{
    font-size: 14px;
    font-weight: 400
  }
</style>


