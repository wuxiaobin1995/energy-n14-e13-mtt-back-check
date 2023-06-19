<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-05-30 12:07:39
 * @LastEditTime: 2023-06-19 11:45:40
 * @Description : 躯干前屈-介绍页
-->
<template>
  <div class="container">
    <!-- 语音播放 -->
    <audio ref="audio" controls="controls" hidden :src="audioSrc" />

    <div class="wrapper">
      <!-- 左半部 -->
      <div class="left">
        <img class="img" src="@/assets/img/Test/Introduce/躯干前屈.png" />
        <img class="img" src="@/assets/img/Test/Introduce/图标说明.png" />
      </div>

      <!-- 右半部 -->
      <div class="right">
        <!-- 介绍文本 -->
        <div class="introduce">
          <h2 class="title">躯干前屈</h2>
          <p>
            1、在躯干后伸测量的基础上，将P1向外推动几格，随后将P2向内推至接近胸骨柄的位置；
          </p>
          <p>2、向前轻压P2，确认可以正常发力即可。</p>
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
  name: 'tAnteflexion',

  data() {
    return {
      /* 语音相关 */
      audioOpen: this.$store.state.voiceSwitch,
      audioSrc: path.join(__static, `narrate/mandarin/Test/6-躯干前屈.mp3`)
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
          testName: JSON.stringify('tAnteflexion'),
          chineseName: JSON.stringify('躯干前屈')
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
