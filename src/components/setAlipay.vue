<template>
  <div v-title="$route.meta.title">
    <div class="zhiPay_info">
      <div class="ture_name zhiPay_line">
        <h3>支付宝账号:</h3>
        <input type="text" v-model='alipayId' placeholder="请输入支付宝账号">
      </div>
      <div class="ture_name zhiPay_line">
        <h3>支付宝姓名:</h3>
        <input type="text" v-model='payee' placeholder="请填写支付宝实名认证的姓名">
      </div>
    </div>
    <h5 class="set_zhiPay_tip">温馨提示:支付宝账户一旦绑定将无法再进行修改</h5>
    <button id="save_btn" @click="saveInfo">保存</button>
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
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      alipayId: '',
      payee: '',
      warn_content: '',
      warn_type: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.showCloseBtn('yes')
    _this.showRightBtn('no')
    _this.changeTitle('绑定支付宝')
    _this.userid = window.localStorage.getItem('userid')
    _this.token = window.localStorage.getItem('token')
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
    saveInfo: function() {
      if (this.alipayId == '' && this.payee == '') {
        this.showWarnTips('请将信息填写完整')
      } else {
        let _this = this
        let url = _this.url
        console.log(_this.userid)
        let data = {
          userid: _this.userid,
          token: _this.token,
          Infversion: _this.Infversion,
          alipayId: _this.alipayId,
          payee: _this.payee,
          Method: 'SaveUserAlipayInfoWap'
        }
        _this.$apiPost(
          url,
          data,
          res => {
            // 成功
            console.log(res)
            _this.showWarnTips('保存成功')
            this.$router.back(-1)
          },
          res => {
            // 失败
            _this.showWarnTips(res.msg.substr(2))
          }
        )
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
body {
  background-color: #f7f7f7;
  padding-top: 0.3rem;
}
/* 支付宝 */
.zhiPay_info {
  width: 100%;
  background-color: #fff;
}
.zhiPay_info .zhiPay_line {
  width: 100%;
  height: 1.08rem;
  border-bottom: 1px solid #eaeaea;
  padding-left: 0.3rem;
  position: relative;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.zhiPay_info .zhiPay_line h3 {
  font-size: 0.36rem;
  line-height: 1.08rem;
  color: #333333;
  float: left;
}
.zhiPay_info .zhiPay_line input {
  height: 1.05rem;
  padding-top: 0.04rem;
  padding-left: 0.1rem;
  font-size: 0.3rem;
  outline: none;
  border: none;
  width: 70%;
  float: right;
}
.set_wecat_tip {
  margin-top: 0.3rem;
  font-size: 0.28rem;
  color: #ff5443;
  padding-left: 0.3rem;
}
.set_zhiPay_tip {
  margin-top: 0.3rem;
  font-size: 0.28rem;
  color: #ff5443;
  padding-left: 0.3rem;
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
/* 常见问题 */
.set_question {
  font-size: 0.3rem;
  padding-left: 0.3rem;
  margin-bottom: 0.23rem;
  color: #333333;
}
.question_box {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
}
.question_box .question_title {
  width: 100%;
  height: 0.78rem;
  font-size: 0.28rem;
  position: relative;
  padding-left: 0.28rem;
  line-height: 0.78rem;
  color: #333333;
}
.question_box em {
  width: 0.5rem;
  height: 0.34rem;
  position: absolute;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -8.88rem -2.5rem;
  top: calc(0.22rem);
  right: 0.2rem;
}
.question_box .hide_tips {
  background-position: -8.03rem -2.5rem;
}
.question_box .question_content {
  margin-top: 0.22rem;
  padding: 0 0.4rem 0.28rem 0.28rem;
}
.question_box .question_content p {
  font-size: 0.26rem;
  line-height: 0.3rem;
  color: #777;
  margin-bottom: 0.15rem;
}
</style>
