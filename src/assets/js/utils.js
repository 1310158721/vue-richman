export const scrollTo = (el, target, time = 200) => {
  return new Promise(resolve => {
    /* 防止 target 小于 0 时，正常滚动滚不到负值，导致定时器一直开启问题 */
    if (target < 0) {
      target = 0
    }
    /* 获取元素当前的scrollTop 值 */
    const currentScrollTop = el.scrollTop
    /* 定义定时器 */
    let timer = null
    /* 定义元素每次走的 step */
    const step = 5
    /* 当元素目前 scrollTop 小于 目标值时 */
    if (currentScrollTop < target) {
      /* 计算定时器的间隔时间 */
      const stepTime = time / ((target - currentScrollTop) / step)
      /* 开启定时器 */
      timer = setInterval(() => {
        /* 获取元素当前的 scrollTop */
        const currentScrollTop = el.scrollTop
        /* 如果元素当前的 scrollTop 仍然小于目标值，继续叠加 */
        if (currentScrollTop < target) {
          el.scrollTop += step
          /* 否则清除定时器 */
        } else {
          el.scrollTop = target
          clearInterval(timer)
          resolve()
        }
      }, stepTime)
      /* 当元素目前 scrollTop 大于 目标值时 */
    } else if (currentScrollTop > target) {
      /* 计算定时器的间隔时间 */
      const stepTime = time / ((currentScrollTop - target) / step)
      /* 开启定时器 */
      timer = setInterval(() => {
        /* 获取元素当前的 scrollTop */
        const currentScrollTop = el.scrollTop
        /* 如果元素当前的 scrollTop 仍然大于目标值，继续递减 */
        if (target < currentScrollTop) {
          el.scrollTop -= step
          /* 否则清除定时器 */
        } else {
          el.scrollTop = target
          clearInterval(timer)
          resolve()
        }
      }, stepTime)
    } else {
      resolve()
    }
  })
}

export const getInitScrollTop = posId => {
  switch (posId) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return 0
    case 5:
      return 1
    case 6:
      return 2
    case 7:
      return 3
    case 8:
    case 9:
    case 10:
    case 11:
      return 4
    case 12:
      return 5
    case 13:
      return 6
    case 14:
      return 7
    case 15:
    case 16:
    case 17:
    case 18:
      return 8
    case 19:
      return 9
    case 20:
      return 10
    case 21:
      return 11
    case 22:
    case 23:
    case 24:
    case 25:
      return 12
    case 26:
      return 13
    case 27:
      return 14
    case 28:
      return 15
    case 29:
      return 16
  }
}

export const throttle = (fn, delay) => {
  let clickTime = 0
  return function () {
    const now = Date.now()
    if (now - clickTime > delay) {
      fn.call(this)
      clickTime = now
    }
  }
}
