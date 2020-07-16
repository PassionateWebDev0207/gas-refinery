<template>
  <client-only>
    <div
      v-loading="pageLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="assets-categories"
    >
      <div
        v-loading="assetLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="assets-categories__body"
      >
        <div class="preview">
          <vue-plyr v-if="!assetLoading">
            <video :src="asset.assetRefrenceUrl" :poster="require('~/assets/images/gmglogo.png')" />
          </vue-plyr>
        </div>
        <div class="categories">
          <div>
            <el-button
              v-for="item in categories"
              :key="item.category_id"
              size="small"
              :style="{
                'background-color': `#${item.category_color}`
              }"
              @click="associate(item.category_id)"
            >
              {{ item.category_name }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="assets-categories__footer">
        <el-button
          type="primary"
          :disabled="assetLoading"
          @click="getAsset"
        >
          SKIP
        </el-button>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['token']),
    ...mapState('category', ['pageLoading', 'categories', 'asset', 'assetLoading'])
  },
  created () {
    if (process.client) {
      this.$store.dispatch('category/GET_CATEGORIES', { token: this.token })
    }
  },
  methods: {
    getAsset () {
      this.$store.dispatch('category/GET_ASSET', { token: this.token })
    },
    associate (categoryID) {
      this.$store.dispatch('category/ASSOCIATE', {
        token: this.token,
        data: {
          asset_id: this.asset.assetId,
          category_id: categoryID
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.assets-categories {
  height: 100%;
  &__body {
    height: calc(100% - 60px);
    .preview {
      width: 70%;
      height: 100%;
      padding: 5px 20px 5px 5px;
      > div {
        height: 100%;
        .plyr {
          border-radius: 5px;
          box-shadow: $box-shadow;
          width: 100%;
          height: 100%;
          &__video-wrapper {
            display: flex;
            justify-content: center;
            .plyr__poster {
              background-size: initial;
            }
          }
        }
      }
    }
    .categories {
      > div {
        padding-top: 5px;
        display: flex;
        flex-wrap: wrap;
        .el-button {
          width: 100px;
          height: 30px;
          margin: 0px 5px 10px;
          border: none;
          color: white;
          font-weight: bold;
          box-shadow: $box-shadow;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.assets-categories {
  height: 100%;
  &__body {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    .categories {
      width: 30%;
      height: auto;
      overflow: auto;
    }
  }
  &__footer {
    margin-top: 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      font-weight: bold;
    }
  }
}
</style>
