import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(Router)
Vue.use(VueResource)
Vue.config.debug = true
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: () => import('components/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('components/exchange.vue'),
      meta: {
        title: '我要兑换'
      }
    },
    {
      path: '/setwechat',
      name: 'setwechat',
      component: () => import('components/setWechat.vue'),
      meta: {
        title: '绑定微信'
      }
    },
    {
      path: '/income',
      name: 'income',
      component: () => import('components/income.vue'),
      meta: {
        title: '收入明细'
      }
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('components/member.vue'),
      meta: {
        title: '会员特权'
      }
    },
    {
      path: '/setalipay',
      name: 'setalipay',
      component: () => import('components/setAlipay.vue'),
      meta: {
        title: '绑定支付宝'
      }
    },
    {
      path: '/exchangerecord',
      name: 'exchangerecord',
      component: () => import('components/exchangeRecord.vue'),
      meta: {
        title: '兑换记录'
      }
    },
    {
      path: '/exchangesuccess',
      name: 'exchangesuccess',
      component: () => import('components/exchangeSuccess.vue'),
      meta: {
        title: '兑换成功'
      }
    },
    {
      path: '/growrecord',
      name: 'growrecord',
      component: () => import('components/growRecord.vue'),
      meta: {
        title: '成长值记录'
      }
    },
    {
      path: '/levelrule',
      name: 'levelrule',
      component: () => import('components/levelRule.vue'),
      meta: {
        title: '等级规则'
      }
    },
    {
      path: '/bank',
      name: 'bank',
      component: () => import('components/bank.vue'),
      meta: {
        title: '微信实名认证'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('components/card.vue'),
      meta: {
        title: '微信实名认证'
      }
    },
    {
      path: '/name',
      name: 'name',
      component: () => import('components/name.vue'),
      meta: {
        title: '查看真实姓名'
      }
    },
    {
      path: '/master',
      name: 'master',
      component: () => import('components/master.vue'),
      meta: {
        title: '师徒'
      }
    },
    {
      path: '/mycode',
      name: 'mycode',
      component: () => import('components/mycode.vue'),
      meta: {
        title: '我的邀请码'
      }
    },
    {
      path: '/acceptApper',
      name: 'acceptApper',
      component: () => import('components/acceptApper.vue'),
      meta: {
        title: '如何收徒'
      }
    },
    {
      path: '/importCode',
      name: 'importCode',
      component: () => import('components/importCode.vue'),
      meta: {
        title: '输入邀请码'
      }
    },
    {
      path: '/redIndex',
      name: 'redIndex',
      component: () => import('components/redIndex.vue'),
      meta: {
        title: '抢红包'
      }
    },
    {
      path: '/redHistory',
      name: 'redHistory',
      component: () => import('components/redHistory.vue'),
      meta: {
        title: '往期红包记录'
      }
    }
  ]
})
