<template>
  <div class="contacts">
    <client-only>
      <el-drawer
        v-loading="loading || userLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :visible.sync="showSettings"
        direction="rtl"
        title="Search Settings"
        class="search-settings"
      >
        <div class="search-settings__operation">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchContacts"
          >
            Search
          </el-button>
        </div>
        <div class="search-settings__body">
          <div class="search-item">
            <span>Username:</span>
            <el-input v-model="search.username" placeholder="Enter username..." />
          </div>
          <div class="search-item">
            <span>Full Name:</span>
            <el-input v-model="search.full_name" placeholder="Enter full name..." />
          </div>
          <div class="search-item">
            <span>First Name:</span>
            <el-input v-model="search.first_name" placeholder="Enter first name..." />
          </div>
          <div class="search-item">
            <span>Last Name:</span>
            <el-input v-model="search.last_name" placeholder="Enter last name..." />
          </div>
          <div class="search-item">
            <span>Profile URL:</span>
            <el-input v-model="search.profile_url" placeholder="Enter profile URL..." />
          </div>
          <div class="search-item">
            <span>Instagram:</span>
            <el-input v-model="search.instagram_url" placeholder="Enter instagram URL..." />
          </div>
          <div class="search-item">
            <span>Owner:</span>
            <el-select v-model="search.owner" placeholder="-- Choose owner --">
              <el-option :label="'-- Choose owner --'" :value="''" />
              <el-option
                v-for="item in users"
                :key="item.account_id"
                :label="`${item.account_first_name} ${item.account_last_name} (${item.account_email})`"
                :value="item.account_id"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span>Recruiter:</span>
            <el-select v-model="search.recruiter" placeholder="-- Choose Recruiter --">
              <el-option :label="'-- Choose Recruiter --'" :value="''" />
              <el-option
                v-for="item in users"
                :key="item.account_id"
                :label="`${item.account_first_name} ${item.account_last_name} (${item.account_email})`"
                :value="item.account_id"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span>Stage:</span>
            <el-select v-model="search.stage" placeholder="-- Choose Stage --">
              <el-option v-for="item in stages" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="search-item">
            <span>Topic:</span>
            <el-input v-model="search.creator_genre" placeholder="Enter creator genre..." />
          </div>
          <div class="search-item">
            <span>Note:</span>
            <el-input v-model="search.note" placeholder="Enter note..." />
          </div>
          <div class="search-item">
            <span>Fl from:</span>
            <el-input v-model="search.flFrom" type="number" placeholder="Enter from..." />
          </div>
          <div class="search-item">
            <span>Fl to:</span>
            <el-input v-model="search.flTo" type="number" placeholder="Enter to..." />
          </div>
          <div class="search-item">
            <span>Changed from:</span>
            <el-input v-model="search.changedFrom" type="number" placeholder="Enter from..." />
          </div>
          <div class="search-item">
            <span>Changed to:</span>
            <el-input v-model="search.changedTo" type="number" placeholder="Enter to..." />
          </div>
          <div class="search-item">
            <span>Rea From:</span>
            <el-input v-model="search.reaFrom" type="number" placeholder="Enter from..." />
          </div>
          <div class="search-item">
            <span>Rea to:</span>
            <el-input v-model="search.reaTo" type="number" placeholder="Enter to..." />
          </div>
          <div class="search-item">
            <span>Cre from:</span>
            <el-date-picker v-model="search.creFrom" placeholder="Enter from date..." />
          </div>
          <div class="search-item">
            <span>Cre to:</span>
            <el-date-picker v-model="search.creTo" placeholder="Enter to date..." />
          </div>
        </div>
      </el-drawer>
      <el-drawer
        v-loading="loading || userLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :visible.sync="showContactForm"
        direction="rtl"
        :title="isCreateNewContact ? 'Create New Contact' : 'Update Contact'"
        class="update-contact"
      >
        <div v-if="showContactForm" class="update-contact__body">
          <el-form ref="contactForm" :model="contactForm" :rules="isCreateNewContact ? contactFormRules: {}" label-width="260px">
            <el-form-item prop="first_name" label="First Name:">
              <el-input v-model="contactForm.first_name" />
            </el-form-item>
            <el-form-item prop="last_name" label="Last Name:">
              <el-input v-model="contactForm.last_name" />
            </el-form-item>
            <el-form-item prop="username" label="Alias/Username:">
              <el-input v-model="contactForm.username" />
            </el-form-item>
            <el-form-item prop="email" label="Email:">
              <el-input v-model="contactForm.email" />
            </el-form-item>
            <el-form-item prop="phone_number" label="Phone Number:">
              <el-input v-model="contactForm.phone_number" />
            </el-form-item>
            <el-form-item prop="profile_url" label="Profile URL:">
              <el-input v-model="contactForm.profile_url" />
            </el-form-item>
            <el-form-item prop="reached_date" label="Reached Out Date:">
              <el-date-picker v-model="contactForm.reached_date" />
            </el-form-item>
            <el-form-item prop="owner_id" label="Owner:">
              <el-select v-model="contactForm.owner_id" placeholder="-- Choose Owner --">
                <el-option
                  v-for="item in users"
                  :key="item.account_id"
                  :label="`${item.account_first_name} ${item.account_last_name} (${item.account_email})`"
                  :value="item.account_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="recruiter_id" label="Recruiter:">
              <el-select v-model="contactForm.recruiter_id" placeholder="-- Choose Recruiter --">
                <el-option
                  v-for="item in users"
                  :key="item.account_id"
                  :label="`${item.account_first_name} ${item.account_last_name} (${item.account_email})`"
                  :value="item.account_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="client_funnel" label="Client Funnel:">
              <el-select v-model="contactForm.client_funnel" placeholder="-- Choose Client Funnel --">
                <el-option v-for="item in clientFunnels" :key="item.label" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="stage" label="Stage:">
              <el-select v-model="contactForm.stage" placeholder="-- Choose Stage --">
                <el-option v-for="item in stages" :key="item.label" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="follower_num" label="Followers/Subs number:">
              <el-input v-model="contactForm.follower_num" />
            </el-form-item>
            <el-form-item prop="creator_genre" label="Creator Genre:">
              <el-input v-model="contactForm.creator_genre" />
            </el-form-item>
            <el-form-item prop="instagram_username" label="Instagram:">
              <el-input v-model="contactForm.instagram_username" />
            </el-form-item>
            <el-form-item prop="tiktok_username" label="Tiktok:">
              <el-input v-model="contactForm.tiktok_username" />
            </el-form-item>
            <el-form-item prop="twitch_username" label="Twitch:">
              <el-input v-model="contactForm.twitch_username" />
            </el-form-item>
            <el-form-item prop="twitter_username" label="Twitter:">
              <el-input v-model="contactForm.twitter_username" />
            </el-form-item>
            <el-form-item prop="youtube_username" label="Youtube:">
              <el-input v-model="contactForm.youtube_username" />
            </el-form-item>
            <el-form-item prop="sent_contract_date" label="Send Contract Date:">
              <el-date-picker v-model="contactForm.sent_contract_date" />
            </el-form-item>
            <el-form-item prop="signed_date" label="Signed Date:">
              <el-date-picker v-model="contactForm.signed_date" />
            </el-form-item>
            <el-form-item prop="note" label="NOTE:">
              <el-input v-model="contactForm.note" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item prop="contact_url" label="Contact URL:">
              <el-input v-model="contactForm.contact_url" />
            </el-form-item>
            <el-form-item prop="company_name" label="Company:">
              <el-input v-model="contactForm.company_name" />
            </el-form-item>
            <el-form-item prop="company_website" label="Company Website URL:">
              <el-input v-model="contactForm.company_website" />
            </el-form-item>
            <el-form-item prop="rev_share" label="Revenue Share (Only for Customer):">
              <el-input v-model="contactForm.rev_share" type="number" />
            </el-form-item>
            <el-form-item prop="contract_status" label="Contract Status:">
              <el-input v-model="contactForm.contract_status" />
            </el-form-item>
          </el-form>
        </div>
        <div class="update-contact__operation">
          <el-button type="primary" @click="submitContact">
            {{ isCreateNewContact ? 'Create Contact' : 'Update Contact' }}
          </el-button>
        </div>
      </el-drawer>
      <div class="contacts-header">
        <div>
          <el-button
            type="primary"
            icon="el-icon-setting"
            @click="openSettingPanel"
          >
            Search Settings
          </el-button>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addNewContact"
          >
            Add new
          </el-button>
          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to delete this?"
            @onConfirm="deleteContacts"
          >
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              :disabled="multipleSelection.length === 0 ? true : false"
            >
              Delete
            </el-button>
          </el-popconfirm>
        </div>
      </div>
      <div class="contacts-content">
        <client-only>
          <el-table
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="contacts"
            height="200px"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
          >
            <el-table-column type="selection" width="40" fixed />
            <el-table-column type="index" width="40" fixed />
            <el-table-column label="Full Name" width="200" fixed sortable="custom">
              <template slot-scope="scope">
                <a :href="handleURL(scope.row.profile_url)" target="_blank">
                  {{ scope.row.full_name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Username" width="200" fixed sortable="custom">
              <template slot-scope="scope">
                <a :href="handleURL(scope.row.profile_url)" target="_blank">
                  {{ scope.row.username }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="creator_genre" label="Creator Genre" width="200" sortable="custom" />
            <el-table-column label="Followers Subs" width="150" sortable="custom">
              <template slot-scope="scope">
                {{ convertNumber(scope.row.follower_num) }}
              </template>
            </el-table-column>
            <el-table-column prop="recruiter_id" label="Recruiter" width="300" sortable="custom" />
            <el-table-column prop="owner_id" label="Owner" width="200" sortable="custom" />
            <el-table-column label="Reached Date" width="200" sortable="custom">
              <template slot-scope="scope">
                {{
                  scope.row.reached_date === 'TBD' ?
                    scope.row.reached_date :
                    $moment(Number(scope.row.reached_date)).format('DD/MM/YYYY')
                }}
              </template>
            </el-table-column>
            <el-table-column label="Updated Date" width="200" sortable="custom">
              <template slot-scope="scope">
                {{
                  scope.row.updated_date === 'TBD' ?
                    scope.row.updated_date :
                    $moment(Number(scope.row.updated_date)).format('DD/MM/YYYY')
                }}
              </template>
            </el-table-column>
            <el-table-column label="Signed Date" width="200" sortable="custom">
              <template slot-scope="scope">
                {{
                  scope.row.signed_date === 'TBD' ?
                    scope.row.signed_date :
                    $moment(Number(scope.row.signed_date)).format('DD/MM/YYYY')
                }}
              </template>
            </el-table-column>
            <el-table-column label="Stage" width="200" sortable="custom">
              <template slot-scope="scope">
                <el-tag :class="getTagColor(scope.row.stage)">
                  {{ scope.row.stage }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="note" label="Notes" width="200" sortable="custom" />
            <el-table-column label="Created Date" width="200" sortable="custom">
              <template slot-scope="scope">
                {{
                  scope.row.created_date === 'TBD' ?
                    scope.row.created_date :
                    $moment(Number(scope.row.created_date)).format('DD/MM/YYYY hh:mm:ss')
                }}
              </template>
            </el-table-column>
            <el-table-column type="index" width="100" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="updateContact(scope.row)">
                  Update
                </el-button>
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
    const stageValidator = (rule, value, callback) => {
      if (this.contactForm.stage === '') {
        callback(
          new Error('Please input Stage.')
        )
      } else {
        callback()
      }
    }
    const clientFunnelValidator = (rule, value, callback) => {
      if (this.contactForm.clientFunnel === '') {
        callback(
          new Error('Please input Client Funnel.')
        )
      } else {
        callback()
      }
    }
    const recruiterValidator = (rule, value, callback) => {
      if (this.contactForm.clientFunnel === '') {
        callback(
          new Error('Please input Recruiter.')
        )
      } else {
        callback()
      }
    }
    return {
      sortQuery: '',
      currentPage: 1,
      showSettings: false,
      showContactForm: false,
      recordsList: data.pageLimitList,
      recordsPerPage: 25,
      searchFields: data.contact.searchFields,
      search: {
        username: '',
        full_name: '',
        first_name: '',
        last_name: '',
        profile_url: '',
        instagram: '',
        owner: '',
        recruiter: '',
        stage: '',
        creator_genre: '',
        note: '',
        flFrom: '',
        flTo: '',
        changedFrom: '',
        changedTo: '',
        reaFrom: '',
        reaTo: '',
        creFrom: '',
        creTo: ''
      },
      stages: data.contact.stages,
      clientFunnels: data.contact.clientFunnels,
      multipleSelection: [],
      isCreateNewContact: false,
      contactID: '',
      contactForm: {
        profile_url: '',
        username: '',
        first_name: '',
        last_name: '',
        follower_num: '',
        client_funnel: '',
        stage: '',
        owner_id: '',
        recruiter_id: '',
        instagram_username: '',
        creator_genre: '',
        reached_date: '',
        sent_contract_date: '',
        signed_date: '',
        note: '',
        contact_url: '',
        email: '',
        phone_number: '',
        rev_share: '',
        contract_status: '',
        company_name: '',
        company_website: '',
        tiktok_username: '',
        twitch_username: '',
        twitter_username: '',
        youtube_username: ''
      },
      contactFormFields: data.contact.contactFormFields,
      contactFormRules: {
        ...data.contact.contactFormRules,
        client_funnel: [
          { required: true, validator: clientFunnelValidator, trigger: ['blur', 'change'] }
        ],
        stage: [
          { required: true, validator: stageValidator, trigger: ['blur', 'change'] }
        ],
        recruiter_id: [
          { required: true, validator: recruiterValidator, trigger: ['blur', 'change'] }
        ]
      },
      sortQueries: data.contact.searchQuery,
      searchQuery: ''
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapState('contacts', ['contacts', 'loading', 'count']),
    ...mapState('users', {
      users: 'users',
      userLoading: 'loading'
    })
  },
  created () {
    if (process.client) {
      this.$store.dispatch('users/GET_ALL_USERS', { token: this.token })
      this.$store.dispatch('contacts/GET_CONTACTS', {
        token: this.token,
        page: 1,
        limit: this.recordsPerPage
      })
    }
  },
  methods: {
    convertNumber (labelValue) {
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + 'B'
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6
          ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + 'M'
          // Three Zeroes for Thousands
          : Math.abs(Number(labelValue)) >= 1.0e+3
            ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + 'K'
            : Math.abs(Number(labelValue))
    },
    handleCurrentChange (val) {
      this.$store.dispatch('contacts/GET_CONTACTS', {
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSortChange (val) {
      if (val.order !== null) {
        this.sortQuery = this.sortQueries[val.column.label]
        this.$store.commit('contacts/setSortQuery', this.sortQuery)
        this.$store.commit('contacts/setSortDirection',
          val.order === 'ascending' ? 'direction=ascend' : 'direction=descend')
        this.$store.dispatch('contacts/GET_CONTACTS', {
          token: this.token,
          page: this.currentPage,
          limit: this.recordsPerPage
        })
      }
    },
    handleURL (url) {
      if (url) {
        return url.includes('https://') ? url : `https://${url}`
      }
      return ''
    },
    getTagColor (val) {
      if (val === 'Reached out') {
        return 'reached-out'
      } else if (val === 'Connected') {
        return 'connected'
      } else if (val === 'Sent Contract') {
        return 'sent-contract'
      } else if (val === 'Signed') {
        return 'signed'
      } else if (val === 'Declined') {
        return 'declined'
      }
      return 'new'
    },
    openSettingPanel () {
      this.showContactForm = false
      this.showSettings = true
    },
    searchContacts () {
      this.searchQuery = ''
      this.searchFields.forEach((item) => {
        if (this.search[item] !== '') {
          this.searchQuery += `&${item}=${this.search[item]}`
        }
      })
      this.$store.commit('contacts/setSearchQuery', this.searchQuery)
      this.currentPage = 1
      this.$store.dispatch('contacts/GET_CONTACTS', {
        token: this.token,
        page: this.currentPage,
        limit: this.recordsPerPage
      })
    },
    updateContact (val) {
      this.isCreateNewContact = false
      this.contactID = val.id
      this.contactFormFields.forEach((item) => {
        this.contactForm[item] = val[item]
      })
      this.showContactForm = true
    },
    addNewContact () {
      this.contactFormFields.forEach((item) => {
        this.contactForm[item] = ''
      })
      this.contactForm.reached_date = new Date()
      this.showContactForm = true
      this.showSettings = false
      this.isCreateNewContact = true
    },
    deleteContacts () {
      const idArray = this.multipleSelection.map(item => item.id)
      this.$store.dispatch('contacts/DELETE_CONTACTS', {
        token: this.token,
        data: idArray,
        limit: this.recordsPerPage,
        page: this.currentPage
      })
    },
    submitContact () {
      this.$refs.contactForm.validate(async (valid) => {
        if (valid) {
          const data = {}

          this.showContactForm = false
          this.contactFormFields.forEach((item) => {
            if (this.contactForm[item] !== '') {
              if (item === 'reached_date' || item === 'sent_contract_date' || item === 'signed_date') {
                data[item] = `${(new Date(this.contactForm[item]).getTime())}`
              } else {
                data[item] = this.contactForm[item]
              }
            }
          })

          if (this.isCreateNewContact) {
            await this.$store.dispatch('contacts/NEW', {
              token: this.token,
              data,
              limit: this.recordsPerPage,
              page: this.currentPage
            })
          } else {
            await this.$store.dispatch('contacts/UPDATE', {
              token: this.token,
              contactID: this.contactID,
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
.contacts {
  .search-settings {
    .el-drawer {
      &.rtl {
        width: 350px !important
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
        .search-settings__body {
          height: calc(100vh - 135px);
          overflow: auto;
          .search-item {
            padding: 5px 20px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            .el-input, .el-select, .el-date-picker {
              max-width: 200px;
            }
            > span {
              font-size: 14px;
              display: inline-block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .search-settings__operation {
          padding: 0 10px 10px;
          display: flex;
          .el-button {
            width: 100%;
          }
        }
      }
      &:focus {
        outline: none;
      }
    }
  }
  .update-contact {
    .el-drawer {
      &.rtl {
        width: 600px !important;
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
        .update-contact__body {
          height: calc(100vh - 129px);
          overflow: auto;
          padding: 20px;
          .el-form {
            &-item {
              margin-bottom: 20px;
              &__content {
                width: 300px;
                .el-date-editor, .el-select {
                  width: 100%;
                }
              }
            }
          }
        }
        .update-contact__operation {
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
  .el-tag {
    color: white;
    border: none;
    &.reached-out {
      background-color: #fea223;
    }
    &.connected {
      background-color: #3fbae4;
    }
    &.signed {
      background-color: #95b75d;
    }
    &.sent-contract {
      background-color: #007bff;
    }
    &.declined {
      background-color: #b64645;
    }
    &.new {
      background-color: grey;
    }
  }
}
</style>

<style lang="scss" scoped>
.contacts {
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
