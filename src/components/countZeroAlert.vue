<template>
  <transition name="zoom">
    <div class="normal-wrapper" v-if="isShowCountZeroAlert">
      <div
        class="close"
        :style="closeStyle"
        @touchstart="scale = 0.9"
        @touchend="scale = 1"
        @click="closeClick"
      />
      <div class="text">
        你没有抽奖次数了
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CountZeroAlert',
  components: {},
  props: {
    isShowCountZeroAlert: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scale: 1
    }
  },
  computed: {
    closeStyle () {
      return {
        transform: `scale(${this.scale})`
      }
    }
  },
  methods: {
    closeClick () {
      this.$emit('closeCountZeroAlert')
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.normal-wrapper {
  width: 5.41rem;
  height: 3.67rem;
  background-image: url("~@/assets/img/alert.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -1.805rem 0 0 -2.705rem;
  z-index: 10000;
  .close {
    width: 0.74rem;
    height: 0.75rem;
    background-image: url("~@/assets/img/close.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 0;
    transition: "all 200ms linear";
  }
  .text {
    width: 100%;
    line-height: 0.4rem;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: black;
    font-weight: bold;
    span {
      color: red;
      font-weight: bolder;
      font-size: 0.42rem;
    }
  }
}
</style>
