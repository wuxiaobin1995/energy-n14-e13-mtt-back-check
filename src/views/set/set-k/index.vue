<!--
 * @Author      : Mr.bin
 * @Date        : 2022-07-28 14:01:04
 * @LastEditTime: 2023-06-19 09:49:46
 * @Description : 设置K
-->
<template>
  <div class="set-k">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="设置K"
        @back="handleToHome"
      ></el-page-header>

      <div class="box">
        <div class="one-k">
          <span>P1的K值(默认82.243)：</span>
          <el-input-number
            v-model="oneK"
            :precision="3"
            @change="handleOneKChange"
          ></el-input-number>
        </div>
        <div class="two-k">
          <span>P2的K值(默认82.243)：</span>
          <el-input-number
            v-model="twoK"
            :precision="3"
            @change="handleTwoKChange"
          ></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-k',

  data() {
    return {
      oneK: 0,
      twoK: 0
    }
  },

  created() {
    this.oneK = parseFloat(window.localStorage.getItem('oneK'))
    this.twoK = parseFloat(window.localStorage.getItem('twoK'))
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    },

    /**
     * @description: P1的K值变化时触发
     * @param {*} value
     */
    handleOneKChange(value) {
      if (!value) {
        value = 82.243
      }
      window.localStorage.setItem('oneK', value)
      this.$message({
        message: '修改P1的K值成功',
        type: 'success',
        duration: 500
      })
    },

    /**
     * @description: P2的K值变化时触发
     * @param {*} value
     */
    handleTwoKChange(value) {
      if (!value) {
        value = 82.243
      }
      window.localStorage.setItem('twoK', value)
      this.$message({
        message: '修改P2的K值成功',
        type: 'success',
        duration: 500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-k {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 40px;
    @include flex(column, center, center);
    position: relative;

    .page {
      position: absolute;
      top: 20px;
      left: 30px;
    }

    .box {
      @include flex(row, center, center);
      .one-k,
      .two-k {
        margin: 0 60px;
      }
    }
  }
}
</style>
