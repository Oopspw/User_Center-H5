<template>
  <div v-title="$route.meta.title">
    <nav class="clearfix nav_box">
      <div v-for="(item, index) in exchangetype" @click="selected(item.exchange_type,index)" :class="select==item.exchange_type?'select':''" class="exchange_box">
        <h4>{{item.exchange_type_name}}</h4>
      </div>
    </nav>
    <div v-if="select=='wechat'" id="wecat">
      <!-- 设置账号 -->
      <!-- 要求用户绑定微信账号 -->
      <div @click="setWeChat" class="setInfo" v-if="exchangemethod=='1'&&wechatFlag == '0'">
        <div class="wecat_icon"></div>
        <h4>您尚未设置微信账号</h4>
        <!-- <span>去绑定</span> -->
        <em></em>
      </div>
      <!-- 要求用户绑定微信公众号 -->
      <div @click="setWeChat" class="setInfo" v-else-if="exchangemethod=='0'&&gzhisauth == '0'">
        <div class="wecat_icon"></div>
        <h4>您尚未设置微信公众号</h4>
        <!-- <span>去绑定</span> -->
        <em></em>
      </div>
      <!-- 显示账号 -->
      <div class="setInfo" v-else>
        <img class="wecat_icon2" v-if="wechatImg !== ''" :src="wechatImg">
        <div class="default_img" v-else> </div>
        <h4>{{wechatName}}</h4>
      </div>
      <div class="banners" @click="jumpTottz()" v-if="ttFlag>=7.2">
        <img src="../assets/images/banner.jpg" alt="">
      </div>
      <!-- 选择提现金额 -->
      <div class="choose_sum">
        <div v-for="(item, index) in wechatList" :class="wxMoneySelect==index?'choose_this':''" class="choose_box" @click="wxChoose(item.amount,item.disgold,index)">{{item.amount}}元</div>
      </div>

      <!-- 温馨提示 -->
      <div class="guaTip">
        <h3>温馨提示：</h3>
        <p v-html="intro">{{intro}}</p>
      </div>
    </div>

    <div v-if="select=='alipay'" id="zhiPay">
      <!-- 设置账号 -->
      <div @click="setAliPay" class="setInfo" v-if="alipayId == ''">
        <div class="zhiPay_icon"></div>
        <h4>您尚未设置支付宝账号</h4>
        <em></em>
      </div>
      <!-- 显示账号 -->
      <div class="setInfo" v-else>
        <div class="zhiPay_icon zhiPay_icon2"></div>
        <h4>{{alipayId}}&nbsp;{{alipayName}}</h4>
      </div>

      <div class="banners" @click="jumpTottz()" v-if="ttFlag>=7.2">
        <img src="../assets/images/banner.jpg" alt="">
      </div>
      <!-- 选择提现金额 -->
      <div class="choose_sum">
        <div v-for="(item, index) in alipayList" :class="zfbMoneySelect==index?'choose_this':''" class="choose_box" @click="zfbChoose(item.amount,item.disgold,index)">{{item.amount}}元</div>
      </div>

      <!-- 温馨提示 -->
      <div class="guaTip">
        <h3>温馨提示：</h3>
        <p v-html="intro">{{intro}}</p>
      </div>
    </div>

    <div v-if="select=='huafei'" id="phone">
      <!-- 设置、显示账号 -->
      <div class="setInfo">
        <div class="phone_icon"></div>
        <input type="text" v-model="telphone" v-on:input='switchPhone' placeholder="请输入您的手机号码" maxlength="11">
        <!-- <em></em> -->
      </div>
      <div class="banners" @click="jumpTottz()" v-if="ttFlag>=7.2">
        <img src="../assets/images/banner.jpg" alt="">
      </div>
      <!-- 选择提现金额 -->
      <div class="choose_sum" id="cmcc">
        <div v-for="(item, index) in phoneList " :class="phoneMoneySelect==index? 'choose_this': '' " class="type_Box cmcc_box " @click="phoneChoose(item.amount,item.disgold,index)" v-if="item.isp=='1'">{{item.amount}}元</div>
      </div>
      <div class="choose_sum" id="cucc">
        <div v-for="(item, index) in phoneList " :class="phoneMoneySelect==index? 'choose_this': '' " class="type_Box cucc_box " @click="phoneChoose(item.amount,item.disgold,index)" v-if="item.isp=='2'">{{item.amount}}元</div>
      </div>
      <div class="choose_sum" id="ctcc">
        <div v-for="(item, index) in phoneList " :class="phoneMoneySelect==index? 'choose_this': '' " class="type_Box ctcc_box " @click="phoneChoose(item.amount,item.disgold,index)" v-if="item.isp=='3'">{{item.amount}}元</div>
      </div>

      <!-- 温馨提示 -->
      <div class="guaTip " v-if="telphone!==''">
        <h3>温馨提示：</h3>
        <p v-html="intro">{{intro}}</p>
      </div>
    </div>

    <!-- 余额 固定不动 -->
    <div class="nullbox ">
    </div>
    <div class="balance ">
      <h2>当前余额 ：
        <span>{{balancegold}}金币</span>
      </h2>
      <div class="footer">
        <h3>兑换总计：
          <span>{{total}}金币</span>
        </h3>
        <button id="exchange_btn" @click='tipShow' v-if="btn_flag ==true">立即兑换</button>
        <button id="notex_btn" v-else @click='nobindTip'>立即兑换</button>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" v-if="tipIsShow"></div>
    <!-- 弹框提示 -->
    <div class="alert_tip" v-if="tipIsShow">
      <p v-if="select=='wechat'">{{wechatName}}兑换{{selectMoney}}元</p>
      <p v-else-if="select=='alipay'">{{alipayName}}兑换{{selectMoney}}元</p>
      <p v-else-if="select=='huafei'">{{telphone}}充值话费{{selectMoney}}元</p>
      <h3>-{{total}}金币</h3>
      <div class="alert_btnbox">
        <div id="cancel" @click='delDh'>取消</div>
        <div id="confirm" @click='Saveexchange'>确认兑换</div>
      </div>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <div class="jumpMask" v-if="maskShow"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import Vue from 'Vue'
import tip from 'components/tip'
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      userid: '',
      token: '', //c814c290-f084-4b30-9e3f-6caf0ba0f0a4
      appv: '',
      // platform为手机系统类型 ios android
      platform: '',
      //接口版本号
      Infversion: window.config.api.Infversion,
      // 兑换类型
      exchangetype: [{ exchange_type_name: '', exchange_type: '' }],
      select: '',
      wechatName: '',
      wechatImg: '',
      //微信兑换接口data数组
      wechatList: [],
      //微信提现方式
      exchangemethod: '',
      //公众号是否绑定
      gzhisauth: '',
      //微信是否绑定授权
      wechatFlag: '',
      alipayName: '',
      alipayId: '',
      //支付宝兑换接口data数组
      alipayList: [],
      //话费兑换接口data数组
      phoneList: [],
      wxMoneySelect: 0,
      zfbMoneySelect: 0,
      phoneMoneySelect: 0,
      //用户当前余额
      balancegold: 0,
      total: 0,
      //用户手机号码
      telphone: '',
      //提示信息
      intro: '',
      //运营商类型
      ispType: '',
      //提示框的判断值，默认隐藏
      tipIsShow: false,
      //保存当前被选中的金额
      selectMoney: '',
      //提交按钮的状态
      btn_flag: false,
      //兑换类型
      mytype: '',
      warn_content: '',
      warn_type: 0,
      flag: true,
      jumpIndex: 0,
      maskShow: true,
      ttFlag: ''
    }
  },
  components: { tip },
  computed: function() {},
  updated: function() {},
  mounted: function() {
    let _this = this
    document.title = '我要兑换'
    // 截取参数
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.appv = _this.$getHashParameter('infversionApp')
    _this.jumpIndex = window.localStorage.getItem('jumpIndex')
    _this.ttFlag = _this.appv * 1
    _this.getPhoneType()
    _this.getExchangeType()
    _this.showCloseBtn('no')
    _this.showRightBtn('yes')
    _this.changeTitle('我要兑换')
    window.localStorage.setItem('userid', _this.userid)
    window.localStorage.setItem('appv', _this.appv)
    window.localStorage.setItem('token', _this.token)
    window['clearMe'] = function() {
      localStorage.clear()
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
    //话费弹出框弹出取消点击事件
    delDh: function() {
      this.tipIsShow = false
    },
    //点击立即兑换显示话费兑换弹出框
    tipShow: function() {
      this.tipIsShow = true
    },
    //判断手机系统类型
    getPhoneType: function() {
      let _this = this
      let u = navigator.userAgent
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        _this.platform = 'ios'
      } else {
        _this.platform = 'android'
      }
    },
    //导航栏选项
    selected: function(num, index) {
      let _this = this
      //在这里赋值回退时默认点击的序号
      _this.jumpIndex = index
      if (num === 'wechat') {
        _this.select = 'wechat'
        _this.getWechatExInfo()
        $('#cmcc').show()
        $('#cucc').show()
        $('#ctcc').show()
      } else if (num === 'alipay') {
        _this.select = 'alipay'
        _this.getAlipayExInfo()
        $('#cmcc').show()
        $('#cucc').show()
        $('#ctcc').show()
      } else if (num === 'huafei') {
        _this.select = 'huafei'
        _this.getHuaFeiExInfo()
      } else if (num === 'kdbshop') {
        _this.select = 'kdbshop'
        _this.getShopWay()
      }
    },
    wxChoose: function(n, g, i) {
      let _this = this
      let disgold = g * 1
      if (disgold === 0) {
        _this.total = n * 1000
      } else {
        _this.total = n * 1000 - disgold
      }
      _this.wxMoneySelect = i
      _this.intro = _this.wechatList[i].intro
      _this.selectMoney = n
    },
    zfbChoose: function(n, g, i) {
      let _this = this
      let disgold = g * 1
      if (disgold === 0) {
        _this.total = n * 1000
      } else {
        _this.total = n * 1000 - disgold
      }
      _this.zfbMoneySelect = i
      _this.intro = _this.alipayList[i].intro
      _this.selectMoney = n
    },
    phoneChoose: function(n, g, i) {
      let _this = this
      let disgold = g * 1
      if (disgold === 0) {
        _this.total = n * 1000
      } else {
        _this.total = n * 1000 - disgold
      }
      _this.phoneMoneySelect = i
      _this.intro = _this.phoneList[i].intro
      _this.selectMoney = n
    },
    setWeChat: function() {
      let _this = this
      //微信提现方式
      window.localStorage.setItem('exchangemethod', _this.exchangemethod)
      //公众号是否绑定
      window.localStorage.setItem('gzhisauth', _this.gzhisauth)
      //微信是否绑定授权
      window.localStorage.setItem('wechatFlag', _this.wechatFlag)
      window.localStorage.setItem('jumpIndex', _this.jumpIndex)
      _this.$router.push('/setwechat')
    },
    setAliPay: function() {
      let _this = this
      window.localStorage.setItem('jumpIndex', _this.jumpIndex)
      _this.$router.push('/setalipay')
    },
    // 获取支付类型
    getExchangeType: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        Infversion: _this.Infversion,
        platform: _this.platform,
        Method: 'QueryUserExchageType'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          // 现有金币
          _this.balancegold = res.data.balancegold
          //兑换类型
          _this.exchangetype = res.data.exchangetype
          // 判断是否只有商城兑换一种类型
          let jumpLength = res.data.exchangetype.length
          let jumpFlag = res.data.exchangetype[0].exchange_type
          if (jumpFlag === 'kdbshop' && jumpLength === 1) {
            _this.getShopWay()
          } else {
            _this.maskShow = false
          }
          //记录从上一页面回退时的导航栏位置
          if (_this.jumpIndex == '' || _this.jumpIndex == null) {
            _this.jumpIndex = 0
          } else {
            _this.jumpIndex = _this.jumpIndex * 1
          }
          setTimeout(function() {
            // 默认选中第一个，获取数据
            $('.exchange_box')[_this.jumpIndex].click()
          }, 100)
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // 获取微信兑换
    getWechatExInfo: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: _this.Infversion,
        Method: 'QueryWechatExchageInfo'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.wechatList = res.data.exchangeinfo
          _this.wechatName = res.data.nickname
          _this.wechatImg = res.data.photo
          _this.wechatFlag = res.data.wechatisauth
          _this.exchangemethod = res.data.exchangemethod
          _this.gzhisauth = res.data.gzhisauth
          if (
            (_this.exchangemethod == '1' && _this.wechatFlag == '0') ||
            (_this.exchangemethod == '0' && _this.gzhisauth == '0')
          ) {
            _this.btn_flag = false
          } else {
            _this.btn_flag = true
          }
          setTimeout(function() {
            // 默认选中第一个，获取数据
            $('.choose_box')[0].click()
          }, 200)
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // 获取支付宝兑换
    getAlipayExInfo: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: _this.Infversion,
        Method: 'QueryAlipayExchageInfo'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.alipayList = res.data.exchangeinfo
          _this.alipayName = res.data.payee
          _this.alipayId = res.data.alipayid
          if (_this.alipayId == '') {
            _this.btn_flag = false
          } else {
            _this.btn_flag = true
          }
          setTimeout(function() {
            // 默认选中第一个，获取数据
            $('.choose_box')[0].click()
          }, 200)
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // 获取话费兑换
    getHuaFeiExInfo: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: _this.Infversion,
        Method: 'QueryHuaFeiExchageInfo'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.phoneList = res.data.exchangeinfo
          _this.telphone = res.data.mobile
          if (_this.telphone == '') {
            $('#cmcc').hide()
            $('#cucc').hide()
            $('#ctcc').hide()
            $('.choose_sum').hide()
            _this.btn_flag = false
          } else {
            _this.btn_flag = true
          }
          var CMCC = /(^((13[4-9]{1})|(147)|(15[0-2]{1})|(15[7-9]{1})|(178)|(18[2-4]{1})|(18[7-8]{1}))\d{8}$)|(^((1703)|(1705)|(1706))\d{7}$)/ //中国移动
          var CUCC = /(^((13[0-2]{1})|(145)|(155)|(156)|(171)|(175)|(176)|(185)|(186))\d{8}$)|(^(170[7-9]{1})\d{7}$)/ //中国联通
          var CTCC = /(^((133)|(149)|(153)|(173)|(177)|(180)|(181)|(189)|(199))\d{8}$)|(^(170[0-2]{1})\d{7}&)/ //中国电信
          //var phoneType = "其他";
          if (CMCC.test(_this.telphone)) {
            _this.ispType = 1
            $('#cmcc').show()
            $('#cucc').hide()
            $('#ctcc').hide()
            // 默认选中第一个，获取数据
            setTimeout(function() {
              $('.cmcc_box')[0].click()
            }, 200)
          } else if (CUCC.test(_this.telphone)) {
            _this.ispType = 2
            $('#cmcc').hide()
            $('#cucc').show()
            $('#ctcc').hide()
            // 默认选中第一个，获取数据
            setTimeout(function() {
              $('.cucc_box')[0].click()
            }, 200)
          } else if (CTCC.test(_this.telphone)) {
            _this.ispType = 3
            $('#cmcc').hide()
            $('#cucc').hide()
            $('#ctcc').show()
            // 默认选中第一个，获取数据
            setTimeout(function() {
              $('.ctcc_box')[0].click()
            }, 200)
          }
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    getShopWay: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        Infversion: _this.Infversion,
        Method: 'ShoppingIndexWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          if (res.data.returnUrl === '') {
            this.warn_type = 1
            this.warn_content = '跳转路径出错'
            setTimeout(() => {
              this.warn_type = 0
            }, 2000)
          } else {
            window.location.href = res.data.returnUrl
          }
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    //更改手机号码后的验证
    switchPhone: function() {
      let _this = this
      var CMCC = /(^((13[4-9]{1})|(147)|(15[0-2]{1})|(15[7-9]{1})|(178)|(18[2-4]{1})|(18[7-8]{1}))\d{8}$)|(^((1703)|(1705)|(1706))\d{7}$)/ //中国移动
      var CUCC = /(^((13[0-2]{1})|(145)|(155)|(156)|(171)|(175)|(176)|(185)|(186))\d{8}$)|(^(170[7-9]{1})\d{7}$)/ //中国联通
      var CTCC = /(^((133)|(149)|(153)|(173)|(177)|(180)|(181)|(189)|(199))\d{8}$)|(^(170[0-2]{1})\d{7}&)/ //中国电信
      //var phoneType = "其他";
      if (_this.telphone.length == 11) {
        if (CMCC.test(_this.telphone)) {
          _this.ispType = 1
          _this.btn_flag = true
          $('#cmcc').show()
          $('#cucc').hide()
          $('#ctcc').hide()
          setTimeout(function() {
            $('.cmcc_box')[0].click()
          }, 200)
        } else if (CUCC.test(_this.telphone)) {
          _this.ispType = 2
          _this.btn_flag = true
          $('#cmcc').hide()
          $('#cucc').show()
          $('#ctcc').hide()
          setTimeout(function() {
            $('.cucc_box')[0].click()
          }, 200)
        } else if (CTCC.test(_this.telphone)) {
          _this.ispType = 3
          _this.btn_flag = true
          $('#cmcc').hide()
          $('#cucc').hide()
          $('#ctcc').show()
          setTimeout(function() {
            $('.ctcc_box')[0].click()
          }, 200)
        } else {
          // 失败
          _this.showWarnTips('您输入的号码有误')
        }
      }
    },
    //提交兑换
    Saveexchange: function() {
      let _this = this
      if (_this.balancegold >= _this.total) {
        if (_this.flag) {
          _this.flag = false
          let url = _this.url
          let data = {
            userid: _this.userid,
            token: _this.token,
            exchange_type: _this.select,
            money: _this.selectMoney,
            mobile: _this.telphone,
            Infversion: _this.Infversion,
            Method: 'SaveAlipayRecordWap'
          }
          _this.$apiPost(
            url,
            data,
            res => {
              _this.flag = true
              // 成功
              console.log(res)
              window.localStorage.setItem('qq', res.data.qq)
              window.localStorage.setItem('wechat', res.data.qq)
              window.localStorage.setItem('tips', res.data.tips)
              // ios app评分弹框
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                let obj = {}
                obj.appID = res.data.appid
                obj.probability = res.data.showchance
                obj.openPlace = res.data.commendtype
                window.webkit.messageHandlers.showAlertComment.postMessage(obj)
              }
              this.$router.push({ path: '/exchangeSuccess' })
            },
            res => {
              _this.flag = true
              this.tipIsShow = false
              // 失败
              _this.showWarnTips(res.msg.substr(2))
            }
          )
        } else {
          this.tipIsShow = false
          this.warn_type = 1
          this.warn_content = '正在提交操作，请稍后...'
          setTimeout(() => {
            this.warn_type = 0
          }, 2000)
        }
      } else {
        this.tipIsShow = false
        this.warn_type = 1
        this.warn_content = '您的金币余额不足，不能兑换'
        setTimeout(() => {
          this.warn_type = 0
        }, 2000)
        return false
      }
    },
    //没有绑定的时候点击兑换的提示
    nobindTip: function() {
      let _this = this
      _this.warn_type = 1
      if (_this.select == 'wechat') {
        if (_this.exchangemethod == '1' && _this.wechatFlag == '0') {
          _this.warn_content = '请绑定微信'
        } else if (_this.exchangemethod == '0' && _this.gzhisauth == '0') {
          _this.warn_content = '请绑定微信公众号'
        }
      } else if (_this.select == 'alipay') {
        _this.warn_content = '请绑定支付宝'
      }
      setTimeout(() => {
        _this.warn_type = 0
      }, 2000)
      return false
    },
    // 提示框公用方法
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
<style>
body {
  background-color: #f7f7f7;
}
.jumpMask {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 166;
}
nav {
  width: 100%;
  height: 1.01rem;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 0.26rem;
}
nav .exchange_box {
  width: 25%;
  height: 1.01rem;
  float: left;
  text-align: center;
}
nav .exchange_box h4 {
  font-size: 0.36rem;
  line-height: 1.01rem;
  color: #333333;
}
nav .select {
  border-bottom: 0.04rem solid #2ab526;
  color: #2ab526;
}
/* 设置账号 */
.setInfo {
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
  padding: 0 0.47rem;
  margin-bottom: 0.1rem;
  position: relative;
}
.setInfo .wecat_icon {
  float: left;
  width: 0.82rem;
  height: 0.82rem;
  margin: 0.24rem 0.2rem 0 0;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -8.84rem -0.51rem;
}
.default_img {
  float: left;
  width: 0.82rem;
  height: 0.82rem;
  margin: 0.24rem 0.2rem 0 0;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 8.6rem;
  background-position: -3.16rem -4.7rem;
  border-radius: 50%;
}
.setInfo .wecat_icon2 {
  float: left;
  width: 0.82rem;
  height: 0.82rem;
  margin: 0.24rem 0.2rem 0 0;
  border-radius: 50%;
}
.setInfo .zhiPay_icon {
  float: left;
  width: 0.82rem;
  height: 0.82rem;
  margin: 0.24rem 0.2rem 0 0;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -6.73rem -0.53rem;
}
.setInfo .zhiPay_icon2 {
  background-position: -7.74rem -0.53rem;
}
.setInfo .phone_icon {
  float: left;
  width: 0.82rem;
  height: 0.82rem;
  margin: 0.24rem 0.2rem 0 0;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -5.6rem -0.48rem;
}
.setInfo h4 {
  float: left;
  font-size: 0.36rem;
  line-height: 1.3rem;
  color: #333333;
}
.setInfo input {
  border: none;
  float: left;
  font-size: 0.36rem;
  line-height: 1.3rem;
  color: #333333;
}
.setInfo span {
  position: absolute;
  right: 0.3rem;
  width: 1.88rem;
  height: 1.3rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 1.3rem;
  color: #777;
}
.setInfo em {
  position: absolute;
  width: 0.28rem;
  height: 0.37rem;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -10.4rem -2.5rem;
  top: 50%;
  right: 0.47rem;
  transform: translate(-15%, -42%);
  -webkit-transform: translate(-15%, -42%);
}
/* 选择金额 */
.choose_sum {
  width: 100%;
  background-color: #fff;
  margin-bottom: 0.29rem;
  padding-top: 0.32rem;
  padding-left: 0.48rem;
}
.choose_sum .cmcc_box {
  width: 1.85rem;
  height: 1.78rem;
  background-color: #f2f2f2;
  font-size: 0.38rem;
  line-height: 1.78rem;
  text-align: center;
  display: inline-block;
  margin: 0 0.5rem 0.32rem 0;
  color: #333333;
}
.choose_sum .choose_box:nth-child(3n) {
  margin-right: 0;
}
.choose_sum .choose_box {
  width: 1.85rem;
  height: 1.78rem;
  background-color: #f2f2f2;
  font-size: 0.38rem;
  line-height: 1.78rem;
  text-align: center;
  display: inline-block;
  margin: 0 0.5rem 0.32rem 0;
  color: #333333;
}
.choose_sum .cmcc_box:nth-child(3n) {
  margin-right: 0;
}
.choose_sum .cucc_box {
  width: 1.85rem;
  height: 1.78rem;
  background-color: #f2f2f2;
  font-size: 0.38rem;
  line-height: 1.78rem;
  text-align: center;
  display: inline-block;
  margin: 0 0.5rem 0.32rem 0;
  color: #333333;
}
.choose_sum .cucc_box:nth-child(3n) {
  margin-right: 0;
}
.choose_sum .ctcc_box {
  width: 1.85rem;
  height: 1.78rem;
  background-color: #f2f2f2;
  font-size: 0.38rem;
  line-height: 1.78rem;
  text-align: center;
  display: inline-block;
  margin: 0 0.5rem 0.32rem 0;
  color: #333333;
}
.choose_sum .ctcc_box:nth-child(3n) {
  margin-right: 0;
}
.choose_sum .choose_this {
  color: #2bb524;
  background-color: #dff2dc;
}
/* 温馨提示 */
.guaTip {
  width: 100%;
  background-color: #fff;
  margin-bottom: 0.18rem;
  padding: 0.36rem 0.24rem 0.3rem 0.3rem;
}
.guaTip h3 {
  font-size: 0.3rem;
  margin-bottom: 0.3rem;
  color: #333333;
}
.guaTip p {
  font-size: 0.28rem;
  line-height: 0.44rem;
  color: #333333;
}
.guaTip .notice {
  color: #2ab524;
}
.nullbox {
  width: 100%;
  height: 2.28rem;
}
/* 余额 */
.balance {
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  z-index: 88;
}
.balance h2 {
  width: 100%;
  height: 1rem;
  font-size: 0.36rem;
  padding-left: 0.35rem;
  border-bottom: 1px solid #eaeaea;
  line-height: 1rem;
  color: #333333;
}
.balance h2 span {
  color: #28b624;
}
.balance .footer {
  width: 100%;
  height: 1.27rem;
}
.balance .footer h3 {
  float: left;
  font-size: 0.38rem;
  color: #333333;
  line-height: 1.27rem;
  margin-left: 0.35rem;
}
.balance .footer h3 span {
  color: #28b624;
}
.balance .footer #exchange_btn {
  float: right;
  width: 2.02rem;
  height: 0.77rem;
  background-color: #2ab526;
  color: #fff;
  margin-top: 0.25rem;
  margin-right: 0.27rem;
  font-size: 0.32rem;
  line-height: 0.77rem;
  text-align: center;
  outline: none;
  border: none;
}
.balance .footer #notex_btn {
  float: right;
  width: 2.02rem;
  height: 0.77rem;
  background-color: #999999;
  color: #fff;
  margin-top: 0.25rem;
  margin-right: 0.27rem;
  font-size: 0.32rem;
  line-height: 0.77rem;
  text-align: center;
  outline: none;
  border: none;
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
  padding: 0.96rem 0.55rem 1.17rem;
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
  font-size: 0.42rem;
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
#cmcc {
  display: none;
}
#cucc {
  display: none;
}
#ctcc {
  display: none;
}
.banners {
  width: 100%;
}
.banners img {
  width: 100%;
}
</style>
