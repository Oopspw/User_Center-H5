<template>
  <div v-title="$route.meta.title">
    <section>
      <div class="div_img01">
        <img src="../assets/images/bank01.png" alt="" width="100%">
      </div>
      <div class="div_img02">
        <img src="../assets/images/bank02.png" alt="" width="100%">
      </div>
      <div class="div_img03">
        <img src="../assets/images/card03.png" alt="" width="100%">
      </div>
      <div class="div_img04">
        <img src="../assets/images/card04.png" alt="" width="100%">
      </div>
    </section>
  </div>
</template>
<script>
//  import $ from 'jquery'
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      showlogout: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.changeTitle('微信实名认证')
    _this.showRightBtn('no')
  },
  methods: {
    //页面标题
    changeTitle: function(title) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.changeTitle.postMessage(title)
      } else {
        taskCentre.changeTitle(title)
      }
    },
    // app关闭按钮显示与否 'yes'为显示 'no'为不显示
    showCloseBtn: function(shwotype) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showCloseBtn.postMessage(shwotype)
      } else {
        taskCentre.showCloseBtn(shwotype)
      }
    },
    // app跳转页面按钮的显示与否 'yes'为显示 'no'为不显示
    showRightBtn: function(shwotype) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showRightBtn.postMessage(shwotype)
      } else {
        taskCentre.showRightBtn(shwotype)
      }
    }
  }
}
</script>
<style scoped>
div {
  width: 100%;
  margin: -5px auto;
  text-align: center;
}
</style>
