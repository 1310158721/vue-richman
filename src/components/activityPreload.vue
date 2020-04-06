<template>
  <div class="activity-preload-wrapper">
    <img src="@/assets/img/dice.png" alt="">
    <img src="@/assets/img/rules.png" alt="">
    <img src="@/assets/img/alert.png" alt="">
    <img src="@/assets/img/addChance.png" alt="">
    <img src="@/assets/img/backTwoStep.png" alt="">
    <img src="@/assets/img/addTwoStep.png" alt="">
    <img src="@/assets/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'ActivityPreload',
  components: {},
  props: {},
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
.activity-preload-wrapper {
  width: 0;
  height: 0;
  overflow:hidden;
  position: absolute;
  z-index: 0;
}
</style>
