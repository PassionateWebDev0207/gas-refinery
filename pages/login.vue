<template>
  <login-layout />
</template>

<script>
import LoginLayout from '@/layouts/LoginLayout'

export default {
  components: {
    LoginLayout
  },
  created () {
    if (process.client && this.$auth.loggedIn) {
      this.$router.push('/dashboard/home')
    }
  }
}
</script>

<style></style>
