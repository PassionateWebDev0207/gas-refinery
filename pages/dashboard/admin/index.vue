<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.client) {
      this.$router.push('/dashboard/admin/accounts')
    }
  }
}
</script>

<style lang="scss" scoped></style>
