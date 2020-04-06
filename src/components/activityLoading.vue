<template>
  <section v-if='!isRemove' ref='loading' id="loading" class="loading" :class='{"fadeOut": isLoadedInit}'>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ActivityLoading',
  components: {},
  props: {
    isLoadedInit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isRemove: false
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      const loading = this.$refs.loading
      loading.addEventListener('animationend', () => {
        this.isRemove = true
      }, false)
    })
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 50000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.9);
}
.spinner {
  width: 2rem;
  height: 1.2rem;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -0.6rem 0 0 -1rem;
  font-size: 0.14rem;
}
.spinner > div {
  background-color: #cf4334;
  height: 100%;
  width: 0.12rem;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
