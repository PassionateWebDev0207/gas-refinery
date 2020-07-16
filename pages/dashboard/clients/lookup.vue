<template>
  <div class="client-lookup">
    <div class="clients-header">
      <h1>Clients: New Client</h1>
    </div>
    <div class="lookup-input">
      <el-input v-model="lookupURL" />
      <el-button type="primary" @click="lookupNewClient">
        Look Up
      </el-button>
    </div>
    <el-divider />
    <div
      v-loading="newClientRecruiting"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="client-info"
    >
      <el-form v-if="newClientRecruited" label-position="top">
        <el-form-item label="Name:">
          <el-input />
        </el-form-item>
        <el-form-item label="Username:">
          <el-input />
        </el-form-item>
        <el-form-item label="Recruiter Email:">
          <el-input />
        </el-form-item>
        <el-form-item label="Rev Split:">
          <el-input />
        </el-form-item>
        <el-form-item label="Contract Expires:">
          <el-input />
        </el-form-item>
      </el-form>
      <div v-if="newClientRecruited" class="client-image">
        <el-image class="user-image" :lazy="true" fit="cover">
          <div slot="error" class="image-error">
            <i class="el-icon-picture" />
          </div>
          <div slot="placeholer" class="image-loading">
            <i class="el-icon-loading" />
          </div>
        </el-image>
        <el-button type="success" @click="registerNewClient">
          Register
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      lookupURL: ''
    }
  },
  computed: {
    ...mapState('clients', ['newClientRecruiting', 'newClientRecruited'])
  },
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async lookupNewClient () {
      this.$store.commit('clients/setNewClientRecruiting', true)
      await this.sleep(2000)
      this.$store.commit('clients/setNewClientRecruiting', false)
      this.$store.commit('clients/setNewClientRecruited', true)
    },
    registerNewClient () {
      this.$store.commit('clients/setNewClientRecruited', false)
    }
  }
}
</script>

<style lang="scss">
.client-lookup {
  .client-info {
    .el-form {
      .el-form-item {
        margin: 0;
        margin-top: 10px;
        &__label {
          white-space: nowrap;
          padding: 0;
          line-height: 20px;
        }
        &__content {
          .el-input {
            width: 400px;
            max-width: 400px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.client-lookup {
  padding: 20px;
  .clients-header {
    margin-bottom: 40px;
    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .lookup-input {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
  .client-info {
    display: flex;
    height: calc(100vh - 270px);
    overflow: auto;
    .client-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 350px;
      margin-left: 40px;
      .user-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 170px;
        min-width: 170px;
        height: 170px;
        min-height: 170px;
        border-radius: 50%;
        border: 5px solid white;
        background-color: grey;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
