<template>
  <div class="clients">
    <div class="clients-header">
      <h1>Clients</h1>
      <div>
        <el-button type="success" @click="recruit">
          Recruit
        </el-button>
        <el-button type="primary" @click="downloadCSV">
          Download (CSV)
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="pageLoading"
      class="client-lists"
      :data="pageData"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      height="200"
      border
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="name" label="Name" align="center" />
      <el-table-column prop="tiktokUsername" label="Tiktok User" align="center" />
      <el-table-column prop="tiktokFollowers" label="Followers" align="center" />
      <el-table-column label="Last Updated" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ $moment(Number(scope.row.refineryUpdated)).format('DD MMM YYYY hh:mm:ss a') }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="limit"
      :page-sizes="limitOptions"
      :pager-count="5"
      :total="count"
      :current-page.sync="page"
      layout="total, sizes,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as data from '@/assets/data'

export default {
  data () {
    return {
      page: 1,
      limit: 25,
      limitOptions: data.pageLimitList
    }
  },
  computed: {
    ...mapState('clients', ['count', 'pageData', 'pageLoading', 'currentPage', 'currentLimit'])
  },
  async created () {
    await this.$store.dispatch('clients/GET_COUNT')
    this.page = this.currentPage
    this.limit = this.currentLimit
    this.loadTableData(this.page, this.limit)
  },
  methods: {
    loadTableData (page, limit) {
      this.$store.dispatch('clients/LOAD_PAGE', { page, limit })
    },
    recruit () {
      this.$router.push('/dashboard/clients/lookup')
    },
    downloadCSV () {},
    handleCurrentChange (val) {
      this.$router.push(`/dashboard/clients/${val.tiktokUsername}?id_type=username`)
    },
    handleCurrentPageChange (val) {
      this.page = val
      this.$store.commit('clients/setCurrentPage', this.page)
      this.$store.commit('clients/setCurrentLimit', this.limit)
      this.loadTableData(this.page, this.limit)
    },
    handleSizeChange (val) {
      this.page = 1
      this.limit = val
      this.$store.commit('clients/setCurrentPage', this.page)
      this.$store.commit('clients/setCurrentLimit', this.limit)
      this.loadTableData(this.page, this.limit)
    },
    handleSortChange (val) {}
  }
}
</script>

<style lang="scss" scoped>
.clients {
  padding: 20px;
  .clients-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .client-lists {
    text-align: center;
    height: calc(100vh - 236px) !important;
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
