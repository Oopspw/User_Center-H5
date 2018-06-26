<template>
  <div v-title="$route.meta.title">
    <ul>
      <li v-for="(item, index) in mounthList">
        <header @click="getDetailList(item.growntime)" class="show_me">
          <div class="header_box">
            <div class="month_time">{{item.growntime}}</div>
            <div class="sum_num">+{{item.grownpoints}}
            </div>
          </div>
          <em class="show_tips" :class="data==item.growntime?'hide_tips':''"></em>
        </header>
        <ul class="grow_ul" :class="data==item.growntime?'grow_show':''">
          <li class="grow_li clearfix" v-for="(item, index) in detailList">
            <div class="grow_left">
              <h3 class="specific_text">{{item.growndesc}}</h3>
              <span class="specific_time">{{item.createtime}}</span>
            </div>
            <div class="grow_right">+{{item.grownpoint}}</div>
          </li>
        </ul>
      </li>
    </ul>
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
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      showMsg: '',
      //成长值列表 月份
      data: '',
      mounthList: [],
      //成长值列表 详细
      detailList: [],
      warn_content: '',
      warn_type: 0
      // showthis: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.userid = window.localStorage.getItem('userid')
    _this.token = window.localStorage.getItem('token')
    _this.getMonthList()
    setTimeout(function() {
      // 默认选中第一个，获取数据
      $('.show_me')[0].click()
    }, 100)
    _this.changeTitle('成长值记录')
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
    getMonthList: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: _this.Infversion,
        Method: 'QueryGrownMonthListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          console.log(res)
          _this.mounthList = res.data
          if (res.data.length === 0) {
            _this.warn_type = 3
          }
        },
        err => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // 获取日常列表交互
    getDetailList: function(time) {
      let _this = this
      _this.data = time
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: window.config.api.Infversion,
        growntime: time,
        Method: 'QueryGrownDetailListWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          // 成功
          _this.detailList = res.data
          if (res.data.length === 0) {
            _this.showWarnTips('暂无更多数据')
          }
        },
        err => {
          // 失败
          _this.warn_type = 1
          _this.warn_content = res.msg.substr(2)
          setTimeout(() => {
            _this.warn_type = 0
          }, 2000)
        }
      )
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
/* 成长值记录表 */
header {
  width: 100%;
  height: 0.94rem;
  background: #f6f7f9;
  position: relative;
}
header .header_box {
  width: 90%;
  height: 0.94rem;
  margin: 0 auto;
  padding: 0.34rem 0;
  border-bottom: 1px solid #efefef;
}
header .header_box .month_time {
  width: 50%;
  font-size: 0.32rem;
  float: left;
  color: #333333;
}
header .header_box .sum_num {
  width: 30%;
  font-size: 0.32rem;
  float: right;
  text-align: right;
  color: #2ab524;
  margin-right: 0.5rem;
}
header .show_tips {
  width: 0.5rem;
  height: 0.34rem;
  position: absolute;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -8.03rem -2.5rem;
  top: 0.34rem;
  right: 0.3rem;
}
header .hide_tips {
  background-position: -8.88rem -2.5rem;
}
.grow_ul {
  width: 100%;
  background: #fff;
  padding: 0 0.32rem;
  display: none;
}
.grow_show {
  display: block;
}
.grow_ul .grow_li {
  width: 100%;
  height: 1.4rem;
  border-bottom: 1px solid #eaeaea;
}
.grow_ul .grow_li .grow_left {
  float: left;
  height: 1.4rem;
}
.grow_ul .grow_li .grow_left .specific_text {
  font-size: 0.32rem;
  margin: 0.33rem 0 0.21rem 0;
  color: #333333;
}
.grow_ul .grow_li .grow_left .specific_time {
  display: block;
  font-size: 0.26rem;
  color: #777;
}
.grow_ul .grow_li .grow_right {
  float: right;
  height: 1.4rem;
  font-size: 0.26rem;
  line-height: 1.4rem;
  text-align: right;
}
.grow_ul .grow_li:last-child {
  border-bottom: none;
}
#pullUp {
  width: 100%;
  height: 0.6rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.6rem;
}
.data_tips {
  padding-top: 0.2rem;
  font-size: 0.3rem;
  text-align: center;
  color: #333333;
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
