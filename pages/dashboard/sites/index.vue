<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.client) {
      this.$router.push('/dashboard/sites/gasvpn')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
