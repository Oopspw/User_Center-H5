<template>
  <div v-title="$route.meta.title">
    <header>
      <div class="ex_head ex_content">兑换内容</div>
      <div class="ex_head ex_time">兑换时间</div>
      <div class="ex_head ex_status">状态</div>
    </header>
    <div class="nullbox"></div>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper">
        <!-- :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"  -->
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="clearfix ex_record" v-for="(item,index) in exRecordList">
            <div class="show_body show_content" v-if="item.exchange_type == 'wechat'">微信{{item.amount}}元</div>
            <div class="show_body show_content" v-else-if="item.exchange_type == 'alipay'">支付宝{{item.amount}}元</div>
            <div class="show_body show_content" v-else-if="item.exchange_type == 'huafei'">话费{{item.amount}}元</div>
            <div class="show_body show_content" v-else-if="item.exchange_type == ''">{{item.amount}}元</div>
            <div class="show_body show_time">{{item.createtime}}</div>
            <div class="show_body show_status status1" v-if="item.state=='1'">处理中
            </div>
            <div class="show_body show_status status2" v-else-if="item.state=='2'">已处理
            </div>
            <div class="show_body show_status status3" @click="showInfo(index)" v-else-if="item.state=='3'">失败
              <em class="show_tips" :class="showType==index?'hide_tips':''"></em>
            </div>
            <div class="show_body show_status status2" v-else-if="item.state=='4'">充值中
            </div>
            <div class="record_tips" v-if="showType==index" :class="item.state=='3'?'':'hide_this'">
              <p>{{item.remark}}</p>
            </div>
          </div>
          <!--顶部和底部文字提示-->
          <!-- <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'">下拉刷新</span>
            <span v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div> -->
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'">下拉加载更多</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <!-- 暂无更多数据 -->
    <div class="nomore" v-if="warn_type===3">
      <img class="nomore_png" src="../assets/images/icon_remark.png" alt="">
      <p class="nomore_tips">暂无数据</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      userid: '',
      token: '',
      Infversion: window.config.api.Infversion,
      showlogout: 0,
      showType: '',
      pagesize: '10', //每页个数
      pagestart: '0', //初始值为0
      createtime: '', //兑换时间
      remark: '', //失败原因
      exchange_type: '', //兑换类型代码
      state: '', //状态
      gold: '', //兑换金币
      amount: '', //兑换金额
      recordId: '', //编号
      exRecordList: [], //列表
      allLoaded: false, // true表示暂无数据
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      wrapperHeight: 0, // 滑动区域高度
      translate: 0,
      moveTranslate: 0,
      autoFill: true,
      warn_content: '',
      warn_type: 3
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.exChangeRecord()
    _this.changeTitle('兑换记录')
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
    showInfo: function(i) {
      let _this = this
      _this.showType = i
    },
    exChangeRecord: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        pagesize: _this.pagesize,
        pagestart: _this.pagestart,
        Infversion: window.config.api.Infversion,
        Method: 'QueryExchageRecordInfoWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          if (res.data.length >= 10) {
            this.warn_type = 0
            _this.exRecordList = res.data
            _this.pagestart =
              _this.exRecordList[_this.exRecordList.length - 1].recordId
          } else if (res.data.length > 0 && res.data.length < 10) {
            this.warn_type = 0
            _this.exRecordList = res.data
            _this.pagestart =
              _this.exRecordList[_this.exRecordList.length - 1].recordId
            this.allLoaded = true
          } else if (res.data.length === 0) {
            this.warn_type = 3
            this.allLoaded = true
          }
        },
        res => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // mint-ui loadmord的方法
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    // 上拉加载更多
    loadBottom() {
      let _this = this
      setTimeout(() => {
        // PageStart是列表数组最后一个的recordid
        _this.pagestart = parseFloat(
          _this.exRecordList[_this.exRecordList.length - 1].recordId
        )
        let url = _this.url
        //_this.pagestart++
        let data = {
          userid: _this.userid,
          token: _this.token,
          pagesize: _this.pagesize,
          pagestart: _this.pagestart,
          Infversion: window.config.api.Infversion,
          Method: 'QueryExchageRecordInfoWap'
        }
        _this.$apiPost(url, data, res => {
          if (res.data.length > 0) {
            console.log(_this.exRecordList)
            _this.exRecordList = _this.exRecordList.concat(res.data)
            _this.pagestart = parseFloat(
              _this.exRecordList[_this.exRecordList.length - 1].recordId
            )
          } else {
            // 无数据时不允许上滑
            _this.showWarnTips('暂无更多数据')
            //this.allLoaded = true
          }
        })
        _this.$refs.loadmore.onBottomLoaded()
      }, 1500)
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
    showWarnTips: function(text) {
      this.warn_type = 1
      this.warn_content = text
      setTimeout(() => {
        this.warn_type = 0
      }, 2000)
    }
    // 下拉刷新
    // loadTop() {
    //   let _this = this
    //   setTimeout(() => {
    //     _this.pagestart = '0'
    //     _this.exChangeRecord()
    //     this.$refs.loadmore.onTopLoaded()
    //   }, 1500)
    // }
  }
}
</script>
<style>
body {
  background-color: #f7f7f7;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 18;
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
}
header .ex_head {
  width: 33.3%;
  height: 1.3rem;
  float: left;
  font-size: 0.36rem;
  line-height: 1.3rem;
  text-align: center;
  color: #333333;
}
.nullbox {
  width: 100%;
  height: 1.3rem;
  margin-bottom: 0.15rem;
  background-color: #fff;
}
.ex_record {
  width: 100%;
  background-color: #fff;
}
.ex_record .show_body {
  width: 33.3%;
  height: 1.17rem;
  float: left;
  text-align: center;
  line-height: 1.17rem;
}
.ex_record .show_content {
  font-size: 0.32rem;
  border-bottom: 1px solid #eaeaea;
  color: #333333;
}
.ex_record .show_time {
  font-size: 0.26rem;
  color: #777777;
  overflow: hidden;
  border-bottom: 1px solid #eaeaea;
}
.status1 {
  font-size: 0.32rem;
  color: #ff9a7c;
  border-bottom: 1px solid #eaeaea;
}
.status2 {
  font-size: 0.32rem;
  color: #28b624;
  border-bottom: 1px solid #eaeaea;
}
.status3 {
  font-size: 0.32rem;
  color: #e34041;
  position: relative;
  border-bottom: 1px solid #eaeaea;
}
.show_tips {
  width: 0.5rem;
  height: 0.34rem;
  position: absolute;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-position: -8.03rem -2.5rem;
  background-size: 10.8rem;
  top: calc(0.415rem);
  right: 0.45rem;
}
.hide_tips {
  background-position: -8.88rem -2.5rem;
}
.record_tips {
  float: left;
  width: 100%;
  height: 1.26rem;
  background-color: #f7f7f7;
  padding: 0.2rem 0.28rem 0.2rem;
}
.status3 .record_tips p {
  color: #777777;
  font-size: 0.28rem;
  line-height: 0.4rem;
}
.record_tips p {
  color: #777777;
  font-size: 0.28rem;
  line-height: 0.4rem;
}
.hide_this {
  display: none;
}
/*loadmord样式*/
.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.3rem;
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

.page-loadmore-wrapper {
  height: 100%;
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
  font-size: 0.3rem;
}
.ex_record > span {
  font-size: 0.3rem;
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
  margin-left: 40%;
}
.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.nomore {
  position: fixed;
  width: 2.6rem;
  height: 2.4rem;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.nomore .nomore_png {
  width: 1.4rem;
}
.nomore .nomore_tips {
  font-size: 0.32rem;
  color: #bcbcbc;
  margin-top: 0.24rem;
}
</style>
