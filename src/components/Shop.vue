<template>
  <div class="shop">
      <div class="classify"></div>
      <div class="goodswrap">
        <div class="searchwrap">
          <div class="search">
              <input type="text" id="txt" value="请输入“二货”名称">
              <button class="searchbtn">搜 索</button>
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
        computed:mapGetters({
            goods:'getGoods'
        })
    }
</script>

<style scoped>
    .shop{
        width: 1150px;
        margin:0 auto;
        display: flex;
        /* border: 1px solid red */
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
        height: 900px;
        background-color: #3d444c;
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
    .search button{
        float: right;
        width: 80px;
        height: 36px;
        background-color: #3d444c;
        color: #fff;
        font: 16px/36px "微软雅黑";
        cursor: pointer;
        border: none;
        padding: 0;
        margin: 0;
        outline-style: none;
    }
</style>

