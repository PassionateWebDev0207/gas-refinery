<template>
  <el-form
    class="recruitment-detail"
    label-width="120px"
  >
    <el-form-item label="Name:">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="Date Signed:">
      <el-date-picker v-model="dateSigned" type="datetime" placeholder="Select date and time" />
    </el-form-item>
    <el-form-item label="Contract Expires:">
      <el-date-picker v-model="dateExpire" type="datetime" placeholder="Select date and time" />
    </el-form-item>
    <el-form-item label="Recruiter:">
      <el-input v-model="recruiter" />
    </el-form-item>
    <el-form-item label="Revenue Split:">
      <el-input v-model="revSplit" />
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
      name: '',
      dateSigned: null,
      dateExpire: null,
      recruiter: '',
      revSplit: ''
    }
  },
  mounted () {
    this.name = this.detail.name
    this.dateSigned = new Date(Number(this.detail.recruitDateSigned))
    this.dateExpire = new Date(Number(this.detail.recruitDateExpire))
    this.recruiter = this.detail.recruitRecruiter === null ? '' : this.detail.recruitRecruiter
    this.revSplit = this.detail.recruitRevSplit === null ? '' : this.detail.recruitRevSplit
  }
}
</script>

<style lang="scss">
.recruitment-detail {
  .el-form-item {
    &__label, &__content {
      display: block;
      white-space: nowrap;
      .el-input, .el-date-editor {
        width: 400px;
        max-width: 400px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-form {
  padding: 15px;
  &-item {
    margin-bottom: 10px;
  }
}
</style>
