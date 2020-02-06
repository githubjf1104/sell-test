<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="iconfont icon-jiajian"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click.stop.prevent="addCart">
            <span class="iconfont icon-jiajian1"></span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    // 添加商品
    addCart (event) {
    //   console.log('click');
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    // 减少商品
    decreaseCart (event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.cartcontrol
  font-size: 0
  .cart-decrease, .cart-add
    display: inline-block
    color: rgb(0, 160, 220)
    padding: 6px
    font-size: 24px
    line-height: 24px
    opacity: 1
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 9px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .cart-add
    display: inline-block
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
</style>
