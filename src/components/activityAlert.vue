<template>
  <transition name="zoom" v-if='isShowActivityAlert'>
      <div
        v-if="normalPrizePosId.includes(targetId)"
        class="normal-wrapper"
      >
        <div
          class="close"
          :style='closeStyle'
          @touchstart='scale = 0.9'
          @touchend='scale = 1'
          @click='closeClick'
        />
        <div class="text">
          恭喜你，获取奖品<br />
          <span>{{ normalPrizeText }}</span>
        </div>
      </div>
      <div
        v-else-if="addTwoStepPosId.includes(targetId)"
        class="add-two-step-wrapper"
      ></div>
      <div
        v-else-if="backTwoStepPosId.includes(targetId)"
        class="back-two-step-wrapper"
      ></div>
      <div
        v-else-if="addOneChancePosId.includes(targetId)"
        class="add-chance-wrapper"
      ></div>
    </transition>
</template>

<script>
import {
  normalPrizePosId,
  addTwoStepPosId,
  backTwoStepPosId,
  addOneChancePosId,
  nothingPosId
} from '@/assets/js/contants'
export default {
  name: 'ActivityAlert',
  components: {},
  props: {
    targetId: {
      type: Number,
      default: 0
    },
    isShowActivityAlert: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      normalPrizePosId,
      addTwoStepPosId,
      backTwoStepPosId,
      addOneChancePosId,
      nothingPosId,
      scale: 1
    }
  },
  computed: {
    closeStyle () {
      return {
        transform: `scale(${this.scale})`
      }
    },
    normalPrizeText () {
      switch (this.targetId) {
        case 1:
        case 6:
        case 13:
        case 27:
          return '体验金'
        case 2:
        case 9:
        case 14:
        case 23:
          return '成长值'
        case 3:
        case 16:
        case 22:
          return '5000投资卡'
        case 5:
          return '荷包公仔'
        case 7:
          return '1万体验金'
        case 8:
        case 20:
        case 26:
          return '定期加息券'
        case 19:
          return '荷包零钱包'
        case 21:
          return '2万加息券'
        case 28:
          return '3万加息券'
        default:
          return ''
      }
    }
  },
  methods: {
    closeClick () {
      this.$emit('closeAlertCallback')
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
    background-image: url('~@/assets/img/close.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 0;
    transition: 'all 200ms linear'
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
.add-two-step-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  background-image: url("~@/assets/img/addTwoStep.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -1.75rem 0 0 -1.75rem;
  z-index: 10000;
}
.back-two-step-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  background-image: url("~@/assets/img/backTwoStep.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -1.75rem 0 0 -1.75rem;
  z-index: 10000;
}
.add-chance-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  background-image: url("~@/assets/img/addChance.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -1.75rem 0 0 -1.75rem;
  z-index: 10000;
}
</style>
