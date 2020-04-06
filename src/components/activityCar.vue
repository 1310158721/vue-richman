<template>
  <div
    ref='car'
    class="activity-car-wrapper"
    :style="{
      left: pathPos[currentPosId].left / 100 + 'rem',
      top: pathPos[currentPosId].top / 100 + 'rem'
    }"
  >
    <template v-if='carLtoR.includes(this.currentPosId)'>
      <div class='car-l-r'>
        <span class="people"></span>
        <span class="car"></span>
        <span class="wheel wheel_1" :class="{'wheel_rotate_l_r_ani': $attrs.canCarRun}" />
        <span class="wheel wheel_2" :class="{'wheel_rotate_l_r_ani': $attrs.canCarRun}" />
      </div>
    </template>
    <template v-else-if='carBack.includes(this.currentPosId)'>
      <div class='car-back'>
        <span class="people"></span>
        <span class="car"></span>
      </div>
    </template>
    <template v-else>
      <div class='car-r-l'>
        <span class="people"></span>
        <span class="car"></span>
        <span class="wheel wheel_1" :class="{'wheel_rotate_r_l_ani': $attrs.canCarRun, 'wheel_rotate_l_r_ani': isBackTwoStepNow}" />
        <span class="wheel wheel_2" :class="{'wheel_rotate_r_l_ani': $attrs.canCarRun, 'wheel_rotate_l_r_ani': isBackTwoStepNow}" />
      </div>
    </template>
  </div>
</template>

<script>
import {
  pathPos,
  addTwoStepPosId,
  backTwoStepPosId,
  addOneChancePosId,
  carLtoR,
  carBack,
  carRtoL
} from '@/assets/js/contants'
export default {
  name: 'ActivityCar',
  components: {},
  props: {},
  data () {
    return {
      pathPos: pathPos,
      currentPosId: 0,
      targetId: 0,
      carLtoR,
      carBack,
      carRtoL,
      isBackTwoStepNow: false
    }
  },
  computed: {},
  methods: {
    carRun () {
      if (this.currentPosId < this.targetId) {
        const car = this.$refs.car
        this.currentPosId++
        car.style.transition = 'all 500ms linear'
        this.$emit('scrollBodyCallback', this.currentPosId)
      } else {
        this.carStop()
      }
    },
    carStop () {
      this.$emit('carStopCallback')

      // 监听小车停在向前两步的位置
      if (addTwoStepPosId.includes(this.currentPosId)) {
        this.$emit('addTwoStepCallback')
      }

      // 监听小车停在再加一次机会的位置
      if (addOneChancePosId.includes(this.currentPosId)) {
        this.$emit('addChanceCallback')
      }

      // 监听小车停在后退两步的位置
      if (backTwoStepPosId.includes(this.currentPosId)) {
        this.targetId = this.currentPosId - 2
        this.$emit('backTwoStepCallback')
      }
    },
    backTwoStep () {
      this.isBackTwoStepNow = true
      if (this.currentPosId > this.targetId) {
        const car = this.$refs.car
        this.currentPosId--
        car.style.transition = 'all 500ms linear'
      } else {
        this.carStop()
      }
    }
  },
  created () {},
  mounted () {
    // 对外跑出小车每个位置的高度，供外部使用
    this.$listeners.getCarClientHeight(this.$refs.car.clientHeight)

    // 监听 car transitionend 事件
    const car = this.$refs.car
    car.addEventListener('transitionend', () => {
      if (this.currentPosId === 29) {
        car.style.transition = ''
        this.currentPosId = this.currentPosId % 29
        this.targetId = this.targetId % 29
        setTimeout(() => {
          this.$emit('resetTargetIdCallback')
          this.carRun()
        }, 20)
      } else {
        if (this.targetId > this.currentPosId) {
          this.carRun()
        } else if (this.targetId < this.currentPosId) {
          this.backTwoStep()
        } else {
          this.isBackTwoStepNow = false
          this.$emit('resetTargetIdCallback', this.currentPosId)
          this.carStop()
        }
      }
    }, false)
  },
  watch: {
    '$attrs.isLoadedInit' (val) {
      /**
       * 由于 this.$attrs.targetId 是通过接口获取的，存在异步
       * 因此在这里获取初始值，而不在 created 钩子
       */
      this.currentPosId = this.$attrs.targetId
    },
    '$attrs.targetId' (val) {
      this.targetId = val
    },
    '$attrs.canCarRun' (val) {
      if (val) {
        // 确保 $attrs.targetId 先更新到了
        this.$nextTick(() => {
          this.carRun()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-car-wrapper {
  width: 0.86rem;
  height: 0.86rem;
  border-radius: 50%;
  position: absolute;
  color: red;
  line-height: 0.86rem;
  text-align: center;
  .car-l-r {
    width: 1.68rem;
    height: 2.05rem;
    position: absolute;
    left: -0.43rem;
    top: -1.21rem;
    .people {
      width: 0.76rem;
      height: 0.86rem;
      position: absolute;
      left: 0.32rem;
      top: 0.68rem;
      background-image: url('~@/assets/img/people_1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .car {
      width: 1.68rem;
      height: 0.86rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background-image: url('~@/assets/img/car_1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .wheel {
      position: absolute;
      width: 0.37rem;
      height: 0.37rem;
      background-image: url('~@/assets/img/wheel.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      &.wheel_1 {
        left: 0.16rem;
        bottom: 0.04rem;
      }
      &.wheel_2 {
        right: 0.16rem;
        bottom: 0.04rem;
      }
    }
  }
  .car-back {
    width: 1.68rem;
    height: 2.05rem;
    position: absolute;
    left: -0.43rem;
    top: -1.21rem;
    .people {
      width: 0.80rem;
      height: 0.93rem;
      position: absolute;
      left: 0.45rem;
      top: 0.70rem;
      background-image: url('~@/assets/img/people_2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .car {
      width: 1.26rem;
      height: 0.72rem;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      background-image: url('~@/assets/img/car_2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .car-r-l {
    width: 1.68rem;
    height: 2.05rem;
    position: absolute;
    left: -0.43rem;
    top: -1.21rem;
    .people {
      width: 0.76rem;
      height: 0.86rem;
      position: absolute;
      left: 0.61rem;
      top: 0.70rem;
      background-image: url('~@/assets/img/people_3.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .car {
      width: 1.68rem;
      height: 0.86rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background-image: url('~@/assets/img/car_3.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .wheel {
      position: absolute;
      width: 0.37rem;
      height: 0.37rem;
      background-image: url('~@/assets/img/wheel.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      &.wheel_1 {
        left: 0.16rem;
        bottom: 0.04rem;
      }
      &.wheel_2 {
        right: 0.16rem;
        bottom: 0.04rem;
      }
    }
  }
}
</style>
