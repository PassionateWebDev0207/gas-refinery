<template>
  <div class="dell-cluster">
    <div class="dell-cluster-content">
      <el-table
        :data="tableData"
        height="200"
        border
      >
        <el-table-column prop="id" label="ID" align="left" />
        <el-table-column prop="name" label="Name" align="left" />
        <el-table-column prop="status" label="Status" align="left" />
        <el-table-column label="Creation Date" align="left">
          <template slot-scope="scope">
            {{ $moment(Number(scope.row.date)).format('DD MMM YYYY hh:mm:ss a') }}
          </template>
        </el-table-column>
        <el-table-column label=" " fixed="right" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 'DONE'"
              type="text"
              style="padding: 0;"
              @click="download(scope.row)"
            >
              Download
            </el-button>
            <div v-else>
              N/A
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 'aas86f9a6f9afa5f7a65df78a65ad',
          name: 'Tiktok Client #1 Compliation',
          status: 'PENDING',
          date: '1590499398943'
        },
        {
          id: 'aas86f9a6f9afa5f7a65df78a65ad',
          name: 'Tiktok Client #2 Compliation',
          status: 'RENDERING',
          date: '1590499398943'
        },
        {
          id: 'aas86f9a6f9afa5f7a65df78a65ad',
          name: 'Tiktok Client #5 Compliation',
          status: 'DONE',
          date: '1590499398943'
        },

        {
          id: 'aas86f9a6f9afa5f7a65df78a65ad',
          name: 'Tiktok Client #4 Compliation',
          status: 'DONE',
          date: '1590499398943'
        }
      ]
    }
  },
  methods: {
    download () {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.dell-cluster {
  height: 100%;
  &-content {
    height: 100%;
    .el-table {
      height: 100% !important;
    }
  }
}
</style>
