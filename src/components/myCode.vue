<template>
  <div v-title="$route.meta.title">
    <div class="biger">
      <div class="what_box">
        <img src="../assets/images/icon_6@2x.png" alt="">
        <p>邀请码是呱呱头条用户的身份标识</p>
        <p>可在邀请收徒是使用</p>
        <div class="code_box" @click="copyCode(mycode)">
          <h4>点击复制您的邀请码</h4>
          <p>{{mycode}}</p>
        </div>
      </div>
      <div class="how_box">
        <img src="../assets/images/icon_7@2x.png" alt="">
        <p>1、通过分享收徒或者扫码收徒给朋友在线注册时，自动绑定您的邀请码，不需要徒弟手动输入。</p>
        <img src="../assets/images/icon_8@2x.png" alt="">
        <p>2、若您的好友时通过手机应用商店搜索“呱呱头条”安装注册的，需登录后输入您的邀请码后才能成为您的徒弟。</p>
        <img src="../assets/images/icon_9@2x.png" alt="">
      </div>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data: function() {
    return {
      mycode: '',
      warn_content: '',
      warn_type: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.mycode = window.localStorage.getItem('ggc')
    _this.showLeftBtn('yes')
    _this.changeTitle('我的邀请码')
  },
  methods: {
    //showLeftBtn 显示和关闭App返回箭头
    showLeftBtn: function(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showLeftBtn.postMessage(type)
      } else {
        taskCentre.showLeftBtn(type)
      }
    },
    //页面标题
    changeTitle: function(title) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.changeTitle.postMessage(title)
      } else {
        taskCentre.changeTitle(title)
      }
    },
    //传code给app
    copyCode: function(code) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.copyCode.postMessage(code)
      } else {
        taskCentre.copyCode(code)
      }
    }
  }
}
</script>
<style>
body {
  background: #f8f8f8 !important;
  overflow-x: hidden;
  overflow-y: auto;
}
.biger {
  padding-top: 0.36rem !important;
}
.what_box {
  width: 6.92rem;
  height: 4.24rem;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  padding-top: 0.33rem;
}
.what_box img {
  width: 80%;
  margin-bottom: 0.35rem;
}
.what_box p {
  font-size: 0.32rem;
  line-height: 0.5rem;
  color: #333;
}
.what_box .code_box {
  width: 3.24rem;
  height: 1.39rem;
  border: 1px solid #9ddb9c;
  border-radius: 10px;
  margin: 0.22rem auto 0;
  padding-top: 0.24rem;
}
.what_box .code_box h4 {
  font-size: 0.32rem;
  color: #48bb46;
}
.what_box .code_box p {
  font-size: 0.32rem;
  color: #48bb46;
}
.how_box {
  width: 6.92rem;
  background-color: #fff;
  margin: 0.36rem auto;
  padding-top: 0.33rem;
}
.how_box img {
  display: block;
  margin: 0 auto;
  width: 80%;
}
.how_box p {
  font-size: 0.3rem;
  line-height: 0.5rem;
  width: 5.8rem;
  margin: 0.3rem auto;
}
</style>
