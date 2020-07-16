<template>
  <div class="assets">
    <div class="assets-header">
      <div>
        <el-button type="success" @click="addAsset">
          Add Asset
        </el-button>
        <el-button type="primary" @click="downloadCSV">
          Download (CSV)
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="pageLoading"
      class="assets-lists"
      :data="pageData"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      height="200"
      border
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="assetName" label="Title" align="center" />
      <el-table-column prop="assetCreator" label="Creator" align="center" />
      <el-table-column prop="assetType" label="Type" align="center" />
      <el-table-column prop="categoryName" label="Category" align="center" />
      <el-table-column label="Created" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ $moment(Number(scope.row.tiktokDate)).format('DD MMM YYYY hh:mm:ss a') }}
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
    ...mapState(['token']),
    ...mapState('assets', ['count', 'pageData', 'pageLoading', 'currentPage', 'currentLimit'])
  },
  async created () {
    await this.$store.dispatch('assets/GET_COUNT')
    this.page = this.currentPage
    this.limit = this.currentLimit
    this.loadTableData(this.page, this.limit)
  },
  methods: {
    loadTableData (page, limit) {
      this.$store.dispatch('assets/LOAD_PAGE', { page, limit, token: this.token })
    },
    addAsset () {},
    downloadCSV () {},
    handleCurrentChange (val) {
      this.$router.push(`/dashboard/assets/list/${val.assetId}`)
    },
    handleCurrentPageChange (val) {
      this.page = val
      this.$store.commit('assets/setCurrentPage', this.page)
      this.$store.commit('assets/setCurrentLimit', this.limit)
      this.loadTableData(this.page, this.limit)
    },
    handleSizeChange (val) {
      this.page = 1
      this.limit = val
      this.$store.commit('assets/setCurrentPage', this.page)
      this.$store.commit('assets/setCurrentLimit', this.limit)
      this.loadTableData(this.page, this.limit)
    },
    handleSortChange (val) {}
  }
}
</script>

<style lang="scss" scoped>
.assets {
  height: 100%;
  .assets-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 24px;
    }
  }
  .assets-lists {
    text-align: center;
    height: calc(100% - 116px) !important;
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
