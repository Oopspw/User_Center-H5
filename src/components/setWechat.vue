<template>
  <div v-title="$route.meta.title">
    <div class="wecat_info">

      <div class="accredit wecat_line" v-if="wechatFlag=='0'" @click="sendInfoToApp('1')">
        <h3>微信授权：</h3>
        <span>去绑定</span>
        <em></em>
      </div>

      <div class="accredit wecat_line" v-else>
        <h3>微信授权：</h3>
        <span class="hasChange">已绑定</span>
      </div>

      <div class="ture_name wecat_line">
        <h3>真实姓名：</h3>
        <input type="text" placeholder="请填写微信实名认证的姓名" v-model="wechat_name">
      </div>

      <div class="p_accredit wecat_line" v-if="exchangemethod=='0'&&gzhisauth=='0'" @click="sendInfoToApp('12')">
        <h3>微信公众号授权</h3>
        <em></em>
      </div>

      <div class="p_accredit wecat_line" v-else-if="exchangemethod=='0'&&gzhisauth=='1'">
        <h3>微信公众号已授权</h3>
        <em></em>
      </div>

      <h5 class=" set_wecat_tip ">温馨提示：微信账户一旦绑定将无法再进行修改</h5>
      <button id="save_btn" @click="saveWechat">保存</button>
      <h4 class="set_question ">微信兑换常见问题:</h4>
      <div class="question_box " @click="showContent(1)">
        <h4 class="question_title ">什么原因会导致微信兑换失败？
          <em class="show_tips " :class="showType== 1 ? 'hide_tips': '' "></em>
        </h4>
        <div class="question_content " v-if="showType== 1 ">
          <p>1. 微信未实名认证，由于微信支付要求实名制，非实名用户账户无法支持提现，请务必将提现微信号进行实名认证！！！</p>
          <p>2. 填写的真实姓名与微信已实名的姓名不一致，会导致兑换失败。</p>
        </div>
      </div>
      <div class="question_box " @click="showContent(2)">
        <h4 class="question_title ">微信如何实名认证？
          <em class="show_tips " :class="showType== 2 ? 'hide_tips': '' "></em>
        </h4>
        <div class="question_content " v-if="showType== 2 ">
          <p @click="getCardWay ">
            <span>方法一：通过验收身份证</span>
          </p>
          <p @click="getBankWay ">
            <span>方法二：通过添加银行卡</span>
          </p>
        </div>
      </div>
      <div class="question_box " @click="showContent(3)">
        <h4 class="question_title ">如何查看微信真实姓名？
          <em class="show_tips " :class="showType== 3 ? 'hide_tips': '' "></em>
        </h4>
        <div class="question_content " v-if="showType== 3 ">
          <p @click="getNameWay ">
            <span>查看微信真实姓名方法</span>
          </p>
        </div>
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
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      wechat_name: '',
      //微信提现方式
      exchangemethod: '',
      //公众号是否绑定
      gzhisauth: '',
      //微信是否绑定授权
      wechatFlag: '',
      showlogout: 0,
      showType: 1,
      warn_content: '',
      warn_type: 0,
      flag: true
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    //获取存储在本地的数据
    _this.userid = window.localStorage.getItem('userid')
    _this.token = window.localStorage.getItem('token')
    _this.exchangemethod = window.localStorage.getItem('exchangemethod')
    _this.gzhisauth = window.localStorage.getItem('gzhisauth')
    _this.wechatFlag = window.localStorage.getItem('wechatFlag')
    window['changStatus'] = () => {
      this.wechatFlag = '1'
    }
    _this.changeTitle('绑定微信')
    _this.showCloseBtn('yes')
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
    },
    //跳转至原生页面的方法
    sendInfoToApp: function(jumpNum) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(jumpNum)
      } else {
        taskCentre.gofinish(jumpNum)
      }
    },
    saveWechat: function() {
      if (this.flag == false) {
        this.showWarnTips('正在提交操作，请稍后...')
        return false
      } else {
        this.flag == false
        if (this.wechat_name == '') {
          this.showWarnTips('请将信息填写完整')
        } else {
          let _this = this
          let url = _this.url
          let data = {
            userid: _this.userid,
            token: _this.token,
            wusername: _this.wechat_name,
            Infversion: _this.Infversion,
            Method: 'SaveUserWechatNameWap'
          }
          _this.$apiPost(
            url,
            data,
            res => {
              // 成功
              console.log(res)
              _this.flag == true
              _this.showWarnTips('保存成功')
              _this.flag == true
              this.$router.back(-1)
            },
            res => {
              // 失败
              _this.flag == true
              _this.showWarnTips(res.msg.substr(2))
            }
          )
        }
      }
    },
    getBankWay: function() {
      let _this = this
      _this.$router.push('./bank')
    },
    getCardWay: function() {
      let _this = this
      _this.$router.push('./card')
    },
    getNameWay: function() {
      let _this = this
      _this.$router.push('./name')
    },
    showContent: function(num) {
      let _this = this
      _this.showType = num
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
/* 微信 */
.wecat_info {
  width: 100%;
  background-color: #fff;
}
.wecat_info .wecat_line {
  width: 100%;
  height: 1.08rem;
  border-bottom: 1px solid #eaeaea;
  padding-left: 0.3rem;
  position: relative;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.wecat_info .wecat_line h3 {
  font-size: 0.36rem;
  line-height: 1.08rem;
  color: #333333;
  float: left;
}
.wecat_info .wecat_line input {
  height: 1.05rem;
  font-size: 0.3rem;
  float: right;
  outline: none;
  border: none;
  width: 70%;
}
.wecat_info .wecat_line span {
  position: absolute;
  top: 0;
  right: 0.08rem;
  width: 1.88rem;
  height: 1.08rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 1.08rem;
  color: #777;
}
.wecat_info .wecat_line .hasChange {
  color: #2ab526;
}
.wecat_info .wecat_line em {
  position: absolute;
  width: 0.28rem;
  height: 0.37rem;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -10.4rem -2.5rem;
  top: 0.38rem;
  right: 0.2rem;
}
.set_wecat_tip {
  margin-top: 0.3rem;
  font-size: 0.28rem;
  color: #ff5443;
  padding-left: 0.3rem;
}
/* 常见问题 */
.set_question {
  font-size: 0.3rem;
  padding-left: 0.3rem;
  margin-bottom: 0.23rem;
  color: #333333;
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
.question_box .show_tips {
  width: 0.5rem;
  height: 0.34rem;
  position: absolute;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -8.03rem -2.5rem;
  top: calc(0.22rem);
  right: 0.2rem;
}
.question_box .hide_tips {
  background-position: -8.88rem -2.5rem;
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
.question_box .question_content p span {
  font-size: 0.26rem;
  color: #2ab526;
  text-decoration: underline;
}
</style>
