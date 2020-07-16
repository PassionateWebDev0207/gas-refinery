<template>
  <div class="assets-layout">
    <div class="assets-layout-header">
      <div class="assets-layout-header--title">
        <h1>Assets</h1>
      </div>
      <div class="assets-layout-header--tabs">
        <div v-for="item in tabs" :key="item.label" :class="compareRoute(item.to) ? 'visit' : ''">
          <nuxt-link :to="item.to">
            <div>{{ item.label }}</div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="assets-layout-content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          label: 'List',
          to: '/dashboard/assets/list'
        },
        {
          label: 'Stats',
          to: '/dashboard/assets/stats'
        },
        {
          label: 'Categories',
          to: '/dashboard/assets/categories'
        }
      ]
    }
  },
  methods: {
    compareRoute (route) {
      return this.$route.path.includes(route)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.assets-layout {
  padding: 20px;
  &-header {
    background-color: $clr-orange;
    border-radius: 5px;
    margin-bottom: 20px;
    &--title {
      display: flex;
      align-items: center;
      padding-left: 20px;
      height: 50px;
      border-bottom: 1px solid rgba(white, 0.5);
      h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: white;
      }
    }
    &--tabs {
      height: 50px;
      display: flex;
      align-items: center;
      > div {
        width: 33.33%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        background-color: transparent;
        transition: background-color 0.3s;
        > a {
          > div {
            width: 100%;
            height: 100%;
          }
          text-decoration: none;
          color: white;
        }
        &.visit {
          background-color: rgba(black, 0.1);
        }
        &:hover {
          background-color: rgba(black, 0.1);
        }
      }
    }
  }
  &-content {
    height: calc(100vh - 240px);
    overflow: auto;
  }
}
</style>
