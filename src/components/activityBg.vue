<template>
  <div
    ref='bg'
    class="activity-bg-wrapper"
  >
    <PrizeIcon />
    <ActivityCar
      ref='car'
      v-bind='$attrs'
      v-on='$listeners'
    />
  </div>
</template>

<script>
import PrizeIcon from '@/components/prizeIcon'
import ActivityCar from '@/components/activityCar'
export default {
  name: 'ActivityBg',
  components: {
    PrizeIcon,
    ActivityCar
  },
  props: {},
  mounted () {
    this.$nextTick(() => {
      this.$emit('getBgClientHeight', this.$refs.bg.clientHeight)
    })
  }
}
</script>

<style lang="scss" scoped>
.activity-bg-wrapper {
  width: 100%;
  height: 19.96rem;
  background-image: url('~@/assets/img/bg.png');
  background-repeat: no-repeat;
  background-size: 6.4rem 19.96rem;
  position: relative;
}
</style>
