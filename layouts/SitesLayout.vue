<template>
  <div class="sites-layout">
    <div class="sites-layout-header">
      <div class="sites-layout-header--title">
        <h1>Site Status</h1>
      </div>
      <div class="sites-layout-header--tabs">
        <div v-for="item in tabs" :key="item.label" :class="compareRoute(item.to) ? 'visit' : ''">
          <nuxt-link :to="item.to">
            <div>{{ item.label }}</div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="sites-layout-content">
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
          label: 'GasVPN',
          to: '/dashboard/sites/gasvpn'
        },
        {
          label: 'GCP',
          to: '/dashboard/sites/gcp'
        },
        {
          label: 'Scrapers',
          to: '/dashboard/sites/scrapers'
        },
        {
          label: 'API',
          to: '/dashboard/sites/api'
        },
        {
          label: 'Dell Cluster',
          to: '/dashboard/sites/dell-cluster'
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

.sites-layout {
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
        width: 20%;
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
