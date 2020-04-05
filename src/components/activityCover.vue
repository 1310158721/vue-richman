<template>
  <div
    v-if='isShow'
    ref='cover'
    class="activity-cover-wrapper"
    @touchmove.prevent=''
    :class="{
      'cover-ani': isClick
    }"
  >
    <span class="open-btn open-cover-btn-ani" @click='openClick' />
    <span class="cloud-left left-cloud-ani" />
    <span class="cloud-right right-cloud-ani" />
    <span class="cloud_1 cloud-ani" />
    <span class="cloud_2" />
    <span class="cloud_3" />
    <span class="cloud_4" />
  </div>
</template>

<script>
export default {
  name: 'ActivityCover',
  components: {},
  props: {},
  data () {
    return {
      isClick: false,
      isShow: true
    }
  },
  computed: {},
  methods: {
    openClick () {
      this.isClick = true
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      const cover = this.$refs.cover
      cover.addEventListener('animationend', () => {
        if (this.isClick) {
          this.isShow = false
        }
      }, false)
    })
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.activity-cover-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30000;
  background-image: url('~@/assets/img/cover.png');
  background-size: 6.4rem 10.08rem;
  background-repeat: no-repeat;
  background-color: rgba(0,0,0,.8);
  .open-btn {
    width: 2.33rem;
    height: 2.54rem;
    background-image: url('~@/assets/img/openTheGame.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 2.03rem;
    top: 5.70rem;
  }
  .cloud-left {
    width: 1.21rem;
    height: 2.31rem;
    background-image: url('~@/assets/img/cover_cloud_1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 6.40rem;
  }
  .cloud-right {
    width: 0.73rem;
    height: 1.29rem;
    background-image: url('~@/assets/img/cover_cloud_2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 4.90rem;
  }
  .cloud_1 {
    width: 6.60rem;
    height: 1.69rem;
    background-image: url('~@/assets/img/cloud_1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    margin-left: -3.3rem;
    top: -0.1rem;
  }
  .cloud_2 {
    width: 0.88rem;
    height: 1.10rem;
    background-image: url('~@/assets/img/cloud_2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 3.90rem;
  }
  .cloud_3 {
    width: 0.72rem;
    height: 1.07rem;
    background-image: url('~@/assets/img/cloud_3.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 9.60rem;
  }
  .cloud_4 {
    width: 0.94rem;
    height: 1.66rem;
    background-image: url('~@/assets/img/cloud_4.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 8rem;
  }
}
</style>
