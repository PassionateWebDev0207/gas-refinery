<template>
  <div class="asset-detail">
    <el-table
      :data="detail"
      height="200"
      border
    >
      <el-table-column prop="assetName" label="Name" align="left" />
      <el-table-column prop="assetType" label="Type" align="center" width="120" />
      <el-table-column label="Creation Date" align="center" width="200">
        <template slot-scope="scope">
          {{ $moment(Number(scope.row.tiktokDate)).format('DD MMM YYYY hh:mm:ss a') }}
        </template>
      </el-table-column>
      <el-table-column label=" " fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="downloadAsset(scope.row)"
          >
            Download
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Array,
      default: () => null
    }
  },
  methods: {
    downloadAsset (val) {}
  }
}
</script>

<style lang="scss" scoped>
.asset-detail {
  .el-table {
    height: calc(100vh - 225px) !important;
  }
}
</style>
