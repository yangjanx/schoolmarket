<template>
<div class="body">
    <div class="usercenter">
        <div class="user_left">
            <div class="userinfo">
                <input type="file" id="upload" @change="addImg" style="display:none;">
                <div class="portrait">
                    <img :src="[user.headphoto?('static/public/uploads/'+user.headphoto):('static/images/touxiang.jpg')]" width="90" height="90" title="点击修改头像" id="head" @click="changeHead">
                </div>
                <div class="user-info">
                    <div class="nick" v-text="user.nick"></div>
                    <div class="uid" v-text="'ID：'+user.id"></div>
                    <div class="collectionwrap">
                        <div class="collection">已收藏的宝贝[ {{user.collectnum}} ]</router-link></div>
                    </div>
                </div>
                <div class="selfintro">
                    <span>{{showgender(user.gender)}}</span>
                    <span>|</span>
                    <span>{{user.age}}岁</span>
                    <span>|</span>
                    <span>{{user.institute}}学院</span>
                </div>
                <div class="selfword">{{user.selfsign}}</div>
            </div>
            <div class="usermenu">
                <ul class="menu-ul">
                    <router-link class="menu-link" to="/personalprofile" tag="li">Personal Profile</router-link>
                    <router-link class="menu-link" to="/collection" tag="li">My Collection</router-link>
                    <router-link class="menu-link" to="/mypublication" tag="li">My Publication</router-link>
                    <router-link class="menu-link" to="/modifypsd" tag="li">Modify Password</router-link>
                </ul>
            </div>
        </div>
        <div class="user_right">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  created() {
    this.$store.dispatch("changeShow", "usercenter");
  },
  methods: {
    showgender(temp) {
      if (temp == 0) {
        return "男";
      } else {
        return "女";
      }
    },
    changeHead() {
      $("#upload").click();
    },
    addImg(e) {
      var that = this;
      var reader = new FileReader();
      var f = $("#upload")[0].files[0];
      var param = new FormData();
      param.append('file',f,f.name);
      param.append('id',this.user.id);
      param.append('oldheadphoto',this.user.headphoto)
      this.$http.post('/api/user/uploadheadphoto',param,{headers:{'Content-Type':'multipart/form-data'}})
      .then(response=>{
          that.$store.commit('CHANGE_USER',{
              headphoto:response.body.headphoto
          })
          layer.msg("修改头像成功！");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
    }
  }
};
</script>

<style scoped>
.body {
  background: #f1f1f1;
}
.userinfo,
.usermenu,
.user_right {
  background: #fff;
}
.usercenter {
  width: 1015px;
  margin: 0 auto;
  display: flex;
}
.usercenter:after {
  width: 0;
  height: 0;
  display: block;
  clear: both;
  content: "";
}
.user_left {
  width: 300px;
}
.userinfo {
  height: 222px;
  text-align: left;
  margin-top: 10px;
  border-radius: 10px;
}
.portrait,
.user-info,
.collection,
.nick {
  display: inline-block;
}
.portrait {
  width: 90px;
  height: 90px;
  overflow: hidden;
  border-radius: 45px;
  background-color: #ccc;
  margin: 30px 0 0 20px;
  cursor: pointer;
}
.user-info {
  height: 90px;
  width: 140px;
  margin: 32px 0 0 20px;
  vertical-align: top;
}
.nick {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
  vertical-align: middle;
  color: #565050;
  font-weight: bold;
  text-decoration: none;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
}
.uid {
  font-weight: 400;
  height: 30px;
  line-height: 30px;
}
.collectionwrap {
  white-space: nowrap;
  height: 30px;
  line-height: 30px;
}
.collection{
  color: #00bc9b;
  font-weight: 500;
}
.usermenu {
  height: 500px;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
  color: #887e7e;
  font-weight: 550;
  font-size: 18px;
  border-radius: 10px;
}
.usermenu-ul {
  margin: 0;
  padding: 0;
}
.router-link-active {
  font-weight: bold;
  color: #353535;
  background: #8decdc;
}
.menu-link {
  list-style-type: none;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  padding: 0;
  transition: all 0.4s;
  border-radius: 10px;
  font-family: "Segoe Script";
}
.menu-link:hover {
  background-color: #8decdc;
}
.selfintro {
  height: 40px;
  line-height: 40px;
  width: 250px;
  margin: 5px auto;
  text-align: center;
}
.selfword{
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #777;
  text-align: center;
  width: 250px;
  margin: 0 auto;
}
.user_right {
  width: 700px;
  height: 737px;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>
