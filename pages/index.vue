<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.client) {
      this.$router.push('/login')
    }
  }
}
</script>

<style></style>
