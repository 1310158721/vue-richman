<template>
  <transition name='fade'>
    <div
      v-if='isShowActivityMask'
      class="activity-mask-wrapper"
      @touchstart.prevent=''
      @touchend.prevent=''
      @touchmove.prevent=''
    />
  </transition>
</template>

<script>
export default {
  name: 'ActivityMask',
  components: {},
  props: {
    isShowActivityMask: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.activity-mask-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>
