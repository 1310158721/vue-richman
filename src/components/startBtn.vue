<template>
  <div
    class="start-btn-wrapper"
    :style="{
      backgroundPositionY: isTouching ? '-1.61rem' : '0rem'
    }"
    @touchstart='touchstart'
    @touchend='touchend'
    @click.prevent='throttleClick'
  />
</template>

<script>
import { throttle } from '@/assets/js/utils'
export default {
  name: 'StartBtn',
  components: {},
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isTouching: false
    }
  },
  computed: {
    // 节流函数
    throttleClick () {
      return throttle(this.handleclick, 500)
    }
  },
  methods: {
    touchstart () {
      this.isTouching = true
    },
    touchend () {
      this.isTouching = false
    },
    handleclick () {
      if (this.count === 0) {
        this.$emit('drawCountZeroCallback')
        return
      }
      this.$emit('startBtnBeforeRequestCallback')
      this.getRandom().then((res) => {
        if (res.data.code === 0) {
          // const { result } = res.data
          // const { random } = result
          const random = Math.floor(Math.random() * 6 + 1)
          this.$emit('startBtnCallback', random)
        }
      })
    },
    // 请求获取随机数接口
    async getRandom () {
      return await this.$axios.get(`./mock/random.json?t=${Date.now()}`)
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.start-btn-wrapper {
  width: 4.06rem;
  height: 1.61rem;
  background-image: url('~@/assets/img/start-btn.png');
  background-repeat: no-repeat;
  background-size: 4.06rem 3.22rem;
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-left: -2.03rem;
  z-index: 9999;
}
</style>
