<template>
  <div class="shop">
      <div class="topwrap">
          <div class="classify">
            <li class="classifynav" v-for="item in items" @click="changeClassify(item.classify_id)">{{item.classify_name}}</li>
          </div>
          <div class="searchwrap" @keyup.enter="Searchresult">
            <input type="text" class="form-control" placeholder="请输入商品名称" v-model="searchtext">
            <button class="searchbtn" @click="Searchresult">搜 索</button>
          </div>
      </div>
      <div class="goodswrap">
            <transition>
                <router-view></router-view>
            </transition>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                items:[],
                searchtext:''
            }
        },
        created(){
            var that=this;
            this.$store.dispatch('changeShow','shop');   //导航栏切换
            this.$http.post('api/user/getClassifyOptions',{},{})
            .then(response=>{
                that.items=response.body;
            });
        },
        methods:{
            changeClassify(classifyid){
                this.$router.replace('/shoplist?classifyid='+classifyid);
            },
            Searchresult(){
                this.$router.replace('/shoplist?searchtext='+this.searchtext)
            }
        }
    }
</script>

<style scoped>
    .shop{
        width: 1000px;
        margin:0 auto;
    }
    .shop:after{
        width: 0;
        height: 0;
        display: block;
        clear: both;
        content: ""
    }
    .topwrap{
        height: 65px;
        margin-top: 10px;
        border-radius: 5px;
        background: #3d444c;
    }
    .classify{
        width: 641px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin-top: 15px;
        margin-left: 15px;
        font-size: 13px;
        border-right: 1px solid #000;
        display: inline-block;
    }
    .classifynav{
        width: 64px;
        height: 35px;
        float: left;
        border: 1px solid #000;
        border-right: none;
        border-radius: 2px;
        background: #3d444c;
        color: #fff;
    }
    .classifynav:hover{
        background: #00bc9b;
    }
    .searchwrap{
        width: 340px;
        height: 35px;
        position: relative;
        margin-left: 675px;
        margin-top: -40px;
    }
    .form-control{
        width: 250px;
        display: inline-block;
    }
    .searchbtn{
        width: 60px;
        height: 35px;
        font-size: 15px;
        border: none;
        background: #109e10;
        color: #fff;
        border-radius: 5px;
        margin-left: -3px;
    }
    .searchbtn:hover{
        background: green;
    }
</style>