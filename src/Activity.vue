<template>
  <div ref='activity' class="activity-wrapper">
    <span
      class="go-rule-btn"
      :style='goRulesBtnStyle'
      @click='throttleGoRulesBNtnClick'
      @touchstart='scale = 0.9'
      @touchend='scale = 1'
    />
    <span class="draw-count-wrapper">
      还剩 <span class="count">{{ count }}</span> 次
    </span>
    <ActivityBg
      ref='bg'
      :isLoadedInit='isLoadedInit'
      :targetId='targetId'
      :canCarRun='canCarRun'
      @getCarClientHeight='getCarClientHeight'
      @getBgClientHeight='getBgClientHeight'
      @carStopCallback='carStopCallback'
      @resetTargetIdCallback='resetTargetIdCallback'
      @addTwoStepCallback='addTwoStepCallback'
      @addChanceCallback='addChanceCallback'
      @backTwoStepCallback='backTwoStepCallback'
      @scrollBodyCallback='scrollBodyCallback'
    />
    <StartBtn :count='count' @startBtnBeforeRequestCallback='startBtnBeforeRequestCallback' @startBtnCallback='startBtnCallback' @drawCountZeroCallback='drawCountZeroCallback' />
    <ActivityMask :isShowActivityMask='isShowActivityMask' />
    <ActivityDice :isShowDice='isShowDice' :random='random' @diceAniEndCallback='diceAniEndCallback' />
    <ActivityAlert v-if='isLoadedInit' :isShowActivityAlert='isShowActivityAlert' :targetId='targetId' @closeAlertCallback='closeAlertCallback' />
    <ActivityPreventMask :isShowPreventMask='isShowPreventMask' />
    <ActivityRule :isShowRule='isShowRule' @closeActivityRuleCallback='closeActivityRuleCallback' />
    <CountZeroAlert :isShowCountZeroAlert='isShowCountZeroAlert' @closeCountZeroAlert='closeCountZeroAlert' />
    <ActivityCover />
    <ActivityPreload v-if='isLoadedInit' />
    <ActivityLoading :isLoadedInit='isLoadedInit' />
  </div>
</template>
<script>

import ActivityBg from '@/components/activityBg'
import StartBtn from '@/components/startBtn'
import ActivityMask from '@/components/activityMask'
import ActivityDice from '@/components/activityDice'
import ActivityAlert from '@/components/activityAlert'
import ActivityPreventMask from '@/components/activityPreventMask'
import ActivityRule from '@/components/activityRule'
import ActivityCover from '@/components/activityCover'
import ActivityPreload from '@/components/activityPreload'
import ActivityLoading from '@/components/activityLoading'
import { getInitScrollTop, scrollTo, throttle } from '@/assets/js/utils'
import { nothingPosId } from '@/assets/js/contants'
import CountZeroAlert from '@/components/countZeroAlert'
export default {
  name: 'Activity',
  components: {
    ActivityBg,
    StartBtn,
    ActivityMask,
    ActivityDice,
    ActivityAlert,
    ActivityPreventMask,
    ActivityRule,
    CountZeroAlert,
    ActivityCover,
    ActivityPreload,
    ActivityLoading
  },
  props: {},
  data () {
    return {
      // 小车当前位置
      targetId: 0,
      count: 0,
      random: 0,
      // 小车每个位置的高度
      carClientheight: 0,
      // 背景组件的高度
      bgClientHeight: 0,
      isShowActivityMask: false,
      isShowDice: false,
      isLoadedInit: false,
      canCarRun: false,
      isShowActivityAlert: false,
      isShowPreventMask: false,
      isShowRule: false,
      isShowCountZeroAlert: false,
      scale: 1
    }
  },
  computed: {
    throttleGoRulesBNtnClick () {
      return throttle(this.goRulesBNtnClick, 200)
    },
    goRulesBtnStyle () {
      return {
        transform: `scale(${this.scale})`
      }
    }
  },
  methods: {
    // 请求初始化接口
    async init () {
      return await this.$axios.get(`./mock/init.json?t=${Date.now()}`)
    },
    // 获取内部嵌套的背景组件的高度，内部组件挂载时执行
    getBgClientHeight (height) {
      this.bgClientHeight = height
    },
    // 获取内部嵌套的小车组件的高度，内部组件挂载时执行
    getCarClientHeight (height) {
      this.carClientheight = height
    },
    // 计算页面初始化时的 scrollTop 值
    calculateInitScrollTop () {
      return this.bgClientHeight - document.body.clientHeight - getInitScrollTop(this.targetId) * this.carClientheight
    },
    // 骰子按钮请求接口回调
    startBtnCallback (random) {
      this.count--
      const activity = this.$refs.activity
      let targetScrollTop = this.bgClientHeight - document.body.clientHeight - getInitScrollTop(this.targetId) * this.carClientheight
      if (targetScrollTop < 0) {
        targetScrollTop = 0
      }
      scrollTo(activity, targetScrollTop).then(() => {
        this.isShowPreventMask = false
        // random 范围为 1 ～ 6
        this.random = random
        this.targetId += random
        this.isShowActivityMask = true
        this.isShowDice = true
      })
    },
    // 骰子动画结束回调
    diceAniEndCallback () {
      this.isShowDice = false
      this.isShowActivityMask = false
      this.random = 0
      // dice 消失钩子，400ms 对应消失动画的过渡时间
      setTimeout(() => {
        this.canCarRun = true
        this.isShowPreventMask = true
      }, 400)
    },
    // 小车真正停止运动时的回调
    carStopCallback () {
      this.canCarRun = false
      this.isShowPreventMask = false
      if (!nothingPosId.includes(this.targetId)) {
        this.isShowActivityAlert = true
        this.isShowActivityMask = true
      }
    },
    // 重置 targetId
    resetTargetIdCallback (posId) {
      if (posId) {
        this.targetId = posId
      } else {
        this.targetId = this.targetId % 29
        const activity = this.$refs.activity
        const shouldScrollTop = this.bgClientHeight - document.body.clientHeight
        scrollTo(activity, shouldScrollTop)
      }
    },
    // 关闭弹窗回调
    closeAlertCallback () {
      this.canCarRun = false
      this.isShowActivityMask = false
      this.isShowActivityAlert = false
      // // 定时器是为了等弹窗动画结束
      // setTimeout(() => {
      //   console.log(123)
      // }, 400)
    },
    addTwoStepCallback () {
      setTimeout(() => {
        this.canCarRun = false
        this.isShowActivityAlert = false
        this.isShowActivityMask = false
        setTimeout(() => {
          this.isShowPreventMask = true
          this.targetId = this.targetId + 2
          this.canCarRun = true
        }, 400)
      }, 400 + 500)
    },
    addChanceCallback () {
      setTimeout(() => {
        this.canCarRun = false
        this.isShowActivityAlert = false
        this.isShowActivityMask = false
        this.count++
      }, 400 + 500)
    },
    backTwoStepCallback () {
      this.isShowActivityAlert = true
      this.isShowActivityMask = true
      setTimeout(() => {
        this.canCarRun = false
        this.isShowActivityAlert = false
        this.isShowActivityMask = false
        this.$nextTick(() => {
          this.isShowPreventMask = true
          this.$refs.bg.$refs.car.backTwoStep()
        })
      }, 400 + 500)
    },
    scrollBodyCallback (posId) {
      this.$nextTick(() => {
        const activity = this.$refs.activity
        let targetScrollTop = this.bgClientHeight - document.body.clientHeight - getInitScrollTop(posId) * this.carClientheight
        if (targetScrollTop < 0) {
          targetScrollTop = 0
        }
        scrollTo(activity, targetScrollTop)
      })
    },
    goRulesBNtnClick () {
      this.isShowActivityMask = true
      this.isShowRule = true
    },
    closeActivityRuleCallback () {
      this.isShowActivityMask = false
      this.isShowRule = false
    },
    drawCountZeroCallback () {
      this.isShowActivityMask = true
      this.isShowCountZeroAlert = true
    },
    closeCountZeroAlert () {
      this.isShowActivityMask = false
      this.isShowCountZeroAlert = false
    },
    startBtnBeforeRequestCallback () {
      this.isShowPreventMask = true
    }
  },
  created () {
    // 调取初始化接口，获取相关数据
    this.init().then((res) => {
      if (res.data.code === 0) {
        const { result } = res.data
        this.targetId = result.targetId
        this.count = result.count
        this.isLoadedInit = true
        this.$nextTick(() => {
          const activity = this.$refs.activity
          activity.scrollTop = this.calculateInitScrollTop()
        })
      }
    })
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.activity-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  .go-rule-btn {
    width: 1.22rem;
    height: 0.67rem;
    background-image: url('~@/assets/img/goRulesBtn.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
    right: 0.2rem;
    top: 0.2rem;
    z-index: 1000;
  }
  .draw-count-wrapper {
    width: 1.22rem;
    height: 0.67rem;
    background-image: url('~@/assets/img/count.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 0.2rem;
    z-index: 1000;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.67rem;
    font-weight: bold;
    color: rgb(10, 124, 10);
    .count {
      font-weight: bolder;
      color: yellow;
      font-size: 0.3rem;
    }
  }
}
</style>
