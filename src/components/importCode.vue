<template>
  <div v-title="$route.meta.title">
    <div class="bigbody">
      <div class="mybody">
        <h3>输入好友邀请码</h3>
        <h2>您就可以领取红包啦</h2>
        <div class="inputbox">
          <input type="number" placeholder="请输入邀请码" v-model="ggc">
        </div>
        <div class="button_box">
          <a href="javascript:;" @click="getRedbag">领取红包</a>
          <p>您可以向您的推荐人询问邀请码</p>
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
      ggc: '',
      appv: '',
      warn_content: '',
      warn_type: 0,
      flag: true,
      judge: ''
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    // 获取localStorage
    _this.judge = window.localStorage.getItem('judge')
    if (_this.judge !== '0') {
      // 从链接中获取judge值
      _this.judge = _this.$getHashParameter('judge')
    }
    // 判断是否在师徒模块中进入此页面
    if (_this.judge === '1') {
      // 菜单中进入此页面 从链接中截取参数
      _this.userid = _this.$getHashParameter('userid')
      _this.token = _this.$getHashParameter('token')
      _this.appv = _this.$getHashParameter('infversionApp')
    } else {
      // 从localStorage中获取参数
      _this.userid = window.localStorage.getItem('userid')
      _this.token = window.localStorage.getItem('token')
      _this.appv = window.localStorage.getItem('appv')
    }
    _this.showLeftBtn('yes')
    _this.changeTitle('输入邀请码')
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
    //showLeftBtn 显示和关闭App返回箭头
    showLeftBtn: function(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showLeftBtn.postMessage(type)
      } else {
        window.taskCentre.showLeftBtn(type)
      }
    },
    getRedbag: function() {
      if (this.flag) {
        let _this = this
        _this.flag = false
        let url = _this.url
        let data = {
          userid: _this.userid,
          token: _this.token,
          ggc: _this.ggc,
          appv: _this.appv,
          Infversion: _this.Infversion,
          Method: 'AcceptTeacherWap'
        }
        _this.$apiPost(
          url,
          data,
          res => {
            _this.flag = true
            // 成功
            console.log(res)
            _this.warn_type = 1
            _this.warn_content = '领取成功'
            setTimeout(() => {
              _this.warn_type = 0
              if (_this.judge !== '1') {
                this.$router.back(-1)
              } else {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                  window.webkit.messageHandlers.closeRootVC.postMessage('')
                } else {
                  window.taskCentre.closeRootVC()
                }
              }
            }, 2000)
          },
          err => {
            _this.flag = true
            // 失败
            console.log(err)
            _this.warn_type = 1
            _this.warn_content = err.msg
            setTimeout(() => {
              _this.warn_type = 0
            }, 2000)
          }
        )
      }
    }
  }
}
</script>
<style scoped>
.bigbody {
  background-color: #df554b;
  height: 15rem;
}
.mybody {
  width: 100%;
  height: 6rem;
  background: url(../assets/images/icon_5@2x.png) no-repeat;
  background-size: 100%;
  padding-top: 0.6rem;
  text-align: center;
}
.mybody h3 {
  font-size: 0.52rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.26rem;
}
.mybody h2 {
  font-size: 0.52rem;
  color: #fff;
  font-weight: 700;
}
.mybody .inputbox {
  width: 6rem;
  height: 1.8rem;
  text-align: center;
  background-color: #f0f0f0;
  margin: 1.05rem auto 0;
  padding: 0.25rem;
}
.mybody .inputbox input {
  width: 5.55rem;
  height: 1.18rem;
  padding: 0.35rem 0.6rem;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  outline: none;
  color: #2ab524;
  text-align: center;
  font-size: 0.46rem;
  text-decoration: underline;
}
.button_box {
  width: 100%;
  margin: 2.47rem auto 0;
  text-align: center;
}
.button_box a {
  display: inline-block;
  width: 4.83rem;
  height: 1.17rem;
  font-size: 0.52rem;
  background-color: #fcddae;
  color: #de7a02;
  text-align: center;
  line-height: 1.17rem;
  border-radius: 30px;
  font-weight: 700;
}
.button_box p {
  margin-top: 0.37rem;
  font-size: 0.36rem;
  color: #fff;
}
</style>
