<template>
  <div v-title="$route.meta.title">
    <div class="loading">
      <div>
        <img src="../assets/images/loading.gif" alt="">
      </div>
      <p>加载中...</p>
    </div>
    <!-- 总收入 -->
    <div class="head_Income">
      <div class="all_In">
        <h5>总收入:</h5>
        <h3>{{totalMsg.totalgold}}
          <span>金币</span>
        </h3>
      </div>
    </div>
    <!-- 可切换分栏 -->
    <nav class="clearfix">
      <div @click="selected(3)" class="nav_box sort select" id="shoutu">
        <h4>收徒(金币)</h4>
        <h4 class="numble shoutu_num">{{totalMsg.shitugold}}</h4>
      </div>
      <div @click="selected(1)" class="nav_box sort" id="share">
        <h4>分享(金币)</h4>
        <h4 class="numble share_num">{{totalMsg.fenxianggold}}</h4>
      </div>
      <div @click="selected(2)" class="nav_box sort" id="mission">
        <h4>任务(金币)</h4>
        <h4 class="numble mission_num">{{totalMsg.renwugold}}</h4>
      </div>
      <div @click="selected(0)" class="nav_box" id="other">
        <h4>其他(金币)</h4>
        <h4 class="numble other_num">{{totalMsg.qitagold}}</h4>
      </div>
    </nav>
    <!--引入loadmord-->
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <!--ul替换自己的dom-->
          <ul class="swiper-container swiper-no-swiping">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div v-for="item in incomeList" class="income_list">
                  <div @click="QueryUserIncomeDayDetailListWap(item.incometime)" class="date_gold show_me">
                    <p class="date">{{item.incometime}}</p>
                    <p class="gold">+
                      <span>{{item.golds}}</span>金币
                    </p>
                    <em :class="date == item.incometime?'showlist':''"></em>
                  </div>
                  <ul v-if="date == item.incometime" class="list_ul">
                    <li v-for="info in incomeInfo" class="list_li clearfix">
                      <div class="li_left">
                        <div class="yellow_circle">
                          收入
                        </div>
                      </div>
                      <div class="li_center">
                        <h4>{{info.content}}</h4>
                        <span class="time">{{info.createtime}}</span>
                      </div>
                      <div class="li_right">
                        <p>+{{info.gold}}金币</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <!--分享-->
                <div v-if="type ==1" v-for="(obj, index) in fenxiang" class="income_list fenxiang">
                  <div @click="showFenXiangList(index)" class="date_gold show_me">
                    <p class="date">{{obj.times}}</p>
                    <p class="gold">+
                      <span>{{obj.totalgold}}</span>金币
                    </p>
                    <em :class="showFenXiang == index?'showlist':''"></em>
                  </div>
                  <ul v-if="showFenXiang == index" v-for="list in obj.contentitem" class="list_ul">
                    <li class="list_li clearfix">
                      <div class="li_left">
                        <div class="yellow_circle pic">
                          <img :src="list.photo" alt="">
                        </div>
                      </div>
                      <div class="li_center clearfix">
                        <h4>{{list.title}}</h4>
                        <div class="info_box">
                          <div class="read_info">阅读:
                            <span class="read_num">{{list.hits}}</span>
                          </div>
                          <div class="watch_info">浏览:
                            <span class="watch_num">{{list.clickgold}} </span>金币/次</div>
                        </div>
                      </div>
                      <div class="li_right">
                        <p>+{{list.golds}}金币</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="threebox" v-if="boxshow == true">
                  <h3 class="threeDay">仅显示近三天明细</h3>
                </div>
              </div>
            </div>
          </ul>
          <!--替换结束-->
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
        <div class="footbox">
          <h3 class="threeDay">仅显示近三天明细</h3>
        </div>
      </div>
    </div>
    <!-- 详情列表 -->
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
import { Loadmore } from 'mint-ui'
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      showlogout: 0,
      userid: '',
      token: '',
      totalMsg: {}, // 总明细
      PageSize: '10', // 每页个数
      PageStart: '0', // 初始值为0
      type: '', // 类型（0其他；2任务，3徒弟）
      incomeList: [], // 明细日期列表
      incomeInfo: [], // 每日明细列表
      fenxiang: [], // 分享明细列表
      date: '', // 点击档期日期判断是否显示列表
      showFenXiang: 0, // 显示分享明细列表
      allLoaded: false, // true表示暂无数据
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      wrapperHeight: 0, // 滑动区域高度
      translate: 0,
      moveTranslate: 0,
      warn_content: '',
      warn_type: 0,
      boxshow: false
    }
  },
  updated: function() {
    // 滑动区域高度 每次触发都有改变
    this.wrapperHeight = $('.swiper-container').height()
  },
  created: function() {},
  components: { Loadmore },
  mounted: function() {
    // 点击明细模块选中效果
    $('.nav_box').each(function(index, obj) {
      $(obj).click(function() {
        $(obj)
          .addClass('select')
          .siblings()
          .removeClass('select')
      })
    })
    let _this = this
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.QueryUserIncomeTotalWap()
    _this.changeTitle('收入明细')
    //默认显示
    _this.selected(3)
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
    // 点击不同明细模块 类型type改变 类型（0其他； 2任务，3徒弟） 1分享 自己加的参数
    selected: function(num) {
      let _this = this
      if (num == 1) {
        _this.type = '1'
        // type==1是分享明细 不允许下拉更多
        _this.allLoaded = true
        // 分享明细
        _this.QueryUserFenXiangDetailListWap()
      } else {
        // 其他允许下拉
        this.warn_type = 0
        _this.allLoaded = false
        _this.boxshow = false
        // 设置初始值
        _this.PageStart = '0'
        // 任务 收徒 其他 三个模块明细
        _this.QueryUserIncomeDayListWap(num)
      }
    },
    // 获取总明细
    QueryUserIncomeTotalWap: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: window.config.api.Infversion,
        Method: 'QueryUserIncomeTotalWap'
      }
      _this.$apiPost(url, data, res => {
        $('.loading').hide()
        _this.totalMsg = res.data
        console.log(res.data)
        if (res.data.length === 0) {
          _this.warn_type = 3
        }
      })
    },
    // 获取 任务 收徒 其他 三个模块明细列表
    QueryUserIncomeDayListWap: function(type) {
      $('.loading').show()
      $('.footbox').hide()
      let _this = this
      _this.incomeList = []
      _this.incomeInfo = []
      _this.date = ''
      _this.type = parseFloat(type)
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        type: _this.type,
        PageSize: _this.PageSize,
        PageStart: _this.PageStart,
        Infversion: window.config.api.Infversion,
        Method: 'QueryUserIncomeDayListWap'
      }
      _this.$apiPost(url, data, res => {
        $('.loading').hide()
        _this.incomeList = res.data
        if (_this.incomeList.length > 0 && _this.incomeList.length < 10) {
          _this.PageStart =
            _this.incomeList[_this.incomeList.length - 1].recordid
          _this.QueryUserIncomeDayDetailListWap(_this.incomeList[0].incometime)
          _this.warn_type = 0
          this.allLoaded = true
        } else if (
          _this.incomeList.length > 0 &&
          _this.incomeList.length >= 10
        ) {
          _this.PageStart =
            _this.incomeList[_this.incomeList.length - 1].recordid
          _this.warn_type = 0
          _this.QueryUserIncomeDayDetailListWap(_this.incomeList[0].incometime)
        } else if (_this.incomeList.length === 0) {
          // 无数据时不允许上滑
          _this.warn_type = 3
          this.allLoaded = true
        }
      }),
        res => {
          _this.showWarnTips(res.mas.substr(2))
        }
    },
    // 根据明细列表的时间获取明细详情
    QueryUserIncomeDayDetailListWap: function(time) {
      $('.loading').show()
      let _this = this
      let url = _this.url
      _this.date = time
      // console.log(_this.time)
      let data = {
        userid: _this.userid,
        token: _this.token,
        type: _this.type,
        incometime: time,
        Infversion: window.config.api.Infversion,
        Method: 'QueryUserIncomeDayDetailListWap'
      }
      _this.$apiPost(url, data, res => {
        $('.loading').hide()
        _this.incomeInfo = res.data
        _this.wrapperHeight = $('.swiper-container').height()
      })
    },
    // 获取分享明细列表和详情 返回结果和其他三个格式不同 单独数据绑定
    QueryUserFenXiangDetailListWap: function() {
      let _this = this
      _this.incomeList = []
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: window.config.api.Infversion,
        Method: 'QueryUserFenXiangDetailListWap'
      }
      _this.$apiPost(url, data, res => {
        _this.fenxiang = res.data
        if (res.data.length === 0) {
          _this.warn_type = 3
          _this.boxshow = false
          $('.footbox').show()
        } else {
          _this.warn_type = 0
        }
      })
    },
    // 显示单独处理的分享明细列表dom结构
    showFenXiangList: function(n) {
      let _this = this
      _this.showFenXiang = n
    },
    // 一下是mint-ui loadmord的方法
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    // 上拉加载更多
    loadBottom() {
      let _this = this
      setTimeout(() => {
        if (_this.type !== '1') {
          // PageStart是列表数组最后一个的recordid
          _this.PageStart = parseFloat(
            _this.incomeList[_this.incomeList.length - 1].recordid
          )
          let url = _this.url
          let data = {
            userid: _this.userid,
            token: _this.token,
            type: _this.type,
            PageSize: _this.PageSize,
            PageStart: _this.PageStart,
            Infversion: window.config.api.Infversion,
            Method: 'QueryUserIncomeDayListWap'
          }
          _this.$apiPost(url, data, res => {
            if (res.data.length > 0) {
              // console.log(_this.incomeList)
              _this.incomeList = _this.incomeList.concat(res.data)
            } else {
              // 无数据时不允许上滑
              this.showWarnTips('暂无更多数据')
              this.allLoaded = true
            }
          })
        } else {
          _this.allLoaded = true
        }
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
    //     this.allLoaded = false
    //     if (_this.type === '1') {
    //       _this.QueryUserFenXiangDetailListWap()
    //     } else {
    //       // 刷新初始化PageStart
    //       _this.PageStart = '0'
    //       _this.QueryUserIncomeDayListWap(_this.type)
    //     }
    //     this.$refs.loadmore.onTopLoaded()
    //   }, 1500)
    // }
  }
}
</script>
<style>
body {
  background-color: #fff;
}
/* 总收入 */
.head_Income {
  width: 100%;
  height: 2.56rem;
  background-color: #fff;
  padding-top: 0.26rem;
  margin-bottom: 0.22rem;
}
.head_Income .all_In {
  width: 6.95rem;
  height: 2.02rem;
  background-color: #2ab526;
  margin: 0 auto;
  border-radius: 5px;
  color: #fff;
  padding: 0.37rem 0.37rem 0.37rem 0.47rem;
}
.head_Income .all_In h5 {
  font-size: 0.36rem;
}
.head_Income .all_In h3 {
  text-align: center;
  font-size: 0.56rem;
  line-height: 1rem;
  font-weight: 400;
}
.head_Income .all_In h3 span {
  font-size: 0.4rem;
  font-weight: 400;
}
/* 可切换分栏 */
nav {
  width: 100%;
  height: 1.39rem;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
}
nav .nav_box {
  float: left;
  width: 25%;
  height: 1.39rem;
  text-align: center;
  padding-top: 0.24rem;
}
nav .nav_box h4 {
  font-size: 0.3rem;
  line-height: 0.46rem;
  color: #444444;
}
nav .nav_box .numble {
  font-size: 0.32rem;
  font-weight: 400;
}
nav .select {
  border-bottom: 0.04rem solid #2ab526;
  color: #2ab526;
}
.select h4 {
  color: #2ab526 !important;
}
/* 详情列表 */
.income_list {
  width: 100%;
}
.date_gold {
  width: 94%;
  /* width: 100%; */
  height: 50px;
  border-bottom: 1px solid #eee;
  color: #777777;
  margin-left: 3%;
  /* background-color: #f7f7f7;
  padding: 0 0.2rem; */
  line-height: 100%;
  position: relative;
}
.date_gold p {
  display: inline;
  font-size: 0.28rem;
  vertical-align: middle;
  color: #666;
}
.list_ul {
  width: 100%;
  background-color: #f7f7f7;
}
.list_ul .list_li {
  display: block;
  margin: 0 auto;
  width: 94%;
  /*height: 1.54rem;*/
  border-bottom: 1px solid #eaeaea;
}
.list_ul .list_li .li_left {
  /*height: 1.54rem;*/
  float: left;
}
.list_ul .list_li .li_left .yellow_circle {
  width: 0.9rem;
  height: 0.9rem;
  background-color: #fec51c;
  color: #fff;
  border-radius: 50%;
  margin: 0.3rem auto;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.9rem;
}
.list_ul .list_li .li_center {
  width: 60%;
  /*height: 1.54rem;*/
  float: left;
  padding-left: 0.3rem;
}
.list_ul .list_li .li_center h4 {
  margin-top: 0.15rem;
  font-size: 0.3rem;
  font-weight: 400;
  line-height: 0.45rem;
  /*height: .9rem;*/
  font-family: 'Microsoft YaHei';
  color: #333333;
}
.list_ul .list_li .li_center .time {
  font-size: 0.24rem;
  color: #777;
  display: block;
  line-height: 0.4rem;
}
.list_ul .list_li .li_right {
  width: 21%;
  height: 1.54rem;
  float: right;
  vertical-align: middle;
  text-align: right;
}
.list_ul .list_li .li_right p {
  font-size: 0.26rem;
  font-weight: 400;
  line-height: 1.54rem;
}
.list_ul .list_li:last-child {
  border-bottom: 1px solid #eee;
}
.hidden {
  display: none;
}
.date_gold em {
  position: absolute;
  width: 0.28rem;
  height: 0.37rem;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -8.13rem -2.5rem;
  top: calc(0.46rem);
  right: 0.2rem;
}
.showlist {
  background-position: -9rem -2.5rem !important;
}
.list_ul .list_li .li_center .info_box .read_info {
  float: left;
  font-size: 0.24rem;
  margin-right: 0.15rem;
}
.list_ul .list_li .li_center .info_box .watch_info {
  float: left;
  font-size: 0.24rem;
}
.pic {
  width: 1.3rem !important;
  height: 1rem !important;
  margin: 0.3rem auto;
  line-height: 1.3rem;
  background-color: #f7f7f7 !important;
}
.pic img {
  width: 100%;
  height: 100%;
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
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
  font-size: 0.3rem;
}
.swiper-container > span {
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

.threeDay {
  width: 100%;
  height: 1.16rem;
  background-color: #f7f7f7;
  color: #777;
  font-size: 0.3rem;
  text-align: center;
  line-height: 1.16rem;
}
.footbox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footbox .threeDay {
  width: 100%;
  height: 1.16rem;
  background-color: #f7f7f7;
  color: #777;
  font-size: 0.3rem;
  text-align: center;
  line-height: 1.16rem;
}
</style>
