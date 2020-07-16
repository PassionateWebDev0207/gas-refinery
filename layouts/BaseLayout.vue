<template>
  <el-container>
    <el-header class="header" height="60px">
      <Header />
    </el-header>
    <el-container>
      <el-aside class="aside" width="150px">
        <Aside />
      </el-aside>
      <el-main class="main">
        <div class="main-container">
          <nuxt-child />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/layout/Aside'
import Header from '@/components/layout/Header'

export default {
  components: {
    Aside,
    Header
  },
  created () {
    if (process.client && this.$auth.loggedIn === false) {
      this.$router.push('/')
    }
    if (process.client && this.$auth.loggedIn === true) {
      this.$store.commit('setToken', this.$cookies.get('auth._token.local'))
    }
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
  height: calc(100vh - 60px);
  padding: 10px;
}
.aside {
  height: calc(100vh - 60px);
  padding: 10px 10px 10px 0;
}
.main-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: $box-shadow;
}
</style>
