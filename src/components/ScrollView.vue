<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
// 检测设备
// function getBrowser () {
//   const ua = navigator.userAgent.toLowerCase()
//   let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0]
//   if ((ua.match(/msie|trident/g) || [])[0]) {
//     btypeInfo = 'msie'
//   }
//   let pc = ''
//   let prefix = ''
//   let plat = ''
//   // 如果没有触摸事件 判定为PC
//   const isTocuh = ('ontouchstart' in window) || (ua.indexOf('touch') !== -1) || (ua.indexOf('mobile') !== -1)
//   if (isTocuh) {
//     if (ua.indexOf('ipad') !== -1) {
//       pc = 'pad'
//     } else if (ua.indexOf('mobile') !== -1) {
//       pc = 'mobile'
//     } else if (ua.indexOf('android') !== -1) {
//       pc = 'androidPad'
//     } else {
//       pc = 'pc'
//     }
//   } else {
//     pc = 'pc'
//   }
//   switch (btypeInfo) {
//     case 'chrome':
//     case 'safari':
//     case 'mobile':
//       prefix = 'webkit'
//       break
//     case 'msie':
//       prefix = 'ms'
//       break
//     case 'firefox':
//       prefix = 'Moz'
//       break
//     case 'opera':
//       prefix = 'O'
//       break
//     default:
//       prefix = 'webkit'
//       break
//   }
//   plat = (ua.indexOf('android') > 0) ? 'android' : navigator.platform.toLowerCase()
//   return {
//     version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本
//     plat: plat, // 系统
//     type: btypeInfo, // 浏览器
//     pc: pc,
//     prefix: prefix, // 前缀
//     isMobile: pc !== 'pc' // 是否是移动端
//   }
// }
// const { isMobile } = getBrowser()

export default {
  name: 'ScrollView',
  methods: {
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  },
  mounted () {
    // alert('Is Mobile: ' + isMobile)
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3, // 像素级触发 scroll 事件
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
      // click: isMobile,
      // taps: isMobile
    })
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    observer.observe(this.$refs.wrapper, config)
  }
}
</script>

<style scoped>
.scroll-wrapper{
  width: 100%;
  height: 100%;
}
</style>
