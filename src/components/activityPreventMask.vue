<template>
  <transition name='fade'>
    <div
      v-if='isShowPreventMask'
      class="activity-prevent-mask"
      @touchstart.prevent=''
      @touchend.prevent=''
    />
  </transition>
</template>

<script>
export default {
  name: 'ActivityPreventMask',
  components: {},
  props: {
    isShowPreventMask: {
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
.activity-prevent-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 20000;
}
</style>
