<template>
  <div v-title="$route.meta.title">
    <div class="bigtitle">
      呱呱头条如何收徒？
    </div>
    <h2 class="title_one">一、面对面邀请（扫码收徒）</h2>
    <div class="box_one">
      <div class="content_box">
        <p>当与亲朋好友吃饭聚会、串门、见面聊天等时候，都可以直接向其推荐呱呱头条，使用扫码收徒功能收徒，让您的朋友扫描您展示的二维码下载安装。</p>
        <p>步骤如下:</p>
      </div>
      <div class="img_box">
        <p>1、打开“呱呱头条”，点击底部的
          <span class="tip_color">(1)"师徒"</span>
        </p>
        <p>2、点击
          <span class="tip_color">(2)"扫码收徒"</span>，打开二维码界面，让朋友扫描下载即可</p>
        <img src="../assets/images/icon_1@2x.png" alt="">
      </div>
    </div>
    <h2 class="title_one">二、线上邀请</h2>
    <div class="box_one">
      <div class="content_box">

        <p>1、在“师徒”界面点击
          <span class="tip_color">(3)“分享收徒”</span>进入弹窗界面</p>
      </div>
      <div class="img_box">

        <p>您可以点击
          <span class="tip_color">朋友圈邀请、微信邀请、QQ空间、QQ邀请、链接邀请</span>等入口将收徒链接邀请发给您的朋友安装注册加入</p>
        <img src="../assets/images/icon_2@2x.png" alt="">
        <img src="../assets/images/icon_3@2x.png" alt="">
      </div>
    </div>

  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data: function() {
    return {
      warn_content: '',
      warn_type: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.showLeftBtn('yes')
    _this.changeTitle('如何收徒')
  },
  methods: {
    //showLeftBtn 显示和关闭App返回箭头
    showLeftBtn: function(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showLeftBtn.postMessage(type)
      } else {
        window.taskCentre.showLeftBtn(type)
      }
    },
    //页面标题
    changeTitle: function(title) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.changeTitle.postMessage(title)
      } else {
        taskCentre.changeTitle(title)
      }
    }
  }
}
</script>
<style scoped>
body {
  overflow-x: hidden;
}
.bigtitle {
  width: 100%;
  height: 1.54rem;
  text-align: center;
  font-size: 0.5rem;
  line-height: 1.54rem;
  color: #49ba48;
  font-weight: 700;
}
.title_one {
  width: 100%;
  height: 1.05rem;
  padding-left: 0.24rem;
  font-size: 0.34rem;
  line-height: 1.05rem;
  color: #47ba43;
  background-color: #d2f1d1;
  margin-bottom: 0.5rem;
}
.box_one {
  width: 100%;
}
.box_one .content_box {
  width: 100%;
  padding: 0rem 0.94rem 0.24rem;
}
.box_one .content_box p {
  font-size: 0.3rem;
  line-height: 0.46rem;
  color: #333;
}
.box_one .img_box {
  background-color: #f8f8f8;
  width: 6.52rem;
  padding: 0.66rem 0.45rem;
  margin: 0 auto 0.3rem;
}
.box_one .img_box p {
  font-size: 0.3rem;
  line-height: 0.46rem;
  color: #333;
}
.box_one .img_box img {
  width: 100%;
}
.tip_color {
  color: #48b943;
}
</style>
