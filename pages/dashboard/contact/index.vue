<template>
  <div />
</template>

<script>
export default {
  created () {
    if (process.client) {
      this.$router.push('/dashboard/contact/contacts')
    }
  }
}
</script>

<style lang="scss" scoped></style>
