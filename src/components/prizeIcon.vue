<template>
  <div class="prize-icon-wrapper">
    <span
      class="prize-icon-item prize-icon-item-ani"
      v-for='i in prizeIcon'
      :key='i.id'
      :style="{
        left: i.left / 100 + 'rem',
        top: i.top / 100 + 'rem',
        backgroundPositionX: i.posX / 100 + 'rem'
      }"
    />
  </div>
</template>

<script>
import { prizeIcon } from '@/assets/js/contants'
export default {
  name: 'PrizeIcon',
  data () {
    return {
      prizeIcon: prizeIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.prize-icon-wrapper {
  .prize-icon-item {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-image: url('~@/assets/img/prize-icon.png');
    background-size: 12rem 1rem;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 10;
  }
}
</style>
