<!--
 * @Author      : Mr.bin
 * @Date        : 2023-06-19 16:15:01
 * @LastEditTime: 2023-06-19 22:29:59
 * @Description : 反馈训练-具体测量
-->
<template>
  <div class="feedback-measure">
    <div class="wrapper">
      <div class="left">
        <!-- 标题 -->
        <div class="title">
          <el-button
            class="item"
            icon="el-icon-location-information"
            type="info"
            round
            >反馈训练</el-button
          >
        </div>

        <!-- 按钮组 -->
        <div class="btn">
          <el-button
            class="item"
            type="primary"
            :disabled="isStart"
            @click="handleStart"
            >开始训练</el-button
          >
          <el-button class="item" type="info" @click="handleRefresh"
            >刷新页面</el-button
          >
          <el-button class="item" type="danger" @click="handleExit"
            >退出订单</el-button
          >
        </div>
      </div>

      <div class="right">
        <div class="top">
          <div class="train-name">
            <div class="title">训练部位</div>
            <div class="num">{{ trainName.split('-')[1] }}</div>
          </div>

          <div class="result-rate">
            <div class="title">完成度</div>
            <div class="num">{{ completion }} %</div>
          </div>

          <div class="num-wrapper">
            <div class="title">剩余次数</div>
            <div class="num">
              <span class="now-num">{{ nowFrequency }}</span> /
              {{ frequency * nowGroupCount }}
            </div>
          </div>
        </div>

        <div class="chart">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>

      <el-dialog
        title="休息倒计时"
        :visible.sync="dialogVisible"
        width="16%"
        top="32vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :center="true"
      >
        <div class="dialog">
          <div class="dialog-value">
            {{ nowIntervalTime }}
          </div>
          <el-button class="dialog-btn" type="warning" @click="handlePass"
            >跳 过</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'feedback-measure',

  data() {
    return {
      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      /* 控制类 */
      isStart: false, // 是否开始
      scShow: true, // 是否继续

      /* 其他 */
      oneK: 0, // P1的K
      twoK: 0, // P2的K
      oneStandard: 0, // P1调零值
      twoStandard: 0, // P2调零值

      oneWeight: 0, // P1负重（kg），精确到0.01kg
      twoWeight: 0, // P2负重（kg），精确到0.01kg
      weightDataOneArray: [], // 单个的压力数组，用于计算次数
      weightDataShowArray: [], // 展示的压力数组
      weightDataArray: [], // 完整的压力数组

      // 使用P1的训练项目
      useP1: [
        'cvRearProtraction',
        'cvAnteflexion',
        'cvRightSide',
        'cvLeftSide',
        'tRearProtraction',
        'ulPush',
        'ulPull'
      ],
      // 使用P2的训练项目
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

      frequency: this.$store.state.settings[0].frequency, // 次数
      nowFrequency: 0, // 实时的次数（递增）
      groupCount: this.$store.state.settings[0].groupCount, // 组数
      nowGroupCount: this.$store.state.settings[0].groupCount, // 实时的次数（递减）
      timeClock: null, // 计时器
      intervalTime: this.$store.state.settings[0].intervalTime, // 组间休息时长
      nowIntervalTime: this.$store.state.settings[0].intervalTime, // 实时的组间休息时长
      target: this.$store.state.settings[0].target, // 训练目标
      entadRate: this.$store.state.settings[0].entadRate, // 向心比
      keepdRate: this.$store.state.settings[0].keepdRate, // 等长比
      offcenterRate: this.$store.state.settings[0].offcenterRate, // 离心比
      trainName: this.$store.state.settings[0].trainName, // 训练部位，格式如'cvRearProtraction-颈椎后伸'

      dialogVisible: false, // 休息倒计时弹窗

      completion: null, // 完成度%

      /* 参考曲线 */
      standardGraph: [], // 单个基准图形
      referenceGraph: [] // 最终图形，默认3个基准
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
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮，重新训练！`,
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
              // const distancePulse = dataArray[1] // 位移脉冲量

              /* 暂停或继续按钮 */
              if (this.scShow) {
                /* 计算P1、P2负重，精确到0.1kg */
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
                    let weight = 0
                    if (this.useP1.includes(this.trainName.split('-')[0])) {
                      // 使用P1
                      weight = this.oneWeight
                    } else if (
                      this.useP2.includes(this.trainName.split('-')[0])
                    ) {
                      // 使用P2
                      weight = this.twoWeight
                    }
                    this.weightDataOneArray.push(weight) // 单个的压力数组，用于计算次数
                    this.weightDataShowArray.push(weight) // 展示的压力数组
                    this.weightDataArray.push(weight) // 完整的压力数组

                    /* 渲染图形 */
                    this.option.series[0].data = this.weightDataShowArray
                    this.myChart.setOption(this.option)

                    /* 实时递增次数 */
                    if (
                      this.weightDataOneArray.length ===
                      this.standardGraph.length
                    ) {
                      this.weightDataOneArray = []
                      this.nowFrequency += 1
                    }

                    /* 曲线走到终点重新开始 */
                    if (
                      this.weightDataShowArray.length ===
                      this.referenceGraph.length
                    ) {
                      this.weightDataShowArray = []
                    }

                    /* 完成一组 */
                    if (this.nowFrequency === this.frequency) {
                      this.scShow = false
                      this.nowGroupCount -= 1

                      // 弹出休息倒计时窗口
                      if (this.nowGroupCount > 0) {
                        this.nowIntervalTime = this.intervalTime
                        this.dialogVisible = true
                        this.timeClock = setInterval(() => {
                          this.nowIntervalTime -= 1
                          if (this.nowIntervalTime === 0) {
                            this.handlePass()
                          }
                        }, 1000)
                      }
                    }

                    /* 该次训练全部完成 */
                    if (this.nowGroupCount === 0) {
                      this.finishData()
                    }
                  }
                }
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$alert(
              `请重新连接USB线，然后点击"返回上一页"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '返回上一页',
                callback: () => {
                  this.handleExit()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$alert(
            `${err}。请重新连接USB线，然后点击"返回上一页"按钮！`,
            '初始化SerialPort.list失败',
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '返回上一页',
              callback: () => {
                this.handleExit()
              }
            }
          )
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      /* 计算最终参考图形 */
      const original = 2 // 起始位置（kg），暂定2kg

      // 开始段
      for (let i = 0; i <= 5; i++) {
        this.standardGraph.push(original)
      }
      // 中间段，这里的15目前是固定的，后续可能会改其他值
      const intervalUp = (this.target - original) / (this.entadRate * 15) // 上升间隔值
      const intervalDown = (this.target - original) / (this.offcenterRate * 15) // 下降间隔值
      let sum = original
      for (let i = 0; i < this.entadRate * 15; i++) {
        sum = parseFloat(sum + intervalUp)
        this.standardGraph.push(sum)
      }
      for (let i = 0; i < this.keepdRate * 15; i++) {
        this.standardGraph.push(sum)
      }
      for (let i = 0; i < this.offcenterRate * 15 - 1; i++) {
        sum = parseFloat(sum - intervalDown)
        this.standardGraph.push(sum)
      }
      // 结束段
      for (let i = 0; i < 5; i++) {
        this.standardGraph.push(original)
      }
      // 最终复制3个
      for (let i = 0; i < 3; i++) {
        this.referenceGraph.push(...this.standardGraph)
      }

      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < this.referenceGraph.length; i++) {
        this.xData.push(parseFloat((i * 0.1).toFixed(1)))
      }

      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        xAxis: {
          type: 'category',
          name: '秒',
          data: this.xData,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          min: 0
        },
        tooltip: {},
        series: [
          {
            data: [],
            type: 'line',
            lineStyle: {
              color: 'rgba(255, 0, 0, 1)'
            },
            smooth: true,
            showSymbol: false
          },
          {
            data: this.referenceGraph,
            type: 'line',
            smooth: false,
            showSymbol: false,
            lineStyle: {
              // width: 40,
              opacity: 0.8
              // join: 'miter'
            }
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
    },

    /**
     * @description: 开始按钮
     */
    handleStart() {
      this.isStart = true

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }
    },

    /**
     * @description: 休息结束函数
     */
    handlePass() {
      /* 清除定时器 */
      if (this.timeClock) {
        clearInterval(this.timeClock)
      }
      this.nowFrequency = 0
      this.dialogVisible = false
      this.scShow = true
    },

    /**
     * @description: 完成该项目
     */
    finishData() {
      /* 关闭串口通信 */
      if (this.usbPort) {
        if (this.usbPort.isOpen) {
          this.usbPort.close()
        }
      }

      /* 清除定时器 */
      if (this.timeClock) {
        clearInterval(this.timeClock)
      }

      /* 计算完成度 */
      const matchArray = [] // 参考曲线数组
      const yesArray = [] // 达标数据数组
      for (let i = 0; i < this.frequency * this.groupCount; i++) {
        matchArray.push(...this.standardGraph)
      }
      for (let i = 0; i < matchArray.length; i++) {
        const relative = Math.abs(this.weightDataArray[i] - matchArray[i])
        // 暂定单边2kg范围的评分标准
        if (relative <= 2) {
          yesArray.push(relative)
        }
      }
      this.completion = parseFloat(
        ((yesArray.length / matchArray.length) * 100).toFixed(1)
      )

      /* 删除 Vuex 参数配置数组的第一个元素 */
      let settings = JSON.parse(JSON.stringify(this.$store.state.settings))
      settings.shift()
      this.$store.dispatch('setSettings', settings).then(() => {
        /* 数据 */
        const obj = {
          pattern: '反馈训练',
          frequency: this.frequency, // 次数
          groupCount: this.groupCount, // 组数
          intervalTime: this.intervalTime, // 组间休息时长
          target: this.target, // 训练目标
          entadRate: this.entadRate, // 向心比
          keepdRate: this.keepdRate, // 等长比
          offcenterRate: this.offcenterRate, // 离心比
          trainName: this.trainName, // 训练部位
          standardGraph: this.standardGraph, // 单个基准图形
          weightDataArray: this.weightDataArray, // 完整的压力数组
          completion: this.completion // 完成度%
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
    },

    /**
     * @description: 完成订单或者下一项
     */
    handleFinish() {
      if (this.$store.state.settings.length) {
        // 下一项
        let route = ''
        switch (this.$store.state.settings[0].pattern) {
          case '反馈训练':
            route = 'feedback-measure'
            break
          case '肌耐力训练':
            route = 'muscular-endurance-measure'
            break
          case '肌肥大训练':
            route = 'muscular-hypertrophy-measure'
            break
          default:
            break
        }

        this.$router.push({
          path: '/' + route
        })
      } else {
        // 完成订单
        this.$router.push({
          path: '/train-send'
        })
      }
    },

    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/feedback-measure'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-measure {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px;
    @include flex(row, space-between, stretch);

    .left {
      position: relative;
      width: 15%;
      .title {
        position: absolute;
        left: -70px;
        top: -15px;
        @include flex(row, center, center);
        .item {
          width: 220px;
          font-size: 26px;
        }
      }
      .btn {
        height: 100%;
        width: 100%;
        @include flex(column, flex-end, center);
        .item {
          margin: 20px 0 0 0;
          width: 190px;
        }
      }
    }

    .right {
      flex: 1;
      @include flex(column, stretch, center);
      .top {
        width: 100%;
        height: 80px;
        border: 1px solid rgb(140, 180, 134);
        box-shadow: 0 0 6px #929292;
        border-radius: 16px;
        @include flex(row, space-around, center);
        padding-bottom: 5px;
        .train-name {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            background-color: rgba(155, 155, 155, 0.6);
            border-radius: 4px;
            padding: 2px 10px;
            font-size: 18px;
          }
        }
        .result-rate {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            background-color: rgba(155, 155, 155, 0.6);
            border-radius: 4px;
            padding: 2px 10px;
            font-size: 18px;
          }
        }
        .num-wrapper {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            font-size: 18px;
            .now-num {
              background-color: rgba(155, 155, 155, 0.6);
              border-radius: 4px;
              padding: 2px 10px;
            }
          }
        }
      }
      .chart {
        flex: 1;
        width: 100%;
      }
    }

    .dialog {
      @include flex(column, stretch, stretch);
      .dialog-value {
        @include flex(row, center, center);
        height: 130px;
        font-size: 60px;
        color: #ffffff;
        border-radius: 9px;
        background: linear-gradient(
          180deg,
          #2d809e 0%,
          #2d809e 0%,
          #2aa06d 100%,
          #2aa06d 100%
        );
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
      }
      .dialog-btn {
        margin-top: 20px;
        font-size: 24px;
      }
    }
  }
}
</style>
