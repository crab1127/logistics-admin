<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式

  .tool-bar {
    position: relative;
    background: #fff;
    
    .el-tabs__header {
      margin-bottom: 0;
    }
  }
  .flex {
    display: flex;
  }
  .row-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .media {
    display: flex;
  }
  .media-body {
    flex: 1;
  }
  .filter-container {
    background: #f4f4f4;
    padding: 10px;
    margin-bottom: 20px;
  }
</style>
