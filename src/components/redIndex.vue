<template>
  <div v-title="$route.meta.title">
    <div class="openTips" v-if="inform !== '1'">
      <h3>开启到时提醒,第一时间抢红包</h3>
      <button @click="openInform('16')">立即开启</button>
    </div>
    <!-- 宣传栏 -->
    <div class="bannar">
      <!-- 期数 -->
      <h2 class="phase">第{{phaseid}}期</h2>
    <!-- 红包雨总金币 -->
    <!-- 判断红包雨的状态进行区分显示 redRainStatus -->
      <div class="allGold" v-if="redRainStatus === '1'">
        {{ plangold }}
        <span>金币</span>
      </div>
      <div class="unstartGold" v-else>
        <span>本场将送出</span>
        <span class="goldnum">{{ plangold }}</span>
        <span>金币</span>
      </div>
      
      
    <!-- 红包雨状态 -->
      <h3 class="status" v-if="redRainStatus === '1'">正在疯抢中......</h3>
      <div class="countdowntime" v-else>
        <span class="words">还有</span>
        <span class="times hours">{{hour}}</span> :
        <span class="times mins">{{minute}}</span> :
        <span class="times seconds">{{second}}</span>
        <span class="words">开始</span>
      </div>
    <!-- 往期战况 -->
      <p class="A_history" @click="goHistoryLog">往期战况 </p>
      <div class="joinBtn"  v-if="redRainStatus === '0'" @click="joinRedRain">获取入场劵</div>
      <div class="joinBtn"  v-if="redRainStatus === '1'" @click="joinRedRain">立即入场</div>
    </div>
    <!-- 入场券和邀请码 -->
    <div class="redBox_one">
      <!-- 入场劵数量  判断是否为0 -->
      <p class="cade">入场劵仅剩 {{stock}} 张</p>
      <!-- 点击复制功能 -->
          <div class="mycode" @click="copyCode(ggc)">我的邀请码:{{ ggc }}</div>
    </div>

    <h3 class="titleBox">我的红包</h3>
    <div class="lineMask">
        <!-- 角标 -->
        <div class="redNum" v-if="redPacket !==''&&redPacket !=='0'&&redPacket !== 0">{{ redPacket }}</div>
        <!-- 一键领取功能 -->
        <div class="getPacket" v-if="redPacket !==''&&redPacket !=='0'&&redPacket !== 0" @click="getPacket('-1')">一键领取</div>
    </div>
    <div class="redBox_two">
    <!-- 判断 分享或者显示具体红包数量 跳转至任务中心 -->
        <div class="shareRed" v-if="redPacket ==='0'"  @click="openInform('11')">
          <p>红包钱袋是空的</p>
          <h4>立即做任务赚取金币</h4>
        </div>
        <div class="joinStock" v-for="(v,key) in redPacketList" :key="key"  @click="getPacket(v.redpacketid)">
            <div class="joinStockLeft">
              <h3 class="stockGold">{{v.gold}}<span>金币</span></h3>
              <h4 class="stockType">{{v.rewardcontent}}</h4>
              <h4 class="timeStatus status1" v-if="timeStatus === 1">{{v.effectivetime}}</h4>
              <h4 class="timeStatus status2" v-else-if="timeStatus === 2">{{v.effectivetime}}</h4>
              <h4 class="timeStatus status3" v-else>{{v.effectivetime}}</h4>
            </div>
            <div class="joinStockRight">
              <p>立即领取</p>
            </div>
            <!-- 分界线 -->
            <ul class="lineUl">
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
              <li class="lineLi"></li>
            </ul>
        </div>
    </div>
    <h3 class="titleBox">红包接龙</h3>
    <div class="lineMask"></div>
    <!-- 红包接龙房间入口 选项卡切换效果 -->
    <div class="redPacketRoom">
      <div class="left" @click="goLeft"></div>
      <div class="roomBox">
        <ul class="roomUl">
          <li class="roomLi" v-for="(v,index) in roomList" @click="goToRoom(roomList[index])">
            <h3>{{ v.groupname }}</h3>
          </li>
        </ul>
      </div>
    <div class="right" @click="goRight"></div>
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
    <!-- 获得金币窗口 -->
    <div class="goldWindow" @touchmove.prevent v-if="showThis === 3">
      <div class="goldHead"></div>
      <img src="../assets/images/red_packet/icon4@2x.png" alt="">
      <h3>{{ receivegold }}<span>金币</span></h3>
      <div class="goldFoot">
        <!-- 跳转至收入明细页面 -->
        <div class="left" @click="openInform('17')">查看详情</div>
        <div class="right" @click="close">确定</div>
      </div>
    </div>
    <div class="mask"  v-if="showThis !== 0" @touchmove.prevent></div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      /*  配置信息 */
      url: window.config.api.postUrl,
      Infversion: window.config.api.Infversion,
      userid: '334304',
      token: 'c814c290-f084-4b30-9e3f-6caf0ba0f0a4',
      appv: '7.2',
      // platform为手机系统类型 ios:1 android:2
      platform: '',
      /* 红包雨群组接口返回 */
      ggc: '',
      stock: '', //邀请劵数量
      phaseid: '', //期数
      redpackrainId: '', //红包雨组的id
      plangold: '',
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
      rategold: '',
      // 红包接龙列表
      roomList: [],
      datas: {},
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
      // 偏移值
      position: 0,
      left: 0,
      /* tips */
      // 提示框的内容显示
      warn_type: 0,
      flag: true
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    document.title = '抢红包'
    document.getElementsByTagName('body')[0].className = 'bodys'
    let _this = this
    // _this.changeTitle('抢红包')
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.inform = _this.$getHashParameter('inform')
    _this.appv = _this.$getHashParameter('infversionApp')
    window.localStorage.setItem('userid', _this.userid)
    window.localStorage.setItem('token', _this.token)
    window.localStorage.setItem('inform', _this.inform)
    window.localStorage.setItem('infversionApp', _this.infversionApp)
    _this.getPhoneType()
    // 获取红包群组
    _this.getGroupinfoList()
    // 获取我的红包列表
    _this.getRedPacketList()
    window['changeStatus'] = function() {
      // 隐藏提示开启消息通知栏
      window.localStorage.setItem('inform', '1')
      $('.openTips').hide()
    }
    window['refreshIndex'] = function() {
      // 刷新
      location.reload()
    }
  },
  methods: {
    // 跳转
    openInform(jumpNum) {
      let _this = this
      _this.showThis = 0
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(jumpNum)
      } else {
        window.taskCentre.gofinish(jumpNum)
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
    // 进入接龙房间
    goToRoom(obj) {
      let _this = this
      obj.begintime = 0
      obj.endtime = 0
      obj.nowtime = 0
      obj.isredrain = '1' // 0是红包雨 1是接龙
      _this.putPacket(obj)
    },
    watchGame() {
      if (this.flag) {
        this.flag = false
        let _this = this
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
        datas.iswatching = _this.iswatching //是否观战 1为入场 2为观战
        datas.ticketnum = _this.ticketnum //剩余入场劵数量
        datas.round = _this.round //轮数
        datas.isredrain = '0' // 0是红包雨 1是接龙
        console.log(datas)
        _this.putPacket(datas)
        _this.flag = true
        _this.showThis = 0
      }
    },
    //点击复制我的邀请码 传code给app
    copyCode: function(code) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.copyCode.postMessage(code)
      } else {
        taskCentre.copyCode(code)
      }
    },
    //传递groupid给App
    passValue: function(id) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.passValue.postMessage(id)
      } else {
        taskCentre.passValue(id)
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
    // 金币声音
    goldVoice: function() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.goldVoice.postMessage('')
      } else {
        window.taskCentre.goldVoice()
      }
    },
    // 前往往期记录
    goHistoryLog() {
      this.$router.push('/redHistory')
    },
    // 获取红包群组信息
    getGroupinfoList() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        systemtype: _this.platform,
        Infversion: _this.Infversion,
        Method: 'GetGroupinfoListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 获取res.data之后传递给app端
          let _this = this
          console.log(res)
          // 期数
          _this.phaseid = res.data.phaseid
          // 邀请码
          _this.ggc = res.data.ggc
          // 剩余入场劵
          _this.stock = res.data.checkinticketnum
          // 本期预发金币
          _this.plangold = res.data.plangold
          if (res.data.plangold === '') {
            $('.bannar').hide()
            $('.redBox_one').hide()
            $('.redBox_two').css('max-height', 'none')
          }
          _this.userImg = res.data.image
          _this.usernum = res.data.usernum //人数
          _this.title = res.data.title //文章标题
          _this.groupname = res.data.groupname //红包雨群名称
          _this.quantity = res.data.quantity //红包个数
          _this.nextgold = res.data.nextgold //下一期预发金币
          _this.rategold = res.data.rategold //惩罚金币数
          // 红包雨组的id
          _this.redpackrainId = res.data.redpackraingroupid
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
          // 红包接龙数组
          _this.roomList = res.data.item
          let content = $('.timeStatus').text()
          content = content.substr(-6, 2)
          if (content === '分钟') {
            _this.timeStatus = 3
          } else if (content === '小时') {
            _this.timeStatus = 2
          } else {
            _this.timeStatus = 1
          }
          // 将groupid传递给app
          _this.passValue(res.data.redpackraingroupid)
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
      // console.log(_this.ehour + ':' + _this.eminute + ':' + _this.esecond)
      if (short <= 0) {
        _this.redRainStatus = '1'
      }
      // 结束时间与当前时间之间的差值
      let eshort = _this.endtime - _this.nowtime
      eshort < 0 ? (eshort = 0) : eshort
      _this.ehour = ('0' + Math.floor(eshort / h)).slice(-2)
      _this.eminute = ('0' + Math.floor((eshort % h) / m)).slice(-2)
      _this.esecond = ('0' + Math.floor(((eshort % h) % m) / s)).slice(-2)
      if (eshort <= 0) {
        _this.redRainStatus = '0'
      }
      _this.nowtime = _this.nowtime - 0 + 1000
      setTimeout(this.downTimeFn, 1000)
    },
    // 获取我的红包列表
    getRedPacketList() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        systemtype: _this.platform,
        Infversion: _this.Infversion,
        Method: 'RedPacketListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          console.log(res)
          _this.redPacketList = res.data.item //红包列表
          _this.redPacket = res.data.redpacketnum //红包个数
        },
        err => {
          _this.showWarnTips(err.msg.substr(2))
        }
      )
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
      if (_this.flag) {
        //节流阀
        _this.flag = false
        // 判断红包雨是否已经开场
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
              _this.flag = true
              // 根据data判断能否进入房间 不能则显示分享弹框
              if (res.data.state === '1') {
                _this.datas.iswatching = res.data.state //是否观战 1为入场 2为观战
                _this.datas.ticketnum = res.data.ticketnum //剩余入场劵数量
                _this.datas.round = res.data.round //轮数
                _this.datas.nowtime =
                  new Date(
                    Date.parse(res.data.redpackrainnowtime.replace(/-/g, '/'))
                  ) - 0
                console.log(_this.datas)
                _this.putPacket(_this.datas)
              } else {
                _this.showThis = 2
                _this.iswatching = res.data.state
                _this.ticketnum = res.data.ticketnum
                _this.round = res.data.round
              }
            },
            err => {
              _this.flag = true
              _this.showWarnTips(err.msg.substr(2))
            }
          )
        } else {
          _this.flag = true
          _this.showThis = 1
        }
      }
    },
    // 取消
    close() {
      this.showThis = 0
    },
    // 领取红包
    getPacket(id) {
      if (this.flag) {
        let _this = this
        _this.flag = false
        let url = _this.url
        let data = {
          userid: _this.userid,
          token: _this.token,
          redpacketid: id,
          appv: _this.appv,
          systemtype: _this.platform,
          Infversion: _this.Infversion,
          Method: 'RedPacketReceiveWap'
        }
        _this.$apiPost(
          url,
          data,
          res => {
            // 领取的金币数
            _this.receivegold = res.data.receivegold
            _this.flag = true
            _this.getRedPacketList()
            _this.goldVoice()
            _this.showThis = 3
          },
          err => {
            _this.flag = true
            _this.showWarnTips(err.msg.substr(2))
          }
        )
      }
    },
    // 往左移动
    goLeft() {
      let _this = this
      if (_this.roomList.length > 3) {
        if (_this.position - 3 <= _this.roomList.length && _this.position > 0) {
          _this.position = _this.position - 1
          _this.left = _this.position * -2.06
          $('.roomUl').css('left', _this.left + 'rem')
        }
      }
    },
    // 往右移动
    goRight() {
      let _this = this
      if (_this.roomList.length > 3) {
        if (_this.position + 3 < _this.roomList.length) {
          _this.position = _this.position + 1
          _this.left = _this.position * -2.06
          $('.roomUl').css('left', _this.left + 'rem')
        }
      }
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
<style lang='css'>
.bodys {
  background-color: #f1e2b9;
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
.bannar {
  background: url('../assets/images/red_packet/backgroud@2x.png') no-repeat;
  background-size: 100%;
}
.bannar .phase {
  width: 2.62rem;
  height: 0.58rem;
  font-size: 0.28rem;
  line-height: 0.58rem;
  margin: 0 auto 1.9rem;
  text-align: center;
  color: #e44a30;
}
.bannar .allGold {
  font-size: 1rem;
  color: #fef3d3;
  text-align: center;
  font-weight: 700;
}
.bannar .allGold span {
  font-size: 0.48rem;
  color: #fef3d3;
}
.bannar .unstartGold {
  width: 5.6rem;
  height: 0.83rem;
  margin: 0 auto;
  font-size: 0.62rem;
  color: #d20009;
  text-align: center;
  background: url('../assets/images/red_packet/icon_button3@2x.png') no-repeat;
  background-size: 100%;
  line-height: 0.83rem;
}
.bannar .unstartGold span {
  font-size: 0.32rem;
  font-weight: 700;
}
.bannar .unstartGold .goldnum {
  font-size: 0.62rem;
  font-weight: 700;
}
.bannar .status {
  margin-top: 0.3rem;
  font-size: 0.42rem;
  color: #fff;
  text-align: center;
}
.bannar .countdowntime {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  margin-top: 0.25rem;
}
.bannar .countdowntime .words {
  font-size: 0.3rem;
  line-height: 0.69rem;
  color: #fef3d3;
}
.bannar .countdowntime .times {
  display: inline-block;
  width: 0.58rem;
  height: 0.69rem;
  color: #fff;
  line-height: 0.69rem;
  background-color: #800e16;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
.bannar .A_history {
  font-size: 0.32rem;
  color: #fef3d3;
  text-align: center;
  margin-top: 0.3rem;
  position: relative;
}
.bannar .A_history::after {
  content: '';
  position: absolute;
  width: 0.32rem;
  height: 0.32rem;
  background: url('../assets/images/red_packet/more_1.png') no-repeat;
  background-size: 100%;
}
.bannar .joinBtn {
  width: 3.66rem;
  height: 0.88rem;
  font-size: 0.4rem;
  line-height: 0.88rem;
  color: #fd4744;
  text-align: center;
  background: url('../assets/images/red_packet/icon_button@2x.png') no-repeat;
  background-size: 100%;
  margin: 0.27rem auto 0;
  font-weight: 700;
}
.redBox_one {
  position: relative;
  width: 6.6rem;
  height: 1.22rem;
  background-color: #fff;
  margin: 0.37rem auto 0;
  border-radius: 0.05rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.redBox_one .cade {
  position: relative;
  width: 50%;
  height: 1.22rem;
  font-size: 0.28rem;
  color: #e24b2e;
  line-height: 1.22rem;
  padding-left: 0.85rem;
}
.redBox_one .cade::before {
  content: '';
  position: absolute;
  width: 0.58rem;
  height: 0.58rem;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  background: url('../assets/images/red_packet/icon_ticket@2x.png') no-repeat;
  background-size: 100%;
}
.redBox_one .mycode {
  position: absolute;
  font-size: 0.28rem;
  height: 0.7rem;
  line-height: 0.7rem;
  border: 1px solid #fb9fa2;
  background-color: #fff;
  color: #f73d52;
  text-align: center;
  padding: 0 0.1rem;
  border-radius: 0.1rem;
  right: 0.25rem;
  top: 0.26rem;
}
.titleBox {
  width: 5.4rem;
  height: 0.63rem;
  background-color: #f1e2b9;
  background: url('../assets/images/red_packet/icon_button2@2x.png') no-repeat;
  background-size: 100%;
  font-size: 0.32rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
  line-height: 0.63rem;
  margin: 0.34rem auto 0.2rem;
  position: relative;
}
.lineMask {
  width: 5.8rem;
  height: 0.3rem;
  margin: 0 auto;
  position: relative;
  background: #f1e2b9;
  z-index: 10;
}
.redBox_two {
  width: 6.92rem;
  max-height: 3rem;
  overflow-y: scroll;
  border: 1px solid #fd454f;
  margin: -0.12rem auto 0;
  padding: 0.5rem 0 0.2rem 0;
  position: relative;
}
.redNum {
  position: absolute;
  width: 0.52rem;
  height: 0.37rem;
  top: 0;
  left: -0.16rem;
  background-color: #fc414c;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.37rem;
  border-radius: 40%;
  text-align: center;
  z-index: 20;
}
.getPacket {
  position: absolute;
  width: 1.52rem;
  height: 0.49rem;
  top: -0.05rem;
  right: -0.28rem;
  background: linear-gradient(#f24a57, #f05656, #ee6054, #eb6b52);
  background: -webkit-linear-gradient(#f24a57, #f05656, #ee6054, #eb6b52);
  box-shadow: 1px 3px 5px #c39b77;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.49rem;
  border-radius: 0.3rem;
  text-align: center;
  z-index: 20;
}
.redBox_two .shareRed {
  width: 6.37rem;
  /* height: 1.28rem; */
  background-color: #fff;
  margin: -0.12rem auto 0;
  padding-top: 0.26rem;
  padding-bottom: 0.26rem;
  border-radius: 0.05rem;
}
.redBox_two .shareRed p {
  font-size: 0.26rem;
  color: #777;
  text-align: center;
}
.redBox_two .shareRed h4 {
  font-size: 0.26rem;
  color: #cd1723;
  text-align: center;
  margin-top: 0.24rem;
  font-weight: 700;
}
.redBox_two .joinStock {
  width: 6.39rem;
  /* height: 1.27rem; */
  border: none;
  border-radius: 0.1rem;
  position: relative;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  margin-bottom: 0.13rem;
}
.redBox_two .joinStock .joinStockLeft {
  width: 4.95rem;
  /* height: 1.27rem; */
  border-radius: 0.1rem 0 0 0.1rem;
  background-color: #fff;
  padding-top: 0.23rem;
  padding-left: 0.38rem;
  position: relative;
}
.redBox_two .joinStock .joinStockLeft::before {
  content: '';
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.5rem;
  left: -0.18rem;
  border-radius: 50%;
  background-color: #f1e2b9;
}
.redBox_two .joinStock .joinStockLeft .stockGold {
  font-size: 0.36rem;
  font-weight: 700;
  color: #e64a31;
}
.redBox_two .joinStock .joinStockLeft .stockGold span {
  font-size: 0.28rem;
  font-weight: 700;
  color: #e64a31;
}
.redBox_two .joinStock .joinStockLeft .stockType {
  font-size: 0.28rem;
  margin-top: 0.25rem;
  color: #444444;
}
.redBox_two .joinStock .joinStockLeft .timeStatus {
  position: absolute;
  top: 0.32rem;
  right: 0.28rem;
  font-size: 0.22rem;
  color: #0ac542;
}
.redBox_two .joinStock .joinStockLeft .status2 {
  color: #0ac542;
}
.redBox_two .joinStock .joinStockLeft .status2 {
  color: #f7a31c;
}
.redBox_two .joinStock .joinStockLeft .status3 {
  color: #ff404d;
}
.redBox_two .joinStock .joinStockRight {
  width: 1.44rem;
  /* height: 1.27rem; */
  border-radius: 0 0.1rem 0.1rem 0;
  text-align: center;
  background-color: #fec009;
  position: relative;
}
.redBox_two .joinStock .joinStockRight::after {
  content: '';
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.5rem;
  right: -0.18rem;
  border-radius: 50%;
  background-color: #f1e2b9;
}
.redBox_two .joinStock .joinStockRight p {
  font-size: 0.28rem;
  color: #ffffff;
  line-height: 1.27rem;
}
.redBox_two .joinStock .lineUl {
  position: absolute;
  width: 0.08rem;
  height: 1.27rem;
  top: -0.08rem;
  right: 1.4rem;
}
.redBox_two .joinStock .lineUl .lineLi {
  width: 0.08rem;
  height: 0.1rem;
  border-radius: 50%;
  margin-top: 0.07rem;
  background: #f1e2b9;
}
.redPacketRoom {
  width: 6.92rem;
  height: 2.34rem;
  border: 1px solid #fd454f;
  margin: -0.12rem auto 1rem;
  padding: 0.23rem 0 0.39rem 0;
  position: relative;
}
.redPacketRoom .roomBox {
  width: 5.8rem;
  /* width: 90%; */
  height: 1.66rem;
  margin: 0 auto;
  overflow-x: scroll;
  position: relative;
}
.redPacketRoom .roomBox .roomUl {
  width: auto;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  position: absolute;
  overflow-x: hidden;
  /* 每次偏移 */
  /* left: -2.06rem; */
}
.redPacketRoom .roomBox .roomUl .roomLi {
  /* float: left; */
  width: 1.67rem;
  height: 1.66rem;
  background: url('../assets/images/red_packet/icon_hb@2x.png') no-repeat;
  background-size: 100%;
  margin-left: 0.39rem;
  padding: 0.2rem 0.4rem 0;
}
.redPacketRoom .roomBox .roomUl .roomLi:first-of-type {
  margin-left: 0;
}
.redPacketRoom .roomBox .roomUl .roomLi h3 {
  font-size: 0.28rem;
  color: #cd1723;
  text-align: center;
  line-height: 0.35rem;
}
.redPacketRoom .roomBox .roomUl .roomLi h5 {
  font-size: 0.18rem;
  color: #fd3d18;
  text-align: center;
  margin-top: 0.36rem;
}
::-webkit-scrollbar {
  display: none;
}
.redPacketRoom .left {
  position: absolute;
  width: 0.45rem;
  height: 1.66rem;
  background: url('../assets/images/red_packet/back.png') no-repeat;
  background-position-y: 50%;
  background-size: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.redPacketRoom .right {
  position: absolute;
  width: 0.45rem;
  height: 1.66rem;
  background: url('../assets/images/red_packet/more.png') no-repeat;
  background-position-y: 50%;
  background-size: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
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

/* 领取金币 */
.goldWindow {
  position: fixed;
  z-index: 100;
  width: 5.98rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background: #fdf7eb;
  border-radius: 0.3rem;
}
.goldWindow .goldHead {
  width: 100%;
  height: 1.84rem;
  background: #ef504a;
  border-radius: 0.3rem 0.3rem 60% 60%;
}
.goldWindow img {
  display: block;
  width: 1.36rem;
  height: 1.36rem;
  border-radius: 50%;
  margin: -0.68rem auto 0.75rem;
}
.goldWindow h3 {
  font-size: 0.7rem;
  color: #d73930;
  text-align: center;
  position: relative;
}
.goldWindow h3::before {
  content: '';
  position: absolute;
  width: 1.18rem;
  height: 0.28rem;
  left: 0;
  top: -0.2rem;
  background: url('../assets/images/red_packet/icon1@2x.png') no-repeat;
  background-size: 100%;
}
.goldWindow h3::after {
  content: '';
  position: absolute;
  width: 1.18rem;
  height: 0.28rem;
  right: 0;
  top: 0.7rem;
  background: url('../assets/images/red_packet/icon1@2x.png') no-repeat;
  background-size: 100%;
}
.goldWindow h3 span {
  font-size: 0.4rem;
}
.goldWindow .goldFoot {
  height: 1.2rem;
  margin-top: 0.92rem;
  border-top: 1px solid #ced0cf;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.goldWindow .goldFoot .left {
  width: 50%;
  height: 1.2rem;
  font-size: 0.38rem;
  color: #777777;
  border-radius: 0 0 0 0.3rem;
  line-height: 1.2rem;
  text-align: center;
  border-right: 1px solid #ced0cf;
}
.goldWindow .goldFoot .right {
  width: 50%;
  height: 1.2rem;
  font-size: 0.38rem;
  color: #e54b2f;
  border-radius: 0 0 0.3rem 0;
  line-height: 1.2rem;
  text-align: center;
  letter-spacing: 4px;
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
