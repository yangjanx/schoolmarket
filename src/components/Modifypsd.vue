<template>
  <div class="container">
    <div class="modifypsd">
      <p class="modify">修改密码</p><br><br>
      <label class="a">&emsp;原密码：&emsp;</label>
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
  data(){
    return{
      oldpsd:'',
      newpsd:'',
      confirmnewpsd:''
    }
  },
  methods:{
    modifyPsd(){
      function checkpsd(str) {
        var result = str.match(/^[._a-zA-Z0-9]{6,16}$/); //校验密码：只能输入6-16个字母、数字、下划线、.
        if (result == null) return false;
        return true;
      }
      var oldpassword=this.oldpsd;
      var newpassword=this.newpsd;
      if (!checkpsd(newpassword)) {
        layer.msg("请输入6-12位的新密码(字母、数字、下划线、.)！", function() {});
        return;
      }
      var cfmpsd=this.confirmnewpsd;
      if (cfmpsd != newpassword) {
        layer.msg("两次输入的密码不一致！", function() {});
        return;
      }
      var id = this.$store.state.user.id;
      var that=this;
      this.$http.post("/api/user/modifyPsd",{
        id:id,
        oldpsd:oldpassword,
        newpsd:newpassword
      },{})
      .then(response=>{
        if(response.body.code==-1){
          layer.msg(response.body.msg,function(){});
          return;
        }
        else{
          layer.msg(response.body.msg);
          setTimeout(function(){
            that.$store.commit("CHANGE_LOGIN", "0");
            that.$router.push({ path: "/login" });
            window.location.reload();
          },1000)
        }
      })
    }
  }
}
</script>

<style scoped>
  .container{
    width: 700px;
    height: 747px;
  }
  .modifypsd{
    width: 400px;
    margin: 50px auto;
    border-top: 1px solid #00a2e4;
    position: relative;
  }
  .modify{
    width: 100px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #fff;
    color: #00a2e4;
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


