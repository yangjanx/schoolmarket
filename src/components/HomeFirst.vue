<template>
  <div class="home_first">
      <div class="home_first_left" :style="{height:home_first_height+'px'}">
          <h1 :style="{height:home_first_height_margin+'px',lineHeight:home_first_height_margin+'px'}">安工大淘淘乐</h1>
          <router-link to="/" tag="img" src="../static/images/kaws.jpg" alt="kaws" class="kaws"></router-link>
      </div>
      <div class="container" :style="{height:home_first_height+'px'}">
          <div class="wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px',top:home_first_height_margin-20+'px'}" @mouseover="stop" @mouseout="play">
              <div class="wrapper-content" :class="{wrapper_trans:isTrans}" :style="{width:originalData.img_width*(originalData.num+2)+'px',height:originalData.img_height+'px',left:-originalData.img_width+'px'}" ref="wrapperContent">
                  <img class="wrapper-content_img" alt="4" :src="'../static/images/home_4.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
                  <img class="wrapper-content_img" alt="1" :src="'../static/images/home_1.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
                  <img class="wrapper-content_img" alt="2" :src="'../static/images/home_2.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
                  <img class="wrapper-content_img" alt="3" :src="'../static/images/home_3.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
                  <img class="wrapper-content_img" alt="4" :src="'../static/images/home_4.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
                  <img class="wrapper-content_img" alt="1" :src="'../static/images/home_1.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
              </div>
              <div class="wrapper-buttons" :style="{left:(originalData.img_width-100)/2+'px'}">
              <span :class="['wrapper-button',{'wrapper_on':index==1}]"  @click="turnTo(1)"></span>
              <span :class="['wrapper-button',{'wrapper_on':index==2}]"  @click="turnTo(2)"></span>
              <span :class="['wrapper-button',{'wrapper_on':index==3}]"  @click="turnTo(3)"></span>
              <span :class="['wrapper-button',{'wrapper_on':index==4}]"  @click="turnTo(4)"></span>
              </div>
              <a href="javascript:;" class="wrapper-arrow wrapper-prev" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="prev"></a>
              <a href="javascript:;" class="wrapper-arrow wrapper-next" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="next"></a>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      originalData: {
        img_width: 350,
        img_height: 350,
        btn_width: 40,
        btn_height: 40,
        num: 4,
        delay: 300
      },
      isTrans: true, //因为到最后一张图片，index为1时，需要立即跳到第二张index也为1的图片，这个用来是否给出transition
      index: 1,
      timer: null, //setInterval
      clickdelay: false //用来防止连续点击
    };
  },
  computed: {
    ...mapGetters({
      hw: "getHW"
    }),
    home_first_width: function() {
      return parseInt(this.hw.w) - 400;
    },
    home_first_height: function() {
      var a = parseInt(this.hw.h) - 200;
      return a < 389 ? 389 : a;
    },
    home_first_height_margin: function() {
      return parseInt(this.home_first_height - 300) / 2;
    }
  },
  methods: {
    next() {
      if (this.clickdelay) {
        return;
      }
      this.clickdelay = true;
      if (this.index == this.originalData.num) {
        this.index = 1;
      } else {
        this.index += 1;
      }
      this.animate(this.originalData.img_width);
    },
    prev() {
      if (this.clickdelay) {
        return;
      }
      this.clickdelay = true;
      if (this.index == 1) {
        this.index = this.originalData.num;
      } else {
        this.index -= 1;
      }
      this.animate(-this.originalData.img_width);
    },
    animate(offset) {
      var node = this.$refs.wrapperContent;
      var self = this;
      var left = parseInt(node.style.left) - offset;
      this.isTrans = true;
      node.style.left = left + "px";
      setTimeout(function() {
        if (left < -(self.originalData.num * self.originalData.img_width)) {
          self.isTrans = false;
          node.style.left = -self.originalData.img_width + "px";
          self.clickdelay = false; //当到达最后一张图片时
        }
        if (left > -100) {
          self.isTrans = false;
          node.style.left =
            -self.originalData.num * self.originalData.img_width + "px";
          self.clickdelay = false; //当到达第一张图片时
        }
      }, this.originalData.delay);
    },
    play() {
      var self = this;
      this.timer = setInterval(function() {
        self.next();
      }, 2000);
    },
    stop() {
      this.clickdelay = false; //用来防止连续点击
      clearInterval(this.timer);
      this.timer = null;
    },
    turnTo(flag) {
      if (flag == this.index) {
        return;
      } else {
        var offset = (flag - this.index) * this.originalData.img_width;
        this.index = flag;
        this.animate(offset);
      }
    }
  },

  mounted() {
    /*下面是判断过渡动画是否完成*/

    var node = this.$refs.wrapperContent;
    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };
    var self = this;

    for (var t in transitions) {
      if (node.style[t] !== undefined) {
        var transitionEvent = transitions[t];
      }
    }
    transitionEvent &&
      node.addEventListener(transitionEvent, function() {
        self.clickdelay = false;
      });
    this.play();
  },
  created() {
    this.$store.dispatch("changeShow", "home");
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.home_first {
  overflow: hidden;
  margin-right: 400px;
}
.home_first:after {
  display: block;
  content: "";
  width: 0;
  height: 0;
  clear: both;
}
.home_first_left {
  float: left;
  width: 400px;
  text-align: center;
  background: #00bc9b;
}
.home_first_left h1 {
  text-align: center;
  font-family: TrashHand;
  font-size: 32px;
  color: darkslateblue;
}
.kaws {
  border: none;
  height: 300px;
  height: 300px;
}
.container {
  margin-left: 400px;
}

.wrapper {
  position: relative;
  overflow: hidden;
  margin: auto;
}
.wrapper-content {
  position: absolute;
  left: 0;
  z-index: 1;
}
.wrapper-content_img {
  border: none;
  outline: none;
  float: left;
}
.wrapper-buttons {
  position: absolute;
  width: 100px;
  height: 20px;
  text-align: center;
  bottom: 3px;
  z-index: 2;
}
.wrapper-button {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: lightblue;
  margin: 0 2.5px;
  cursor: pointer;
}
.wrapper-arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: none;
  top: 50%;
  z-index: 2;
}
.wrapper:hover .wrapper-arrow {
  display: block;
  opacity: 1;
}
.wrapper-prev {
  left: 10px;
}
.wrapper-next {
  right: 10px;
}
.wrapper_on {
  background-color: #00bc9b;
}
.wrapper_trans {
  transition: left 0.3s ease;
}
</style>