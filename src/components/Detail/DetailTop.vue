<template>
<div class="detail-top">
  <div class="img-container">
    <img :src="imgPath" alt="">
    <div class="mask" ref="mask"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    imgPath: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    maskBlur (rate) {
      // console.log(rate)
      this.$refs.mask.style.opacity = rate
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  z-index: -100;
  img{
    width: 100%;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
  }
}
</style>
