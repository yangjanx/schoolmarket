<template>
  <div class="shop">
      <div class="classify">
          <ul>
              <li v-for="classi in classis">{{classi.title}}</li>
          </ul>
      </div>
      <div class="goodswrap">
        <div class="searchwrap">
          <div class="search">
              <div class="row">
                  <div class="input-group">
                    <input type="text" placeholder="请输入“二货”名称" class="form-control">
                    <button class="searchbtn" type="button">搜 索</button>
                  </div>
              </div>
              
          </div>
        </div>
        <div class="goodslist">
            <transition>
                <router-view></router-view>
            </transition>
        </div>
      </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        data(){
            return{}
        },
        created(){
            this.$store.dispatch('changeShow','shop')   //导航栏切换
        },
        computed:{
            ...mapGetters({
                classis:'getClassis'
            })
        }
    }
</script>

<style scoped>
    .shop{
        width: 1150px;
        margin:0 auto;
        display: flex;
    }
    .shop:after{
        width: 0;
        height: 0;
        display: block;
        clear: both;
        content: ""
    }
    .classify{
        width: 150px;
        background-color: #3d444c;
    }
    .classify ul li{
        border-bottom: 1px solid black;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .classify ul li{
        color: #fff;
        cursor: pointer;
    }
    .classify ul li:hover{
        color:#00bc9b;
        background: #2a2e33;
    }
    .goodswrap{
        width: 1000px;
    }
    .searchwrap{
        height: 85px;
        position: relative;
        background-color: #666;
    }
    .search{
        width: 538px;
        height: 36px;
        margin: 0 auto;
        padding-top: 25px;
    }
    .search input{
        position: relative;
        width: 444px;
        padding-left: 10px;
        border: 2px solid #3d444c;
        color: #666;
        font: 14px/32px "微软雅黑";
    }
    .searchbtn{
        float: right;
        width: 80px;
        height: 34px;
        background-color: #3d444c;
        color: #fff;
        font: 16px/36px "微软雅黑";
        cursor: pointer;
        border: none;
        padding: 0;
        margin-left: 2px;
        outline-style: none;
        border-radius: 5px;
    }
    .searchbtn:hover{
        color: #00bc9b;
        background: #2a2e33;
    }
    .markDelete{
        position: absolute;
        top: 32px;
        left: 670px;
        color: #666;
        cursor: pointer;
    }
</style>

