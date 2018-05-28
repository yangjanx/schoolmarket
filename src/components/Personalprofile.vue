<template>
  <div class="container">
      <div class="basicprofile">
          <p class="basic">基本资料</p><br><br>
          <label class="a">昵&emsp;&emsp;称：&emsp;</label><div class="b1">{{usernick}}</div>
          <input type="text" class="form-control" id="c1" v-model="usernick" @blur="change_input('1','')">
          <button class="edit" @click="change_input('1','show')">编 辑</button><br><br>
          <label class="a">&emsp;I&emsp;D&emsp;：&emsp;</label><div class="b8">{{userid}}</div>
          <input type="text" class="form-control" id="c8" v-model="userid"><br><br>
          <label class="a">性&emsp;&emsp;别：&emsp;</label><div class="b9">{{showgender(usergender)}}</div>
          <input type="text" class="form-control" id="c9" v-model="usergender"><br><br>
          <label class="a">真实姓名：&emsp;</label><div class="b2">{{usertruename}}</div>
          <input type="text" class="form-control" id="c2" v-model="usertruename" @blur="change_input('2','')">
          <button class="edit" @click="change_input('2','show')">编 辑</button><br><br>
          <label class="a">年&emsp;&emsp;龄：&emsp;</label><div class="b3">{{userage}}</div>
          <input type="text" class="form-control" id="c3" v-model="userage" @blur="change_input('3','')">
          <button class="edit" @click="change_input('3','show')">编 辑</button><br><br>
          <label class="a">所在学院：&emsp;</label><div class="b4">{{userinstitute}}</div>
          <input type="text" class="form-control" id="c4" v-model="userinstitute" @blur="change_input('4','')">
          <button class="edit" @click="change_input('4','show')">编 辑</button><br><br>
          <label class="a">个性签名：&emsp;</label><div class="b10">{{userselfsign}}</div>
          <input type="text" class="form-control" id="c10" v-model="userselfsign" @blur="change_input('10','')" maxlength="15">
          <button class="edit" @click="change_input('10','show')">编 辑</button>
      </div>
      <div class="contactprofile">
          <p class="contact">联系资料</p><br><br>
          <label class="a">手机：&emsp;</label><div class="b5">{{userphone}}</div>
          <input type="text" class="form-control" id="c5" v-model="userphone" @blur="change_input('5','')">
          <button class="edit" @click="change_input('5','show')">编 辑</button><br><br>
          <label class="a">Q Q ：&emsp;</label><div class="b6">{{userqq}}</div>
          <input type="text" class="form-control" id="c6" v-model="userqq" @blur="change_input('6','')">
          <button class="edit" @click="change_input('6','show')">编 辑</button><br><br>
          <label class="a">微信：&emsp;</label><div class="b7">{{userwechat}}</div>
          <input type="text" class="form-control" id="c7" v-model="userwechat" @blur="change_input('7','')">
          <button class="edit" @click="change_input('7','show')">编 辑</button><br><br>
          <button type="button" class="btn btn-default" id="btn" @click="EditProfile()">保存修改</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      usernick: "",
      usertruename: "",
      userage: "",
      userinstitute: "",
      userphone: "",
      userqq: "",
      userwechat: "",
      userid: "",
      usergender: "",
      userselfsign:''
    };
  },
  created: function() {
    var that = this;
    this.$http
      .post(
        "/api/user/getUserinfo",
        {
          id: that.$store.state.user.id
        },
        {}
      )
      .then(response => {
        if (response.body.code == -1) {
          alert(response.body.msg);
        } else {
            that.usernick = response.body[0].user_nick,
            that.usertruename = response.body[0].true_name,
            that.userage = response.body[0].age,
            that.userinstitute = response.body[0].institute,
            that.userphone = response.body[0].phone,
            that.userqq = response.body[0].qq,
            that.userwechat = response.body[0].wechat,
            that.userid = response.body[0].user_id,
            that.usergender = response.body[0].gender,
            that.userselfsign = response.body[0].selfsign;
        }
      });
  },
  methods: {
    showgender(temp) {
      if (temp == 0) {
        return "男";
      }
      if (temp == 1) {
        return "女";
      }
    },
    change_input(index, mode) {
      if (mode == "show") {
        $(".b" + index).css("display", "none");
        $("#c" + index).css("display", "inline-block");
      } else {
        $(".b" + index).css("display", "inline-block");
        $("#c" + index).css("display", "none");
      }
    },
    EditProfile() {
      function checkid(str) {
        var result = str.match(/^\d{4,9}$/); //学号/工号正则，4或9位数字
        if (result == null) return false;
        return true;
      }
      function checknick(str) {
        var result = str.match(/^[a-zA-Z0-9_\u4E00-\u9FA5]{1,14}$/); //用户名正则，1到12位
        if (result == null) return false;
        return true;
      }
      function checktruename(str) {
        var result = str.match(/^[\u4E00-\u9FA5]{2,4}$/);
        if (result == null) return false;
        return true;
      }
      function checkage(str) {
        var result = str.toString().match(/^[0-9]{1,2}$/);
        if (result == null) return false;
        return true;
      }
      function checkinstitute(str) {
        var result = str.match(/^[\u4E00-\u9FA5]{1,12}$/);
        if (result == null) return false;
        return true;
      }
      function checkphone(str) {
        var result = str.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
        if (result == null) return false;
        return true;
      }
      function checkqq(str) {
        var result = str.match(/^[1-9][0-9]{4,10}$/);
        if (result == null) return false;
        return true;
      }
      function checkwechat(str) {
        var result = str.match(/^[-_a-zA-Z0-9]{6,20}$/);
        if (result == null) return false;
        return true;
      }
      var nick = this.usernick;
      if (!checknick(nick)) {
        layer.msg("修改失败，昵称格式不合法！", function() {});
        return;
      }
      var id = this.$store.state.user.id;
      var truename = this.usertruename;
      if (!checktruename(truename)) {
        layer.msg("修改失败，真实姓名只能包括2-4个中文！");
        return;
      }
      var age = this.userage;
      if (!checkage(age)) {
        layer.msg("修改失败，年龄区间为0-99岁！");
        return;
      }
      var institute = this.userinstitute;
      if (!checkinstitute(institute)) {
        layer.msg("修改失败，请输入1-12个中文的学院名称！");
        return;
      }
      var phone = this.userphone;
      if (!checkphone(phone)) {
        layer.msg("修改失败，请输入格式正确的手机号码！");
        return;
      }
      var qq = this.userqq;
      if (!checkqq(qq)) {
        layer.msg("修改失败，请输入5-11位的QQ号码！");
        return;
      }
      var wechat = this.userwechat;
      if (!checkwechat(wechat)) {
        layer.msg("修改失败，请输入6-20位的微信号！");
        return;
      }
      var selfsign = this.userselfsign;
      var that = this;
      this.$http
        .post(
          "/api/user/editProfile",
          {
            nick: nick,
            truename: truename,
            age: age,
            institute: institute,
            phone: phone,
            qq: qq,
            wechat: wechat,
            id: id,
            selfsign:selfsign
          },
          {}
        )
        .then(response => {
          that.$store.commit("CHANGE_USER", {
            institute: that.userinstitute,
            age: that.userage,
            selfsign:that.userselfsign,
            nick:that.usernick
          });
          layer.msg("修改成功！");
          setTimeout(function() {
            window.location.reload();
          }, 1000);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 700px;
  height: 747px;
}
.basicprofile,
.contactprofile {
  width: 400px;
  margin: 50px auto;
  border-top: 1px solid #00a2e4;
  position: relative;
}
.basic,
.contact {
  width: 100px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  background: #fff;
  color: #00a2e4;
  position: absolute;
  top: -20px;
  left: 150px;
}
#btn {
  background: #f1f1f1;
  position: relative;
  margin-top: 15px;
  left: 140px;
}
#btn:hover {
  background: #e6e6e6;
}
.a {
  font-size: 14px;
  font-weight: 400;
}
.b1,
.b2,
.b3,
.b4,
.b5,
.b6,
.b7,
.b8,
.b9,
.b10 {
  display: inline-block;
  font-size: 15px;
}
#c1,
#c2,
#c3,
#c4,
#c5,
#c6,
#c7,
#c8,
#c9 {
  display: none;
  width: 180px;
  height: 28px;
}
#c10{
  display: none;
  width: 250px;
  height: 28px;
}
.edit {
  border: none;
  font-size: 14px;
  float: right;
}
.edit:hover {
  color: orange;
}
</style>

