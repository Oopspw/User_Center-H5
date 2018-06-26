<template>
  <div v-title="$route.meta.title">
    <div class="openTips" v-if="inform !== '1'">
      <h3>开启到时提醒,第一时间抢红包</h3>
      <button @click="openInform('16')">立即开启</button>
    </div>
    <!-- 宣传栏 -->
    <div class="bannars">
      <div class="getStock"  v-if="redRainStatus === '0'" @click="showShare()">获取入场劵</div>
      <div class="getStock"  v-else-if="redRainStatus === '1'" @click="joinRedRain()">立即入场</div>
      <h3>红包雨已累计送出:</h3>
      <h1>{{ totalgold }}<span>金币</span></h1>
      <div class="countdowntime"  v-if="redRainStatus === '0'">
        <span class="words">距下一场还有</span>
        <span class="times hours">{{hour}}</span> :
        <span class="times mins">{{minute}}</span> :
        <span class="times secends">{{second}}</span>
        <span class="words">开始</span>
      </div>
      <div class="countdowntime"  v-if="redRainStatus === '1'">
        <span class="words">距本场还有</span>
        <span class="times hours">{{ehour}}</span> :
        <span class="times mins">{{eminute}}</span> :
        <span class="times secends">{{esecond}}</span>
        <span class="words">结束</span>
      </div>
    </div>
    <div class="speaceHold"></div>
    <!-- 分享获取入场劵方法 -->
    <div class="shareStocks">
      <div class="wechatFriend" @click="shareChannel(0)">
        <h3 class="stockTile">分享获取入场劵</h3>
        <img src="../assets/images/red_packet/icon_wechat_1@2x.png" alt="">
        <p>微信好友</p>
      </div>
      <div class="wechatRing" @click="shareChannel(1)">
        <h3 class="stockTile">入场劵仅剩: {{ stock }} 张</h3>
        <img src="../assets/images/red_packet/icon_Moments_1@2x.png" alt="">
        <p>微信朋友圈</p>
      </div>
    </div>
    <div class="speaceHold"></div>
    <!-- 记录列表 -->
    <div class="historyList">
      <h2 class="historyTitle">近5期记录</h2>
      <ul class="historyUl">
        <li class="historyLi" v-for="(v,index) in historyList">
          <div class="indexs">{{index+1}}</div>
          <div class="contents">
            <h3>红包雨第{{v.phaseid}}期</h3>
            <p><span>{{v.joinusernum}}</span>人瓜分，最多获得<span>{{v.maxgold}}</span>金币</p>
          </div>
          <div class="goldens">{{v.plangold}}</div>
        </li>
      </ul>
    </div>
    <!-- 分享窗口 -->
    <div class="shareWindow" v-if="showThis === 1"  @touchmove.prevent>
      <div class="shareHead">
        <h3>获取入场劵</h3>
        <p><span>1</span>红包雨暂未开始，可先获取入场券</p>
        <p><span>2</span>每次参加红包雨需消耗一张</p>
        <p><span>3</span>送出一张，即可获得一张</p>
        <p><span>4</span>送出越多，积攒越多</p>
      </div>
      <div class="shareStock">
        <div class="wechatFriend" @click="shareChannel(0)">
          <img src="../assets/images/red_packet/icon_wechat_1@2x.png" alt="">
          <p>微信好友</p>
        </div>
        <div class="wechatRing" @click="shareChannel(1)">
          <img src="../assets/images/red_packet/icon_Moments_1@2x.png" alt="">
          <p>微信朋友圈</p>
        </div>
      </div>
      <div class="excBtn" @click="close()">取消</div>
    </div>
    <!-- 分享窗口 -->
    <div class="shareWindow" v-if="showThis === 2"  @touchmove.prevent>
      <div class="shareHead">
        <h3>获取入场劵</h3>
        <p><span>1</span>还没有入场劵,不要着急</p>
        <p><span>2</span>送出一张,即可获得一张</p>
        <p><span>3</span>红包雨疯抢中,分享获得入场劵吧</p>
      </div>
      <div class="shareStock">
        <div class="wechatFriend" @click="shareChannel(0)">
          <img src="../assets/images/red_packet/icon_wechat_1@2x.png" alt="">
          <p>微信好友</p>
        </div>
        <div class="wechatRing" @click="shareChannel(1)">
          <img src="../assets/images/red_packet/icon_Moments_1@2x.png" alt="">
          <p>微信朋友圈</p>
        </div>
      </div>
      <div class="btnBox">
        <div class="showall" @click="close()">返回</div>
        <div class="watche" @click="watchGame()">观战</div>
      </div>
    </div>
    <div class="mask"  v-if="showThis === 1||showThis === 2" @touchmove.prevent></div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      /*  配置信息 */
      url: window.config.api.postUrl,
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      appv: '',
      // platform为手机系统类型 ios android
      platform: '',
      ggc: '',
      inform: '0', //通知是否打开
      totalgold: '',
      historyList: [],
      stock: '', //邀请劵数量
      phaseid: '', //期数
      redpackrainId: '', //红包雨组的id
      plangold: '0',
      // 时间
      begintime: '',
      endtime: '',
      nowtime: '',
      hour: '00',
      minute: '00',
      second: '00',
      ehour: '00',
      eminute: '00',
      esecond: '00',
      inform: '0', //通知是否打开
      redRainStatus: '0', //红包雨开启状态 '0'未开启 '1'开启
      // 红包接龙列表
      datas: {},
      rategold: '',
      userImg: '',
      title: '', //文章标题
      groupname: '', //红包雨群名称
      quantity: '', //红包个数
      nextgold: '', //下一期预发金币
      usernum: '', //人数
      timeStatus: '',
      iswatching: '', //是否观战 1为入场 2为观战
      ticketnum: '', //剩余入场劵数量
      round: '', //轮数
      /* 红包列表接口返回 */
      redPacket: '', //红包的数量
      redPacketList: [],
      // 弹出层显示
      showThis: 0,
      /* 领取的金币数 */
      receivegold: '',
      /* tips */
      // 提示框的内容显示
      warn_type: 0,
      flag: true
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    document.title = '往期战况'
    document.getElementsByTagName('body')[0].className = 'bodyss'
    let _this = this
    // _this.changeTitle('往期战况')
    _this.userid = window.localStorage.getItem('userid')
    _this.token = window.localStorage.getItem('token')
    _this.inform = window.localStorage.getItem('inform')
    _this.appv = window.localStorage.getItem('infversionApp')
    _this.getPhoneType()
    _this.getRedRainPastList()
  },
  methods: {
    // 打开通知
    openInform(jumpNum) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(jumpNum)
      } else {
        window.taskCentre.gofinish(jumpNum)
      }
    },
    //页面标题
    changeTitle: function(title) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.changeTitle.postMessage(title)
      } else {
        window.taskCentre.changeTitle(title)
      }
    },
    //判断手机系统类型
    getPhoneType: function() {
      let _this = this
      let u = navigator.userAgent
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        _this.platform = '1'
      } else {
        _this.platform = '2'
      }
    },
    //分享与App交互的方法
    shareChannel(flag) {
      // 判断是微信分享还是朋友圈分享
      if (flag === 0) {
        // 微信好友分享
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          let data = {}
          data.type = '0'
          data.key = 'ios_redpacket_rain_wxhy_share'
          data.articleid = '-1'
          window.webkit.messageHandlers.shareChannel.postMessage(data)
        } else {
          let type = '0'
          let key = 'android_redpacket_rain_wxhy_share'
          let articleid = '-1'
          window.taskCentre.shareChannel(type, key, articleid)
        }
      } else if (flag === 1) {
        // 微信朋友圈分享
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          let data = {}
          data.type = '0'
          data.key = 'ios_redpacket_rain_wxpyq_share'
          data.articleid = '-1'
          window.webkit.messageHandlers.shareChannel.postMessage(data)
        } else {
          let type = '0'
          let key = 'android_redpacket_rain_wxpyq_share'
          let articleid = '-1'
          window.taskCentre.shareChannel(type, key, articleid)
        }
      }
    },
    // 进入红包房间传递数据给app  区分红包雨和红包接龙
    putPacket(data) {
      let obj = JSON.stringify(data)
      console.log(obj)
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.redPacket.postMessage(obj)
      } else {
        taskCentre.redPacket(obj)
      }
    },
    // 获取我的红包列表
    getRedRainPastList() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        systemtype: _this.platform,
        Infversion: _this.Infversion,
        Method: 'RedRainPastListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          console.log(res)
          _this.totalgold = res.data.totalgold //Math.floor(res.data.totalgold / 10000) + '万'
          _this.historyList = res.data.itemlist
          // 红包雨组的id
          _this.redpackrainId = res.data.redpackraingroupid
          // 期数
          _this.phaseid = res.data.phaseid
          // 剩余入场劵
          _this.stock = res.data.checkinticketnum
          // 本期预发金币
          _this.plangold = res.data.plangold
          _this.userImg = res.data.image
          _this.usernum = res.data.usernum //人数
          _this.title = res.data.title //文章标题
          _this.groupname = res.data.groupname //红包雨群名称
          _this.quantity = res.data.quantity //红包个数
          _this.nextgold = res.data.nextgold //下一期预发金币
          _this.rategold = res.data.rategold //惩罚金币数
          // 字符串转换成Date
          if (
            res.data.redpackrainnowtime === '' &&
            res.data.redpackrainbegintime === '' &&
            res.data.redpackrainendtime === ''
          ) {
            _this.nowtime = 0
            _this.begintime = 0
            _this.endtime = 0
          } else {
            _this.nowtime = new Date(
              Date.parse(res.data.redpackrainnowtime.replace(/-/g, '/'))
            )
            _this.begintime = new Date(
              Date.parse(res.data.redpackrainbegintime.replace(/-/g, '/'))
            )
            _this.endtime = new Date(
              Date.parse(res.data.redpackrainendtime.replace(/-/g, '/'))
            )
          }
          _this.downTimeFn(_this.nowtime, _this.begintime, _this.endtime)
        },
        err => {
          _this.showWarnTips(err.msg.substr(2))
        }
      )
    },
    // 倒计时
    downTimeFn(nt, bt, et) {
      let _this = this
      let h = 60 * 60 * 1000
      let m = 60 * 1000
      let s = 1000
      // 求出开始时间与当前时间之间的差值
      let short = _this.begintime - _this.nowtime
      // 进行判断 当时间差值小于‘0’时 显示红包雨开始的状态
      short < 0 ? (short = 0) : short
      _this.hour = ('0' + Math.floor(short / h)).slice(-2)
      _this.minute = ('0' + Math.floor((short % h) / m)).slice(-2)
      _this.second = ('0' + Math.floor(((short % h) % m) / s)).slice(-2)
      if (short <= 0) {
        _this.redRainStatus = '1'
      }

      if (short <= 0) {
        _this.redRainStatus = '1'
      }
      // 求出结束时间与当前时间之间的差值
      let eshort = _this.endtime - _this.nowtime
      eshort < 0 ? (eshort = 0) : eshort
      _this.ehour = ('0' + Math.floor(eshort / h)).slice(-2)
      _this.eminute = ('0' + Math.floor((eshort % h) / m)).slice(-2)
      _this.esecond = ('0' + Math.floor(((eshort % h) % m) / s)).slice(-2)
      _this.nowtime = _this.nowtime - 0 + 1000
      if (eshort <= 0) {
        _this.redRainStatus = '0'
      }
      // 利用requestAnimationFrame方法
      // window.requestAnimationFrame(this.downTimeFn)
      setTimeout(this.downTimeFn, 1000)
    },
    // 进入红包雨房间
    joinRedRain() {
      let _this = this
      _this.datas.groupid = _this.redpackrainId
      _this.datas.title = _this.title
      _this.datas.groupname = _this.groupname + '第' + _this.phaseid + '期'
      _this.datas.type = 1
      _this.datas.image = _this.userImg
      _this.datas.gold = _this.plangold
      _this.datas.rategold = _this.rategold //惩罚金币数
      _this.datas.usernum = _this.usernum //人数
      _this.datas.begintime = _this.begintime - 0
      _this.datas.endtime = _this.endtime - 0
      _this.datas.nowtime = _this.nowtime
      _this.datas.timedelay = 100 //延迟时间
      _this.datas.grouptype = '4' //房间类型
      _this.datas.quantity = _this.quantity //红包个数
      _this.datas.emid = 185423286128083380 //环信id
      _this.datas.issolitaire = '0' // 0是红包雨 1是接龙
      _this.datas.nextgold = _this.nextgold //下一轮金币数
      _this.datas.phaseid = _this.phaseid //期数
      _this.datas.isredrain = '0' // 0是红包雨 1是接龙
      // 判断红包雨是否已经开场
      if (this.flag) {
        _this.flag = false
        console.log(11)
        if (_this.redRainStatus === '1') {
          //红包雨已开场
          let url = _this.url
          let data = {
            userid: _this.userid,
            token: _this.token,
            systemtype: _this.platform,
            appv: _this.appv,
            phaseid: _this.phaseid, //期数id
            Infversion: _this.Infversion,
            Method: 'RedRainEntranceWap'
          }
          _this.$apiPost(
            url,
            data,
            res => {
              console.log(res)
              // 根据data判断能否进入房间 不能则显示分享弹框
              if (res.data.state === '1') {
                _this.datas.iswatching = res.data.state //是否观战 1为入场 2为观战
                _this.datas.ticketnum = res.data.ticketnum //剩余入场劵数量
                _this.datas.round = res.data.round //轮数
                _this.datas.nowtime =
                  new Date(
                    Date.parse(res.data.redpackrainnowtime.replace(/-/g, '/'))
                  ) - 0
                console.log(_this.datas.nowtime)
                console.log(_this.datas)
                _this.putPacket(_this.datas)
              } else {
                _this.showThis = 2
                _this.iswatching = res.data.state
                _this.ticketnum = res.data.ticketnum
                _this.round = res.data.round
              }
              _this.flag = true
            },
            err => {
              _this.flag = true
              _this.showWarnTips(err.msg.substr(2))
            }
          )
        } else {
          _this.showThis = 1
          _this.flag = true
        }
      }
    },
    // 观战
    watchGame() {
      if (this.flag) {
        let _this = this
        _this.flag = false
        let datas = {}
        datas.groupid = _this.redpackrainId
        datas.title = _this.title
        datas.groupname = _this.groupname + '第' + _this.phaseid + '期'
        datas.type = 1
        datas.image = _this.userImg
        datas.gold = _this.plangold
        datas.rategold = _this.rategold //惩罚金币数
        datas.usernum = _this.usernum //人数
        datas.begintime = _this.begintime - 0
        datas.endtime = _this.endtime - 0
        datas.nowtime = _this.nowtime
        datas.timedelay = 100 //延迟时间
        datas.grouptype = '4' //房间类型
        datas.quantity = _this.quantity //红包个数
        datas.emid = 185423286128083380 //环信id
        datas.issolitaire = '0' // 0是红包雨 1是接龙
        datas.nextgold = _this.nextgold //下一轮金币数
        datas.phaseid = _this.phaseid //期数
        datas.iswatching = _this.state //是否观战 1为入场 2为观战
        datas.ticketnum = _this.ticketnum //剩余入场劵数量
        datas.round = _this.round //轮数
        datas.isredrain = '0' // 0是红包雨 1是接龙
        _this.showThis = 0
        console.log(datas)
        _this.putPacket(datas)
        _this.flag = true
      }
    },
    showShare() {
      this.showThis = 1
    },
    // 取消
    close() {
      this.showThis = 0
    },
    // 弹框信息
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
@font-face {
  font-family: 'User Index';
  src: url('../common/fonts/userIndex.otf');
}
.bodyss {
  background-color: #fff;
}
.openTips {
  width: 100%;
  height: 0.86rem;
  background: #fdf5e0;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.openTips h3 {
  width: 70%;
  padding-left: 0.3rem;
  font-size: 0.3rem;
  line-height: 0.86rem;
  color: #e54b2f;
}
.openTips button {
  display: block;
  width: 1.63rem;
  height: 0.51rem;
  margin-top: 0.16rem;
  font-size: 0.28rem;
  line-height: 0.51rem;
  border-radius: 0.3rem;
  color: #fff;
  border: none;
  background-color: #fa6511;
  margin-left: 0.2rem;
}
.bannars {
  width: 100%;
  height: 3.45rem;
  background: url('../assets/images/red_packet/backgroud4@2x.png') no-repeat;
  background-size: 100%;
  padding-top: 0.44rem;
  position: relative;
}
.getStock {
  width: 2.1rem;
  height: 0.64rem;
  background-color: #ffe32a;
  font-size: 0.3rem;
  color: #de4e45;
  text-align: center;
  position: absolute;
  top: 0.33rem;
  right: 0;
  border-radius: 0.5rem 0 0 0.5rem;
  line-height: 0.7rem;
}
.bannars h3 {
  font-size: 0.36rem;
  color: #fcf1d3;
  padding-left: 0.3rem;
}
.bannars h1 {
  font-size: 0.62rem;
  color: #fff;
  padding-left: 0.3rem;
  margin-top: 0.56rem;
  font-weight: 700;
}
.bannars h1 span {
  font-size: 0.36rem;
  color: #fff;
  font-weight: 700;
}
.bannars .countdowntime {
  width: 100%;
  font-size: 0.3rem;
  margin-top: 0.4rem;
  padding-left: 0.4rem;
}
.bannars .countdowntime .words {
  font-size: 0.3rem;
  line-height: 0.69rem;
  color: #fef3d3;
}
.bannars .countdowntime .times {
  display: inline-block;
  text-align: center;
  width: 0.58rem;
  height: 0.69rem;
  color: #fff;
  line-height: 0.69rem;
  background-color: #800e16;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
.speaceHold {
  width: 100%;
  height: 0.22rem;
  background-color: #f7f7f7;
}
.shareStocks {
  width: 100%;
  height: 3.37rem;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  padding-top: 0.42rem;
}
.shareStocks .wechatFriend {
  width: 50%;
  text-align: center;
}
.shareStocks .wechatFriend h3 {
  font-size: 0.34rem;
  color: #333333;
  position: relative;
}
.shareStocks .wechatFriend h3::before {
  content: '';
  position: absolute;
  width: 0.08rem;
  height: 0.31rem;
  background-color: #3ca338;
  top: 0;
  left: 0.4rem;
}
.shareStocks .wechatFriend img {
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.51rem;
}
.shareStocks .wechatFriend p {
  font-size: 0.3rem;
  color: #333333;
  margin-top: 0.27rem;
}
.shareStocks .wechatRing {
  width: 50%;
  text-align: center;
}
.shareStocks .wechatRing h3 {
  font-size: 0.34rem;
  color: #e34f33;
}
.shareStocks .wechatRing img {
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.51rem;
}
.shareStocks .wechatRing p {
  font-size: 0.3rem;
  color: #333333;
  margin-top: 0.27rem;
}
.historyList {
  width: 100%;
  height: auto;
  padding: 0 0.3rem 0.6rem;
  overflow-x: hidden;
}
.historyList .historyTitle {
  width: 100%;
  height: 1.2rem;
  color: #333333;
  font-size: 0.32rem;
  line-height: 1.2rem;
  padding-left: 0.28rem;
  border-bottom: 1px solid #eaeaea;
  position: relative;
}
.historyList .historyTitle::before {
  content: '';
  position: absolute;
  width: 0.08rem;
  height: 0.31rem;
  background-color: #3ca338;
  top: 0.42rem;
  left: 0.08rem;
}
.historyList .historyUl {
  width: 100%;
}
.historyList .historyUl .historyLi {
  width: 100%;
  height: 1.53rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.historyList .historyUl .historyLi .indexs {
  width: 5%;
  font-family: 'User Index';
  font-size: 0.32rem;
  color: #aaaaaa;
  line-height: 1.53rem;
}
.historyList .historyUl .historyLi .contents {
  padding-top: 0.35rem;
  padding-left: 0.1rem;
  width: 60%;
}
.historyList .historyUl .historyLi .contents h3 {
  font-size: 0.32rem;
}
.historyList .historyUl .historyLi .contents p {
  margin-top: 0.23rem;
  font-size: 0.28rem;
  color: #999999;
}
.historyList .historyUl .historyLi .contents p span {
  color: #e54b31;
}
.historyList .historyUl .historyLi .goldens {
  width: 35%;
  font-size: 0.32rem;
  color: #3bb234;
  line-height: 1.53rem;
  text-align: end;
  padding-right: 0.3rem;
  position: relative;
}
.historyList .historyUl .historyLi .goldens::after {
  content: '';
  position: absolute;
  width: 0.2rem;
  height: 0.3rem;
  background: url('../assets/images/red_packet/icon3@2x.png') no-repeat;
  background-size: 100%;
  top: 0.65rem;
  right: 0;
}
.shareWindow {
  width: 6.17rem;
  background-color: #ffffff;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 0.2rem;
}

.shareWindow .shareHead {
  width: 100%;
  margin-top: -0.4rem;
  background: url('../assets/images/red_packet/backgroud2@2x.png') no-repeat;
  background-size: 100% 100%;
  background-position-y: -0.1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}
.shareWindow .shareHead h3 {
  font-size: 0.46rem;
  color: #fff;
  text-align: center;
  margin-bottom: 0.5rem;
}
.shareWindow .shareHead p {
  position: relative;
  padding-left: 1rem;
  padding-right: 0.6rem;
  font-size: 0.36rem;
  line-height: 0.6rem;
  color: #ffffff;
}
.shareWindow .shareHead p span {
  position: absolute;
  width: 0.34rem;
  height: 0.34rem;
  top: 0.14rem;
  left: 0.6rem;
  display: inline-block;
  background: #fff;
  color: #ff5944;
  font-size: 0.24rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.34rem;
  margin-right: 0.1rem;
}
.shareWindow .excBtn {
  width: 100%;
  height: 1.14rem;
  background-color: #e7e7e7;
  text-align: center;
  font-size: 0.34rem;
  line-height: 1.14rem;
  color: #333333;
  margin-top: 0.21rem;
  border-radius: 0 0 0.2rem 0.2rem;
  letter-spacing: 4px;
}
.shareWindow .btnBox {
  width: 100%;
  background-color: #e7e7e7;
  text-align: center;
  line-height: 1.14rem;
  margin-top: 0.21rem;
  color: #333333;
  border-radius: 0 0 0.2rem 0.2rem;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.shareWindow .btnBox .showall {
  width: 50%;
  height: 1.14rem;
  background-color: #e7e7e7;
  text-align: center;
  font-size: 0.34rem;
  line-height: 1.14rem;
  color: #333333;
  border-radius: 0 0 0 0.2rem;
  border-right: 1px solid #d6d6d6;
}
.shareWindow .btnBox .watche {
  width: 50%;
  height: 1.14rem;
  background-color: #e7e7e7;
  text-align: center;
  font-size: 0.34rem;
  line-height: 1.14rem;
  color: #e54b31;
  border-radius: 0 0 0.2rem 0;
}
.shareStock {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.shareStock .wechatFriend {
  width: 50%;
  text-align: center;
}
.shareStock .wechatFriend h3 {
  font-size: 0.34rem;
  color: #333333;
  position: relative;
}
.shareStock .wechatFriend h3::before {
  content: '';
  position: absolute;
  width: 0.08rem;
  height: 0.31rem;
  background-color: #3ca338;
  top: 0;
  left: 0.4rem;
}
.shareStock .wechatFriend img {
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.51rem;
}
.shareStock .wechatFriend p {
  font-size: 0.3rem;
  color: #333333;
  margin-top: 0.1rem;
}
.shareStock .wechatRing {
  width: 50%;
  text-align: center;
}
.shareStock .wechatRing h3 {
  font-size: 0.34rem;
  color: #e34f33;
}
.shareStock .wechatRing img {
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.51rem;
}
.shareStock .wechatRing p {
  font-size: 0.3rem;
  color: #333333;
  margin-top: 0.1rem;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 66;
  top: 0;
}
</style>
