/**
 * website:http://caibaojian.com
 * weibo:http:weibo.com/kujian
 * 兼容UC竖屏转横屏出现的BUG
 * 自定义设计稿的宽度：designWidth
 * 最大宽度:maxWidth
 * 这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
 */
(function (designWidth, maxWidth) {
  var doc = document
  var win = window
  var docEl = doc.documentElement
  var remStyle = document.createElement('style')
  var tid

  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    maxWidth = maxWidth || 540
    width > maxWidth && (width = maxWidth)
    /**
     * rem 比例值
     * width 是设备宽度
     * designWidth 是设计稿的宽度
     * 1rem 等于 设备宽度 * 100 / designWidth
     * 按照设备宽度 375(IPohne6\7\8)，设计稿的宽度 750来计算，则 1rem 相当于 50px
     */
    var rem = (width * 100) / designWidth
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem()

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid) // 防止执行两次
      tid = setTimeout(refreshRem, 300)
    },
    false
  )

  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function () {
        doc.body.style.fontSize = '16px'
      },
      false
    )
  }
})(640, 640)
