<template>
<div class="body">
    <div class="usercenter">
        <div class="user_left">
            <div class="userinfo">
                <div class="portrait"><img :src="portrait" width="80" height="80" title="点击修改头像" @click="changeHead()"></div>
                <div class="user-info">
                    <div class="nick" v-text="user.nick"></div>
                    <div class="uid" v-text="'ID:'+user.id"></div>
                    <div class="collectionwrap">
                        <div class="collection"><router-link to="/collection">我的收藏（ {{collectionNumber}} ）</router-link></div>
                    </div>
                </div>
                <div class="selfintro">
                    <span>{{showgender(user.gender)}}</span>
                    <span>|</span>
                    <span>{{user.age}}岁</span>
                    <span>|</span>
                    <span>{{user.institute}}学院</span>
                </div>
            </div>
            <div class="usermenu">
                <ul class="menu-ul">
                    <router-link class="menu-link" to="/orderhistory" tag="li">Order History</router-link>
                    <router-link class="menu-link" to="/mycomment" tag="li">My Reviews</router-link>
                    <router-link class="menu-link" to="/personalprofile" tag="li">Personal Profile</router-link>
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
import { mapGetters } from "vuex"
export default {
    data(){
        return{
            portrait:'../static/images/touxiang.jpg',
            followNumber:12,
            collectionNumber:7,
        }
    },
    computed:{
        ...mapGetters({
            user:"getUser"
        }),
    },
    created() {
        this.$store.dispatch("changeShow", "usercenter");
    },
    methods:{
        showgender(temp){
            if(temp==0){
                return "男"
            }else{
                return "女"
            }
        },
        changeHead(){

        }
    }
}
</script>

<style scoped>
    .body{
        background: #f1f1f1
    }
    .userinfo,.usermenu,.user_right{
        background: #fff
    }
    .usercenter{
        width: 1150px;
        margin:0 auto;
        display: flex;
    }
    .usercenter:after{
        width: 0;
        height: 0;
        display: block;
        clear: both;
        content: ""
    }
    .user_left{
        width: 280px;
    }
    .userinfo{
        height: 180px;
        text-align: left;
        margin-top: 10px;
        border-radius: 10px
    }
    .portrait,.user-info,.collection,.nick{
        display: inline-block
    }
    .portrait{
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 40px;
        background-color: #ccc;
        margin: 30px 15px 0 15px;
        cursor: pointer;
    }
    .user-info{
        height: 80px;
        width: 140px;
        margin: 30px 0 0 0;
        vertical-align: top;
    }
    .nick{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 110px;
        vertical-align: middle;
        color: #565050;
        font-weight: bold;
        text-decoration: none;
        font-size: 18px
    }
    .uid,.collectionwrap{
        margin-top: 5px;
    }
    .uid{
        font-weight: 400
    }
    .collectionwrap{
        white-space: nowrap;
        margin-top: 8px;
    }
    .collection a{
        color: orangered;
        font-weight: 500;
    }
    .collection a:hover{
        color: orange;
    }
    .usermenu{
        height: 542px;
        margin-top: 15px;
        margin-bottom: 10px;
        text-align: center;
        color: #887e7e;
        font-weight: 550;
        font-size: 18px;
        border-radius: 10px
    }
    .usermenu-ul{
        margin:0;
        padding:0;
    }
    .router-link-active{
        font-weight: bold;
        color: #353535;
        background: #8decdc;
    }
    .menu-link{
        list-style-type: none;
        height: 80px;
        cursor: pointer;
        line-height: 80px;
        padding: 0;
        transition: all .4s;
        border-radius: 10px;
        font-family: 'Segoe Script'
    }
    .menu-link:hover{
        background-color: #8decdc
    }
    .selfintro{
        height: 45px;
        line-height: 45px;
        width: 240px;
        margin: 5px auto;
        text-align: center;
    }
    .user_right{
        width: 878px;
        height: 737px;
        border-top: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        margin-left: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
    }
</style>
