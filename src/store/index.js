/*
 * @Author      : Mr.bin
 * @Date        : 2023-06-16 21:07:51
 * @LastEditTime: 2023-06-19 15:27:42
 * @Description : Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* P1、P2调零基准值 */
    zeroStandard: {
      oneStandard: null,
      twoStandard: null
    },

    /* 订单号 */
    orderId: '',

    /* 当前登录的用户及其信息 */
    currentUserInfo: {
      userId: '', // 用户id
      userName: '', // 姓名
      sex: '', // 性别（男、女）
      height: '', // 身高
      weight: '', // 体重
      birthday: '', // 出生日期
      admission: '', // 住院号
      stage: '' // MTT分期类型
    },

    /* 参数配置数组 */
    settings: [],

    /* 下一个设备的名称（用于结束后提示下一个设备，增加用户体验） */
    nextDevice: '',

    /* 语音开关 */
    voiceSwitch: true,

    /* 全身肌力测试专用 */
    /* 测试项目选择（多选） */
    selectResult: [],
    /* 测试最终结果 */
    resultValue: {
      cvRearProtraction: null, // 颈椎后伸，cervical-vertebra-rearProtraction
      cvAnteflexion: null, // 颈椎前屈，cervical-vertebra-anteflexion
      cvRightSide: null, // 颈椎右侧屈，cervical-vertebra-rightSi
      cvLeftSide: null, // 颈椎左侧屈，cervical-vertebra-leftSide
      tRearProtraction: null, // 躯干后伸，trunk-rearProtraction
      tAnteflexion: null, // 躯干前屈，trunk-anteflexion
      tLeftSide: null, // 躯干左侧屈，trunk-leftSide
      tRightSide: null, // 躯干右侧屈，trunk-rightSi
      ulPush: null, // 上肢推，upper-limb-push
      ulPull: null, // 上肢拉，upper-limb-pull
      ulLeftAbducent: null, // 上肢左外展，upper-limb-leftAbducent
      ulRightAbducent: null, // 上肢右外展，upper-limb-rightAbduce
      llAfterLeftOut: null, // 下肢左后伸，lower-limb-afterLeftOut
      llAfterRightOut: null, // 下肢右后伸，lower-limb-afterRightOut
      llLeftAbducent: null, // 下肢左外展，lower-limb-leftAbducent
      llRightAbducent: null, // 下肢右外展，lower-limb-rightAbducent
      llLeftInsideCollect: null, // 下肢左内收，lower-limb-leftInsideCollect
      llRightInsideCollect: null // 下肢右内收，lower-limb-rightInsideCollect
    }
  },

  mutations: {
    /* P1、P2调零基准值 */
    SET_ZEROSTANDARD(state, zeroStandard) {
      state.zeroStandard = zeroStandard
    },

    /* 订单号 */
    SET_ORDERID(state, orderId) {
      state.orderId = orderId
    },

    /* 当前登录的用户及其信息 */
    CHANGE_CURRENTUSERINFO(state, currentUserInfo) {
      state.currentUserInfo = currentUserInfo
    },

    /* 参数配置数组 */
    SET_SETTINGS(state, settings) {
      state.settings = settings
    },

    /* 下一个设备的名称（用于结束后提示下一个设备，增加用户体验） */
    SET_NEXTDEVICE(state, nextDevice) {
      state.nextDevice = nextDevice
    },

    /* 语音开关 */
    SET_VOICESWITCH(state, voiceSwitch) {
      state.voiceSwitch = voiceSwitch
    },

    /* 测试项目选择（多选） */
    CHANGE_SELECTRESULT(state, selectResult) {
      state.selectResult = selectResult
    },

    /* 测试最终结果 */
    CHANGE_RESULTVALUE(state, resultValue) {
      state.resultValue = resultValue
    }
  },

  actions: {
    /* P1、P2调零基准值 */
    setZeroStandard({ commit }, zeroStandard) {
      return new Promise((resolve, reject) => {
        commit('SET_ZEROSTANDARD', zeroStandard)
        resolve()
      })
    },

    /* 订单号 */
    setOrderId({ commit }, orderId) {
      return new Promise((resolve, reject) => {
        commit('SET_ORDERID', orderId)
        resolve()
      })
    },

    /* 当前登录的用户及其信息 */
    changeCurrentUserInfo({ commit }, currentUserInfo) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_CURRENTUSERINFO', currentUserInfo)
        resolve()
      })
    },

    /* 参数配置数组 */
    setSettings({ commit }, settings) {
      return new Promise((resolve, reject) => {
        commit('SET_SETTINGS', settings)
        resolve()
      })
    },

    /* 下一个设备的名称（用于结束后提示下一个设备，增加用户体验） */
    setNextDevice({ commit }, nextDevice) {
      return new Promise((resolve, reject) => {
        commit('SET_NEXTDEVICE', nextDevice)
        resolve()
      })
    },

    /* 语音开关 */
    setVoiceSwitch({ commit }, voiceSwitch) {
      return new Promise((resolve, reject) => {
        commit('SET_VOICESWITCH', voiceSwitch)
        resolve()
      })
    },

    /* 测试项目选择（多选） */
    changeSelectResult({ commit }, selectResult) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_SELECTRESULT', selectResult)
        resolve()
      })
    },

    /* 测试最终结果 */
    changeResultValue({ commit }, resultValue) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_RESULTVALUE', resultValue)
        resolve()
      })
    }
  }
})
