<template>
  <div v-title="$route.meta.title">
    <!-- 遮罩 -->
    <div class="mask" v-if="showMask===1" @touchmove.prevent></div>
    <div class="mask2" v-if="showMask2===1" @click="showGuidance" @touchmove.prevent></div>
    <!-- 引导 -->
    <div class="guidance" @touchmove.prevent v-if="showGui===1" @click="showGuidance">
      <a href="javascript:;">
        <img src="../assets/images/icon_4@2x.png" alt="">
      </a>
    </div>
    <!-- rule -->
    <div id="rule_join" v-if="close===1">
      <div class="rule_box" @touchmove.prevent>
        <div class="close_btn" @click="closeRule">×</div>
        <div class="rule_head">
          <img src="../assets/images/icon_regulation.png" alt="">
        </div>
        <div class="rule_content">
          <p v-html="tip">
            {{tip}}
          </p>
        </div>
      </div>
    </div>
    <!--引入loadmord-->
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <!-- 1.top -->
          <!-- 用if进行判断有无师傅的情况进行分别显示 -->
          <div class="top">
            <h5 v-if="master_id==''" class="no_master">
              <a href="javascript:;" @click="getImportCode">点击输入邀请码，领取红包奖励！</a>
            </h5>
            <h5 v-else class="have_master" @click="callWay(master_name,master_qq,master_wechat)">
              <a href="javascript:;" class="left">我的师傅：{{master_name}}({{master_ggc}})</a>
              <a href="javascript:;" class="right">马上联系></a>
            </h5>
          </div>
          <!-- 2.banner -->
          <div class="banner">
            <div class="left" @click="getAcceptApper">如何收徒？</div>
            <div class="right" @click="showRule">奖励规则</div>
            <!-- 活动时间 -->
            <div class="activity">
              <p class="time_title">活动时间</p>
              <h3 class="activity_time">6月1日-6月30日</h3>
            </div>
            <div class="accept_app">
              <a href="javascript:;" class="share_app" @click="masterWay('1')">分享收徒</a>
              <a href="javascript:;" class="acquire_app" @click="masterWay('2')">扫码收徒</a>
            </div>
            <div class="invite" @click="getMyCode">
              <a href="javascript:;" class="invite_code">我的邀请码
                <span class="code">{{mycode}}</span>&gt;&gt;</a>
            </div>
          </div>
          <!-- 3.tab -->
          <div class="tab clearfix">
            <div class="tab_box" id="clickme">
              <h4 @click="selected(1)" :class="select==1? 'select': '' " class='chooseMe'>
                <span>活动说明</span>
                <span class="smallTitle">瞅一瞅</span>
              </h4>
            </div>
            <div class="tab_box">
              <h4 @click="selected(2)" :class="select==2? 'select': '' ">
                <span>我的徒弟</span>
                <span class="smallTitle" v-if="tudicount !== '0'&&tudicount!==''">{{tudicount}}人</span>
                <span v-else class="smallTitle">0人</span>
              </h4>
            </div>
            <div class="tab_box">
              <h4 @click="selected(3)" :class="select==3?'select':''">
                <span>我的徒孙</span>
                <span class="smallTitle" v-if="tusuncount !== '0'&&tusuncount !== ''">{{tusuncount}}人</span>
                <span v-else class="smallTitle">0人</span>
              </h4>
            </div>
          </div>
          <!-- 活动内容说明 -->
          <div v-if="select==1" class="active_box">
            <div class="active">
              <h3>如何获得8元?</h3>
              <h4>【活动时间】</h4>
              <p class="active_time">2018年6月1日-2018年6月30日</p>
              <h4>【发放条件】</h4>
              <p class="active_biger">分
                <span>6次</span>发放</p>
              <p>1.徒弟
                <span>每日分享文章并获得收益</span>后，即累计
                <span>1天</span>，满
                <span>5天</span>累计可获得
                <span>7元</span>
              </p>
              <img src="../assets/images/icon_ladder.png" alt="">
              <p>2.徒弟提现成功再奖励
                <span>1元</span>
              </p>
            </div>
            <div class="tips_box">
              <h5 class="tip_title">郑重声明</h5>
              <p>为保证广大呱呱用户的收益不受影响，对于存在违规收徒行为的用户，平台将取消其参加活动的资格，并扣除所有奖励，请遵守平台规则正常邀请收徒！</p>
            </div>
          </div>
          <!-- 徒弟列表 -->
          <div v-if="select==2" class="tudi_list" id="son_list">
            <div class="list_title">
              <!-- <div class="left_title">前50</div> -->
              <div class="center_title">昵称</div>
              <div class="right_title">收徒时间</div>
            </div>
            <div class="list_li" v-for="(item, index) in dataList">
              <div class="img_box">
                <img v-bind:src="item.photo" v-if="item.photo!==''">
                <div class="default_img" v-else>
                </div>
              </div>
              <div class="niceName_box" v-if="item.qq==''&&item.wechat==''">
                <h3>{{item.nickname}}</h3>
                <p class="member">呱呱号:{{item.ggc}}</p>
              </div>
              <div class="niceName_box" @click="callWay(item.nickname,item.qq,item.wechat)" v-else>
                <h3>{{item.nickname}}
                  <span><img src="../assets/images/icon_prentice@2x.png" alt=""></span>
                </h3>
                <p class="member">呱呱号:{{item.ggc}}</p>
              </div>
              <div class="gold_box">{{item.createtime}}
              </div>
            </div>
            <div class="notudi" v-if="showtype==1">
              <p>您还没有徒弟</p>
              <h3>
                <a href="javascript:;" @click="showGuidance">去收徒</a>></h3>
            </div>
          </div>
          <!-- 徒孙列表 -->
          <div v-if="select==3" class="tudi_list" id="grandson_list">
            <div class="list_title">
              <!-- <div class="left_title">前50</div> -->
              <div class="center_title">昵称</div>
              <div class="right_title">收徒时间</div>
            </div>
            <div class="list_li" v-for="(item, index) in dataList">
              <div class="img_box">
                <img v-bind:src="item.photo" v-if="item.photo!==''">
                <div class="default_img" v-else>
                </div>
              </div>
              <div class="niceName_box">
                <h3>{{item.nickname}}</h3>
                <p class="member">呱呱号:{{item.ggc}}</p>
              </div>
              <div class="gold_box">{{item.createtime}}
              </div>
            </div>
            <div class="notudi" v-if="showtype==1">
              <p>您还没有徒孙</p>
              <h3>
                <a href="javascript:;" @click="showGuidance">去收徒</a>></h3>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <div class="active_bag" v-if="parseFloat(appv) > 7.0">
      <div class="closeMe" @click="closeMe">×</div>
      <a href="javascript:;" class="animated swing" @click="shareChannel()">
        <img src="../assets/images/redbag.png">
        <p class="shareTips">{{shareTips}}</p>
        <p class="shareGold" v-if="this.shareGold !== ''">{{shareGold}}金币</p>
      </a>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { Loadmore } from 'mint-ui'
import acceptApperVue from './acceptApper.vue'
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      //app版本号需要动态获取
      appv: '',
      data: '',
      //师傅id
      master_id: '',
      //师傅昵称
      master_name: '',
      //师傅呱呱号
      master_ggc: '',
      master_qq: '',
      master_wechat: '',
      //邀请码
      mycode: '',
      //徒弟人数
      tudicount: '',
      //徒孙人数
      tusuncount: '',
      dataList: [],
      select: '1',
      tip: '',
      //遮罩层的显隐
      showMask: 0,
      showMask2: 0,
      //引导图的显隐
      showGui: 0,
      //规则显示关闭的阀值
      close: 0,
      falg: true,
      //有无徒弟或徒孙
      showtype: 0,
      warn_content: '',
      warn_type: 0,
      allLoaded: false, // true表示暂无数据
      wrapperHeight: 0,
      topStatus: '',
      bottomStatus: '',
      wrapperHeight: 0, // 滑动区域高度
      translate: 0,
      moveTranslate: 0,
      boxshow: 1,
      pagesize: '5',
      pagestart: 1,
      pagetype: 0,
      articleid: '',
      saveShare: '',
      shareTips: '',
      shareGold: ''
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    } else {
      $('.active_bag').css('bottom', '0.1rem')
    }
    setTimeout(function() {
      $('.chooseMe').click()
    }, 200)
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.appv = _this.$getHashParameter('infversionApp')
    _this.getApprentice()
    _this.showLeftBtn('no')
    _this.changeTitle('师徒')
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
        window.taskCentre.changeTitle(title)
      }
    },
    //导航栏选项
    selected: function(num) {
      let _this = this
      if (num === 1) {
        _this.select = 1
        _this.boxshow = 1
        _this.allLoaded = true
      } else if (num === 2) {
        _this.select = 2
        _this.boxshow = 2
        _this.pagestart = 1
        _this.pagetype = '1'
        this.getPrentice()
      } else if (num === 3) {
        _this.select = 3
        _this.boxshow = 3
        _this.pagestart = 1
        _this.pagetype = '2'
        this.getPrentice()
      }
    },
    //跳转到如何收入页面
    getAcceptApper: function() {
      let _this = this
      _this.$router.push('acceptApper/')
    },
    getMyCode: function() {
      let _this = this
      _this.$router.push('myCode/')
    },
    getImportCode: function() {
      let _this = this
      _this.$router.push('importCode/')
    },
    getApprentice: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        appv: _this.appv,
        Infversion: _this.Infversion,
        Method: 'QueryApprenticeIndexInfoWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.shareTips = res.data.sharetext
          _this.shareGold = res.data.sharegold
          //师傅id
          _this.master_id = res.data.parentid
          //师傅昵称
          _this.master_name = res.data.nickname
          //师傅呱呱号
          _this.master_ggc = res.data.ggcode
          _this.master_wechat = res.data.wechat
          _this.master_qq = res.data.qq
          //邀请码
          _this.mycode = res.data.ggc
          //徒弟数
          _this.tudicount = res.data.tudicount * 1
          if (_this.tudicount > 10000) {
            _this.tudicount = _this.tudicount / 10000 + '万'
          }
          //徒孙数
          _this.tusuncount = res.data.tusuncount
          if (_this.tusuncount > 10000) {
            _this.tusuncount = _this.tusuncount / 10000 + '万'
          }
          //提示内容
          _this.tip = res.data.tip
          //将数据缓存至本地
          window.localStorage.setItem('userid', _this.userid)
          window.localStorage.setItem('token', _this.token)
          window.localStorage.setItem('appv', _this.appv)
          window.localStorage.setItem('ggc', _this.mycode)
          window.localStorage.setItem('judge', 0)
        },
        err => {
          // 失败
          _this.showWarnTips(res.mag.substr(2))
        }
      )
    },
    //获取徒弟徒孙列表
    getPrentice: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        type: _this.pagetype,
        appv: _this.appv,
        pagesize: _this.pagesize,
        pagestart: _this.pagestart,
        Infversion: _this.Infversion,
        Method: 'QueryShituListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.dataList = res.data
          // 判断有无数据
          if (_this.dataList.length === 0) {
            _this.showtype = 1
            _this.allLoaded = true
          } else if (_this.dataList.length >= 5) {
            _this.showtype = 0
            _this.allLoaded = false
          } else {
            _this.showtype = 0
            _this.allLoaded = true
          }
          console.log(_this.dataList)
        },
        err => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
          _this.allLoaded = true
        }
      )
    },
    //将徒弟的联系方式传递给app
    callWay: function(name, qq, wechat) {
      let info = {}
      info.name = name
      info.qq = qq
      info.wechat = wechat
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.callMyprentice.postMessage(info)
      } else {
        window.taskCentre.callMyprentice(name, qq, wechat)
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
    masterWay: function(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.masterWay.postMessage(type)
      } else {
        window.taskCentre.masterWay(type)
      }
    },
    //打开规则
    showRule: function() {
      this.close = 1
      this.showMask = 1
    },
    //关闭规则
    closeRule: function() {
      this.close = 0
      this.showMask = 0
    },
    showGuidance: function() {
      if (this.falg) {
        this.showMask2 = 1
        this.showGui = 1
        this.falg = false
      } else {
        this.showMask2 = 0
        this.showGui = 0
        this.falg = true
      }
    },
    handleTopChange(status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    translateChange(translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    },
    // 下拉刷新
    loadTop() {
      let _this = this
      setTimeout(() => {
        $('.active_bag').show()
        this.allLoaded = false
        _this.getApprentice()
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    // loadmord的方法
    handleBottomChange(status) {
      this.moveTranslate = 1
      this.bottomStatus = status
    },
    // 上拉加载更多
    loadBottom() {
      let _this = this
      if (_this.select == 1) {
        return false
      }
      setTimeout(() => {
        _this.pagestart++
        console.log(_this.pagestart)
        let url = _this.url
        let data = {
          userid: _this.userid,
          token: _this.token,
          type: _this.pagetype,
          appv: _this.appv,
          pagesize: _this.pagesize,
          pagestart: _this.pagestart,
          Infversion: _this.Infversion,
          Method: 'QueryShituListWap'
        }
        _this.$apiPost(url, data, res => {
          if (res.data.length > 0) {
            console.log(_this.dataList)
            _this.dataList = _this.dataList.concat(res.data)
          } else {
            // 无数据时不允许上滑
            _this.showWarnTips('暂无更多数据')
            this.allLoaded = true
          }
        })
        _this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    //分享与App交互的方法
    shareChannel() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        let data = {}
        data.type = '1'
        data.key = 'ios_master_share_set'
        data.articleid = '-1'
        window.webkit.messageHandlers.shareChannel.postMessage(data)
      } else {
        let type = '1'
        let key = 'android_master_share_set'
        let articleid = '-1'
        window.taskCentre.shareChannel(type, key, articleid)
      }
    },
    closeMe() {
      $('.active_bag').hide()
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
<style>
body {
  width: 100%;
  overflow-x: hidden !important;
}
.mask {
  position: fixed;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 16;
}
.mask2 {
  position: fixed;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 16;
}
.guidance {
  position: fixed;
  z-index: 188;
  width: 100%;
  top: 3.75rem;
}
.guidance img {
  width: 100%;
}
.rule_box {
  position: fixed;
  background-color: #fff;
  width: 6rem;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 18;
  border-radius: 0.1rem;
}
.rule_box .close_btn {
  z-index: 188;
  position: absolute;
  top: -1rem;
  right: 0.1rem;
  width: 0.52rem;
  height: 0.52rem;
  font-size: 0.36rem;
  line-height: 0.48rem;
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  background-color: transparent;
  text-align: center;
}
.close_btn::after {
  content: '';
  height: 0.46rem;
  width: 1px;
  background-color: #ffffff;
  position: absolute;
  top: 0.5rem;
  left: 0.23rem;
}
.rule_box .rule_head {
  width: 6rem;
  height: 1.01rem;
}
.rule_box .rule_head img {
  width: 100%;
  height: 1.01rem;
}
.rule_box .rule_content {
  width: 100%;
  padding: 0.37rem 0.5rem;
}
.rule_box .rule_content p {
  font-size: 0.32rem;
}
.top {
  width: 100%;
  height: 0.61rem;
  background-color: #fde9d1;
}
.top h5 {
  text-align: center;
  width: 100%;
  height: 0.61rem;
}
.top .have_master {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}
.top h5 a {
  font-size: 0.3rem;
  color: #ec7c3a;
  display: block;
  line-height: 0.61rem;
  text-decoration: underline !important;
}
.top .have_master a {
  text-align: initial;
  font-size: 0.3rem;
  width: 50%;
  color: #ec7c3a;
  display: block;
  line-height: 0.61rem;
  text-decoration: none !important;
}
.top .have_master .left {
  width: 70%;
  text-align: initial;
  padding-left: 0.28rem;
}
.top .have_master .right {
  width: 30%;
  text-align: end;
  padding-right: 0.2rem;
}
.banner {
  position: relative;
  width: 100%;
  height: 4.77rem;
  background: url(../assets/images/banner@2x.png) no-repeat;
  background-size: 100%;
}
.banner .left {
  position: absolute;
  top: 0.38rem;
  left: 0rem;
  width: 1.62rem;
  height: 0.58rem;
  background-color: #ffe32a;
  color: #f04936;
  font-size: 0.26rem;
  border: 2px solid #fff;
  border-left: none;
  border-radius: 0 20px 20px 0;
  text-align: center;
  line-height: 0.5rem;
}
.banner .right {
  position: absolute;
  top: 0.38rem;
  right: 0rem;
  width: 1.62rem;
  height: 0.58rem;
  background-color: #ffded9;
  color: #f14835;
  font-size: 0.26rem;
  border: 2px solid #fff;
  border-right: none;
  border-radius: 20px 0 0 20px;
  text-align: center;
  line-height: 0.5rem;
}
.activity {
  margin: 0 auto;
  text-align: center;
  padding-top: 0.2rem;
}
.activity .time_title {
  position: relative;
  font-size: 0.26rem;
  margin-bottom: 0.12rem;
  color: #fff;
}
.activity .time_title::before {
  content: '';
  top: 50%;
  left: 35%;
  position: absolute;
  width: 0.3rem;
  height: 1px;
  background-color: #fff;
}
.activity .time_title::after {
  content: '';
  top: 50%;
  right: 35%;
  position: absolute;
  width: 0.3rem;
  height: 1px;
  background-color: #fff;
}
.activity .activity_time {
  font-size: 0.3rem;
  color: #fff;
}
.accept_app {
  position: absolute;
  bottom: 0.89rem;
  width: 100%;
  text-align: center;
}
.accept_app .share_app {
  display: inline-block;
  width: 2.77rem;
  height: 0.75rem;
  background-color: #f7e7c6;
  color: #89590f;
  font-size: 0.4rem;
  font-weight: 700;
  border-radius: 30px;
  line-height: 0.75rem;
  margin-right: 0.2rem;
  border-bottom: 0.05rem solid #c33618;
}
.accept_app .acquire_app {
  display: inline-block;
  width: 2.77rem;
  height: 0.75rem;
  background-color: #ffe32a;
  color: #89590f;
  font-size: 0.4rem;
  font-weight: 700;
  border-radius: 30px;
  line-height: 0.75rem;
  margin-left: 0.2rem;
  border-bottom: 0.05rem solid #c33618;
}
.accept_app a:active {
  border-bottom: none;
}
.invite {
  position: absolute;
  width: 100%;
  bottom: 0.25rem;
  text-align: center;
}
.invite .invite_code {
  display: block;
  font-size: 0.26rem;
  color: #fff;
  text-decoration: underline !important;
}
.tab {
  width: 100%;
  height: 1.15rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  flex: 3;
}
.tab .tab_box {
  flex: 1;
  text-align: center;
  font-size: 0.32rem;
  color: #333333;
  width: 33.3%;
  height: 1.15rem;
  line-height: 1.15rem;
  justify-content: center;
  padding: 0 0.28rem;
}
.tab .tab_box h4 {
  text-align: center;
  font-size: 0.32rem;
  color: #333333;
  height: 1.15rem;
  padding-top: 0.2rem;
  line-height: 0.36rem;
}
.tab .tab_box h4 span {
  display: block;
  margin-bottom: 0.12rem;
}
.tab .tab_box h4 .smallTitle {
  font-size: 0.24rem;
  color: #2ab526;
}
.tab .tab_box .select {
  border-bottom: 0.04rem solid #2ab526;
  color: #2ab526;
}

.active_box {
  width: 6.89rem;
  margin: 1.04rem auto;
  border: 1px solid #ffc148;
  position: relative;
  padding: 0.57rem 0.23rem;
}
.active_box h3 {
  position: absolute;
  width: 4.08rem;
  height: 0.64rem;
  background-color: #ff4820;
  font-size: 0.32rem;
  line-height: 0.64rem;
  top: -0.32rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  text-align: center;
  border-radius: 30px;
  color: #ffffff;
}

.active_box .active h4 {
  font-size: 0.36rem;
  text-align: left;
  color: #fe4820;
  line-height: 0.36rem;
  margin-bottom: 0.3rem;
}

.active_box .active p {
  font-size: 0.3rem;
  color: #666666;
  padding-left: 0.2rem;
  line-height: 0.46rem;
  margin-bottom: 0.3rem;
}

.active_box .active .active_time {
  margin-bottom: 0.3rem;
}

.active_box .active .active_biger {
  font-size: 0.36rem;
}

.active_box .active span {
  color: #fe4820;
}
.active_box .active img {
  width: 100%;
}
.active_box .tips_box {
  width: 6.35rem;
  margin: 0 auto;
  border: 1px solid #ff7b38;
  border-radius: 10px;
  padding: 0.34rem 0.43rem;
}
.active_box .tips_box .tip_title {
  position: relative;
  font-size: 0.3rem;
  margin-bottom: 0.12rem;
  text-align: center;
  color: #444;
}
.active_box .tips_box .tip_title::before {
  content: '';
  top: 50%;
  left: 30%;
  position: absolute;
  width: 0.3rem;
  height: 1px;
  background-color: #9a5220;
}
.active_box .tips_box .tip_title::after {
  content: '';
  top: 50%;
  right: 30%;
  position: absolute;
  width: 0.3rem;
  height: 1px;
  background-color: #9a5220;
}
.active_box .tips_box p {
  font-size: 0.3rem;
  line-height: 0.45rem;
  color: #666;
}
.tudi_list {
  width: 100%;
  min-height: 6rem;
}
.tudi_list .list_title {
  width: 100%;
  height: 0.57rem;
  background-color: #f7f7f7;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  font-size: 0.28rem;
  color: #b3b3b3;
  line-height: 0.57rem;
}
/* .tudi_list .list_title .left_title {
  text-align: center;
  width: 20%;
} */
.tudi_list .list_title .center_title {
  text-align: center;
  width: 60%;
}
.tudi_list .list_title .right_title {
  text-align: center;
  width: 40%;
}
.list_li {
  width: 100%;
  height: 1.16rem;
  border-bottom: 1px solid #f5f4f9;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  flex: 10;
  position: relative;
}
/* .list_li .list_index {
  width: 10%;
  font-size: 0.3rem;
  line-height: 1.16rem;
  text-align: end;
  justify-content: center;
  font-size: 0.36rem;
  color: #aaa;
} */
.list_li .img_box {
  width: 20%;
  text-align: center;
  justify-content: center;
}
.list_li .img_box .default_img {
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 7.6rem;
  background-position: -2.81rem -4.16rem;
  border-radius: 50%;
}
.list_li .img_box img {
  display: inline-block;
  width: 0.7rem;
  border-radius: 50%;
}
.list_li .niceName_box {
  width: 40%;
  justify-content: center;
  padding-top: 0.26rem;
}
.list_li .niceName_box h3 {
  font-size: 0.3rem;
  color: #333333;
  margin-bottom: 0.1rem;
}
.list_li .niceName_box span {
  position: relative;
}
.list_li .niceName_box span img {
  width: 0.2rem;
  position: absolute;
  top: 0.08rem;
  left: 0.16rem;
}
.list_li .niceName_box p {
  font-size: 0.28rem;
  color: #b7b7b7;
}
.list_li .gold_box {
  width: 40%;
  line-height: 1.16rem;
  font-size: 0.26rem;
  text-align: center;
  justify-content: center;
  color: #3db134;
}
.list_li .gold_box em {
  position: absolute;
  display: inline-block;
  width: 0.42rem;
  height: 0.42rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 6.6rem;
  background-position: -3.8rem -3.74rem;
  top: 0.36rem;
}
.notudi {
  width: 100%;
  text-align: center;
  padding-top: 1.42rem;
}
.notudi p {
  font-size: 0.32rem;
  color: #b3b3b3;
}
.notudi h3 {
  margin-top: 0.15rem;
  font-size: 0.32rem;
  color: #36ad35;
}
.notudi h3 a {
  font-size: 0.32rem;
  color: #36ad35;
  text-decoration: underline !important;
}
mint-loadmore-content {
  text-align: center;
}
mint-loadmore-top {
  text-align: center;
}
.mint-loadmore-top span {
  text-align: center;
  font-size: 0.32rem;
}

.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.3rem;
  color: #888888;
}
.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}
.mint-loadmore {
  overflow-y: none;
  -webkit-overflow-scrolling: touch;
}
.loading-background,
.mint-loadmore-bottom span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-bottom span {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.3rem;
  color: #888888;
}
.nullbox {
  width: 100%;
  height: 4rem;
}
#test {
  width: 100%;
  height: 2rem;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
}
.active_bag {
  width: 1.5rem;
  height: 2rem;
  position: fixed;
  z-index: 10;
  right: 0.5rem;
  bottom: 1.6rem;
}
.active_bag img {
  width: 100%;
}
.active_bag a {
  display: block;
  width: 100%;
  height: 100%;
}
.active_bag .closeMe {
  width: 0.46rem;
  height: 0.46rem;
  background-color: #d0d0d0;
  color: #fff;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.4rem;
  position: absolute;
  border-radius: 50%;
  top: -0.4rem;
  right: -0.4rem;
}
.active_bag a .shareTips {
  position: absolute;
  width: 1.5rem;
  text-align: center;
  font-size: 0.22rem;
  color: #fff;
  top: 0.9rem;
}
.active_bag a .shareGold {
  position: absolute;
  width: 1.5rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
  top: 1.2rem;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.animated.bounceIn,
.animated.bounceOut,
.animated.flipOutX,
.animated.flipOutY {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
}

@-webkit-keyframes swing {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  20% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  40% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
  60% {
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }
  80% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

@keyframes swing {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  20% {
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  40% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }
  60% {
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }
  80% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

.swing {
  -webkit-transform-origin: top center;
  transform-origin: top center;
  -webkit-animation-name: swing;
  animation-name: swing;
  animation-iteration-count: infinite;
}
</style>
