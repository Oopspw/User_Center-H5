<template>
  <div v-title="$route.meta.title">
    <div class="jieshao">
      <em></em>
      <h3>会员等级介绍</h3>
      <p>会员等级是基于用户一定时期内使用呱呱头条累计获取的成长值所决定，用户达到相应的等级门槛即可升级。用户可通过签到、分享文章、完成任务、收徒、唤醒徒弟等方式来获取成长值，从而提升等级。</p>
    </div>
    <div class="youxiaoqi">
      <em></em>
      <h3>等级有效期</h3>
      <p>会员等级永久有效</p>
    </div>
    <div class="shengji">
      <em></em>
      <h3>升级规则</h3>
      <p>升级：用户在等级有效期内成长值达到升级门槛值，新等级立即生效。</p>
    </div>
    <div class="levelbiao">
      <em></em>
      <h3>会员等级对照表</h3>
      <p>用户成长值达到对应升级门槛，则立即升级。</p>
    </div>
    <table border="1" cellspacing="0" cellpadding="0">
      <tr align="center" bgcolor="#000">
        <th>等级</th>
        <th>对应等级门槛</th>
      </tr>
      <tr align="center">
        <td>普通会员</td>
        <td>0</td>
      </tr>
      <tr align="center">
        <td>铜牌会员</td>
        <td>10000</td>
      </tr>
      <tr align="center">
        <td>银牌会员</td>
        <td>50000</td>
      </tr>
      <tr align="center">
        <td>金牌会员</td>
        <td>150000</td>
      </tr>
    </table>
    <div class="nullbox"></div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      url: window.config.api.postUrl,
      showlogout: 0
    }
  },
  updated: function() {},
  components: {},
  mounted: function() {
    let _this = this
    _this.changeTitle('等级规则')
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
    }
  }
}
</script>
<style scoped>
body {
  background-color: #fff;
}
.jieshao {
  width: 100%;
  /* height: 2.38rem; */
  padding: 0.25rem 0.75rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
}
.jieshao em {
  position: absolute;
  width: 0.42rem;
  height: 0.42rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -2.31rem -6.3rem;
  top: 0.26rem;
  left: 0.24rem;
}
.jieshao h3 {
  font-size: 0.36rem;
  margin-bottom: 0.2rem;
  color: #333333;
}
.jieshao p {
  font-size: 0.32rem;
  color: #777;
  line-height: 0.42rem;
}
.youxiaoqi {
  width: 100%;
  /* height: 1.32rem; */
  padding: 0.25rem 0.75rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
}
.youxiaoqi em {
  position: absolute;
  width: 0.42rem;
  height: 0.42rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -3.24rem -6.3rem;
  top: 0.26rem;
  left: 0.24rem;
}
.youxiaoqi h3 {
  font-size: 0.36rem;
  margin-bottom: 0.2rem;
  color: #333333;
}
.youxiaoqi p {
  font-size: 0.32rem;
  color: #777;
  line-height: 0.42rem;
}
.shengji {
  width: 100%;
  /* height: 1.68rem; */
  padding: 0.25rem 0.75rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
}
.shengji em {
  position: absolute;
  width: 0.42rem;
  height: 0.42rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -1.39rem -6.3rem;
  top: 0.26rem;
  left: 0.24rem;
}
.shengji h3 {
  font-size: 0.36rem;
  margin-bottom: 0.2rem;
  color: #333333;
}
.shengji p {
  font-size: 0.32rem;
  color: #777;
  line-height: 0.42rem;
}
.levelbiao {
  width: 100%;
  padding: 0.25rem 0.75rem;
  position: relative;
}
.levelbiao em {
  position: absolute;
  width: 0.42rem;
  height: 0.42rem;
  background: url(../assets/images/newApp1.png) no-repeat;
  background-size: 10.8rem;
  background-position: -0.47rem -6.3rem;
  top: 0.26rem;
  left: 0.24rem;
}
.levelbiao h3 {
  font-size: 0.36rem;
  margin-bottom: 0.2rem;
  color: #333333;
}
.levelbiao p {
  font-size: 0.32rem;
  color: #777;
  line-height: 0.42rem;
}
table {
  width: 6rem;
  height: 3.76rem;
  margin: 0 auto;
  font-size: 0.32rem;
  border: 1px solid #d4d4d4;
}
table tr th {
  background-color: #e6e6e6;
  border: 1px solid #d4d4d4;
  vertical-align: middle;
  color: #333333;
}
table tr td {
  border: 1px solid #d4d4d4;
  vertical-align: middle;
  color: #333333;
}
.nullbox {
  width: 100%;
  height: 1rem;
}
</style>
