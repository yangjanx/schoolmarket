<template>
  <div class="home">
    <aside class="home_aside" :style="{height:home_aside_height_margin+'px'}">
        <h1 :style="{height:home_aside_height_margin+'px',lineHeight:home_aside_height_margin+'px'}">Welcome</h1>
        <ul class="home_aside_ul">
            <li>
                <router-link :to="'/home/'"></router-link>
            </li>
        </ul>
    </aside>
	<transition name="introduction">
		<router-view></router-view>
	</transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      hw: "getHW"
    }),
    home_aside_height: function() {
      var a = parseInt(this.hw.h) - 200;
      return a < 389 ? 389 : a;
    },
    home_aside_height_margin: function() {
      return parseInt(this.home_aside_height - 300) / 2;
    }
  }
};
</script>


<style scoped>
.home {
  min-width: 1150px;
  width: 100%;
}
.home_aside {
  width: 400px;
  float: right;
  margin: 0;
  background: #00bc9b;
}
.home:after {
  display: block;
  content: "";
  clear: both;
  width: 0;
  height: 0;
}
.home_aside h1 {
  text-align: center;
  font-family: TrashHand;
  font-size: 32px;
  color: darkslateblue;
}
.home_aside_ul {
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin-left: 50px;
}
.home_aside_ul li {
  float: left;
  width: 148px;
  height: 148px;
}
.home_aside_ul_img {
  border: none;
  width: 148px;
  height: 148px;
  cursor: pointer;
  transition: all 0.5s ease;
  -moz-transition: all 0.5s ease; /* Firefox 4 */
  -webkit-transition: all 0.5s ease; /* Safari 和 Chrome */
  -o-transition: all 0.5s ease; /* Opera */
}
.home_aside_ul li:first-child {
  padding: 0 2px 2px 0;
}
.home_aside_ul li:nth-child(2) {
  padding: 0 0px 2px 2px;
}
.home_aside_ul li:nth-child(3) {
  padding: 2px 2px 0 0;
}
.home_aside_ul li:nth-child(4) {
  padding: 2px 0 0 2px;
}
.home_aside_ul_img:hover {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg); /* IE 9 */
  -webkit-transform: rotate(360deg); /* Safari and Chrome */
  -o-transform: rotate(360deg); /* Opera */
  -moz-transform: rotate(360deg);
}
</style>