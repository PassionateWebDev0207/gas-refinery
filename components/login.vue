<template>
  <div class="login-form">
    <h1>Login</h1>
    <el-form ref="loginForm" label-position="top" :model="loginForm">
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="loginForm.email" @keyup.enter.native="submit('loginForm')" />
      </el-form-item>
      <el-form-item
        prop="password"
        label="Password"
        :rules="[
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 8, max: 32, message: 'Lenght should be 8 to 32', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="loginForm.password" type="password" @keyup.enter.native="submit('loginForm')" />
      </el-form-item>
      <el-divider />
      <el-form-item>
        <el-button type="success" @click="submit('loginForm')">
          Login
        </el-button>
      </el-form-item>
      <el-form-item>
        *For questions and issues regarding login, please contact the engineering department
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$auth.loginWith('local', { data: this.loginForm }).then(() => {
            this.$router.push('/dashboard/home')
          }).catch((err) => {
            if (err.response.data !== undefined && err.response.data.message) {
              this.$message({ type: 'error', message: err.response.data.message, offset: 80 })
            } else {
              this.$message({ type: 'error', message: 'Login Error!!', offset: 80 })
            }
          })
        } else {
          this.$message({ type: 'error', message: 'Login Error!!', offset: 80 })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.login-form {
  padding: 20px;
  width: 375px;
  background-color: white;
  box-shadow: $box-shadow;
  border-radius: 10px;
  h1 {
    margin: 0;
  }
  .el-form {
    padding: 20px 20px 10px;
  }
}
</style>

<style lang="scss">
.login-form {
  .el-form {
    &-item {
      margin-bottom: 20px;
      &__label {
        padding: 0;
        line-height: 20px;
      }
      &__content {
        color: #606266;
        line-height: 20px;
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
