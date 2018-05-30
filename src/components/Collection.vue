<template>
    <div class="collection">
        <table v-if="user.collectnum" ref="table">
          <tbody>
            <tr v-for="(good,index) in goods">
            <td class="td_item">
					<div>
						<img :src="['static/public/uploads/'+good.goods_picture]"/><p><router-link :to="'/shopitem?goods_id='+good.goods_id">{{good.goods_name}}</router-link></p>
					</div>
				</td>
          <td class="td_info">
					<p>价格：{{good.goods_price}}<br>发布者：{{good.user_nick}}</p>
				</td>
                <td class="td_op">
					<span @click="cancleClec(good.goods_id)">取消收藏</span>
				</td>
            </tr>
        </tbody>
        </table>
        <div v-if="!user.collectnum">
		<p class="empty">你还没有收藏任何商品哦</p>
	    </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
    return {
      goods: []
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  created() {
    var that = this;
    this.$http
      .post(
        "api/user/getCollectinfo",
        {
          id: that.user.id
        },
        {}
      )
      .then(response => {
        that.goods = response.body;
      });
  },
  methods:{
      cancleClec(goodsid){
          var that=this;
		  this.$http.post('api/user/removefromCollect',{
			  goodsid:goodsid,
			  userid:that.user.id
		  })
		  .then(response=>{
			that.$store.commit("CHANGE_USER", {
            collectnum: that.$store.state.user.collectnum - 1
		  });
		  layer.msg("取消收藏成功！");
		  setTimeout(() => {
            window.location.reload();
          }, 500);
		})
      }
  }
}
</script>

<style scoped>
.collection {
  height: 730px;
  width: 698px;
  overflow: hidden;
}
table {
  margin: 0 auto;
  padding-bottom: 60px;
  position: relative;
}
tbody {
  width: 690px;
  display: block;
  margin-left: 30px;
}
tbody tr {
  display: block;
  margin: 20px 0;
}
tbody tr:first-child {
  border: none;
}
tbody td {
  height: 100px;
  display: inline-block;
}
.td_item {
  width: 300px;
  overflow: hidden;
}
.td_item img {
  width: 80px;
  height: 80px;
}
.td_item p {
  display: inline-block;
  width: 186px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 36px;
  color: #3c3c3c;
  vertical-align: top;
  margin-left: 5px;
  cursor: pointer;
}
.td_item a:hover {
  color: #00bc9b;
  text-decoration: underline;
}
.td_info {
  width: 170px;
}
.td_info p {
  color: #9c9c9c;
  font-size: 12px;
}
.td_op {
  width: 120px;
}
.td_op h3 {
  cursor: pointer;
  font-size: 12px;
  color: #00bc9b;
  margin-top: 10px;
  margin-bottom: 15px;
}
.td_op h3:hover {
  color: green;
  text-decoration: underline;
}
.td_op span {
  cursor: pointer;
  font-size: 12px;
  color: #00bc9b;
}
.td_op span:hover {
  color: green;
  text-decoration: underline;
}
.empty {
  width: 300px;
  height: 200px;
  font-size: 22px;
  text-align: center;
  border: 1px dashed #00bc9b;
  margin: 50px auto;
  padding-top: 80px;
  color: #00bc9b;
}
</style>
