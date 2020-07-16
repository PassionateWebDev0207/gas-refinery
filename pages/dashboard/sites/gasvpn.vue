<template>
  <div class="gas-vpn">
    <div class="gas-vpn-header">
      <el-button type="primary" :disabled="loading" @click="download">
        Text Download
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="proxies"
      height="200px"
      style="width: 100%"
      border
    >
      <el-table-column prop="name" label="Proxy Name" align="left" />
      <el-table-column prop="ip" label="IP Address" align="left" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('sites', ['loading', 'proxies', 'proxies_file'])
  },
  created () {
    if (process.client) {
      this.$store.dispatch('sites/GET_PROXIES')
    }
  },
  methods: {
    download () {
      this.$store.dispatch('sites/GET_DOWNLOAD_DATA')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.gas-vpn {
  height: 100%;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 500;
    }
  }
  .el-table {
    height: calc(100% - 60px) !important;
  }
}
</style>
