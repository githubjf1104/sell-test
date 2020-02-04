<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab boder-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
    </div>
     <router-view/>
  </div>
</template>

<script>
import header from '@/components/header/Header.vue'

const ERR_OK = 0

export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.getSeller()
  },
  methods: {
    getSeller () {
      this.$axios.get('/api/seller').then(res => {
        // console.log(res.data)
        if (res.data.errno === ERR_OK) {
          // console.log(res.data.data)
          this.seller = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "./common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
         flex: 1
         text-align: center
         & > a
            display: block
            font-size: 14px
            font-weight: 200
            color: rgb(77, 85, 93)
            &.active
              color: rgb(240, 20, 20)
</style>
