<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <nuxt-link to="/">
      <i class="el-icon-s-home" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  h1 {
    color: white;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
  a {
    color: #409eff;
    font-size: 18px;
    text-shadow: 0 0 2px rgba(#409eff, 0.5);
    text-decoration: none;
  }
}
</style>
