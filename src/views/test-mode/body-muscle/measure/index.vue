<!--
 * @Author      : Mr.bin
 * @Date        : 2023-06-19 10:34:54
 * @LastEditTime: 2023-06-30 17:38:54
 * @Description : 全身肌力测试-具体测量
-->
<template>
  <div class="body-muscle-measure">
    <div class="wrapper">
      <!-- 顶部栏 -->
      <el-page-header
        class="page"
        title="退出订单"
        :content="chineseName"
        @back="handleExit"
      ></el-page-header>

      <!-- 左区域 -->
      <div class="left">
        <!-- 图形 -->
        <div class="chart">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <el-button
            class="item"
            type="success"
            round
            :disabled="testValueArray.length === 3 || isStart ? true : false"
            @click="handleStart"
            >开始测量</el-button
          >
        </div>
      </div>

      <div class="divider"></div>

      <!-- 右区域 -->
      <div class="right">
        <!-- 倒计时 -->
        <div class="time">
          <el-image class="img" :src="timeBgSrc" fit="scale-down"></el-image>
          <div class="text">倒计时</div>
          <div class="value">{{ nowTime }}</div>
        </div>

        <!-- 测量结果 -->
        <div class="result">
          <el-image :src="testValueSrc" fit="scale-down"></el-image>
          <div class="title">测量数值</div>
          <div class="item1">
            <el-input class="value" v-model="testValueArray[0]" disabled>
              <template slot="prepend">1</template>
            </el-input>
          </div>
          <div class="item2">
            <el-input class="value" v-model="testValueArray[1]" disabled>
              <template slot="prepend">2</template>
            </el-input>
          </div>
          <div class="item3">
            <el-input class="value" v-model="testValueArray[2]" disabled>
              <template slot="prepend">3</template>
            </el-input>
          </div>
        </div>

        <!-- 其他按钮组 -->
        <div class="btn">
          <el-button class="item" type="primary" round @click="handleRefresh"
            >刷新页面</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

import {
  calculateRecommend,
  calculateMuscleRate,
  calculateScore,
  calculateClassification
} from '../utils/index.js'

export default {
  name: 'body-muscle-measure',

  data() {
    return {
      /* 路由传参 */
      testName: JSON.parse(this.$route.query.testName),
      chineseName: JSON.parse(this.$route.query.chineseName),

      timeBgSrc: require('@/assets/img/Test/Measure/倒计时背景.png'), // 倒计时背景
      testValueSrc: require('@/assets/img/Test/Measure/测量数值背景.png'), // 测量数值背景

      /* 按钮禁用控制 */
      isStart: false,

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      /* 其他 */
      timeClock: null, // 计时器
      time: 10, // 倒计时，默认10秒
      nowTime: 10, // 实时倒计时

      oneK: 0, // P1的K
      twoK: 0, // P2的K
      oneStandard: 0, // P1调零值
      twoStandard: 0, // P2调零值

      oneWeight: 0, // P1负重（kg），精确到0.01kg
      twoWeight: 0, // P2负重（kg），精确到0.01kg
      oneWeightArray: [], // P1负重数组
      twoWeightArray: [], // P2负重数组

      // 使用P1的测试项目
      useP1: [
        'cvRearProtraction',
        'cvAnteflexion',
        'cvRightSide',
        'cvLeftSide',
        'tRearProtraction',
        'ulPush',
        'ulPull'
      ],
      // 使用P2的测试项目
      useP2: [
        'tAnteflexion',
        'tLeftSide',
        'tRightSide',
        'ulLeftAbducent',
        'ulRightAbducent',
        'llAfterLeftOut',
        'llAfterRightOut',
        'llLeftAbducent',
        'llRightAbducent',
        'llLeftInsideCollect',
        'llRightInsideCollect'
      ],

      /* 结果相关 */
      testValueArray: [] // 该项目测量值数组
    }
  },

  created() {
    this.oneK = parseFloat(window.localStorage.getItem('oneK'))
    this.twoK = parseFloat(window.localStorage.getItem('twoK'))
    this.oneStandard = this.$store.state.zeroStandard.oneStandard
    this.twoStandard = this.$store.state.zeroStandard.twoStandard

    this.initSerialPort()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    // 清除计时器
    if (this.timeClock) {
      clearInterval(this.timeClock)
    }
    // 关闭串口
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 退出订单
     */
    handleExit() {
      this.$confirm(
        '订单进行中，此操作会退出该订单，之前的数据将会丢失，是否退出？',
        '警告',
        {
          type: 'warning',
          showClose: true,
          closeOnClickModal: true,
          closeOnPressEscape: true,
          center: true,
          confirmButtonText: '退 出',
          cancelButtonText: '否'
        }
      )
        .then(() => {
          this.$router.push({
            path: '/home'
          })
        })
        .catch(() => {})
    },

    /**
     * @description: 初始化串口对象
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: false // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {
              this.isStart = true
              this.timeClock = setInterval(() => {
                this.nowTime -= 1
                if (this.nowTime === 0) {
                  this.handleOver()
                }
              }, 1000)
            })
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data) // {String} 00326740032826,125

              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              const weightDigital = dataArray[0] // 负重数字量，比如00327640032720

              /* 计算P1、P2负重 */
              this.oneWeight = parseFloat(
                (
                  (parseInt(weightDigital.slice(2, 7)) - this.oneStandard) /
                  -this.oneK
                ).toFixed(1)
              )
              this.twoWeight = parseFloat(
                (
                  (parseInt(weightDigital.slice(9, 14)) - this.twoStandard) /
                  -this.twoK
                ).toFixed(1)
              )
              if (this.oneWeight < 0) {
                this.oneWeight = 0
              }
              if (this.twoWeight < 0) {
                this.twoWeight = 0
              }

              /* 数据校验 */
              if (!isNaN(this.oneWeight) && !isNaN(this.twoWeight)) {
                /* 过滤掉突变值 */
                if (this.oneWeight <= 200 && this.twoWeight <= 200) {
                  /* 数据插入数组中 */
                  this.oneWeightArray.push(this.oneWeight)
                  this.twoWeightArray.push(this.twoWeight)

                  /* 实时渲染图形 */
                  if (this.useP1.includes(this.testName)) {
                    this.option.series[0].data = this.oneWeightArray
                  } else if (this.useP2.includes(this.testName)) {
                    this.option.series[0].data = this.twoWeightArray
                  }
                  this.myChart.setOption(this.option)
                }
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$alert(
              `请重新连接USB线，然后点击"刷新页面"按钮，重新测试！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '刷新页面',
                callback: () => {
                  this.handleRefresh()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$alert(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮，重新测试！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < parseInt(this.time * 10); i++) {
        this.xData.push(parseFloat((i * 0.1).toFixed(1)))
      }

      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        title: {
          text: `${this.chineseName}`,
          left: 'center',
          textStyle: {
            fontSize: 26
          }
        },
        xAxis: {
          type: 'category',
          name: '单位：秒',
          data: this.xData,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          min: 0
          // max: 200
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{c} kg'
        },
        series: [
          {
            data: [' '],
            type: 'line',
            areaStyle: {
              color: 'rgba(174, 217, 206, 1)'
            },
            lineStyle: {
              color: 'rgba(43, 151, 122, 1)'
            },
            markPoint: {
              data: [
                {
                  type: 'max'
                }
              ],
              symbol: 'pin'
            },
            smooth: true,
            showSymbol: false
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
    },

    /**
     * @description: 开始测量按钮
     */
    handleStart() {
      this.oneWeightArray = [0] // 此处保证第一个值是0，为了应付医院
      this.twoWeightArray = [0] // 此处保证第一个值是0，为了应付医院
      this.nowTime = this.time

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }
    },

    /**
     * @description: 结束该次测量按钮
     */
    handleOver() {
      if (this.usbPort) {
        if (this.usbPort.isOpen) {
          this.usbPort.close()

          if (this.timeClock) {
            clearInterval(this.timeClock)
          }
          this.nowTime = this.time

          if (this.testValueArray.length <= 2) {
            if (this.useP1.includes(this.testName)) {
              this.testValueArray.push(Math.max(...this.oneWeightArray))
            } else if (this.useP2.includes(this.testName)) {
              this.testValueArray.push(Math.max(...this.twoWeightArray))
            }
          }

          this.isStart = false

          // 完成项目
          if (this.testValueArray.length === 3) {
            this.finishData()
          }
        }
      }
    },

    /**
     * @description: 完成该项目
     */
    finishData() {
      /* 取数组中的最大值 */
      const testResult = Math.max(...this.testValueArray)

      /* 只有不为NaN和不为零，才算完成本项测试 */
      if (isNaN(testResult)) {
        this.$alert(
          `最终计算结果为${testResult}，请检查测量数值是否有误，然后点击“刷新页面”按钮。`,
          `提示`,
          {
            type: 'warning',
            showClose: false,
            center: true,
            confirmButtonText: '刷新页面',
            callback: () => {
              this.handleRefresh()
            }
          }
        )
      } else if (testResult === 0) {
        this.$alert(
          `最终计算结果为0，请检查测量数值是否有误，然后点击“刷新页面”按钮。`,
          `提示`,
          {
            type: 'warning',
            showClose: false,
            center: true,
            confirmButtonText: '刷新页面',
            callback: () => {
              this.handleRefresh()
            }
          }
        )
      } else {
        /* 最新的测试最终结果，更新到Vuex中 */
        let valueObj = JSON.parse(JSON.stringify(this.$store.state.resultValue))
        valueObj[`${this.testName}`] = testResult
        this.$store.dispatch('changeResultValue', valueObj).then(() => {
          /* 最新的测试项目选择数组，更新到Vuex中 */
          let newSelectResult = JSON.parse(
            JSON.stringify(this.$store.state.selectResult)
          )
          newSelectResult.shift() // 移除第一个元素
          this.$store
            .dispatch('changeSelectResult', newSelectResult)
            .then(() => {
              /* 若测试项目全部完成 */
              if (this.$store.state.selectResult.length === 0) {
                /* 删除Vuex参数配置数组的第一个元素 */
                let settings = JSON.parse(
                  JSON.stringify(this.$store.state.settings)
                )
                settings.shift()
                this.$store.dispatch('setSettings', settings).then(() => {
                  /* 数据 */
                  const currentAge = this.$moment().diff(
                    this.$store.state.currentUserInfo.birthday,
                    'years'
                  )
                  // 计算推荐值
                  const calculateRecommendArguments = {
                    sex: this.$store.state.currentUserInfo.sex,
                    weight: this.$store.state.currentUserInfo.weight,
                    height: this.$store.state.currentUserInfo.height,
                    currentAge: currentAge
                  }
                  const calculateRecommendResult = calculateRecommend(
                    calculateRecommendArguments
                  )
                  // 计算测量肌力比
                  const calculateMuscleRateResult = calculateMuscleRate(
                    this.$store.state.resultValue
                  )
                  // 计算得分
                  const calculateScoreResult = calculateScore(
                    { sex: this.$store.state.currentUserInfo.sex },
                    this.$store.state.resultValue,
                    calculateRecommendResult
                  )
                  // 计算分级评价
                  const calculateClassificationResult =
                    calculateClassification(calculateScoreResult)

                  const obj = {
                    pattern: '全身肌力测试',
                    currentAge: currentAge, // 完成该次测试时的岁数
                    result: this.$store.state.resultValue, // 测试结果
                    calculateRecommendResult: calculateRecommendResult, // 推荐值对象
                    calculateMuscleRateResult: calculateMuscleRateResult, // 测量肌力比对象
                    calculateScoreResult: calculateScoreResult, // 得分对象
                    calculateClassificationResult: calculateClassificationResult // 分级评价对象
                  }

                  /* 暂存至 sessionStorage */
                  let resultArray = JSON.parse(
                    window.sessionStorage.getItem('resultArray')
                  )
                  resultArray.push(obj)
                  window.sessionStorage.setItem(
                    'resultArray',
                    JSON.stringify(resultArray)
                  )

                  if (this.$store.state.settings.length) {
                    this.$alert(`请点击“下一项”按钮`, '完成', {
                      type: 'success',
                      showClose: false,
                      center: true,
                      confirmButtonText: '下一项',
                      callback: () => {
                        this.handleFinish()
                      }
                    })
                  } else {
                    this.$alert(`请点击“完成订单”按钮`, '完成', {
                      type: 'success',
                      showClose: false,
                      center: true,
                      confirmButtonText: '完成订单',
                      callback: () => {
                        this.handleFinish()
                      }
                    })
                  }
                })
              } else {
                /* 还未完成，则进入下一个测试部位 */
                this.$router.push({
                  path: '/' + this.$store.state.selectResult[0]
                })
              }
            })
        })
      }
    },

    /**
     * @description: 完成订单或者下一项
     */
    handleFinish() {
      if (this.$store.state.settings.length) {
        // 因为这个只有一个测试，所以没有下一项
      } else {
        // 完成订单
        this.$router.push({
          path: '/test-send'
        })
      }
    },

    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh-special',
        query: {
          routerName: JSON.stringify('/body-muscle-measure'),
          duration: JSON.stringify(300),
          testName: JSON.stringify(this.testName),
          chineseName: JSON.stringify(this.chineseName)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body-muscle-measure {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    position: relative;
    @include flex(row, stretch, stretch);

    .page {
      position: absolute;
      top: 15px;
      left: 30px;
    }

    .left {
      padding: 45px 5px 10px 5px;
      flex: 1;
      @include flex(column, stretch, stretch);
      .chart {
        flex: 1;
      }
      .btn {
        margin-bottom: 16px;
        @include flex(row, center, center);
        .item {
          font-size: 30px;
        }
      }
    }

    .divider {
      border: 1px solid #e0e0e0;
    }

    .right {
      width: 20%;
      @include flex(column, stretch, center);
      // 倒计时
      .time {
        position: relative;
        @include flex(column, center, center);
        transform: scale(0.8);
        .img {
          transform: scale(1.2);
        }
        .text {
          position: absolute;
          top: 6%;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 20px;
        }
        .value {
          position: absolute;
          color: #ffffff;
          font-size: 94px;
        }
      }
      // 测量结果
      .result {
        position: relative;
        @include flex(column, stretch, center);
        .title {
          position: absolute;
          top: 6%;
          color: #ffffff;
          font-size: 28px;
        }
        .item1 {
          position: absolute;
          @include flex(row, center, center);
          top: 22%;
        }
        .item2 {
          position: absolute;
          @include flex(row, center, center);
          top: 40%;
        }
        .item3 {
          position: absolute;
          @include flex(row, center, center);
          top: 58%;
        }
        .value {
          width: 70%;
          font-weight: 700;
          font-size: 22px;
        }
        .confirm-btn {
          position: absolute;
          @include flex(row, center, center);
          top: 75%;
          color: #000000;
          font-weight: 700;
        }
      }
      // 其他按钮组
      .btn {
        width: 80%;
        @include flex(column, center, stretch);
        .item {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
