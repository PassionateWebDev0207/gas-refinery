<template>
  <div>
    <client-only>
      <div v-if="$auth.loggedIn">
        <h1
          v-for="(item, index) in pages"
          :key="index"
          :class="compareRoute(item.to) ? 'visit' : ''"
        >
          <nuxt-link :to="item.to">
            <div>{{ item.title }}</div>
          </nuxt-link>
        </h1>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pages: [],
      guestPages: [
        {
          title: 'Home',
          to: '/dashboard/home'
        },
        {
          title: 'Clients',
          to: '/dashboard/clients'
        },
        {
          title: 'Assets',
          to: '/dashboard/assets'
        },
        {
          title: 'Sites',
          to: '/dashboard/sites'
        },
        {
          title: 'Contact',
          to: '/dashboard/contact'
        }
      ],
      adminPages: [
        {
          title: 'Home',
          to: '/dashboard/home'
        },
        {
          title: 'Clients',
          to: '/dashboard/clients'
        },
        {
          title: 'Assets',
          to: '/dashboard/assets'
        },
        {
          title: 'Admin',
          to: '/dashboard/admin'
        },
        {
          title: 'Sites',
          to: '/dashboard/sites'
        },
        {
          title: 'Contact',
          to: '/dashboard/contact'
        }
      ]
    }
  },
  created () {
    while (this.pages.length > 0) { this.pages.pop() }
    if (process.client && this.$auth.loggedIn && this.$auth.user.account_roles.includes('ADMIN')) {
      this.pages = [...this.adminPages]
    } else {
      this.pages = [...this.guestPages]
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
@import '../../assets/scss/variables.scss';

h1 {
  margin: 0;
  padding: 10px;
  font-weight: 500;
  border-radius: 0 30px 30px 0;
  background-color: transparent;
  transition: background-color 0.3s;
  > a {
    font-size: 22px;
    text-decoration: none;
    color: rgba(white, 0.5);
    transition: color 0.3s;
    > div {
      width: 100%;
      text-align: right;
    }
    &:hover {
      color: white;
    }
  }
  &.visit {
    background-color: rgba($clr-orange, 0.9);
    box-shadow: $box-shadow;
    > a {
      color: white;
    }
  }
}
</style>
