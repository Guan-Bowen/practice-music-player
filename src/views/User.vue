<template>
  <transition appear>
    <div class="user">
      <UserHeader @switchTab="switchTab"></UserHeader>
      <UserBottom :tabSwitch="tabSwitch"></UserBottom>
    </div>
  </transition>
</template>

<script>
import UserHeader from '../components/User/UserHeader'
import UserBottom from '../components/User/UserBottom'
export default {
  name: 'UserAccount',
  data: function () {
    return {
      tabSwitch: true // true：左侧 | false：右侧
    }
  },
  methods: {
    switchTab (flag) {
      this.tabSwitch = flag
    }
  },
  components: {
    UserHeader,
    UserBottom
  }

}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.user{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background-color: pink;
  @include bg_sub_color();
}
.v-enter{
  opacity: 0;
}
.v-enter-to{
  opacity: 1;
}
.v-enter-active{
  transition: all 1s;
}
.v-leave{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
}
.v-leave-active{
  transition: all 1s;
}
</style>
