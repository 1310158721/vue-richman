<template>
  <transition name='zoom'>
    <div
      ref='dice'
      v-if='isShowDice'
      class="activity-dice-wrapper"
    >
      <div v-if='isShowLoopDice' class="activity-dice-loop-ani dice-ani-loop" />
      <div ref='normal' v-else class="activity-dice-normal" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ActivityDice',
  components: {},
  props: {
    isShowDice: {
      type: Boolean,
      default: false
    },
    random: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isShowLoopDice: true,
      posY: [
        -7,
        -224,
        -441,
        -658,
        -875,
        -1092,
        -1307,
        -1523,
        -1740
      ]
    }
  },
  computed: {},
  methods: {
    // dice 出现过渡动画结束
    diceAniEnd () {
      this.isShowLoopDice = false
      this.$nextTick(() => {
        const normal = this.$refs.normal
        normal.style.backgroundPositionY = this.posY[this.random - 1] / 100 + 'rem'
        this.isShowLoopDice = true
        // 显示摇骰子结果 1000ms
        setTimeout(() => {
          this.$emit('diceAniEndCallback')
        }, 1000)
      })
    }
  },
  created () {},
  mounted () {},
  watch: {
    'isShowDice' (val) {
      if (val) {
        this.$nextTick(() => {
          const dice = this.$refs.dice
          dice.addEventListener('animationend', () => {
            this.diceAniEnd()
          }, false)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-dice-wrapper {
  width: 1.80rem;
  height: 1.80rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -0.9rem 0 0 -0.9rem;
  z-index: 10000;
  overflow: hidden;
  .activity-dice-loop-ani, .activity-dice-normal {
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/img/dice.png');
    background-position-y: -13.07rem;
    background-size: 1.80rem 19.39rem;
  }
}
</style>
