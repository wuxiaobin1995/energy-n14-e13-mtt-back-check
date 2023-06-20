<!--
 * @Author      : Mr.bin
 * @Date        : 2023-06-19 09:55:35
 * @LastEditTime: 2023-06-20 14:34:44
 * @Description : 任务详情页
-->
<template>
  <div class="task">
    <div class="wrapper">
      <!-- 标题 -->
      <el-page-header
        title="返回首页"
        content="任务详情页"
        @back="handleToHome"
      ></el-page-header>

      <!-- 步骤条 -->
      <div class="step">
        <el-steps :active="settings.length" align-center>
          <el-step
            v-for="(item, index) in settings"
            :key="index"
            :title="item.pattern"
          ></el-step>
        </el-steps>
      </div>

      <!-- 轮播图 -->
      <div class="carousel">
        <el-card>
          <div slot="header">
            <span :style="{ 'font-weight': 700 }"
              >订单类型：{{ orderIdType }}</span
            >
            <div :style="{ float: 'right', padding: '3px 0' }">
              <span>说明</span>
              <i class="el-icon-share"></i>
            </div>
          </div>
          <el-carousel
            trigger="click"
            :interval="5000"
            :loop="true"
            height="350px"
            arrow="always"
          >
            <el-carousel-item v-for="(item, index) in settings" :key="index">
              <div class="box">
                <div class="title">({{ index + 1 }}){{ item.pattern }}</div>
                <div class="item">欢迎使用全身等长肌力测试训练系统！</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </div>

      <!-- 按钮组 -->
      <div class="btn">
        <el-button class="item" type="primary" @click="handleStart"
          >正式开始</el-button
        >
        <el-button class="item" type="danger" @click="handleToHome"
          >返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',

  data() {
    return {
      /* 路由传参 */
      orderIdType: JSON.parse(this.$route.query.orderIdType),

      settings: this.$store.state.settings
    }
  },

  methods: {
    /**
     * @description: 返回首页
     */
    handleToHome() {
      this.$confirm('订单进行中，此操作会退出该订单，是否退出？', '提示', {
        type: 'warning',
        showClose: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        center: true,
        confirmButtonText: '退 出',
        cancelButtonText: '否'
      })
        .then(() => {
          this.$router.push({
            path: '/home'
          })
        })
        .catch(() => {})
    },

    /**
     * @description: 正式开始
     */
    handleStart() {
      const settings = this.settings
      let settingsRouter = []

      if (this.orderIdType === '评估') {
        let selectResult = []
        for (let i = 0; i < settings.length; i++) {
          const item = settings[i]
          if (item.pattern === '全身肌力测试') {
            // 测试项目选择结果处理成合适的路由格式
            for (let i = 0; i < item.position.length; i++) {
              const itemAction = item.position[i]
              if (itemAction === '颈椎：后伸/前屈') {
                selectResult.push('cvRearProtraction') // 颈椎后伸，cervical-vertebra-rearProtraction
                selectResult.push('cvAnteflexion') // 颈椎前屈，cervical-vertebra-anteflexion
              } else if (itemAction === '颈椎：侧屈') {
                selectResult.push('cvRightSide') // 颈椎右侧屈，cervical-vertebra-rightSide
                selectResult.push('cvLeftSide') // 颈椎左侧屈，cervical-vertebra-leftSide
              } else if (itemAction === '躯干：后伸/前屈') {
                selectResult.push('tRearProtraction') // 躯干后伸，trunk-rearProtraction
                selectResult.push('tAnteflexion') // 躯干前屈，trunk-anteflexion
              } else if (itemAction === '躯干：侧屈') {
                selectResult.push('tLeftSide') // 躯干左侧屈，trunk-leftSide
                selectResult.push('tRightSide') // 躯干右侧屈，trunk-rightSide
              } else if (itemAction === '上肢：推/拉') {
                selectResult.push('ulPush') // 上肢推，upper-limb-push
                selectResult.push('ulPull') // 上肢拉，upper-limb-pull
              } else if (itemAction === '上肢：外展') {
                selectResult.push('ulLeftAbducent') // 上肢左外展，upper-limb-leftAbducent
                selectResult.push('ulRightAbducent') // 上肢右外展，upper-limb-rightAbducent
              } else if (itemAction === '下肢：后伸') {
                selectResult.push('llAfterLeftOut') // 下肢左后伸，lower-limb-afterLeftOut
                selectResult.push('llAfterRightOut') // 下肢右后伸，lower-limb-afterRightOut
              } else if (itemAction === '下肢：外展') {
                selectResult.push('llLeftAbducent') // 下肢左外展，lower-limb-leftAbducent
                selectResult.push('llRightAbducent') // 下肢右外展，lower-limb-rightAbducent
              } else if (itemAction === '下肢：内收') {
                selectResult.push('llLeftInsideCollect') // 下肢左内收，lower-limb-leftInsideCollect
                selectResult.push('llRightInsideCollect') // 下肢右内收，lower-limb-rightInsideCollect
              }
            }
            // 然后再放到 Vuex 中
            this.$store.dispatch('changeSelectResult', selectResult)
          }

          switch (item.pattern) {
            case '全身肌力测试':
              settingsRouter = selectResult
              break
            default:
              break
          }
        }
      } else if (this.orderIdType === '训练') {
        for (let i = 0; i < settings.length; i++) {
          const item = settings[i]
          switch (item.pattern) {
            case '反馈训练':
              settingsRouter.push('feedback-measure')
              break
            case '肌耐力训练':
              settingsRouter.push('muscular-endurance-measure')
              break
            case '肌肥大训练':
              settingsRouter.push('muscular-hypertrophy-measure')
              break
            default:
              break
          }
        }
      }

      // console.log(settingsRouter)
      this.$router.push({
        path: '/' + settingsRouter[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 40px;
    @include flex(column, stretch, stretch);

    .step {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .carousel {
      flex: 1;
      .el-carousel__item .box {
        @include flex(column, center, center);
        height: 350px;
        position: relative;
      }
      .el-carousel__item .box .title {
        color: #475669;
        font-size: 30px;
        font-weight: 700;
        position: absolute;
        top: 15px;
        left: 20px;
      }
      .el-carousel__item .box .item {
        width: 80%;
        color: #475669;
        font-size: 26px;
        font-weight: 700;
      }
      .el-carousel__item {
        background-color: #d3dce6;
      }
    }

    .btn {
      margin-top: 15px;
      @include flex(row, center, center);
      .item {
        font-size: 22px;
        margin: 0 50px;
      }
    }
  }
}
</style>
