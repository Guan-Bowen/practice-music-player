<template>
  <swiper :options="swiperOption" class="banner-container">
    <swiper-slide v-for="banner in banners" :key="banner.bannerId" class="banner-item">
      <a :href="banner.url">
        <img :src="banner.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  name: 'RecommendBanner',
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: { // 延时, 滑动到最后不停止，用户操作后不停止
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        // 异步加载，数据改变后刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  directives: {
    swiper: directive
  }
}
</script>

<style scoped lang="scss">
  .banner-container{
    .banner-item{
      img{
        width: 100%;
        height: 300px;
      }
    }
  }
</style>
<style lang="scss">
// 这里如果在 scoped 中设置就没办法成功设置
@import "../../assets/css/mixin";
.banner-container{
  .swiper-pagination-bullet{
    width: 12px;
    height: 12px;
  }
  .swiper-pagination-bullet-active{
    @include bg_color();
  }
}
</style>
