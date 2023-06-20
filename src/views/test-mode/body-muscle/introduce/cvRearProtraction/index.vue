<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-05-30 12:07:39
 * @LastEditTime: 2023-06-19 11:40:18
 * @Description : 颈椎后伸-介绍页
-->
<template>
  <div class="container">
    <!-- 语音播放 -->
    <audio ref="audio" controls="controls" hidden :src="audioSrc" />

    <div class="wrapper">
      <!-- 左半部 -->
      <div class="left">
        <img class="img" src="@/assets/img/Test/Introduce/颈椎后伸.png" />
        <img class="img" src="@/assets/img/Test/Introduce/图标说明.png" />
      </div>

      <!-- 右半部 -->
      <div class="right">
        <!-- 介绍文本 -->
        <div class="introduce">
          <h2 class="title">颈椎后伸</h2>
          <p>
            1、如图所示，受试者站在底板中央，腰背挺直，双脚自然分开，调整软垫高度：
          </p>
          <p>- P1与枕骨后侧平齐；</p>
          <p>- P4与胸骨中段平齐；</p>
          <p>
            2、高度调整完毕之后，推动P1至枕骨后侧，随后将P4向内推动、卡紧，防止出现代偿动作；
          </p>
          <p>3、向后轻压P1，确认可以正常发力即可。</p>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <el-button
            type="primary"
            icon="el-icon-caret-right"
            class="item"
            @click="handleTest"
            >开始测试</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 路径模块 */
import path from 'path'

export default {
  name: 'cvRearProtraction',

  data() {
    return {
      /* 语音相关 */
      audioOpen: this.$store.state.voiceSwitch,
      audioSrc: path.join(__static, `narrate/mandarin/Test/1-颈椎后伸.mp3`)
    }
  },

  mounted() {
    if (this.audioOpen === true) {
      setTimeout(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }, 500)
    }
  },

  methods: {
    /**
     * @description: 开始测试
     */
    handleTest() {
      this.$router.push({
        path: '/body-muscle-measure',
        query: {
          testName: JSON.stringify('cvRearProtraction'),
          chineseName: JSON.stringify('颈椎后伸')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 40px;
    @include flex(row, stretch, stretch);

    .left {
      width: 45%;
      @include flex(column, center, center);
      .img {
        width: 70%;
      }
    }

    .right {
      width: 55%;
      @include flex(column, center, center);
      .introduce {
        font-size: 20px;
        .title {
          font-size: 35px;
        }
      }
      .btn {
        margin-top: 40px;
        .item {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
