<template>
    <transition name="move">
        <div class="food-detail" v-show="showFoodDetail" ref="foodDetail">
            <div class="food-content">
                <div class="food-img">
                    <img :src="food.image" alt="食物图片">
                    <div class="back" @click="handleBack">
                      <i class="iconfont icon-fanhui"></i>
                    </div>
                </div>
                <div class="content">
                  <h1 class="title">{{food.name}}</h1>
                  <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                  <transition name="fade">
                    <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
                      加入购物车
                    </div>
                 </transition>
              </div>
              <!-- 分隔组件 -->
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                  <div class="title">商品信息</div>
                  <div class="text">{{food.info}}</div>
                </div>
                <split></split>
                <div class="rating">
                  <div class="title">商品评价</div>
                  <ratingselect :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="food.ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
                  <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                      <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="(rating, index) in food.ratings" :key="index">
                        <div class="user">
                          <span class="username">{{rating.username}}</span>
                          <img :src="rating.avatar" alt="用户头像" width="12" height="12" class="avatar">
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <div class="text">
                          <span class="iconfont" :class="{'icon-dianzan':rating.rateType===1, 'icon-bad':rating.rateType===0}">{{rating.text}}</span>
                        </div>
                      </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                  </div>
                </div>
             </div>
          </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from '@/components/cartcontrol/CartControl';
import split from '@/components/split/Split';
import ratingselect from '@/components/ratingselect/RatingSelect';
import utils from '../../common/js/date';
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'FoodDetail',
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data () {
    return {
      showFoodDetail: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return utils.formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    // 点击商品时，出现商品详情页
    showFood () {
      // 当前页面显示
      this.showFoodDetail = true;
      // 初始化数据
      this.selectType = ALL;
      this.onlyContent = true;
      // 滚动
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    // 点击返回按钮时，返回商品页
    handleBack () {
      this.showFoodDetail = false;
    },
    // 添加商品
    addFirst (event) {
      if (!event._constructed) {
        return;
      }
      // 抛物线动画
      this.$emit('add', event.target);
      Vue.set(this.food, 'count', 1);
    },
    // 选择评论类型
    selectRating (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent (onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 根据评论类型显示评论内容
    needShow (type, text) {
      // 是否选择只有内容的评论，并且这条内容没有文本
      if (this.onlyContent && !text) {
        return false;
      }
      // 判断选择类型
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"

.food-detail
  position: fixed
  top: 0
  left: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .food-content
    .food-img
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-fanhui
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top : 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            top: 16px
            right: 0
            line-height: 12px
            font-size: 0
            .username
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-dianzan, .icon-bad
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-dianzan
              color: rgb(147, 153, 159)
            .icon-bad
              color: rgb(0, 160, 220)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
