<template>
  <el-form
    class="refinery-detail"
    label-width="100px"
  >
    <el-form-item label="Gas ID:">
      <span>{{ detail.id }}</span>
    </el-form-item>
    <el-form-item label="Name:">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="Last Updated:">
      <span>{{ $moment(Number(detail.refineryUpdated)).format('DD MMM YYYY hh:mm:ss a') }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = this.detail.name
  }
}
</script>

<style lang="scss">
.refinery-detail {
  .el-form-item {
    &__label, &__content {
      display: block;
      white-space: nowrap;
      .el-date-editor, .el-input {
        width: 400px;
        max-width: 400px;
        display: block;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-form {
  padding: 15px;
  &-item {
    margin: 0;
  }
}
</style>
