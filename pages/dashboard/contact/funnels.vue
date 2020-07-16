<template>
  <div class="funnels">
    <client-only>
      <el-drawer
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :visible.sync="showFunnelForm"
        direction="rtl"
        :title="isCreate ? 'Create New Funnel' : 'Update Funnel'"
        class="update-funnel"
      >
        <div v-if="showFunnelForm" class="update-funnel__body">
          <el-form
            ref="funnelForm"
            :model="funnelForm"
            label-width="80px"
          >
            <el-form-item prop="contact_funnel_name" label="Name:">
              <el-input v-model="funnelForm.contact_funnel_name" />
            </el-form-item>
            <el-form-item prop="contact_funnel_desc" label="Desc:">
              <el-input v-model="funnelForm.contact_funnel_desc" />
            </el-form-item>
            <el-form-item prop="contact_funnel_active" label="Is Active:">
              <el-switch v-model="funnelForm.contact_funnel_active" />
            </el-form-item>
          </el-form>
        </div>
        <div class="update-funnel__operation">
          <el-button type="primary" @click="submitFunnel">
            {{ isCreate ? 'Create Funnel' : 'Update Funnel' }}
          </el-button>
        </div>
      </el-drawer>
      <div class="funnels-header">
        <div>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addNewFunnel"
          >
            Add new
          </el-button>
        </div>
      </div>
      <div class="funnels-content">
        <client-only>
          <el-table
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="funnels"
            height="200px"
            style="width: 100%"
            border
          >
            <el-table-column prop="contact_funnel_id" label="ID" width="100px" />
            <el-table-column prop="contact_funnel_name" label="Name" />
            <el-table-column prop="contact_funnel_desc" label="Desc" />
            <el-table-column label="Is Active" width="100px">
              <template slot-scope="scope">
                {{ scope.row.contact_funnel_active === 1 ? 'Yes' : 'No' }}
              </template>
            </el-table-column>
            <el-table-column label=" " width="100px" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="updateFunnel(scope.row)">
                  Update
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label=" " width="100px" fixed="right" align="center">
              <template slot-scope="scope">
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteFunnel(scope.row)"
                >
                  <el-button slot="reference" type="text">
                    Delete
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </client-only>
      </div>
      <el-pagination
        background
        :page-size="recordsPerPage"
        :page-sizes="recordsList"
        :pager-count="5"
        :total="count"
        :current-page.sync="currentPage"
        layout="total, sizes,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as data from '@/assets/data'

export default {
  data () {
    return {
      currentPage: 1,
      showFunnelForm: false,
      recordsList: data.pageLimitList,
      recordsPerPage: 25,
      isCreate: false,
      funnelID: '',
      funnelForm: {
        contact_funnel_name: '',
        contact_funnel_desc: '',
        contact_funnel_active: false
      },
      funnelFormFields: [
        'contact_funnel_name',
        'contact_funnel_desc',
        'contact_funnel_active'
      ]
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapState('contacts', ['funnels', 'loading', 'count'])
  },
  created () {
    if (process.client) {
      this.$store.dispatch('contacts/GET_FUNNELS', {
        token: this.token,
        page: 1,
        limit: this.recordsPerPage
      })
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$store.dispatch('contacts/GET_FUNNELS', {
        token: this.token,
        page: val,
        limit: this.recordsPerPage
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.recordsPerPage = val
      this.handleCurrentChange(this.currentPage)
    },
    updateFunnel (val) {
      this.isCreate = false
      this.funnelID = val.contact_funnel_id
      this.funnelFormFields.forEach((item) => {
        this.funnelForm[item] = val[item]
        if (item === 'contact_funnel_active') {
          this.funnelForm[item] = val[item] === 1
        }
      })
      this.showFunnelForm = true
    },
    addNewFunnel () {
      this.funnelFormFields.forEach((item) => {
        this.funnelForm[item] = ''
        if (item === 'contact_funnel_active') {
          this.funnelForm[item] = false
        }
      })
      this.showFunnelForm = true
      this.showSettings = false
      this.isCreate = true
    },
    deleteFunnel (val) {
      this.$store.dispatch('contacts/DELETE_FUNNEL', {
        token: this.token,
        limit: this.recordsPerPage,
        funnelID: val.contact_funnel_id,
        page: this.currentPage
      })
    },
    submitFunnel () {
      this.$refs.funnelForm.validate(async (valid) => {
        if (valid) {
          const data = {}

          this.showFunnelForm = false
          this.funnelFormFields.forEach((item) => {
            if (this.funnelForm[item] !== '') {
              data[item] = this.funnelForm[item]
              if (item === 'contact_funnel_active') {
                data[item] = this.funnelForm[item] === true ? 1 : 0
              }
            }
          })

          if (this.isCreate) {
            await this.$store.dispatch('contacts/NEW_FUNNEL', {
              token: this.token,
              data,
              limit: this.recordsPerPage,
              page: this.currentPage
            })
          } else {
            await this.$store.dispatch('contacts/UPDATE_FUNNEL', {
              token: this.token,
              funnelID: this.funnelID,
              data,
              limit: this.recordsPerPage,
              page: this.currentPage
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
.funnels {
  .update-funnel {
    .el-drawer {
      &.rtl {
        width: 400px !important;
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
        .update-funnel__body {
          overflow: auto;
          padding: 20px;
          .el-form {
            &-item {
              margin-bottom: 20px;
              &__content {
                width: 280px;
                .el-date-editor, .el-select {
                  width: 100%;
                }
              }
            }
          }
        }
        .update-funnel__operation {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 5px;
        }
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.funnels {
  overflow: auto;
  height: 100%;
  &-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      .el-button {
        margin: 0;
        margin-right: 10px;
      }
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
