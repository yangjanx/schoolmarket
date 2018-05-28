<template>
	<div class="login">
		<h4 class="login_title">
      <!-- 选择登录或注册 -->
			 <div class="login_normal_title">
				 <span @click="changeLoginway('login')" :class="{login_active:loginway==='login'}">登录</span>
				 <b>·</b>
				 <span @click="changeLoginway('register')" :class="{login_active:loginway==='register'}">注册</span>
			 </div>
       
       <!-- 登录框 -->
			 <div v-if="loginway==='login'" @keyup.enter="Login">		 
				 	<div class="input_div">
					 	<input type="text" placeholder="学号/工号" class="input_top input_normal" v-model="userid">
					</div>
				 	<div class="input_div">
				 		<input type="password" placeholder="密码" class="input_bottom input_normal" v-model="userpassword" >
				 	</div>
				 	<div class="forget">
				 		<span>忘记密码？</span>
				 	</div>
				 	<button class="login_button" @click="Login">登 录</button>
			 </div>

      <!-- 注册框 -->
			 <div v-if="loginway==='register'" @keyup.enter="addUser">
				 	<div class="input_div">
				 		<input type="text" placeholder="输入学号/工号(4或9位)" class="input_top input_normal" name="userid" v-model="user_id" >
				 	</div>
				 	<div class="input_div">
					 	<input type="text" placeholder="输入昵称(中英文,数字,下划线,1-12位)" class="input_middle input_normal" name="usernick" v-model="user_nick">
					</div>
          <div class="usergender">
            性别：&nbsp;&nbsp;&nbsp;
            <input type="radio" value="0" name="gender" v-model="user_gender">&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" value="1" name="gender" v-model="user_gender">&nbsp;女
					</div>
				 	<div class="input_div">
				 		<input type="password" placeholder="输入密码(字母,数字,下划线，6-16位)" class="input_middle input_normal" name="password" v-model="user_password">
				 	</div>
					<div class="input_div">
				 		<input type="password" placeholder="再次输入密码" class="input_bottom input_normal" name="confirmpsd" v-model="user_confirmpsd">
				 	</div>
          <button class="login_button" @click="addUser">注 册</button>
			 </div>
       
				 	
		</h4>
	</div>
</template>


<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userid:'',
      userpassword:'',
      user_id:'',
      user_nick:'',
      user_gender: "0",
      user_password:'',
      user_confirmpsd:''
    };
  },
  computed: {
    ...mapGetters({
      loginway: "getLoginway"
    })
  },
  methods: {
    changeLoginway(type) {
      this.$store.dispatch("changeLoginway", type);
    },
    Login() {
      var id = this.userid;
      var password = this.userpassword;
      var that = this;
      this.$http
        .post(
          "/api/user/login",
          {
            id: id,
            password: password
          },
          {}
        )
        .then(response => {
          if (response.body.code == -1) {
            layer.msg(response.body.msg,function(){});
          } else {
            that.$store.commit("CHANGE_USER", {
              nick: response.body[0].user_nick,
              id:response.body[0].user_id,
              gender:response.body[0].gender,
              age:response.body[0].age,
              headphoto:response.body[0].headphoto,
              institute:response.body[0].institute,
              selfsign:response.body[0].selfsign      
            });
            layer.msg("登录成功！");
            setTimeout(function() {
              that.$store.commit("CHANGE_LOGIN", "1");
              that.$router.push({ path: "/home" });
              window.location.reload();
            }, 1000);
          }
        });
    },
    addUser() {
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
      function checkpsd(str) {
        var result = str.match(/^[._a-zA-Z0-9]{6,16}$/); //校验密码：只能输入6-16个字母、数字、下划线
        if (result == null) return false;
        return true;
      }
      var id = this.user_id;
      if (!checkid(id)) {
        layer.msg("请输入4或9位的工号/学号！", function() {});
        return;
      }
      var nick = this.user_nick;
      if (!checknick(nick)) {
        layer.msg("昵称格式不合法！", function() {});
        return;
      }
      var gender = this.user_gender;
      var password = this.user_password;
      if (!checkpsd(password)) {
        layer.msg("请输入6-12位的密码(字母、数字、下划线)！", function() {});
        return;
      }
      var confirmpsd = this.user_confirmpsd;
      if (confirmpsd != password) {
        layer.msg("两次输入的密码不一致！", function() {});
        return;
      }
      var that = this;
      this.$http
        .post(
          "/api/user/addUser",
          {
            id: id,
            nick: nick,
            gender: gender,
            password: password
          },
          {}
        )
        .then(response => {
          if (response.body.code == -1) {
            layer.msg(response.body.msg,function(){});
            return;
          }
          that.$store.commit("CHANGE_USER", {
            nick: that.user_nick,
            id:that.user_id,
            gender:that.user_gender
          });
          layer.msg("注册成功！");
          setTimeout(function() {
            that.$store.commit("CHANGE_LOGIN", "1");
            that.$router.push({ path: "/home" });
            window.location.reload();
          }, 1000);
        });
    }
  },
  created() {
    this.$store.dispatch("changeShow", "");
  }
};
</script>


<style scoped>
.login {
  width: 420px;
  margin: 0 auto 50px;
  padding: 20px 30px 30px 30px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  height: 420px;
}
.login_normal_title {
  text-align: center;
  font-weight: 400;
  color: #969696;
  font-size: 18px;
  margin-bottom: 20px;
}
.login_normal_title span {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;
}
.login_normal_title span:hover {
  border-bottom: 2px solid #00bc9b;
}
.login_active {
  color: #00bc9b;
  border-bottom: 2px solid #00bc9b;
}
.input_div {
  width: 300px;
  margin: 0px auto;
}
.usergender {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #c8c8c8;
  border-bottom: none;
  background-color: hsla(0, 0%, 71%, 0.1);
  padding: 0 0 4px 15px;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  color: #777;
  font-size: 14px;
}
.forget {
  width: 300px;
  margin: 20px auto;
  text-align: right;
  font-weight: 400;
  color: #969696;
  font-size: 12px;
}
.input_top {
  border: 1px solid #c8c8c8;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.input_bottom {
  border: 1px solid #c8c8c8;
  border-radius: 0 0 4px 4px;
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
.login_button {
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
  margin-top: 20px
}
.login_button:hover {
  background: green;
}
</style>