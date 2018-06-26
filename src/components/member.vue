<template>
  <div v-title="$route.meta.title">
    <!-- 会员信息 -->
    <div class="head_member" @click="getRecord">
      <div class="head_left">
        <img class="head_img" v-bind:src="img_src" v-if="img_src!==''">
        <div class="default_img" v-else>
        </div>
      </div>
      <div class="head_center">
        <h4>{{nickname}}</h4>
        <span class="dispoint">{{grownpoint}}成长值
          <u class="triangle-right"></u>
        </span>
        <span class="join_time">加入时间:{{join_time}}</span>
      </div>
      <div class="head_right">
        <img class="member_icon" v-bind:src="lvIcon">
      </div>
    </div>

    <!-- 会员等级情况 -->
    <div class="upgrade_info" @click="getRecord">
      <h1>升级</h1>
      <div class="level_show">
        <div class="ex_num">{{grownpoint}}</div>
        <div class="level_need">{{levelMax}}</div>
        <div class="level_line"></div>
        <div class="now_line"></div>
      </div>
      <h3>再获得
        <i class="need_ex">{{needGrown}}</i>成长值升级为
        <span class="next_level">{{memberName}}</span>
        <u class="triangle-right"></u>
      </h3>
    </div>

    <!-- 可切换分栏 -->
    <nav class="clearfix">
      <div :class="select==1?'select':''" class="nav_box" id="level_general">
        <h4 @click="selected(1,4,lv)">普通</h4>
      </div>
      <div :class="select==2?'select':''" class="nav_box" id="level_copper">
        <h4 @click="selected(2,6,lv)">铜牌</h4>
      </div>
      <div :class="select==3?'select':''" class="nav_box" id="level_silver">
        <h4 @click="selected(3,8,lv)">银牌</h4>
      </div>
      <div :class="select==4?'select':''" class="nav_box" id="level_gold">
        <h4 @click="selected(4,10,lv)">金牌</h4>
      </div>
    </nav>

    <!-- 详情列表 -->
    <div v-if="select==1" class="member_list" id="general">
      <h3 class="list_title">
        <i class="title_icon general_icon"></i>普通会员</h3>
      <ul class="member_ul">
        <li class="member_li clearfix">
          <h2>兑换特权</h2>
          <p>随时兑换，7天内到账</p>
        </li>
        <li class="member_li clearfix">
          <h2>奖励特权</h2>
          <p>徒弟分享收入的15%</p>
        </li>
        <li class="member_li clearfix">
          <h2>成长特权</h2>
          <p>成长值速度×1.0倍</p>
        </li>
        <li class="member_li clearfix">
          <h2>升级条件</h2>
          <p>注册</p>
        </li>
      </ul>
    </div>

    <div v-if="select==2" class="member_list" id="copper">
      <h3 class="list_title">
        <i class="title_icon copper_icon"></i>铜牌会员</h3>
      <ul class="member_ul">
        <li class="member_li clearfix">
          <h2>赚钱特权</h2>
          <p>文章分享单价+10金币</p>
        </li>
        <li class="member_li clearfix">
          <h2>兑换特权</h2>
          <p>随时兑换,次日24点前到账</p>
        </li>
        <li class="member_li clearfix">
          <h2>奖励特权</h2>
          <p>徒弟分享收入的15%,徒孙分享收入的20%</p>
        </li>
        <li class="member_li clearfix">
          <h2>成长特权</h2>
          <p>成长值速度x1.2倍</p>
        </li>
        <li class="member_li clearfix">
          <h2>升级条件</h2>
          <p>成长值大于等于10000</p>
        </li>
      </ul>
    </div>

    <div v-if="select==3" class="member_list" id="silver">
      <h3 class="list_title">
        <i class="title_icon silver_icon"></i>银牌会员</h3>
      <ul class="member_ul">
        <li class="member_li clearfix">
          <h2>赚钱特权</h2>
          <p>文章分享单价+20金币</p>
        </li>
        <li class="member_li clearfix">
          <h2>兑换特权</h2>
          <p>随时兑换,次日24点前到账</p>
        </li>
        <li class="member_li clearfix">
          <h2>奖励特权</h2>
          <p>徒弟分享收入的20%,徒孙分享收入的25%</p>
        </li>
        <li class="member_li clearfix">
          <h2>成长特权</h2>
          <p>成长值速度x1.4倍</p>
        </li>
        <li class="member_li clearfix">
          <h2>升级条件</h2>
          <p>成长值大于等于50000</p>
        </li>
      </ul>
    </div>

    <div v-if="select==4" class="member_list" id="gold">
      <h3 class="list_title">
        <i class="title_icon gold_icon"></i>金牌会员</h3>
      <ul class="member_ul">
        <li class="member_li clearfix">
          <h2>赚钱特权</h2>
          <p>文章分享单价+30金币</p>
        </li>
        <li class="member_li clearfix">
          <h2>兑换特权</h2>
          <p>随时兑换,实时到账</p>
        </li>
        <li class="member_li clearfix">
          <h2>奖励特权</h2>
          <p>徒弟分享收入的20%,徒孙分享收入的30%</p>
        </li>
        <li class="member_li clearfix">
          <h2>成长特权</h2>
          <p>成长值速度x1.6倍</p>
        </li>
        <li class="member_li clearfix">
          <h2>升级条件</h2>
          <p>成长值大于等于150000</p>
        </li>
      </ul>
    </div>

    <!-- 成长值获取方式 -->
    <div class="get_way">
      <h3 class="get_title">成长值获得方式</h3>
      <ul class="get_ul">
        <li class="get_li" @click="sendInfoToApp('11')">
          <div class="li_left">
            <div class="get_icon"></div>
          </div>
          <div class="li_center">
            <h4>签到</h4>
            <span class="tip_content">连续签到最高+{{levelItem.grownpointqiandao}}成长值</span>
          </div>
          <em></em>
        </li>
        <li class="get_li" @click="sendInfoToApp('3')">
          <div class="li_left">
            <div class="get_icon icon2"></div>
          </div>
          <div class="li_center">
            <h4>分享文章</h4>
            <span class="tip_content">分享文章每1个有效点击+{{levelItem.grownpointfenxiang}}成长值(次日到账)</span>
          </div>
          <em></em>
        </li>
        <li class="get_li" @click="sendInfoToApp('11')">
          <div class="li_left">
            <div class="get_icon icon3"></div>
          </div>
          <div class="li_center">
            <h4>完成任务</h4>
            <span class="tip_content">每完成1个任务+{{levelItem.grownpointrenwu}}成长值</span>
          </div>
          <em></em>
        </li>
        <li class="get_li" @click="sendInfoToApp('4')">
          <div class="li_left">
            <div class="get_icon icon4"></div>
          </div>
          <div class="li_center">
            <h4>收徒、唤醒徒弟</h4>
            <span class="tip_content">每收取1个有效徒弟+{{levelItem.grownpointshoutu}}成长值</span>
          </div>
          <em></em>
        </li>
      </ul>
    </div>
    <div class="footbox">
      <h3>什么是有效徒弟？</h3>
      <p>新收取的徒弟连续三天有获得文章分享、收徒奖励、任务奖励带来的收益之一，即为有效徒弟。</p>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import tip from 'components/tip'
export default {
  name: 'selection',
  data: function() {
    return {
      url: window.config.api.postUrl,
      userid: '',
      token: '',
      Infversion: window.config.api.Infversion,
      showlogout: 0,
      select: 1,
      nickname: '',
      join_time: '',
      lvIcon: '',
      grownpoint: '',
      img_src: '',
      needGrown: '',
      userLevelInfo: [],
      levelItem: {},
      memberName: '',
      lv: '',
      levelMax: '',
      warn_content: '',
      warn_type: 0
    }
  },
  components: { tip },
  computed: {},
  updated: function() {},
  mounted() {
    let _this = this
    _this.userid = _this.$getHashParameter('userid')
    _this.token = _this.$getHashParameter('token')
    _this.getMember()
    //给ios传该组件的标题
    _this.changeTitle('会员特权')
    //关闭按钮的方法
    _this.showCloseBtn('no')
    //右上角按钮的方法
    _this.showRightBtn('yes')
    window.localStorage.setItem('userid', _this.userid)
    window.localStorage.setItem('token', _this.token)
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
    // app关闭按钮显示与否 'yes'为显示 'no'为不显示
    showCloseBtn: function(shwotype) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showCloseBtn.postMessage(shwotype)
      } else {
        window.taskCentre.showCloseBtn(shwotype)
      }
    },
    // app跳转页面按钮的显示与否 'yes'为显示 'no'为不显示
    showRightBtn: function(shwotype) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showRightBtn.postMessage(shwotype)
      } else {
        window.taskCentre.showRightBtn(shwotype)
      }
    },
    //跳转至原生页面的方法
    sendInfoToApp: function(jumpNum) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(jumpNum)
      } else {
        window.taskCentre.gofinish(jumpNum)
      }
    },
    selected: function(num, nowlv, lv) {
      //数组序号，点击当前需要显示的等级，用户目前现在的等级
      let _this = this
      let flag = lv * 1 //用户
      if (num === 1 && nowlv === 4) {
        //点击普通会员
        _this.select = 1
        if (flag === 4) {
          _this.levelItem = _this.userLevelInfo.levelitem[num] //进度条信息
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.memberName = '铜牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num] //特权详细信息
        } else if (flag === 6) {
          _this.levelItem = _this.userLevelInfo.levelitem[num + 1]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.memberName = '银牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 8) {
          _this.levelItem = _this.userLevelInfo.levelitem[num + 2]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          //_this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '金牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 10) {
          //当前等级为金牌会员
          $('.upgrade_info').hide()
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        }
      } else if (num === 2 && nowlv === 6) {
        //点击铜牌会员
        _this.select = 2
        if (flag === 4) {
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmingrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '铜牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 6) {
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.memberName = '银牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 8) {
          _this.levelItem = _this.userLevelInfo.levelitem[num + 1]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          //_this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '金牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 10) {
          //当前等级为金牌会员
          $('.upgrade_info').hide()
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        }
      } else if (num === 3 && nowlv === 8) {
        //点击银牌会员
        _this.select = 3
        if (flag === 4) {
          _this.levelItem = _this.userLevelInfo.levelitem[num - 1]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          //_this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '银牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 6) {
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmingrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min - 100000
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '银牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 8) {
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          //_this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '金牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        } else if (flag === 10) {
          //当前等级为金牌会员
          $('.upgrade_info').hide()
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        }
      } else if (num === 4 && nowlv === 10) {
        //点击金牌用户
        _this.select = 4
        if (flag === 4) {
          //当前等级为普通会员
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmingrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '金牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          $('.upgrade_info').show()
        } else if (flag === 6) {
          //当前等级为铜牌会员
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmingrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          _this.memberName = '金牌会员'
          _this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          $('.upgrade_info').show()
        } else if (flag === 8) {
          //当前等级为银牌会员
          _this.levelItem = _this.userLevelInfo.levelitem[num - 1]
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          _this.levelMax = max
          // _this.needGrown = parseInt(_this.levelItem.levelmingrownpoint) - min
          _this.memberName = '金牌会员'
          _this.levelItem = _this.userLevelInfo.levelitem[num]
          $('.upgrade_info').show()
        } else if (flag === 10) {
          //当前等级为金牌会员
          $('.upgrade_info').hide()
          _this.levelItem = _this.userLevelInfo.levelitem[num]
        }
      }
    },
    // 获取会员特权接口信息
    getMember: function() {
      let _this = this
      let url = _this.url
      let data = {
        userid: _this.userid,
        token: _this.token,
        Infversion: _this.Infversion,
        Method: 'QueryUserLevelInfoWap'
      }
      _this.$apiPost(
        url,
        data,
        res => {
          console.log(res)
          _this.userLevelInfo = res.data //用户等级信息
          _this.grownpoint = res.data.grownpoint //用户成长值
          _this.lvIcon = res.data.lvicon //当前会员等级的icon
          _this.lv = res.data.lv //用户当前会员等级
          //对用户等级进行判断，默认选中当前会员等级所属的相关信息
          if (_this.lv == '4') {
            _this.select = 1
            _this.levelItem = _this.userLevelInfo.levelitem[1]
            _this.memberName = '铜牌会员'
          } else if (_this.lv == '6') {
            _this.select = 2
            _this.levelItem = _this.userLevelInfo.levelitem[2]
            _this.memberName = '银牌会员'
          } else if (_this.lv == '8') {
            _this.select = 3
            _this.levelItem = _this.userLevelInfo.levelitem[3]
            _this.memberName = '金牌会员'
          } else {
            _this.select = 4
            _this.levelItem = _this.userLevelInfo.levelitem[4]
            $('.upgrade_info').hide()
          }
          let leftPercent
          let max = parseInt(_this.levelItem.levelmaxgrownpoint)
          let min = parseInt(_this.grownpoint)
          _this.levelMax = max
          _this.needGrown = max - min
          if (max > min) {
            leftPercent = (min / max - 1) * 100 + '%'
          } else {
            leftPercent = '0%'
          }
          $('.now_line').css('left', leftPercent)
          //计算成长值进度条
          _this.nickname = res.data.nickname //用户昵称
          //用户加入时间
          _this.join_time = res.data.jointime.replace(
            /(\d{4}).(\d{1,2}).(\d{1,2}).+/gm,
            '$1年$2月$3日'
          )
          //用户头像地址
          _this.img_src = res.data.photo
        },
        err => {
          // 失败
          _this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    // 跳转到成长值的方法
    getRecord: function() {
      let _this = this
      _this.$router.push('/growRecord')
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
window['clearMe'] = function() {
  localStorage.clear()
}
</script>
<style>
body {
  background-color: #f7f7f7;
}
/* 会员信息 */
.head_member {
  width: 100%;
  height: 2.06rem;
  background-color: #fff;
  margin-bottom: 0.17rem;
  padding-left: 0.16rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 0.1rem solid transparent;
  border-left: 0.15rem solid #817d7a;
  border-bottom: 0.1rem solid transparent;
}
.head_member .head_left {
  float: left;
  height: 2.06rem;
  margin-right: 0.2rem;
}
.head_member .head_left .head_img {
  width: 1rem;
  height: 1rem;
  margin-top: 0.54rem;
  border-radius: 50%;
}
.head_member .head_left .default_img {
  width: 0.98rem;
  height: 0.98rem;
  margin-top: 0.54rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -4rem -5.93rem;
  border-radius: 50%;
}
.head_member .head_center {
  height: 2.06rem;
  float: left;
}
.head_member .head_center h4 {
  color: #333333;
  margin-top: 0.54rem;
  font-size: 0.36rem;
  font-weight: 400;
  margin-bottom: 0.1rem;
}
.head_member .head_center .dispoint {
  display: block;
  color: #817d7a;
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
}
.head_member .head_center .join_time {
  font-size: 0.26rem;
  color: #817d7a;
  display: block;
}
.head_member .head_right {
  height: 2.06rem;
  float: right;
}
.head_member .head_right .member_icon {
  width: 1.6rem;
  margin: 0.4rem 0.4rem 0 0;
  position: absolute;
  right: 0;
}
.head_member .head_right .triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 0.1rem solid transparent;
  border-left: 0.15rem solid #817d7a;
  border-bottom: 0.1rem solid transparent;
}
/* 会员等级 */
.upgrade_info {
  width: 100%;
  height: 2.76rem;
  background-color: #fff;
  margin-bottom: 0.17rem;
  padding-top: 0.45rem;
}
.upgrade_info h1 {
  font-size: 0.44rem;
  font-weight: 500;
  color: #f5ad00;
  text-align: center;
}
.upgrade_info .level_show {
  width: 6rem;
  height: 0.69rem;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.upgrade_info .level_show .ex_num {
  width: 0.83rem;
  height: 0.63rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.2rem;
  background-position: -7.25rem -4.13rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.5rem;
  color: #f7b000;
  float: left;
}
.upgrade_info .level_show .level_need {
  height: 0.63rem;
  float: right;
  font-size: 0.34rem;
  font-weight: 400;
  line-height: 0.63rem;
  color: #f7b000;
}
.upgrade_info .level_show .level_line {
  height: 0.06rem;
  width: 6rem;
  background-color: #f7edd2;
  position: absolute;
  bottom: 0;
  left: 0;
}
.upgrade_info .level_show .now_line {
  height: 0.06rem;
  width: 6rem;
  background-color: #f7b000;
  position: absolute;
  bottom: 0;
  left: -6rem;
}
.upgrade_info h3 {
  font-size: 0.32rem;
  text-align: center;
  margin-top: 0.35rem;
}
.upgrade_info h3 .need_ex {
  font-size: 0.34rem;
  font-weight: 400;
  color: #f7b000;
}
/* 可切换分栏 */
nav {
  width: 100%;
  height: 0.96rem;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
}
nav .nav_box {
  float: left;
  width: 25%;
  height: 0.96rem;
  text-align: center;
  padding-top: 0.24rem;
}
nav .nav_box h4 {
  font-size: 0.32rem;
  line-height: 0.46rem;
}
nav .select {
  border-bottom: 0.04rem solid #2ab526;
  color: #2ab526;
}
/* 详情列表 */
.member_list {
  width: 100%;
  background-color: #fff;
  padding-top: 0.25rem;
  margin-bottom: 0.17rem;
}
.member_list .list_title {
  height: 0.72rem;
  width: 100%;
  text-align: center;
  font-size: 0.36rem;
  line-height: 0.72rem;
  padding-left: 0.6rem;
  position: relative;
}
.member_list .list_title .title_icon {
  width: 0.49rem;
  height: 0.49rem;
  background: url('../assets/images/newApp2.png') no-repeat;
  background-size: 2.9rem;
  background-position: -0.27rem -0.27rem;
  top: 0.12rem;
  left: 2.75rem;
  position: absolute;
}
.member_list .list_title .copper_icon {
  background-position: -0.85rem -0.27rem;
}
.member_list .list_title .silver_icon {
  background-position: -1.46rem -0.27rem;
}
.member_list .list_title .gold_icon {
  background-position: -2.06rem -0.27rem;
}
.member_list .list_title::before {
  content: '';
  position: absolute;
  height: 1px;
  width: 2.5rem;
  left: 0;
  top: 0.36rem;
  background-color: #eaeaea;
}
.member_list .list_title::after {
  content: '';
  position: absolute;
  height: 1px;
  width: 2.5rem;
  right: 0;
  top: 0.36rem;
  background-color: #eaeaea;
}
.member_list .member_ul {
  width: 100%;
  background-color: #fff;
}
.member_list .member_ul .member_li {
  width: 90%;
  height: 1rem;
  margin: 0 auto;
  border-bottom: 1px solid #eaeaea;
}
.member_list .member_ul .member_li h2 {
  float: left;
  font-size: 0.32rem;
  line-height: 1rem;
  font-weight: 500;
  margin-right: 0.26rem;
}
.member_list .member_ul .member_li p {
  float: left;
  font-size: 0.26rem;
  color: #777777;
  line-height: 1rem;
}
.member_list .member_ul .member_li:last-child {
  border-bottom: none;
}
/* 成长值获取方式 */
.get_way {
  width: 100%;
  background-color: #fff;
}
.get_way .get_title {
  width: 100%;
  height: 0.98rem;
  font-size: 0.32rem;
  line-height: 0.98rem;
  padding-left: 0.3rem;
  font-weight: 500;
  border-bottom: 1px solid #eaeaea;
}
.get_way .get_ul {
  width: 100%;
  background-color: #fff;
}
.get_way .get_ul .get_li {
  width: 90%;
  height: 1.29rem;
  margin: 0 auto;
  border-bottom: 1px solid #eaeaea;
  position: relative;
}
.get_way .get_ul .get_li .li_left {
  height: 1.29rem;
  float: left;
}
.get_way .get_ul .get_li .li_left .get_icon {
  margin-top: 0.36rem;
  margin-right: 0.2rem;
  width: 0.69rem;
  height: 0.69rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -0.51rem -0.48rem;
}
.get_way .get_ul .get_li .li_left .icon2 {
  background-position: -1.57rem -0.48rem;
}
.get_way .get_ul .get_li .li_left .icon3 {
  background-position: -2.62rem -0.48rem;
}
.get_way .get_ul .get_li .li_left .icon4 {
  background-position: -3.68rem -0.48rem;
}
.get_way .get_ul .get_li .li_center {
  height: 1.29rem;
  float: left;
}
.get_way .get_ul .get_li .li_center h4 {
  margin-top: 0.36rem;
  font-size: 0.28rem;
  margin-bottom: 0.15rem;
}
.get_way .get_ul .get_li .li_center .tip_content {
  font-size: 0.24rem;
  color: #f88f1a;
  display: block;
}
.get_way .get_ul .get_li em {
  position: absolute;
  width: 0.28rem;
  height: 0.37rem;
  background-color: #2ab526;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -10.4rem -2.5rem;
  top: calc(0.46rem);
  right: 0;
}
.get_way .get_ul .get_li:last-child {
  border-bottom: none;
}
.footbox {
  width: 100%;
  color: #aaa;
  padding: 0.4rem 0.2rem 0.2rem 0.2rem;
  margin-bottom: 2rem;
}
.footbox h3 {
  font-size: 0.32rem;
  margin-bottom: 0.1rem;
}
.footbox p {
  font-size: 0.28rem;
  line-height: 0.42rem;
}
</style>
