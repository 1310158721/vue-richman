<template>
  <transition name='zoom'>
    <div v-if='isShowRule' class="activity-rule-wrapper">
      <span class="close" @click='throttleCloseRule'></span>
      <span class="return" @click='throttleCloseRule'></span>
    </div>
  </transition>
</template>

<script>
import { throttle } from '@/assets/js/utils'
export default {
  name: 'ActivityRule',
  components: {},
  props: {
    isShowRule: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    throttleCloseRule () {
      return throttle(this.closeRule, 500)
    }
  },
  methods: {
    closeRule () {
      this.$emit('closeActivityRuleCallback')
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.activity-rule-wrapper {
  width: 5.56rem;
  height: 8.85rem;
  background-image: url('~@/assets/img/rules.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -4.425rem 0 0 -2.78rem;
  z-index: 10000;
  .close {
    width: 0.78rem;
    height: 0.78rem;
    position: absolute;
    right: 0;
    top: 0;
  }
  .return {
    width: 2.55rem;
    height: 0.87rem;
    position: absolute;
    bottom: 0;
    left: 1.43rem;
  }
}
</style>
