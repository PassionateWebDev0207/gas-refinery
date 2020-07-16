<template>
  <div class="client-detail">
    <h1>Clients: <span v-if="!loadingDetail" class="client-name">{{ detail.name }}</span></h1>

    <el-tabs
      v-loading="loadingDetail || loadingMeta || assetsLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-tab-pane label="Refinery">
        <div class="client-info">
          <refinery-detail v-if="!loadingDetail" :detail="detail" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Recruitment">
        <div class="client-info">
          <recruitment-detail v-if="!loadingDetail" :detail="detail" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Tiktok">
        <div class="client-info">
          <tiktok-detail v-if="!loadingDetail && !loadingMeta" :detail="detail" :meta="meta" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Asset">
        <div class="client-info">
          <asset-detail v-if="!assetsLoading" :detail="assetsByCreator" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TiktokDetail from '@/components/pages/Clients/TiktokDetail'
import RecruitmentDetail from '@/components/pages/Clients/RecruitmentDetail'
import RefineryDetail from '@/components/pages/Clients/RefineryDetail'
import AssetDetail from '@/components/pages/Clients/AssetDetail'

export default {
  components: {
    TiktokDetail,
    RecruitmentDetail,
    RefineryDetail,
    AssetDetail
  },
  computed: {
    ...mapState(['token']),
    ...mapState('clients', ['detail', 'meta', 'loadingDetail', 'loadingMeta']),
    ...mapState('assets', {
      assetsLoading: 'loadingDetail',
      assetsByCreator: 'assetsByCreator'
    })
  },
  async created () {
    await this.$store.dispatch('clients/LOAD_DETAIL', { id: this.$route.params.id, idType: this.$route.query.id_type, token: this.token })
    await this.$store.dispatch('clients/LOAD_META', { id: this.$route.params.id, idType: this.$route.query.id_type, limit: 10, metaType: 'tiktok', token: this.token })
    await this.$store.dispatch('assets/LOAD_ASSETS_BY_CREATOR', { creator: this.detail.id, token: this.token })
  }
}
</script>

<style lang="scss" scoped>
.client-detail {
  padding: 20px;
  h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .client-name {
      font-weight: normal;
    }
  }
  .client-info {
    width: 100%;
    height: calc(100vh - 225px);
    overflow: auto;
  }
  .el-tabs__item .is-active {
    color: white !important;
  }
}
</style>
