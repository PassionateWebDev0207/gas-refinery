<template>
  <div class="refinery-detail">
    <div class="refinery-info">
      <el-form
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="Gas Media Asset ID:">
          <span>{{ detail.assetId }}</span>
        </el-form-item>
        <el-form-item label="Platform Specific ID:">
          <span>{{ meta[0].platform_id }}</span>
        </el-form-item>
        <el-form-item label="Asset Title:">
          <span>{{ detail.assetName }}</span>
        </el-form-item>
        <el-form-item label="Creator:">
          <nuxt-link :to="`/dashboard/clients/${client.tiktokUsername}?id_type=username`">
            {{ client.name }}
          </nuxt-link>
        </el-form-item>
        <el-form-item label="Category:">
          <span>Meme</span>
        </el-form-item>
        <el-form-item label="Type:">
          <span>{{ detail.assetType }}</span>
        </el-form-item>
      </el-form>
      <el-button type="primary">
        Download Video
      </el-button>
    </div>
    <div class="refinery-video">
      <el-row>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8">
          <vue-plyr>
            <video :src="detail.assetRefrenceUrl" :poster="require('~/assets/images/gmglogo.png')" />
          </vue-plyr>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => null
    },
    meta: {
      type: Array,
      default: () => null
    },
    client: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss">
.refinery-detail {
  .refinery-info {
    .el-form-item {
      &__content, &__label {
        line-height: 30px;
      }
    }
  }
}
</style>

<style lang="scss">
@import '../../../assets/scss/variables.scss';

.refinery-detail {
  .refinery-info {
    .el-form {
      &-item {
        &__content {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .refinery-video {
    padding: 0 10px 10px;
    .plyr {
      border-radius: 5px;
      box-shadow: $box-shadow;
      max-width: 100%;
      &__video-wrapper {
        display: flex;
        justify-content: center;
        .plyr__poster {
          background-size: initial;
        }
      }
    }
    video {
      max-width: 50%;
      min-width: 200px;
      border-radius: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.refinery-detail {
  .refinery-info {
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 20px;
    .el-form {
      margin-right: 40px;
      &-item {
        margin: 0;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      .el-button {
        margin-top: 10px;
      }
    }
  }
}
</style>
