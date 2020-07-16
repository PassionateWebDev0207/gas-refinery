<template>
  <div class="history">
    <div class="history-content">
      <el-table
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="history"
        height="200px"
        border
        @sort-change="handleSortChange"
      >
        <el-table-column prop="account_id" label="ID" width="120" sortable="custom" fixed />
        <el-table-column prop="account_first_name" label="First Name" width="120" sortable="custom" fixed />
        <el-table-column prop="account_last_name" label="Last Name" width="120" sortable="custom" fixed />
        <el-table-column prop="account_email" label="Email" width="220" sortable="custom" />
        <el-table-column prop="account_history_service" label="History Service" width="220" sortable="custom" />
        <el-table-column prop="account_history_action" label="History Action" width="220" sortable="custom" />
        <el-table-column label="History Date" width="200" sortable="custom">
          <template slot-scope="scope">
            {{ $moment(Number(scope.row.account_history_date)).format('DD/MM/YYYY hh:mm:ss A') }}
          </template>
        </el-table-column>
        <el-table-column prop="account_history_ip" label="History IP" width="220" sortable="custom" />
        <el-table-column prop="account_history_meta" label="History Meta" width="220" sortable="custom" />
      </el-table>
    </div>
    <el-pagination
      background
      :page-size="recordsPerPage"
      :page-sizes="limitList"
      :pager-count="5"
      :total="count"
      :current-page.sync="currentPage"
      layout="total, sizes,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as data from '@/assets/data'

export default {
  data () {
    return {
      sortQueries: data.admin.sortQueries,
      currentPage: 1,
      limitList: data.pageLimitList,
      recordsPerPage: 25
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapState('users', ['loading', 'history', 'count'])
  },
  created () {
    if (process.client && !this.$auth.user.account_roles.includes('ADMIN')) {
      this.$router.push('/dashboard/home')
    }
    this.$store.commit('users/setSortQuery', '')
    this.$store.commit('users/setSortDirection', '')
    this.$store.dispatch('users/GET_HISTORY', {
      token: this.token,
      limit: this.recordsPerPage,
      page: this.currentPage
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.$store.dispatch('users/GET_HISTORY', {
        token: this.token,
        limit: this.recordsPerPage,
        page: val
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.recordsPerPage = val
      this.handleCurrentChange(this.currentPage)
    },
    handleSortChange (val) {
      if (val.order !== null) {
        this.sortQuery = this.sortQueries[val.column.label]
        this.$store.commit('users/setSortQuery', this.sortQuery)
        this.$store.commit('users/setSortDirection',
          val.order === 'ascending' ? 'direction=ascend' : 'direction=descend')
        this.$store.dispatch('users/GET_HISTORY', {
          token: this.token,
          page: this.currentPage,
          limit: this.recordsPerPage
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  overflow: auto;
  height: 100%;
  &-content {
    height: calc(100% - 56px);
    .el-table {
      height: 100% !important;
    }
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
