import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    id: '1',
    cid: '1',
    userId: '',
    status: '104',
    selected: [],
    selectType: '',
    selectTime: '',
    wxPay: {
      a: '2'
    }
  },
  mutations: {
    id (state, msg) {
      state.id = msg
    },
    cid (state, msg) {
      state.cid = msg
    },
    getUserId (state, msg) {
      state.userId = msg
    },
    status (state, msg) {
      state.status = msg
    },
    selected (state, msg) {
      state.selected = msg
    },
    selectType (state, msg) {
      state.selectType = msg
    },
    selectTime (state, msg) {
      state.selectTime = msg
    },
    wxPay (state, msg) {
      state.wxPay = msg
    }
  }
})
export default store
