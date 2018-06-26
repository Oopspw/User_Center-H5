<template>
  <div v-title="$route.meta.title">
    <div class="img_box">
      <img src="../assets/images/succes.png" alt="">
    </div>
    <h2>提交成功</h2>
    <div class="tip_box">
      <p class="tip_one">{{tips}}</p>
      <p class="tip_two" v-if="qq==''&&wechat==''">在兑换过程中，若遇到问题，为了让我们的工作人员能联系到您，您可留下以下联系方式：</p>
    </div>
    <div class="wirte_box" v-if="qq==''&&wechat==''">
      <div class="wecat_id">
        <div class="wecat_icon"></div>
        <input type="text" class="wecat_in" id="your_wecat" placeholder="请填写您的微信号">
      </div>
      <div class="qq_id">
        <div class="qq_icon"></div>
        <input type="text" class="qq_in" id="your_qq" placeholder="请填写您的QQ号">
      </div>
    </div>

    <button id="save_btn" v-if="qq===''&&wechat===''" @click="SaveInfo">继续赚钱</button>
    <button id="save_btn" v-else @click="sendInfoToApp('11')">继续赚钱</button>
        <!-- 遮罩层 -->
    <div class="mask" v-if="tipIsShow"></div>
      <!-- 跳转的弹框提示 -->
    <div class="alert_tip" v-if="tipIsShow">
      <h3>更多红包在这里,速来！！！</h3>
      <div class="alert_btnbox">
        <div id="cancel" @click="jumpStop">不要了</div>
        <div id="confirm" @click="jumpTottz">去抢钱</div>
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
      url: window.config.api.postUrl,
      //接口版本号
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      tips: '',
      showlogout: 0,
      qq: '',
      wechat: '',
      warn_content: '',
      warn_type: 0,
      tipIsShow: false,
      flag: true,
      ttFlag: ''
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.userid = window.localStorage.getItem('userid')
    _this.token = window.localStorage.getItem('token')
    _this.tips = window.localStorage.getItem('tips')
    _this.qq = window.localStorage.getItem('qq')
    _this.wechat = window.localStorage.getItem('wechat')
    _this.ttFlag = window.localStorage.getItem('appv') * 1
    _this.showCloseBtn('yes')
    _this.showRightBtn('no')
    _this.changeTitle('兑换成功')
    if (_this.ttFlag >= 7.2) {
      _this.tipIsShow = true
    }
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
    },
    //跳转至原生页面的方法
    jumpStop: function() {
      let _this = this
      _this.tipIsShow = false
    },
    sendInfoToApp: function(jumpNum) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(jumpNum)
      } else {
        taskCentre.gofinish(jumpNum)
      }
    },
    // 跳转至天天下载
    jumpTottz: function() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var data = {}
        data.type = 2
        data.jumpUrl = 'http://dl.shihesuiren.cn/ttDownload/DownloadMe.html'
        window.webkit.messageHandlers.missionWay.postMessage(data)
      } else {
        window.taskCentre.missionWay(
          '2',
          'http://dl.shihesuiren.cn/ttDownload/DownloadMe.html'
        )
      }
    },
    SaveInfo: function() {
      if (this.flag == false) {
        this.showWarnTips('正在提交操作，请稍后...')
        return false
      } else {
        let _this = this
        _this.wechat = $('#your_wecat').val()
        _this.qq = $('#your_qq').val()
        if (_this.wechat == '' && _this.qq == '') {
          _this.showWarnTips('请将您的联系方式填写完整')
          return false
        } else {
          this.flag == false
          let url = _this.url
          let data = {
            userid: _this.userid,
            token: _this.token,
            qq: _this.qq,
            wechat: _this.wechat,
            Infversion: _this.Infversion,
            Method: 'SaveUserContactInfoWap'
          }
          _this.$apiPost(
            url,
            data,
            res => {
              // 成功
              this.flag == true
              _this.sendInfoToApp('11')
            },
            res => {
              // 失败
              this.flag == true
              _this.showWarnTips(res.msg.substr(2))
            }
          )
        }
      }
    },
    showWarnTips: function(text) {
      this.warn_type = 1
      this.warn_content = text
      setTimeout(() => {
        this.warn_type = 0
      }, 2000)
    }
  }
}
</script>
<style scoped>
.img_box {
  width: 100%;
  height: 1.75rem;
  margin: 0.94rem auto 0.44rem;
  text-align: center;
}
.img_box img {
  width: 1.75rem;
  height: 1.75rem;
}
h2 {
  font-size: 0.36rem;
  text-align: center;
  margin-bottom: 0.4rem;
  color: #333333;
}
.tip_one {
  width: 5.4rem;
  margin: 0 auto 1.15rem;
  font-size: 0.3rem;
  line-height: 0.4rem;
  color: #777;
}
.tip_two {
  width: 6.7rem;
  margin: 0 auto 0.28rem;
  font-size: 0.3rem;
  line-height: 0.4rem;
  color: #777;
}
.wirte_box {
  width: 100%;
  background-color: #fff;
}
.wirte_box .wecat_id {
  width: 100%;
  height: 1.24rem;
}
.wirte_box .wecat_id .wecat_icon {
  width: 0.6rem;
  height: 0.6rem;
  background-color: #2ab526;
  background: url('../assets/images/newApp3.png') no-repeat;
  background-size: 4.8rem;
  background-position: -0.24rem -0.9rem;
  float: left;
  margin: 0.36rem 0.24rem 0 0.42rem;
}
.wirte_box .wecat_id .wecat_in {
  width: 80%;
  height: 1.24rem;
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.3rem;
}
.wirte_box .qq_id {
  width: 100%;
  height: 1.24rem;
}
.wirte_box .qq_id .qq_icon {
  width: 0.6rem;
  height: 0.6rem;
  background-color: #2ab526;
  background: url('../assets/images/newApp3.png') no-repeat;
  background-size: 4.8rem;
  background-position: -2.71rem -0.9rem;
  float: left;
  margin: 0.36rem 0.24rem 0 0.42rem;
}
.wirte_box .qq_id .qq_in {
  width: 70%;
  height: 1.24rem;
  border: none;
  font-size: 0.3rem;
}
#save_btn {
  width: 6.6rem;
  height: 0.93rem;
  background-color: #2ab526;
  color: #fff;
  display: block;
  border: none;
  outline: none;
  margin: 1rem auto;
  font-size: 0.34rem;
  line-height: 0.93rem;
}
body {
  background-color: #f7f7f7;
  padding-top: 0.3rem;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 166;
}
.alert_tip {
  width: 6.52rem;
  height: 4.28rem;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  position: fixed;
  border-radius: 5px;
  padding: 0.96rem 0.4rem 1.17rem;
  z-index: 188;
}
.alert_tip p {
  font-size: 0.36rem;
  color: #333333;
  text-align: center;
}
.alert_tip h3 {
  font-size: 0.42rem;
  color: #f63419;
  margin-top: 0.48rem;
  text-align: center;
}
.alert_btnbox {
  width: 100%;
  height: 1.17rem;
  background-color: #e6e6e6;
  border-radius: 0 0 5px 5px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.alert_btnbox #cancel {
  width: 49%;
  height: 1.17rem;
  background-color: #e6e6e6;
  border-radius: 0 0 0 5px;
  color: #707070;
  font-size: 0.4rem;
  text-align: center;
  line-height: 1.17rem;
  float: left;
  border-right: 1px solid #d6d6d6;
}
.alert_btnbox #confirm {
  width: 49%;
  height: 1.17rem;
  background-color: #e6e6e6;
  border-radius: 0 0 5px 0;
  color: #3cb035;
  font-size: 0.42rem;
  text-align: center;
  line-height: 1.17rem;
  float: right;
}
</style>
