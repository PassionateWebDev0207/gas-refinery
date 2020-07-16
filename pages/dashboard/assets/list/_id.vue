<template>
  <div class="asset-detail">
    <h1>Assets: <span v-if="!loadingDetail" class="asset-title">{{ detail.assetName }}</span></h1>

    <el-tabs
      v-loading="loadingDetail || loadingMeta || clientLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-tab-pane label="Refinery">
        <div class="asset-info">
          <refinery-detail
            v-if="!loadingDetail && !loadingMeta && !clientLoading"
            :detail="detail"
            :client="client"
            :meta="meta"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Tiktok">
        <div class="asset-info">
          <tiktok-detail
            v-if="!loadingDetail && !loadingMeta && !clientLoading"
            :detail="detail"
            :client="client"
            :meta="meta"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TiktokDetail from '@/components/pages/Assets/TiktokDetail'
import RefineryDetail from '@/components/pages/Assets/RefineryDetail'

export default {
  components: {
    TiktokDetail,
    RefineryDetail
  },
  computed: {
    ...mapState(['token']),
    ...mapState('assets', ['detail', 'meta', 'loadingDetail', 'loadingMeta']),
    ...mapState('clients', {
      client: 'detail',
      clientLoading: 'loadingDetail'
    })
  },
  async created () {
    await this.$store.dispatch('assets/LOAD_DETAIL', { id: this.$route.params.id, token: this.token })
    await this.$store.dispatch('assets/LOAD_META', { id: this.$route.params.id, limit: 10, token: this.token })
    await this.$store.dispatch('clients/LOAD_DETAIL', { id: this.detail.assetCreator, idType: 'gas_id', token: this.token })
  }
}
</script>

<style lang="scss" scoped>
.asset-detail {
  height: 100%;
  h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .asset-title {
      margin-left: 10px;
      font-weight: normal;
    }
  }
  .asset-info {
    width: 100%;
    height: calc(100% - 110px);
    overflow: auto;
  }
}
</style>
