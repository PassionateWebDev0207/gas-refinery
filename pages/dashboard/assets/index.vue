<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.client) {
      this.$router.push('/dashboard/assets/list')
    }
  }
}
</script>

<style lang="scss" scoped></style>
