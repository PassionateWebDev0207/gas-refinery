<template>
  <el-container>
    <el-header class="header" height="60px">
      <Header />
    </el-header>
    <el-main class="main">
      <Login />
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/layout/Header'
import Login from '@/components/login'

export default {
  components: {
    Header,
    Login
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.header {
  height: 60px;
  background-color: $clr-orange;
  box-shadow: $box-shadow;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: $clr-darkgrey;
}
</style>
