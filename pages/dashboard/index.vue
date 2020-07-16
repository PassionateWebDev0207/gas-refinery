<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.server) {
      this.$router.push('/dashboard/home')
    }
  }
}
</script>

<style></style>
