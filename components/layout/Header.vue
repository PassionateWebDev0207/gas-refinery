<template>
  <client-only>
    <div class="gas-header">
      <el-drawer :visible.sync="showForm" direction="rtl" title="Update Your Account">
        <el-form v-if="$auth.loggedIn" ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item prop="account_first_name" label="First Name:">
            <el-input v-model="form.account_first_name" :placeholder="$auth.user.account_first_name" />
          </el-form-item>
          <el-form-item prop="account_last_name" label="Last Name:">
            <el-input v-model="form.account_last_name" :placeholder="$auth.user.account_last_name" />
          </el-form-item>
          <el-form-item prop="account_email" label="Email:">
            <el-input v-model="form.account_email" :placeholder="$auth.user.account_email" />
          </el-form-item>
          <el-form-item prop="account_password1" label="Password:">
            <el-input v-model="form.account_password1" type="password" />
          </el-form-item>
          <el-form-item prop="account_password2" label="Confirm Password:">
            <el-input v-model="form.account_password2" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="updateAccount"
            >
              Update Account
            </el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <div class="gas-logo">
        <nuxt-link to="/dashboard/home">
          <div class="logo" />
        </nuxt-link>
        <div class="title">
          <h1>Gas Refinery</h1>
          <span>Internal Dashboard</span>
        </div>
      </div>
      <div v-if="$auth.loggedIn" class="user">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="abcd" icon="el-icon-user-solid" disabled>
              Logged in as <span class="header-username">{{ $auth.user.account_first_name + ' ' + $auth.user.account_last_name }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="setting" icon="el-icon-setting">
              Settings
            </el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button">
              Log out
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    const confirmValidator = (rule, value, callback) => {
      if (this.form.account_password1 !== value) {
        callback(
          new Error('The Confirm Password is different from the Password')
        )
      } else {
        callback()
      }
    }
    const lengthValidator1 = {
      min: 2,
      max: 32,
      message: 'Lenght should be 2 to 32',
      trigger: ['blur', 'change']
    }
    const lengthValidator2 = {
      min: 8,
      max: 32,
      message: 'Lenght should be 8 to 32',
      trigger: ['blur', 'change']
    }
    return {
      form: {
        account_email: '',
        account_first_name: '',
        account_last_name: '',
        account_password1: '',
        account_password2: ''
      },
      formFields: [
        'account_email',
        'account_first_name',
        'account_last_name',
        'account_password1',
        'account_password2'
      ],
      rules: {
        account_first_name: [
          lengthValidator1
        ],
        account_last_name: [
          lengthValidator1
        ],
        account_email: [
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        account_password1: [
          lengthValidator2
        ],
        account_password2: [
          lengthValidator2,
          {
            validator: confirmValidator,
            trigger: 'blur'
          }
        ]
      },
      showForm: false
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    async handleCommand (command) {
      if (command === 'logout') {
        await this.$auth.logout().then((res) => {
          this.$router.push('/login')
        })
      }
      if (command === 'setting') {
        this.showForm = true
      }
    },
    updateAccount () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {}
          this.formFields.forEach((item) => {
            if (this.form[item] !== '') {
              data[item] = this.form[item]
            }
          })
          this.$store.dispatch('users/UPDATE_CURRENT_USER', {
            token: this.token,
            data,
            userId: this.$auth.user.account_id
          })
        } else {
          this.$message({ type: 'error', message: 'Fill out the form correctly', offset: 80 })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.gas-header {
  .el-drawer {
    &.rtl {
      width: 350px !important;
    }
    &__header {
      span:focus {
        outline: none;
      }
      button:focus {
        outline: none;
      }
    }
    &__body {
      max-height: calc(100vh - 129px);
      overflow: auto;
      padding: 20px;
      .el-form {
        &-item {
          margin-bottom: 20px;
          &__content {
            width: 200px;
          }
          &__label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &:last-child {
            margin-top: 40px;
            .el-form-item__content {
              display: flex;
              justify-content: center;
              margin: 0 !important;
              width: 100%;
              .el-button {
                width: 200px;
              }
            }
          }
        }
      }
    }
    &:focus {
      outline: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.gas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  width: 100%;
  height: 100%;
  .gas-logo {
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      background-image: url('~assets/images/gmglogo-white.png');
      background-size: contain;
      margin-right: 10px;
    }
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        margin: 0;
        margin-top: 5px;
        color: white;
        font-weight: normal;
        font-size: 22px;
      }
      span {
        color: rgba(white, 0.5);
        text-decoration: underline;
      }
    }
  }
  .user {
    .el-dropdown-link {
      cursor: pointer;
      color: white;
    }
  }
}
</style>
