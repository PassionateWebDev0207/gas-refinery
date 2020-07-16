<template>
  <div class="accounts">
    <el-drawer :visible.sync="showForm" direction="rtl" :title="isCreate ? 'Create a new user' : 'Update user'">
      <el-form v-if="showForm" ref="form" :model="form" :rules="isCreate ? createRules : updateRules" label-width="110px">
        <el-form-item prop="account_first_name" label="First Name:">
          <el-input v-model="form.account_first_name" :placeholder="placeholders.account_first_name" />
        </el-form-item>
        <el-form-item prop="account_last_name" label="Last Name:">
          <el-input v-model="form.account_last_name" :placeholder="placeholders.account_last_name" />
        </el-form-item>
        <el-form-item prop="account_email" label="Email:">
          <el-input v-model="form.account_email" :placeholder="placeholders.account_email" />
        </el-form-item>
        <el-form-item prop="account_password1" label="Password:">
          <el-input v-model="form.account_password1" type="password" />
        </el-form-item>
        <el-form-item prop="account_password2" label="Confirm Password:">
          <el-input v-model="form.account_password2" type="password" />
        </el-form-item>
        <el-form-item prop="account_roles" label="Account Roles:">
          <el-checkbox-group v-model="form.account_roles">
            <el-checkbox
              v-for="role in roles"
              :key="role"
              :label="role"
              name="account_roles"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="account_active" label="Has Access:">
          <el-switch v-model="form.account_active" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm">
            {{ isCreate ? 'Create' : 'Update' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <div class="accounts-header">
      <div>
        <el-button type="success" icon="el-icon-plus" @click="addNewUser">
          Add new
        </el-button>
      </div>
    </div>
    <div class="accounts-content">
      <el-table
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="users"
        height="200px"
        border
        @sort-change="handleSortChange"
      >
        <el-table-column prop="account_id" label="ID" />
        <el-table-column prop="account_first_name" label="First Name" width="120" sortable="custom" />
        <el-table-column prop="account_last_name" label="Last Name" width="120" sortable="custom" />
        <el-table-column prop="account_email" label="Email" sortable="custom" />
        <el-table-column label="Last logged in" width="200" sortable="custom">
          <template slot-scope="scope">
            {{ $moment(Number(scope.row.account_login_date)).format('DD/MM/YYYY hh:mm:ss A') }}
          </template>
        </el-table-column>
        <el-table-column label="Account Roles" width="220" sortable="custom">
          <template slot-scope="scope" sortable="custom">
            {{ scope.row.account_roles.split(',').join(', ') }}
          </template>
        </el-table-column>
        <el-table-column label="Has Access" width="120" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.account_active === 1 ? 'Yes' : 'No' }}
          </template>
        </el-table-column>
        <el-table-column width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateUser(scope.row)">
              Update
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      :page-size="recordsPerPage"
      :page-sizes="limitList"
      :pager-count="5"
      :total="count"
      :current-page.sync="currentPage"
      layout="total, sizes,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as data from '@/assets/data'

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
    const lengthValidator = {
      min: 8,
      max: 32,
      message: 'Lenght should be 8 to 32',
      trigger: ['blur', 'change']
    }

    return {
      userId: '',
      isCreate: true,
      drawerTitle: '',
      formFields: data.admin.formFields,
      form: {
        account_first_name: '',
        account_last_name: '',
        account_email: '',
        account_password1: '',
        account_password2: '',
        account_roles: [],
        account_active: false
      },
      roles: data.admin.roles,
      placeholders: {
        account_first_name: '',
        account_last_name: '',
        account_email: ''
      },
      createRules: {
        ...data.admin.createRules,
        account_password1: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          lengthValidator
        ],
        account_password2: [
          { required: true, message: 'Please input confirm password', trigger: 'blur' },
          lengthValidator,
          {
            validator: confirmValidator,
            trigger: 'blur'
          }
        ]
      },
      updateRules: {
        account_password2: [
          {
            validator: confirmValidator,
            trigger: 'blur'
          }
        ]
      },
      sortQueries: data.admin.sortQueries,
      showForm: false,
      currentPage: 1,
      limitList: data.pageLimitList,
      recordsPerPage: 25
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapState('users', ['loading', 'users', 'count'])
  },
  created () {
    if (process.client && !this.$auth.user.account_roles.includes('ADMIN')) {
      this.$router.push('/dashboard/home')
    }
    this.$store.commit('users/setSortQuery', '')
    this.$store.commit('users/setSortDirection', '')
    this.$store.dispatch('users/GET_USERS', {
      token: this.token,
      limit: this.recordsPerPage,
      page: this.currentPage
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.$store.dispatch('users/GET_USERS', {
        token: this.token,
        limit: this.recordsPerPage,
        page: val
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.recordsPerPage = val
      this.handleCurrentChange(this.currentPage)
    },
    handleSortChange (val) {
      if (val.order !== null) {
        this.sortQuery = this.sortQueries[val.column.label]
        this.$store.commit('users/setSortQuery', this.sortQuery)
        this.$store.commit('users/setSortDirection',
          val.order === 'ascending' ? 'direction=ascend' : 'direction=descend')
        this.$store.dispatch('users/GET_USERS', {
          token: this.token,
          page: this.currentPage,
          limit: this.recordsPerPage
        })
      }
    },
    updateUser (val) {
      this.isCreate = false
      // eslint-disable-next-line dot-notation
      this.userId = val['account_id']
      this.formFields.forEach((item) => {
        if (item === 'account_active') {
          this.form[item] = val[item] === 1
        } else if (item === 'account_roles') {
          const roles = []
          this.roles.forEach((role) => {
            if (val[item].includes(role)) {
              roles.push(role)
            }
          })
          this.form[item] = roles
        } else {
          this.form[item] = ''
        }
        this.placeholders[item] = val[item]
      })
      this.showForm = true
    },
    addNewUser () {
      this.isCreate = true
      this.formFields.forEach((item) => {
        if (item === 'account_active') {
          this.form[item] = false
        } else if (item === 'account_roles') {
          this.form[item] = []
        } else {
          this.form[item] = ''
        }
        this.placeholders[item] = ''
      })
      this.showForm = true
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = {}
          this.showForm = false

          this.formFields.forEach((item) => {
            if (item === 'account_active') {
              data[item] = this.form[item] ? 1 : 0
            } else if (item === 'account_roles') {
              const roles = this.form[item]
              data[item] = roles.join(',')
            } else if (this.form[item] !== '') {
              data[item] = this.form[item]
            }
          })

          if (this.isCreate) {
            await this.$store.dispatch('users/CREATE_USER', {
              token: this.token,
              data
            })
          } else {
            await this.$store.dispatch('users/UPDATE_USER', {
              userId: this.userId,
              token: this.token,
              data
            })
          }
        } else {
          this.$message({ type: 'error', message: 'Fill out the form correctly', offset: 80 })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.accounts {
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
            .el-button {
              width: 100px;
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
.accounts {
  overflow: auto;
  height: 100%;
  &-header {
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    h1 {
      margin: 0;
      font-weight: 500;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > div {
      display: flex;
    }
  }
  &-content {
    height: calc(100% - 116px);
    .el-table {
      height: 100% !important;
    }
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
